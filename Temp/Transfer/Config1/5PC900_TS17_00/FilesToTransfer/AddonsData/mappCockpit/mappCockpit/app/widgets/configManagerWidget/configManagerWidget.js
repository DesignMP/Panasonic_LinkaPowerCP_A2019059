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
define(["require", "exports", "./model/configManagerWidgetDataModel", "../../models/dataModelInterface", "../common/treeGridWidgetBase", "./view/cmTreeGridCellEditTemplate", "./view/cmTreeGridCellEditEvents", "./view/cmTreeGridCellStyle", "./view/cmTreeGridToolbar", "../../framework/property", "../../models/online/mappCockpitComponent", "./componentDefaultDefinition"], function (require, exports, configManagerWidgetDataModel_1, dataModelInterface_1, treeGridWidgetBase_1, cmTreeGridCellEditTemplate_1, cmTreeGridCellEditEvents_1, cmTreeGridCellStyle_1, cmTreeGridToolbar_1, property_1, mappCockpitComponent_1, componentDefaultDefinition_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ConfigManagerWidget = /** @class */ (function (_super) {
        __extends(ConfigManagerWidget, _super);
        function ConfigManagerWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._dataModelChangedHandler = function (sender, eventArgs) { _this.handleGridEndEdit(eventArgs); };
            _this._methods = property_1.Property.create([]);
            return _this;
        }
        /**
         * Defines the height of the header
         *
         * @returns {number}
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.defineHeaderHeight = function () {
            return 30;
        };
        ConfigManagerWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            _super.prototype.setHeaderContent.call(this, "Configuration");
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 3, 100);
        };
        ConfigManagerWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
        };
        Object.defineProperty(ConfigManagerWidget.prototype, "methods", {
            /**
             * Sets the methods data link as a reference to the methods to be displayed
             *
             * @memberof ConfigManagerWidget
             */
            set: function (methodsLink) {
                var _this = this;
                methodsLink.changed(function () {
                    _this._methods = methodsLink;
                    // get the save configuration method
                    _this.saveParametersMethod = _this.retrieveSaveParametersMethod();
                    // disable save button
                    _this._toolbar.disableSaveButton(true);
                    // enable the save button depending on executable state.
                    if (_this.saveParametersMethod) {
                        _this._toolbar.disableSaveButton(!_this.saveParametersMethod.isExecutable.value);
                        _this.saveParametersMethod.isExecutable.changed(function (isExecutable) {
                            _this._toolbar.disableSaveButton(!isExecutable);
                        });
                    }
                });
            },
            enumerable: true,
            configurable: true
        });
        ConfigManagerWidget.prototype.retrieveSaveParametersMethod = function () {
            return this._methods.value.filter(function (method) { return method.browseName == "Save Config"; })[0];
        };
        Object.defineProperty(ConfigManagerWidget.prototype, "configurationParameters", {
            /**
             * Sets the configurationparameters as the data source for the configuration manager widget
             *
             * @memberof ConfigManagerWidget
             */
            set: function (componentParameters) {
                var configManagerDataModel = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.ConfigManagerDataModel);
                if (configManagerDataModel != undefined) {
                    configManagerDataModel.configurationParameters = componentParameters;
                    this.dataModel = configManagerDataModel;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Creates the layout of the widget
         *
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.createLayout = function () {
            this.mainDiv.style.overflow = "hidden";
            $(this.mainDiv).append(this.getScriptInformationForTreeGrid());
            _super.prototype.createLayout.call(this);
        };
        ConfigManagerWidget.prototype.getScriptInformationForTreeGrid = function () {
            var str = "<script type=\"text/x-jsrender\" id=\"cmDisplayNameColumnTemplate\">\n\t\t\t\t<div style='height:20px;' unselectable='on'>\n\t\t\t\t\t{{if hasChildRecords}}\n\t\t\t\t\t\t<div class='intend' style='height:1px; float:left; width:{{:level*20}}px; display:inline-block;'></div>\n\t\t\t\t\t{{else !hasChildRecords}}\n\t\t\t\t\t\t<div class='intend' style='height:1px; float:left; width:{{:level*20}}px; display:inline-block;'></div>\n\t\t\t\t\t{{/if}}\n\t\t\t\t\t<div class=' {{if expanded}}e-treegridexpand e-cmtreegridexpand {{else hasChildRecords}}e-treegridcollapse e-cmtreegridcollapse {{/if}} {{if !expanded && !hasChildRecords}}e-doc e-cmdoc{{/if}}' style='height:20px;width:30px;margin:auto;float:left;margin-left:10px;'></div>\n\t\t\t\t\t<div class='e-cell' style='display:inline-block;width:100%' unselectable='on'>{{:#data['displayName']}}</div>\n\t\t\t\t</div>\n\t\t</script>";
            return str;
        };
        /**
         * Load the styles for the config manager
         *
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.loadStyles = function () {
            _super.prototype.addStyle.call(this, "widgets/configManagerWidget/style/css/treeGridIconStyles.css");
        };
        ConfigManagerWidget.prototype.handleModelChanged = function (sender, data) {
            this.updateGridData(sender);
            // after populating the configurationParametes we start observing changes of the parameters
            //this.startObservingConfigurationParameters((<ConfigManagerDataModel>this.dataModel)._actualComponentData);
        };
        /**
         * Handles the changes of observed items requested by 'observeDataModelItems'
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} eventArgs
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.handleModelItemsChanged = function (sender, eventArgs) {
            this.updateGridData(sender);
        };
        ConfigManagerWidget.prototype.handleGridEndEdit = function (args) {
            var changeHint = {
                hint: "changed parameter value",
                changedItemData: args.changedItemData,
                newItemData: args.newItemData,
            };
            var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateSource, changeHint, this.dataModel);
            this.dataModel.onModelChanged(this.dataModel, eventArgs);
        };
        /**
         * Activate the configmanagerwidget
         *
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.activate = function () {
            if (this.dataModel._actualComponentData) {
                mappCockpitComponent_1.MappCockpitComponentParameter.activateComponentModelItems(this.dataModel, this.dataModel._actualComponentData);
            }
        };
        /**
         * Deactivate the configmanagerwidget
         *
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.deactivate = function () {
            if (this.dataModel._actualComponentData) {
                mappCockpitComponent_1.MappCockpitComponentParameter.deactivateComponentModelItems(this.dataModel, this.dataModel._actualComponentData);
            }
        };
        /**
         * Dispose the configmanagerwidget
         *
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.dispose = function () {
            if (this.dataModel._actualComponentData) {
                mappCockpitComponent_1.MappCockpitComponentParameter.unobserveComponentModelItems(this.dataModel, this.dataModel._actualComponentData);
            }
            if (this.dataModel != undefined) {
                this.dataModel.dispose();
            }
            _super.prototype.dispose.call(this);
        };
        /**
         * Creates the tree grid for the configuration structure
         *
         * @protected
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.createTreeGrid = function () {
            var _this = this;
            var cellEditEvents = new cmTreeGridCellEditEvents_1.CmTreeGridCellEditEvents();
            var cellStyle = new cmTreeGridCellStyle_1.CmTreeGridCellStyle();
            $(this.mainDiv).ejTreeGrid(__assign(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), this.getTreeGridToolbarSupport()), { dataSource: undefined, childMapping: "childs", expandStateMapping: "expandState", isResponsive: false, allowReordering: false, editSettings: {
                    allowEditing: true,
                    allowDeleting: false,
                    showDeleteConfirmDialog: false,
                    showConfirmDialog: false,
                }, expanded: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, collapsed: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, queryCellInfo: function (args) { return cellStyle.setCellStyle(args); }, beginEdit: function (args) { return cellEditEvents.beginEdit(args, _this._configManagerWidgetDataModel); }, endEdit: function (args) { return cellEditEvents.endEdit(args, _this._configManagerWidgetDataModel); }, create: function (args) { return _this.treeGridCreated(); } }));
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: "displayName", headerText: "Name", width: "300", isTemplateColumn: true, templateID: "cmDisplayNameColumnTemplate" },
                    { field: "displayValue", headerText: "Value", width: "180", editType: "stringedit", editTemplate: cmTreeGridCellEditTemplate_1.CmTreeGridCellEditTemplate.createInstance() },
                    { field: "unit", headerText: "Unit", width: "100" },
                    { field: "description", headerText: "Description", width: "400" },
                ],
            };
        };
        /**
         * Returns the tree grid column resize settings
         *
         * @private
         * @returns {{}}
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.getTreeGridColumnResizeSupport = function () {
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
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.getTreeGridToolbarSupport = function () {
            var _this = this;
            this._toolbar = new cmTreeGridToolbar_1.CmTreeGridToolbar(this.mainDiv);
            return {
                toolbarSettings: {
                    showToolbar: true,
                    customToolbarItems: this._toolbar.getCustomToolbars()
                },
                toolbarClick: function (args) { return _this.toolbarClick(args); }
            };
        };
        ConfigManagerWidget.prototype.treeGridCreated = function () {
            // Sets the custom toolbar icons
            this._toolbar.setStyleForToolbarIcons();
        };
        ConfigManagerWidget.prototype.treeGridNodeExpandedOrCollapsed = function () {
            // Refresh to see correct expanded/collapsed icon
            this.refresh();
        };
        /**
         * Updates the grids data
         *
         * @private
         * @param {IDataModel} dataModel
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.updateGridData = function (dataModel) {
            var newDataModel = new configManagerWidgetDataModel_1.ConfigManagerWidgetDataModel(dataModel);
            if (this._configManagerWidgetDataModel != undefined) {
                // set expands states from the current to the new datamodel
                newDataModel.setExpandStates(this._configManagerWidgetDataModel.getDataModel());
                // detach datamodel changed events from old datamodel
                this._configManagerWidgetDataModel.eventDataModelChanged.detach(this._dataModelChangedHandler);
                this._configManagerWidgetDataModel.dispose();
            }
            this._configManagerWidgetDataModel = newDataModel;
            this._configManagerWidgetDataModel.eventDataModelChanged.attach(this._dataModelChangedHandler);
            this.refresh();
        };
        /**
         * refreshes the tree grids data
         *
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.refresh = function () {
            if (this._configManagerWidgetDataModel != undefined && this.refreshEnabled) {
                this.setModel(this._configManagerWidgetDataModel.getDataModel());
            }
        };
        return ConfigManagerWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.ConfigManagerWidget = ConfigManagerWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnTWFuYWdlcldpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb25maWdNYW5hZ2VyV2lkZ2V0L2NvbmZpZ01hbmFnZXJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBYUE7UUFBa0MsdUNBQWtCO1FBQXBEO1lBQUEscUVBbVRDO1lBOVNXLDhCQUF3QixHQUFHLFVBQUMsTUFBTSxFQUFFLFNBQVMsSUFBTyxLQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUM7WUF5QnhGLGNBQVEsR0FBK0MsbUJBQVEsQ0FBQyxNQUFNLENBQStCLEVBQUUsQ0FBQyxDQUFDOztRQXFSckgsQ0FBQztRQTVTRzs7Ozs7V0FLRztRQUNILGdEQUFrQixHQUFsQjtZQUNJLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQztRQUVELHlDQUFXLEdBQVg7WUFDSSxpQkFBTSxXQUFXLFdBQUUsQ0FBQztZQUVwQixpQkFBTSxnQkFBZ0IsWUFBQyxlQUFlLENBQUMsQ0FBQztZQUV4Qyw4QkFBOEI7WUFDOUIsaUJBQU0sZ0JBQWdCLFlBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFFRCxpREFBbUIsR0FBbkI7WUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLElBQUksdURBQTBCLEVBQUUsQ0FBQyxDQUFDO1FBQzFFLENBQUM7UUFVRCxzQkFBVyx3Q0FBTztZQUxsQjs7OztlQUlHO2lCQUNILFVBQW1CLFdBQXdEO2dCQUEzRSxpQkFlQztnQkFkRyxXQUFXLENBQUMsT0FBTyxDQUFDO29CQUNoQixLQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQztvQkFDNUIsb0NBQW9DO29CQUNwQyxLQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSSxDQUFDLDRCQUE0QixFQUFFLENB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cGF0aD1cIi4uLy4uL2xpYnMvdWkvVHlwZXMvZWoud2ViLmFsbC5kLnRzXCIgLz5cclxuaW1wb3J0IHsgQ29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbCB9IGZyb20gXCIuL21vZGVsL2NvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWxcIjtcclxuaW1wb3J0IHsgRXZlbnRNb2RlbENoYW5nZWRBcmdzLCBNb2RlbENoYW5nZVR5cGUsIElEYXRhTW9kZWwgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUcmVlR3JpZFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3RyZWVHcmlkV2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBDbVRyZWVHcmlkQ2VsbEVkaXRUZW1wbGF0ZSB9IGZyb20gXCIuL3ZpZXcvY21UcmVlR3JpZENlbGxFZGl0VGVtcGxhdGVcIjtcclxuaW1wb3J0IHsgQ21UcmVlR3JpZENlbGxFZGl0RXZlbnRzIH0gZnJvbSBcIi4vdmlldy9jbVRyZWVHcmlkQ2VsbEVkaXRFdmVudHNcIjtcclxuaW1wb3J0IHsgQ21UcmVlR3JpZENlbGxTdHlsZSB9IGZyb20gXCIuL3ZpZXcvY21UcmVlR3JpZENlbGxTdHlsZVwiO1xyXG5pbXBvcnQgeyBDbVRyZWVHcmlkVG9vbGJhciB9IGZyb20gXCIuL3ZpZXcvY21UcmVlR3JpZFRvb2xiYXJcIjtcclxuaW1wb3J0IHsgUHJvcGVydHkgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3Byb3BlcnR5XCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLCBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IElDb25maWdNYW5hZ2VyRGF0YU1vZGVsIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kYXRhTW9kZWxzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uIH0gZnJvbSBcIi4vY29tcG9uZW50RGVmYXVsdERlZmluaXRpb25cIjtcclxuXHJcbmNsYXNzIENvbmZpZ01hbmFnZXJXaWRnZXQgZXh0ZW5kcyBUcmVlR3JpZFdpZGdldEJhc2Uge1xyXG5cdFxyXG4gICAgcHJpdmF0ZSBfY29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbDogQ29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbHx1bmRlZmluZWQ7XHJcbiAgICBwcm90ZWN0ZWQgX3Rvb2xiYXIhOiBDbVRyZWVHcmlkVG9vbGJhcjtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfZGF0YU1vZGVsQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLCBldmVudEFyZ3MpID0+IHsgdGhpcy5oYW5kbGVHcmlkRW5kRWRpdChldmVudEFyZ3MpIH07XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB0aGUgaGVpZ2h0IG9mIHRoZSBoZWFkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZGVmaW5lSGVhZGVySGVpZ2h0KCk6IG51bWJlcntcclxuICAgICAgICByZXR1cm4gMzA7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZWQoKXtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplZCgpO1xyXG5cclxuICAgICAgICBzdXBlci5zZXRIZWFkZXJDb250ZW50KFwiQ29uZmlndXJhdGlvblwiKTtcclxuXHJcbiAgICAgICAgLy8gU2V0IGR5bmFtaWMgY29sdW1uIHNldHRpbmdzXHJcbiAgICAgICAgc3VwZXIuc2V0RHluYW1pY0NvbHVtbigzLCAxMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXREZWZhdWx0RGVmaW5pdGlvbihuZXcgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbWV0aG9kczpQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD4+ID0gUHJvcGVydHkuY3JlYXRlPE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10+KFtdKTtcclxuICAgIHB1YmxpYyBzYXZlUGFyYW1ldGVyc01ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2R8dW5kZWZpbmVkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgbWV0aG9kcyBkYXRhIGxpbmsgYXMgYSByZWZlcmVuY2UgdG8gdGhlIG1ldGhvZHMgdG8gYmUgZGlzcGxheWVkXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgbWV0aG9kcyhtZXRob2RzTGluazogUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+Pikge1xyXG4gICAgICAgIG1ldGhvZHNMaW5rLmNoYW5nZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9tZXRob2RzID0gbWV0aG9kc0xpbms7XHJcbiAgICAgICAgICAgIC8vIGdldCB0aGUgc2F2ZSBjb25maWd1cmF0aW9uIG1ldGhvZFxyXG4gICAgICAgICAgICB0aGlzLnNhdmVQYXJhbWV0ZXJzTWV0aG9kID0gdGhpcy5yZXRyaWV2ZVNhdmVQYXJhbWV0ZXJzTWV0aG9kKCk7XHJcbiAgICAgICAgICAgIC8vIGRpc2FibGUgc2F2ZSBidXR0b25cclxuICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlU2F2ZUJ1dHRvbih0cnVlKTtcclxuICAgICAgICAgICAgLy8gZW5hYmxlIHRoZSBzYXZlIGJ1dHRvbiBkZXBlbmRpbmcgb24gZXhlY3V0YWJsZSBzdGF0ZS5cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2F2ZVBhcmFtZXRlcnNNZXRob2QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzYWJsZVNhdmVCdXR0b24oIXRoaXMuc2F2ZVBhcmFtZXRlcnNNZXRob2QuaXNFeGVjdXRhYmxlLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZVBhcmFtZXRlcnNNZXRob2QuaXNFeGVjdXRhYmxlLmNoYW5nZWQoKGlzRXhlY3V0YWJsZSk9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVTYXZlQnV0dG9uKCFpc0V4ZWN1dGFibGUpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmV0cmlldmVTYXZlUGFyYW1ldGVyc01ldGhvZCgpOk1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9ke1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRob2RzLnZhbHVlLmZpbHRlcihtZXRob2QgPT4gbWV0aG9kLmJyb3dzZU5hbWUgPT0gXCJTYXZlIENvbmZpZ1wiKVswXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGNvbmZpZ3VyYXRpb25wYXJhbWV0ZXJzIGFzIHRoZSBkYXRhIHNvdXJjZSBmb3IgdGhlIGNvbmZpZ3VyYXRpb24gbWFuYWdlciB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzKGNvbXBvbmVudFBhcmFtZXRlcnM6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPj4pIHtcclxuICAgICAgIGxldCBjb25maWdNYW5hZ2VyRGF0YU1vZGVsID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLkNvbmZpZ01hbmFnZXJEYXRhTW9kZWwpIGFzIElDb25maWdNYW5hZ2VyRGF0YU1vZGVsO1xyXG4gICAgICAgIGlmKGNvbmZpZ01hbmFnZXJEYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgY29uZmlnTWFuYWdlckRhdGFNb2RlbC5jb25maWd1cmF0aW9uUGFyYW1ldGVycyA9IGNvbXBvbmVudFBhcmFtZXRlcnM7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YU1vZGVsID0gY29uZmlnTWFuYWdlckRhdGFNb2RlbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBsYXlvdXQgb2YgdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZUxheW91dCgpIHtcclxuICAgICAgICB0aGlzLm1haW5EaXYuc3R5bGUub3ZlcmZsb3cgPVwiaGlkZGVuXCI7XHJcbiAgICAgICAgJCh0aGlzLm1haW5EaXYpLmFwcGVuZCh0aGlzLmdldFNjcmlwdEluZm9ybWF0aW9uRm9yVHJlZUdyaWQoKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc3VwZXIuY3JlYXRlTGF5b3V0KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgZ2V0U2NyaXB0SW5mb3JtYXRpb25Gb3JUcmVlR3JpZCgpIDogc3RyaW5ne1xyXG5cdFx0dmFyIHN0ciA9XHJcblx0XHRgPHNjcmlwdCB0eXBlPVwidGV4dC94LWpzcmVuZGVyXCIgaWQ9XCJjbURpc3BsYXlOYW1lQ29sdW1uVGVtcGxhdGVcIj5cclxuXHRcdFx0XHQ8ZGl2IHN0eWxlPSdoZWlnaHQ6MjBweDsnIHVuc2VsZWN0YWJsZT0nb24nPlxyXG5cdFx0XHRcdFx0e3tpZiBoYXNDaGlsZFJlY29yZHN9fVxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPSdpbnRlbmQnIHN0eWxlPSdoZWlnaHQ6MXB4OyBmbG9hdDpsZWZ0OyB3aWR0aDp7ezpsZXZlbCoyMH19cHg7IGRpc3BsYXk6aW5saW5lLWJsb2NrOyc+PC9kaXY+XHJcblx0XHRcdFx0XHR7e2Vsc2UgIWhhc0NoaWxkUmVjb3Jkc319XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9J2ludGVuZCcgc3R5bGU9J2hlaWdodDoxcHg7IGZsb2F0OmxlZnQ7IHdpZHRoOnt7OmxldmVsKjIwfX1weDsgZGlzcGxheTppbmxpbmUtYmxvY2s7Jz48L2Rpdj5cclxuXHRcdFx0XHRcdHt7L2lmfX1cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9JyB7e2lmIGV4cGFuZGVkfX1lLXRyZWVncmlkZXhwYW5kIGUtY210cmVlZ3JpZGV4cGFuZCB7e2Vsc2UgaGFzQ2hpbGRSZWNvcmRzfX1lLXRyZWVncmlkY29sbGFwc2UgZS1jbXRyZWVncmlkY29sbGFwc2Uge3svaWZ9fSB7e2lmICFleHBhbmRlZCAmJiAhaGFzQ2hpbGRSZWNvcmRzfX1lLWRvYyBlLWNtZG9je3svaWZ9fScgc3R5bGU9J2hlaWdodDoyMHB4O3dpZHRoOjMwcHg7bWFyZ2luOmF1dG87ZmxvYXQ6bGVmdDttYXJnaW4tbGVmdDoxMHB4Oyc+PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPSdlLWNlbGwnIHN0eWxlPSdkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDoxMDAlJyB1bnNlbGVjdGFibGU9J29uJz57ezojZGF0YVsnZGlzcGxheU5hbWUnXX19PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHQ8L3NjcmlwdD5gXHJcblxyXG4gICAgICByZXR1cm4gc3RyO1xyXG5cdH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWQgdGhlIHN0eWxlcyBmb3IgdGhlIGNvbmZpZyBtYW5hZ2VyXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgbG9hZFN0eWxlcygpe1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9jb25maWdNYW5hZ2VyV2lkZ2V0L3N0eWxlL2Nzcy90cmVlR3JpZEljb25TdHlsZXMuY3NzXCIpO1xyXG4gICAgfVxyXG5cclxuXHRoYW5kbGVNb2RlbENoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBkYXRhOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpOiBhbnkge1xyXG5cdFx0dGhpcy51cGRhdGVHcmlkRGF0YShzZW5kZXIpO1xyXG5cdFx0XHJcblx0XHQvLyBhZnRlciBwb3B1bGF0aW5nIHRoZSBjb25maWd1cmF0aW9uUGFyYW1ldGVzIHdlIHN0YXJ0IG9ic2VydmluZyBjaGFuZ2VzIG9mIHRoZSBwYXJhbWV0ZXJzXHJcblx0XHQvL3RoaXMuc3RhcnRPYnNlcnZpbmdDb25maWd1cmF0aW9uUGFyYW1ldGVycygoPENvbmZpZ01hbmFnZXJEYXRhTW9kZWw+dGhpcy5kYXRhTW9kZWwpLl9hY3R1YWxDb21wb25lbnREYXRhKTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcbiAgICAgKiBIYW5kbGVzIHRoZSBjaGFuZ2VzIG9mIG9ic2VydmVkIGl0ZW1zIHJlcXVlc3RlZCBieSAnb2JzZXJ2ZURhdGFNb2RlbEl0ZW1zJ1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SURhdGFNb2RlbH0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50TW9kZWxDaGFuZ2VkQXJnc30gZXZlbnRBcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBoYW5kbGVNb2RlbEl0ZW1zQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGV2ZW50QXJnczogRXZlbnRNb2RlbENoYW5nZWRBcmdzKSB7XHJcblx0XHR0aGlzLnVwZGF0ZUdyaWREYXRhKHNlbmRlcik7XHJcblx0fVxyXG5cdFxyXG4gICAgaGFuZGxlR3JpZEVuZEVkaXQoYXJnczogYW55KTogYW55IHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgY2hhbmdlSGludCA9IHtcclxuICAgICAgICAgICAgaGludDogXCJjaGFuZ2VkIHBhcmFtZXRlciB2YWx1ZVwiLFxyXG4gICAgICAgICAgICBjaGFuZ2VkSXRlbURhdGEgOiBhcmdzLmNoYW5nZWRJdGVtRGF0YSwgIFxyXG4gICAgICAgICAgICBuZXdJdGVtRGF0YSA6IGFyZ3MubmV3SXRlbURhdGEsIFxyXG4gICAgICAgIH1cclxuXHRcdHZhciBldmVudEFyZ3MgPSBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVTb3VyY2UsIGNoYW5nZUhpbnQsIHRoaXMuZGF0YU1vZGVsKTtcclxuXHRcdHRoaXMuZGF0YU1vZGVsIS5vbk1vZGVsQ2hhbmdlZCh0aGlzLmRhdGFNb2RlbCEsIGV2ZW50QXJncyk7XHJcbiAgICB9XHJcblxyXG5cdC8qKlxyXG4gICAgICogQWN0aXZhdGUgdGhlIGNvbmZpZ21hbmFnZXJ3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBhY3RpdmF0ZSgpe1xyXG4gICAgICAgIGlmKCg8YW55PnRoaXMuZGF0YU1vZGVsKS5fYWN0dWFsQ29tcG9uZW50RGF0YSl7XHJcbiAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLmFjdGl2YXRlQ29tcG9uZW50TW9kZWxJdGVtcyh0aGlzLmRhdGFNb2RlbCwoPGFueT50aGlzLmRhdGFNb2RlbCkuX2FjdHVhbENvbXBvbmVudERhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWFjdGl2YXRlIHRoZSBjb25maWdtYW5hZ2Vyd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZGVhY3RpdmF0ZSgpe1xyXG4gICAgICAgIGlmKCg8YW55PnRoaXMuZGF0YU1vZGVsKS5fYWN0dWFsQ29tcG9uZW50RGF0YSl7XHJcbiAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLmRlYWN0aXZhdGVDb21wb25lbnRNb2RlbEl0ZW1zKHRoaXMuZGF0YU1vZGVsLCg8YW55PnRoaXMuZGF0YU1vZGVsKS5fYWN0dWFsQ29tcG9uZW50RGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZSB0aGUgY29uZmlnbWFuYWdlcndpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICBpZigoPGFueT50aGlzLmRhdGFNb2RlbCkuX2FjdHVhbENvbXBvbmVudERhdGEpe1xyXG4gICAgICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlci51bm9ic2VydmVDb21wb25lbnRNb2RlbEl0ZW1zKHRoaXMuZGF0YU1vZGVsLCg8YW55PnRoaXMuZGF0YU1vZGVsKS5fYWN0dWFsQ29tcG9uZW50RGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmRhdGFNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFNb2RlbC5kaXNwb3NlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcbiAgICAgIFxyXG5cdC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgdHJlZSBncmlkIGZvciB0aGUgY29uZmlndXJhdGlvbiBzdHJ1Y3R1cmVcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlVHJlZUdyaWQoKXtcclxuICAgICAgICBsZXQgY2VsbEVkaXRFdmVudHMgPSBuZXcgQ21UcmVlR3JpZENlbGxFZGl0RXZlbnRzKCk7XHJcbiAgICAgICAgbGV0IGNlbGxTdHlsZSA9IG5ldyBDbVRyZWVHcmlkQ2VsbFN0eWxlKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJCh0aGlzLm1haW5EaXYpLmVqVHJlZUdyaWQoe1xyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkVG9vbGJhclN1cHBvcnQoKSxcdFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZGF0YVNvdXJjZTogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBjaGlsZE1hcHBpbmc6XCJjaGlsZHNcIixcclxuICAgICAgICAgICAgZXhwYW5kU3RhdGVNYXBwaW5nOiBcImV4cGFuZFN0YXRlXCIsXHJcbiAgICAgICAgICAgIGlzUmVzcG9uc2l2ZTogZmFsc2UsICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGFsbG93UmVvcmRlcmluZzogZmFsc2UsXHJcbiAgICAgICAgICAgIGVkaXRTZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgYWxsb3dFZGl0aW5nOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYWxsb3dEZWxldGluZyA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2hvd0RlbGV0ZUNvbmZpcm1EaWFsb2cgIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzaG93Q29uZmlybURpYWxvZyAgOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgXHJcblx0XHRcdGV4cGFuZGVkOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZE5vZGVFeHBhbmRlZE9yQ29sbGFwc2VkKCksXHJcblx0XHRcdGNvbGxhcHNlZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWROb2RlRXhwYW5kZWRPckNvbGxhcHNlZCgpLFxyXG4gICAgICAgICAgICBxdWVyeUNlbGxJbmZvOiAoYXJncykgPT4gY2VsbFN0eWxlLnNldENlbGxTdHlsZShhcmdzKSxcclxuICAgICAgICAgICAgYmVnaW5FZGl0OiAoYXJncykgPT4gY2VsbEVkaXRFdmVudHMuYmVnaW5FZGl0KGFyZ3MsIHRoaXMuX2NvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWwpLFxyXG4gICAgICAgICAgICBlbmRFZGl0OiAoYXJncykgPT4gY2VsbEVkaXRFdmVudHMuZW5kRWRpdChhcmdzLCB0aGlzLl9jb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsKSxcclxuICAgICAgICAgICAgY3JlYXRlOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZENyZWF0ZWQoKSxcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiBkZWZpbml0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCk6IHt9e1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZGlzcGxheU5hbWVcIiwgaGVhZGVyVGV4dDogXCJOYW1lXCIsIHdpZHRoOiBcIjMwMFwiLCBpc1RlbXBsYXRlQ29sdW1uOiB0cnVlLCB0ZW1wbGF0ZUlEOiBcImNtRGlzcGxheU5hbWVDb2x1bW5UZW1wbGF0ZVwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImRpc3BsYXlWYWx1ZVwiLCBoZWFkZXJUZXh0OiBcIlZhbHVlXCIsIHdpZHRoOiBcIjE4MFwiLCBlZGl0VHlwZTogXCJzdHJpbmdlZGl0XCIsIGVkaXRUZW1wbGF0ZTogQ21UcmVlR3JpZENlbGxFZGl0VGVtcGxhdGUuY3JlYXRlSW5zdGFuY2UoKX0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcInVuaXRcIiwgaGVhZGVyVGV4dDogXCJVbml0XCIsIHdpZHRoOiBcIjEwMFwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImRlc2NyaXB0aW9uXCIsIGhlYWRlclRleHQ6IFwiRGVzY3JpcHRpb25cIiwgd2lkdGg6IFwiNDAwXCIgfSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiByZXNpemUgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtblJlc2l6ZVN1cHBvcnQoKToge317XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWxsb3dDb2x1bW5SZXNpemU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbHVtblJlc2l6ZVNldHRpbmdzOiB7IGNvbHVtblJlc2l6ZU1vZGU6IGVqLlRyZWVHcmlkLkNvbHVtblJlc2l6ZU1vZGUuRml4ZWRDb2x1bW5zIH0sXHJcbiAgICAgICAgICAgIGNvbHVtblJlc2l6ZWQ6IChhcmdzKSA9PiBzdXBlci5yZXNpemVEeW5hbWljQ29sdW1uKGFyZ3MuY29sdW1uSW5kZXgsIGFyZ3MubW9kZWwpLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgdG9vbGJhciBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkVG9vbGJhclN1cHBvcnQoKToge317XHJcbiAgICAgICAgdGhpcy5fdG9vbGJhciA9IG5ldyBDbVRyZWVHcmlkVG9vbGJhcih0aGlzLm1haW5EaXYpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRvb2xiYXJTZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgc2hvd1Rvb2xiYXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21Ub29sYmFySXRlbXM6IHRoaXMuX3Rvb2xiYXIuZ2V0Q3VzdG9tVG9vbGJhcnMoKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0b29sYmFyQ2xpY2s6IChhcmdzKSA9PiB0aGlzLnRvb2xiYXJDbGljayhhcmdzKVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZENyZWF0ZWQoKXtcclxuICAgICAgICAvLyBTZXRzIHRoZSBjdXN0b20gdG9vbGJhciBpY29uc1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIuc2V0U3R5bGVGb3JUb29sYmFySWNvbnMoKTtcclxuICAgIH1cdFxyXG5cclxuICAgIHByaXZhdGUgdHJlZUdyaWROb2RlRXhwYW5kZWRPckNvbGxhcHNlZCgpe1xyXG4gICAgICAgIC8vIFJlZnJlc2ggdG8gc2VlIGNvcnJlY3QgZXhwYW5kZWQvY29sbGFwc2VkIGljb25cclxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgIH1cclxuXHJcblx0LyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBncmlkcyBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SURhdGFNb2RlbH0gZGF0YU1vZGVsXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUdyaWREYXRhKGRhdGFNb2RlbDogSURhdGFNb2RlbCkge1xyXG4gICAgICAgIGxldCBuZXdEYXRhTW9kZWwgPSBuZXcgQ29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbChkYXRhTW9kZWwpO1xyXG4gICAgICAgIGlmKHRoaXMuX2NvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gc2V0IGV4cGFuZHMgc3RhdGVzIGZyb20gdGhlIGN1cnJlbnQgdG8gdGhlIG5ldyBkYXRhbW9kZWxcclxuICAgICAgICAgICAgbmV3RGF0YU1vZGVsLnNldEV4cGFuZFN0YXRlcyh0aGlzLl9jb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsLmdldERhdGFNb2RlbCgpKTtcclxuICAgICAgICAgICAgLy8gZGV0YWNoIGRhdGFtb2RlbCBjaGFuZ2VkIGV2ZW50cyBmcm9tIG9sZCBkYXRhbW9kZWxcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbC5ldmVudERhdGFNb2RlbENoYW5nZWQuZGV0YWNoKHRoaXMuX2RhdGFNb2RlbENoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbC5kaXNwb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2NvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWwgPSBuZXdEYXRhTW9kZWw7XHJcblx0XHR0aGlzLl9jb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsLmV2ZW50RGF0YU1vZGVsQ2hhbmdlZC5hdHRhY2godGhpcy5fZGF0YU1vZGVsQ2hhbmdlZEhhbmRsZXIpO1xyXG5cdFx0dGhpcy5yZWZyZXNoKCk7XHJcblx0fVxyXG5cdCAgICAgICBcclxuICAgIC8qKlxyXG4gICAgICogcmVmcmVzaGVzIHRoZSB0cmVlIGdyaWRzIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVmcmVzaCgpe1xyXG4gICAgICAgIGlmKHRoaXMuX2NvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWwgIT0gdW5kZWZpbmVkICYmIHRoaXMucmVmcmVzaEVuYWJsZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnNldE1vZGVsKHRoaXMuX2NvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWwuZ2V0RGF0YU1vZGVsKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgQ29uZmlnTWFuYWdlcldpZGdldCB9OyJdfQ==