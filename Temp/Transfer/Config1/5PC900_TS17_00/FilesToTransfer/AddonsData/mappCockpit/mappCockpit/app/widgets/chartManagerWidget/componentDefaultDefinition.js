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
define(["require", "exports", "../../common/componentBase/componentSettings", "../common/componentDefaultDefinitionWidgetBase"], function (require, exports, componentSettings_1, componentDefaultDefinitionWidgetBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ComponentDefaultDefinition = /** @class */ (function (_super) {
        __extends(ComponentDefaultDefinition, _super);
        function ComponentDefaultDefinition() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultComponentSettingsId = "chartManagerWidgetDefinition";
            return _this;
        }
        /**
         * Returns the default component settings for this widget
         *
         * @returns {ComponentSettings}
         * @memberof ComponentDefaultDefinition
         */
        ComponentDefaultDefinition.prototype.getDefaultComponentSettings = function () {
            // remove static and add component
            var componentSettings = new componentSettings_1.ComponentSettings();
            componentSettings.addSubComponent("ImageProvider", ComponentDefaultDefinition.ImageProviderId);
            componentSettings.addSubComponent("ChartManagerDataModel", ComponentDefaultDefinition.ChartManagerDataModelId);
            return componentSettings;
        };
        ComponentDefaultDefinition.ChartManagerDataModelId = "ChartManagerDataModel";
        return ComponentDefaultDefinition;
    }(componentDefaultDefinitionWidgetBase_1.ComponentDefaultDefinitionWidgetBase));
    exports.ComponentDefaultDefinition = ComponentDefaultDefinition;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY2hhcnRNYW5hZ2VyV2lkZ2V0L2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFHQTtRQUFnRCw4Q0FBb0M7UUFBcEY7WUFBQSxxRUFtQkM7WUFmbUIsZ0NBQTBCLEdBQUcsOEJBQThCLENBQUM7O1FBZWhGLENBQUM7UUFiRzs7Ozs7V0FLQTtRQUNPLGdFQUEyQixHQUFsQztZQUNJLGtDQUFrQztZQUNsQyxJQUFJLGlCQUFpQixHQUFHLElBQUkscUNBQWlCLEVBQUUsQ0FBQztZQUNoRCxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFLDBCQUEwQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQy9GLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyx1QkFBdUIsRUFBRSwwQkFBMEIsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQy9HLE9BQU8saUJBQWlCLENBQUM7UUFDN0IsQ0FBQztRQWhCYSxrREFBdUIsR0FBRyx1QkFBdUIsQ0FBQztRQWlCcEUsaUNBQUM7S0FBQSxBQW5CRCxDQUFnRCwyRUFBb0MsR0FtQm5GO0lBbkJZLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vY29tcG9uZW50RGVmYXVsdERlZmluaXRpb25XaWRnZXRCYXNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24gZXh0ZW5kcyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbldpZGdldEJhc2V7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBDaGFydE1hbmFnZXJEYXRhTW9kZWxJZCA9IFwiQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsXCI7XHJcblxyXG4gICAgcHVibGljIHJlYWRvbmx5IGRlZmF1bHRDb21wb25lbnRTZXR0aW5nc0lkID0gXCJjaGFydE1hbmFnZXJXaWRnZXREZWZpbml0aW9uXCI7XHJcblxyXG4gICAgLyoqXHJcblx0ICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgZm9yIHRoaXMgd2lkZ2V0XHJcblx0ICpcclxuXHQgKiBAcmV0dXJucyB7Q29tcG9uZW50U2V0dGluZ3N9XHJcblx0ICogQG1lbWJlcm9mIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXHJcblx0ICovXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCkgOiBDb21wb25lbnRTZXR0aW5ncyB7XHJcbiAgICAgICAgLy8gcmVtb3ZlIHN0YXRpYyBhbmQgYWRkIGNvbXBvbmVudFxyXG4gICAgICAgIGxldCBjb21wb25lbnRTZXR0aW5ncyA9IG5ldyBDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZFN1YkNvbXBvbmVudChcIkltYWdlUHJvdmlkZXJcIiwgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uSW1hZ2VQcm92aWRlcklkKTtcclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRTdWJDb21wb25lbnQoXCJDaGFydE1hbmFnZXJEYXRhTW9kZWxcIiwgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsSWQpO1xyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRTZXR0aW5ncztcclxuICAgIH1cclxufSAiXX0=