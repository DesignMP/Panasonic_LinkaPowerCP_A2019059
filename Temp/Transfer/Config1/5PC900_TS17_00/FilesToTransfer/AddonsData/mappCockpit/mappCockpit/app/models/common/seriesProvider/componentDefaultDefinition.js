define(["require", "exports", "../../../common/componentBase/componentSettings"], function (require, exports, componentSettings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ComponentDefaultDefinition = /** @class */ (function () {
        function ComponentDefaultDefinition() {
            this.defaultComponentSettingsId = "seriesProviderDefinition";
        }
        /**
         * Returns the default component settings for this widget
         *
         * @returns {ComponentSettings}
         * @memberof ComponentDefaultDefinition
         */
        ComponentDefaultDefinition.prototype.getDefaultComponentSettings = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            // Add sub components
            componentSettings.addSubComponent("SeriesIconProvider", ComponentDefaultDefinition.SeriesIconProviderId);
            return componentSettings;
        };
        /**
         * Adds some default persisting data packages in the main default persisting data provider
         *
         * @returns {(ComponentDefaultSettingsPackage[]| undefined)}
         * @memberof ComponentDefaultDefinition
         */
        ComponentDefaultDefinition.prototype.getAdditionalDefaultComponentSettings = function () {
            return undefined;
        };
        ComponentDefaultDefinition.SeriesIconProviderId = "SeriesIconProvider";
        return ComponentDefaultDefinition;
    }());
    exports.ComponentDefaultDefinition = ComponentDefaultDefinition;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb21tb24vc2VyaWVzUHJvdmlkZXIvY29tcG9uZW50RGVmYXVsdERlZmluaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBSUE7UUFBQTtZQUlvQiwrQkFBMEIsR0FBRywwQkFBMEIsQ0FBQztRQXlCNUUsQ0FBQztRQXZCRzs7Ozs7V0FLRztRQUNJLGdFQUEyQixHQUFsQztZQUNJLElBQUksaUJBQWlCLEdBQUcsSUFBSSxxQ0FBaUIsRUFBRSxDQUFDO1lBQ2hELHFCQUFxQjtZQUNyQixpQkFBaUIsQ0FBQyxlQUFlLENBQUMsb0JBQW9CLEVBQUUsMEJBQTBCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUV6RyxPQUFPLGlCQUFpQixDQUFDO1FBQzdCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLDBFQUFxQyxHQUE1QztZQUNJLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUExQmEsK0NBQW9CLEdBQUcsb0JBQW9CLENBQUM7UUEyQjlELGlDQUFDO0tBQUEsQUE3QkQsSUE2QkM7SUE3QlksZ0VBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgSUNvbXBvbmVudERlZmF1bHREZWZpbml0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2ludGVyZmFjZXMvY29tcG9uZW50RGVmYXVsdERlZmluaXRpb25JbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdFNldHRpbmdzUGFja2FnZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnREZWZhdWx0U2V0dGluZ3NQYWNrYWdlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24gaW1wbGVtZW50cyBJQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb257XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBTZXJpZXNJY29uUHJvdmlkZXJJZCA9IFwiU2VyaWVzSWNvblByb3ZpZGVyXCI7XHJcblxyXG4gICAgcHVibGljIHJlYWRvbmx5IGRlZmF1bHRDb21wb25lbnRTZXR0aW5nc0lkID0gXCJzZXJpZXNQcm92aWRlckRlZmluaXRpb25cIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnRTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCkgOiBDb21wb25lbnRTZXR0aW5ncyB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudFNldHRpbmdzID0gbmV3IENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgLy8gQWRkIHN1YiBjb21wb25lbnRzXHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkU3ViQ29tcG9uZW50KFwiU2VyaWVzSWNvblByb3ZpZGVyXCIsIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLlNlcmllc0ljb25Qcm92aWRlcklkKTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gY29tcG9uZW50U2V0dGluZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHNvbWUgZGVmYXVsdCBwZXJzaXN0aW5nIGRhdGEgcGFja2FnZXMgaW4gdGhlIG1haW4gZGVmYXVsdCBwZXJzaXN0aW5nIGRhdGEgcHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7KENvbXBvbmVudERlZmF1bHRTZXR0aW5nc1BhY2thZ2VbXXwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0QWRkaXRpb25hbERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpOiBDb21wb25lbnREZWZhdWx0U2V0dGluZ3NQYWNrYWdlW118IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxufSJdfQ==