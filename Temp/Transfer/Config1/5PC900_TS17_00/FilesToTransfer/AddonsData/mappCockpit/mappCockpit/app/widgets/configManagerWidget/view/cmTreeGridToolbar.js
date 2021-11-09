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
define(["require", "exports", "../../../models/online/mappCockpitComponent", "../../common/treeGridToolbarBase", "../../../common/directoryProvider"], function (require, exports, mappCockpitComponent_1, treeGridToolbarBase_1, directoryProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CmTreeGridToolbar = /** @class */ (function (_super) {
        __extends(CmTreeGridToolbar, _super);
        /**
         * Creates an instance of CmTreeGridToolbar.
         * @param {HTMLDivElement} widgetMainDiv
         * @memberof CmTreeGridToolbar
         */
        function CmTreeGridToolbar(widgetMainDiv) {
            var _this = _super.call(this, widgetMainDiv) || this;
            _this._toolbarIdSaveParameters = "Save";
            _this._toolbarToolTipSaveParameters = "Save parameters";
            var imageDirectory = "../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "configManagerWidget/style/images/toolbar/";
            _this.addToolbarButton(_this._toolbarIdSaveParameters, _this._toolbarToolTipSaveParameters, imageDirectory + "save.svg");
            _this.addCollapseButton();
            _this.addExpandButton();
            return _this;
        }
        /**
         * Reacts on toolbar click
         *
         * @param {*} args
         * @param {IConfigManagerWidget} widget
         * @memberof CmTreeGridToolbar
         */
        CmTreeGridToolbar.prototype.toolbarClick = function (args, widget) {
            _super.prototype.toolbarClickBase.call(this, args);
            var clickedToolbarId = this.getClickedToolbarId(args.itemName, args.model.toolbarSettings);
            if (clickedToolbarId == this._toolbarIdSaveParameters) {
                args.cancel = true;
                if (widget.saveParametersMethod != undefined) {
                    if (widget.saveParametersMethod.isExecutable != undefined) {
                        if (widget.saveParametersMethod.isExecutable.value == true) {
                            mappCockpitComponent_1.MappCockpitComponentMethod.execute(widget.saveParametersMethod);
                        }
                    }
                }
            }
        };
        CmTreeGridToolbar.prototype.disableSaveButton = function (disable) {
            this.disableButton(this._toolbarIdSaveParameters, disable);
        };
        return CmTreeGridToolbar;
    }(treeGridToolbarBase_1.TreeGridToolbarBase));
    exports.CmTreeGridToolbar = CmTreeGridToolbar;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21UcmVlR3JpZFRvb2xiYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29uZmlnTWFuYWdlcldpZGdldC92aWV3L2NtVHJlZUdyaWRUb29sYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFLQTtRQUF1QyxxQ0FBbUI7UUFLdEQ7Ozs7V0FJRztRQUNILDJCQUFZLGFBQTZCO1lBQXpDLFlBQ0ksa0JBQU0sYUFBYSxDQUFDLFNBUXZCO1lBakJnQiw4QkFBd0IsR0FBRSxNQUFNLENBQUM7WUFDakMsbUNBQTZCLEdBQUUsaUJBQWlCLENBQUM7WUFVOUQsSUFBSSxjQUFjLEdBQUcsV0FBVyxHQUFHLHFDQUFpQixDQUFDLG1CQUFtQixFQUFFLEdBQUcsMkNBQTJDLENBQUM7WUFFekgsS0FBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUksQ0FBQyx3QkFBd0IsRUFBRSxLQUFJLENBQUMsNkJBQTZCLEVBQUUsY0FBYyxHQUFHLFVBQVUsQ0FBQyxDQUFDO1lBRXRILEtBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3pCLEtBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQzs7UUFDM0IsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLHdDQUFZLEdBQW5CLFVBQW9CLElBQUksRUFBRSxNQUE0QjtZQUNsRCxpQkFBTSxnQkFBZ0IsWUFBQyxJQUFJLENBQUMsQ0FBQztZQUM3QixJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDM0YsSUFBSSxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsd0JBQXdCLEVBQUU7Z0JBQ25ELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNuQixJQUFHLE1BQU0sQ0FBQyxvQkFBb0IsSUFBSSxTQUFTLEVBQUM7b0JBQ3hDLElBQUcsTUFBTSxDQUFDLG9CQUFvQixDQUFDLFlBQVksSUFBSSxTQUFTLEVBQUM7d0JBQ3JELElBQUcsTUFBTSxDQUFDLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFDOzRCQUN0RCxpREFBMEIsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUM7eUJBQ25FO3FCQUNKO2lCQUNKO2FBQ0o7UUFDTCxDQUFDO1FBRU0sNkNBQWlCLEdBQXhCLFVBQXlCLE9BQWdCO1lBQ3JDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQy9ELENBQUM7UUFDTCx3QkFBQztJQUFELENBQUMsQUE5Q0QsQ0FBdUMseUNBQW1CLEdBOEN6RDtJQTlDWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFRyZWVHcmlkVG9vbGJhckJhc2UgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3RyZWVHcmlkVG9vbGJhckJhc2VcIjtcclxuaW1wb3J0IHsgRGlyZWN0b3J5UHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2RpcmVjdG9yeVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IElDb25maWdNYW5hZ2VyV2lkZ2V0IH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvY29uZmlnTWFuYWdlcldpZGdldEludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENtVHJlZUdyaWRUb29sYmFyIGV4dGVuZHMgVHJlZUdyaWRUb29sYmFyQmFzZXtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhcklkU2F2ZVBhcmFtZXRlcnMgPVwiU2F2ZVwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhclRvb2xUaXBTYXZlUGFyYW1ldGVycyA9XCJTYXZlIHBhcmFtZXRlcnNcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ21UcmVlR3JpZFRvb2xiYXIuXHJcbiAgICAgKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSB3aWRnZXRNYWluRGl2XHJcbiAgICAgKiBAbWVtYmVyb2YgQ21UcmVlR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Iod2lkZ2V0TWFpbkRpdjogSFRNTERpdkVsZW1lbnQpe1xyXG4gICAgICAgIHN1cGVyKHdpZGdldE1haW5EaXYpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBpbWFnZURpcmVjdG9yeSA9IFwiLi4vLi4vLi4vXCIgKyBEaXJlY3RvcnlQcm92aWRlci5nZXRXaWRnZXRzRGlyZWN0b3J5KCkgKyBcImNvbmZpZ01hbmFnZXJXaWRnZXQvc3R5bGUvaW1hZ2VzL3Rvb2xiYXIvXCI7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkVG9vbGJhckJ1dHRvbih0aGlzLl90b29sYmFySWRTYXZlUGFyYW1ldGVycywgdGhpcy5fdG9vbGJhclRvb2xUaXBTYXZlUGFyYW1ldGVycywgaW1hZ2VEaXJlY3RvcnkgKyBcInNhdmUuc3ZnXCIpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZENvbGxhcHNlQnV0dG9uKCk7XHJcbiAgICAgICAgdGhpcy5hZGRFeHBhbmRCdXR0b24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWN0cyBvbiB0b29sYmFyIGNsaWNrXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAcGFyYW0ge0lDb25maWdNYW5hZ2VyV2lkZ2V0fSB3aWRnZXRcclxuICAgICAqIEBtZW1iZXJvZiBDbVRyZWVHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdG9vbGJhckNsaWNrKGFyZ3MsIHdpZGdldDogSUNvbmZpZ01hbmFnZXJXaWRnZXQpe1xyXG4gICAgICAgIHN1cGVyLnRvb2xiYXJDbGlja0Jhc2UoYXJncyk7XHJcbiAgICAgICAgdmFyIGNsaWNrZWRUb29sYmFySWQgPSB0aGlzLmdldENsaWNrZWRUb29sYmFySWQoYXJncy5pdGVtTmFtZSwgYXJncy5tb2RlbC50b29sYmFyU2V0dGluZ3MpO1xyXG4gICAgICAgIGlmIChjbGlja2VkVG9vbGJhcklkID09IHRoaXMuX3Rvb2xiYXJJZFNhdmVQYXJhbWV0ZXJzKSB7XHJcbiAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYod2lkZ2V0LnNhdmVQYXJhbWV0ZXJzTWV0aG9kICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBpZih3aWRnZXQuc2F2ZVBhcmFtZXRlcnNNZXRob2QuaXNFeGVjdXRhYmxlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYod2lkZ2V0LnNhdmVQYXJhbWV0ZXJzTWV0aG9kLmlzRXhlY3V0YWJsZS52YWx1ZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QuZXhlY3V0ZSh3aWRnZXQuc2F2ZVBhcmFtZXRlcnNNZXRob2QpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzYWJsZVNhdmVCdXR0b24oZGlzYWJsZTogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZFNhdmVQYXJhbWV0ZXJzLCBkaXNhYmxlKTtcclxuICAgIH1cclxufSJdfQ==