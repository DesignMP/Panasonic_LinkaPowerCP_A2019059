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
define(["require", "exports", "../../../models/diagnostics/trace/traceDataPoint", "../../common/treeGridToolbarBase", "../../../common/directoryProvider"], function (require, exports, traceDataPoint_1, treeGridToolbarBase_1, directoryProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TraceConfigDatapointsTreeGridToolbar = /** @class */ (function (_super) {
        __extends(TraceConfigDatapointsTreeGridToolbar, _super);
        /**
         * Creates an instance of TraceConfigDatapointsTreeGridToolbar.
         * @param {HTMLDivElement} widgetMainDiv
         * @memberof TraceConfigDatapointsTreeGridToolbar
         */
        function TraceConfigDatapointsTreeGridToolbar(widgetMainDiv) {
            var _this = _super.call(this, widgetMainDiv) || this;
            _this._toolbarIdAdd = "Add";
            _this._toolbarTooltipAdd = "Adds a datapoint";
            _this._toolbarIdAddEmptyLine = "AddEmptyLine";
            _this._toolbarTooltipAddEmptyLine = "Adds an empty line";
            _this._toolbarIdRemoveLine = "RemoveLine";
            _this._toolbarTooltipRemoveLine = "Removes the selected line";
            var imageDirectory = "../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "traceConfigDatapointsWidget/style/images/toolbar/";
            _this.addToolbarButton(_this._toolbarIdAdd, _this._toolbarTooltipAdd, imageDirectory + "add.svg");
            _this.addToolbarButton(_this._toolbarIdAddEmptyLine, _this._toolbarTooltipAddEmptyLine, imageDirectory + "addEmptyLine.svg");
            _this.addToolbarButton(_this._toolbarIdRemoveLine, _this._toolbarTooltipRemoveLine, imageDirectory + "removeLine.svg");
            return _this;
        }
        /**
         * Reacts on toolbar click
         *
         * @param {*} args
         * @param {TraceConfigDatapointsWidget} dataPointWidget
         * @memberof TraceConfigDatapointsTreeGridToolbar
         */
        TraceConfigDatapointsTreeGridToolbar.prototype.toolbarClick = function (args, dataPointWidget) {
            var clickedToolbarId = this.getClickedToolbarId(args.itemName, args.model.toolbarSettings);
            if (clickedToolbarId == this._toolbarIdAdd) {
                args.cancel = true;
                dataPointWidget.openDatapointDialog();
            }
            else if (clickedToolbarId == this._toolbarIdAddEmptyLine) {
                args.cancel = true;
                dataPointWidget.dataModel.addDatapoint(args.model.selectedRowIndex, traceDataPoint_1.TraceDataPoint.createSimpleDataPoint(""));
            }
            else if (clickedToolbarId == this._toolbarIdRemoveLine) {
                args.cancel = true;
                this.deleteSelectedDataPoint(args.model, dataPointWidget.dataModel);
            }
        };
        TraceConfigDatapointsTreeGridToolbar.prototype.initToolbarStates = function () {
            // Disable buttons at startup
            this.disableAddButton(true);
            this.disableAddEmptyButton(true);
            this.disableRemoveButton(true);
        };
        TraceConfigDatapointsTreeGridToolbar.prototype.disableAddButton = function (disable) {
            this.disableButton(this._toolbarIdAdd, disable);
        };
        TraceConfigDatapointsTreeGridToolbar.prototype.disableAddEmptyButton = function (disable) {
            this.disableButton(this._toolbarIdAddEmptyLine, disable);
        };
        TraceConfigDatapointsTreeGridToolbar.prototype.disableRemoveButton = function (disable) {
            this.disableButton(this._toolbarIdRemoveLine, disable);
        };
        TraceConfigDatapointsTreeGridToolbar.prototype.deleteSelectedDataPoint = function (model, dataPointsDataModel) {
            var indexList = new Array();
            for (var i = model.selectedItems.length - 1; i >= 0; i--) {
                indexList.push(model.selectedItems[i].index);
            }
            if (indexList.length > 0) {
                dataPointsDataModel.removeDatapoints(indexList);
                var newSelectionIndex = indexList[indexList.length - 1];
                if (newSelectionIndex >= model.parentRecords.length) {
                    newSelectionIndex = model.parentRecords.length - 1;
                }
                var treeGridObj = this.getTreeGridObject();
                treeGridObj.option("selectedRowIndex", newSelectionIndex, true);
            }
        };
        return TraceConfigDatapointsTreeGridToolbar;
    }(treeGridToolbarBase_1.TreeGridToolbarBase));
    exports.TraceConfigDatapointsTreeGridToolbar = TraceConfigDatapointsTreeGridToolbar;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdEYXRhcG9pbnRzVHJlZUdyaWRUb29sYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldC92aWV3L3RyYWNlQ29uZmlnRGF0YXBvaW50c1RyZWVHcmlkVG9vbGJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBTUE7UUFBMEQsd0RBQW1CO1FBV3pFOzs7O1dBSUc7UUFDSCw4Q0FBWSxhQUE2QjtZQUF6QyxZQUNJLGtCQUFNLGFBQWEsQ0FBQyxTQU92QjtZQXRCZ0IsbUJBQWEsR0FBRSxLQUFLLENBQUM7WUFDckIsd0JBQWtCLEdBQUUsa0JBQWtCLENBQUM7WUFFdkMsNEJBQXNCLEdBQUUsY0FBYyxDQUFDO1lBQ3ZDLGlDQUEyQixHQUFFLG9CQUFvQixDQUFDO1lBRWxELDBCQUFvQixHQUFFLFlBQVksQ0FBQztZQUNuQywrQkFBeUIsR0FBRSwyQkFBMkIsQ0FBQztZQVVwRSxJQUFJLGNBQWMsR0FBRyxXQUFXLEdBQUcscUNBQWlCLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxtREFBbUQsQ0FBQztZQUVqSSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSSxDQUFDLGFBQWEsRUFBRSxLQUFJLENBQUMsa0JBQWtCLEVBQUUsY0FBYyxHQUFHLFNBQVMsQ0FBQyxDQUFDO1lBQy9GLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFJLENBQUMsc0JBQXNCLEVBQUUsS0FBSSxDQUFDLDJCQUEyQixFQUFFLGNBQWMsR0FBRyxrQkFBa0IsQ0FBQyxDQUFDO1lBQzFILEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFJLENBQUMsb0JBQW9CLEVBQUUsS0FBSSxDQUFDLHlCQUF5QixFQUFFLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDOztRQUN4SCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksMkRBQVksR0FB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MEQseUNBQW1CLEdBbUY1RTtJQW5GWSxvRkFBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmFjZURhdGFQb2ludCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvdHJhY2VEYXRhUG9pbnRcIjtcclxuaW1wb3J0IHsgVHJlZUdyaWRUb29sYmFyQmFzZSB9IGZyb20gXCIuLi8uLi9jb21tb24vdHJlZUdyaWRUb29sYmFyQmFzZVwiO1xyXG5pbXBvcnQgeyBEaXJlY3RvcnlQcm92aWRlciB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZGlyZWN0b3J5UHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0IH0gZnJvbSBcIi4uL3RyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFwiO1xyXG5pbXBvcnQgeyBJVHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsIH0gZnJvbSBcIi4uL21vZGVsL3RyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRyYWNlQ29uZmlnRGF0YXBvaW50c1RyZWVHcmlkVG9vbGJhciBleHRlbmRzIFRyZWVHcmlkVG9vbGJhckJhc2V7XHJcbiAgICBcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJJZEFkZCA9XCJBZGRcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJUb29sdGlwQWRkID1cIkFkZHMgYSBkYXRhcG9pbnRcIjtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFySWRBZGRFbXB0eUxpbmUgPVwiQWRkRW1wdHlMaW5lXCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFyVG9vbHRpcEFkZEVtcHR5TGluZSA9XCJBZGRzIGFuIGVtcHR5IGxpbmVcIjtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFySWRSZW1vdmVMaW5lID1cIlJlbW92ZUxpbmVcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJUb29sdGlwUmVtb3ZlTGluZSA9XCJSZW1vdmVzIHRoZSBzZWxlY3RlZCBsaW5lXCI7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBUcmFjZUNvbmZpZ0RhdGFwb2ludHNUcmVlR3JpZFRvb2xiYXIuXHJcbiAgICAgKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSB3aWRnZXRNYWluRGl2XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdEYXRhcG9pbnRzVHJlZUdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHdpZGdldE1haW5EaXY6IEhUTUxEaXZFbGVtZW50KXtcclxuICAgICAgICBzdXBlcih3aWRnZXRNYWluRGl2KTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaW1hZ2VEaXJlY3RvcnkgPSBcIi4uLy4uLy4uL1wiICsgRGlyZWN0b3J5UHJvdmlkZXIuZ2V0V2lkZ2V0c0RpcmVjdG9yeSgpICsgXCJ0cmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXQvc3R5bGUvaW1hZ2VzL3Rvb2xiYXIvXCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5hZGRUb29sYmFyQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEFkZCwgdGhpcy5fdG9vbGJhclRvb2x0aXBBZGQsIGltYWdlRGlyZWN0b3J5ICsgXCJhZGQuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMuYWRkVG9vbGJhckJ1dHRvbih0aGlzLl90b29sYmFySWRBZGRFbXB0eUxpbmUsIHRoaXMuX3Rvb2xiYXJUb29sdGlwQWRkRW1wdHlMaW5lLCBpbWFnZURpcmVjdG9yeSArIFwiYWRkRW1wdHlMaW5lLnN2Z1wiKTtcclxuICAgICAgICB0aGlzLmFkZFRvb2xiYXJCdXR0b24odGhpcy5fdG9vbGJhcklkUmVtb3ZlTGluZSwgdGhpcy5fdG9vbGJhclRvb2x0aXBSZW1vdmVMaW5lLCBpbWFnZURpcmVjdG9yeSArIFwicmVtb3ZlTGluZS5zdmdcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFjdHMgb24gdG9vbGJhciBjbGlja1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQHBhcmFtIHtUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXR9IGRhdGFQb2ludFdpZGdldFxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c1RyZWVHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdG9vbGJhckNsaWNrIChhcmdzLCBkYXRhUG9pbnRXaWRnZXQ6IFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldCl7XHJcbiAgICAgICAgdmFyIGNsaWNrZWRUb29sYmFySWQgPSB0aGlzLmdldENsaWNrZWRUb29sYmFySWQoYXJncy5pdGVtTmFtZSwgYXJncy5tb2RlbC50b29sYmFyU2V0dGluZ3MpO1xyXG4gICAgICAgIGlmIChjbGlja2VkVG9vbGJhcklkID09IHRoaXMuX3Rvb2xiYXJJZEFkZCkge1xyXG4gICAgICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgICAgIGRhdGFQb2ludFdpZGdldC5vcGVuRGF0YXBvaW50RGlhbG9nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNsaWNrZWRUb29sYmFySWQgPT0gdGhpcy5fdG9vbGJhcklkQWRkRW1wdHlMaW5lKSB7XHJcbiAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICAgICAgKGRhdGFQb2ludFdpZGdldC5kYXRhTW9kZWwgYXMgSVRyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbCkuYWRkRGF0YXBvaW50KGFyZ3MubW9kZWwuc2VsZWN0ZWRSb3dJbmRleCwgVHJhY2VEYXRhUG9pbnQuY3JlYXRlU2ltcGxlRGF0YVBvaW50KFwiXCIpKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2UgaWYgKGNsaWNrZWRUb29sYmFySWQgPT0gdGhpcy5fdG9vbGJhcklkUmVtb3ZlTGluZSkge1xyXG4gICAgICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlU2VsZWN0ZWREYXRhUG9pbnQoYXJncy5tb2RlbCwgZGF0YVBvaW50V2lkZ2V0LmRhdGFNb2RlbCBhcyBJVHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBpbml0VG9vbGJhclN0YXRlcygpe1xyXG4gICAgICAgIC8vIERpc2FibGUgYnV0dG9ucyBhdCBzdGFydHVwXHJcbiAgICAgICAgdGhpcy5kaXNhYmxlQWRkQnV0dG9uKHRydWUpO1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZUFkZEVtcHR5QnV0dG9uKHRydWUpO1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZVJlbW92ZUJ1dHRvbih0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzYWJsZUFkZEJ1dHRvbihkaXNhYmxlOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLmRpc2FibGVCdXR0b24odGhpcy5fdG9vbGJhcklkQWRkLCBkaXNhYmxlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzYWJsZUFkZEVtcHR5QnV0dG9uKGRpc2FibGU6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbih0aGlzLl90b29sYmFySWRBZGRFbXB0eUxpbmUsIGRpc2FibGUpO1xyXG4gICAgfVxyXG4gICBcclxuICAgIHB1YmxpYyBkaXNhYmxlUmVtb3ZlQnV0dG9uKGRpc2FibGU6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbih0aGlzLl90b29sYmFySWRSZW1vdmVMaW5lLCBkaXNhYmxlKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBkZWxldGVTZWxlY3RlZERhdGFQb2ludChtb2RlbCwgZGF0YVBvaW50c0RhdGFNb2RlbDogSVRyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbCl7XHJcbiAgICAgICAgbGV0IGluZGV4TGlzdCA9IG5ldyBBcnJheTxudW1iZXI+KCk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gbW9kZWwuc2VsZWN0ZWRJdGVtcy5sZW5ndGgtMTsgaSA+PSAwOyBpLS0pe1xyXG4gICAgICAgICAgICBpbmRleExpc3QucHVzaChtb2RlbC5zZWxlY3RlZEl0ZW1zW2ldLmluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaW5kZXhMaXN0Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICBkYXRhUG9pbnRzRGF0YU1vZGVsLnJlbW92ZURhdGFwb2ludHMoaW5kZXhMaXN0KTtcclxuICAgICAgICAgICAgbGV0IG5ld1NlbGVjdGlvbkluZGV4ID0gaW5kZXhMaXN0W2luZGV4TGlzdC5sZW5ndGgtMV07XHJcbiAgICAgICAgICAgIGlmKG5ld1NlbGVjdGlvbkluZGV4ID49IG1vZGVsLnBhcmVudFJlY29yZHMubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgIG5ld1NlbGVjdGlvbkluZGV4ID0gbW9kZWwucGFyZW50UmVjb3Jkcy5sZW5ndGgtMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgdHJlZUdyaWRPYmogPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcbiAgICAgICAgICAgIHRyZWVHcmlkT2JqLm9wdGlvbihcInNlbGVjdGVkUm93SW5kZXhcIiwgbmV3U2VsZWN0aW9uSW5kZXgsIHRydWUpOyBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=