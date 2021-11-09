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
define(["require", "exports", "../common/treeGridWidgetBase", "./view/traceConfigDatapointsTreeGridToolbar", "../../view/datapointDialog/datapointDialog", "../../view/datapointDialog/eventDatapointArgs", "../../models/diagnostics/trace/traceDataPoint", "./view/traceConfigDatapointsTreeGridCellEditEvents", "./model/traceConfigDatapointsDataModel", "./componentDefaultDefinition"], function (require, exports, treeGridWidgetBase_1, traceConfigDatapointsTreeGridToolbar_1, datapointDialog_1, eventDatapointArgs_1, traceDataPoint_1, traceConfigDatapointsTreeGridCellEditEvents_1, traceConfigDatapointsDataModel_1, componentDefaultDefinition_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the TraceConfigDatapointsWidget
     *
     * @class TraceConfigDatapointsWidget
     * @extends {TreeGridWidgetBase}
     */
    var TraceConfigDatapointsWidget = /** @class */ (function (_super) {
        __extends(TraceConfigDatapointsWidget, _super);
        function TraceConfigDatapointsWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._addDataPointHandler = function (sender, args) { return _this.onAddDatapoint(sender, args); };
            _this._dialogClosedHandler = function (sender, args) { return _this.onDialogClosed(sender, args); };
            _this._availableTraceDataPoints = new Array();
            return _this;
        }
        /**
         * Defines the height of the header
         *
         * @returns {number}
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.defineHeaderHeight = function () {
            return 30;
        };
        TraceConfigDatapointsWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        TraceConfigDatapointsWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            _super.prototype.setHeaderContent.call(this, "Data points");
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 3, 250);
        };
        /**
         * Updates and initializes the trace data points
         *
         * @private
         * @param {TraceDataPoint[]} traceDataPoints
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.initializeTraceDataPoints = function (traceDataPoints) {
            var traceConfigDatapointsDataModel = new traceConfigDatapointsDataModel_1.TraceConfigDatapointsDataModel();
            traceConfigDatapointsDataModel.initialize();
            this.dataModel = traceConfigDatapointsDataModel;
            traceConfigDatapointsDataModel.initData = traceDataPoints;
            this.updateToolbar();
        };
        /**
         * implements the model change handling
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} data
         * @returns {*}
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.handleModelChanged = function (sender, eventArgs) {
            var dataPoints = eventArgs.data;
            this.refreshDatapointsValues(dataPoints);
            this.updateToolbarButtonStates(dataPoints);
        };
        /**
         * handles the changes of observed items requested by 'observeDataModelItems'
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} data
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.handleModelItemsChanged = function (sender, eventArgs) {
            var dataPoints = this.dataModel.data;
            this.updateToolbarButtonStates(dataPoints);
            this.refreshDatapointsValues(dataPoints);
        };
        /** creates the datapoint selection dialog
         *
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.createDatapointsDialog = function () {
            var datapointDialogId = "datapointDialog";
            $(this.mainDiv).append("<div id='" + datapointDialogId + "'><div id='datapointContentRoot'></></>");
            datapointDialog_1.DatapointDialog.initialize(datapointDialogId);
        };
        /** catches the add datapoint event from the datapoint dialog
         * => adds or replaces the selected datapoint with the datapoint from the datapoint dialog
         *
         * @param {} sender
         * @param {EventDatapointArgs} args
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.onAddDatapoint = function (sender, args) {
            var treeGridObj = this.getTreeGridObject();
            var actualSelectionIndex = treeGridObj.model.selectedRowIndex;
            if (actualSelectionIndex == undefined) {
                actualSelectionIndex = -1;
            }
            var dataPoint = traceDataPoint_1.TraceDataPoint.createWithDataPointInfo(args.dataPointInfo);
            if (args.action == eventDatapointArgs_1.DatapointAction.add) {
                this._dataModel.addDatapoint(actualSelectionIndex, dataPoint);
            }
            else if (args.action == eventDatapointArgs_1.DatapointAction.replace) {
                this._dataModel.replaceDatapoint(actualSelectionIndex, dataPoint);
            }
            this.updateToolbar();
        };
        /** catches the dialog close event from the datapoint dialog
         * => detaches the dialog events
         *
         * @param {} sender
         * @param {} args
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.onDialogClosed = function (sender, args) {
            datapointDialog_1.DatapointDialog.eventAddDatapoint.detach(this._addDataPointHandler);
            datapointDialog_1.DatapointDialog.eventDialogClosed.detach(this._dialogClosedHandler);
        };
        /** creates the tree grid for the datapoint informations
         *
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.createTreeGrid = function () {
            var _this = this;
            this.createDatapointsDialog();
            $(this.mainDiv).ejTreeGrid(__assign(__assign(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), this.getTreeGridToolbarSupport()), this.getTreeGridCellEditSupport()), { selectionType: ej.TreeGrid.SelectionType.Multiple, editSettings: { allowEditing: true }, rowSelected: function (args) { return _this.treeGridRowSelected(args); }, actionBegin: function (args) { return _this.treeGridActionBegin(args); }, create: function (args) { return _this.treeGridCreated(); } }));
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: "dataPointName", headerText: "Data point", width: "350" },
                    { field: "componentName", headerText: "Component" },
                    { field: "name", headerText: "Name" },
                    { field: "description", headerText: "Description", width: "250" },
                ],
            };
        };
        /**
         * Returns the tree grid column resize settings
         *
         * @private
         * @returns {{}}
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.getTreeGridColumnResizeSupport = function () {
            var _this = this;
            return {
                allowColumnResize: true,
                columnResizeSettings: { columnResizeMode: ej.TreeGrid.ColumnResizeMode.FixedColumns },
                columnResized: function (args) { return _super.prototype.resizeDynamicColumn.call(_this, args.columnIndex, args.model); },
            };
        };
        /**
         * Returns the tree grid toolbar settings
         *
         * @private
         * @returns {{}}
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.getTreeGridToolbarSupport = function () {
            var _this = this;
            this._toolbar = new traceConfigDatapointsTreeGridToolbar_1.TraceConfigDatapointsTreeGridToolbar(this.mainDiv);
            return {
                toolbarSettings: {
                    showToolbar: true,
                    customToolbarItems: this._toolbar.getCustomToolbars(),
                },
                toolbarClick: function (args) { return _this.toolbarClick(args); }
            };
        };
        /**
         * Returns the tree grid cell edit settings
         *
         * @private
         * @returns {{}}
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.getTreeGridCellEditSupport = function () {
            var _this = this;
            var cellEditEvents = new traceConfigDatapointsTreeGridCellEditEvents_1.TraceConfigDatapointsTreeGridCellEditEvents();
            return {
                beginEdit: function (args) { return cellEditEvents.beginEdit(args); },
                endEdit: function (args) { return cellEditEvents.endEdit(args, _this._dataModel, _this._availableTraceDataPoints); },
            };
        };
        TraceConfigDatapointsWidget.prototype.treeGridCreated = function () {
            // Sets the custom toolbar icons
            this._toolbar.setStyleForToolbarIcons();
            this._toolbar.initToolbarStates();
        };
        TraceConfigDatapointsWidget.prototype.treeGridActionBegin = function (args) {
            // Support "Entf/Del" key
            if (args.requestType == "delete") {
                args.cancel = true;
                this.deleteDataPoints(args);
            }
        };
        TraceConfigDatapointsWidget.prototype.treeGridRowSelected = function (args) {
            if (args.model.selectedItem != undefined) {
                this._toolbar.disableRemoveButton(false);
            }
            else {
                this._toolbar.disableRemoveButton(true);
            }
        };
        TraceConfigDatapointsWidget.prototype.deleteDataPoints = function (args) {
            var indexList = new Array();
            for (var i = args.deletedItems.length - 1; i >= 0; i--) {
                indexList.push(args.deletedItems[i].index);
            }
            if (indexList.length > 0) {
                this._dataModel.removeDatapoints(indexList);
                var treeGridObj = this.getTreeGridObject();
                var newSelectionIndex = indexList[indexList.length - 1];
                if (newSelectionIndex >= args.model.parentRecords.length) {
                    newSelectionIndex = args.model.parentRecords.length - 1;
                }
                treeGridObj.option("selectedRowIndex", newSelectionIndex, true);
            }
            this.updateToolbar();
        };
        /**
         * opens the datapoint selection dialog and attaches to the dialog events
         *
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.openDatapointDialog = function () {
            datapointDialog_1.DatapointDialog.eventAddDatapoint.attach(this._addDataPointHandler);
            datapointDialog_1.DatapointDialog.eventDialogClosed.attach(this._dialogClosedHandler);
            datapointDialog_1.DatapointDialog.open();
        };
        /**
         * updates the toolbar corresponding to the current data selection
         *
         * @private
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.updateToolbar = function () {
            // Update toolbar buttons => show/hide add datapoints toolbar button
            var dataPoints = this._dataModel.data;
            this.updateToolbarButtonStates(dataPoints);
        };
        /**
         * Initializes and updates the available trace data points
         *
         * @private
         * @param {TraceDataPointInfo[]} availableTraceDataPoints
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.initializeAvailableDataPoints = function (availableTraceDataPoints) {
            this._availableTraceDataPoints = availableTraceDataPoints;
            datapointDialog_1.DatapointDialog.setDatapoints(this._availableTraceDataPoints);
            this.updateToolbar();
        };
        /**
         * refreshes the content of the datapoints parameters value fields
         *
         * @private
         * @param {Datapoint[]} datapoints
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.refreshDatapointsValues = function (datapoints) {
            try {
                this.setModel(datapoints);
            }
            catch (e) {
                console.log(e);
            }
        };
        TraceConfigDatapointsWidget.prototype.updateToolbarButtonStates = function (dataPoints) {
            var selectedItem = undefined;
            var treeObj = this.getTreeGridObject();
            if (treeObj != undefined) {
                selectedItem = treeObj.model.selectedItem;
            }
            var dataPointsLength = 0;
            if (dataPoints != undefined) {
                dataPointsLength = dataPoints.length;
            }
            if (this._toolbar != undefined) {
                if (dataPointsLength > 31) {
                    this._toolbar.disableAddButton(true);
                    this._toolbar.disableAddEmptyButton(true);
                }
                else {
                    if (this._availableTraceDataPoints.length == 0) {
                        this._toolbar.disableAddButton(true);
                    }
                    else {
                        this._toolbar.disableAddButton(false);
                    }
                    this._toolbar.disableAddEmptyButton(false);
                }
                if (dataPointsLength == 0 || selectedItem == undefined) {
                    this._toolbar.disableRemoveButton(true);
                }
                else {
                    this._toolbar.disableRemoveButton(false);
                }
            }
        };
        return TraceConfigDatapointsWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.TraceConfigDatapointsWidget = TraceConfigDatapointsWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldC90cmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBYUE7Ozs7O09BS0c7SUFDSDtRQUEwQywrQ0FBa0I7UUFBNUQ7WUFBQSxxRUFrVkM7WUFoVlcsMEJBQW9CLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQWhDLENBQWdDLENBQUM7WUFDdkUsMEJBQW9CLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQWhDLENBQWdDLENBQUM7WUFFdkUsK0JBQXlCLEdBQXlCLElBQUksS0FBSyxFQUFzQixDQUFDOztRQTZVOUYsQ0FBQztRQXpVRzs7Ozs7V0FLRztRQUNILHdEQUFrQixHQUFsQjtZQUNJLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQztRQUVELHlEQUFtQixHQUFuQjtZQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsSUFBSSx1REFBMEIsRUFBRSxDQUFDLENBQUM7WUFDdEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZDLENBQUM7UUFFRCxpREFBVyxHQUFYO1lBQ0ksaUJBQU0sV0FBVyxXQUFFLENBQUM7WUFFcEIsaUJBQU0sZ0JBQWdCLFlBQUMsYUFBYSxDQUFDLENBQUM7WUFFdEMsOEJBQThCO1lBQzlCLGlCQUFNLGdCQUFnQixZQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssK0RBQXlCLEdBQWpDLFVBQWtDLGVBQWdDO1lBQzlELElBQUksOEJBQThCLEdBQUcsSUFBSSwrREFBOEIsRUFBcUMsQ0FBQztZQUM3Ryw4QkFBOEIsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUM1QyxJQUFJLENBQUMsU0FBUyxHQUFHLDhCQUE4QixDQUFDO1lBQ2hELDhCQUE4QixDQUFDLFFBQVEsR0FBRyxlQUFlLENBQUM7WUFDMUQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3pCLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0gsd0RBQWtCLEdBQWxCLFVBQW1CLE1BQWtCLEVBQUUsU0FBZ0M7WUFDbkUsSUFBSSxVQUFVLEdBQUcsU0FBUyxDQUFDLElBQTZCLENBQUM7WUFDekQsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsNkRBQXVCLEdBQXZCLFVBQXdCLE1BQWtCLEVBQUUsU0FBZ0M7WUFDeEUsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUE2QixDQUFDO1lBQzlELElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0MsQ0FBQztRQUVEOzs7V0FHRztRQUNLLDREQUFzQixHQUE5QjtZQUNJLElBQUksaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7WUFDMUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLGlCQUFpQixHQUFHLHlDQUF5QyxDQUFDLENBQUM7WUFFcEcsaUNBQWUsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNsRCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssb0RBQWMsR0FBdEIsVUFBdUIsTUFBTSxFQUFFLElBQXdCO1lBQ25ELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQzNDLElBQUksb0JBQW9CLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztZQUM5RCxJQUFHLG9CQUFvQixJQUFJLFNBQVMsRUFBQztnQkFDakMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDN0I7WUFDRCxJQUFJLFNBQVMsR0FBRywrQkFBYyxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMzRSxJQUFHLElBQUksQ0FBQyxNQUFNLElBQUksb0NBQWUsQ0FBQyxHQUFHLEVBQUM7Z0JBQ0EsSUFBSSxDQUFDLFVBQVcsQ0FBQyxZQUFZLENBQUMsb0JBQW9CLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDcEc7aUJBQ0ksSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLG9DQUFlLENBQUMsT0FBTyxFQUFDO2dCQUNULElBQUksQ0FBQyxVQUFXLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDeEc7WUFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDekIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLG9EQUFjLEdBQXRCLFVBQXVCLE1BQU0sRUFBRSxJQUFJO1lBQy9CLGlDQUFlLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3BFLGlDQUFlLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3hFLENBQUM7UUFFRDs7O1dBR0c7UUFDTyxvREFBYyxHQUF4QjtZQUFBLGlCQWlCQztZQWhCRyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztZQUU5QixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsa0RBQ25CLElBQUksQ0FBQywyQkFBMkIsRUFBRSxHQUNsQyxJQUFJLENBQUMsOEJBQThCLEVBQUUsR0FDckMsSUFBSSxDQUFDLHlCQUF5QixFQUFFLEdBQ2hDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxLQUVwQyxhQUFhLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUNqRCxZQUFZLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLEVBRXBDLFdBQVcsRUFBRSxVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsRUFBOUIsQ0FBOEIsRUFDckQsV0FBVyxFQUFFLFVBQUMsSUFBSSxJQUFNLE9BQUEsS0FBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUE5QixDQUE4QixFQUN0RCxNQUFNLEVBQUUsVUFBQyxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsZUFBZSxFQUFFLEVBQXRCLENBQXNCLElBRTFDLENBQUM7UUFDUCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssaUVBQTJCLEdBQW5DO1lBQ0ksT0FBTztnQkFDSCxPQUFPLEVBQUU7b0JBQ0wsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQztvQkFDakUsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUM7b0JBQ2xELEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFDO29CQUNwQyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDO2lCQUNuRTthQUNKLENBQUM7UUFDTixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssb0VBQThCLEdBQXRDO1lBQUEsaUJBTUM7WUFMRyxPQUFPO2dCQUNILGlCQUFpQixFQUFFLElBQUk7Z0JBQ3ZCLG9CQUFvQixFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUU7Z0JBQ3JGLGFBQWEsRUFBRSxVQUFDLElBQUksSUFBSyxPQUFBLGlCQUFNLG1CQUFtQixhQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUF2RCxDQUF1RDthQUNuRixDQUFDO1FBQ04sQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLCtEQUF5QixHQUFqQztZQUFBLGlCQVNDO1lBUkcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLDJFQUFvQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2RSxPQUFPO2dCQUNILGVBQWUsRUFBRTtvQkFDYixXQUFXLEVBQUUsSUFBSTtvQkFDakIsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtpQkFDeEQ7Z0JBQ0QsWUFBWSxFQUFFLFVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBdkIsQ0FBdUI7YUFDbEQsQ0FBQztRQUNOLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSyxnRUFBMEIsR0FBbEM7WUFBQSxpQkFNRjtZQUxBLElBQUksY0FBYyxHQUFHLElBQUkseUZBQTJDLEVBQUUsQ0FBQztZQUN2RSxPQUFPO2dCQUNOLFNBQVMsRUFBRSxVQUFDLElBQUksSUFBSyxPQUFBLGNBQWMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQTlCLENBQThCO2dCQUMxQyxPQUFPLEVBQUUsVUFBQyxJQUFJLElBQUssT0FBQSxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFJLENBQUMsVUFBVSxFQUFFLEtBQUksQ0FBQyx5QkFBeUIsQ0FBQyxFQUE3RSxDQUE2RTthQUN6RyxDQUFDO1FBQ0gsQ0FBQztRQUVVLHFEQUFlLEdBQXZCO1lBQ0ksZ0NBQWdDO1lBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztZQUV4QyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdEMsQ0FBQztRQUVPLHlEQUFtQixHQUEzQixVQUE0QixJQUFJO1lBQzVCLHlCQUF5QjtZQUN6QixJQUFHLElBQUksQ0FBQyxXQUFXLElBQUksUUFBUSxFQUFDO2dCQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDbkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO2FBQy9CO1FBQ0wsQ0FBQztRQUVPLHlEQUFtQixHQUEzQixVQUE0QixJQUFJO1lBQzVCLElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLElBQUksU0FBUyxFQUFDO2dCQUNwQyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzVDO2lCQUNHO2dCQUNBLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDM0M7UUFDTCxDQUFDO1FBRU0sc0RBQWdCLEdBQXZCLFVBQXdCLElBQUk7WUFDeEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztZQUNwQyxLQUFJLElBQUksQ0FBQyxHQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUM5QyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDOUM7WUFDRCxJQUFHLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDO2dCQUNjLElBQUksQ0FBQyxVQUFXLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQy9FLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUMzQyxJQUFJLGlCQUFpQixHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0RCxJQUFHLGlCQUFpQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBQztvQkFDcEQsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQztpQkFDekQ7Z0JBQ0QsV0FBVyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNuRTtZQUNELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixDQUFDO1FBRUQ7Ozs7V0FJRztRQUNJLHlEQUFtQixHQUExQjtZQUNJLGlDQUFlLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3BFLGlDQUFlLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3BFLGlDQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDM0IsQ0FBQztRQUVEOzs7OztXQUtHO1FBRUssbURBQWEsR0FBckI7WUFDUSxvRUFBb0U7WUFDcEUsSUFBSSxVQUFVLEdBQXFDLElBQUksQ0FBQyxVQUFXLENBQUMsSUFBa0IsQ0FBQztZQUN2RixJQUFJLENBQUMseUJBQXlCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkQsQ0FBQztRQUdEOzs7Ozs7V0FNRztRQUNLLG1FQUE2QixHQUFyQyxVQUFzQyx3QkFBNkM7WUFDL0UsSUFBSSxDQUFDLHlCQUF5QixHQUFHLHdCQUF3QixDQUFDO1lBQzFELGlDQUFlLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1lBQzlELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssNkRBQXVCLEdBQS9CLFVBQWdDLFVBQTRCO1lBRXhELElBQUc7Z0JBQ0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUM3QjtZQUNELE9BQU0sQ0FBQyxFQUFDO2dCQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDbEI7UUFDTCxDQUFDO1FBRU8sK0RBQXlCLEdBQWpDLFVBQWtDLFVBQWdDO1lBQzlELElBQUksWUFBWSxHQUFHLFNBQVMsQ0FBQztZQUM3QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUN2QyxJQUFHLE9BQU8sSUFBSSxTQUFTLEVBQUM7Z0JBQ3BCLFlBQVksR0FBUyxPQUFPLENBQUMsS0FBTSxDQUFDLFlBQVksQ0FBQzthQUNwRDtZQUNELElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO1lBQ3pCLElBQUcsVUFBVSxJQUFJLFNBQVMsRUFBQztnQkFDdkIsZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQzthQUN4QztZQUNELElBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxTQUFTLEVBQUM7Z0JBQzFCLElBQUcsZ0JBQWdCLEdBQUcsRUFBRSxFQUFDO29CQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM3QztxQkFDRztvQkFDQSxJQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFDO3dCQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUN4Qzt5QkFDRzt3QkFDQSxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUN6QztvQkFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUM5QztnQkFDRCxJQUFHLGdCQUFnQixJQUFJLENBQUMsSUFBSSxZQUFZLElBQUksU0FBUyxFQUFFO29CQUNuRCxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUMzQztxQkFDRztvQkFDQSxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUM1QzthQUNKO1FBQ0wsQ0FBQztRQUNMLGtDQUFDO0lBQUQsQ0FBQyxBQWxWRCxDQUEwQyx1Q0FBa0IsR0FrVjNEO0lBRVEsa0VBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldCB9IGZyb20gXCIuL2ludGVyZmFjZXMvdHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRyZWVHcmlkV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vdHJlZUdyaWRXaWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IElEYXRhTW9kZWwsIEV2ZW50TW9kZWxDaGFuZ2VkQXJncyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRyYWNlQ29uZmlnRGF0YXBvaW50c1RyZWVHcmlkVG9vbGJhciB9IGZyb20gXCIuL3ZpZXcvdHJhY2VDb25maWdEYXRhcG9pbnRzVHJlZUdyaWRUb29sYmFyXCI7XHJcbmltcG9ydCB7IERhdGFwb2ludERpYWxvZyB9IGZyb20gXCIuLi8uLi92aWV3L2RhdGFwb2ludERpYWxvZy9kYXRhcG9pbnREaWFsb2dcIjtcclxuaW1wb3J0IHsgRXZlbnREYXRhcG9pbnRBcmdzLCBEYXRhcG9pbnRBY3Rpb24gfSBmcm9tIFwiLi4vLi4vdmlldy9kYXRhcG9pbnREaWFsb2cvZXZlbnREYXRhcG9pbnRBcmdzXCI7XHJcbmltcG9ydCB7IFRyYWNlRGF0YVBvaW50fSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RpYWdub3N0aWNzL3RyYWNlL3RyYWNlRGF0YVBvaW50XCI7XHJcbmltcG9ydCB7IFRyYWNlRGF0YVBvaW50SW5mbyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvdHJhY2VEYXRhUG9pbnRJbmZvXCI7XHJcbmltcG9ydCB7IFRyYWNlQ29uZmlnRGF0YXBvaW50c1RyZWVHcmlkQ2VsbEVkaXRFdmVudHMgfSBmcm9tIFwiLi92aWV3L3RyYWNlQ29uZmlnRGF0YXBvaW50c1RyZWVHcmlkQ2VsbEVkaXRFdmVudHNcIjtcclxuaW1wb3J0IHsgVHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsIH0gZnJvbSBcIi4vbW9kZWwvdHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsXCI7XHJcbmltcG9ydCB7IElUcmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWwgfSBmcm9tIFwiLi9tb2RlbC90cmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24gfSBmcm9tIFwiLi9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblwiO1xyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgdGhlIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFxyXG4gKlxyXG4gKiBAY2xhc3MgVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0XHJcbiAqIEBleHRlbmRzIHtUcmVlR3JpZFdpZGdldEJhc2V9XHJcbiAqL1xyXG5jbGFzcyBUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXQgZXh0ZW5kcyBUcmVlR3JpZFdpZGdldEJhc2UgaW1wbGVtZW50cyBJVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0IHtcclxuXHJcbiAgICBwcml2YXRlIF9hZGREYXRhUG9pbnRIYW5kbGVyID0gKHNlbmRlcixhcmdzKT0+dGhpcy5vbkFkZERhdGFwb2ludChzZW5kZXIsYXJncyk7XHJcbiAgICBwcml2YXRlIF9kaWFsb2dDbG9zZWRIYW5kbGVyID0gKHNlbmRlcixhcmdzKT0+dGhpcy5vbkRpYWxvZ0Nsb3NlZChzZW5kZXIsYXJncyk7XHJcblxyXG4gICAgcHJpdmF0ZSBfYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzOiBUcmFjZURhdGFQb2ludEluZm9bXSA9IG5ldyBBcnJheTxUcmFjZURhdGFQb2ludEluZm8+KCk7XHJcblxyXG4gICAgcHJvdGVjdGVkIF90b29sYmFyITogVHJhY2VDb25maWdEYXRhcG9pbnRzVHJlZUdyaWRUb29sYmFyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB0aGUgaGVpZ2h0IG9mIHRoZSBoZWFkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFxyXG4gICAgICovXHJcbiAgICBkZWZpbmVIZWFkZXJIZWlnaHQoKTogbnVtYmVye1xyXG4gICAgICAgIHJldHVybiAzMDtcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0RGVmYXVsdERlZmluaXRpb24obmV3IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uKCkpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZWQoKXtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplZCgpO1xyXG5cclxuICAgICAgICBzdXBlci5zZXRIZWFkZXJDb250ZW50KFwiRGF0YSBwb2ludHNcIik7XHJcblxyXG4gICAgICAgIC8vIFNldCBkeW5hbWljIGNvbHVtbiBzZXR0aW5nc1xyXG4gICAgICAgIHN1cGVyLnNldER5bmFtaWNDb2x1bW4oMywgMjUwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgYW5kIGluaXRpYWxpemVzIHRoZSB0cmFjZSBkYXRhIHBvaW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1RyYWNlRGF0YVBvaW50W119IHRyYWNlRGF0YVBvaW50c1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRpYWxpemVUcmFjZURhdGFQb2ludHModHJhY2VEYXRhUG9pbnRzOlRyYWNlRGF0YVBvaW50W10pe1xyXG4gICAgICAgIGxldCB0cmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWwgPSBuZXcgVHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsKCkgYXMgSVRyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbDtcclxuICAgICAgICB0cmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWwuaW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgIHRoaXMuZGF0YU1vZGVsID0gdHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsO1xyXG4gICAgICAgIHRyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbC5pbml0RGF0YSA9IHRyYWNlRGF0YVBvaW50cztcclxuICAgICAgICB0aGlzLnVwZGF0ZVRvb2xiYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGltcGxlbWVudHMgdGhlIG1vZGVsIGNoYW5nZSBoYW5kbGluZ1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SURhdGFNb2RlbH0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50TW9kZWxDaGFuZ2VkQXJnc30gZGF0YVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGhhbmRsZU1vZGVsQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGV2ZW50QXJnczogRXZlbnRNb2RlbENoYW5nZWRBcmdzKTogYW55IHtcclxuICAgICAgICBsZXQgZGF0YVBvaW50cyA9IGV2ZW50QXJncy5kYXRhIGFzIEFycmF5PFRyYWNlRGF0YVBvaW50PjtcclxuICAgICAgICB0aGlzLnJlZnJlc2hEYXRhcG9pbnRzVmFsdWVzKGRhdGFQb2ludHMpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyhkYXRhUG9pbnRzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGhhbmRsZXMgdGhlIGNoYW5nZXMgb2Ygb2JzZXJ2ZWQgaXRlbXMgcmVxdWVzdGVkIGJ5ICdvYnNlcnZlRGF0YU1vZGVsSXRlbXMnXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJRGF0YU1vZGVsfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7RXZlbnRNb2RlbENoYW5nZWRBcmdzfSBkYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGhhbmRsZU1vZGVsSXRlbXNDaGFuZ2VkKHNlbmRlcjogSURhdGFNb2RlbCwgZXZlbnRBcmdzOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpIHtcclxuICAgICAgICBsZXQgZGF0YVBvaW50cyA9IHRoaXMuZGF0YU1vZGVsLmRhdGEgYXMgQXJyYXk8VHJhY2VEYXRhUG9pbnQ+O1xyXG4gICAgICAgIHRoaXMudXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyhkYXRhUG9pbnRzKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hEYXRhcG9pbnRzVmFsdWVzKGRhdGFQb2ludHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBjcmVhdGVzIHRoZSBkYXRhcG9pbnQgc2VsZWN0aW9uIGRpYWxvZ1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVEYXRhcG9pbnRzRGlhbG9nKCl7XHJcbiAgICAgICAgbGV0IGRhdGFwb2ludERpYWxvZ0lkID0gXCJkYXRhcG9pbnREaWFsb2dcIjtcclxuICAgICAgICAkKHRoaXMubWFpbkRpdikuYXBwZW5kKFwiPGRpdiBpZD0nXCIgKyBkYXRhcG9pbnREaWFsb2dJZCArIFwiJz48ZGl2IGlkPSdkYXRhcG9pbnRDb250ZW50Um9vdCc+PC8+PC8+XCIpOyAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIERhdGFwb2ludERpYWxvZy5pbml0aWFsaXplKGRhdGFwb2ludERpYWxvZ0lkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogY2F0Y2hlcyB0aGUgYWRkIGRhdGFwb2ludCBldmVudCBmcm9tIHRoZSBkYXRhcG9pbnQgZGlhbG9nXHJcbiAgICAgKiA9PiBhZGRzIG9yIHJlcGxhY2VzIHRoZSBzZWxlY3RlZCBkYXRhcG9pbnQgd2l0aCB0aGUgZGF0YXBvaW50IGZyb20gdGhlIGRhdGFwb2ludCBkaWFsb2dcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge30gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50RGF0YXBvaW50QXJnc30gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQWRkRGF0YXBvaW50KHNlbmRlciwgYXJnczogRXZlbnREYXRhcG9pbnRBcmdzKXtcclxuICAgICAgICB2YXIgdHJlZUdyaWRPYmogPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcbiAgICAgICAgbGV0IGFjdHVhbFNlbGVjdGlvbkluZGV4ID0gdHJlZUdyaWRPYmoubW9kZWwuc2VsZWN0ZWRSb3dJbmRleDtcclxuICAgICAgICBpZihhY3R1YWxTZWxlY3Rpb25JbmRleCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBhY3R1YWxTZWxlY3Rpb25JbmRleCA9IC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGF0YVBvaW50ID0gVHJhY2VEYXRhUG9pbnQuY3JlYXRlV2l0aERhdGFQb2ludEluZm8oYXJncy5kYXRhUG9pbnRJbmZvKTtcclxuICAgICAgICBpZihhcmdzLmFjdGlvbiA9PSBEYXRhcG9pbnRBY3Rpb24uYWRkKXtcclxuICAgICAgICAgICAgKDxJVHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsPnRoaXMuX2RhdGFNb2RlbCkuYWRkRGF0YXBvaW50KGFjdHVhbFNlbGVjdGlvbkluZGV4LCBkYXRhUG9pbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGFyZ3MuYWN0aW9uID09IERhdGFwb2ludEFjdGlvbi5yZXBsYWNlKXtcclxuICAgICAgICAgICAgKDxJVHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsPnRoaXMuX2RhdGFNb2RlbCkucmVwbGFjZURhdGFwb2ludChhY3R1YWxTZWxlY3Rpb25JbmRleCwgZGF0YVBvaW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVUb29sYmFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNhdGNoZXMgdGhlIGRpYWxvZyBjbG9zZSBldmVudCBmcm9tIHRoZSBkYXRhcG9pbnQgZGlhbG9nXHJcbiAgICAgKiA9PiBkZXRhY2hlcyB0aGUgZGlhbG9nIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7fSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7fSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25EaWFsb2dDbG9zZWQoc2VuZGVyLCBhcmdzKXtcclxuICAgICAgICBEYXRhcG9pbnREaWFsb2cuZXZlbnRBZGREYXRhcG9pbnQuZGV0YWNoKHRoaXMuX2FkZERhdGFQb2ludEhhbmRsZXIpO1xyXG4gICAgICAgIERhdGFwb2ludERpYWxvZy5ldmVudERpYWxvZ0Nsb3NlZC5kZXRhY2godGhpcy5fZGlhbG9nQ2xvc2VkSGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNyZWF0ZXMgdGhlIHRyZWUgZ3JpZCBmb3IgdGhlIGRhdGFwb2ludCBpbmZvcm1hdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVUcmVlR3JpZCgpIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZURhdGFwb2ludHNEaWFsb2coKTtcclxuICAgICBcclxuICAgICAgICAkKHRoaXMubWFpbkRpdikuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ2VsbEVkaXRTdXBwb3J0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNlbGVjdGlvblR5cGU6IGVqLlRyZWVHcmlkLlNlbGVjdGlvblR5cGUuTXVsdGlwbGUsXHJcbiAgICAgICAgICAgIGVkaXRTZXR0aW5nczogeyBhbGxvd0VkaXRpbmc6IHRydWUgfSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJvd1NlbGVjdGVkOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZFJvd1NlbGVjdGVkKGFyZ3MpLFxyXG4gICAgICAgICAgICBhY3Rpb25CZWdpbjogKGFyZ3MpID0+ICB0aGlzLnRyZWVHcmlkQWN0aW9uQmVnaW4oYXJncyksXHJcbiAgICAgICAgICAgIGNyZWF0ZTogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRDcmVhdGVkKCksXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiBkZWZpbml0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKToge317XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29sdW1uczogW1xyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJkYXRhUG9pbnROYW1lXCIsIGhlYWRlclRleHQ6IFwiRGF0YSBwb2ludFwiLCB3aWR0aDogXCIzNTBcIn0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImNvbXBvbmVudE5hbWVcIiwgaGVhZGVyVGV4dDogXCJDb21wb25lbnRcIn0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcIm5hbWVcIiwgaGVhZGVyVGV4dDogXCJOYW1lXCJ9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJkZXNjcmlwdGlvblwiLCBoZWFkZXJUZXh0OiBcIkRlc2NyaXB0aW9uXCIsIHdpZHRoOiBcIjI1MFwifSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiByZXNpemUgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpOiB7fXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhbGxvd0NvbHVtblJlc2l6ZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplU2V0dGluZ3M6IHsgY29sdW1uUmVzaXplTW9kZTogZWouVHJlZUdyaWQuQ29sdW1uUmVzaXplTW9kZS5GaXhlZENvbHVtbnMgfSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplZDogKGFyZ3MpID0+IHN1cGVyLnJlc2l6ZUR5bmFtaWNDb2x1bW4oYXJncy5jb2x1bW5JbmRleCwgYXJncy5tb2RlbCksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCB0b29sYmFyIHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCk6IHt9e1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIgPSBuZXcgVHJhY2VDb25maWdEYXRhcG9pbnRzVHJlZUdyaWRUb29sYmFyKHRoaXMubWFpbkRpdik7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdG9vbGJhclNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICBzaG93VG9vbGJhcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGN1c3RvbVRvb2xiYXJJdGVtczogdGhpcy5fdG9vbGJhci5nZXRDdXN0b21Ub29sYmFycygpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0b29sYmFyQ2xpY2s6IChhcmdzKSA9PiB0aGlzLnRvb2xiYXJDbGljayhhcmdzKVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY2VsbCBlZGl0IHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENlbGxFZGl0U3VwcG9ydCgpOiB7fXtcclxuXHRcdHZhciBjZWxsRWRpdEV2ZW50cyA9IG5ldyBUcmFjZUNvbmZpZ0RhdGFwb2ludHNUcmVlR3JpZENlbGxFZGl0RXZlbnRzKCk7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRiZWdpbkVkaXQ6IChhcmdzKSA9PiBjZWxsRWRpdEV2ZW50cy5iZWdpbkVkaXQoYXJncyksXHJcbiAgICAgICAgICAgIGVuZEVkaXQ6IChhcmdzKSA9PiBjZWxsRWRpdEV2ZW50cy5lbmRFZGl0KGFyZ3MsIHRoaXMuX2RhdGFNb2RlbCwgdGhpcy5fYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzKSxcclxuXHRcdH07XHJcblx0fVxyXG5cclxuICAgIHByaXZhdGUgdHJlZUdyaWRDcmVhdGVkKCl7XHJcbiAgICAgICAgLy8gU2V0cyB0aGUgY3VzdG9tIHRvb2xiYXIgaWNvbnNcclxuICAgICAgICB0aGlzLl90b29sYmFyLnNldFN0eWxlRm9yVG9vbGJhckljb25zKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fdG9vbGJhci5pbml0VG9vbGJhclN0YXRlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJlZUdyaWRBY3Rpb25CZWdpbihhcmdzKXtcclxuICAgICAgICAvLyBTdXBwb3J0IFwiRW50Zi9EZWxcIiBrZXlcclxuICAgICAgICBpZihhcmdzLnJlcXVlc3RUeXBlID09IFwiZGVsZXRlXCIpe1xyXG4gICAgICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlRGF0YVBvaW50cyhhcmdzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZFJvd1NlbGVjdGVkKGFyZ3Mpe1xyXG4gICAgICAgIGlmKGFyZ3MubW9kZWwuc2VsZWN0ZWRJdGVtICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzYWJsZVJlbW92ZUJ1dHRvbihmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzYWJsZVJlbW92ZUJ1dHRvbih0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlbGV0ZURhdGFQb2ludHMoYXJncyl7XHJcbiAgICAgICAgbGV0IGluZGV4TGlzdCA9IG5ldyBBcnJheTxudW1iZXI+KCk7XHJcbiAgICAgICAgZm9yKGxldCBpPWFyZ3MuZGVsZXRlZEl0ZW1zLmxlbmd0aC0xOyBpID49IDA7IGktLSl7XHJcbiAgICAgICAgICAgIGluZGV4TGlzdC5wdXNoKGFyZ3MuZGVsZXRlZEl0ZW1zW2ldLmluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaW5kZXhMaXN0Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAoPElUcmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWw+dGhpcy5fZGF0YU1vZGVsKS5yZW1vdmVEYXRhcG9pbnRzKGluZGV4TGlzdCk7XHJcbiAgICAgICAgICAgIHZhciB0cmVlR3JpZE9iaiA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuICAgICAgICAgICAgbGV0IG5ld1NlbGVjdGlvbkluZGV4ID0gaW5kZXhMaXN0W2luZGV4TGlzdC5sZW5ndGgtMV07XHJcbiAgICAgICAgICAgIGlmKG5ld1NlbGVjdGlvbkluZGV4ID49IGFyZ3MubW9kZWwucGFyZW50UmVjb3Jkcy5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgbmV3U2VsZWN0aW9uSW5kZXggPSBhcmdzLm1vZGVsLnBhcmVudFJlY29yZHMubGVuZ3RoLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdHJlZUdyaWRPYmoub3B0aW9uKFwic2VsZWN0ZWRSb3dJbmRleFwiLCBuZXdTZWxlY3Rpb25JbmRleCwgdHJ1ZSk7IFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZVRvb2xiYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG9wZW5zIHRoZSBkYXRhcG9pbnQgc2VsZWN0aW9uIGRpYWxvZyBhbmQgYXR0YWNoZXMgdG8gdGhlIGRpYWxvZyBldmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvcGVuRGF0YXBvaW50RGlhbG9nKCl7XHJcbiAgICAgICAgRGF0YXBvaW50RGlhbG9nLmV2ZW50QWRkRGF0YXBvaW50LmF0dGFjaCh0aGlzLl9hZGREYXRhUG9pbnRIYW5kbGVyKTtcclxuICAgICAgICBEYXRhcG9pbnREaWFsb2cuZXZlbnREaWFsb2dDbG9zZWQuYXR0YWNoKHRoaXMuX2RpYWxvZ0Nsb3NlZEhhbmRsZXIpO1xyXG4gICAgICAgIERhdGFwb2ludERpYWxvZy5vcGVuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB1cGRhdGVzIHRoZSB0b29sYmFyIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGN1cnJlbnQgZGF0YSBzZWxlY3Rpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFxyXG4gICAgICovXHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVUb29sYmFyKCkge1xyXG4gICAgICAgICAgICAvLyBVcGRhdGUgdG9vbGJhciBidXR0b25zID0+IHNob3cvaGlkZSBhZGQgZGF0YXBvaW50cyB0b29sYmFyIGJ1dHRvblxyXG4gICAgICAgICAgICBsZXQgZGF0YVBvaW50cyA9ICg8SVRyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbD50aGlzLl9kYXRhTW9kZWwpLmRhdGEgYXMgQXJyYXk8YW55PjtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVUb29sYmFyQnV0dG9uU3RhdGVzKGRhdGFQb2ludHMpO1xyXG4gICAgfSAgIFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIGFuZCB1cGRhdGVzIHRoZSBhdmFpbGFibGUgdHJhY2UgZGF0YSBwb2ludHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtUcmFjZURhdGFQb2ludEluZm9bXX0gYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZUF2YWlsYWJsZURhdGFQb2ludHMoYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzOlRyYWNlRGF0YVBvaW50SW5mb1tdKXtcclxuICAgICAgICB0aGlzLl9hdmFpbGFibGVUcmFjZURhdGFQb2ludHMgPSBhdmFpbGFibGVUcmFjZURhdGFQb2ludHM7XHJcbiAgICAgICAgRGF0YXBvaW50RGlhbG9nLnNldERhdGFwb2ludHModGhpcy5fYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVRvb2xiYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlZnJlc2hlcyB0aGUgY29udGVudCBvZiB0aGUgZGF0YXBvaW50cyBwYXJhbWV0ZXJzIHZhbHVlIGZpZWxkc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0RhdGFwb2ludFtdfSBkYXRhcG9pbnRzXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVmcmVzaERhdGFwb2ludHNWYWx1ZXMoZGF0YXBvaW50czogVHJhY2VEYXRhUG9pbnRbXSkge1xyXG5cclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TW9kZWwoZGF0YXBvaW50cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoKGUpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVUb29sYmFyQnV0dG9uU3RhdGVzKGRhdGFQb2ludHM6QXJyYXk8VHJhY2VEYXRhUG9pbnQ+KXtcclxuICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHZhciB0cmVlT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG4gICAgICAgIGlmKHRyZWVPYmogIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgc2VsZWN0ZWRJdGVtID0gKDxhbnk+dHJlZU9iai5tb2RlbCkuc2VsZWN0ZWRJdGVtO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGF0YVBvaW50c0xlbmd0aCA9IDA7XHJcbiAgICAgICAgaWYoZGF0YVBvaW50cyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBkYXRhUG9pbnRzTGVuZ3RoID0gZGF0YVBvaW50cy5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuX3Rvb2xiYXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYoZGF0YVBvaW50c0xlbmd0aCA+IDMxKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzYWJsZUFkZEJ1dHRvbih0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzYWJsZUFkZEVtcHR5QnV0dG9uKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9hdmFpbGFibGVUcmFjZURhdGFQb2ludHMubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzYWJsZUFkZEJ1dHRvbih0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlQWRkQnV0dG9uKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzYWJsZUFkZEVtcHR5QnV0dG9uKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihkYXRhUG9pbnRzTGVuZ3RoID09IDAgfHwgc2VsZWN0ZWRJdGVtID09IHVuZGVmaW5lZCApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlUmVtb3ZlQnV0dG9uKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVSZW1vdmVCdXR0b24oZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXQgfTsiXX0=