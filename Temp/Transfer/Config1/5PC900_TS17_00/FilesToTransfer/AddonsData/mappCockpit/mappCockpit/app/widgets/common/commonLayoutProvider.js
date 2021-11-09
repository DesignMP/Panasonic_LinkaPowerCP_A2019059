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
define(["require", "exports", "./busyInformation", "./componentDefaultDefinitionCommonLayoutProvider", "../../common/componentBase/componentWithoutSettingsBase"], function (require, exports, busyInformation_1, componentDefaultDefinitionCommonLayoutProvider_1, componentWithoutSettingsBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CommonLayoutProvider = /** @class */ (function (_super) {
        __extends(CommonLayoutProvider, _super);
        function CommonLayoutProvider() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Initialize this component
         *
         * @memberof CommonLayoutProvider
         */
        CommonLayoutProvider.prototype.initializeComponent = function () {
            _super.prototype.initializeComponent.call(this);
            this.component.setDefaultDefinition(new componentDefaultDefinitionCommonLayoutProvider_1.ComponentDefaultDefinitionCommonLayoutProvider());
        };
        /**
         * Initialize thhis instance
         *
         * @memberof CommonLayoutProvider
         */
        CommonLayoutProvider.prototype.initialize = function () {
            this.component.loadComponentSettings();
        };
        /**
         * gets a singleton instance of CommonLayoutProvider
         *
         * @static
         * @returns
         * @memberof CommonLayoutProvider
         */
        CommonLayoutProvider.getInstance = function () {
            if (!CommonLayoutProvider.instance) {
                CommonLayoutProvider.instance = new CommonLayoutProvider();
                // ... any one time initialization goes here ...
            }
            return CommonLayoutProvider.instance;
        };
        /**
         * Disposes the CommonLayoutProvider
         *
         * @memberof CommonLayoutProvider
         */
        CommonLayoutProvider.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        /**
         * Returns the busy screen representation for the given busy information
         *
         * @param {string} containerId
         * @param {BusyInformation} busyInformation
         * @returns {string}
         * @memberof CommonLayoutProvider
         */
        CommonLayoutProvider.prototype.getBusyScreenLayout = function (containerId, busyInformation) {
            var innerHtmlTextWithMessage = "";
            if (busyInformation.message != "") {
                innerHtmlTextWithMessage = "<div id=\"" + containerId + "_message\" style='margin:auto; color: white; font-family: var(--main-font); font-size: 22px'>" + busyInformation.message + "</div>";
                if (busyInformation.rowOrientation == true) {
                    innerHtmlTextWithMessage += "</br>";
                }
                else {
                    innerHtmlTextWithMessage += "&nbsp;&nbsp;&nbsp;&nbsp;";
                }
            }
            var orientation = "flex-direction: row;";
            if (busyInformation.rowOrientation) {
                orientation = "flex-direction: column;";
            }
            var html = "\n            <div id=\"" + containerId + "\" class=\"busyPage\" \n                style='display:flex; position:absolute; width: 100%; height: 100%; top: 0px; left: 0px; background-color: rgba(0,0,0,0.7); z-index: 99; '>\n                <div style=\"margin:auto; display:flex; " + orientation + "\">"
                + innerHtmlTextWithMessage +
                "<div id=\"" + containerId + "_image\" style='margin:auto;'>" + this.getImage(busyInformation.imageId, busyInformation.imageSize) + "</div>\n                </div>\n            </div>";
            return html;
        };
        /**
         * Returns the image for the given id with the given imageSize
         *
         * @private
         * @param {ImageId} imageId
         * @param {number} imageSize
         * @returns {string}
         * @memberof CommonLayoutProvider
         */
        CommonLayoutProvider.prototype.getImage = function (imageId, imageSize) {
            if (imageId == busyInformation_1.ImageId.defaultImage) {
                return this.getDefaultImage(imageSize);
            }
            else if (imageId == busyInformation_1.ImageId.disconnectedImage) {
                return this.getDisconnectedImage();
            }
            return "";
        };
        /**
         * Returns the disconnected image
         *
         * @private
         * @returns {string}
         * @memberof CommonLayoutProvider
         */
        CommonLayoutProvider.prototype.getDisconnectedImage = function () {
            var imageProvider = this.component.getSubComponent(componentDefaultDefinitionCommonLayoutProvider_1.ComponentDefaultDefinitionCommonLayoutProvider.ImageProviderId);
            if (imageProvider == undefined) {
                return "";
            }
            return imageProvider.getImage("../app/widgets/common/style/images/disconnected.svg");
        };
        /**
         * Returns the default busy image with the given size
         *
         * @private
         * @param {number} size
         * @returns
         * @memberof CommonLayoutProvider
         */
        CommonLayoutProvider.prototype.getDefaultImage = function (size) {
            var imageProvider = this.component.getSubComponent(componentDefaultDefinitionCommonLayoutProvider_1.ComponentDefaultDefinitionCommonLayoutProvider.ImageProviderId);
            if (imageProvider == undefined) {
                return "";
            }
            var busyImage = imageProvider.getImage("../app/widgets/common/style/images/busy.svg");
            busyImage = busyImage.replace('width="120"', 'width="' + size.toString() + '"');
            busyImage = busyImage.replace('height="120"', 'height="' + size.toString() + '"');
            return busyImage;
        };
        return CommonLayoutProvider;
    }(componentWithoutSettingsBase_1.ComponentWithoutSettingsBase));
    exports.CommonLayoutProvider = CommonLayoutProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uTGF5b3V0UHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tbW9uL2NvbW1vbkxheW91dFByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFNQTtRQUEwQyx3Q0FBNEI7UUFBdEU7O1FBdUlBLENBQUM7UUFySUc7Ozs7V0FJRztRQUNJLGtEQUFtQixHQUExQjtZQUNJLGlCQUFNLG1CQUFtQixXQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLCtGQUE4QyxFQUFFLENBQUMsQ0FBQztRQUM5RixDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILHlDQUFVLEdBQVY7WUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDM0MsQ0FBQztRQUlEOzs7Ozs7V0FNRztRQUNJLGdDQUFXLEdBQWxCO1lBQ0ksSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsRUFBRTtnQkFDaEMsb0JBQW9CLENBQUMsUUFBUSxHQUFHLElBQUksb0JBQW9CLEVBQUUsQ0FBQztnQkFDM0QsZ0RBQWdEO2FBQ25EO1lBQ0QsT0FBTyxvQkFBb0IsQ0FBQyxRQUFRLENBQUM7UUFDekMsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxzQ0FBTyxHQUFQO1lBQ0ksaUJBQU0sT0FBTyxXQUFFLENBQUM7UUFDcEIsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSCxrREFBbUIsR0FBbkIsVUFBb0IsV0FBbUIsRUFBRSxlQUFnQztZQUNyRSxJQUFJLHdCQUF3QixHQUFHLEVBQUUsQ0FBQztZQUNsQyxJQUFHLGVBQWUsQ0FBQyxPQUFPLElBQUksRUFBRSxFQUFDO2dCQUM3Qix3QkFBd0IsR0FBRyxZQUFXLEdBQUMsV0FBVyxHQUFDLCtGQUE4RixHQUFHLGVBQWUsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFBO2dCQUN0TCxJQUFHLGVBQWUsQ0FBQyxjQUFjLElBQUksSUFBSSxFQUFDO29CQUN0Qyx3QkFBd0IsSUFBSSxPQUFPLENBQUM7aUJBQ3ZDO3FCQUNHO29CQUNBLHdCQUF3QixJQUFJLDBCQUEwQixDQUFDO2lCQUMxRDthQUNKO1lBQ0QsSUFBSSxXQUFXLEdBQUcsc0JBQXNCLENBQUE7WUFDeEMsSUFBRyxlQUFlLENBQUMsY0FBYyxFQUFDO2dCQUM5QixXQUFXLEdBQUcseUJBQXlCLENBQUM7YUFDM0M7WUFFRCxJQUFJLElBQUksR0FBRywwQkFDRyxHQUFDLFdBQVcsR0FBQyw4T0FFcUIsR0FBQyxXQUFXLEdBQUMsS0FBSTtrQkFDbEQsd0JBQXdCO2dCQUMxQixZQUFXLEdBQUMsV0FBVyxHQUFDLGdDQUErQixHQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsU0FBUyxDQUFDLEdBQUcsb0RBRWpJLENBQUM7WUFDWixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSyx1Q0FBUSxHQUFoQixVQUFpQixPQUFnQixFQUFFLFNBQWlCO1lBQ2hELElBQUcsT0FBTyxJQUFJLHlCQUFPLENBQUMsWUFBWSxFQUFDO2dCQUMvQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDMUM7aUJBQ0ksSUFBRyxPQUFPLElBQUkseUJBQU8sQ0FBQyxpQkFBaUIsRUFBQztnQkFDekMsT0FBTyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQzthQUN0QztZQUNELE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLG1EQUFvQixHQUE1QjtZQUNJLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLCtGQUE4QyxDQUFDLGVBQWUsQ0FBbUIsQ0FBQztZQUNySSxJQUFHLGFBQWEsSUFBSSxTQUFTLEVBQUM7Z0JBQzFCLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxPQUFPLGFBQWEsQ0FBQyxRQUFRLENBQUMscURBQXFELENBQUMsQ0FBQztRQUN6RixDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNLLDhDQUFlLEdBQXZCLFVBQXdCLElBQVk7WUFDaEMsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsK0ZBQThDLENBQUMsZUFBZSxDQUFtQixDQUFDO1lBQ3JJLElBQUcsYUFBYSxJQUFJLFNBQVMsRUFBQztnQkFDMUIsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUVELElBQUksU0FBUyxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsNkNBQTZDLENBQUMsQ0FBQztZQUN0RixTQUFTLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNoRixTQUFTLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNsRixPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBQ0wsMkJBQUM7SUFBRCxDQUFDLEFBdklELENBQTBDLDJEQUE0QixHQXVJckU7SUF2SVksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnVzeUluZm9ybWF0aW9uLCBJbWFnZUlkIH0gZnJvbSBcIi4vYnVzeUluZm9ybWF0aW9uXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uQ29tbW9uTGF5b3V0UHJvdmlkZXIgfSBmcm9tIFwiLi9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbkNvbW1vbkxheW91dFByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFdpdGhvdXRTZXR0aW5nc0Jhc2UgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50V2l0aG91dFNldHRpbmdzQmFzZVwiO1xyXG5pbXBvcnQgeyBJSW1hZ2VQcm92aWRlciB9IGZyb20gXCIuL2ludGVyZmFjZXMvaW1hZ2VQcm92aWRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJQ29tbW9uTGF5b3V0UHJvdmlkZXIgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2NvbW1vbkxheW91dFByb3ZpZGVySW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tbW9uTGF5b3V0UHJvdmlkZXIgZXh0ZW5kcyBDb21wb25lbnRXaXRob3V0U2V0dGluZ3NCYXNlIGltcGxlbWVudHMgSUNvbW1vbkxheW91dFByb3ZpZGVye1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZSB0aGlzIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDb21tb25MYXlvdXRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemVDb21wb25lbnQoKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXREZWZhdWx0RGVmaW5pdGlvbihuZXcgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25Db21tb25MYXlvdXRQcm92aWRlcigpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemUgdGhoaXMgaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tbW9uTGF5b3V0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZSgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmxvYWRDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogQ29tbW9uTGF5b3V0UHJvdmlkZXI7XHJcbiAgXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgYSBzaW5nbGV0b24gaW5zdGFuY2Ugb2YgQ29tbW9uTGF5b3V0UHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENvbW1vbkxheW91dFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcclxuICAgICAgICBpZiAoIUNvbW1vbkxheW91dFByb3ZpZGVyLmluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIENvbW1vbkxheW91dFByb3ZpZGVyLmluc3RhbmNlID0gbmV3IENvbW1vbkxheW91dFByb3ZpZGVyKCk7XHJcbiAgICAgICAgICAgIC8vIC4uLiBhbnkgb25lIHRpbWUgaW5pdGlhbGl6YXRpb24gZ29lcyBoZXJlIC4uLlxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQ29tbW9uTGF5b3V0UHJvdmlkZXIuaW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwb3NlcyB0aGUgQ29tbW9uTGF5b3V0UHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tbW9uTGF5b3V0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgZGlzcG9zZSgpe1xyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGJ1c3kgc2NyZWVuIHJlcHJlc2VudGF0aW9uIGZvciB0aGUgZ2l2ZW4gYnVzeSBpbmZvcm1hdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250YWluZXJJZFxyXG4gICAgICogQHBhcmFtIHtCdXN5SW5mb3JtYXRpb259IGJ1c3lJbmZvcm1hdGlvblxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBDb21tb25MYXlvdXRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBnZXRCdXN5U2NyZWVuTGF5b3V0KGNvbnRhaW5lcklkOiBzdHJpbmcsIGJ1c3lJbmZvcm1hdGlvbjogQnVzeUluZm9ybWF0aW9uKTogc3RyaW5ne1xyXG4gICAgICAgIGxldCBpbm5lckh0bWxUZXh0V2l0aE1lc3NhZ2UgPSBcIlwiO1xyXG4gICAgICAgIGlmKGJ1c3lJbmZvcm1hdGlvbi5tZXNzYWdlICE9IFwiXCIpe1xyXG4gICAgICAgICAgICBpbm5lckh0bWxUZXh0V2l0aE1lc3NhZ2UgPSBgPGRpdiBpZD1cImArY29udGFpbmVySWQrYF9tZXNzYWdlXCIgc3R5bGU9J21hcmdpbjphdXRvOyBjb2xvcjogd2hpdGU7IGZvbnQtZmFtaWx5OiB2YXIoLS1tYWluLWZvbnQpOyBmb250LXNpemU6IDIycHgnPmAgKyBidXN5SW5mb3JtYXRpb24ubWVzc2FnZSArIGA8L2Rpdj5gXHJcbiAgICAgICAgICAgIGlmKGJ1c3lJbmZvcm1hdGlvbi5yb3dPcmllbnRhdGlvbiA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIGlubmVySHRtbFRleHRXaXRoTWVzc2FnZSArPSBcIjwvYnI+XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGlubmVySHRtbFRleHRXaXRoTWVzc2FnZSArPSBcIiZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwO1wiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBvcmllbnRhdGlvbiA9IFwiZmxleC1kaXJlY3Rpb246IHJvdztcIlxyXG4gICAgICAgIGlmKGJ1c3lJbmZvcm1hdGlvbi5yb3dPcmllbnRhdGlvbil7XHJcbiAgICAgICAgICAgIG9yaWVudGF0aW9uID0gXCJmbGV4LWRpcmVjdGlvbjogY29sdW1uO1wiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGh0bWwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJgK2NvbnRhaW5lcklkK2BcIiBjbGFzcz1cImJ1c3lQYWdlXCIgXHJcbiAgICAgICAgICAgICAgICBzdHlsZT0nZGlzcGxheTpmbGV4OyBwb3NpdGlvbjphYnNvbHV0ZTsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTsgdG9wOiAwcHg7IGxlZnQ6IDBweDsgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLDAsMCwwLjcpOyB6LWluZGV4OiA5OTsgJz5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJtYXJnaW46YXV0bzsgZGlzcGxheTpmbGV4OyBgK29yaWVudGF0aW9uK2BcIj5gXHJcbiAgICAgICAgICAgICAgICAgICAgICsgaW5uZXJIdG1sVGV4dFdpdGhNZXNzYWdlICsgXHJcbiAgICAgICAgICAgICAgICAgICAgIGA8ZGl2IGlkPVwiYCtjb250YWluZXJJZCtgX2ltYWdlXCIgc3R5bGU9J21hcmdpbjphdXRvOyc+YCArICB0aGlzLmdldEltYWdlKGJ1c3lJbmZvcm1hdGlvbi5pbWFnZUlkLCBidXN5SW5mb3JtYXRpb24uaW1hZ2VTaXplKSArIGA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5gO1xyXG4gICAgICAgIHJldHVybiBodG1sO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGltYWdlIGZvciB0aGUgZ2l2ZW4gaWQgd2l0aCB0aGUgZ2l2ZW4gaW1hZ2VTaXplXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SW1hZ2VJZH0gaW1hZ2VJZFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGltYWdlU2l6ZVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBDb21tb25MYXlvdXRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEltYWdlKGltYWdlSWQ6IEltYWdlSWQsIGltYWdlU2l6ZTogbnVtYmVyKTogc3RyaW5ne1xyXG4gICAgICAgIGlmKGltYWdlSWQgPT0gSW1hZ2VJZC5kZWZhdWx0SW1hZ2Upe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREZWZhdWx0SW1hZ2UoaW1hZ2VTaXplKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihpbWFnZUlkID09IEltYWdlSWQuZGlzY29ubmVjdGVkSW1hZ2Upe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREaXNjb25uZWN0ZWRJbWFnZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRpc2Nvbm5lY3RlZCBpbWFnZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIENvbW1vbkxheW91dFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0RGlzY29ubmVjdGVkSW1hZ2UoKTpzdHJpbmd7XHJcbiAgICAgICAgbGV0IGltYWdlUHJvdmlkZXIgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25Db21tb25MYXlvdXRQcm92aWRlci5JbWFnZVByb3ZpZGVySWQpIGFzIElJbWFnZVByb3ZpZGVyO1xyXG4gICAgICAgIGlmKGltYWdlUHJvdmlkZXIgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbWFnZVByb3ZpZGVyLmdldEltYWdlKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kaXNjb25uZWN0ZWQuc3ZnXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBidXN5IGltYWdlIHdpdGggdGhlIGdpdmVuIHNpemVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNpemVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tbW9uTGF5b3V0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXREZWZhdWx0SW1hZ2Uoc2l6ZTogbnVtYmVyKXtcclxuICAgICAgICBsZXQgaW1hZ2VQcm92aWRlciA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbkNvbW1vbkxheW91dFByb3ZpZGVyLkltYWdlUHJvdmlkZXJJZCkgYXMgSUltYWdlUHJvdmlkZXI7XHJcbiAgICAgICAgaWYoaW1hZ2VQcm92aWRlciA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBidXN5SW1hZ2UgPSBpbWFnZVByb3ZpZGVyLmdldEltYWdlKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9idXN5LnN2Z1wiKTtcclxuICAgICAgICBidXN5SW1hZ2UgPSBidXN5SW1hZ2UucmVwbGFjZSgnd2lkdGg9XCIxMjBcIicsICd3aWR0aD1cIicgKyBzaXplLnRvU3RyaW5nKCkgKyAnXCInKTtcclxuICAgICAgICBidXN5SW1hZ2UgPSBidXN5SW1hZ2UucmVwbGFjZSgnaGVpZ2h0PVwiMTIwXCInLCAnaGVpZ2h0PVwiJyArIHNpemUudG9TdHJpbmcoKSArICdcIicpO1xyXG4gICAgICAgIHJldHVybiBidXN5SW1hZ2U7XHJcbiAgICB9XHJcbn0iXX0=