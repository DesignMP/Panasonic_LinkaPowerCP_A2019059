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
define(["require", "exports", "../common/treeGridWidgetBase", "./view/traceConfigTriggerTreeGridToolbar", "./view/traceConfigTriggerTreeGridCellEditTemplate", "./view/traceConfigTriggerTreeGridCellEditEvents", "../../view/datapointDialog/datapointDialog", "./model/traceConfigTriggerDataModel", "./triggerDescriptionProvider", "./componentDefaultDefinition"], function (require, exports, treeGridWidgetBase_1, traceConfigTriggerTreeGridToolbar_1, traceConfigTriggerTreeGridCellEditTemplate_1, traceConfigTriggerTreeGridCellEditEvents_1, datapointDialog_1, traceConfigTriggerDataModel_1, triggerDescriptionProvider_1, componentDefaultDefinition_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the TraceConfigTriggerWidget
     *
     * @class TraceConfigTriggerWidget
     * @extends {TreeGridWidgetBase}
     */
    var TraceConfigTriggerWidget = /** @class */ (function (_super) {
        __extends(TraceConfigTriggerWidget, _super);
        function TraceConfigTriggerWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._addDataPointHandler = function (sender, args) { return _this.onAddDatapoint(sender, args); };
            _this._dialogClosedHandler = function (sender, args) { return _this.onDialogClosed(sender, args); };
            _this._availableTraceDataPoints = new Array();
            _this._actualTriggerConditionDescriptionId = 0;
            _this._dropDownListSelectionChangedHandler = function (sender, args) { return _this.onDropDownListSelectionChanged(sender, args); };
            return _this;
        }
        /**
         * Defines the height of the header
         *
         * @returns {number}
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.defineHeaderHeight = function () {
            return 30;
        };
        /**
         * Defines the height of the footer
         *
         * @returns {number}
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.defineFooterHeight = function () {
            return 290;
        };
        TraceConfigTriggerWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        TraceConfigTriggerWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            _super.prototype.setHeaderContent.call(this, "Trigger");
            this.updateFooterContent(0);
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 1, 80);
        };
        /**
         * Updates and initializes the trace data points
         *
         * @private
         * @param {TraceDataPoint[]} traceDataPoints
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.initializeAvailableDataPoints = function (availableTraceDataPoints) {
            this._availableTraceDataPoints = availableTraceDataPoints;
            datapointDialog_1.DatapointDialog.setDatapoints(this._availableTraceDataPoints);
        };
        /**
         * Updates and initializes the start triggers
         *
         * @private
         * @param {TraceStartTrigger[]} startTriggers
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.initializeTraceStartTriggerInfo = function (startTriggerInfo) {
            var traceConfigTriggerDataModel = new traceConfigTriggerDataModel_1.TraceConfigTriggerDataModel();
            traceConfigTriggerDataModel.initialize();
            this.dataModel = traceConfigTriggerDataModel;
            traceConfigTriggerDataModel.initData = startTriggerInfo;
        };
        TraceConfigTriggerWidget.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            if (this._cellEditTemplate != undefined) {
                this._cellEditTemplate.eventSelectionChanged.detach(this._dropDownListSelectionChangedHandler);
            }
        };
        /** updates the footer content with the trigger description
         *
         * @param {number} triggerConditionId (e.g. 20 for IN_WINDOW; 30 for OUT_WINDOW; ...)
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.updateFooterContent = function (triggerConditionId) {
            if (this._actualTriggerConditionDescriptionId != triggerConditionId) {
                this._actualTriggerConditionDescriptionId = triggerConditionId;
                var htmlData = triggerDescriptionProvider_1.TriggerDescriptionProvider.getHtmlDescription(triggerConditionId);
                _super.prototype.setFooterContent.call(this, htmlData);
            }
        };
        /**
         * implements the model change handling
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} data
         * @returns {*}
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.handleModelChanged = function (sender, eventArgs) {
            this.refresh();
            // Set correct footer content 
            var treeGridObj = this.getTreeGridObject();
            var actualSelectedItem = treeGridObj.model.selectedItem;
            if (actualSelectedItem == undefined) {
                // get trigger condition of first trigger
                var conditionParameter = "StartTrigger1_Condition";
                var triggerConditionValue = this.getTriggerConditionValue(treeGridObj.model.dataSource, conditionParameter);
                this.updateFooterContent(triggerConditionValue);
            }
            else {
                this.updateFooterContentToSelectedItem(actualSelectedItem);
            }
        };
        TraceConfigTriggerWidget.prototype.updateFooterContentToSelectedItem = function (selectedItem) {
            var startTriggerGroup;
            if (selectedItem.level == 0) {
                // Rootnode selected
                startTriggerGroup = selectedItem;
            }
            else {
                // Parameter selected
                startTriggerGroup = selectedItem.parentItem;
            }
            if (startTriggerGroup != undefined) {
                // TODO: remove/change _startTriggerRef
                var triggerConditionValue = startTriggerGroup._startTriggerRef.condition;
                this.updateFooterContent(parseInt(triggerConditionValue, 10));
            }
        };
        /**
         * handles the changes of observed items requested by 'observeDataModelItems'
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} data
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.handleModelItemsChanged = function (sender, eventArgs) {
            this.refresh();
        };
        /** creates the datapoint selection dialog
         *
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.createDatapointsDialog = function () {
            var datapointDialogId = "datapointDialogTrigger";
            $(this.mainDiv).append("<div id='" + datapointDialogId + "'></>");
            datapointDialog_1.DatapointDialog.initialize(datapointDialogId);
        };
        /** catches the add datapoint event from the datapoint dialog
         * => sets the selected datapoint to the actual selected trigger and closes the datapoint dialog
         *
         * @param {} sender
         * @param {EventDatapointArgs} args
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.onAddDatapoint = function (sender, args) {
            this.setDatapointNameToSelectedTrigger(args.dataPointInfo.fullname);
            datapointDialog_1.DatapointDialog.close();
        };
        /** catches the dialog close event from the datapoint dialog
         * => detaches the dialog events
         *
         * @param {} sender
         * @param {} args
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.onDialogClosed = function (sender, args) {
            datapointDialog_1.DatapointDialog.eventAddDatapoint.detach(this._addDataPointHandler);
            datapointDialog_1.DatapointDialog.eventDialogClosed.detach(this._dialogClosedHandler);
        };
        /** catches the dialog close event from the datapoint dialog
         * => detaches the dialog events
         *
         * @param {string} dataPointName
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.setDatapointNameToSelectedTrigger = function (dataPointName) {
            var treeGridObj = this.getTreeGridObject();
            var startTriggerItem;
            var actualSelectedItem = treeGridObj.model.selectedItem;
            if (actualSelectedItem != undefined) {
                if (actualSelectedItem.level == 0) {
                    startTriggerItem = actualSelectedItem;
                }
                else {
                    startTriggerItem = actualSelectedItem.parentItem;
                }
            }
            else {
                console.log("No start trigger selected!");
            }
            // Save cell bevor updating the datamodel to see the right data after update
            treeGridObj.saveCell();
            var dataPointNameParameter = startTriggerItem.item.childs.filter(function (triggerParameter) { return triggerParameter.id == "datapoint"; })[0];
            if (dataPointNameParameter != undefined) {
                dataPointNameParameter.displayValue = dataPointName;
                this.refresh();
                startTriggerItem.setValue(dataPointNameParameter, dataPointName);
            }
        };
        /** creates the tree grid for the trigger informations
         *
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.createTreeGrid = function () {
            var _this = this;
            this.createDatapointsDialog();
            $(this.mainDiv).ejTreeGrid(__assign(__assign(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), this.getTreeGridToolbarSupport()), this.getTreeGridCellEditSupport()), { childMapping: "childs", expandStateMapping: "expandState", expanded: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, collapsed: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, rowSelected: function (args) { return _this.treeGridRowSelected(args); }, create: function (args) { return _this.treeGridCreated(); }, actionBegin: function (args) { return _this.treeGridActionBegin(args); }, actionComplete: function (args) { return _this.treeGridActionComplete(args); } }));
        };
        TraceConfigTriggerWidget.prototype.treeGridNodeExpandedOrCollapsed = function () {
            // Refresh to see correct expanded/collapsed icon
            this.refresh();
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.getTreeGridColumnDefinition = function () {
            this._cellEditTemplate = traceConfigTriggerTreeGridCellEditTemplate_1.TraceConfigTriggerTreeGridCellEditTemplate.createInstance();
            this._cellEditTemplate.eventSelectionChanged.attach(this._dropDownListSelectionChangedHandler);
            return {
                columns: [
                    { field: "displayName", headerText: "Name", width: "200" },
                    { field: "displayValue", headerText: "Value", width: "200", editType: "stringedit", editTemplate: this._cellEditTemplate }
                ],
            };
        };
        /**
         * Returns the tree grid column resize settings
         *
         * @private
         * @returns {{}}
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.getTreeGridColumnResizeSupport = function () {
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
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.getTreeGridToolbarSupport = function () {
            var _this = this;
            this._toolbar = new traceConfigTriggerTreeGridToolbar_1.TraceConfigTriggerTreeGridToolbar(this.mainDiv);
            return {
                toolbarSettings: {
                    showToolbar: true,
                    customToolbarItems: this._toolbar.getCustomToolbars(),
                },
                toolbarClick: function (args) { return _this.toolbarClick(args); },
            };
        };
        /**
         * Returns the tree grid cell edit settings
         *
         * @private
         * @returns {{}}
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.getTreeGridCellEditSupport = function () {
            var cellEditEvents = new traceConfigTriggerTreeGridCellEditEvents_1.TraceConfigTriggerTreeGridCellEditEvents();
            return {
                editSettings: { allowEditing: true },
                beginEdit: function (args) { return cellEditEvents.beginEdit(args); },
                endEdit: function (args) { return cellEditEvents.endEdit(args); },
            };
        };
        TraceConfigTriggerWidget.prototype.treeGridCreated = function () {
            // Sets the custom toolbar icons
            this._toolbar.setStyleForToolbarIcons();
        };
        TraceConfigTriggerWidget.prototype.treeGridActionBegin = function (args) {
            // Support "Entf/Del" key
            if (args.requestType == "delete") {
                this.deleteStartTriggers(args.deletedItems);
                args.cancel = true;
            }
        };
        TraceConfigTriggerWidget.prototype.treeGridActionComplete = function (args) {
            // Event trigger while changing datasource dynamically. 
            // code to done after the dynamic change of datasource. 
            if (args.requestType === 'refreshDataSource') {
                this.refreshSelection();
            }
        };
        TraceConfigTriggerWidget.prototype.treeGridRowSelected = function (args) {
            if (args.model.selectedItem != undefined) {
                this.updateFooterContentToSelectedItem(args.model.selectedItem);
                this.updateToolbarButtonStates(args.model.dataSource, args.model.selectedItem);
            }
        };
        TraceConfigTriggerWidget.prototype.addStartTrigger = function () {
            this.dataModel.addTrigger();
            this.refreshSelection();
            // Get actual selection item
            var treeObj = $(this.mainDiv).ejTreeGrid('instance');
            var selectedItem = treeObj.model.selectedItem;
            if (treeObj.model.selectedRowIndex == -1) {
                selectedItem = undefined;
            }
            this.updateToolbarButtonStates(treeObj.model.dataSource, selectedItem);
        };
        TraceConfigTriggerWidget.prototype.deleteStartTriggers = function (deleteItems) {
            var indexList = new Array();
            for (var i = deleteItems.length - 1; i >= 0; i--) {
                if (deleteItems[i].level == 0) {
                    // Only level 0 can be deleted (start trigger group, not single parameters of this group)
                    indexList.push(deleteItems[i].hierarchyRowIndex);
                }
            }
            if (indexList.length > 0) {
                this.dataModel.removeTriggers(indexList);
                this.refreshSelection();
                // Get actual selection item
                var treeObj = $(this.mainDiv).ejTreeGrid('instance');
                var selectedItem = treeObj.model.selectedItem;
                if (treeObj.model.selectedRowIndex == -1) {
                    selectedItem = undefined;
                }
                this.updateToolbarButtonStates(treeObj.model.dataSource, selectedItem);
            }
        };
        /**
         * opens the datapoint selection dialog and attaches to the dialog events
         *
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.openDatapointDialog = function () {
            datapointDialog_1.DatapointDialog.eventAddDatapoint.attach(this._addDataPointHandler);
            datapointDialog_1.DatapointDialog.eventDialogClosed.attach(this._dialogClosedHandler);
            datapointDialog_1.DatapointDialog.open(TraceConfigTriggerWidget.selectDataPointDialogTitle, datapointDialog_1.FooterContentType.applyClose);
        };
        TraceConfigTriggerWidget.prototype.refreshSelection = function () {
            var treeObj = $(this.mainDiv).ejTreeGrid('instance');
            // Get actual selection index
            var actualSelectedRowIndex = treeObj.model.selectedRowIndex;
            if (actualSelectedRowIndex == -1) {
                // update toolbar buttons in case of no selected item
                this.updateToolbarButtonStates(treeObj.model.dataSource, undefined);
                return;
            }
            // Reset selection
            treeObj.model.selectedRowIndex = -1;
            // Set to last index if index is out of range
            if (actualSelectedRowIndex >= treeObj.model.flatRecords.length) {
                actualSelectedRowIndex = treeObj.model.flatRecords.length - 1;
            }
            // Set selection
            treeObj.model.selectedRowIndex = actualSelectedRowIndex;
            // update toolbar buttons with selected item
            if (treeObj.model.flatRecords[actualSelectedRowIndex] != undefined) {
                this.updateToolbarButtonStates(treeObj.model.dataSource, treeObj.model.flatRecords[actualSelectedRowIndex].item);
            }
        };
        /**
         * Returns the trigger condition(e.g. 20 for IN_WINDOW; 30 for OUT_WINDOW; ...) for the given condition parameter id (e.g. StartTrigger1_Condition)
         *
         * @param {} dataSource
         * @param {string} conditionParameter
         * @returns {number}
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.getTriggerConditionValue = function (dataSource, conditionParameter) {
            for (var i = 0; i < dataSource.length; i++) {
                var startTrigger = dataSource[i];
                for (var j = 0; j < startTrigger.childs.length; j++) {
                    var parameter = startTrigger.childs[j];
                    if (parameter.componentParameter.browseName == conditionParameter) {
                        return parseInt(parameter.componentParameter.value, 10);
                    }
                }
            }
            return 0;
        };
        /**
         * Refreshes trigger parameters tree grid with the current model data
         *
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.refresh = function () {
            if (this.refreshEnabled) {
                this.setModel(this.dataModel.data);
            }
        };
        TraceConfigTriggerWidget.prototype.onDropDownListSelectionChanged = function (sender, args) {
            this.updateFooterContent(args.value);
        };
        TraceConfigTriggerWidget.prototype.updateToolbarButtonStates = function (startTriggers, selectedItem) {
            // Set select trigger datapoint button state
            if (selectedItem == undefined) {
                this._toolbar.disableSelectTriggerDataPointButton(true);
            }
            else {
                this._toolbar.disableSelectTriggerDataPointButton(false);
            }
            // Set add trigger button state
            if (startTriggers.length > 1) {
                this._toolbar.disableAddButton(true);
            }
            else {
                this._toolbar.disableAddButton(false);
            }
            // Set remove trigger button state
            if (startTriggers.length == 0 || selectedItem == undefined || selectedItem.level > 0) {
                this._toolbar.disableRemoveButton(true);
            }
            else {
                this._toolbar.disableRemoveButton(false);
            }
        };
        TraceConfigTriggerWidget.selectDataPointDialogTitle = "Select data point";
        return TraceConfigTriggerWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.TraceConfigTriggerWidget = TraceConfigTriggerWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29uZmlnVHJpZ2dlcldpZGdldC90cmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZUE7Ozs7O09BS0c7SUFDSDtRQUF1Qyw0Q0FBa0I7UUFBekQ7WUFBQSxxRUFrZUM7WUFoZVcsMEJBQW9CLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQWhDLENBQWdDLENBQUM7WUFDdkUsMEJBQW9CLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQWhDLENBQWdDLENBQUM7WUFFdkUsK0JBQXlCLEdBQXlCLElBQUksS0FBSyxFQUFzQixDQUFDO1lBSWxGLDBDQUFvQyxHQUFHLENBQUMsQ0FBQztZQUl6QywwQ0FBb0MsR0FBRyxVQUFDLE1BQU0sRUFBQyxJQUFJLElBQUcsT0FBQSxLQUFJLENBQUMsOEJBQThCLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxFQUFoRCxDQUFnRCxDQUFDOztRQXFkbkgsQ0FBQztRQW5kRzs7Ozs7V0FLRztRQUNILHFEQUFrQixHQUFsQjtZQUNJLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gscURBQWtCLEdBQWxCO1lBQ0ksT0FBTyxHQUFHLENBQUM7UUFDZixDQUFDO1FBRUQsc0RBQW1CLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLHVEQUEwQixFQUFFLENBQUMsQ0FBQztZQUN0RSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFp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bW1vbi90cmVlR3JpZFdpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgSURhdGFNb2RlbCwgRXZlbnRNb2RlbENoYW5nZWRBcmdzfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUcmFjZUNvbmZpZ1RyaWdnZXJUcmVlR3JpZFRvb2xiYXIgfSBmcm9tIFwiLi92aWV3L3RyYWNlQ29uZmlnVHJpZ2dlclRyZWVHcmlkVG9vbGJhclwiO1xyXG5pbXBvcnQgeyBUcmFjZUNvbmZpZ1RyaWdnZXJUcmVlR3JpZENlbGxFZGl0VGVtcGxhdGUgfSBmcm9tIFwiLi92aWV3L3RyYWNlQ29uZmlnVHJpZ2dlclRyZWVHcmlkQ2VsbEVkaXRUZW1wbGF0ZVwiO1xyXG5pbXBvcnQgeyBUcmFjZUNvbmZpZ1RyaWdnZXJUcmVlR3JpZENlbGxFZGl0RXZlbnRzIH0gZnJvbSBcIi4vdmlldy90cmFjZUNvbmZpZ1RyaWdnZXJUcmVlR3JpZENlbGxFZGl0RXZlbnRzXCI7XHJcbmltcG9ydCB7IERhdGFwb2ludERpYWxvZywgRm9vdGVyQ29udGVudFR5cGUgfSBmcm9tIFwiLi4vLi4vdmlldy9kYXRhcG9pbnREaWFsb2cvZGF0YXBvaW50RGlhbG9nXCI7XHJcbmltcG9ydCB7IEV2ZW50RGF0YXBvaW50QXJncyB9IGZyb20gXCIuLi8uLi92aWV3L2RhdGFwb2ludERpYWxvZy9ldmVudERhdGFwb2ludEFyZ3NcIjtcclxuaW1wb3J0IHsgVHJhY2VEYXRhUG9pbnRJbmZvIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS90cmFjZURhdGFQb2ludEluZm9cIjtcclxuaW1wb3J0IHsgVHJhY2VDb25maWdUcmlnZ2VyRGF0YU1vZGVsIH0gZnJvbSBcIi4vbW9kZWwvdHJhY2VDb25maWdUcmlnZ2VyRGF0YU1vZGVsXCI7XHJcbmltcG9ydCB7IElUcmFjZUNvbmZpZ1RyaWdnZXJEYXRhTW9kZWwgfSBmcm9tIFwiLi9tb2RlbC90cmFjZUNvbmZpZ1RyaWdnZXJEYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHJpZ2dlckRlc2NyaXB0aW9uUHJvdmlkZXIgfSBmcm9tIFwiLi90cmlnZ2VyRGVzY3JpcHRpb25Qcm92aWRlclwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiB9IGZyb20gXCIuL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IFRyYWNlU3RhcnRUcmlnZ2VyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS90cmFjZVN0YXJ0VHJpZ2dlclwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0XHJcbiAqXHJcbiAqIEBjbGFzcyBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcclxuICogQGV4dGVuZHMge1RyZWVHcmlkV2lkZ2V0QmFzZX1cclxuICovXHJcbmNsYXNzIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldCBleHRlbmRzIFRyZWVHcmlkV2lkZ2V0QmFzZXtcclxuXHJcbiAgICBwcml2YXRlIF9hZGREYXRhUG9pbnRIYW5kbGVyID0gKHNlbmRlcixhcmdzKT0+dGhpcy5vbkFkZERhdGFwb2ludChzZW5kZXIsYXJncyk7XHJcbiAgICBwcml2YXRlIF9kaWFsb2dDbG9zZWRIYW5kbGVyID0gKHNlbmRlcixhcmdzKT0+dGhpcy5vbkRpYWxvZ0Nsb3NlZChzZW5kZXIsYXJncyk7XHJcblxyXG4gICAgcHJpdmF0ZSBfYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzOiBUcmFjZURhdGFQb2ludEluZm9bXSA9IG5ldyBBcnJheTxUcmFjZURhdGFQb2ludEluZm8+KCk7XHJcblxyXG4gICAgcHJvdGVjdGVkIF90b29sYmFyITogVHJhY2VDb25maWdUcmlnZ2VyVHJlZUdyaWRUb29sYmFyO1xyXG4gICAgcHJpdmF0ZSBfY2VsbEVkaXRUZW1wbGF0ZTtcclxuICAgIHByaXZhdGUgX2FjdHVhbFRyaWdnZXJDb25kaXRpb25EZXNjcmlwdGlvbklkID0gMDtcclxuXHJcbiAgICBzdGF0aWMgc2VsZWN0RGF0YVBvaW50RGlhbG9nVGl0bGUgPSBcIlNlbGVjdCBkYXRhIHBvaW50XCI7XHJcblxyXG4gICAgcHJpdmF0ZSBfZHJvcERvd25MaXN0U2VsZWN0aW9uQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpPT50aGlzLm9uRHJvcERvd25MaXN0U2VsZWN0aW9uQ2hhbmdlZChzZW5kZXIsYXJncyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHRoZSBoZWlnaHQgb2YgdGhlIGhlYWRlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGRlZmluZUhlYWRlckhlaWdodCgpOiBudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIDMwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB0aGUgaGVpZ2h0IG9mIHRoZSBmb290ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBkZWZpbmVGb290ZXJIZWlnaHQoKTogbnVtYmVye1xyXG4gICAgICAgIHJldHVybiAyOTA7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldERlZmF1bHREZWZpbml0aW9uKG5ldyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbigpKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVkKCl7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZWQoKTtcclxuXHJcbiAgICAgICAgc3VwZXIuc2V0SGVhZGVyQ29udGVudChcIlRyaWdnZXJcIik7XHJcbiAgICAgICAgdGhpcy51cGRhdGVGb290ZXJDb250ZW50KDApO1xyXG5cclxuICAgICAgICAvLyBTZXQgZHluYW1pYyBjb2x1bW4gc2V0dGluZ3NcclxuICAgICAgICBzdXBlci5zZXREeW5hbWljQ29sdW1uKDEsIDgwKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIGFuZCBpbml0aWFsaXplcyB0aGUgdHJhY2UgZGF0YSBwb2ludHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtUcmFjZURhdGFQb2ludFtdfSB0cmFjZURhdGFQb2ludHNcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplQXZhaWxhYmxlRGF0YVBvaW50cyhhdmFpbGFibGVUcmFjZURhdGFQb2ludHM6VHJhY2VEYXRhUG9pbnRJbmZvW10pe1xyXG4gICAgICAgIHRoaXMuX2F2YWlsYWJsZVRyYWNlRGF0YVBvaW50cyA9IGF2YWlsYWJsZVRyYWNlRGF0YVBvaW50cztcclxuICAgICAgICBEYXRhcG9pbnREaWFsb2cuc2V0RGF0YXBvaW50cyh0aGlzLl9hdmFpbGFibGVUcmFjZURhdGFQb2ludHMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgYW5kIGluaXRpYWxpemVzIHRoZSBzdGFydCB0cmlnZ2Vyc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1RyYWNlU3RhcnRUcmlnZ2VyW119IHN0YXJ0VHJpZ2dlcnNcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplVHJhY2VTdGFydFRyaWdnZXJJbmZvKHN0YXJ0VHJpZ2dlckluZm86IHsgZGF0YTpUcmFjZVN0YXJ0VHJpZ2dlcltdICwgaW5mbzpNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSl7XHJcbiAgICAgICAgbGV0IHRyYWNlQ29uZmlnVHJpZ2dlckRhdGFNb2RlbCA9IG5ldyBUcmFjZUNvbmZpZ1RyaWdnZXJEYXRhTW9kZWwoKSBhcyBJVHJhY2VDb25maWdUcmlnZ2VyRGF0YU1vZGVsO1xyXG4gICAgICAgIHRyYWNlQ29uZmlnVHJpZ2dlckRhdGFNb2RlbC5pbml0aWFsaXplKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhTW9kZWwgPSB0cmFjZUNvbmZpZ1RyaWdnZXJEYXRhTW9kZWw7XHJcbiAgICAgICAgdHJhY2VDb25maWdUcmlnZ2VyRGF0YU1vZGVsLmluaXREYXRhID0gc3RhcnRUcmlnZ2VySW5mbztcclxuICAgIH1cclxuXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgIGlmKHRoaXMuX2NlbGxFZGl0VGVtcGxhdGUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fY2VsbEVkaXRUZW1wbGF0ZS5ldmVudFNlbGVjdGlvbkNoYW5nZWQuZGV0YWNoKHRoaXMuX2Ryb3BEb3duTGlzdFNlbGVjdGlvbkNoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKiB1cGRhdGVzIHRoZSBmb290ZXIgY29udGVudCB3aXRoIHRoZSB0cmlnZ2VyIGRlc2NyaXB0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRyaWdnZXJDb25kaXRpb25JZCAoZS5nLiAyMCBmb3IgSU5fV0lORE9XOyAzMCBmb3IgT1VUX1dJTkRPVzsgLi4uKVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlRm9vdGVyQ29udGVudCh0cmlnZ2VyQ29uZGl0aW9uSWQ6IG51bWJlcil7XHJcbiAgICAgICAgaWYodGhpcy5fYWN0dWFsVHJpZ2dlckNvbmRpdGlvbkRlc2NyaXB0aW9uSWQgIT0gdHJpZ2dlckNvbmRpdGlvbklkKXtcclxuICAgICAgICAgICAgdGhpcy5fYWN0dWFsVHJpZ2dlckNvbmRpdGlvbkRlc2NyaXB0aW9uSWQgPSB0cmlnZ2VyQ29uZGl0aW9uSWQ7XHJcbiAgICAgICAgICAgIGxldCBodG1sRGF0YSA9IFRyaWdnZXJEZXNjcmlwdGlvblByb3ZpZGVyLmdldEh0bWxEZXNjcmlwdGlvbih0cmlnZ2VyQ29uZGl0aW9uSWQpO1xyXG4gICAgICAgICAgICBzdXBlci5zZXRGb290ZXJDb250ZW50KGh0bWxEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAgICAgXHJcbiAgICAvKipcclxuICAgICAqIGltcGxlbWVudHMgdGhlIG1vZGVsIGNoYW5nZSBoYW5kbGluZ1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SURhdGFNb2RlbH0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50TW9kZWxDaGFuZ2VkQXJnc30gZGF0YVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGhhbmRsZU1vZGVsQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGV2ZW50QXJnczogRXZlbnRNb2RlbENoYW5nZWRBcmdzKTogYW55IHtcclxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuXHJcbiAgICAgICAgIC8vIFNldCBjb3JyZWN0IGZvb3RlciBjb250ZW50IFxyXG4gICAgICAgICB2YXIgdHJlZUdyaWRPYmogPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcbiAgICAgICAgIGxldCBhY3R1YWxTZWxlY3RlZEl0ZW0gPSAoPGFueT50cmVlR3JpZE9iai5tb2RlbCkuc2VsZWN0ZWRJdGVtO1xyXG4gICAgICAgICBpZihhY3R1YWxTZWxlY3RlZEl0ZW0gPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgIC8vIGdldCB0cmlnZ2VyIGNvbmRpdGlvbiBvZiBmaXJzdCB0cmlnZ2VyXHJcbiAgICAgICAgICAgICBsZXQgY29uZGl0aW9uUGFyYW1ldGVyID0gXCJTdGFydFRyaWdnZXIxX0NvbmRpdGlvblwiO1xyXG4gICAgICAgICAgICAgbGV0IHRyaWdnZXJDb25kaXRpb25WYWx1ZSA9IHRoaXMuZ2V0VHJpZ2dlckNvbmRpdGlvblZhbHVlKHRyZWVHcmlkT2JqLm1vZGVsLmRhdGFTb3VyY2UsIGNvbmRpdGlvblBhcmFtZXRlcik7XHJcbiAgICAgICAgICAgICB0aGlzLnVwZGF0ZUZvb3RlckNvbnRlbnQodHJpZ2dlckNvbmRpdGlvblZhbHVlKTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZvb3RlckNvbnRlbnRUb1NlbGVjdGVkSXRlbShhY3R1YWxTZWxlY3RlZEl0ZW0pO1xyXG4gICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHVwZGF0ZUZvb3RlckNvbnRlbnRUb1NlbGVjdGVkSXRlbShzZWxlY3RlZEl0ZW0pe1xyXG4gICAgICAgIGxldCBzdGFydFRyaWdnZXJHcm91cDtcclxuICAgICAgICBpZihzZWxlY3RlZEl0ZW0ubGV2ZWwgPT0gMCl7XHJcbiAgICAgICAgICAgIC8vIFJvb3Rub2RlIHNlbGVjdGVkXHJcbiAgICAgICAgICAgIHN0YXJ0VHJpZ2dlckdyb3VwID0gc2VsZWN0ZWRJdGVtO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAvLyBQYXJhbWV0ZXIgc2VsZWN0ZWRcclxuICAgICAgICAgICAgc3RhcnRUcmlnZ2VyR3JvdXAgPSBzZWxlY3RlZEl0ZW0ucGFyZW50SXRlbTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoc3RhcnRUcmlnZ2VyR3JvdXAgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gVE9ETzogcmVtb3ZlL2NoYW5nZSBfc3RhcnRUcmlnZ2VyUmVmXHJcbiAgICAgICAgICAgIGxldCB0cmlnZ2VyQ29uZGl0aW9uVmFsdWUgPSBzdGFydFRyaWdnZXJHcm91cC5fc3RhcnRUcmlnZ2VyUmVmLmNvbmRpdGlvbjtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVGb290ZXJDb250ZW50KHBhcnNlSW50KHRyaWdnZXJDb25kaXRpb25WYWx1ZSwgMTApKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBoYW5kbGVzIHRoZSBjaGFuZ2VzIG9mIG9ic2VydmVkIGl0ZW1zIHJlcXVlc3RlZCBieSAnb2JzZXJ2ZURhdGFNb2RlbEl0ZW1zJ1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SURhdGFNb2RlbH0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50TW9kZWxDaGFuZ2VkQXJnc30gZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBoYW5kbGVNb2RlbEl0ZW1zQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGV2ZW50QXJnczogRXZlbnRNb2RlbENoYW5nZWRBcmdzKSB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNyZWF0ZXMgdGhlIGRhdGFwb2ludCBzZWxlY3Rpb24gZGlhbG9nXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZURhdGFwb2ludHNEaWFsb2coKXtcclxuICAgICAgICBsZXQgZGF0YXBvaW50RGlhbG9nSWQgPSBcImRhdGFwb2ludERpYWxvZ1RyaWdnZXJcIjtcclxuICAgICAgICAkKHRoaXMubWFpbkRpdikuYXBwZW5kKFwiPGRpdiBpZD0nXCIgKyBkYXRhcG9pbnREaWFsb2dJZCArIFwiJz48Lz5cIik7XHJcblxyXG4gICAgICAgIERhdGFwb2ludERpYWxvZy5pbml0aWFsaXplKGRhdGFwb2ludERpYWxvZ0lkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogY2F0Y2hlcyB0aGUgYWRkIGRhdGFwb2ludCBldmVudCBmcm9tIHRoZSBkYXRhcG9pbnQgZGlhbG9nXHJcbiAgICAgKiA9PiBzZXRzIHRoZSBzZWxlY3RlZCBkYXRhcG9pbnQgdG8gdGhlIGFjdHVhbCBzZWxlY3RlZCB0cmlnZ2VyIGFuZCBjbG9zZXMgdGhlIGRhdGFwb2ludCBkaWFsb2dcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge30gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50RGF0YXBvaW50QXJnc30gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQWRkRGF0YXBvaW50KHNlbmRlciwgYXJnczpFdmVudERhdGFwb2ludEFyZ3Mpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2V0RGF0YXBvaW50TmFtZVRvU2VsZWN0ZWRUcmlnZ2VyKGFyZ3MuZGF0YVBvaW50SW5mby5mdWxsbmFtZSk7XHJcbiAgICAgICAgRGF0YXBvaW50RGlhbG9nLmNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNhdGNoZXMgdGhlIGRpYWxvZyBjbG9zZSBldmVudCBmcm9tIHRoZSBkYXRhcG9pbnQgZGlhbG9nXHJcbiAgICAgKiA9PiBkZXRhY2hlcyB0aGUgZGlhbG9nIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7fSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7fSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25EaWFsb2dDbG9zZWQoc2VuZGVyLCBhcmdzKXtcclxuICAgICAgICBEYXRhcG9pbnREaWFsb2cuZXZlbnRBZGREYXRhcG9pbnQuZGV0YWNoKHRoaXMuX2FkZERhdGFQb2ludEhhbmRsZXIpO1xyXG4gICAgICAgIERhdGFwb2ludERpYWxvZy5ldmVudERpYWxvZ0Nsb3NlZC5kZXRhY2godGhpcy5fZGlhbG9nQ2xvc2VkSGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNhdGNoZXMgdGhlIGRpYWxvZyBjbG9zZSBldmVudCBmcm9tIHRoZSBkYXRhcG9pbnQgZGlhbG9nXHJcbiAgICAgKiA9PiBkZXRhY2hlcyB0aGUgZGlhbG9nIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhUG9pbnROYW1lXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0RGF0YXBvaW50TmFtZVRvU2VsZWN0ZWRUcmlnZ2VyKGRhdGFQb2ludE5hbWU6IHN0cmluZyl7XHJcbiAgICAgICAgdmFyIHRyZWVHcmlkT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG4gICAgICAgIGxldCBzdGFydFRyaWdnZXJJdGVtO1xyXG4gICAgICAgIGxldCBhY3R1YWxTZWxlY3RlZEl0ZW0gPSAoPGFueT50cmVlR3JpZE9iai5tb2RlbCkuc2VsZWN0ZWRJdGVtO1xyXG4gICAgICAgIGlmKGFjdHVhbFNlbGVjdGVkSXRlbSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZihhY3R1YWxTZWxlY3RlZEl0ZW0ubGV2ZWwgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICBzdGFydFRyaWdnZXJJdGVtID0gYWN0dWFsU2VsZWN0ZWRJdGVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBzdGFydFRyaWdnZXJJdGVtID0gYWN0dWFsU2VsZWN0ZWRJdGVtLnBhcmVudEl0ZW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJObyBzdGFydCB0cmlnZ2VyIHNlbGVjdGVkIVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNhdmUgY2VsbCBiZXZvciB1cGRhdGluZyB0aGUgZGF0YW1vZGVsIHRvIHNlZSB0aGUgcmlnaHQgZGF0YSBhZnRlciB1cGRhdGVcclxuICAgICAgICB0cmVlR3JpZE9iai5zYXZlQ2VsbCgpOyBcclxuICAgICAgICBsZXQgZGF0YVBvaW50TmFtZVBhcmFtZXRlciA9IHN0YXJ0VHJpZ2dlckl0ZW0uaXRlbS5jaGlsZHMuZmlsdGVyKHRyaWdnZXJQYXJhbWV0ZXIgID0+IHtyZXR1cm4gdHJpZ2dlclBhcmFtZXRlci5pZCA9PSBcImRhdGFwb2ludFwifSlbMF07XHJcbiAgICAgICAgaWYoZGF0YVBvaW50TmFtZVBhcmFtZXRlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBkYXRhUG9pbnROYW1lUGFyYW1ldGVyLmRpc3BsYXlWYWx1ZSA9IGRhdGFQb2ludE5hbWU7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICBzdGFydFRyaWdnZXJJdGVtLnNldFZhbHVlKGRhdGFQb2ludE5hbWVQYXJhbWV0ZXIsIGRhdGFQb2ludE5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogY3JlYXRlcyB0aGUgdHJlZSBncmlkIGZvciB0aGUgdHJpZ2dlciBpbmZvcm1hdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVUcmVlR3JpZCgpIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZURhdGFwb2ludHNEaWFsb2coKTtcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgJCh0aGlzLm1haW5EaXYpLmVqVHJlZUdyaWQoe1xyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkVG9vbGJhclN1cHBvcnQoKSxcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENlbGxFZGl0U3VwcG9ydCgpLFxyXG5cclxuICAgICAgICAgICAgY2hpbGRNYXBwaW5nOlwiY2hpbGRzXCIsXHJcbiAgICAgICAgICAgIGV4cGFuZFN0YXRlTWFwcGluZzogXCJleHBhbmRTdGF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBleHBhbmRlZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWROb2RlRXhwYW5kZWRPckNvbGxhcHNlZCgpLFxyXG4gICAgICAgICAgICBjb2xsYXBzZWQ6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkTm9kZUV4cGFuZGVkT3JDb2xsYXBzZWQoKSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJvd1NlbGVjdGVkOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZFJvd1NlbGVjdGVkKGFyZ3MpLFxyXG4gICAgICAgICAgICBjcmVhdGU6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkQ3JlYXRlZCgpLFxyXG4gICAgICAgICAgICBhY3Rpb25CZWdpbjogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRBY3Rpb25CZWdpbihhcmdzKSxcclxuICAgICAgICAgICAgYWN0aW9uQ29tcGxldGU6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkQWN0aW9uQ29tcGxldGUoYXJncyksIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkTm9kZUV4cGFuZGVkT3JDb2xsYXBzZWQoKXtcclxuICAgICAgICAvLyBSZWZyZXNoIHRvIHNlZSBjb3JyZWN0IGV4cGFuZGVkL2NvbGxhcHNlZCBpY29uXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIGRlZmluaXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpOiB7fXtcclxuICAgICAgICB0aGlzLl9jZWxsRWRpdFRlbXBsYXRlID0gVHJhY2VDb25maWdUcmlnZ2VyVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlLmNyZWF0ZUluc3RhbmNlKCk7XHJcbiAgICAgICAgdGhpcy5fY2VsbEVkaXRUZW1wbGF0ZS5ldmVudFNlbGVjdGlvbkNoYW5nZWQuYXR0YWNoKHRoaXMuX2Ryb3BEb3duTGlzdFNlbGVjdGlvbkNoYW5nZWRIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29sdW1uczogW1xyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJkaXNwbGF5TmFtZVwiLCBoZWFkZXJUZXh0OiBcIk5hbWVcIiwgd2lkdGg6IFwiMjAwXCJ9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJkaXNwbGF5VmFsdWVcIiwgaGVhZGVyVGV4dDogXCJWYWx1ZVwiLCB3aWR0aDogXCIyMDBcIiwgZWRpdFR5cGU6IFwic3RyaW5nZWRpdFwiLCBlZGl0VGVtcGxhdGU6IHRoaXMuX2NlbGxFZGl0VGVtcGxhdGV9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjb2x1bW4gcmVzaXplIHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtblJlc2l6ZVN1cHBvcnQoKToge317XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWxsb3dDb2x1bW5SZXNpemU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbHVtblJlc2l6ZVNldHRpbmdzOiB7IGNvbHVtblJlc2l6ZU1vZGU6IGVqLlRyZWVHcmlkLkNvbHVtblJlc2l6ZU1vZGUuRml4ZWRDb2x1bW5zIH0sXHJcbiAgICAgICAgICAgIGNvbHVtblJlc2l6ZWQ6IChhcmdzKSA9PiBzdXBlci5yZXNpemVEeW5hbWljQ29sdW1uKGFyZ3MuY29sdW1uSW5kZXgsIGFyZ3MubW9kZWwpLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgdG9vbGJhciBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpOiB7fXtcclxuICAgICAgICB0aGlzLl90b29sYmFyID0gbmV3IFRyYWNlQ29uZmlnVHJpZ2dlclRyZWVHcmlkVG9vbGJhcih0aGlzLm1haW5EaXYpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRvb2xiYXJTZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgc2hvd1Rvb2xiYXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21Ub29sYmFySXRlbXM6IHRoaXMuX3Rvb2xiYXIuZ2V0Q3VzdG9tVG9vbGJhcnMoKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdG9vbGJhckNsaWNrOiAoYXJncykgPT4gdGhpcy50b29sYmFyQ2xpY2soYXJncyksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjZWxsIGVkaXQgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkQ2VsbEVkaXRTdXBwb3J0KCk6IHt9e1xyXG5cdFx0bGV0IGNlbGxFZGl0RXZlbnRzID0gbmV3IFRyYWNlQ29uZmlnVHJpZ2dlclRyZWVHcmlkQ2VsbEVkaXRFdmVudHMoKTtcclxuXHRcdHJldHVybiB7XHJcbiAgICAgICAgICAgIGVkaXRTZXR0aW5nczogeyBhbGxvd0VkaXRpbmc6IHRydWUgfSxcclxuICAgICAgICAgICAgYmVnaW5FZGl0OiAoYXJncykgPT4gY2VsbEVkaXRFdmVudHMuYmVnaW5FZGl0KGFyZ3MpLFxyXG4gICAgICAgICAgICBlbmRFZGl0OiAoYXJncykgPT4gY2VsbEVkaXRFdmVudHMuZW5kRWRpdChhcmdzKSxcclxuXHRcdH07XHJcblx0fVxyXG5cclxuICAgIHByaXZhdGUgdHJlZUdyaWRDcmVhdGVkKCl7XHJcbiAgICAgICAgLy8gU2V0cyB0aGUgY3VzdG9tIHRvb2xiYXIgaWNvbnNcclxuICAgICAgICB0aGlzLl90b29sYmFyLnNldFN0eWxlRm9yVG9vbGJhckljb25zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZEFjdGlvbkJlZ2luKGFyZ3Mpe1xyXG4gICAgICAgIC8vIFN1cHBvcnQgXCJFbnRmL0RlbFwiIGtleVxyXG4gICAgICAgIGlmKGFyZ3MucmVxdWVzdFR5cGUgPT0gXCJkZWxldGVcIil7XHJcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlU3RhcnRUcmlnZ2VycyhhcmdzLmRlbGV0ZWRJdGVtcyk7XHJcbiAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZEFjdGlvbkNvbXBsZXRlKGFyZ3Mpe1xyXG4gICAgICAgIC8vIEV2ZW50IHRyaWdnZXIgd2hpbGUgY2hhbmdpbmcgZGF0YXNvdXJjZSBkeW5hbWljYWxseS4gXHJcbiAgICAgICAgLy8gY29kZSB0byBkb25lIGFmdGVyIHRoZSBkeW5hbWljIGNoYW5nZSBvZiBkYXRhc291cmNlLiBcclxuICAgICAgICBpZiAoYXJncy5yZXF1ZXN0VHlwZSA9PT0gJ3JlZnJlc2hEYXRhU291cmNlJykgeyBcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoU2VsZWN0aW9uKCk7XHRcdFx0XHRcdFx0XHJcbiAgICAgICAgfSBcclxuICAgIH1cclxuICAgXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkUm93U2VsZWN0ZWQoYXJncyl7XHJcbiAgICAgICAgaWYoYXJncy5tb2RlbC5zZWxlY3RlZEl0ZW0gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVGb290ZXJDb250ZW50VG9TZWxlY3RlZEl0ZW0oYXJncy5tb2RlbC5zZWxlY3RlZEl0ZW0pO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRvb2xiYXJCdXR0b25TdGF0ZXMoYXJncy5tb2RlbC5kYXRhU291cmNlLCBhcmdzLm1vZGVsLnNlbGVjdGVkSXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRTdGFydFRyaWdnZXIoKXtcclxuICAgICAgICAoPElUcmFjZUNvbmZpZ1RyaWdnZXJEYXRhTW9kZWw+dGhpcy5kYXRhTW9kZWwpLmFkZFRyaWdnZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoU2VsZWN0aW9uKCk7XHJcblxyXG4gICAgICAgIC8vIEdldCBhY3R1YWwgc2VsZWN0aW9uIGl0ZW1cclxuICAgICAgICBjb25zdCB0cmVlT2JqID0gJCh0aGlzLm1haW5EaXYpLmVqVHJlZUdyaWQoJ2luc3RhbmNlJyk7IFxyXG4gICAgICAgIGxldCBzZWxlY3RlZEl0ZW0gPSB0cmVlT2JqLm1vZGVsLnNlbGVjdGVkSXRlbTtcclxuICAgICAgICBpZiggdHJlZU9iai5tb2RlbC5zZWxlY3RlZFJvd0luZGV4ID09IC0xKXtcclxuICAgICAgICAgICAgc2VsZWN0ZWRJdGVtID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZVRvb2xiYXJCdXR0b25TdGF0ZXModHJlZU9iai5tb2RlbC5kYXRhU291cmNlLCBzZWxlY3RlZEl0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZWxldGVTdGFydFRyaWdnZXJzKGRlbGV0ZUl0ZW1zKXtcclxuICAgICAgICBsZXQgaW5kZXhMaXN0ID0gbmV3IEFycmF5PG51bWJlcj4oKTtcclxuICAgICAgICBmb3IobGV0IGk9ZGVsZXRlSXRlbXMubGVuZ3RoLTE7IGkgPj0gMDsgaS0tKXtcclxuICAgICAgICAgICAgaWYoZGVsZXRlSXRlbXNbaV0ubGV2ZWwgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAvLyBPbmx5IGxldmVsIDAgY2FuIGJlIGRlbGV0ZWQgKHN0YXJ0IHRyaWdnZXIgZ3JvdXAsIG5vdCBzaW5nbGUgcGFyYW1ldGVycyBvZiB0aGlzIGdyb3VwKVxyXG4gICAgICAgICAgICAgICAgaW5kZXhMaXN0LnB1c2goZGVsZXRlSXRlbXNbaV0uaGllcmFyY2h5Um93SW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGluZGV4TGlzdC5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgKDxJVHJhY2VDb25maWdUcmlnZ2VyRGF0YU1vZGVsPnRoaXMuZGF0YU1vZGVsKS5yZW1vdmVUcmlnZ2VycyhpbmRleExpc3QpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoU2VsZWN0aW9uKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBHZXQgYWN0dWFsIHNlbGVjdGlvbiBpdGVtXHJcbiAgICAgICAgICAgIGNvbnN0IHRyZWVPYmogPSAkKHRoaXMubWFpbkRpdikuZWpUcmVlR3JpZCgnaW5zdGFuY2UnKTsgXHJcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW0gPSB0cmVlT2JqLm1vZGVsLnNlbGVjdGVkSXRlbTtcclxuICAgICAgICAgICAgaWYoIHRyZWVPYmoubW9kZWwuc2VsZWN0ZWRSb3dJbmRleCA9PSAtMSl7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW0gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy51cGRhdGVUb29sYmFyQnV0dG9uU3RhdGVzKHRyZWVPYmoubW9kZWwuZGF0YVNvdXJjZSwgc2VsZWN0ZWRJdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBvcGVucyB0aGUgZGF0YXBvaW50IHNlbGVjdGlvbiBkaWFsb2cgYW5kIGF0dGFjaGVzIHRvIHRoZSBkaWFsb2cgZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb3BlbkRhdGFwb2ludERpYWxvZygpe1xyXG4gICAgICAgIERhdGFwb2ludERpYWxvZy5ldmVudEFkZERhdGFwb2ludC5hdHRhY2godGhpcy5fYWRkRGF0YVBvaW50SGFuZGxlcik7XHJcbiAgICAgICAgRGF0YXBvaW50RGlhbG9nLmV2ZW50RGlhbG9nQ2xvc2VkLmF0dGFjaCh0aGlzLl9kaWFsb2dDbG9zZWRIYW5kbGVyKTtcclxuICAgICAgICBEYXRhcG9pbnREaWFsb2cub3BlbihUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXQuc2VsZWN0RGF0YVBvaW50RGlhbG9nVGl0bGUsIEZvb3RlckNvbnRlbnRUeXBlLmFwcGx5Q2xvc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVmcmVzaFNlbGVjdGlvbigpe1xyXG5cdFx0Y29uc3QgdHJlZU9iaiA9ICQodGhpcy5tYWluRGl2KS5lalRyZWVHcmlkKCdpbnN0YW5jZScpOyBcclxuXHRcdFx0XHRcdFx0XHJcblx0XHQvLyBHZXQgYWN0dWFsIHNlbGVjdGlvbiBpbmRleFxyXG4gICAgICAgIGxldCBhY3R1YWxTZWxlY3RlZFJvd0luZGV4ID0gdHJlZU9iai5tb2RlbC5zZWxlY3RlZFJvd0luZGV4O1xyXG4gICAgICAgIGlmIChhY3R1YWxTZWxlY3RlZFJvd0luZGV4ID09IC0xKXtcclxuICAgICAgICAgICAgLy8gdXBkYXRlIHRvb2xiYXIgYnV0dG9ucyBpbiBjYXNlIG9mIG5vIHNlbGVjdGVkIGl0ZW1cclxuICAgICAgICAgICAgdGhpcy51cGRhdGVUb29sYmFyQnV0dG9uU3RhdGVzKHRyZWVPYmoubW9kZWwuZGF0YVNvdXJjZSwgdW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcblx0XHQvLyBSZXNldCBzZWxlY3Rpb25cclxuXHRcdHRyZWVPYmoubW9kZWwuc2VsZWN0ZWRSb3dJbmRleCA9IC0xO1xyXG5cdFx0XHJcblx0XHQvLyBTZXQgdG8gbGFzdCBpbmRleCBpZiBpbmRleCBpcyBvdXQgb2YgcmFuZ2VcclxuXHRcdGlmKGFjdHVhbFNlbGVjdGVkUm93SW5kZXggPj0gdHJlZU9iai5tb2RlbC5mbGF0UmVjb3Jkcy5sZW5ndGgpe1xyXG5cdFx0XHRhY3R1YWxTZWxlY3RlZFJvd0luZGV4ID0gdHJlZU9iai5tb2RlbC5mbGF0UmVjb3Jkcy5sZW5ndGgtMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcblx0XHQvLyBTZXQgc2VsZWN0aW9uXHJcblx0XHR0cmVlT2JqLm1vZGVsLnNlbGVjdGVkUm93SW5kZXggPSBhY3R1YWxTZWxlY3RlZFJvd0luZGV4O1xyXG5cdFx0XHJcblx0XHQvLyB1cGRhdGUgdG9vbGJhciBidXR0b25zIHdpdGggc2VsZWN0ZWQgaXRlbVxyXG5cdFx0aWYodHJlZU9iai5tb2RlbC5mbGF0UmVjb3Jkc1thY3R1YWxTZWxlY3RlZFJvd0luZGV4XSAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHR0aGlzLnVwZGF0ZVRvb2xiYXJCdXR0b25TdGF0ZXModHJlZU9iai5tb2RlbC5kYXRhU291cmNlLCB0cmVlT2JqLm1vZGVsLmZsYXRSZWNvcmRzW2FjdHVhbFNlbGVjdGVkUm93SW5kZXhdLml0ZW0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyaWdnZXIgY29uZGl0aW9uKGUuZy4gMjAgZm9yIElOX1dJTkRPVzsgMzAgZm9yIE9VVF9XSU5ET1c7IC4uLikgZm9yIHRoZSBnaXZlbiBjb25kaXRpb24gcGFyYW1ldGVyIGlkIChlLmcuIFN0YXJ0VHJpZ2dlcjFfQ29uZGl0aW9uKVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7fSBkYXRhU291cmNlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29uZGl0aW9uUGFyYW1ldGVyXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyaWdnZXJDb25kaXRpb25WYWx1ZShkYXRhU291cmNlLCBjb25kaXRpb25QYXJhbWV0ZXI6IHN0cmluZyk6IG51bWJlcntcclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IGRhdGFTb3VyY2UubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgIHN0YXJ0VHJpZ2dlciA9IGRhdGFTb3VyY2VbaV07XHJcbiAgICAgICAgICAgIGZvcihsZXQgaj0wOyBqIDwgc3RhcnRUcmlnZ2VyLmNoaWxkcy5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGFyYW1ldGVyID0gc3RhcnRUcmlnZ2VyLmNoaWxkc1tqXTtcclxuICAgICAgICAgICAgICAgIGlmKHBhcmFtZXRlci5jb21wb25lbnRQYXJhbWV0ZXIuYnJvd3NlTmFtZSA9PSBjb25kaXRpb25QYXJhbWV0ZXIpe1xyXG4gICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KHBhcmFtZXRlci5jb21wb25lbnRQYXJhbWV0ZXIudmFsdWUsIDEwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZnJlc2hlcyB0cmlnZ2VyIHBhcmFtZXRlcnMgdHJlZSBncmlkIHdpdGggdGhlIGN1cnJlbnQgbW9kZWwgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlZnJlc2goKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVmcmVzaEVuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRNb2RlbCh0aGlzLmRhdGFNb2RlbC5kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgcHJpdmF0ZSBvbkRyb3BEb3duTGlzdFNlbGVjdGlvbkNoYW5nZWQoc2VuZGVyLGFyZ3Mpe1xyXG4gICAgICAgIHRoaXMudXBkYXRlRm9vdGVyQ29udGVudChhcmdzLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZVRvb2xiYXJCdXR0b25TdGF0ZXMoc3RhcnRUcmlnZ2VyczogQXJyYXk8YW55Piwgc2VsZWN0ZWRJdGVtKXtcclxuICAgICAgICAvLyBTZXQgc2VsZWN0IHRyaWdnZXIgZGF0YXBvaW50IGJ1dHRvbiBzdGF0ZVxyXG4gICAgICAgIGlmKHNlbGVjdGVkSXRlbSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVTZWxlY3RUcmlnZ2VyRGF0YVBvaW50QnV0dG9uKHRydWUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVTZWxlY3RUcmlnZ2VyRGF0YVBvaW50QnV0dG9uKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gU2V0IGFkZCB0cmlnZ2VyIGJ1dHRvbiBzdGF0ZVxyXG4gICAgICAgIGlmKHN0YXJ0VHJpZ2dlcnMubGVuZ3RoID4gMSl7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzYWJsZUFkZEJ1dHRvbih0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlQWRkQnV0dG9uKGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNldCByZW1vdmUgdHJpZ2dlciBidXR0b24gc3RhdGVcclxuICAgICAgICBpZihzdGFydFRyaWdnZXJzLmxlbmd0aCA9PSAwIHx8IHNlbGVjdGVkSXRlbSA9PSB1bmRlZmluZWQgfHwgc2VsZWN0ZWRJdGVtLmxldmVsID4gMCl7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzYWJsZVJlbW92ZUJ1dHRvbih0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlUmVtb3ZlQnV0dG9uKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldCB9OyJdfQ==