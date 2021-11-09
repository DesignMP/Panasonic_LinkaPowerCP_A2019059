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
define(["require", "exports", "../../framework/events", "./view/methodsGridToolbar", "../common/treeGridWidgetBase", "../../models/online/mappCockpitComponent", "../../models/online/mappCockpitComponentReflection", "../common/domHelper", "./componentDefaultDefinition", "../../common/componentBase/contextIds/ctxComponentView"], function (require, exports, events_1, methodsGridToolbar_1, treeGridWidgetBase_1, mappCockpitComponent_1, mappCockpitComponentReflection_1, domHelper_1, componentDefaultDefinition_1, ctxComponentView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventSelectionChanged = /** @class */ (function (_super) {
        __extends(EventSelectionChanged, _super);
        function EventSelectionChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventSelectionChanged;
    }(events_1.TypedEvent));
    ;
    /**
     * implements the MethodList widget
     *
     * @class MethodListWidget
     * @extends {WidgetBase}
     */
    var MethodListWidget = /** @class */ (function (_super) {
        __extends(MethodListWidget, _super);
        function MethodListWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.eventSelectionChanged = new EventSelectionChanged();
            _this._executableMethods = [];
            _this._quickCommands = [];
            _this._watchableParameters = [];
            return _this;
        }
        MethodListWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        MethodListWidget.prototype.initialized = function () {
            var context = this.component.context;
            if (context != undefined) {
                var componentIdFromContext = context.getContext(ctxComponentView_1.CtxComponentView.componentId);
                if (componentIdFromContext != undefined) {
                    // TODO: create binding to methods with context info
                }
            }
        };
        Object.defineProperty(MethodListWidget.prototype, "quickCommands", {
            set: function (quickCommands) {
                this._quickCommands = quickCommands;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MethodListWidget.prototype, "watchableParameters", {
            set: function (watchableParameters) {
                this._watchableParameters = watchableParameters;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MethodListWidget.prototype, "methods", {
            /**
             * Sets the methods data link as a reference to the methods to be displayed
             *
             * @memberof MethodListWidget
             */
            set: function (methods) {
                var _this = this;
                this._executableMethods = methods;
                // initialize the method parameters default values
                this._executableMethods.forEach(function (executableMethod) {
                    mappCockpitComponentReflection_1.MappCockpitComponentMethodInfo.updateMethodInputParameters(executableMethod);
                    _this.observeMethodExecutability(executableMethod);
                });
                this.addToolBarButtons();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Observes if the executability of the methods has changed
         *
         * @private
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.observeMethodExecutability = function (method) {
            var _this = this;
            method.isExecutable.changed(function (isExecutable) {
                _this.updateMethodsList();
            });
        };
        /**
         * Activates the method list widget
         *
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.activate = function () {
        };
        /**
         * Dispose some objects from the widget
         *
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.dispose = function () {
            if (this._methodsToolbar != undefined) {
                this._methodsToolbar.dispose();
            }
            mappCockpitComponent_1.MappCockpitComponentParameter.unobserveComponentModelItems(this, this._watchableParameters);
            _super.prototype.dispose.call(this);
        };
        /**
         * Loads the styles for the method list toolbar buttons
         *
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.loadStyles = function () {
            _super.prototype.addStyle.call(this, "widgets/methodListWidget/style/css/methodListToolbarButtonStyle.css");
        };
        /**
         * Creates the tree grid for the methods list
         *
         * @protected
         * @returns {*}
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.createTreeGrid = function () {
            var _this = this;
            var methodsDataSource = [{}];
            $(this.mainDiv).ejTreeGrid(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridToolbarSupport()), { dataSource: methodsDataSource, editSettings: {
                    allowDeleting: false,
                    showDeleteConfirmDialog: false,
                    showConfirmDialog: false
                }, isResponsive: false, rowSelected: function (args) { return _this.handleMethodListItemSelected(args); }, create: function (args) { return _this.treeGridCreated(); }, queryCellInfo: function (args) { return _this.showMethodDisabledIfNotExecutable(args); } }));
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: "displayName", headerText: "Command", width: "250" },
                ],
            };
        };
        /**
         * Returns the tree grid toolbar settings
         *
         * @private
         * @returns {{}}
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.getTreeGridToolbarSupport = function () {
            this._methodsToolbar = new methodsGridToolbar_1.MethodGridToolbar();
            return {
                toolbarSettings: {
                    showToolbar: true,
                    customToolbarItems: this._methodsToolbar.getDefaultToolbarButtons()
                },
            };
        };
        /**
         * Add toolbar buttons with quickCommands info
         *
         * @private
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.addToolBarButtons = function () {
            if (this._quickCommands.length > 0) {
                this.addToolbarSettingsToTreeGrid();
                this.addQuickCommandButtons();
            }
            else {
                this.updateMethodsList();
                this._methodsToolbar.addDefaultToolbarButtons();
            }
            this._methodsToolbar.setActualComponentMethods(this._executableMethods);
        };
        /**
         * Add quick command buttons to treegrid's toolbar
         *
         * @private
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.addQuickCommandButtons = function () {
            var _this = this;
            this._quickCommands.forEach(function (command) {
                _this._methodsToolbar.addQuickCommandsToolbarButtons(command.name, command.imageName);
            });
        };
        MethodListWidget.prototype.treeGridCreated = function () {
            this._methodsToolbar.initToolbar(this.mainDiv);
            // Resize needed because toolbar size is changed
            this.resize(this.width, this.height);
        };
        MethodListWidget.prototype.showMethodDisabledIfNotExecutable = function (args) {
            if (args.column.field == "displayName") {
                if (args.data.item != undefined && args.data.item.isExecutable != undefined) {
                    if (args.cellElement.classList != undefined) {
                        // Show ReadOnly cell with other color
                        var disableTreeCellClassName = "treeCellDisabled";
                        if (args.data.item.isExecutable.value == false) {
                            args.cellElement.classList.add(disableTreeCellClassName);
                        }
                        else {
                            args.cellElement.classList.remove(disableTreeCellClassName);
                        }
                    }
                    domHelper_1.DomHelper.disableElement(args.cellElement, !args.data.item.isExecutable.value);
                }
            }
        };
        /**
         * updates the commands data
         *
         * @private
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.updateMethodsList = function () {
            $(this.mainDiv).ejTreeGrid({
                dataSource: this._executableMethods
            });
        };
        /**
         * First time treegrid is updated, toolbar buttons are inserted
         *
         * @private
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.addToolbarSettingsToTreeGrid = function () {
            $(this.mainDiv).ejTreeGrid({
                dataSource: this._executableMethods,
                toolbarSettings: {
                    customToolbarItems: this._methodsToolbar.getCustomToolbars(this._quickCommands)
                }
            });
        };
        /**
         * handles selections of method items
         *
         * @param {*} args
         * @returns {*}
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.handleMethodListItemSelected = function (args) {
            // update the method parameter list after a method has been selected.
            if (args.data.item && args.data.item instanceof mappCockpitComponent_1.MappCockpitComponentMethod) {
                this.onSelectionChanged(args.data.item);
            }
        };
        MethodListWidget.prototype.onSelectionChanged = function (method) {
            this.eventSelectionChanged.raise(null, method);
        };
        return MethodListWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.MethodListWidget = MethodListWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0aG9kTGlzdFdpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9tZXRob2RMaXN0V2lkZ2V0L21ldGhvZExpc3RXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBVUE7UUFBb0MseUNBQTRDO1FBQWhGOztRQUFrRixDQUFDO1FBQUQsNEJBQUM7SUFBRCxDQUFDLEFBQW5GLENBQW9DLG1CQUFVLEdBQXFDO0lBQUEsQ0FBQztJQUVwRjs7Ozs7T0FLRztJQUNIO1FBQStCLG9DQUFrQjtRQUFqRDtZQUFBLHFFQTJQQztZQXpQRywyQkFBcUIsR0FBRyxJQUFJLHFCQUFxQixFQUFFLENBQUM7WUFHNUMsd0JBQWtCLEdBQWlDLEVBQUUsQ0FBQztZQUN0RCxvQkFBYyxHQUF3QyxFQUFFLENBQUM7WUFDekQsMEJBQW9CLEdBQXFDLEVBQUUsQ0FBQzs7UUFvUHhFLENBQUM7UUFsUEcsOENBQW1CLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLHVEQUEwQixFQUFFLENBQUMsQ0FBQztZQUN0RSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUVELHNDQUFXLEdBQVg7WUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztZQUNyQyxJQUFHLE9BQU8sSUFBSSxTQUFTLEVBQUM7Z0JBQ3BCLElBQUksc0JBQXNCLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxtQ0FBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDOUUsSUFBRyxzQkFBc0IsSUFBSSxTQUFTLEVBQUM7b0JBQ25DLG9EQUFvRDtpQkFFdkQ7YUFDSjtRQUNMLENBQUM7UUFFRCxzQkFBVywyQ0FBYTtpQkFBeEIsVUFBeUIsYUFBc0Q7Z0JBQzNFLElBQUksQ0FBQyxj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LENBQUM7UUFDUCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsdURBQTRCLEdBQTVCLFVBQTZCLElBQVM7WUFDbEMscUVBQXFFO1lBQ3JFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLFlBQVksaURBQTBCLEVBQUU7Z0JBRXhFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQWtDLENBQUMsQ0FBQzthQUN6RTtRQUNMLENBQUM7UUFFTyw2Q0FBa0IsR0FBMUIsVUFBMkIsTUFBa0M7WUFDekQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbkQsQ0FBQztRQUNMLHVCQUFDO0lBQUQsQ0FBQyxBQTNQRCxDQUErQix1Q0FBa0IsR0EyUGhEO0lBRVEsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU1ldGhvZExpc3RXaWRnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL21ldGhvZExpc3RXaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IE1ldGhvZEdyaWRUb29sYmFyIH0gZnJvbSBcIi4vdmlldy9tZXRob2RzR3JpZFRvb2xiYXJcIjtcclxuaW1wb3J0IHsgVHJlZUdyaWRXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi90cmVlR3JpZFdpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QsIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLCBNYXBwQ29ja3BpdFF1aWNrQ29tbWFuZFBhcmFtZXRlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mbyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50UmVmbGVjdGlvblwiO1xyXG5pbXBvcnQgeyBEb21IZWxwZXIgfSBmcm9tIFwiLi4vY29tbW9uL2RvbUhlbHBlclwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiB9IGZyb20gXCIuL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IEN0eENvbXBvbmVudFZpZXcgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29udGV4dElkcy9jdHhDb21wb25lbnRWaWV3XCI7XHJcblxyXG5jbGFzcyBFdmVudFNlbGVjdGlvbkNoYW5nZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PG51bGwsIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kPnsgfTtcclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIHRoZSBNZXRob2RMaXN0IHdpZGdldFxyXG4gKlxyXG4gKiBAY2xhc3MgTWV0aG9kTGlzdFdpZGdldFxyXG4gKiBAZXh0ZW5kcyB7V2lkZ2V0QmFzZX1cclxuICovXHJcbmNsYXNzIE1ldGhvZExpc3RXaWRnZXQgZXh0ZW5kcyBUcmVlR3JpZFdpZGdldEJhc2UgaW1wbGVtZW50cyBJTWV0aG9kTGlzdFdpZGdldCB7XHJcblxyXG4gICAgZXZlbnRTZWxlY3Rpb25DaGFuZ2VkID0gbmV3IEV2ZW50U2VsZWN0aW9uQ2hhbmdlZCgpO1xyXG5cclxuICAgIHByaXZhdGUgX21ldGhvZHNUb29sYmFyITogTWV0aG9kR3JpZFRvb2xiYXI7XHJcbiAgICBwcml2YXRlIF9leGVjdXRhYmxlTWV0aG9kczogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfcXVpY2tDb21tYW5kcyA6IE1hcHBDb2NrcGl0UXVpY2tDb21tYW5kUGFyYW1ldGVyW10gPSBbXTtcclxuICAgIHByaXZhdGUgX3dhdGNoYWJsZVBhcmFtZXRlcnMgOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdID0gW107XHJcbiAgICBcclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXREZWZhdWx0RGVmaW5pdGlvbihuZXcgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24oKSk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplZCgpe1xyXG4gICAgICAgIGxldCBjb250ZXh0ID0gdGhpcy5jb21wb25lbnQuY29udGV4dDtcclxuICAgICAgICBpZihjb250ZXh0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBjb21wb25lbnRJZEZyb21Db250ZXh0ID0gY29udGV4dC5nZXRDb250ZXh0KEN0eENvbXBvbmVudFZpZXcuY29tcG9uZW50SWQpO1xyXG4gICAgICAgICAgICBpZihjb21wb25lbnRJZEZyb21Db250ZXh0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBjcmVhdGUgYmluZGluZyB0byBtZXRob2RzIHdpdGggY29udGV4dCBpbmZvXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgcXVpY2tDb21tYW5kcyhxdWlja0NvbW1hbmRzOiBBcnJheTxNYXBwQ29ja3BpdFF1aWNrQ29tbWFuZFBhcmFtZXRlcj4pIHtcclxuICAgICAgICB0aGlzLl9xdWlja0NvbW1hbmRzID0gcXVpY2tDb21tYW5kcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHdhdGNoYWJsZVBhcmFtZXRlcnMod2F0Y2hhYmxlUGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+KSB7XHJcbiAgICAgICAgdGhpcy5fd2F0Y2hhYmxlUGFyYW1ldGVycyA9IHdhdGNoYWJsZVBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgbWV0aG9kcyBkYXRhIGxpbmsgYXMgYSByZWZlcmVuY2UgdG8gdGhlIG1ldGhvZHMgdG8gYmUgZGlzcGxheWVkXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgbWV0aG9kcyhtZXRob2RzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD4pIHtcclxuICAgICAgICB0aGlzLl9leGVjdXRhYmxlTWV0aG9kcyA9IG1ldGhvZHM7XHJcbiAgICAgICAgLy8gaW5pdGlhbGl6ZSB0aGUgbWV0aG9kIHBhcmFtZXRlcnMgZGVmYXVsdCB2YWx1ZXNcclxuICAgICAgICB0aGlzLl9leGVjdXRhYmxlTWV0aG9kcy5mb3JFYWNoKChleGVjdXRhYmxlTWV0aG9kKT0+eyBcclxuICAgICAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvLnVwZGF0ZU1ldGhvZElucHV0UGFyYW1ldGVycyhleGVjdXRhYmxlTWV0aG9kKTtcclxuICAgICAgICAgICAgdGhpcy5vYnNlcnZlTWV0aG9kRXhlY3V0YWJpbGl0eShleGVjdXRhYmxlTWV0aG9kKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuYWRkVG9vbEJhckJ1dHRvbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9ic2VydmVzIGlmIHRoZSBleGVjdXRhYmlsaXR5IG9mIHRoZSBtZXRob2RzIGhhcyBjaGFuZ2VkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb2JzZXJ2ZU1ldGhvZEV4ZWN1dGFiaWxpdHkobWV0aG9kKSB7XHJcbiAgICAgICAgbWV0aG9kLmlzRXhlY3V0YWJsZS5jaGFuZ2VkKChpc0V4ZWN1dGFibGUpPT57XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTWV0aG9kc0xpc3QoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWN0aXZhdGVzIHRoZSBtZXRob2QgbGlzdCB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBhY3RpdmF0ZSgpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2Ugc29tZSBvYmplY3RzIGZyb20gdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICBpZih0aGlzLl9tZXRob2RzVG9vbGJhciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9tZXRob2RzVG9vbGJhci5kaXNwb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLnVub2JzZXJ2ZUNvbXBvbmVudE1vZGVsSXRlbXModGhpcyx0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgc3R5bGVzIGZvciB0aGUgbWV0aG9kIGxpc3QgdG9vbGJhciBidXR0b25zXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZExpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgbG9hZFN0eWxlcygpIHtcclxuICAgICAgICBzdXBlci5hZGRTdHlsZShcIndpZGdldHMvbWV0aG9kTGlzdFdpZGdldC9zdHlsZS9jc3MvbWV0aG9kTGlzdFRvb2xiYXJCdXR0b25TdHlsZS5jc3NcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSB0cmVlIGdyaWQgZm9yIHRoZSBtZXRob2RzIGxpc3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVUcmVlR3JpZCgpIHtcclxuICAgICAgICB2YXIgbWV0aG9kc0RhdGFTb3VyY2UgPSBbe31dO1xyXG5cclxuICAgICAgICAkKHRoaXMubWFpbkRpdikuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpLFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZGF0YVNvdXJjZTogbWV0aG9kc0RhdGFTb3VyY2UsXHJcbiAgICAgICAgICAgIGVkaXRTZXR0aW5nczogeyBcclxuICAgICAgICAgICAgICAgIGFsbG93RGVsZXRpbmcgOiBmYWxzZSAsXHJcbiAgICAgICAgICAgICAgICBzaG93RGVsZXRlQ29uZmlybURpYWxvZyAgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNob3dDb25maXJtRGlhbG9nICA6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGlzUmVzcG9uc2l2ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHJvd1NlbGVjdGVkOiAoYXJncykgPT4gdGhpcy5oYW5kbGVNZXRob2RMaXN0SXRlbVNlbGVjdGVkKGFyZ3MpLFxyXG4gICAgICAgICAgICBjcmVhdGU6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkQ3JlYXRlZCgpLFxyXG4gICAgICAgICAgICBxdWVyeUNlbGxJbmZvOiAoYXJncykgPT4gdGhpcy5zaG93TWV0aG9kRGlzYWJsZWRJZk5vdEV4ZWN1dGFibGUoYXJncyksXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIGRlZmluaXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZExpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKToge317XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29sdW1uczogW1xyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJkaXNwbGF5TmFtZVwiLCBoZWFkZXJUZXh0OiBcIkNvbW1hbmRcIiwgd2lkdGg6IFwiMjUwXCJ9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgdG9vbGJhciBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkVG9vbGJhclN1cHBvcnQoKToge317XHJcbiAgICAgICAgdGhpcy5fbWV0aG9kc1Rvb2xiYXIgPSBuZXcgTWV0aG9kR3JpZFRvb2xiYXIoKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b29sYmFyU2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgIHNob3dUb29sYmFyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tVG9vbGJhckl0ZW1zOiB0aGlzLl9tZXRob2RzVG9vbGJhci5nZXREZWZhdWx0VG9vbGJhckJ1dHRvbnMoKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgdG9vbGJhciBidXR0b25zIHdpdGggcXVpY2tDb21tYW5kcyBpbmZvXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkVG9vbEJhckJ1dHRvbnMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3F1aWNrQ29tbWFuZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFRvb2xiYXJTZXR0aW5nc1RvVHJlZUdyaWQoKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRRdWlja0NvbW1hbmRCdXR0b25zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1ldGhvZHNMaXN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX21ldGhvZHNUb29sYmFyLmFkZERlZmF1bHRUb29sYmFyQnV0dG9ucygpO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgdGhpcy5fbWV0aG9kc1Rvb2xiYXIuc2V0QWN0dWFsQ29tcG9uZW50TWV0aG9kcyh0aGlzLl9leGVjdXRhYmxlTWV0aG9kcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgcXVpY2sgY29tbWFuZCBidXR0b25zIHRvIHRyZWVncmlkJ3MgdG9vbGJhclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFF1aWNrQ29tbWFuZEJ1dHRvbnMoKSB7XHJcbiAgICAgICAgdGhpcy5fcXVpY2tDb21tYW5kcy5mb3JFYWNoKChjb21tYW5kKT0+IHtcclxuICAgICAgICAgICAgdGhpcy5fbWV0aG9kc1Rvb2xiYXIuYWRkUXVpY2tDb21tYW5kc1Rvb2xiYXJCdXR0b25zKGNvbW1hbmQubmFtZSwgY29tbWFuZC5pbWFnZU5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkQ3JlYXRlZCgpe1xyXG4gICAgICAgIHRoaXMuX21ldGhvZHNUb29sYmFyLmluaXRUb29sYmFyKHRoaXMubWFpbkRpdik7XHJcbiAgICAgICAgLy8gUmVzaXplIG5lZWRlZCBiZWNhdXNlIHRvb2xiYXIgc2l6ZSBpcyBjaGFuZ2VkXHJcbiAgICAgICAgdGhpcy5yZXNpemUodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd01ldGhvZERpc2FibGVkSWZOb3RFeGVjdXRhYmxlKGFyZ3Mpe1xyXG5cclxuICAgICAgICBpZiAoYXJncy5jb2x1bW4uZmllbGQgPT0gXCJkaXNwbGF5TmFtZVwiKXtcclxuICAgICAgICAgICAgaWYoYXJncy5kYXRhLml0ZW0gIT0gdW5kZWZpbmVkICYmIGFyZ3MuZGF0YS5pdGVtLmlzRXhlY3V0YWJsZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgaWYoYXJncy5jZWxsRWxlbWVudC5jbGFzc0xpc3QgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBTaG93IFJlYWRPbmx5IGNlbGwgd2l0aCBvdGhlciBjb2xvclxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkaXNhYmxlVHJlZUNlbGxDbGFzc05hbWUgPSBcInRyZWVDZWxsRGlzYWJsZWRcIjtcclxuICAgICAgICAgICAgICAgICAgICBpZihhcmdzLmRhdGEuaXRlbS5pc0V4ZWN1dGFibGUudmFsdWUgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLmNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoZGlzYWJsZVRyZWVDZWxsQ2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5jZWxsRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGRpc2FibGVUcmVlQ2VsbENsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgRG9tSGVscGVyLmRpc2FibGVFbGVtZW50KGFyZ3MuY2VsbEVsZW1lbnQsICFhcmdzLmRhdGEuaXRlbS5pc0V4ZWN1dGFibGUudmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlcyB0aGUgY29tbWFuZHMgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZU1ldGhvZHNMaXN0KCkge1xyXG4gICAgICAgICQodGhpcy5tYWluRGl2KS5lalRyZWVHcmlkKHtcclxuICAgICAgICAgICAgZGF0YVNvdXJjZTogdGhpcy5fZXhlY3V0YWJsZU1ldGhvZHNcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpcnN0IHRpbWUgdHJlZWdyaWQgaXMgdXBkYXRlZCwgdG9vbGJhciBidXR0b25zIGFyZSBpbnNlcnRlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFRvb2xiYXJTZXR0aW5nc1RvVHJlZUdyaWQoKSB7XHJcbiAgICAgICAgJCh0aGlzLm1haW5EaXYpLmVqVHJlZUdyaWQoe1xyXG4gICAgICAgICAgICBkYXRhU291cmNlOiB0aGlzLl9leGVjdXRhYmxlTWV0aG9kcyxcclxuICAgICAgICAgICAgdG9vbGJhclNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICBjdXN0b21Ub29sYmFySXRlbXM6IHRoaXMuX21ldGhvZHNUb29sYmFyLmdldEN1c3RvbVRvb2xiYXJzKHRoaXMuX3F1aWNrQ29tbWFuZHMpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBoYW5kbGVzIHNlbGVjdGlvbnMgb2YgbWV0aG9kIGl0ZW1zXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGhhbmRsZU1ldGhvZExpc3RJdGVtU2VsZWN0ZWQoYXJnczogYW55KTogYW55IHtcclxuICAgICAgICAvLyB1cGRhdGUgdGhlIG1ldGhvZCBwYXJhbWV0ZXIgbGlzdCBhZnRlciBhIG1ldGhvZCBoYXMgYmVlbiBzZWxlY3RlZC5cclxuICAgICAgICBpZiAoYXJncy5kYXRhLml0ZW0gJiYgYXJncy5kYXRhLml0ZW0gaW5zdGFuY2VvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5vblNlbGVjdGlvbkNoYW5nZWQoYXJncy5kYXRhLml0ZW0gYXMgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uU2VsZWN0aW9uQ2hhbmdlZChtZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudFNlbGVjdGlvbkNoYW5nZWQucmFpc2UobnVsbCwgbWV0aG9kKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgTWV0aG9kTGlzdFdpZGdldCB9OyJdfQ==