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
define(["require", "exports", "../common/treeGridToolbarBase", "../../common/directoryProvider", "../common/iconInfo", "../../models/common/stateExpression/watchableIcon"], function (require, exports, treeGridToolbarBase_1, directoryProvider_1, iconInfo_1, watchableIcon_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WatchablesGridToolbar = /** @class */ (function (_super) {
        __extends(WatchablesGridToolbar, _super);
        /**
         * Creates an instance of WatchablesGridToolbar.
         * @param {HTMLDivElement} widgetDiv
         * @param {IImageProvider} imageProvider
         * @memberof WatchablesGridToolbar
         */
        function WatchablesGridToolbar(widgetDiv, imageProvider) {
            var _this = _super.call(this, widgetDiv) || this;
            // Path to image directory     
            _this.imageDirectory = "../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "watchablesWidget/style/images/toolbar/";
            // Holds an array of existing icons
            _this._toolbarIconInfo = new Array();
            // Last icon where mouse has been over
            _this._lastIconMouseOver = new iconInfo_1.IconInfo('', '', '');
            _this._imageProvider = imageProvider;
            //Add empty button so toolbar is created
            _this.addToolbarButton('empty', '', _this.imageDirectory + "empty.svg");
            return _this;
        }
        /**
         * Adds icon to be inserted in the toolbar
         *
         * @param {MappCockpitStateParameter} watchableStateParameter
         * @memberof WatchablesGridToolbar
         */
        WatchablesGridToolbar.prototype.addIcon = function (watchableStateParameter) {
            //Add button to toolbar
            var name = watchableStateParameter.name;
            this.addToolbarButton(name, '', '');
            //Create toolbar icon info
            this._toolbarIconInfo.push(new iconInfo_1.IconInfo(name));
            //Initialize as unkown state
            this.updateIcons(name, watchableIcon_1.WatchableIcon.getUnkownWatchableIcon());
        };
        /**
         * Add event listener to icons for mouseover
         *
         * @memberof WatchablesGridToolbar
         */
        WatchablesGridToolbar.prototype.addEventListeners = function () {
            var _this = this;
            this._toolbarIconInfo.forEach(function (iconInfo) {
                var elemId = '#' + _this._widgetMainDiv.id + '_' + iconInfo.name;
                $(elemId).on('mouseover', function (e) { return _this.getMouseOverIcon(e); });
            });
        };
        /**
         * Updates icon image
         *
         * @param {string} name
         * @param {WatchableIcon} watchableIcon
         * @memberof WatchablesGridToolbar
         */
        WatchablesGridToolbar.prototype.updateIcons = function (name, watchableIcon) {
            var toolbarIcon = this.getToolbarIconInfo(name);
            if (toolbarIcon !== undefined && toolbarIcon.imageName !== watchableIcon.imageName) {
                this.updateIconInToolbar(toolbarIcon, name, watchableIcon.imageName, watchableIcon.tooltip);
            }
        };
        /**
         * Updates icon image in treegrid's toolbar
         *
         * @private
         * @param {IconInfo} toolbarIcon
         * @param {string} buttonId
         * @param {string} imageName
         * @param {string} tooltip
         * @memberof WatchablesGridToolbar
         */
        WatchablesGridToolbar.prototype.updateIconInToolbar = function (toolbarIcon, buttonId, imageName, tooltip) {
            var image = this._imageProvider.getImage('../app/widgets/watchablesWidget/style/images/toolbar/' + imageName + '.svg');
            if (image !== '') {
                this.updateButtonIcon(buttonId, image);
                toolbarIcon.updateInfo(imageName, tooltip);
            }
            else {
                console.error(buttonId + '->' + imageName + '.svg not found in ImageProvider');
            }
        };
        /**
         * Get Icon info
         *
         * @private
         * @param {string} name
         * @returns {IconInfo}
         * @memberof WatchablesGridToolbar
         */
        WatchablesGridToolbar.prototype.getToolbarIconInfo = function (name) {
            var iconInfo = this._toolbarIconInfo.find(function (iconInfo) { return iconInfo.name === name; });
            return iconInfo;
        };
        /**
         * Get icon where we are dragging the mouse over
         *
         * @private
         * @param {*} args
         * @memberof WatchablesGridToolbar
         */
        WatchablesGridToolbar.prototype.getMouseOverIcon = function (args) {
            var name = ('#' + args.currentTarget.id).split(this._widgetMainDiv.id + '_')[1];
            var toolbarIconInfo = this._toolbarIconInfo.find(function (iconInfo) { return iconInfo.name === name; });
            if (toolbarIconInfo !== undefined) {
                this._lastIconMouseOver = toolbarIconInfo;
            }
        };
        /**
         * Updates toolbar tooltip without updating the whole treegrid
         *
         * @memberof WatchablesGridToolbar
         */
        WatchablesGridToolbar.prototype.tooltipExtension = function () {
            var _this = this;
            // Get HTML element of current tooltip icon
            var target = $('#' + this._widgetMainDiv.id + '_toolbarItems_content')[0];
            if (target != undefined) {
                //Create a mutation observer
                var observer = new MutationObserver(function (mutations) {
                    _this.updateTooltipOnMutationChanged(target, mutations);
                });
                //Observe changes in tooltip content. 
                //There is just one <div> for all tooltips of the same toolbar. 
                observer.observe(target, { attributes: true, childList: true, characterData: true });
            }
        };
        /**
         * Update tooltip when a mutationRecord is changed
         *
         * @private
         * @param {HTMLElement} target
         * @param {MutationRecord[]} mutations
         * @memberof WatchablesGridToolbar
         */
        WatchablesGridToolbar.prototype.updateTooltipOnMutationChanged = function (target, mutations) {
            var _this = this;
            mutations.forEach(function (mutationRecord) {
                var iconInfo = _this.getToolbarIconInfo(_this._lastIconMouseOver.name);
                if (iconInfo !== undefined) {
                    var newValue = iconInfo.tooltip;
                    var oldValue = target.innerHTML;
                    if (newValue != oldValue) {
                        target.innerHTML = newValue;
                    }
                }
            });
        };
        /**
         * hide selected icon
         *
         * @param {string} id
         * @memberof WatchablesGridToolbar
         */
        WatchablesGridToolbar.prototype.hideIcon = function (id) {
            this.hideButton(id, true);
        };
        /**
         * disables dummy button needed for initialization of toolbar
         *
         * @memberof WatchablesGridToolbar
         */
        WatchablesGridToolbar.prototype.disableDummyButton = function () {
            this.disableButton('empty', true, true);
        };
        /**
         * Disable icons in toolbar so they don't behave as buttons
         *
         * @memberof WatchablesGridToolbar
         */
        WatchablesGridToolbar.prototype.disableIcons = function () {
            for (var i = 0; i < this._toolbarIconInfo.length; i++) {
                this.disableButton(this._toolbarIconInfo[i].name, true, true);
            }
        };
        return WatchablesGridToolbar;
    }(treeGridToolbarBase_1.TreeGridToolbarBase));
    exports.WatchablesGridToolbar = WatchablesGridToolbar;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F0Y2hhYmxlc0dyaWRUb29sYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3dhdGNoYWJsZXNXaWRnZXQvd2F0Y2hhYmxlc0dyaWRUb29sYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFPQTtRQUEyQyx5Q0FBbUI7UUFVMUQ7Ozs7O1dBS0c7UUFDSCwrQkFBWSxTQUF5QixFQUFFLGFBQTZCO1lBQXBFLFlBQ0ksa0JBQU0sU0FBUyxDQUFDLFNBS25CO1lBckJELCtCQUErQjtZQUNkLG9CQUFjLEdBQUcsV0FBVyxHQUFHLHFDQUFpQixDQUFDLG1CQUFtQixFQUFFLEdBQUcsd0NBQXdDLENBQUM7WUFDbkksbUNBQW1DO1lBQzNCLHNCQUFnQixHQUFJLElBQUksS0FBSyxFQUFZLENBQUM7WUFDbEQsc0NBQXNDO1lBQzlCLHdCQUFrQixHQUFhLElBQUksbUJBQVEsQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUFDO1lBWTFELEtBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1lBRXBDLHdDQUF3QztZQUN4QyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxLQUFJLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQyxDQUFDOztRQUMxRSxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSx1Q0FBTyxHQUFkLFVBQWUsdUJBQWtEO1lBQzdELHVCQUF1QjtZQUN2QixJQUFJLElBQUksR0FBRyx1QkFBdUIsQ0FBQyxJQUFJLENBQUM7WUFDeEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFcEMsMEJBQTBCO1lBQzFCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxtQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFFL0MsNEJBQTRC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QUM7UUFFRDs7OztXQUlHO1FBQ0ksa0RBQWtCLEdBQXpCO1lBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVDLENBQUM7UUFFRDs7OztXQUlHO1FBQ0ksNENBQVksR0FBbkI7WUFDSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDbkQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNqRTtRQUNMLENBQUM7UUFDTCw0QkFBQztJQUFELENBQUMsQUE3TEQsQ0FBMkMseUNBQW1CLEdBNkw3RDtJQTdMWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmVlR3JpZFRvb2xiYXJCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi90cmVlR3JpZFRvb2xiYXJCYXNlXCI7XHJcbmltcG9ydCB7IERpcmVjdG9yeVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RvcnlQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBJY29uSW5mbyB9IGZyb20gXCIuLi9jb21tb24vaWNvbkluZm9cIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IElJbWFnZVByb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL2ltYWdlUHJvdmlkZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgV2F0Y2hhYmxlSWNvbiB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3N0YXRlRXhwcmVzc2lvbi93YXRjaGFibGVJY29uXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgV2F0Y2hhYmxlc0dyaWRUb29sYmFyIGV4dGVuZHMgVHJlZUdyaWRUb29sYmFyQmFzZXtcclxuICAgIC8vIFBhdGggdG8gaW1hZ2UgZGlyZWN0b3J5ICAgICBcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgaW1hZ2VEaXJlY3RvcnkgPSBcIi4uLy4uLy4uL1wiICsgRGlyZWN0b3J5UHJvdmlkZXIuZ2V0V2lkZ2V0c0RpcmVjdG9yeSgpICsgXCJ3YXRjaGFibGVzV2lkZ2V0L3N0eWxlL2ltYWdlcy90b29sYmFyL1wiO1xyXG4gICAgLy8gSG9sZHMgYW4gYXJyYXkgb2YgZXhpc3RpbmcgaWNvbnNcclxuICAgIHByaXZhdGUgX3Rvb2xiYXJJY29uSW5mbyA9ICBuZXcgQXJyYXk8SWNvbkluZm8+KCk7XHJcbiAgICAvLyBMYXN0IGljb24gd2hlcmUgbW91c2UgaGFzIGJlZW4gb3ZlclxyXG4gICAgcHJpdmF0ZSBfbGFzdEljb25Nb3VzZU92ZXI6IEljb25JbmZvID0gbmV3IEljb25JbmZvKCcnLCcnLCcnKTtcclxuICAgIC8vIEltYWdlIHByb3ZpZGVyXHJcbiAgICBwcml2YXRlIF9pbWFnZVByb3ZpZGVyOiBJSW1hZ2VQcm92aWRlcjtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFdhdGNoYWJsZXNHcmlkVG9vbGJhci5cclxuICAgICAqIEBwYXJhbSB7SFRNTERpdkVsZW1lbnR9IHdpZGdldERpdlxyXG4gICAgICogQHBhcmFtIHtJSW1hZ2VQcm92aWRlcn0gaW1hZ2VQcm92aWRlclxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih3aWRnZXREaXY6IEhUTUxEaXZFbGVtZW50LCBpbWFnZVByb3ZpZGVyOiBJSW1hZ2VQcm92aWRlcil7XHJcbiAgICAgICAgc3VwZXIod2lkZ2V0RGl2KTsgXHJcbiAgICAgICAgdGhpcy5faW1hZ2VQcm92aWRlciA9IGltYWdlUHJvdmlkZXI7XHJcblxyXG4gICAgICAgIC8vQWRkIGVtcHR5IGJ1dHRvbiBzbyB0b29sYmFyIGlzIGNyZWF0ZWRcclxuICAgICAgICB0aGlzLmFkZFRvb2xiYXJCdXR0b24oJ2VtcHR5JywgJycsIHRoaXMuaW1hZ2VEaXJlY3RvcnkgKyBcImVtcHR5LnN2Z1wiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgaWNvbiB0byBiZSBpbnNlcnRlZCBpbiB0aGUgdG9vbGJhclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlcn0gd2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXJcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZEljb24od2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXI6IE1hcHBDb2NrcGl0U3RhdGVQYXJhbWV0ZXIpIHtcclxuICAgICAgICAvL0FkZCBidXR0b24gdG8gdG9vbGJhclxyXG4gICAgICAgIGxldCBuYW1lID0gd2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXIubmFtZTtcclxuICAgICAgICB0aGlzLmFkZFRvb2xiYXJCdXR0b24obmFtZSwgJycsICcnKTtcclxuXHJcbiAgICAgICAgLy9DcmVhdGUgdG9vbGJhciBpY29uIGluZm9cclxuICAgICAgICB0aGlzLl90b29sYmFySWNvbkluZm8ucHVzaChuZXcgSWNvbkluZm8obmFtZSkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vSW5pdGlhbGl6ZSBhcyB1bmtvd24gc3RhdGVcclxuICAgICAgICB0aGlzLnVwZGF0ZUljb25zKG5hbWUsIFdhdGNoYWJsZUljb24uZ2V0VW5rb3duV2F0Y2hhYmxlSWNvbigpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBldmVudCBsaXN0ZW5lciB0byBpY29ucyBmb3IgbW91c2VvdmVyXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICAgICAgdGhpcy5fdG9vbGJhckljb25JbmZvLmZvckVhY2goKGljb25JbmZvKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBlbGVtSWQgPSAnIycgKyB0aGlzLl93aWRnZXRNYWluRGl2LmlkICsgJ18nICsgaWNvbkluZm8ubmFtZTtcclxuICAgICAgICAgICAgJChlbGVtSWQpLm9uKCdtb3VzZW92ZXInLCAoZSkgPT4gdGhpcy5nZXRNb3VzZU92ZXJJY29uKGUpICk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKiogXHJcbiAgICAgKiBVcGRhdGVzIGljb24gaW1hZ2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQHBhcmFtIHtXYXRjaGFibGVJY29ufSB3YXRjaGFibGVJY29uXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc0dyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGRhdGVJY29ucyhuYW1lOiBzdHJpbmcsIHdhdGNoYWJsZUljb246IFdhdGNoYWJsZUljb24pIHtcclxuICAgICAgICB2YXIgdG9vbGJhckljb24gPSB0aGlzLmdldFRvb2xiYXJJY29uSW5mbyhuYW1lKTtcclxuICAgICAgICBpZiAodG9vbGJhckljb24gIT09IHVuZGVmaW5lZCAmJiB0b29sYmFySWNvbi5pbWFnZU5hbWUgIT09IHdhdGNoYWJsZUljb24uaW1hZ2VOYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSWNvbkluVG9vbGJhcih0b29sYmFySWNvbiwgbmFtZSwgd2F0Y2hhYmxlSWNvbi5pbWFnZU5hbWUsIHdhdGNoYWJsZUljb24udG9vbHRpcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyBpY29uIGltYWdlIGluIHRyZWVncmlkJ3MgdG9vbGJhclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0ljb25JbmZvfSB0b29sYmFySWNvblxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJ1dHRvbklkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2VOYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdG9vbHRpcFxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUljb25JblRvb2xiYXIodG9vbGJhckljb246IEljb25JbmZvLCBidXR0b25JZDogc3RyaW5nLCBpbWFnZU5hbWU6IHN0cmluZywgdG9vbHRpcDogc3RyaW5nKSB7XHJcbiAgICAgICAgdmFyIGltYWdlID0gdGhpcy5faW1hZ2VQcm92aWRlci5nZXRJbWFnZSgnLi4vYXBwL3dpZGdldHMvd2F0Y2hhYmxlc1dpZGdldC9zdHlsZS9pbWFnZXMvdG9vbGJhci8nICsgaW1hZ2VOYW1lICsgJy5zdmcnKTtcclxuICAgICAgICBpZiAoaW1hZ2UgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQnV0dG9uSWNvbihidXR0b25JZCwgaW1hZ2UpO1xyXG4gICAgICAgICAgICB0b29sYmFySWNvbi51cGRhdGVJbmZvKGltYWdlTmFtZSwgdG9vbHRpcClcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYnV0dG9uSWQgKyAnLT4nICsgaW1hZ2VOYW1lICsgJy5zdmcgbm90IGZvdW5kIGluIEltYWdlUHJvdmlkZXInKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgSWNvbiBpbmZvXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcmV0dXJucyB7SWNvbkluZm99XHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc0dyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VG9vbGJhckljb25JbmZvKG5hbWU6IHN0cmluZyk6IEljb25JbmZvIHwgdW5kZWZpbmVke1xyXG4gICAgICAgIHZhciBpY29uSW5mbyA9IHRoaXMuX3Rvb2xiYXJJY29uSW5mby5maW5kKChpY29uSW5mbykgPT4gaWNvbkluZm8ubmFtZSA9PT0gbmFtZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGljb25JbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGljb24gd2hlcmUgd2UgYXJlIGRyYWdnaW5nIHRoZSBtb3VzZSBvdmVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldE1vdXNlT3Zlckljb24oYXJncykge1xyXG4gICAgICAgIHZhciBuYW1lID0gKCcjJyArIGFyZ3MuY3VycmVudFRhcmdldC5pZCkuc3BsaXQodGhpcy5fd2lkZ2V0TWFpbkRpdi5pZCArICdfJylbMV07XHJcbiAgICAgICAgbGV0IHRvb2xiYXJJY29uSW5mbyA9IHRoaXMuX3Rvb2xiYXJJY29uSW5mby5maW5kKChpY29uSW5mbykgPT4gaWNvbkluZm8ubmFtZSA9PT0gbmFtZSk7XHJcbiAgICAgICAgaWYgKHRvb2xiYXJJY29uSW5mbyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xhc3RJY29uTW91c2VPdmVyID0gdG9vbGJhckljb25JbmZvO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdG9vbGJhciB0b29sdGlwIHdpdGhvdXQgdXBkYXRpbmcgdGhlIHdob2xlIHRyZWVncmlkXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdG9vbHRpcEV4dGVuc2lvbigpIHtcclxuICAgICAgICAvLyBHZXQgSFRNTCBlbGVtZW50IG9mIGN1cnJlbnQgdG9vbHRpcCBpY29uXHJcbiAgICAgICAgdmFyIHRhcmdldCA9ICQoJyMnICsgdGhpcy5fd2lkZ2V0TWFpbkRpdi5pZCArICdfdG9vbGJhckl0ZW1zX2NvbnRlbnQnKVswXTtcclxuXHJcbiAgICAgICAgaWYodGFyZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vQ3JlYXRlIGEgbXV0YXRpb24gb2JzZXJ2ZXJcclxuICAgICAgICAgICAgdmFyIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUb29sdGlwT25NdXRhdGlvbkNoYW5nZWQodGFyZ2V0LCBtdXRhdGlvbnMpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vT2JzZXJ2ZSBjaGFuZ2VzIGluIHRvb2x0aXAgY29udGVudC4gXHJcbiAgICAgICAgICAgIC8vVGhlcmUgaXMganVzdCBvbmUgPGRpdj4gZm9yIGFsbCB0b29sdGlwcyBvZiB0aGUgc2FtZSB0b29sYmFyLiBcclxuICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXQsIHsgYXR0cmlidXRlcyA6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSwgY2hhcmFjdGVyRGF0YTp0cnVlIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZSB0b29sdGlwIHdoZW4gYSBtdXRhdGlvblJlY29yZCBpcyBjaGFuZ2VkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRhcmdldFxyXG4gICAgICogQHBhcmFtIHtNdXRhdGlvblJlY29yZFtdfSBtdXRhdGlvbnNcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVUb29sdGlwT25NdXRhdGlvbkNoYW5nZWQodGFyZ2V0OiBIVE1MRWxlbWVudCwgbXV0YXRpb25zOiBNdXRhdGlvblJlY29yZFtdKSB7XHJcbiAgICAgICAgbXV0YXRpb25zLmZvckVhY2goKG11dGF0aW9uUmVjb3JkKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBpY29uSW5mbyA9IHRoaXMuZ2V0VG9vbGJhckljb25JbmZvKHRoaXMuX2xhc3RJY29uTW91c2VPdmVyLm5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoaWNvbkluZm8gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld1ZhbHVlID0gaWNvbkluZm8udG9vbHRpcFxyXG4gICAgICAgICAgICAgICAgdmFyIG9sZFZhbHVlID0gdGFyZ2V0LmlubmVySFRNTDtcclxuICAgICAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPSBvbGRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5pbm5lckhUTUwgPSBuZXdWYWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pOyAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaGlkZSBzZWxlY3RlZCBpY29uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc0dyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoaWRlSWNvbihpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5oaWRlQnV0dG9uKGlkLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRpc2FibGVzIGR1bW15IGJ1dHRvbiBuZWVkZWQgZm9yIGluaXRpYWxpemF0aW9uIG9mIHRvb2xiYXJcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc0dyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXNhYmxlRHVtbXlCdXR0b24oKXtcclxuICAgICAgICB0aGlzLmRpc2FibGVCdXR0b24oJ2VtcHR5JywgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNhYmxlIGljb25zIGluIHRvb2xiYXIgc28gdGhleSBkb24ndCBiZWhhdmUgYXMgYnV0dG9uc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc2FibGVJY29ucygpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3Rvb2xiYXJJY29uSW5mby5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmRpc2FibGVCdXR0b24odGhpcy5fdG9vbGJhckljb25JbmZvW2ldLm5hbWUsIHRydWUsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==