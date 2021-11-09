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
define(["require", "exports", "../../common/treeGridToolbarBase", "../../../common/directoryProvider"], function (require, exports, treeGridToolbarBase_1, directoryProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TraceConfigTimingTreeGridToolbar = /** @class */ (function (_super) {
        __extends(TraceConfigTimingTreeGridToolbar, _super);
        /**
         * Creates an instance of TraceConfigTimingTreeGridToolbar.
         * @param {HTMLDivElement} widgetMainDiv
         * @memberof TraceConfigTimingTreeGridToolbar
         */
        function TraceConfigTimingTreeGridToolbar(widgetMainDiv) {
            var _this = _super.call(this, widgetMainDiv) || this;
            _this.toolbarIdEmpty = "Empty";
            _this.toolbarToolTipEmpty = " ";
            var imageDirectory = "../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "traceConfigTimingWidget/style/images/toolbar/";
            // dummy toolbar button needed to show a toolbar
            _this.addToolbarButton(_this.toolbarIdEmpty, _this.toolbarToolTipEmpty, imageDirectory + "empty.svg");
            return _this;
        }
        TraceConfigTimingTreeGridToolbar.prototype.disableDummyButton = function () {
            this.disableButton(this.toolbarIdEmpty, true);
        };
        return TraceConfigTimingTreeGridToolbar;
    }(treeGridToolbarBase_1.TreeGridToolbarBase));
    exports.TraceConfigTimingTreeGridToolbar = TraceConfigTimingTreeGridToolbar;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdUaW1pbmdUcmVlR3JpZFRvb2xiYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvdHJhY2VDb25maWdUaW1pbmdXaWRnZXQvdmlldy90cmFjZUNvbmZpZ1RpbWluZ1RyZWVHcmlkVG9vbGJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBR0E7UUFBc0Qsb0RBQW1CO1FBS3JFOzs7O1dBSUc7UUFDSCwwQ0FBWSxhQUE2QjtZQUF6QyxZQUNJLGtCQUFNLGFBQWEsQ0FBQyxTQU12QjtZQWZnQixvQkFBYyxHQUFFLE9BQU8sQ0FBQztZQUN4Qix5QkFBbUIsR0FBRSxHQUFHLENBQUM7WUFVdEMsSUFBSSxjQUFjLEdBQUcsV0FBVyxHQUFHLHFDQUFpQixDQUFDLG1CQUFtQixFQUFFLEdBQUcsK0NBQStDLENBQUM7WUFFN0gsZ0RBQWdEO1lBQ2hELEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFJLENBQUMsY0FBYyxFQUFFLEtBQUksQ0FBQyxtQkFBbUIsRUFBRSxjQUFjLEdBQUcsV0FBVyxDQUFDLENBQUM7O1FBQ3ZHLENBQUM7UUFFRCw2REFBa0IsR0FBbEI7WUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUNMLHVDQUFDO0lBQUQsQ0FBQyxBQXRCRCxDQUFzRCx5Q0FBbUIsR0FzQnhFO0lBdEJZLDRFQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyZWVHcmlkVG9vbGJhckJhc2UgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3RyZWVHcmlkVG9vbGJhckJhc2VcIjtcclxuaW1wb3J0IHsgRGlyZWN0b3J5UHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2RpcmVjdG9yeVByb3ZpZGVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVHJhY2VDb25maWdUaW1pbmdUcmVlR3JpZFRvb2xiYXIgZXh0ZW5kcyBUcmVlR3JpZFRvb2xiYXJCYXNle1xyXG4gICAgXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRvb2xiYXJJZEVtcHR5ID1cIkVtcHR5XCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRvb2xiYXJUb29sVGlwRW1wdHkgPVwiIFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBUcmFjZUNvbmZpZ1RpbWluZ1RyZWVHcmlkVG9vbGJhci5cclxuICAgICAqIEBwYXJhbSB7SFRNTERpdkVsZW1lbnR9IHdpZGdldE1haW5EaXZcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RpbWluZ1RyZWVHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih3aWRnZXRNYWluRGl2OiBIVE1MRGl2RWxlbWVudCl7XHJcbiAgICAgICAgc3VwZXIod2lkZ2V0TWFpbkRpdik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGltYWdlRGlyZWN0b3J5ID0gXCIuLi8uLi8uLi9cIiArIERpcmVjdG9yeVByb3ZpZGVyLmdldFdpZGdldHNEaXJlY3RvcnkoKSArIFwidHJhY2VDb25maWdUaW1pbmdXaWRnZXQvc3R5bGUvaW1hZ2VzL3Rvb2xiYXIvXCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZHVtbXkgdG9vbGJhciBidXR0b24gbmVlZGVkIHRvIHNob3cgYSB0b29sYmFyXHJcbiAgICAgICAgdGhpcy5hZGRUb29sYmFyQnV0dG9uKHRoaXMudG9vbGJhcklkRW1wdHksIHRoaXMudG9vbGJhclRvb2xUaXBFbXB0eSwgaW1hZ2VEaXJlY3RvcnkgKyBcImVtcHR5LnN2Z1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNhYmxlRHVtbXlCdXR0b24oKXtcclxuICAgICAgICB0aGlzLmRpc2FibGVCdXR0b24odGhpcy50b29sYmFySWRFbXB0eSwgdHJ1ZSk7XHJcbiAgICB9XHJcbn0iXX0=