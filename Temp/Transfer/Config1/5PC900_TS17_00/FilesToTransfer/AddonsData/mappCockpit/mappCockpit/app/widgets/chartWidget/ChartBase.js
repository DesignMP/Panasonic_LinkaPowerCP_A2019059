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
define(["require", "exports", "../../core/interfaces/components/ui/chart/chartInterface", "../common/widgetBase", "./helpers/chartRangeHelper", "../../framework/events", "./userInteraction/userInteractionController", "../../models/common/point", "../common/states/cursorStates", "./cursor/CursorPositionInfo", "./chartViewSerie", "../../common/seriesHelper", "./chartWrapper/SFChartWrapper", "../../models/chartManagerDataModel/eventScaleDataChangedArgs", "./componentDefaultDefinition", "../../common/componentBase/componentBase", "../../common/componentFactory/componentFactory", "../common/states/cursorType"], function (require, exports, chartInterface_1, widgetBase_1, chartRangeHelper_1, events_1, userInteractionController_1, point_1, cursorStates_1, CursorPositionInfo_1, chartViewSerie_1, seriesHelper_1, SFChartWrapper_1, eventScaleDataChangedArgs_1, componentDefaultDefinition_1, componentBase_1, componentFactory_1, cursorType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartObjectType;
    (function (ChartObjectType) {
        ChartObjectType[ChartObjectType["cursor"] = 0] = "cursor";
        ChartObjectType[ChartObjectType["series"] = 1] = "series";
        ChartObjectType[ChartObjectType["axis"] = 2] = "axis";
        ChartObjectType[ChartObjectType["chartSpace"] = 3] = "chartSpace";
        ChartObjectType[ChartObjectType["emptySpace"] = 4] = "emptySpace";
        ChartObjectType[ChartObjectType["invalid"] = 5] = "invalid";
    })(ChartObjectType || (ChartObjectType = {}));
    exports.ChartObjectType = ChartObjectType;
    var DropLocationType;
    (function (DropLocationType) {
        DropLocationType[DropLocationType["addNewScale"] = 0] = "addNewScale";
        DropLocationType[DropLocationType["assignToScale"] = 1] = "assignToScale";
        DropLocationType[DropLocationType["invalid"] = 2] = "invalid";
    })(DropLocationType || (DropLocationType = {}));
    exports.DropLocationType = DropLocationType;
    var ChartObjectInformation = /** @class */ (function () {
        function ChartObjectInformation(chartObjectType, args) {
            this.chartObjectType = chartObjectType;
            this.args = args;
        }
        return ChartObjectInformation;
    }());
    exports.ChartObjectInformation = ChartObjectInformation;
    var EventUserChartInteraction = /** @class */ (function (_super) {
        __extends(EventUserChartInteraction, _super);
        function EventUserChartInteraction() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventUserChartInteraction;
    }(events_1.TypedEvent));
    exports.EventUserChartInteraction = EventUserChartInteraction;
    ;
    var EventUserChartInteractionArgs = /** @class */ (function () {
        function EventUserChartInteractionArgs(chartInteractionType, eventArguments) {
            this.chartInteractionType = chartInteractionType;
            this.eventArguments = eventArguments;
        }
        return EventUserChartInteractionArgs;
    }());
    exports.EventUserChartInteractionArgs = EventUserChartInteractionArgs;
    var EventRedrawAllCharts = /** @class */ (function (_super) {
        __extends(EventRedrawAllCharts, _super);
        function EventRedrawAllCharts() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventRedrawAllCharts;
    }(events_1.TypedEvent));
    exports.EventRedrawAllCharts = EventRedrawAllCharts;
    ;
    var EventRedrawAllChartsArgs = /** @class */ (function () {
        function EventRedrawAllChartsArgs(chartType) {
            this.chartType = chartType;
        }
        return EventRedrawAllChartsArgs;
    }());
    exports.EventRedrawAllChartsArgs = EventRedrawAllChartsArgs;
    var ChartBase = /** @class */ (function (_super) {
        __extends(ChartBase, _super);
        function ChartBase(parentView, name, scale) {
            var _this = _super.call(this) || this;
            _this.widgetName = "";
            _this.textMeasurementCanvasId = "textMeasurementCanvas";
            _this.series = [];
            _this.hoveredSeries = [];
            _this.scales = [];
            //private keyEventsPlaced = false;
            // holds the current cursor states values. We initialize the member for default. The effective initialization takes place when the external shared instance
            // of the cursor states is created and reflected through the curorStates setter!
            _this._cursorStates = new cursorStates_1.CursorStates();
            _this.cursorHoverDistance = 8;
            _this.draggedSeriesIndex = 0;
            _this.axisBounds = [];
            _this.xAxisWidth = 0;
            _this.yAxisAlignmentOffset = 0;
            _this.flaggedForResize = false;
            if (_this.component == undefined) {
                // TODO: component should be set by component factory when charts can be created with component factory
                _this.component = new componentBase_1.ComponentBase(componentFactory_1.ComponentFactory.getInstance(), _this);
                _this.initializeComponent();
                _this.component.addDefaultComponentSettings();
            }
            _this.component.type = "ChartBase"; // TODO: Remove when chartbase(xychart, fftchart, ytchart) will be created with the component factory
            _this.component.id = name;
            _this.parentView = parentView;
            _this.widgetName = name;
            _this.scales = scale;
            _this.eventUserChartInteraction = new EventUserChartInteraction();
            _this.eventRedrawAllCharts = new EventRedrawAllCharts();
            return _this;
        }
        Object.defineProperty(ChartBase.prototype, "axisDropZoneId", {
            /**
             * Returns the id for the axis dropZone
             *
             * @readonly
             * @private
             * @type {string}
             * @memberof ChartBase
             */
            get: function () {
                return this.mainDivId + '_axisDropZone';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartBase.prototype, "axisDropZoneChartAreaId", {
            /**
             * Returns the id for the axis chart area dropZone
             *
             * @readonly
             * @protected
             * @type {string}
             * @memberof ChartBase
             */
            get: function () {
                return this.axisDropZoneId + '_chartArea';
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Destroy object
         *
         * @memberof ChartBase
         */
        ChartBase.prototype.dispose = function () {
            // TODO: Dispose of CursorStates must be done globaly
            this.cursorsStates.dispose();
            var chartObj = $(this.mainDiv).data("ejChart");
            if (chartObj != undefined) {
                chartObj.destroy();
            }
            else {
                // TODO: dispose of this widget is called from splitter and also from the chartViewChartManager
                //console.warn("Dispose of chartObj(== undefined) not possible!");
            }
            _super.prototype.dispose.call(this);
        };
        ChartBase.prototype.initialized = function () {
            var _this = this;
            _super.prototype.initialized.call(this);
            for (var _i = 0, _a = this.scales; _i < _a.length; _i++) {
                var scale = _a[_i];
                this.addSeriesToChart(scale.childs, scale, false);
            }
            var newChart = new SFChartWrapper_1.SFChartWrapper(this.mainDiv, this.scales, this.primaryXAxisName);
            newChart.eventAxisRangeChanged.attach(function (sender, args) { return _this.onAxisRangeChanged(sender, args); });
            newChart.eventMouseAction.attach(function (sender, args) { return _this.onMouseAction(sender, args); });
            newChart.eventMouseWheel.attach(function (sender, args) { return _this.onChartMouseWheel(sender, args); });
            this.chartInstance = newChart._SFChart;
            this.chart = newChart;
            this.setBoxZoom(false);
        };
        ChartBase.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        Object.defineProperty(ChartBase.prototype, "cursorsStates", {
            /**
             * Gets the cursors states
             *
             * @protected
             * @type {TCursorStates}
             * @memberof ChartBase
             */
            get: function () {
                return this._cursorStates;
            },
            /**
             * Sets the cursors states. The method is called automatically whenever a cursor state has been changed externally.
             *
             * @protected
             * @memberof ChartBase
             */
            set: function (cursorStates) {
                // update the backup field
                this._cursorStates = cursorStates;
                this.updateUICursors(cursorStates);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Updates the cursor states.
         *
         * @protected
         * @param {CursorStates} cursorStates
         * @memberof ChartBase
         */
        ChartBase.prototype.updateCursorStates = function (cursorStates) {
            // BINDINGSOURCE: dispatches the method call to bound targets
        };
        ChartBase.prototype.onAxisRangeChanged = function (sender, args) {
            for (var i = 0; i < args.axisIDs.length; i++) {
                var scale = void 0;
                //Workaround until X-Axis handling is implemented correct
                if (args.axisIDs[i] != this.primaryXAxisName) {
                    scale = this.getScaleByScaleId(args.axisIDs[i]);
                }
                else {
                    scale = this.scales[0];
                }
                if (scale != undefined) {
                    var axis = sender;
                    var range = axis.getAxisRange();
                    if (axis.getAxisOrientation() == chartInterface_1.AxisOrientation.horizontal) {
                        this.setScaleRange(scale, range.min, range.max, scale.minYValue, scale.maxYValue, "", false);
                        if (args.syncAxis == true) {
                            this.eventRedrawAllCharts.raise(this, new EventRedrawAllChartsArgs(this.type));
                        }
                    }
                    else {
                        this.setScaleRange(scale, scale.minXValue, scale.maxXValue, range.min, range.max, "", false);
                    }
                }
            }
            if (args.forceRedraw == true) {
                this.redrawChart();
            }
        };
        /**
         *
         *
         * @param {number} mouseX
         * @param {number} mouseY
         * @returns {ChartObjectInformation}
         * @memberof ChartBase
         */
        ChartBase.prototype.getChartObjectUnderMouse = function (mouseX, mouseY) {
            this.calculateChartDimensions();
            if (this.mouseIsInChartBounds(mouseX, mouseY)) {
                var index = this.cursorsStates.getHoveredCursorIndex();
                if (index !== -1) {
                    //TODO: might be better to use cursor instance instead of index
                    return new ChartObjectInformation(ChartObjectType.cursor, { cursorIndex: index });
                }
                return new ChartObjectInformation(ChartObjectType.chartSpace, {});
            }
            for (var i = 0; i < this.axisBounds.length; i++) {
                if ((mouseX - this.axisBounds[i].x) < (this.axisBounds[i].width) && mouseX > this.axisBounds[i].x) {
                    if ((mouseY - this.axisBounds[i].y) < (this.axisBounds[i].height) && mouseY > this.axisBounds[i].y) {
                        var axis = this.chart.getAxis(this.axisBounds[i].axis.name);
                        return new ChartObjectInformation(ChartObjectType.axis, { axis: axis });
                    }
                }
            }
            return new ChartObjectInformation(ChartObjectType.emptySpace, {});
        };
        /**
         *
         *
         * @private
         * @memberof ChartBase
         */
        ChartBase.prototype.calculateChartDimensions = function () {
            this.axisBounds = [];
            for (var i = 0; i < this.scales.length; i++) {
                var axis_1 = this.chart.getAxis(this.scales[i].id);
                if (axis_1 != undefined) {
                    this.axisBounds.push(axis_1.getAxisBounds());
                }
            }
            var axis = this.chart.getAxis(this.primaryXAxisName);
            if (axis != undefined) {
                this.axisBounds.push(axis.getAxisBounds());
            }
        };
        ChartBase.prototype.onMouseAction = function (sender, args) {
            switch (args.mouseActionType) {
                case userInteractionController_1.MouseActionType.mouseDown: {
                    this.onChartMouseDown(sender, args);
                    break;
                }
                case userInteractionController_1.MouseActionType.mouseUp: {
                    this.onChartMouseUp(sender, args);
                    break;
                }
                case userInteractionController_1.MouseActionType.mouseMove: {
                    this.onChartMouseMove(sender, args);
                    break;
                }
            }
        };
        /**
         *
         *
         * @private
         * @param {*} args
         * @memberof ChartBase
         */
        ChartBase.prototype.onChartMouseDown = function (sender, args) {
            args.objectUnderMouse = this.getChartObjectUnderMouse(args.mousePointChart.x, args.mousePointChart.y);
            var eventUserChartInteractionArgs;
            eventUserChartInteractionArgs = new EventUserChartInteractionArgs(userInteractionController_1.MouseActionType.mouseDown, args);
            eventUserChartInteractionArgs.eventArguments.hoveredSeries = this.hoveredSeries;
            this.eventUserChartInteraction.raise(this, eventUserChartInteractionArgs);
        };
        ;
        /**
         *
         *
         * @private
         * @param {*} args
         * @memberof ChartBase
         */
        ChartBase.prototype.onChartMouseUp = function (sender, args) {
            args.objectUnderMouse = this.getChartObjectUnderMouse(args.mousePointChart.x, args.mousePointChart.y);
            var eventUserChartInteractionArgs;
            eventUserChartInteractionArgs = new EventUserChartInteractionArgs(userInteractionController_1.MouseActionType.mouseUp, args);
            this.eventUserChartInteraction.raise(this, eventUserChartInteractionArgs);
        };
        ;
        /**
         *
         *
         * @private
         * @param {*} args
         * @memberof ChartBase
         */
        ChartBase.prototype.onChartMouseMove = function (sender, args) {
            var chartObjectUnderMouse = this.getChartObjectUnderMouse(args.mousePointChart.x, args.mousePointChart.y);
            args.objectUnderMouse = chartObjectUnderMouse;
            var eventUserChartInteractionArgs;
            eventUserChartInteractionArgs = new EventUserChartInteractionArgs(userInteractionController_1.MouseActionType.mouseMove, args);
            this.eventUserChartInteraction.raise(this, eventUserChartInteractionArgs);
        };
        ;
        /**
         * This method is called by the InteractionStratetgies when a click in the
         * chart has been made.
         *
         * @memberof ChartBase
         */
        ChartBase.prototype.setCursorOnPointerPosition = function (mousePoint) {
            this.setCursor(mousePoint.x, mousePoint.y);
            this.checkCursorsHovering(mousePoint);
        };
        /**
         * Internal method for actually moving the cursors. Overwritten in FFTChart.ts
         *
         * @protected
         * @param {number} x
         * @param {number} y
         * @returns
         * @memberof ChartBase
         */
        ChartBase.prototype.setCursor = function (x, y) {
            if (!this.series.length) {
                return;
            }
            this.cursorsStates.setLastCursorTypeSelected(cursorType_1.CursorType.timeDomain);
            var hoveredCursorIndex = this.cursorsStates.getHoveredCursorIndex();
            if (hoveredCursorIndex != -1) { // Set selected cursor when hovered cursor was found
                this.cursorsStates.setSelected(hoveredCursorIndex, true);
            }
            else {
                this.cursorsStates.setSelected(this.cursorsStates.getSelectedCursorIndex(), true);
            }
            this.updateSelectedCursor(x, y);
        };
        /**
         * Pass the x and y position on the property and this method will figure out where to
         * place the cursors and update the states accordingly
         *
         * @protected
         * @param {CursorStates} cursorsStates
         * @param {number} x
         * @param {number} y
         * @memberof ChartBase
         */
        ChartBase.prototype.updateSelectedCursor = function (x, y) {
            var point = this.getChartCoordinateFromPixel(this.primaryXAxisName, this.scales[0].id, x, y);
            var nearestTimestampFromAllSeries = this.getTimestampInSeries(point, this.series);
            this.cursorsStates.setActive(this.cursorsStates.getSelectedCursorIndex(), true);
            this.cursorsStates.setPosition(this.cursorsStates.getSelectedCursorIndex(), nearestTimestampFromAllSeries);
            this.cursorsStates.setHovered(this.cursorsStates.getSelectedCursorIndex(), this.getSerieCursorType(), false);
            this.updateCursorStates(this.cursorsStates);
        };
        /**
         * Internal method for actually moving the cursors. Pass the x and y
         * position on the property and this method will figure out where to
         * place the cursors and update the states accordingly
         *
         * @private
         * @param {number} x
         * @param {number} y
         * @returns
         * @memberof ChartBase
         */
        ChartBase.prototype.dragCursorAlongLine = function (x, y, hoverdSeries) {
            if (!this.series.length) {
                return;
            }
            if (hoverdSeries.length != 0) {
                var point = this.getChartCoordinateFromPixel(this.primaryXAxisName, this.scales[0].id, x, y);
                var nearestTimestampFromSingleSeries = this.getTimestampInSeries(point, hoverdSeries);
                this.cursorsStates.setPosition(this.cursorsStates.getSelectedCursorIndex(), nearestTimestampFromSingleSeries);
            }
            this.updateCursorStates(this.cursorsStates);
        };
        /**
         * This method is called by the userInteraction stragetgy whenever
         * the mouse is moved across a chart. If the mouse is above a cursor
         * this cursor updates it's own state to HOVERING and once it is no
         * longer below the mouse it will reset to it's previous state
         *
         * @memberof ChartBase
         */
        ChartBase.prototype.checkCursorsHovering = function (mousePoint) {
            if (this.cursorHandler != undefined) {
                var chartArea = this.chart.getChartArea();
                var actualMousePoint = new point_1.Point(mousePoint.x - chartArea.x, mousePoint.y - chartArea.y);
                var selectedCursorIndex = this.cursorsStates.getSelectedCursorIndex();
                var closestCursorPosition = this.cursorHandler.getClosestCursorPositionToPoint(actualMousePoint, selectedCursorIndex);
                if (closestCursorPosition != undefined) {
                    var distanceToCursor = closestCursorPosition.additionalInformation["distance"];
                    var currentlyHoveredSeries = this.hoveredSeries;
                    this.hoveredSeries = [];
                    var closestCursorIndex = void 0;
                    if (distanceToCursor < this.cursorHoverDistance) {
                        closestCursorPosition.additionalInformation["highlight"] = true;
                        closestCursorIndex = closestCursorPosition.additionalInformation["cursorIndex"];
                        this.hoveredSeries = closestCursorPosition.additionalInformation["series"];
                        //as the cursor state is not updated when the hoveredSeries change, the redraw has to be called manually
                        if (!this.seriesArrayEqualsSeriesArray(currentlyHoveredSeries, this.hoveredSeries)) {
                            this.updateUICursors(this.cursorsStates);
                        }
                    }
                    this.updateHoveringStatesInCursors(this.cursorsStates, closestCursorIndex);
                    this.updateCursorStates(this.cursorsStates);
                }
            }
        };
        /**
         * check if two arrays of type ChartViewSerie[] contain the exact same order of series by id
         *
         * @private
         * @param {ChartViewSerie[]} seriesArray1
         * @param {ChartViewSerie[]} seriesArray2
         * @returns {boolean}
         * @memberof ChartBase
         */
        ChartBase.prototype.seriesArrayEqualsSeriesArray = function (seriesArray1, seriesArray2) {
            if (seriesArray1.length != seriesArray2.length) {
                return false;
            }
            for (var i = 0; i < seriesArray1.length; i++) {
                if (seriesArray1[i].id != seriesArray2[i].id) {
                    return false;
                }
            }
            return true;
        };
        ChartBase.prototype.getSerieCursorType = function () {
            if (this.series.length > 0) {
                return cursorType_1.CursorTypeHelper.getCursorTypeForSeries(this.series[0].serie);
            }
            else {
                return undefined;
            }
        };
        /**
         * Reset cursor states with the given cursor type
         *
         * @param {CursorType} cursorType
         * @memberof ChartBase
         */
        ChartBase.prototype.resetCursorStates = function (cursorType) {
            this.cursorsStates.resetCursorStates(cursorType);
        };
        /**
         * Reset hovering of all cursors when mouse is outside of the charts
         *
         * @memberof ChartBase
         */
        ChartBase.prototype.resetCursorsHovered = function () {
            var hoveredCursor = this.cursorsStates.getHoveredCursorIndex();
            //If any cursor is hovered, reset all
            if (hoveredCursor !== -1) {
                this.hoveredSeries = [];
                this.updateHoveringStatesInCursors(this.cursorsStates, undefined);
                this.updateCursorStates(this.cursorsStates);
            }
        };
        /**
         * Internal method to calculate the state which is to be updated in the
         * states to be HOVERING. This method will also reset the correct states
         * to it's previous values if non of the cursors are hovering.
         *
         * @private
         * @param {CursorStates} cursorStates
         * @param {number} closestIndex
         * @returns {CursorStates}
         * @memberof ChartBase
         */
        ChartBase.prototype.updateHoveringStatesInCursors = function (cursorStates, closestIndex) {
            if (closestIndex !== undefined) {
                // Index of cursor found => set hovered flag
                cursorStates.setHovered(closestIndex, this.getSerieCursorType(), true);
            }
            else {
                // No index of cursor found => reset all hovered flags of all cursors
                cursorStates.setHovered(-1, this.getSerieCursorType(), false);
            }
            return cursorStates;
        };
        /**
         * Calculate zoom on mousewheel action
         *
         * @param {*} args
         * @memberof ChartBase
         */
        ChartBase.prototype.onChartMouseWheel = function (sender, args) {
            args.objectUnderMouse = this.getChartObjectUnderMouse(args.mousePoint.x, args.mousePoint.y);
            var eventUserChartInteractionArgs;
            eventUserChartInteractionArgs = new EventUserChartInteractionArgs(userInteractionController_1.MouseActionType.mouseWheel, args);
            this.eventUserChartInteraction.raise(this, eventUserChartInteractionArgs);
        };
        ;
        /**
         * Get if mouse is inside chart bounds
         *
         * @private
         * @param {*} mouseX
         * @param {*} mouseY
         * @returns {boolean}
         * @memberof ChartBase
         */
        ChartBase.prototype.mouseIsInChartBounds = function (mouseX, mouseY) {
            var isInBounds = true;
            var chartArea = this.chart.getChartArea();
            if (mouseX < chartArea.x || mouseX > (chartArea.x + chartArea.width)) {
                isInBounds = false;
            }
            if (mouseY < chartArea.y || mouseY > (chartArea.y + chartArea.height)) {
                isInBounds = false;
            }
            return isInBounds;
        };
        /**
         * Resize chart
         *
         * @param {*} width
         * @param {*} height
         * @memberof ChartBase
         */
        ChartBase.prototype.resize = function (width, height) {
            this.resizeChart(height, width);
        };
        /**
         * Resize Chart only if needed
         *
         * @private
         * @param {*} width
         * @param {*} height
         * @param {*} width
         * @memberof ChartBase
         */
        ChartBase.prototype.resizeChart = function (height, width) {
            if (this.flaggedForResize || this._actualHeight != height || this._actualWidth != width) {
                this._actualHeight = height, this._actualWidth = width;
                width = width - this.yAxisAlignmentOffset;
                this.chart.resize(height, width);
                this.redrawChart();
            }
        };
        /**
         * Redraws chart
         *
         * @param {boolean}
         * @memberof ChartBase
         */
        ChartBase.prototype.redrawChart = function () {
            this.chart.redraw();
            if (this.cursorHandler != undefined) {
                this.cursorHandler.updateChartArea(this.chart.getChartArea());
            }
            this.repositionCursors();
        };
        /**
         * Adds a given serie into a chart
         *
         * @param {Array<BaseSeries>} series
         * @param {Scale} scale
         * @memberof ChartBase
         */
        ChartBase.prototype.addSeriesToChart = function (series, yScale, updateRangeX) {
            for (var i = 0; i < series.length; i++) {
                if (series[i].rawPointsValid == true && this.series.map(function (e) { return e.serie; }).indexOf(series[i]) == -1) {
                    var chartSeries = new chartViewSerie_1.ChartViewSerie(series[i], yScale);
                    this.series.push(chartSeries);
                }
            }
        };
        /**
         * Remove a given serie from the chart
         *
         * @param {BaseSeries} serie
         * @param {boolean} resetCursorStates
         * @memberof ChartBase
         */
        ChartBase.prototype.removeSerieFromChart = function (serie, resetCursorStates) {
            var index = this.serieInChart(serie);
            var cursorType = this.getSerieCursorType();
            if (index > -1) {
                this.series.splice(index, 1);
            }
            this.setAvailableSeriesAsDataSource();
            //Reset cursor states if there are no more series in the chartView with the corresponding cursor type
            if (resetCursorStates) {
                this.resetCursorStates(cursorType);
            }
            //redraw cursors
            var states = this.getUsedCursorStates();
            for (var i = 0; i < states.length; i++) {
                var timestamp = states[i].position;
                this.drawCursor(timestamp, i, states[i].hovered, states[i].selected);
            }
        };
        ;
        /**
         *
         *
         * @private
         * @param {*} serie
         * @returns
         * @memberof ChartBase
         */
        ChartBase.prototype.serieInChart = function (serie) {
            for (var i = 0; i < this.series.length; i++) {
                if (this.series[i].id == serie.id) {
                    return i;
                }
            }
            return -1;
        };
        ChartBase.prototype.setZoomAxes = function (zoomAxes) {
            this.chart.setZoomDirection(zoomAxes);
        };
        ChartBase.prototype.setPanning = function (enable) {
            this.chart.enablePanning(enable);
        };
        /**
         * Panning operation
         *
         * @param {*} pageX
         * @param {*} pageY
         * @memberof ChartBase
         */
        ChartBase.prototype.doPanning = function (pageX, pageY) {
            this.chart.doPanning(pageX, pageY);
            this.eventRedrawAllCharts.raise(this, new EventRedrawAllChartsArgs(this.type));
        };
        ChartBase.prototype.resetPanningCoords = function () {
            //TODO: this is a only workaround, needs to be fixed 
            this.chart.prevPanningCoords = { 'x': undefined, 'y': undefined };
        };
        /**
         * Enables box zooming
         *
         * @param {boolean} enable
         * @memberof ChartBase
         */
        ChartBase.prototype.setBoxZoom = function (enable) {
            this.chart.enableBoxZoom(enable);
        };
        /**
         *Draw the cursor defined by its index for a given timestamp
         *
         * @private
         * @param {number} timestamp
         * @param {number} cursorIndex
         * @param {boolean} hovered
         * @param {boolean} selected
         * @returns
         * @memberof ChartBase
         */
        ChartBase.prototype.drawCursor = function (timestamp, cursorIndex, hovered, selected) {
            if (this.cursorHandler != undefined) {
                var leadCursorPixelPosition = void 0;
                var leadCursorTimestamp = void 0;
                //the cursorPosition for each serie is stored in an array
                var cursorPositions = [];
                //if the given timestamp is outside of the series bounds, the cursor must not be drawn at all
                var cursorOutOfSeriesBounds = true;
                for (var seriesIndex = 0; seriesIndex < this.series.length; seriesIndex++) {
                    if (timestamp >= this.series[seriesIndex].serie.timestamps[0] && timestamp <= this.series[seriesIndex].serie.timestamps[this.series[seriesIndex].serie.timestamps.length - 1]) {
                        cursorOutOfSeriesBounds = false;
                    }
                }
                if (cursorOutOfSeriesBounds == false) {
                    //leadCursorPosition has to be converted to pixels to be drawn
                    leadCursorPixelPosition = this.getPixelsFromChartPoint(timestamp, 0, this.primaryYAxisName);
                    //leadCursorTimestamp is needed to calculate the cursor positions for the other series (might be different from the timestamp argument)
                    leadCursorTimestamp = timestamp; //this.getTimestampInSeries(leadCursorChartPoint, allSeries);
                    //the cursor positions are calculated for each series to draw the squares for the timestamp indicator
                    cursorPositions = [];
                    for (var seriesIndex = 0; seriesIndex < this.series.length; seriesIndex++) {
                        //only draw the cursor for a series when it is within the series bounds of that chart
                        if (leadCursorTimestamp >= this.series[seriesIndex].serie.timestamps[0] && leadCursorTimestamp <= this.series[seriesIndex].serie.timestamps[this.series[seriesIndex].serie.timestamps.length - 1]) {
                            var cursorChartPoint = this.getCursorPoint(timestamp, this.series, seriesIndex);
                            var scaleId = this.getScaleIDForSeries(this.series[seriesIndex].serie);
                            var cursorPosition = this.getPixelsFromChartPoint(cursorChartPoint.x, cursorChartPoint.y, scaleId);
                            //set highlight to true if cursor is hovered and if its series is currently selected
                            var highlightCursor = false;
                            if (this.hoveredSeries.indexOf(this.series[seriesIndex]) != -1 && hovered && (this.series.length != this.hoveredSeries.length || this.hoveredSeries.length == 1)) {
                                highlightCursor = true;
                            }
                            cursorPositions.push(new CursorPositionInfo_1.CursorPosition(cursorPosition, { selected: selected, hovered: hovered, highlight: highlightCursor, series: [this.series[seriesIndex]], cursorIndex: cursorIndex }));
                        }
                    }
                }
                var leadCursorPosition = new CursorPositionInfo_1.CursorPosition(leadCursorPixelPosition, { selected: selected, hovered: hovered, series: this.series, cursorIndex: cursorIndex });
                this.cursorHandler.drawCursor(leadCursorPosition, cursorPositions, cursorIndex);
            }
        };
        ChartBase.prototype.getScaleIDForSeries = function (series) {
            for (var i = 0; i < this.scales.length; i++) {
                if (this.scales[i].hasSerie(series)) {
                    return this.scales[i].id;
                }
            }
            return "";
        };
        ChartBase.prototype.getScaleByScaleId = function (scaleId) {
            for (var i = 0; i < this.scales.length; i++) {
                if (scaleId == this.scales[i].id) {
                    return this.scales[i];
                }
            }
        };
        ChartBase.prototype.autoScaleYScales = function () {
            var scales = this.getYScales();
            var chartMinYPixel;
            var chartMaxYPixel;
            for (var _i = 0, scales_1 = scales; _i < scales_1.length; _i++) {
                var scale = scales_1[_i];
                var seriesMinY = this.getSeriesMinYForScale(scale);
                var seriesMaxY = this.getSeriesMaxYForScale(scale);
                if (seriesMinY != undefined && seriesMaxY != undefined) {
                    var axisMinYPixel = this.calculatePixelY(scale.id, seriesMinY);
                    var axisMaxYPixel = this.calculatePixelY(scale.id, seriesMaxY);
                    if (chartMinYPixel == undefined || axisMinYPixel > chartMinYPixel) {
                        chartMinYPixel = axisMinYPixel;
                    }
                    if (chartMaxYPixel == undefined || axisMaxYPixel < chartMaxYPixel) {
                        chartMaxYPixel = axisMaxYPixel;
                    }
                }
            }
            if (chartMinYPixel != undefined && chartMaxYPixel != undefined) {
                for (var _a = 0, scales_2 = scales; _a < scales_2.length; _a++) {
                    var scale = scales_2[_a];
                    var newAxisMinValue = this.getChartCoordinateFromPixel(this.primaryXAxisName, scale.id, 0, chartMinYPixel).y;
                    var newAxisMaxValue = this.getChartCoordinateFromPixel(this.primaryXAxisName, scale.id, 0, chartMaxYPixel).y;
                    this.updateRangeY(scale, newAxisMinValue, newAxisMaxValue);
                }
            }
        };
        /**
         * Sets the range for X Axis
         *
         * @param {number} newMinX
         * @param {number} newMaxX
         * @memberof ChartBase
         */
        ChartBase.prototype.setRangeX = function (newMinX, newMaxX) {
            this.scales[0].minXValue = newMinX;
            this.scales[0].maxXValue = newMaxX;
            //Trigger event so axis range can be persisted when 'AutoScale' or 'Reset All'  
            var args = new eventScaleDataChangedArgs_1.EventScaleDataChangedArgs(eventScaleDataChangedArgs_1.ScaleAction.xRangeChanged, { scale: this.scales[0] });
            this.scales[0].eventDataChanged.raise(this.scales[0], args);
            var axis = this.chart.getAxis(this.primaryXAxisName);
            if (axis != undefined) {
                axis.setAxisRange({ min: newMinX, max: newMaxX });
            }
        };
        /**
         *  Sets the range of this chart for the given axis and min/max values
         *
         *
         * @param {Scale} scale
         * @param {number} minXValue
         * @param {number} maxXValue
         * @param {number} minYValue
         * @param {number} maxYValue
         * @param {boolean} [setAxisRange=true]
         * @memberof ChartBase
         */
        ChartBase.prototype.setScaleRange = function (scale, minXValue, maxXValue, minYValue, maxYValue, orientation, setAxisRange) {
            if (setAxisRange === void 0) { setAxisRange = true; }
            scale.setScaleRange(minXValue, maxXValue, minYValue, maxYValue);
            if (setAxisRange) {
                var axis = this.chart.getAxis(scale.id);
                if (axis != undefined) {
                    axis.setAxisRange({ min: scale.minYValue, max: scale.maxYValue });
                }
            }
        };
        /**
         * Update Y range
         *
         * @private
         * @param {Scale} scale
         * @param {number} yAxisMaxValue
         * @param {number} yAxisMinValue
         * @memberof ChartBase
         */
        ChartBase.prototype.updateRangeY = function (scale, yAxisMinValue, yAxisMaxValue) {
            var chartRangeHelper = new chartRangeHelper_1.ChartRangeHelper;
            if (!isNaN(yAxisMaxValue) || !isNaN(yAxisMinValue)) {
                yAxisMaxValue = Number(yAxisMaxValue.toPrecision(14));
                yAxisMinValue = Number(yAxisMinValue.toPrecision(14));
                var yAxisRange = yAxisMaxValue - yAxisMinValue;
                var yAxisOffset = void 0;
                if (yAxisRange == 0) {
                    //if range is zero, we have to calculate an arbitrary offset to display the y axis correctly
                    yAxisOffset = chartRangeHelper.getAxisOffsetForStraightLines(yAxisMinValue);
                }
                else {
                    var axis = this.chart.getAxis(scale.id);
                    if (axis != undefined) {
                        var pixelRange = axis.getAxisRangeInPixel();
                        yAxisOffset = chartRangeHelper.getAxisOffset(yAxisRange, (pixelRange.max - pixelRange.min));
                    }
                }
                yAxisMaxValue += yAxisOffset;
                yAxisMinValue -= yAxisOffset;
                yAxisRange = yAxisMaxValue - yAxisMinValue;
                this.setScaleRange(scale, scale.minXValue, scale.maxXValue, yAxisMinValue, yAxisMaxValue);
            }
        };
        /**
         * Get min Y value from all the series in the chart
         *
         * @private
         * @param {Scale} scale
         * @returns {(number|undefined)}
         * @memberof ChartBase
         */
        ChartBase.prototype.getSeriesMinYForScale = function (scale) {
            var minY = undefined;
            for (var i = 0; i < scale.childs.length; i++) {
                if (minY == undefined || scale.childs[i].minY < minY) {
                    minY = scale.childs[i].minY;
                }
            }
            return minY;
        };
        /**
         * Get max Y value from all the series on the axis
         *
         * @private
         * @param {Scale} scale
         * @returns {(number|undefined)}
         * @memberof ChartBase
         */
        ChartBase.prototype.getSeriesMaxYForScale = function (scale) {
            var maxY = undefined;
            for (var i = 0; i < scale.childs.length; i++) {
                if (maxY == undefined || scale.childs[i].maxY > maxY) {
                    maxY = scale.childs[i].maxY;
                }
            }
            return maxY;
        };
        /**
         * Updates the available ui cursors according to the current state in response to a state change.
         *
         * @private
         * @param {CursorStates} modifiedState
         * @memberof ChartBase
         */
        ChartBase.prototype.updateUICursors = function (modifiedState) {
            try {
                var serieCursorType = this.getSerieCursorType();
                var cursorTimeStates = modifiedState.getTimeStates();
                var cursorFreqStates = modifiedState.getFrequencyStates();
                if (serieCursorType == cursorType_1.CursorType.timeDomain) {
                    this.updateCursorLoations(cursorTimeStates);
                }
                else if (serieCursorType == cursorType_1.CursorType.frequencyDomain) {
                    this.updateCursorLoations(cursorFreqStates);
                }
            }
            catch (error) {
                // the try catch block fixes an incorrect sequence when closing and reopening the analysis view as a workaround until
                // the binding connections will be cleaned up correctly.
                console.warn("ChartBase.updateUICursors: cursors could not be updated because of exception %o", error);
            }
        };
        ChartBase.prototype.updateCursorLoations = function (cursorStates) {
            for (var index = 0; index < cursorStates.length; index++) {
                // this.setCursorState(index, cursorStates[index]);
                // update the cursors only if they have a valid position
                var position = cursorStates[index].position;
                if (position != undefined) {
                    this.drawCursor(position, index, cursorStates[index].hovered, cursorStates[index].selected);
                }
            }
        };
        /**
         *
         *
         * @private
         * @returns
         * @memberof ChartBase
         */
        ChartBase.prototype.getMinXAxisValue = function () {
            var axis = this.chart.getAxis(this.primaryXAxisName);
            if (axis != undefined) {
                return axis.getAxisRange().min;
            }
        };
        /**
         *
         *
         * @private
         * @returns
         * @memberof ChartBase
         */
        ChartBase.prototype.getMaxXAxisValue = function () {
            var axis = this.chart.getAxis(this.primaryXAxisName);
            if (axis != undefined) {
                return axis.getAxisRange().max;
            }
        };
        /**
         *
         *
         * @private
         * @param {number} x
         * @param {number} y
         * @returns {{ x: number, y: number}}
         * @memberof ChartBase
         */
        ChartBase.prototype.getPixelsFromChartPoint = function (x, y, scaleID) {
            var chartArea = this.chart.getChartArea();
            return { x: this.calculatePixelX(x) - chartArea.x, y: this.calculatePixelY(scaleID, y) - chartArea.y };
        };
        /**
         * We reposition the cursors aswell when we update the chart
         *
         * @private
         * @memberof ChartBase
         */
        ChartBase.prototype.repositionCursors = function () {
            // Force updating the cursors states which in response updates the cursor ui ....
            //this.updateCursorStates(this.cursorsStates);
            this.updateUICursors(this.cursorsStates);
        };
        /**
         *
         *
         * @private
         * @param {number} chartX
         * @returns
         * @memberof ChartBase
         */
        ChartBase.prototype.calculatePixelX = function (chartX) {
            var minX = this.getMinXAxisValue();
            var maxX = this.getMaxXAxisValue();
            if (maxX != undefined && minX != undefined) {
                var range = (maxX - minX);
                var startX = minX;
                var actualRange = range;
                var timePercentage = (chartX - startX) / actualRange;
                var chartArea = this.chart.getChartArea();
                return chartArea.x + chartArea.width * timePercentage;
            }
            return 0;
        };
        /**
         *
         *
         * @private
         * @param {number} chartY
         * @returns
         * @memberof ChartBase
         */
        ChartBase.prototype.calculatePixelY = function (scaleID, chartY) {
            var axis = this.chart.getAxis(scaleID);
            if (axis != undefined) {
                var axisRange = axis.getAxisRange();
                var range = void 0;
                if (axisRange.delta != undefined) {
                    range = axisRange.delta;
                }
                else {
                    range = axisRange.max - axisRange.min;
                }
                var startY = axisRange.min;
                var valuePercentage = 1 - ((chartY - startY) / range);
                var chartArea = this.chart.getChartArea();
                return chartArea.y + chartArea.height * valuePercentage;
            }
            return 0;
        };
        /**
         * Remove drop locations from the chart
         *
         * @memberof ChartBase
         */
        ChartBase.prototype.removeSerieDropLocations = function () {
            var chartDiv = $(this.mainDiv);
            for (var _i = 0, _a = this.axisBounds; _i < _a.length; _i++) {
                var axisBound = _a[_i];
                var dropZoneDiv_1 = chartDiv.find("#" + this.axisDropZoneId + axisBound.axis.name);
                dropZoneDiv_1.remove();
            }
            var dropZoneDiv = chartDiv.find("#" + this.axisDropZoneId + "_chartArea");
            dropZoneDiv.remove();
        };
        /**
         * Get number of y axes inside a chart
         *
         * @returns {number}
         * @memberof ChartBase
         */
        ChartBase.prototype.getNumberOfYScales = function () {
            return this.scales.length;
        };
        /**
         * Get all y axes from a chart
         *
         * @returns {Scale[]}
         * @memberof ChartBase
         */
        ChartBase.prototype.getYScales = function () {
            return this.scales;
        };
        /**
         *
         *
         * @protected
         * @param {number} pixelCoordinateX
         * @param {number} pixelCoordinateY
         * @returns
         * @memberof XYChart
         */
        ChartBase.prototype.getChartCoordinateFromPixel = function (scaleIDX, scaleIDY, pixelCoordinateX, pixelCoordinateY) {
            var chartArea = this.chart.getChartArea();
            var xAxis = this.chart.getAxis(scaleIDX);
            var yAxis = this.chart.getAxis(scaleIDY);
            var yAxisRange = yAxis.getAxisRange();
            var xAxisRange = xAxis.getAxisRange();
            // X Axis: 
            var relativePixelCoordinateX = Big(pixelCoordinateX).minus(Big(chartArea.x));
            var chartAxisXRange = Big(xAxisRange.max).minus(Big(xAxisRange.min));
            var chartCoordinatePerPixel = chartAxisXRange.div(Big(chartArea.width));
            var closestXAxisValueToClick = Big(xAxisRange.min).plus((relativePixelCoordinateX.times(chartCoordinatePerPixel)));
            // Y Axis: 
            var relativePixelCoordinateY = Big(pixelCoordinateY).minus(Big(chartArea.y));
            var chartAxisYRange = Big(yAxisRange.max).minus(Big(yAxisRange.min));
            chartCoordinatePerPixel = chartAxisYRange.div(Big(chartArea.height));
            var closestYAxisValueToClick = Big(yAxisRange.min).plus(chartAxisYRange.minus(relativePixelCoordinateY.times(chartCoordinatePerPixel)));
            var closestYAxisValueNumber = Number(closestYAxisValueToClick.toFixed(14));
            var closestXAxisValueNumber = Number(closestXAxisValueToClick.toFixed(14));
            return new point_1.Point(closestXAxisValueNumber, closestYAxisValueNumber);
        };
        /**
         * gets a series point in chart coordinates for the specefied timestamp
         *
         * @protected
         * @param {number} timestamp
         * @returns {Point}
         * @memberof YTChart
         */
        ChartBase.prototype.getSeriesPointFromTimestamp = function (timestamp) {
            // we provide y == 0 if we are not able to find matching points
            var seriesPoint = new point_1.Point(timestamp, 0);
            // skip searching if the series index is out of range
            if (this.series.length == 0)
                return seriesPoint;
            // find a matching series point related to the timestamp
            seriesPoint = this.findNearestPointInAllSeries(timestamp);
            return seriesPoint;
        };
        /**
         * Searches for the nearest point related to the timestamp in all series
         *
         * @private
         * @param {number} timestamp
         * @returns
         * @memberof ChartBase
         */
        ChartBase.prototype.findNearestPointInAllSeries = function (timestamp) {
            // collect the nearest points from every series
            var nearestSeriesPoints = this.series.map(function (singleSeries) { return singleSeries.serie.pointFromTimestamp(timestamp); });
            // sort the nearest points by their timestamp value
            nearestSeriesPoints.sort(function (value1, value2) { return value1.x - value2.x; });
            // get the timestamp values
            var nearestSeriesTimestamps = nearestSeriesPoints.map(function (seriesPoint) { return seriesPoint.x; });
            // find the nearest point from all series. The found index refers to the nearest series !
            var nearestSeriesIndex = seriesHelper_1.SeriesHelper.indexOfNearest(timestamp, nearestSeriesTimestamps);
            // get the nearest point from the series
            var seriesPointFromTimeStamp = nearestSeriesPoints[nearestSeriesIndex];
            // create a point instance with a matching timestamp
            var seriesPoint = seriesPointFromTimeStamp ? new point_1.Point(seriesPointFromTimeStamp.x, seriesPointFromTimeStamp.y) : new point_1.Point(timestamp, 0);
            return seriesPoint;
        };
        // --------------------------------------------------- Overload methods in derived chart --------------------------------------------------- //
        ChartBase.prototype.removeYScaleFromChart = function (yScale) { };
        ;
        ChartBase.prototype.onSynchronizeScaleRange = function (scale, min, max) { };
        ChartBase.prototype.setAvailableSeriesAsDataSource = function () { };
        ChartBase.prototype.updateChartRangeX = function (xAxisMinValue, xAxisMaxValue) {
            var chartRangeHelper = new chartRangeHelper_1.ChartRangeHelper();
            if (xAxisMaxValue != undefined && xAxisMinValue != undefined) {
                var xAxisSegmentRange = xAxisMaxValue - xAxisMinValue;
                var xAxisOffset = void 0;
                if (xAxisSegmentRange == 0) {
                    xAxisOffset = chartRangeHelper.getAxisOffsetForStraightLines(this.series[0].rawPoints[0].x);
                }
                else {
                    var axis = this.chart.getAxis(this.primaryXAxisName);
                    if (axis != undefined) {
                        var axisPixelRange = axis.getAxisRangeInPixel();
                        xAxisOffset = chartRangeHelper.getAxisOffset(xAxisSegmentRange, (axisPixelRange.max - axisPixelRange.min));
                    }
                }
                xAxisMaxValue += xAxisOffset;
                xAxisMinValue -= xAxisOffset;
                xAxisSegmentRange = xAxisMaxValue - xAxisMinValue;
                this.setRangeX(xAxisMinValue, xAxisMaxValue);
            }
        };
        ChartBase.prototype.getTimestampInSeries = function (p, series) { return p.x; };
        ChartBase.prototype.getCursorPoint = function (timestamp, series, seriesIndex) { return { x: timestamp, y: 0, timestamp: timestamp }; };
        ChartBase.prototype.addSerieDropLocations = function (serie, chartManagerChart) { };
        ;
        ChartBase.prototype.addDropLocations = function (serie) { };
        ;
        ChartBase.prototype.getDropLocationType = function (currentTarget) { return DropLocationType.invalid; };
        ChartBase.prototype.addYScale = function (scale, position) { };
        ChartBase.prototype.updateDroppableAreas = function (currentTarget) { };
        ;
        ChartBase.prototype.resetHighlighting = function () { };
        ;
        ChartBase.prototype.getUsedCursorStates = function () { return []; };
        ;
        return ChartBase;
    }(widgetBase_1.WidgetBase));
    exports.ChartBase = ChartBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhcnRCYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0V2lkZ2V0L0NoYXJ0QmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBK0JBLElBQUssZUFPSjtJQVBELFdBQUssZUFBZTtRQUNoQix5REFBTSxDQUFBO1FBQ04seURBQU0sQ0FBQTtRQUNOLHFEQUFJLENBQUE7UUFDSixpRUFBVSxDQUFBO1FBQ1YsaUVBQVUsQ0FBQTtRQUNWLDJEQUFPLENBQUE7SUFDWCxDQUFDLEVBUEksZUFBZSxLQUFmLGVBQWUsUUFPbkI7SUFpeEM2SCwwQ0FBZTtJQS93QzdJLElBQUssZ0JBSUo7SUFKRCxXQUFLLGdCQUFnQjtRQUNqQixxRUFBVyxDQUFBO1FBQ1gseUVBQWEsQ0FBQTtRQUNiLDZEQUFPLENBQUE7SUFDWCxDQUFDLEVBSkksZ0JBQWdCLEtBQWhCLGdCQUFnQixRQUlwQjtJQTJ3QzhJLDRDQUFnQjtJQXp3Qy9KO1FBSUksZ0NBQVksZUFBZ0MsRUFBRSxJQUFVO1lBQ3BELElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLENBQUM7UUFDTCw2QkFBQztJQUFELENBQUMsQUFSRCxJQVFDO0lBaXdDZ0ssd0RBQXNCO0lBL3ZDdkw7UUFBd0MsNkNBQXFEO1FBQTdGOztRQUErRixDQUFDO1FBQUQsZ0NBQUM7SUFBRCxDQUFDLEFBQWhHLENBQXdDLG1CQUFVLEdBQThDO0lBK3ZDNUIsOERBQXlCO0lBL3ZDRyxDQUFDO0lBQ2pHO1FBSUksdUNBQVksb0JBQXFDLEVBQUUsY0FBb0I7WUFDbkUsSUFBSSxDQUFDLG9CQUFvQixHQUFHLG9CQUFvQixDQUFDO1lBQ2pELElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3pDLENBQUM7UUFDTCxvQ0FBQztJQUFELENBQUMsQUFS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QUVuQix1Q0FBbUIsR0FBN0IsY0FBdUQsT0FBTyxFQUFFLENBQUEsQ0FBQSxDQUFDO1FBQUEsQ0FBQztRQUN0RSxnQkFBQztJQUFELENBQUMsQUF6dUNELENBQWlDLHVCQUFVLEdBeXVDMUM7SUFFUSw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElUcmFjZUNoYXJ0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy90cmFjZUNoYXJ0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElDaGFydEF4aXMgfSBmcm9tIFwiLi4vLi4vY29yZS9pbnRlcmZhY2VzL2NvbXBvbmVudHMvdWkvY2hhcnQvQ2hhcnRBeGlzSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUN1cnNvclN0YXRlIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL2N1cnNvclN0YXRlSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElWaWV3IH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3ZpZXdJbnRlcmZhY2VcIjtcclxuXHJcbmltcG9ydCB7IElDaGFydCwgRXZlbnRBeGlzUmFuZ2VDaGFuZ2VkQXJncywgQXhpc09yaWVudGF0aW9uLCBFdmVudE1vdXNlQXJncywgRXZlbnRNb3VzZVdoZWVsQXJncywgQXhpc1Bvc2l0aW9ufSBmcm9tIFwiLi4vLi4vY29yZS9pbnRlcmZhY2VzL2NvbXBvbmVudHMvdWkvY2hhcnQvY2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ2hhcnRWaWV3V2lkZ2V0LCBab29tRGlyZWN0aW9uIH0gZnJvbSBcIi4uL2NoYXJ0Vmlld1dpZGdldC9jaGFydFZpZXdXaWRnZXRcIjtcclxuaW1wb3J0IHsgV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vd2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBDaGFydFJhbmdlSGVscGVyIH0gZnJvbSBcIi4vaGVscGVycy9jaGFydFJhbmdlSGVscGVyXCI7XHJcbmltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2V2ZW50c1wiO1xyXG5pbXBvcnQgeyBNb3VzZUFjdGlvblR5cGUgfSBmcm9tIFwiLi91c2VySW50ZXJhY3Rpb24vdXNlckludGVyYWN0aW9uQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vc2VyaWVzL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9wb2ludFwiO1xyXG5pbXBvcnQgeyBDdXJzb3JTdGF0ZXMgfSBmcm9tIFwiLi4vY29tbW9uL3N0YXRlcy9jdXJzb3JTdGF0ZXNcIjtcclxuaW1wb3J0IHsgQ3Vyc29ySGFuZGxlciB9IGZyb20gXCIuL2N1cnNvci9DdXJzb3JIYW5kbGVyXCI7XHJcbmltcG9ydCB7IEN1cnNvclBvc2l0aW9uIGFzIEN1cnNvclBvc2l0aW9uSW5mbyB9IGZyb20gXCIuL2N1cnNvci9DdXJzb3JQb3NpdGlvbkluZm9cIjtcclxuaW1wb3J0IHsgU2NhbGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9zY2FsZVwiO1xyXG5pbXBvcnQgeyBDaGFydFZpZXdTZXJpZSB9IGZyb20gXCIuL2NoYXJ0Vmlld1NlcmllXCI7XHJcbmltcG9ydCB7IFNlcmllc0hlbHBlciB9IGZyb20gXCIuLi8uLi9jb21tb24vc2VyaWVzSGVscGVyXCI7XHJcbmltcG9ydCB7IFNGQ2hhcnRXcmFwcGVyIH0gZnJvbSBcIi4vY2hhcnRXcmFwcGVyL1NGQ2hhcnRXcmFwcGVyXCI7XHJcbmltcG9ydCB7IEF4aXNCb3VuZHMgfSBmcm9tIFwiLi4vLi4vY29yZS90eXBlcy9BeGlzQm91bmRzXCI7XHJcbmltcG9ydCB7IEV2ZW50U2NhbGVEYXRhQ2hhbmdlZEFyZ3MsIFNjYWxlQWN0aW9uIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvZXZlbnRTY2FsZURhdGFDaGFuZ2VkQXJnc1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiB9IGZyb20gXCIuL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudEJhc2UgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50QmFzZVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRGYWN0b3J5IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRGYWN0b3J5L2NvbXBvbmVudEZhY3RvcnlcIjtcclxuaW1wb3J0IHsgQ2hhcnRUeXBlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRNYW5hZ2VyQ2hhcnRcIjtcclxuaW1wb3J0IHsgQ3Vyc29yVHlwZUhlbHBlciwgQ3Vyc29yVHlwZSB9IGZyb20gXCIuLi9jb21tb24vc3RhdGVzL2N1cnNvclR5cGVcIjtcclxuXHJcbmV4cG9ydCB0eXBlIFRpbWVQb2ludCA9IElQb2ludCAmIHt0aW1lc3RhbXA6IG51bWJlcn07XHJcblxyXG5lbnVtIENoYXJ0T2JqZWN0VHlwZXtcclxuICAgIGN1cnNvcixcclxuICAgIHNlcmllcyxcclxuICAgIGF4aXMsXHJcbiAgICBjaGFydFNwYWNlLFxyXG4gICAgZW1wdHlTcGFjZSxcclxuICAgIGludmFsaWQgICAgXHJcbn1cclxuXHJcbmVudW0gRHJvcExvY2F0aW9uVHlwZXtcclxuICAgIGFkZE5ld1NjYWxlLFxyXG4gICAgYXNzaWduVG9TY2FsZSxcclxuICAgIGludmFsaWRcclxufVxyXG5cclxuY2xhc3MgQ2hhcnRPYmplY3RJbmZvcm1hdGlvbntcclxuICAgIGNoYXJ0T2JqZWN0VHlwZTogQ2hhcnRPYmplY3RUeXBlO1xyXG4gICAgYXJncyA6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjaGFydE9iamVjdFR5cGU6IENoYXJ0T2JqZWN0VHlwZSwgYXJncyA6IGFueSl7XHJcbiAgICAgICAgdGhpcy5jaGFydE9iamVjdFR5cGUgPSBjaGFydE9iamVjdFR5cGU7XHJcbiAgICAgICAgdGhpcy5hcmdzID0gYXJncztcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgRXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbiBleHRlbmRzIFR5cGVkRXZlbnQgPENoYXJ0QmFzZSwgRXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3M+IHt9O1xyXG5jbGFzcyBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncyB7XHJcbiAgICBjaGFydEludGVyYWN0aW9uVHlwZTogTW91c2VBY3Rpb25UeXBlO1xyXG4gICAgZXZlbnRBcmd1bWVudHMgOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2hhcnRJbnRlcmFjdGlvblR5cGU6IE1vdXNlQWN0aW9uVHlwZSwgZXZlbnRBcmd1bWVudHMgOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmNoYXJ0SW50ZXJhY3Rpb25UeXBlID0gY2hhcnRJbnRlcmFjdGlvblR5cGU7XHJcbiAgICAgICAgdGhpcy5ldmVudEFyZ3VtZW50cyA9IGV2ZW50QXJndW1lbnRzO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBFdmVudFJlZHJhd0FsbENoYXJ0cyBleHRlbmRzIFR5cGVkRXZlbnQ8Q2hhcnRCYXNlLCBFdmVudFJlZHJhd0FsbENoYXJ0c0FyZ3M+IHt9O1xyXG5jbGFzcyBFdmVudFJlZHJhd0FsbENoYXJ0c0FyZ3MgeyAgICBcclxuICAgIGNoYXJ0VHlwZSA6IENoYXJ0VHlwZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAoY2hhcnRUeXBlIDogQ2hhcnRUeXBlKXtcclxuICAgICAgICB0aGlzLmNoYXJ0VHlwZSA9IGNoYXJ0VHlwZTtcclxuICAgIH1cclxufVxyXG5cclxuYWJzdHJhY3QgY2xhc3MgQ2hhcnRCYXNlIGV4dGVuZHMgV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElUcmFjZUNoYXJ0IHtcclxuXHJcbiAgICBwdWJsaWMgZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbiA6IEV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb247XHJcbiAgICBwdWJsaWMgZXZlbnRSZWRyYXdBbGxDaGFydHMgOiBFdmVudFJlZHJhd0FsbENoYXJ0cztcclxuICAgIFxyXG4gICAgdHlwZTtcclxuICAgIGN1cnNvclR5cGU7XHJcbiAgICB3aWRnZXROYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgdGV4dE1lYXN1cmVtZW50Q2FudmFzSWQ6IHN0cmluZyA9IFwidGV4dE1lYXN1cmVtZW50Q2FudmFzXCJcclxuICAgIFxyXG4gICAgY2hhcnRJbnN0YW5jZS8vICA6IGVqLmRhdGF2aXN1YWxpemF0aW9uLkNoYXJ0O1xyXG4gICAgY2hhcnQhIDogSUNoYXJ0O1xyXG5cclxuICAgIHNlcmllczogQXJyYXk8Q2hhcnRWaWV3U2VyaWU+ID0gW107XHJcbiAgICBob3ZlcmVkU2VyaWVzIDogQ2hhcnRWaWV3U2VyaWVbXSA9IFtdO1xyXG4gICAgc2NhbGVzOiBBcnJheTxTY2FsZT4gPSBbXTtcclxuXHJcbiAgICBwYXJlbnRWaWV3OiBJVmlldztcclxuICAgIFxyXG4gICAgLy9wcml2YXRlIGtleUV2ZW50c1BsYWNlZCA9IGZhbHNlO1xyXG5cclxuICAgIC8vIGhvbGRzIHRoZSBjdXJyZW50IGN1cnNvciBzdGF0ZXMgdmFsdWVzLiBXZSBpbml0aWFsaXplIHRoZSBtZW1iZXIgZm9yIGRlZmF1bHQuIFRoZSBlZmZlY3RpdmUgaW5pdGlhbGl6YXRpb24gdGFrZXMgcGxhY2Ugd2hlbiB0aGUgZXh0ZXJuYWwgc2hhcmVkIGluc3RhbmNlXHJcbiAgICAvLyBvZiB0aGUgY3Vyc29yIHN0YXRlcyBpcyBjcmVhdGVkIGFuZCByZWZsZWN0ZWQgdGhyb3VnaCB0aGUgY3Vyb3JTdGF0ZXMgc2V0dGVyIVxyXG4gICAgcHJvdGVjdGVkIF9jdXJzb3JTdGF0ZXM6IEN1cnNvclN0YXRlcyA9IG5ldyBDdXJzb3JTdGF0ZXMoKTtcclxuXHJcbiAgICBhYnN0cmFjdCBjdXJzb3JIYW5kbGVyOiBDdXJzb3JIYW5kbGVyfHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgY3Vyc29ySG92ZXJEaXN0YW5jZTogbnVtYmVyID0gODtcclxuICAgIHByb3RlY3RlZCBkcmFnZ2VkU2VyaWVzSW5kZXg6IG51bWJlciA9IDA7XHJcblxyXG4gICAgYWJzdHJhY3QgcHJpbWFyeVhBeGlzTmFtZTogc3RyaW5nO1xyXG4gICAgYWJzdHJhY3QgcHJpbWFyeVlBeGlzTmFtZTogc3RyaW5nO1xyXG4gICAgcHJvdGVjdGVkIGF4aXNCb3VuZHM6IEF4aXNCb3VuZHNbXSA9IFtdO1xyXG5cclxuICAgIHB1YmxpYyB4QXhpc1dpZHRoIDogbnVtYmVyID0gMFxyXG4gICAgXHJcbiAgICB5QXhpc0FsaWdubWVudE9mZnNldDogbnVtYmVyID0gMDtcclxuICAgIGZsYWdnZWRGb3JSZXNpemU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpZCBmb3IgdGhlIGF4aXMgZHJvcFpvbmVcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0IGF4aXNEcm9wWm9uZUlkKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5tYWluRGl2SWQgKyAnX2F4aXNEcm9wWm9uZSc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpZCBmb3IgdGhlIGF4aXMgY2hhcnQgYXJlYSBkcm9wWm9uZSBcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXQgYXhpc0Ryb3Bab25lQ2hhcnRBcmVhSWQoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF4aXNEcm9wWm9uZUlkICsgJ19jaGFydEFyZWEnO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBhcmVudFZpZXcgOiBJVmlldywgbmFtZTogc3RyaW5nLCBzY2FsZTogU2NhbGVbXSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgaWYodGhpcy5jb21wb25lbnQgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gVE9ETzogY29tcG9uZW50IHNob3VsZCBiZSBzZXQgYnkgY29tcG9uZW50IGZhY3Rvcnkgd2hlbiBjaGFydHMgY2FuIGJlIGNyZWF0ZWQgd2l0aCBjb21wb25lbnQgZmFjdG9yeVxyXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG5ldyBDb21wb25lbnRCYXNlKENvbXBvbmVudEZhY3RvcnkuZ2V0SW5zdGFuY2UoKSwgdGhpcyk7IFxyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVDb21wb25lbnQoKTtcclxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuYWRkRGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnR5cGUgPSBcIkNoYXJ0QmFzZVwiOyAvLyBUT0RPOiBSZW1vdmUgd2hlbiBjaGFydGJhc2UoeHljaGFydCwgZmZ0Y2hhcnQsIHl0Y2hhcnQpIHdpbGwgYmUgY3JlYXRlZCB3aXRoIHRoZSBjb21wb25lbnQgZmFjdG9yeVxyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmlkID0gbmFtZTtcclxuICAgICAgICB0aGlzLnBhcmVudFZpZXcgPSBwYXJlbnRWaWV3O1xyXG4gICAgICAgIHRoaXMud2lkZ2V0TmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5zY2FsZXMgPSBzY2FsZTtcclxuXHJcbiAgICAgICAgdGhpcy5ldmVudFVzZXJDaGFydEludGVyYWN0aW9uID0gbmV3IEV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb24oKTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVkcmF3QWxsQ2hhcnRzID0gbmV3IEV2ZW50UmVkcmF3QWxsQ2hhcnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXN0cm95IG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc3Bvc2UoKXtcclxuICAgICAgICAvLyBUT0RPOiBEaXNwb3NlIG9mIEN1cnNvclN0YXRlcyBtdXN0IGJlIGRvbmUgZ2xvYmFseVxyXG4gICAgICAgIHRoaXMuY3Vyc29yc1N0YXRlcy5kaXNwb3NlKCk7XHJcbiAgICAgICAgbGV0IGNoYXJ0T2JqID0gJCh0aGlzLm1haW5EaXYpLmRhdGEoXCJlakNoYXJ0XCIpO1xyXG4gICAgICAgIGlmKGNoYXJ0T2JqICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGNoYXJ0T2JqLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgLy8gVE9ETzogZGlzcG9zZSBvZiB0aGlzIHdpZGdldCBpcyBjYWxsZWQgZnJvbSBzcGxpdHRlciBhbmQgYWxzbyBmcm9tIHRoZSBjaGFydFZpZXdDaGFydE1hbmFnZXJcclxuICAgICAgICAgICAgLy9jb25zb2xlLndhcm4oXCJEaXNwb3NlIG9mIGNoYXJ0T2JqKD09IHVuZGVmaW5lZCkgbm90IHBvc3NpYmxlIVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpbml0aWFsaXplZCgpe1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemVkKCk7XHJcbiAgICAgICAgZm9yKGxldCBzY2FsZSBvZiB0aGlzLnNjYWxlcyl7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkU2VyaWVzVG9DaGFydChzY2FsZS5jaGlsZHMsIHNjYWxlLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbmV3Q2hhcnQgPSBuZXcgU0ZDaGFydFdyYXBwZXIodGhpcy5tYWluRGl2LCB0aGlzLnNjYWxlcywgdGhpcy5wcmltYXJ5WEF4aXNOYW1lKTtcclxuICAgICAgICBuZXdDaGFydC5ldmVudEF4aXNSYW5nZUNoYW5nZWQuYXR0YWNoKChzZW5kZXIsIGFyZ3MpID0+IHRoaXMub25BeGlzUmFuZ2VDaGFuZ2VkKHNlbmRlciwgYXJncykpO1xyXG4gICAgICAgIG5ld0NoYXJ0LmV2ZW50TW91c2VBY3Rpb24uYXR0YWNoKChzZW5kZXIsYXJncykgPT4gdGhpcy5vbk1vdXNlQWN0aW9uKHNlbmRlciwgYXJncykpO1xyXG4gICAgICAgIG5ld0NoYXJ0LmV2ZW50TW91c2VXaGVlbC5hdHRhY2goKHNlbmRlcixhcmdzKSA9PiB0aGlzLm9uQ2hhcnRNb3VzZVdoZWVsKHNlbmRlciwgYXJncykpO1xyXG5cclxuICAgICAgICB0aGlzLmNoYXJ0SW5zdGFuY2UgPSBuZXdDaGFydC5fU0ZDaGFydDtcclxuICAgICAgICB0aGlzLmNoYXJ0ID0gbmV3Q2hhcnQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zZXRCb3hab29tKGZhbHNlKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldERlZmF1bHREZWZpbml0aW9uKG5ldyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbigpKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgY3Vyc29ycyBzdGF0ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAdHlwZSB7VEN1cnNvclN0YXRlc31cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldCBjdXJzb3JzU3RhdGVzKCkgOiBDdXJzb3JTdGF0ZXMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJzb3JTdGF0ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGN1cnNvcnMgc3RhdGVzLiBUaGUgbWV0aG9kIGlzIGNhbGxlZCBhdXRvbWF0aWNhbGx5IHdoZW5ldmVyIGEgY3Vyc29yIHN0YXRlIGhhcyBiZWVuIGNoYW5nZWQgZXh0ZXJuYWxseS4gXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc2V0IGN1cnNvcnNTdGF0ZXMoY3Vyc29yU3RhdGVzIDogQ3Vyc29yU3RhdGVzKSB7XHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBiYWNrdXAgZmllbGRcclxuICAgICAgICB0aGlzLl9jdXJzb3JTdGF0ZXMgPSBjdXJzb3JTdGF0ZXM7XHJcbiAgICBcclxuICAgICAgICB0aGlzLnVwZGF0ZVVJQ3Vyc29ycyhjdXJzb3JTdGF0ZXMpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgY3Vyc29yIHN0YXRlcy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclN0YXRlc30gY3Vyc29yU3RhdGVzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCB1cGRhdGVDdXJzb3JTdGF0ZXMoY3Vyc29yU3RhdGVzOkN1cnNvclN0YXRlcyl7XHJcbiAgICAgICAgLy8gQklORElOR1NPVVJDRTogZGlzcGF0Y2hlcyB0aGUgbWV0aG9kIGNhbGwgdG8gYm91bmQgdGFyZ2V0c1xyXG4gICAgfVxyXG4gIFxyXG5cclxuICAgIHByaXZhdGUgb25BeGlzUmFuZ2VDaGFuZ2VkKHNlbmRlcjogSUNoYXJ0QXhpcywgYXJncyA6IEV2ZW50QXhpc1JhbmdlQ2hhbmdlZEFyZ3Mpe1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhcmdzLmF4aXNJRHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgc2NhbGU6IFNjYWxlfHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgLy9Xb3JrYXJvdW5kIHVudGlsIFgtQXhpcyBoYW5kbGluZyBpcyBpbXBsZW1lbnRlZCBjb3JyZWN0XHJcbiAgICAgICAgICAgIGlmKGFyZ3MuYXhpc0lEc1tpXSAhPSB0aGlzLnByaW1hcnlYQXhpc05hbWUpe1xyXG4gICAgICAgICAgICAgICAgc2NhbGU9IHRoaXMuZ2V0U2NhbGVCeVNjYWxlSWQoYXJncy5heGlzSURzW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgc2NhbGUgPSB0aGlzLnNjYWxlc1swXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihzY2FsZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGF4aXM6IElDaGFydEF4aXMgPSBzZW5kZXI7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmFuZ2UgPSBheGlzLmdldEF4aXNSYW5nZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYoYXhpcy5nZXRBeGlzT3JpZW50YXRpb24oKSA9PSBBeGlzT3JpZW50YXRpb24uaG9yaXpvbnRhbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTY2FsZVJhbmdlKHNjYWxlLCByYW5nZS5taW4sIHJhbmdlLm1heCwgc2NhbGUubWluWVZhbHVlLCBzY2FsZS5tYXhZVmFsdWUsIFwiXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihhcmdzLnN5bmNBeGlzID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50UmVkcmF3QWxsQ2hhcnRzLnJhaXNlKHRoaXMsIG5ldyBFdmVudFJlZHJhd0FsbENoYXJ0c0FyZ3ModGhpcy50eXBlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFNjYWxlUmFuZ2Uoc2NhbGUsIHNjYWxlLm1pblhWYWx1ZSwgc2NhbGUubWF4WFZhbHVlLCByYW5nZS5taW4sIHJhbmdlLm1heCwgXCJcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihhcmdzLmZvcmNlUmVkcmF3ID09IHRydWUpe1xyXG4gICAgICAgICAgICB0aGlzLnJlZHJhd0NoYXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSAgICAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbW91c2VYXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbW91c2VZXHJcbiAgICAgKiBAcmV0dXJucyB7Q2hhcnRPYmplY3RJbmZvcm1hdGlvbn1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldENoYXJ0T2JqZWN0VW5kZXJNb3VzZShtb3VzZVg6IG51bWJlciwgbW91c2VZOiBudW1iZXIpIDogQ2hhcnRPYmplY3RJbmZvcm1hdGlvbntcclxuICAgICAgICB0aGlzLmNhbGN1bGF0ZUNoYXJ0RGltZW5zaW9ucygpO1xyXG4gICAgICAgIGlmKHRoaXMubW91c2VJc0luQ2hhcnRCb3VuZHMobW91c2VYLCBtb3VzZVkpKXtcclxuXHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuY3Vyc29yc1N0YXRlcy5nZXRIb3ZlcmVkQ3Vyc29ySW5kZXgoKTtcclxuICAgICAgICAgICAgaWYoaW5kZXggIT09IC0xKXtcclxuICAgICAgICAgICAgICAgIC8vVE9ETzogbWlnaHQgYmUgYmV0dGVyIHRvIHVzZSBjdXJzb3IgaW5zdGFuY2UgaW5zdGVhZCBvZiBpbmRleFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDaGFydE9iamVjdEluZm9ybWF0aW9uKENoYXJ0T2JqZWN0VHlwZS5jdXJzb3IsIHtjdXJzb3JJbmRleDogaW5kZXh9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IENoYXJ0T2JqZWN0SW5mb3JtYXRpb24oQ2hhcnRPYmplY3RUeXBlLmNoYXJ0U3BhY2UsIHt9KTtcclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5heGlzQm91bmRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYoKG1vdXNlWCAtIHRoaXMuYXhpc0JvdW5kc1tpXS54KSA8ICh0aGlzLmF4aXNCb3VuZHNbaV0ud2lkdGgpICYmIG1vdXNlWCA+IHRoaXMuYXhpc0JvdW5kc1tpXS54KXtcclxuICAgICAgICAgICAgICAgIGlmKChtb3VzZVkgLSB0aGlzLmF4aXNCb3VuZHNbaV0ueSkgPCAodGhpcy5heGlzQm91bmRzW2ldLmhlaWdodCkgJiYgbW91c2VZID4gdGhpcy5heGlzQm91bmRzW2ldLnkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBheGlzID0gdGhpcy5jaGFydC5nZXRBeGlzKHRoaXMuYXhpc0JvdW5kc1tpXS5heGlzLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ2hhcnRPYmplY3RJbmZvcm1hdGlvbihDaGFydE9iamVjdFR5cGUuYXhpcywge2F4aXM6IGF4aXN9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBDaGFydE9iamVjdEluZm9ybWF0aW9uKENoYXJ0T2JqZWN0VHlwZS5lbXB0eVNwYWNlLCB7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjYWxjdWxhdGVDaGFydERpbWVuc2lvbnMoKXtcclxuICAgICAgICB0aGlzLmF4aXNCb3VuZHMgPSBbXTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zY2FsZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgYXhpcyA9IHRoaXMuY2hhcnQuZ2V0QXhpcyh0aGlzLnNjYWxlc1tpXS5pZCk7XHJcbiAgICAgICAgICAgIGlmKGF4aXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXhpc0JvdW5kcy5wdXNoKGF4aXMuZ2V0QXhpc0JvdW5kcygpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYXhpcyA9IHRoaXMuY2hhcnQuZ2V0QXhpcyh0aGlzLnByaW1hcnlYQXhpc05hbWUpO1xyXG4gICAgICAgIGlmKGF4aXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5heGlzQm91bmRzLnB1c2goYXhpcy5nZXRBeGlzQm91bmRzKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgb25Nb3VzZUFjdGlvbihzZW5kZXIsIGFyZ3M6IEV2ZW50TW91c2VBcmdzKXtcclxuICAgICAgICBzd2l0Y2ggKGFyZ3MubW91c2VBY3Rpb25UeXBlKXtcclxuICAgICAgICAgICAgY2FzZSAgTW91c2VBY3Rpb25UeXBlLm1vdXNlRG93biA6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25DaGFydE1vdXNlRG93bihzZW5kZXIsIGFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAgTW91c2VBY3Rpb25UeXBlLm1vdXNlVXAgOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhcnRNb3VzZVVwKHNlbmRlciwgYXJncyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgY2FzZSAgTW91c2VBY3Rpb25UeXBlLm1vdXNlTW92ZSA6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25DaGFydE1vdXNlTW92ZShzZW5kZXIsIGFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25DaGFydE1vdXNlRG93bihzZW5kZXIsIGFyZ3MgOiBFdmVudE1vdXNlQXJncyl7XHJcbiAgICAgICAgYXJncy5vYmplY3RVbmRlck1vdXNlID0gdGhpcy5nZXRDaGFydE9iamVjdFVuZGVyTW91c2UoYXJncy5tb3VzZVBvaW50Q2hhcnQueCwgYXJncy5tb3VzZVBvaW50Q2hhcnQueSk7XHJcbiAgICAgICAgbGV0IGV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzOiBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncztcclxuICAgICAgICBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncyA9IG5ldyBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncyhNb3VzZUFjdGlvblR5cGUubW91c2VEb3duLCBhcmdzKTtcclxuICAgICAgICBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncy5ldmVudEFyZ3VtZW50cy5ob3ZlcmVkU2VyaWVzID0gdGhpcy5ob3ZlcmVkU2VyaWVzO1xyXG4gICAgICAgIHRoaXMuZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbi5yYWlzZSh0aGlzLCBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncyk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQ2hhcnRNb3VzZVVwKHNlbmRlciwgYXJnczogRXZlbnRNb3VzZUFyZ3Mpe1xyXG4gICAgICAgIGFyZ3Mub2JqZWN0VW5kZXJNb3VzZSA9IHRoaXMuZ2V0Q2hhcnRPYmplY3RVbmRlck1vdXNlKGFyZ3MubW91c2VQb2ludENoYXJ0LngsIGFyZ3MubW91c2VQb2ludENoYXJ0LnkpO1xyXG4gICAgICAgIGxldCBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJnczogRXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3M7XHJcbiAgICAgICAgZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3MgPSBuZXcgRXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3MoTW91c2VBY3Rpb25UeXBlLm1vdXNlVXAsIGFyZ3MpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbi5yYWlzZSh0aGlzLCBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncyk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQ2hhcnRNb3VzZU1vdmUoc2VuZGVyLCBhcmdzOiBFdmVudE1vdXNlQXJncyl7XHJcbiAgICAgICAgbGV0IGNoYXJ0T2JqZWN0VW5kZXJNb3VzZSA6IENoYXJ0T2JqZWN0SW5mb3JtYXRpb24gPSB0aGlzLmdldENoYXJ0T2JqZWN0VW5kZXJNb3VzZShhcmdzLm1vdXNlUG9pbnRDaGFydC54LCBhcmdzLm1vdXNlUG9pbnRDaGFydC55KTtcclxuICAgICAgICBhcmdzLm9iamVjdFVuZGVyTW91c2UgPSBjaGFydE9iamVjdFVuZGVyTW91c2U7XHJcbiAgICAgICAgbGV0IGV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzOiBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncztcclxuICAgICAgICBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncyA9IG5ldyBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncyhNb3VzZUFjdGlvblR5cGUubW91c2VNb3ZlLCBhcmdzKTtcclxuICAgICAgICB0aGlzLmV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb24ucmFpc2UodGhpcywgZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3MpXHJcbiAgICAgICAgXHJcbiAgICB9O1xyXG5cclxuICAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2QgaXMgY2FsbGVkIGJ5IHRoZSBJbnRlcmFjdGlvblN0cmF0ZXRnaWVzIHdoZW4gYSBjbGljayBpbiB0aGVcclxuICAgICAqIGNoYXJ0IGhhcyBiZWVuIG1hZGUuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0Q3Vyc29yT25Qb2ludGVyUG9zaXRpb24obW91c2VQb2ludCA6IElQb2ludCl7XHJcbiAgICAgICAgdGhpcy5zZXRDdXJzb3IobW91c2VQb2ludC54LCBtb3VzZVBvaW50LnkpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tDdXJzb3JzSG92ZXJpbmcobW91c2VQb2ludCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnRlcm5hbCBtZXRob2QgZm9yIGFjdHVhbGx5IG1vdmluZyB0aGUgY3Vyc29ycy4gT3ZlcndyaXR0ZW4gaW4gRkZUQ2hhcnQudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHlcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBzZXRDdXJzb3IoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc2VyaWVzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY3Vyc29yc1N0YXRlcy5zZXRMYXN0Q3Vyc29yVHlwZVNlbGVjdGVkKEN1cnNvclR5cGUudGltZURvbWFpbik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGhvdmVyZWRDdXJzb3JJbmRleCA9ICB0aGlzLmN1cnNvcnNTdGF0ZXMuZ2V0SG92ZXJlZEN1cnNvckluZGV4KCk7XHJcbiAgICAgICAgaWYgKGhvdmVyZWRDdXJzb3JJbmRleCAhPSAtMSkgeyAvLyBTZXQgc2VsZWN0ZWQgY3Vyc29yIHdoZW4gaG92ZXJlZCBjdXJzb3Igd2FzIGZvdW5kXHJcbiAgICAgICAgICAgIHRoaXMuY3Vyc29yc1N0YXRlcy5zZXRTZWxlY3RlZChob3ZlcmVkQ3Vyc29ySW5kZXgsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJzb3JzU3RhdGVzLnNldFNlbGVjdGVkKCB0aGlzLmN1cnNvcnNTdGF0ZXMuZ2V0U2VsZWN0ZWRDdXJzb3JJbmRleCgpLCB0cnVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0ZWRDdXJzb3IoeCwgeSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXNzIHRoZSB4IGFuZCB5IHBvc2l0aW9uIG9uIHRoZSBwcm9wZXJ0eSBhbmQgdGhpcyBtZXRob2Qgd2lsbCBmaWd1cmUgb3V0IHdoZXJlIHRvXHJcbiAgICAgKiBwbGFjZSB0aGUgY3Vyc29ycyBhbmQgdXBkYXRlIHRoZSBzdGF0ZXMgYWNjb3JkaW5nbHlcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclN0YXRlc30gY3Vyc29yc1N0YXRlc1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCB1cGRhdGVTZWxlY3RlZEN1cnNvcih4OiBudW1iZXIsIHk6IG51bWJlcil7XHJcblxyXG4gICAgICAgIGxldCBwb2ludCA9IHRoaXMuZ2V0Q2hhcnRDb29yZGluYXRlRnJvbVBpeGVsKHRoaXMucHJpbWFyeVhBeGlzTmFtZSwgdGhpcy5zY2FsZXNbMF0uaWQsIHgsIHkpO1xyXG4gICAgICAgIGxldCBuZWFyZXN0VGltZXN0YW1wRnJvbUFsbFNlcmllcyA9IHRoaXMuZ2V0VGltZXN0YW1wSW5TZXJpZXMocG9pbnQsIHRoaXMuc2VyaWVzKTtcclxuXHJcbiAgICAgICAgdGhpcy5jdXJzb3JzU3RhdGVzLnNldEFjdGl2ZSh0aGlzLmN1cnNvcnNTdGF0ZXMuZ2V0U2VsZWN0ZWRDdXJzb3JJbmRleCgpLCB0cnVlKTtcclxuICAgICAgICB0aGlzLmN1cnNvcnNTdGF0ZXMuc2V0UG9zaXRpb24odGhpcy5jdXJzb3JzU3RhdGVzLmdldFNlbGVjdGVkQ3Vyc29ySW5kZXgoKSwgbmVhcmVzdFRpbWVzdGFtcEZyb21BbGxTZXJpZXMpO1xyXG4gICAgICAgIHRoaXMuY3Vyc29yc1N0YXRlcy5zZXRIb3ZlcmVkKHRoaXMuY3Vyc29yc1N0YXRlcy5nZXRTZWxlY3RlZEN1cnNvckluZGV4KCksIHRoaXMuZ2V0U2VyaWVDdXJzb3JUeXBlKCksIGZhbHNlKTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVDdXJzb3JTdGF0ZXModGhpcy5jdXJzb3JzU3RhdGVzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEludGVybmFsIG1ldGhvZCBmb3IgYWN0dWFsbHkgbW92aW5nIHRoZSBjdXJzb3JzLiBQYXNzIHRoZSB4IGFuZCB5XHJcbiAgICAgKiBwb3NpdGlvbiBvbiB0aGUgcHJvcGVydHkgYW5kIHRoaXMgbWV0aG9kIHdpbGwgZmlndXJlIG91dCB3aGVyZSB0b1xyXG4gICAgICogcGxhY2UgdGhlIGN1cnNvcnMgYW5kIHVwZGF0ZSB0aGUgc3RhdGVzIGFjY29yZGluZ2x5XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRyYWdDdXJzb3JBbG9uZ0xpbmUgKHg6IG51bWJlciwgeTogbnVtYmVyLCBob3ZlcmRTZXJpZXMpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc2VyaWVzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIHJldHVybjsgXHJcbiAgICAgICAgfSBcclxuICAgICAgIFxyXG4gICAgICAgIGlmKGhvdmVyZFNlcmllcy5sZW5ndGggIT0gMCl7XHJcbiAgICAgICAgICAgIGxldCBwb2ludCA9IHRoaXMuZ2V0Q2hhcnRDb29yZGluYXRlRnJvbVBpeGVsKHRoaXMucHJpbWFyeVhBeGlzTmFtZSwgdGhpcy5zY2FsZXNbMF0uaWQsIHgsIHkpO1xyXG4gICAgICAgICAgICBsZXQgbmVhcmVzdFRpbWVzdGFtcEZyb21TaW5nbGVTZXJpZXMgPSB0aGlzLmdldFRpbWVzdGFtcEluU2VyaWVzKHBvaW50LCBob3ZlcmRTZXJpZXMpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnNvcnNTdGF0ZXMuc2V0UG9zaXRpb24odGhpcy5jdXJzb3JzU3RhdGVzLmdldFNlbGVjdGVkQ3Vyc29ySW5kZXgoKSwgbmVhcmVzdFRpbWVzdGFtcEZyb21TaW5nbGVTZXJpZXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVDdXJzb3JTdGF0ZXModGhpcy5jdXJzb3JzU3RhdGVzKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYnkgdGhlIHVzZXJJbnRlcmFjdGlvbiBzdHJhZ2V0Z3kgd2hlbmV2ZXJcclxuICAgICAqIHRoZSBtb3VzZSBpcyBtb3ZlZCBhY3Jvc3MgYSBjaGFydC4gSWYgdGhlIG1vdXNlIGlzIGFib3ZlIGEgY3Vyc29yXHJcbiAgICAgKiB0aGlzIGN1cnNvciB1cGRhdGVzIGl0J3Mgb3duIHN0YXRlIHRvIEhPVkVSSU5HIGFuZCBvbmNlIGl0IGlzIG5vXHJcbiAgICAgKiBsb25nZXIgYmVsb3cgdGhlIG1vdXNlIGl0IHdpbGwgcmVzZXQgdG8gaXQncyBwcmV2aW91cyBzdGF0ZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNoZWNrQ3Vyc29yc0hvdmVyaW5nKG1vdXNlUG9pbnQ6IElQb2ludCl7XHJcbiAgICAgICAgaWYodGhpcy5jdXJzb3JIYW5kbGVyICE9IHVuZGVmaW5lZCl7XHJcblxyXG4gICAgICAgICAgICBsZXQgY2hhcnRBcmVhID0gdGhpcy5jaGFydC5nZXRDaGFydEFyZWEoKTtcclxuICAgICAgICAgICAgbGV0IGFjdHVhbE1vdXNlUG9pbnQgPSBuZXcgUG9pbnQobW91c2VQb2ludC54IC0gY2hhcnRBcmVhLngsIG1vdXNlUG9pbnQueSAtIGNoYXJ0QXJlYS55KTtcclxuICAgICAgICAgICAgbGV0IHNlbGVjdGVkQ3Vyc29ySW5kZXggPSB0aGlzLmN1cnNvcnNTdGF0ZXMuZ2V0U2VsZWN0ZWRDdXJzb3JJbmRleCgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGNsb3Nlc3RDdXJzb3JQb3NpdGlvbiA6IEN1cnNvclBvc2l0aW9uSW5mbyA9IHRoaXMuY3Vyc29ySGFuZGxlci5nZXRDbG9zZXN0Q3Vyc29yUG9zaXRpb25Ub1BvaW50KGFjdHVhbE1vdXNlUG9pbnQsIHNlbGVjdGVkQ3Vyc29ySW5kZXgpXHJcbiAgICAgICAgICAgIGlmKGNsb3Nlc3RDdXJzb3JQb3NpdGlvbiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpc3RhbmNlVG9DdXJzb3IgPSBjbG9zZXN0Q3Vyc29yUG9zaXRpb24uYWRkaXRpb25hbEluZm9ybWF0aW9uW1wiZGlzdGFuY2VcIl07XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50bHlIb3ZlcmVkU2VyaWVzIDogQ2hhcnRWaWV3U2VyaWVbXSA9IHRoaXMuaG92ZXJlZFNlcmllcztcclxuICAgICAgICAgICAgICAgIHRoaXMuaG92ZXJlZFNlcmllcyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBjbG9zZXN0Q3Vyc29ySW5kZXg7XHJcbiAgICAgICAgICAgICAgICBpZihkaXN0YW5jZVRvQ3Vyc29yIDwgdGhpcy5jdXJzb3JIb3ZlckRpc3RhbmNlKXtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZXN0Q3Vyc29yUG9zaXRpb24uYWRkaXRpb25hbEluZm9ybWF0aW9uW1wiaGlnaGxpZ2h0XCJdID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZXN0Q3Vyc29ySW5kZXggPSBjbG9zZXN0Q3Vyc29yUG9zaXRpb24uYWRkaXRpb25hbEluZm9ybWF0aW9uW1wiY3Vyc29ySW5kZXhcIl07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ob3ZlcmVkU2VyaWVzID0gY2xvc2VzdEN1cnNvclBvc2l0aW9uLmFkZGl0aW9uYWxJbmZvcm1hdGlvbltcInNlcmllc1wiXTsgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy9hcyB0aGUgY3Vyc29yIHN0YXRlIGlzIG5vdCB1cGRhdGVkIHdoZW4gdGhlIGhvdmVyZWRTZXJpZXMgY2hhbmdlLCB0aGUgcmVkcmF3IGhhcyB0byBiZSBjYWxsZWQgbWFudWFsbHlcclxuICAgICAgICAgICAgICAgICAgICBpZighdGhpcy5zZXJpZXNBcnJheUVxdWFsc1Nlcmllc0FycmF5KGN1cnJlbnRseUhvdmVyZWRTZXJpZXMsIHRoaXMuaG92ZXJlZFNlcmllcykpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVVJQ3Vyc29ycyh0aGlzLmN1cnNvcnNTdGF0ZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUhvdmVyaW5nU3RhdGVzSW5DdXJzb3JzKHRoaXMuY3Vyc29yc1N0YXRlcywgY2xvc2VzdEN1cnNvckluZGV4KTsgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDdXJzb3JTdGF0ZXModGhpcy5jdXJzb3JzU3RhdGVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjaGVjayBpZiB0d28gYXJyYXlzIG9mIHR5cGUgQ2hhcnRWaWV3U2VyaWVbXSBjb250YWluIHRoZSBleGFjdCBzYW1lIG9yZGVyIG9mIHNlcmllcyBieSBpZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0NoYXJ0Vmlld1NlcmllW119IHNlcmllc0FycmF5MVxyXG4gICAgICogQHBhcmFtIHtDaGFydFZpZXdTZXJpZVtdfSBzZXJpZXNBcnJheTJcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNlcmllc0FycmF5RXF1YWxzU2VyaWVzQXJyYXkoc2VyaWVzQXJyYXkxIDogQ2hhcnRWaWV3U2VyaWVbXSwgc2VyaWVzQXJyYXkyOiBDaGFydFZpZXdTZXJpZVtdKSA6IGJvb2xlYW57XHJcbiAgICAgICAgaWYoc2VyaWVzQXJyYXkxLmxlbmd0aCAhPSBzZXJpZXNBcnJheTIubGVuZ3RoKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNlcmllc0FycmF5MS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHNlcmllc0FycmF5MVtpXS5pZCAhPSBzZXJpZXNBcnJheTJbaV0uaWQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldFNlcmllQ3Vyc29yVHlwZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5zZXJpZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gQ3Vyc29yVHlwZUhlbHBlci5nZXRDdXJzb3JUeXBlRm9yU2VyaWVzKHRoaXMuc2VyaWVzWzBdLnNlcmllKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzZXQgY3Vyc29yIHN0YXRlcyB3aXRoIHRoZSBnaXZlbiBjdXJzb3IgdHlwZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yVHlwZX0gY3Vyc29yVHlwZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVzZXRDdXJzb3JTdGF0ZXMoY3Vyc29yVHlwZTogQ3Vyc29yVHlwZSkge1xyXG4gICAgICAgIHRoaXMuY3Vyc29yc1N0YXRlcy5yZXNldEN1cnNvclN0YXRlcyhjdXJzb3JUeXBlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2V0IGhvdmVyaW5nIG9mIGFsbCBjdXJzb3JzIHdoZW4gbW91c2UgaXMgb3V0c2lkZSBvZiB0aGUgY2hhcnRzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVzZXRDdXJzb3JzSG92ZXJlZCgpIHtcclxuICAgICAgICBsZXQgaG92ZXJlZEN1cnNvciA9IHRoaXMuY3Vyc29yc1N0YXRlcy5nZXRIb3ZlcmVkQ3Vyc29ySW5kZXgoKTtcclxuICAgICAgICAvL0lmIGFueSBjdXJzb3IgaXMgaG92ZXJlZCwgcmVzZXQgYWxsXHJcbiAgICAgICAgaWYgKGhvdmVyZWRDdXJzb3IgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaG92ZXJlZFNlcmllcyA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhvdmVyaW5nU3RhdGVzSW5DdXJzb3JzKHRoaXMuY3Vyc29yc1N0YXRlcywgdW5kZWZpbmVkKTsgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUN1cnNvclN0YXRlcyh0aGlzLmN1cnNvcnNTdGF0ZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEludGVybmFsIG1ldGhvZCB0byBjYWxjdWxhdGUgdGhlIHN0YXRlIHdoaWNoIGlzIHRvIGJlIHVwZGF0ZWQgaW4gdGhlXHJcbiAgICAgKiBzdGF0ZXMgdG8gYmUgSE9WRVJJTkcuIFRoaXMgbWV0aG9kIHdpbGwgYWxzbyByZXNldCB0aGUgY29ycmVjdCBzdGF0ZXNcclxuICAgICAqIHRvIGl0J3MgcHJldmlvdXMgdmFsdWVzIGlmIG5vbiBvZiB0aGUgY3Vyc29ycyBhcmUgaG92ZXJpbmcuIFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclN0YXRlc30gY3Vyc29yU3RhdGVzXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY2xvc2VzdEluZGV4XHJcbiAgICAgKiBAcmV0dXJucyB7Q3Vyc29yU3RhdGVzfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUhvdmVyaW5nU3RhdGVzSW5DdXJzb3JzIChjdXJzb3JTdGF0ZXM6IEN1cnNvclN0YXRlcywgY2xvc2VzdEluZGV4OiBudW1iZXJ8dW5kZWZpbmVkKSA6IEN1cnNvclN0YXRlcyB7XHJcbiAgICAgICAgaWYgKGNsb3Nlc3RJbmRleCAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gSW5kZXggb2YgY3Vyc29yIGZvdW5kID0+IHNldCBob3ZlcmVkIGZsYWdcclxuICAgICAgICAgICAgY3Vyc29yU3RhdGVzLnNldEhvdmVyZWQoY2xvc2VzdEluZGV4LCB0aGlzLmdldFNlcmllQ3Vyc29yVHlwZSgpLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgLy8gTm8gaW5kZXggb2YgY3Vyc29yIGZvdW5kID0+IHJlc2V0IGFsbCBob3ZlcmVkIGZsYWdzIG9mIGFsbCBjdXJzb3JzXHJcbiAgICAgICAgICAgIGN1cnNvclN0YXRlcy5zZXRIb3ZlcmVkKC0xLCB0aGlzLmdldFNlcmllQ3Vyc29yVHlwZSgpLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjdXJzb3JTdGF0ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGUgem9vbSBvbiBtb3VzZXdoZWVsIGFjdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb25DaGFydE1vdXNlV2hlZWwoc2VuZGVyLCBhcmdzIDogRXZlbnRNb3VzZVdoZWVsQXJncyl7XHJcbiAgICAgICAgYXJncy5vYmplY3RVbmRlck1vdXNlID0gdGhpcy5nZXRDaGFydE9iamVjdFVuZGVyTW91c2UoYXJncy5tb3VzZVBvaW50LngsIGFyZ3MubW91c2VQb2ludC55KTtcclxuICAgICAgICBsZXQgZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3M6IEV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzO1xyXG4gICAgICAgIGV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzID0gbmV3IEV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzKE1vdXNlQWN0aW9uVHlwZS5tb3VzZVdoZWVsLCBhcmdzKTtcclxuICAgICAgICB0aGlzLmV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb24ucmFpc2UodGhpcywgZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3MpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgaWYgbW91c2UgaXMgaW5zaWRlIGNoYXJ0IGJvdW5kc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IG1vdXNlWFxyXG4gICAgICogQHBhcmFtIHsqfSBtb3VzZVlcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1vdXNlSXNJbkNoYXJ0Qm91bmRzKG1vdXNlWCwgbW91c2VZKSA6IGJvb2xlYW57XHJcbiAgICAgICAgbGV0IGlzSW5Cb3VuZHMgPSB0cnVlO1xyXG4gICAgICAgIGxldCBjaGFydEFyZWEgPSB0aGlzLmNoYXJ0LmdldENoYXJ0QXJlYSgpO1xyXG4gICAgICAgIGlmKG1vdXNlWCA8IGNoYXJ0QXJlYS54IHx8IG1vdXNlWCA+IChjaGFydEFyZWEueCArIGNoYXJ0QXJlYS53aWR0aCkgICl7XHJcbiAgICAgICAgICAgIGlzSW5Cb3VuZHMgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobW91c2VZIDwgY2hhcnRBcmVhLnkgfHwgbW91c2VZID4gKGNoYXJ0QXJlYS55ICsgY2hhcnRBcmVhLmhlaWdodCkgICl7XHJcbiAgICAgICAgICAgIGlzSW5Cb3VuZHMgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlzSW5Cb3VuZHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNpemUgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IHdpZHRoXHJcbiAgICAgKiBAcGFyYW0geyp9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVzaXplKHdpZHRoLCBoZWlnaHQpe1xyXG4gICAgICAgIHRoaXMucmVzaXplQ2hhcnQoaGVpZ2h0LCB3aWR0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNpemUgQ2hhcnQgb25seSBpZiBuZWVkZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHsqfSBoZWlnaHRcclxuICAgICAqIEBwYXJhbSB7Kn0gd2lkdGhcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZXNpemVDaGFydChoZWlnaHQsIHdpZHRoKSB7XHJcbiAgICAgICAgaWYodGhpcy5mbGFnZ2VkRm9yUmVzaXplIHx8IHRoaXMuX2FjdHVhbEhlaWdodCAhPSBoZWlnaHQgfHwgdGhpcy5fYWN0dWFsV2lkdGggIT0gd2lkdGgpe1xyXG4gICAgICAgICAgICB0aGlzLl9hY3R1YWxIZWlnaHQgPSBoZWlnaHQsIHRoaXMuX2FjdHVhbFdpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgd2lkdGggPSB3aWR0aCAtIHRoaXMueUF4aXNBbGlnbm1lbnRPZmZzZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnQucmVzaXplKGhlaWdodCwgd2lkdGgpO1xyXG4gICAgICAgICAgICB0aGlzLnJlZHJhd0NoYXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVkcmF3cyBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlZHJhd0NoYXJ0KCkge1xyXG4gICAgICAgIHRoaXMuY2hhcnQucmVkcmF3KCk7XHJcbiAgICAgICAgaWYodGhpcy5jdXJzb3JIYW5kbGVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuY3Vyc29ySGFuZGxlci51cGRhdGVDaGFydEFyZWEodGhpcy5jaGFydC5nZXRDaGFydEFyZWEoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVwb3NpdGlvbkN1cnNvcnMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBnaXZlbiBzZXJpZSBpbnRvIGEgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEJhc2VTZXJpZXM+fSBzZXJpZXNcclxuICAgICAqIEBwYXJhbSB7U2NhbGV9IHNjYWxlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRTZXJpZXNUb0NoYXJ0KHNlcmllczogQXJyYXk8QmFzZVNlcmllcz4sIHlTY2FsZTogU2NhbGUsIHVwZGF0ZVJhbmdlWDogYm9vbGVhbil7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZXJpZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZiAoc2VyaWVzW2ldLnJhd1BvaW50c1ZhbGlkID09IHRydWUgJiYgdGhpcy5zZXJpZXMubWFwKGUgPT4gZS5zZXJpZSkuaW5kZXhPZihzZXJpZXNbaV0pID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hhcnRTZXJpZXMgPSBuZXcgQ2hhcnRWaWV3U2VyaWUoc2VyaWVzW2ldLCB5U2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXJpZXMucHVzaChjaGFydFNlcmllcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgYSBnaXZlbiBzZXJpZSBmcm9tIHRoZSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gcmVzZXRDdXJzb3JTdGF0ZXNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbW92ZVNlcmllRnJvbUNoYXJ0KHNlcmllOiBCYXNlU2VyaWVzfENoYXJ0Vmlld1NlcmllLCByZXNldEN1cnNvclN0YXRlczogYm9vbGVhbikge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zZXJpZUluQ2hhcnQoc2VyaWUpO1xyXG4gICAgICAgIGxldCBjdXJzb3JUeXBlID0gdGhpcy5nZXRTZXJpZUN1cnNvclR5cGUoKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlcmllcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXRBdmFpbGFibGVTZXJpZXNBc0RhdGFTb3VyY2UoKTtcclxuXHJcbiAgICAgICAgLy9SZXNldCBjdXJzb3Igc3RhdGVzIGlmIHRoZXJlIGFyZSBubyBtb3JlIHNlcmllcyBpbiB0aGUgY2hhcnRWaWV3IHdpdGggdGhlIGNvcnJlc3BvbmRpbmcgY3Vyc29yIHR5cGVcclxuICAgICAgICBpZiAocmVzZXRDdXJzb3JTdGF0ZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldEN1cnNvclN0YXRlcyhjdXJzb3JUeXBlISk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3JlZHJhdyBjdXJzb3JzXHJcbiAgICAgICAgbGV0IHN0YXRlcyA9IHRoaXMuZ2V0VXNlZEN1cnNvclN0YXRlcygpO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc3RhdGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHRpbWVzdGFtcCA9IHN0YXRlc1tpXS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5kcmF3Q3Vyc29yKHRpbWVzdGFtcCEsIGksIHN0YXRlc1tpXS5ob3ZlcmVkLCBzdGF0ZXNbaV0uc2VsZWN0ZWQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlcmllXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc2VyaWVJbkNoYXJ0KHNlcmllKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuc2VyaWVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VyaWVzW2ldLmlkID09IHNlcmllLmlkKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRab29tQXhlcyh6b29tQXhlczogWm9vbURpcmVjdGlvbil7XHJcbiAgICAgICAgdGhpcy5jaGFydC5zZXRab29tRGlyZWN0aW9uKHpvb21BeGVzKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQYW5uaW5nKGVuYWJsZTogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5jaGFydC5lbmFibGVQYW5uaW5nKGVuYWJsZSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFBhbm5pbmcgb3BlcmF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBwYWdlWFxyXG4gICAgICogQHBhcmFtIHsqfSBwYWdlWVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZG9QYW5uaW5nKHBhZ2VYLCBwYWdlWSl7XHJcbiAgICAgICAgdGhpcy5jaGFydC5kb1Bhbm5pbmcocGFnZVgsIHBhZ2VZKTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVkcmF3QWxsQ2hhcnRzLnJhaXNlKHRoaXMsIG5ldyBFdmVudFJlZHJhd0FsbENoYXJ0c0FyZ3ModGhpcy50eXBlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0UGFubmluZ0Nvb3Jkcygpe1xyXG4gICAgICAgIC8vVE9ETzogdGhpcyBpcyBhIG9ubHkgd29ya2Fyb3VuZCwgbmVlZHMgdG8gYmUgZml4ZWQgXHJcbiAgICAgICAgKHRoaXMuY2hhcnQgYXMgU0ZDaGFydFdyYXBwZXIpLnByZXZQYW5uaW5nQ29vcmRzID0geyd4JzogdW5kZWZpbmVkLCAneSc6IHVuZGVmaW5lZH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbmFibGVzIGJveCB6b29taW5nXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBlbmFibGVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldEJveFpvb20oZW5hYmxlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5jaGFydC5lbmFibGVCb3hab29tKGVuYWJsZSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqRHJhdyB0aGUgY3Vyc29yIGRlZmluZWQgYnkgaXRzIGluZGV4IGZvciBhIGdpdmVuIHRpbWVzdGFtcFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZXN0YW1wXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3Vyc29ySW5kZXhcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaG92ZXJlZFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBzZWxlY3RlZFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGRyYXdDdXJzb3IodGltZXN0YW1wOiBudW1iZXIsIGN1cnNvckluZGV4OiBudW1iZXIsIGhvdmVyZWQ6IGJvb2xlYW4sIHNlbGVjdGVkOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYodGhpcy5jdXJzb3JIYW5kbGVyICE9IHVuZGVmaW5lZCl7XHJcblxyXG4gICAgICAgICAgICBsZXQgbGVhZEN1cnNvclBpeGVsUG9zaXRpb247XHJcbiAgICAgICAgICAgIGxldCBsZWFkQ3Vyc29yVGltZXN0YW1wO1xyXG5cclxuICAgICAgICAgICAgLy90aGUgY3Vyc29yUG9zaXRpb24gZm9yIGVhY2ggc2VyaWUgaXMgc3RvcmVkIGluIGFuIGFycmF5XHJcbiAgICAgICAgICAgIGxldCBjdXJzb3JQb3NpdGlvbnMgOiBDdXJzb3JQb3NpdGlvbkluZm9bXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgLy9pZiB0aGUgZ2l2ZW4gdGltZXN0YW1wIGlzIG91dHNpZGUgb2YgdGhlIHNlcmllcyBib3VuZHMsIHRoZSBjdXJzb3IgbXVzdCBub3QgYmUgZHJhd24gYXQgYWxsXHJcbiAgICAgICAgICAgIGxldCBjdXJzb3JPdXRPZlNlcmllc0JvdW5kcyA9IHRydWU7XHJcbiAgICAgICAgICAgIGZvcihsZXQgc2VyaWVzSW5kZXggPSAwIDsgc2VyaWVzSW5kZXggPCB0aGlzLnNlcmllcy5sZW5ndGg7IHNlcmllc0luZGV4Kyspe1xyXG4gICAgICAgICAgICAgICAgaWYodGltZXN0YW1wID49IHRoaXMuc2VyaWVzW3Nlcmllc0luZGV4XS5zZXJpZS50aW1lc3RhbXBzWzBdICYmIHRpbWVzdGFtcCA8PSB0aGlzLnNlcmllc1tzZXJpZXNJbmRleF0uc2VyaWUudGltZXN0YW1wc1t0aGlzLnNlcmllc1tzZXJpZXNJbmRleF0uc2VyaWUudGltZXN0YW1wcy5sZW5ndGgtMV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvck91dE9mU2VyaWVzQm91bmRzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoY3Vyc29yT3V0T2ZTZXJpZXNCb3VuZHMgPT0gZmFsc2Upe1xyXG5cclxuICAgICAgICAgICAgICAgIC8vbGVhZEN1cnNvclBvc2l0aW9uIGhhcyB0byBiZSBjb252ZXJ0ZWQgdG8gcGl4ZWxzIHRvIGJlIGRyYXduXHJcbiAgICAgICAgICAgICAgICBsZWFkQ3Vyc29yUGl4ZWxQb3NpdGlvbiA9IHRoaXMuZ2V0UGl4ZWxzRnJvbUNoYXJ0UG9pbnQodGltZXN0YW1wLCAwLCB0aGlzLnByaW1hcnlZQXhpc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL2xlYWRDdXJzb3JUaW1lc3RhbXAgaXMgbmVlZGVkIHRvIGNhbGN1bGF0ZSB0aGUgY3Vyc29yIHBvc2l0aW9ucyBmb3IgdGhlIG90aGVyIHNlcmllcyAobWlnaHQgYmUgZGlmZmVyZW50IGZyb20gdGhlIHRpbWVzdGFtcCBhcmd1bWVudClcclxuICAgICAgICAgICAgICAgIGxlYWRDdXJzb3JUaW1lc3RhbXAgPSB0aW1lc3RhbXAvL3RoaXMuZ2V0VGltZXN0YW1wSW5TZXJpZXMobGVhZEN1cnNvckNoYXJ0UG9pbnQsIGFsbFNlcmllcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy90aGUgY3Vyc29yIHBvc2l0aW9ucyBhcmUgY2FsY3VsYXRlZCBmb3IgZWFjaCBzZXJpZXMgdG8gZHJhdyB0aGUgc3F1YXJlcyBmb3IgdGhlIHRpbWVzdGFtcCBpbmRpY2F0b3JcclxuICAgICAgICAgICAgICAgIGN1cnNvclBvc2l0aW9ucyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBzZXJpZXNJbmRleCA9IDAgOyBzZXJpZXNJbmRleCA8IHRoaXMuc2VyaWVzLmxlbmd0aDsgc2VyaWVzSW5kZXgrKyl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vb25seSBkcmF3IHRoZSBjdXJzb3IgZm9yIGEgc2VyaWVzIHdoZW4gaXQgaXMgd2l0aGluIHRoZSBzZXJpZXMgYm91bmRzIG9mIHRoYXQgY2hhcnRcclxuICAgICAgICAgICAgICAgICAgICBpZihsZWFkQ3Vyc29yVGltZXN0YW1wID49IHRoaXMuc2VyaWVzW3Nlcmllc0luZGV4XS5zZXJpZS50aW1lc3RhbXBzWzBdICYmIGxlYWRDdXJzb3JUaW1lc3RhbXAgPD0gdGhpcy5zZXJpZXNbc2VyaWVzSW5kZXhdLnNlcmllLnRpbWVzdGFtcHNbdGhpcy5zZXJpZXNbc2VyaWVzSW5kZXhdLnNlcmllLnRpbWVzdGFtcHMubGVuZ3RoLTFdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnNvckNoYXJ0UG9pbnQgPSB0aGlzLmdldEN1cnNvclBvaW50KHRpbWVzdGFtcCwgdGhpcy5zZXJpZXMsIHNlcmllc0luZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNjYWxlSWQgPSB0aGlzLmdldFNjYWxlSURGb3JTZXJpZXModGhpcy5zZXJpZXNbc2VyaWVzSW5kZXhdLnNlcmllKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnNvclBvc2l0aW9uID0gdGhpcy5nZXRQaXhlbHNGcm9tQ2hhcnRQb2ludChjdXJzb3JDaGFydFBvaW50LngsIGN1cnNvckNoYXJ0UG9pbnQueSwgc2NhbGVJZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NldCBoaWdobGlnaHQgdG8gdHJ1ZSBpZiBjdXJzb3IgaXMgaG92ZXJlZCBhbmQgaWYgaXRzIHNlcmllcyBpcyBjdXJyZW50bHkgc2VsZWN0ZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhpZ2hsaWdodEN1cnNvciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmhvdmVyZWRTZXJpZXMuaW5kZXhPZih0aGlzLnNlcmllc1tzZXJpZXNJbmRleF0gKSAhPSAtMSAmJiBob3ZlcmVkICYmICh0aGlzLnNlcmllcy5sZW5ndGggIT0gdGhpcy5ob3ZlcmVkU2VyaWVzLmxlbmd0aCB8fCB0aGlzLmhvdmVyZWRTZXJpZXMubGVuZ3RoID09IDEpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2hsaWdodEN1cnNvciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yUG9zaXRpb25zLnB1c2gobmV3IEN1cnNvclBvc2l0aW9uSW5mbyhjdXJzb3JQb3NpdGlvbiwge3NlbGVjdGVkOiBzZWxlY3RlZCwgaG92ZXJlZDogaG92ZXJlZCwgaGlnaGxpZ2h0OiBoaWdobGlnaHRDdXJzb3IsIHNlcmllczogW3RoaXMuc2VyaWVzW3Nlcmllc0luZGV4XV0sIGN1cnNvckluZGV4OiBjdXJzb3JJbmRleH0pKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgbGVhZEN1cnNvclBvc2l0aW9uID0gbmV3IEN1cnNvclBvc2l0aW9uSW5mbyhsZWFkQ3Vyc29yUGl4ZWxQb3NpdGlvbiwge3NlbGVjdGVkOiBzZWxlY3RlZCwgaG92ZXJlZDogaG92ZXJlZCwgc2VyaWVzOiB0aGlzLnNlcmllcywgY3Vyc29ySW5kZXg6IGN1cnNvckluZGV4fSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3Vyc29ySGFuZGxlci5kcmF3Q3Vyc29yKGxlYWRDdXJzb3JQb3NpdGlvbixjdXJzb3JQb3NpdGlvbnMsIGN1cnNvckluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldFNjYWxlSURGb3JTZXJpZXMoc2VyaWVzOiBCYXNlU2VyaWVzKSA6IHN0cmluZ3tcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zY2FsZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZih0aGlzLnNjYWxlc1tpXS5oYXNTZXJpZShzZXJpZXMpKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNjYWxlc1tpXS5pZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0U2NhbGVCeVNjYWxlSWQoc2NhbGVJZCkgOiBTY2FsZXx1bmRlZmluZWR7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuc2NhbGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYoc2NhbGVJZCA9PSB0aGlzLnNjYWxlc1tpXS5pZCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zY2FsZXNbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGF1dG9TY2FsZVlTY2FsZXMoKXtcclxuICAgICAgICBsZXQgc2NhbGVzID0gdGhpcy5nZXRZU2NhbGVzKCk7XHJcbiAgICAgICAgbGV0IGNoYXJ0TWluWVBpeGVsIDogbnVtYmVyfHVuZGVmaW5lZDtcclxuICAgICAgICBsZXQgY2hhcnRNYXhZUGl4ZWwgOiBudW1iZXJ8dW5kZWZpbmVkO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBzY2FsZSBvZiBzY2FsZXMpe1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVzTWluWSA9IHRoaXMuZ2V0U2VyaWVzTWluWUZvclNjYWxlKHNjYWxlKTtcclxuICAgICAgICAgICAgbGV0IHNlcmllc01heFkgPSB0aGlzLmdldFNlcmllc01heFlGb3JTY2FsZShzY2FsZSk7XHJcblxyXG4gICAgICAgICAgICBpZihzZXJpZXNNaW5ZICE9IHVuZGVmaW5lZCAmJiBzZXJpZXNNYXhZICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXhpc01pbllQaXhlbCA9IHRoaXMuY2FsY3VsYXRlUGl4ZWxZKHNjYWxlLmlkLCBzZXJpZXNNaW5ZKTtcclxuICAgICAgICAgICAgICAgIGxldCBheGlzTWF4WVBpeGVsID0gdGhpcy5jYWxjdWxhdGVQaXhlbFkoc2NhbGUuaWQsIHNlcmllc01heFkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGNoYXJ0TWluWVBpeGVsID09IHVuZGVmaW5lZCB8fCBheGlzTWluWVBpeGVsID4gY2hhcnRNaW5ZUGl4ZWwpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYXJ0TWluWVBpeGVsID0gYXhpc01pbllQaXhlbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGNoYXJ0TWF4WVBpeGVsID09IHVuZGVmaW5lZCB8fCBheGlzTWF4WVBpeGVsIDwgY2hhcnRNYXhZUGl4ZWwpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYXJ0TWF4WVBpeGVsID0gYXhpc01heFlQaXhlbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoY2hhcnRNaW5ZUGl4ZWwgIT0gdW5kZWZpbmVkICYmIGNoYXJ0TWF4WVBpeGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHNjYWxlIG9mIHNjYWxlcyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3QXhpc01pblZhbHVlID0gdGhpcy5nZXRDaGFydENvb3JkaW5hdGVGcm9tUGl4ZWwodGhpcy5wcmltYXJ5WEF4aXNOYW1lLCBzY2FsZS5pZCwgMCwgY2hhcnRNaW5ZUGl4ZWwpLnk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3QXhpc01heFZhbHVlID0gdGhpcy5nZXRDaGFydENvb3JkaW5hdGVGcm9tUGl4ZWwodGhpcy5wcmltYXJ5WEF4aXNOYW1lLCBzY2FsZS5pZCwgMCwgY2hhcnRNYXhZUGl4ZWwpLnk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVSYW5nZVkoc2NhbGUsbmV3QXhpc01pblZhbHVlLCBuZXdBeGlzTWF4VmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSByYW5nZSBmb3IgWCBBeGlzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG5ld01pblhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuZXdNYXhYXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRSYW5nZVgobmV3TWluWDogbnVtYmVyLCBuZXdNYXhYOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuc2NhbGVzWzBdLm1pblhWYWx1ZSA9IG5ld01pblg7XHJcbiAgICAgICAgdGhpcy5zY2FsZXNbMF0ubWF4WFZhbHVlID0gbmV3TWF4WDtcclxuXHJcbiAgICAgICAgLy9UcmlnZ2VyIGV2ZW50IHNvIGF4aXMgcmFuZ2UgY2FuIGJlIHBlcnNpc3RlZCB3aGVuICdBdXRvU2NhbGUnIG9yICdSZXNldCBBbGwnICBcclxuICAgICAgICBsZXQgYXJncyA9IG5ldyBFdmVudFNjYWxlRGF0YUNoYW5nZWRBcmdzKFNjYWxlQWN0aW9uLnhSYW5nZUNoYW5nZWQsIHtzY2FsZTogdGhpcy5zY2FsZXNbMF19KTtcclxuICAgICAgICB0aGlzLnNjYWxlc1swXS5ldmVudERhdGFDaGFuZ2VkLnJhaXNlKHRoaXMuc2NhbGVzWzBdLGFyZ3MpO1xyXG5cclxuICAgICAgICBsZXQgYXhpcyA9IHRoaXMuY2hhcnQuZ2V0QXhpcyh0aGlzLnByaW1hcnlYQXhpc05hbWUpO1xyXG4gICAgICAgIGlmKCBheGlzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGF4aXMuc2V0QXhpc1JhbmdlKHttaW46IG5ld01pblgsIG1heDogbmV3TWF4WH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIFNldHMgdGhlIHJhbmdlIG9mIHRoaXMgY2hhcnQgZm9yIHRoZSBnaXZlbiBheGlzIGFuZCBtaW4vbWF4IHZhbHVlc1xyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1NjYWxlfSBzY2FsZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1pblhWYWx1ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1heFhWYWx1ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1pbllWYWx1ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1heFlWYWx1ZVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbc2V0QXhpc1JhbmdlPXRydWVdXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRTY2FsZVJhbmdlKHNjYWxlOiBTY2FsZSwgbWluWFZhbHVlOiBudW1iZXIsIG1heFhWYWx1ZTogbnVtYmVyLCBtaW5ZVmFsdWU6IG51bWJlciwgbWF4WVZhbHVlOiBudW1iZXIsIG9yaWVudGF0aW9uPzogc3RyaW5nLCBzZXRBeGlzUmFuZ2UgPSB0cnVlKSB7XHJcbiAgICAgICAgc2NhbGUuc2V0U2NhbGVSYW5nZShtaW5YVmFsdWUsIG1heFhWYWx1ZSwgbWluWVZhbHVlLCBtYXhZVmFsdWUpO1xyXG5cclxuICAgICAgICBpZiAoc2V0QXhpc1JhbmdlKSB7XHJcbiAgICAgICAgICAgIGxldCBheGlzID0gdGhpcy5jaGFydC5nZXRBeGlzKHNjYWxlLmlkKTtcclxuICAgICAgICAgICAgaWYgKGF4aXMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBheGlzLnNldEF4aXNSYW5nZSh7IG1pbjogc2NhbGUubWluWVZhbHVlLCBtYXg6IHNjYWxlLm1heFlWYWx1ZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZSBZIHJhbmdlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7U2NhbGV9IHNjYWxlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geUF4aXNNYXhWYWx1ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHlBeGlzTWluVmFsdWVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVwZGF0ZVJhbmdlWShzY2FsZTogU2NhbGUsIHlBeGlzTWluVmFsdWU6IG51bWJlciwgeUF4aXNNYXhWYWx1ZTogbnVtYmVyKXtcclxuICAgICAgICBsZXQgY2hhcnRSYW5nZUhlbHBlciA9IG5ldyBDaGFydFJhbmdlSGVscGVyO1xyXG4gICAgXHJcbiAgICAgICAgaWYoIWlzTmFOKHlBeGlzTWF4VmFsdWUpIHx8ICFpc05hTih5QXhpc01pblZhbHVlKSl7XHJcblxyXG4gICAgICAgICAgICB5QXhpc01heFZhbHVlID0gTnVtYmVyKHlBeGlzTWF4VmFsdWUudG9QcmVjaXNpb24oMTQpKTtcclxuICAgICAgICAgICAgeUF4aXNNaW5WYWx1ZSA9IE51bWJlcih5QXhpc01pblZhbHVlLnRvUHJlY2lzaW9uKDE0KSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgeUF4aXNSYW5nZSA9IHlBeGlzTWF4VmFsdWUgLSB5QXhpc01pblZhbHVlO1xyXG4gICAgICAgICAgICBsZXQgeUF4aXNPZmZzZXQ7XHJcbiAgICAgICAgICAgIGlmKHlBeGlzUmFuZ2UgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAvL2lmIHJhbmdlIGlzIHplcm8sIHdlIGhhdmUgdG8gY2FsY3VsYXRlIGFuIGFyYml0cmFyeSBvZmZzZXQgdG8gZGlzcGxheSB0aGUgeSBheGlzIGNvcnJlY3RseVxyXG4gICAgICAgICAgICAgICAgeUF4aXNPZmZzZXQgPSBjaGFydFJhbmdlSGVscGVyLmdldEF4aXNPZmZzZXRGb3JTdHJhaWdodExpbmVzKHlBeGlzTWluVmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXhpcyA9IHRoaXMuY2hhcnQuZ2V0QXhpcyhzY2FsZS5pZCk7XHJcbiAgICAgICAgICAgICAgICBpZihheGlzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBpeGVsUmFuZ2UgPSBheGlzLmdldEF4aXNSYW5nZUluUGl4ZWwoKVxyXG4gICAgICAgICAgICAgICAgICAgIHlBeGlzT2Zmc2V0ID0gY2hhcnRSYW5nZUhlbHBlci5nZXRBeGlzT2Zmc2V0KHlBeGlzUmFuZ2UsKHBpeGVsUmFuZ2UubWF4IC0gcGl4ZWxSYW5nZS5taW4pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgeUF4aXNNYXhWYWx1ZSArPSB5QXhpc09mZnNldDtcclxuICAgICAgICAgICAgeUF4aXNNaW5WYWx1ZSAtPSB5QXhpc09mZnNldDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHlBeGlzUmFuZ2UgPSB5QXhpc01heFZhbHVlISAtIHlBeGlzTWluVmFsdWUhXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2NhbGVSYW5nZShzY2FsZSwgc2NhbGUubWluWFZhbHVlLCBzY2FsZS5tYXhYVmFsdWUsIHlBeGlzTWluVmFsdWUsIHlBeGlzTWF4VmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBtaW4gWSB2YWx1ZSBmcm9tIGFsbCB0aGUgc2VyaWVzIGluIHRoZSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1NjYWxlfSBzY2FsZVxyXG4gICAgICogQHJldHVybnMgeyhudW1iZXJ8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFNlcmllc01pbllGb3JTY2FsZShzY2FsZTogU2NhbGUpIDogbnVtYmVyfHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgbWluWTogbnVtYmVyfHVuZGVmaW5lZCA9IHVuZGVmaW5lZFxyXG4gICAgXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNjYWxlLmNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmIChtaW5ZID09IHVuZGVmaW5lZCB8fCBzY2FsZS5jaGlsZHNbaV0ubWluWSEgPCBtaW5ZKXtcclxuICAgICAgICAgICAgICAgIG1pblkgPSBzY2FsZS5jaGlsZHNbaV0ubWluWTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWluWTsgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBtYXggWSB2YWx1ZSBmcm9tIGFsbCB0aGUgc2VyaWVzIG9uIHRoZSBheGlzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7U2NhbGV9IHNjYWxlXHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlcnx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0U2VyaWVzTWF4WUZvclNjYWxlKHNjYWxlOiBTY2FsZSk6IG51bWJlcnx1bmRlZmluZWR7XHJcbiAgICAgICAgbGV0IG1heFk6IG51bWJlciB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZFxyXG4gICAgXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNjYWxlLmNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmIChtYXhZID09IHVuZGVmaW5lZCB8fCBzY2FsZS5jaGlsZHNbaV0ubWF4WSEgPiBtYXhZKXtcclxuICAgICAgICAgICAgICAgIG1heFkgPSBzY2FsZS5jaGlsZHNbaV0ubWF4WTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWF4WTsgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGF2YWlsYWJsZSB1aSBjdXJzb3JzIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBzdGF0ZSBpbiByZXNwb25zZSB0byBhIHN0YXRlIGNoYW5nZS5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JTdGF0ZXN9IG1vZGlmaWVkU3RhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVVSUN1cnNvcnMgKG1vZGlmaWVkU3RhdGU6IEN1cnNvclN0YXRlcykge1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVDdXJzb3JUeXBlID0gdGhpcy5nZXRTZXJpZUN1cnNvclR5cGUoKTtcclxuICAgICAgICAgICAgbGV0IGN1cnNvclRpbWVTdGF0ZXMgPSBtb2RpZmllZFN0YXRlLmdldFRpbWVTdGF0ZXMoKTtcclxuICAgICAgICAgICAgbGV0IGN1cnNvckZyZXFTdGF0ZXMgPSBtb2RpZmllZFN0YXRlLmdldEZyZXF1ZW5jeVN0YXRlcygpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGlmIChzZXJpZUN1cnNvclR5cGUgPT0gQ3Vyc29yVHlwZS50aW1lRG9tYWluKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUN1cnNvckxvYXRpb25zKGN1cnNvclRpbWVTdGF0ZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHNlcmllQ3Vyc29yVHlwZSA9PSBDdXJzb3JUeXBlLmZyZXF1ZW5jeURvbWFpbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDdXJzb3JMb2F0aW9ucyhjdXJzb3JGcmVxU3RhdGVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIC8vIHRoZSB0cnkgY2F0Y2ggYmxvY2sgZml4ZXMgYW4gaW5jb3JyZWN0IHNlcXVlbmNlIHdoZW4gY2xvc2luZyBhbmQgcmVvcGVuaW5nIHRoZSBhbmFseXNpcyB2aWV3IGFzIGEgd29ya2Fyb3VuZCB1bnRpbFxyXG4gICAgICAgICAgICAvLyB0aGUgYmluZGluZyBjb25uZWN0aW9ucyB3aWxsIGJlIGNsZWFuZWQgdXAgY29ycmVjdGx5LlxyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJDaGFydEJhc2UudXBkYXRlVUlDdXJzb3JzOiBjdXJzb3JzIGNvdWxkIG5vdCBiZSB1cGRhdGVkIGJlY2F1c2Ugb2YgZXhjZXB0aW9uICVvXCIsZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSB1cGRhdGVDdXJzb3JMb2F0aW9ucyAoY3Vyc29yU3RhdGVzOiBJQ3Vyc29yU3RhdGVbXSkge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjdXJzb3JTdGF0ZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuc2V0Q3Vyc29yU3RhdGUoaW5kZXgsIGN1cnNvclN0YXRlc1tpbmRleF0pO1xyXG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIGN1cnNvcnMgb25seSBpZiB0aGV5IGhhdmUgYSB2YWxpZCBwb3NpdGlvblxyXG4gICAgICAgICAgICBsZXQgcG9zaXRpb24gPSBjdXJzb3JTdGF0ZXNbaW5kZXhdLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICBpZiAocG9zaXRpb24gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdDdXJzb3IocG9zaXRpb24sIGluZGV4LCBjdXJzb3JTdGF0ZXNbaW5kZXhdLmhvdmVyZWQsIGN1cnNvclN0YXRlc1tpbmRleF0uc2VsZWN0ZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRNaW5YQXhpc1ZhbHVlICgpICB7XHJcbiAgICAgICAgbGV0IGF4aXMgPSB0aGlzLmNoYXJ0LmdldEF4aXModGhpcy5wcmltYXJ5WEF4aXNOYW1lKTtcclxuICAgICAgICBpZihheGlzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiBheGlzLmdldEF4aXNSYW5nZSgpLm1pblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0TWF4WEF4aXNWYWx1ZSAoKSB7XHJcbiAgICAgICAgbGV0IGF4aXMgPSB0aGlzLmNoYXJ0LmdldEF4aXModGhpcy5wcmltYXJ5WEF4aXNOYW1lKTtcclxuICAgICAgICBpZihheGlzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiBheGlzLmdldEF4aXNSYW5nZSgpLm1heFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geVxyXG4gICAgICogQHJldHVybnMge3sgeDogbnVtYmVyLCB5OiBudW1iZXJ9fVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFBpeGVsc0Zyb21DaGFydFBvaW50ICh4OiBudW1iZXIsIHk6IG51bWJlciwgc2NhbGVJRDogc3RyaW5nKTogeyB4OiBudW1iZXIsIHk6IG51bWJlcn0ge1xyXG4gICAgICAgIGxldCBjaGFydEFyZWEgPSB0aGlzLmNoYXJ0LmdldENoYXJ0QXJlYSgpO1xyXG4gICAgICAgIHJldHVybiB7IHg6IHRoaXMuY2FsY3VsYXRlUGl4ZWxYKHgpIC0gY2hhcnRBcmVhLngsIHk6IHRoaXMuY2FsY3VsYXRlUGl4ZWxZKHNjYWxlSUQsIHkpIC0gY2hhcnRBcmVhLnl9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2UgcmVwb3NpdGlvbiB0aGUgY3Vyc29ycyBhc3dlbGwgd2hlbiB3ZSB1cGRhdGUgdGhlIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHJlcG9zaXRpb25DdXJzb3JzKCkge1xyXG4gICAgICAgIC8vIEZvcmNlIHVwZGF0aW5nIHRoZSBjdXJzb3JzIHN0YXRlcyB3aGljaCBpbiByZXNwb25zZSB1cGRhdGVzIHRoZSBjdXJzb3IgdWkgLi4uLlxyXG4gICAgICAgIC8vdGhpcy51cGRhdGVDdXJzb3JTdGF0ZXModGhpcy5jdXJzb3JzU3RhdGVzKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVVJQ3Vyc29ycyh0aGlzLmN1cnNvcnNTdGF0ZXMpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjaGFydFhcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlUGl4ZWxYIChjaGFydFg6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IG1pblggPSB0aGlzLmdldE1pblhBeGlzVmFsdWUoKTtcclxuICAgICAgICBsZXQgbWF4WCA9IHRoaXMuZ2V0TWF4WEF4aXNWYWx1ZSgpOyBcclxuXHJcbiAgICAgICAgaWYobWF4WCAhPSB1bmRlZmluZWQgJiYgbWluWCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgcmFuZ2UgPSAobWF4WCAtIG1pblgpXHJcbiAgICAgICAgICAgIGxldCBzdGFydFggPSBtaW5YOyBcclxuICAgICAgICAgICAgbGV0IGFjdHVhbFJhbmdlID0gcmFuZ2U7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGltZVBlcmNlbnRhZ2UgPSAoY2hhcnRYIC0gc3RhcnRYKSAvIGFjdHVhbFJhbmdlO1xyXG5cclxuICAgICAgICAgICAgbGV0IGNoYXJ0QXJlYSA9IHRoaXMuY2hhcnQuZ2V0Q2hhcnRBcmVhKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjaGFydEFyZWEueCArIGNoYXJ0QXJlYS53aWR0aCAqIHRpbWVQZXJjZW50YWdlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfSBcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY2hhcnRZXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZVBpeGVsWSAoc2NhbGVJRDogc3RyaW5nLCBjaGFydFk6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGF4aXMgPSB0aGlzLmNoYXJ0LmdldEF4aXMoc2NhbGVJRCk7XHJcbiAgICAgICAgaWYoYXhpcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgYXhpc1JhbmdlID0gYXhpcy5nZXRBeGlzUmFuZ2UoKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHJhbmdlO1xyXG4gICAgICAgICAgICBpZihheGlzUmFuZ2UuZGVsdGEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHJhbmdlID0gYXhpc1JhbmdlLmRlbHRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICByYW5nZSA9IGF4aXNSYW5nZS5tYXggLSBheGlzUmFuZ2UubWluO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgc3RhcnRZID0gYXhpc1JhbmdlLm1pbjtcclxuICAgICAgICAgICAgbGV0IHZhbHVlUGVyY2VudGFnZSA9IDEgLSAoKGNoYXJ0WSAtIHN0YXJ0WSkgLyByYW5nZSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgY2hhcnRBcmVhID0gdGhpcy5jaGFydC5nZXRDaGFydEFyZWEoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNoYXJ0QXJlYS55ICsgY2hhcnRBcmVhLmhlaWdodCAqIHZhbHVlUGVyY2VudGFnZVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9IFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIGRyb3AgbG9jYXRpb25zIGZyb20gdGhlIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlU2VyaWVEcm9wTG9jYXRpb25zKCl7XHJcbiAgICAgICAgbGV0IGNoYXJ0RGl2ID0gJCh0aGlzLm1haW5EaXYpO1xyXG4gICAgICAgIGZvcihsZXQgYXhpc0JvdW5kIG9mIHRoaXMuYXhpc0JvdW5kcyl7XHJcbiAgICAgICAgICAgIGxldCBkcm9wWm9uZURpdiA9IGNoYXJ0RGl2LmZpbmQoXCIjXCIgKyB0aGlzLmF4aXNEcm9wWm9uZUlkICsgYXhpc0JvdW5kLmF4aXMubmFtZSk7XHJcbiAgICAgICAgICAgIGRyb3Bab25lRGl2LnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZHJvcFpvbmVEaXYgPSBjaGFydERpdi5maW5kKFwiI1wiICsgdGhpcy5heGlzRHJvcFpvbmVJZCArXCJfY2hhcnRBcmVhXCIpO1xyXG4gICAgICAgIGRyb3Bab25lRGl2LnJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IG51bWJlciBvZiB5IGF4ZXMgaW5zaWRlIGEgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0TnVtYmVyT2ZZU2NhbGVzKCkgOiBudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGVzLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBhbGwgeSBheGVzIGZyb20gYSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtTY2FsZVtdfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0WVNjYWxlcygpIDogU2NhbGVbXXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwaXhlbENvb3JkaW5hdGVYXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcGl4ZWxDb29yZGluYXRlWVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBYWUNoYXJ0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRDaGFydENvb3JkaW5hdGVGcm9tUGl4ZWwoc2NhbGVJRFg6IHN0cmluZywgc2NhbGVJRFk6IHN0cmluZyxwaXhlbENvb3JkaW5hdGVYIDogbnVtYmVyLCBwaXhlbENvb3JkaW5hdGVZIDogbnVtYmVyKSA6IFBvaW50e1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBjaGFydEFyZWEgPSB0aGlzLmNoYXJ0LmdldENoYXJ0QXJlYSgpO1xyXG4gICAgICAgIGxldCB4QXhpcyA9IHRoaXMuY2hhcnQuZ2V0QXhpcyhzY2FsZUlEWCk7XHJcbiAgICAgICAgbGV0IHlBeGlzID0gdGhpcy5jaGFydC5nZXRBeGlzKHNjYWxlSURZKTtcclxuICAgICAgICBsZXQgeUF4aXNSYW5nZSA9IHlBeGlzIS5nZXRBeGlzUmFuZ2UoKTtcclxuICAgICAgICBsZXQgeEF4aXNSYW5nZSA9IHhBeGlzIS5nZXRBeGlzUmFuZ2UoKTtcclxuXHJcbiAgICAgICAgLy8gWCBBeGlzOiBcclxuICAgICAgICBsZXQgcmVsYXRpdmVQaXhlbENvb3JkaW5hdGVYID0gQmlnKHBpeGVsQ29vcmRpbmF0ZVgpLm1pbnVzKEJpZyhjaGFydEFyZWEueCkpO1xyXG4gICAgICAgIGxldCBjaGFydEF4aXNYUmFuZ2UgPSBCaWcoeEF4aXNSYW5nZS5tYXgpLm1pbnVzKEJpZyh4QXhpc1JhbmdlLm1pbikpO1xyXG5cclxuICAgICAgICBsZXQgY2hhcnRDb29yZGluYXRlUGVyUGl4ZWwgPSBjaGFydEF4aXNYUmFuZ2UuZGl2KEJpZyhjaGFydEFyZWEud2lkdGgpKTtcclxuICAgICAgICBsZXQgY2xvc2VzdFhBeGlzVmFsdWVUb0NsaWNrID0gQmlnKHhBeGlzUmFuZ2UubWluKS5wbHVzKChyZWxhdGl2ZVBpeGVsQ29vcmRpbmF0ZVgudGltZXMoY2hhcnRDb29yZGluYXRlUGVyUGl4ZWwpKSk7XHJcblxyXG4gICAgICAgIC8vIFkgQXhpczogXHJcbiAgICAgICAgbGV0IHJlbGF0aXZlUGl4ZWxDb29yZGluYXRlWSA9IEJpZyhwaXhlbENvb3JkaW5hdGVZKS5taW51cyhCaWcoY2hhcnRBcmVhLnkpKTtcclxuICAgICAgICBsZXQgY2hhcnRBeGlzWVJhbmdlID0gQmlnKHlBeGlzUmFuZ2UubWF4KS5taW51cyhCaWcoeUF4aXNSYW5nZS5taW4pKTtcclxuXHJcbiAgICAgICAgY2hhcnRDb29yZGluYXRlUGVyUGl4ZWwgPSBjaGFydEF4aXNZUmFuZ2UuZGl2KEJpZyhjaGFydEFyZWEuaGVpZ2h0KSk7XHJcbiAgICAgICAgbGV0IGNsb3Nlc3RZQXhpc1ZhbHVlVG9DbGljayA9ICBCaWcoeUF4aXNSYW5nZS5taW4pLnBsdXMoY2hhcnRBeGlzWVJhbmdlLm1pbnVzKHJlbGF0aXZlUGl4ZWxDb29yZGluYXRlWS50aW1lcyhjaGFydENvb3JkaW5hdGVQZXJQaXhlbCkpKVxyXG5cclxuXHJcbiAgICAgICAgbGV0IGNsb3Nlc3RZQXhpc1ZhbHVlTnVtYmVyID0gTnVtYmVyKGNsb3Nlc3RZQXhpc1ZhbHVlVG9DbGljay50b0ZpeGVkKDE0KSk7XHJcbiAgICAgICAgbGV0IGNsb3Nlc3RYQXhpc1ZhbHVlTnVtYmVyID0gTnVtYmVyKGNsb3Nlc3RYQXhpc1ZhbHVlVG9DbGljay50b0ZpeGVkKDE0KSk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUG9pbnQoY2xvc2VzdFhBeGlzVmFsdWVOdW1iZXIsIGNsb3Nlc3RZQXhpc1ZhbHVlTnVtYmVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgYSBzZXJpZXMgcG9pbnQgaW4gY2hhcnQgY29vcmRpbmF0ZXMgZm9yIHRoZSBzcGVjZWZpZWQgdGltZXN0YW1wXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVzdGFtcFxyXG4gICAgICogQHJldHVybnMge1BvaW50fVxyXG4gICAgICogQG1lbWJlcm9mIFlUQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldFNlcmllc1BvaW50RnJvbVRpbWVzdGFtcCh0aW1lc3RhbXA6IG51bWJlcik6IFBvaW50IHtcclxuXHJcbiAgICAgICAgLy8gd2UgcHJvdmlkZSB5ID09IDAgaWYgd2UgYXJlIG5vdCBhYmxlIHRvIGZpbmQgbWF0Y2hpbmcgcG9pbnRzXHJcbiAgICAgICAgbGV0IHNlcmllc1BvaW50ID0gbmV3IFBvaW50KHRpbWVzdGFtcCwgMCk7XHJcblxyXG4gICAgICAgIC8vIHNraXAgc2VhcmNoaW5nIGlmIHRoZSBzZXJpZXMgaW5kZXggaXMgb3V0IG9mIHJhbmdlXHJcbiAgICAgICAgaWYgKHRoaXMuc2VyaWVzLmxlbmd0aCA9PSAwICkgcmV0dXJuIHNlcmllc1BvaW50O1xyXG5cclxuICAgICAgICAvLyBmaW5kIGEgbWF0Y2hpbmcgc2VyaWVzIHBvaW50IHJlbGF0ZWQgdG8gdGhlIHRpbWVzdGFtcFxyXG4gICAgICAgIHNlcmllc1BvaW50ID0gdGhpcy5maW5kTmVhcmVzdFBvaW50SW5BbGxTZXJpZXModGltZXN0YW1wKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlcmllc1BvaW50O1xyXG4gICAgfVxyXG4gIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VhcmNoZXMgZm9yIHRoZSBuZWFyZXN0IHBvaW50IHJlbGF0ZWQgdG8gdGhlIHRpbWVzdGFtcCBpbiBhbGwgc2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lc3RhbXBcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZmluZE5lYXJlc3RQb2ludEluQWxsU2VyaWVzKHRpbWVzdGFtcDogbnVtYmVyKTogUG9pbnQgeyAgICAgICBcclxuXHJcbiAgICAgICAgLy8gY29sbGVjdCB0aGUgbmVhcmVzdCBwb2ludHMgZnJvbSBldmVyeSBzZXJpZXNcclxuICAgICAgICBsZXQgbmVhcmVzdFNlcmllc1BvaW50czogSVBvaW50W10gPSB0aGlzLnNlcmllcy5tYXAoKHNpbmdsZVNlcmllcyk9PiB7IHJldHVybiBzaW5nbGVTZXJpZXMuc2VyaWUucG9pbnRGcm9tVGltZXN0YW1wKHRpbWVzdGFtcCl9KTtcclxuXHJcbiAgICAgICAgLy8gc29ydCB0aGUgbmVhcmVzdCBwb2ludHMgYnkgdGhlaXIgdGltZXN0YW1wIHZhbHVlXHJcbiAgICAgICAgbmVhcmVzdFNlcmllc1BvaW50cy5zb3J0KCh2YWx1ZTEsIHZhbHVlMikgPT4geyByZXR1cm4gdmFsdWUxLnggLSB2YWx1ZTIueDsgfSk7XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgdGltZXN0YW1wIHZhbHVlc1xyXG4gICAgICAgIGxldCBuZWFyZXN0U2VyaWVzVGltZXN0YW1wczogbnVtYmVyW10gPSBuZWFyZXN0U2VyaWVzUG9pbnRzLm1hcCgoc2VyaWVzUG9pbnQpPT57IHJldHVybiBzZXJpZXNQb2ludC54fSk7XHJcblxyXG4gICAgICAgIC8vIGZpbmQgdGhlIG5lYXJlc3QgcG9pbnQgZnJvbSBhbGwgc2VyaWVzLiBUaGUgZm91bmQgaW5kZXggcmVmZXJzIHRvIHRoZSBuZWFyZXN0IHNlcmllcyAhXHJcbiAgICAgICAgbGV0IG5lYXJlc3RTZXJpZXNJbmRleCA9IFNlcmllc0hlbHBlci5pbmRleE9mTmVhcmVzdCh0aW1lc3RhbXAsIG5lYXJlc3RTZXJpZXNUaW1lc3RhbXBzKTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBuZWFyZXN0IHBvaW50IGZyb20gdGhlIHNlcmllc1xyXG4gICAgICAgIGxldCBzZXJpZXNQb2ludEZyb21UaW1lU3RhbXAgPSBuZWFyZXN0U2VyaWVzUG9pbnRzW25lYXJlc3RTZXJpZXNJbmRleF07XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBhIHBvaW50IGluc3RhbmNlIHdpdGggYSBtYXRjaGluZyB0aW1lc3RhbXBcclxuICAgICAgICBsZXQgc2VyaWVzUG9pbnQgPSBzZXJpZXNQb2ludEZyb21UaW1lU3RhbXAgPyBuZXcgUG9pbnQoc2VyaWVzUG9pbnRGcm9tVGltZVN0YW1wLngsIHNlcmllc1BvaW50RnJvbVRpbWVTdGFtcC55KSA6IG5ldyBQb2ludCh0aW1lc3RhbXAsIDApO1xyXG5cclxuICAgICAgICByZXR1cm4gc2VyaWVzUG9pbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIE92ZXJsb2FkIG1ldGhvZHMgaW4gZGVyaXZlZCBjaGFydCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cclxuICAgIFxyXG4gICAgcHVibGljIHJlbW92ZVlTY2FsZUZyb21DaGFydCh5U2NhbGU6IFNjYWxlKXt9O1xyXG5cclxuICAgIHB1YmxpYyBvblN5bmNocm9uaXplU2NhbGVSYW5nZShzY2FsZSA6IFNjYWxlLCBtaW46bnVtYmVyLCBtYXg6bnVtYmVyKSB7fVxyXG5cclxuICAgIHB1YmxpYyBzZXRBdmFpbGFibGVTZXJpZXNBc0RhdGFTb3VyY2UoKXt9XHJcblxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVDaGFydFJhbmdlWCh4QXhpc01pblZhbHVlOiBudW1iZXIsIHhBeGlzTWF4VmFsdWU6IG51bWJlciApIHtcclxuICAgICAgICBsZXQgY2hhcnRSYW5nZUhlbHBlciA9IG5ldyBDaGFydFJhbmdlSGVscGVyKClcclxuXHJcblxyXG4gICAgICAgIGlmKHhBeGlzTWF4VmFsdWUgIT0gdW5kZWZpbmVkICYmIHhBeGlzTWluVmFsdWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IHhBeGlzU2VnbWVudFJhbmdlID0geEF4aXNNYXhWYWx1ZSAtIHhBeGlzTWluVmFsdWU7XHJcbiAgICAgICAgICAgIGxldCB4QXhpc09mZnNldDtcclxuICAgICAgICAgICAgaWYoeEF4aXNTZWdtZW50UmFuZ2UgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICB4QXhpc09mZnNldCA9IGNoYXJ0UmFuZ2VIZWxwZXIuZ2V0QXhpc09mZnNldEZvclN0cmFpZ2h0TGluZXModGhpcy5zZXJpZXNbMF0ucmF3UG9pbnRzWzBdLngpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXhpcyA9IHRoaXMuY2hhcnQuZ2V0QXhpcyh0aGlzLnByaW1hcnlYQXhpc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgaWYoYXhpcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBheGlzUGl4ZWxSYW5nZSA9IGF4aXMuZ2V0QXhpc1JhbmdlSW5QaXhlbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHhBeGlzT2Zmc2V0ID0gY2hhcnRSYW5nZUhlbHBlci5nZXRBeGlzT2Zmc2V0KHhBeGlzU2VnbWVudFJhbmdlLCAoYXhpc1BpeGVsUmFuZ2UubWF4IC0gYXhpc1BpeGVsUmFuZ2UubWluKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICAgICAgeEF4aXNNYXhWYWx1ZSEgKz0geEF4aXNPZmZzZXQ7XHJcbiAgICAgICAgICAgIHhBeGlzTWluVmFsdWUhIC09IHhBeGlzT2Zmc2V0O1xyXG4gICAgICAgICAgICB4QXhpc1NlZ21lbnRSYW5nZSA9IHhBeGlzTWF4VmFsdWUgLSB4QXhpc01pblZhbHVlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRSYW5nZVgoeEF4aXNNaW5WYWx1ZSwgeEF4aXNNYXhWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldFRpbWVzdGFtcEluU2VyaWVzKHA6IFBvaW50LCBzZXJpZXMgOiBDaGFydFZpZXdTZXJpZVtdKTogbnVtYmVyIHsgcmV0dXJuIHAueDsgfVxyXG5cclxuICAgIHByb3RlY3RlZCBnZXRDdXJzb3JQb2ludCh0aW1lc3RhbXA6IG51bWJlcixzZXJpZXM6IENoYXJ0Vmlld1NlcmllW10sIHNlcmllc0luZGV4Om51bWJlcik6IFRpbWVQb2ludCB7IHJldHVybiB7eDogdGltZXN0YW1wLHk6IDAsIHRpbWVzdGFtcDogdGltZXN0YW1wfTt9XHJcblxyXG4gICAgcHVibGljIGFkZFNlcmllRHJvcExvY2F0aW9ucyhzZXJpZTogQXJyYXk8QmFzZVNlcmllcz4sIGNoYXJ0TWFuYWdlckNoYXJ0KXt9O1xyXG5cclxuICAgIHByb3RlY3RlZCBhZGREcm9wTG9jYXRpb25zIChzZXJpZTogQmFzZVNlcmllcyl7fTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0RHJvcExvY2F0aW9uVHlwZShjdXJyZW50VGFyZ2V0OiBhbnkpOiBEcm9wTG9jYXRpb25UeXBleyByZXR1cm4gRHJvcExvY2F0aW9uVHlwZS5pbnZhbGlkOyB9XHJcblxyXG4gICAgcHVibGljIGFkZFlTY2FsZShzY2FsZSA6IFNjYWxlLCBwb3NpdGlvbjogQXhpc1Bvc2l0aW9uKXt9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZURyb3BwYWJsZUFyZWFzKGN1cnJlbnRUYXJnZXQpIHt9O1xyXG5cclxuICAgIHB1YmxpYyByZXNldEhpZ2hsaWdodGluZygpe307XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldFVzZWRDdXJzb3JTdGF0ZXMoKTogQXJyYXk8SUN1cnNvclN0YXRlPiB7IHJldHVybiBbXX07XHJcbn1cclxuXHJcbmV4cG9ydCB7IENoYXJ0QmFzZSwgRXZlbnRSZWRyYXdBbGxDaGFydHMsIEV2ZW50UmVkcmF3QWxsQ2hhcnRzQXJncywgRXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbiwgRXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3MsIENoYXJ0T2JqZWN0VHlwZSwgRHJvcExvY2F0aW9uVHlwZSwgQ2hhcnRPYmplY3RJbmZvcm1hdGlvbn07XHJcblxyXG4iXX0=