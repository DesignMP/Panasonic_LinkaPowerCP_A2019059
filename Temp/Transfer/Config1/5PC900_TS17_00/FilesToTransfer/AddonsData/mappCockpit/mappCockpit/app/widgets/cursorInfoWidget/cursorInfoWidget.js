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
define(["require", "exports", "./interfaces/cursorInfoWidgetInterface", "../common/treeGridWidgetBase", "./view/cursorInfoTreeGridToolbar", "./model/ytCursorSignal", "./model/xyCursorSignal", "./model/fftCursorSignal", "./model/cursorInfo", "../common/states/cursorStates", "./model/dynamicCursorSignalTemplate", "./model/cursorSignal", "../../common/seriesHelper", "../../common/utilities/binSearch", "../common/states/chartViewToolbarStates", "../../models/common/series/seriesType", "./componentDefaultDefinition", "../../models/chartManagerDataModel/chartManagerDataModel", "../common/states/cursorType"], function (require, exports, cursorInfoWidgetInterface_1, treeGridWidgetBase_1, cursorInfoTreeGridToolbar_1, ytCursorSignal_1, xyCursorSignal_1, fftCursorSignal_1, cursorInfo_1, cursorStates_1, dynamicCursorSignalTemplate_1, cursorSignal_1, seriesHelper_1, binSearch_1, chartViewToolbarStates_1, seriesType_1, componentDefaultDefinition_1, chartManagerDataModel_1, cursorType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // defines the base id for the cursor value template
    var CURSOR_VALUE_ID = "cursorValue_";
    /**
     * implements the CursorInfo Widget
     *
     * @class CursorInfoWidget
     * @extends {TreeGridWidgetBase}
     */
    var CursorInfoWidget = /** @class */ (function (_super) {
        __extends(CursorInfoWidget, _super);
        function CursorInfoWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._cursorInfoTemplateDataModel = new Array();
            _this._cursorSignalsDataModelChangedHandler = function (sender, args) { return _this.onCursorSignalsDataModelChanged(sender, args); };
            _this._chartManagerModelChangedHandler = function (sender, data) { return _this.onChartManagerModelChanged(sender, data); };
            _this._selectedCursorSignals = new Array();
            _this._cursorInfoSelectorIsActive = false;
            _this._columnId_Visible = "visible";
            _this._columnId_Name = "name";
            _this._columnId_Value = "value";
            _this._columnId_Description = "description";
            _this._columnId_IconDefinition = "iconDefinition";
            _this._indeterminateStateValue = "indeterminate";
            // holds the current cursor states values. We initialize the member for default. The effective initialization takes place when the external shared instance
            // of the cursor states is created and reflected through the curorStates setter!
            _this._cursorStates = new cursorStates_1.CursorStates();
            return _this;
        }
        /**
         * Initialize the widget
         *
         *  @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.initialize = function () {
            _super.prototype.setHeaderFilterBarHidden.call(this); // Must be set before initialization to avoid showing the filterbar
            _super.prototype.initialize.call(this);
        };
        /**
         * Defines the height of the header
         *
         * @returns {number}
         * @memberof OverviewTreeGridWidgetBase
         */
        CursorInfoWidget.prototype.defineHeaderHeight = function () {
            return 30;
        };
        CursorInfoWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            // Get cursor signals datamodel
            this._cursorSignalsDataModel = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.CursorSignalsDataModelId);
            // Attach cursor signals datamodel event
            if (this._cursorSignalsDataModel != undefined) {
                this._cursorSignalsDataModel.eventModelChanged.attach(this._cursorSignalsDataModelChangedHandler);
            }
            // Get cursor signals datamodel
            this._chartManagerDataModel = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.ChartManagerDataModelId);
            this.attachChartManagerDataModelEvents();
            // Refresh treeGrid to see the loaded persisting data
            this.refresh();
            // Initialize scrollbars positions
            var scrollbarSettings = this.component.getSetting(treeGridWidgetBase_1.TreeGridWidgetBase.ScrollbarsSettingsId);
            this.setScrollBarSettings(scrollbarSettings);
            _super.prototype.setHeaderContent.call(this, "Cursors");
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 1, 80);
        };
        CursorInfoWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
        };
        Object.defineProperty(CursorInfoWidget.prototype, "cursorsStates", {
            /**
             * Gets the cursors states
             *
             * @protected
             * @type {CursorStates}
             * @memberof ChartViewToolbar
             */
            get: function () {
                return this._cursorStates;
            },
            /**
             * Sets the cursors states. The method is called automatically whenever a cursor state has been changed externally.
             *
             * @protected
             * @memberof ChartViewToolbar
             */
            set: function (cursorStates) {
                // update the backup field
                this._cursorStates = cursorStates;
                this.updateInfoCursorsWithNewStateValues(cursorStates);
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
        CursorInfoWidget.prototype.updateCursorStates = function (cursorStates) {
            // BINDINGSOURCE: dispatches the method call to bound targets
        };
        CursorInfoWidget.prototype.dispose = function () {
            this.detachChartManagerDataModelEvents();
            if (this._cursorSignalsDataModel != undefined) {
                // Detach cursor signals datamodel events
                this._cursorSignalsDataModel.eventModelChanged.detach(this._cursorSignalsDataModelChangedHandler);
                // Dispose cursor signals datamodel
                this._cursorSignalsDataModel.dispose();
            }
            _super.prototype.dispose.call(this);
        };
        CursorInfoWidget.prototype.getComponentSettings = function (onlyModified) {
            return _super.prototype.getComponentSettings.call(this, onlyModified);
        };
        CursorInfoWidget.prototype.setComponentSettings = function (data) {
            if (data != undefined) {
                _super.prototype.setComponentSettings.call(this, data);
            }
        };
        /**
         * Creates the column templates for the tree grid and adds them to the widget container
         *
         * @protected
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.createColumnTemplates = function () {
            var $widgetContainer = $(this.mainDiv);
            $widgetContainer.append(this.getColumnTemplateData(this._columnId_Visible));
            $widgetContainer.append(this.getColumnTemplateData(this._columnId_Name));
        };
        /**
         * Returns the column template informations
         *
         * @private
         * @returns {string}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.getColumnTemplateData = function (columnId) {
            if (columnId == this._columnId_Visible) {
                return "<script type=\"text/x-jsrender\" id=\"ciVisibleColumnTemplate\">\n                        <div style=\"margin-left:10px;\">{{if visible == \"true\" && !hasChildRecords}} <input class=\"customCheckbox\" type=\"checkbox\" checked=\"checked\" value=\"\" />{{else !hasChildRecords}} <input class=\"customCheckbox\" type=\"checkbox\" value=\"\" />{{/if}}</div>\n                        </script>";
            }
            else if (columnId == this._columnId_Name) {
                return "<script type=\"text/x-jsrender\" id=\"ciNameColumnTemplate\">\n                        <div style='height:20px;' unselectable='on'>\n                            {{if hasChildRecords}}\n                                <div class='intend' style='height:1px; float:left; width:{{:level*6}}px; display:inline-block;'></div>\n                            {{else !hasChildRecords}}\n                                <div class='intend' style='height:1px; float:left; width:{{:level*6}}px; display:inline-block;'></div>\n                            {{/if}}\n                            {{:#data['iconDefinition']}}\n                            <div class='e-cell' style='display:inline-block;width:100%' unselectable='on'>{{:#data['name']}}</div>\n                        </div>\n                    </script>";
            }
            return "";
        };
        /**
         * Creates the tree grid for the CursorInfos
         *
         * @protected
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.createTreeGrid = function () {
            var _this = this;
            $(this.mainDiv).ejTreeGrid(__assign(__assign(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), this.getTreeGridCellEditSupport()), this.getTreeGridToolbarSupport()), { childMapping: "filteredCursorInfos", expandStateMapping: "expandState", isResponsive: true, treeColumnIndex: 1, rowHeight: 28, 
                // Set init size to draw the toolbar icons at the right position
                sizeSettings: { height: '100px', width: '100px' }, selectionType: ej.TreeGrid.SelectionType.Multiple, expanded: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, collapsed: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, rowSelected: function (args) { return _this.treeGridRowSelected(args); }, create: function (args) { return _this.treeGridCreated(); }, actionBegin: function (args) { return _this.treeGridActionBegin(args); }, queryCellInfo: function (args) { return _this.queryCellInfo(args); } }));
        };
        CursorInfoWidget.prototype.treeGridNodeExpandedOrCollapsed = function () {
            // Refresh to see correct expanded/collapsed icon
            this.refresh();
            // Persist expandState in dataModel
            if (this._cursorSignalsDataModel !== undefined) {
                this._cursorSignalsDataModel.saveSettings();
            }
            // Persist scrollbar state in cursorInfoWidget
            this.saveTreeGridSettings();
        };
        CursorInfoWidget.prototype.queryCellInfo = function (args) {
            if (args.column.field == this._columnId_Visible) {
                if (args.cellValue == this._indeterminateStateValue) {
                    // Set indeterminate icons
                    $(args.cellElement.childNodes[1].childNodes[1]).prop(this._indeterminateStateValue, true);
                }
            }
        };
        /**
         * TreeGrid selected row has changed
         *
         * @private
         * @param {*} args
         * @returns
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.treeGridRowSelected = function (args) {
            if (args.model.selectedItems == undefined) {
                return;
            }
            if (this._cursorInfoSelectorIsActive == true) {
                // Saves the selected items for multiselection support in cursor info selector
                this._selectedCursorInfosOld = this._selectedCursorInfosNew;
                this._selectedCursorInfosNew = args.model.selectedItems;
            }
            else {
                this._selectedCursorSignals = this.getOnlyCursorSignals(args.model.selectedItems);
                this.updateCursorInfoSelectorButtonState();
            }
        };
        /**
         * get all CursorSignals for the current selection(if CursorInfo is selected, get the parent CursorSignal)
         *
         * @private
         * @param {*} selectedItems
         * @returns {Array<CursorSignal>}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.getOnlyCursorSignals = function (selectedItems) {
            var newList = new Array();
            for (var i = 0; i < selectedItems.length; i++) {
                if (selectedItems[i].item instanceof cursorSignal_1.CursorSignal) {
                    var index = newList.indexOf(selectedItems[i].item);
                    if (index == -1) { // Only add if not already in list
                        newList.push(selectedItems[i].item);
                    }
                }
                else if (selectedItems[i].item instanceof cursorInfo_1.CursorInfo) {
                    var index = newList.indexOf(selectedItems[i].parentItem.item);
                    if (index == -1) { // Only add if not already in list
                        newList.push(selectedItems[i].parentItem.item);
                    }
                }
            }
            return newList;
        };
        /**
         * Sets the cursor info selector button state (if one (or more) signal is selected the button is enabled)
         *
         * @private
         * @returns
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.updateCursorInfoSelectorButtonState = function () {
            if (this._selectedCursorSignals == undefined) {
                // no items selected deactivate Filter button
                this._toolbar.disableCursorInfoSelectorButton(true);
                return;
            }
            if (this._selectedCursorSignals.length < 1) {
                // no items selected deactivate Filter button
                this._toolbar.disableCursorInfoSelectorButton(true);
            }
            else {
                this._toolbar.disableCursorInfoSelectorButton(false);
            }
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.getTreeGridColumnDefinition = function () {
            // add check box state information
            var checkBoxStates = [
                { text: "Yes", value: "true" },
                { text: "No", value: "false" }
            ];
            // return the column definitions
            return {
                columns: [
                    { field: this._columnId_Visible, headerText: "Visible", visible: false, allowEditing: false, isTemplateColumn: true, templateID: "ciVisibleColumnTemplate", filterEditType: "dropdownedit", dropdownData: checkBoxStates, allowFilteringBlankContent: false, width: "55px" },
                    { field: this._columnId_Name, headerText: "Name", allowEditing: false, isTemplateColumn: true, templateID: "ciNameColumnTemplate" },
                    { field: this._columnId_Value, headerText: "Value", allowEditing: false, width: "140px", isTemplateColumn: true, template: "<div style='padding-left: 20px' id='" + this.mainDivId + CURSOR_VALUE_ID + "{{:uiId}}'></div>" },
                    { field: this._columnId_Description, headerText: "Description", visible: false, allowEditing: false, width: "140px" },
                    { field: this._columnId_IconDefinition, visible: false, width: "0px" },
                ],
            };
        };
        /**
         * Returns the tree grid column resize settings
         *
         * @private
         * @returns {{}}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.getTreeGridColumnResizeSupport = function () {
            var _this = this;
            return {
                allowColumnResize: true,
                columnResizeSettings: { columnResizeMode: ej.TreeGrid.ColumnResizeMode.FixedColumns },
                columnResized: function (args) { return _this.treeGridColumnResized(args); },
            };
        };
        /**
         * Returns the tree grid cell edit settings
         *
         * @private
         * @returns {{}}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.getTreeGridCellEditSupport = function () {
            return {
                editSettings: {
                    allowEditing: true,
                    showDeleteConfirmDialog: false,
                    showConfirmDialog: false
                },
            };
        };
        /**
         * Returns the tree grid toolbar settings
         *
         * @private
         * @returns {{}}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.getTreeGridToolbarSupport = function () {
            var _this = this;
            this._toolbar = new cursorInfoTreeGridToolbar_1.CursorInfoTreeGridToolbar(this.mainDiv);
            return {
                toolbarSettings: {
                    showToolbar: true,
                    customToolbarItems: this._toolbar.getCustomToolbars(),
                },
                toolbarClick: function (args) { return _this.toolbarClick(args); }
            };
        };
        /**
         * TreeGrid was created
         *
         * @private
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.treeGridCreated = function () {
            // Sets the custom toolbar icons
            this._toolbar.setStyleForToolbarIcons();
            this._toolbar.initToolbarStates();
            this.attachToCheckBoxChangedEvent();
        };
        /**
         * Attach check box changed events
         *
         * @private
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.attachToCheckBoxChangedEvent = function () {
            var _this = this;
            $(this.mainDiv).on("change", ".customCheckbox", function (e) { return _this.checkBoxChanged(e); });
        };
        CursorInfoWidget.prototype.loadStyles = function () {
            _super.prototype.addStyle.call(this, "widgets/cursorInfoWidget/style/css/cursorInfoStyle.css");
        };
        /**
         * Occurs on check box changed events
         *
         * @private
         * @param {*} e
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.checkBoxChanged = function (e) {
            var filterDataSource = this._cursorInfoTemplateDataModel;
            e = e || window.event;
            var targetEle = e.target;
            var checkStatus = $(targetEle).is(':checked');
            // $(targetEle).prop('checked', true);
            var record = this.getTreeRecord(targetEle);
            if (record != undefined) {
                if (checkStatus == false) {
                    record.item.visible = "false";
                    record["visible"] = "false";
                    this.setMultiSelectionCheckBoxes("false", record.index);
                }
                else {
                    record.item.visible = "true";
                    record["visible"] = "true";
                    this.setMultiSelectionCheckBoxes("true", record.index);
                }
                this.setModel(filterDataSource);
                // Set selection after setting checkbox because they are lost after setting a check box
                this.setSelectionInCursorInfoSelectorView(this._selectedCursorInfosOld);
                this.updateCheckBoxes();
                // Update cursor info visibilities if something has changed
                this.setCursorInfoVisibilities(this._selectedCursorSignals, this._cursorInfoTemplateDataModel[0]);
                // Update dataModel
                this._cursorSignalsDataModel.saveSettings();
            }
        };
        /**
         * If multi selection is active, set all selected items to the given state(checked/unchecked)
         *
         * @private
         * @param {string} state
         * @param {number} actualIndex
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.setMultiSelectionCheckBoxes = function (state, actualIndex) {
            var selectedCursorInfos = this._selectedCursorInfosOld;
            if (selectedCursorInfos != undefined) {
                // Set/Unset check boxes
                var indexWithinMultiSelection = false;
                for (var i = 0; i < selectedCursorInfos.length; i++) {
                    if (actualIndex == selectedCursorInfos[i].index) {
                        indexWithinMultiSelection = true;
                    }
                }
                ;
                if (indexWithinMultiSelection == true) {
                    selectedCursorInfos.forEach(function (cursorInfo) {
                        cursorInfo.item.visible = state;
                        cursorInfo["visible"] = state;
                    });
                }
                else {
                    // Only one checkbox was clicked => set selection to the new one
                    this._selectedCursorInfosOld = this._selectedCursorInfosNew;
                }
            }
        };
        CursorInfoWidget.prototype.treeGridActionBegin = function (args) {
            // Don't support "Entf/Del" key
            if (args.requestType == "delete") {
                args.cancel = true;
            }
        };
        /**
         * A treegrid column was resized
         *
         * @private
         * @param {*} args
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.treeGridColumnResized = function (args) {
            _super.prototype.resizeDynamicColumn.call(this, args.columnIndex, args.model);
            if (this._cursorInfoSelectorIsActive) {
                this.updateCheckBoxes();
            }
            // Refresh cursor info values after resize (treegrid sets the data to "0" after resize)
            this.refreshCursorValues();
            // Just persist column resize when filter is closed
            if (!this._cursorInfoSelectorIsActive) {
                this.saveTreeGridSettings();
            }
        };
        /** resizes the cursor values widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.resize = function (width, height) {
            _super.prototype.resize.call(this, width, height);
            if (this._cursorInfoSelectorIsActive) {
                this.updateCheckBoxes();
            }
            // Refresh cursor values after resize (treegrid sets the data to "0" after resize)
            this.refreshCursorValues();
            this._toolbar.resize(width);
        };
        CursorInfoWidget.prototype.activateCursorInfoSelectorView = function (activate) {
            this._toolbar.activateCursorInfoSelectorView(activate);
            if (activate == true) {
                this.showCursorInfoSelectorView();
            }
            else {
                this.showCursorSignalsView();
            }
            // Update toolbar button positions(e.g. position of right align toolbar) after hide or show toolbar button
            this._toolbar.resize(this.width);
        };
        /**
         * Shows the curser signals with the filtered/defined cursor informations
         *
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.showCursorSignalsView = function () {
            this._cursorInfoSelectorIsActive = false;
            this._selectedCursorInfosOld = undefined;
            this._selectedCursorInfosNew = undefined;
            // Show actual cursorInfo data
            this.refresh();
            // Sets the column visibilities
            var treeGridObject = _super.prototype.getTreeGridObject.call(this);
            this.setColumnVisiblities(treeGridObject, false);
            // set the selection to state before switching to the cursor info selector view
            this.setSelectionWithCursorSignals(treeGridObject, this._selectedCursorSignals);
            // Update the dynamic column size after hide/show of some columns
            this.resizeDynamicColumn(0, treeGridObject.model);
            // refresh the cursor info values
            this.refreshCursorValues();
        };
        /**
         * Shows the cursor info selector view
         *
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.showCursorInfoSelectorView = function () {
            this._cursorInfoSelectorIsActive = true;
            // Reset cursor info template datamodel
            this._cursorInfoTemplateDataModel.splice(0, this._cursorInfoTemplateDataModel.length);
            // create a signal template based on the selected series
            var templateCursorSignal = new dynamicCursorSignalTemplate_1.DynamicCursorSignalTemplate(this._selectedCursorSignals);
            // add the signal template to the model
            this._cursorInfoTemplateDataModel.push(templateCursorSignal);
            // Set cursor info template visibilities
            this.updateTemplateVisibilities(this._selectedCursorSignals, templateCursorSignal);
            // show cursor info template datamodel (the possible cursor infos)
            this.updateDataSource(this._cursorInfoTemplateDataModel);
            // Sets the column visibilities
            var treeGridObject = _super.prototype.getTreeGridObject.call(this);
            this.setColumnVisiblities(treeGridObject, true);
            // Update the dynamic column size after hide/show of some columns
            this.resizeDynamicColumn(0, treeGridObject.model);
            // Removes the filter of the visibility flag which is needed in the cursor signal view
            treeGridObject.clearFilter(this._columnId_Visible);
            // Convert custom check boxes into syncfusion check boxes
            this.updateCheckBoxes();
        };
        /**
         * Sets the column visibilities for the cursor info selector view or the cursor signals view
         *
         * @private
         * @param {*} treeGridObject
         * @param {boolean} cursorInfoSelectorView
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.setColumnVisiblities = function (treeGridObject, cursorInfoSelectorView) {
            // get needed columns
            var visibleColumn = treeGridObject.getColumnByField(this._columnId_Visible);
            var descriptionColumn = treeGridObject.getColumnByField(this._columnId_Description);
            var valueColumn = treeGridObject.getColumnByField(this._columnId_Value);
            if (cursorInfoSelectorView == false) {
                // Hide visible column
                treeGridObject.hideColumn(visibleColumn.headerText);
                // Hide description column
                treeGridObject.hideColumn(descriptionColumn.headerText);
                // Show value column
                treeGridObject.showColumn(valueColumn.headerText);
            }
            else {
                // Show visible column
                treeGridObject.showColumn(visibleColumn.headerText);
                // Show description column
                treeGridObject.showColumn(descriptionColumn.headerText);
                // Hide value column
                treeGridObject.hideColumn(valueColumn.headerText);
            }
        };
        /**
         * Sets the selection to the given selection objects in cursor info selector view
         *
         * @private
         * @param {Array<any>} selectedObjects
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.setSelectionInCursorInfoSelectorView = function (selectedObjects) {
            if (selectedObjects === undefined) {
                return;
            }
            var treeGridObject = this.getTreeGridObject();
            treeGridObject.clearSelection();
            if (selectedObjects.length !== undefined) {
                for (var i = 0; i < selectedObjects.length; i++) {
                    treeGridObject._multiSelectCtrlRequest = true;
                    var visibleIndex = 0;
                    for (var j = 0; j < treeGridObject.model.flatRecords.length; j++) {
                        if (treeGridObject.model.flatRecords[j].id == selectedObjects[i].id) {
                            treeGridObject.selectRows(visibleIndex);
                        }
                        visibleIndex++;
                    }
                }
            }
            else {
                treeGridObject.selectRows(selectedObjects.index);
            }
            // Set actual selection for later use 
            this._selectedCursorInfosOld = selectedObjects;
            this._selectedCursorInfosNew = selectedObjects;
        };
        ;
        /**
         * Sets the selection to the given cursor signals
         *
         * @private
         * @param {*} treeGridObject
         * @param {Array<CursorSignal>} cursorSignals
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.setSelectionWithCursorSignals = function (treeGridObject, cursorSignals) {
            // deselect all selections in cursor signals view
            treeGridObject.clearSelection();
            if (cursorSignals == undefined) {
                return;
            }
            for (var i = 0; i < cursorSignals.length; i++) {
                treeGridObject._multiSelectCtrlRequest = true;
                var visibleIndex = 0;
                var model = treeGridObject.model;
                for (var j = 0; j < model.flatRecords.length; j++) {
                    if (model.flatRecords[j].item == cursorSignals[i]) {
                        treeGridObject.selectRows(visibleIndex);
                    }
                    if (model.flatRecords[j].visible != "false") {
                        visibleIndex++;
                    }
                }
            }
        };
        ;
        /**
         * Sets the visible flags in the template cursor signal to the informations from the cursor signals
         * (e.g. all signals show y1 cursor info so therefore template cursor info visibility is set to "true";
         *       all signals dosn't show y1 cursor info so therefore template cursor info visibility is set to "false";
         *       some signals show y1 cursor info so therefore template cursor info visibility is set to "indeterminate";
         * )
         *
         * @private
         * @param {Array<CursorSignal>} cursorSignals
         * @param {DynamicCursorSignalTemplate} templateCursorSignal
         * @returns
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.updateTemplateVisibilities = function (cursorSignals, templateCursorSignal) {
            var _this = this;
            if (templateCursorSignal && templateCursorSignal.cursorInfos) {
                // for all available merged cursor infos
                templateCursorSignal.cursorInfos.forEach(function (templateCursorSignalInfo) {
                    // clear existing visibility
                    templateCursorSignalInfo.visible = "";
                    // get the cursor infos by id
                    var matchingCursorInfos = _this.retrievCursorInfosById(cursorSignals, templateCursorSignalInfo.id);
                    // for all selected cursor signals with matching id ...
                    matchingCursorInfos.forEach(function (cursorSignalInfo) {
                        // if the visibility is yet undefined ..
                        if (!templateCursorSignalInfo.visible) {
                            // initialize the visibility with the first cursor signal infos value.
                            templateCursorSignalInfo.visible = cursorSignalInfo.visible;
                        }
                        else {
                            // set visibility to undetermined if one of the following values is different
                            if (cursorSignalInfo.visible !== templateCursorSignalInfo.visible) {
                                templateCursorSignalInfo.visible = _this._indeterminateStateValue;
                            }
                        }
                    });
                });
            }
        };
        /**
         * Sets the visibility defined in the template cursor signal to the cursor signals
         *
         * @private
         * @param {Array<CursorSignal>} cursorSignals
         * @param {DynamicCursorSignalTemplate} templateCursorSignal
         * @returns
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.setCursorInfoVisibilities = function (cursorSignals, templateCursorSignal) {
            var _this = this;
            if (templateCursorSignal && templateCursorSignal.cursorInfos) {
                // for all available merged cursor infos
                templateCursorSignal.cursorInfos.forEach(function (templateCursorSignalInfo) {
                    if (templateCursorSignalInfo.visible !== _this._indeterminateStateValue) {
                        // get the cursor infos by id
                        var matchingCursorInfos = _this.retrievCursorInfosById(cursorSignals, templateCursorSignalInfo.id);
                        // for all selected cursor infos with matching id ...
                        matchingCursorInfos.forEach(function (cursorSignalInfo) {
                            // set the cursor signals visibility from the template value if a valid state is defined
                            cursorSignalInfo.visible = templateCursorSignalInfo.visible;
                        });
                    }
                });
            }
        };
        /**
         * gets the cursor infos with the specified id
         *
         * @private
         * @param {Array<CursorSignal>} cursorSignals
         * @param {string} cursorInfoId
         * @returns {Array<CursorInfo>}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.retrievCursorInfosById = function (cursorSignals, cursorInfoId) {
            var matchingCursorInfos = [];
            cursorSignals.forEach(function (cursorSignal) {
                cursorSignal.cursorInfos.forEach(function (cursorSignalInfo) {
                    if (cursorSignalInfo.id === cursorInfoId) {
                        matchingCursorInfos.push(cursorSignalInfo);
                    }
                });
            });
            return matchingCursorInfos;
        };
        /**
         * Raises the move cursor event
         *
         * @param {number} cursorIndex
         * @param {CursorMovement} movement
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.onMoveCursor = function (cursorIndex, movement) {
            var data = [];
            var x = this.cursorsStates.getPosition(cursorIndex, this.cursorsStates.getLastCursorTypeSelected());
            if (this._cursorSignalsDataModel != undefined) {
                var cursors = this._cursorSignalsDataModel.getCursorSignals();
                cursors.forEach(function (cursor) {
                    data.push(cursor.serie);
                });
                if (x != undefined) {
                    this.moveCursor(cursorIndex, movement, data, x);
                }
            }
        };
        /**
         * moves the cursor for the specified direction and offset
         *
         * @private
         * @param {number} cursorIndex
         * @param {CursorMovement} cursorMovement
         * @param {BaseSeries[]} series
         * @param {number} cursorPosition
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.moveCursor = function (cursorIndex, cursorMovement, series, cursorPosition) {
            var cursorType = this.cursorsStates.getLastCursorTypeSelected();
            // get the next possible cursor timestamp
            var nearestTimestamp = this.findNearestTimestampInSeries(series, cursorPosition, cursorMovement, cursorType);
            // update the cursors timestamp location
            this.updateCursorLocation(cursorIndex, nearestTimestamp);
        };
        /**
         * searches the next timestamp in all available series. The picked value takes the movement direction intoi account.
         *
         * @private
         * @param {BaseSeries[]} series
         * @param {number} cursorTimeStamp
         * @param {CursorMovement} cursorMovement
         * @returns {number}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.findNearestTimestampInSeries = function (series, cursorTimeStamp, cursorMovement, cursorType) {
            // retrieve the timestamps series from the signal series
            var timestampSeries = series.map(function (singleSeries) {
                if (cursorType_1.CursorTypeHelper.getCursorTypeForSeries(singleSeries) == cursorType) {
                    return singleSeries.timestamps;
                }
                else {
                    return [];
                }
            });
            var nextNearestTimeStamp = cursorTimeStamp;
            // dpendiung on movement direction we pick the next possible time stamp
            switch (cursorMovement) {
                case cursorInfoWidgetInterface_1.CursorMovement.Right:
                    nextNearestTimeStamp = seriesHelper_1.SeriesHelper.findNearestValueFromCollection(cursorTimeStamp, timestampSeries, binSearch_1.BinSearchMode.NEXTUPPER);
                    break;
                case cursorInfoWidgetInterface_1.CursorMovement.Left:
                    nextNearestTimeStamp = seriesHelper_1.SeriesHelper.findNearestValueFromCollection(cursorTimeStamp, timestampSeries, binSearch_1.BinSearchMode.PREVIOUSLOWER);
                    break;
            }
            return nextNearestTimeStamp;
        };
        /**
         * Handle cursor activation/selection
         *
         * @param {number} cursorIndex
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.onReferenceCursorSelected = function (cursorIndex) {
            // update the cursor selection state
            this.cursorsStates.setSelected(cursorIndex, true);
            this.updateCursorStates(this.cursorsStates);
            // set the cursors as active tool
            var toolstate = this.states.read(chartViewToolbarStates_1.ChartViewToolState, "ChartViewToolState");
            toolstate.selectedTool = chartViewToolbarStates_1.ChartViewToolStateEnum.CURSORS;
            this.states.update(this, chartViewToolbarStates_1.ChartViewToolState, toolstate, "ChartViewToolState");
        };
        /**
         * Adds a signal to the cursor info widget
         *
         * @param {Array<BaseSeries>} series
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.addSeries = function (series) {
            var cursorSignals = new Array();
            for (var i = 0; i < series.length; i++) {
                if (series[i].type === seriesType_1.SeriesType.timeSeries) {
                    cursorSignals.push(new ytCursorSignal_1.YTCursorSignal(series[i], false));
                }
                else if (series[i].type === seriesType_1.SeriesType.xySeries) {
                    cursorSignals.push(new xyCursorSignal_1.XYCursorSignal(series[i], false));
                }
                else if (series[i].type === seriesType_1.SeriesType.fftSeries) {
                    cursorSignals.push(new fftCursorSignal_1.FFTCursorSignal(series[i], false));
                }
            }
            if (this._cursorSignalsDataModel != undefined) {
                this._cursorSignalsDataModel.addSignal(cursorSignals);
            }
        };
        /**
         * Remove a cursor signal from the cursor info widget
         *
         * @param {BaseSeries} serie
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.removeSerie = function (serie) {
            if (this._cursorSignalsDataModel != undefined) {
                var cursorSignal = this._cursorSignalsDataModel.getCursorSignal(serie);
                if (cursorSignal) {
                    this._cursorSignalsDataModel.removeSerie(cursorSignal);
                    // Disables filter button if is active
                    if (this._toolbar.cursorInfoSelectionIsActive) {
                        this._toolbar.activateCursorInfoSelectorView(!this._toolbar.cursorInfoSelectionIsActive);
                    }
                    // Removes the cursor signal from the current selection list and updates the toolbar button
                    var index = this._selectedCursorSignals.indexOf(cursorSignal);
                    if (index != -1) {
                        this._selectedCursorSignals.splice(index, 1);
                        this.updateCursorInfoSelectorButtonState();
                    }
                }
            }
        };
        /**
         * changes and updates the cursor location of the selected cursor
         *
         * @param {number} cursorIndex
         * @param {number} cursorTimestamp
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.updateCursorLocation = function (cursorIndex, cursorTimestamp) {
            this.cursorsStates.setPosition(cursorIndex, cursorTimestamp);
            this.updateCursorStates(this.cursorsStates);
        };
        /**
         * refreshes the tree grids data
         *
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.refresh = function () {
            // refresh tree grid only if cursor signal view is active (not in case of cursor info selector)
            if (!this._cursorInfoSelectorIsActive && this.refreshEnabled) {
                if (this._cursorSignalsDataModel != undefined) {
                    var cursorSignals = this._cursorSignalsDataModel.getCursorSignals();
                    this.updateDataSource(cursorSignals);
                }
                // set the selection to the select signal before
                var treeGridObject = this.getTreeGridObject();
                this.setSelectionWithCursorSignals(treeGridObject, this._selectedCursorSignals);
                // Update cursor info values 
                this.refreshCursorStates();
            }
        };
        /**
         * Trigger the update of the cursorInfos for the current cursor states
         *
         * @private
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.refreshCursorStates = function () {
            this.updateCursorStates(this.cursorsStates);
        };
        CursorInfoWidget.prototype.updateDataSource = function (cursorSignals) {
            this.setCursorValueUiIds(cursorSignals);
            // Refresh TreeGrid with new datasource
            this.setModel(cursorSignals);
            // Refresh the cursor values after updating the model
            this.refreshCursorValues(cursorSignals);
        };
        /**
         * Defines and sets uids for every cursor value (cursor signals and cursor infos)
         *
         * @private
         * @param {Array<CursorSignal>} cursorSignals
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.setCursorValueUiIds = function (cursorSignals) {
            var cursorInfoId = 0;
            cursorSignals.forEach(function (cursorSignal) {
                cursorSignal.uiId = cursorInfoId++;
                cursorSignal.cursorInfos.forEach(function (cursorInfo) {
                    cursorInfo.uiId = cursorInfoId++;
                });
            });
        };
        /**
         * Refresh all cursor values
         *
         * @private
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.refreshCursorValues = function (cursorSignals) {
            var _this = this;
            if (cursorSignals === void 0) { cursorSignals = undefined; }
            if (cursorSignals == undefined && this._cursorSignalsDataModel != undefined) {
                cursorSignals = this._cursorSignalsDataModel.getCursorSignals();
            }
            if (cursorSignals != undefined) {
                cursorSignals.forEach(function (cursorSignal) {
                    _this.refreshCursorValueField(cursorSignal);
                    cursorSignal.cursorInfos.forEach(function (cursorInfo) {
                        _this.refreshCursorValueField(cursorInfo);
                    });
                });
            }
        };
        /**
         * updates a cursor value field with the current values of the correspondig cursor signal or info
         *
         * @private
         * @param {CursorSignal|CursorInfo} cursorSignalOrInfo
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.refreshCursorValueField = function (cursorSignalOrInfo) {
            if (cursorSignalOrInfo) {
                // get the corresponding ui element
                var cursorValueElement = this.getCursorValueElement(cursorSignalOrInfo);
                if (cursorValueElement != undefined) {
                    var valueString = cursorSignalOrInfo.value.toString();
                    cursorValueElement.innerText = valueString;
                }
            }
        };
        /**
         * Gets the corresponding cursor signal or info element
         *
         * @private
         * @param {CursorSignal|CursorInfo} cursorSignalOrInfo
         * @returns {(HTMLDivElement | undefined)}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.getCursorValueElement = function (cursorSignalOrInfo) {
            var mySubDiv = this.mainDiv.querySelector("#" + this.mainDivId + CURSOR_VALUE_ID + cursorSignalOrInfo.uiId);
            if (mySubDiv == null) {
                return undefined;
            }
            return mySubDiv;
        };
        CursorInfoWidget.prototype.onCursorSignalsDataModelChanged = function (sender, args) {
            this.refresh();
            this.saveTreeGridSettings();
        };
        /**
         * This method will update the cursor info widget with data from
         * the cursor state.
         *
         * @private
         * @param {CursorStates} modifiedState
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.updateInfoCursorsWithNewStateValues = function (modifiedState) {
            if (this._cursorSignalsDataModel != undefined) {
                this._cursorSignalsDataModel.updateInfoCursorsWithNewCursorStateValues(modifiedState);
            }
            this._toolbar.updateButtonStates(modifiedState);
            this.refreshCursorValues();
        };
        /**
         * Convert custom check boxes into syncfusion check boxes
         *
         * @private
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.updateCheckBoxes = function () {
            var checkBoxes = $('.customCheckbox');
            for (var i = 0; i < checkBoxes.length; i++) {
                checkBoxes[i].id = 'customCheckbox' + (i + 1);
                this.creatSyncfusionCheckbox(checkBoxes[i]);
            }
        };
        /**
         * Instantiate syncfusion check box
         *
         * @private
         * @param {HTMLElement} customCheckbox
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.creatSyncfusionCheckbox = function (customCheckbox) {
            var _this = this;
            var enableTriState = false;
            var state = this.getCustomCheckboxState($(customCheckbox));
            if (state === 'indeterminate') {
                enableTriState = true;
            }
            $(customCheckbox).ejCheckBox({
                enableTriState: enableTriState,
                id: customCheckbox.id,
                checkState: state,
                change: function (args) { return _this.syncfusionCheckBoxChanged(args); },
            });
        };
        /**
         * Trigger check box change event
         *
         * @private
         * @param {*} args
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.syncfusionCheckBoxChanged = function (args) {
            if (args.model.enableTriState) {
                $('#' + args.model.id).ejCheckBox({ enableTriState: false });
            }
            this.setSelectedCursorsInfo(args);
            var customCheckbox = $('#' + args.model.id);
            customCheckbox.change();
        };
        /**
         * Set selected cursor info when checkbox is clicked
         *
         * @param {*} args
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.setSelectedCursorsInfo = function (args) {
            var treegrid = this.getTreeGridObject();
            var index = parseInt(args.model.id.split('customCheckbox')[1], 10);
            if (this._selectedCursorInfosOld == undefined) {
                this._selectedCursorInfosOld = treegrid.model.flatRecords[index];
            }
            else {
                this._selectedCursorInfosOld = this._selectedCursorInfosNew;
            }
            this._selectedCursorInfosNew = treegrid.model.flatRecords[index];
        };
        /**
         * get state of checkbox
         *
         * @private
         * @param {JQuery<HTMLElement>} checkbox
         * @returns {string}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.getCustomCheckboxState = function (checkbox) {
            if (checkbox.is(':checked')) {
                return 'check';
            }
            else if (checkbox.is(':indeterminate')) {
                return 'indeterminate';
            }
            else {
                return 'uncheck';
            }
        };
        /**
         * Attaches the chart manager datamodel events
         *
         * @private
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.attachChartManagerDataModelEvents = function () {
            if (this._chartManagerDataModel) {
                this._chartManagerDataModel.eventModelChanged.attach(this._chartManagerModelChangedHandler);
            }
        };
        /**
         * Detaches the chart manager datamodel events
         *
         * @private
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.detachChartManagerDataModelEvents = function () {
            if (this._chartManagerDataModel) {
                this._chartManagerDataModel.eventModelChanged.detach(this._chartManagerModelChangedHandler);
            }
        };
        /**
         * chartManagerModel has changed
         *
         * @private
         * @param {*} sender
         * @param {*} args
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.onChartManagerModelChanged = function (sender, args) {
            // Update the cursor info widget
            if (args.hint == chartManagerDataModel_1.ChartManagerDataModelChangedHint.addSerie && args.data.series != undefined) {
                this.addSeries(args.data.series);
            }
            else if (args.hint == chartManagerDataModel_1.ChartManagerDataModelChangedHint.removeSerie) {
                if (args.data.signalUsedInOtherCharts == false) {
                    this.removeSerie(args.data.serie);
                }
            }
        };
        return CursorInfoWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.CursorInfoWidget = CursorInfoWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29ySW5mb1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jdXJzb3JJbmZvV2lkZ2V0L2N1cnNvckluZm9XaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBc0JBLG9EQUFvRDtJQUNwRCxJQUFNLGVBQWUsR0FBRyxjQUFjLENBQUM7SUFFdkM7Ozs7O09BS0c7SUFDSDtRQUErQixvQ0FBa0I7UUFBakQ7WUFBQSxxRUE0c0NDO1lBMXNDVyxrQ0FBNEIsR0FBdUMsSUFBSSxLQUFLLEVBQStCLENBQUM7WUFJNUcsMkNBQXFDLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLCtCQUErQixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBakQsQ0FBaUQsQ0FBQztZQUN6RyxzQ0FBZ0MsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsMEJBQTBCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUE3QyxDQUE2QyxDQUFDO1lBRW5HLDRCQUFzQixHQUF3QixJQUFJLEtBQUssRUFBZ0IsQ0FBQztZQUd4RSxpQ0FBMkIsR0FBRyxLQUFLLENBQUM7WUFJM0IsdUJBQWlCLEdBQUcsU0FBUyxDQUFDO1lBQzlCLG9CQUFjLEdBQUcsTUFBTSxDQUFDO1lBQ3hCLHFCQUFlLEdBQUcsT0FBTyxDQUFDO1lBQzFCLDJCQUFxQixHQUFHLGFBQWEsQ0FBQztZQUN0Qyw4QkFBd0IsR0FBRyxnQkFBZ0IsQ0FBQztZQUU1Qyw4QkFBd0IsR0FBRyxlQUFlLENBQUM7WUFFNUQsMkpBQTJKO1lBQzNKLGdGQUFnRjtZQUN0RSxtQkFBYSxHQUFpQixJQUFJLDJCQUFZLEVBQUUsQ0FBQzs7UUFrckMvRCxDQUFDO1FBaHJDRzs7OztXQUlHO1FBQ0gscUNBQVUsR0FBVjtZQUNJLGlCQUFNLHdC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QkFDekYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3BDO2lCQUNJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSx3REFBZ0MsQ0FBQyxXQUFXLEVBQUU7Z0JBQ2hFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsSUFBSSxLQUFLLEVBQUU7b0JBQzVDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDckM7YUFDSjtRQUNMLENBQUM7UUFDTCx1QkFBQztJQUFELENBQUMsQUE1c0NELENBQStCLHVDQUFrQixHQTRzQ2hEO0lBRVEsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUN1cnNvckluZm9XaWRnZXQsQ3Vyc29yTW92ZW1lbnQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2N1cnNvckluZm9XaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHJlZUdyaWRXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi90cmVlR3JpZFdpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgQ3Vyc29ySW5mb1RyZWVHcmlkVG9vbGJhciB9IGZyb20gXCIuL3ZpZXcvY3Vyc29ySW5mb1RyZWVHcmlkVG9vbGJhclwiO1xyXG5pbXBvcnQgeyBDdXJzb3JTaWduYWxzRGF0YU1vZGVsIH0gZnJvbSBcIi4vbW9kZWwvY3Vyc29yU2lnbmFsc0RhdGFNb2RlbFwiO1xyXG5pbXBvcnQgeyBZVEN1cnNvclNpZ25hbCB9IGZyb20gXCIuL21vZGVsL3l0Q3Vyc29yU2lnbmFsXCI7XHJcbmltcG9ydCB7IFhZQ3Vyc29yU2lnbmFsIH0gZnJvbSBcIi4vbW9kZWwveHlDdXJzb3JTaWduYWxcIjtcclxuaW1wb3J0IHsgRkZUQ3Vyc29yU2lnbmFsIH0gZnJvbSBcIi4vbW9kZWwvZmZ0Q3Vyc29yU2lnbmFsXCI7XHJcbmltcG9ydCB7IElVaUJpbmRpbmcgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvd2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEN1cnNvckluZm8gfSBmcm9tIFwiLi9tb2RlbC9jdXJzb3JJbmZvXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXMvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBDdXJzb3JTdGF0ZXMgfSBmcm9tIFwiLi4vY29tbW9uL3N0YXRlcy9jdXJzb3JTdGF0ZXNcIjtcclxuaW1wb3J0IHsgRHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRlIH0gZnJvbSBcIi4vbW9kZWwvZHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRlXCI7XHJcbmltcG9ydCB7IEN1cnNvclNpZ25hbCB9IGZyb20gXCIuL21vZGVsL2N1cnNvclNpZ25hbFwiO1xyXG5pbXBvcnQgeyBTZXJpZXNIZWxwZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3Nlcmllc0hlbHBlclwiO1xyXG5pbXBvcnQgeyBCaW5TZWFyY2hNb2RlIGFzIFNlYXJjaE1vZGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3V0aWxpdGllcy9iaW5TZWFyY2hcIjtcclxuaW1wb3J0IHsgQ2hhcnRWaWV3VG9vbFN0YXRlLCBDaGFydFZpZXdUb29sU3RhdGVFbnVtIH0gZnJvbSBcIi4uL2NvbW1vbi9zdGF0ZXMvY2hhcnRWaWV3VG9vbGJhclN0YXRlc1wiO1xyXG5pbXBvcnQgeyBTZXJpZXNUeXBlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vc2VyaWVzL3Nlcmllc1R5cGVcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24gfSBmcm9tIFwiLi9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludCwgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsXCI7XHJcbmltcG9ydCB7IEN1cnNvclR5cGVIZWxwZXIsIEN1cnNvclR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL3N0YXRlcy9jdXJzb3JUeXBlXCI7XHJcblxyXG4vLyBkZWZpbmVzIHRoZSBiYXNlIGlkIGZvciB0aGUgY3Vyc29yIHZhbHVlIHRlbXBsYXRlXHJcbmNvbnN0IENVUlNPUl9WQUxVRV9JRCA9IFwiY3Vyc29yVmFsdWVfXCI7XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgQ3Vyc29ySW5mbyBXaWRnZXRcclxuICpcclxuICogQGNsYXNzIEN1cnNvckluZm9XaWRnZXRcclxuICogQGV4dGVuZHMge1RyZWVHcmlkV2lkZ2V0QmFzZX1cclxuICovXHJcbmNsYXNzIEN1cnNvckluZm9XaWRnZXQgZXh0ZW5kcyBUcmVlR3JpZFdpZGdldEJhc2UgaW1wbGVtZW50cyBJQ3Vyc29ySW5mb1dpZGdldCB7XHJcbiAgICBwcml2YXRlIF9jdXJzb3JTaWduYWxzRGF0YU1vZGVsOiBDdXJzb3JTaWduYWxzRGF0YU1vZGVsfHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX2N1cnNvckluZm9UZW1wbGF0ZURhdGFNb2RlbDogQXJyYXk8RHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRlPiA9IG5ldyBBcnJheTxEeW5hbWljQ3Vyc29yU2lnbmFsVGVtcGxhdGU+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfY2hhcnRNYW5hZ2VyRGF0YU1vZGVsOiBDaGFydE1hbmFnZXJEYXRhTW9kZWx8dW5kZWZpbmVkO1xyXG5cclxuICAgIHByaXZhdGUgX2N1cnNvclNpZ25hbHNEYXRhTW9kZWxDaGFuZ2VkSGFuZGxlciA9IChzZW5kZXIsYXJncyk9PnRoaXMub25DdXJzb3JTaWduYWxzRGF0YU1vZGVsQ2hhbmdlZChzZW5kZXIsYXJncyk7XHJcbiAgICBwcml2YXRlIF9jaGFydE1hbmFnZXJNb2RlbENoYW5nZWRIYW5kbGVyID0gKHNlbmRlciwgZGF0YSkgPT4gdGhpcy5vbkNoYXJ0TWFuYWdlck1vZGVsQ2hhbmdlZChzZW5kZXIsIGRhdGEpOyAgXHJcblxyXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWRDdXJzb3JTaWduYWxzOiBBcnJheTxDdXJzb3JTaWduYWw+ID0gbmV3IEFycmF5PEN1cnNvclNpZ25hbD4oKTtcclxuICAgIHByaXZhdGUgX3NlbGVjdGVkQ3Vyc29ySW5mb3NPbGQ7XHJcbiAgICBwcml2YXRlIF9zZWxlY3RlZEN1cnNvckluZm9zTmV3O1xyXG4gICAgcHJpdmF0ZSBfY3Vyc29ySW5mb1NlbGVjdG9ySXNBY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgX3Rvb2xiYXIhOiBDdXJzb3JJbmZvVHJlZUdyaWRUb29sYmFyO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NvbHVtbklkX1Zpc2libGUgPSBcInZpc2libGVcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NvbHVtbklkX05hbWUgPSBcIm5hbWVcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NvbHVtbklkX1ZhbHVlID0gXCJ2YWx1ZVwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfY29sdW1uSWRfRGVzY3JpcHRpb24gPSBcImRlc2NyaXB0aW9uXCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jb2x1bW5JZF9JY29uRGVmaW5pdGlvbiA9IFwiaWNvbkRlZmluaXRpb25cIjtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfaW5kZXRlcm1pbmF0ZVN0YXRlVmFsdWUgPSBcImluZGV0ZXJtaW5hdGVcIjtcclxuXHJcbiAgICAvLyBob2xkcyB0aGUgY3VycmVudCBjdXJzb3Igc3RhdGVzIHZhbHVlcy4gV2UgaW5pdGlhbGl6ZSB0aGUgbWVtYmVyIGZvciBkZWZhdWx0LiBUaGUgZWZmZWN0aXZlIGluaXRpYWxpemF0aW9uIHRha2VzIHBsYWNlIHdoZW4gdGhlIGV4dGVybmFsIHNoYXJlZCBpbnN0YW5jZVxyXG4gICAgLy8gb2YgdGhlIGN1cnNvciBzdGF0ZXMgaXMgY3JlYXRlZCBhbmQgcmVmbGVjdGVkIHRocm91Z2ggdGhlIGN1cm9yU3RhdGVzIHNldHRlciFcclxuICAgIHByb3RlY3RlZCBfY3Vyc29yU3RhdGVzOiBDdXJzb3JTdGF0ZXMgPSBuZXcgQ3Vyc29yU3RhdGVzKCk7XHJcblxyXG4gICAgLyoqICBcclxuICAgICAqIEluaXRpYWxpemUgdGhlIHdpZGdldFxyXG4gICAgICogXHJcbiAgICAgKiAgQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZSgpIHtcclxuICAgICAgICBzdXBlci5zZXRIZWFkZXJGaWx0ZXJCYXJIaWRkZW4oKTsvLyBNdXN0IGJlIHNldCBiZWZvcmUgaW5pdGlhbGl6YXRpb24gdG8gYXZvaWQgc2hvd2luZyB0aGUgZmlsdGVyYmFyXHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB0aGUgaGVpZ2h0IG9mIHRoZSBoZWFkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIE92ZXJ2aWV3VHJlZUdyaWRXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIGRlZmluZUhlYWRlckhlaWdodCgpOiBudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIDMwO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVkKCl7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZWQoKTtcclxuXHJcbiAgICAgICAgLy8gR2V0IGN1cnNvciBzaWduYWxzIGRhdGFtb2RlbFxyXG4gICAgICAgIHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbElkKSBhcyBDdXJzb3JTaWduYWxzRGF0YU1vZGVsO1xyXG5cclxuICAgICAgICAvLyBBdHRhY2ggY3Vyc29yIHNpZ25hbHMgZGF0YW1vZGVsIGV2ZW50XHJcbiAgICAgICAgaWYodGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsLmV2ZW50TW9kZWxDaGFuZ2VkLmF0dGFjaCh0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBHZXQgY3Vyc29yIHNpZ25hbHMgZGF0YW1vZGVsXHJcbiAgICAgICAgdGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLkNoYXJ0TWFuYWdlckRhdGFNb2RlbElkKSBhcyBDaGFydE1hbmFnZXJEYXRhTW9kZWw7XHJcblxyXG4gICAgICAgIHRoaXMuYXR0YWNoQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsRXZlbnRzKCk7XHJcblxyXG4gICAgICAgIC8vIFJlZnJlc2ggdHJlZUdyaWQgdG8gc2VlIHRoZSBsb2FkZWQgcGVyc2lzdGluZyBkYXRhXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcblxyXG4gICAgICAgIC8vIEluaXRpYWxpemUgc2Nyb2xsYmFycyBwb3NpdGlvbnNcclxuICAgICAgICBsZXQgc2Nyb2xsYmFyU2V0dGluZ3MgPSB0aGlzLmNvbXBvbmVudC5nZXRTZXR0aW5nKFRyZWVHcmlkV2lkZ2V0QmFzZS5TY3JvbGxiYXJzU2V0dGluZ3NJZCk7XHJcbiAgICAgICAgdGhpcy5zZXRTY3JvbGxCYXJTZXR0aW5ncyhzY3JvbGxiYXJTZXR0aW5ncyk7XHJcblxyXG4gICAgICAgIHN1cGVyLnNldEhlYWRlckNvbnRlbnQoXCJDdXJzb3JzXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFNldCBkeW5hbWljIGNvbHVtbiBzZXR0aW5nc1xyXG4gICAgICAgIHN1cGVyLnNldER5bmFtaWNDb2x1bW4oMSwgODApO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXREZWZhdWx0RGVmaW5pdGlvbihuZXcgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBjdXJzb3JzIHN0YXRlc1xyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEB0eXBlIHtDdXJzb3JTdGF0ZXN9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3VG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0IGN1cnNvcnNTdGF0ZXMoKSA6IEN1cnNvclN0YXRlcyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnNvclN0YXRlcztcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY3Vyc29ycyBzdGF0ZXMuIFRoZSBtZXRob2QgaXMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgd2hlbmV2ZXIgYSBjdXJzb3Igc3RhdGUgaGFzIGJlZW4gY2hhbmdlZCBleHRlcm5hbGx5LiBcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3VG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc2V0IGN1cnNvcnNTdGF0ZXMoY3Vyc29yU3RhdGVzIDogQ3Vyc29yU3RhdGVzKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBiYWNrdXAgZmllbGRcclxuICAgICAgICB0aGlzLl9jdXJzb3JTdGF0ZXMgPSBjdXJzb3JTdGF0ZXM7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlSW5mb0N1cnNvcnNXaXRoTmV3U3RhdGVWYWx1ZXMoY3Vyc29yU3RhdGVzKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBjdXJzb3Igc3RhdGVzLlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yU3RhdGVzfSBjdXJzb3JTdGF0ZXNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZUN1cnNvclN0YXRlcyhjdXJzb3JTdGF0ZXM6Q3Vyc29yU3RhdGVzKXtcclxuICAgICAgICAvLyBCSU5ESU5HU09VUkNFOiBkaXNwYXRjaGVzIHRoZSBtZXRob2QgY2FsbCB0byBib3VuZCB0YXJnZXRzXHJcbiAgICB9XHJcblxyXG4gICAgZGlzcG9zZSgpe1xyXG4gICAgICAgIHRoaXMuZGV0YWNoQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsRXZlbnRzKCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gRGV0YWNoIGN1cnNvciBzaWduYWxzIGRhdGFtb2RlbCBldmVudHNcclxuICAgICAgICAgICAgdGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbC5ldmVudE1vZGVsQ2hhbmdlZC5kZXRhY2godGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbENoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgLy8gRGlzcG9zZSBjdXJzb3Igc2lnbmFscyBkYXRhbW9kZWxcclxuICAgICAgICAgICAgdGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbC5kaXNwb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGdldENvbXBvbmVudFNldHRpbmdzKG9ubHlNb2RpZmllZDogYm9vbGVhbik6IENvbXBvbmVudFNldHRpbmdze1xyXG5cdFx0cmV0dXJuIHN1cGVyLmdldENvbXBvbmVudFNldHRpbmdzKG9ubHlNb2RpZmllZCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0Q29tcG9uZW50U2V0dGluZ3MoZGF0YTogQ29tcG9uZW50U2V0dGluZ3MpIHtcclxuICAgICAgICBpZihkYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHN1cGVyLnNldENvbXBvbmVudFNldHRpbmdzKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGNvbHVtbiB0ZW1wbGF0ZXMgZm9yIHRoZSB0cmVlIGdyaWQgYW5kIGFkZHMgdGhlbSB0byB0aGUgd2lkZ2V0IGNvbnRhaW5lclxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVDb2x1bW5UZW1wbGF0ZXMoKXtcclxuXHRcdHZhciAkd2lkZ2V0Q29udGFpbmVyID0gJCh0aGlzLm1haW5EaXYpO1xyXG5cdFx0JHdpZGdldENvbnRhaW5lci5hcHBlbmQodGhpcy5nZXRDb2x1bW5UZW1wbGF0ZURhdGEodGhpcy5fY29sdW1uSWRfVmlzaWJsZSkpO1xyXG5cdFx0JHdpZGdldENvbnRhaW5lci5hcHBlbmQodGhpcy5nZXRDb2x1bW5UZW1wbGF0ZURhdGEodGhpcy5fY29sdW1uSWRfTmFtZSkpO1xyXG5cdH1cclxuXHJcbiAgICAvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBjb2x1bW4gdGVtcGxhdGUgaW5mb3JtYXRpb25zXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9XHJcblx0ICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuXHQgKi9cclxuICAgIHByaXZhdGUgZ2V0Q29sdW1uVGVtcGxhdGVEYXRhKGNvbHVtbklkOiBzdHJpbmcpIDogc3RyaW5ne1xyXG4gICAgICAgIGlmKGNvbHVtbklkID09IHRoaXMuX2NvbHVtbklkX1Zpc2libGUpe1xyXG4gICAgICAgICAgICByZXR1cm4gYDxzY3JpcHQgdHlwZT1cInRleHQveC1qc3JlbmRlclwiIGlkPVwiY2lWaXNpYmxlQ29sdW1uVGVtcGxhdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cIm1hcmdpbi1sZWZ0OjEwcHg7XCI+e3tpZiB2aXNpYmxlID09IFwidHJ1ZVwiICYmICFoYXNDaGlsZFJlY29yZHN9fSA8aW5wdXQgY2xhc3M9XCJjdXN0b21DaGVja2JveFwiIHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9XCJjaGVja2VkXCIgdmFsdWU9XCJcIiAvPnt7ZWxzZSAhaGFzQ2hpbGRSZWNvcmRzfX0gPGlucHV0IGNsYXNzPVwiY3VzdG9tQ2hlY2tib3hcIiB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cIlwiIC8+e3svaWZ9fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NjcmlwdD5gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGNvbHVtbklkID09IHRoaXMuX2NvbHVtbklkX05hbWUpe1xyXG4gICAgICAgICAgICByZXR1cm4gYDxzY3JpcHQgdHlwZT1cInRleHQveC1qc3JlbmRlclwiIGlkPVwiY2lOYW1lQ29sdW1uVGVtcGxhdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT0naGVpZ2h0OjIwcHg7JyB1bnNlbGVjdGFibGU9J29uJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7aWYgaGFzQ2hpbGRSZWNvcmRzfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdpbnRlbmQnIHN0eWxlPSdoZWlnaHQ6MXB4OyBmbG9hdDpsZWZ0OyB3aWR0aDp7ezpsZXZlbCo2fX1weDsgZGlzcGxheTppbmxpbmUtYmxvY2s7Jz48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7ZWxzZSAhaGFzQ2hpbGRSZWNvcmRzfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdpbnRlbmQnIHN0eWxlPSdoZWlnaHQ6MXB4OyBmbG9hdDpsZWZ0OyB3aWR0aDp7ezpsZXZlbCo2fX1weDsgZGlzcGxheTppbmxpbmUtYmxvY2s7Jz48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7L2lmfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7OiNkYXRhWydpY29uRGVmaW5pdGlvbiddfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2UtY2VsbCcgc3R5bGU9J2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjEwMCUnIHVuc2VsZWN0YWJsZT0nb24nPnt7OiNkYXRhWyduYW1lJ119fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L3NjcmlwdD5gO1xyXG4gICAgICAgIH1cclxuXHRcdHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIHRyZWUgZ3JpZCBmb3IgdGhlIEN1cnNvckluZm9zXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVRyZWVHcmlkKCl7XHJcbiAgICAgICAgJCh0aGlzLm1haW5EaXYpLmVqVHJlZUdyaWQoe1xyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ2VsbEVkaXRTdXBwb3J0KCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpLFx0XHJcblxyXG4gICAgICAgICAgICBjaGlsZE1hcHBpbmc6IFwiZmlsdGVyZWRDdXJzb3JJbmZvc1wiLFxyXG4gICAgICAgICAgICBleHBhbmRTdGF0ZU1hcHBpbmc6IFwiZXhwYW5kU3RhdGVcIixcclxuICAgICAgICAgICAgaXNSZXNwb25zaXZlOiB0cnVlLFxyXG4gICAgICAgICAgICB0cmVlQ29sdW1uSW5kZXg6IDEsXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByb3dIZWlnaHQgOiAyOCxcclxuICAgICAgICAgICAgLy8gU2V0IGluaXQgc2l6ZSB0byBkcmF3IHRoZSB0b29sYmFyIGljb25zIGF0IHRoZSByaWdodCBwb3NpdGlvblxyXG4gICAgICAgICAgICBzaXplU2V0dGluZ3M6IHsgaGVpZ2h0OiAnMTAwcHgnLCB3aWR0aDogJzEwMHB4JyB9LFxyXG5cclxuICAgICAgICAgICAgc2VsZWN0aW9uVHlwZTogZWouVHJlZUdyaWQuU2VsZWN0aW9uVHlwZS5NdWx0aXBsZSxcclxuXHJcbiAgICAgICAgICAgIGV4cGFuZGVkOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZE5vZGVFeHBhbmRlZE9yQ29sbGFwc2VkKCksXHJcblx0XHRcdGNvbGxhcHNlZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWROb2RlRXhwYW5kZWRPckNvbGxhcHNlZCgpLFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcm93U2VsZWN0ZWQ6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkUm93U2VsZWN0ZWQoYXJncyksXHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNyZWF0ZTogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRDcmVhdGVkKCksXHJcbiAgICAgICAgICAgIGFjdGlvbkJlZ2luOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZEFjdGlvbkJlZ2luKGFyZ3MpLCBcclxuICAgICAgICAgICAgcXVlcnlDZWxsSW5mbzogKGFyZ3MpID0+IHRoaXMucXVlcnlDZWxsSW5mbyhhcmdzKSxcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZE5vZGVFeHBhbmRlZE9yQ29sbGFwc2VkKCl7XHJcbiAgICAgICAgLy8gUmVmcmVzaCB0byBzZWUgY29ycmVjdCBleHBhbmRlZC9jb2xsYXBzZWQgaWNvblxyXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgIC8vIFBlcnNpc3QgZXhwYW5kU3RhdGUgaW4gZGF0YU1vZGVsXHJcbiAgICAgICAgaWYgKHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBQZXJzaXN0IHNjcm9sbGJhciBzdGF0ZSBpbiBjdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgICAgdGhpcy5zYXZlVHJlZUdyaWRTZXR0aW5ncygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcXVlcnlDZWxsSW5mbyhhcmdzKXtcclxuICAgICAgICBpZihhcmdzLmNvbHVtbi5maWVsZCA9PSB0aGlzLl9jb2x1bW5JZF9WaXNpYmxlKXtcclxuICAgICAgICAgICAgaWYoYXJncy5jZWxsVmFsdWUgPT0gdGhpcy5faW5kZXRlcm1pbmF0ZVN0YXRlVmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgLy8gU2V0IGluZGV0ZXJtaW5hdGUgaWNvbnNcclxuICAgICAgICAgICAgICAgICQoYXJncy5jZWxsRWxlbWVudC5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbMV0pLnByb3AodGhpcy5faW5kZXRlcm1pbmF0ZVN0YXRlVmFsdWUsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJlZUdyaWQgc2VsZWN0ZWQgcm93IGhhcyBjaGFuZ2VkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdHJlZUdyaWRSb3dTZWxlY3RlZChhcmdzKXtcclxuICAgICAgICBpZihhcmdzLm1vZGVsLnNlbGVjdGVkSXRlbXMgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLl9jdXJzb3JJbmZvU2VsZWN0b3JJc0FjdGl2ZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgLy8gU2F2ZXMgdGhlIHNlbGVjdGVkIGl0ZW1zIGZvciBtdWx0aXNlbGVjdGlvbiBzdXBwb3J0IGluIGN1cnNvciBpbmZvIHNlbGVjdG9yXHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkQ3Vyc29ySW5mb3NPbGQgPSB0aGlzLl9zZWxlY3RlZEN1cnNvckluZm9zTmV3XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkQ3Vyc29ySW5mb3NOZXcgPSBhcmdzLm1vZGVsLnNlbGVjdGVkSXRlbXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkQ3Vyc29yU2lnbmFscyA9IHRoaXMuZ2V0T25seUN1cnNvclNpZ25hbHMoYXJncy5tb2RlbC5zZWxlY3RlZEl0ZW1zKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDdXJzb3JJbmZvU2VsZWN0b3JCdXR0b25TdGF0ZSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0IGFsbCBDdXJzb3JTaWduYWxzIGZvciB0aGUgY3VycmVudCBzZWxlY3Rpb24oaWYgQ3Vyc29ySW5mbyBpcyBzZWxlY3RlZCwgZ2V0IHRoZSBwYXJlbnQgQ3Vyc29yU2lnbmFsKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlbGVjdGVkSXRlbXNcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxDdXJzb3JTaWduYWw+fVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRPbmx5Q3Vyc29yU2lnbmFscyhzZWxlY3RlZEl0ZW1zKTogQXJyYXk8Q3Vyc29yU2lnbmFsPntcclxuICAgICAgICBsZXQgbmV3TGlzdCA9IG5ldyBBcnJheTxDdXJzb3JTaWduYWw+KCk7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBzZWxlY3RlZEl0ZW1zLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYoc2VsZWN0ZWRJdGVtc1tpXS5pdGVtIGluc3RhbmNlb2YgQ3Vyc29yU2lnbmFsKXtcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IG5ld0xpc3QuaW5kZXhPZihzZWxlY3RlZEl0ZW1zW2ldLml0ZW0pO1xyXG4gICAgICAgICAgICAgICAgaWYoaW5kZXggPT0gLTEpeyAvLyBPbmx5IGFkZCBpZiBub3QgYWxyZWFkeSBpbiBsaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3TGlzdC5wdXNoKHNlbGVjdGVkSXRlbXNbaV0uaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihzZWxlY3RlZEl0ZW1zW2ldLml0ZW0gaW5zdGFuY2VvZiBDdXJzb3JJbmZvKXtcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IG5ld0xpc3QuaW5kZXhPZihzZWxlY3RlZEl0ZW1zW2ldLnBhcmVudEl0ZW0uaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBpZihpbmRleCA9PSAtMSl7IC8vIE9ubHkgYWRkIGlmIG5vdCBhbHJlYWR5IGluIGxpc3RcclxuICAgICAgICAgICAgICAgICAgICBuZXdMaXN0LnB1c2goc2VsZWN0ZWRJdGVtc1tpXS5wYXJlbnRJdGVtLml0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXdMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY3Vyc29yIGluZm8gc2VsZWN0b3IgYnV0dG9uIHN0YXRlIChpZiBvbmUgKG9yIG1vcmUpIHNpZ25hbCBpcyBzZWxlY3RlZCB0aGUgYnV0dG9uIGlzIGVuYWJsZWQpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUN1cnNvckluZm9TZWxlY3RvckJ1dHRvblN0YXRlKCl7XHJcbiAgICAgICAgaWYodGhpcy5fc2VsZWN0ZWRDdXJzb3JTaWduYWxzID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIG5vIGl0ZW1zIHNlbGVjdGVkIGRlYWN0aXZhdGUgRmlsdGVyIGJ1dHRvblxyXG4gICAgICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVDdXJzb3JJbmZvU2VsZWN0b3JCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuX3NlbGVjdGVkQ3Vyc29yU2lnbmFscy5sZW5ndGggPCAxKXtcclxuICAgICAgICAgICAgLy8gbm8gaXRlbXMgc2VsZWN0ZWQgZGVhY3RpdmF0ZSBGaWx0ZXIgYnV0dG9uXHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzYWJsZUN1cnNvckluZm9TZWxlY3RvckJ1dHRvbih0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlQ3Vyc29ySW5mb1NlbGVjdG9yQnV0dG9uKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIGRlZmluaXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKToge317XHJcbiAgICAgICAgLy8gYWRkIGNoZWNrIGJveCBzdGF0ZSBpbmZvcm1hdGlvblxyXG4gICAgICAgIHZhciBjaGVja0JveFN0YXRlcyA9IFtcclxuICAgICAgICAgICAgeyB0ZXh0OiBcIlllc1wiLCB2YWx1ZTogXCJ0cnVlXCIgfSxcclxuICAgICAgICAgICAgeyB0ZXh0OiBcIk5vXCIsIHZhbHVlOiBcImZhbHNlXCIgfVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIC8vIHJldHVybiB0aGUgY29sdW1uIGRlZmluaXRpb25zXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB7IGZpZWxkOiB0aGlzLl9jb2x1bW5JZF9WaXNpYmxlLCBoZWFkZXJUZXh0OiBcIlZpc2libGVcIiwgdmlzaWJsZTogZmFsc2UsIGFsbG93RWRpdGluZzogZmFsc2UsIGlzVGVtcGxhdGVDb2x1bW46IHRydWUsIHRlbXBsYXRlSUQ6IFwiY2lWaXNpYmxlQ29sdW1uVGVtcGxhdGVcIiwgZmlsdGVyRWRpdFR5cGU6IFwiZHJvcGRvd25lZGl0XCIsIGRyb3Bkb3duRGF0YTogY2hlY2tCb3hTdGF0ZXMsIGFsbG93RmlsdGVyaW5nQmxhbmtDb250ZW50OiBmYWxzZSwgd2lkdGg6IFwiNTVweFwifSxcclxuICAgICAgICAgICAgICAgICAgICB7IGZpZWxkOiB0aGlzLl9jb2x1bW5JZF9OYW1lLCBoZWFkZXJUZXh0OiBcIk5hbWVcIiwgYWxsb3dFZGl0aW5nIDogZmFsc2UsIGlzVGVtcGxhdGVDb2x1bW46IHRydWUsIHRlbXBsYXRlSUQ6IFwiY2lOYW1lQ29sdW1uVGVtcGxhdGVcIn0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBmaWVsZDogdGhpcy5fY29sdW1uSWRfVmFsdWUsIGhlYWRlclRleHQ6IFwiVmFsdWVcIiwgYWxsb3dFZGl0aW5nIDogZmFsc2UsIHdpZHRoOiBcIjE0MHB4XCIsIGlzVGVtcGxhdGVDb2x1bW46IHRydWUsIHRlbXBsYXRlOiBcIjxkaXYgc3R5bGU9J3BhZGRpbmctbGVmdDogMjBweCcgaWQ9J1wiICsgdGhpcy5tYWluRGl2SWQgKyBDVVJTT1JfVkFMVUVfSUQgKyBcInt7OnVpSWR9fSc+PC9kaXY+XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGZpZWxkOiB0aGlzLl9jb2x1bW5JZF9EZXNjcmlwdGlvbiwgaGVhZGVyVGV4dDogXCJEZXNjcmlwdGlvblwiLCAgdmlzaWJsZTogZmFsc2UsIGFsbG93RWRpdGluZyA6IGZhbHNlLCB3aWR0aDogXCIxNDBweFwifSxcclxuICAgICAgICAgICAgICAgICAgICB7IGZpZWxkOiB0aGlzLl9jb2x1bW5JZF9JY29uRGVmaW5pdGlvbiwgdmlzaWJsZTogZmFsc2UsIHdpZHRoOiBcIjBweFwiIH0sXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIHJlc2l6ZSBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpOiB7fXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhbGxvd0NvbHVtblJlc2l6ZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplU2V0dGluZ3M6IHsgY29sdW1uUmVzaXplTW9kZTogZWouVHJlZUdyaWQuQ29sdW1uUmVzaXplTW9kZS5GaXhlZENvbHVtbnMgfSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRDb2x1bW5SZXNpemVkKGFyZ3MpLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcblx0ICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNlbGwgZWRpdCBzZXR0aW5nc1xyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcmV0dXJucyB7e319XHJcblx0ICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGdldFRyZWVHcmlkQ2VsbEVkaXRTdXBwb3J0KCk6IHt9e1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0ZWRpdFNldHRpbmdzOiB7XHRcclxuICAgICAgICAgICAgICAgIGFsbG93RWRpdGluZzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNob3dEZWxldGVDb25maXJtRGlhbG9nICA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2hvd0NvbmZpcm1EaWFsb2cgIDogZmFsc2UgXHJcbiAgICAgICAgICAgIH0sXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCB0b29sYmFyIHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpOiB7fXtcclxuICAgICAgICB0aGlzLl90b29sYmFyID0gbmV3IEN1cnNvckluZm9UcmVlR3JpZFRvb2xiYXIodGhpcy5tYWluRGl2KTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b29sYmFyU2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgIHNob3dUb29sYmFyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tVG9vbGJhckl0ZW1zOiB0aGlzLl90b29sYmFyLmdldEN1c3RvbVRvb2xiYXJzKCksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRvb2xiYXJDbGljazogKGFyZ3MpID0+IHRoaXMudG9vbGJhckNsaWNrKGFyZ3MpXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyZWVHcmlkIHdhcyBjcmVhdGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdHJlZUdyaWRDcmVhdGVkKCl7XHJcbiAgICAgICAgLy8gU2V0cyB0aGUgY3VzdG9tIHRvb2xiYXIgaWNvbnNcclxuICAgICAgICB0aGlzLl90b29sYmFyLnNldFN0eWxlRm9yVG9vbGJhckljb25zKCk7XHJcbiAgICAgICAgdGhpcy5fdG9vbGJhci5pbml0VG9vbGJhclN0YXRlcygpO1xyXG5cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgdGhpcy5hdHRhY2hUb0NoZWNrQm94Q2hhbmdlZEV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2ggY2hlY2sgYm94IGNoYW5nZWQgZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXR0YWNoVG9DaGVja0JveENoYW5nZWRFdmVudCgpe1xyXG4gICAgICAgICQodGhpcy5tYWluRGl2KS5vbihcImNoYW5nZVwiLCBcIi5jdXN0b21DaGVja2JveFwiLCAoZSkgPT4gdGhpcy5jaGVja0JveENoYW5nZWQoZSkgKTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkU3R5bGVzKCkge1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9jdXJzb3JJbmZvV2lkZ2V0L3N0eWxlL2Nzcy9jdXJzb3JJbmZvU3R5bGUuY3NzXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2NjdXJzIG9uIGNoZWNrIGJveCBjaGFuZ2VkIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGVcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2hlY2tCb3hDaGFuZ2VkKGUpe1xyXG4gICAgICAgIGxldCBmaWx0ZXJEYXRhU291cmNlID0gdGhpcy5fY3Vyc29ySW5mb1RlbXBsYXRlRGF0YU1vZGVsO1xyXG5cclxuICAgICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XHJcbiAgICAgICAgbGV0IHRhcmdldEVsZSA9IGUudGFyZ2V0O1xyXG4gICAgICAgIGxldCBjaGVja1N0YXR1cyA9ICQodGFyZ2V0RWxlKS5pcygnOmNoZWNrZWQnKTtcclxuICAgICAgICAvLyAkKHRhcmdldEVsZSkucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICAgIGxldCByZWNvcmQgPSB0aGlzLmdldFRyZWVSZWNvcmQodGFyZ2V0RWxlKTtcclxuICAgICAgICBpZihyZWNvcmQgIT0gdW5kZWZpbmVkKXsgICAgXHJcbiAgICAgICAgICAgIGlmKGNoZWNrU3RhdHVzID09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgIHJlY29yZC5pdGVtLnZpc2libGUgPSBcImZhbHNlXCI7XHJcbiAgICAgICAgICAgICAgICByZWNvcmRbXCJ2aXNpYmxlXCJdID0gXCJmYWxzZVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNdWx0aVNlbGVjdGlvbkNoZWNrQm94ZXMoXCJmYWxzZVwiLCByZWNvcmQuaW5kZXgpO1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICByZWNvcmQuaXRlbS52aXNpYmxlID0gXCJ0cnVlXCI7XHJcbiAgICAgICAgICAgICAgICByZWNvcmRbXCJ2aXNpYmxlXCJdID0gXCJ0cnVlXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldE11bHRpU2VsZWN0aW9uQ2hlY2tCb3hlcyhcInRydWVcIiwgcmVjb3JkLmluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRNb2RlbChmaWx0ZXJEYXRhU291cmNlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNldCBzZWxlY3Rpb24gYWZ0ZXIgc2V0dGluZyBjaGVja2JveCBiZWNhdXNlIHRoZXkgYXJlIGxvc3QgYWZ0ZXIgc2V0dGluZyBhIGNoZWNrIGJveFxyXG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGlvbkluQ3Vyc29ySW5mb1NlbGVjdG9yVmlldyh0aGlzLl9zZWxlY3RlZEN1cnNvckluZm9zT2xkKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDaGVja0JveGVzKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBVcGRhdGUgY3Vyc29yIGluZm8gdmlzaWJpbGl0aWVzIGlmIHNvbWV0aGluZyBoYXMgY2hhbmdlZFxyXG4gICAgICAgICAgICB0aGlzLnNldEN1cnNvckluZm9WaXNpYmlsaXRpZXModGhpcy5fc2VsZWN0ZWRDdXJzb3JTaWduYWxzLCB0aGlzLl9jdXJzb3JJbmZvVGVtcGxhdGVEYXRhTW9kZWxbMF0pO1xyXG4gICAgICAgICAgICAvLyBVcGRhdGUgZGF0YU1vZGVsXHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwhLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIElmIG11bHRpIHNlbGVjdGlvbiBpcyBhY3RpdmUsIHNldCBhbGwgc2VsZWN0ZWQgaXRlbXMgdG8gdGhlIGdpdmVuIHN0YXRlKGNoZWNrZWQvdW5jaGVja2VkKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhY3R1YWxJbmRleFxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRNdWx0aVNlbGVjdGlvbkNoZWNrQm94ZXMoc3RhdGU6IHN0cmluZywgYWN0dWFsSW5kZXg6IG51bWJlcil7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkQ3Vyc29ySW5mb3MgPSB0aGlzLl9zZWxlY3RlZEN1cnNvckluZm9zT2xkO1xyXG4gICAgICAgIGlmKHNlbGVjdGVkQ3Vyc29ySW5mb3MgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gU2V0L1Vuc2V0IGNoZWNrIGJveGVzXHJcbiAgICAgICAgICAgIGxldCBpbmRleFdpdGhpbk11bHRpU2VsZWN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9MDsgaSA8IHNlbGVjdGVkQ3Vyc29ySW5mb3MubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYoYWN0dWFsSW5kZXggPT0gc2VsZWN0ZWRDdXJzb3JJbmZvc1tpXS5pbmRleCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhXaXRoaW5NdWx0aVNlbGVjdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmKGluZGV4V2l0aGluTXVsdGlTZWxlY3Rpb24gPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEN1cnNvckluZm9zLmZvckVhY2goY3Vyc29ySW5mbyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29ySW5mby5pdGVtLnZpc2libGUgPSBzdGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJzb3JJbmZvW1widmlzaWJsZVwiXSA9IHN0YXRlOyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vIE9ubHkgb25lIGNoZWNrYm94IHdhcyBjbGlja2VkID0+IHNldCBzZWxlY3Rpb24gdG8gdGhlIG5ldyBvbmVcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkQ3Vyc29ySW5mb3NPbGQgPSB0aGlzLl9zZWxlY3RlZEN1cnNvckluZm9zTmV3O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJlZUdyaWRBY3Rpb25CZWdpbihhcmdzKXtcclxuICAgICAgICAvLyBEb24ndCBzdXBwb3J0IFwiRW50Zi9EZWxcIiBrZXlcclxuICAgICAgICBpZihhcmdzLnJlcXVlc3RUeXBlID09IFwiZGVsZXRlXCIpe1xyXG4gICAgICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQSB0cmVlZ3JpZCBjb2x1bW4gd2FzIHJlc2l6ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkQ29sdW1uUmVzaXplZChhcmdzKXtcclxuICAgICAgICBzdXBlci5yZXNpemVEeW5hbWljQ29sdW1uKGFyZ3MuY29sdW1uSW5kZXgsIGFyZ3MubW9kZWwpO1xyXG4gICAgICAgIGlmICh0aGlzLl9jdXJzb3JJbmZvU2VsZWN0b3JJc0FjdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNoZWNrQm94ZXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUmVmcmVzaCBjdXJzb3IgaW5mbyB2YWx1ZXMgYWZ0ZXIgcmVzaXplICh0cmVlZ3JpZCBzZXRzIHRoZSBkYXRhIHRvIFwiMFwiIGFmdGVyIHJlc2l6ZSlcclxuICAgICAgICB0aGlzLnJlZnJlc2hDdXJzb3JWYWx1ZXMoKTtcclxuXHJcbiAgICAgICAgLy8gSnVzdCBwZXJzaXN0IGNvbHVtbiByZXNpemUgd2hlbiBmaWx0ZXIgaXMgY2xvc2VkXHJcbiAgICAgICAgaWYgKCF0aGlzLl9jdXJzb3JJbmZvU2VsZWN0b3JJc0FjdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVUcmVlR3JpZFNldHRpbmdzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiByZXNpemVzIHRoZSBjdXJzb3IgdmFsdWVzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIucmVzaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIGlmICh0aGlzLl9jdXJzb3JJbmZvU2VsZWN0b3JJc0FjdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNoZWNrQm94ZXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUmVmcmVzaCBjdXJzb3IgdmFsdWVzIGFmdGVyIHJlc2l6ZSAodHJlZWdyaWQgc2V0cyB0aGUgZGF0YSB0byBcIjBcIiBhZnRlciByZXNpemUpXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQ3Vyc29yVmFsdWVzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIucmVzaXplKHdpZHRoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWN0aXZhdGVDdXJzb3JJbmZvU2VsZWN0b3JWaWV3KGFjdGl2YXRlOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLl90b29sYmFyLmFjdGl2YXRlQ3Vyc29ySW5mb1NlbGVjdG9yVmlldyhhY3RpdmF0ZSk7XHJcbiAgICAgICAgaWYoYWN0aXZhdGUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0N1cnNvckluZm9TZWxlY3RvclZpZXcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zaG93Q3Vyc29yU2lnbmFsc1ZpZXcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gVXBkYXRlIHRvb2xiYXIgYnV0dG9uIHBvc2l0aW9ucyhlLmcuIHBvc2l0aW9uIG9mIHJpZ2h0IGFsaWduIHRvb2xiYXIpIGFmdGVyIGhpZGUgb3Igc2hvdyB0b29sYmFyIGJ1dHRvblxyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIucmVzaXplKHRoaXMud2lkdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2hvd3MgdGhlIGN1cnNlciBzaWduYWxzIHdpdGggdGhlIGZpbHRlcmVkL2RlZmluZWQgY3Vyc29yIGluZm9ybWF0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2hvd0N1cnNvclNpZ25hbHNWaWV3KCl7XHJcbiAgICAgICAgdGhpcy5fY3Vyc29ySW5mb1NlbGVjdG9ySXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zZWxlY3RlZEN1cnNvckluZm9zT2xkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkQ3Vyc29ySW5mb3NOZXcgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIC8vIFNob3cgYWN0dWFsIGN1cnNvckluZm8gZGF0YVxyXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG5cclxuICAgICAgICAvLyBTZXRzIHRoZSBjb2x1bW4gdmlzaWJpbGl0aWVzXHJcbiAgICAgICAgbGV0IHRyZWVHcmlkT2JqZWN0ID0gc3VwZXIuZ2V0VHJlZUdyaWRPYmplY3QoKTsgIFxyXG4gICAgICAgIHRoaXMuc2V0Q29sdW1uVmlzaWJsaXRpZXModHJlZUdyaWRPYmplY3QsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgLy8gc2V0IHRoZSBzZWxlY3Rpb24gdG8gc3RhdGUgYmVmb3JlIHN3aXRjaGluZyB0byB0aGUgY3Vyc29yIGluZm8gc2VsZWN0b3Igdmlld1xyXG4gICAgICAgIHRoaXMuc2V0U2VsZWN0aW9uV2l0aEN1cnNvclNpZ25hbHModHJlZUdyaWRPYmplY3QsIHRoaXMuX3NlbGVjdGVkQ3Vyc29yU2lnbmFscyk7XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgZHluYW1pYyBjb2x1bW4gc2l6ZSBhZnRlciBoaWRlL3Nob3cgb2Ygc29tZSBjb2x1bW5zXHJcbiAgICAgICAgdGhpcy5yZXNpemVEeW5hbWljQ29sdW1uKDAsIHRyZWVHcmlkT2JqZWN0Lm1vZGVsKTtcclxuXHJcbiAgICAgICAgLy8gcmVmcmVzaCB0aGUgY3Vyc29yIGluZm8gdmFsdWVzXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQ3Vyc29yVmFsdWVzKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2hvd3MgdGhlIGN1cnNvciBpbmZvIHNlbGVjdG9yIHZpZXdcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNob3dDdXJzb3JJbmZvU2VsZWN0b3JWaWV3KCl7XHJcbiAgICAgICAgdGhpcy5fY3Vyc29ySW5mb1NlbGVjdG9ySXNBY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyBSZXNldCBjdXJzb3IgaW5mbyB0ZW1wbGF0ZSBkYXRhbW9kZWxcclxuICAgICAgICB0aGlzLl9jdXJzb3JJbmZvVGVtcGxhdGVEYXRhTW9kZWwuc3BsaWNlKDAsIHRoaXMuX2N1cnNvckluZm9UZW1wbGF0ZURhdGFNb2RlbC5sZW5ndGgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGNyZWF0ZSBhIHNpZ25hbCB0ZW1wbGF0ZSBiYXNlZCBvbiB0aGUgc2VsZWN0ZWQgc2VyaWVzXHJcbiAgICAgICAgbGV0IHRlbXBsYXRlQ3Vyc29yU2lnbmFsID0gbmV3IER5bmFtaWNDdXJzb3JTaWduYWxUZW1wbGF0ZSh0aGlzLl9zZWxlY3RlZEN1cnNvclNpZ25hbHMpXHJcblxyXG4gICAgICAgIC8vIGFkZCB0aGUgc2lnbmFsIHRlbXBsYXRlIHRvIHRoZSBtb2RlbFxyXG4gICAgICAgIHRoaXMuX2N1cnNvckluZm9UZW1wbGF0ZURhdGFNb2RlbC5wdXNoKHRlbXBsYXRlQ3Vyc29yU2lnbmFsKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBTZXQgY3Vyc29yIGluZm8gdGVtcGxhdGUgdmlzaWJpbGl0aWVzXHJcbiAgICAgICAgdGhpcy51cGRhdGVUZW1wbGF0ZVZpc2liaWxpdGllcyh0aGlzLl9zZWxlY3RlZEN1cnNvclNpZ25hbHMsIHRlbXBsYXRlQ3Vyc29yU2lnbmFsKTtcclxuICAgICAgIFxyXG4gICAgICAgIC8vIHNob3cgY3Vyc29yIGluZm8gdGVtcGxhdGUgZGF0YW1vZGVsICh0aGUgcG9zc2libGUgY3Vyc29yIGluZm9zKVxyXG4gICAgICAgIHRoaXMudXBkYXRlRGF0YVNvdXJjZSg8YW55PnRoaXMuX2N1cnNvckluZm9UZW1wbGF0ZURhdGFNb2RlbCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gU2V0cyB0aGUgY29sdW1uIHZpc2liaWxpdGllc1xyXG4gICAgICAgIGxldCB0cmVlR3JpZE9iamVjdCA9IHN1cGVyLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcbiAgICAgICAgdGhpcy5zZXRDb2x1bW5WaXNpYmxpdGllcyh0cmVlR3JpZE9iamVjdCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgZHluYW1pYyBjb2x1bW4gc2l6ZSBhZnRlciBoaWRlL3Nob3cgb2Ygc29tZSBjb2x1bW5zXHJcbiAgICAgICAgdGhpcy5yZXNpemVEeW5hbWljQ29sdW1uKDAsIHRyZWVHcmlkT2JqZWN0Lm1vZGVsKTtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlcyB0aGUgZmlsdGVyIG9mIHRoZSB2aXNpYmlsaXR5IGZsYWcgd2hpY2ggaXMgbmVlZGVkIGluIHRoZSBjdXJzb3Igc2lnbmFsIHZpZXdcclxuICAgICAgICB0cmVlR3JpZE9iamVjdC5jbGVhckZpbHRlcih0aGlzLl9jb2x1bW5JZF9WaXNpYmxlKTtcclxuXHJcbiAgICAgICAgLy8gQ29udmVydCBjdXN0b20gY2hlY2sgYm94ZXMgaW50byBzeW5jZnVzaW9uIGNoZWNrIGJveGVzXHJcbiAgICAgICAgdGhpcy51cGRhdGVDaGVja0JveGVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjb2x1bW4gdmlzaWJpbGl0aWVzIGZvciB0aGUgY3Vyc29yIGluZm8gc2VsZWN0b3IgdmlldyBvciB0aGUgY3Vyc29yIHNpZ25hbHMgdmlld1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHRyZWVHcmlkT2JqZWN0XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGN1cnNvckluZm9TZWxlY3RvclZpZXdcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0Q29sdW1uVmlzaWJsaXRpZXModHJlZUdyaWRPYmplY3QsIGN1cnNvckluZm9TZWxlY3RvclZpZXc6Ym9vbGVhbil7XHJcbiAgICAgICAgLy8gZ2V0IG5lZWRlZCBjb2x1bW5zXHJcbiAgICAgICAgbGV0IHZpc2libGVDb2x1bW4gPSB0cmVlR3JpZE9iamVjdC5nZXRDb2x1bW5CeUZpZWxkKHRoaXMuX2NvbHVtbklkX1Zpc2libGUpO1xyXG4gICAgICAgIGxldCBkZXNjcmlwdGlvbkNvbHVtbiA9IHRyZWVHcmlkT2JqZWN0LmdldENvbHVtbkJ5RmllbGQodGhpcy5fY29sdW1uSWRfRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIGxldCB2YWx1ZUNvbHVtbiA9IHRyZWVHcmlkT2JqZWN0LmdldENvbHVtbkJ5RmllbGQodGhpcy5fY29sdW1uSWRfVmFsdWUpO1xyXG5cclxuICAgICAgICBpZihjdXJzb3JJbmZvU2VsZWN0b3JWaWV3ID09IGZhbHNlKXtcclxuICAgICAgICAgICAgLy8gSGlkZSB2aXNpYmxlIGNvbHVtblxyXG4gICAgICAgICAgICB0cmVlR3JpZE9iamVjdC5oaWRlQ29sdW1uKHZpc2libGVDb2x1bW4uaGVhZGVyVGV4dCk7XHJcblxyXG4gICAgICAgICAgICAvLyBIaWRlIGRlc2NyaXB0aW9uIGNvbHVtblxyXG4gICAgICAgICAgICB0cmVlR3JpZE9iamVjdC5oaWRlQ29sdW1uKGRlc2NyaXB0aW9uQ29sdW1uLmhlYWRlclRleHQpO1xyXG5cclxuICAgICAgICAgICAgLy8gU2hvdyB2YWx1ZSBjb2x1bW5cclxuICAgICAgICAgICAgdHJlZUdyaWRPYmplY3Quc2hvd0NvbHVtbih2YWx1ZUNvbHVtbi5oZWFkZXJUZXh0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgLy8gU2hvdyB2aXNpYmxlIGNvbHVtblxyXG4gICAgICAgICAgICB0cmVlR3JpZE9iamVjdC5zaG93Q29sdW1uKHZpc2libGVDb2x1bW4uaGVhZGVyVGV4dCk7XHJcblxyXG4gICAgICAgICAgICAvLyBTaG93IGRlc2NyaXB0aW9uIGNvbHVtblxyXG4gICAgICAgICAgICB0cmVlR3JpZE9iamVjdC5zaG93Q29sdW1uKGRlc2NyaXB0aW9uQ29sdW1uLmhlYWRlclRleHQpO1xyXG5cclxuICAgICAgICAgICAgLy8gSGlkZSB2YWx1ZSBjb2x1bW5cclxuICAgICAgICAgICAgdHJlZUdyaWRPYmplY3QuaGlkZUNvbHVtbih2YWx1ZUNvbHVtbi5oZWFkZXJUZXh0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBzZWxlY3Rpb24gdG8gdGhlIGdpdmVuIHNlbGVjdGlvbiBvYmplY3RzIGluIGN1cnNvciBpbmZvIHNlbGVjdG9yIHZpZXdcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxhbnk+fSBzZWxlY3RlZE9iamVjdHNcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0U2VsZWN0aW9uSW5DdXJzb3JJbmZvU2VsZWN0b3JWaWV3KHNlbGVjdGVkT2JqZWN0cykge1xyXG4gICAgICAgIGlmIChzZWxlY3RlZE9iamVjdHMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0cmVlR3JpZE9iamVjdDogYW55ID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG4gICAgICAgIHRyZWVHcmlkT2JqZWN0LmNsZWFyU2VsZWN0aW9uKCk7XHJcbiAgICAgICAgaWYgKHNlbGVjdGVkT2JqZWN0cy5sZW5ndGggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgc2VsZWN0ZWRPYmplY3RzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgdHJlZUdyaWRPYmplY3QuX211bHRpU2VsZWN0Q3RybFJlcXVlc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbGV0IHZpc2libGVJbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgdHJlZUdyaWRPYmplY3QubW9kZWwuZmxhdFJlY29yZHMubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRyZWVHcmlkT2JqZWN0Lm1vZGVsLmZsYXRSZWNvcmRzW2pdLmlkID09IHNlbGVjdGVkT2JqZWN0c1tpXS5pZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmVlR3JpZE9iamVjdC5zZWxlY3RSb3dzKHZpc2libGVJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGVJbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0cmVlR3JpZE9iamVjdC5zZWxlY3RSb3dzKHNlbGVjdGVkT2JqZWN0cy5pbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFNldCBhY3R1YWwgc2VsZWN0aW9uIGZvciBsYXRlciB1c2UgXHJcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmZvc09sZCA9IHNlbGVjdGVkT2JqZWN0cztcclxuICAgICAgICB0aGlzLl9zZWxlY3RlZEN1cnNvckluZm9zTmV3ID0gc2VsZWN0ZWRPYmplY3RzO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHNlbGVjdGlvbiB0byB0aGUgZ2l2ZW4gY3Vyc29yIHNpZ25hbHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSB0cmVlR3JpZE9iamVjdFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxDdXJzb3JTaWduYWw+fSBjdXJzb3JTaWduYWxzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFNlbGVjdGlvbldpdGhDdXJzb3JTaWduYWxzKHRyZWVHcmlkT2JqZWN0LCBjdXJzb3JTaWduYWxzOiBBcnJheTxDdXJzb3JTaWduYWw+KSB7XHJcbiAgICAgICAgLy8gZGVzZWxlY3QgYWxsIHNlbGVjdGlvbnMgaW4gY3Vyc29yIHNpZ25hbHMgdmlld1xyXG4gICAgICAgIHRyZWVHcmlkT2JqZWN0LmNsZWFyU2VsZWN0aW9uKCk7XHJcblxyXG4gICAgICAgIGlmKGN1cnNvclNpZ25hbHMgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgY3Vyc29yU2lnbmFscy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgdHJlZUdyaWRPYmplY3QuX211bHRpU2VsZWN0Q3RybFJlcXVlc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgdmlzaWJsZUluZGV4ID0gMDtcclxuICAgICAgICAgICAgbGV0IG1vZGVsID0gdHJlZUdyaWRPYmplY3QubW9kZWw7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBtb2RlbC5mbGF0UmVjb3Jkcy5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgICAgICBpZihtb2RlbC5mbGF0UmVjb3Jkc1tqXS5pdGVtID09IGN1cnNvclNpZ25hbHNbaV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHRyZWVHcmlkT2JqZWN0LnNlbGVjdFJvd3ModmlzaWJsZUluZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKG1vZGVsLmZsYXRSZWNvcmRzW2pdLnZpc2libGUgIT0gXCJmYWxzZVwiKXtcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlSW5kZXgrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgdmlzaWJsZSBmbGFncyBpbiB0aGUgdGVtcGxhdGUgY3Vyc29yIHNpZ25hbCB0byB0aGUgaW5mb3JtYXRpb25zIGZyb20gdGhlIGN1cnNvciBzaWduYWxzXHJcbiAgICAgKiAoZS5nLiBhbGwgc2lnbmFscyBzaG93IHkxIGN1cnNvciBpbmZvIHNvIHRoZXJlZm9yZSB0ZW1wbGF0ZSBjdXJzb3IgaW5mbyB2aXNpYmlsaXR5IGlzIHNldCB0byBcInRydWVcIjtcclxuICAgICAqICAgICAgIGFsbCBzaWduYWxzIGRvc24ndCBzaG93IHkxIGN1cnNvciBpbmZvIHNvIHRoZXJlZm9yZSB0ZW1wbGF0ZSBjdXJzb3IgaW5mbyB2aXNpYmlsaXR5IGlzIHNldCB0byBcImZhbHNlXCI7XHJcbiAgICAgKiAgICAgICBzb21lIHNpZ25hbHMgc2hvdyB5MSBjdXJzb3IgaW5mbyBzbyB0aGVyZWZvcmUgdGVtcGxhdGUgY3Vyc29yIGluZm8gdmlzaWJpbGl0eSBpcyBzZXQgdG8gXCJpbmRldGVybWluYXRlXCI7XHJcbiAgICAgKiApXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8Q3Vyc29yU2lnbmFsPn0gY3Vyc29yU2lnbmFsc1xyXG4gICAgICogQHBhcmFtIHtEeW5hbWljQ3Vyc29yU2lnbmFsVGVtcGxhdGV9IHRlbXBsYXRlQ3Vyc29yU2lnbmFsXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVUZW1wbGF0ZVZpc2liaWxpdGllcyhjdXJzb3JTaWduYWxzOiBBcnJheTxDdXJzb3JTaWduYWw+LCB0ZW1wbGF0ZUN1cnNvclNpZ25hbDogRHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRlKSB7XHJcbiAgICAgICAgaWYgKHRlbXBsYXRlQ3Vyc29yU2lnbmFsICYmIHRlbXBsYXRlQ3Vyc29yU2lnbmFsLmN1cnNvckluZm9zKSB7XHJcbiAgICAgICAgICAgIC8vIGZvciBhbGwgYXZhaWxhYmxlIG1lcmdlZCBjdXJzb3IgaW5mb3NcclxuICAgICAgICAgICAgdGVtcGxhdGVDdXJzb3JTaWduYWwuY3Vyc29ySW5mb3MuZm9yRWFjaCgodGVtcGxhdGVDdXJzb3JTaWduYWxJbmZvKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY2xlYXIgZXhpc3RpbmcgdmlzaWJpbGl0eVxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVDdXJzb3JTaWduYWxJbmZvLnZpc2libGUgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgY3Vyc29yIGluZm9zIGJ5IGlkXHJcbiAgICAgICAgICAgICAgICBsZXQgbWF0Y2hpbmdDdXJzb3JJbmZvczogQXJyYXk8Q3Vyc29ySW5mbz4gPSB0aGlzLnJldHJpZXZDdXJzb3JJbmZvc0J5SWQoY3Vyc29yU2lnbmFscywgdGVtcGxhdGVDdXJzb3JTaWduYWxJbmZvLmlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBmb3IgYWxsIHNlbGVjdGVkIGN1cnNvciBzaWduYWxzIHdpdGggbWF0Y2hpbmcgaWQgLi4uXHJcbiAgICAgICAgICAgICAgICBtYXRjaGluZ0N1cnNvckluZm9zLmZvckVhY2goKGN1cnNvclNpZ25hbEluZm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgdmlzaWJpbGl0eSBpcyB5ZXQgdW5kZWZpbmVkIC4uXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0ZW1wbGF0ZUN1cnNvclNpZ25hbEluZm8udmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpbml0aWFsaXplIHRoZSB2aXNpYmlsaXR5IHdpdGggdGhlIGZpcnN0IGN1cnNvciBzaWduYWwgaW5mb3MgdmFsdWUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlQ3Vyc29yU2lnbmFsSW5mby52aXNpYmxlID0gY3Vyc29yU2lnbmFsSW5mby52aXNpYmxlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNldCB2aXNpYmlsaXR5IHRvIHVuZGV0ZXJtaW5lZCBpZiBvbmUgb2YgdGhlIGZvbGxvd2luZyB2YWx1ZXMgaXMgZGlmZmVyZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJzb3JTaWduYWxJbmZvLnZpc2libGUgIT09IHRlbXBsYXRlQ3Vyc29yU2lnbmFsSW5mby52aXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZUN1cnNvclNpZ25hbEluZm8udmlzaWJsZSA9IHRoaXMuX2luZGV0ZXJtaW5hdGVTdGF0ZVZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB2aXNpYmlsaXR5IGRlZmluZWQgaW4gdGhlIHRlbXBsYXRlIGN1cnNvciBzaWduYWwgdG8gdGhlIGN1cnNvciBzaWduYWxzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8Q3Vyc29yU2lnbmFsPn0gY3Vyc29yU2lnbmFsc1xyXG4gICAgICogQHBhcmFtIHtEeW5hbWljQ3Vyc29yU2lnbmFsVGVtcGxhdGV9IHRlbXBsYXRlQ3Vyc29yU2lnbmFsXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRDdXJzb3JJbmZvVmlzaWJpbGl0aWVzKGN1cnNvclNpZ25hbHM6IEFycmF5PEN1cnNvclNpZ25hbD4sIHRlbXBsYXRlQ3Vyc29yU2lnbmFsOiBEeW5hbWljQ3Vyc29yU2lnbmFsVGVtcGxhdGUpIHtcclxuICAgICAgICBpZiAodGVtcGxhdGVDdXJzb3JTaWduYWwgJiYgdGVtcGxhdGVDdXJzb3JTaWduYWwuY3Vyc29ySW5mb3MpIHtcclxuICAgICAgICAgICAgLy8gZm9yIGFsbCBhdmFpbGFibGUgbWVyZ2VkIGN1cnNvciBpbmZvc1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZUN1cnNvclNpZ25hbC5jdXJzb3JJbmZvcy5mb3JFYWNoKCh0ZW1wbGF0ZUN1cnNvclNpZ25hbEluZm8pID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGVtcGxhdGVDdXJzb3JTaWduYWxJbmZvLnZpc2libGUgIT09IHRoaXMuX2luZGV0ZXJtaW5hdGVTdGF0ZVZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBjdXJzb3IgaW5mb3MgYnkgaWRcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWF0Y2hpbmdDdXJzb3JJbmZvczogQXJyYXk8Q3Vyc29ySW5mbz4gPSB0aGlzLnJldHJpZXZDdXJzb3JJbmZvc0J5SWQoY3Vyc29yU2lnbmFscywgdGVtcGxhdGVDdXJzb3JTaWduYWxJbmZvLmlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZm9yIGFsbCBzZWxlY3RlZCBjdXJzb3IgaW5mb3Mgd2l0aCBtYXRjaGluZyBpZCAuLi5cclxuICAgICAgICAgICAgICAgICAgICBtYXRjaGluZ0N1cnNvckluZm9zLmZvckVhY2goKGN1cnNvclNpZ25hbEluZm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V0IHRoZSBjdXJzb3Igc2lnbmFscyB2aXNpYmlsaXR5IGZyb20gdGhlIHRlbXBsYXRlIHZhbHVlIGlmIGEgdmFsaWQgc3RhdGUgaXMgZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3JTaWduYWxJbmZvLnZpc2libGUgPSB0ZW1wbGF0ZUN1cnNvclNpZ25hbEluZm8udmlzaWJsZTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIGN1cnNvciBpbmZvcyB3aXRoIHRoZSBzcGVjaWZpZWQgaWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxDdXJzb3JTaWduYWw+fSBjdXJzb3JTaWduYWxzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY3Vyc29ySW5mb0lkXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8Q3Vyc29ySW5mbz59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJldHJpZXZDdXJzb3JJbmZvc0J5SWQoY3Vyc29yU2lnbmFsczogQXJyYXk8Q3Vyc29yU2lnbmFsPiwgY3Vyc29ySW5mb0lkOiBzdHJpbmcpOiBBcnJheTxDdXJzb3JJbmZvPiB7XHJcbiAgICAgICAgbGV0IG1hdGNoaW5nQ3Vyc29ySW5mb3M6IEFycmF5PEN1cnNvckluZm8+ID0gW107XHJcbiAgICAgICAgY3Vyc29yU2lnbmFscy5mb3JFYWNoKChjdXJzb3JTaWduYWwpID0+IHtjdXJzb3JTaWduYWwuY3Vyc29ySW5mb3MuZm9yRWFjaCgoY3Vyc29yU2lnbmFsSW5mbykgPT4geyBcclxuICAgICAgICAgICAgICAgIGlmIChjdXJzb3JTaWduYWxJbmZvLmlkID09PSBjdXJzb3JJbmZvSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXRjaGluZ0N1cnNvckluZm9zLnB1c2goY3Vyc29yU2lnbmFsSW5mbyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gbWF0Y2hpbmdDdXJzb3JJbmZvcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJhaXNlcyB0aGUgbW92ZSBjdXJzb3IgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3Vyc29ySW5kZXhcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yTW92ZW1lbnR9IG1vdmVtZW50XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25Nb3ZlQ3Vyc29yKGN1cnNvckluZGV4OiBudW1iZXIsIG1vdmVtZW50OiBDdXJzb3JNb3ZlbWVudCkge1xyXG4gICAgICAgIGxldCBkYXRhOiBCYXNlU2VyaWVzIFtdID0gW107XHJcblxyXG4gICAgICAgIGxldCB4ID0gdGhpcy5jdXJzb3JzU3RhdGVzLmdldFBvc2l0aW9uKGN1cnNvckluZGV4LCB0aGlzLmN1cnNvcnNTdGF0ZXMuZ2V0TGFzdEN1cnNvclR5cGVTZWxlY3RlZCgpKTtcclxuICAgICAgICBpZih0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBjdXJzb3JzID0gdGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbC5nZXRDdXJzb3JTaWduYWxzKCk7XHJcbiAgICAgICAgICAgIGN1cnNvcnMuZm9yRWFjaChjdXJzb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5wdXNoKGN1cnNvci5zZXJpZSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmKHggIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZUN1cnNvcihjdXJzb3JJbmRleCwgbW92ZW1lbnQsIGRhdGEsIHgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbW92ZXMgdGhlIGN1cnNvciBmb3IgdGhlIHNwZWNpZmllZCBkaXJlY3Rpb24gYW5kIG9mZnNldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3Vyc29ySW5kZXhcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yTW92ZW1lbnR9IGN1cnNvck1vdmVtZW50XHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXNbXX0gc2VyaWVzXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3Vyc29yUG9zaXRpb25cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbW92ZUN1cnNvcihjdXJzb3JJbmRleDogbnVtYmVyLCBjdXJzb3JNb3ZlbWVudDpDdXJzb3JNb3ZlbWVudCxzZXJpZXM6QmFzZVNlcmllc1tdLGN1cnNvclBvc2l0aW9uOm51bWJlcikge1xyXG5cclxuICAgICAgICBsZXQgY3Vyc29yVHlwZTogQ3Vyc29yVHlwZSA9IHRoaXMuY3Vyc29yc1N0YXRlcy5nZXRMYXN0Q3Vyc29yVHlwZVNlbGVjdGVkKCk7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBuZXh0IHBvc3NpYmxlIGN1cnNvciB0aW1lc3RhbXBcclxuICAgICAgICBsZXQgbmVhcmVzdFRpbWVzdGFtcCA9IHRoaXMuZmluZE5lYXJlc3RUaW1lc3RhbXBJblNlcmllcyhzZXJpZXMsIGN1cnNvclBvc2l0aW9uLCBjdXJzb3JNb3ZlbWVudCwgY3Vyc29yVHlwZSk7XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgY3Vyc29ycyB0aW1lc3RhbXAgbG9jYXRpb25cclxuICAgICAgICB0aGlzLnVwZGF0ZUN1cnNvckxvY2F0aW9uKGN1cnNvckluZGV4LCBuZWFyZXN0VGltZXN0YW1wKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHNlYXJjaGVzIHRoZSBuZXh0IHRpbWVzdGFtcCBpbiBhbGwgYXZhaWxhYmxlIHNlcmllcy4gVGhlIHBpY2tlZCB2YWx1ZSB0YWtlcyB0aGUgbW92ZW1lbnQgZGlyZWN0aW9uIGludG9pIGFjY291bnQuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc1tdfSBzZXJpZXNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JUaW1lU3RhbXBcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yTW92ZW1lbnR9IGN1cnNvck1vdmVtZW50XHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBmaW5kTmVhcmVzdFRpbWVzdGFtcEluU2VyaWVzKHNlcmllczogQmFzZVNlcmllc1tdLCBjdXJzb3JUaW1lU3RhbXA6IG51bWJlciwgY3Vyc29yTW92ZW1lbnQ6IEN1cnNvck1vdmVtZW50LCBjdXJzb3JUeXBlOiBDdXJzb3JUeXBlKTogbnVtYmVyIHtcclxuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgdGltZXN0YW1wcyBzZXJpZXMgZnJvbSB0aGUgc2lnbmFsIHNlcmllc1xyXG4gICAgICAgIGxldCB0aW1lc3RhbXBTZXJpZXMgPSBzZXJpZXMubWFwKChzaW5nbGVTZXJpZXMpID0+IHsgXHJcbiAgICAgICAgICAgIGlmIChDdXJzb3JUeXBlSGVscGVyLmdldEN1cnNvclR5cGVGb3JTZXJpZXMoc2luZ2xlU2VyaWVzKSA9PSBjdXJzb3JUeXBlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzaW5nbGVTZXJpZXMudGltZXN0YW1wczsgXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IG5leHROZWFyZXN0VGltZVN0YW1wID0gY3Vyc29yVGltZVN0YW1wO1xyXG5cclxuICAgICAgICAvLyBkcGVuZGl1bmcgb24gbW92ZW1lbnQgZGlyZWN0aW9uIHdlIHBpY2sgdGhlIG5leHQgcG9zc2libGUgdGltZSBzdGFtcFxyXG4gICAgICAgIHN3aXRjaCAoY3Vyc29yTW92ZW1lbnQpIHtcclxuICAgICAgICAgICAgY2FzZSBDdXJzb3JNb3ZlbWVudC5SaWdodDpcclxuICAgICAgICAgICAgICAgIG5leHROZWFyZXN0VGltZVN0YW1wID0gU2VyaWVzSGVscGVyLmZpbmROZWFyZXN0VmFsdWVGcm9tQ29sbGVjdGlvbihjdXJzb3JUaW1lU3RhbXAsIHRpbWVzdGFtcFNlcmllcywgU2VhcmNoTW9kZS5ORVhUVVBQRVIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ3Vyc29yTW92ZW1lbnQuTGVmdDpcclxuICAgICAgICAgICAgICAgIG5leHROZWFyZXN0VGltZVN0YW1wID0gU2VyaWVzSGVscGVyLmZpbmROZWFyZXN0VmFsdWVGcm9tQ29sbGVjdGlvbihjdXJzb3JUaW1lU3RhbXAsIHRpbWVzdGFtcFNlcmllcywgU2VhcmNoTW9kZS5QUkVWSU9VU0xPV0VSKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV4dE5lYXJlc3RUaW1lU3RhbXA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgY3Vyc29yIGFjdGl2YXRpb24vc2VsZWN0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1cnNvckluZGV4XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25SZWZlcmVuY2VDdXJzb3JTZWxlY3RlZChjdXJzb3JJbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBjdXJzb3Igc2VsZWN0aW9uIHN0YXRlXHJcbiAgICAgICAgdGhpcy5jdXJzb3JzU3RhdGVzLnNldFNlbGVjdGVkKGN1cnNvckluZGV4LCB0cnVlKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlQ3Vyc29yU3RhdGVzKHRoaXMuY3Vyc29yc1N0YXRlcyk7XHJcblxyXG4gICAgICAgIC8vIHNldCB0aGUgY3Vyc29ycyBhcyBhY3RpdmUgdG9vbFxyXG4gICAgICAgIGxldCB0b29sc3RhdGU6IENoYXJ0Vmlld1Rvb2xTdGF0ZSA9IHRoaXMuc3RhdGVzLnJlYWQoQ2hhcnRWaWV3VG9vbFN0YXRlLFwiQ2hhcnRWaWV3VG9vbFN0YXRlXCIpO1xyXG4gICAgICAgIHRvb2xzdGF0ZS5zZWxlY3RlZFRvb2wgPSBDaGFydFZpZXdUb29sU3RhdGVFbnVtLkNVUlNPUlM7XHJcbiAgICAgICAgdGhpcy5zdGF0ZXMudXBkYXRlKHRoaXMsQ2hhcnRWaWV3VG9vbFN0YXRlLCB0b29sc3RhdGUsXCJDaGFydFZpZXdUb29sU3RhdGVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgc2lnbmFsIHRvIHRoZSBjdXJzb3IgaW5mbyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEJhc2VTZXJpZXM+fSBzZXJpZXNcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRTZXJpZXMoc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPil7XHJcbiAgICAgICAgbGV0IGN1cnNvclNpZ25hbHMgPSBuZXcgQXJyYXk8Q3Vyc29yU2lnbmFsPigpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VyaWVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYgKHNlcmllc1tpXS50eXBlID09PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMpIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvclNpZ25hbHMucHVzaChuZXcgWVRDdXJzb3JTaWduYWwoc2VyaWVzW2ldLCBmYWxzZSkpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlcmllc1tpXS50eXBlID09PSBTZXJpZXNUeXBlLnh5U2VyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JTaWduYWxzLnB1c2gobmV3IFhZQ3Vyc29yU2lnbmFsKHNlcmllc1tpXSwgZmFsc2UpKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzZXJpZXNbaV0udHlwZSA9PT0gU2VyaWVzVHlwZS5mZnRTZXJpZXMpIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvclNpZ25hbHMucHVzaChuZXcgRkZUQ3Vyc29yU2lnbmFsKHNlcmllc1tpXSwgZmFsc2UpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwuYWRkU2lnbmFsKGN1cnNvclNpZ25hbHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSBhIGN1cnNvciBzaWduYWwgZnJvbSB0aGUgY3Vyc29yIGluZm8gd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbW92ZVNlcmllKHNlcmllOiBCYXNlU2VyaWVzKXtcclxuICAgICAgICBpZih0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBjdXJzb3JTaWduYWwgPSB0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsLmdldEN1cnNvclNpZ25hbChzZXJpZSk7XHJcbiAgICAgICAgICAgIGlmKGN1cnNvclNpZ25hbCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsLnJlbW92ZVNlcmllKGN1cnNvclNpZ25hbCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIERpc2FibGVzIGZpbHRlciBidXR0b24gaWYgaXMgYWN0aXZlXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLl90b29sYmFyLmN1cnNvckluZm9TZWxlY3Rpb25Jc0FjdGl2ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5hY3RpdmF0ZUN1cnNvckluZm9TZWxlY3RvclZpZXcoIXRoaXMuX3Rvb2xiYXIuY3Vyc29ySW5mb1NlbGVjdGlvbklzQWN0aXZlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmVzIHRoZSBjdXJzb3Igc2lnbmFsIGZyb20gdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGxpc3QgYW5kIHVwZGF0ZXMgdGhlIHRvb2xiYXIgYnV0dG9uXHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLl9zZWxlY3RlZEN1cnNvclNpZ25hbHMuaW5kZXhPZihjdXJzb3JTaWduYWwpO1xyXG4gICAgICAgICAgICAgICAgaWYoaW5kZXggIT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkQ3Vyc29yU2lnbmFscy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ3Vyc29ySW5mb1NlbGVjdG9yQnV0dG9uU3RhdGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNoYW5nZXMgYW5kIHVwZGF0ZXMgdGhlIGN1cnNvciBsb2NhdGlvbiBvZiB0aGUgc2VsZWN0ZWQgY3Vyc29yXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1cnNvckluZGV4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3Vyc29yVGltZXN0YW1wXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlQ3Vyc29yTG9jYXRpb24oY3Vyc29ySW5kZXg6IG51bWJlciwgY3Vyc29yVGltZXN0YW1wOiBudW1iZXIpIHtcclxuXHJcbiAgICAgICAgdGhpcy5jdXJzb3JzU3RhdGVzLnNldFBvc2l0aW9uKGN1cnNvckluZGV4LCBjdXJzb3JUaW1lc3RhbXApO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ3Vyc29yU3RhdGVzKHRoaXMuY3Vyc29yc1N0YXRlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWZyZXNoZXMgdGhlIHRyZWUgZ3JpZHMgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWZyZXNoKCl7XHJcbiAgICAgICAgLy8gcmVmcmVzaCB0cmVlIGdyaWQgb25seSBpZiBjdXJzb3Igc2lnbmFsIHZpZXcgaXMgYWN0aXZlIChub3QgaW4gY2FzZSBvZiBjdXJzb3IgaW5mbyBzZWxlY3RvcilcclxuICAgICAgICBpZighdGhpcy5fY3Vyc29ySW5mb1NlbGVjdG9ySXNBY3RpdmUgJiYgdGhpcy5yZWZyZXNoRW5hYmxlZCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJzb3JTaWduYWxzID0gdGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbC5nZXRDdXJzb3JTaWduYWxzKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZURhdGFTb3VyY2UoY3Vyc29yU2lnbmFscyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHNldCB0aGUgc2VsZWN0aW9uIHRvIHRoZSBzZWxlY3Qgc2lnbmFsIGJlZm9yZVxyXG4gICAgICAgICAgICBsZXQgdHJlZUdyaWRPYmplY3Q6IGFueSA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25XaXRoQ3Vyc29yU2lnbmFscyh0cmVlR3JpZE9iamVjdCwgdGhpcy5fc2VsZWN0ZWRDdXJzb3JTaWduYWxzKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBjdXJzb3IgaW5mbyB2YWx1ZXMgXHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaEN1cnNvclN0YXRlcygpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyaWdnZXIgdGhlIHVwZGF0ZSBvZiB0aGUgY3Vyc29ySW5mb3MgZm9yIHRoZSBjdXJyZW50IGN1cnNvciBzdGF0ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWZyZXNoQ3Vyc29yU3RhdGVzKCl7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDdXJzb3JTdGF0ZXModGhpcy5jdXJzb3JzU3RhdGVzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZURhdGFTb3VyY2UoY3Vyc29yU2lnbmFsczogQXJyYXk8Q3Vyc29yU2lnbmFsPil7XHJcbiAgICAgICAgdGhpcy5zZXRDdXJzb3JWYWx1ZVVpSWRzKGN1cnNvclNpZ25hbHMpO1xyXG5cclxuICAgICAgICAvLyBSZWZyZXNoIFRyZWVHcmlkIHdpdGggbmV3IGRhdGFzb3VyY2VcclxuICAgICAgICB0aGlzLnNldE1vZGVsKGN1cnNvclNpZ25hbHMpO1xyXG5cclxuICAgICAgICAvLyBSZWZyZXNoIHRoZSBjdXJzb3IgdmFsdWVzIGFmdGVyIHVwZGF0aW5nIHRoZSBtb2RlbFxyXG4gICAgICAgIHRoaXMucmVmcmVzaEN1cnNvclZhbHVlcyhjdXJzb3JTaWduYWxzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgYW5kIHNldHMgdWlkcyBmb3IgZXZlcnkgY3Vyc29yIHZhbHVlIChjdXJzb3Igc2lnbmFscyBhbmQgY3Vyc29yIGluZm9zKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEN1cnNvclNpZ25hbD59IGN1cnNvclNpZ25hbHNcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0Q3Vyc29yVmFsdWVVaUlkcyhjdXJzb3JTaWduYWxzOiBBcnJheTxDdXJzb3JTaWduYWw+KSB7XHJcbiAgICAgICAgbGV0IGN1cnNvckluZm9JZCA9IDA7XHJcbiAgICAgICAgY3Vyc29yU2lnbmFscy5mb3JFYWNoKChjdXJzb3JTaWduYWwpPT57XHJcbiAgICAgICAgICAgICg8SVVpQmluZGluZz48YW55PmN1cnNvclNpZ25hbCkudWlJZCA9IGN1cnNvckluZm9JZCsrO1xyXG4gICAgICAgICAgICBjdXJzb3JTaWduYWwuY3Vyc29ySW5mb3MuZm9yRWFjaCgoY3Vyc29ySW5mbyk9PntcclxuICAgICAgICAgICAgICAgICAoPElVaUJpbmRpbmc+PGFueT5jdXJzb3JJbmZvKS51aUlkID0gY3Vyc29ySW5mb0lkKys7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWZyZXNoIGFsbCBjdXJzb3IgdmFsdWVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVmcmVzaEN1cnNvclZhbHVlcyhjdXJzb3JTaWduYWxzOiBDdXJzb3JTaWduYWxbXXx1bmRlZmluZWQgPSB1bmRlZmluZWQpIHsgICAgICAgICAgICAgICBcclxuICAgICAgICBpZihjdXJzb3JTaWduYWxzID09IHVuZGVmaW5lZCAmJiB0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGN1cnNvclNpZ25hbHMgPSB0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsLmdldEN1cnNvclNpZ25hbHMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoY3Vyc29yU2lnbmFscyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjdXJzb3JTaWduYWxzLmZvckVhY2goKGN1cnNvclNpZ25hbCk9PnsgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDdXJzb3JWYWx1ZUZpZWxkKGN1cnNvclNpZ25hbCk7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JTaWduYWwuY3Vyc29ySW5mb3MuZm9yRWFjaCgoY3Vyc29ySW5mbyk9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDdXJzb3JWYWx1ZUZpZWxkKGN1cnNvckluZm8pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlcyBhIGN1cnNvciB2YWx1ZSBmaWVsZCB3aXRoIHRoZSBjdXJyZW50IHZhbHVlcyBvZiB0aGUgY29ycmVzcG9uZGlnIGN1cnNvciBzaWduYWwgb3IgaW5mb1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclNpZ25hbHxDdXJzb3JJbmZvfSBjdXJzb3JTaWduYWxPckluZm9cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVmcmVzaEN1cnNvclZhbHVlRmllbGQoY3Vyc29yU2lnbmFsT3JJbmZvOiBDdXJzb3JTaWduYWx8Q3Vyc29ySW5mbykge1xyXG4gICAgICAgIGlmIChjdXJzb3JTaWduYWxPckluZm8pIHtcclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBjb3JyZXNwb25kaW5nIHVpIGVsZW1lbnRcclxuICAgICAgICAgICAgbGV0IGN1cnNvclZhbHVlRWxlbWVudCA9IHRoaXMuZ2V0Q3Vyc29yVmFsdWVFbGVtZW50KGN1cnNvclNpZ25hbE9ySW5mbyk7XHJcbiAgICAgICAgICAgIGlmIChjdXJzb3JWYWx1ZUVsZW1lbnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWVTdHJpbmc6IHN0cmluZyA9IGN1cnNvclNpZ25hbE9ySW5mby52YWx1ZS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvclZhbHVlRWxlbWVudC5pbm5lclRleHQgPSB2YWx1ZVN0cmluZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGNvcnJlc3BvbmRpbmcgY3Vyc29yIHNpZ25hbCBvciBpbmZvIGVsZW1lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JTaWduYWx8Q3Vyc29ySW5mb30gY3Vyc29yU2lnbmFsT3JJbmZvXHJcbiAgICAgKiBAcmV0dXJucyB7KEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0Q3Vyc29yVmFsdWVFbGVtZW50KGN1cnNvclNpZ25hbE9ySW5mbzogQ3Vyc29yU2lnbmFsfEN1cnNvckluZm8pOiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgdmFyIG15U3ViRGl2ID0gdGhpcy5tYWluRGl2LnF1ZXJ5U2VsZWN0b3IoXCIjXCIgKyB0aGlzLm1haW5EaXZJZCArIENVUlNPUl9WQUxVRV9JRCArICg8SVVpQmluZGluZz48YW55PmN1cnNvclNpZ25hbE9ySW5mbykudWlJZCk7XHJcbiAgICAgICAgaWYobXlTdWJEaXYgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiA8SFRNTERpdkVsZW1lbnQ+bXlTdWJEaXY7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkN1cnNvclNpZ25hbHNEYXRhTW9kZWxDaGFuZ2VkKHNlbmRlciwgYXJncyl7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgdGhpcy5zYXZlVHJlZUdyaWRTZXR0aW5ncygpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kIHdpbGwgdXBkYXRlIHRoZSBjdXJzb3IgaW5mbyB3aWRnZXQgd2l0aCBkYXRhIGZyb21cclxuICAgICAqIHRoZSBjdXJzb3Igc3RhdGUuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yU3RhdGVzfSBtb2RpZmllZFN0YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUluZm9DdXJzb3JzV2l0aE5ld1N0YXRlVmFsdWVzIChtb2RpZmllZFN0YXRlOiBDdXJzb3JTdGF0ZXMpIHtcclxuICAgICAgICBpZih0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwudXBkYXRlSW5mb0N1cnNvcnNXaXRoTmV3Q3Vyc29yU3RhdGVWYWx1ZXMobW9kaWZpZWRTdGF0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl90b29sYmFyLnVwZGF0ZUJ1dHRvblN0YXRlcyhtb2RpZmllZFN0YXRlKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQ3Vyc29yVmFsdWVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0IGN1c3RvbSBjaGVjayBib3hlcyBpbnRvIHN5bmNmdXNpb24gY2hlY2sgYm94ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVDaGVja0JveGVzKCkge1xyXG4gICAgICAgIHZhciBjaGVja0JveGVzID0gJCgnLmN1c3RvbUNoZWNrYm94Jyk7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGNoZWNrQm94ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY2hlY2tCb3hlc1tpXS5pZCA9ICdjdXN0b21DaGVja2JveCcgKyAoaSArIDEpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0U3luY2Z1c2lvbkNoZWNrYm94KGNoZWNrQm94ZXNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluc3RhbnRpYXRlIHN5bmNmdXNpb24gY2hlY2sgYm94XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGN1c3RvbUNoZWNrYm94XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0U3luY2Z1c2lvbkNoZWNrYm94KGN1c3RvbUNoZWNrYm94OiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIHZhciBlbmFibGVUcmlTdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuZ2V0Q3VzdG9tQ2hlY2tib3hTdGF0ZSgkKGN1c3RvbUNoZWNrYm94KSk7XHJcbiAgICAgICAgaWYgKHN0YXRlID09PSAnaW5kZXRlcm1pbmF0ZScpIHsgZW5hYmxlVHJpU3RhdGUgPSB0cnVlOyB9XHJcbiAgICAgICAgJChjdXN0b21DaGVja2JveCkuZWpDaGVja0JveChcclxuICAgICAgICAgICAgeyAgXHJcbiAgICAgICAgICAgIGVuYWJsZVRyaVN0YXRlOiBlbmFibGVUcmlTdGF0ZSxcclxuICAgICAgICAgICAgaWQ6IGN1c3RvbUNoZWNrYm94LmlkLFxyXG4gICAgICAgICAgICBjaGVja1N0YXRlOiBzdGF0ZSxcclxuICAgICAgICAgICAgY2hhbmdlOiAoYXJncykgPT4gdGhpcy5zeW5jZnVzaW9uQ2hlY2tCb3hDaGFuZ2VkKGFyZ3MpLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyaWdnZXIgY2hlY2sgYm94IGNoYW5nZSBldmVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3luY2Z1c2lvbkNoZWNrQm94Q2hhbmdlZChhcmdzKSB7XHJcbiAgICAgICAgaWYgKGFyZ3MubW9kZWwuZW5hYmxlVHJpU3RhdGUpIHtcclxuICAgICAgICAgICAgJCgnIycgKyBhcmdzLm1vZGVsLmlkKS5lakNoZWNrQm94KHtlbmFibGVUcmlTdGF0ZTogZmFsc2V9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RlZEN1cnNvcnNJbmZvKGFyZ3MpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBjdXN0b21DaGVja2JveCA9ICQoJyMnICsgYXJncy5tb2RlbC5pZCk7XHJcbiAgICAgICAgY3VzdG9tQ2hlY2tib3guY2hhbmdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgc2VsZWN0ZWQgY3Vyc29yIGluZm8gd2hlbiBjaGVja2JveCBpcyBjbGlja2VkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBzZXRTZWxlY3RlZEN1cnNvcnNJbmZvKGFyZ3Mpe1xyXG4gICAgICAgIHZhciB0cmVlZ3JpZDogYW55ID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG4gICAgICAgIHZhciBpbmRleCA9IHBhcnNlSW50KGFyZ3MubW9kZWwuaWQuc3BsaXQoJ2N1c3RvbUNoZWNrYm94JylbMV0sIDEwKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmZvc09sZCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmZvc09sZCA9IHRyZWVncmlkLm1vZGVsLmZsYXRSZWNvcmRzW2luZGV4XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkQ3Vyc29ySW5mb3NPbGQgPSB0aGlzLl9zZWxlY3RlZEN1cnNvckluZm9zTmV3O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9zZWxlY3RlZEN1cnNvckluZm9zTmV3ID0gdHJlZWdyaWQubW9kZWwuZmxhdFJlY29yZHNbaW5kZXhdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0IHN0YXRlIG9mIGNoZWNrYm94XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SlF1ZXJ5PEhUTUxFbGVtZW50Pn0gY2hlY2tib3hcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEN1c3RvbUNoZWNrYm94U3RhdGUoY2hlY2tib3g6IEpRdWVyeTxIVE1MRWxlbWVudD4pOiBzdHJpbmcge1xyXG4gICAgICAgIGlmIChjaGVja2JveC5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ2NoZWNrJztcclxuICAgICAgICB9IGVsc2UgaWYgKGNoZWNrYm94LmlzKCc6aW5kZXRlcm1pbmF0ZScpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnaW5kZXRlcm1pbmF0ZSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gJ3VuY2hlY2snO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaGVzIHRoZSBjaGFydCBtYW5hZ2VyIGRhdGFtb2RlbCBldmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhdHRhY2hDaGFydE1hbmFnZXJEYXRhTW9kZWxFdmVudHMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwuZXZlbnRNb2RlbENoYW5nZWQuYXR0YWNoKHRoaXMuX2NoYXJ0TWFuYWdlck1vZGVsQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGFjaGVzIHRoZSBjaGFydCBtYW5hZ2VyIGRhdGFtb2RlbCBldmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZXRhY2hDaGFydE1hbmFnZXJEYXRhTW9kZWxFdmVudHMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwuZXZlbnRNb2RlbENoYW5nZWQuZGV0YWNoKHRoaXMuX2NoYXJ0TWFuYWdlck1vZGVsQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNoYXJ0TWFuYWdlck1vZGVsIGhhcyBjaGFuZ2VkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25DaGFydE1hbmFnZXJNb2RlbENoYW5nZWQoc2VuZGVyLCBhcmdzKSB7XHJcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBjdXJzb3IgaW5mbyB3aWRnZXRcclxuICAgICAgICBpZiAoYXJncy5oaW50ID09IENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LmFkZFNlcmllICYmIGFyZ3MuZGF0YS5zZXJpZXMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkU2VyaWVzKGFyZ3MuZGF0YS5zZXJpZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhcmdzLmhpbnQgPT0gQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQucmVtb3ZlU2VyaWUpIHtcclxuICAgICAgICAgICAgaWYgKGFyZ3MuZGF0YS5zaWduYWxVc2VkSW5PdGhlckNoYXJ0cyA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVTZXJpZShhcmdzLmRhdGEuc2VyaWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBDdXJzb3JJbmZvV2lkZ2V0IH07Il19