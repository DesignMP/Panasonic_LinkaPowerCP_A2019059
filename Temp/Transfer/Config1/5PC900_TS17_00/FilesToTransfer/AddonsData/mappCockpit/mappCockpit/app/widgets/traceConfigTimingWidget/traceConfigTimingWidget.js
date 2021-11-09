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
define(["require", "exports", "../common/treeGridWidgetBase", "./view/traceConfigTimingTreeGridToolbar", "./view/traceConfigTimingTreeGridCellEditEvents", "./view/traceConfigTimingTreeGridCellEditTemplate", "./model/traceConfigTimingDataModel", "./componentDefaultDefinition"], function (require, exports, treeGridWidgetBase_1, traceConfigTimingTreeGridToolbar_1, traceConfigTimingTreeGridCellEditEvents_1, traceConfigTimingTreeGridCellEditTemplate_1, traceConfigTimingDataModel_1, componentDefaultDefinition_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the TraceConfigTimingWidget
     *
     * @class TraceConfigTimingWidget
     * @extends {TreeGridWidgetBase}
     */
    var TraceConfigTimingWidget = /** @class */ (function (_super) {
        __extends(TraceConfigTimingWidget, _super);
        function TraceConfigTimingWidget() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Defines the height of the header
         *
         * @returns {number}
         * @memberof TraceConfigTimingWidget
         */
        TraceConfigTimingWidget.prototype.defineHeaderHeight = function () {
            return 30;
        };
        /**
         * Defines the height of the footer
         *
         * @returns {number}
         * @memberof TraceConfigTimingWidget
         */
        TraceConfigTimingWidget.prototype.defineFooterHeight = function () {
            return 290;
        };
        TraceConfigTimingWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        TraceConfigTimingWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            _super.prototype.setHeaderContent.call(this, "Timing");
            this.initFooterContent();
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 0, 100);
        };
        /**
         * Processes trace timing parameter changes
         *
         * @private
         * @param {MappCockpitComponentParameter[]} traceTimingParameters
         * @memberof TraceConfigTimingWidget
         */
        TraceConfigTimingWidget.prototype.initializeTraceTimingParameters = function (traceTimingParameters) {
            if (traceTimingParameters.length > 0) {
                var traceConfigTimingDataModel = new traceConfigTimingDataModel_1.TraceConfigTimingDataModel();
                traceConfigTimingDataModel.initialize();
                this.dataModel = traceConfigTimingDataModel;
                traceConfigTimingDataModel.initData = traceTimingParameters;
            }
        };
        /** initialize the footer content
         *
         * @memberof TraceConfigTimingWidget
         */
        TraceConfigTimingWidget.prototype.initFooterContent = function () {
            var coTraceSetTimingImagePath = "widgets/traceConfigTimingWidget/resources/images/TraceTimingDiagram_TotalRecordingTime.svg";
            _super.prototype.setFooterContent.call(this, "Timing diagram:<br> \n        <img src=\"" + coTraceSetTimingImagePath + "\"></br>1... The first start trigger is detected.");
        };
        /**
         * implements the model change handling
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} data
         * @returns {*}
         * @memberof TraceConfigTimingWidget
         */
        TraceConfigTimingWidget.prototype.handleModelChanged = function (sender, eventArgs) {
            this.refreshTimingParameterValues(this.dataModel.data);
        };
        /**
         * handles the changes of observed items requested by 'observeDataModelItems'
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} data
         * @memberof TraceConfigTimingWidget
         */
        TraceConfigTimingWidget.prototype.handleModelItemsChanged = function (sender, eventArgs) {
            this.refreshTimingParameterValues(this.dataModel.data);
        };
        /** creates the tree grid for the timing informations
         *
         * @memberof TraceConfigTimingWidget
         */
        TraceConfigTimingWidget.prototype.createTreeGrid = function () {
            var _this = this;
            var cellEditEvents = new traceConfigTimingTreeGridCellEditEvents_1.TraceConfigTimingTreeGridCellEditEvents();
            $(this.mainDiv).ejTreeGrid(__assign(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), this.getTreeGridToolbarSupport()), { editSettings: {
                    allowEditing: true,
                    allowDeleting: false,
                }, create: function (args) { return _this.treeGridCreated(); }, beginEdit: function (args) { return cellEditEvents.beginEdit(args); }, endEdit: function (args) { return cellEditEvents.endEdit(args, _this.dataModel); } }));
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof TraceConfigTimingWidget
         */
        TraceConfigTimingWidget.prototype.getTreeGridColumnDefinition = function () {
            var cellEditTemplate = traceConfigTimingTreeGridCellEditTemplate_1.TraceConfigTimingTreeGridCellEditTemplate.createInstance();
            return {
                columns: [
                    { field: "displayName", headerText: "Name" },
                    { field: "displayValue", headerText: "Value", width: "200", editType: "stringedit", editTemplate: cellEditTemplate },
                    { field: "engineeringunit", headerText: "Unit", width: "100" },
                ],
            };
        };
        /**
         * Returns the tree grid column resize settings
         *
         * @private
         * @returns {{}}
         * @memberof TraceConfigTimingWidget
         */
        TraceConfigTimingWidget.prototype.getTreeGridColumnResizeSupport = function () {
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
         * @memberof TraceConfigTimingWidget
         */
        TraceConfigTimingWidget.prototype.getTreeGridToolbarSupport = function () {
            this._toolbar = new traceConfigTimingTreeGridToolbar_1.TraceConfigTimingTreeGridToolbar(this.mainDiv);
            return {
                toolbarSettings: {
                    showToolbar: true,
                    customToolbarItems: this._toolbar.getCustomToolbars()
                },
            };
        };
        TraceConfigTimingWidget.prototype.treeGridCreated = function () {
            // Sets the custom toolbar icons
            this._toolbar.setStyleForToolbarIcons();
            // disable dummy button after creation
            this._toolbar.disableDummyButton();
        };
        /**
         * refreshes the content of the timing parameters value fields
         *
         * @private
         * @param {TimingParameter[]} timingParameters
         * @memberof TraceConfigTimingWidget
         */
        TraceConfigTimingWidget.prototype.refreshTimingParameterValues = function (timingParameters) {
            $(this.mainDiv).ejTreeGrid({
                dataSource: timingParameters,
            });
        };
        return TraceConfigTimingWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.TraceConfigTimingWidget = TraceConfigTimingWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdUaW1pbmdXaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvdHJhY2VDb25maWdUaW1pbmdXaWRnZXQvdHJhY2VDb25maWdUaW1pbmdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBWUE7Ozs7O09BS0c7SUFDSDtRQUFzQywyQ0FBa0I7UUFBeEQ7O1FBcUxBLENBQUM7UUFqTEc7Ozs7O1dBS0c7UUFDSCxvREFBa0IsR0FBbEI7WUFDSSxPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILG9EQUFrQixHQUFsQjtZQUNJLE9BQU8sR0FBRyxDQUFDO1FBQ2YsQ0FBQztRQUVELHFEQUFtQixHQUFuQjtZQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsSUFBSSx1REFBMEIsRUFBRSxDQUFDLENBQUM7WUFDdEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZDLENBQUM7UUFHRCw2Q0FBVyxHQUFYO1lBQ0ksaUJBQU0sV0FBVyxXQUFFLENBQUM7WUFFcEIsaUJBQU0sZ0JBQWdCLFlBQUMsUUFBUSxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFFekIsOEJBQThCO1lBQzlCLGlCQUFNLGdCQUFnQixZQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssaUVBQStCLEdBQXZDLFVBQXdDLHFCQUFzRDtZQUMxRixJQUFHLHFCQUFxQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUM7Z0JBQ2hDLElBQUksMEJBQTBCLEdBQUcsSUFBSSx1REFBMEIsRUFBaUMsQ0FBQztnQkFDakcsMEJBQTBCLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxTQUFT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ZSxFQUFFO29CQUNiLFdBQVcsRUFBRSxJQUFJO29CQUNqQixrQkFBa0IsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFO2lCQUN4RDthQUNKLENBQUM7UUFDTixDQUFDO1FBRU8saURBQWUsR0FBdkI7WUFDSSxnQ0FBZ0M7WUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1lBRXhDLHNDQUFzQztZQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLDhEQUE0QixHQUFwQyxVQUFxQyxnQkFBbUM7WUFDcEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLENBQUM7Z0JBQ3ZCLFVBQVUsRUFBRSxnQkFBZ0I7YUFDL0IsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUNMLDhCQUFDO0lBQUQsQ0FBQyxBQXJMRCxDQUFzQyx1Q0FBa0IsR0FxTHZEO0lBRVEsMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVRyYWNlQ29uZmlnVGltaW5nV2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy90cmFjZUNvbmZpZ1RpbWluZ1dpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUcmVlR3JpZFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3RyZWVHcmlkV2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBJRGF0YU1vZGVsLCBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUaW1pbmdQYXJhbWV0ZXIgfSBmcm9tIFwiLi9tb2RlbC90aW1pbmdQYXJhbWV0ZXJcIjtcclxuaW1wb3J0IHsgVHJhY2VDb25maWdUaW1pbmdUcmVlR3JpZFRvb2xiYXIgfSBmcm9tIFwiLi92aWV3L3RyYWNlQ29uZmlnVGltaW5nVHJlZUdyaWRUb29sYmFyXCI7XHJcbmltcG9ydCB7IFRyYWNlQ29uZmlnVGltaW5nVHJlZUdyaWRDZWxsRWRpdEV2ZW50cyB9IGZyb20gXCIuL3ZpZXcvdHJhY2VDb25maWdUaW1pbmdUcmVlR3JpZENlbGxFZGl0RXZlbnRzXCI7XHJcbmltcG9ydCB7IElUcmFjZUNvbmZpZ1RpbWluZ0RhdGFNb2RlbCB9IGZyb20gXCIuL21vZGVsL3RyYWNlQ29uZmlnVGltaW5nRGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRyYWNlQ29uZmlnVGltaW5nVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlIH0gZnJvbSBcIi4vdmlldy90cmFjZUNvbmZpZ1RpbWluZ1RyZWVHcmlkQ2VsbEVkaXRUZW1wbGF0ZVwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFRyYWNlQ29uZmlnVGltaW5nRGF0YU1vZGVsIH0gZnJvbSBcIi4vbW9kZWwvdHJhY2VDb25maWdUaW1pbmdEYXRhTW9kZWxcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24gfSBmcm9tIFwiLi9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblwiO1xyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgdGhlIFRyYWNlQ29uZmlnVGltaW5nV2lkZ2V0XHJcbiAqXHJcbiAqIEBjbGFzcyBUcmFjZUNvbmZpZ1RpbWluZ1dpZGdldFxyXG4gKiBAZXh0ZW5kcyB7VHJlZUdyaWRXaWRnZXRCYXNlfVxyXG4gKi9cclxuY2xhc3MgVHJhY2VDb25maWdUaW1pbmdXaWRnZXQgZXh0ZW5kcyBUcmVlR3JpZFdpZGdldEJhc2UgaW1wbGVtZW50cyBJVHJhY2VDb25maWdUaW1pbmdXaWRnZXQge1xyXG5cclxuICAgIHByb3RlY3RlZCBfdG9vbGJhciE6IFRyYWNlQ29uZmlnVGltaW5nVHJlZUdyaWRUb29sYmFyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB0aGUgaGVpZ2h0IG9mIHRoZSBoZWFkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVGltaW5nV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGRlZmluZUhlYWRlckhlaWdodCgpOiBudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIDMwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB0aGUgaGVpZ2h0IG9mIHRoZSBmb290ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVGltaW5nV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGRlZmluZUZvb3RlckhlaWdodCgpOiBudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIDI5MDtcclxuICAgIH1cclxuICAgXHJcbiAgICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0RGVmYXVsdERlZmluaXRpb24obmV3IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uKCkpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGluaXRpYWxpemVkKCl7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZWQoKTtcclxuXHJcbiAgICAgICAgc3VwZXIuc2V0SGVhZGVyQ29udGVudChcIlRpbWluZ1wiKTtcclxuICAgICAgICB0aGlzLmluaXRGb290ZXJDb250ZW50KCk7XHJcblxyXG4gICAgICAgIC8vIFNldCBkeW5hbWljIGNvbHVtbiBzZXR0aW5nc1xyXG4gICAgICAgIHN1cGVyLnNldER5bmFtaWNDb2x1bW4oMCwgMTAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb2Nlc3NlcyB0cmFjZSB0aW1pbmcgcGFyYW1ldGVyIGNoYW5nZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSB0cmFjZVRpbWluZ1BhcmFtZXRlcnNcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RpbWluZ1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRpYWxpemVUcmFjZVRpbWluZ1BhcmFtZXRlcnModHJhY2VUaW1pbmdQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKTogdm9pZCB7XHJcbiAgICAgICAgaWYodHJhY2VUaW1pbmdQYXJhbWV0ZXJzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICBsZXQgdHJhY2VDb25maWdUaW1pbmdEYXRhTW9kZWwgPSBuZXcgVHJhY2VDb25maWdUaW1pbmdEYXRhTW9kZWwoKSBhcyBJVHJhY2VDb25maWdUaW1pbmdEYXRhTW9kZWw7XHJcbiAgICAgICAgICAgIHRyYWNlQ29uZmlnVGltaW5nRGF0YU1vZGVsLmluaXRpYWxpemUoKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhTW9kZWwgPSB0cmFjZUNvbmZpZ1RpbWluZ0RhdGFNb2RlbDtcclxuICAgICAgICAgICAgdHJhY2VDb25maWdUaW1pbmdEYXRhTW9kZWwuaW5pdERhdGEgPSB0cmFjZVRpbWluZ1BhcmFtZXRlcnM7IFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqIGluaXRpYWxpemUgdGhlIGZvb3RlciBjb250ZW50XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVGltaW5nV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdEZvb3RlckNvbnRlbnQoKXtcclxuICAgICAgICBsZXQgY29UcmFjZVNldFRpbWluZ0ltYWdlUGF0aCA9IFwid2lkZ2V0cy90cmFjZUNvbmZpZ1RpbWluZ1dpZGdldC9yZXNvdXJjZXMvaW1hZ2VzL1RyYWNlVGltaW5nRGlhZ3JhbV9Ub3RhbFJlY29yZGluZ1RpbWUuc3ZnXCI7XHJcbiAgICAgICAgc3VwZXIuc2V0Rm9vdGVyQ29udGVudChgVGltaW5nIGRpYWdyYW06PGJyPiBcclxuICAgICAgICA8aW1nIHNyYz1cImAgKyBjb1RyYWNlU2V0VGltaW5nSW1hZ2VQYXRoICsgYFwiPjwvYnI+MS4uLiBUaGUgZmlyc3Qgc3RhcnQgdHJpZ2dlciBpcyBkZXRlY3RlZC5gKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGltcGxlbWVudHMgdGhlIG1vZGVsIGNoYW5nZSBoYW5kbGluZ1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SURhdGFNb2RlbH0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50TW9kZWxDaGFuZ2VkQXJnc30gZGF0YVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUaW1pbmdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgaGFuZGxlTW9kZWxDaGFuZ2VkKHNlbmRlcjogSURhdGFNb2RlbCwgZXZlbnRBcmdzOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpOiBhbnkge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFRpbWluZ1BhcmFtZXRlclZhbHVlcyh0aGlzLmRhdGFNb2RlbC5kYXRhIGFzIEFycmF5PFRpbWluZ1BhcmFtZXRlcj4pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaGFuZGxlcyB0aGUgY2hhbmdlcyBvZiBvYnNlcnZlZCBpdGVtcyByZXF1ZXN0ZWQgYnkgJ29ic2VydmVEYXRhTW9kZWxJdGVtcydcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lEYXRhTW9kZWx9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtFdmVudE1vZGVsQ2hhbmdlZEFyZ3N9IGRhdGFcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RpbWluZ1dpZGdldFxyXG4gICAgICovXHJcbiAgICBoYW5kbGVNb2RlbEl0ZW1zQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGV2ZW50QXJnczogRXZlbnRNb2RlbENoYW5nZWRBcmdzKSB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoVGltaW5nUGFyYW1ldGVyVmFsdWVzKHRoaXMuZGF0YU1vZGVsLmRhdGEgYXMgQXJyYXk8VGltaW5nUGFyYW1ldGVyPik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKiBjcmVhdGVzIHRoZSB0cmVlIGdyaWQgZm9yIHRoZSB0aW1pbmcgaW5mb3JtYXRpb25zXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVGltaW5nV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVUcmVlR3JpZCgpIHtcclxuICAgICAgICB2YXIgY2VsbEVkaXRFdmVudHMgPSBuZXcgVHJhY2VDb25maWdUaW1pbmdUcmVlR3JpZENlbGxFZGl0RXZlbnRzKCk7XHJcblxyXG4gICAgICAgICQodGhpcy5tYWluRGl2KS5lalRyZWVHcmlkKHtcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKSxcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENvbHVtblJlc2l6ZVN1cHBvcnQoKSxcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGVkaXRTZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgYWxsb3dFZGl0aW5nOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYWxsb3dEZWxldGluZyA6IGZhbHNlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjcmVhdGU6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkQ3JlYXRlZCgpLFxyXG4gICAgICAgICAgICBiZWdpbkVkaXQ6IChhcmdzKSA9PiBjZWxsRWRpdEV2ZW50cy5iZWdpbkVkaXQoYXJncyksXHJcbiAgICAgICAgICAgIGVuZEVkaXQ6IChhcmdzKSA9PiBjZWxsRWRpdEV2ZW50cy5lbmRFZGl0KGFyZ3MsIDxJVHJhY2VDb25maWdUaW1pbmdEYXRhTW9kZWw+dGhpcy5kYXRhTW9kZWwpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiBkZWZpbml0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RpbWluZ1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpOiB7fXtcclxuICAgICAgICBsZXQgY2VsbEVkaXRUZW1wbGF0ZSA9IFRyYWNlQ29uZmlnVGltaW5nVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlLmNyZWF0ZUluc3RhbmNlKCk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29sdW1uczogW1xyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJkaXNwbGF5TmFtZVwiLCBoZWFkZXJUZXh0OiBcIk5hbWVcIn0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImRpc3BsYXlWYWx1ZVwiLCBoZWFkZXJUZXh0OiBcIlZhbHVlXCIsIHdpZHRoOiBcIjIwMFwiLCBlZGl0VHlwZTogXCJzdHJpbmdlZGl0XCIsIGVkaXRUZW1wbGF0ZTogY2VsbEVkaXRUZW1wbGF0ZX0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImVuZ2luZWVyaW5ndW5pdFwiLCBoZWFkZXJUZXh0OiBcIlVuaXRcIiwgd2lkdGg6IFwiMTAwXCJ9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIHJlc2l6ZSBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUaW1pbmdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtblJlc2l6ZVN1cHBvcnQoKToge317XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWxsb3dDb2x1bW5SZXNpemU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbHVtblJlc2l6ZVNldHRpbmdzOiB7IGNvbHVtblJlc2l6ZU1vZGU6IGVqLlRyZWVHcmlkLkNvbHVtblJlc2l6ZU1vZGUuRml4ZWRDb2x1bW5zIH0sXHJcbiAgICAgICAgICAgIGNvbHVtblJlc2l6ZWQ6IChhcmdzKSA9PiBzdXBlci5yZXNpemVEeW5hbWljQ29sdW1uKGFyZ3MuY29sdW1uSW5kZXgsIGFyZ3MubW9kZWwpLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgdG9vbGJhciBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUaW1pbmdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCk6IHt9e1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIgPSBuZXcgVHJhY2VDb25maWdUaW1pbmdUcmVlR3JpZFRvb2xiYXIodGhpcy5tYWluRGl2KTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b29sYmFyU2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgIHNob3dUb29sYmFyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tVG9vbGJhckl0ZW1zOiB0aGlzLl90b29sYmFyLmdldEN1c3RvbVRvb2xiYXJzKClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJlZUdyaWRDcmVhdGVkKCl7XHJcbiAgICAgICAgLy8gU2V0cyB0aGUgY3VzdG9tIHRvb2xiYXIgaWNvbnNcclxuICAgICAgICB0aGlzLl90b29sYmFyLnNldFN0eWxlRm9yVG9vbGJhckljb25zKCk7XHJcblxyXG4gICAgICAgIC8vIGRpc2FibGUgZHVtbXkgYnV0dG9uIGFmdGVyIGNyZWF0aW9uXHJcbiAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlRHVtbXlCdXR0b24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlZnJlc2hlcyB0aGUgY29udGVudCBvZiB0aGUgdGltaW5nIHBhcmFtZXRlcnMgdmFsdWUgZmllbGRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7VGltaW5nUGFyYW1ldGVyW119IHRpbWluZ1BhcmFtZXRlcnNcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RpbWluZ1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlZnJlc2hUaW1pbmdQYXJhbWV0ZXJWYWx1ZXModGltaW5nUGFyYW1ldGVyczogVGltaW5nUGFyYW1ldGVyW10pIHtcclxuICAgICAgICAkKHRoaXMubWFpbkRpdikuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2U6IHRpbWluZ1BhcmFtZXRlcnMsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFRyYWNlQ29uZmlnVGltaW5nV2lkZ2V0IH07Il19