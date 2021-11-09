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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "../common/treeGridWidgetBase", "../../models/common/signal/serieGroup", "./view/smTreeGridCellEditEvents", "./view/smTreeGridCellEditTemplate", "./view/signalManagerTreeGridToolbar", "../../common/fileProvider", "../../framework/events", "../../common/exportImportHelper", "../common/busyInformation", "../../models/signalManagerDataModel/signalCategory", "../../models/signalManagerDataModel/signalManagerCalculation", "../../models/common/signal/serieContainer", "../../models/common/signal/serieNode", "../common/interfaces/dropInterface", "../common/dragDataObject", "../../models/signalManagerDataModel/signalManagerCalculationInputData", "../../models/signalManagerDataModel/signalManagerCalculationOutputData", "../common/dragDropRepresentation", "../../models/signalManagerDataModel/signalManagerCalculatorType", "../../models/common/series/seriesType", "./helpers/exportHelper", "../common/alertDialog", "../../models/signalManagerDataModel/signalRoot", "./componentDefaultDefinition", "../common/widgetBase", "../../common/persistence/persistDataProvider", "../../common/packageConversion/exportContainer", "../../common/packageConversion/mceConversionError", "../../common/mceExportImport/mceExportImportHelper", "../../framework/componentHub/componentDataHub", "../common/states/cursorStates"], function (require, exports, treeGridWidgetBase_1, serieGroup_1, smTreeGridCellEditEvents_1, smTreeGridCellEditTemplate_1, signalManagerTreeGridToolbar_1, fileProvider_1, events_1, exportImportHelper_1, busyInformation_1, signalCategory_1, signalManagerCalculation_1, serieContainer_1, serieNode_1, dropInterface_1, dragDataObject_1, signalManagerCalculationInputData_1, signalManagerCalculationOutputData_1, dragDropRepresentation_1, signalManagerCalculatorType_1, seriesType_1, exportHelper_1, alertDialog_1, signalRoot_1, componentDefaultDefinition_1, widgetBase_1, persistDataProvider_1, exportContainer_1, mceConversionError_1, mceExportImportHelper_1, componentDataHub_1, cursorStates_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventSerieDoubleClicked = /** @class */ (function (_super) {
        __extends(EventSerieDoubleClicked, _super);
        function EventSerieDoubleClicked() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventSerieDoubleClicked;
    }(events_1.TypedEvent));
    ;
    var EventChangeSize = /** @class */ (function (_super) {
        __extends(EventChangeSize, _super);
        function EventChangeSize() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventChangeSize;
    }(events_1.TypedEvent));
    ;
    var SignalManagerWidget = /** @class */ (function (_super) {
        __extends(SignalManagerWidget, _super);
        function SignalManagerWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._highlightAreaId = "signalManager_Highlighted";
            _this._deleteItemsContent = "This action will permanently delete selected elements.";
            _this._deleteItemsHeader = "Delete recorded data?";
            _this._warningImportingHeader = "Import canceled";
            _this._warningImportingContent = "It is not possible to import one .mce file with other files at the same time.";
            _this._MCEFilesImportedHeader = "Delete all trace data?";
            _this._MCEFilesImportedContent = "Do you want to delete all trace data and import the .mce file?";
            _this._isFirstResize = true;
            _this._indexesDragged = [];
            _this._fileProvider = new fileProvider_1.FileProvider();
            _this.editModeActive = false;
            _this._widthDifference = 450;
            _this._minWidth = 250;
            _this.eventSerieDoubleClicked = new EventSerieDoubleClicked();
            _this.eventChangeSize = new EventChangeSize();
            _this._uploadDataFinishedHandler = function (sender, args) { return _this.onUploadDataFinished(sender, args); };
            return _this;
        }
        Object.defineProperty(SignalManagerWidget.prototype, "autoUploadActive", {
            /**
             * Gets the information if the auto upload of tracedata is active
             *
             * @readonly
             * @type {boolean}
             * @memberof SignalManagerWidget
             */
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Defines the height of the header
         *
         * @returns {number}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.defineHeaderHeight = function () {
            return 30;
        };
        SignalManagerWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
        };
        SignalManagerWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this.initSignalManagerDataModel();
            this.initSeriesProvider();
            this.initChartManagerDataModel();
            this.refresh();
            _super.prototype.setHeaderContent.call(this, "Signals");
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 0, 40);
            // Initialize scrollbars positions
            var scrollbarSettings = this.component.getSetting(treeGridWidgetBase_1.TreeGridWidgetBase.ScrollbarsSettingsId);
            this.setScrollBarSettings(scrollbarSettings);
            // Add drag support
            _super.prototype.addDraggingSupport.call(this);
            // Add drop support
            _super.prototype.addSupportedDragDropDataId.call(this, dropInterface_1.DragDropDataId.signal);
        };
        SignalManagerWidget.prototype.dispose = function () {
            this.removeSupportedDragDropDataId(dropInterface_1.DragDropDataId.signal);
            _super.prototype.dispose.call(this);
        };
        //#region drag support
        SignalManagerWidget.prototype.startDragging = function () {
            if (this._currentDragDropSeries != undefined) {
                var signalImage = void 0, signalName = void 0;
                var imageProvider = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.ImageProviderId);
                if (this._currentDragDropSeries.length == 1) {
                    // Default yt series svg
                    signalName = this._currentDragDropSeries[0].name;
                    if (imageProvider != undefined) {
                        signalImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/ytSeries.svg");
                        if (this._currentDragDropSeries[0].type == seriesType_1.SeriesType.xySeries) {
                            // Use xy series svg
                            signalImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/xySeries.svg");
                        }
                        else if (this._currentDragDropSeries[0].type == seriesType_1.SeriesType.fftSeries) {
                            // Use fft series svg
                            signalImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/fftSeries.svg");
                        }
                        if (signalImage != undefined) {
                            // Replace serie color in svg with color of current serie
                            signalImage = signalImage.replace("stroke:#76bea6", "stroke:" + this._currentDragDropSeries[0].color);
                        }
                    }
                }
                else {
                    if (imageProvider != undefined) {
                        if (this._currentDragDropSeries[0].type == seriesType_1.SeriesType.xySeries) {
                            signalImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/severalXYSeries.svg");
                        }
                        else if (this._currentDragDropSeries[0].type == seriesType_1.SeriesType.fftSeries) {
                            signalImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/severalFFTSeries.svg");
                        }
                        else {
                            signalImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/severalYTSeries.svg");
                        }
                    }
                }
                var dragDropIconRepresentation = new dragDropRepresentation_1.DragDropRepresentation();
                dragDropIconRepresentation.iconList.push(signalImage);
                dragDropIconRepresentation.textList.push(signalName);
                return new dragDataObject_1.DragDropDataObject(dropInterface_1.DragDropDataId.signal, this._currentDragDropSeries, dragDropIconRepresentation);
            }
            return undefined;
        };
        SignalManagerWidget.prototype.draggingStopped = function () {
            // Reset current drag drop signal
            this._currentDragDropSeries = undefined;
            this._currentCalculatorType = undefined;
            this._indexesDragged = [];
        };
        //#endregion
        //#region drop support
        SignalManagerWidget.prototype.addDropLocations = function (series) {
            if (series[0].parent != undefined && series.length == 1) {
                series[0].parent.visibleChilds.forEach(function (child) {
                    if (child instanceof signalManagerCalculation_1.SignalManagerCalculation) {
                        child.setDropLocations(true, series[0]);
                    }
                });
            }
        };
        SignalManagerWidget.prototype.removeDropLocations = function (series) {
            if (series[0].parent != undefined && series.length == 1) {
                series[0].parent.visibleChilds.forEach(function (child) {
                    if (child instanceof signalManagerCalculation_1.SignalManagerCalculation) {
                        child.setDropLocations(false, series[0]);
                    }
                });
            }
        };
        SignalManagerWidget.prototype.dragStart = function (args) {
            var series = args.data;
            // Add possible dropLocations
            this.addDropLocations(series);
            // Update treeGrid
            this.refresh();
            var treeGridObj = this.getTreeGridObject();
            this.updateSerieSelection(treeGridObj, this._indexesDragged);
        };
        SignalManagerWidget.prototype.dragStop = function (args) {
            var series = args.data;
            // Remove possible dropLocations
            this.removeDropLocations(series);
            // Update treeGrid
            this.refresh();
            var treeGridObj = this.getTreeGridObject();
            this.updateSerieSelection(treeGridObj, this._indexesDragged);
        };
        SignalManagerWidget.prototype.dragOver = function (args) {
            var calculationInputItem = this.getCalculationInputFromDropLocation(args.currentTarget);
            if (calculationInputItem != undefined && calculationInputItem.dropPossible == true) {
                this.addHighlightedArea(args.currentTarget);
                return true;
            }
            else {
                this.resetHighlightArea();
            }
            return false;
        };
        SignalManagerWidget.prototype.drop = function (args) {
            var series = args.data[0];
            var calculationInputTarget = this.getCalculationInputFromDropLocation(args.currentTarget);
            var calculationInputDraggedItem = this.getCalculationInputDragged(series);
            if (calculationInputTarget != undefined && calculationInputTarget.dropPossible == true) {
                if (series != undefined) {
                    //Exchange of serie if the dragged serie is inside the calculator
                    if (this._currentCalculatorType == calculationInputTarget.parent && calculationInputDraggedItem != undefined) {
                        var oldValue = calculationInputTarget.value;
                        calculationInputDraggedItem.value = oldValue;
                    }
                    calculationInputTarget.value = series.name;
                }
            }
        };
        /**
         * Adds a <div> into the cell when droppable is possible and signal is being dragged over
         *
         * @private
         * @param {*} currentTarget
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.addHighlightedArea = function (currentTarget) {
            var highlightElem = $('<div id="' + this._highlightAreaId + '" style=" pointer-events:none; position:absolute; " class="draggedOver"></div>');
            this.resetHighlightArea(highlightElem);
            $(currentTarget).append(highlightElem);
            highlightElem.offset({ top: $(currentTarget).offset().top, left: $(currentTarget).offset().left });
            highlightElem.css('height', currentTarget.offsetHeight);
            highlightElem.css('width', currentTarget.offsetWidth);
        };
        /**
         * Remove all signalManager highlighted areas (except the selected one)
         *
         * @private
         * @param {JQuery<HTMLElement>} [element]
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.resetHighlightArea = function (element) {
            var highlightElem = $('#' + this._highlightAreaId);
            for (var i = 0; i < highlightElem.length; i++) {
                if (element == undefined || highlightElem[i] != element[0]) {
                    highlightElem[i].remove();
                }
            }
        };
        SignalManagerWidget.prototype.getCalculationInputFromDropLocation = function (currentTarget) {
            var record = this.getTreeRecord(currentTarget);
            if (record != undefined) {
                if (record.item instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData && currentTarget.classList.value.includes('dropLocationArea')) {
                    return record.item;
                }
            }
            return undefined;
        };
        SignalManagerWidget.prototype.getCalculationInputDragged = function (serie) {
            if (this._currentCalculatorType != undefined) {
                for (var i = 0; i < this._currentCalculatorType.getChilds().length; i++) {
                    if (this._currentCalculatorType.getChilds()[i].serie == serie) {
                        return this._currentCalculatorType.getChilds()[i];
                    }
                }
            }
            return undefined;
        };
        //#endregion
        /**
         * Creates the layout of the widget
         *
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.createLayout = function () {
            this.mainDiv.style.overflow = "hidden";
            _super.prototype.createLayout.call(this);
        };
        SignalManagerWidget.prototype.initSignalManagerDataModel = function () {
            var dataModel = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.SignalManagerDataModelId);
            this.dataModel = dataModel;
        };
        SignalManagerWidget.prototype.initSeriesProvider = function () {
            this._seriesProvider = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.SeriesProviderId);
        };
        SignalManagerWidget.prototype.initChartManagerDataModel = function () {
            this._chartManagerDataModel = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.ChartManagerDataModelId);
        };
        /**
         * Handles the model changes
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} eventArgs
         * @returns {*}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.handleModelChanged = function (sender, eventArgs) {
            this.refresh();
            this.saveTreeGridSettings();
        };
        /**
         * Resizes the signal manager widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.resize = function (width, height) {
            if (this._isFirstResize && this.editModeActive) {
                //Deactivate editMode and set correct width when widget is initialized
                this._isFirstResize = false;
                this.activateEditMode(false);
            }
            else {
                this._isFirstResize = false;
                _super.prototype.resize.call(this, width, height);
                this._toolbar.resize(width);
            }
        };
        /**
     * Sets the selection to the given series
     *
     * @private
     * @param {*} treeGridObject
     * @param {Array<number>} indexes
     * @memberof SignalManagerWidget
     */
        SignalManagerWidget.prototype.updateSerieSelection = function (treeGridObject, indexes) {
            // deselect all selections in signal pane
            treeGridObject.clearSelection();
            if (indexes[0] == undefined) {
                return;
            }
            for (var i = 0; i < indexes.length; i++) {
                treeGridObject._multiSelectCtrlRequest = true;
                var visibleIndex = 0;
                for (var j = 0; j < treeGridObject.model.flatRecords.length; j++) {
                    if (j == indexes[i]) {
                        treeGridObject.selectRows(visibleIndex);
                    }
                    if (treeGridObject.model.flatRecords[j].visible != "false") {
                        visibleIndex++;
                    }
                }
            }
        };
        ;
        /**
         * Refreshes the tree grid
         *
         * @private
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.refresh = function () {
            return __awaiter(this, void 0, void 0, function () {
                var treegridObj, i, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 6, , 7]);
                            if (!this.refreshEnabled) return [3 /*break*/, 5];
                            treegridObj = this.getTreeGridObject();
                            if (!(treegridObj.model.isEdit == false)) return [3 /*break*/, 1];
                            //To refresh TreeGrid with new datasource
                            this.setModel(this.dataModel.data);
                            return [3 /*break*/, 5];
                        case 1:
                            i = 0;
                            _a.label = 2;
                        case 2:
                            if (!(i < 100)) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.sleep(200)];
                        case 3:
                            _a.sent();
                            // is editing already finished
                            if (treegridObj.model.isEdit == false) {
                                this.setModel(this.dataModel.data);
                                return [2 /*return*/];
                            }
                            _a.label = 4;
                        case 4:
                            i++;
                            return [3 /*break*/, 2];
                        case 5: return [3 /*break*/, 7];
                        case 6:
                            e_1 = _a.sent();
                            console.info("SignalManager refresh error! => TreeGrid recreation!");
                            console.info(e_1);
                            this.createTreeGrid();
                            return [3 /*break*/, 7];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        SignalManagerWidget.prototype.sleep = function (ms) {
            return new Promise(function (resolve) { return setTimeout(resolve, ms); });
        };
        /**
         * Creates the column templates for the tree grid and adds them to the widget container
         *
         * @protected
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.createColumnTemplates = function () {
            var $widgetContainer = $(this.mainDiv);
            $widgetContainer.append(this.getColumnTemplateData(SignalManagerWidget.nameColumnId));
            $widgetContainer.append(this.getColumnTemplateData(SignalManagerWidget.colorColumnId));
        };
        /**
         * Creates the tree grid for the signal manager
         *
         * @protected
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.createTreeGrid = function () {
            var _this = this;
            $(this.mainDiv).ejTreeGrid(__assign(__assign(__assign(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), this.getTreeGridToolbarSupport()), this.getTreeGridCellEditSupport()), this.getTreeGridDragDropSupport()), { dataSource: this.dataModel.data, childMapping: "visibleChilds", expandStateMapping: "expandState", allowReordering: false, rowHeight: 28, selectionSettings: {
                    selectionType: 'multiple'
                }, selectionType: 'multiple', expanded: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, collapsed: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, recordClick: function (args) { return _this.click(args); }, recordDoubleClick: function (args) { return _this.doubleClick(args); }, rowSelected: function (args) { return _this.rowSelected(args.data.item, args.model.currentViewData); }, create: function (args) { return _this.treeGridCreated(); }, actionBegin: function (args) { return _this.treeGridActionBegin(args); }, actionComplete: function (args) { return _this.treeGridActionComplete(args); }, queryCellInfo: function (args) { return _this.treeGridQueryCellInfo(args); } }));
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: SignalManagerWidget.nameColumnId, headerText: "Name", width: "351px", isTemplateColumn: true, templateID: "smNameColumnTemplate" },
                    { field: SignalManagerWidget.valueColumnId, headerText: "Value", visible: this.editModeActive, width: "300px", editTemplate: smTreeGridCellEditTemplate_1.SmTreeGridCellEditTemplate.createInstance(), isTemplateColumn: true },
                    { field: SignalManagerWidget.descriptionColumnId, headerText: "Description", visible: this.editModeActive, width: "100px" },
                    { field: SignalManagerWidget.colorColumnId, headerText: "Color", width: "50px", visible: this.editModeActive, editType: "DatePicker", editTemplate: smTreeGridCellEditTemplate_1.SmTreeGridCellEditTemplate.createInstance(), isTemplateColumn: true, templateID: "smColorColumnTemplate" },
                    { field: SignalManagerWidget.iconDefinitionColumnId, visible: false, width: "0px" },
                ],
            };
        };
        /**
         * Returns the tree grid column resize settings
         *
         * @private
         * @returns {{}}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getTreeGridColumnResizeSupport = function () {
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
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.treeGridColumnResized = function (args) {
            _super.prototype.resizeDynamicColumn.call(this, args.columnIndex, args.model);
            this.saveTreeGridSettings();
        };
        /**
         * Returns the tree grid toolbar settings
         *
         * @private
         * @returns {{}}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getTreeGridToolbarSupport = function () {
            var _this = this;
            this._toolbar = new signalManagerTreeGridToolbar_1.SignalManagerTreeGridToolbar(this.mainDiv);
            return {
                toolbarSettings: {
                    showToolbar: true,
                    customToolbarItems: this._toolbar.getCustomToolbars()
                },
                toolbarClick: function (args) { return _this.toolbarClick(args); }
            };
        };
        /**
         * Returns the tree grid cell edit settings
         *
         * @private
         * @returns {{}}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getTreeGridCellEditSupport = function () {
            var _this = this;
            var cellEditEvents = new smTreeGridCellEditEvents_1.SmTreeGridCellEditEvents();
            return {
                editSettings: { allowEditing: true },
                beginEdit: function (args) { return cellEditEvents.beginEdit(args, _this); },
                endEdit: function (args) { return cellEditEvents.endEdit(args, _this); },
            };
        };
        /**
         * Activates the signal manager drag and drop support
         *
         * @private
         * @returns {{}}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getTreeGridDragDropSupport = function () {
            var _this = this;
            return {
                allowDragAndDrop: true,
                rowDragStart: function (args) { return _this.rowDragStart(args); },
            };
        };
        /**
         * Will be called after the tree grid was created; toolbar styles and states will be set
         *
         * @private
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.treeGridCreated = function () {
            // Sets the custom toolbar icons
            this._toolbar.setStyleForToolbarIcons();
            // At the beginning the export/delete/insert calculation button is disabled because no selection is available
            this._toolbar.disableExportButton(true);
            this._toolbar.disableDeleteButton(true);
            this._toolbar.disableInsertCalculationButton(true);
        };
        /**
         * Switch into "edit mode" or "normal mode"
         * if edit mode is active, the edit mode will be set to the datamodel, and the widget size will be increased
         * if normal mode is active, the normal mode will be set to the datamodel, and the widget size will be decreased
         *
         * @private
         * @param {boolean} active
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.setEditMode = function (active) {
            if (this.editModeActive != active) {
                if (active == true) {
                    this.onChangeSize(this._actualWidth + this._widthDifference);
                }
                else {
                    var newSize = this._actualWidth - this._widthDifference;
                    if (newSize < this._minWidth) {
                        newSize = this._minWidth;
                    }
                    this.onChangeSize(newSize);
                }
            }
            this.editModeActive = active;
            this.dataModel.editModeActive = this.editModeActive;
            if (this._toolbar != undefined) {
                this._toolbar.activateEditModeButton(this.editModeActive);
            }
        };
        /**
         * Well be called after some tree grid action was started
         *
         * @private
         * @param {*} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.treeGridActionBegin = function (args) {
            // Support "Entf/Del" key
            if (args.requestType == "delete") {
                args.cancel = true;
                if (this.containsItemWithinRecentOrUploaded(args.deletedItems)) {
                    this.showMessageBoxForDeletingItem(args.deletedItems);
                }
                else {
                    this.deleteItems(args.deletedItems);
                }
            }
        };
        /**
     * Loads the styles for the chart manager widget
     *
     * @memberof ChartManagerWidget
     */
        SignalManagerWidget.prototype.loadStyles = function () {
            _super.prototype.loadStyles.call(this);
            _super.prototype.addStyle.call(this, "widgets/common/style/css/dropDownMenuStyle.css");
        };
        /**
         * Well be called after some tree grid action was completed
         *
         * @private
         * @param {*} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.treeGridActionComplete = function (args) {
            // Event trigger while changing datasource dynamically. 
            // code to done after the dynamic change of datasource. 
            if (args.requestType === 'refreshDataSource') {
                this.refreshSelection();
                if (this._serieContainerToSelectAfterRefresh != undefined) {
                    // Selects the imported signalfile, or the inserted calculation, ...
                    this.selectItem(this._serieContainerToSelectAfterRefresh);
                    this._serieContainerToSelectAfterRefresh = undefined;
                }
            }
        };
        /**
         * Will be called to update the style of the give cell if a refresh will be needed
         *
         * @private
         * @param {*} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.treeGridQueryCellInfo = function (args) {
            if (args.column.field == "name") {
                if (this.isGroupItem(args.data.item)) {
                    // Show group nodes always bold => also if they have no childs
                    if (args.cellElement.style != undefined) {
                        if (args.data.level == 0) {
                            args.cellElement.style.fontWeight = "800"; // 700 would be bold
                        }
                        else {
                            args.cellElement.style.fontWeight = "650";
                        }
                    }
                }
                // Show all nodes red which have invalid signals in it 
                if (this.isItemInvalid(args.data.item) == true) {
                    if (args.cellElement.style != undefined) {
                        args.cellElement.style.color = "red";
                        args.cellElement.style.fontWeight = "bold";
                        //args.cellElement.innerText = args.cellElement.innerText + "(invalid)";
                    }
                }
            }
            else if (args.column.field == "value") {
                if (args.data.dropPossible == true) {
                    args.cellElement.classList.add("dropLocationArea");
                }
            }
        };
        /**
         * Has the given item some data and is this data valid
         *
         * @private
         * @param {*} item
         * @returns {boolean}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.isItemInvalid = function (item) {
            if (item instanceof signalManagerCalculation_1.SignalManagerCalculation) {
                var calculatedSignals = item.getSeries();
                // check if a calculated output signal is invalid
                for (var i = 0; i < calculatedSignals.length; i++) {
                    if (calculatedSignals[i].rawPointsValid == false) {
                        return true;
                    }
                }
            }
            else if (item instanceof serieNode_1.SerieNode) {
                if (item.serie != undefined && item.serie.rawPointsValid == false) {
                    if (item instanceof signalManagerCalculationOutputData_1.SignalManagerCalculationOutputData) {
                        return true;
                    }
                    else {
                        return true;
                    }
                }
            }
            return false;
        };
        /**
         * A drag and drop operation was started
         *
         * @private
         * @param {*} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.rowDragStart = function (args) {
            this._indexesDragged = [];
            var selectedElements = this.checkSelectedElements(args.draggedRecords, args.draggedRow);
            if (selectedElements.length > 0) {
                this._currentDragDropSeries = selectedElements;
                // Set current drag drop signal
            }
            else {
                this._currentDragDropSeries = undefined; // Reset current drag drop signal
            }
            args.draggedRecords = [];
            args.cancel = true;
        };
        SignalManagerWidget.prototype.refreshSelection = function () {
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
            var areElementsExportable = this.canItemsBeExported(treeObj.model.flatRecords);
            // update toolbar buttons
            if (treeObj.model.flatRecords[actualSelectedRowIndex] != undefined) {
                this.updateToolbarButtonStates(treeObj.model.flatRecords[actualSelectedRowIndex].item, areElementsExportable);
            }
            else {
                this.updateToolbarButtonStates(undefined, areElementsExportable);
            }
        };
        SignalManagerWidget.prototype.rowSelected = function (item, currentViewData) {
            var areElementsExportable = this.canItemsBeExported(currentViewData);
            this.updateToolbarButtonStates(item, areElementsExportable);
        };
        /**
         * updates the toolbar buttons(e.g. insert calulation only enabled on SerieGroup or under "Calculated signals" category)
         *
         * @private
         * @param {ISerieNode} item
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.updateToolbarButtonStates = function (item, areElementsExportable) {
            if (item == undefined) {
                this._toolbar.disableInsertCalculationButton(true);
                this._toolbar.disableDeleteButton(true);
            }
            else {
                // set delete button state
                this._toolbar.disableDeleteButton(!item.canDelete);
                if (item instanceof serieGroup_1.SerieGroup) {
                    this._toolbar.disableExportButton(false);
                    this._toolbar.disableInsertCalculationButton(false);
                }
                else {
                    if (item.getSerieGroup() == undefined) {
                        this._toolbar.disableInsertCalculationButton(true);
                        this._toolbar.disableExportButton(true);
                    }
                    else if (item instanceof signalManagerCalculatorType_1.SignalManagerCalculatorType && item.name == 'Algorithm' || item instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData && item.serie == undefined ||
                        ((item instanceof signalManagerCalculation_1.SignalManagerCalculation || item instanceof signalManagerCalculationOutputData_1.SignalManagerCalculationOutputData) && (item.serie == undefined || item.serie.rawPointsValid == false))) {
                        this._toolbar.disableInsertCalculationButton(false);
                        this._toolbar.disableExportButton(true);
                    }
                    else {
                        this._toolbar.disableExportButton(false);
                        this._toolbar.disableInsertCalculationButton(false);
                    }
                }
            }
            if (areElementsExportable) {
                this._toolbar.disableExportButton(false);
            }
            else {
                this._toolbar.disableExportButton(true);
            }
        };
        SignalManagerWidget.prototype.canItemsBeExported = function (items) {
            var canBeExported = false;
            var exportHelper = new exportHelper_1.ExportHelper();
            for (var i = 0; i < items.length; i++) {
                if (exportHelper.isElementExportable(items[i].item) === true) {
                    canBeExported = true;
                    break;
                }
            }
            return canBeExported;
        };
        /**
         * A click on the tree grid (needed for reseting the current drag drop signal)
         *
         * @private
         * @param {*} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.click = function (args) {
            // Reset current drag drop signal after click was finished(click up)
            this._currentDragDropSeries = undefined;
            this.focus();
        };
        /**
         * A double click on the tree grid was done
         *
         * @private
         * @param {*} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.doubleClick = function (args) {
            if (args.cellIndex == 0) {
                var serieNode = args.data.item;
                var foundSeries = this.getSeriesFromItem(serieNode);
                if (foundSeries.length > 0) {
                    // Only one serie can be added by double click currently(TODO: add multi insert)
                    this.onSeriesDoubleClicked(foundSeries[0]);
                }
            }
        };
        /**
         * Checks if all elements selected are series and of the same type
         *
         * @private
         * @param {*} elements
         * @param {*} draggedRow
         * @returns {Array<BaseSeries>}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.checkSelectedElements = function (elements, draggedRow) {
            var series = new Array();
            var items = new Array();
            var draggedRowIsSelected = false;
            var invalidSelection = false;
            if (draggedRow == undefined || draggedRow.serie == undefined) {
                return [];
            }
            var type = draggedRow.serie.type;
            for (var i = 0; i < elements.length; i = i + 1) {
                if (elements[i].serie == undefined || elements[i].serie.type != type) {
                    invalidSelection = true;
                }
                if (elements[i] == draggedRow) {
                    draggedRowIsSelected = true;
                }
                series.push(elements[i].serie);
                items.push(elements[i]);
            }
            if (draggedRow.item instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData) {
                this._currentCalculatorType = draggedRow.parent;
            }
            //Once all elements have been checked, select correct elements according to the exceptions
            if (!draggedRowIsSelected) {
                series = [];
                series.push(draggedRow.serie);
                this._indexesDragged = [];
                this._indexesDragged.push(draggedRow.index);
            }
            else if (invalidSelection) {
                return [];
            }
            else {
                series = this.deleteEqualSignals(series, items);
            }
            return series;
        };
        /**
         * Delete duplicated signals from the drag&drop array
         *
         * @private
         * @param {Array<BaseSeries>} series
         * @param {*} elements
         * @returns
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.deleteEqualSignals = function (series, elements) {
            for (var i = 0; i < series.length; i++) {
                if (elements[i].item instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData) {
                    var selectedItems = Object.assign([], series);
                    selectedItems.splice(i, 1);
                    if (selectedItems.includes(series[i])) {
                        series.splice(i, 1);
                        elements.splice(i, 1);
                        i = -1;
                    }
                }
            }
            for (var i = 0; i < elements.length; i++) {
                this._indexesDragged.push(elements[i].index);
            }
            return series;
        };
        /**
         * Returns all series which were found in the serie node item(e.g. a normal serie or calculated series)
         *
         * @private
         * @param {*} item
         * @returns {Array<BaseSeries>}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getSeriesFromItem = function (item) {
            var signals = new Array();
            if (item instanceof serieNode_1.SerieNode && item.serie != undefined) { // Is Signal node
                signals.push(item.serie);
            }
            else if (item instanceof serieContainer_1.SerieContainer) { // is calculation(group node) with signals
                return item.getSeries();
            }
            return signals;
        };
        /**
         * Is the given item a group item (e.g. needed for setting the font style to bold)
         *
         * @private
         * @param {ISerieContainer} item
         * @returns
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.isGroupItem = function (item) {
            if (item == undefined) {
                return false;
            }
            if (item.visibleChilds != undefined) {
                return true;
            }
            return false;
        };
        SignalManagerWidget.prototype.insertCalculation = function (item) {
            if (item == undefined) {
                return;
            }
            var selectedItem = item.item;
            var serieGroup;
            if (selectedItem instanceof serieGroup_1.SerieGroup || selectedItem instanceof signalCategory_1.SignalCategory) {
                // Calculation can only be insert at groups or categories
                serieGroup = selectedItem;
            }
            else {
                serieGroup = selectedItem.getSerieGroup();
            }
            if (serieGroup != undefined) {
                this.activateEditMode(true);
                return this.addCalculationToContainer(serieGroup);
            }
            return undefined;
        };
        SignalManagerWidget.prototype.addCalculationToContainer = function (container) {
            if (this._seriesProvider == undefined) {
                return undefined;
            }
            var calculation = new signalManagerCalculation_1.SignalManagerCalculation("Calculation", this._seriesProvider);
            this._serieContainerToSelectAfterRefresh = calculation;
            container.addSerieContainer(calculation, -1);
            return calculation;
        };
        SignalManagerWidget.prototype.getComponentSettings = function (onlyModified) {
            this.component.setSetting(widgetBase_1.WidgetBase.WidgetSettingId, this.getWidgetSettings());
            return _super.prototype.getComponentSettings.call(this, onlyModified);
        };
        SignalManagerWidget.prototype.setComponentSettings = function (data) {
            _super.prototype.setComponentSettings.call(this, data);
            this.setWidgetSettings(this.component.getSetting(widgetBase_1.WidgetBase.WidgetSettingId));
        };
        SignalManagerWidget.prototype.getWidgetSettings = function () {
            var settings = { "editModeActive": this.editModeActive,
                "width": this._actualWidth
            };
            return settings;
        };
        SignalManagerWidget.prototype.setWidgetSettings = function (data) {
            if (data == undefined) {
                return;
            }
            this.editModeActive = (data["editModeActive"]);
            this._actualWidth = data["width"];
        };
        SignalManagerWidget.prototype.activateEditMode = function (activate) {
            // Show or hide edit mode columns
            var treeObject = this.getTreeGridObject();
            var valueColumn = treeObject.getColumnByField(SignalManagerWidget.valueColumnId);
            var descriptionColumn = treeObject.getColumnByField(SignalManagerWidget.descriptionColumnId);
            var colorColumn = treeObject.getColumnByField(SignalManagerWidget.colorColumnId);
            if (activate == true) {
                treeObject.showColumn(valueColumn.headerText);
                treeObject.showColumn(descriptionColumn.headerText);
                treeObject.showColumn(colorColumn.headerText);
            }
            else {
                treeObject.hideColumn(valueColumn.headerText);
                treeObject.hideColumn(descriptionColumn.headerText);
                treeObject.hideColumn(colorColumn.headerText);
            }
            this.setEditMode(activate);
            this.refresh();
            persistDataProvider_1.PersistDataProvider.getInstance().setDataWithId(this.component.id, this.getComponentSettings(true));
        };
        /**
         * Returns true if one of the items deleted has been done through the trace of mappCockpit
         *
         * @param {*} selectedItems
         * @returns {boolean}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.containsItemWithinRecentOrUploaded = function (selectedItems) {
            for (var i = 0; i < selectedItems.length; i++) {
                if (this.isItemInSignalCategory(selectedItems[i].item, signalCategory_1.SignalCategory.CategoryIdUploaded) || this.isItemInSignalCategory(selectedItems[i].item, signalCategory_1.SignalCategory.CategoryIdRecent)) {
                    return true;
                }
            }
            return false;
        };
        /**
         * Returns true if the item selected belongs to the signal category selected
         *
         * @private
         * @param {ISerieNode | ISerieContainer} item
         * @param {string} signalCategoryId
         * @returns {boolean}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.isItemInSignalCategory = function (item, signalCategoryId) {
            var parent = item.parent;
            if (parent instanceof signalCategory_1.SignalCategory && parent.id == signalCategoryId) {
                return true;
            }
            else if (!(parent instanceof signalRoot_1.SignalRoot)) {
                return this.isItemInSignalCategory(parent, signalCategoryId);
            }
            else {
                return false;
            }
        };
        /**
         * Shows message box according to type
         *
         * @private
         * @param {messageBoxType} type
         * @param {Map<string, string>} fileContents
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.showMessageBox = function (type, fileContents) {
            if (type === alertDialog_1.messageBoxType.Warning) {
                this.showWarningWhenImportingFiles();
            }
            else if (type === alertDialog_1.messageBoxType.YesNo) {
                this.showMessageBoxWhenImportingMCEFiles(fileContents);
            }
        };
        /**
         * Creates a warning message when the user imports a .mce file and other files too
         *
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.showWarningWhenImportingFiles = function () {
            new alertDialog_1.AlertDialog().createMessageBox(this._warningImportingHeader, this._warningImportingContent, alertDialog_1.messageBoxType.Warning, undefined);
        };
        /**
         * Creates a message box that lets user decide to delete selected data or not
         *
         * @param {*} deletedItems
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.showMessageBoxForDeletingItem = function (deletedItems) {
            var deferred = jQuery.Deferred();
            var self = this;
            new alertDialog_1.AlertDialog().createMessageBox(this._deleteItemsHeader, this._deleteItemsContent, alertDialog_1.messageBoxType.CancelDelete, deferred);
            $.when(deferred).done(function () {
                self.deleteItems(deletedItems);
            });
        };
        /**
         * Creates a message box that lets user decide to import .mce file nad delete all data or not
         *
         * @private
         * @param {Map<string, string>} fileContents
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.showMessageBoxWhenImportingMCEFiles = function (fileContents) {
            var deferred = jQuery.Deferred();
            var self = this;
            new alertDialog_1.AlertDialog().createMessageBox(this._MCEFilesImportedHeader, this._MCEFilesImportedContent, alertDialog_1.messageBoxType.YesNo, deferred);
            $.when(deferred).done(function () {
                self.startImport(fileContents);
            });
        };
        /**
         * Delete selected items
         *
         * @param {*} items
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.deleteItems = function (items) {
            this.enableTreeGridRefresh(false);
            for (var i = 0; i < items.length; i++) {
                this.deleteItem(items[i].item);
            }
            this.enableTreeGridRefresh(true);
            //Refresh treegrid just when all items have been deleted
            this.refresh();
        };
        /**
         * Delete a specific item
         *
         * @private
         * @param {*} item
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.deleteItem = function (item) {
            if (item.canDelete) {
                if (item instanceof serieContainer_1.SerieContainer) {
                    this.removeSerieContainer(item);
                }
                else {
                    this.removeSerieNode(item);
                }
            }
        };
        /**
         *  Remove the signal container with all sub containers and signals from datamodel
         *
         * @private
         * @param {ISerieContainer} serieGroup
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.removeSerieContainer = function (serieGroup) {
            this._dataModel.removeSerieContainer(serieGroup);
        };
        /**
         * Removes the signal from datamodel
         *
         * @private
         * @param {ISerieNode} serieNode
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.removeSerieNode = function (serieNode) {
            this._dataModel.removeSerieNode(serieNode);
        };
        /**
         * Exports a serieGroup
         *
         * @public
         * @param {Array<ExportSerieGroup>} elements
         * @memberof SignalManagerTreeGrid
         */
        SignalManagerWidget.prototype.exportSerieGroup = function (elements) {
            var _this = this;
            this.setBusyInformation(new busyInformation_1.BusyInformation("Exporting data...", busyInformation_1.ImageId.defaultImage, 48, true));
            this.setBusy(true);
            // Timeout needed to show the busyscreen before exporting data 
            setTimeout(function () { return _this.exportCsvData(elements); }, 200);
        };
        /**
         * Opens a file select dialog and imports a serieGroup from the file
         *
         * @public
         * @memberof SignalManagerTreeGrid
         */
        SignalManagerWidget.prototype.importSerieGroup = function () {
            this._serieContainerToSelectAfterRefresh = undefined;
            this._fileProvider.eventUploadDataFinished.attach(this._uploadDataFinishedHandler);
            this._fileProvider.uploadData(".csv, .mce, .mce1", true); // Only show/accept *.csv, *.mce, *.mce1 files
        };
        SignalManagerWidget.prototype.exportSignalManagerData = function () {
            var _this = this;
            this.setBusyInformation(new busyInformation_1.BusyInformation("Exporting data...", busyInformation_1.ImageId.defaultImage, 48, true));
            this.setBusy(true);
            // Timeout needed to show the busyscreen before exporting data 
            setTimeout(function () { return _this.exportData(); }, 200);
        };
        /**
         * Occurs after reading data from file(trace import data)
         *
         * @private
         * @param {HTMLInputElement} sender
         * @param {Map<string, string>} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.onUploadDataFinished = function (sender, args) {
            this.setBusyInformation(new busyInformation_1.BusyInformation("Importing data...", busyInformation_1.ImageId.defaultImage, 48, true));
            var msgBoxType = this.checkMessageBoxType(args);
            if (msgBoxType != undefined) {
                this.showMessageBox(msgBoxType, args);
            }
            else {
                this.startImport(args);
            }
            this._fileProvider.eventUploadDataFinished.detach(this._uploadDataFinishedHandler);
        };
        /**
         * Exports the given signal group to TraceData.csv file
         *
         * @private
         * @param { Array<ExportSerieGroup>} elements
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.exportCsvData = function (elements) {
            var data;
            if (this._seriesProvider != undefined) {
                data = new exportImportHelper_1.ExportImportHelper(this._seriesProvider).exportTraceData(elements);
            }
            else {
                console.error("SeriesProvider is not available!");
            }
            if (data !== undefined) {
                var blob = new Blob([data], { type: "text/csv" });
                fileProvider_1.FileProvider.downloadData("TraceData.csv", blob);
            }
            this.setBusy(false);
        };
        /**
         * Exports the signal manager data(datamodel, series provider, ...)
         *
         * @private
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.exportData = function () {
            if (this._seriesProvider != undefined) { // SeriesProvider needed to export data
                try {
                    var components = this.getComponentsToExport();
                    var settingObjects = this.getSettingObjectsToExport();
                    var stringData = mceExportImportHelper_1.MceExportImportHelper.getExportData(components, settingObjects);
                    var blob = new Blob([stringData], { type: "text/html" });
                    fileProvider_1.FileProvider.downloadData("Export.mce1", blob);
                }
                catch (e) {
                    if (mceConversionError_1.MceConversionError.isMceConversionError(e)) {
                        console.error(e.toString());
                    }
                    else {
                        console.error(e);
                    }
                }
            }
            else {
                console.error("SeriesProvider for export not available!");
            }
            this.setBusy(false);
        };
        /**
         * Returns the components in a defined order which should be cleared before importing new setting
         *
         * @private
         * @returns {Array<IComponent>}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getComponentsToClear = function () {
            var componentsToClear = new Array();
            componentsToClear.push(this.dataModel); // SignalManagerDataModel
            if (this._chartManagerDataModel != undefined) {
                componentsToClear.push(this._chartManagerDataModel); // ChartManagerDataModel
            }
            if (this._seriesProvider != undefined) {
                componentsToClear.push(this._seriesProvider); // SeriesProvider must be imported first
            }
            return componentsToClear;
        };
        /**
         * Returns the components which should be exported/imported from the mce file in the given order
         *
         * @private
         * @returns {Array<IComponent>}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getComponentsToExport = function () {
            var exportComponents = new Array();
            if (this._seriesProvider != undefined) {
                exportComponents.push(this._seriesProvider); // SeriesProvider must be imported first
            }
            exportComponents.push(this.dataModel); // SignalManagerDataModel
            if (this._chartManagerDataModel != undefined) {
                exportComponents.push(this._chartManagerDataModel); // ChartManagerDataModel
            }
            return exportComponents;
        };
        /**
         * Returns all settings objects which should be exported
         *
         * @private
         * @returns {Array<ISettingsObject>}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getSettingObjectsToExport = function () {
            var settingsObjects = new Array();
            // get current cursorstates
            var cursorstates = componentDataHub_1.ComponentDataHub.readShared(this, "app::trace view chart states", "cursor states", cursorStates_1.CursorStates);
            settingsObjects.push(cursorstates);
            return settingsObjects;
        };
        /**
         * Sets the busy screen and start importing data
         *
         * @private
         * @param {Map<string, string>} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.startImport = function (args) {
            var _this = this;
            this.setBusy(true);
            // Timeout needed to show the busyscreen before importing data 
            setTimeout(function () { return _this.importData(args); }, 200);
        };
        /**
         * imports the given filedata with the given filename to the signal manager datamodel
         *
         * @private
         * @param {Map<string, string>} fileContents
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.importData = function (fileContents) {
            var _this = this;
            fileContents.forEach(function (fileData, filename) {
                if (filename.toLowerCase().endsWith(".csv")) {
                    if (_this._seriesProvider != undefined) {
                        var exportImportHelper = new exportImportHelper_1.ExportImportHelper(_this._seriesProvider);
                        var serieGroups = exportImportHelper.importTraceData(fileData, filename);
                        var signalFile_1 = new serieContainer_1.SerieContainer(filename);
                        _this.setContainerId(signalFile_1);
                        serieGroups.forEach(function (serieGroup) {
                            signalFile_1.addSerieContainer(serieGroup, -1);
                        });
                        _this._serieContainerToSelectAfterRefresh = signalFile_1;
                        _this._dataModel.addSerieContainer(signalFile_1, signalCategory_1.SignalCategory.CategoryIdImported);
                    }
                    else {
                        console.error("SeriesProvider is not available!");
                    }
                }
                else if (filename.toLowerCase().endsWith(".mce") || filename.toLowerCase().endsWith(".mce1")) {
                    try {
                        _this.importMCEFile(fileData);
                    }
                    catch (e) {
                        if (mceConversionError_1.MceConversionError.isMceConversionError(e)) {
                            console.error(e.toString());
                        }
                        else {
                            console.error(e);
                        }
                    }
                }
                else {
                    console.error("Import for file format not implemented: " + filename);
                }
            });
            this.setBusy(false);
        };
        /**
         * Returns type of message box need it (if need it)
         *
         * @private
         * @param {Map<string, string>} fileContents
         * @returns {(messageBoxType | undefined)}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.checkMessageBoxType = function (fileContents) {
            var isSignalManagerEmpty = this.isSignalManagerEmpty(this.dataModel.data);
            var isThereMCEFile = false;
            fileContents.forEach(function (fileData, filename) {
                if (filename.toLowerCase().endsWith(".mce") || filename.toLowerCase().endsWith(".mce1")) {
                    isThereMCEFile = true;
                }
            });
            if (isThereMCEFile && fileContents.size > 1) {
                return alertDialog_1.messageBoxType.Warning;
            }
            else if (isThereMCEFile && !isSignalManagerEmpty) {
                return alertDialog_1.messageBoxType.YesNo;
            }
            else {
                return undefined;
            }
        };
        /**
         * Returns true if there is nothing in the signalManager
         *
         * @private
         * @param {*} data
         * @returns {boolean}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.isSignalManagerEmpty = function (data) {
            var isEmpty = true;
            for (var i = 0; i < data.length; i++) {
                if (data[i].childs.length > 0) {
                    isEmpty = false;
                    break;
                }
            }
            return isEmpty;
        };
        /**
         * Deletes all trace data and imports the .mce file
         *
         * @private
         * @param {*} data
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.importMCEFile = function (fileData) {
            if (this._seriesProvider) { // serie provider needed to import data
                this.enableTreeGridRefresh(false);
                // Clear components with the given order
                var componentsToClear = this.getComponentsToClear();
                mceExportImportHelper_1.MceExportImportHelper.clearComponents(componentsToClear);
                // Set the import data to the components in the given order
                var exportContainer = exportContainer_1.ExportContainer.fromJson(fileData);
                var components = this.getComponentsToExport(); // Import and Export components are the same so we can use the export components array
                var settingObjects = this.getSettingObjectsToExport(); // Import and Export objects are the same so we can use the export settings object array
                mceExportImportHelper_1.MceExportImportHelper.setImportData(components, settingObjects, exportContainer);
                this.enableTreeGridRefresh(true);
                this.refresh();
            }
            else {
                console.error("SeriesProvider for import not available!");
            }
        };
        /**
         * Selects the given container in the tree grid and scrolls to it if out of the window (TODO: Move to BaseClass incl. _serieContainerToSelectAfterRefresh)
         *
         * @private
         * @param {(ISerieContainer|undefined)} container
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.selectItem = function (container) {
            var treeObject = this.getTreeGridObject();
            var record = treeObject.model.flatRecords.filter(function (record) { return record.item === container; })[0];
            if (record != undefined) {
                // expand parent node if it is collapsed to see the new imported trace data
                if (record.parentItem.expandState == false) {
                    treeObject.expandCollapseRow(record.parentItem.index);
                }
                // treeObject.scrollOffset not possible if there would be some free space after the last item in the tree grid after scrolling to the given item
                // => scrollToBottom befor scroll to a special offset if possible
                treeObject.scrollToBottom();
                treeObject.setModel({ "selectedRowIndex": record.index });
                var rowHeight = treeObject.model.rowHeight;
                // scroll index not the same as the selectedIndex => collapsed nodes must be considered
                var scrollIndex = this.getScrollIndex(treeObject.model.flatRecords, record.index);
                var scrollOffset = (scrollIndex - 1) * rowHeight;
                treeObject.scrollOffset(0, scrollOffset); // Use parent index to see the parent node in the view
                //(<any>treeObject).updateScrollBar();
            }
        };
        /**
         * Returns the index of only the visible(expanded) rows
         *
         * @private
         * @param {Array<any>} rows
         * @param {number} rowIndex
         * @returns {number}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getScrollIndex = function (rows, rowIndex) {
            var scrollIndex = 0;
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].index == rowIndex) {
                    scrollIndex++;
                    return scrollIndex;
                }
                /*if(rows[i].item instanceof SerieGroup){
                    if(this.isVisibleSerieGroupNode(rows[i]) == false){
                        continue;
                    }
                    scrollIndex++;
                }
                else */ if (rows[i].item instanceof serieContainer_1.SerieContainer) {
                    if (this.isVisibleSerieGroupNode(rows[i]) == false) {
                        continue;
                    }
                    scrollIndex++;
                }
                else if (rows[i].item instanceof serieNode_1.SerieNode) {
                    if (this.isVisibleSerieNode(rows[i]) == false) {
                        continue;
                    }
                    scrollIndex++;
                }
            }
            return scrollIndex;
        };
        /**
         * Set unique id for imported data
         *
         * @private
         * @param {SerieContainer} serieContainer
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.setContainerId = function (serieContainer) {
            serieContainer.id = this.getUniqueId();
        };
        /**
         * Returns a unique id for the imported serieContainer
         *
         * @private
         * @returns
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getUniqueId = function () {
            var importedDataIds = this.getImportedDataIds();
            for (var i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
                var id = i.toString();
                if (importedDataIds.includes(id) == false) {
                    return id;
                }
            }
            console.error("No unique id for serieContainer available!");
            return "";
        };
        /**
         * Returns an array of all ids from the imported from file category
         *
         * @private
         * @returns {Array<string>}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getImportedDataIds = function () {
            var ids = [];
            var signalCategory = this._dataModel.getSignalCategory(signalCategory_1.SignalCategory.CategoryIdImported);
            signalCategory.getChilds().forEach(function (child) {
                ids.push(child.id);
            });
            return ids;
        };
        SignalManagerWidget.prototype.isVisibleSerieGroupNode = function (node) {
            if (node.parentItem != null) {
                if (node.parentItem.expandState == false) {
                    return false;
                }
                else if (node.parentItem.parentItem != undefined) {
                    if (node.parentItem.parentItem.expandState == false) {
                        return false;
                    }
                }
            }
            return true;
        };
        SignalManagerWidget.prototype.isVisibleSerieNode = function (node) {
            if (node.parentItem.expandState == false || node.parentItem.parentItem.expandState == false) {
                return false;
            }
            else if (node.parentItem.parentItem.parentItem != undefined) {
                if (node.parentItem.parentItem.parentItem.expandState == false) {
                    return false;
                }
            }
            return true;
        };
        SignalManagerWidget.prototype.treeGridNodeExpandedOrCollapsed = function () {
            // Refresh to see correct expanded/collapsed icon
            this.refresh();
            //Persist data model (expandState)
            if (this._dataModel !== undefined) {
                this._dataModel.saveSettings();
            }
            this.saveTreeGridSettings();
        };
        /**
         * Returns the column template informations
         *
         * @private
         * @param {string} columnId
         * @returns {string}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getColumnTemplateData = function (columnId) {
            if (columnId == SignalManagerWidget.colorColumnId) {
                return "<script type=\"text/x-jsrender\" id=\"smColorColumnTemplate\">\n\t\t\t\t\t\t<div style='height:20px;padding-left:7px;padding-top:4px;' unselectable='on'>\n\t\t\t\t\t\t\t<div class='e-cell' style='display:inline-block;width:17px;height:17px;background-color: {{:#data['color']}};' unselectable='on'></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</script>";
            }
            else if (columnId == SignalManagerWidget.nameColumnId) {
                return "<script type=\"text/x-jsrender\" id=\"smNameColumnTemplate\">\n\t\t\t\t\t\t<div style='height:20px;' unselectable='on'>\n\t\t\t\t\t\t\t{{if hasChildRecords}}\n\t\t\t\t\t\t\t\t<div class='intend' style='height:1px; float:left; width:{{:level*10}}px; display:inline-block;'></div>\n\t\t\t\t\t\t\t{{else !hasChildRecords}}\n\t\t\t\t\t\t\t\t<div class='intend' style='height:1px; float:left; width:{{:level*10}}px; display:inline-block;'></div>\n\t\t\t\t\t\t\t{{/if}}\n\t\t\t\t\t\t\t{{:#data['iconDefinition']}}\n\t\t\t\t\t\t\t<div class='e-cell' style='display:inline-block;width:100%' unselectable='on'>{{:#data['name']}}</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</script>";
            }
            return "";
        };
        /**
         * Raises the series double click event
         *
         * @private
         * @param {BaseSeries} series
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.onSeriesDoubleClicked = function (series) {
            this.eventSerieDoubleClicked.raise(this, series);
        };
        /**
         * Raises the change size event
         *
         * @private
         * @param {number} size
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.onChangeSize = function (size) {
            this.eventChangeSize.raise(this, size);
        };
        /**
         * Mouse is not over signalManager while dragging operation
         *
         * @param {DragDropArgs} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.dropFocusLost = function (args) {
            this.resetHighlightArea();
        };
        // column definitions
        SignalManagerWidget.nameColumnId = "name";
        SignalManagerWidget.valueColumnId = "value";
        SignalManagerWidget.descriptionColumnId = "description";
        SignalManagerWidget.colorColumnId = "color";
        SignalManagerWidget.iconDefinitionColumnId = "iconDefinition";
        return SignalManagerWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.SignalManagerWidget = SignalManagerWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlcldpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9zaWduYWxNYW5hZ2VyV2lkZ2V0L3NpZ25hbE1hbmFnZXJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBK0NBO1FBQXNDLDJDQUE0QztRQUFsRjs7UUFBb0YsQ0FBQztRQUFELDhCQUFDO0lBQUQsQ0FBQyxBQUFyRixDQUFzQyxtQkFBVSxHQUFxQztJQUFBLENBQUM7SUFDdEY7UUFBOEIsbUNBQXdDO1FBQXRFOztRQUF3RSxDQUFDO1FBQUQsc0JBQUM7SUFBRCxDQUFDLEFBQXpFLENBQThCLG1CQUFVLEdBQWlDO0lBQUEsQ0FBQztJQUUxRTtRQUFrQyx1Q0FBa0I7UUFBcEQ7WUFBQSxxRUE4ckRDO1lBcnJEaUIsc0JBQWdCLEdBQUcsMkJBQTJCLENBQUM7WUFFL0MseUJBQW1CLEdBQUcsd0RBQXdELENBQUM7WUFDL0Usd0JBQWtCLEdBQUcsdUJBQXVCLENBQUM7WUFDN0MsNkJBQXVCLEdBQUcsaUJBQWlCLENBQUE7WUFDM0MsOEJBQXdCLEdBQUcsK0VBQStFLENBQUE7WUFDMUcsNkJBQXVCLEdBQUcsd0JBQXdCLENBQUM7WUFDbkQsOEJBQXdCLEdBQUcsZ0VBQWdFLENBQUM7WUFFckcsb0JBQWMsR0FBWSxJQUFJLENBQUM7WUFFL0IscUJBQWUsR0FBa0IsRUFBRSxDQUFDO1lBVXBDLG1CQUFhLEdBQUcsSUFBSSwyQkFBWSxFQUFFLENBQUM7WUFNcEMsb0JBQWMsR0FBWSxLQUFLLENBQUM7WUFFL0Isc0JBQWdCLEdBQVcsR0FBRyxDQUFDO1lBQy9CLGVBQVMsR0FBVyxHQUFHLENBQUM7WUFJaEMsNkJBQXVCLEdBQUcsSUFBSSx1QkFBdUIsRUFBRSxDQUFDO1lBRXhELHFCQUFlLEdBQUcs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b250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9saWJzL3VpL1R5cGVzL2VqLndlYi5hbGwuZC50c1wiIC8+XHJcbmltcG9ydCB7IEV2ZW50TW9kZWxDaGFuZ2VkQXJncywgSURhdGFNb2RlbCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRyZWVHcmlkV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vdHJlZUdyaWRXaWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IFNlcmllR3JvdXAgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9zaWduYWwvc2VyaWVHcm91cFwiO1xyXG5pbXBvcnQgeyBJU2lnbmFsTWFuYWdlckRhdGFNb2RlbCwgSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGF0YU1vZGVsc1wiO1xyXG5pbXBvcnQgeyBTbVRyZWVHcmlkQ2VsbEVkaXRFdmVudHMgfSBmcm9tIFwiLi92aWV3L3NtVHJlZUdyaWRDZWxsRWRpdEV2ZW50c1wiO1xyXG5pbXBvcnQgeyBTbVRyZWVHcmlkQ2VsbEVkaXRUZW1wbGF0ZSB9IGZyb20gXCIuL3ZpZXcvc21UcmVlR3JpZENlbGxFZGl0VGVtcGxhdGVcIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlclRyZWVHcmlkVG9vbGJhciB9IGZyb20gXCIuL3ZpZXcvc2lnbmFsTWFuYWdlclRyZWVHcmlkVG9vbGJhclwiO1xyXG5pbXBvcnQgeyBGaWxlUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ZpbGVQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuaW1wb3J0IHsgRXhwb3J0SW1wb3J0SGVscGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9leHBvcnRJbXBvcnRIZWxwZXJcIjtcclxuaW1wb3J0IHsgQnVzeUluZm9ybWF0aW9uLCBJbWFnZUlkIH0gZnJvbSBcIi4uL2NvbW1vbi9idXN5SW5mb3JtYXRpb25cIjtcclxuaW1wb3J0IHsgSVNpZ25hbE1hbmFnZXJXaWRnZXQgfSBmcm9tIFwiLi4vd2lkZ2V0c1wiO1xyXG5pbXBvcnQgeyBTaWduYWxDYXRlZ29yeSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxDYXRlZ29yeVwiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uXCI7XHJcbmltcG9ydCB7IElTZXJpZUNvbnRhaW5lciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL2ludGVyZmFjZXMvc2VyaWVDb250YWluZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNlcmllTm9kZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL2ludGVyZmFjZXMvc2VyaWVOb2RlSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNlcmllQ29udGFpbmVyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vc2lnbmFsL3NlcmllQ29udGFpbmVyXCI7XHJcbmltcG9ydCB7IFNlcmllTm9kZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3NpZ25hbC9zZXJpZU5vZGVcIjtcclxuaW1wb3J0IHsgRHJhZ0Ryb3BEYXRhSWQsIElEcm9wcGFibGUgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvZHJvcEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJRHJhZ2dhYmxlIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL2RyYWdJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgRHJhZ0Ryb3BEYXRhT2JqZWN0IH0gZnJvbSBcIi4uL2NvbW1vbi9kcmFnRGF0YU9iamVjdFwiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vc2VyaWVzL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhIH0gZnJvbSBcIi4uLy4uL21vZGVscy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YVwiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhIH0gZnJvbSBcIi4uLy4uL21vZGVscy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGFcIjtcclxuaW1wb3J0IHsgRHJhZ0Ryb3BSZXByZXNlbnRhdGlvbiB9IGZyb20gXCIuLi9jb21tb24vZHJhZ0Ryb3BSZXByZXNlbnRhdGlvblwiO1xyXG5pbXBvcnQgeyBEcmFnRHJvcEFyZ3MgfSBmcm9tIFwiLi4vY29tbW9uL2RyYWdEcm9wQXJnc1wiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlXCI7XHJcbmltcG9ydCB7IFNlcmllc1R5cGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXMvc2VyaWVzVHlwZVwiO1xyXG5pbXBvcnQgeyBFeHBvcnRTZXJpZUdyb3VwIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9leHBvcnRTZXJpZUdyb3VwXCI7XHJcbmltcG9ydCB7IEV4cG9ydEhlbHBlciB9IGZyb20gXCIuL2hlbHBlcnMvZXhwb3J0SGVscGVyXCI7XHJcbmltcG9ydCB7IEFsZXJ0RGlhbG9nLCBtZXNzYWdlQm94VHlwZSB9IGZyb20gXCIuLi9jb21tb24vYWxlcnREaWFsb2dcIjtcclxuaW1wb3J0IHsgU2lnbmFsUm9vdCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxSb290XCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uIH0gZnJvbSBcIi4vY29tcG9uZW50RGVmYXVsdERlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vd2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBJU2VyaWVzUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXNQcm92aWRlci9zZXJpZXNQcm92aWRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJSW1hZ2VQcm92aWRlciB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9pbWFnZVByb3ZpZGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFBlcnNpc3REYXRhUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL3BlcnNpc3REYXRhUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgRXhwb3J0Q29udGFpbmVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9leHBvcnRDb250YWluZXJcIjtcclxuaW1wb3J0IHsgTWNlQ29udmVyc2lvbkVycm9yIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9tY2VDb252ZXJzaW9uRXJyb3JcIjtcclxuaW1wb3J0IHsgTWNlRXhwb3J0SW1wb3J0SGVscGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9tY2VFeHBvcnRJbXBvcnQvbWNlRXhwb3J0SW1wb3J0SGVscGVyXCI7XHJcbmltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvaW50ZXJmYWNlcy9jb21wb25lbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNldHRpbmdzT2JqZWN0IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzT2JqZWN0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudERhdGFIdWIgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2NvbXBvbmVudEh1Yi9jb21wb25lbnREYXRhSHViXCI7XHJcbmltcG9ydCB7IEN1cnNvclN0YXRlcyB9IGZyb20gXCIuLi9jb21tb24vc3RhdGVzL2N1cnNvclN0YXRlc1wiO1xyXG5cclxuY2xhc3MgRXZlbnRTZXJpZURvdWJsZUNsaWNrZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PElTaWduYWxNYW5hZ2VyV2lkZ2V0LCBCYXNlU2VyaWVzPnsgfTtcclxuY2xhc3MgRXZlbnRDaGFuZ2VTaXplIGV4dGVuZHMgVHlwZWRFdmVudDxJU2lnbmFsTWFuYWdlcldpZGdldCwgbnVtYmVyPnsgfTtcclxuXHJcbmNsYXNzIFNpZ25hbE1hbmFnZXJXaWRnZXQgZXh0ZW5kcyBUcmVlR3JpZFdpZGdldEJhc2UgaW1wbGVtZW50cyBJU2lnbmFsTWFuYWdlcldpZGdldCwgSURyYWdnYWJsZSwgSURyb3BwYWJsZXtcclxuXHRcclxuXHQvLyBjb2x1bW4gZGVmaW5pdGlvbnNcclxuXHRwdWJsaWMgc3RhdGljIHJlYWRvbmx5IG5hbWVDb2x1bW5JZCA9IFwibmFtZVwiO1xyXG5cdHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgdmFsdWVDb2x1bW5JZCA9IFwidmFsdWVcIjtcclxuXHRwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGRlc2NyaXB0aW9uQ29sdW1uSWQgPSBcImRlc2NyaXB0aW9uXCI7XHJcblx0cHVibGljIHN0YXRpYyByZWFkb25seSBjb2xvckNvbHVtbklkID0gXCJjb2xvclwiO1xyXG5cdHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgaWNvbkRlZmluaXRpb25Db2x1bW5JZCA9IFwiaWNvbkRlZmluaXRpb25cIjtcclxuXHJcblx0cHJpdmF0ZSByZWFkb25seSBfaGlnaGxpZ2h0QXJlYUlkID0gXCJzaWduYWxNYW5hZ2VyX0hpZ2hsaWdodGVkXCI7XHJcblxyXG5cdHByaXZhdGUgcmVhZG9ubHkgX2RlbGV0ZUl0ZW1zQ29udGVudCA9IFwiVGhpcyBhY3Rpb24gd2lsbCBwZXJtYW5lbnRseSBkZWxldGUgc2VsZWN0ZWQgZWxlbWVudHMuXCI7XHJcblx0cHJpdmF0ZSByZWFkb25seSBfZGVsZXRlSXRlbXNIZWFkZXIgPSBcIkRlbGV0ZSByZWNvcmRlZCBkYXRhP1wiO1xyXG5cdHByaXZhdGUgcmVhZG9ubHkgX3dhcm5pbmdJbXBvcnRpbmdIZWFkZXIgPSBcIkltcG9ydCBjYW5jZWxlZFwiXHJcblx0cHJpdmF0ZSByZWFkb25seSBfd2FybmluZ0ltcG9ydGluZ0NvbnRlbnQgPSBcIkl0IGlzIG5vdCBwb3NzaWJsZSB0byBpbXBvcnQgb25lIC5tY2UgZmlsZSB3aXRoIG90aGVyIGZpbGVzIGF0IHRoZSBzYW1lIHRpbWUuXCIgXHJcblx0cHJpdmF0ZSByZWFkb25seSBfTUNFRmlsZXNJbXBvcnRlZEhlYWRlciA9IFwiRGVsZXRlIGFsbCB0cmFjZSBkYXRhP1wiO1xyXG5cdHByaXZhdGUgcmVhZG9ubHkgX01DRUZpbGVzSW1wb3J0ZWRDb250ZW50ID0gXCJEbyB5b3Ugd2FudCB0byBkZWxldGUgYWxsIHRyYWNlIGRhdGEgYW5kIGltcG9ydCB0aGUgLm1jZSBmaWxlP1wiO1xyXG5cclxuXHRwcml2YXRlIF9pc0ZpcnN0UmVzaXplOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcblx0cHJpdmF0ZSBfaW5kZXhlc0RyYWdnZWQ6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuXHJcblx0cHJpdmF0ZSBfY3VycmVudERyYWdEcm9wU2VyaWVzPzogQXJyYXk8QmFzZVNlcmllcz47XHJcblxyXG5cdHByaXZhdGUgX2N1cnJlbnRDYWxjdWxhdG9yVHlwZT86IFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZTtcclxuXHJcblx0cHJvdGVjdGVkIF90b29sYmFyITogU2lnbmFsTWFuYWdlclRyZWVHcmlkVG9vbGJhcjtcclxuXHJcblx0cHJpdmF0ZSBfc2VyaWVDb250YWluZXJUb1NlbGVjdEFmdGVyUmVmcmVzaDogSVNlcmllQ29udGFpbmVyfHVuZGVmaW5lZDtcclxuXHRcdFxyXG5cdHByaXZhdGUgX2ZpbGVQcm92aWRlciA9IG5ldyBGaWxlUHJvdmlkZXIoKTtcclxuXHJcblx0cHJpdmF0ZSBfc2VyaWVzUHJvdmlkZXI6IElTZXJpZXNQcm92aWRlcnx1bmRlZmluZWQ7XHJcblxyXG5cdHByaXZhdGUgX2NoYXJ0TWFuYWdlckRhdGFNb2RlbDogSUNoYXJ0TWFuYWdlckRhdGFNb2RlbHx1bmRlZmluZWQ7XHJcblxyXG5cdHB1YmxpYyBlZGl0TW9kZUFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHRwcml2YXRlIF93aWR0aERpZmZlcmVuY2U6IG51bWJlciA9IDQ1MDtcclxuXHRwcml2YXRlIF9taW5XaWR0aDogbnVtYmVyID0gMjUwO1xyXG5cclxuXHRfY3VycmVudFRhcmdldDtcclxuXHJcblx0ZXZlbnRTZXJpZURvdWJsZUNsaWNrZWQgPSBuZXcgRXZlbnRTZXJpZURvdWJsZUNsaWNrZWQoKTtcclxuXHRcclxuXHRldmVudENoYW5nZVNpemUgPSBuZXcgRXZlbnRDaGFuZ2VTaXplKCk7XHJcblx0XHJcblx0cHJpdmF0ZSBfdXBsb2FkRGF0YUZpbmlzaGVkSGFuZGxlciA9IChzZW5kZXIsYXJncyk9PnRoaXMub25VcGxvYWREYXRhRmluaXNoZWQoc2VuZGVyLGFyZ3MpO1xyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBpbmZvcm1hdGlvbiBpZiB0aGUgYXV0byB1cGxvYWQgb2YgdHJhY2VkYXRhIGlzIGFjdGl2ZVxyXG5cdCAqXHJcblx0ICogQHJlYWRvbmx5XHJcblx0ICogQHR5cGUge2Jvb2xlYW59XHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRnZXQgYXV0b1VwbG9hZEFjdGl2ZSgpOmJvb2xlYW57XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG4gICAgICogRGVmaW5lcyB0aGUgaGVpZ2h0IG9mIHRoZSBoZWFkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZGVmaW5lSGVhZGVySGVpZ2h0KCk6IG51bWJlcntcclxuICAgICAgICByZXR1cm4gMzA7XHJcbiAgICB9XHJcblx0XHJcblx0aW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG5cdFx0dGhpcy5jb21wb25lbnQuc2V0RGVmYXVsdERlZmluaXRpb24obmV3IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uKCkpO1xyXG5cdH1cclxuXHRcclxuXHRpbml0aWFsaXplZCgpe1xyXG5cdFx0c3VwZXIuaW5pdGlhbGl6ZWQoKTtcclxuXHJcblx0XHR0aGlzLmluaXRTaWduYWxNYW5hZ2VyRGF0YU1vZGVsKCk7XHJcblx0XHR0aGlzLmluaXRTZXJpZXNQcm92aWRlcigpO1xyXG5cdFx0dGhpcy5pbml0Q2hhcnRNYW5hZ2VyRGF0YU1vZGVsKCk7IFxyXG5cdFx0dGhpcy5yZWZyZXNoKCk7XHJcblx0XHRcclxuXHRcdHN1cGVyLnNldEhlYWRlckNvbnRlbnQoXCJTaWduYWxzXCIpO1xyXG5cclxuXHRcdC8vIFNldCBkeW5hbWljIGNvbHVtbiBzZXR0aW5nc1xyXG5cdFx0c3VwZXIuc2V0RHluYW1pY0NvbHVtbigwLCA0MCk7XHJcblxyXG5cdFx0Ly8gSW5pdGlhbGl6ZSBzY3JvbGxiYXJzIHBvc2l0aW9uc1xyXG5cdFx0bGV0IHNjcm9sbGJhclNldHRpbmdzID0gdGhpcy5jb21wb25lbnQuZ2V0U2V0dGluZyhUcmVlR3JpZFdpZGdldEJhc2UuU2Nyb2xsYmFyc1NldHRpbmdzSWQpO1xyXG5cdFx0dGhpcy5zZXRTY3JvbGxCYXJTZXR0aW5ncyhzY3JvbGxiYXJTZXR0aW5ncyk7XHJcblx0XHRcclxuXHRcdC8vIEFkZCBkcmFnIHN1cHBvcnRcclxuXHRcdHN1cGVyLmFkZERyYWdnaW5nU3VwcG9ydCgpO1xyXG5cdFx0XHJcblx0XHQvLyBBZGQgZHJvcCBzdXBwb3J0XHJcblx0XHRzdXBlci5hZGRTdXBwb3J0ZWREcmFnRHJvcERhdGFJZChEcmFnRHJvcERhdGFJZC5zaWduYWwpXHJcblx0fVxyXG5cclxuXHRkaXNwb3NlKCl7XHJcblx0XHR0aGlzLnJlbW92ZVN1cHBvcnRlZERyYWdEcm9wRGF0YUlkKERyYWdEcm9wRGF0YUlkLnNpZ25hbCk7XHJcblx0XHRzdXBlci5kaXNwb3NlKCk7XHJcblx0fVxyXG5cdCBcclxuXHQvLyNyZWdpb24gZHJhZyBzdXBwb3J0XHJcblx0c3RhcnREcmFnZ2luZygpOiBEcmFnRHJvcERhdGFPYmplY3R8dW5kZWZpbmVke1xyXG5cdFx0aWYodGhpcy5fY3VycmVudERyYWdEcm9wU2VyaWVzICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdGxldCBzaWduYWxJbWFnZSxcclxuXHRcdFx0XHRzaWduYWxOYW1lO1xyXG5cdFx0XHRcclxuXHRcdFx0bGV0IGltYWdlUHJvdmlkZXIgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uSW1hZ2VQcm92aWRlcklkKSBhcyBJSW1hZ2VQcm92aWRlcjtcclxuXHRcdFx0aWYgKHRoaXMuX2N1cnJlbnREcmFnRHJvcFNlcmllcy5sZW5ndGggPT0gMSkge1xyXG5cdFx0XHRcdC8vIERlZmF1bHQgeXQgc2VyaWVzIHN2Z1xyXG5cdFx0XHRcdHNpZ25hbE5hbWUgPSB0aGlzLl9jdXJyZW50RHJhZ0Ryb3BTZXJpZXNbMF0ubmFtZTtcclxuXHRcdFx0XHRpZihpbWFnZVByb3ZpZGVyICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdFx0XHRzaWduYWxJbWFnZSA9IGltYWdlUHJvdmlkZXIuZ2V0SW1hZ2UoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL3l0U2VyaWVzLnN2Z1wiKTtcclxuXHRcdFx0XHRcdGlmKHRoaXMuX2N1cnJlbnREcmFnRHJvcFNlcmllc1swXS50eXBlID09IFNlcmllc1R5cGUueHlTZXJpZXMpe1xyXG5cdFx0XHRcdFx0XHQvLyBVc2UgeHkgc2VyaWVzIHN2Z1xyXG5cdFx0XHRcdFx0XHRzaWduYWxJbWFnZSA9IGltYWdlUHJvdmlkZXIuZ2V0SW1hZ2UoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL3h5U2VyaWVzLnN2Z1wiKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2UgaWYodGhpcy5fY3VycmVudERyYWdEcm9wU2VyaWVzWzBdLnR5cGUgPT0gU2VyaWVzVHlwZS5mZnRTZXJpZXMpe1xyXG5cdFx0XHRcdFx0XHQvLyBVc2UgZmZ0IHNlcmllcyBzdmdcclxuXHRcdFx0XHRcdFx0c2lnbmFsSW1hZ2UgPSBpbWFnZVByb3ZpZGVyLmdldEltYWdlKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9mZnRTZXJpZXMuc3ZnXCIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYoc2lnbmFsSW1hZ2UgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0XHRcdFx0Ly8gUmVwbGFjZSBzZXJpZSBjb2xvciBpbiBzdmcgd2l0aCBjb2xvciBvZiBjdXJyZW50IHNlcmllXHJcblx0XHRcdFx0XHRcdHNpZ25hbEltYWdlID0gc2lnbmFsSW1hZ2UucmVwbGFjZShcInN0cm9rZTojNzZiZWE2XCIsIFwic3Ryb2tlOlwiICsgdGhpcy5fY3VycmVudERyYWdEcm9wU2VyaWVzWzBdLmNvbG9yKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0aWYoaW1hZ2VQcm92aWRlciAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRcdFx0aWYodGhpcy5fY3VycmVudERyYWdEcm9wU2VyaWVzWzBdLnR5cGUgPT0gU2VyaWVzVHlwZS54eVNlcmllcyl7XHJcblx0XHRcdFx0XHRcdHNpZ25hbEltYWdlID0gaW1hZ2VQcm92aWRlci5nZXRJbWFnZShcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3Avc2V2ZXJhbFhZU2VyaWVzLnN2Z1wiKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2UgaWYodGhpcy5fY3VycmVudERyYWdEcm9wU2VyaWVzWzBdLnR5cGUgPT0gU2VyaWVzVHlwZS5mZnRTZXJpZXMpe1xyXG5cdFx0XHRcdFx0XHRzaWduYWxJbWFnZSA9IGltYWdlUHJvdmlkZXIuZ2V0SW1hZ2UoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL3NldmVyYWxGRlRTZXJpZXMuc3ZnXCIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRcdHNpZ25hbEltYWdlID0gaW1hZ2VQcm92aWRlci5nZXRJbWFnZShcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3Avc2V2ZXJhbFlUU2VyaWVzLnN2Z1wiKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0bGV0IGRyYWdEcm9wSWNvblJlcHJlc2VudGF0aW9uID0gbmV3IERyYWdEcm9wUmVwcmVzZW50YXRpb24oKTtcclxuXHRcdFx0ZHJhZ0Ryb3BJY29uUmVwcmVzZW50YXRpb24uaWNvbkxpc3QucHVzaChzaWduYWxJbWFnZSk7XHJcblx0XHRcdGRyYWdEcm9wSWNvblJlcHJlc2VudGF0aW9uLnRleHRMaXN0LnB1c2goc2lnbmFsTmFtZSk7XHJcblx0XHRcdHJldHVybiBuZXcgRHJhZ0Ryb3BEYXRhT2JqZWN0KERyYWdEcm9wRGF0YUlkLnNpZ25hbCwgdGhpcy5fY3VycmVudERyYWdEcm9wU2VyaWVzLCBkcmFnRHJvcEljb25SZXByZXNlbnRhdGlvbik7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xyXG5cdH1cclxuXHRcclxuXHRkcmFnZ2luZ1N0b3BwZWQoKXtcclxuXHRcdC8vIFJlc2V0IGN1cnJlbnQgZHJhZyBkcm9wIHNpZ25hbFxyXG5cdFx0dGhpcy5fY3VycmVudERyYWdEcm9wU2VyaWVzID0gdW5kZWZpbmVkO1xyXG5cdFx0dGhpcy5fY3VycmVudENhbGN1bGF0b3JUeXBlID0gdW5kZWZpbmVkO1xyXG5cdFx0dGhpcy5faW5kZXhlc0RyYWdnZWQgPSBbXTtcclxuXHR9XHJcblx0Ly8jZW5kcmVnaW9uXHJcblxyXG5cdC8vI3JlZ2lvbiBkcm9wIHN1cHBvcnRcclxuXHRwcml2YXRlIGFkZERyb3BMb2NhdGlvbnMoc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPil7XHJcbiAgICAgICAgaWYgKHNlcmllc1swXS5wYXJlbnQgIT0gdW5kZWZpbmVkICYmIHNlcmllcy5sZW5ndGggPT0gMSkge1xyXG5cdFx0XHRzZXJpZXNbMF0ucGFyZW50LnZpc2libGVDaGlsZHMhLmZvckVhY2goY2hpbGQgPT4ge1xyXG5cdFx0XHRcdGlmKGNoaWxkIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uKXtcclxuXHRcdFx0XHRcdGNoaWxkLnNldERyb3BMb2NhdGlvbnModHJ1ZSwgc2VyaWVzWzBdKTtcclxuXHRcdFx0XHR9XHRcdFx0XHRcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHJlbW92ZURyb3BMb2NhdGlvbnMoc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPil7XHJcblx0XHRpZiAoc2VyaWVzWzBdLnBhcmVudCAhPSB1bmRlZmluZWQgJiYgc2VyaWVzLmxlbmd0aCA9PSAxKSB7XHJcblx0XHRcdHNlcmllc1swXS5wYXJlbnQudmlzaWJsZUNoaWxkcyEuZm9yRWFjaChjaGlsZCA9PiB7XHJcblx0XHRcdFx0aWYoY2hpbGQgaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24pe1xyXG5cdFx0XHRcdFx0Y2hpbGQuc2V0RHJvcExvY2F0aW9ucyhmYWxzZSwgc2VyaWVzWzBdKTtcclxuXHRcdFx0XHR9XHRcdFx0XHRcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRkcmFnU3RhcnQoYXJnczogRHJhZ0Ryb3BBcmdzKSB7XHJcblx0XHRsZXQgc2VyaWVzID0gYXJncy5kYXRhIGFzIEFycmF5PEJhc2VTZXJpZXM+O1xyXG5cdFx0XHJcblx0XHQvLyBBZGQgcG9zc2libGUgZHJvcExvY2F0aW9uc1xyXG5cdFx0dGhpcy5hZGREcm9wTG9jYXRpb25zKHNlcmllcyk7XHJcblx0XHRcclxuXHRcdC8vIFVwZGF0ZSB0cmVlR3JpZFxyXG5cdFx0dGhpcy5yZWZyZXNoKCk7XHJcblxyXG5cdFx0bGV0IHRyZWVHcmlkT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG5cdFx0dGhpcy51cGRhdGVTZXJpZVNlbGVjdGlvbih0cmVlR3JpZE9iaiwgdGhpcy5faW5kZXhlc0RyYWdnZWQpO1xyXG5cdH1cclxuXHJcblx0ZHJhZ1N0b3AoYXJnczogRHJhZ0Ryb3BBcmdzKSB7XHJcblx0XHRsZXQgc2VyaWVzID0gYXJncy5kYXRhIGFzIEFycmF5PEJhc2VTZXJpZXM+O1xyXG5cdFx0XHJcblx0XHQvLyBSZW1vdmUgcG9zc2libGUgZHJvcExvY2F0aW9uc1xyXG5cdFx0dGhpcy5yZW1vdmVEcm9wTG9jYXRpb25zKHNlcmllcyk7XHJcblxyXG5cdFx0Ly8gVXBkYXRlIHRyZWVHcmlkXHJcblx0XHR0aGlzLnJlZnJlc2goKTtcclxuXHRcdFxyXG5cdFx0bGV0IHRyZWVHcmlkT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG5cdFx0dGhpcy51cGRhdGVTZXJpZVNlbGVjdGlvbih0cmVlR3JpZE9iaiwgdGhpcy5faW5kZXhlc0RyYWdnZWQpO1xyXG5cdH1cclxuXHJcblx0ZHJhZ092ZXIoYXJnczogRHJhZ0Ryb3BBcmdzKTogYm9vbGVhbiB7XHJcblx0XHRsZXQgY2FsY3VsYXRpb25JbnB1dEl0ZW0gPSAgdGhpcy5nZXRDYWxjdWxhdGlvbklucHV0RnJvbURyb3BMb2NhdGlvbihhcmdzLmN1cnJlbnRUYXJnZXQpO1xyXG5cdFx0XHJcblx0XHRpZihjYWxjdWxhdGlvbklucHV0SXRlbSAhPSB1bmRlZmluZWQgJiYgY2FsY3VsYXRpb25JbnB1dEl0ZW0uZHJvcFBvc3NpYmxlID09IHRydWUpe1xyXG5cdFx0XHR0aGlzLmFkZEhpZ2hsaWdodGVkQXJlYShhcmdzLmN1cnJlbnRUYXJnZXQpO1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLnJlc2V0SGlnaGxpZ2h0QXJlYSgpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0ZHJvcChhcmdzOiBEcmFnRHJvcEFyZ3MpIHtcclxuXHRcdGxldCBzZXJpZXMgPSBhcmdzLmRhdGFbMF0gYXMgQmFzZVNlcmllcztcclxuXHRcdGxldCBjYWxjdWxhdGlvbklucHV0VGFyZ2V0ID0gIHRoaXMuZ2V0Q2FsY3VsYXRpb25JbnB1dEZyb21Ecm9wTG9jYXRpb24oYXJncy5jdXJyZW50VGFyZ2V0KTtcclxuXHRcdGxldCBjYWxjdWxhdGlvbklucHV0RHJhZ2dlZEl0ZW0gPSB0aGlzLmdldENhbGN1bGF0aW9uSW5wdXREcmFnZ2VkKHNlcmllcyk7XHJcblxyXG5cdFx0aWYoY2FsY3VsYXRpb25JbnB1dFRhcmdldCAhPSB1bmRlZmluZWQgJiYgY2FsY3VsYXRpb25JbnB1dFRhcmdldC5kcm9wUG9zc2libGUgPT0gdHJ1ZSl7XHJcblx0XHRcdGlmKHNlcmllcyAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRcdC8vRXhjaGFuZ2Ugb2Ygc2VyaWUgaWYgdGhlIGRyYWdnZWQgc2VyaWUgaXMgaW5zaWRlIHRoZSBjYWxjdWxhdG9yXHJcblx0XHRcdFx0aWYgKHRoaXMuX2N1cnJlbnRDYWxjdWxhdG9yVHlwZSA9PSBjYWxjdWxhdGlvbklucHV0VGFyZ2V0LnBhcmVudCAmJiBjYWxjdWxhdGlvbklucHV0RHJhZ2dlZEl0ZW0gIT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRsZXQgb2xkVmFsdWUgPSBjYWxjdWxhdGlvbklucHV0VGFyZ2V0LnZhbHVlO1xyXG5cdFx0XHRcdFx0Y2FsY3VsYXRpb25JbnB1dERyYWdnZWRJdGVtIS52YWx1ZSA9IG9sZFZhbHVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjYWxjdWxhdGlvbklucHV0VGFyZ2V0LnZhbHVlID0gc2VyaWVzLm5hbWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYSA8ZGl2PiBpbnRvIHRoZSBjZWxsIHdoZW4gZHJvcHBhYmxlIGlzIHBvc3NpYmxlIGFuZCBzaWduYWwgaXMgYmVpbmcgZHJhZ2dlZCBvdmVyXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Kn0gY3VycmVudFRhcmdldFxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBhZGRIaWdobGlnaHRlZEFyZWEoY3VycmVudFRhcmdldCkge1xyXG5cdFx0bGV0IGhpZ2hsaWdodEVsZW0gPSAkKCc8ZGl2IGlkPVwiJysgdGhpcy5faGlnaGxpZ2h0QXJlYUlkICsnXCIgc3R5bGU9XCIgcG9pbnRlci1ldmVudHM6bm9uZTsgcG9zaXRpb246YWJzb2x1dGU7IFwiIGNsYXNzPVwiZHJhZ2dlZE92ZXJcIj48L2Rpdj4nKTtcclxuXHRcdHRoaXMucmVzZXRIaWdobGlnaHRBcmVhKGhpZ2hsaWdodEVsZW0pO1xyXG5cdFx0JChjdXJyZW50VGFyZ2V0KS5hcHBlbmQoaGlnaGxpZ2h0RWxlbSk7XHJcblxyXG5cdFx0aGlnaGxpZ2h0RWxlbS5vZmZzZXQoe3RvcDogJChjdXJyZW50VGFyZ2V0KS5vZmZzZXQoKSEudG9wLCBsZWZ0OiAkKGN1cnJlbnRUYXJnZXQpLm9mZnNldCgpIS5sZWZ0fSlcclxuXHRcdGhpZ2hsaWdodEVsZW0uY3NzKCdoZWlnaHQnLCBjdXJyZW50VGFyZ2V0Lm9mZnNldEhlaWdodCk7XHJcblx0XHRoaWdobGlnaHRFbGVtLmNzcygnd2lkdGgnLCBjdXJyZW50VGFyZ2V0Lm9mZnNldFdpZHRoKTtcclxuXHR9XHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmUgYWxsIHNpZ25hbE1hbmFnZXIgaGlnaGxpZ2h0ZWQgYXJlYXMgKGV4Y2VwdCB0aGUgc2VsZWN0ZWQgb25lKVxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge0pRdWVyeTxIVE1MRWxlbWVudD59IFtlbGVtZW50XVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSByZXNldEhpZ2hsaWdodEFyZWEgKGVsZW1lbnQ/OiBKUXVlcnk8SFRNTEVsZW1lbnQ+KSB7XHJcblx0XHRsZXQgaGlnaGxpZ2h0RWxlbSA9ICQoJyMnICsgdGhpcy5faGlnaGxpZ2h0QXJlYUlkKTtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaGlnaGxpZ2h0RWxlbS5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdGlmIChlbGVtZW50ID09IHVuZGVmaW5lZCB8fCBoaWdobGlnaHRFbGVtW2ldICE9IGVsZW1lbnRbMF0pIHtcclxuXHRcdFx0XHRoaWdobGlnaHRFbGVtW2ldLnJlbW92ZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdldENhbGN1bGF0aW9uSW5wdXRGcm9tRHJvcExvY2F0aW9uKGN1cnJlbnRUYXJnZXQpOiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGF8dW5kZWZpbmVke1xyXG5cdFx0bGV0IHJlY29yZCA9IHRoaXMuZ2V0VHJlZVJlY29yZChjdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICBpZihyZWNvcmQgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0aWYocmVjb3JkLml0ZW0gaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEgJiYgY3VycmVudFRhcmdldC5jbGFzc0xpc3QudmFsdWUuaW5jbHVkZXMoJ2Ryb3BMb2NhdGlvbkFyZWEnKSl7XHJcblx0XHRcdFx0cmV0dXJuIHJlY29yZC5pdGVtO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2V0Q2FsY3VsYXRpb25JbnB1dERyYWdnZWQoc2VyaWU6IEJhc2VTZXJpZXMpOiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEgfCB1bmRlZmluZWR7XHJcblx0XHRpZiAodGhpcy5fY3VycmVudENhbGN1bGF0b3JUeXBlICE9IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2N1cnJlbnRDYWxjdWxhdG9yVHlwZSEuZ2V0Q2hpbGRzKCkubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRcdGlmICh0aGlzLl9jdXJyZW50Q2FsY3VsYXRvclR5cGUhLmdldENoaWxkcygpW2ldLnNlcmllID09IHNlcmllKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fY3VycmVudENhbGN1bGF0b3JUeXBlIS5nZXRDaGlsZHMoKVtpXSBhcyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGE7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xyXG5cdH1cclxuXHJcblx0Ly8jZW5kcmVnaW9uXHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIGxheW91dCBvZiB0aGUgd2lkZ2V0XHJcblx0ICpcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdGNyZWF0ZUxheW91dCgpIHtcclxuXHRcdHRoaXMubWFpbkRpdi5zdHlsZS5vdmVyZmxvdyA9XCJoaWRkZW5cIjtcclxuXHRcdHN1cGVyLmNyZWF0ZUxheW91dCgpO1xyXG5cdH1cclxuXHJcblx0aW5pdFNpZ25hbE1hbmFnZXJEYXRhTW9kZWwoKSB7XHJcblx0XHRsZXQgZGF0YU1vZGVsID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLlNpZ25hbE1hbmFnZXJEYXRhTW9kZWxJZCkgYXMgSVNpZ25hbE1hbmFnZXJEYXRhTW9kZWw7XHJcblx0XHR0aGlzLmRhdGFNb2RlbCA9IGRhdGFNb2RlbCBhcyBJU2lnbmFsTWFuYWdlckRhdGFNb2RlbDtcclxuXHR9XHJcblxyXG5cdGluaXRTZXJpZXNQcm92aWRlcigpIHtcclxuXHRcdHRoaXMuX3Nlcmllc1Byb3ZpZGVyID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLlNlcmllc1Byb3ZpZGVySWQpIGFzIElTZXJpZXNQcm92aWRlcjtcclxuXHR9XHJcblxyXG5cdGluaXRDaGFydE1hbmFnZXJEYXRhTW9kZWwoKSB7XHJcblx0XHR0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsSWQpIGFzIElDaGFydE1hbmFnZXJEYXRhTW9kZWw7XHJcblx0fVxyXG5cdFxyXG5cclxuXHQvKipcclxuXHQgKiBIYW5kbGVzIHRoZSBtb2RlbCBjaGFuZ2VzXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge0lEYXRhTW9kZWx9IHNlbmRlclxyXG5cdCAqIEBwYXJhbSB7RXZlbnRNb2RlbENoYW5nZWRBcmdzfSBldmVudEFyZ3NcclxuXHQgKiBAcmV0dXJucyB7Kn1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdGhhbmRsZU1vZGVsQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGV2ZW50QXJnczogRXZlbnRNb2RlbENoYW5nZWRBcmdzKTogYW55IHtcclxuXHRcdHRoaXMucmVmcmVzaCgpO1xyXG5cdFx0dGhpcy5zYXZlVHJlZUdyaWRTZXR0aW5ncygpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVzaXplcyB0aGUgc2lnbmFsIG1hbmFnZXIgd2lkZ2V0XHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRyZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpe1xyXG5cdFx0aWYgKHRoaXMuX2lzRmlyc3RSZXNpemUgJiYgdGhpcy5lZGl0TW9kZUFjdGl2ZSkge1xyXG5cdFx0XHQvL0RlYWN0aXZhdGUgZWRpdE1vZGUgYW5kIHNldCBjb3JyZWN0IHdpZHRoIHdoZW4gd2lkZ2V0IGlzIGluaXRpYWxpemVkXHJcblx0XHRcdHRoaXMuX2lzRmlyc3RSZXNpemUgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5hY3RpdmF0ZUVkaXRNb2RlKGZhbHNlKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuX2lzRmlyc3RSZXNpemUgPSBmYWxzZTtcclxuXHRcdFx0c3VwZXIucmVzaXplKHdpZHRoLCBoZWlnaHQpO1xyXG5cdFx0XHR0aGlzLl90b29sYmFyLnJlc2l6ZSh3aWR0aCk7XHJcblx0XHR9XHJcblx0XHJcblx0fVxyXG5cclxuXHQgICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBzZWxlY3Rpb24gdG8gdGhlIGdpdmVuIHNlcmllc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHRyZWVHcmlkT2JqZWN0XHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IGluZGV4ZXNcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlU2VyaWVTZWxlY3Rpb24odHJlZUdyaWRPYmplY3QsIGluZGV4ZXM6IEFycmF5PG51bWJlcj4pIHtcclxuICAgICAgICAvLyBkZXNlbGVjdCBhbGwgc2VsZWN0aW9ucyBpbiBzaWduYWwgcGFuZVxyXG4gICAgICAgIHRyZWVHcmlkT2JqZWN0LmNsZWFyU2VsZWN0aW9uKCk7XHJcblxyXG4gICAgICAgIGlmKGluZGV4ZXNbMF0gPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgaW5kZXhlcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgdHJlZUdyaWRPYmplY3QuX211bHRpU2VsZWN0Q3RybFJlcXVlc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgdmlzaWJsZUluZGV4ID0gMDtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8ICg8YW55PnRyZWVHcmlkT2JqZWN0Lm1vZGVsKS5mbGF0UmVjb3Jkcy5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgICAgICBpZihqID09IGluZGV4ZXNbaV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHRyZWVHcmlkT2JqZWN0LnNlbGVjdFJvd3ModmlzaWJsZUluZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKCg8YW55PnRyZWVHcmlkT2JqZWN0Lm1vZGVsKS5mbGF0UmVjb3Jkc1tqXS52aXNpYmxlICE9IFwiZmFsc2VcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZUluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZWZyZXNoZXMgdGhlIHRyZWUgZ3JpZCBcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwdWJsaWMgYXN5bmMgcmVmcmVzaCgpe1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYodGhpcy5yZWZyZXNoRW5hYmxlZCl7XHJcblx0XHRcdFx0dmFyIHRyZWVncmlkT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG5cdFx0XHRcdGlmICgoPGFueT50cmVlZ3JpZE9iai5tb2RlbCkuaXNFZGl0ID09IGZhbHNlKXtcclxuXHRcdFx0XHRcdC8vVG8gcmVmcmVzaCBUcmVlR3JpZCB3aXRoIG5ldyBkYXRhc291cmNlXHJcblx0XHRcdFx0XHR0aGlzLnNldE1vZGVsKHRoaXMuZGF0YU1vZGVsLmRhdGEpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNle1xyXG5cdFx0XHRcdFx0Ly8gdHJlZWdyaWQgaXMgaW4gZWRpdCBtb2RlID0+IHJlZnJlc2ggd291bGQgbm90IHdvcmsgPT4gd2FpdCBmb3IgZWRpdGluZyBpcyBmaW5pc2hlZFxyXG5cdFx0XHRcdFx0Zm9yKGxldCBpID0wOyBpIDwgMTAwOyBpKyspe1xyXG5cdFx0XHRcdFx0XHRhd2FpdCB0aGlzLnNsZWVwKDIwMCk7XHJcblx0XHRcdFx0XHRcdC8vIGlzIGVkaXRpbmcgYWxyZWFkeSBmaW5pc2hlZFxyXG5cdFx0XHRcdFx0XHRpZiAoKDxhbnk+dHJlZWdyaWRPYmoubW9kZWwpLmlzRWRpdCA9PSBmYWxzZSl7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5zZXRNb2RlbCh0aGlzLmRhdGFNb2RlbC5kYXRhKTtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHRcdFx0XHRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0Y2F0Y2goZSl7XHJcblx0XHRcdFx0XHJcblx0XHRcdGNvbnNvbGUuaW5mbyhcIlNpZ25hbE1hbmFnZXIgcmVmcmVzaCBlcnJvciEgPT4gVHJlZUdyaWQgcmVjcmVhdGlvbiFcIik7XHJcblx0XHRcdGNvbnNvbGUuaW5mbyhlKTtcclxuXHRcdFx0XHJcblx0XHRcdHRoaXMuY3JlYXRlVHJlZUdyaWQoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgc2xlZXAobXM6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xyXG4gICAgfVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIGNvbHVtbiB0ZW1wbGF0ZXMgZm9yIHRoZSB0cmVlIGdyaWQgYW5kIGFkZHMgdGhlbSB0byB0aGUgd2lkZ2V0IGNvbnRhaW5lclxyXG5cdCAqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJvdGVjdGVkIGNyZWF0ZUNvbHVtblRlbXBsYXRlcygpe1xyXG5cdFx0dmFyICR3aWRnZXRDb250YWluZXIgPSAkKHRoaXMubWFpbkRpdik7XHJcblx0XHQkd2lkZ2V0Q29udGFpbmVyLmFwcGVuZCh0aGlzLmdldENvbHVtblRlbXBsYXRlRGF0YShTaWduYWxNYW5hZ2VyV2lkZ2V0Lm5hbWVDb2x1bW5JZCkpO1xyXG5cdFx0JHdpZGdldENvbnRhaW5lci5hcHBlbmQodGhpcy5nZXRDb2x1bW5UZW1wbGF0ZURhdGEoU2lnbmFsTWFuYWdlcldpZGdldC5jb2xvckNvbHVtbklkKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSB0cmVlIGdyaWQgZm9yIHRoZSBzaWduYWwgbWFuYWdlclxyXG5cdCAqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJvdGVjdGVkIGNyZWF0ZVRyZWVHcmlkKCl7XHJcblx0XHQkKHRoaXMubWFpbkRpdikuZWpUcmVlR3JpZCh7XHJcblx0XHRcdC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCksXHJcblx0XHRcdC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCksXHJcblx0XHRcdC4uLnRoaXMuZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpLFx0XHJcblx0XHRcdC4uLnRoaXMuZ2V0VHJlZUdyaWRDZWxsRWRpdFN1cHBvcnQoKSxcclxuXHRcdFx0Li4udGhpcy5nZXRUcmVlR3JpZERyYWdEcm9wU3VwcG9ydCgpLFxyXG5cdFx0XHJcblx0XHRcdGRhdGFTb3VyY2U6dGhpcy5kYXRhTW9kZWwuZGF0YSxcclxuXHRcdFx0Y2hpbGRNYXBwaW5nOlwidmlzaWJsZUNoaWxkc1wiLFxyXG5cdFx0XHRleHBhbmRTdGF0ZU1hcHBpbmc6IFwiZXhwYW5kU3RhdGVcIixcclxuXHRcdFx0YWxsb3dSZW9yZGVyaW5nOiBmYWxzZSxcclxuXHRcdFx0cm93SGVpZ2h0OiAyOCxcclxuXHRcdFx0c2VsZWN0aW9uU2V0dGluZ3M6e1xyXG5cdFx0XHRcdHNlbGVjdGlvblR5cGUgOiAnbXVsdGlwbGUnIFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzZWxlY3Rpb25UeXBlOiAnbXVsdGlwbGUnLFxyXG5cdFx0XHRleHBhbmRlZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWROb2RlRXhwYW5kZWRPckNvbGxhcHNlZCgpLFxyXG5cdFx0XHRjb2xsYXBzZWQ6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkTm9kZUV4cGFuZGVkT3JDb2xsYXBzZWQoKSxcclxuXHJcblx0XHRcdHJlY29yZENsaWNrOiAoYXJncykgPT4gdGhpcy5jbGljayhhcmdzKSxcclxuXHRcdFx0cmVjb3JkRG91YmxlQ2xpY2s6IChhcmdzKSA9PiB0aGlzLmRvdWJsZUNsaWNrKGFyZ3MpLFxyXG5cdFx0XHRyb3dTZWxlY3RlZDogKGFyZ3MpID0+IHRoaXMucm93U2VsZWN0ZWQoYXJncy5kYXRhLml0ZW0sIGFyZ3MubW9kZWwuY3VycmVudFZpZXdEYXRhKSxcclxuXHRcdFx0Y3JlYXRlOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZENyZWF0ZWQoKSxcclxuXHRcdFx0YWN0aW9uQmVnaW46IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkQWN0aW9uQmVnaW4oYXJncyksXHJcblx0XHRcdGFjdGlvbkNvbXBsZXRlOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZEFjdGlvbkNvbXBsZXRlKGFyZ3MpLFxyXG5cdFx0XHRxdWVyeUNlbGxJbmZvOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZFF1ZXJ5Q2VsbEluZm8oYXJncyksXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiBkZWZpbml0aW9uXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm5zIHt7fX1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCk6IHt9e1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Y29sdW1uczogW1xyXG5cdFx0XHRcdHsgZmllbGQ6IFNpZ25hbE1hbmFnZXJXaWRnZXQubmFtZUNvbHVtbklkLCBoZWFkZXJUZXh0OiBcIk5hbWVcIiwgd2lkdGg6IFwiMzUxcHhcIiAsIGlzVGVtcGxhdGVDb2x1bW46IHRydWUsIHRlbXBsYXRlSUQ6IFwic21OYW1lQ29sdW1uVGVtcGxhdGVcIn0sXHJcblx0XHRcdFx0eyBmaWVsZDogU2lnbmFsTWFuYWdlcldpZGdldC52YWx1ZUNvbHVtbklkLCBoZWFkZXJUZXh0OiBcIlZhbHVlXCIsIHZpc2libGU6IHRoaXMuZWRpdE1vZGVBY3RpdmUsIHdpZHRoOiBcIjMwMHB4XCIsIGVkaXRUZW1wbGF0ZTogU21UcmVlR3JpZENlbGxFZGl0VGVtcGxhdGUuY3JlYXRlSW5zdGFuY2UoKSwgaXNUZW1wbGF0ZUNvbHVtbjogdHJ1ZX0sXHJcblx0XHRcdFx0eyBmaWVsZDogU2lnbmFsTWFuYWdlcldpZGdldC5kZXNjcmlwdGlvbkNvbHVtbklkLCBoZWFkZXJUZXh0OiBcIkRlc2NyaXB0aW9uXCIsIHZpc2libGU6IHRoaXMuZWRpdE1vZGVBY3RpdmUsIHdpZHRoOiBcIjEwMHB4XCIgfSxcclxuXHRcdFx0XHR7IGZpZWxkOiBTaWduYWxNYW5hZ2VyV2lkZ2V0LmNvbG9yQ29sdW1uSWQsIGhlYWRlclRleHQ6IFwiQ29sb3JcIiwgd2lkdGg6IFwiNTBweFwiLCB2aXNpYmxlOiB0aGlzLmVkaXRNb2RlQWN0aXZlLCBlZGl0VHlwZTogXCJEYXRlUGlja2VyXCIsIGVkaXRUZW1wbGF0ZTogU21UcmVlR3JpZENlbGxFZGl0VGVtcGxhdGUuY3JlYXRlSW5zdGFuY2UoKSwgaXNUZW1wbGF0ZUNvbHVtbjogdHJ1ZSwgdGVtcGxhdGVJRDogXCJzbUNvbG9yQ29sdW1uVGVtcGxhdGVcIn0sXHJcblx0XHRcdFx0eyBmaWVsZDogU2lnbmFsTWFuYWdlcldpZGdldC5pY29uRGVmaW5pdGlvbkNvbHVtbklkLCB2aXNpYmxlOiBmYWxzZSwgd2lkdGg6IFwiMHB4XCIgfSxcclxuXHRcdFx0XSxcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIHJlc2l6ZSBzZXR0aW5nc1xyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcmV0dXJucyB7e319XHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpOiB7fXtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGFsbG93Q29sdW1uUmVzaXplOiB0cnVlLFxyXG5cdFx0XHRjb2x1bW5SZXNpemVTZXR0aW5nczogeyBjb2x1bW5SZXNpemVNb2RlOiBlai5UcmVlR3JpZC5Db2x1bW5SZXNpemVNb2RlLkZpeGVkQ29sdW1uc1x0fSxcclxuXHRcdFx0Y29sdW1uUmVzaXplZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRDb2x1bW5SZXNpemVkKGFyZ3MpLFxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG4gICAgICogQSB0cmVlZ3JpZCBjb2x1bW4gd2FzIHJlc2l6ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkQ29sdW1uUmVzaXplZChhcmdzKXtcclxuXHRcdHN1cGVyLnJlc2l6ZUR5bmFtaWNDb2x1bW4oYXJncy5jb2x1bW5JbmRleCwgYXJncy5tb2RlbCk7XHJcblx0XHR0aGlzLnNhdmVUcmVlR3JpZFNldHRpbmdzKCk7XHJcbiAgICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCB0b29sYmFyIHNldHRpbmdzXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm5zIHt7fX1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpOiB7fXtcclxuXHRcdHRoaXMuX3Rvb2xiYXIgPSBuZXcgU2lnbmFsTWFuYWdlclRyZWVHcmlkVG9vbGJhcih0aGlzLm1haW5EaXYpO1x0XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdHRvb2xiYXJTZXR0aW5nczoge1xyXG5cdFx0XHRcdFx0c2hvd1Rvb2xiYXI6IHRydWUsXHJcblx0XHRcdFx0XHRjdXN0b21Ub29sYmFySXRlbXM6IHRoaXMuX3Rvb2xiYXIuZ2V0Q3VzdG9tVG9vbGJhcnMoKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0dG9vbGJhckNsaWNrOiAoYXJncykgPT4gdGhpcy50b29sYmFyQ2xpY2soYXJncylcclxuXHRcdFx0fTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjZWxsIGVkaXQgc2V0dGluZ3NcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHJldHVybnMge3t9fVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBnZXRUcmVlR3JpZENlbGxFZGl0U3VwcG9ydCgpOiB7fXtcclxuXHRcdHZhciBjZWxsRWRpdEV2ZW50cyA9IG5ldyBTbVRyZWVHcmlkQ2VsbEVkaXRFdmVudHMoKTtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGVkaXRTZXR0aW5nczoge1x0YWxsb3dFZGl0aW5nOiB0cnVlIH0sXHJcblx0XHRcdGJlZ2luRWRpdDogKGFyZ3MpID0+IGNlbGxFZGl0RXZlbnRzLmJlZ2luRWRpdChhcmdzLCB0aGlzKSxcclxuXHRcdFx0ZW5kRWRpdDogKGFyZ3MpID0+IGNlbGxFZGl0RXZlbnRzLmVuZEVkaXQoYXJncywgdGhpcyksXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWN0aXZhdGVzIHRoZSBzaWduYWwgbWFuYWdlciBkcmFnIGFuZCBkcm9wIHN1cHBvcnRcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHJldHVybnMge3t9fVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBnZXRUcmVlR3JpZERyYWdEcm9wU3VwcG9ydCgpOiB7fXtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGFsbG93RHJhZ0FuZERyb3AgOiB0cnVlLFxyXG5cdFx0XHRyb3dEcmFnU3RhcnQ6IChhcmdzKSA9PiB0aGlzLnJvd0RyYWdTdGFydChhcmdzKSxcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBXaWxsIGJlIGNhbGxlZCBhZnRlciB0aGUgdHJlZSBncmlkIHdhcyBjcmVhdGVkOyB0b29sYmFyIHN0eWxlcyBhbmQgc3RhdGVzIHdpbGwgYmUgc2V0XHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSB0cmVlR3JpZENyZWF0ZWQoKXtcclxuXHRcdC8vIFNldHMgdGhlIGN1c3RvbSB0b29sYmFyIGljb25zXHJcblx0XHR0aGlzLl90b29sYmFyLnNldFN0eWxlRm9yVG9vbGJhckljb25zKCk7XHJcblxyXG5cdFx0Ly8gQXQgdGhlIGJlZ2lubmluZyB0aGUgZXhwb3J0L2RlbGV0ZS9pbnNlcnQgY2FsY3VsYXRpb24gYnV0dG9uIGlzIGRpc2FibGVkIGJlY2F1c2Ugbm8gc2VsZWN0aW9uIGlzIGF2YWlsYWJsZVxyXG5cdFx0dGhpcy5fdG9vbGJhci5kaXNhYmxlRXhwb3J0QnV0dG9uKHRydWUpO1xyXG5cdFx0dGhpcy5fdG9vbGJhci5kaXNhYmxlRGVsZXRlQnV0dG9uKHRydWUpO1xyXG5cdFx0dGhpcy5fdG9vbGJhci5kaXNhYmxlSW5zZXJ0Q2FsY3VsYXRpb25CdXR0b24odHJ1ZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTd2l0Y2ggaW50byBcImVkaXQgbW9kZVwiIG9yIFwibm9ybWFsIG1vZGVcIlxyXG5cdCAqIGlmIGVkaXQgbW9kZSBpcyBhY3RpdmUsIHRoZSBlZGl0IG1vZGUgd2lsbCBiZSBzZXQgdG8gdGhlIGRhdGFtb2RlbCwgYW5kIHRoZSB3aWRnZXQgc2l6ZSB3aWxsIGJlIGluY3JlYXNlZFxyXG5cdCAqIGlmIG5vcm1hbCBtb2RlIGlzIGFjdGl2ZSwgdGhlIG5vcm1hbCBtb2RlIHdpbGwgYmUgc2V0IHRvIHRoZSBkYXRhbW9kZWwsIGFuZCB0aGUgd2lkZ2V0IHNpemUgd2lsbCBiZSBkZWNyZWFzZWRcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtib29sZWFufSBhY3RpdmVcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgc2V0RWRpdE1vZGUoYWN0aXZlOmJvb2xlYW4pe1xyXG5cdFx0aWYodGhpcy5lZGl0TW9kZUFjdGl2ZSAhPSBhY3RpdmUpe1xyXG5cdFx0XHRpZihhY3RpdmUgPT0gdHJ1ZSl7XHJcblx0XHRcdFx0dGhpcy5vbkNoYW5nZVNpemUodGhpcy5fYWN0dWFsV2lkdGggKyB0aGlzLl93aWR0aERpZmZlcmVuY2UpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2V7XHJcblx0XHRcdFx0bGV0IG5ld1NpemUgPSB0aGlzLl9hY3R1YWxXaWR0aCAtIHRoaXMuX3dpZHRoRGlmZmVyZW5jZTtcclxuXHRcdFx0XHRpZihuZXdTaXplIDwgdGhpcy5fbWluV2lkdGgpe1xyXG5cdFx0XHRcdFx0bmV3U2l6ZSA9IHRoaXMuX21pbldpZHRoO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLm9uQ2hhbmdlU2l6ZShuZXdTaXplKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dGhpcy5lZGl0TW9kZUFjdGl2ZSA9IGFjdGl2ZTtcclxuXHRcdCh0aGlzLmRhdGFNb2RlbCBhcyBJU2lnbmFsTWFuYWdlckRhdGFNb2RlbCkuZWRpdE1vZGVBY3RpdmUgPSB0aGlzLmVkaXRNb2RlQWN0aXZlO1xyXG5cdFx0aWYodGhpcy5fdG9vbGJhciAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHR0aGlzLl90b29sYmFyLmFjdGl2YXRlRWRpdE1vZGVCdXR0b24odGhpcy5lZGl0TW9kZUFjdGl2ZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBXZWxsIGJlIGNhbGxlZCBhZnRlciBzb21lIHRyZWUgZ3JpZCBhY3Rpb24gd2FzIHN0YXJ0ZWRcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsqfSBhcmdzXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHRyZWVHcmlkQWN0aW9uQmVnaW4oYXJncyl7XHJcblx0XHQvLyBTdXBwb3J0IFwiRW50Zi9EZWxcIiBrZXlcclxuXHRcdGlmKGFyZ3MucmVxdWVzdFR5cGUgPT0gXCJkZWxldGVcIil7XHJcblx0XHRcdGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuXHRcdFx0aWYgKHRoaXMuY29udGFpbnNJdGVtV2l0aGluUmVjZW50T3JVcGxvYWRlZChhcmdzLmRlbGV0ZWRJdGVtcykpIHtcclxuXHRcdFx0XHR0aGlzLnNob3dNZXNzYWdlQm94Rm9yRGVsZXRpbmdJdGVtKGFyZ3MuZGVsZXRlZEl0ZW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlSXRlbXMoYXJncy5kZWxldGVkSXRlbXMpO1xyXG4gICAgICAgICAgICB9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQgICAgLyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgc3R5bGVzIGZvciB0aGUgY2hhcnQgbWFuYWdlciB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGxvYWRTdHlsZXMoKSB7XHJcbiAgICAgICAgc3VwZXIubG9hZFN0eWxlcygpO1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9jb21tb24vc3R5bGUvY3NzL2Ryb3BEb3duTWVudVN0eWxlLmNzc1wiKTtcclxuICAgIH1cclxuXHJcblx0LyoqXHJcblx0ICogV2VsbCBiZSBjYWxsZWQgYWZ0ZXIgc29tZSB0cmVlIGdyaWQgYWN0aW9uIHdhcyBjb21wbGV0ZWRcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsqfSBhcmdzXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHRyZWVHcmlkQWN0aW9uQ29tcGxldGUoYXJncyl7IFxyXG5cdFx0Ly8gRXZlbnQgdHJpZ2dlciB3aGlsZSBjaGFuZ2luZyBkYXRhc291cmNlIGR5bmFtaWNhbGx5LiBcclxuXHRcdC8vIGNvZGUgdG8gZG9uZSBhZnRlciB0aGUgZHluYW1pYyBjaGFuZ2Ugb2YgZGF0YXNvdXJjZS4gXHJcblx0XHRpZiAoYXJncy5yZXF1ZXN0VHlwZSA9PT0gJ3JlZnJlc2hEYXRhU291cmNlJykgeyBcclxuXHRcdFx0dGhpcy5yZWZyZXNoU2VsZWN0aW9uKCk7XHJcblx0XHRcdGlmKHRoaXMuX3NlcmllQ29udGFpbmVyVG9TZWxlY3RBZnRlclJlZnJlc2ggIT0gdW5kZWZpbmVkKXtcdFx0XHRcdFxyXG5cdFx0XHRcdC8vIFNlbGVjdHMgdGhlIGltcG9ydGVkIHNpZ25hbGZpbGUsIG9yIHRoZSBpbnNlcnRlZCBjYWxjdWxhdGlvbiwgLi4uXHJcblx0XHRcdFx0dGhpcy5zZWxlY3RJdGVtKHRoaXMuX3NlcmllQ29udGFpbmVyVG9TZWxlY3RBZnRlclJlZnJlc2gpO1xyXG5cdFx0XHRcdHRoaXMuX3NlcmllQ29udGFpbmVyVG9TZWxlY3RBZnRlclJlZnJlc2ggPSB1bmRlZmluZWQ7XHJcblx0XHRcdH1cclxuXHRcdH0gXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBXaWxsIGJlIGNhbGxlZCB0byB1cGRhdGUgdGhlIHN0eWxlIG9mIHRoZSBnaXZlIGNlbGwgaWYgYSByZWZyZXNoIHdpbGwgYmUgbmVlZGVkXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Kn0gYXJnc1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSB0cmVlR3JpZFF1ZXJ5Q2VsbEluZm8oYXJncyl7XHJcblx0XHRpZiAoYXJncy5jb2x1bW4uZmllbGQgPT0gXCJuYW1lXCIpe1xyXG5cdFx0XHRpZih0aGlzLmlzR3JvdXBJdGVtKGFyZ3MuZGF0YS5pdGVtKSkge1xyXG5cdFx0XHRcdC8vIFNob3cgZ3JvdXAgbm9kZXMgYWx3YXlzIGJvbGQgPT4gYWxzbyBpZiB0aGV5IGhhdmUgbm8gY2hpbGRzXHJcblx0XHRcdFx0aWYoYXJncy5jZWxsRWxlbWVudC5zdHlsZSAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRcdFx0aWYoYXJncy5kYXRhLmxldmVsID09IDApe1xyXG5cdFx0XHRcdFx0XHRhcmdzLmNlbGxFbGVtZW50LnN0eWxlLmZvbnRXZWlnaHQgPSBcIjgwMFwiOyAvLyA3MDAgd291bGQgYmUgYm9sZFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZXtcclxuXHRcdFx0XHRcdFx0YXJncy5jZWxsRWxlbWVudC5zdHlsZS5mb250V2VpZ2h0ID0gXCI2NTBcIjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gU2hvdyBhbGwgbm9kZXMgcmVkIHdoaWNoIGhhdmUgaW52YWxpZCBzaWduYWxzIGluIGl0IFxyXG5cdFx0XHRpZih0aGlzLmlzSXRlbUludmFsaWQoYXJncy5kYXRhLml0ZW0pID09IHRydWUpe1xyXG5cdFx0XHRcdGlmKGFyZ3MuY2VsbEVsZW1lbnQuc3R5bGUgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0XHRcdGFyZ3MuY2VsbEVsZW1lbnQuc3R5bGUuY29sb3IgPSBcInJlZFwiO1xyXG5cdFx0XHRcdFx0YXJncy5jZWxsRWxlbWVudC5zdHlsZS5mb250V2VpZ2h0ID0gXCJib2xkXCI7XHJcblx0XHRcdFx0XHQvL2FyZ3MuY2VsbEVsZW1lbnQuaW5uZXJUZXh0ID0gYXJncy5jZWxsRWxlbWVudC5pbm5lclRleHQgKyBcIihpbnZhbGlkKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSBcclxuXHRcdGVsc2UgaWYgKGFyZ3MuY29sdW1uLmZpZWxkID09IFwidmFsdWVcIil7XHJcblx0XHRcdGlmKGFyZ3MuZGF0YS5kcm9wUG9zc2libGUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICBhcmdzLmNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkcm9wTG9jYXRpb25BcmVhXCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9ICAgICAgXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBIYXMgdGhlIGdpdmVuIGl0ZW0gc29tZSBkYXRhIGFuZCBpcyB0aGlzIGRhdGEgdmFsaWQgXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Kn0gaXRlbVxyXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBpc0l0ZW1JbnZhbGlkKGl0ZW0pOiBib29sZWFue1xyXG5cdFx0aWYoaXRlbSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbil7XHJcblx0XHRcdGxldCBjYWxjdWxhdGVkU2lnbmFscyA9IGl0ZW0uZ2V0U2VyaWVzKCk7XHJcblx0XHRcdC8vIGNoZWNrIGlmIGEgY2FsY3VsYXRlZCBvdXRwdXQgc2lnbmFsIGlzIGludmFsaWRcclxuXHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IGNhbGN1bGF0ZWRTaWduYWxzLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0XHRpZihjYWxjdWxhdGVkU2lnbmFsc1tpXS5yYXdQb2ludHNWYWxpZCA9PSBmYWxzZSl7XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGVsc2UgaWYoaXRlbSBpbnN0YW5jZW9mIFNlcmllTm9kZSApe1xyXG5cdFx0XHRpZihpdGVtLnNlcmllICE9IHVuZGVmaW5lZCAmJiBpdGVtLnNlcmllLnJhd1BvaW50c1ZhbGlkID09IGZhbHNlKXtcclxuXHRcdFx0XHRpZihpdGVtIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YSl7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNle1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgZHJhZyBhbmQgZHJvcCBvcGVyYXRpb24gd2FzIHN0YXJ0ZWRcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsqfSBhcmdzXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHJvd0RyYWdTdGFydChhcmdzKXtcclxuXHRcdHRoaXMuX2luZGV4ZXNEcmFnZ2VkID0gW107XHJcblx0XHRcclxuXHRcdGxldCBzZWxlY3RlZEVsZW1lbnRzID0gdGhpcy5jaGVja1NlbGVjdGVkRWxlbWVudHMoYXJncy5kcmFnZ2VkUmVjb3JkcywgYXJncy5kcmFnZ2VkUm93KTtcclxuXHRcdGlmIChzZWxlY3RlZEVsZW1lbnRzLmxlbmd0aCA+IDAgKSB7XHJcblx0XHRcdHRoaXMuX2N1cnJlbnREcmFnRHJvcFNlcmllcyA9IHNlbGVjdGVkRWxlbWVudHM7XHJcblx0XHRcdCAvLyBTZXQgY3VycmVudCBkcmFnIGRyb3Agc2lnbmFsXHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5fY3VycmVudERyYWdEcm9wU2VyaWVzID0gdW5kZWZpbmVkOyAvLyBSZXNldCBjdXJyZW50IGRyYWcgZHJvcCBzaWduYWxcclxuXHRcdH1cclxuXHRcdGFyZ3MuZHJhZ2dlZFJlY29yZHMgPSBbXTtcclxuXHRcdGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgcmVmcmVzaFNlbGVjdGlvbigpe1xyXG5cdFx0Y29uc3QgdHJlZU9iaiA9ICQodGhpcy5tYWluRGl2KS5lalRyZWVHcmlkKCdpbnN0YW5jZScpOyBcclxuXHRcdFx0XHRcdFx0XHJcblx0XHQvLyBHZXQgYWN0dWFsIHNlbGVjdGlvbiBpbmRleFxyXG5cdFx0bGV0IGFjdHVhbFNlbGVjdGVkUm93SW5kZXggPSB0cmVlT2JqLm1vZGVsLnNlbGVjdGVkUm93SW5kZXg7XHJcblx0XHQvLyBSZXNldCBzZWxlY3Rpb25cclxuXHRcdHRyZWVPYmoubW9kZWwuc2VsZWN0ZWRSb3dJbmRleCA9IC0xO1xyXG5cdFx0XHJcblx0XHQvLyBTZXQgdG8gbGFzdCBpbmRleCBpZiBpbmRleCBpcyBvdXQgb2YgcmFuZ2VcclxuXHRcdGlmKGFjdHVhbFNlbGVjdGVkUm93SW5kZXggPj0gdHJlZU9iai5tb2RlbC5mbGF0UmVjb3Jkcy5sZW5ndGgpe1xyXG5cdFx0XHRhY3R1YWxTZWxlY3RlZFJvd0luZGV4ID0gdHJlZU9iai5tb2RlbC5mbGF0UmVjb3Jkcy5sZW5ndGgtMTtcclxuXHRcdH1cclxuXHRcdC8vIFNldCBzZWxlY3Rpb25cclxuXHRcdHRyZWVPYmoubW9kZWwuc2VsZWN0ZWRSb3dJbmRleCA9IGFjdHVhbFNlbGVjdGVkUm93SW5kZXg7XHJcblx0XHRcclxuXHRcdGxldCBhcmVFbGVtZW50c0V4cG9ydGFibGUgPSB0aGlzLmNhbkl0ZW1zQmVFeHBvcnRlZCh0cmVlT2JqLm1vZGVsLmZsYXRSZWNvcmRzKTtcclxuXHJcblx0XHQvLyB1cGRhdGUgdG9vbGJhciBidXR0b25zXHJcblx0XHRpZih0cmVlT2JqLm1vZGVsLmZsYXRSZWNvcmRzW2FjdHVhbFNlbGVjdGVkUm93SW5kZXhdICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdHRoaXMudXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyh0cmVlT2JqLm1vZGVsLmZsYXRSZWNvcmRzW2FjdHVhbFNlbGVjdGVkUm93SW5kZXhdLml0ZW0sIGFyZUVsZW1lbnRzRXhwb3J0YWJsZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnVwZGF0ZVRvb2xiYXJCdXR0b25TdGF0ZXModW5kZWZpbmVkLCBhcmVFbGVtZW50c0V4cG9ydGFibGUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSByb3dTZWxlY3RlZChpdGVtOiBhbnksIGN1cnJlbnRWaWV3RGF0YSl7XHJcblx0XHRsZXQgYXJlRWxlbWVudHNFeHBvcnRhYmxlID0gdGhpcy5jYW5JdGVtc0JlRXhwb3J0ZWQoY3VycmVudFZpZXdEYXRhKTtcclxuXHRcdHRoaXMudXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyhpdGVtLCBhcmVFbGVtZW50c0V4cG9ydGFibGUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogdXBkYXRlcyB0aGUgdG9vbGJhciBidXR0b25zKGUuZy4gaW5zZXJ0IGNhbHVsYXRpb24gb25seSBlbmFibGVkIG9uIFNlcmllR3JvdXAgb3IgdW5kZXIgXCJDYWxjdWxhdGVkIHNpZ25hbHNcIiBjYXRlZ29yeSlcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtJU2VyaWVOb2RlfSBpdGVtXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHVwZGF0ZVRvb2xiYXJCdXR0b25TdGF0ZXMoaXRlbTogSVNlcmllTm9kZSB8IHVuZGVmaW5lZCwgYXJlRWxlbWVudHNFeHBvcnRhYmxlOiBib29sZWFuKXtcclxuXHRcdGlmIChpdGVtID09IHVuZGVmaW5lZCl7XHJcblx0XHRcdHRoaXMuX3Rvb2xiYXIuZGlzYWJsZUluc2VydENhbGN1bGF0aW9uQnV0dG9uKHRydWUpO1xyXG5cdFx0XHR0aGlzLl90b29sYmFyLmRpc2FibGVEZWxldGVCdXR0b24odHJ1ZSk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0Ly8gc2V0IGRlbGV0ZSBidXR0b24gc3RhdGVcclxuXHRcdFx0dGhpcy5fdG9vbGJhci5kaXNhYmxlRGVsZXRlQnV0dG9uKCFpdGVtLmNhbkRlbGV0ZSk7XHJcblxyXG5cdFx0XHRpZihpdGVtIGluc3RhbmNlb2YgU2VyaWVHcm91cCl7XHJcblx0XHRcdFx0dGhpcy5fdG9vbGJhci5kaXNhYmxlRXhwb3J0QnV0dG9uKGZhbHNlKTtcclxuXHRcdFx0XHR0aGlzLl90b29sYmFyLmRpc2FibGVJbnNlcnRDYWxjdWxhdGlvbkJ1dHRvbihmYWxzZSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZXtcclxuXHRcdFx0XHRpZihpdGVtLmdldFNlcmllR3JvdXAoKSA9PSB1bmRlZmluZWQpe1xyXG5cdFx0XHRcdFx0dGhpcy5fdG9vbGJhci5kaXNhYmxlSW5zZXJ0Q2FsY3VsYXRpb25CdXR0b24odHJ1ZSk7XHJcblx0XHRcdFx0XHR0aGlzLl90b29sYmFyLmRpc2FibGVFeHBvcnRCdXR0b24odHJ1ZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYoaXRlbSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZSAmJiBpdGVtLm5hbWUgPT0gJ0FsZ29yaXRobScgfHwgaXRlbSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YSAmJiBpdGVtLnNlcmllID09IHVuZGVmaW5lZCB8fFxyXG5cdFx0XHRcdCgoaXRlbSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbiB8fCBpdGVtIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YSkgJiYgKGl0ZW0uc2VyaWUgPT0gdW5kZWZpbmVkIHx8IGl0ZW0uc2VyaWUhLnJhd1BvaW50c1ZhbGlkID09IGZhbHNlKSkpe1xyXG5cdFx0XHRcdFx0dGhpcy5fdG9vbGJhci5kaXNhYmxlSW5zZXJ0Q2FsY3VsYXRpb25CdXR0b24oZmFsc2UpO1xyXG5cdFx0XHRcdFx0dGhpcy5fdG9vbGJhci5kaXNhYmxlRXhwb3J0QnV0dG9uKHRydWUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNle1xyXG5cdFx0XHRcdFx0dGhpcy5fdG9vbGJhci5kaXNhYmxlRXhwb3J0QnV0dG9uKGZhbHNlKTtcclxuXHRcdFx0XHRcdHRoaXMuX3Rvb2xiYXIuZGlzYWJsZUluc2VydENhbGN1bGF0aW9uQnV0dG9uKGZhbHNlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cdFxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChhcmVFbGVtZW50c0V4cG9ydGFibGUpIHtcclxuXHRcdFx0dGhpcy5fdG9vbGJhci5kaXNhYmxlRXhwb3J0QnV0dG9uKGZhbHNlKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLl90b29sYmFyLmRpc2FibGVFeHBvcnRCdXR0b24odHJ1ZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgY2FuSXRlbXNCZUV4cG9ydGVkKGl0ZW1zKTogYm9vbGVhbiB7XHJcblx0XHRsZXQgY2FuQmVFeHBvcnRlZCA9IGZhbHNlO1xyXG5cdFx0bGV0IGV4cG9ydEhlbHBlciA9IG5ldyBFeHBvcnRIZWxwZXIoKTtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKGV4cG9ydEhlbHBlci5pc0VsZW1lbnRFeHBvcnRhYmxlKGl0ZW1zW2ldLml0ZW0pID09PSB0cnVlKSB7XHJcblx0XHRcdFx0Y2FuQmVFeHBvcnRlZCA9IHRydWU7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBjYW5CZUV4cG9ydGVkO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQSBjbGljayBvbiB0aGUgdHJlZSBncmlkIChuZWVkZWQgZm9yIHJlc2V0aW5nIHRoZSBjdXJyZW50IGRyYWcgZHJvcCBzaWduYWwpXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Kn0gYXJnc1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBjbGljayhhcmdzKXtcclxuXHRcdC8vIFJlc2V0IGN1cnJlbnQgZHJhZyBkcm9wIHNpZ25hbCBhZnRlciBjbGljayB3YXMgZmluaXNoZWQoY2xpY2sgdXApXHJcblx0XHR0aGlzLl9jdXJyZW50RHJhZ0Ryb3BTZXJpZXMgPSB1bmRlZmluZWQ7XHJcblx0XHR0aGlzLmZvY3VzKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBIGRvdWJsZSBjbGljayBvbiB0aGUgdHJlZSBncmlkIHdhcyBkb25lXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Kn0gYXJnc1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBkb3VibGVDbGljayhhcmdzKXtcclxuXHRcdGlmKGFyZ3MuY2VsbEluZGV4ID09IDApe1xyXG5cdFx0XHRsZXQgc2VyaWVOb2RlID0gYXJncy5kYXRhLml0ZW07XHJcblx0XHRcdGxldCBmb3VuZFNlcmllcyA9IHRoaXMuZ2V0U2VyaWVzRnJvbUl0ZW0oc2VyaWVOb2RlKTtcclxuXHRcdFx0aWYoZm91bmRTZXJpZXMubGVuZ3RoID4gMCl7XHJcblx0XHRcdFx0Ly8gT25seSBvbmUgc2VyaWUgY2FuIGJlIGFkZGVkIGJ5IGRvdWJsZSBjbGljayBjdXJyZW50bHkoVE9ETzogYWRkIG11bHRpIGluc2VydClcclxuXHRcdFx0XHR0aGlzLm9uU2VyaWVzRG91YmxlQ2xpY2tlZChmb3VuZFNlcmllc1swXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGFsbCBlbGVtZW50cyBzZWxlY3RlZCBhcmUgc2VyaWVzIGFuZCBvZiB0aGUgc2FtZSB0eXBlXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Kn0gZWxlbWVudHNcclxuXHQgKiBAcGFyYW0geyp9IGRyYWdnZWRSb3dcclxuXHQgKiBAcmV0dXJucyB7QXJyYXk8QmFzZVNlcmllcz59XHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGNoZWNrU2VsZWN0ZWRFbGVtZW50cyhlbGVtZW50cywgZHJhZ2dlZFJvdyk6QXJyYXk8QmFzZVNlcmllcz4ge1xyXG5cdFx0bGV0IHNlcmllcyA9IG5ldyBBcnJheTxCYXNlU2VyaWVzPigpO1xyXG5cdFx0bGV0IGl0ZW1zID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHRcdGxldCBkcmFnZ2VkUm93SXNTZWxlY3RlZCA9IGZhbHNlO1xyXG5cdFx0bGV0IGludmFsaWRTZWxlY3Rpb24gPSBmYWxzZTtcclxuXHJcblx0XHRpZiAoZHJhZ2dlZFJvdyA9PSB1bmRlZmluZWQgfHwgZHJhZ2dlZFJvdy5zZXJpZSA9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIFtdO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB0eXBlID0gZHJhZ2dlZFJvdy5zZXJpZS50eXBlO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkgPSBpICsgMSl7XHJcblx0XHRcdGlmIChlbGVtZW50c1tpXS5zZXJpZSA9PSB1bmRlZmluZWQgfHwgZWxlbWVudHNbaV0uc2VyaWUudHlwZSAhPSB0eXBlKSB7XHJcblx0XHRcdFx0aW52YWxpZFNlbGVjdGlvbiA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKGVsZW1lbnRzW2ldID09IGRyYWdnZWRSb3cpIHtcclxuXHRcdFx0XHRkcmFnZ2VkUm93SXNTZWxlY3RlZCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0c2VyaWVzLnB1c2goZWxlbWVudHNbaV0uc2VyaWUpO1xyXG5cdFx0XHRpdGVtcy5wdXNoKGVsZW1lbnRzW2ldKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoZHJhZ2dlZFJvdy5pdGVtIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhKXtcclxuXHRcdFx0dGhpcy5fY3VycmVudENhbGN1bGF0b3JUeXBlID0gZHJhZ2dlZFJvdy5wYXJlbnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly9PbmNlIGFsbCBlbGVtZW50cyBoYXZlIGJlZW4gY2hlY2tlZCwgc2VsZWN0IGNvcnJlY3QgZWxlbWVudHMgYWNjb3JkaW5nIHRvIHRoZSBleGNlcHRpb25zXHJcblx0XHRpZiAoIWRyYWdnZWRSb3dJc1NlbGVjdGVkKSB7XHJcblx0XHRcdHNlcmllcyA9IFtdO1xyXG5cdFx0XHRzZXJpZXMucHVzaChkcmFnZ2VkUm93LnNlcmllKTtcclxuXHRcdFx0dGhpcy5faW5kZXhlc0RyYWdnZWQgPSBbXTtcclxuXHRcdFx0dGhpcy5faW5kZXhlc0RyYWdnZWQucHVzaChkcmFnZ2VkUm93LmluZGV4KTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYoaW52YWxpZFNlbGVjdGlvbikge1xyXG5cdFx0XHRyZXR1cm4gW107XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0c2VyaWVzID0gdGhpcy5kZWxldGVFcXVhbFNpZ25hbHMoc2VyaWVzLCBpdGVtcyk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiBzZXJpZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZWxldGUgZHVwbGljYXRlZCBzaWduYWxzIGZyb20gdGhlIGRyYWcmZHJvcCBhcnJheVxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge0FycmF5PEJhc2VTZXJpZXM+fSBzZXJpZXNcclxuXHQgKiBAcGFyYW0geyp9IGVsZW1lbnRzXHJcblx0ICogQHJldHVybnNcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZGVsZXRlRXF1YWxTaWduYWxzKHNlcmllczogQXJyYXk8QmFzZVNlcmllcz4sIGVsZW1lbnRzKSB7XHJcblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgc2VyaWVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmIChlbGVtZW50c1tpXS5pdGVtIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhKXtcclxuXHRcdFx0XHRsZXQgc2VsZWN0ZWRJdGVtcyA9IE9iamVjdC5hc3NpZ24oW10sIHNlcmllcyk7XHJcblx0XHRcdFx0c2VsZWN0ZWRJdGVtcy5zcGxpY2UoaSwgMSk7XHJcblx0XHRcdFx0aWYgKHNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoc2VyaWVzW2ldKSl7XHJcblx0XHRcdFx0XHRzZXJpZXMuc3BsaWNlKGksIDEpO1xyXG5cdFx0XHRcdFx0ZWxlbWVudHMuc3BsaWNlKGksIDEpO1xyXG5cdFx0XHRcdFx0aSA9IC0xO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR0aGlzLl9pbmRleGVzRHJhZ2dlZC5wdXNoKGVsZW1lbnRzW2ldLmluZGV4KTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIHNlcmllcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgYWxsIHNlcmllcyB3aGljaCB3ZXJlIGZvdW5kIGluIHRoZSBzZXJpZSBub2RlIGl0ZW0oZS5nLiBhIG5vcm1hbCBzZXJpZSBvciBjYWxjdWxhdGVkIHNlcmllcylcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsqfSBpdGVtXHJcblx0ICogQHJldHVybnMge0FycmF5PEJhc2VTZXJpZXM+fVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBnZXRTZXJpZXNGcm9tSXRlbShpdGVtKTogQXJyYXk8QmFzZVNlcmllcz57XHJcblx0XHRsZXQgc2lnbmFscyA9IG5ldyBBcnJheTxCYXNlU2VyaWVzPigpO1xyXG5cdFx0aWYoaXRlbSBpbnN0YW5jZW9mIFNlcmllTm9kZSAmJiBpdGVtLnNlcmllICE9IHVuZGVmaW5lZCl7IC8vIElzIFNpZ25hbCBub2RlXHJcblx0XHRcdHNpZ25hbHMucHVzaChpdGVtLnNlcmllKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYoaXRlbSBpbnN0YW5jZW9mIFNlcmllQ29udGFpbmVyKXsgLy8gaXMgY2FsY3VsYXRpb24oZ3JvdXAgbm9kZSkgd2l0aCBzaWduYWxzXHJcblx0XHRcdHJldHVybiBpdGVtLmdldFNlcmllcygpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHNpZ25hbHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJcyB0aGUgZ2l2ZW4gaXRlbSBhIGdyb3VwIGl0ZW0gKGUuZy4gbmVlZGVkIGZvciBzZXR0aW5nIHRoZSBmb250IHN0eWxlIHRvIGJvbGQpXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7SVNlcmllQ29udGFpbmVyfSBpdGVtXHJcblx0ICogQHJldHVybnNcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaXNHcm91cEl0ZW0oaXRlbTogSVNlcmllQ29udGFpbmVyKTogYm9vbGVhbntcclxuXHRcdGlmKGl0ZW0gPT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0aWYoaXRlbS52aXNpYmxlQ2hpbGRzICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0aW5zZXJ0Q2FsY3VsYXRpb24oaXRlbSk6IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbnx1bmRlZmluZWR7XHJcblx0XHRpZihpdGVtID09IHVuZGVmaW5lZCl7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHZhciBzZWxlY3RlZEl0ZW0gPSBpdGVtLml0ZW07XHJcblx0XHR2YXIgc2VyaWVHcm91cDtcclxuXHRcdGlmKHNlbGVjdGVkSXRlbSBpbnN0YW5jZW9mIFNlcmllR3JvdXAgfHwgc2VsZWN0ZWRJdGVtIGluc3RhbmNlb2YgU2lnbmFsQ2F0ZWdvcnkpe1xyXG5cdFx0XHQvLyBDYWxjdWxhdGlvbiBjYW4gb25seSBiZSBpbnNlcnQgYXQgZ3JvdXBzIG9yIGNhdGVnb3JpZXNcclxuXHRcdFx0c2VyaWVHcm91cCA9IHNlbGVjdGVkSXRlbTtcclxuXHRcdH1cclxuXHRcdGVsc2V7XHJcblx0XHRcdHNlcmllR3JvdXAgPSBzZWxlY3RlZEl0ZW0uZ2V0U2VyaWVHcm91cCgpO1xyXG5cdFx0fVxyXG5cdFx0aWYoc2VyaWVHcm91cCAhPSB1bmRlZmluZWQpe1xyXG5cclxuXHRcdFx0dGhpcy5hY3RpdmF0ZUVkaXRNb2RlKHRydWUpO1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5hZGRDYWxjdWxhdGlvblRvQ29udGFpbmVyKHNlcmllR3JvdXApO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcclxuXHR9XHJcblx0XHJcblx0cHJpdmF0ZSBhZGRDYWxjdWxhdGlvblRvQ29udGFpbmVyKGNvbnRhaW5lcjogSVNlcmllQ29udGFpbmVyKTogU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9ufHVuZGVmaW5lZHtcclxuXHRcdGlmKHRoaXMuX3Nlcmllc1Byb3ZpZGVyID09IHVuZGVmaW5lZCl7XHJcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XHJcblx0XHR9XHJcblx0XHRsZXQgY2FsY3VsYXRpb24gPSBuZXcgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uKFwiQ2FsY3VsYXRpb25cIiwgdGhpcy5fc2VyaWVzUHJvdmlkZXIpO1xyXG5cdFx0dGhpcy5fc2VyaWVDb250YWluZXJUb1NlbGVjdEFmdGVyUmVmcmVzaCA9IGNhbGN1bGF0aW9uO1xyXG5cdFx0Y29udGFpbmVyLmFkZFNlcmllQ29udGFpbmVyKGNhbGN1bGF0aW9uLCAtMSk7XHJcblx0XHRyZXR1cm4gY2FsY3VsYXRpb247XHJcbiAgICB9XHJcblxyXG5cdHB1YmxpYyBnZXRDb21wb25lbnRTZXR0aW5ncyhvbmx5TW9kaWZpZWQ6IGJvb2xlYW4pOiBDb21wb25lbnRTZXR0aW5nc3tcclxuXHRcdHRoaXMuY29tcG9uZW50LnNldFNldHRpbmcoV2lkZ2V0QmFzZS5XaWRnZXRTZXR0aW5nSWQsIHRoaXMuZ2V0V2lkZ2V0U2V0dGluZ3MoKSk7XHJcblx0XHRyZXR1cm4gc3VwZXIuZ2V0Q29tcG9uZW50U2V0dGluZ3Mob25seU1vZGlmaWVkKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXRDb21wb25lbnRTZXR0aW5ncyhkYXRhOiBDb21wb25lbnRTZXR0aW5ncykge1xyXG5cdFx0c3VwZXIuc2V0Q29tcG9uZW50U2V0dGluZ3MoZGF0YSk7XHJcblx0XHR0aGlzLnNldFdpZGdldFNldHRpbmdzKHRoaXMuY29tcG9uZW50LmdldFNldHRpbmcoV2lkZ2V0QmFzZS5XaWRnZXRTZXR0aW5nSWQpKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2V0V2lkZ2V0U2V0dGluZ3MoKTogYW55e1xyXG5cdFx0bGV0IHNldHRpbmdzID0ge1wiZWRpdE1vZGVBY3RpdmVcIjogdGhpcy5lZGl0TW9kZUFjdGl2ZSxcclxuXHRcdFx0XHRcdFx0XCJ3aWR0aFwiOiB0aGlzLl9hY3R1YWxXaWR0aFxyXG5cdFx0XHRcdFx0XHR9O1xyXG5cdFx0cmV0dXJuIHNldHRpbmdzO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBzZXRXaWRnZXRTZXR0aW5ncyhkYXRhOiBhbnkpIHtcclxuXHRcdGlmKGRhdGEgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5lZGl0TW9kZUFjdGl2ZSA9IChkYXRhW1wiZWRpdE1vZGVBY3RpdmVcIl0pO1xyXG5cdFx0dGhpcy5fYWN0dWFsV2lkdGggPSBkYXRhW1wid2lkdGhcIl07XHJcblx0fVxyXG5cclxuXHRhY3RpdmF0ZUVkaXRNb2RlKGFjdGl2YXRlOiBib29sZWFuKXtcclxuXHJcblx0XHQvLyBTaG93IG9yIGhpZGUgZWRpdCBtb2RlIGNvbHVtbnNcclxuXHRcdGxldCB0cmVlT2JqZWN0ID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpOyBcclxuXHRcdGxldCB2YWx1ZUNvbHVtbiA9IHRyZWVPYmplY3QuZ2V0Q29sdW1uQnlGaWVsZChTaWduYWxNYW5hZ2VyV2lkZ2V0LnZhbHVlQ29sdW1uSWQpO1xyXG5cdFx0bGV0IGRlc2NyaXB0aW9uQ29sdW1uID0gdHJlZU9iamVjdC5nZXRDb2x1bW5CeUZpZWxkKFNpZ25hbE1hbmFnZXJXaWRnZXQuZGVzY3JpcHRpb25Db2x1bW5JZCk7XHJcblx0XHRsZXQgY29sb3JDb2x1bW4gPSB0cmVlT2JqZWN0LmdldENvbHVtbkJ5RmllbGQoU2lnbmFsTWFuYWdlcldpZGdldC5jb2xvckNvbHVtbklkKTtcclxuXHRcdGlmKGFjdGl2YXRlID09IHRydWUpe1xyXG5cdFx0XHR0cmVlT2JqZWN0LnNob3dDb2x1bW4odmFsdWVDb2x1bW4uaGVhZGVyVGV4dCk7XHJcblx0XHRcdHRyZWVPYmplY3Quc2hvd0NvbHVtbihkZXNjcmlwdGlvbkNvbHVtbi5oZWFkZXJUZXh0KTtcclxuXHRcdFx0dHJlZU9iamVjdC5zaG93Q29sdW1uKGNvbG9yQ29sdW1uLmhlYWRlclRleHQpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZXtcclxuXHRcdFx0dHJlZU9iamVjdC5oaWRlQ29sdW1uKHZhbHVlQ29sdW1uLmhlYWRlclRleHQpO1xyXG5cdFx0XHR0cmVlT2JqZWN0LmhpZGVDb2x1bW4oZGVzY3JpcHRpb25Db2x1bW4uaGVhZGVyVGV4dCk7XHJcblx0XHRcdHRyZWVPYmplY3QuaGlkZUNvbHVtbihjb2xvckNvbHVtbi5oZWFkZXJUZXh0KTtcclxuXHRcdH1cclxuXHRcdHRoaXMuc2V0RWRpdE1vZGUoYWN0aXZhdGUpO1xyXG5cdFx0dGhpcy5yZWZyZXNoKCk7XHJcblx0XHRQZXJzaXN0RGF0YVByb3ZpZGVyLmdldEluc3RhbmNlKCkuc2V0RGF0YVdpdGhJZCh0aGlzLmNvbXBvbmVudC5pZCwgdGhpcy5nZXRDb21wb25lbnRTZXR0aW5ncyh0cnVlKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRydWUgaWYgb25lIG9mIHRoZSBpdGVtcyBkZWxldGVkIGhhcyBiZWVuIGRvbmUgdGhyb3VnaCB0aGUgdHJhY2Ugb2YgbWFwcENvY2twaXRcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Kn0gc2VsZWN0ZWRJdGVtc1xyXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHVibGljIGNvbnRhaW5zSXRlbVdpdGhpblJlY2VudE9yVXBsb2FkZWQoc2VsZWN0ZWRJdGVtczogQXJyYXk8YW55Pik6IGJvb2xlYW4ge1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzZWxlY3RlZEl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmICh0aGlzLmlzSXRlbUluU2lnbmFsQ2F0ZWdvcnkoc2VsZWN0ZWRJdGVtc1tpXS5pdGVtLCBTaWduYWxDYXRlZ29yeS5DYXRlZ29yeUlkVXBsb2FkZWQpIHx8IHRoaXMuaXNJdGVtSW5TaWduYWxDYXRlZ29yeShzZWxlY3RlZEl0ZW1zW2ldLml0ZW0sIFNpZ25hbENhdGVnb3J5LkNhdGVnb3J5SWRSZWNlbnQpKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgaXRlbSBzZWxlY3RlZCBiZWxvbmdzIHRvIHRoZSBzaWduYWwgY2F0ZWdvcnkgc2VsZWN0ZWRcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtJU2VyaWVOb2RlIHwgSVNlcmllQ29udGFpbmVyfSBpdGVtXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHNpZ25hbENhdGVnb3J5SWRcclxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaXNJdGVtSW5TaWduYWxDYXRlZ29yeShpdGVtOiBJU2VyaWVOb2RlIHwgSVNlcmllQ29udGFpbmVyLCBzaWduYWxDYXRlZ29yeUlkOiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdGxldCBwYXJlbnQgPSBpdGVtLnBhcmVudDtcclxuXHJcblx0XHRpZiAocGFyZW50IGluc3RhbmNlb2YgU2lnbmFsQ2F0ZWdvcnkgJiYgcGFyZW50LmlkID09IHNpZ25hbENhdGVnb3J5SWQpIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmICghKHBhcmVudCBpbnN0YW5jZW9mIFNpZ25hbFJvb3QpKXtcclxuXHRcdFx0cmV0dXJuIHRoaXMuaXNJdGVtSW5TaWduYWxDYXRlZ29yeShwYXJlbnQhLCBzaWduYWxDYXRlZ29yeUlkKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTaG93cyBtZXNzYWdlIGJveCBhY2NvcmRpbmcgdG8gdHlwZVxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge21lc3NhZ2VCb3hUeXBlfSB0eXBlXHJcblx0ICogQHBhcmFtIHtNYXA8c3RyaW5nLCBzdHJpbmc+fSBmaWxlQ29udGVudHNcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgc2hvd01lc3NhZ2VCb3godHlwZTogbWVzc2FnZUJveFR5cGUsIGZpbGVDb250ZW50czogTWFwPHN0cmluZywgc3RyaW5nPikge1xyXG5cdFx0aWYodHlwZSA9PT0gbWVzc2FnZUJveFR5cGUuV2FybmluZykge1xyXG5cdFx0XHR0aGlzLnNob3dXYXJuaW5nV2hlbkltcG9ydGluZ0ZpbGVzKCk7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmKHR5cGUgPT09IG1lc3NhZ2VCb3hUeXBlLlllc05vKSB7XHJcblx0XHRcdHRoaXMuc2hvd01lc3NhZ2VCb3hXaGVuSW1wb3J0aW5nTUNFRmlsZXMoZmlsZUNvbnRlbnRzKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSB3YXJuaW5nIG1lc3NhZ2Ugd2hlbiB0aGUgdXNlciBpbXBvcnRzIGEgLm1jZSBmaWxlIGFuZCBvdGhlciBmaWxlcyB0b29cclxuXHQgKlxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBzaG93V2FybmluZ1doZW5JbXBvcnRpbmdGaWxlcygpIHtcclxuXHRcdG5ldyBBbGVydERpYWxvZygpLmNyZWF0ZU1lc3NhZ2VCb3godGhpcy5fd2FybmluZ0ltcG9ydGluZ0hlYWRlcix0aGlzLl93YXJuaW5nSW1wb3J0aW5nQ29udGVudCwgbWVzc2FnZUJveFR5cGUuV2FybmluZywgdW5kZWZpbmVkKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBtZXNzYWdlIGJveCB0aGF0IGxldHMgdXNlciBkZWNpZGUgdG8gZGVsZXRlIHNlbGVjdGVkIGRhdGEgb3Igbm90XHJcblx0ICpcclxuXHQgKiBAcGFyYW0geyp9IGRlbGV0ZWRJdGVtc1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHVibGljIHNob3dNZXNzYWdlQm94Rm9yRGVsZXRpbmdJdGVtKGRlbGV0ZWRJdGVtcykge1xyXG5cdFx0bGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcblx0XHRsZXQgc2VsZiA9IHRoaXM7XHJcblx0XHRcclxuXHRcdG5ldyBBbGVydERpYWxvZygpLmNyZWF0ZU1lc3NhZ2VCb3godGhpcy5fZGVsZXRlSXRlbXNIZWFkZXIsdGhpcy5fZGVsZXRlSXRlbXNDb250ZW50LCBtZXNzYWdlQm94VHlwZS5DYW5jZWxEZWxldGUsIGRlZmVycmVkKTtcclxuXHJcblx0XHQkLndoZW4oZGVmZXJyZWQpLmRvbmUoZnVuY3Rpb24oKXtcclxuXHRcdFx0c2VsZi5kZWxldGVJdGVtcyhkZWxldGVkSXRlbXMpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbWVzc2FnZSBib3ggdGhhdCBsZXRzIHVzZXIgZGVjaWRlIHRvIGltcG9ydCAubWNlIGZpbGUgbmFkIGRlbGV0ZSBhbGwgZGF0YSBvciBub3RcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtNYXA8c3RyaW5nLCBzdHJpbmc+fSBmaWxlQ29udGVudHNcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgc2hvd01lc3NhZ2VCb3hXaGVuSW1wb3J0aW5nTUNFRmlsZXMoZmlsZUNvbnRlbnRzOiBNYXA8c3RyaW5nLCBzdHJpbmc+KSB7XHJcblx0XHRsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuXHRcdGxldCBzZWxmID0gdGhpcztcclxuXHRcdFxyXG5cdFx0bmV3IEFsZXJ0RGlhbG9nKCkuY3JlYXRlTWVzc2FnZUJveCh0aGlzLl9NQ0VGaWxlc0ltcG9ydGVkSGVhZGVyLHRoaXMuX01DRUZpbGVzSW1wb3J0ZWRDb250ZW50LCBtZXNzYWdlQm94VHlwZS5ZZXNObywgZGVmZXJyZWQpO1xyXG5cdFx0XHJcblx0XHQkLndoZW4oZGVmZXJyZWQpLmRvbmUoZnVuY3Rpb24oKXtcclxuXHRcdFx0c2VsZi5zdGFydEltcG9ydChmaWxlQ29udGVudHMpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZWxldGUgc2VsZWN0ZWQgaXRlbXNcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Kn0gaXRlbXNcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBkZWxldGVJdGVtcyhpdGVtcykge1xyXG5cdFx0dGhpcy5lbmFibGVUcmVlR3JpZFJlZnJlc2goZmFsc2UpO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZUl0ZW0oaXRlbXNbaV0uaXRlbSk7XHJcblx0XHR9XHJcblx0XHR0aGlzLmVuYWJsZVRyZWVHcmlkUmVmcmVzaCh0cnVlKTtcclxuXHRcdC8vUmVmcmVzaCB0cmVlZ3JpZCBqdXN0IHdoZW4gYWxsIGl0ZW1zIGhhdmUgYmVlbiBkZWxldGVkXHJcblx0XHR0aGlzLnJlZnJlc2goKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlbGV0ZSBhIHNwZWNpZmljIGl0ZW1cclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsqfSBpdGVtXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGRlbGV0ZUl0ZW0oaXRlbSl7XHJcblx0XHRpZihpdGVtLmNhbkRlbGV0ZSl7XHJcblx0XHRcdGlmKGl0ZW0gaW5zdGFuY2VvZiBTZXJpZUNvbnRhaW5lcil7XHJcblx0XHRcdFx0dGhpcy5yZW1vdmVTZXJpZUNvbnRhaW5lcihpdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNle1xyXG5cdFx0XHRcdHRoaXMucmVtb3ZlU2VyaWVOb2RlKGl0ZW0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqICBSZW1vdmUgdGhlIHNpZ25hbCBjb250YWluZXIgd2l0aCBhbGwgc3ViIGNvbnRhaW5lcnMgYW5kIHNpZ25hbHMgZnJvbSBkYXRhbW9kZWxcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtJU2VyaWVDb250YWluZXJ9IHNlcmllR3JvdXBcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgcmVtb3ZlU2VyaWVDb250YWluZXIoc2VyaWVHcm91cDogSVNlcmllQ29udGFpbmVyKXtcclxuXHRcdCg8SVNpZ25hbE1hbmFnZXJEYXRhTW9kZWw+dGhpcy5fZGF0YU1vZGVsKS5yZW1vdmVTZXJpZUNvbnRhaW5lcihzZXJpZUdyb3VwKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgdGhlIHNpZ25hbCBmcm9tIGRhdGFtb2RlbFxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge0lTZXJpZU5vZGV9IHNlcmllTm9kZVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSByZW1vdmVTZXJpZU5vZGUoc2VyaWVOb2RlOiBJU2VyaWVOb2RlKXtcclxuXHRcdCg8SVNpZ25hbE1hbmFnZXJEYXRhTW9kZWw+dGhpcy5fZGF0YU1vZGVsKS5yZW1vdmVTZXJpZU5vZGUoc2VyaWVOb2RlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEV4cG9ydHMgYSBzZXJpZUdyb3VwXHJcblx0ICpcclxuXHQgKiBAcHVibGljXHJcblx0ICogQHBhcmFtIHtBcnJheTxFeHBvcnRTZXJpZUdyb3VwPn0gZWxlbWVudHNcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlclRyZWVHcmlkXHJcblx0ICovXHJcblx0cHVibGljIGV4cG9ydFNlcmllR3JvdXAoZWxlbWVudHM6IEFycmF5PEV4cG9ydFNlcmllR3JvdXA+KXtcclxuXHRcdHRoaXMuc2V0QnVzeUluZm9ybWF0aW9uKG5ldyBCdXN5SW5mb3JtYXRpb24oXCJFeHBvcnRpbmcgZGF0YS4uLlwiLCBJbWFnZUlkLmRlZmF1bHRJbWFnZSwgNDgsIHRydWUpKTtcclxuXHRcdHRoaXMuc2V0QnVzeSh0cnVlKTtcclxuXHRcdC8vIFRpbWVvdXQgbmVlZGVkIHRvIHNob3cgdGhlIGJ1c3lzY3JlZW4gYmVmb3JlIGV4cG9ydGluZyBkYXRhIFxyXG5cdFx0c2V0VGltZW91dCgoKSA9PiB0aGlzLmV4cG9ydENzdkRhdGEoZWxlbWVudHMpLCAyMDApO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogT3BlbnMgYSBmaWxlIHNlbGVjdCBkaWFsb2cgYW5kIGltcG9ydHMgYSBzZXJpZUdyb3VwIGZyb20gdGhlIGZpbGVcclxuXHQgKlxyXG5cdCAqIEBwdWJsaWNcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlclRyZWVHcmlkXHJcblx0ICovXHJcblx0cHVibGljIGltcG9ydFNlcmllR3JvdXAoKXtcclxuXHRcdHRoaXMuX3NlcmllQ29udGFpbmVyVG9TZWxlY3RBZnRlclJlZnJlc2ggPSB1bmRlZmluZWQ7XHJcblx0XHR0aGlzLl9maWxlUHJvdmlkZXIuZXZlbnRVcGxvYWREYXRhRmluaXNoZWQuYXR0YWNoKHRoaXMuX3VwbG9hZERhdGFGaW5pc2hlZEhhbmRsZXIpO1xyXG5cdFx0dGhpcy5fZmlsZVByb3ZpZGVyLnVwbG9hZERhdGEoXCIuY3N2LCAubWNlLCAubWNlMVwiLCB0cnVlKTsgLy8gT25seSBzaG93L2FjY2VwdCAqLmNzdiwgKi5tY2UsICoubWNlMSBmaWxlc1xyXG5cdH1cclxuXHJcblx0cHVibGljIGV4cG9ydFNpZ25hbE1hbmFnZXJEYXRhKCl7XHJcblx0XHR0aGlzLnNldEJ1c3lJbmZvcm1hdGlvbihuZXcgQnVzeUluZm9ybWF0aW9uKFwiRXhwb3J0aW5nIGRhdGEuLi5cIiwgSW1hZ2VJZC5kZWZhdWx0SW1hZ2UsIDQ4LCB0cnVlKSk7XHJcblx0XHR0aGlzLnNldEJ1c3kodHJ1ZSk7XHJcblx0XHQvLyBUaW1lb3V0IG5lZWRlZCB0byBzaG93IHRoZSBidXN5c2NyZWVuIGJlZm9yZSBleHBvcnRpbmcgZGF0YSBcclxuXHRcdHNldFRpbWVvdXQoKCkgPT4gdGhpcy5leHBvcnREYXRhKCksIDIwMCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBPY2N1cnMgYWZ0ZXIgcmVhZGluZyBkYXRhIGZyb20gZmlsZSh0cmFjZSBpbXBvcnQgZGF0YSlcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fSBzZW5kZXJcclxuXHQgKiBAcGFyYW0ge01hcDxzdHJpbmcsIHN0cmluZz59IGFyZ3NcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgb25VcGxvYWREYXRhRmluaXNoZWQoc2VuZGVyOiBIVE1MSW5wdXRFbGVtZW50LCBhcmdzOiBNYXA8c3RyaW5nLCBzdHJpbmc+KXtcclxuXHRcdHRoaXMuc2V0QnVzeUluZm9ybWF0aW9uKG5ldyBCdXN5SW5mb3JtYXRpb24oXCJJbXBvcnRpbmcgZGF0YS4uLlwiLCBJbWFnZUlkLmRlZmF1bHRJbWFnZSwgNDgsIHRydWUpKTtcclxuXHRcdGxldCBtc2dCb3hUeXBlID0gdGhpcy5jaGVja01lc3NhZ2VCb3hUeXBlKGFyZ3MpOyBcclxuXHJcblx0XHRpZiAobXNnQm94VHlwZSAhPSB1bmRlZmluZWQpIHtcclxuXHRcdFx0dGhpcy5zaG93TWVzc2FnZUJveChtc2dCb3hUeXBlLCBhcmdzKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLnN0YXJ0SW1wb3J0KGFyZ3MpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX2ZpbGVQcm92aWRlci5ldmVudFVwbG9hZERhdGFGaW5pc2hlZC5kZXRhY2godGhpcy5fdXBsb2FkRGF0YUZpbmlzaGVkSGFuZGxlcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBFeHBvcnRzIHRoZSBnaXZlbiBzaWduYWwgZ3JvdXAgdG8gVHJhY2VEYXRhLmNzdiBmaWxlXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7IEFycmF5PEV4cG9ydFNlcmllR3JvdXA+fSBlbGVtZW50c1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBleHBvcnRDc3ZEYXRhKGVsZW1lbnRzOiBBcnJheTxFeHBvcnRTZXJpZUdyb3VwPil7XHJcblx0XHRsZXQgZGF0YTtcclxuXHRcdGlmKHRoaXMuX3Nlcmllc1Byb3ZpZGVyICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdGRhdGEgPSBuZXcgRXhwb3J0SW1wb3J0SGVscGVyKHRoaXMuX3Nlcmllc1Byb3ZpZGVyKS5leHBvcnRUcmFjZURhdGEoZWxlbWVudHMpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZXtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihcIlNlcmllc1Byb3ZpZGVyIGlzIG5vdCBhdmFpbGFibGUhXCIpXHJcblx0XHR9XHJcblx0XHRpZihkYXRhICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0dmFyIGJsb2IgPSBuZXcgQmxvYihbZGF0YV0sIHsgdHlwZTogXCJ0ZXh0L2NzdlwiIH0pO1xyXG5cdFx0XHRGaWxlUHJvdmlkZXIuZG93bmxvYWREYXRhKFwiVHJhY2VEYXRhLmNzdlwiLCBibG9iKTsgICAgXHJcblx0XHR9XHJcblx0XHR0aGlzLnNldEJ1c3koZmFsc2UpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRXhwb3J0cyB0aGUgc2lnbmFsIG1hbmFnZXIgZGF0YShkYXRhbW9kZWwsIHNlcmllcyBwcm92aWRlciwgLi4uKVxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZXhwb3J0RGF0YSgpe1xyXG5cdFx0aWYodGhpcy5fc2VyaWVzUHJvdmlkZXIgIT0gdW5kZWZpbmVkKXsgLy8gU2VyaWVzUHJvdmlkZXIgbmVlZGVkIHRvIGV4cG9ydCBkYXRhXHJcblx0XHRcdHRyeXtcclxuXHRcdFx0XHRsZXQgY29tcG9uZW50cyA9IHRoaXMuZ2V0Q29tcG9uZW50c1RvRXhwb3J0KCk7XHJcblx0XHRcdFx0bGV0IHNldHRpbmdPYmplY3RzID0gdGhpcy5nZXRTZXR0aW5nT2JqZWN0c1RvRXhwb3J0KCk7XHJcblx0XHRcdFx0bGV0IHN0cmluZ0RhdGEgPSBNY2VFeHBvcnRJbXBvcnRIZWxwZXIuZ2V0RXhwb3J0RGF0YShjb21wb25lbnRzLCBzZXR0aW5nT2JqZWN0cyk7XHJcblx0XHRcdFx0dmFyIGJsb2IgPSBuZXcgQmxvYihbc3RyaW5nRGF0YV0sIHsgdHlwZTogXCJ0ZXh0L2h0bWxcIiB9KTtcclxuXHRcdFx0XHRGaWxlUHJvdmlkZXIuZG93bmxvYWREYXRhKFwiRXhwb3J0Lm1jZTFcIiwgYmxvYik7ICAgIFxyXG5cdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0aWYoTWNlQ29udmVyc2lvbkVycm9yLmlzTWNlQ29udmVyc2lvbkVycm9yKGUpKSB7XHJcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGUudG9TdHJpbmcoKSlcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gXHJcblx0XHR9XHJcblx0XHRlbHNle1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKFwiU2VyaWVzUHJvdmlkZXIgZm9yIGV4cG9ydCBub3QgYXZhaWxhYmxlIVwiKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuc2V0QnVzeShmYWxzZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBjb21wb25lbnRzIGluIGEgZGVmaW5lZCBvcmRlciB3aGljaCBzaG91bGQgYmUgY2xlYXJlZCBiZWZvcmUgaW1wb3J0aW5nIG5ldyBzZXR0aW5nXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm5zIHtBcnJheTxJQ29tcG9uZW50Pn1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZ2V0Q29tcG9uZW50c1RvQ2xlYXIoKTogQXJyYXk8SUNvbXBvbmVudD57XHJcblx0XHRsZXQgY29tcG9uZW50c1RvQ2xlYXIgPSBuZXcgQXJyYXk8SUNvbXBvbmVudD4oKTtcclxuXHRcdGNvbXBvbmVudHNUb0NsZWFyLnB1c2godGhpcy5kYXRhTW9kZWwpOyAvLyBTaWduYWxNYW5hZ2VyRGF0YU1vZGVsXHJcblx0XHRpZih0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0Y29tcG9uZW50c1RvQ2xlYXIucHVzaCh0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwpOyAvLyBDaGFydE1hbmFnZXJEYXRhTW9kZWxcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLl9zZXJpZXNQcm92aWRlciAhPSB1bmRlZmluZWQpIHtcclxuXHRcdFx0Y29tcG9uZW50c1RvQ2xlYXIucHVzaCh0aGlzLl9zZXJpZXNQcm92aWRlcik7IC8vIFNlcmllc1Byb3ZpZGVyIG11c3QgYmUgaW1wb3J0ZWQgZmlyc3RcclxuICAgICAgICB9XHJcblxyXG5cdFx0cmV0dXJuIGNvbXBvbmVudHNUb0NsZWFyO1xyXG5cdH1cclxuICAgIFx0XHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgY29tcG9uZW50cyB3aGljaCBzaG91bGQgYmUgZXhwb3J0ZWQvaW1wb3J0ZWQgZnJvbSB0aGUgbWNlIGZpbGUgaW4gdGhlIGdpdmVuIG9yZGVyXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm5zIHtBcnJheTxJQ29tcG9uZW50Pn1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZ2V0Q29tcG9uZW50c1RvRXhwb3J0KCk6IEFycmF5PElDb21wb25lbnQ+e1xyXG5cdFx0bGV0IGV4cG9ydENvbXBvbmVudHMgPSBuZXcgQXJyYXk8SUNvbXBvbmVudD4oKTtcclxuXHRcdGlmICh0aGlzLl9zZXJpZXNQcm92aWRlciAhPSB1bmRlZmluZWQpIHtcclxuXHRcdFx0ZXhwb3J0Q29tcG9uZW50cy5wdXNoKHRoaXMuX3Nlcmllc1Byb3ZpZGVyKTsgLy8gU2VyaWVzUHJvdmlkZXIgbXVzdCBiZSBpbXBvcnRlZCBmaXJzdFxyXG4gICAgICAgIH1cclxuXHRcdGV4cG9ydENvbXBvbmVudHMucHVzaCh0aGlzLmRhdGFNb2RlbCk7IC8vIFNpZ25hbE1hbmFnZXJEYXRhTW9kZWxcclxuXHRcdGlmKHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRleHBvcnRDb21wb25lbnRzLnB1c2godGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsKTsgLy8gQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsXHJcblx0XHR9ICAgICAgIFxyXG5cdFxyXG5cdFx0cmV0dXJuIGV4cG9ydENvbXBvbmVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcblx0ICogUmV0dXJucyBhbGwgc2V0dGluZ3Mgb2JqZWN0cyB3aGljaCBzaG91bGQgYmUgZXhwb3J0ZWRcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHJldHVybnMge0FycmF5PElTZXR0aW5nc09iamVjdD59XHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGdldFNldHRpbmdPYmplY3RzVG9FeHBvcnQoKTogQXJyYXk8SVNldHRpbmdzT2JqZWN0PiB7XHJcblx0XHRsZXQgc2V0dGluZ3NPYmplY3RzID0gbmV3IEFycmF5PElTZXR0aW5nc09iamVjdD4oKTtcclxuXHRcdFxyXG5cdFx0Ly8gZ2V0IGN1cnJlbnQgY3Vyc29yc3RhdGVzXHJcblx0XHRsZXQgY3Vyc29yc3RhdGVzID0gQ29tcG9uZW50RGF0YUh1Yi5yZWFkU2hhcmVkPEN1cnNvclN0YXRlcz4odGhpcywgXCJhcHA6OnRyYWNlIHZpZXcgY2hhcnQgc3RhdGVzXCIsIFwiY3Vyc29yIHN0YXRlc1wiLCBDdXJzb3JTdGF0ZXMpO1xyXG5cdFx0c2V0dGluZ3NPYmplY3RzLnB1c2goY3Vyc29yc3RhdGVzKTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIHNldHRpbmdzT2JqZWN0cztcclxuICAgIH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgYnVzeSBzY3JlZW4gYW5kIHN0YXJ0IGltcG9ydGluZyBkYXRhXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7TWFwPHN0cmluZywgc3RyaW5nPn0gYXJnc1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBzdGFydEltcG9ydChhcmdzOiBNYXA8c3RyaW5nLCBzdHJpbmc+KSB7XHJcblx0XHR0aGlzLnNldEJ1c3kodHJ1ZSk7XHJcblx0XHQvLyBUaW1lb3V0IG5lZWRlZCB0byBzaG93IHRoZSBidXN5c2NyZWVuIGJlZm9yZSBpbXBvcnRpbmcgZGF0YSBcclxuXHRcdHNldFRpbWVvdXQoKCkgPT4gdGhpcy5pbXBvcnREYXRhKGFyZ3MpLCAyMDApO1xyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIGltcG9ydHMgdGhlIGdpdmVuIGZpbGVkYXRhIHdpdGggdGhlIGdpdmVuIGZpbGVuYW1lIHRvIHRoZSBzaWduYWwgbWFuYWdlciBkYXRhbW9kZWxcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtNYXA8c3RyaW5nLCBzdHJpbmc+fSBmaWxlQ29udGVudHNcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaW1wb3J0RGF0YShmaWxlQ29udGVudHM6IE1hcDxzdHJpbmcsIHN0cmluZz4pe1xyXG5cdFx0ZmlsZUNvbnRlbnRzLmZvckVhY2goKGZpbGVEYXRhLCBmaWxlbmFtZSkgPT4ge1xyXG5cdFx0XHRpZihmaWxlbmFtZS50b0xvd2VyQ2FzZSgpLmVuZHNXaXRoKFwiLmNzdlwiKSl7XHJcblx0XHRcdFx0aWYodGhpcy5fc2VyaWVzUHJvdmlkZXIgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0XHRcdGxldCBleHBvcnRJbXBvcnRIZWxwZXIgPSBuZXcgRXhwb3J0SW1wb3J0SGVscGVyKHRoaXMuX3Nlcmllc1Byb3ZpZGVyKTtcclxuXHRcdFx0XHRcdGxldCBzZXJpZUdyb3VwcyA9IGV4cG9ydEltcG9ydEhlbHBlci5pbXBvcnRUcmFjZURhdGEoZmlsZURhdGEsIGZpbGVuYW1lKTtcclxuXHRcdFx0XHRcdGxldCBzaWduYWxGaWxlID0gbmV3IFNlcmllQ29udGFpbmVyKGZpbGVuYW1lKTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0dGhpcy5zZXRDb250YWluZXJJZChzaWduYWxGaWxlKTtcclxuXHRcdFx0XHRcdHNlcmllR3JvdXBzLmZvckVhY2goc2VyaWVHcm91cCA9PntcdFxyXG5cdFx0XHRcdFx0XHRzaWduYWxGaWxlLmFkZFNlcmllQ29udGFpbmVyKHNlcmllR3JvdXAsIC0xKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdHRoaXMuX3NlcmllQ29udGFpbmVyVG9TZWxlY3RBZnRlclJlZnJlc2ggPSBzaWduYWxGaWxlO1xyXG5cdFx0XHRcdFx0KDxJU2lnbmFsTWFuYWdlckRhdGFNb2RlbD50aGlzLl9kYXRhTW9kZWwpLmFkZFNlcmllQ29udGFpbmVyKHNpZ25hbEZpbGUsIFNpZ25hbENhdGVnb3J5LkNhdGVnb3J5SWRJbXBvcnRlZCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2V7XHJcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKFwiU2VyaWVzUHJvdmlkZXIgaXMgbm90IGF2YWlsYWJsZSFcIik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKGZpbGVuYW1lLnRvTG93ZXJDYXNlKCkuZW5kc1dpdGgoXCIubWNlXCIpIHx8IGZpbGVuYW1lLnRvTG93ZXJDYXNlKCkuZW5kc1dpdGgoXCIubWNlMVwiKSl7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdHRoaXMuaW1wb3J0TUNFRmlsZShmaWxlRGF0YSk7XHJcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0aWYoTWNlQ29udmVyc2lvbkVycm9yLmlzTWNlQ29udmVyc2lvbkVycm9yKGUpKSB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZS50b1N0cmluZygpKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2V7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcihcIkltcG9ydCBmb3IgZmlsZSBmb3JtYXQgbm90IGltcGxlbWVudGVkOiBcIiArIGZpbGVuYW1lKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5zZXRCdXN5KGZhbHNlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdHlwZSBvZiBtZXNzYWdlIGJveCBuZWVkIGl0IChpZiBuZWVkIGl0KVxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge01hcDxzdHJpbmcsIHN0cmluZz59IGZpbGVDb250ZW50c1xyXG5cdCAqIEByZXR1cm5zIHsobWVzc2FnZUJveFR5cGUgfCB1bmRlZmluZWQpfVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBjaGVja01lc3NhZ2VCb3hUeXBlKGZpbGVDb250ZW50czogTWFwPHN0cmluZywgc3RyaW5nPik6IG1lc3NhZ2VCb3hUeXBlIHwgdW5kZWZpbmVkIHtcclxuXHRcdGxldCBpc1NpZ25hbE1hbmFnZXJFbXB0eSA9IHRoaXMuaXNTaWduYWxNYW5hZ2VyRW1wdHkodGhpcy5kYXRhTW9kZWwuZGF0YSk7XHJcblx0XHRsZXQgaXNUaGVyZU1DRUZpbGUgPSBmYWxzZTtcclxuXHJcblx0XHRmaWxlQ29udGVudHMuZm9yRWFjaCgoZmlsZURhdGEsIGZpbGVuYW1lKSA9PiB7XHJcblx0XHRcdGlmIChmaWxlbmFtZS50b0xvd2VyQ2FzZSgpLmVuZHNXaXRoKFwiLm1jZVwiKSB8fCBmaWxlbmFtZS50b0xvd2VyQ2FzZSgpLmVuZHNXaXRoKFwiLm1jZTFcIikpIHtcclxuXHRcdFx0XHRpc1RoZXJlTUNFRmlsZSA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmIChpc1RoZXJlTUNFRmlsZSAmJiBmaWxlQ29udGVudHMuc2l6ZSA+IDEpIHtcclxuXHRcdFx0cmV0dXJuIG1lc3NhZ2VCb3hUeXBlLldhcm5pbmc7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmKGlzVGhlcmVNQ0VGaWxlICYmICFpc1NpZ25hbE1hbmFnZXJFbXB0eSkge1xyXG5cdFx0XHRyZXR1cm4gbWVzc2FnZUJveFR5cGUuWWVzTm87XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdHJ1ZSBpZiB0aGVyZSBpcyBub3RoaW5nIGluIHRoZSBzaWduYWxNYW5hZ2VyXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Kn0gZGF0YVxyXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBpc1NpZ25hbE1hbmFnZXJFbXB0eShkYXRhKTogYm9vbGVhbiB7XHJcblx0XHRsZXQgaXNFbXB0eSA9IHRydWU7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKGRhdGFbaV0uY2hpbGRzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRpc0VtcHR5ID0gZmFsc2U7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBpc0VtcHR5O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGVsZXRlcyBhbGwgdHJhY2UgZGF0YSBhbmQgaW1wb3J0cyB0aGUgLm1jZSBmaWxlXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Kn0gZGF0YVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBpbXBvcnRNQ0VGaWxlKGZpbGVEYXRhKSB7XHJcblx0XHRpZih0aGlzLl9zZXJpZXNQcm92aWRlcil7IC8vIHNlcmllIHByb3ZpZGVyIG5lZWRlZCB0byBpbXBvcnQgZGF0YVxyXG5cdFx0XHR0aGlzLmVuYWJsZVRyZWVHcmlkUmVmcmVzaChmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDbGVhciBjb21wb25lbnRzIHdpdGggdGhlIGdpdmVuIG9yZGVyXHJcblx0XHRcdGxldCBjb21wb25lbnRzVG9DbGVhciA9IHRoaXMuZ2V0Q29tcG9uZW50c1RvQ2xlYXIoKTtcclxuXHRcdFx0TWNlRXhwb3J0SW1wb3J0SGVscGVyLmNsZWFyQ29tcG9uZW50cyhjb21wb25lbnRzVG9DbGVhcik7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgdGhlIGltcG9ydCBkYXRhIHRvIHRoZSBjb21wb25lbnRzIGluIHRoZSBnaXZlbiBvcmRlclxyXG5cdFx0XHRsZXQgZXhwb3J0Q29udGFpbmVyID0gRXhwb3J0Q29udGFpbmVyLmZyb21Kc29uKGZpbGVEYXRhKTtcclxuXHRcdFx0bGV0IGNvbXBvbmVudHMgPSB0aGlzLmdldENvbXBvbmVudHNUb0V4cG9ydCgpOyAvLyBJbXBvcnQgYW5kIEV4cG9ydCBjb21wb25lbnRzIGFyZSB0aGUgc2FtZSBzbyB3ZSBjYW4gdXNlIHRoZSBleHBvcnQgY29tcG9uZW50cyBhcnJheVxyXG5cdFx0XHRsZXQgc2V0dGluZ09iamVjdHMgPSB0aGlzLmdldFNldHRpbmdPYmplY3RzVG9FeHBvcnQoKTsgLy8gSW1wb3J0IGFuZCBFeHBvcnQgb2JqZWN0cyBhcmUgdGhlIHNhbWUgc28gd2UgY2FuIHVzZSB0aGUgZXhwb3J0IHNldHRpbmdzIG9iamVjdCBhcnJheVxyXG5cdFx0XHRNY2VFeHBvcnRJbXBvcnRIZWxwZXIuc2V0SW1wb3J0RGF0YShjb21wb25lbnRzLCBzZXR0aW5nT2JqZWN0cywgZXhwb3J0Q29udGFpbmVyKTtcclxuXHJcblx0XHRcdHRoaXMuZW5hYmxlVHJlZUdyaWRSZWZyZXNoKHRydWUpO1xyXG5cdFx0XHR0aGlzLnJlZnJlc2goKTtcclxuXHRcdH1cclxuXHRcdGVsc2V7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJTZXJpZXNQcm92aWRlciBmb3IgaW1wb3J0IG5vdCBhdmFpbGFibGUhXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2VsZWN0cyB0aGUgZ2l2ZW4gY29udGFpbmVyIGluIHRoZSB0cmVlIGdyaWQgYW5kIHNjcm9sbHMgdG8gaXQgaWYgb3V0IG9mIHRoZSB3aW5kb3cgKFRPRE86IE1vdmUgdG8gQmFzZUNsYXNzIGluY2wuIF9zZXJpZUNvbnRhaW5lclRvU2VsZWN0QWZ0ZXJSZWZyZXNoKVxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0geyhJU2VyaWVDb250YWluZXJ8dW5kZWZpbmVkKX0gY29udGFpbmVyXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHNlbGVjdEl0ZW0oY29udGFpbmVyOiBJU2VyaWVDb250YWluZXJ8dW5kZWZpbmVkKXtcclxuXHRcdGxldCB0cmVlT2JqZWN0ID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpOyBcclxuXHRcdGxldCByZWNvcmQgPSAoPGFueT50cmVlT2JqZWN0Lm1vZGVsKS5mbGF0UmVjb3Jkcy5maWx0ZXIocmVjb3JkID0+IHtyZXR1cm4gcmVjb3JkLml0ZW0gPT09IGNvbnRhaW5lcn0pWzBdO1xyXG5cdFx0aWYocmVjb3JkICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdC8vIGV4cGFuZCBwYXJlbnQgbm9kZSBpZiBpdCBpcyBjb2xsYXBzZWQgdG8gc2VlIHRoZSBuZXcgaW1wb3J0ZWQgdHJhY2UgZGF0YVxyXG5cdFx0XHRpZihyZWNvcmQucGFyZW50SXRlbS5leHBhbmRTdGF0ZSA9PSBmYWxzZSl7XHJcblx0XHRcdFx0dHJlZU9iamVjdC5leHBhbmRDb2xsYXBzZVJvdyhyZWNvcmQucGFyZW50SXRlbS5pbmRleClcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gdHJlZU9iamVjdC5zY3JvbGxPZmZzZXQgbm90IHBvc3NpYmxlIGlmIHRoZXJlIHdvdWxkIGJlIHNvbWUgZnJlZSBzcGFjZSBhZnRlciB0aGUgbGFzdCBpdGVtIGluIHRoZSB0cmVlIGdyaWQgYWZ0ZXIgc2Nyb2xsaW5nIHRvIHRoZSBnaXZlbiBpdGVtXHJcblx0XHRcdC8vID0+IHNjcm9sbFRvQm90dG9tIGJlZm9yIHNjcm9sbCB0byBhIHNwZWNpYWwgb2Zmc2V0IGlmIHBvc3NpYmxlXHJcblx0XHRcdHRyZWVPYmplY3Quc2Nyb2xsVG9Cb3R0b20oKTtcclxuXHRcdFx0dHJlZU9iamVjdC5zZXRNb2RlbCh7XCJzZWxlY3RlZFJvd0luZGV4XCIgOiByZWNvcmQuaW5kZXggfSk7XHJcblx0XHRcdGxldCByb3dIZWlnaHQgPSB0cmVlT2JqZWN0Lm1vZGVsLnJvd0hlaWdodDtcclxuXHRcdFx0Ly8gc2Nyb2xsIGluZGV4IG5vdCB0aGUgc2FtZSBhcyB0aGUgc2VsZWN0ZWRJbmRleCA9PiBjb2xsYXBzZWQgbm9kZXMgbXVzdCBiZSBjb25zaWRlcmVkXHJcblx0XHRcdGxldCBzY3JvbGxJbmRleD0gdGhpcy5nZXRTY3JvbGxJbmRleCgoPGFueT50cmVlT2JqZWN0Lm1vZGVsKS5mbGF0UmVjb3JkcywgcmVjb3JkLmluZGV4KTtcclxuXHRcdFx0bGV0IHNjcm9sbE9mZnNldCA9ICAoc2Nyb2xsSW5kZXgtMSkqcm93SGVpZ2h0ITtcclxuXHRcdFx0dHJlZU9iamVjdC5zY3JvbGxPZmZzZXQoMCwgc2Nyb2xsT2Zmc2V0KTsgLy8gVXNlIHBhcmVudCBpbmRleCB0byBzZWUgdGhlIHBhcmVudCBub2RlIGluIHRoZSB2aWV3XHJcblx0XHRcdC8vKDxhbnk+dHJlZU9iamVjdCkudXBkYXRlU2Nyb2xsQmFyKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBpbmRleCBvZiBvbmx5IHRoZSB2aXNpYmxlKGV4cGFuZGVkKSByb3dzXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gcm93c1xyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSByb3dJbmRleFxyXG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9XHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGdldFNjcm9sbEluZGV4KHJvd3M6IEFycmF5PGFueT4sIHJvd0luZGV4OiBudW1iZXIpOiBudW1iZXJ7XHJcblx0XHRsZXQgc2Nyb2xsSW5kZXggPSAwO1xyXG5cdFx0Zm9yKGxldCBpPTA7IGk8IHJvd3MubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRpZihyb3dzW2ldLmluZGV4ID09IHJvd0luZGV4KXtcclxuXHRcdFx0XHRzY3JvbGxJbmRleCsrXHJcblx0XHRcdFx0cmV0dXJuIHNjcm9sbEluZGV4O1xyXG5cdFx0XHR9XHJcblx0XHRcdC8qaWYocm93c1tpXS5pdGVtIGluc3RhbmNlb2YgU2VyaWVHcm91cCl7XHJcblx0XHRcdFx0aWYodGhpcy5pc1Zpc2libGVTZXJpZUdyb3VwTm9kZShyb3dzW2ldKSA9PSBmYWxzZSl7XHJcblx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0c2Nyb2xsSW5kZXgrKztcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlICovaWYocm93c1tpXS5pdGVtIGluc3RhbmNlb2YgU2VyaWVDb250YWluZXIpe1xyXG5cdFx0XHRcdGlmKHRoaXMuaXNWaXNpYmxlU2VyaWVHcm91cE5vZGUocm93c1tpXSkgPT0gZmFsc2Upe1xyXG5cdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHNjcm9sbEluZGV4Kys7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZihyb3dzW2ldLml0ZW0gaW5zdGFuY2VvZiBTZXJpZU5vZGUpe1xyXG5cdFx0XHRcdGlmKHRoaXMuaXNWaXNpYmxlU2VyaWVOb2RlKHJvd3NbaV0pID09IGZhbHNlKXtcclxuXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRzY3JvbGxJbmRleCsrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gc2Nyb2xsSW5kZXg7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXQgdW5pcXVlIGlkIGZvciBpbXBvcnRlZCBkYXRhXHJcblx0ICpcclxuICAgICAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtTZXJpZUNvbnRhaW5lcn0gc2VyaWVDb250YWluZXJcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgc2V0Q29udGFpbmVySWQoc2VyaWVDb250YWluZXI6IFNlcmllQ29udGFpbmVyKSB7XHJcblx0XHRzZXJpZUNvbnRhaW5lci5pZCA9IHRoaXMuZ2V0VW5pcXVlSWQoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgYSB1bmlxdWUgaWQgZm9yIHRoZSBpbXBvcnRlZCBzZXJpZUNvbnRhaW5lclxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcmV0dXJuc1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBnZXRVbmlxdWVJZCgpIHtcclxuXHRcdGxldCBpbXBvcnRlZERhdGFJZHMgPSB0aGlzLmdldEltcG9ydGVkRGF0YUlkcygpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9MDsgaSA8IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgaWQgPSBpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIGlmKGltcG9ydGVkRGF0YUlkcy5pbmNsdWRlcyhpZCkgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJObyB1bmlxdWUgaWQgZm9yIHNlcmllQ29udGFpbmVyIGF2YWlsYWJsZSFcIik7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIGFuIGFycmF5IG9mIGFsbCBpZHMgZnJvbSB0aGUgaW1wb3J0ZWQgZnJvbSBmaWxlIGNhdGVnb3J5IFxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcmV0dXJucyB7QXJyYXk8c3RyaW5nPn1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZ2V0SW1wb3J0ZWREYXRhSWRzKCk6IEFycmF5PHN0cmluZz4ge1xyXG5cdFx0bGV0IGlkczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cdFx0bGV0IHNpZ25hbENhdGVnb3J5ID0gKDxJU2lnbmFsTWFuYWdlckRhdGFNb2RlbD50aGlzLl9kYXRhTW9kZWwpLmdldFNpZ25hbENhdGVnb3J5KFNpZ25hbENhdGVnb3J5LkNhdGVnb3J5SWRJbXBvcnRlZCk7XHJcblx0XHRzaWduYWxDYXRlZ29yeSEuZ2V0Q2hpbGRzKCkuZm9yRWFjaChjaGlsZCA9PiB7XHJcblx0XHRcdGlkcy5wdXNoKChjaGlsZCBhcyBTZXJpZUNvbnRhaW5lcikuaWQpO1xyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gaWRzO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBpc1Zpc2libGVTZXJpZUdyb3VwTm9kZShub2RlKTogYm9vbGVhbntcclxuXHRcdGlmKG5vZGUucGFyZW50SXRlbSAhPSBudWxsKXtcclxuXHRcdFx0aWYobm9kZS5wYXJlbnRJdGVtLmV4cGFuZFN0YXRlID09IGZhbHNlKXtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZihub2RlLnBhcmVudEl0ZW0ucGFyZW50SXRlbSAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRcdGlmKG5vZGUucGFyZW50SXRlbS5wYXJlbnRJdGVtLmV4cGFuZFN0YXRlID09IGZhbHNlKXtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBpc1Zpc2libGVTZXJpZU5vZGUobm9kZSk6IGJvb2xlYW57XHJcblx0XHRpZihub2RlLnBhcmVudEl0ZW0uZXhwYW5kU3RhdGUgPT0gZmFsc2UgfHwgbm9kZS5wYXJlbnRJdGVtLnBhcmVudEl0ZW0uZXhwYW5kU3RhdGUgPT0gZmFsc2Upe1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmKG5vZGUucGFyZW50SXRlbS5wYXJlbnRJdGVtLnBhcmVudEl0ZW0gIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0aWYobm9kZS5wYXJlbnRJdGVtLnBhcmVudEl0ZW0ucGFyZW50SXRlbS5leHBhbmRTdGF0ZSA9PSBmYWxzZSl7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgdHJlZUdyaWROb2RlRXhwYW5kZWRPckNvbGxhcHNlZCgpe1xyXG4gICAgICAgIC8vIFJlZnJlc2ggdG8gc2VlIGNvcnJlY3QgZXhwYW5kZWQvY29sbGFwc2VkIGljb25cclxuXHRcdHRoaXMucmVmcmVzaCgpO1xyXG5cdFx0Ly9QZXJzaXN0IGRhdGEgbW9kZWwgKGV4cGFuZFN0YXRlKVxyXG5cdFx0aWYgKHRoaXMuX2RhdGFNb2RlbCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdCg8YW55PnRoaXMuX2RhdGFNb2RlbCkuc2F2ZVNldHRpbmdzKCk7XHJcblx0XHR9XHJcblx0XHR0aGlzLnNhdmVUcmVlR3JpZFNldHRpbmdzKCk7XHJcbiAgICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIGNvbHVtbiB0ZW1wbGF0ZSBpbmZvcm1hdGlvbnNcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGNvbHVtbklkXHJcblx0ICogQHJldHVybnMge3N0cmluZ31cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZ2V0Q29sdW1uVGVtcGxhdGVEYXRhKGNvbHVtbklkOiBzdHJpbmcpIDogc3RyaW5ne1xyXG5cdFx0aWYoY29sdW1uSWQgPT0gU2lnbmFsTWFuYWdlcldpZGdldC5jb2xvckNvbHVtbklkKXtcclxuXHRcdFx0cmV0dXJuIGA8c2NyaXB0IHR5cGU9XCJ0ZXh0L3gtanNyZW5kZXJcIiBpZD1cInNtQ29sb3JDb2x1bW5UZW1wbGF0ZVwiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IHN0eWxlPSdoZWlnaHQ6MjBweDtwYWRkaW5nLWxlZnQ6N3B4O3BhZGRpbmctdG9wOjRweDsnIHVuc2VsZWN0YWJsZT0nb24nPlxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9J2UtY2VsbCcgc3R5bGU9J2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjE3cHg7aGVpZ2h0OjE3cHg7YmFja2dyb3VuZC1jb2xvcjoge3s6I2RhdGFbJ2NvbG9yJ119fTsnIHVuc2VsZWN0YWJsZT0nb24nPjwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvc2NyaXB0PmBcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYoY29sdW1uSWQgPT0gU2lnbmFsTWFuYWdlcldpZGdldC5uYW1lQ29sdW1uSWQpe1xyXG5cdFx0XHRyZXR1cm4gYDxzY3JpcHQgdHlwZT1cInRleHQveC1qc3JlbmRlclwiIGlkPVwic21OYW1lQ29sdW1uVGVtcGxhdGVcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBzdHlsZT0naGVpZ2h0OjIwcHg7JyB1bnNlbGVjdGFibGU9J29uJz5cclxuXHRcdFx0XHRcdFx0XHR7e2lmIGhhc0NoaWxkUmVjb3Jkc319XHJcblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPSdpbnRlbmQnIHN0eWxlPSdoZWlnaHQ6MXB4OyBmbG9hdDpsZWZ0OyB3aWR0aDp7ezpsZXZlbCoxMH19cHg7IGRpc3BsYXk6aW5saW5lLWJsb2NrOyc+PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0e3tlbHNlICFoYXNDaGlsZFJlY29yZHN9fVxyXG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz0naW50ZW5kJyBzdHlsZT0naGVpZ2h0OjFweDsgZmxvYXQ6bGVmdDsgd2lkdGg6e3s6bGV2ZWwqMTB9fXB4OyBkaXNwbGF5OmlubGluZS1ibG9jazsnPjwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdHt7L2lmfX1cclxuXHRcdFx0XHRcdFx0XHR7ezojZGF0YVsnaWNvbkRlZmluaXRpb24nXX19XHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz0nZS1jZWxsJyBzdHlsZT0nZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6MTAwJScgdW5zZWxlY3RhYmxlPSdvbic+e3s6I2RhdGFbJ25hbWUnXX19PC9kaXY+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9zY3JpcHQ+YDtcclxuXHRcdH1cclxuXHRcdHJldHVybiBcIlwiO1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBSYWlzZXMgdGhlIHNlcmllcyBkb3VibGUgY2xpY2sgZXZlbnRcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZXNcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgb25TZXJpZXNEb3VibGVDbGlja2VkKHNlcmllczogQmFzZVNlcmllcykge1xyXG5cdFx0dGhpcy5ldmVudFNlcmllRG91YmxlQ2xpY2tlZC5yYWlzZSh0aGlzLCBzZXJpZXMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmFpc2VzIHRoZSBjaGFuZ2Ugc2l6ZSBldmVudFxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gc2l6ZVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBvbkNoYW5nZVNpemUoc2l6ZTogbnVtYmVyKSB7XHJcblx0XHR0aGlzLmV2ZW50Q2hhbmdlU2l6ZS5yYWlzZSh0aGlzLCBzaXplKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1vdXNlIGlzIG5vdCBvdmVyIHNpZ25hbE1hbmFnZXIgd2hpbGUgZHJhZ2dpbmcgb3BlcmF0aW9uXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge0RyYWdEcm9wQXJnc30gYXJnc1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHVibGljIGRyb3BGb2N1c0xvc3QoYXJnczogRHJhZ0Ryb3BBcmdzKSB7XHJcbiAgICAgICAgdGhpcy5yZXNldEhpZ2hsaWdodEFyZWEoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgU2lnbmFsTWFuYWdlcldpZGdldCB9OyJdfQ==