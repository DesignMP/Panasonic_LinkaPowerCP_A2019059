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
define(["require", "exports", "../../common/treeGridToolbarBase", "../../../common/directoryProvider", "../helpers/exportHelper", "./signalManagerExportDropDownMenu"], function (require, exports, treeGridToolbarBase_1, directoryProvider_1, exportHelper_1, signalManagerExportDropDownMenu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SignalManagerTreeGridToolbar = /** @class */ (function (_super) {
        __extends(SignalManagerTreeGridToolbar, _super);
        /**
         * Creates an instance of SignalManagerTreeGridToolbar.
         * @param {HTMLDivElement} widgetDiv
         * @memberof SignalManagerTreeGridToolbar
         */
        function SignalManagerTreeGridToolbar(widgetDiv) {
            var _this = _super.call(this, widgetDiv) || this;
            _this._toolbarIdImport = "Import";
            _this._toolbarToolTipImport = "Imports trace data";
            _this._toolbarIdExport = "Export";
            _this._toolbarToolTipExport = "Exports trace data";
            _this._toolbarIdCalculation = "Calculation";
            _this._toolbarToolTipCalculation = "Inserts a new calculation";
            _this._toolbarIdDelete = "Delete";
            _this._toolbarToolTipDelete = "Delete trace data";
            _this._toolbarIdEditMode = "EditMode";
            _this._toolbarToolTipEditMode = "Open/Close edit mode";
            _this._editModeActivated = false;
            var imageDirectory = "../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "signalManagerWidget/style/images/toolbar/";
            // buttons for the editor
            _this.addToolbarButton(_this._toolbarIdImport, _this._toolbarToolTipImport, imageDirectory + "import.svg");
            _this.addToolbarButton(_this._toolbarIdExport, _this._toolbarToolTipExport, imageDirectory + "export.svg");
            _this.addToolbarButton(_this._toolbarIdCalculation, _this._toolbarToolTipCalculation, imageDirectory + "calculation.svg");
            _this.addToolbarButton(_this._toolbarIdDelete, _this._toolbarToolTipDelete, imageDirectory + "delete.svg");
            // global used buttons of tree grid
            _this.setCollapseLevel(1);
            _this.addCollapseButton();
            _this.addExpandButton();
            // buttons on the right side
            _this.addToolbarButton(_this._toolbarIdEditMode, _this._toolbarToolTipEditMode, imageDirectory + "editMode.svg", treeGridToolbarBase_1.ToolbarButtonAlignment.Right);
            _this.dropDownMenu = new signalManagerExportDropDownMenu_1.SignalManagerExportDropDownMenu(_this, _this._widgetMainDiv);
            return _this;
        }
        /**
         * Reacts on toolbar click
         *
         * @param {*} args
         * @param {*} signalManagerWidget
         * @memberof SignalManagerTreeGridToolbar
         */
        SignalManagerTreeGridToolbar.prototype.toolbarClick = function (args, signalManagerWidget) {
            //set edit cell to false so treegrid can be updated
            signalManagerWidget.setCellEdit(false);
            _super.prototype.toolbarClickBase.call(this, args);
            var clickedToolbarId = this.getClickedToolbarId(args.itemName, args.model.toolbarSettings);
            if (clickedToolbarId == this._toolbarIdImport) {
                signalManagerWidget.importSerieGroup();
            }
            else if (clickedToolbarId == this._toolbarIdExport) {
                if (!this.dropDownMenu.isOpened) {
                    var selectedItemsExportable = signalManagerWidget.canItemsBeExported(args.model.selectedItems);
                    this.dropDownMenu.showDropDownMenu(signalManagerWidget, args.model, selectedItemsExportable);
                }
                else {
                    this.dropDownMenu.hideDropDownMenu();
                }
            }
            else if (clickedToolbarId == this._toolbarIdCalculation) {
                signalManagerWidget.insertCalculation(args.model.selectedItem);
            }
            else if (clickedToolbarId == this._toolbarIdDelete) {
                var selectedItems = Object.assign([], args.model.selectedItems);
                if (signalManagerWidget.containsItemWithinRecentOrUploaded(selectedItems)) {
                    signalManagerWidget.showMessageBoxForDeletingItem(selectedItems);
                }
                else {
                    signalManagerWidget.deleteItems(selectedItems);
                }
            }
            else if (clickedToolbarId == this._toolbarIdEditMode) {
                this._editModeActivated = !this._editModeActivated;
                this.activateEditModeButton(this._editModeActivated);
                signalManagerWidget.activateEditMode(this._editModeActivated);
            }
        };
        SignalManagerTreeGridToolbar.prototype.exportSelectedTraceData = function (signalManagerWidget, selectedItems) {
            var items = new exportHelper_1.ExportHelper().getExportableElements(selectedItems);
            signalManagerWidget.exportSerieGroup(items);
        };
        SignalManagerTreeGridToolbar.prototype.exportAllTraceDataAsCsv = function (signalManagerWidget, allItems) {
            var itemsTobeExported = Object.assign([], allItems);
            var items = new exportHelper_1.ExportHelper().getExportableElements(itemsTobeExported);
            signalManagerWidget.exportSerieGroup(items);
        };
        SignalManagerTreeGridToolbar.prototype.exportAllTraceData = function (signalManagerWidget) {
            signalManagerWidget.exportSignalManagerData();
        };
        SignalManagerTreeGridToolbar.prototype.disableExportButton = function (disable) {
            this.disableButton(this._toolbarIdExport, disable);
        };
        SignalManagerTreeGridToolbar.prototype.disableDeleteButton = function (disable) {
            this.disableButton(this._toolbarIdDelete, disable);
        };
        SignalManagerTreeGridToolbar.prototype.disableInsertCalculationButton = function (disable) {
            this.disableButton(this._toolbarIdCalculation, disable);
        };
        SignalManagerTreeGridToolbar.prototype.activateEditModeButton = function (activate) {
            this._editModeActivated = activate;
            this.activateButton(this._toolbarIdEditMode, activate);
        };
        return SignalManagerTreeGridToolbar;
    }(treeGridToolbarBase_1.TreeGridToolbarBase));
    exports.SignalManagerTreeGridToolbar = SignalManagerTreeGridToolbar;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlclRyZWVHcmlkVG9vbGJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9zaWduYWxNYW5hZ2VyV2lkZ2V0L3ZpZXcvc2lnbmFsTWFuYWdlclRyZWVHcmlkVG9vbGJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBTUE7UUFBa0QsZ0RBQW1CO1FBcUJqRTs7OztXQUlHO1FBQ0gsc0NBQVksU0FBeUI7WUFBckMsWUFDSSxrQkFBTSxTQUFTLENBQUMsU0FtQm5CO1lBNUNnQixzQkFBZ0IsR0FBRyxRQUFRLENBQUM7WUFDNUIsMkJBQXFCLEdBQUcsb0JBQW9CLENBQUM7WUFFN0Msc0JBQWdCLEdBQUcsUUFBUSxDQUFDO1lBQzVCLDJCQUFxQixHQUFHLG9CQUFvQixDQUFDO1lBRTdDLDJCQUFxQixHQUFHLGFBQWEsQ0FBQztZQUN0QyxnQ0FBMEIsR0FBRywyQkFBMkIsQ0FBQztZQUV6RCxzQkFBZ0IsR0FBRyxRQUFRLENBQUM7WUFDNUIsMkJBQXFCLEdBQUcsbUJBQW1CLENBQUM7WUFFNUMsd0JBQWtCLEdBQUcsVUFBVSxDQUFDO1lBQ2hDLDZCQUF1QixHQUFHLHNCQUFzQixDQUFDO1lBSTFELHdCQUFrQixHQUFHLEtBQUssQ0FBQztZQVUvQixJQUFJLGNBQWMsR0FBRyxXQUFXLEdBQUcscUNBQWlCLENBQUMsbUJBQW1CLEVBQUUsR0FBRywyQ0FBMkMsQ0FBQztZQUV6SCx5QkFBeUI7WUFDekIsS0FBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxLQUFJLENBQUMscUJBQXFCLEVBQUUsY0FBYyxHQUFHLFlBQVksQ0FBQyxDQUFDO1lBQ3hHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsS0FBSSxDQUFDLHFCQUFxQixFQUFFLGNBQWMsR0FBRyxZQUFZLENBQUMsQ0FBQztZQUN4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LENBQUM7WUFDbkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDM0QsQ0FBQztRQUNMLG1DQUFDO0lBQUQsQ0FBQyxBQTFIRCxDQUFrRCx5Q0FBbUIsR0EwSHBFO0lBMUhZLG9FQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyZWVHcmlkVG9vbGJhckJhc2UsIFRvb2xiYXJCdXR0b25BbGlnbm1lbnQgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3RyZWVHcmlkVG9vbGJhckJhc2VcIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlcldpZGdldCB9IGZyb20gXCIuLi9zaWduYWxNYW5hZ2VyV2lkZ2V0XCI7XHJcbmltcG9ydCB7IERpcmVjdG9yeVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9kaXJlY3RvcnlQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBFeHBvcnRIZWxwZXIgfSBmcm9tIFwiLi4vaGVscGVycy9leHBvcnRIZWxwZXJcIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckV4cG9ydERyb3BEb3duTWVudSB9IGZyb20gXCIuL3NpZ25hbE1hbmFnZXJFeHBvcnREcm9wRG93bk1lbnVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTaWduYWxNYW5hZ2VyVHJlZUdyaWRUb29sYmFyIGV4dGVuZHMgVHJlZUdyaWRUb29sYmFyQmFzZSB7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhcklkSW1wb3J0ID0gXCJJbXBvcnRcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJUb29sVGlwSW1wb3J0ID0gXCJJbXBvcnRzIHRyYWNlIGRhdGFcIjtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFySWRFeHBvcnQgPSBcIkV4cG9ydFwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhclRvb2xUaXBFeHBvcnQgPSBcIkV4cG9ydHMgdHJhY2UgZGF0YVwiO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJJZENhbGN1bGF0aW9uID0gXCJDYWxjdWxhdGlvblwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhclRvb2xUaXBDYWxjdWxhdGlvbiA9IFwiSW5zZXJ0cyBhIG5ldyBjYWxjdWxhdGlvblwiO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJJZERlbGV0ZSA9IFwiRGVsZXRlXCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFyVG9vbFRpcERlbGV0ZSA9IFwiRGVsZXRlIHRyYWNlIGRhdGFcIjtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFySWRFZGl0TW9kZSA9IFwiRWRpdE1vZGVcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJUb29sVGlwRWRpdE1vZGUgPSBcIk9wZW4vQ2xvc2UgZWRpdCBtb2RlXCI7XHJcbiAgICBcclxuICAgIHByaXZhdGUgZHJvcERvd25NZW51OiBTaWduYWxNYW5hZ2VyRXhwb3J0RHJvcERvd25NZW51O1xyXG5cclxuICAgIHByaXZhdGUgX2VkaXRNb2RlQWN0aXZhdGVkID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFNpZ25hbE1hbmFnZXJUcmVlR3JpZFRvb2xiYXIuXHJcbiAgICAgKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSB3aWRnZXREaXZcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyVHJlZUdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHdpZGdldERpdjogSFRNTERpdkVsZW1lbnQpIHtcclxuICAgICAgICBzdXBlcih3aWRnZXREaXYpO1xyXG5cclxuICAgICAgICBsZXQgaW1hZ2VEaXJlY3RvcnkgPSBcIi4uLy4uLy4uL1wiICsgRGlyZWN0b3J5UHJvdmlkZXIuZ2V0V2lkZ2V0c0RpcmVjdG9yeSgpICsgXCJzaWduYWxNYW5hZ2VyV2lkZ2V0L3N0eWxlL2ltYWdlcy90b29sYmFyL1wiO1xyXG5cclxuICAgICAgICAvLyBidXR0b25zIGZvciB0aGUgZWRpdG9yXHJcbiAgICAgICAgdGhpcy5hZGRUb29sYmFyQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEltcG9ydCwgdGhpcy5fdG9vbGJhclRvb2xUaXBJbXBvcnQsIGltYWdlRGlyZWN0b3J5ICsgXCJpbXBvcnQuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMuYWRkVG9vbGJhckJ1dHRvbih0aGlzLl90b29sYmFySWRFeHBvcnQsIHRoaXMuX3Rvb2xiYXJUb29sVGlwRXhwb3J0LCBpbWFnZURpcmVjdG9yeSArIFwiZXhwb3J0LnN2Z1wiKTtcclxuICAgICAgICB0aGlzLmFkZFRvb2xiYXJCdXR0b24odGhpcy5fdG9vbGJhcklkQ2FsY3VsYXRpb24sIHRoaXMuX3Rvb2xiYXJUb29sVGlwQ2FsY3VsYXRpb24sIGltYWdlRGlyZWN0b3J5ICsgXCJjYWxjdWxhdGlvbi5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5hZGRUb29sYmFyQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZERlbGV0ZSwgdGhpcy5fdG9vbGJhclRvb2xUaXBEZWxldGUsIGltYWdlRGlyZWN0b3J5ICsgXCJkZWxldGUuc3ZnXCIpO1xyXG5cclxuICAgICAgICAvLyBnbG9iYWwgdXNlZCBidXR0b25zIG9mIHRyZWUgZ3JpZFxyXG4gICAgICAgIHRoaXMuc2V0Q29sbGFwc2VMZXZlbCgxKTtcclxuICAgICAgICB0aGlzLmFkZENvbGxhcHNlQnV0dG9uKCk7XHJcbiAgICAgICAgdGhpcy5hZGRFeHBhbmRCdXR0b24oKTtcclxuXHJcbiAgICAgICAgLy8gYnV0dG9ucyBvbiB0aGUgcmlnaHQgc2lkZVxyXG4gICAgICAgIHRoaXMuYWRkVG9vbGJhckJ1dHRvbih0aGlzLl90b29sYmFySWRFZGl0TW9kZSwgdGhpcy5fdG9vbGJhclRvb2xUaXBFZGl0TW9kZSwgaW1hZ2VEaXJlY3RvcnkgKyBcImVkaXRNb2RlLnN2Z1wiLCBUb29sYmFyQnV0dG9uQWxpZ25tZW50LlJpZ2h0KTtcclxuICAgIFxyXG4gICAgICAgIHRoaXMuZHJvcERvd25NZW51ID0gbmV3IFNpZ25hbE1hbmFnZXJFeHBvcnREcm9wRG93bk1lbnUodGhpcywgdGhpcy5fd2lkZ2V0TWFpbkRpdik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFjdHMgb24gdG9vbGJhciBjbGlja1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQHBhcmFtIHsqfSBzaWduYWxNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlclRyZWVHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdG9vbGJhckNsaWNrKGFyZ3MsIHNpZ25hbE1hbmFnZXJXaWRnZXQ6IFNpZ25hbE1hbmFnZXJXaWRnZXQpIHtcclxuICAgICAgICAvL3NldCBlZGl0IGNlbGwgdG8gZmFsc2Ugc28gdHJlZWdyaWQgY2FuIGJlIHVwZGF0ZWRcclxuICAgICAgICBzaWduYWxNYW5hZ2VyV2lkZ2V0LnNldENlbGxFZGl0KGZhbHNlKTtcclxuXHJcbiAgICAgICAgc3VwZXIudG9vbGJhckNsaWNrQmFzZShhcmdzKTtcclxuICAgICAgICB2YXIgY2xpY2tlZFRvb2xiYXJJZCA9IHRoaXMuZ2V0Q2xpY2tlZFRvb2xiYXJJZChhcmdzLml0ZW1OYW1lLCBhcmdzLm1vZGVsLnRvb2xiYXJTZXR0aW5ncyk7XHJcbiAgICAgICAgaWYgKGNsaWNrZWRUb29sYmFySWQgPT0gdGhpcy5fdG9vbGJhcklkSW1wb3J0KSB7XHJcbiAgICAgICAgICAgIHNpZ25hbE1hbmFnZXJXaWRnZXQuaW1wb3J0U2VyaWVHcm91cCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjbGlja2VkVG9vbGJhcklkID09IHRoaXMuX3Rvb2xiYXJJZEV4cG9ydCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZHJvcERvd25NZW51LmlzT3BlbmVkKXtcclxuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW1zRXhwb3J0YWJsZSA9IHNpZ25hbE1hbmFnZXJXaWRnZXQuY2FuSXRlbXNCZUV4cG9ydGVkKGFyZ3MubW9kZWwuc2VsZWN0ZWRJdGVtcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyb3BEb3duTWVudS5zaG93RHJvcERvd25NZW51KHNpZ25hbE1hbmFnZXJXaWRnZXQsIGFyZ3MubW9kZWwsIHNlbGVjdGVkSXRlbXNFeHBvcnRhYmxlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJvcERvd25NZW51LmhpZGVEcm9wRG93bk1lbnUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjbGlja2VkVG9vbGJhcklkID09IHRoaXMuX3Rvb2xiYXJJZENhbGN1bGF0aW9uKSB7XHJcbiAgICAgICAgICAgIHNpZ25hbE1hbmFnZXJXaWRnZXQuaW5zZXJ0Q2FsY3VsYXRpb24oYXJncy5tb2RlbC5zZWxlY3RlZEl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjbGlja2VkVG9vbGJhcklkID09IHRoaXMuX3Rvb2xiYXJJZERlbGV0ZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtcyA9IE9iamVjdC5hc3NpZ24oW10sIGFyZ3MubW9kZWwuc2VsZWN0ZWRJdGVtcyk7XHJcbiAgICAgICAgICAgIGlmIChzaWduYWxNYW5hZ2VyV2lkZ2V0LmNvbnRhaW5zSXRlbVdpdGhpblJlY2VudE9yVXBsb2FkZWQoc2VsZWN0ZWRJdGVtcykpIHtcclxuICAgICAgICAgICAgICAgIHNpZ25hbE1hbmFnZXJXaWRnZXQuc2hvd01lc3NhZ2VCb3hGb3JEZWxldGluZ0l0ZW0oc2VsZWN0ZWRJdGVtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzaWduYWxNYW5hZ2VyV2lkZ2V0LmRlbGV0ZUl0ZW1zKHNlbGVjdGVkSXRlbXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNsaWNrZWRUb29sYmFySWQgPT0gdGhpcy5fdG9vbGJhcklkRWRpdE1vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fZWRpdE1vZGVBY3RpdmF0ZWQgPSAhdGhpcy5fZWRpdE1vZGVBY3RpdmF0ZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZhdGVFZGl0TW9kZUJ1dHRvbih0aGlzLl9lZGl0TW9kZUFjdGl2YXRlZCk7XHJcbiAgICAgICAgICAgIHNpZ25hbE1hbmFnZXJXaWRnZXQuYWN0aXZhdGVFZGl0TW9kZSh0aGlzLl9lZGl0TW9kZUFjdGl2YXRlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBleHBvcnRTZWxlY3RlZFRyYWNlRGF0YShzaWduYWxNYW5hZ2VyV2lkZ2V0OiBTaWduYWxNYW5hZ2VyV2lkZ2V0LCBzZWxlY3RlZEl0ZW1zKSB7XHJcbiAgICAgICAgbGV0IGl0ZW1zID0gbmV3IEV4cG9ydEhlbHBlcigpLmdldEV4cG9ydGFibGVFbGVtZW50cyhzZWxlY3RlZEl0ZW1zKTtcclxuICAgICAgICBzaWduYWxNYW5hZ2VyV2lkZ2V0LmV4cG9ydFNlcmllR3JvdXAoaXRlbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBleHBvcnRBbGxUcmFjZURhdGFBc0NzdihzaWduYWxNYW5hZ2VyV2lkZ2V0OiBTaWduYWxNYW5hZ2VyV2lkZ2V0LCBhbGxJdGVtcykge1xyXG4gICAgICAgIGxldCBpdGVtc1RvYmVFeHBvcnRlZCA9IE9iamVjdC5hc3NpZ24oW10sIGFsbEl0ZW1zKTtcclxuICAgICAgICBsZXQgaXRlbXMgPSBuZXcgRXhwb3J0SGVscGVyKCkuZ2V0RXhwb3J0YWJsZUVsZW1lbnRzKGl0ZW1zVG9iZUV4cG9ydGVkKTtcclxuICAgICAgICBzaWduYWxNYW5hZ2VyV2lkZ2V0LmV4cG9ydFNlcmllR3JvdXAoaXRlbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBleHBvcnRBbGxUcmFjZURhdGEoc2lnbmFsTWFuYWdlcldpZGdldDogU2lnbmFsTWFuYWdlcldpZGdldCkge1xyXG4gICAgICAgIHNpZ25hbE1hbmFnZXJXaWRnZXQuZXhwb3J0U2lnbmFsTWFuYWdlckRhdGEoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGRpc2FibGVFeHBvcnRCdXR0b24oZGlzYWJsZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbih0aGlzLl90b29sYmFySWRFeHBvcnQsIGRpc2FibGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNhYmxlRGVsZXRlQnV0dG9uKGRpc2FibGU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVCdXR0b24odGhpcy5fdG9vbGJhcklkRGVsZXRlLCBkaXNhYmxlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzYWJsZUluc2VydENhbGN1bGF0aW9uQnV0dG9uKGRpc2FibGU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVCdXR0b24odGhpcy5fdG9vbGJhcklkQ2FsY3VsYXRpb24sIGRpc2FibGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhY3RpdmF0ZUVkaXRNb2RlQnV0dG9uKGFjdGl2YXRlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fZWRpdE1vZGVBY3RpdmF0ZWQgPSBhY3RpdmF0ZTtcclxuICAgICAgICB0aGlzLmFjdGl2YXRlQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEVkaXRNb2RlLCBhY3RpdmF0ZSk7XHJcbiAgICB9XHJcbn0iXX0=