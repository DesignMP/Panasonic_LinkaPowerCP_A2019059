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
define(["require", "exports", "../common/viewBase", "./componentDefaultDefinition"], function (require, exports, viewBase_1, componentDefaultDefinition_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ComponentViewWidget = /** @class */ (function (_super) {
        __extends(ComponentViewWidget, _super);
        function ComponentViewWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._layoutWidgetActivatedHandler = function (sender, args) { return _this.onContentActivated(sender, args); };
            return _this;
        }
        ComponentViewWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        Object.defineProperty(ComponentViewWidget.prototype, "activeComponent", {
            /**
             * Sets the active component to be displayed by the component view
             *
             * @memberof ComponentViewWidget
             */
            set: function (activeComponent) {
                this._activeComponent = activeComponent;
                this.connectComponent(activeComponent);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Connects the active component
         *
         * @private
         * @param {Property<MappCockpitComponent>} activeComponent
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.connectComponent = function (activeComponent) {
            var _this = this;
            activeComponent.value.commandConnectComponent.execute(null, function () {
                _this.connectPanes();
            });
        };
        /**
         * Connects the panes to the component members
         *
         * @private
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.connectPanes = function () {
            if (this._activeComponent.value.methodsSource != undefined) {
                this.connectMethodsWidget(this._activeComponent.value.userMethods, this._activeComponent.value.quickCommands, this._activeComponent.value.watchableParametersSource.value);
            }
            if (this._activeComponent.value.parametersSource != undefined) {
                this.connectWatchablesWidget(this._activeComponent.value.watchableParametersSource, this._activeComponent.value.watchableStateParameters);
                this.connectMessagesWidget(this._activeComponent.value.messageParametersSource);
                if (this._activeComponent.value.methodsSource != undefined) {
                    this.connectConfigurationManagerWidget(this._activeComponent.value.methodsSource, this._activeComponent.value.configurationParametersSource);
                }
            }
        };
        /**
         * Connects the watchables widget to the component parameters
         *
         * @private
         * @param {Property<MappCockpitComponentParameter[]>} watchableParameters
         * @param {Property<MappCockpitComponentParameter[]>} watchableStateParameters
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.connectWatchablesWidget = function (watchableParameters, watchableStateParameters) {
            if (this._watchablesWidget) {
                this._watchablesWidget.watchableStateParameters = watchableStateParameters;
                this._watchablesWidget.watchableParameters = watchableParameters;
            }
        };
        /**
         * Connects the configuration manager widget to the component parameters and methods
         *
         * @param {Property<MappCockpitComponentMethod[]>} componentMethodsLink
         * @param {Property<MappCockpitComponentParameter[]>} configurationParametersLink
         * @returns {*}
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.connectConfigurationManagerWidget = function (componentMethodsLink, configurationParametersLink) {
            if (this._configManagerWidget) {
                this._configManagerWidget.methods = componentMethodsLink;
                this._configManagerWidget.configurationParameters = configurationParametersLink;
            }
        };
        /**
         * Connects the messages widget to the component parameters
         *
         * @param {Property<MappCockpitComponentParameter[]>} componentParametersLink
         * @returns {*}
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.connectMessagesWidget = function (componentParametersLink) {
            if (this._messagesWidget) {
                this._messagesWidget.messageParameters = componentParametersLink;
            }
        };
        /**
         * Connects the methods widget to the component parameters
         *
         * @private
         * @param {MappCockpitComponentMethod[]} componentMethods
         * @param {MappCockpitQuickCommandParameter[]} quickCommands
         * @returns {*}
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.connectMethodsWidget = function (componentMethods, quickCommands, watchableParameters) {
            if (this._methodsWidget) {
                this._methodsWidget.setComponentsMethodsWidget(componentMethods, quickCommands, watchableParameters);
            }
        };
        /**
         * Sets the widget content and eventually subwidgets
         *
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this.initLayoutWidget();
            this.setMethodsWidget();
            this.setWatchablesWidget();
            this.setConfigManagerWidget();
            this.setMessagesWidget();
        };
        ComponentViewWidget.prototype.initLayoutWidget = function () {
            this._layoutWidget = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.SplitterWidgetComponentViewId);
            this.attachLayoutToView(this);
            this._layoutWidget.component.disablePersisting();
            this._layoutWidget.initialize();
            // add widget to the parent container
            this._layoutWidget.addToParentContainer(this.mainDiv);
            this._layoutWidget.eventWidgetActivated.attach(this._layoutWidgetActivatedHandler);
            //Disable persisting for inner splitters
            var innerLayoutWidget = this._layoutWidget.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.SplitterWidgetTopSplitterId);
            innerLayoutWidget.component.disablePersisting();
        };
        /**
         * Activates the component view
         *
         * @returns {*}
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.activate = function () {
            this._layoutWidget.activate();
        };
        /**
         * Deactivates the component view
         *
         * @returns {*}
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.deactivate = function () {
            this._layoutWidget.deactivate();
        };
        /**
         * Disposes the component view
         *
         * @returns {*}
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.dispose = function () {
            this._layoutWidget.eventWidgetActivated.detach(this._layoutWidgetActivatedHandler);
            this._layoutWidget.dispose();
            _super.prototype.dispose.call(this);
        };
        /**
         * Resizes the component view
         *
         * @param number width
         * @param number height
         * @returns {*}
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.resize = function (width, height) {
            this._actualWidth = width;
            this._actualHeight = height;
            if (this._layoutWidget != undefined) {
                this._layoutWidget.resize(width, height);
            }
        };
        ComponentViewWidget.prototype.onContentActivated = function (sender, args) {
            args.widget.activate();
            this.resize(this._actualWidth, this._actualHeight);
        };
        /**
         * set the messages widget
         *
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.setMessagesWidget = function () {
            this._messagesWidget = this.getWidgetById(componentDefaultDefinition_1.ComponentDefaultDefinition.ComponentViewMessagesWidgetId);
        };
        /**
         * set the watchables widget
         *
         * @private
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.setWatchablesWidget = function () {
            this._watchablesWidget = this.getWidgetById(componentDefaultDefinition_1.ComponentDefaultDefinition.WatchablesWidgetId);
        };
        /**
         * set the configmanager widget
         *
         * @private
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.setConfigManagerWidget = function () {
            this._configManagerWidget = this.getWidgetById(componentDefaultDefinition_1.ComponentDefaultDefinition.ConfigManagerWidgetId);
        };
        /**
         * set the commands widget
         *
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.setMethodsWidget = function () {
            this._methodsWidget = this.getWidgetById(componentDefaultDefinition_1.ComponentDefaultDefinition.MethodsWidgetId);
        };
        return ComponentViewWidget;
    }(viewBase_1.ViewBase));
    exports.ComponentViewWidget = ComponentViewWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50Vmlld1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21wb25lbnRWaWV3V2lkZ2V0L2NvbXBvbmVudFZpZXdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVNBO1FBQWtDLHVDQUFRO1FBQTFDO1lBQUEscUVBa1BDO1lBMU9XLG1DQUE2QixHQUFHLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBRyxPQUFBLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQXBDLENBQW9DLENBQUM7O1FBME9oRyxDQUFDO1FBeE9HLGlEQUFtQixHQUFuQjtZQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsSUFBSSx1REFBMEIsRUFBRSxDQUFDLENBQUM7WUFDdEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZDLENBQUM7UUFPRCxzQkFBVyxnREFBZTtZQUwxQjs7OztlQUlHO2lCQUNILFVBQTJCLGVBQStDO2dCQUN0RSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZUFBZSxDQUFDO2dCQUV4QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDM0MsQ0FBQzs7O1dBQUE7UUFFRDs7Ozs7O1dBTUc7UUFDSyw4Q0FBZ0IsR0FBeEIsVUFBeUIsZUFBK0M7WUFBeEUsaUJBSUM7WUFIRyxlQUFlLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7Z0JBQ3hELEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNLLDBDQUFZLEdBQXBCO1lBQ0ksSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLGFBQWEsSUFBSSxTQUFTLEVBQUU7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QVMsRUFBQztnQkFDL0IsSUFBSSxDQUFDLGFBQWMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQzdDO1FBQ0wsQ0FBQztRQUVPLGdEQUFrQixHQUExQixVQUEyQixNQUFNLEVBQUUsSUFBSTtZQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdkQsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSywrQ0FBaUIsR0FBekI7WUFDSSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsdURBQTBCLENBQUMsNkJBQTZCLENBQTRCLENBQUM7UUFDbkksQ0FBQztRQUdEOzs7OztXQUtHO1FBQ0ssaURBQW1CLEdBQTNCO1lBQ0ksSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsdURBQTBCLENBQUMsa0JBQWtCLENBQThCLENBQUM7UUFDNUgsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ssb0RBQXNCLEdBQTlCO1lBRUksSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsdURBQTBCLENBQUMscUJBQXFCLENBQWlDLENBQUM7UUFDckksQ0FBQztRQUVEOzs7O1dBSUc7UUFDSyw4Q0FBZ0IsR0FBeEI7WUFFSSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsdURBQTBCLENBQUMsZUFBZSxDQUEyQixDQUFDO1FBQ25ILENBQUM7UUFDTCwwQkFBQztJQUFELENBQUMsQUFsUEQsQ0FBa0MsbUJBQVEsR0FrUHpDO0lBRVEsa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNvbXBvbmVudFZpZXdXaWRnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2NvbXBvbmVudFZpZXdXaWRnZXRJbnRlcmZhY2VcIjtcclxuXHJcbmltcG9ydCAqIGFzIFdpZGdldHMgZnJvbSBcIi4uLy4uL3dpZGdldHMvd2lkZ2V0c1wiO1xyXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvcHJvcGVydHlcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnQsIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLCBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCwgTWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlciwgTWFwcENvY2twaXRRdWlja0NvbW1hbmRQYXJhbWV0ZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBWaWV3QmFzZSB9IGZyb20gXCIuLi9jb21tb24vdmlld0Jhc2VcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24gfSBmcm9tIFwiLi9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBJTGF5b3V0V2lkZ2V0IH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL2xheW91dFdpZGdldEludGVyZmFjZVwiO1xyXG5cclxuY2xhc3MgQ29tcG9uZW50Vmlld1dpZGdldCBleHRlbmRzIFZpZXdCYXNlIGltcGxlbWVudHMgSUNvbXBvbmVudFZpZXdXaWRnZXR7XHJcblxyXG4gICAgcHJpdmF0ZSBfYWN0aXZlQ29tcG9uZW50ITogUHJvcGVydHk8TWFwcENvY2twaXRDb21wb25lbnQ+O1xyXG4gICAgcHJpdmF0ZSBfd2F0Y2hhYmxlc1dpZGdldDogV2lkZ2V0cy5JV2F0Y2hhYmxlc1dpZGdldCB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX21lc3NhZ2VzV2lkZ2V0OiBXaWRnZXRzLklNZXNzYWdlc1dpZGdldCB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX21ldGhvZHNXaWRnZXQ6IFdpZGdldHMuSU1ldGhvZHNXaWRnZXR8dW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnTWFuYWdlcldpZGdldDogV2lkZ2V0cy5JQ29uZmlnTWFuYWdlcldpZGdldHx1bmRlZmluZWQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfbGF5b3V0V2lkZ2V0QWN0aXZhdGVkSGFuZGxlciA9IChzZW5kZXIsYXJncyk9PnRoaXMub25Db250ZW50QWN0aXZhdGVkKHNlbmRlcixhcmdzKTtcclxuXHJcbiAgICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0RGVmYXVsdERlZmluaXRpb24obmV3IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uKCkpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBhY3RpdmUgY29tcG9uZW50IHRvIGJlIGRpc3BsYXllZCBieSB0aGUgY29tcG9uZW50IHZpZXdcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50Vmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IGFjdGl2ZUNvbXBvbmVudChhY3RpdmVDb21wb25lbnQ6IFByb3BlcnR5PE1hcHBDb2NrcGl0Q29tcG9uZW50Pikge1xyXG4gICAgICAgIHRoaXMuX2FjdGl2ZUNvbXBvbmVudCA9IGFjdGl2ZUNvbXBvbmVudDtcclxuXHJcbiAgICAgICAgdGhpcy5jb25uZWN0Q29tcG9uZW50KGFjdGl2ZUNvbXBvbmVudCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ29ubmVjdHMgdGhlIGFjdGl2ZSBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudD59IGFjdGl2ZUNvbXBvbmVudFxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25uZWN0Q29tcG9uZW50KGFjdGl2ZUNvbXBvbmVudDogUHJvcGVydHk8TWFwcENvY2twaXRDb21wb25lbnQ+KSB7XHJcbiAgICAgICAgYWN0aXZlQ29tcG9uZW50LnZhbHVlLmNvbW1hbmRDb25uZWN0Q29tcG9uZW50LmV4ZWN1dGUobnVsbCwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RQYW5lcygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29ubmVjdHMgdGhlIHBhbmVzIHRvIHRoZSBjb21wb25lbnQgbWVtYmVyc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50Vmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbm5lY3RQYW5lcygpIHtcclxuICAgICAgICBpZiAodGhpcy5fYWN0aXZlQ29tcG9uZW50LnZhbHVlLm1ldGhvZHNTb3VyY2UgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdE1ldGhvZHNXaWRnZXQodGhpcy5fYWN0aXZlQ29tcG9uZW50LnZhbHVlLnVzZXJNZXRob2RzLCB0aGlzLl9hY3RpdmVDb21wb25lbnQudmFsdWUucXVpY2tDb21tYW5kcywgdGhpcy5fYWN0aXZlQ29tcG9uZW50LnZhbHVlLndhdGNoYWJsZVBhcmFtZXRlcnNTb3VyY2UudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fYWN0aXZlQ29tcG9uZW50LnZhbHVlLnBhcmFtZXRlcnNTb3VyY2UgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdFdhdGNoYWJsZXNXaWRnZXQodGhpcy5fYWN0aXZlQ29tcG9uZW50LnZhbHVlLndhdGNoYWJsZVBhcmFtZXRlcnNTb3VyY2UsIHRoaXMuX2FjdGl2ZUNvbXBvbmVudC52YWx1ZS53YXRjaGFibGVTdGF0ZVBhcmFtZXRlcnMpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RNZXNzYWdlc1dpZGdldCh0aGlzLl9hY3RpdmVDb21wb25lbnQudmFsdWUubWVzc2FnZVBhcmFtZXRlcnNTb3VyY2UpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fYWN0aXZlQ29tcG9uZW50LnZhbHVlLm1ldGhvZHNTb3VyY2UgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RDb25maWd1cmF0aW9uTWFuYWdlcldpZGdldCh0aGlzLl9hY3RpdmVDb21wb25lbnQudmFsdWUubWV0aG9kc1NvdXJjZSwgdGhpcy5fYWN0aXZlQ29tcG9uZW50LnZhbHVlLmNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzU291cmNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbm5lY3RzIHRoZSB3YXRjaGFibGVzIHdpZGdldCB0byB0aGUgY29tcG9uZW50IHBhcmFtZXRlcnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdPn0gd2F0Y2hhYmxlUGFyYW1ldGVyc1xyXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdPn0gd2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXJzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50Vmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbm5lY3RXYXRjaGFibGVzV2lkZ2V0KHdhdGNoYWJsZVBhcmFtZXRlcnM6IFByb3BlcnR5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10+LCB3YXRjaGFibGVTdGF0ZVBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0U3RhdGVQYXJhbWV0ZXJbXSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl93YXRjaGFibGVzV2lkZ2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3dhdGNoYWJsZXNXaWRnZXQud2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXJzID0gd2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXJzO1xyXG4gICAgICAgICAgICB0aGlzLl93YXRjaGFibGVzV2lkZ2V0LndhdGNoYWJsZVBhcmFtZXRlcnMgPSB3YXRjaGFibGVQYXJhbWV0ZXJzO1xyXG4gICAgICAgIH1cclxuICAgIH0gXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25uZWN0cyB0aGUgY29uZmlndXJhdGlvbiBtYW5hZ2VyIHdpZGdldCB0byB0aGUgY29tcG9uZW50IHBhcmFtZXRlcnMgYW5kIG1ldGhvZHNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1Byb3BlcnR5PE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10+fSBjb21wb25lbnRNZXRob2RzTGlua1xyXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdPn0gY29uZmlndXJhdGlvblBhcmFtZXRlcnNMaW5rXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGNvbm5lY3RDb25maWd1cmF0aW9uTWFuYWdlcldpZGdldChjb21wb25lbnRNZXRob2RzTGluazogUHJvcGVydHk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXT4sIGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzTGluazogUHJvcGVydHk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXT4pOiBhbnkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jb25maWdNYW5hZ2VyV2lkZ2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZ01hbmFnZXJXaWRnZXQubWV0aG9kcyA9IGNvbXBvbmVudE1ldGhvZHNMaW5rO1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWdNYW5hZ2VyV2lkZ2V0LmNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzID0gY29uZmlndXJhdGlvblBhcmFtZXRlcnNMaW5rO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbm5lY3RzIHRoZSBtZXNzYWdlcyB3aWRnZXQgdG8gdGhlIGNvbXBvbmVudCBwYXJhbWV0ZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdPn0gY29tcG9uZW50UGFyYW1ldGVyc0xpbmtcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25uZWN0TWVzc2FnZXNXaWRnZXQoY29tcG9uZW50UGFyYW1ldGVyc0xpbms6IFByb3BlcnR5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10+KTogYW55IHtcclxuICAgICAgICBpZiAodGhpcy5fbWVzc2FnZXNXaWRnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWVzc2FnZXNXaWRnZXQubWVzc2FnZVBhcmFtZXRlcnMgPSBjb21wb25lbnRQYXJhbWV0ZXJzTGluaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25uZWN0cyB0aGUgbWV0aG9kcyB3aWRnZXQgdG8gdGhlIGNvbXBvbmVudCBwYXJhbWV0ZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXX0gY29tcG9uZW50TWV0aG9kc1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdFF1aWNrQ29tbWFuZFBhcmFtZXRlcltdfSBxdWlja0NvbW1hbmRzXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29ubmVjdE1ldGhvZHNXaWRnZXQoY29tcG9uZW50TWV0aG9kczogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXSwgcXVpY2tDb21tYW5kczogTWFwcENvY2twaXRRdWlja0NvbW1hbmRQYXJhbWV0ZXJbXSwgd2F0Y2hhYmxlUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSk6IGFueSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX21ldGhvZHNXaWRnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWV0aG9kc1dpZGdldC5zZXRDb21wb25lbnRzTWV0aG9kc1dpZGdldChjb21wb25lbnRNZXRob2RzLCBxdWlja0NvbW1hbmRzLCB3YXRjaGFibGVQYXJhbWV0ZXJzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHdpZGdldCBjb250ZW50IGFuZCBldmVudHVhbGx5IHN1YndpZGdldHNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50Vmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplZCgpIHtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplZCgpO1xyXG5cclxuICAgICAgICB0aGlzLmluaXRMYXlvdXRXaWRnZXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRNZXRob2RzV2lkZ2V0KCk7XHJcbiAgICAgICAgdGhpcy5zZXRXYXRjaGFibGVzV2lkZ2V0KCk7XHJcbiAgICAgICAgdGhpcy5zZXRDb25maWdNYW5hZ2VyV2lkZ2V0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0TWVzc2FnZXNXaWRnZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0TGF5b3V0V2lkZ2V0KCkge1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldCA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5TcGxpdHRlcldpZGdldENvbXBvbmVudFZpZXdJZCkgYXMgSUxheW91dFdpZGdldDtcclxuICAgICAgICB0aGlzLmF0dGFjaExheW91dFRvVmlldyg8YW55PnRoaXMpO1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5pbml0aWFsaXplKCk7XHJcbiAgICAgICAgLy8gYWRkIHdpZGdldCB0byB0aGUgcGFyZW50IGNvbnRhaW5lclxyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5hZGRUb1BhcmVudENvbnRhaW5lcih0aGlzLm1haW5EaXYpO1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldCEuZXZlbnRXaWRnZXRBY3RpdmF0ZWQuYXR0YWNoKHRoaXMuX2xheW91dFdpZGdldEFjdGl2YXRlZEhhbmRsZXIpO1xyXG5cclxuICAgICAgICAvL0Rpc2FibGUgcGVyc2lzdGluZyBmb3IgaW5uZXIgc3BsaXR0ZXJzXHJcbiAgICAgICAgbGV0IGlubmVyTGF5b3V0V2lkZ2V0ID0gdGhpcy5fbGF5b3V0V2lkZ2V0LmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uU3BsaXR0ZXJXaWRnZXRUb3BTcGxpdHRlcklkKSBhcyBJTGF5b3V0V2lkZ2V0O1xyXG4gICAgICAgIGlubmVyTGF5b3V0V2lkZ2V0LmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG4gICAgfVxyXG4gICBcclxuICAgIC8qKlxyXG4gICAgICogQWN0aXZhdGVzIHRoZSBjb21wb25lbnQgdmlld1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgYWN0aXZhdGUoKXtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLmFjdGl2YXRlKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogRGVhY3RpdmF0ZXMgdGhlIGNvbXBvbmVudCB2aWV3XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50Vmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBkZWFjdGl2YXRlKCl7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5kZWFjdGl2YXRlKCk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2VzIHRoZSBjb21wb25lbnQgdmlld1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZGlzcG9zZSgpe1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldCEuZXZlbnRXaWRnZXRBY3RpdmF0ZWQuZGV0YWNoKHRoaXMuX2xheW91dFdpZGdldEFjdGl2YXRlZEhhbmRsZXIpO1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldCEuZGlzcG9zZSgpO1xyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuICAgXHJcbiAgICAvKipcclxuICAgICAqIFJlc2l6ZXMgdGhlIGNvbXBvbmVudCB2aWV3XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG51bWJlciB3aWR0aFxyXG4gICAgICogQHBhcmFtIG51bWJlciBoZWlnaHRcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLl9hY3R1YWxXaWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbEhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLl9sYXlvdXRXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5yZXNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIG9uQ29udGVudEFjdGl2YXRlZChzZW5kZXIsIGFyZ3MpIHtcclxuICAgICAgICBhcmdzLndpZGdldC5hY3RpdmF0ZSgpO1xyXG4gICAgICAgIHRoaXMucmVzaXplKHRoaXMuX2FjdHVhbFdpZHRoLCB0aGlzLl9hY3R1YWxIZWlnaHQpO1xyXG4gICAgfVxyXG4gICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBzZXQgdGhlIG1lc3NhZ2VzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0TWVzc2FnZXNXaWRnZXQoKSB7XHJcbiAgICAgICAgdGhpcy5fbWVzc2FnZXNXaWRnZXQgPSB0aGlzLmdldFdpZGdldEJ5SWQoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uQ29tcG9uZW50Vmlld01lc3NhZ2VzV2lkZ2V0SWQpIGFzIFdpZGdldHMuSU1lc3NhZ2VzV2lkZ2V0O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIHNldCB0aGUgd2F0Y2hhYmxlcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRXYXRjaGFibGVzV2lkZ2V0KCkge1xyXG4gICAgICAgIHRoaXMuX3dhdGNoYWJsZXNXaWRnZXQgPSB0aGlzLmdldFdpZGdldEJ5SWQoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uV2F0Y2hhYmxlc1dpZGdldElkKSBhcyBXaWRnZXRzLklXYXRjaGFibGVzV2lkZ2V0O1xyXG4gICAgfSAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V0IHRoZSBjb25maWdtYW5hZ2VyIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50Vmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldENvbmZpZ01hbmFnZXJXaWRnZXQoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX2NvbmZpZ01hbmFnZXJXaWRnZXQgPSB0aGlzLmdldFdpZGdldEJ5SWQoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uQ29uZmlnTWFuYWdlcldpZGdldElkKSBhcyBXaWRnZXRzLklDb25maWdNYW5hZ2VyV2lkZ2V0O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIHNldCB0aGUgY29tbWFuZHMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRNZXRob2RzV2lkZ2V0KCkge1xyXG5cclxuICAgICAgICB0aGlzLl9tZXRob2RzV2lkZ2V0ID0gdGhpcy5nZXRXaWRnZXRCeUlkKENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLk1ldGhvZHNXaWRnZXRJZCkgYXMgV2lkZ2V0cy5JTWV0aG9kc1dpZGdldDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgQ29tcG9uZW50Vmlld1dpZGdldCB9OyJdfQ==