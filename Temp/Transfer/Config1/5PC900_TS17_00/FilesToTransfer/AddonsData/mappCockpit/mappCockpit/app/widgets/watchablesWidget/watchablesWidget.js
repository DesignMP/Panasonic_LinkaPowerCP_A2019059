var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
define(["require", "exports", "../common/domHelper", "./watchablesGridToolbar", "../common/treeGridWidgetBase", "../../models/online/mappCockpitComponent", "./watchableValueBuffer", "./componentDefaultDefinition"], function (require, exports, domHelper_1, watchablesGridToolbar_1, treeGridWidgetBase_1, mappCockpitComponent_1, watchableValueBuffer_1, componentDefaultDefinition_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // defines the base id for the watchable value template
    var WATCHABLE_VALUE_ID = "watchableValue_";
    var WATCHABLE_TREND_ID = "watchableTrend_";
    /**
     * implements the widget for displaying the watchables and their values with fast update. It includes displaying a short value trend.
     *
     * @class WatchablesWidget
     * @extends {TreeGridWidgetBase}
     */
    var WatchablesWidget = /** @class */ (function (_super) {
        __extends(WatchablesWidget, _super);
        function WatchablesWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // holds a list of parameters to watch
            _this._watchableParameters = [];
            // holds a list of watchable parameters that use an icon to show its state
            _this._watchableStateParameters = [];
            // holds a trend buffer for every parameter
            _this._watchableTrendValues = {};
            // specifies the time span of the trend.
            _this._trendTimeSpan = 60000;
            // specifies the period for sampling the parameter values (msecs)
            _this._trendSamplingInterval = 100;
            // specifies the ui refresh rate (msecs)
            _this._trendRefreshingInterval = 500;
            // holds the timer id for the sample timer
            _this._watchableSampleTimerId = undefined;
            // holds the timer id for the trend timer
            _this._watchablTrendTimerId = -1;
            _this._watchableIconUpdateHandler = function (sender, args) { return _this.onWatchableIconUpdated(sender, args); };
            return _this;
        }
        /**
         * Defines the height of the header
         *
         * @returns {number}
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.defineHeaderHeight = function () {
            return 30;
        };
        WatchablesWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            _super.prototype.setHeaderContent.call(this, "Watch");
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 3, 100);
        };
        WatchablesWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        Object.defineProperty(WatchablesWidget.prototype, "watchableParameters", {
            /**
             * Sets the watchable parameters as the data source for the watchables widget
             *
             * @memberof WatchablesWidget
             */
            set: function (watchableParametersParametersLink) {
                this._watchableParameters = watchableParametersParametersLink.value;
                if (this._watchableParameters.length > 0) {
                    this.onComponentParametersUpdated();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WatchablesWidget.prototype, "watchableStateParameters", {
            set: function (watchableStateParameters) {
                this._watchableStateParameters = watchableStateParameters;
                this.addTreeGridIcons();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * The component parameters have been upfated
         *
         * @private
         * @param {MappCockpitComponentParameter[]} watchableParameters
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.onComponentParametersUpdated = function () {
            // create trend buffers for the parameters
            this.createWatchableTrendBuffers(this._watchableParameters);
            // start watchable trend timer
            this.startWatchablesTrend();
            // populate the watchables widget
            this.populateWatchablesWidget();
            // update treegrid's toolbar Icons
            this.updateToolbarIcons();
            // after populating the watchables we start observing value changes of the watchables
            this.observeWatchables(this._watchableParameters);
        };
        /**
         * Start
         *
         * @returns {*}
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.startWatchablesTrend = function () {
            this.startSamplingWatchables();
            this.startRefreshingWatchablesTrend();
        };
        /**
         * Starts sampling the watchables
         *
         * @private
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.startSamplingWatchables = function () {
            var _this = this;
            // stop an eventually running timer before starting a new one
            this.stopSamplingTimer();
            this._watchableSampleTimerId = setInterval(function () {
                _this.sampleWatchables(_this._watchableParameters);
            }, this._trendSamplingInterval, this._watchableSampleTimerId);
        };
        /**
         * Stops the sampling timer
         *
         * @private
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.stopSamplingTimer = function () {
            if (this._watchableSampleTimerId) {
                clearInterval(this._watchableSampleTimerId);
            }
        };
        /**
         * Starts refreshing the watchables trend
         *
         * @private
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.startRefreshingWatchablesTrend = function () {
            var _this = this;
            // stop an eventually running timer before starting a new one
            this.stopTrendTimer();
            this._watchablTrendTimerId = setInterval(function () {
                _this.refreshWatchablesTrend(_this._watchableParameters);
            }, this._trendRefreshingInterval);
        };
        /**
         * Stops the trend timer
         *
         * @private
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.stopTrendTimer = function () {
            if (this._watchablTrendTimerId) {
                clearInterval(this._watchablTrendTimerId);
            }
        };
        /**
         * Creates a trend buffer for every watchable parameter
         *
         * @private
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.createWatchableTrendBuffers = function (watchableParameters) {
            var _this = this;
            watchableParameters.forEach(function (watchableParameter) {
                _this._watchableTrendValues[watchableParameter.browseName] = watchableValueBuffer_1.WatchableValueTrendBuffer.create(_this._trendTimeSpan / _this._trendSamplingInterval);
            });
        };
        /** resizes the watchables widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.resize = function (width, height) {
            _super.prototype.resize.call(this, width, height);
            // Refresh watchable values after resize (treegrid sets the data to "0" after resize)
            this.refreshWatchablesValues(this._watchableParameters);
        };
        /** creates the tree grid for the watchables informations
         *
         * @protected
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.createTreeGrid = function () {
            var _this = this;
            $(this.mainDiv).ejTreeGrid(__assign(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), this.getTreeGridToolbarSupport()), { dataSource: undefined, allowSelection: false, isResponsive: false, editSettings: {
                    allowEditing: false,
                    allowAdding: false,
                    allowDeleting: false,
                    showDeleteConfirmDialog: false,
                    showConfirmDialog: false
                }, create: function (args) { return _this.treeGridCreated(); } }));
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: "displayName", headerText: "Name", isPrimaryKey: true, width: "200" },
                    { field: "displayValue", headerText: "Value", width: "200", isTemplateColumn: true, template: "<div style='padding-left: 20px' id='" + this.mainDivId + WATCHABLE_VALUE_ID + "{{:uiId}}'>0</div>" },
                    { field: "engineeringUnit", headerText: "Unit", width: "100" },
                    { field: "watchableTrend", headerText: "Trend", isTemplateColumn: true, template: "<div id='" + this.mainDivId + WATCHABLE_TREND_ID + "{{:uiId}}'></div>" },
                ],
            };
        };
        /**
         * Returns the tree grid column resize settings
         *
         * @private
         * @returns {{}}
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.getTreeGridColumnResizeSupport = function () {
            var _this = this;
            return {
                allowColumnResize: true,
                columnResizeSettings: { columnResizeMode: ej.TreeGrid.ColumnResizeMode.FixedColumns },
                columnResized: function (args) { return _this.columnResized(args); },
            };
        };
        /**
         * Returns the tree grid toolbar settings
         *
         * @private
         * @returns {{}}
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.getTreeGridToolbarSupport = function () {
            var imageProvider = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.ImageProviderId);
            this._toolbar = new watchablesGridToolbar_1.WatchablesGridToolbar(this.mainDiv, imageProvider);
            return {
                toolbarSettings: {
                    showToolbar: true,
                    customToolbarItems: this._toolbar.getCustomToolbars()
                },
            };
        };
        WatchablesWidget.prototype.columnResized = function (args) {
            _super.prototype.resizeDynamicColumn.call(this, args.columnIndex, args.model);
            // Refresh watchable values after resize (treegrid sets the data to "0" after resize)
            this.refreshWatchablesValues(this._watchableParameters);
        };
        WatchablesWidget.prototype.treeGridCreated = function () {
            // Sets the custom toolbar icons
            this._toolbar.setStyleForToolbarIcons();
            // disable dummy button after creation
            this._toolbar.disableDummyButton();
        };
        /**
         * Add icons to the toolbar treegrid
         *
         * @private
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.addTreeGridIcons = function () {
            var _this = this;
            this._watchableStateParameters.forEach(function (stateParameter) {
                _this._toolbar.addIcon(stateParameter);
            });
        };
        /**
         * Disable button properties from icons
         *
         * @private
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.updateToolbarIcons = function () {
            this._toolbar.hideIcon('empty');
            this._toolbar.disableIcons();
            this._toolbar.addEventListeners();
            this._toolbar.tooltipExtension();
        };
        /**
         *
         * marks the parameters with an id as a reference to the ui
         * @private
         * @param {MappCockpitComponentParameter[]} watchableParameters
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.setWatchablesUiId = function (watchableParameters) {
            for (var i = 0; i < watchableParameters.length; i++) {
                var watchableParameter = watchableParameters[i];
                watchableParameter.uiId = i;
            }
        };
        /**
         * Populate the widget with its specific data content.
         *
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.populateWatchablesWidget = function () {
            this.setWatchablesUiId(this._watchableParameters);
            $(this.mainDiv).ejTreeGrid({
                dataSource: this._watchableParameters,
                toolbarSettings: {
                    customToolbarItems: this._toolbar.getCustomToolbars()
                },
            });
        };
        /**
         * Samples the watchable values
         *
         * @private
         * @param {MappCockpitComponentParameter[]} watchableParameters
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.sampleWatchables = function (watchableParameters) {
            var _this = this;
            watchableParameters.forEach(function (watchableParameter) {
                // update the trend buffer
                _this.addWatchableTrendValue(watchableParameter);
            });
        };
        /**
         * Refreshes the watchables trend fields
         *
         * @private
         * @param {MappCockpitComponentParameter[]} watchableParameters
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.refreshWatchablesTrend = function (watchableParameters) {
            var _this = this;
            watchableParameters.forEach(function (watchableParameter) {
                var watchableTrendElement = _this.getWatchableTrendElement(watchableParameter);
                if (watchableTrendElement && domHelper_1.DomHelper.isElementInViewport(watchableTrendElement)) {
                    var watchableTrendFieldId = "#" + watchableTrendElement.id;
                    // update the trend field
                    _this.refreshWatchableTrendField(watchableParameter, watchableTrendFieldId);
                }
            });
        };
        /**
         * refreshes the content of the watchable value fields
         *
         * @private
         * @param {MappCockpitComponentParameter[]} watchableParameters
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.refreshWatchablesValues = function (watchableParameters) {
            var _this = this;
            watchableParameters.forEach(function (watchableParameter) { _this.refreshWatchableValueField(watchableParameter); });
        };
        /**
         * Gets an element corresponding to the parameter to be used for displaying the watchable value
         *
         * @private
         * @param {MappCockpitComponentParameter} watchableParameter
         * @returns
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.getWatchableValueElement = function (watchableParameter) {
            var mySubDiv = this.mainDiv.querySelector("#" + this.mainDivId + WATCHABLE_VALUE_ID + watchableParameter.uiId);
            return mySubDiv;
        };
        /**
         * Gets an element corresponding to the parameter to be used for displaying the watchable trend line
         *
         * @private
         * @param {MappCockpitComponentParameter} watchableParameter
         * @returns {(HTMLElement | null)}
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.getWatchableTrendElement = function (watchableParameter) {
            var mySubDiv = this.mainDiv.querySelector("#" + this.mainDivId + WATCHABLE_TREND_ID + watchableParameter.uiId);
            return mySubDiv;
        };
        /**
         * updates a watchable field with the current values of the corresponding parameter
         *
         * @private
         * @param {MappCockpitComponentParameter} watchableParameter
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.refreshWatchableValueField = function (watchableParameter) {
            // get the corresponding ui element
            var watchableValueElement = this.getWatchableValueElement(watchableParameter);
            // let minValue = this._watchableTrendValues[watchableParameter.browseName]._minValue;
            // let maxValue = this._watchableTrendValues[watchableParameter.browseName]._maxValue;
            // let valueString: string = watchableParameter.displayValue.toString() + "(" + minValue + "-" + maxValue + ")";
            var valueString = watchableParameter.displayValue.toString();
            if (watchableValueElement) {
                watchableValueElement.innerHTML = valueString;
            }
        };
        /**
         * refreshes the visible trend filed content
         *
         * @param {MappCockpitComponentParameter} watchableParameter
         * @param {string} watchableTrendFieldId
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.refreshWatchableTrendField = function (watchableParameter, watchableTrendFieldId) {
            var watchableTrendData = this.getWatchableTrendValues(watchableParameter);
            this.renderWatchableTrend(watchableTrendFieldId, watchableTrendData);
        };
        /**
         * gets the trend values for the watchable parameter
         *
         * @private
         * @param {MappCockpitComponentParameter} watchableParameter
         * @returns {Array<any>}
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.getWatchableTrendValues = function (watchableParameter) {
            var trendValues = [];
            if (this._watchableTrendValues[watchableParameter.browseName]) {
                trendValues = this._watchableTrendValues[watchableParameter.browseName].values;
            }
            return trendValues;
        };
        /**
         * renders a short history of trends
         *
         * @private
         * @param {string} watchableTrendFieldId
         * @param {number[]} watchableTrendData
         * @returns
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.renderWatchableTrend = function (watchableTrendFieldId, watchableTrendData) {
            // get the trend cell
            var $trendCell = $(watchableTrendFieldId);
            var $sparkInstance = $(watchableTrendFieldId + "_sparkline_svg");
            // create a new sparkline instance if not already existing
            if ($sparkInstance.length === 0) {
                this.createWatchableTrendView($trendCell, watchableTrendData);
            }
            else {
                // update the trendline with new data
                this.updateWatchableTrendView($trendCell, watchableTrendData);
            }
        };
        /**
         * updates the trend view with new data
         *
         * @private
         * @param {JQuery<HTMLElement>} $trendCell
         * @param {number[]} watchableTrendData
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.updateWatchableTrendView = function ($trendCell, watchableTrendData) {
            $trendCell.ejSparkline({
                dataSource: watchableTrendData,
            });
        };
        /**
         *
         * creates a new instance of a watchable trend view
         * @private
         * @param {JQuery<HTMLElement>} jqtrendCell
         * @param {number[]} watchableTrendData
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.createWatchableTrendView = function ($trendCell, watchableTrendData) {
            $trendCell.ejSparkline({
                dataSource: watchableTrendData,
                width: 2,
                stroke: "#C4C4C4",
                type: "line",
                size: { height: 28, width: $trendCell.width() },
                isResponsive: false,
                padding: 2,
            });
        };
        /**
         * Observes the watchables for changes
         *
         * @param {MappCockpitComponentParameter[]} watchableParameters
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.observeWatchables = function (watchableParameters) {
            // invoke observing the watchables
            mappCockpitComponent_1.MappCockpitComponentParameter.observeParameterValueChanges(this, watchableParameters);
            // observe watchables inside each watchable state expression
            this.observeWatchablesInStateExpression(watchableParameters);
        };
        /**
         * called after changes of observables
         *
         * @param {Observable[]} changedObservables
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.onObservablesChanged = function (changedObservables) {
            var _this = this;
            console.log("onObservablesChanged: %o %o", this, changedObservables);
            changedObservables.forEach(function (observable) {
                if (observable.property === "Value") {
                    var watchableParameter = observable.object;
                    _this.onWatchableValueChanged(watchableParameter);
                }
            });
        };
        /**
         * Send watchables to state expression to be observed
         *
         * @private
         * @param {MappCockpitComponentParameter[]} watchableParameters
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.observeWatchablesInStateExpression = function (watchableParameters) {
            var _this = this;
            this._watchableStateParameters.forEach(function (state) {
                var observedWatchables = watchableParameters.filter(function (watchable) { return state.stateExpression.watchableMapping.has(watchable.browseName); });
                state.stateExpression.observeWatchables(observedWatchables);
                //attach event listener
                state.stateExpression.eventIconUpdated.attach(_this._watchableIconUpdateHandler);
            });
        };
        /**
         * Handles the value change of a watchable parameter
         *
         * @private
         * @param {MappCockpitComponentParameter} watchableParameter
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.onWatchableValueChanged = function (watchableParameter) {
            // refresh the value field.
            this.refreshWatchableValueField(watchableParameter);
        };
        /**
         * Called when watchable icon is updated
         *
         * @private
         * @param {*} sender
         * @param {{name: string, watchableIcon: WatchableIcon}} args
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.onWatchableIconUpdated = function (sender, args) {
            this._toolbar.updateIcons(args.name, args.watchableIcon);
        };
        /**
         * Adds a new value to the parameters trend buffer
         *
         * @private
         * @param {MappCockpitComponentParameter} watchableParameter
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.addWatchableTrendValue = function (watchableParameter) {
            // filter numbers and boolean values to be recorded
            if (typeof watchableParameter.value === "number" || typeof watchableParameter.value === "boolean") {
                this._watchableTrendValues[watchableParameter.browseName].push(watchableParameter.value);
            }
        };
        /**
         * activates WatchablesWidget
         *
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.activate = function () {
            console.log("WatchablesWidget activated");
            mappCockpitComponent_1.MappCockpitComponentParameter.activateComponentModelItems(this, this._watchableParameters);
        };
        /**
         * deactivates WatchablesWidget
         *
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.deactivate = function () {
            console.log("WatchablesWidget deactivated");
            mappCockpitComponent_1.MappCockpitComponentParameter.deactivateComponentModelItems(this, this._watchableParameters);
        };
        /**
         * disposes WatchablesWidget
         *
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.dispose = function () {
            var _this = this;
            this.stopSamplingTimer();
            this.stopTrendTimer();
            mappCockpitComponent_1.MappCockpitComponentParameter.unobserveComponentModelItems(this, this._watchableParameters);
            // detach event listeners
            this._watchableStateParameters.forEach(function (state) {
                state.stateExpression.eventIconUpdated.detach(_this._watchableIconUpdateHandler);
            });
            _super.prototype.dispose.call(this);
        };
        return WatchablesWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.WatchablesWidget = WatchablesWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F0Y2hhYmxlc1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy93YXRjaGFibGVzV2lkZ2V0L3dhdGNoYWJsZXNXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZUEsdURBQXVEO0lBQ3ZELElBQU0sa0JBQWtCLEdBQUcsaUJBQWlCLENBQUM7SUFDN0MsSUFBTSxrQkFBa0IsR0FBRyxpQkFBaUIsQ0FBQztJQUM3Qzs7Ozs7T0FLRztJQUNIO1FBQStCLG9DQUFrQjtRQUFqRDtZQUFBLHFFQTBtQkM7WUF6bUJHLHNDQUFzQztZQUM5QiwwQkFBb0IsR0FBb0MsRUFBRSxDQUFDO1lBQ25FLDBFQUEwRTtZQUNsRSwrQkFBeUIsR0FBZ0MsRUFBRSxDQUFDO1lBQ3BFLDJDQUEyQztZQUNuQywyQkFBcUIsR0FBRyxFQUFFLENBQUM7WUFDbkMsd0NBQXdDO1lBQ2hDLG9CQUFjLEdBQVcsS0FBSyxDQUFDO1lBQ3ZDLGlFQUFpRTtZQUN6RCw0QkFBc0IsR0FBVSxHQUFHLENBQUM7WUFDNUMsd0NBQXdDO1lBQ2hDLDhCQUF3QixHQUFVLEdBQUcsQ0FBQztZQUM5QywwQ0FBMEM7WUFDbEMsNkJBQXVCLEdBQXFCLFNBQVMsQ0FBQztZQUM5RCx5Q0FBeUM7WUFDakMsMkJBQXFCLEdBQXFCLENBQUMsQ0FBQyxDQUFDO1lBSTdDLGlDQUEyQixHQUFHLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBRyxPQUFBLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQXhDLENBQXdDLENBQUM7O1FBc2xCbEcsQ0FBQztRQXBsQkc7Ozs7O1dBS0c7UUFDSCw2Q0FBa0IsR0FBbEI7WUFDSSxPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUM7UUFFRCxzQ0FBVyxHQUFYO1lBQ0ksaUJBQU0sV0FBVyxXQUFFLENBQUM7WUFFcEIsaUJBQU0s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IDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2xpYnMvdWkvVHlwZXMvZWoud2ViLmFsbC5kLnRzXCIgLz5cclxuaW1wb3J0IHsgRG9tSGVscGVyIH0gZnJvbSBcIi4uL2NvbW1vbi9kb21IZWxwZXJcIjtcclxuaW1wb3J0IHsgSVdhdGNoYWJsZXNXaWRnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3dhdGNoYWJsZXNXaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVVpQmluZGluZyB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy93aWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgV2F0Y2hhYmxlc0dyaWRUb29sYmFyIH0gZnJvbSBcIi4vd2F0Y2hhYmxlc0dyaWRUb29sYmFyXCI7XHJcbmltcG9ydCB7IFRyZWVHcmlkV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vdHJlZUdyaWRXaWRnZXRCYXNlXCI7XHJcblxyXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvcHJvcGVydHlcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIsIE1hcHBDb2NrcGl0U3RhdGVQYXJhbWV0ZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBXYXRjaGFibGVWYWx1ZVRyZW5kQnVmZmVyIH0gZnJvbSBcIi4vd2F0Y2hhYmxlVmFsdWVCdWZmZXJcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvaW50ZXJmYWNlcy9vYnNlcnZlclwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiB9IGZyb20gXCIuL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IElJbWFnZVByb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL2ltYWdlUHJvdmlkZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgV2F0Y2hhYmxlSWNvbiB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3N0YXRlRXhwcmVzc2lvbi93YXRjaGFibGVJY29uXCI7XHJcblxyXG4vLyBkZWZpbmVzIHRoZSBiYXNlIGlkIGZvciB0aGUgd2F0Y2hhYmxlIHZhbHVlIHRlbXBsYXRlXHJcbmNvbnN0IFdBVENIQUJMRV9WQUxVRV9JRCA9IFwid2F0Y2hhYmxlVmFsdWVfXCI7XHJcbmNvbnN0IFdBVENIQUJMRV9UUkVORF9JRCA9IFwid2F0Y2hhYmxlVHJlbmRfXCI7XHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIHRoZSB3aWRnZXQgZm9yIGRpc3BsYXlpbmcgdGhlIHdhdGNoYWJsZXMgYW5kIHRoZWlyIHZhbHVlcyB3aXRoIGZhc3QgdXBkYXRlLiBJdCBpbmNsdWRlcyBkaXNwbGF5aW5nIGEgc2hvcnQgdmFsdWUgdHJlbmQuXHJcbiAqXHJcbiAqIEBjbGFzcyBXYXRjaGFibGVzV2lkZ2V0XHJcbiAqIEBleHRlbmRzIHtUcmVlR3JpZFdpZGdldEJhc2V9XHJcbiAqL1xyXG5jbGFzcyBXYXRjaGFibGVzV2lkZ2V0IGV4dGVuZHMgVHJlZUdyaWRXaWRnZXRCYXNlIGltcGxlbWVudHMgSVdhdGNoYWJsZXNXaWRnZXQge1xyXG4gICAgLy8gaG9sZHMgYSBsaXN0IG9mIHBhcmFtZXRlcnMgdG8gd2F0Y2hcclxuICAgIHByaXZhdGUgX3dhdGNoYWJsZVBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10gPSBbXTtcclxuICAgIC8vIGhvbGRzIGEgbGlzdCBvZiB3YXRjaGFibGUgcGFyYW1ldGVycyB0aGF0IHVzZSBhbiBpY29uIHRvIHNob3cgaXRzIHN0YXRlXHJcbiAgICBwcml2YXRlIF93YXRjaGFibGVTdGF0ZVBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0U3RhdGVQYXJhbWV0ZXJbXSA9IFtdO1xyXG4gICAgLy8gaG9sZHMgYSB0cmVuZCBidWZmZXIgZm9yIGV2ZXJ5IHBhcmFtZXRlclxyXG4gICAgcHJpdmF0ZSBfd2F0Y2hhYmxlVHJlbmRWYWx1ZXMgPSB7fTtcclxuICAgIC8vIHNwZWNpZmllcyB0aGUgdGltZSBzcGFuIG9mIHRoZSB0cmVuZC5cclxuICAgIHByaXZhdGUgX3RyZW5kVGltZVNwYW46IG51bWJlciA9IDYwMDAwO1xyXG4gICAgLy8gc3BlY2lmaWVzIHRoZSBwZXJpb2QgZm9yIHNhbXBsaW5nIHRoZSBwYXJhbWV0ZXIgdmFsdWVzIChtc2VjcylcclxuICAgIHByaXZhdGUgX3RyZW5kU2FtcGxpbmdJbnRlcnZhbDpudW1iZXIgPSAxMDA7XHJcbiAgICAvLyBzcGVjaWZpZXMgdGhlIHVpIHJlZnJlc2ggcmF0ZSAobXNlY3MpXHJcbiAgICBwcml2YXRlIF90cmVuZFJlZnJlc2hpbmdJbnRlcnZhbDpudW1iZXIgPSA1MDA7XHJcbiAgICAvLyBob2xkcyB0aGUgdGltZXIgaWQgZm9yIHRoZSBzYW1wbGUgdGltZXJcclxuICAgIHByaXZhdGUgX3dhdGNoYWJsZVNhbXBsZVRpbWVySWQ6IG51bWJlcnx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAvLyBob2xkcyB0aGUgdGltZXIgaWQgZm9yIHRoZSB0cmVuZCB0aW1lclxyXG4gICAgcHJpdmF0ZSBfd2F0Y2hhYmxUcmVuZFRpbWVySWQ6IG51bWJlcnx1bmRlZmluZWQgPSAtMTtcclxuICAgIC8vIGhvbGRzIHRoZSB0b29sYmFyIGNsYXNzXHJcbiAgICBwcm90ZWN0ZWQgX3Rvb2xiYXIhOiBXYXRjaGFibGVzR3JpZFRvb2xiYXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfd2F0Y2hhYmxlSWNvblVwZGF0ZUhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpPT50aGlzLm9uV2F0Y2hhYmxlSWNvblVwZGF0ZWQoc2VuZGVyLGFyZ3MpO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgdGhlIGhlaWdodCBvZiB0aGUgaGVhZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGRlZmluZUhlYWRlckhlaWdodCgpOiBudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIDMwO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVkKCl7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZWQoKTtcclxuICAgICAgICBcclxuICAgICAgICBzdXBlci5zZXRIZWFkZXJDb250ZW50KFwiV2F0Y2hcIik7XHJcblxyXG4gICAgICAgIC8vIFNldCBkeW5hbWljIGNvbHVtbiBzZXR0aW5nc1xyXG4gICAgICAgIHN1cGVyLnNldER5bmFtaWNDb2x1bW4oMywgMTAwKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldERlZmF1bHREZWZpbml0aW9uKG5ldyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbigpKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgd2F0Y2hhYmxlIHBhcmFtZXRlcnMgYXMgdGhlIGRhdGEgc291cmNlIGZvciB0aGUgd2F0Y2hhYmxlcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IHdhdGNoYWJsZVBhcmFtZXRlcnMod2F0Y2hhYmxlUGFyYW1ldGVyc1BhcmFtZXRlcnNMaW5rOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4+KSB7XHJcbiAgICAgICAgdGhpcy5fd2F0Y2hhYmxlUGFyYW1ldGVycyA9IHdhdGNoYWJsZVBhcmFtZXRlcnNQYXJhbWV0ZXJzTGluay52YWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm9uQ29tcG9uZW50UGFyYW1ldGVyc1VwZGF0ZWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCB3YXRjaGFibGVTdGF0ZVBhcmFtZXRlcnMod2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXJzOiBBcnJheTxNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyPikge1xyXG4gICAgICAgIHRoaXMuX3dhdGNoYWJsZVN0YXRlUGFyYW1ldGVycyA9IHdhdGNoYWJsZVN0YXRlUGFyYW1ldGVycztcclxuICAgICAgICB0aGlzLmFkZFRyZWVHcmlkSWNvbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb21wb25lbnQgcGFyYW1ldGVycyBoYXZlIGJlZW4gdXBmYXRlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IHdhdGNoYWJsZVBhcmFtZXRlcnNcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25Db21wb25lbnRQYXJhbWV0ZXJzVXBkYXRlZCgpIHtcclxuICAgICAgICAvLyBjcmVhdGUgdHJlbmQgYnVmZmVycyBmb3IgdGhlIHBhcmFtZXRlcnNcclxuICAgICAgICB0aGlzLmNyZWF0ZVdhdGNoYWJsZVRyZW5kQnVmZmVycyh0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgICAgICAvLyBzdGFydCB3YXRjaGFibGUgdHJlbmQgdGltZXJcclxuICAgICAgICB0aGlzLnN0YXJ0V2F0Y2hhYmxlc1RyZW5kKCk7XHJcbiAgICAgICAgLy8gcG9wdWxhdGUgdGhlIHdhdGNoYWJsZXMgd2lkZ2V0XHJcbiAgICAgICAgdGhpcy5wb3B1bGF0ZVdhdGNoYWJsZXNXaWRnZXQoKTtcclxuICAgICAgICAvLyB1cGRhdGUgdHJlZWdyaWQncyB0b29sYmFyIEljb25zXHJcbiAgICAgICAgdGhpcy51cGRhdGVUb29sYmFySWNvbnMoKTtcclxuICAgICAgICAvLyBhZnRlciBwb3B1bGF0aW5nIHRoZSB3YXRjaGFibGVzIHdlIHN0YXJ0IG9ic2VydmluZyB2YWx1ZSBjaGFuZ2VzIG9mIHRoZSB3YXRjaGFibGVzXHJcbiAgICAgICAgdGhpcy5vYnNlcnZlV2F0Y2hhYmxlcyh0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0YXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBzdGFydFdhdGNoYWJsZXNUcmVuZCgpOiBhbnkge1xyXG4gICAgICAgIHRoaXMuc3RhcnRTYW1wbGluZ1dhdGNoYWJsZXMoKTtcclxuICAgICAgICB0aGlzLnN0YXJ0UmVmcmVzaGluZ1dhdGNoYWJsZXNUcmVuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RhcnRzIHNhbXBsaW5nIHRoZSB3YXRjaGFibGVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhcnRTYW1wbGluZ1dhdGNoYWJsZXMoKSB7ICAgICAgICBcclxuICAgICAgICAvLyBzdG9wIGFuIGV2ZW50dWFsbHkgcnVubmluZyB0aW1lciBiZWZvcmUgc3RhcnRpbmcgYSBuZXcgb25lXHJcbiAgICAgICAgdGhpcy5zdG9wU2FtcGxpbmdUaW1lcigpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fd2F0Y2hhYmxlU2FtcGxlVGltZXJJZCA9ICBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2FtcGxlV2F0Y2hhYmxlcyh0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgICAgICB9LCB0aGlzLl90cmVuZFNhbXBsaW5nSW50ZXJ2YWwsdGhpcy5fd2F0Y2hhYmxlU2FtcGxlVGltZXJJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9wcyB0aGUgc2FtcGxpbmcgdGltZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdG9wU2FtcGxpbmdUaW1lcigpIHtcclxuICAgICAgICBpZiAodGhpcy5fd2F0Y2hhYmxlU2FtcGxlVGltZXJJZCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX3dhdGNoYWJsZVNhbXBsZVRpbWVySWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0YXJ0cyByZWZyZXNoaW5nIHRoZSB3YXRjaGFibGVzIHRyZW5kXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhcnRSZWZyZXNoaW5nV2F0Y2hhYmxlc1RyZW5kKCkge1xyXG5cclxuICAgICAgICAvLyBzdG9wIGFuIGV2ZW50dWFsbHkgcnVubmluZyB0aW1lciBiZWZvcmUgc3RhcnRpbmcgYSBuZXcgb25lXHJcbiAgICAgICAgdGhpcy5zdG9wVHJlbmRUaW1lcigpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fd2F0Y2hhYmxUcmVuZFRpbWVySWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFdhdGNoYWJsZXNUcmVuZCh0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgICAgICB9LCB0aGlzLl90cmVuZFJlZnJlc2hpbmdJbnRlcnZhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9wcyB0aGUgdHJlbmQgdGltZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdG9wVHJlbmRUaW1lcigpIHtcclxuICAgICAgICBpZiAodGhpcy5fd2F0Y2hhYmxUcmVuZFRpbWVySWQpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl93YXRjaGFibFRyZW5kVGltZXJJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIHRyZW5kIGJ1ZmZlciBmb3IgZXZlcnkgd2F0Y2hhYmxlIHBhcmFtZXRlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZVdhdGNoYWJsZVRyZW5kQnVmZmVycyh3YXRjaGFibGVQYXJhbWV0ZXJzOk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pIHtcclxuICAgICAgICB3YXRjaGFibGVQYXJhbWV0ZXJzLmZvckVhY2goKHdhdGNoYWJsZVBhcmFtZXRlcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl93YXRjaGFibGVUcmVuZFZhbHVlc1t3YXRjaGFibGVQYXJhbWV0ZXIuYnJvd3NlTmFtZV0gPSBXYXRjaGFibGVWYWx1ZVRyZW5kQnVmZmVyLmNyZWF0ZTxhbnk+KHRoaXMuX3RyZW5kVGltZVNwYW4vdGhpcy5fdHJlbmRTYW1wbGluZ0ludGVydmFsKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogcmVzaXplcyB0aGUgd2F0Y2hhYmxlcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgLy8gUmVmcmVzaCB3YXRjaGFibGUgdmFsdWVzIGFmdGVyIHJlc2l6ZSAodHJlZWdyaWQgc2V0cyB0aGUgZGF0YSB0byBcIjBcIiBhZnRlciByZXNpemUpXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoV2F0Y2hhYmxlc1ZhbHVlcyh0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogY3JlYXRlcyB0aGUgdHJlZSBncmlkIGZvciB0aGUgd2F0Y2hhYmxlcyBpbmZvcm1hdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlVHJlZUdyaWQoKSB7XHJcbiAgICAgICAgJCh0aGlzLm1haW5EaXYpLmVqVHJlZUdyaWQoe1xyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkVG9vbGJhclN1cHBvcnQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2U6IHVuZGVmaW5lZCxcclxuXHJcbiAgICAgICAgICAgIGFsbG93U2VsZWN0aW9uOiBmYWxzZSxcclxuICAgICAgICAgICAgaXNSZXNwb25zaXZlOiBmYWxzZSxcclxuICAgICAgICAgICAgZWRpdFNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICBhbGxvd0VkaXRpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYWxsb3dBZGRpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYWxsb3dEZWxldGluZyA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2hvd0RlbGV0ZUNvbmZpcm1EaWFsb2cgIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzaG93Q29uZmlybURpYWxvZyAgOiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgY3JlYXRlOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZENyZWF0ZWQoKSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjb2x1bW4gZGVmaW5pdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpOiB7fXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb2x1bW5zOiBbXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImRpc3BsYXlOYW1lXCIsIGhlYWRlclRleHQ6IFwiTmFtZVwiLCBpc1ByaW1hcnlLZXk6IHRydWUsIHdpZHRoOiBcIjIwMFwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImRpc3BsYXlWYWx1ZVwiLCBoZWFkZXJUZXh0OiBcIlZhbHVlXCIsIHdpZHRoOiBcIjIwMFwiLCBpc1RlbXBsYXRlQ29sdW1uOiB0cnVlLCB0ZW1wbGF0ZTogXCI8ZGl2IHN0eWxlPSdwYWRkaW5nLWxlZnQ6IDIwcHgnIGlkPSdcIiArIHRoaXMubWFpbkRpdklkICsgV0FUQ0hBQkxFX1ZBTFVFX0lEICsgXCJ7ezp1aUlkfX0nPjA8L2Rpdj5cIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJlbmdpbmVlcmluZ1VuaXRcIiwgaGVhZGVyVGV4dDogXCJVbml0XCIsIHdpZHRoOiBcIjEwMFwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcIndhdGNoYWJsZVRyZW5kXCIsIGhlYWRlclRleHQ6IFwiVHJlbmRcIiwgaXNUZW1wbGF0ZUNvbHVtbjogdHJ1ZSwgdGVtcGxhdGU6IFwiPGRpdiBpZD0nXCIgKyB0aGlzLm1haW5EaXZJZCArIFdBVENIQUJMRV9UUkVORF9JRCArIFwie3s6dWlJZH19Jz48L2Rpdj5cIiB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIHJlc2l6ZSBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpOiB7fXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhbGxvd0NvbHVtblJlc2l6ZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplU2V0dGluZ3M6IHsgY29sdW1uUmVzaXplTW9kZTogZWouVHJlZUdyaWQuQ29sdW1uUmVzaXplTW9kZS5GaXhlZENvbHVtbnMgfSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplZDogKGFyZ3MpID0+IHRoaXMuY29sdW1uUmVzaXplZChhcmdzKSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIHRvb2xiYXIgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCk6IHt9e1xyXG4gICAgICAgIGxldCBpbWFnZVByb3ZpZGVyID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLkltYWdlUHJvdmlkZXJJZCkgYXMgSUltYWdlUHJvdmlkZXI7XHJcbiAgICAgICAgdGhpcy5fdG9vbGJhciA9IG5ldyBXYXRjaGFibGVzR3JpZFRvb2xiYXIodGhpcy5tYWluRGl2LCBpbWFnZVByb3ZpZGVyKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b29sYmFyU2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgIHNob3dUb29sYmFyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tVG9vbGJhckl0ZW1zOiB0aGlzLl90b29sYmFyLmdldEN1c3RvbVRvb2xiYXJzKClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29sdW1uUmVzaXplZChhcmdzKXtcclxuICAgICAgICBzdXBlci5yZXNpemVEeW5hbWljQ29sdW1uKGFyZ3MuY29sdW1uSW5kZXgsIGFyZ3MubW9kZWwpO1xyXG4gICAgICAgIC8vIFJlZnJlc2ggd2F0Y2hhYmxlIHZhbHVlcyBhZnRlciByZXNpemUgKHRyZWVncmlkIHNldHMgdGhlIGRhdGEgdG8gXCIwXCIgYWZ0ZXIgcmVzaXplKVxyXG4gICAgICAgIHRoaXMucmVmcmVzaFdhdGNoYWJsZXNWYWx1ZXModGhpcy5fd2F0Y2hhYmxlUGFyYW1ldGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZENyZWF0ZWQoKXtcclxuICAgICAgICAvLyBTZXRzIHRoZSBjdXN0b20gdG9vbGJhciBpY29uc1xyXG4gICAgICAgICB0aGlzLl90b29sYmFyLnNldFN0eWxlRm9yVG9vbGJhckljb25zKCk7XHJcblxyXG4gICAgICAgIC8vIGRpc2FibGUgZHVtbXkgYnV0dG9uIGFmdGVyIGNyZWF0aW9uXHJcbiAgICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzYWJsZUR1bW15QnV0dG9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgaWNvbnMgdG8gdGhlIHRvb2xiYXIgdHJlZWdyaWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRUcmVlR3JpZEljb25zKCkge1xyXG4gICAgICAgIHRoaXMuX3dhdGNoYWJsZVN0YXRlUGFyYW1ldGVycy5mb3JFYWNoKChzdGF0ZVBhcmFtZXRlcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl90b29sYmFyLmFkZEljb24oc3RhdGVQYXJhbWV0ZXIpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNhYmxlIGJ1dHRvbiBwcm9wZXJ0aWVzIGZyb20gaWNvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVUb29sYmFySWNvbnMoKSB7XHJcbiAgICAgICAgdGhpcy5fdG9vbGJhci5oaWRlSWNvbignZW1wdHknKTtcclxuICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVJY29ucygpO1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIuYWRkRXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgICAgICB0aGlzLl90b29sYmFyLnRvb2x0aXBFeHRlbnNpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBtYXJrcyB0aGUgcGFyYW1ldGVycyB3aXRoIGFuIGlkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSB1aSBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IHdhdGNoYWJsZVBhcmFtZXRlcnNcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0V2F0Y2hhYmxlc1VpSWQod2F0Y2hhYmxlUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2F0Y2hhYmxlUGFyYW1ldGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCB3YXRjaGFibGVQYXJhbWV0ZXIgPSB3YXRjaGFibGVQYXJhbWV0ZXJzW2ldO1xyXG4gICAgICAgICAgICAoPElVaUJpbmRpbmc+PGFueT53YXRjaGFibGVQYXJhbWV0ZXIpLnVpSWQgPSBpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBvcHVsYXRlIHRoZSB3aWRnZXQgd2l0aCBpdHMgc3BlY2lmaWMgZGF0YSBjb250ZW50LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHBvcHVsYXRlV2F0Y2hhYmxlc1dpZGdldCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNldFdhdGNoYWJsZXNVaUlkKHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnMpO1xyXG5cclxuICAgICAgICAkKHRoaXMubWFpbkRpdikuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2U6IHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnMsXHJcbiAgICAgICAgICAgIHRvb2xiYXJTZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgY3VzdG9tVG9vbGJhckl0ZW1zOiB0aGlzLl90b29sYmFyLmdldEN1c3RvbVRvb2xiYXJzKClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNhbXBsZXMgdGhlIHdhdGNoYWJsZSB2YWx1ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSB3YXRjaGFibGVQYXJhbWV0ZXJzXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNhbXBsZVdhdGNoYWJsZXMod2F0Y2hhYmxlUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSkge1xyXG4gICAgICAgIHdhdGNoYWJsZVBhcmFtZXRlcnMuZm9yRWFjaCgod2F0Y2hhYmxlUGFyYW1ldGVyKT0+e1xyXG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIHRyZW5kIGJ1ZmZlclxyXG4gICAgICAgICAgICB0aGlzLmFkZFdhdGNoYWJsZVRyZW5kVmFsdWUod2F0Y2hhYmxlUGFyYW1ldGVyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZnJlc2hlcyB0aGUgd2F0Y2hhYmxlcyB0cmVuZCBmaWVsZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSB3YXRjaGFibGVQYXJhbWV0ZXJzXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlZnJlc2hXYXRjaGFibGVzVHJlbmQod2F0Y2hhYmxlUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSkge1xyXG4gICAgICAgIHdhdGNoYWJsZVBhcmFtZXRlcnMuZm9yRWFjaCgod2F0Y2hhYmxlUGFyYW1ldGVyKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB3YXRjaGFibGVUcmVuZEVsZW1lbnQgPSB0aGlzLmdldFdhdGNoYWJsZVRyZW5kRWxlbWVudCh3YXRjaGFibGVQYXJhbWV0ZXIpO1xyXG4gICAgICAgICAgICBpZiAod2F0Y2hhYmxlVHJlbmRFbGVtZW50ICYmIERvbUhlbHBlci5pc0VsZW1lbnRJblZpZXdwb3J0KHdhdGNoYWJsZVRyZW5kRWxlbWVudCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCB3YXRjaGFibGVUcmVuZEZpZWxkSWQgPSBcIiNcIiArIHdhdGNoYWJsZVRyZW5kRWxlbWVudC5pZDtcclxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgdHJlbmQgZmllbGRcclxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaFdhdGNoYWJsZVRyZW5kRmllbGQod2F0Y2hhYmxlUGFyYW1ldGVyLHdhdGNoYWJsZVRyZW5kRmllbGRJZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlZnJlc2hlcyB0aGUgY29udGVudCBvZiB0aGUgd2F0Y2hhYmxlIHZhbHVlIGZpZWxkc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IHdhdGNoYWJsZVBhcmFtZXRlcnNcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVmcmVzaFdhdGNoYWJsZXNWYWx1ZXMod2F0Y2hhYmxlUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSkge1xyXG4gICAgICAgIHdhdGNoYWJsZVBhcmFtZXRlcnMuZm9yRWFjaCgod2F0Y2hhYmxlUGFyYW1ldGVyKT0+e3RoaXMucmVmcmVzaFdhdGNoYWJsZVZhbHVlRmllbGQod2F0Y2hhYmxlUGFyYW1ldGVyKX0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhbiBlbGVtZW50IGNvcnJlc3BvbmRpbmcgdG8gdGhlIHBhcmFtZXRlciB0byBiZSB1c2VkIGZvciBkaXNwbGF5aW5nIHRoZSB3YXRjaGFibGUgdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcn0gd2F0Y2hhYmxlUGFyYW1ldGVyXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRXYXRjaGFibGVWYWx1ZUVsZW1lbnQod2F0Y2hhYmxlUGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcik6IEVsZW1lbnQgfCBudWxsIHtcclxuICAgICAgICB2YXIgbXlTdWJEaXYgPSB0aGlzLm1haW5EaXYucXVlcnlTZWxlY3RvcihcIiNcIiArIHRoaXMubWFpbkRpdklkICsgV0FUQ0hBQkxFX1ZBTFVFX0lEICsgKDxJVWlCaW5kaW5nPjxhbnk+d2F0Y2hhYmxlUGFyYW1ldGVyKS51aUlkKTtcclxuICAgICAgICByZXR1cm4gbXlTdWJEaXY7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGFuIGVsZW1lbnQgY29ycmVzcG9uZGluZyB0byB0aGUgcGFyYW1ldGVyIHRvIGJlIHVzZWQgZm9yIGRpc3BsYXlpbmcgdGhlIHdhdGNoYWJsZSB0cmVuZCBsaW5lXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9IHdhdGNoYWJsZVBhcmFtZXRlclxyXG4gICAgICogQHJldHVybnMgeyhIVE1MRWxlbWVudCB8IG51bGwpfVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRXYXRjaGFibGVUcmVuZEVsZW1lbnQod2F0Y2hhYmxlUGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcik6IEVsZW1lbnQgfCBudWxsIHtcclxuICAgICAgICB2YXIgbXlTdWJEaXYgPSB0aGlzLm1haW5EaXYucXVlcnlTZWxlY3RvcihcIiNcIiArIHRoaXMubWFpbkRpdklkICsgV0FUQ0hBQkxFX1RSRU5EX0lEICsgKDxJVWlCaW5kaW5nPjxhbnk+d2F0Y2hhYmxlUGFyYW1ldGVyKS51aUlkKTtcclxuICAgICAgICByZXR1cm4gbXlTdWJEaXY7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB1cGRhdGVzIGEgd2F0Y2hhYmxlIGZpZWxkIHdpdGggdGhlIGN1cnJlbnQgdmFsdWVzIG9mIHRoZSBjb3JyZXNwb25kaW5nIHBhcmFtZXRlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyfSB3YXRjaGFibGVQYXJhbWV0ZXJcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVmcmVzaFdhdGNoYWJsZVZhbHVlRmllbGQod2F0Y2hhYmxlUGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcikge1xyXG4gICAgICAgIC8vIGdldCB0aGUgY29ycmVzcG9uZGluZyB1aSBlbGVtZW50XHJcbiAgICAgICAgbGV0IHdhdGNoYWJsZVZhbHVlRWxlbWVudCA9ICB0aGlzLmdldFdhdGNoYWJsZVZhbHVlRWxlbWVudCh3YXRjaGFibGVQYXJhbWV0ZXIpO1xyXG5cclxuICAgICAgICAvLyBsZXQgbWluVmFsdWUgPSB0aGlzLl93YXRjaGFibGVUcmVuZFZhbHVlc1t3YXRjaGFibGVQYXJhbWV0ZXIuYnJvd3NlTmFtZV0uX21pblZhbHVlO1xyXG4gICAgICAgIC8vIGxldCBtYXhWYWx1ZSA9IHRoaXMuX3dhdGNoYWJsZVRyZW5kVmFsdWVzW3dhdGNoYWJsZVBhcmFtZXRlci5icm93c2VOYW1lXS5fbWF4VmFsdWU7XHJcblxyXG4gICAgICAgIC8vIGxldCB2YWx1ZVN0cmluZzogc3RyaW5nID0gd2F0Y2hhYmxlUGFyYW1ldGVyLmRpc3BsYXlWYWx1ZS50b1N0cmluZygpICsgXCIoXCIgKyBtaW5WYWx1ZSArIFwiLVwiICsgbWF4VmFsdWUgKyBcIilcIjtcclxuICAgICAgICBsZXQgdmFsdWVTdHJpbmc6IHN0cmluZyA9IHdhdGNoYWJsZVBhcmFtZXRlci5kaXNwbGF5VmFsdWUudG9TdHJpbmcoKTtcclxuICAgICAgICBpZiAod2F0Y2hhYmxlVmFsdWVFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHdhdGNoYWJsZVZhbHVlRWxlbWVudC5pbm5lckhUTUwgPSB2YWx1ZVN0cmluZztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWZyZXNoZXMgdGhlIHZpc2libGUgdHJlbmQgZmlsZWQgY29udGVudFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9IHdhdGNoYWJsZVBhcmFtZXRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHdhdGNoYWJsZVRyZW5kRmllbGRJZFxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcmVmcmVzaFdhdGNoYWJsZVRyZW5kRmllbGQod2F0Y2hhYmxlUGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcix3YXRjaGFibGVUcmVuZEZpZWxkSWQ6c3RyaW5nICk6IGFueSB7XHJcbiAgICAgICAgbGV0IHdhdGNoYWJsZVRyZW5kRGF0YSA9IHRoaXMuZ2V0V2F0Y2hhYmxlVHJlbmRWYWx1ZXMod2F0Y2hhYmxlUGFyYW1ldGVyKTtcclxuICAgICAgICB0aGlzLnJlbmRlcldhdGNoYWJsZVRyZW5kKHdhdGNoYWJsZVRyZW5kRmllbGRJZCwgd2F0Y2hhYmxlVHJlbmREYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIHRyZW5kIHZhbHVlcyBmb3IgdGhlIHdhdGNoYWJsZSBwYXJhbWV0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcn0gd2F0Y2hhYmxlUGFyYW1ldGVyXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8YW55Pn1cclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0V2F0Y2hhYmxlVHJlbmRWYWx1ZXMod2F0Y2hhYmxlUGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcik6IEFycmF5PGFueT4ge1xyXG4gICAgICAgIGxldCB0cmVuZFZhbHVlcyA9IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLl93YXRjaGFibGVUcmVuZFZhbHVlc1t3YXRjaGFibGVQYXJhbWV0ZXIuYnJvd3NlTmFtZV0pIHtcclxuICAgICAgICAgICAgdHJlbmRWYWx1ZXMgPSB0aGlzLl93YXRjaGFibGVUcmVuZFZhbHVlc1t3YXRjaGFibGVQYXJhbWV0ZXIuYnJvd3NlTmFtZV0udmFsdWVzOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJlbmRWYWx1ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZW5kZXJzIGEgc2hvcnQgaGlzdG9yeSBvZiB0cmVuZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHdhdGNoYWJsZVRyZW5kRmllbGRJZFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJbXX0gd2F0Y2hhYmxlVHJlbmREYXRhXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZW5kZXJXYXRjaGFibGVUcmVuZCh3YXRjaGFibGVUcmVuZEZpZWxkSWQ6IHN0cmluZywgd2F0Y2hhYmxlVHJlbmREYXRhOiBudW1iZXJbXSkge1xyXG4gICAgICAgIC8vIGdldCB0aGUgdHJlbmQgY2VsbFxyXG4gICAgICAgIGxldCAkdHJlbmRDZWxsID0gJCh3YXRjaGFibGVUcmVuZEZpZWxkSWQpO1xyXG4gICAgICAgIGxldCAkc3BhcmtJbnN0YW5jZSA9ICQod2F0Y2hhYmxlVHJlbmRGaWVsZElkICsgXCJfc3BhcmtsaW5lX3N2Z1wiKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIGEgbmV3IHNwYXJrbGluZSBpbnN0YW5jZSBpZiBub3QgYWxyZWFkeSBleGlzdGluZ1xyXG4gICAgICAgIGlmICgkc3BhcmtJbnN0YW5jZS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVXYXRjaGFibGVUcmVuZFZpZXcoJHRyZW5kQ2VsbCwgd2F0Y2hhYmxlVHJlbmREYXRhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIHRyZW5kbGluZSB3aXRoIG5ldyBkYXRhXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlV2F0Y2hhYmxlVHJlbmRWaWV3KCR0cmVuZENlbGwsIHdhdGNoYWJsZVRyZW5kRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlcyB0aGUgdHJlbmQgdmlldyB3aXRoIG5ldyBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SlF1ZXJ5PEhUTUxFbGVtZW50Pn0gJHRyZW5kQ2VsbFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJbXX0gd2F0Y2hhYmxlVHJlbmREYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVdhdGNoYWJsZVRyZW5kVmlldygkdHJlbmRDZWxsOiBKUXVlcnk8SFRNTEVsZW1lbnQ+LCB3YXRjaGFibGVUcmVuZERhdGE6IG51bWJlcltdKSB7XHJcbiAgICAgICAgJHRyZW5kQ2VsbC5lalNwYXJrbGluZSh7XHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2U6IHdhdGNoYWJsZVRyZW5kRGF0YSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBjcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIGEgd2F0Y2hhYmxlIHRyZW5kIHZpZXdcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0pRdWVyeTxIVE1MRWxlbWVudD59IGpxdHJlbmRDZWxsXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcltdfSB3YXRjaGFibGVUcmVuZERhdGFcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlV2F0Y2hhYmxlVHJlbmRWaWV3KCR0cmVuZENlbGw6IEpRdWVyeTxIVE1MRWxlbWVudD4sIHdhdGNoYWJsZVRyZW5kRGF0YTogbnVtYmVyW10pIHtcclxuICAgICAgICAkdHJlbmRDZWxsLmVqU3BhcmtsaW5lKHtcclxuICAgICAgICAgICAgZGF0YVNvdXJjZTogd2F0Y2hhYmxlVHJlbmREYXRhLFxyXG4gICAgICAgICAgICB3aWR0aDogMixcclxuICAgICAgICAgICAgc3Ryb2tlOiBcIiNDNEM0QzRcIiwgICBcclxuICAgICAgICAgICAgdHlwZTogXCJsaW5lXCIsXHJcbiAgICAgICAgICAgIHNpemU6IHsgaGVpZ2h0OiAyOCwgd2lkdGg6ICR0cmVuZENlbGwud2lkdGgoKSB9LFxyXG4gICAgICAgICAgICBpc1Jlc3BvbnNpdmU6IGZhbHNlLFxyXG4gICAgICAgICAgICBwYWRkaW5nOiAyLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2JzZXJ2ZXMgdGhlIHdhdGNoYWJsZXMgZm9yIGNoYW5nZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IHdhdGNoYWJsZVBhcmFtZXRlcnNcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIG9ic2VydmVXYXRjaGFibGVzKHdhdGNoYWJsZVBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pIHtcclxuICAgICAgICAvLyBpbnZva2Ugb2JzZXJ2aW5nIHRoZSB3YXRjaGFibGVzXHJcbiAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIub2JzZXJ2ZVBhcmFtZXRlclZhbHVlQ2hhbmdlcyh0aGlzLHdhdGNoYWJsZVBhcmFtZXRlcnMpO1xyXG4gICAgICAgIC8vIG9ic2VydmUgd2F0Y2hhYmxlcyBpbnNpZGUgZWFjaCB3YXRjaGFibGUgc3RhdGUgZXhwcmVzc2lvblxyXG4gICAgICAgIHRoaXMub2JzZXJ2ZVdhdGNoYWJsZXNJblN0YXRlRXhwcmVzc2lvbih3YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNhbGxlZCBhZnRlciBjaGFuZ2VzIG9mIG9ic2VydmFibGVzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYnNlcnZhYmxlW119IGNoYW5nZWRPYnNlcnZhYmxlc1xyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uT2JzZXJ2YWJsZXNDaGFuZ2VkKGNoYW5nZWRPYnNlcnZhYmxlczogT2JzZXJ2YWJsZVtdKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJvbk9ic2VydmFibGVzQ2hhbmdlZDogJW8gJW9cIix0aGlzLGNoYW5nZWRPYnNlcnZhYmxlcyk7XHJcbiAgICAgICAgY2hhbmdlZE9ic2VydmFibGVzLmZvckVhY2goKG9ic2VydmFibGUpPT57XHJcbiAgICAgICAgICAgIGlmIChvYnNlcnZhYmxlLnByb3BlcnR5ID09PSBcIlZhbHVlXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCB3YXRjaGFibGVQYXJhbWV0ZXI6TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIgPSBvYnNlcnZhYmxlLm9iamVjdCBhcyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcjtcclxuICAgICAgICAgICAgICAgIHRoaXMub25XYXRjaGFibGVWYWx1ZUNoYW5nZWQod2F0Y2hhYmxlUGFyYW1ldGVyKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlbmQgd2F0Y2hhYmxlcyB0byBzdGF0ZSBleHByZXNzaW9uIHRvIGJlIG9ic2VydmVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gd2F0Y2hhYmxlUGFyYW1ldGVyc1xyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvYnNlcnZlV2F0Y2hhYmxlc0luU3RhdGVFeHByZXNzaW9uKHdhdGNoYWJsZVBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pIHtcclxuICAgICAgICB0aGlzLl93YXRjaGFibGVTdGF0ZVBhcmFtZXRlcnMuZm9yRWFjaCgoc3RhdGUpID0+IHtcclxuICAgICAgICAgICAgbGV0IG9ic2VydmVkV2F0Y2hhYmxlcyA9IHdhdGNoYWJsZVBhcmFtZXRlcnMuZmlsdGVyKCh3YXRjaGFibGUpID0+IHN0YXRlLnN0YXRlRXhwcmVzc2lvbi53YXRjaGFibGVNYXBwaW5nLmhhcyh3YXRjaGFibGUuYnJvd3NlTmFtZSkpXHJcbiAgICAgICAgICAgIHN0YXRlLnN0YXRlRXhwcmVzc2lvbi5vYnNlcnZlV2F0Y2hhYmxlcyhvYnNlcnZlZFdhdGNoYWJsZXMpO1xyXG4gICAgICAgICAgICAvL2F0dGFjaCBldmVudCBsaXN0ZW5lclxyXG4gICAgICAgICAgICBzdGF0ZS5zdGF0ZUV4cHJlc3Npb24uZXZlbnRJY29uVXBkYXRlZC5hdHRhY2godGhpcy5fd2F0Y2hhYmxlSWNvblVwZGF0ZUhhbmRsZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyB0aGUgdmFsdWUgY2hhbmdlIG9mIGEgd2F0Y2hhYmxlIHBhcmFtZXRlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyfSB3YXRjaGFibGVQYXJhbWV0ZXJcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25XYXRjaGFibGVWYWx1ZUNoYW5nZWQod2F0Y2hhYmxlUGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcikge1xyXG4gICAgICAgIC8vIHJlZnJlc2ggdGhlIHZhbHVlIGZpZWxkLlxyXG4gICAgICAgIHRoaXMucmVmcmVzaFdhdGNoYWJsZVZhbHVlRmllbGQod2F0Y2hhYmxlUGFyYW1ldGVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCB3aGVuIHdhdGNoYWJsZSBpY29uIGlzIHVwZGF0ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7e25hbWU6IHN0cmluZywgd2F0Y2hhYmxlSWNvbjogV2F0Y2hhYmxlSWNvbn19IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25XYXRjaGFibGVJY29uVXBkYXRlZChzZW5kZXIsIGFyZ3M6IHtuYW1lOiBzdHJpbmcsIHdhdGNoYWJsZUljb246IFdhdGNoYWJsZUljb259KSB7XHJcbiAgICAgICAgdGhpcy5fdG9vbGJhci51cGRhdGVJY29ucyhhcmdzLm5hbWUsIGFyZ3Mud2F0Y2hhYmxlSWNvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbmV3IHZhbHVlIHRvIHRoZSBwYXJhbWV0ZXJzIHRyZW5kIGJ1ZmZlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyfSB3YXRjaGFibGVQYXJhbWV0ZXJcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkV2F0Y2hhYmxlVHJlbmRWYWx1ZSh3YXRjaGFibGVQYXJhbWV0ZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyKSB7XHJcbiAgICAgICAgLy8gZmlsdGVyIG51bWJlcnMgYW5kIGJvb2xlYW4gdmFsdWVzIHRvIGJlIHJlY29yZGVkXHJcbiAgICAgICAgaWYgKHR5cGVvZiB3YXRjaGFibGVQYXJhbWV0ZXIudmFsdWUgPT09IFwibnVtYmVyXCIgfHwgdHlwZW9mIHdhdGNoYWJsZVBhcmFtZXRlci52YWx1ZSA9PT0gXCJib29sZWFuXCIpIHtcclxuICAgICAgICAgICAgKDxXYXRjaGFibGVWYWx1ZVRyZW5kQnVmZmVyPnRoaXMuX3dhdGNoYWJsZVRyZW5kVmFsdWVzW3dhdGNoYWJsZVBhcmFtZXRlci5icm93c2VOYW1lXSkucHVzaCg8bnVtYmVyPndhdGNoYWJsZVBhcmFtZXRlci52YWx1ZSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWN0aXZhdGVzIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWN0aXZhdGUoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIldhdGNoYWJsZXNXaWRnZXQgYWN0aXZhdGVkXCIpO1xyXG4gICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLmFjdGl2YXRlQ29tcG9uZW50TW9kZWxJdGVtcyh0aGlzLHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZGVhY3RpdmF0ZXMgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZWFjdGl2YXRlKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJXYXRjaGFibGVzV2lkZ2V0IGRlYWN0aXZhdGVkXCIpO1xyXG4gICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLmRlYWN0aXZhdGVDb21wb25lbnRNb2RlbEl0ZW1zKHRoaXMsdGhpcy5fd2F0Y2hhYmxlUGFyYW1ldGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkaXNwb3NlcyBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc3Bvc2UoKXtcclxuICAgICAgICB0aGlzLnN0b3BTYW1wbGluZ1RpbWVyKCk7XHJcbiAgICAgICAgdGhpcy5zdG9wVHJlbmRUaW1lcigpO1xyXG4gICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLnVub2JzZXJ2ZUNvbXBvbmVudE1vZGVsSXRlbXModGhpcyx0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgICAgICAvLyBkZXRhY2ggZXZlbnQgbGlzdGVuZXJzXHJcbiAgICAgICAgdGhpcy5fd2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXJzLmZvckVhY2goKHN0YXRlKSA9PiB7IFxyXG4gICAgICAgICAgICBzdGF0ZS5zdGF0ZUV4cHJlc3Npb24uZXZlbnRJY29uVXBkYXRlZC5kZXRhY2godGhpcy5fd2F0Y2hhYmxlSWNvblVwZGF0ZUhhbmRsZXIpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBXYXRjaGFibGVzV2lkZ2V0IH07Il19