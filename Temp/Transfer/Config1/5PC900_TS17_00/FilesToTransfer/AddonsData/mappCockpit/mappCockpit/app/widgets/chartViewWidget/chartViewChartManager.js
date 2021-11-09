define(["require", "exports", "../chartWidget/YTChart", "../chartWidget/XYChart", "../chartWidget/FFTChart", "./chartViewWidget", "../common/viewTypeProvider", "../chartWidget/helpers/chartRangeHelper", "../../models/chartManagerDataModel/chartManagerDataModel", "../../models/chartManagerDataModel/chartManagerChart", "../../models/common/series/eventSerieDataChangedArgs", "./helpers/chartDropHelper", "../common/states/chartViewToolbarStates", "../../core/interfaces/components/ui/chart/chartInterface", "../common/SerieChartTypeHelper", "../../models/common/series/seriesType", "../chartWidget/cursor/CrossHairCursor", "../chartWidget/cursor/LineCursor", "../common/paneProperties"], function (require, exports, YTChart_1, XYChart_1, FFTChart_1, chartViewWidget_1, viewTypeProvider_1, chartRangeHelper_1, chartManagerDataModel_1, chartManagerChart_1, eventSerieDataChangedArgs_1, chartDropHelper_1, chartViewToolbarStates_1, chartInterface_1, SerieChartTypeHelper_1, seriesType_1, CrossHairCursor_1, LineCursor_1, paneProperties_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartViewChartManager = /** @class */ (function () {
        function ChartViewChartManager(chartViewWidget, userInteractionController, layoutManager, chartManagerDataModel) {
            var _this = this;
            this.traceChartList = [];
            this.series = new Array();
            this._onSerieDataChanged = function (sender, eventArgs) { return _this.onSerieDataChanged(sender, eventArgs); };
            this._userChartInteractionHandler = function (sender, args) { return _this.onUserChartInteraction(sender, args); };
            this._onRedrawAllCharts = function (sender, args) { return _this.onRedrawAllCharts(sender, args); };
            this._persistedPanes = [];
            this._chartMinHeight = 100;
            this.chartViewWidget = chartViewWidget;
            this._states = chartViewWidget.states;
            this.userInteractionController = userInteractionController;
            this.layoutManager = layoutManager;
            this._chartManagerDataModel = chartManagerDataModel;
        }
        ChartViewChartManager.prototype.initChartViewWithDataModel = function () {
            var _this = this;
            if (this._chartManagerDataModel != undefined) {
                // If there are already charts in the datamodel => show in chart view => needed for persisting
                if (this._chartManagerDataModel.data != undefined) {
                    //Get persisted chart panes
                    this._persistedPanes = this.layoutManager.chartSplitter.getChartViewSplitterPaneDefinitions();
                    this._chartManagerDataModel.data.forEach(function (chart) {
                        // Add charts, add scales, add series
                        _this.addTraceChart(chart, -1, chart.chartType, false); // Suppress redrawing and do it after all charts where added to avoid multiple redraws
                    });
                    // redraw all charts after adding
                    /*for (let i = 0; i < this.traceChartList.length; i++) {
                        this.traceChartList[i].redrawChart();
                    }*/
                }
            }
        };
        ChartViewChartManager.prototype.dispose = function () {
            for (var i = 0; i < this.traceChartList.length; i++) {
                this.traceChartList[i].dispose();
            }
        };
        ChartViewChartManager.prototype.addTraceChart = function (chart, index, type, supressRedraw) {
            if (index === void 0) { index = -1; }
            if (supressRedraw === void 0) { supressRedraw = false; }
            var newTraceChart = this.addChartToContainer(chart.name, index, type, chart.childs);
            if (supressRedraw == false) {
                this.redrawCharts(false);
            }
            var scales = chart.childs;
            this.updateZoomSettings();
            this.updateXAxisWidth(chart.chartType);
            return newTraceChart;
        };
        ChartViewChartManager.prototype.addChartToContainer = function (name, index, type, scales) {
            if (index === void 0) { index = -1; }
            var traceChart;
            var chartHeight = 300;
            if (this.chartViewWidget.view) {
                // TODO: Handle with settings object factory
                if (type === chartManagerChart_1.ChartType.YTChart) {
                    traceChart = new YTChart_1.YTChart(this.chartViewWidget.view, name, type, scales);
                }
                else if (type === chartManagerChart_1.ChartType.XYChart) {
                    traceChart = new XYChart_1.XYChart(this.chartViewWidget.view, name, type, scales);
                }
                else {
                    traceChart = new FFTChart_1.FFTChart(this.chartViewWidget.view, name, type, scales);
                }
                traceChart.eventUserChartInteraction.attach(this._userChartInteractionHandler);
                traceChart.eventRedrawAllCharts.attach(this._onRedrawAllCharts);
                //Set the height of persisted charts
                if (this._persistedPanes.length > 0) {
                    chartHeight = this.getPersistedChartHeight(name);
                    //Workaround: Add 2 pixels if is the first chart 
                    if (this.layoutManager.chartSplitter.layoutPanes.length == 0) {
                        chartHeight += 2;
                    }
                }
                var paneProperties = new paneProperties_1.PaneProperties();
                paneProperties.paneSize = chartHeight;
                paneProperties.minSize = this._chartMinHeight;
                this.layoutManager.chartSplitter.addWidget(traceChart, name, viewTypeProvider_1.ViewType.User, paneProperties);
                if (index != -1) {
                    // TODO: set index at addWidget Method to avoid moving the chart afterwards
                    this.layoutManager.chartSplitter.moveWidget(traceChart, index);
                    this.traceChartList.splice(index, 0, traceChart);
                }
                else {
                    this.traceChartList.push(traceChart);
                }
                return traceChart;
            }
            return undefined;
        };
        /**
         * Get height of persisted charts
         *
         * @param {string} chartName
         * @returns {number}
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.getPersistedChartHeight = function (chartName) {
            var chartHeight = this.layoutManager.getChartViewSplitterHeight(this._persistedPanes, chartName);
            this._persistedPanes = this._persistedPanes.filter(function (element) { return element.componentDefinition.id != chartName; });
            return chartHeight;
        };
        /**
         * Method to set the ZoomSetting(Direction and BoxZoom) for all Charts according to the corresponding states
         *
         * @private
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.updateZoomSettings = function () {
            var toolstate = this._states.read(chartViewToolbarStates_1.ChartViewToolState, "ChartViewToolState");
            var zoomDirectionState = this._states.read(chartViewToolbarStates_1.ChartViewZoomDirectionState, "ChartViewZoomDirectionState");
            if (toolstate.selectedTool == chartViewToolbarStates_1.ChartViewToolStateEnum.BOXZOOM) {
                this.setBoxZoom(true);
                this.setPanning(false);
            }
            else if (toolstate.selectedTool == chartViewToolbarStates_1.ChartViewToolStateEnum.PANNING) {
                this.setBoxZoom(false);
                this.setPanning(false);
            }
            else {
                this.setBoxZoom(false);
                this.setPanning(false);
            }
            this.setChartZoomAxes(zoomDirectionState.zoomDirection);
        };
        ChartViewChartManager.prototype.removeTraceChart = function (chart) {
            chart.eventUserChartInteraction.detach(this._userChartInteractionHandler);
            chart.eventRedrawAllCharts.detach(this._onRedrawAllCharts);
            this.removeChartFromChartList(chart);
            chart.dispose();
            this.layoutManager.chartSplitter.removeWidget(chart);
        };
        ChartViewChartManager.prototype.removeChartFromChartList = function (chart) {
            var index = this.getChartIndex(chart);
            if (index > -1) {
                this.traceChartList.splice(index, 1);
            }
        };
        ChartViewChartManager.prototype.moveTraceChart = function (chart, targetChart, args) {
            var traceChart = this.getChartObjectByName(chart.name);
            var targetTraceChart = this.getChartObjectByName(targetChart.name);
            if (traceChart != undefined && targetTraceChart != undefined) {
                var chartIndex = this.getChartIndex(traceChart);
                var targetIndex = this.getChartIndex(targetTraceChart);
                if (args.insertType == "insertBelow") {
                    targetIndex += 1;
                }
                if (chartIndex > -1 && targetIndex > -1) {
                    this.traceChartList.splice(chartIndex, 1);
                    if (chartIndex < targetIndex) {
                        this.traceChartList.splice(targetIndex - 1, 0, traceChart);
                    }
                    else {
                        this.traceChartList.splice(targetIndex, 0, traceChart);
                    }
                    this.layoutManager.chartSplitter.moveWidget(traceChart, targetIndex);
                }
                this.redrawCharts(false);
                this.updateXAxisWidth(chart.chartType);
            }
        };
        ChartViewChartManager.prototype.removeAllCharts = function () {
            while (this.traceChartList.length > 0) {
                this.removeTraceChart(this.traceChartList[0]);
            }
        };
        ChartViewChartManager.prototype.getChartIndex = function (chart) {
            var index = -1;
            for (var i = 0; i < this.traceChartList.length; i++) {
                if (this.traceChartList[i] == chart) {
                    index = i;
                }
            }
            return index;
        };
        ChartViewChartManager.prototype.getTraceChartByContainerId = function (containerID) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                var divId = this.traceChartList[i].mainDivId;
                if (divId == containerID.substr(0, divId.length)) {
                    return this.traceChartList[i];
                }
            }
            return undefined;
        };
        ChartViewChartManager.prototype.getTraceChartByName = function (chartName) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                if (this.traceChartList[i].widgetName == chartName) {
                    return this.traceChartList[i];
                }
            }
            return undefined;
        };
        ChartViewChartManager.prototype.onChartManagerModelChanged = function (dataModel, args) {
            this._chartManagerDataModel = dataModel;
            switch (args.hint) {
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.addSerie: {
                    this.addSeriesToChart(args.data.series, args.data.chart, args.data.axis, args.data.keepScales);
                    break;
                }
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.moveSerie: {
                    this.moveSerie(args.data.serie, args.data.chart.name, args.data.targetChart.name, args.data.targetAxis);
                    break;
                }
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.removeSerie: {
                    this.removeSerie(args.data.serie, args.data.chart.name);
                    break;
                }
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.removeChart: {
                    this.removeChart(args.data.chart);
                    break;
                }
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.addChart: {
                    this.addTraceChart(args.data.chart, args.data.index, args.data.type);
                    break;
                }
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.moveChart: {
                    this.moveTraceChart(args.data.chart, args.data.target, args.data);
                    break;
                }
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.addYScale: {
                    this.addYScale(args.data.yAxis, args.data.chart.name);
                    break;
                }
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.removeYScale: {
                    this.removeYAxis(args.data.yAxis, args.data.chart);
                    break;
                }
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.updateScaleRange: {
                    this.synchronizeScaleXRange(args.data.scale);
                    break;
                }
            }
        };
        ChartViewChartManager.prototype.addSeriesToChart = function (series, chart, scale, keepScales) {
            if (keepScales === void 0) { keepScales = false; }
            for (var i = 0; i < series.length; i++) {
                series[i].eventDataChanged.attach(this._onSerieDataChanged);
            }
            var chartName = chart.name;
            var resetXRange = false;
            var resetYRange = false;
            if (!keepScales) {
                resetXRange = this.isFirstSeriesOfTypeInCharts(series[0]);
                resetYRange = this.isFirstSeriesOnScale(series[0], scale);
            }
            else {
                var chartObj = this.getChartObjectByName(chartName);
                if (chartObj != undefined) {
                    // TODO: Only works for YT but not for FFT
                    // Update scale(Y)
                    chartObj.setScaleRange(scale, scale.minXValue, scale.maxXValue, scale.minYValue, scale.maxYValue);
                    // Update scale(X)
                    chartObj.setRangeX(scale.minXValue, scale.maxXValue);
                }
            }
            this.addSeries(series, chartName, scale, resetYRange, resetXRange);
            if (resetXRange) {
                this.resetXRange(series[0]);
            }
        };
        /**
         *Checks if a given Series is the first Series on a particular scale
         *
         * @private
         * @param {Array<BaseSeries>} series
         * @param {Scale} scale
         * @returns {boolean}
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.isFirstSeriesOnScale = function (series, scale) {
            //only reset the chartrange on the y axis if these are the first series in the scale
            if (scale.childs.length < 1 || series != scale.childs[0]) {
                return false;
            }
            return true;
        };
        /**
         *Checks if a given Series is the first of its type in all charts
         *
         * @private
         * @param {BaseSeries} series
         * @returns
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.isFirstSeriesOfTypeInCharts = function (series) {
            var charts = this.getChartsForSerie(series);
            for (var _i = 0, charts_1 = charts; _i < charts_1.length; _i++) {
                var chart = charts_1[_i];
                if (chart.series.length != 0) {
                    return false;
                }
            }
            return true;
        };
        ChartViewChartManager.prototype.getChartsForSerie = function (series) {
            var charts = Array();
            if (series.type == seriesType_1.SeriesType.fftSeries) {
                charts = new chartRangeHelper_1.ChartRangeHelper().getFFTCharts(this.traceChartList);
            }
            else if (series.type == seriesType_1.SeriesType.timeSeries) {
                charts = new chartRangeHelper_1.ChartRangeHelper().getYTCharts(this.traceChartList);
            }
            return charts;
        };
        ChartViewChartManager.prototype.onSerieDataChanged = function (sender, eventArgs) {
            if (eventArgs.action == eventSerieDataChangedArgs_1.SerieAction.dataPointsChanged) {
                this.updateSerieData(sender);
            }
            else if (eventArgs.action == eventSerieDataChangedArgs_1.SerieAction.colorChanged) {
                this.updateSerieColor(sender);
            }
        };
        /**
         *  Updates the serie datapoints in all charts where the serie is displayed
         *  If datapoints not valid, the serie will be removed from the charts otherwise added if not already in the chart
         *
         * @private
         * @param {BaseSeries} series
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.updateSerieData = function (series) {
            if (series.rawPointsValid == false) {
                // No valid serie data => remove from all charts
                this.removeSerieFromAllCharts(series);
            }
            else {
                // add serie to chart if not already in it otherwise update chart
                if (this._chartManagerDataModel != undefined) {
                    var charts = this._chartManagerDataModel.getChartsUsingSerie([series]);
                    this.updateSerieInAllCharts(charts, series);
                }
            }
        };
        ChartViewChartManager.prototype.updateSerieInAllCharts = function (charts, series) {
            var serieChartType = SerieChartTypeHelper_1.SerieChartTypeHelper.getSerieChartType(series.type);
            for (var i = 0; i < charts.length; i++) {
                var chart = this.getChartObjectByName(charts[i].name);
                if (chart != undefined && serieChartType == chart.type) {
                    if (!this.isSerieInChart(chart, series)) {
                        // add series 
                        var scale = charts[i].getYAxisForSerie(series);
                        if (scale != undefined) {
                            var isFirstSeriesInChart = this.isFirstSeriesOfTypeInCharts(series);
                            this.addSeries([series], charts[i].name, scale, this.isFirstSeriesOnScale(series, scale), true);
                            if (isFirstSeriesInChart) {
                                this.resetXRange(series);
                            }
                        }
                        else {
                            console.error("Scale not found for serie");
                        }
                    }
                    chart.setAvailableSeriesAsDataSource();
                    chart.redrawChart();
                }
            }
        };
        ChartViewChartManager.prototype.resetXRange = function (series) {
            var chartRangeHelper = new chartRangeHelper_1.ChartRangeHelper();
            if (series.type == seriesType_1.SeriesType.timeSeries) {
                chartRangeHelper.resetXRangesYT(this.traceChartList);
            }
            else if (series.type == seriesType_1.SeriesType.fftSeries) {
                chartRangeHelper.resetXRangesFFT(this.traceChartList);
            }
            this.redrawCharts(true);
        };
        /**
         * Updates the color of the serie in all charts where the serie is displayed
         *
         * @private
         * @param {BaseSeries} serie
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.updateSerieColor = function (serie) {
            if (this._chartManagerDataModel != undefined) {
                var series = new Array();
                series.push(serie);
                var charts = this._chartManagerDataModel.getChartsUsingSerie(series);
                for (var i = 0; i < charts.length; i++) {
                    var chart = this.getChartObjectByName(charts[i].name);
                    if (chart != undefined) {
                        // Update series color in the chart
                        chart.setAvailableSeriesAsDataSource();
                    }
                }
            }
        };
        /**
         * add serie to chart
         *
         * @param {Array<BaseSeries>} series
         * @param {string} chartName
         * @param {Scale} scale
         * @param {boolean} updateRangeY
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.addSeries = function (series, chartName, scale, updateRangeY, updateRangeX) {
            var chart = this.getChartObjectByName(chartName);
            if (chart != undefined) {
                var axisMin = void 0;
                var axisMax = void 0;
                var axis = chart.chart.getAxis(scale.id);
                if (axis != undefined) {
                    var axisRange = axis.getAxisRange();
                    if (axisRange != undefined) {
                        axisMin = axisRange.min;
                        axisMax = axisRange.max;
                    }
                }
                else {
                    console.error("Scale not available! " + scale.id);
                }
                chart.addSeriesToChart(series, scale, updateRangeX);
                chart.setAvailableSeriesAsDataSource();
                if (axisMin != undefined && axisMax != undefined) {
                    chart.setScaleRange(scale, scale.minXValue, scale.maxXValue, axisMin, axisMax);
                }
                if (updateRangeY) {
                    var axisMinValue = chart.getSeriesMinYForScale(scale);
                    var axisMaxValue = chart.getSeriesMaxYForScale(scale);
                    if (axisMinValue != undefined && axisMaxValue != undefined) {
                        chart.updateRangeY(scale, axisMinValue, axisMaxValue);
                    }
                }
                chart.redrawChart();
            }
        };
        ChartViewChartManager.prototype.addYScale = function (yScale, chartName) {
            var chart = this.getChartObjectByName(chartName);
            if (chart != undefined) {
                chart.addYScale(yScale, chartInterface_1.AxisPosition.right);
                this.updateXAxisWidth(chart.type);
            }
        };
        /**
         * move one serie from one chart to another
         *
         * @param {BaseSeries} serie
         * @param {string} chartName
         * @param {string} targetChartName
         * @param {Scale} targetScale
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.moveSerie = function (serie, chartName, targetChartName, targetScale) {
            if (serie.rawPointsValid == true) {
                var chart = this.getChartObjectByName(chartName);
                var target = this.getChartObjectByName(targetChartName);
                var series = new Array();
                series.push(serie);
                if (chart != undefined && target != undefined) {
                    chart.removeSerieFromChart(serie, this.isLastSerieWithCursorType(chart));
                    target.addSeriesToChart(series, targetScale, true);
                    chart.setAvailableSeriesAsDataSource();
                    target.setAvailableSeriesAsDataSource();
                }
                this.updateXAxisWidth(chart.type);
            }
        };
        /**
         * remove one serie from given chart
         *
         * @param {BaseSeries} serie
         * @param {string} chartName
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.removeSerie = function (serie, chartName) {
            var chart = this.getChartObjectByName(chartName);
            if (chart != undefined) {
                chart.removeSerieFromChart(serie, this.isLastSerieWithCursorType(chart));
                chart.setAvailableSeriesAsDataSource();
            }
            var chartsWithSerie = this._chartManagerDataModel.getChartsUsingSerie([serie]);
            if (chartsWithSerie.length == 0) { // Serie not used in an other chart => detach serie events
                serie.eventDataChanged.detach(this._onSerieDataChanged);
            }
        };
        ChartViewChartManager.prototype.removeYAxis = function (yScale, chart) {
            var traceChart = this.getChartObjectByName(chart.name);
            if (traceChart != undefined) {
                traceChart.removeYScaleFromChart(yScale);
                traceChart.setAvailableSeriesAsDataSource();
            }
            this.updateXAxisWidth(chart.chartType);
        };
        /**
         * remove chart
         *
         * @param {string} chartName
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.removeChart = function (chart) {
            var traceChart = this.getChartObjectByName(chart.name);
            if (traceChart != undefined) {
                this.removeTraceChart(traceChart);
                var minX = void 0;
                var maxX = void 0;
                for (var i = 0; i < traceChart.series.length; i++) {
                    if (minX == undefined || minX > traceChart.series[i].minX) {
                        minX = traceChart.series[i].minX;
                    }
                    if (maxX == undefined || maxX < traceChart.series[i].maxX) {
                        maxX = traceChart.series[i].maxX;
                    }
                }
            }
            this.updateXAxisWidth(chart.chartType);
        };
        ChartViewChartManager.prototype.setPanningAxes = function (axes) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                var panningAxis = new Array();
                if (axes[0] == undefined) {
                    for (var j = 0; j < this.traceChartList[i].scales.length; j++) {
                        var axis = this.traceChartList[i].chart.getAxis(this.traceChartList[i].scales[j].id);
                        if (axis != undefined) {
                            panningAxis.push(axis);
                        }
                    }
                    var axis = this.traceChartList[i].chart.getAxis(this.traceChartList[i].primaryXAxisName);
                    if (axis != undefined) {
                        panningAxis.push(axis);
                    }
                }
                else {
                    panningAxis = axes;
                }
                this.traceChartList[i].chart.setPanningAxes(panningAxis);
            }
        };
        ChartViewChartManager.prototype.synchronizeScaleXRange = function (scale) {
            var chartType = scale.parent.chartType;
            var min = scale.minXValue;
            var max = scale.maxXValue;
            for (var i = 0; i < this.traceChartList.length; i++) {
                if (this.traceChartList[i].type == chartType) {
                    this.traceChartList[i].onSynchronizeScaleRange(scale, min, max);
                    //this.traceChartList[i].redrawChart();
                }
            }
        };
        ChartViewChartManager.prototype.getZoomAxesInChart = function (chart, zoomDirection) {
            var axes = new Array();
            if (zoomDirection == chartViewWidget_1.ZoomDirection.XY || zoomDirection == chartViewWidget_1.ZoomDirection.X) {
                var axis = chart.chart.getAxis(chart.primaryXAxisName);
                if (axis != undefined) {
                    axes.push(axis);
                }
            }
            if (zoomDirection == chartViewWidget_1.ZoomDirection.XY || zoomDirection == chartViewWidget_1.ZoomDirection.Y) {
                for (var i = 0; i < chart.scales.length; i++) {
                    var axis = chart.chart.getAxis(chart.scales[i].id);
                    if (axis != undefined && axis.getAxisOrientation() == chartInterface_1.AxisOrientation.vertical) {
                        axes.push(axis);
                    }
                }
            }
            return axes;
        };
        /**
         * Returns true if there are no more series in all other charts with the same cursor type
         *
         * @private
         * @param {ITraceChart} chart
         * @returns {boolean}
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.isLastSerieWithCursorType = function (chart) {
            var cursorType = chart.getSerieCursorType();
            if (chart.series.length > 1) {
                return false;
            }
            for (var i = 0; i < this.traceChartList.length; i++) {
                if (this.traceChartList[i].getSerieCursorType() === cursorType && this.traceChartList[i] !== chart) {
                    return false;
                }
            }
            return true;
        };
        /**
         * Finds ITraceChartObject by give name and return object
         *
         * @private
         * @param {string} name
         * @returns {(ITraceChart | undefined)}
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.getChartObjectByName = function (name) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                if (this.traceChartList[i].widgetName == name) {
                    return this.traceChartList[i];
                }
            }
            return undefined;
        };
        ChartViewChartManager.prototype.isSerieInChart = function (chart, serie) {
            for (var i = 0; i < chart.series.length; i++) {
                if (chart.series[i].id === serie.id) {
                    return true;
                }
            }
            return false;
        };
        /*private getPreviousChartObjectByName(name :string) : ITraceChart | undefined{
            for(let i = 0; i < this.traceChartList.length; i++){
                if(this.traceChartList[i].widgetName == name){
                   return this.traceChartList[i];
                }
            }
            return undefined;
        }*/
        ChartViewChartManager.prototype.removeSerieFromAllCharts = function (serie) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                var index = this.traceChartList[i].series.map(function (x) { return x.id; }).indexOf(serie.id);
                //const index = this.traceChartList[i].series.indexOf(serie, 0);
                if (index > -1) {
                    this.traceChartList[i].removeSerieFromChart(this.traceChartList[i].series[index], this.isLastSerieWithCursorType(this.traceChartList[i]));
                }
            }
        };
        ChartViewChartManager.prototype.checkReferenceCursorsHovering = function (mousePoint, traceChart) {
            traceChart.checkCursorsHovering(mousePoint);
        };
        ChartViewChartManager.prototype.dragCursorAlongLine = function (traceChart, movementX, movementY) {
            traceChart.dragCursorAlongLine(movementX, movementY, this._hoveredSeries);
        };
        ChartViewChartManager.prototype.setCursorOnPointerPosition = function (traceChart, mousePoint) {
            traceChart.setCursorOnPointerPosition(mousePoint);
        };
        ChartViewChartManager.prototype.doPanning = function (traceChart, mousePointX, mousePointY) {
            traceChart.doPanning(mousePointX, mousePointY);
        };
        ChartViewChartManager.prototype.resetPanningCoords = function () {
            for (var _i = 0, _a = this.traceChartList; _i < _a.length; _i++) {
                var chart = _a[_i];
                chart.resetPanningCoords();
            }
        };
        ChartViewChartManager.prototype.resetZoom = function () {
            var chartRangeHelper = new chartRangeHelper_1.ChartRangeHelper();
            chartRangeHelper.resetXRangesAllChartTypes(this.traceChartList);
            chartRangeHelper.resetYRangesAllChartTypes(this.traceChartList);
            this.redrawCharts(true);
        };
        ChartViewChartManager.prototype.resetCursorsHovering = function (args) {
            if (this.traceChartList.length > 0) {
                var parentElement = args.data.e.target.parentElement;
                if (parentElement !== undefined && parentElement !== null) {
                    var mouseOverCursors = this.isMouseOverCursors(parentElement);
                    //Just reset cursors if mouse is moving outside a chart
                    if (this.getTraceChartByContainerId(parentElement.id) === undefined && !mouseOverCursors) {
                        this.traceChartList[0].resetCursorsHovered();
                    }
                }
            }
        };
        ChartViewChartManager.prototype.autoScale = function () {
            var chartRangeHelper = new chartRangeHelper_1.ChartRangeHelper();
            for (var _i = 0, _a = this.traceChartList; _i < _a.length; _i++) {
                var chart = _a[_i];
                chart.autoScaleYScales();
            }
            chartRangeHelper.resetXRangesAllChartTypes(this.traceChartList);
            this.redrawCharts(true);
        };
        ChartViewChartManager.prototype.setChartZoomAxes = function (axes) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                this.traceChartList[i].setZoomAxes(axes);
            }
            this.chartViewWidget.activeSelectedZoomAxis = axes;
        };
        ChartViewChartManager.prototype.setPanning = function (enable) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                this.traceChartList[i].setPanning(enable);
            }
        };
        ChartViewChartManager.prototype.setBoxZoom = function (enable) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                this.traceChartList[i].setBoxZoom(enable);
            }
        };
        ChartViewChartManager.prototype.redrawCharts = function (forceRedraw, chartType) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                //if (forceRedraw == true || this.traceChartList[i].type != ChartType.XYChart) {
                //    this.traceChartList[i].redrawChart();
                //}
                if (chartType == undefined || forceRedraw == true || this.traceChartList[i].type == chartType) {
                    this.traceChartList[i].redrawChart();
                }
            }
        };
        ChartViewChartManager.prototype.onRedrawAllCharts = function (sender, args) {
            this.redrawCharts(false, args.chartType);
        };
        ChartViewChartManager.prototype.isMouseOverCursors = function (element) {
            if (element.classList.value.includes(CrossHairCursor_1.CrossHairCursor.crossHairCursorId) || element.classList.value.includes(LineCursor_1.LineCursor.lineCursorId)) {
                return true;
            }
            return false;
        };
        ChartViewChartManager.prototype.onUserChartInteraction = function (sender, eventUserChartInteractionArgs) {
            //on dragging the hoverd series needs to be stored to calculate the cursor postion when the mouse is moved over multiple charts
            if (eventUserChartInteractionArgs.eventArguments.hoveredSeries) {
                this._hoveredSeries = eventUserChartInteractionArgs.eventArguments.hoveredSeries;
            }
            this.chartViewWidget.onUserChartInteraction(sender, eventUserChartInteractionArgs);
        };
        ChartViewChartManager.prototype.addDroppableLocations = function (data, sameGroup) {
            for (var _i = 0, _a = this.traceChartList; _i < _a.length; _i++) {
                var chart = _a[_i];
                var chartManagerChart = this._chartManagerDataModel.getChart(chart.widgetName);
                var serieChartType = SerieChartTypeHelper_1.SerieChartTypeHelper.getSerieChartType(data[0].type);
                SerieChartTypeHelper_1.SerieChartTypeHelper.setDropPossibleAreas(chartManagerChart, data, serieChartType, sameGroup);
                chart.addSerieDropLocations(data, chartManagerChart);
            }
            var dropHelper = new chartDropHelper_1.ChartDropHelper(this._chartManagerDataModel, this.chartViewWidget);
            // Add empty space drop location
            if (dropHelper.canAddChart() == true) { // Is it possible to add one more chart
                var emptySpaceElement = document.getElementById(this.layoutManager.chartSplitter.getLastPaneId());
                var scrollBarWidth = $('#' + this.layoutManager.chartSplitterParentContainerId)[0].offsetWidth - $('#' + this.layoutManager.chartSplitterContainerId)[0].offsetWidth;
                if (emptySpaceElement != undefined) {
                    emptySpaceElement.style.backgroundColor = 'rgba(125,160,165, 0.2)';
                    if (data[0].type == seriesType_1.SeriesType.timeSeries && data.length > 2 || !sameGroup) {
                        this.addChartTypeAreas(emptySpaceElement, [true, false, true], scrollBarWidth);
                    }
                    else if (data[0].type == seriesType_1.SeriesType.timeSeries) {
                        this.addChartTypeAreas(emptySpaceElement, [true, true, true], scrollBarWidth);
                    }
                    else if (data[0].type == seriesType_1.SeriesType.xySeries) {
                        this.addChartTypeAreas(emptySpaceElement, [false, true, false], scrollBarWidth);
                    }
                    else if (data[0].type == seriesType_1.SeriesType.fftSeries) {
                        this.addChartTypeAreas(emptySpaceElement, [false, false, true], scrollBarWidth);
                    }
                }
            }
        };
        ChartViewChartManager.prototype.addChartTypeAreas = function (parent, enabled, scrollBarWidth) {
            var chartNames = ['YT', 'XY', 'FFT'];
            for (var i = 0; i < chartNames.length; i = i + 1) {
                var area = document.createElement('div');
                area.id = parent.id + '_' + chartNames[i];
                area.classList.add('chartTypes');
                if (!enabled[i]) {
                    area.classList.add('disabled');
                }
                area.style.width = ((parent.offsetWidth - scrollBarWidth) / chartNames.length).toString() + 'px';
                var image = document.createElement("img");
                image.src = './widgets/common/style/images/chartType' + chartNames[i] + '.svg';
                image.classList.add('imageChart');
                area.appendChild(image);
                parent.appendChild(area);
            }
        };
        ChartViewChartManager.prototype.removeDroppableLocations = function () {
            for (var _i = 0, _a = this.traceChartList; _i < _a.length; _i++) {
                var chart = _a[_i];
                chart.removeSerieDropLocations();
            }
            // Remove empty space drop location
            var emptySpaceElement = document.getElementById(this.layoutManager.chartSplitter.getLastPaneId());
            if (emptySpaceElement != undefined) {
                var typeOfCharts = emptySpaceElement.children.length;
                emptySpaceElement.style.backgroundColor = '#fff';
                for (var i = 0; i < typeOfCharts; i = i + 1) {
                    emptySpaceElement.children[0].remove();
                }
            }
        };
        ChartViewChartManager.prototype.updateXAxisWidth = function (chartType) {
            var maxYAxes = 0;
            var chartArea;
            for (var i = 0; i < this.traceChartList.length; i++) {
                if (this.traceChartList[i].type == chartType) {
                    this.traceChartList[i].chart.redraw();
                    var numberOfYAxesInChart = this.traceChartList[i].getNumberOfYScales();
                    if (numberOfYAxesInChart == 0) {
                        numberOfYAxesInChart = 1;
                    }
                    //if one chart has more axis than the others use its width, if they have the same amount use the one with the higher width
                    if (numberOfYAxesInChart > maxYAxes) {
                        maxYAxes = numberOfYAxesInChart;
                        chartArea = this.traceChartList[i].chart.getChartArea();
                    }
                    else if (numberOfYAxesInChart == maxYAxes && this.traceChartList[i].chart.getChartArea().width > chartArea.width) {
                        chartArea = this.traceChartList[i].chart.getChartArea();
                    }
                }
            }
            if (chartArea != undefined) {
                this.alignYAxes(chartArea, chartType);
            }
        };
        ChartViewChartManager.prototype.alignYAxes = function (chartArea, chartType) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                if (this.traceChartList[i].type == chartType) {
                    var newChartArea = { x: chartArea.x, y: chartArea.y, width: chartArea.width, height: this.traceChartList[i].chart.getChartArea().height - 1 };
                    this.traceChartList[i].chart.setChartArea(newChartArea);
                    this.traceChartList[i].redrawChart();
                }
            }
        };
        return ChartViewChartManager;
    }());
    exports.ChartViewChartManager = ChartViewChartManager;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRWaWV3Q2hhcnRNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0Vmlld1dpZGdldC9jaGFydFZpZXdDaGFydE1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBZ0NBO1FBcUJJLCtCQUFZLGVBQWdDLEVBQUUseUJBQXFELEVBQUUsYUFBcUMsRUFBRSxxQkFBNkM7WUFBekwsaUJBTUM7WUF6QkQsbUJBQWMsR0FBdUIsRUFBRSxDQUFDO1lBQ3hDLFdBQU0sR0FBaUIsSUFBSSxLQUFLLEVBQWMsQ0FBQztZQVF2Qyx3QkFBbUIsR0FBRyxVQUFDLE1BQU0sRUFBRSxTQUFTLElBQUssT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxFQUExQyxDQUEwQyxDQUFDO1lBQ3hGLGlDQUE0QixHQUFHLFVBQUMsTUFBTSxFQUFFLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQXpDLENBQXlDLENBQUM7WUFDM0YsdUJBQWtCLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBbkMsQ0FBbUMsQ0FBQztZQUUxRSxvQkFBZSxHQUFrQyxFQUFFLENBQUM7WUFJM0Msb0JBQWUsR0FBRyxHQUFHLENBQUM7WUFHbkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7WUFDdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDO1lBQ3RDLElBQUksQ0FBQyx5QkFBeUIsR0FBRyx5QkFBeUIsQ0FBQztZQUMzRCxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztZQUNuQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcscUJBQXFCLENBQUM7UUFDeEQsQ0FBQztRQUVN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QUMsQ0FBQztvQkFDN0ksSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUN4RCxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUN4QzthQUVKO1FBQ0wsQ0FBQztRQUNMLDRCQUFDO0lBQUQsQ0FBQyxBQXI2QkQsSUFxNkJDO0lBcjZCWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJVHJhY2VDaGFydCB9IGZyb20gXCIuLi9jaGFydFdpZGdldC9pbnRlcmZhY2VzL3RyYWNlQ2hhcnRJbnRlcmZhY2VcIlxyXG5pbXBvcnQgeyBZVENoYXJ0IH0gZnJvbSBcIi4uL2NoYXJ0V2lkZ2V0L1lUQ2hhcnRcIlxyXG5pbXBvcnQgeyBYWUNoYXJ0IH0gZnJvbSBcIi4uL2NoYXJ0V2lkZ2V0L1hZQ2hhcnRcIlxyXG5pbXBvcnQgeyBGRlRDaGFydCB9IGZyb20gXCIuLi9jaGFydFdpZGdldC9GRlRDaGFydFwiO1xyXG5pbXBvcnQgeyBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncywgQ2hhcnRCYXNlLCBFdmVudFJlZHJhd0FsbENoYXJ0c0FyZ3MgfSBmcm9tIFwiLi4vY2hhcnRXaWRnZXQvQ2hhcnRCYXNlXCJcclxuaW1wb3J0IHsgQ2hhcnRWaWV3TGF5b3V0TWFuYWdlciB9IGZyb20gXCIuL2NoYXJ0Vmlld0xheW91dE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2ludGVyZmFjZXMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENoYXJ0Vmlld1dpZGdldCwgWm9vbURpcmVjdGlvbiB9IGZyb20gXCIuL2NoYXJ0Vmlld1dpZGdldFwiO1xyXG5pbXBvcnQgeyBWaWV3VHlwZSB9IGZyb20gXCIuLi9jb21tb24vdmlld1R5cGVQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBDaGFydFJhbmdlSGVscGVyIH0gZnJvbSBcIi4uL2NoYXJ0V2lkZ2V0L2hlbHBlcnMvY2hhcnRSYW5nZUhlbHBlclwiO1xyXG5pbXBvcnQgeyBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2NoYXJ0TWFuYWdlckRhdGFNb2RlbFwiO1xyXG5pbXBvcnQgeyBJVXNlckludGVyYWN0aW9uQ29udHJvbGxlciB9IGZyb20gXCIuLi9jaGFydFdpZGdldC91c2VySW50ZXJhY3Rpb24vaW50ZXJmYWNlcy9jb250cm9sbGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENoYXJ0VHlwZSwgQ2hhcnRNYW5hZ2VyQ2hhcnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9jaGFydE1hbmFnZXJDaGFydFwiXHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXMvYmFzZVNlcmllc1wiXHJcbmltcG9ydCB7IFNlcmllQWN0aW9uLCBFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vc2VyaWVzL2V2ZW50U2VyaWVEYXRhQ2hhbmdlZEFyZ3NcIlxyXG5pbXBvcnQgeyBTY2FsZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3NjYWxlXCI7XHJcbmltcG9ydCB7IENoYXJ0RHJvcEhlbHBlciB9IGZyb20gXCIuL2hlbHBlcnMvY2hhcnREcm9wSGVscGVyXCI7XHJcbmltcG9ydCB7IENoYXJ0Vmlld1Rvb2xTdGF0ZSwgQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlLCBDaGFydFZpZXdUb29sU3RhdGVFbnVtIH0gZnJvbSBcIi4uL2NvbW1vbi9zdGF0ZXMvY2hhcnRWaWV3VG9vbGJhclN0YXRlc1wiO1xyXG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvc3RvcmVcIjtcclxuaW1wb3J0IHsgSUNoYXJ0TWFuYWdlckNoYXJ0IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvaW50ZXJmYWNlcy9jaGFydE1hbmFnZXJDaGFydEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBBeGlzUG9zaXRpb24sIEF4aXNPcmllbnRhdGlvbiB9IGZyb20gXCIuLi8uLi9jb3JlL2ludGVyZmFjZXMvY29tcG9uZW50cy91aS9jaGFydC9jaGFydEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBSZWN0YW5nbGUgfSBmcm9tIFwiLi4vLi4vY29yZS90eXBlcy9SZWN0YW5nbGVcIjtcclxuaW1wb3J0IHsgSUNoYXJ0QXhpcyB9IGZyb20gXCIuLi8uLi9jb3JlL2ludGVyZmFjZXMvY29tcG9uZW50cy91aS9jaGFydC9DaGFydEF4aXNJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2VyaWVDaGFydFR5cGVIZWxwZXIgfSBmcm9tIFwiLi4vY29tbW9uL1NlcmllQ2hhcnRUeXBlSGVscGVyXCI7XHJcbmltcG9ydCB7IFNlcmllc1R5cGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXMvc2VyaWVzVHlwZVwiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vY29yZS9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNwbGl0dGVyUGFuZURlZmluaXRpb24gfSBmcm9tIFwiLi4vc3BsaXR0ZXJXaWRnZXQvc3BsaXR0ZXJQYW5lRGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDcm9zc0hhaXJDdXJzb3IgfSBmcm9tIFwiLi4vY2hhcnRXaWRnZXQvY3Vyc29yL0Nyb3NzSGFpckN1cnNvclwiO1xyXG5pbXBvcnQgeyBMaW5lQ3Vyc29yIH0gZnJvbSBcIi4uL2NoYXJ0V2lkZ2V0L2N1cnNvci9MaW5lQ3Vyc29yXCI7XHJcbmltcG9ydCB7IFBhbmVQcm9wZXJ0aWVzIH0gZnJvbSBcIi4uL2NvbW1vbi9wYW5lUHJvcGVydGllc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENoYXJ0Vmlld0NoYXJ0TWFuYWdlciB7XHJcbiAgICBjaGFydFZpZXdXaWRnZXQ6IENoYXJ0Vmlld1dpZGdldDtcclxuICAgIHRyYWNlQ2hhcnRMaXN0OiBBcnJheTxJVHJhY2VDaGFydD4gPSBbXTtcclxuICAgIHNlcmllczogQmFzZVNlcmllc1tdID0gbmV3IEFycmF5PEJhc2VTZXJpZXM+KCk7XHJcblxyXG4gICAgbGF5b3V0TWFuYWdlcjogQ2hhcnRWaWV3TGF5b3V0TWFuYWdlcjtcclxuICAgIHVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXI6IElVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyO1xyXG4gICAgX2NoYXJ0TWFuYWdlckRhdGFNb2RlbDogSUNoYXJ0TWFuYWdlckRhdGFNb2RlbDtcclxuXHJcbiAgICBwcml2YXRlIF9zdGF0ZXM6IFN0b3JlO1xyXG5cclxuICAgIHByaXZhdGUgX29uU2VyaWVEYXRhQ2hhbmdlZCA9IChzZW5kZXIsIGV2ZW50QXJncykgPT4gdGhpcy5vblNlcmllRGF0YUNoYW5nZWQoc2VuZGVyLCBldmVudEFyZ3MpO1xyXG4gICAgcHJpdmF0ZSBfdXNlckNoYXJ0SW50ZXJhY3Rpb25IYW5kbGVyID0gKHNlbmRlciwgYXJncykgPT4gdGhpcy5vblVzZXJDaGFydEludGVyYWN0aW9uKHNlbmRlciwgYXJncyk7XHJcbiAgICBwcml2YXRlIF9vblJlZHJhd0FsbENoYXJ0cyA9IChzZW5kZXIsYXJncykgPT4gdGhpcy5vblJlZHJhd0FsbENoYXJ0cyhzZW5kZXIsYXJncyk7XHJcblxyXG4gICAgcHJpdmF0ZSBfcGVyc2lzdGVkUGFuZXM6IEFycmF5PFNwbGl0dGVyUGFuZURlZmluaXRpb24+ID0gW107XHJcblxyXG4gICAgcHJpdmF0ZSBfaG92ZXJlZFNlcmllcztcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jaGFydE1pbkhlaWdodCA9IDEwMDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjaGFydFZpZXdXaWRnZXQ6IENoYXJ0Vmlld1dpZGdldCwgdXNlckludGVyYWN0aW9uQ29udHJvbGxlcjogSVVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIsIGxheW91dE1hbmFnZXI6IENoYXJ0Vmlld0xheW91dE1hbmFnZXIsIGNoYXJ0TWFuYWdlckRhdGFNb2RlbDogSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCkge1xyXG4gICAgICAgIHRoaXMuY2hhcnRWaWV3V2lkZ2V0ID0gY2hhcnRWaWV3V2lkZ2V0O1xyXG4gICAgICAgIHRoaXMuX3N0YXRlcyA9IGNoYXJ0Vmlld1dpZGdldC5zdGF0ZXM7XHJcbiAgICAgICAgdGhpcy51c2VySW50ZXJhY3Rpb25Db250cm9sbGVyID0gdXNlckludGVyYWN0aW9uQ29udHJvbGxlcjtcclxuICAgICAgICB0aGlzLmxheW91dE1hbmFnZXIgPSBsYXlvdXRNYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbCA9IGNoYXJ0TWFuYWdlckRhdGFNb2RlbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdENoYXJ0Vmlld1dpdGhEYXRhTW9kZWwoKXsgICAgXHJcbiAgICAgICAgaWYodGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIElmIHRoZXJlIGFyZSBhbHJlYWR5IGNoYXJ0cyBpbiB0aGUgZGF0YW1vZGVsID0+IHNob3cgaW4gY2hhcnQgdmlldyA9PiBuZWVkZWQgZm9yIHBlcnNpc3RpbmdcclxuICAgICAgICAgICAgaWYodGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLmRhdGEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIC8vR2V0IHBlcnNpc3RlZCBjaGFydCBwYW5lc1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGVyc2lzdGVkUGFuZXMgPSB0aGlzLmxheW91dE1hbmFnZXIuY2hhcnRTcGxpdHRlci5nZXRDaGFydFZpZXdTcGxpdHRlclBhbmVEZWZpbml0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLmRhdGEuZm9yRWFjaChjaGFydD0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgY2hhcnRzLCBhZGQgc2NhbGVzLCBhZGQgc2VyaWVzXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRUcmFjZUNoYXJ0KGNoYXJ0LC0xLCAoY2hhcnQgYXMgQ2hhcnRNYW5hZ2VyQ2hhcnQpLmNoYXJ0VHlwZSwgZmFsc2UpOyAvLyBTdXBwcmVzcyByZWRyYXdpbmcgYW5kIGRvIGl0IGFmdGVyIGFsbCBjaGFydHMgd2hlcmUgYWRkZWQgdG8gYXZvaWQgbXVsdGlwbGUgcmVkcmF3c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcmVkcmF3IGFsbCBjaGFydHMgYWZ0ZXIgYWRkaW5nXHJcbiAgICAgICAgICAgICAgICAvKmZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3RbaV0ucmVkcmF3Q2hhcnQoKTtcclxuICAgICAgICAgICAgICAgIH0qL1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3RbaV0uZGlzcG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhZGRUcmFjZUNoYXJ0KGNoYXJ0OiBDaGFydE1hbmFnZXJDaGFydCwgaW5kZXg6IG51bWJlciA9IC0xLCB0eXBlOiBudW1iZXIsIHN1cHJlc3NSZWRyYXc6IGJvb2xlYW4gPSBmYWxzZSk6IElUcmFjZUNoYXJ0fHVuZGVmaW5lZCB7XHJcbiAgICAgICAgXHJcbiAgICAgICBcclxuICAgICAgIFxyXG4gICAgICAgIGxldCBuZXdUcmFjZUNoYXJ0OiBJVHJhY2VDaGFydHx1bmRlZmluZWQgPSB0aGlzLmFkZENoYXJ0VG9Db250YWluZXIoY2hhcnQubmFtZSwgaW5kZXgsIHR5cGUsIGNoYXJ0LmNoaWxkcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoc3VwcmVzc1JlZHJhdyA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgIHRoaXMucmVkcmF3Q2hhcnRzKGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzY2FsZXMgPSBjaGFydC5jaGlsZHM7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMudXBkYXRlWm9vbVNldHRpbmdzKCk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlWEF4aXNXaWR0aChjaGFydC5jaGFydFR5cGUpO1xyXG4gICAgICAgIHJldHVybiBuZXdUcmFjZUNoYXJ0O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGFkZENoYXJ0VG9Db250YWluZXIobmFtZTogc3RyaW5nLCBpbmRleDogbnVtYmVyID0gLTEsIHR5cGU6IENoYXJ0VHlwZSwgc2NhbGVzOiBTY2FsZVtdKTogSVRyYWNlQ2hhcnR8dW5kZWZpbmVkIHtcclxuICAgICAgICBsZXQgdHJhY2VDaGFydDogSVRyYWNlQ2hhcnQ7XHJcbiAgICAgICAgbGV0IGNoYXJ0SGVpZ2h0ID0gMzAwO1xyXG4gICAgICAgIGlmICh0aGlzLmNoYXJ0Vmlld1dpZGdldC52aWV3KSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IEhhbmRsZSB3aXRoIHNldHRpbmdzIG9iamVjdCBmYWN0b3J5XHJcbiAgICAgICAgICAgIGlmICh0eXBlID09PSBDaGFydFR5cGUuWVRDaGFydCkge1xyXG4gICAgICAgICAgICAgICAgdHJhY2VDaGFydCA9IG5ldyBZVENoYXJ0KHRoaXMuY2hhcnRWaWV3V2lkZ2V0LnZpZXcsIG5hbWUsIHR5cGUsIHNjYWxlcylcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBDaGFydFR5cGUuWFlDaGFydCkge1xyXG4gICAgICAgICAgICAgICAgdHJhY2VDaGFydCA9IG5ldyBYWUNoYXJ0KHRoaXMuY2hhcnRWaWV3V2lkZ2V0LnZpZXcsIG5hbWUsIHR5cGUsIHNjYWxlcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0cmFjZUNoYXJ0ID0gbmV3IEZGVENoYXJ0KHRoaXMuY2hhcnRWaWV3V2lkZ2V0LnZpZXcsIG5hbWUsIHR5cGUsIHNjYWxlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRyYWNlQ2hhcnQuZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbi5hdHRhY2godGhpcy5fdXNlckNoYXJ0SW50ZXJhY3Rpb25IYW5kbGVyKTtcclxuICAgICAgICAgICAgdHJhY2VDaGFydC5ldmVudFJlZHJhd0FsbENoYXJ0cy5hdHRhY2godGhpcy5fb25SZWRyYXdBbGxDaGFydHMpO1xyXG5cclxuICAgICAgICAgICAgLy9TZXQgdGhlIGhlaWdodCBvZiBwZXJzaXN0ZWQgY2hhcnRzXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9wZXJzaXN0ZWRQYW5lcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFydEhlaWdodCA9IHRoaXMuZ2V0UGVyc2lzdGVkQ2hhcnRIZWlnaHQobmFtZSk7XHJcbiAgICAgICAgICAgICAgICAvL1dvcmthcm91bmQ6IEFkZCAyIHBpeGVscyBpZiBpcyB0aGUgZmlyc3QgY2hhcnQgXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sYXlvdXRNYW5hZ2VyLmNoYXJ0U3BsaXR0ZXIubGF5b3V0UGFuZXMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGFydEhlaWdodCArPSAyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgcGFuZVByb3BlcnRpZXMgPSBuZXcgUGFuZVByb3BlcnRpZXMoKTtcclxuICAgICAgICAgICAgcGFuZVByb3BlcnRpZXMucGFuZVNpemUgPSBjaGFydEhlaWdodDtcclxuICAgICAgICAgICAgcGFuZVByb3BlcnRpZXMubWluU2l6ZSA9IHRoaXMuX2NoYXJ0TWluSGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLmxheW91dE1hbmFnZXIuY2hhcnRTcGxpdHRlci5hZGRXaWRnZXQodHJhY2VDaGFydCwgbmFtZSwgVmlld1R5cGUuVXNlciwgcGFuZVByb3BlcnRpZXMpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBzZXQgaW5kZXggYXQgYWRkV2lkZ2V0IE1ldGhvZCB0byBhdm9pZCBtb3ZpbmcgdGhlIGNoYXJ0IGFmdGVyd2FyZHNcclxuICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0TWFuYWdlci5jaGFydFNwbGl0dGVyLm1vdmVXaWRnZXQodHJhY2VDaGFydCwgaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdC5zcGxpY2UoaW5kZXgsIDAsIHRyYWNlQ2hhcnQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0LnB1c2godHJhY2VDaGFydCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRyYWNlQ2hhcnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkOyBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBoZWlnaHQgb2YgcGVyc2lzdGVkIGNoYXJ0c1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjaGFydE5hbWVcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIGdldFBlcnNpc3RlZENoYXJ0SGVpZ2h0KGNoYXJ0TmFtZTogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgY2hhcnRIZWlnaHQgPSB0aGlzLmxheW91dE1hbmFnZXIuZ2V0Q2hhcnRWaWV3U3BsaXR0ZXJIZWlnaHQodGhpcy5fcGVyc2lzdGVkUGFuZXMsIGNoYXJ0TmFtZSk7XHJcbiAgICAgICAgdGhpcy5fcGVyc2lzdGVkUGFuZXMgPSB0aGlzLl9wZXJzaXN0ZWRQYW5lcy5maWx0ZXIoZWxlbWVudCA9PiB7IHJldHVybiBlbGVtZW50LmNvbXBvbmVudERlZmluaXRpb24uaWQgIT0gY2hhcnROYW1lfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBjaGFydEhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1ldGhvZCB0byBzZXQgdGhlIFpvb21TZXR0aW5nKERpcmVjdGlvbiBhbmQgQm94Wm9vbSkgZm9yIGFsbCBDaGFydHMgYWNjb3JkaW5nIHRvIHRoZSBjb3JyZXNwb25kaW5nIHN0YXRlc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlWm9vbVNldHRpbmdzKCkge1xyXG4gICAgICAgIGxldCB0b29sc3RhdGU6IENoYXJ0Vmlld1Rvb2xTdGF0ZSA9IHRoaXMuX3N0YXRlcy5yZWFkKENoYXJ0Vmlld1Rvb2xTdGF0ZSwgXCJDaGFydFZpZXdUb29sU3RhdGVcIik7XHJcbiAgICAgICAgbGV0IHpvb21EaXJlY3Rpb25TdGF0ZTogQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlID0gdGhpcy5fc3RhdGVzLnJlYWQoQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlLCBcIkNoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZVwiKTtcclxuXHJcbiAgICAgICAgaWYgKHRvb2xzdGF0ZS5zZWxlY3RlZFRvb2wgPT0gQ2hhcnRWaWV3VG9vbFN0YXRlRW51bS5CT1haT09NKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Qm94Wm9vbSh0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRQYW5uaW5nKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodG9vbHN0YXRlLnNlbGVjdGVkVG9vbCA9PSBDaGFydFZpZXdUb29sU3RhdGVFbnVtLlBBTk5JTkcpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRCb3hab29tKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRQYW5uaW5nKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Qm94Wm9vbShmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UGFubmluZyhmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldENoYXJ0Wm9vbUF4ZXMoem9vbURpcmVjdGlvblN0YXRlLnpvb21EaXJlY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZVRyYWNlQ2hhcnQoY2hhcnQ6IElUcmFjZUNoYXJ0KSB7XHJcbiAgICAgICAgY2hhcnQuZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbi5kZXRhY2godGhpcy5fdXNlckNoYXJ0SW50ZXJhY3Rpb25IYW5kbGVyKTtcclxuICAgICAgICBjaGFydC5ldmVudFJlZHJhd0FsbENoYXJ0cy5kZXRhY2godGhpcy5fb25SZWRyYXdBbGxDaGFydHMpO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQ2hhcnRGcm9tQ2hhcnRMaXN0KGNoYXJ0KTtcclxuICAgICAgICBjaGFydC5kaXNwb3NlKCk7XHJcbiAgICAgICAgdGhpcy5sYXlvdXRNYW5hZ2VyLmNoYXJ0U3BsaXR0ZXIucmVtb3ZlV2lkZ2V0KGNoYXJ0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZUNoYXJ0RnJvbUNoYXJ0TGlzdChjaGFydDogSVRyYWNlQ2hhcnQpIHtcclxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmdldENoYXJ0SW5kZXgoY2hhcnQpO1xyXG5cclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vdmVUcmFjZUNoYXJ0KGNoYXJ0OiBDaGFydE1hbmFnZXJDaGFydCwgdGFyZ2V0Q2hhcnQ6IENoYXJ0TWFuYWdlckNoYXJ0LCBhcmdzKSB7XHJcblxyXG4gICAgICAgIGxldCB0cmFjZUNoYXJ0ID0gdGhpcy5nZXRDaGFydE9iamVjdEJ5TmFtZShjaGFydC5uYW1lKTtcclxuICAgICAgICBsZXQgdGFyZ2V0VHJhY2VDaGFydCA9IHRoaXMuZ2V0Q2hhcnRPYmplY3RCeU5hbWUodGFyZ2V0Q2hhcnQubmFtZSk7XHJcblxyXG4gICAgICAgIGlmICh0cmFjZUNoYXJ0ICE9IHVuZGVmaW5lZCAmJiB0YXJnZXRUcmFjZUNoYXJ0ICE9IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGNoYXJ0SW5kZXggPSB0aGlzLmdldENoYXJ0SW5kZXgodHJhY2VDaGFydCk7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXRJbmRleCA9IHRoaXMuZ2V0Q2hhcnRJbmRleCh0YXJnZXRUcmFjZUNoYXJ0KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChhcmdzLmluc2VydFR5cGUgPT0gXCJpbnNlcnRCZWxvd1wiKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRJbmRleCArPSAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY2hhcnRJbmRleCA+IC0xICYmIHRhcmdldEluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3Quc3BsaWNlKGNoYXJ0SW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoYXJ0SW5kZXggPCB0YXJnZXRJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3Quc3BsaWNlKHRhcmdldEluZGV4IC0gMSwgMCwgdHJhY2VDaGFydCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0LnNwbGljZSh0YXJnZXRJbmRleCwgMCwgdHJhY2VDaGFydCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheW91dE1hbmFnZXIuY2hhcnRTcGxpdHRlci5tb3ZlV2lkZ2V0KHRyYWNlQ2hhcnQsIHRhcmdldEluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5yZWRyYXdDaGFydHMoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVhBeGlzV2lkdGgoY2hhcnQuY2hhcnRUeXBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW1vdmVBbGxDaGFydHMoKSB7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVRyYWNlQ2hhcnQodGhpcy50cmFjZUNoYXJ0TGlzdFswXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Q2hhcnRJbmRleChjaGFydDogSVRyYWNlQ2hhcnQpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBpbmRleCA9IC0xXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldID09IGNoYXJ0KSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRyYWNlQ2hhcnRCeUNvbnRhaW5lcklkKGNvbnRhaW5lcklEOiBzdHJpbmcpOiBJVHJhY2VDaGFydCB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBkaXZJZCA9IHRoaXMudHJhY2VDaGFydExpc3RbaV0ubWFpbkRpdklkO1xyXG4gICAgICAgICAgICBpZiAoZGl2SWQgPT0gY29udGFpbmVySUQuc3Vic3RyKDAsIGRpdklkLmxlbmd0aCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRyYWNlQ2hhcnRCeU5hbWUoY2hhcnROYW1lOiBzdHJpbmcpOiBJVHJhY2VDaGFydCB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLndpZGdldE5hbWUgPT0gY2hhcnROYW1lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50cmFjZUNoYXJ0TGlzdFtpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBvbkNoYXJ0TWFuYWdlck1vZGVsQ2hhbmdlZChkYXRhTW9kZWw6IElDaGFydE1hbmFnZXJEYXRhTW9kZWwsIGFyZ3M6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncykge1xyXG4gICAgICAgIHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbCA9IGRhdGFNb2RlbDsgICAgICBcclxuICAgICAgICBzd2l0Y2ggKGFyZ3MuaGludCkge1xyXG4gICAgICAgICAgICBjYXNlIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LmFkZFNlcmllOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFNlcmllc1RvQ2hhcnQoYXJncy5kYXRhLnNlcmllcywgYXJncy5kYXRhLmNoYXJ0LCBhcmdzLmRhdGEuYXhpcywgYXJncy5kYXRhLmtlZXBTY2FsZXMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5tb3ZlU2VyaWU6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZVNlcmllKGFyZ3MuZGF0YS5zZXJpZSwgYXJncy5kYXRhLmNoYXJ0Lm5hbWUsIGFyZ3MuZGF0YS50YXJnZXRDaGFydC5uYW1lLCBhcmdzLmRhdGEudGFyZ2V0QXhpcyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LnJlbW92ZVNlcmllOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVNlcmllKGFyZ3MuZGF0YS5zZXJpZSwgYXJncy5kYXRhLmNoYXJ0Lm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5yZW1vdmVDaGFydDoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVDaGFydChhcmdzLmRhdGEuY2hhcnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5hZGRDaGFydDoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRUcmFjZUNoYXJ0KGFyZ3MuZGF0YS5jaGFydCwgYXJncy5kYXRhLmluZGV4LCBhcmdzLmRhdGEudHlwZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50Lm1vdmVDaGFydDoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlVHJhY2VDaGFydChhcmdzLmRhdGEuY2hhcnQsIGFyZ3MuZGF0YS50YXJnZXQsIGFyZ3MuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LmFkZFlTY2FsZToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRZU2NhbGUoYXJncy5kYXRhLnlBeGlzLCBhcmdzLmRhdGEuY2hhcnQubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LnJlbW92ZVlTY2FsZToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVZQXhpcyhhcmdzLmRhdGEueUF4aXMsIGFyZ3MuZGF0YS5jaGFydCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LnVwZGF0ZVNjYWxlUmFuZ2U6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3luY2hyb25pemVTY2FsZVhSYW5nZShhcmdzLmRhdGEuc2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwcml2YXRlIGFkZFNlcmllc1RvQ2hhcnQoc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPiwgY2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCwgc2NhbGU6IFNjYWxlLCBrZWVwU2NhbGVzOiBib29sZWFuID0gZmFsc2UpIHtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZXJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgc2VyaWVzW2ldLmV2ZW50RGF0YUNoYW5nZWQuYXR0YWNoKHRoaXMuX29uU2VyaWVEYXRhQ2hhbmdlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjaGFydE5hbWUgPSBjaGFydC5uYW1lO1xyXG5cclxuICAgICAgICBsZXQgcmVzZXRYUmFuZ2UgPSBmYWxzZTtcclxuICAgICAgICBsZXQgcmVzZXRZUmFuZ2UgPSBmYWxzZTtcclxuICAgICAgICBcclxuICAgICAgICBpZigha2VlcFNjYWxlcyl7XHJcbiAgICAgICAgICAgIHJlc2V0WFJhbmdlPSB0aGlzLmlzRmlyc3RTZXJpZXNPZlR5cGVJbkNoYXJ0cyhzZXJpZXNbMF0pXHJcbiAgICAgICAgICAgIHJlc2V0WVJhbmdlID0gdGhpcy5pc0ZpcnN0U2VyaWVzT25TY2FsZShzZXJpZXNbMF0sIHNjYWxlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgbGV0IGNoYXJ0T2JqID0gdGhpcy5nZXRDaGFydE9iamVjdEJ5TmFtZShjaGFydE5hbWUpO1xyXG4gICAgICAgICAgICBpZihjaGFydE9iaiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogT25seSB3b3JrcyBmb3IgWVQgYnV0IG5vdCBmb3IgRkZUXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHNjYWxlKFkpXHJcbiAgICAgICAgICAgICAgICBjaGFydE9iai5zZXRTY2FsZVJhbmdlKHNjYWxlLCBzY2FsZS5taW5YVmFsdWUsIHNjYWxlLm1heFhWYWx1ZSwgc2NhbGUubWluWVZhbHVlLCBzY2FsZS5tYXhZVmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBzY2FsZShYKVxyXG4gICAgICAgICAgICAgICAgY2hhcnRPYmouc2V0UmFuZ2VYKHNjYWxlLm1pblhWYWx1ZSwgc2NhbGUubWF4WFZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hZGRTZXJpZXMoc2VyaWVzLCBjaGFydE5hbWUsIHNjYWxlLCByZXNldFlSYW5nZSwgcmVzZXRYUmFuZ2UpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChyZXNldFhSYW5nZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0WFJhbmdlKHNlcmllc1swXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpDaGVja3MgaWYgYSBnaXZlbiBTZXJpZXMgaXMgdGhlIGZpcnN0IFNlcmllcyBvbiBhIHBhcnRpY3VsYXIgc2NhbGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxCYXNlU2VyaWVzPn0gc2VyaWVzXHJcbiAgICAgKiBAcGFyYW0ge1NjYWxlfSBzY2FsZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNGaXJzdFNlcmllc09uU2NhbGUoc2VyaWVzOiBCYXNlU2VyaWVzLCBzY2FsZTogU2NhbGUpOiBib29sZWFuIHtcclxuICAgICAgICAvL29ubHkgcmVzZXQgdGhlIGNoYXJ0cmFuZ2Ugb24gdGhlIHkgYXhpcyBpZiB0aGVzZSBhcmUgdGhlIGZpcnN0IHNlcmllcyBpbiB0aGUgc2NhbGVcclxuICAgICAgICBpZiAoc2NhbGUuY2hpbGRzLmxlbmd0aCA8IDEgfHwgc2VyaWVzICE9IHNjYWxlLmNoaWxkc1swXSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpDaGVja3MgaWYgYSBnaXZlbiBTZXJpZXMgaXMgdGhlIGZpcnN0IG9mIGl0cyB0eXBlIGluIGFsbCBjaGFydHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZXNcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNGaXJzdFNlcmllc09mVHlwZUluQ2hhcnRzKHNlcmllczogQmFzZVNlcmllcykge1xyXG4gICAgICAgIGxldCBjaGFydHMgPSB0aGlzLmdldENoYXJ0c0ZvclNlcmllKHNlcmllcyk7XHJcblxyXG4gICAgICAgIGZvciggbGV0IGNoYXJ0IG9mIGNoYXJ0cyl7XHJcbiAgICAgICAgICAgIGlmKGNoYXJ0LnNlcmllcy5sZW5ndGggIT0gMCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRDaGFydHNGb3JTZXJpZShzZXJpZXM6IEJhc2VTZXJpZXMpOiBJVHJhY2VDaGFydFtdIHtcclxuICAgICAgICBsZXQgY2hhcnRzID0gQXJyYXk8SVRyYWNlQ2hhcnQ+KCk7XHJcbiAgICAgICAgaWYgKHNlcmllcy50eXBlID09IFNlcmllc1R5cGUuZmZ0U2VyaWVzKSB7XHJcblxyXG4gICAgICAgICAgICBjaGFydHMgPSBuZXcgQ2hhcnRSYW5nZUhlbHBlcigpLmdldEZGVENoYXJ0cyh0aGlzLnRyYWNlQ2hhcnRMaXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoc2VyaWVzLnR5cGUgPT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzKSB7XHJcbiAgICAgICAgICAgIGNoYXJ0cyA9IG5ldyBDaGFydFJhbmdlSGVscGVyKCkuZ2V0WVRDaGFydHModGhpcy50cmFjZUNoYXJ0TGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjaGFydHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblNlcmllRGF0YUNoYW5nZWQoc2VuZGVyLCBldmVudEFyZ3M6IEV2ZW50U2VyaWVEYXRhQ2hhbmdlZEFyZ3MpIHtcclxuICAgICAgICBpZiAoZXZlbnRBcmdzLmFjdGlvbiA9PSBTZXJpZUFjdGlvbi5kYXRhUG9pbnRzQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNlcmllRGF0YShzZW5kZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChldmVudEFyZ3MuYWN0aW9uID09IFNlcmllQWN0aW9uLmNvbG9yQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNlcmllQ29sb3Ioc2VuZGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgVXBkYXRlcyB0aGUgc2VyaWUgZGF0YXBvaW50cyBpbiBhbGwgY2hhcnRzIHdoZXJlIHRoZSBzZXJpZSBpcyBkaXNwbGF5ZWRcclxuICAgICAqICBJZiBkYXRhcG9pbnRzIG5vdCB2YWxpZCwgdGhlIHNlcmllIHdpbGwgYmUgcmVtb3ZlZCBmcm9tIHRoZSBjaGFydHMgb3RoZXJ3aXNlIGFkZGVkIGlmIG5vdCBhbHJlYWR5IGluIHRoZSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld0NoYXJ0TWFuYWdlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVNlcmllRGF0YShzZXJpZXM6IEJhc2VTZXJpZXMpIHtcclxuICAgICAgICBpZiAoc2VyaWVzLnJhd1BvaW50c1ZhbGlkID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIC8vIE5vIHZhbGlkIHNlcmllIGRhdGEgPT4gcmVtb3ZlIGZyb20gYWxsIGNoYXJ0c1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVNlcmllRnJvbUFsbENoYXJ0cyhzZXJpZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gYWRkIHNlcmllIHRvIGNoYXJ0IGlmIG5vdCBhbHJlYWR5IGluIGl0IG90aGVyd2lzZSB1cGRhdGUgY2hhcnRcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjaGFydHMgPSB0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwuZ2V0Q2hhcnRzVXNpbmdTZXJpZShbc2VyaWVzXSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNlcmllSW5BbGxDaGFydHMoY2hhcnRzLCBzZXJpZXMpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVTZXJpZUluQWxsQ2hhcnRzKGNoYXJ0czogSUNoYXJ0TWFuYWdlckNoYXJ0W10sIHNlcmllczogQmFzZVNlcmllcykge1xyXG4gICAgICAgIGxldCBzZXJpZUNoYXJ0VHlwZSA9IFNlcmllQ2hhcnRUeXBlSGVscGVyLmdldFNlcmllQ2hhcnRUeXBlKHNlcmllcy50eXBlKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFydHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNoYXJ0ID0gdGhpcy5nZXRDaGFydE9iamVjdEJ5TmFtZShjaGFydHNbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgIGlmIChjaGFydCAhPSB1bmRlZmluZWQgJiYgc2VyaWVDaGFydFR5cGUgPT0gY2hhcnQudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzU2VyaWVJbkNoYXJ0KGNoYXJ0LCBzZXJpZXMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIHNlcmllcyBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2NhbGUgPSBjaGFydHNbaV0uZ2V0WUF4aXNGb3JTZXJpZShzZXJpZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzY2FsZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlzRmlyc3RTZXJpZXNJbkNoYXJ0ID0gdGhpcy5pc0ZpcnN0U2VyaWVzT2ZUeXBlSW5DaGFydHMoc2VyaWVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTZXJpZXMoW3Nlcmllc10sIGNoYXJ0c1tpXS5uYW1lLCBzY2FsZSwgdGhpcy5pc0ZpcnN0U2VyaWVzT25TY2FsZShzZXJpZXMsIHNjYWxlKSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNGaXJzdFNlcmllc0luQ2hhcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRYUmFuZ2Uoc2VyaWVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlNjYWxlIG5vdCBmb3VuZCBmb3Igc2VyaWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2hhcnQuc2V0QXZhaWxhYmxlU2VyaWVzQXNEYXRhU291cmNlKCk7XHJcbiAgICAgICAgICAgICAgICBjaGFydC5yZWRyYXdDaGFydCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVzZXRYUmFuZ2Uoc2VyaWVzOiBCYXNlU2VyaWVzKXtcclxuICAgICAgICBsZXQgY2hhcnRSYW5nZUhlbHBlciA6IENoYXJ0UmFuZ2VIZWxwZXIgPSBuZXcgQ2hhcnRSYW5nZUhlbHBlcigpO1xyXG4gICAgICAgIGlmIChzZXJpZXMudHlwZSA9PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMpIHtcclxuICAgICAgICAgICAgY2hhcnRSYW5nZUhlbHBlci5yZXNldFhSYW5nZXNZVCh0aGlzLnRyYWNlQ2hhcnRMaXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoc2VyaWVzLnR5cGUgPT0gU2VyaWVzVHlwZS5mZnRTZXJpZXMpIHtcclxuICAgICAgICAgICAgY2hhcnRSYW5nZUhlbHBlci5yZXNldFhSYW5nZXNGRlQodGhpcy50cmFjZUNoYXJ0TGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVkcmF3Q2hhcnRzKHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgY29sb3Igb2YgdGhlIHNlcmllIGluIGFsbCBjaGFydHMgd2hlcmUgdGhlIHNlcmllIGlzIGRpc3BsYXllZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlU2VyaWVDb2xvcihzZXJpZTogQmFzZVNlcmllcykge1xyXG4gICAgICAgIGlmICh0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGxldCBzZXJpZXMgPSBuZXcgQXJyYXk8QmFzZVNlcmllcz4oKTtcclxuICAgICAgICAgICAgc2VyaWVzLnB1c2goc2VyaWUpO1xyXG4gICAgICAgICAgICBsZXQgY2hhcnRzID0gdGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLmdldENoYXJ0c1VzaW5nU2VyaWUoc2VyaWVzKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFydHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBjaGFydCA9IHRoaXMuZ2V0Q2hhcnRPYmplY3RCeU5hbWUoY2hhcnRzW2ldLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoYXJ0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBzZXJpZXMgY29sb3IgaW4gdGhlIGNoYXJ0XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcnQuc2V0QXZhaWxhYmxlU2VyaWVzQXNEYXRhU291cmNlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhZGQgc2VyaWUgdG8gY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEJhc2VTZXJpZXM+fSBzZXJpZXNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjaGFydE5hbWVcclxuICAgICAqIEBwYXJhbSB7U2NhbGV9IHNjYWxlXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHVwZGF0ZVJhbmdlWVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld0NoYXJ0TWFuYWdlclxyXG4gICAgICovXHJcbiAgICBhZGRTZXJpZXMoc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPiwgY2hhcnROYW1lOiBzdHJpbmcsIHNjYWxlOiBTY2FsZSwgdXBkYXRlUmFuZ2VZOiBib29sZWFuLCB1cGRhdGVSYW5nZVg6IGJvb2xlYW4pIHtcclxuICAgICAgICBsZXQgY2hhcnQgPSB0aGlzLmdldENoYXJ0T2JqZWN0QnlOYW1lKGNoYXJ0TmFtZSk7XHJcbiAgICAgICAgaWYgKGNoYXJ0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBsZXQgYXhpc01pbjogbnVtYmVyIHwgdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBsZXQgYXhpc01heDogbnVtYmVyIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgbGV0IGF4aXMgPSAoY2hhcnQgYXMgQ2hhcnRCYXNlKS5jaGFydC5nZXRBeGlzKHNjYWxlLmlkKTtcclxuICAgICAgICAgICAgaWYoYXhpcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGF4aXNSYW5nZSA9IGF4aXMuZ2V0QXhpc1JhbmdlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXhpc1JhbmdlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGF4aXNNaW4gPSBheGlzUmFuZ2UubWluO1xyXG4gICAgICAgICAgICAgICAgICAgIGF4aXNNYXggPSBheGlzUmFuZ2UubWF4XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJTY2FsZSBub3QgYXZhaWxhYmxlISBcIiArIHNjYWxlLmlkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2hhcnQuYWRkU2VyaWVzVG9DaGFydChzZXJpZXMsIHNjYWxlLCB1cGRhdGVSYW5nZVgpO1xyXG4gICAgICAgICAgICBjaGFydC5zZXRBdmFpbGFibGVTZXJpZXNBc0RhdGFTb3VyY2UoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChheGlzTWluICE9IHVuZGVmaW5lZCAmJiBheGlzTWF4ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgY2hhcnQuc2V0U2NhbGVSYW5nZShzY2FsZSwgc2NhbGUubWluWFZhbHVlLCBzY2FsZS5tYXhYVmFsdWUsIGF4aXNNaW4sIGF4aXNNYXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh1cGRhdGVSYW5nZVkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBheGlzTWluVmFsdWUgPSBjaGFydC5nZXRTZXJpZXNNaW5ZRm9yU2NhbGUoc2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGF4aXNNYXhWYWx1ZSA9IGNoYXJ0LmdldFNlcmllc01heFlGb3JTY2FsZShzY2FsZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGF4aXNNaW5WYWx1ZSAhPSB1bmRlZmluZWQgJiYgYXhpc01heFZhbHVlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYXJ0LnVwZGF0ZVJhbmdlWShzY2FsZSwgYXhpc01pblZhbHVlLCBheGlzTWF4VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNoYXJ0LnJlZHJhd0NoYXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFkZFlTY2FsZSh5U2NhbGU6IFNjYWxlLCBjaGFydE5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBjaGFydCA9IHRoaXMuZ2V0Q2hhcnRPYmplY3RCeU5hbWUoY2hhcnROYW1lKTtcclxuICAgICAgICBpZihjaGFydCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjaGFydCEuYWRkWVNjYWxlKHlTY2FsZSwgQXhpc1Bvc2l0aW9uLnJpZ2h0KTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVYQXhpc1dpZHRoKGNoYXJ0IS50eXBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBtb3ZlIG9uZSBzZXJpZSBmcm9tIG9uZSBjaGFydCB0byBhbm90aGVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNoYXJ0TmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRhcmdldENoYXJ0TmFtZVxyXG4gICAgICogQHBhcmFtIHtTY2FsZX0gdGFyZ2V0U2NhbGVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdDaGFydE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgbW92ZVNlcmllKHNlcmllOiBCYXNlU2VyaWVzLCBjaGFydE5hbWU6IHN0cmluZywgdGFyZ2V0Q2hhcnROYW1lOiBzdHJpbmcsIHRhcmdldFNjYWxlOiBTY2FsZSkge1xyXG4gICAgICAgIGlmIChzZXJpZS5yYXdQb2ludHNWYWxpZCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGFydCA9IHRoaXMuZ2V0Q2hhcnRPYmplY3RCeU5hbWUoY2hhcnROYW1lKTtcclxuICAgICAgICAgICAgbGV0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcnRPYmplY3RCeU5hbWUodGFyZ2V0Q2hhcnROYW1lKTtcclxuICAgICAgICAgICAgbGV0IHNlcmllcyA9IG5ldyBBcnJheTxCYXNlU2VyaWVzPigpO1xyXG4gICAgICAgICAgICBzZXJpZXMucHVzaChzZXJpZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY2hhcnQgIT0gdW5kZWZpbmVkICYmIHRhcmdldCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNoYXJ0LnJlbW92ZVNlcmllRnJvbUNoYXJ0KHNlcmllLCB0aGlzLmlzTGFzdFNlcmllV2l0aEN1cnNvclR5cGUoY2hhcnQpKTtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5hZGRTZXJpZXNUb0NoYXJ0KHNlcmllcywgdGFyZ2V0U2NhbGUsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNoYXJ0LnNldEF2YWlsYWJsZVNlcmllc0FzRGF0YVNvdXJjZSgpO1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnNldEF2YWlsYWJsZVNlcmllc0FzRGF0YVNvdXJjZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVhBeGlzV2lkdGgoY2hhcnQhLnR5cGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlbW92ZSBvbmUgc2VyaWUgZnJvbSBnaXZlbiBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjaGFydE5hbWVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdDaGFydE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlU2VyaWUoc2VyaWU6IEJhc2VTZXJpZXMsIGNoYXJ0TmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGNoYXJ0ID0gdGhpcy5nZXRDaGFydE9iamVjdEJ5TmFtZShjaGFydE5hbWUpO1xyXG4gICAgICAgIGlmIChjaGFydCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY2hhcnQucmVtb3ZlU2VyaWVGcm9tQ2hhcnQoc2VyaWUsIHRoaXMuaXNMYXN0U2VyaWVXaXRoQ3Vyc29yVHlwZShjaGFydCkpO1xyXG4gICAgICAgICAgICBjaGFydC5zZXRBdmFpbGFibGVTZXJpZXNBc0RhdGFTb3VyY2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjaGFydHNXaXRoU2VyaWUgPSB0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwuZ2V0Q2hhcnRzVXNpbmdTZXJpZShbc2VyaWVdKTtcclxuICAgICAgICBpZiAoY2hhcnRzV2l0aFNlcmllLmxlbmd0aCA9PSAwKSB7IC8vIFNlcmllIG5vdCB1c2VkIGluIGFuIG90aGVyIGNoYXJ0ID0+IGRldGFjaCBzZXJpZSBldmVudHNcclxuICAgICAgICAgICAgc2VyaWUuZXZlbnREYXRhQ2hhbmdlZC5kZXRhY2godGhpcy5fb25TZXJpZURhdGFDaGFuZ2VkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlWUF4aXMoeVNjYWxlOiBTY2FsZSwgY2hhcnQ6IENoYXJ0TWFuYWdlckNoYXJ0KSB7XHJcbiAgICAgICAgbGV0IHRyYWNlQ2hhcnQgPSB0aGlzLmdldENoYXJ0T2JqZWN0QnlOYW1lKGNoYXJ0Lm5hbWUpO1xyXG4gICAgICAgIGlmICh0cmFjZUNoYXJ0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0cmFjZUNoYXJ0LnJlbW92ZVlTY2FsZUZyb21DaGFydCh5U2NhbGUpO1xyXG4gICAgICAgICAgICB0cmFjZUNoYXJ0LnNldEF2YWlsYWJsZVNlcmllc0FzRGF0YVNvdXJjZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVYQXhpc1dpZHRoKGNoYXJ0LmNoYXJ0VHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZW1vdmUgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2hhcnROYW1lXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZUNoYXJ0KGNoYXJ0OiBDaGFydE1hbmFnZXJDaGFydCkge1xyXG4gICAgICAgIGxldCB0cmFjZUNoYXJ0ID0gdGhpcy5nZXRDaGFydE9iamVjdEJ5TmFtZShjaGFydC5uYW1lKTtcclxuICAgICAgICBpZiAodHJhY2VDaGFydCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVUcmFjZUNoYXJ0KHRyYWNlQ2hhcnQpO1xyXG5cclxuICAgICAgICAgICAgbGV0IG1pblg6IG51bWJlciB8IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgbGV0IG1heFg6IG51bWJlciB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJhY2VDaGFydC5zZXJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChtaW5YID09IHVuZGVmaW5lZCB8fCBtaW5YID4gdHJhY2VDaGFydC5zZXJpZXNbaV0ubWluWCEpIHtcclxuICAgICAgICAgICAgICAgICAgICBtaW5YID0gdHJhY2VDaGFydC5zZXJpZXNbaV0ubWluWDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChtYXhYID09IHVuZGVmaW5lZCB8fCBtYXhYIDwgdHJhY2VDaGFydC5zZXJpZXNbaV0ubWF4WCEpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXhYID0gdHJhY2VDaGFydC5zZXJpZXNbaV0ubWF4WDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVYQXhpc1dpZHRoKGNoYXJ0LmNoYXJ0VHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGFubmluZ0F4ZXMoYXhlczogSUNoYXJ0QXhpc1tdKSB7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcGFubmluZ0F4aXMgPSBuZXcgQXJyYXk8SUNoYXJ0QXhpcz4oKTtcclxuICAgICAgICAgICAgaWYgKGF4ZXNbMF0gPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMudHJhY2VDaGFydExpc3RbaV0uc2NhbGVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF4aXMgPSB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLmNoYXJ0LmdldEF4aXModGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5zY2FsZXNbal0uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChheGlzICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYW5uaW5nQXhpcy5wdXNoKGF4aXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYXhpcyA9IHRoaXMudHJhY2VDaGFydExpc3RbaV0uY2hhcnQuZ2V0QXhpcyh0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLnByaW1hcnlYQXhpc05hbWUpXHJcbiAgICAgICAgICAgICAgICBpZiAoYXhpcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYW5uaW5nQXhpcy5wdXNoKGF4aXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcGFubmluZ0F4aXMgPSBheGVzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLmNoYXJ0LnNldFBhbm5pbmdBeGVzKHBhbm5pbmdBeGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3luY2hyb25pemVTY2FsZVhSYW5nZShzY2FsZTogU2NhbGUpIHtcclxuICAgICAgICBsZXQgY2hhcnRUeXBlID0gc2NhbGUucGFyZW50LmNoYXJ0VHlwZTtcclxuICAgICAgICBsZXQgbWluID0gc2NhbGUubWluWFZhbHVlO1xyXG4gICAgICAgIGxldCBtYXggPSBzY2FsZS5tYXhYVmFsdWU7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50cmFjZUNoYXJ0TGlzdFtpXS50eXBlID09IGNoYXJ0VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5vblN5bmNocm9uaXplU2NhbGVSYW5nZShzY2FsZSwgbWluLCBtYXgpO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLnJlZHJhd0NoYXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Wm9vbUF4ZXNJbkNoYXJ0KGNoYXJ0OiBJVHJhY2VDaGFydCwgem9vbURpcmVjdGlvbjogWm9vbURpcmVjdGlvbik6IEFycmF5PElDaGFydEF4aXM+IHtcclxuICAgICAgICBsZXQgYXhlcyA9IG5ldyBBcnJheTxJQ2hhcnRBeGlzPigpO1xyXG5cclxuICAgICAgICBpZiAoem9vbURpcmVjdGlvbiA9PSBab29tRGlyZWN0aW9uLlhZIHx8IHpvb21EaXJlY3Rpb24gPT0gWm9vbURpcmVjdGlvbi5YKSB7XHJcbiAgICAgICAgICAgIGxldCBheGlzID0gY2hhcnQuY2hhcnQuZ2V0QXhpcyhjaGFydC5wcmltYXJ5WEF4aXNOYW1lKTtcclxuICAgICAgICAgICAgaWYgKGF4aXMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBheGVzLnB1c2goYXhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh6b29tRGlyZWN0aW9uID09IFpvb21EaXJlY3Rpb24uWFkgfHwgem9vbURpcmVjdGlvbiA9PSBab29tRGlyZWN0aW9uLlkpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFydC5zY2FsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBheGlzID0gY2hhcnQuY2hhcnQuZ2V0QXhpcyhjaGFydC5zY2FsZXNbaV0uaWQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGF4aXMgIT0gdW5kZWZpbmVkICYmIGF4aXMuZ2V0QXhpc09yaWVudGF0aW9uKCkgPT0gQXhpc09yaWVudGF0aW9uLnZlcnRpY2FsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXhlcy5wdXNoKGF4aXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBheGVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZXJlIGFyZSBubyBtb3JlIHNlcmllcyBpbiBhbGwgb3RoZXIgY2hhcnRzIHdpdGggdGhlIHNhbWUgY3Vyc29yIHR5cGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJVHJhY2VDaGFydH0gY2hhcnRcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld0NoYXJ0TWFuYWdlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzTGFzdFNlcmllV2l0aEN1cnNvclR5cGUoY2hhcnQ6IElUcmFjZUNoYXJ0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGN1cnNvclR5cGUgPSBjaGFydC5nZXRTZXJpZUN1cnNvclR5cGUoKTtcclxuICAgICAgICBpZiAoY2hhcnQuc2VyaWVzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHJhY2VDaGFydExpc3RbaV0uZ2V0U2VyaWVDdXJzb3JUeXBlKCkgPT09IGN1cnNvclR5cGUgJiYgdGhpcy50cmFjZUNoYXJ0TGlzdFtpXSAhPT0gY2hhcnQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbmRzIElUcmFjZUNoYXJ0T2JqZWN0IGJ5IGdpdmUgbmFtZSBhbmQgcmV0dXJuIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQHJldHVybnMgeyhJVHJhY2VDaGFydCB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0Q2hhcnRPYmplY3RCeU5hbWUobmFtZTogc3RyaW5nKTogSVRyYWNlQ2hhcnQgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50cmFjZUNoYXJ0TGlzdFtpXS53aWRnZXROYW1lID09IG5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc1NlcmllSW5DaGFydChjaGFydCwgc2VyaWUpOiBib29sZWFuIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJ0LnNlcmllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoY2hhcnQuc2VyaWVzW2ldLmlkID09PSBzZXJpZS5pZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qcHJpdmF0ZSBnZXRQcmV2aW91c0NoYXJ0T2JqZWN0QnlOYW1lKG5hbWUgOnN0cmluZykgOiBJVHJhY2VDaGFydCB8IHVuZGVmaW5lZHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy50cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMudHJhY2VDaGFydExpc3RbaV0ud2lkZ2V0TmFtZSA9PSBuYW1lKXtcclxuICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhY2VDaGFydExpc3RbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH0qL1xyXG5cclxuICAgIHByaXZhdGUgcmVtb3ZlU2VyaWVGcm9tQWxsQ2hhcnRzKHNlcmllOiBCYXNlU2VyaWVzKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMudHJhY2VDaGFydExpc3RbaV0uc2VyaWVzLm1hcChmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5pZDsgfSkuaW5kZXhPZihzZXJpZS5pZCk7XHJcbiAgICAgICAgICAgIC8vY29uc3QgaW5kZXggPSB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLnNlcmllcy5pbmRleE9mKHNlcmllLCAwKTtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3RbaV0ucmVtb3ZlU2VyaWVGcm9tQ2hhcnQodGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5zZXJpZXNbaW5kZXhdLCB0aGlzLmlzTGFzdFNlcmllV2l0aEN1cnNvclR5cGUodGhpcy50cmFjZUNoYXJ0TGlzdFtpXSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrUmVmZXJlbmNlQ3Vyc29yc0hvdmVyaW5nKG1vdXNlUG9pbnQ6IElQb2ludCwgdHJhY2VDaGFydDogSVRyYWNlQ2hhcnQpOiB2b2lke1xyXG4gICAgICAgIHRyYWNlQ2hhcnQuY2hlY2tDdXJzb3JzSG92ZXJpbmcobW91c2VQb2ludCk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhZ0N1cnNvckFsb25nTGluZSh0cmFjZUNoYXJ0OiBJVHJhY2VDaGFydCwgbW92ZW1lbnRYOiBudW1iZXIsIG1vdmVtZW50WTogbnVtYmVyKTogdm9pZHtcclxuICAgICAgICB0cmFjZUNoYXJ0LmRyYWdDdXJzb3JBbG9uZ0xpbmUobW92ZW1lbnRYLCBtb3ZlbWVudFksIHRoaXMuX2hvdmVyZWRTZXJpZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEN1cnNvck9uUG9pbnRlclBvc2l0aW9uKHRyYWNlQ2hhcnQgOiBJVHJhY2VDaGFydCwgbW91c2VQb2ludDogSVBvaW50KXtcclxuICAgICAgICB0cmFjZUNoYXJ0LnNldEN1cnNvck9uUG9pbnRlclBvc2l0aW9uKG1vdXNlUG9pbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGRvUGFubmluZyh0cmFjZUNoYXJ0OiBJVHJhY2VDaGFydCwgbW91c2VQb2ludFg6IG51bWJlciwgbW91c2VQb2ludFk6IG51bWJlcik6IHZvaWR7XHJcbiAgICAgICAgdHJhY2VDaGFydC5kb1Bhbm5pbmcobW91c2VQb2ludFgsIG1vdXNlUG9pbnRZKTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldFBhbm5pbmdDb29yZHMoKXtcclxuICAgICAgICBmb3IobGV0IGNoYXJ0IG9mIHRoaXMudHJhY2VDaGFydExpc3Qpe1xyXG4gICAgICAgICAgICBjaGFydC5yZXNldFBhbm5pbmdDb29yZHMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJlc2V0Wm9vbSgpIHtcclxuICAgICAgICBsZXQgY2hhcnRSYW5nZUhlbHBlciA9IG5ldyBDaGFydFJhbmdlSGVscGVyKCk7XHJcblxyXG4gICAgICAgIGNoYXJ0UmFuZ2VIZWxwZXIucmVzZXRYUmFuZ2VzQWxsQ2hhcnRUeXBlcyh0aGlzLnRyYWNlQ2hhcnRMaXN0KTtcclxuICAgICAgICBjaGFydFJhbmdlSGVscGVyLnJlc2V0WVJhbmdlc0FsbENoYXJ0VHlwZXModGhpcy50cmFjZUNoYXJ0TGlzdCk7XHJcbiAgICAgICAgdGhpcy5yZWRyYXdDaGFydHModHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRDdXJzb3JzSG92ZXJpbmcoYXJncykge1xyXG4gICAgICAgIGlmICh0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IHBhcmVudEVsZW1lbnQgPSBhcmdzLmRhdGEuZS50YXJnZXQucGFyZW50RWxlbWVudFxyXG4gICAgICAgICAgICBpZiAocGFyZW50RWxlbWVudCAhPT0gdW5kZWZpbmVkICYmIHBhcmVudEVsZW1lbnQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGxldCBtb3VzZU92ZXJDdXJzb3JzID0gdGhpcy5pc01vdXNlT3ZlckN1cnNvcnMocGFyZW50RWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAvL0p1c3QgcmVzZXQgY3Vyc29ycyBpZiBtb3VzZSBpcyBtb3Zpbmcgb3V0c2lkZSBhIGNoYXJ0XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmdldFRyYWNlQ2hhcnRCeUNvbnRhaW5lcklkKHBhcmVudEVsZW1lbnQuaWQpID09PSB1bmRlZmluZWQgJiYgIW1vdXNlT3ZlckN1cnNvcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0WzBdLnJlc2V0Q3Vyc29yc0hvdmVyZWQoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gIFxyXG5cclxuICAgIGF1dG9TY2FsZSgpIHtcclxuICAgICAgICBsZXQgY2hhcnRSYW5nZUhlbHBlciA9IG5ldyBDaGFydFJhbmdlSGVscGVyKCk7XHJcbiAgICAgICAgZm9yIChsZXQgY2hhcnQgb2YgdGhpcy50cmFjZUNoYXJ0TGlzdCkge1xyXG4gICAgICAgICAgICBjaGFydC5hdXRvU2NhbGVZU2NhbGVzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjaGFydFJhbmdlSGVscGVyLnJlc2V0WFJhbmdlc0FsbENoYXJ0VHlwZXModGhpcy50cmFjZUNoYXJ0TGlzdCk7XHJcbiAgICAgICAgdGhpcy5yZWRyYXdDaGFydHModHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q2hhcnRab29tQXhlcyhheGVzOiBab29tRGlyZWN0aW9uKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3RbaV0uc2V0Wm9vbUF4ZXMoYXhlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2hhcnRWaWV3V2lkZ2V0LmFjdGl2ZVNlbGVjdGVkWm9vbUF4aXMgPSBheGVzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBhbm5pbmcoZW5hYmxlOiBib29sZWFuKTogYW55IHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5zZXRQYW5uaW5nKGVuYWJsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldEJveFpvb20oZW5hYmxlOiBib29sZWFuKTogYW55IHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5zZXRCb3hab29tKGVuYWJsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZHJhd0NoYXJ0cyhmb3JjZVJlZHJhdzogYm9vbGVhbiwgY2hhcnRUeXBlPzogQ2hhcnRUeXBlKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vaWYgKGZvcmNlUmVkcmF3ID09IHRydWUgfHwgdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS50eXBlICE9IENoYXJ0VHlwZS5YWUNoYXJ0KSB7XHJcbiAgICAgICAgICAgIC8vICAgIHRoaXMudHJhY2VDaGFydExpc3RbaV0ucmVkcmF3Q2hhcnQoKTtcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIGlmKGNoYXJ0VHlwZSA9PSB1bmRlZmluZWQgfHwgZm9yY2VSZWRyYXcgPT0gdHJ1ZSB8fCB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLnR5cGUgPT0gY2hhcnRUeXBlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3RbaV0ucmVkcmF3Q2hhcnQoKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uUmVkcmF3QWxsQ2hhcnRzKHNlbmRlciwgYXJncyA6IEV2ZW50UmVkcmF3QWxsQ2hhcnRzQXJncyl7XHJcbiAgICAgICAgdGhpcy5yZWRyYXdDaGFydHMoZmFsc2UsIGFyZ3MuY2hhcnRUeXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzTW91c2VPdmVyQ3Vyc29ycyhlbGVtZW50KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LnZhbHVlLmluY2x1ZGVzKENyb3NzSGFpckN1cnNvci5jcm9zc0hhaXJDdXJzb3JJZCkgfHwgZWxlbWVudC5jbGFzc0xpc3QudmFsdWUuaW5jbHVkZXMoTGluZUN1cnNvci5saW5lQ3Vyc29ySWQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uVXNlckNoYXJ0SW50ZXJhY3Rpb24oc2VuZGVyLCBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJnczogRXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3MpIDogdm9pZCB7XHJcbiAgICAgICAgLy9vbiBkcmFnZ2luZyB0aGUgaG92ZXJkIHNlcmllcyBuZWVkcyB0byBiZSBzdG9yZWQgdG8gY2FsY3VsYXRlIHRoZSBjdXJzb3IgcG9zdGlvbiB3aGVuIHRoZSBtb3VzZSBpcyBtb3ZlZCBvdmVyIG11bHRpcGxlIGNoYXJ0c1xyXG4gICAgICAgIGlmIChldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncy5ldmVudEFyZ3VtZW50cy5ob3ZlcmVkU2VyaWVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2hvdmVyZWRTZXJpZXMgPSBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncy5ldmVudEFyZ3VtZW50cy5ob3ZlcmVkU2VyaWVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNoYXJ0Vmlld1dpZGdldC5vblVzZXJDaGFydEludGVyYWN0aW9uKHNlbmRlciwgZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3MpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZERyb3BwYWJsZUxvY2F0aW9ucyhkYXRhLCBzYW1lR3JvdXA6IGJvb2xlYW4pIHtcclxuICAgICAgICBmb3IgKGxldCBjaGFydCBvZiB0aGlzLnRyYWNlQ2hhcnRMaXN0KSB7XHJcbiAgICAgICAgICAgIGxldCBjaGFydE1hbmFnZXJDaGFydCA9IHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbC5nZXRDaGFydChjaGFydC53aWRnZXROYW1lKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzZXJpZUNoYXJ0VHlwZSA9IFNlcmllQ2hhcnRUeXBlSGVscGVyLmdldFNlcmllQ2hhcnRUeXBlKGRhdGFbMF0udHlwZSk7XHJcbiAgICAgICAgICAgIFNlcmllQ2hhcnRUeXBlSGVscGVyLnNldERyb3BQb3NzaWJsZUFyZWFzKGNoYXJ0TWFuYWdlckNoYXJ0ISwgZGF0YSwgc2VyaWVDaGFydFR5cGUsIHNhbWVHcm91cCk7XHJcbiAgICAgICAgICAgIGNoYXJ0LmFkZFNlcmllRHJvcExvY2F0aW9ucyhkYXRhLCBjaGFydE1hbmFnZXJDaGFydCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZHJvcEhlbHBlciA9IG5ldyBDaGFydERyb3BIZWxwZXIodGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLCB0aGlzLmNoYXJ0Vmlld1dpZGdldCk7XHJcbiAgICAgICAgLy8gQWRkIGVtcHR5IHNwYWNlIGRyb3AgbG9jYXRpb25cclxuICAgICAgICBpZiAoZHJvcEhlbHBlci5jYW5BZGRDaGFydCgpID09IHRydWUpIHsgLy8gSXMgaXQgcG9zc2libGUgdG8gYWRkIG9uZSBtb3JlIGNoYXJ0XHJcbiAgICAgICAgICAgIGxldCBlbXB0eVNwYWNlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMubGF5b3V0TWFuYWdlci5jaGFydFNwbGl0dGVyLmdldExhc3RQYW5lSWQoKSk7XHJcbiAgICAgICAgICAgIGxldCBzY3JvbGxCYXJXaWR0aCA9ICQoJyMnICsgdGhpcy5sYXlvdXRNYW5hZ2VyLmNoYXJ0U3BsaXR0ZXJQYXJlbnRDb250YWluZXJJZClbMF0ub2Zmc2V0V2lkdGggLSAkKCcjJyArIHRoaXMubGF5b3V0TWFuYWdlci5jaGFydFNwbGl0dGVyQ29udGFpbmVySWQpWzBdLm9mZnNldFdpZHRoO1xyXG4gICAgICAgICAgICBpZiAoZW1wdHlTcGFjZUVsZW1lbnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBlbXB0eVNwYWNlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgxMjUsMTYwLDE2NSwgMC4yKSc7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YVswXS50eXBlID09IFNlcmllc1R5cGUudGltZVNlcmllcyAmJiBkYXRhLmxlbmd0aCA+IDIgfHwgIXNhbWVHcm91cCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2hhcnRUeXBlQXJlYXMoZW1wdHlTcGFjZUVsZW1lbnQsIFt0cnVlLCBmYWxzZSwgdHJ1ZV0sIHNjcm9sbEJhcldpZHRoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRhdGFbMF0udHlwZSA9PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENoYXJ0VHlwZUFyZWFzKGVtcHR5U3BhY2VFbGVtZW50LCBbdHJ1ZSwgdHJ1ZSwgdHJ1ZV0sIHNjcm9sbEJhcldpZHRoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRhdGFbMF0udHlwZSA9PSBTZXJpZXNUeXBlLnh5U2VyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDaGFydFR5cGVBcmVhcyhlbXB0eVNwYWNlRWxlbWVudCwgW2ZhbHNlLCB0cnVlLCBmYWxzZV0sIHNjcm9sbEJhcldpZHRoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRhdGFbMF0udHlwZSA9PSBTZXJpZXNUeXBlLmZmdFNlcmllcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2hhcnRUeXBlQXJlYXMoZW1wdHlTcGFjZUVsZW1lbnQsIFtmYWxzZSwgZmFsc2UsIHRydWVdLCBzY3JvbGxCYXJXaWR0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRDaGFydFR5cGVBcmVhcyhwYXJlbnQ6IEhUTUxFbGVtZW50LCBlbmFibGVkOiBBcnJheTxib29sZWFuPiwgc2Nyb2xsQmFyV2lkdGgpIHtcclxuICAgICAgICBsZXQgY2hhcnROYW1lcyA9IFsnWVQnLCAnWFknLCAnRkZUJ107XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFydE5hbWVzLmxlbmd0aDsgaSA9IGkgKyAxKSB7XHJcbiAgICAgICAgICAgIGxldCBhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGFyZWEuaWQgPSBwYXJlbnQuaWQgKyAnXycgKyBjaGFydE5hbWVzW2ldO1xyXG4gICAgICAgICAgICBhcmVhLmNsYXNzTGlzdC5hZGQoJ2NoYXJ0VHlwZXMnKTtcclxuICAgICAgICAgICAgaWYgKCFlbmFibGVkW2ldKSB7XHJcbiAgICAgICAgICAgICAgICBhcmVhLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFyZWEuc3R5bGUud2lkdGggPSAoKHBhcmVudC5vZmZzZXRXaWR0aCAtIHNjcm9sbEJhcldpZHRoKSAvIGNoYXJ0TmFtZXMubGVuZ3RoKS50b1N0cmluZygpICsgJ3B4JztcclxuXHJcbiAgICAgICAgICAgIGxldCBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbiAgICAgICAgICAgIGltYWdlLnNyYyA9ICcuL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9jaGFydFR5cGUnICsgY2hhcnROYW1lc1tpXSArICcuc3ZnJztcclxuICAgICAgICAgICAgaW1hZ2UuY2xhc3NMaXN0LmFkZCgnaW1hZ2VDaGFydCcpO1xyXG5cclxuICAgICAgICAgICAgYXJlYS5hcHBlbmRDaGlsZChpbWFnZSk7XHJcbiAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChhcmVhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZURyb3BwYWJsZUxvY2F0aW9ucygpIHtcclxuICAgICAgICBmb3IgKGxldCBjaGFydCBvZiB0aGlzLnRyYWNlQ2hhcnRMaXN0KSB7XHJcbiAgICAgICAgICAgIGNoYXJ0LnJlbW92ZVNlcmllRHJvcExvY2F0aW9ucygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBSZW1vdmUgZW1wdHkgc3BhY2UgZHJvcCBsb2NhdGlvblxyXG4gICAgICAgIGxldCBlbXB0eVNwYWNlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMubGF5b3V0TWFuYWdlci5jaGFydFNwbGl0dGVyLmdldExhc3RQYW5lSWQoKSk7XHJcbiAgICAgICAgaWYgKGVtcHR5U3BhY2VFbGVtZW50ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBsZXQgdHlwZU9mQ2hhcnRzID0gZW1wdHlTcGFjZUVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoO1xyXG4gICAgICAgICAgICBlbXB0eVNwYWNlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmZic7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHlwZU9mQ2hhcnRzOyBpID0gaSArIDEpIHtcclxuICAgICAgICAgICAgICAgIGVtcHR5U3BhY2VFbGVtZW50LmNoaWxkcmVuWzBdLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVYQXhpc1dpZHRoKGNoYXJ0VHlwZTogQ2hhcnRUeXBlKSB7XHJcbiAgICAgICAgbGV0IG1heFlBeGVzID0gMDtcclxuICAgICAgICBsZXQgY2hhcnRBcmVhOiBSZWN0YW5nbGUgfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLnR5cGUgPT0gY2hhcnRUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLmNoYXJ0LnJlZHJhdygpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBudW1iZXJPZllBeGVzSW5DaGFydCA9IHRoaXMudHJhY2VDaGFydExpc3RbaV0uZ2V0TnVtYmVyT2ZZU2NhbGVzKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobnVtYmVyT2ZZQXhlc0luQ2hhcnQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG51bWJlck9mWUF4ZXNJbkNoYXJ0ID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL2lmIG9uZSBjaGFydCBoYXMgbW9yZSBheGlzIHRoYW4gdGhlIG90aGVycyB1c2UgaXRzIHdpZHRoLCBpZiB0aGV5IGhhdmUgdGhlIHNhbWUgYW1vdW50IHVzZSB0aGUgb25lIHdpdGggdGhlIGhpZ2hlciB3aWR0aFxyXG4gICAgICAgICAgICAgICAgaWYgKG51bWJlck9mWUF4ZXNJbkNoYXJ0ID4gbWF4WUF4ZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXhZQXhlcyA9IG51bWJlck9mWUF4ZXNJbkNoYXJ0O1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYXJ0QXJlYSA9IHRoaXMudHJhY2VDaGFydExpc3RbaV0uY2hhcnQuZ2V0Q2hhcnRBcmVhKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChudW1iZXJPZllBeGVzSW5DaGFydCA9PSBtYXhZQXhlcyAmJiB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLmNoYXJ0LmdldENoYXJ0QXJlYSgpLndpZHRoID4gY2hhcnRBcmVhIS53aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYXJ0QXJlYSA9IHRoaXMudHJhY2VDaGFydExpc3RbaV0uY2hhcnQuZ2V0Q2hhcnRBcmVhKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjaGFydEFyZWEgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWxpZ25ZQXhlcyhjaGFydEFyZWEsIGNoYXJ0VHlwZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWxpZ25ZQXhlcyhjaGFydEFyZWE6IFJlY3RhbmdsZSwgY2hhcnRUeXBlOiBDaGFydFR5cGUpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHJhY2VDaGFydExpc3RbaV0udHlwZSA9PSBjaGFydFR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdDaGFydEFyZWEgPSB7IHg6IGNoYXJ0QXJlYS54LCB5OiBjaGFydEFyZWEueSwgd2lkdGg6IGNoYXJ0QXJlYS53aWR0aCwgaGVpZ2h0OiB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLmNoYXJ0LmdldENoYXJ0QXJlYSgpLmhlaWdodCAtIDF9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5jaGFydC5zZXRDaGFydEFyZWEobmV3Q2hhcnRBcmVhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3RbaV0ucmVkcmF3Q2hhcnQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=