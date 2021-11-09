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
define(["require", "exports", "../common/treeGridWidgetBase", "./view/chartManagerTreeGridCellStyle", "./view/chartManagerTreeGridDragDrop", "./view/chartManagerTreeGridToolbar", "../../models/chartManagerDataModel/chartManagerChart", "../common/interfaces/dropInterface", "../../models/common/series/baseSeries", "../../models/chartManagerDataModel/scale", "../../models/chartManagerDataModel/chartManagerDataModel", "../chartViewWidget/chartViewWidget", "../chartViewWidget/helpers/chartDropHelper", "../common/SerieChartTypeHelper", "../../models/common/series/seriesType", "./componentDefaultDefinition"], function (require, exports, treeGridWidgetBase_1, chartManagerTreeGridCellStyle_1, chartManagerTreeGridDragDrop_1, chartManagerTreeGridToolbar_1, chartManagerChart_1, dropInterface_1, baseSeries_1, scale_1, chartManagerDataModel_1, chartViewWidget_1, chartDropHelper_1, SerieChartTypeHelper_1, seriesType_1, componentDefaultDefinition_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartManagerWidget = /** @class */ (function (_super) {
        __extends(ChartManagerWidget, _super);
        function ChartManagerWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.eventDropHelper = new chartViewWidget_1.EventDropHelper();
            _this.highlightAreaId = "chartManager_Highlighted";
            _this.firstResize = true;
            return _this;
            //*******************************************************End region drop support*******************************************************
        }
        /**
         * Defines the height of the header
         *
         * @returns {number}
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.defineHeaderHeight = function () {
            return 30;
        };
        ChartManagerWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
        };
        ChartManagerWidget.prototype.dispose = function () {
            this.removeSupportedDragDropDataId(dropInterface_1.DragDropDataId.signal);
            _super.prototype.dispose.call(this);
        };
        /**
         * Loads the styles for the chart manager widget
         *
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.loadStyles = function () {
            _super.prototype.loadStyles.call(this);
            _super.prototype.addStyle.call(this, "widgets/common/style/css/dropDownMenuStyle.css");
        };
        /**
         * Creates the layout of the widget
         *
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.createLayout = function () {
            this.mainDiv.style.overflow = "hidden";
            _super.prototype.createLayout.call(this);
        };
        ChartManagerWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this.setChartManagerDataModel();
            _super.prototype.setHeaderContent.call(this, "Charts");
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 0, 80);
            // Initialize scrollbars positions      
            var scrollbarSettings = this.component.getSetting(treeGridWidgetBase_1.TreeGridWidgetBase.ScrollbarsSettingsId);
            this.setScrollBarSettings(scrollbarSettings);
            // Hide the column header of the tree grid
            //super.setColumnHeaderHidden();
            this.addSupportedDragDropDataId(dropInterface_1.DragDropDataId.signal);
        };
        ChartManagerWidget.prototype.setChartManagerDataModel = function () {
            var dataModel = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.ChartManagerDataModelId);
            this.dataModel = dataModel;
            // Refresh treeGrid(and toolbar) to use the new datamodel
            this.refresh();
        };
        ChartManagerWidget.prototype.getComponentSettings = function (onlyModified) {
            return _super.prototype.getComponentSettings.call(this, onlyModified);
        };
        ChartManagerWidget.prototype.setComponentSettings = function (data) {
            if (data != undefined) {
                _super.prototype.setComponentSettings.call(this, data);
            }
        };
        /**
         * Handles the model changes
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} eventArgs
         * @returns {*}
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.handleModelChanged = function (sender, eventArgs) {
            if (eventArgs.hint != chartManagerDataModel_1.ChartManagerDataModelChangedHint.updateScaleRange && eventArgs.hint != chartManagerDataModel_1.ChartManagerDataModelChangedHint.default) {
                this.refresh();
                var treegridObj = this.getTreeGridObject();
                if (treegridObj.model.selectedRowIndex == -1) { // TODO: selectedItem != undefined but selectedRowIndex == -1 !!!
                    this.updateToolbarButtonStates(eventArgs.data.data, undefined);
                }
                else {
                    this.updateToolbarButtonStates(eventArgs.data.data, treegridObj.model.selectedItem.item);
                }
                this.saveTreeGridSettings();
            }
        };
        /**
         * Creates the column templates for the tree grid and adds them to the widget container
         *
         * @protected
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.createColumnTemplates = function () {
            var $widgetContainer = $(this.mainDiv);
            $widgetContainer.append(this.getScriptForDragDropTemplateHelpers());
            $widgetContainer.append(this.getColumnTemplateData(ChartManagerWidget.nameColumnId));
        };
        /**
         * creates the tree grid for the chartmanager
         *
         * @protected
         * @returns
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.createTreeGrid = function () {
            var _this = this;
            if (this._dataModel == undefined) {
                console.info("dataModel undefined!");
                return;
            }
            var cellStyle = new chartManagerTreeGridCellStyle_1.ChartManagerTreeGridCellStyle();
            $(this.mainDiv).ejTreeGrid(__assign(__assign(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), this.getTreeGridToolbarSupport()), this.getTreeGridDragDropSupport()), { dataSource: this._dataModel.data, childMapping: "childs", idMapping: ChartManagerWidget.nameColumnId, expandStateMapping: "expandState", isResponsive: true, rowHeight: 28, 
                // Set init size to draw the toolbar icons at the right position
                sizeSettings: { height: '100px', width: '100px', }, expanded: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, collapsed: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, rowSelected: function (args) { return _this.updateToolbarButtonStates(args.model.dataSource, args.data.item); }, create: function (args) { return _this.treeGridCreated(); }, actionBegin: function (args) { return _this.treeGridActionBegin(args); }, actionComplete: function (args) { return _this.treeGridActionComplete(args); }, queryCellInfo: function (args) { return cellStyle.setCellStyle(args); } }));
        };
        ChartManagerWidget.prototype.treeGridNodeExpandedOrCollapsed = function () {
            // Refresh to see correct expanded/collapsed icon
            this.refresh();
            //Persist data model (expandState)
            if (this._dataModel !== undefined) {
                this._dataModel.saveSettings();
            }
            //Persit scrollbar position of treeGrid
            this.saveTreeGridSettings();
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: ChartManagerWidget.nameColumnId, headerText: "Name", isTemplateColumn: true, templateID: "cmNameColumnTemplate" },
                    { field: ChartManagerWidget.additionalInfoColumnId, headerText: "", width: "140px" },
                    { field: ChartManagerWidget.iconDefinitionColumnId, visible: false, width: "0px" },
                ],
            };
        };
        /**
         * Returns the tree grid column resize settings
         *
         * @private
         * @returns {{}}
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.getTreeGridColumnResizeSupport = function () {
            var _this = this;
            return {
                allowColumnResize: true,
                columnResizeSettings: { columnResizeMode: ej.TreeGrid.ColumnResizeMode.FixedColumns },
                columnResized: function (args) { return _this.treeGridColumnResized(args); },
            };
        };
        /**
         * A treegrid column was resized
         *
         * @private
         * @param {*} args
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.treeGridColumnResized = function (args) {
            _super.prototype.resizeDynamicColumn.call(this, args.columnIndex, args.model);
            this.saveTreeGridSettings();
        };
        /**
         * Returns the tree grid toolbar settings
         *
         * @private
         * @returns {{}}
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.getTreeGridToolbarSupport = function () {
            var _this = this;
            this._toolbar = new chartManagerTreeGridToolbar_1.ChartManagerTreeGridToolbar(this.mainDiv, this._dataModel);
            return {
                toolbarSettings: {
                    showToolbar: true,
                    customToolbarItems: this._toolbar.getCustomToolbars(),
                },
                toolbarClick: function (args) { return _this.toolbarClick(args); }
            };
        };
        ChartManagerWidget.prototype.getTreeGridDragDropSupport = function () {
            var _this = this;
            var dragDrop = new chartManagerTreeGridDragDrop_1.ChartManagerTreeGridDragDrop();
            return {
                allowDragAndDrop: true,
                rowDragStart: function (args) { return dragDrop.rowDragStart(args); },
                rowDrag: function (args) { return dragDrop.rowDrag(args); },
                rowDropActionBegin: function (args) { return dragDrop.rowDropActionBegin(args, _this._dataModel); },
                rowDragStop: function (args) { return dragDrop.rowDragStop(args, _this._dataModel); },
            };
        };
        ChartManagerWidget.prototype.treeGridCreated = function () {
            // Sets the custom toolbar icons
            this._toolbar.setStyleForToolbarIcons();
            // At the beginning the delete button is disabled because no selection is available
            this._toolbar.disableDeleteButton(true);
        };
        ChartManagerWidget.prototype.treeGridActionBegin = function (args) {
            // Support "Entf/Del" key
            if (args.requestType == "delete") {
                args.cancel = true;
                if (args.deletedItems[0].item instanceof chartManagerChart_1.ChartManagerChart) {
                    // Remove chart from datamodel
                    this._dataModel.removeChart(args.deletedItems[0].item);
                }
                else if (args.deletedItems[0].item instanceof baseSeries_1.BaseSeries) {
                    var chart = args.deletedItems[0].parentItem.parentItem.item;
                    if (chart != undefined) {
                        // Remove serie from datamodel
                        this._dataModel.removeSerie(chart, args.deletedItems[0].item);
                    }
                }
                else if (args.deletedItems[0].item instanceof scale_1.Scale) {
                    var chart = args.deletedItems[0].parentItem.item;
                    if (chart != undefined && chart.canRemoveYAxis() == true) {
                        // Remove yAxis from datamodel
                        this._dataModel.removeYAxis(chart, args.deletedItems[0].item);
                    }
                }
            }
        };
        ChartManagerWidget.prototype.treeGridActionComplete = function (args) {
            // Event trigger while changing datasource dynamically. 
            // code to done after the dynamic change of datasource. 
            if (args.requestType === 'refreshDataSource') {
                this.refreshSelection();
            }
        };
        ChartManagerWidget.prototype.resize = function (width, height) {
            _super.prototype.resize.call(this, width, height);
        };
        ChartManagerWidget.prototype.refresh = function () {
            try {
                if (this.refreshEnabled) {
                    // update datamodel in treegrid
                    this.setModel(this.dataModel.data);
                    // update datamodel in toolbar
                    this._toolbar.updateDataModel(this.dataModel);
                }
            }
            catch (e) {
                console.info("ChartManager refresh error! => TreeGrid recreation!");
                console.info(e);
                this.createTreeGrid();
            }
        };
        ChartManagerWidget.prototype.refreshSelection = function () {
            var treeObj = $(this.mainDiv).ejTreeGrid('instance');
            // Get actual selection index
            var actualSelectedRowIndex = treeObj.model.selectedRowIndex;
            // Reset selection
            treeObj.model.selectedRowIndex = -1;
            // Set to last index if index is out of range
            if (actualSelectedRowIndex >= treeObj.model.flatRecords.length) {
                actualSelectedRowIndex = treeObj.model.flatRecords.length - 1;
            }
            // Set selection
            treeObj.model.selectedRowIndex = actualSelectedRowIndex;
            // update toolbar buttons
            if (treeObj.model.flatRecords[actualSelectedRowIndex] != undefined) {
                this.updateToolbarButtonStates(treeObj.model.dataSource, treeObj.model.flatRecords[actualSelectedRowIndex].item);
            }
        };
        ChartManagerWidget.prototype.updateToolbarButtonStates = function (charts, selectedItem) {
            if (charts.length == 0 || selectedItem == undefined || (selectedItem instanceof scale_1.Scale && selectedItem.parent.canRemoveYAxis() == false)) {
                this._toolbar.disableDeleteButton(true);
            }
            else {
                this._toolbar.disableDeleteButton(false);
            }
            if (this._dataModel.canAddChart() || (selectedItem instanceof chartManagerChart_1.ChartManagerChart && selectedItem.canAddYAxis())) {
                this._toolbar.disableAddButton(false);
            }
            else {
                this._toolbar.disableAddButton(true);
            }
            this._toolbar.setSelectedChart(selectedItem);
        };
        //*******************************************************Region drop support*******************************************************
        /**
         * Adds all possible dropLocations
         *
         * @private
         * @param {Array<BaseSeries>} series
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.addDropLocations = function (series) {
            // Add possible drop locations
        };
        /**
         * Removes all drop locations
         *
         * @private
         * @param {Array<BaseSeries>} series
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.removeDropLocations = function (series) {
            this._dataModel.data.forEach(function (chart) {
                chart.dropPossible = false;
                chart.childs.forEach(function (yAxis) {
                    yAxis.dropPossible = false;
                });
            });
        };
        ChartManagerWidget.prototype.dragStart = function (args) {
            var serie = args.data;
            // Add possible dropLocations
            this.addDropLocations(serie);
            // Update treeGrid
            this.refresh();
        };
        ChartManagerWidget.prototype.dragStop = function (args) {
            var serie = args.data;
            // Remove possible dropLocations
            this.removeDropLocations(serie);
            // Update treeGrid
            this.refresh();
        };
        ChartManagerWidget.prototype.dragOver = function (args) {
            var series = args.data;
            var dropPossible = false;
            var chart = this.getChartFromDragLocation(args.currentTarget);
            var yAxis = this.getYAxisFromDragLocation(args.currentTarget);
            var imageProvider = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.ImageProviderId);
            if (chart != undefined) {
                if (chart.dropPossible == true) {
                    dropPossible = true;
                    if (args.dragDropRepresentation != undefined) {
                        var addNewScaleImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/addNewScale.svg");
                        args.dragDropRepresentation.iconList.push(addNewScaleImage);
                        if (series[0].type === seriesType_1.SeriesType.timeSeries && chart.chartType == chartManagerChart_1.ChartType.FFTChart) {
                            args.dragDropRepresentation.textList[0] = "Calculate FFT signal and add it to new scale";
                        }
                        else {
                            args.dragDropRepresentation.textList[0] = "Create a new scale and add dragged signals";
                        }
                    }
                }
            }
            else if (yAxis != undefined) {
                if (yAxis.dropPossible == true) {
                    dropPossible = true;
                    if (args.dragDropRepresentation != undefined) {
                        var addNewScaleImage = void 0;
                        //XY chart exception
                        if (yAxis.parent.chartType == chartManagerChart_1.ChartType.XYChart) {
                            addNewScaleImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/assignToChart.svg");
                            if (series[0].type == seriesType_1.SeriesType.timeSeries) {
                                args.dragDropRepresentation.textList[0] = "Calculate XY signal and add it to the chart";
                            }
                            else {
                                args.dragDropRepresentation.textList[0] = "Add dragged signals to chart";
                            }
                        }
                        else if (yAxis.parent.chartType == chartManagerChart_1.ChartType.FFTChart) {
                            addNewScaleImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/assignToScale.svg");
                            args.dragDropRepresentation.textList[0] = "Calculate FFT signal and add it to scale";
                        }
                        else {
                            addNewScaleImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/assignToScale.svg");
                            args.dragDropRepresentation.textList[0] = "Add dragged signals to scale";
                        }
                        args.dragDropRepresentation.iconList.push(addNewScaleImage);
                    }
                }
            }
            this.highlightDroppableAreas(chart, yAxis, args.currentTarget);
            return dropPossible;
        };
        ChartManagerWidget.prototype.drop = function (args) {
            var series = args.data;
            var chart = this.getChartFromDragLocation(args.currentTarget);
            var yAxis = this.getYAxisFromDragLocation(args.currentTarget);
            if (yAxis != undefined) {
                chart = yAxis.parent;
            }
            series = SerieChartTypeHelper_1.SerieChartTypeHelper.getDroppableSeries(chart.getAllSeries(), series);
            var data = {
                chart: chart,
                yAxis: yAxis,
                series: series
            };
            //raise event to traceViewWidget
            if (series[0].type == seriesType_1.SeriesType.timeSeries && chart.chartType == chartManagerChart_1.ChartType.XYChart) {
                this.eventDropHelper.raise(this.dataModel, { hint: chartDropHelper_1.ChartDropHelperChangedHint.createXYSerie, data: data });
            }
            else if (series[0].type == seriesType_1.SeriesType.timeSeries && chart.chartType == chartManagerChart_1.ChartType.FFTChart) {
                this.eventDropHelper.raise(this.dataModel, { hint: chartDropHelper_1.ChartDropHelperChangedHint.createFFTSerie, data: data });
            }
            else {
                this.eventDropHelper.raise(this.dataModel, { hint: chartDropHelper_1.ChartDropHelperChangedHint.addSerie, data: data });
            }
            this.resetHighlightArea();
        };
        ChartManagerWidget.prototype.getChartFromDragLocation = function (currentTarget) {
            var classes = currentTarget.classList.value;
            //avoid dropping serie in not highlighted area
            if (!classes.includes('e-templatecell') && classes.includes('e-rowcell') || classes.includes('e-headercell') || currentTarget.localName == 'span') {
                return undefined;
            }
            var record = this.getTreeRecord(currentTarget);
            if (record != undefined) {
                if (record.item instanceof chartManagerChart_1.ChartManagerChart) {
                    return record.item;
                }
            }
            return undefined;
        };
        ChartManagerWidget.prototype.getYAxisFromDragLocation = function (currentTarget) {
            var classes = currentTarget.classList.value;
            //avoid dropping serie in not highlighted area
            if (!classes.includes('e-templatecell') && classes.includes('e-rowcell')) {
                return undefined;
            }
            var record = this.getTreeRecord(currentTarget);
            if (record != undefined) {
                if (record.item instanceof scale_1.Scale) {
                    return record.item;
                }
            }
            return undefined;
        };
        /**
         * Returns the column template informations
         *
         * @private
         * @returns {string}
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.getColumnTemplateData = function (columnId) {
            if (columnId == ChartManagerWidget.nameColumnId) {
                return "<script type=\"text/x-jsrender\" id=\"cmNameColumnTemplate\">\n\t\t\t            <div style='height:20px;' unselectable='on'>\n                            {{if !~getstate()}}\n                                <div class='e-dragintend' style='height:1px; float:left; width:14px; display:inline-block;'>\n                                    <div class={{:~_stageName()}} style='width:24px;'>\n                                        <span class='e-aboveIcon e-iconMargin e-icon' style='position:relative;float:right;display:none;'></span>\n                                        <span class='e-belowIcon e-iconMargin e-icon' style='position:relative;float:right;display:none;'></span>\n                                        <span class='e-childIcon e-iconMargin e-icon' style='position:relative;float:right;display:none;'></span>\n                                        <span class='e-cancelIcon e-iconMargin e-icon' style='position:relative;float:right;display:none;'></span>\n                                    </div>\n                                </div>\n                            {{else ~getstate()}}\n                                <div class='e-intendparent'>\n                                    <div class={{:~_stageName()}}>\n                                        <span class='e-aboveIcon e-iconMargin e-icon' style='position:relative;float:left;display:none;'></span>\n                                        <span class='e-belowIcon e-iconMargin e-icon' style='position:relative;float:left;display:none;'></span>\n                                        <span class='e-childIcon e-iconMargin e-icon' style='position:relative;float:left;display:none;'></span>\n                                        <span class='e-cancelIcon e-iconMargin e-icon' style='position:relative;float:left;display:none;'></span>\n                                    </div>\n                                </div>\n                            {{/if}}\n   \n                            {{:#data['iconDefinition']}}\n                            <div class='e-cell' style='display:inline-block;width:100%' unselectable='on'>{{:#data['name']}}</div>\n\t\t\t            </div>\n                    </script>";
            }
            return "";
        };
        ChartManagerWidget.prototype.getScriptForDragDropTemplateHelpers = function () {
            return "<script type=\"text/javascript\">\n                    $.views.helpers({ _stageName: getStageName });\n                    $.views.helpers({ getstate: _getState });\n                    $.views.helpers({ isGroup: _isGroup });\n                    \n                    function _getState() {\n                        if (this.data.parentItem)\n                            return false;\n                        else\n                            return true;\n                    }\n\n                    function _isGroup() {\n                        if (this.data.isGroup)\n                            return true;\n                        else\n                            return false;\n                    }\n\n                    function getStageName() {\n                        var rowClass = \"gridrowIndex\",\n                            proxy = this;\n                        rowClass += proxy.data.index.toString() + \"level\" + proxy.data.level.toString();\n                        return rowClass;\n\n                    }\n                </script>";
        };
        /**
         *
         *
         * @param {DragDropArgs} args
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.dropFocusLost = function (args) {
            this.resetHighlightArea();
        };
        ;
        /**
         * Highlight rows where signal is dragged over and possible to be dropped
         *
         * @private
         * @param {(IChartManagerChart | undefined)} chartManagerChart
         * @param {(Scale | undefined)} yAxis
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.highlightDroppableAreas = function (chartManagerChart, yAxis, currentTarget) {
            if (chartManagerChart != undefined && chartManagerChart.dropPossible) {
                var area = this.getAreaToFromCurrentTarget(currentTarget);
                this.addHighlightedArea(area);
            }
            else if (yAxis != undefined && yAxis.dropPossible) {
                var area = this.getAreaToFromCurrentTarget(currentTarget);
                this.addHighlightedArea(area);
            }
            else {
                this.resetHighlightArea();
            }
        };
        ChartManagerWidget.prototype.addHighlightedArea = function (area) {
            var highlightElem = $('<div id="' + this.highlightAreaId + '" style=" pointer-events:none; position:absolute; " class="draggedOver"></div>');
            this.resetHighlightArea(highlightElem);
            $(area).append(highlightElem);
            highlightElem.css('top', area.offsetTop);
            highlightElem.css('left', area.offsetLeft);
            highlightElem.css('height', area.offsetHeight);
            highlightElem.css('width', area.offsetWidth);
        };
        ChartManagerWidget.prototype.getAreaToFromCurrentTarget = function (currentTarget) {
            var classes = currentTarget.classList.value;
            if (classes.includes('e-rowcell')) {
                return currentTarget;
            }
            else {
                return this.getAreaToFromCurrentTarget(currentTarget.parentElement);
            }
        };
        /**
         * Reset all highlighted ares in chartManager except the cell being draggedOver
         *
         * @private
         * @param {JQuery<HTMLElement>} [element]
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.resetHighlightArea = function (element) {
            var highlightElem = $('#' + this.highlightAreaId);
            for (var i = 0; i < highlightElem.length; i++) {
                if (element == undefined || highlightElem[i] != element[0]) {
                    highlightElem[i].remove();
                }
            }
        };
        ChartManagerWidget.nameColumnId = "name";
        ChartManagerWidget.additionalInfoColumnId = "additionalInfo";
        ChartManagerWidget.iconDefinitionColumnId = "iconDefinition";
        return ChartManagerWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.ChartManagerWidget = ChartManagerWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRNYW5hZ2VyV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0TWFuYWdlcldpZGdldC9jaGFydE1hbmFnZXJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBc0JBO1FBQWlDLHNDQUFrQjtRQUFuRDtZQUFBLHFFQTBvQkM7WUF4b0JHLHFCQUFlLEdBQW9CLElBQUksaUNBQWUsRUFBRSxDQUFDO1lBS3hDLHFCQUFlLEdBQUcsMEJBQTBCLENBQUM7WUFDdEQsaUJBQVcsR0FBRyxJQUFJLENBQUM7O1lBaW9CM0IsdUlBQXVJO1FBQzNJLENBQUM7UUEvbkJHOzs7OztXQUtHO1FBQ0gsK0NBQWtCLEdBQWxCO1lBQ0ksT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDO1FBRUQsZ0RBQW1CLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLHVEQUEwQixFQUFFLENBQUMsQ0FBQztRQUMxRSxDQUFDO1FBRUQsb0NBQU8sR0FBUDtZQUNJLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyw4QkFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFELGlCQUFNLE9BQU8sV0FBRSxDQUFDO1FBQ3BCLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsdUNBQVUsR0FBVjtZQUNJLGlCQUFNLFVBQVUsV0FBRSxDQUFDO1lBQ25CLGlCQUFNLFFBQVEsWUFBQyxnREFBZ0QsQ0FBQyxDQUFDO1FBQ3JFLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gseUNBQVksR0FBWjtZQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFFdkMsaUJBQU0sWUFBWSxXQUFFLENBQUM7UUFDekIsQ0FBQztRQUVELHdDQUFXLEdBQVg7WUFDSSxpQkFBTSxXQUFXLFdBQUUsQ0FBQztZQUVwQixJQUFJ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QUFDO2FBQ3hCO2lCQUNJO2dCQUNELE9BQU8sSUFBSSxDQUFDLDBCQUEwQixDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUN2RTtRQUNMLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSywrQ0FBa0IsR0FBMUIsVUFBNEIsT0FBNkI7WUFDM0QsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDbEQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQzdDLElBQUksT0FBTyxJQUFJLFNBQVMsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUMzRCxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7aUJBQzFCO2FBQ0Q7UUFDQyxDQUFDO1FBcG9CdUIsK0JBQVksR0FBRyxNQUFNLENBQUM7UUFDdEIseUNBQXNCLEdBQUcsZ0JBQWdCLENBQUM7UUFDMUMseUNBQXNCLEdBQUcsZ0JBQWdCLENBQUM7UUFvb0J0RSx5QkFBQztLQUFBLEFBMW9CRCxDQUFpQyx1Q0FBa0IsR0Ewb0JsRDtJQUVRLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9saWJzL3VpL1R5cGVzL2VqLndlYi5hbGwuZC50c1wiIC8+XHJcbmltcG9ydCB7IEV2ZW50TW9kZWxDaGFuZ2VkQXJncywgSURhdGFNb2RlbCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRyZWVHcmlkV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vdHJlZUdyaWRXaWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IENoYXJ0TWFuYWdlclRyZWVHcmlkQ2VsbFN0eWxlIH0gZnJvbSBcIi4vdmlldy9jaGFydE1hbmFnZXJUcmVlR3JpZENlbGxTdHlsZVwiO1xyXG5pbXBvcnQgeyBDaGFydE1hbmFnZXJUcmVlR3JpZERyYWdEcm9wIH0gZnJvbSBcIi4vdmlldy9jaGFydE1hbmFnZXJUcmVlR3JpZERyYWdEcm9wXCI7XHJcbmltcG9ydCB7IENoYXJ0TWFuYWdlclRyZWVHcmlkVG9vbGJhciB9IGZyb20gXCIuL3ZpZXcvY2hhcnRNYW5hZ2VyVHJlZUdyaWRUb29sYmFyXCI7XHJcbmltcG9ydCB7IENoYXJ0TWFuYWdlckNoYXJ0LCBDaGFydFR5cGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9jaGFydE1hbmFnZXJDaGFydFwiO1xyXG5pbXBvcnQgeyBJQ2hhcnRNYW5hZ2VyQ2hhcnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9pbnRlcmZhY2VzL2NoYXJ0TWFuYWdlckNoYXJ0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElEcm9wcGFibGUsIERyYWdEcm9wRGF0YUlkIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL2Ryb3BJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3Nlcmllcy9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IFNjYWxlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2NhbGVcIjtcclxuaW1wb3J0IHsgSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2ludGVyZmFjZXMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsXCI7XHJcbmltcG9ydCB7IERyYWdEcm9wQXJncyB9IGZyb20gXCIuLi9jb21tb24vZHJhZ0Ryb3BBcmdzXCI7XHJcbmltcG9ydCB7IEV2ZW50RHJvcEhlbHBlciB9IGZyb20gXCIuLi9jaGFydFZpZXdXaWRnZXQvY2hhcnRWaWV3V2lkZ2V0XCI7XHJcbmltcG9ydCB7IENoYXJ0RHJvcEhlbHBlckNoYW5nZWRIaW50IH0gZnJvbSBcIi4uL2NoYXJ0Vmlld1dpZGdldC9oZWxwZXJzL2NoYXJ0RHJvcEhlbHBlclwiO1xyXG5pbXBvcnQgeyBTZXJpZUNoYXJ0VHlwZUhlbHBlciB9IGZyb20gXCIuLi9jb21tb24vU2VyaWVDaGFydFR5cGVIZWxwZXJcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3Nlcmllcy9zZXJpZXNUeXBlXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IElJbWFnZVByb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL2ltYWdlUHJvdmlkZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24gfSBmcm9tIFwiLi9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblwiO1xyXG5cclxuY2xhc3MgQ2hhcnRNYW5hZ2VyV2lkZ2V0IGV4dGVuZHMgVHJlZUdyaWRXaWRnZXRCYXNlIGltcGxlbWVudHMgSURyb3BwYWJsZSB7XHJcblxyXG4gICAgZXZlbnREcm9wSGVscGVyOiBFdmVudERyb3BIZWxwZXIgPSBuZXcgRXZlbnREcm9wSGVscGVyKCk7XHJcbiAgICBcclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IG5hbWVDb2x1bW5JZCA9IFwibmFtZVwiO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgYWRkaXRpb25hbEluZm9Db2x1bW5JZCA9IFwiYWRkaXRpb25hbEluZm9cIjtcclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IGljb25EZWZpbml0aW9uQ29sdW1uSWQgPSBcImljb25EZWZpbml0aW9uXCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGhpZ2hsaWdodEFyZWFJZCA9IFwiY2hhcnRNYW5hZ2VyX0hpZ2hsaWdodGVkXCI7XHJcbiAgICBwcml2YXRlIGZpcnN0UmVzaXplID0gdHJ1ZTtcclxuICAgIHByb3RlY3RlZCBfdG9vbGJhciE6IENoYXJ0TWFuYWdlclRyZWVHcmlkVG9vbGJhcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgdGhlIGhlaWdodCBvZiB0aGUgaGVhZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZGVmaW5lSGVhZGVySGVpZ2h0KCk6IG51bWJlcntcclxuICAgICAgICByZXR1cm4gMzA7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldERlZmF1bHREZWZpbml0aW9uKG5ldyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbigpKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwb3NlKCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlU3VwcG9ydGVkRHJhZ0Ryb3BEYXRhSWQoRHJhZ0Ryb3BEYXRhSWQuc2lnbmFsKTtcclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgc3R5bGVzIGZvciB0aGUgY2hhcnQgbWFuYWdlciB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGxvYWRTdHlsZXMoKSB7XHJcbiAgICAgICAgc3VwZXIubG9hZFN0eWxlcygpO1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9jb21tb24vc3R5bGUvY3NzL2Ryb3BEb3duTWVudVN0eWxlLmNzc1wiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGxheW91dCBvZiB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICAgICAgdGhpcy5tYWluRGl2LnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcclxuXHJcbiAgICAgICAgc3VwZXIuY3JlYXRlTGF5b3V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZWQoKXtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplZCgpO1xyXG5cclxuICAgICAgICB0aGlzLnNldENoYXJ0TWFuYWdlckRhdGFNb2RlbCgpO1xyXG5cclxuICAgICAgICBzdXBlci5zZXRIZWFkZXJDb250ZW50KFwiQ2hhcnRzXCIpO1xyXG5cclxuICAgICAgICAvLyBTZXQgZHluYW1pYyBjb2x1bW4gc2V0dGluZ3NcclxuICAgICAgICBzdXBlci5zZXREeW5hbWljQ29sdW1uKDAsIDgwKTtcclxuXHJcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBzY3JvbGxiYXJzIHBvc2l0aW9ucyAgICAgIFxyXG4gICAgICAgIGxldCBzY3JvbGxiYXJTZXR0aW5ncyA9IHRoaXMuY29tcG9uZW50LmdldFNldHRpbmcoVHJlZUdyaWRXaWRnZXRCYXNlLlNjcm9sbGJhcnNTZXR0aW5nc0lkKTtcclxuICAgICAgICB0aGlzLnNldFNjcm9sbEJhclNldHRpbmdzKHNjcm9sbGJhclNldHRpbmdzKTtcclxuXHJcbiAgICAgICAgLy8gSGlkZSB0aGUgY29sdW1uIGhlYWRlciBvZiB0aGUgdHJlZSBncmlkXHJcbiAgICAgICAgLy9zdXBlci5zZXRDb2x1bW5IZWFkZXJIaWRkZW4oKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRTdXBwb3J0ZWREcmFnRHJvcERhdGFJZChEcmFnRHJvcERhdGFJZC5zaWduYWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldENoYXJ0TWFuYWdlckRhdGFNb2RlbCgpIHtcclxuICAgICAgICBsZXQgZGF0YU1vZGVsID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLkNoYXJ0TWFuYWdlckRhdGFNb2RlbElkKTtcclxuICAgICAgICB0aGlzLmRhdGFNb2RlbCA9IGRhdGFNb2RlbCBhcyBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFJlZnJlc2ggdHJlZUdyaWQoYW5kIHRvb2xiYXIpIHRvIHVzZSB0aGUgbmV3IGRhdGFtb2RlbFxyXG4gICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgIH1cclxuXHJcblx0cHVibGljIGdldENvbXBvbmVudFNldHRpbmdzKG9ubHlNb2RpZmllZDogYm9vbGVhbik6IENvbXBvbmVudFNldHRpbmdze1xyXG5cdFx0cmV0dXJuIHN1cGVyLmdldENvbXBvbmVudFNldHRpbmdzKG9ubHlNb2RpZmllZCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0Q29tcG9uZW50U2V0dGluZ3MoZGF0YTogQ29tcG9uZW50U2V0dGluZ3MpIHtcclxuICAgICAgICBpZihkYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHN1cGVyLnNldENvbXBvbmVudFNldHRpbmdzKGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHR9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIHRoZSBtb2RlbCBjaGFuZ2VzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJRGF0YU1vZGVsfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7RXZlbnRNb2RlbENoYW5nZWRBcmdzfSBldmVudEFyZ3NcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBoYW5kbGVNb2RlbENoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBldmVudEFyZ3M6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyk6IGFueSB7XHJcbiAgICAgICAgaWYgKGV2ZW50QXJncy5oaW50ICE9IENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LnVwZGF0ZVNjYWxlUmFuZ2UgJiYgZXZlbnRBcmdzLmhpbnQgIT0gQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQuZGVmYXVsdCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgdmFyIHRyZWVncmlkT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG4gICAgICAgICAgICBpZiAoKDxhbnk+dHJlZWdyaWRPYmoubW9kZWwpLnNlbGVjdGVkUm93SW5kZXggPT0gLTEpIHsgLy8gVE9ETzogc2VsZWN0ZWRJdGVtICE9IHVuZGVmaW5lZCBidXQgc2VsZWN0ZWRSb3dJbmRleCA9PSAtMSAhISFcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyhldmVudEFyZ3MuZGF0YS5kYXRhLCB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUb29sYmFyQnV0dG9uU3RhdGVzKGV2ZW50QXJncy5kYXRhLmRhdGEsICg8YW55PnRyZWVncmlkT2JqLm1vZGVsKS5zZWxlY3RlZEl0ZW0uaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zYXZlVHJlZUdyaWRTZXR0aW5ncygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGNvbHVtbiB0ZW1wbGF0ZXMgZm9yIHRoZSB0cmVlIGdyaWQgYW5kIGFkZHMgdGhlbSB0byB0aGUgd2lkZ2V0IGNvbnRhaW5lclxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZUNvbHVtblRlbXBsYXRlcygpIHtcclxuICAgICAgICB2YXIgJHdpZGdldENvbnRhaW5lciA9ICQodGhpcy5tYWluRGl2KTtcclxuICAgICAgICAkd2lkZ2V0Q29udGFpbmVyLmFwcGVuZCh0aGlzLmdldFNjcmlwdEZvckRyYWdEcm9wVGVtcGxhdGVIZWxwZXJzKCkpO1xyXG4gICAgICAgICR3aWRnZXRDb250YWluZXIuYXBwZW5kKHRoaXMuZ2V0Q29sdW1uVGVtcGxhdGVEYXRhKENoYXJ0TWFuYWdlcldpZGdldC5uYW1lQ29sdW1uSWQpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZXMgdGhlIHRyZWUgZ3JpZCBmb3IgdGhlIGNoYXJ0bWFuYWdlclxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVUcmVlR3JpZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fZGF0YU1vZGVsID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmluZm8oXCJkYXRhTW9kZWwgdW5kZWZpbmVkIVwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjZWxsU3R5bGUgPSBuZXcgQ2hhcnRNYW5hZ2VyVHJlZUdyaWRDZWxsU3R5bGUoKTtcclxuICAgICAgICAkKHRoaXMubWFpbkRpdikuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkRHJhZ0Ryb3BTdXBwb3J0KCksXHJcblxyXG4gICAgICAgICAgICBkYXRhU291cmNlOiB0aGlzLl9kYXRhTW9kZWwuZGF0YSxcclxuICAgICAgICAgICAgY2hpbGRNYXBwaW5nOiBcImNoaWxkc1wiLFxyXG4gICAgICAgICAgICBpZE1hcHBpbmc6IENoYXJ0TWFuYWdlcldpZGdldC5uYW1lQ29sdW1uSWQsXHJcbiAgICAgICAgICAgIGV4cGFuZFN0YXRlTWFwcGluZzogXCJleHBhbmRTdGF0ZVwiLFxyXG4gICAgICAgICAgICBpc1Jlc3BvbnNpdmU6IHRydWUsXHJcbiAgICAgICAgICAgIHJvd0hlaWdodDogMjgsXHJcbiAgICAgICAgICAgIC8vIFNldCBpbml0IHNpemUgdG8gZHJhdyB0aGUgdG9vbGJhciBpY29ucyBhdCB0aGUgcmlnaHQgcG9zaXRpb25cclxuICAgICAgICAgICAgc2l6ZVNldHRpbmdzOiB7IGhlaWdodDogJzEwMHB4Jywgd2lkdGg6ICcxMDBweCcsIH0sXHJcblxyXG4gICAgICAgICAgICBleHBhbmRlZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWROb2RlRXhwYW5kZWRPckNvbGxhcHNlZCgpLFxyXG4gICAgICAgICAgICBjb2xsYXBzZWQ6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkTm9kZUV4cGFuZGVkT3JDb2xsYXBzZWQoKSxcclxuXHJcbiAgICAgICAgICAgIHJvd1NlbGVjdGVkOiAoYXJncykgPT4gdGhpcy51cGRhdGVUb29sYmFyQnV0dG9uU3RhdGVzKGFyZ3MubW9kZWwuZGF0YVNvdXJjZSwgYXJncy5kYXRhLml0ZW0pLFxyXG4gICAgICAgICAgICBjcmVhdGU6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkQ3JlYXRlZCgpLFxyXG4gICAgICAgICAgICBhY3Rpb25CZWdpbjogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRBY3Rpb25CZWdpbihhcmdzKSxcclxuICAgICAgICAgICAgYWN0aW9uQ29tcGxldGU6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkQWN0aW9uQ29tcGxldGUoYXJncyksXHJcbiAgICAgICAgICAgIHF1ZXJ5Q2VsbEluZm86IChhcmdzKSA9PiBjZWxsU3R5bGUuc2V0Q2VsbFN0eWxlKGFyZ3MpLFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZE5vZGVFeHBhbmRlZE9yQ29sbGFwc2VkKCkge1xyXG4gICAgICAgIC8vIFJlZnJlc2ggdG8gc2VlIGNvcnJlY3QgZXhwYW5kZWQvY29sbGFwc2VkIGljb25cclxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICBcclxuICAgICAgICAvL1BlcnNpc3QgZGF0YSBtb2RlbCAoZXhwYW5kU3RhdGUpXHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFNb2RlbCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICg8YW55PnRoaXMuX2RhdGFNb2RlbCkuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vUGVyc2l0IHNjcm9sbGJhciBwb3NpdGlvbiBvZiB0cmVlR3JpZFxyXG4gICAgICAgIHRoaXMuc2F2ZVRyZWVHcmlkU2V0dGluZ3MoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjb2x1bW4gZGVmaW5pdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCk6IHt9IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb2x1bW5zOiBbXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBDaGFydE1hbmFnZXJXaWRnZXQubmFtZUNvbHVtbklkLCBoZWFkZXJUZXh0OiBcIk5hbWVcIiwgaXNUZW1wbGF0ZUNvbHVtbjogdHJ1ZSwgdGVtcGxhdGVJRDogXCJjbU5hbWVDb2x1bW5UZW1wbGF0ZVwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBDaGFydE1hbmFnZXJXaWRnZXQuYWRkaXRpb25hbEluZm9Db2x1bW5JZCwgaGVhZGVyVGV4dDogXCJcIiwgd2lkdGg6IFwiMTQwcHhcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogQ2hhcnRNYW5hZ2VyV2lkZ2V0Lmljb25EZWZpbml0aW9uQ29sdW1uSWQsIHZpc2libGU6IGZhbHNlLCB3aWR0aDogXCIwcHhcIiB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIHJlc2l6ZSBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCk6IHt9IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhbGxvd0NvbHVtblJlc2l6ZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplU2V0dGluZ3M6IHsgY29sdW1uUmVzaXplTW9kZTogZWouVHJlZUdyaWQuQ29sdW1uUmVzaXplTW9kZS5GaXhlZENvbHVtbnMgfSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRDb2x1bW5SZXNpemVkKGFyZ3MpLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBIHRyZWVncmlkIGNvbHVtbiB3YXMgcmVzaXplZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZENvbHVtblJlc2l6ZWQoYXJncykge1xyXG4gICAgICAgIHN1cGVyLnJlc2l6ZUR5bmFtaWNDb2x1bW4oYXJncy5jb2x1bW5JbmRleCwgYXJncy5tb2RlbCk7XHJcbiAgICAgICAgdGhpcy5zYXZlVHJlZUdyaWRTZXR0aW5ncygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIHRvb2xiYXIgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkVG9vbGJhclN1cHBvcnQoKToge30ge1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIgPSBuZXcgQ2hhcnRNYW5hZ2VyVHJlZUdyaWRUb29sYmFyKHRoaXMubWFpbkRpdiwgdGhpcy5fZGF0YU1vZGVsIGFzIElDaGFydE1hbmFnZXJEYXRhTW9kZWwpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRvb2xiYXJTZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgc2hvd1Rvb2xiYXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21Ub29sYmFySXRlbXM6IHRoaXMuX3Rvb2xiYXIuZ2V0Q3VzdG9tVG9vbGJhcnMoKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdG9vbGJhckNsaWNrOiAoYXJncykgPT4gdGhpcy50b29sYmFyQ2xpY2soYXJncylcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWREcmFnRHJvcFN1cHBvcnQoKToge30ge1xyXG4gICAgICAgIHZhciBkcmFnRHJvcCA9IG5ldyBDaGFydE1hbmFnZXJUcmVlR3JpZERyYWdEcm9wKCk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWxsb3dEcmFnQW5kRHJvcDogdHJ1ZSxcclxuICAgICAgICAgICAgcm93RHJhZ1N0YXJ0OiAoYXJncykgPT4gZHJhZ0Ryb3Aucm93RHJhZ1N0YXJ0KGFyZ3MpLFxyXG4gICAgICAgICAgICByb3dEcmFnOiAoYXJncykgPT4gZHJhZ0Ryb3Aucm93RHJhZyhhcmdzKSxcclxuICAgICAgICAgICAgcm93RHJvcEFjdGlvbkJlZ2luOiAoYXJncykgPT4gZHJhZ0Ryb3Aucm93RHJvcEFjdGlvbkJlZ2luKGFyZ3MsIHRoaXMuX2RhdGFNb2RlbCBhcyBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsKSxcclxuICAgICAgICAgICAgcm93RHJhZ1N0b3A6IChhcmdzKSA9PiBkcmFnRHJvcC5yb3dEcmFnU3RvcChhcmdzLCB0aGlzLl9kYXRhTW9kZWwgYXMgSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkQ3JlYXRlZCgpIHtcclxuICAgICAgICAvLyBTZXRzIHRoZSBjdXN0b20gdG9vbGJhciBpY29uc1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIuc2V0U3R5bGVGb3JUb29sYmFySWNvbnMoKTtcclxuXHJcbiAgICAgICAgLy8gQXQgdGhlIGJlZ2lubmluZyB0aGUgZGVsZXRlIGJ1dHRvbiBpcyBkaXNhYmxlZCBiZWNhdXNlIG5vIHNlbGVjdGlvbiBpcyBhdmFpbGFibGVcclxuICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVEZWxldGVCdXR0b24odHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZEFjdGlvbkJlZ2luKGFyZ3MpIHtcclxuICAgICAgICAvLyBTdXBwb3J0IFwiRW50Zi9EZWxcIiBrZXlcclxuICAgICAgICBpZiAoYXJncy5yZXF1ZXN0VHlwZSA9PSBcImRlbGV0ZVwiKSB7XHJcbiAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGFyZ3MuZGVsZXRlZEl0ZW1zWzBdLml0ZW0gaW5zdGFuY2VvZiBDaGFydE1hbmFnZXJDaGFydCkge1xyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGNoYXJ0IGZyb20gZGF0YW1vZGVsXHJcbiAgICAgICAgICAgICAgICAoPGFueT50aGlzLl9kYXRhTW9kZWwpIS5yZW1vdmVDaGFydChhcmdzLmRlbGV0ZWRJdGVtc1swXS5pdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChhcmdzLmRlbGV0ZWRJdGVtc1swXS5pdGVtIGluc3RhbmNlb2YgQmFzZVNlcmllcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnQgfCB1bmRlZmluZWQgPSBhcmdzLmRlbGV0ZWRJdGVtc1swXS5wYXJlbnRJdGVtLnBhcmVudEl0ZW0uaXRlbTtcclxuICAgICAgICAgICAgICAgIGlmIChjaGFydCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgc2VyaWUgZnJvbSBkYXRhbW9kZWxcclxuICAgICAgICAgICAgICAgICAgICAoPGFueT50aGlzLl9kYXRhTW9kZWwpIS5yZW1vdmVTZXJpZShjaGFydCwgYXJncy5kZWxldGVkSXRlbXNbMF0uaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYXJncy5kZWxldGVkSXRlbXNbMF0uaXRlbSBpbnN0YW5jZW9mIFNjYWxlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCB8IHVuZGVmaW5lZCA9IGFyZ3MuZGVsZXRlZEl0ZW1zWzBdLnBhcmVudEl0ZW0uaXRlbTtcclxuICAgICAgICAgICAgICAgIGlmIChjaGFydCAhPSB1bmRlZmluZWQgJiYgY2hhcnQuY2FuUmVtb3ZlWUF4aXMoKSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHlBeGlzIGZyb20gZGF0YW1vZGVsXHJcbiAgICAgICAgICAgICAgICAgICAgKDxhbnk+dGhpcy5fZGF0YU1vZGVsKSEucmVtb3ZlWUF4aXMoY2hhcnQsIGFyZ3MuZGVsZXRlZEl0ZW1zWzBdLml0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJlZUdyaWRBY3Rpb25Db21wbGV0ZShhcmdzKSB7XHJcbiAgICAgICAgLy8gRXZlbnQgdHJpZ2dlciB3aGlsZSBjaGFuZ2luZyBkYXRhc291cmNlIGR5bmFtaWNhbGx5LiBcclxuICAgICAgICAvLyBjb2RlIHRvIGRvbmUgYWZ0ZXIgdGhlIGR5bmFtaWMgY2hhbmdlIG9mIGRhdGFzb3VyY2UuIFxyXG4gICAgICAgIGlmIChhcmdzLnJlcXVlc3RUeXBlID09PSAncmVmcmVzaERhdGFTb3VyY2UnKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFNlbGVjdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlci5yZXNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZnJlc2goKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucmVmcmVzaEVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBkYXRhbW9kZWwgaW4gdHJlZWdyaWRcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TW9kZWwodGhpcy5kYXRhTW9kZWwuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgZGF0YW1vZGVsIGluIHRvb2xiYXJcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIudXBkYXRlRGF0YU1vZGVsKHRoaXMuZGF0YU1vZGVsIGFzIElDaGFydE1hbmFnZXJEYXRhTW9kZWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmluZm8oXCJDaGFydE1hbmFnZXIgcmVmcmVzaCBlcnJvciEgPT4gVHJlZUdyaWQgcmVjcmVhdGlvbiFcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVHJlZUdyaWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWZyZXNoU2VsZWN0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IHRyZWVPYmogPSAkKHRoaXMubWFpbkRpdikuZWpUcmVlR3JpZCgnaW5zdGFuY2UnKTtcclxuXHJcbiAgICAgICAgLy8gR2V0IGFjdHVhbCBzZWxlY3Rpb24gaW5kZXhcclxuICAgICAgICBsZXQgYWN0dWFsU2VsZWN0ZWRSb3dJbmRleCA9IHRyZWVPYmoubW9kZWwuc2VsZWN0ZWRSb3dJbmRleDtcclxuICAgICAgICAvLyBSZXNldCBzZWxlY3Rpb25cclxuICAgICAgICB0cmVlT2JqLm1vZGVsLnNlbGVjdGVkUm93SW5kZXggPSAtMTtcclxuXHJcbiAgICAgICAgLy8gU2V0IHRvIGxhc3QgaW5kZXggaWYgaW5kZXggaXMgb3V0IG9mIHJhbmdlXHJcbiAgICAgICAgaWYgKGFjdHVhbFNlbGVjdGVkUm93SW5kZXggPj0gdHJlZU9iai5tb2RlbC5mbGF0UmVjb3Jkcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgYWN0dWFsU2VsZWN0ZWRSb3dJbmRleCA9IHRyZWVPYmoubW9kZWwuZmxhdFJlY29yZHMubGVuZ3RoIC0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gU2V0IHNlbGVjdGlvblxyXG4gICAgICAgIHRyZWVPYmoubW9kZWwuc2VsZWN0ZWRSb3dJbmRleCA9IGFjdHVhbFNlbGVjdGVkUm93SW5kZXg7XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSB0b29sYmFyIGJ1dHRvbnNcclxuICAgICAgICBpZiAodHJlZU9iai5tb2RlbC5mbGF0UmVjb3Jkc1thY3R1YWxTZWxlY3RlZFJvd0luZGV4XSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVUb29sYmFyQnV0dG9uU3RhdGVzKHRyZWVPYmoubW9kZWwuZGF0YVNvdXJjZSwgdHJlZU9iai5tb2RlbC5mbGF0UmVjb3Jkc1thY3R1YWxTZWxlY3RlZFJvd0luZGV4XS5pdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVUb29sYmFyQnV0dG9uU3RhdGVzKGNoYXJ0czogQXJyYXk8SUNoYXJ0TWFuYWdlckNoYXJ0Piwgc2VsZWN0ZWRJdGVtKSB7XHJcbiAgICAgICAgaWYgKGNoYXJ0cy5sZW5ndGggPT0gMCB8fCBzZWxlY3RlZEl0ZW0gPT0gdW5kZWZpbmVkIHx8IChzZWxlY3RlZEl0ZW0gaW5zdGFuY2VvZiBTY2FsZSAmJiBzZWxlY3RlZEl0ZW0ucGFyZW50LmNhblJlbW92ZVlBeGlzKCkgPT0gZmFsc2UpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzYWJsZURlbGV0ZUJ1dHRvbih0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzYWJsZURlbGV0ZUJ1dHRvbihmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgoPGFueT50aGlzLl9kYXRhTW9kZWwpLmNhbkFkZENoYXJ0KCkgfHwgKHNlbGVjdGVkSXRlbSBpbnN0YW5jZW9mIENoYXJ0TWFuYWdlckNoYXJ0ICYmIHNlbGVjdGVkSXRlbS5jYW5BZGRZQXhpcygpKSkge1xyXG4gICAgICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVBZGRCdXR0b24oZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlQWRkQnV0dG9uKHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fdG9vbGJhci5zZXRTZWxlY3RlZENoYXJ0KHNlbGVjdGVkSXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqUmVnaW9uIGRyb3Agc3VwcG9ydCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYWxsIHBvc3NpYmxlIGRyb3BMb2NhdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxCYXNlU2VyaWVzPn0gc2VyaWVzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkRHJvcExvY2F0aW9ucyhzZXJpZXM6IEFycmF5PEJhc2VTZXJpZXM+KSB7XHJcbiAgICAgICAgLy8gQWRkIHBvc3NpYmxlIGRyb3AgbG9jYXRpb25zXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhbGwgZHJvcCBsb2NhdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxCYXNlU2VyaWVzPn0gc2VyaWVzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVtb3ZlRHJvcExvY2F0aW9ucyhzZXJpZXM6IEFycmF5PEJhc2VTZXJpZXM+KSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YU1vZGVsLmRhdGEuZm9yRWFjaChjaGFydCA9PiB7XHJcbiAgICAgICAgICAgIGNoYXJ0LmRyb3BQb3NzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjaGFydC5jaGlsZHMuZm9yRWFjaCh5QXhpcyA9PiB7XHJcbiAgICAgICAgICAgICAgICB5QXhpcy5kcm9wUG9zc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkcmFnU3RhcnQoYXJnczogRHJhZ0Ryb3BBcmdzKSB7XHJcbiAgICAgICAgbGV0IHNlcmllID0gYXJncy5kYXRhIGFzIEFycmF5PEJhc2VTZXJpZXM+O1xyXG5cclxuICAgICAgICAvLyBBZGQgcG9zc2libGUgZHJvcExvY2F0aW9uc1xyXG4gICAgICAgIHRoaXMuYWRkRHJvcExvY2F0aW9ucyhzZXJpZSk7XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSB0cmVlR3JpZFxyXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYWdTdG9wKGFyZ3M6IERyYWdEcm9wQXJncykge1xyXG4gICAgICAgIGxldCBzZXJpZSA9IGFyZ3MuZGF0YSBhcyBBcnJheTxCYXNlU2VyaWVzPjtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIHBvc3NpYmxlIGRyb3BMb2NhdGlvbnNcclxuICAgICAgICB0aGlzLnJlbW92ZURyb3BMb2NhdGlvbnMoc2VyaWUpO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdHJlZUdyaWRcclxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgIH1cclxuXHJcbiAgICBkcmFnT3ZlcihhcmdzOiBEcmFnRHJvcEFyZ3MpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgc2VyaWVzID0gYXJncy5kYXRhIGFzIEFycmF5PEJhc2VTZXJpZXM+O1xyXG5cclxuICAgICAgICBsZXQgZHJvcFBvc3NpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGNoYXJ0ID0gdGhpcy5nZXRDaGFydEZyb21EcmFnTG9jYXRpb24oYXJncy5jdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICBsZXQgeUF4aXMgPSB0aGlzLmdldFlBeGlzRnJvbURyYWdMb2NhdGlvbihhcmdzLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgIGxldCBpbWFnZVByb3ZpZGVyID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLkltYWdlUHJvdmlkZXJJZCkgYXMgSUltYWdlUHJvdmlkZXI7XHJcbiAgICAgICAgaWYgKGNoYXJ0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcnQuZHJvcFBvc3NpYmxlID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGRyb3BQb3NzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJncy5kcmFnRHJvcFJlcHJlc2VudGF0aW9uICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhZGROZXdTY2FsZUltYWdlID0gaW1hZ2VQcm92aWRlci5nZXRJbWFnZShcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3AvYWRkTmV3U2NhbGUuc3ZnXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFyZ3MuZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbi5pY29uTGlzdC5wdXNoKGFkZE5ld1NjYWxlSW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlcmllc1swXS50eXBlID09PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMgJiYgY2hhcnQuY2hhcnRUeXBlID09IENoYXJ0VHlwZS5GRlRDaGFydCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5kcmFnRHJvcFJlcHJlc2VudGF0aW9uLnRleHRMaXN0WzBdID0gXCJDYWxjdWxhdGUgRkZUIHNpZ25hbCBhbmQgYWRkIGl0IHRvIG5ldyBzY2FsZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5kcmFnRHJvcFJlcHJlc2VudGF0aW9uLnRleHRMaXN0WzBdID0gXCJDcmVhdGUgYSBuZXcgc2NhbGUgYW5kIGFkZCBkcmFnZ2VkIHNpZ25hbHNcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoeUF4aXMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlmICh5QXhpcy5kcm9wUG9zc2libGUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgZHJvcFBvc3NpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChhcmdzLmRyYWdEcm9wUmVwcmVzZW50YXRpb24gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFkZE5ld1NjYWxlSW1hZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9YWSBjaGFydCBleGNlcHRpb25cclxuICAgICAgICAgICAgICAgICAgICBpZiAoeUF4aXMucGFyZW50LmNoYXJ0VHlwZSA9PSBDaGFydFR5cGUuWFlDaGFydCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZE5ld1NjYWxlSW1hZ2UgPSBpbWFnZVByb3ZpZGVyLmdldEltYWdlKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9hc3NpZ25Ub0NoYXJ0LnN2Z1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VyaWVzWzBdLnR5cGUgPT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLmRyYWdEcm9wUmVwcmVzZW50YXRpb24udGV4dExpc3RbMF0gPSBcIkNhbGN1bGF0ZSBYWSBzaWduYWwgYW5kIGFkZCBpdCB0byB0aGUgY2hhcnRcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MuZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbi50ZXh0TGlzdFswXSA9IFwiQWRkIGRyYWdnZWQgc2lnbmFscyB0byBjaGFydFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoeUF4aXMucGFyZW50LmNoYXJ0VHlwZSA9PSBDaGFydFR5cGUuRkZUQ2hhcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkTmV3U2NhbGVJbWFnZSA9IGltYWdlUHJvdmlkZXIuZ2V0SW1hZ2UoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL2Fzc2lnblRvU2NhbGUuc3ZnXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLmRyYWdEcm9wUmVwcmVzZW50YXRpb24udGV4dExpc3RbMF0gPSBcIkNhbGN1bGF0ZSBGRlQgc2lnbmFsIGFuZCBhZGQgaXQgdG8gc2NhbGVcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZE5ld1NjYWxlSW1hZ2UgPSBpbWFnZVByb3ZpZGVyLmdldEltYWdlKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9hc3NpZ25Ub1NjYWxlLnN2Z1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5kcmFnRHJvcFJlcHJlc2VudGF0aW9uLnRleHRMaXN0WzBdID0gXCJBZGQgZHJhZ2dlZCBzaWduYWxzIHRvIHNjYWxlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGFyZ3MuZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbi5pY29uTGlzdC5wdXNoKGFkZE5ld1NjYWxlSW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0RHJvcHBhYmxlQXJlYXMoY2hhcnQsIHlBeGlzLCBhcmdzLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgIHJldHVybiBkcm9wUG9zc2libGU7XHJcbiAgICB9XHJcblxyXG4gICAgZHJvcChhcmdzOiBEcmFnRHJvcEFyZ3MpIHtcclxuICAgICAgICBsZXQgc2VyaWVzID0gYXJncy5kYXRhIGFzIEFycmF5PEJhc2VTZXJpZXM+O1xyXG5cclxuICAgICAgICBsZXQgY2hhcnQgPSB0aGlzLmdldENoYXJ0RnJvbURyYWdMb2NhdGlvbihhcmdzLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgIGxldCB5QXhpcyA9IHRoaXMuZ2V0WUF4aXNGcm9tRHJhZ0xvY2F0aW9uKGFyZ3MuY3VycmVudFRhcmdldCk7XHJcblxyXG4gICAgICAgIGlmICh5QXhpcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY2hhcnQgPSB5QXhpcy5wYXJlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlcmllcyA9IFNlcmllQ2hhcnRUeXBlSGVscGVyLmdldERyb3BwYWJsZVNlcmllcyhjaGFydCEuZ2V0QWxsU2VyaWVzKCksc2VyaWVzKTtcclxuXHJcbiAgICAgICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgICAgICAgIGNoYXJ0OiBjaGFydCxcclxuICAgICAgICAgICAgeUF4aXM6IHlBeGlzLFxyXG4gICAgICAgICAgICBzZXJpZXM6IHNlcmllc1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9yYWlzZSBldmVudCB0byB0cmFjZVZpZXdXaWRnZXRcclxuICAgICAgICBpZiAoc2VyaWVzWzBdLnR5cGUgPT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzICYmIGNoYXJ0IS5jaGFydFR5cGUgPT0gQ2hhcnRUeXBlLlhZQ2hhcnQpIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudERyb3BIZWxwZXIucmFpc2UodGhpcy5kYXRhTW9kZWwsIHtoaW50OiBDaGFydERyb3BIZWxwZXJDaGFuZ2VkSGludC5jcmVhdGVYWVNlcmllLCBkYXRhOiBkYXRhIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChzZXJpZXNbMF0udHlwZSA9PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMgJiYgY2hhcnQhLmNoYXJ0VHlwZSA9PSBDaGFydFR5cGUuRkZUQ2hhcnQpe1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50RHJvcEhlbHBlci5yYWlzZSh0aGlzLmRhdGFNb2RlbCwge2hpbnQ6IENoYXJ0RHJvcEhlbHBlckNoYW5nZWRIaW50LmNyZWF0ZUZGVFNlcmllLCBkYXRhOiBkYXRhIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudERyb3BIZWxwZXIucmFpc2UodGhpcy5kYXRhTW9kZWwsIHtoaW50OiBDaGFydERyb3BIZWxwZXJDaGFuZ2VkSGludC5hZGRTZXJpZSwgZGF0YTogZGF0YSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZXNldEhpZ2hsaWdodEFyZWEoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldENoYXJ0RnJvbURyYWdMb2NhdGlvbihjdXJyZW50VGFyZ2V0KTogSUNoYXJ0TWFuYWdlckNoYXJ0IHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBsZXQgY2xhc3NlcyA9IGN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LnZhbHVlO1xyXG4gICAgICAgIC8vYXZvaWQgZHJvcHBpbmcgc2VyaWUgaW4gbm90IGhpZ2hsaWdodGVkIGFyZWFcclxuICAgICAgICBpZiAoIWNsYXNzZXMuaW5jbHVkZXMoJ2UtdGVtcGxhdGVjZWxsJykgJiYgY2xhc3Nlcy5pbmNsdWRlcygnZS1yb3djZWxsJykgfHwgY2xhc3Nlcy5pbmNsdWRlcygnZS1oZWFkZXJjZWxsJykgfHwgY3VycmVudFRhcmdldC5sb2NhbE5hbWUgPT0gJ3NwYW4nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcmVjb3JkID0gdGhpcy5nZXRUcmVlUmVjb3JkKGN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgIGlmIChyZWNvcmQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlmIChyZWNvcmQuaXRlbSBpbnN0YW5jZW9mIENoYXJ0TWFuYWdlckNoYXJ0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVjb3JkLml0ZW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFlBeGlzRnJvbURyYWdMb2NhdGlvbihjdXJyZW50VGFyZ2V0KTogU2NhbGUgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGxldCBjbGFzc2VzID0gY3VycmVudFRhcmdldC5jbGFzc0xpc3QudmFsdWU7XHJcbiAgICAgICAgLy9hdm9pZCBkcm9wcGluZyBzZXJpZSBpbiBub3QgaGlnaGxpZ2h0ZWQgYXJlYVxyXG4gICAgICAgIGlmICghY2xhc3Nlcy5pbmNsdWRlcygnZS10ZW1wbGF0ZWNlbGwnKSAmJiBjbGFzc2VzLmluY2x1ZGVzKCdlLXJvd2NlbGwnKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJlY29yZCA9IHRoaXMuZ2V0VHJlZVJlY29yZChjdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICBpZiAocmVjb3JkICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAocmVjb3JkLml0ZW0gaW5zdGFuY2VvZiBTY2FsZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlY29yZC5pdGVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcblx0ICogUmV0dXJucyB0aGUgY29sdW1uIHRlbXBsYXRlIGluZm9ybWF0aW9uc1xyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG5cdCAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuICAgIHByaXZhdGUgZ2V0Q29sdW1uVGVtcGxhdGVEYXRhKGNvbHVtbklkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmIChjb2x1bW5JZCA9PSBDaGFydE1hbmFnZXJXaWRnZXQubmFtZUNvbHVtbklkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgPHNjcmlwdCB0eXBlPVwidGV4dC94LWpzcmVuZGVyXCIgaWQ9XCJjbU5hbWVDb2x1bW5UZW1wbGF0ZVwiPlxyXG5cdFx0XHQgICAgICAgICAgICA8ZGl2IHN0eWxlPSdoZWlnaHQ6MjBweDsnIHVuc2VsZWN0YWJsZT0nb24nPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3tpZiAhfmdldHN0YXRlKCl9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2UtZHJhZ2ludGVuZCcgc3R5bGU9J2hlaWdodDoxcHg7IGZsb2F0OmxlZnQ7IHdpZHRoOjE0cHg7IGRpc3BsYXk6aW5saW5lLWJsb2NrOyc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9e3s6fl9zdGFnZU5hbWUoKX19IHN0eWxlPSd3aWR0aDoyNHB4Oyc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0nZS1hYm92ZUljb24gZS1pY29uTWFyZ2luIGUtaWNvbicgc3R5bGU9J3Bvc2l0aW9uOnJlbGF0aXZlO2Zsb2F0OnJpZ2h0O2Rpc3BsYXk6bm9uZTsnPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdlLWJlbG93SWNvbiBlLWljb25NYXJnaW4gZS1pY29uJyBzdHlsZT0ncG9zaXRpb246cmVsYXRpdmU7ZmxvYXQ6cmlnaHQ7ZGlzcGxheTpub25lOyc+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9J2UtY2hpbGRJY29uIGUtaWNvbk1hcmdpbiBlLWljb24nIHN0eWxlPSdwb3NpdGlvbjpyZWxhdGl2ZTtmbG9hdDpyaWdodDtkaXNwbGF5Om5vbmU7Jz48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0nZS1jYW5jZWxJY29uIGUtaWNvbk1hcmdpbiBlLWljb24nIHN0eWxlPSdwb3NpdGlvbjpyZWxhdGl2ZTtmbG9hdDpyaWdodDtkaXNwbGF5Om5vbmU7Jz48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3tlbHNlIH5nZXRzdGF0ZSgpfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdlLWludGVuZHBhcmVudCc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9e3s6fl9zdGFnZU5hbWUoKX19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9J2UtYWJvdmVJY29uIGUtaWNvbk1hcmdpbiBlLWljb24nIHN0eWxlPSdwb3NpdGlvbjpyZWxhdGl2ZTtmbG9hdDpsZWZ0O2Rpc3BsYXk6bm9uZTsnPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdlLWJlbG93SWNvbiBlLWljb25NYXJnaW4gZS1pY29uJyBzdHlsZT0ncG9zaXRpb246cmVsYXRpdmU7ZmxvYXQ6bGVmdDtkaXNwbGF5Om5vbmU7Jz48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0nZS1jaGlsZEljb24gZS1pY29uTWFyZ2luIGUtaWNvbicgc3R5bGU9J3Bvc2l0aW9uOnJlbGF0aXZlO2Zsb2F0OmxlZnQ7ZGlzcGxheTpub25lOyc+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9J2UtY2FuY2VsSWNvbiBlLWljb25NYXJnaW4gZS1pY29uJyBzdHlsZT0ncG9zaXRpb246cmVsYXRpdmU7ZmxvYXQ6bGVmdDtkaXNwbGF5Om5vbmU7Jz48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3svaWZ9fVxyXG4gICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7OiNkYXRhWydpY29uRGVmaW5pdGlvbiddfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2UtY2VsbCcgc3R5bGU9J2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjEwMCUnIHVuc2VsZWN0YWJsZT0nb24nPnt7OiNkYXRhWyduYW1lJ119fTwvZGl2PlxyXG5cdFx0XHQgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L3NjcmlwdD5gO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFNjcmlwdEZvckRyYWdEcm9wVGVtcGxhdGVIZWxwZXJzKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGA8c2NyaXB0IHR5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAkLnZpZXdzLmhlbHBlcnMoeyBfc3RhZ2VOYW1lOiBnZXRTdGFnZU5hbWUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJC52aWV3cy5oZWxwZXJzKHsgZ2V0c3RhdGU6IF9nZXRTdGF0ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAkLnZpZXdzLmhlbHBlcnMoeyBpc0dyb3VwOiBfaXNHcm91cCB9KTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBfZ2V0U3RhdGUoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEucGFyZW50SXRlbSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBfaXNHcm91cCgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5pc0dyb3VwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGdldFN0YWdlTmFtZSgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvd0NsYXNzID0gXCJncmlkcm93SW5kZXhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3h5ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93Q2xhc3MgKz0gcHJveHkuZGF0YS5pbmRleC50b1N0cmluZygpICsgXCJsZXZlbFwiICsgcHJveHkuZGF0YS5sZXZlbC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcm93Q2xhc3M7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIDwvc2NyaXB0PmA7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0RyYWdEcm9wQXJnc30gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZHJvcEZvY3VzTG9zdChhcmdzOiBEcmFnRHJvcEFyZ3MpIHtcclxuICAgICAgICB0aGlzLnJlc2V0SGlnaGxpZ2h0QXJlYSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhpZ2hsaWdodCByb3dzIHdoZXJlIHNpZ25hbCBpcyBkcmFnZ2VkIG92ZXIgYW5kIHBvc3NpYmxlIHRvIGJlIGRyb3BwZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsoSUNoYXJ0TWFuYWdlckNoYXJ0IHwgdW5kZWZpbmVkKX0gY2hhcnRNYW5hZ2VyQ2hhcnRcclxuICAgICAqIEBwYXJhbSB7KFNjYWxlIHwgdW5kZWZpbmVkKX0geUF4aXNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBoaWdobGlnaHREcm9wcGFibGVBcmVhcyhjaGFydE1hbmFnZXJDaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0IHwgdW5kZWZpbmVkLCB5QXhpczogU2NhbGUgfCB1bmRlZmluZWQsIGN1cnJlbnRUYXJnZXQpe1xyXG4gICAgICAgIGlmIChjaGFydE1hbmFnZXJDaGFydCAhPSB1bmRlZmluZWQgJiYgY2hhcnRNYW5hZ2VyQ2hhcnQuZHJvcFBvc3NpYmxlKSB7XHJcbiAgICAgICAgICAgIGxldCBhcmVhID0gdGhpcy5nZXRBcmVhVG9Gcm9tQ3VycmVudFRhcmdldChjdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICAgICAgdGhpcy5hZGRIaWdobGlnaHRlZEFyZWEoYXJlYSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHlBeGlzICE9IHVuZGVmaW5lZCAmJiB5QXhpcy5kcm9wUG9zc2libGUpIHtcclxuICAgICAgICAgICAgbGV0IGFyZWEgPSB0aGlzLmdldEFyZWFUb0Zyb21DdXJyZW50VGFyZ2V0KGN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZEhpZ2hsaWdodGVkQXJlYShhcmVhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5yZXNldEhpZ2hsaWdodEFyZWEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRIaWdobGlnaHRlZEFyZWEoYXJlYSkge1xyXG5cdFx0bGV0IGhpZ2hsaWdodEVsZW0gPSAkKCc8ZGl2IGlkPVwiJysgdGhpcy5oaWdobGlnaHRBcmVhSWQgKydcIiBzdHlsZT1cIiBwb2ludGVyLWV2ZW50czpub25lOyBwb3NpdGlvbjphYnNvbHV0ZTsgXCIgY2xhc3M9XCJkcmFnZ2VkT3ZlclwiPjwvZGl2PicpO1xyXG5cdFx0dGhpcy5yZXNldEhpZ2hsaWdodEFyZWEoaGlnaGxpZ2h0RWxlbSk7XHJcblx0XHQkKGFyZWEpLmFwcGVuZChoaWdobGlnaHRFbGVtKTtcclxuXHJcblx0XHRoaWdobGlnaHRFbGVtLmNzcygndG9wJywgYXJlYS5vZmZzZXRUb3ApO1xyXG5cdFx0aGlnaGxpZ2h0RWxlbS5jc3MoJ2xlZnQnLCBhcmVhLm9mZnNldExlZnQpO1xyXG5cdFx0aGlnaGxpZ2h0RWxlbS5jc3MoJ2hlaWdodCcsIGFyZWEub2Zmc2V0SGVpZ2h0KTtcclxuXHRcdGhpZ2hsaWdodEVsZW0uY3NzKCd3aWR0aCcsIGFyZWEub2Zmc2V0V2lkdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0QXJlYVRvRnJvbUN1cnJlbnRUYXJnZXQoY3VycmVudFRhcmdldCkge1xyXG4gICAgICAgIGxldCBjbGFzc2VzID0gY3VycmVudFRhcmdldC5jbGFzc0xpc3QudmFsdWU7XHJcbiAgICAgICAgaWYgKGNsYXNzZXMuaW5jbHVkZXMoJ2Utcm93Y2VsbCcpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXJlYVRvRnJvbUN1cnJlbnRUYXJnZXQoY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNldCBhbGwgaGlnaGxpZ2h0ZWQgYXJlcyBpbiBjaGFydE1hbmFnZXIgZXhjZXB0IHRoZSBjZWxsIGJlaW5nIGRyYWdnZWRPdmVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SlF1ZXJ5PEhUTUxFbGVtZW50Pn0gW2VsZW1lbnRdXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVzZXRIaWdobGlnaHRBcmVhIChlbGVtZW50PzogSlF1ZXJ5PEhUTUxFbGVtZW50Pikge1xyXG5cdFx0bGV0IGhpZ2hsaWdodEVsZW0gPSAkKCcjJyArIHRoaXMuaGlnaGxpZ2h0QXJlYUlkKTtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaGlnaGxpZ2h0RWxlbS5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdGlmIChlbGVtZW50ID09IHVuZGVmaW5lZCB8fCBoaWdobGlnaHRFbGVtW2ldICE9IGVsZW1lbnRbMF0pIHtcclxuXHRcdFx0XHRoaWdobGlnaHRFbGVtW2ldLnJlbW92ZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcbiAgICB9XHJcbiAgICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipFbmQgcmVnaW9uIGRyb3Agc3VwcG9ydCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxufVxyXG5cclxuZXhwb3J0IHsgQ2hhcnRNYW5hZ2VyV2lkZ2V0fTsiXX0=