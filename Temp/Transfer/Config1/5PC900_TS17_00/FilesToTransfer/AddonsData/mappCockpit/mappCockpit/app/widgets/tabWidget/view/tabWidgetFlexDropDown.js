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
define(["require", "exports", "../layout/tabWidgetLayoutProvider", "../tabWidgetStyleProvider", "../../../framework/events"], function (require, exports, tabWidgetLayoutProvider_1, tabWidgetStyleProvider_1, events_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventTabSelectedFromDropdown = /** @class */ (function (_super) {
        __extends(EventTabSelectedFromDropdown, _super);
        function EventTabSelectedFromDropdown() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventTabSelectedFromDropdown;
    }(events_1.TypedEvent));
    ;
    var EventTabBarCloseTab = /** @class */ (function (_super) {
        __extends(EventTabBarCloseTab, _super);
        function EventTabBarCloseTab() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventTabBarCloseTab;
    }(events_1.TypedEvent));
    ;
    var EventTabBarCloseAllTabs = /** @class */ (function (_super) {
        __extends(EventTabBarCloseAllTabs, _super);
        function EventTabBarCloseAllTabs() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventTabBarCloseAllTabs;
    }(events_1.TypedEvent));
    ;
    var EventTabBarCloseAllTabsButActive = /** @class */ (function (_super) {
        __extends(EventTabBarCloseAllTabsButActive, _super);
        function EventTabBarCloseAllTabsButActive() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventTabBarCloseAllTabsButActive;
    }(events_1.TypedEvent));
    ;
    var TabWidgetFlexDropDown = /** @class */ (function () {
        function TabWidgetFlexDropDown() {
            this.eventTabSelectedFromDropdown = new EventTabSelectedFromDropdown();
            this.eventTabBarCloseTab = new EventTabBarCloseTab();
            this.eventTabBarCloseAllTabs = new EventTabBarCloseAllTabs();
            this.eventTabBarCloseAllTabsButActive = new EventTabBarCloseAllTabsButActive();
            this._closeTabButtonPressedFlag = false;
        }
        TabWidgetFlexDropDown.prototype.addFlexTabDropdown = function (layoutContainerId, flexibleTabContainerId) {
            var _this = this;
            this._dropDownContainerId = layoutContainerId + "_dropdown";
            this.appendDropDownLayout(flexibleTabContainerId, layoutContainerId);
            var dropDownData = [];
            $("#" + this._dropDownContainerId).ejDropDownList({
                targetID: layoutContainerId + "_dropdownList",
                width: "48px",
                height: "50px",
                fields: { id: "id", text: "text", name: "name" },
                dataSource: dropDownData,
                template: tabWidgetLayoutProvider_1.TabWidgetLayoutProvider.getInstance().getTabOverviewDropdownTemplate(layoutContainerId),
                minPopupWidth: "280px",
                popupHeight: "250px",
                change: function (args) { return _this.onDropdownChanged(args); },
                popupShown: function (args) { return _this.onDropdownPopup(args); },
            });
            this.addItemToDropdown("footer", "footerId", layoutContainerId);
            this.setDropdownLayout(layoutContainerId);
            this.hideDropDownMenuButton();
            this._layoutContainerId = layoutContainerId;
            var dropDownStyle = tabWidgetStyleProvider_1.TabWidgetStyleProvider.getInstance().getLayoutStyleForTabBarDropDown(layoutContainerId);
            $("#" + layoutContainerId).append(dropDownStyle);
        };
        TabWidgetFlexDropDown.prototype.onDropdownChanged = function (args) {
            args.cancel = true;
            if (this._closeTabButtonPressedFlag != true) {
                var dataSource = args.model.dataSource;
                this.setTabSelected(dataSource[args.itemId].id);
                var tabId = dataSource[args.itemId].id;
                tabId = tabId.replace("tab_", "");
                this.eventTabSelectedFromDropdown.raise(this, { tabName: tabId });
                var dropdown = $("#" + this._layoutContainerId + "_dropdown").data("ejDropDownList");
                dropdown.option("dataSource", dataSource, true);
                this.resetDropdown();
            }
            this._closeTabButtonPressedFlag = false;
        };
        TabWidgetFlexDropDown.prototype.onDropdownPopup = function (args) {
            $("head").append('<style type="text/css"></style>');
            var newStyleElement = $("head").children(':last');
        };
        TabWidgetFlexDropDown.prototype.appendDropDownLayout = function (flexibleTabContainerId, layoutContainerId) {
            var html = tabWidgetLayoutProvider_1.TabWidgetLayoutProvider.getInstance().getFlexTabDropdownLayout(layoutContainerId);
            $("#" + flexibleTabContainerId).append(html);
        };
        TabWidgetFlexDropDown.prototype.setDropdownLayout = function (layoutContainerId) {
            tabWidgetStyleProvider_1.TabWidgetStyleProvider.getInstance().setFlexTabSelectionDropdownPopupStyle(layoutContainerId);
            var dropdownStyle = tabWidgetStyleProvider_1.TabWidgetStyleProvider.getInstance().getDropdownStyle(layoutContainerId);
            $("#" + layoutContainerId).append(dropdownStyle);
            tabWidgetStyleProvider_1.TabWidgetStyleProvider.getInstance().setOverviewDropdownMouseOver(layoutContainerId);
        };
        TabWidgetFlexDropDown.prototype.addItemToDropdown = function (tabName, tabId, layoutContainerId, iconPath) {
            if (iconPath === void 0) { iconPath = ""; }
            this._layoutContainerId = layoutContainerId;
            var dropdown = $("#" + layoutContainerId + "_dropdown").data("ejDropDownList");
            if (dropdown.model.dataSource != null) {
                var text = "<img src=\"" + iconPath + "\" style=\"width:17px; float:left; margin-right: 5px; margin-top: 2px; margin-left: -5px \" >" + tabName;
                dropdown.model.dataSource.splice(0, 0, { id: tabId, text: text, iconPath: iconPath, name: tabName });
                var dataSource = dropdown.model.dataSource;
                dropdown.model.dataSource = null;
                dropdown.option("dataSource", dataSource);
            }
            this.resetDropdown();
            this.showDropDownMenuButton();
        };
        TabWidgetFlexDropDown.prototype.setTabSelected = function (tabId) {
            tabId = tabId.replace("_tab", "");
            var itemId = this.getItemIdFromTabId(tabId);
            var dropdown = $("#" + this._layoutContainerId + "_dropdown").data("ejDropDownList");
            var dataSource = dropdown.model.dataSource;
            for (var _i = 0, dataSource_1 = dataSource; _i < dataSource_1.length; _i++) {
                var element = dataSource_1[_i];
                element.text = element.text.replace("_orange.svg", ".svg");
            }
            if (dataSource[itemId] != undefined) {
                var newText = dataSource[itemId].text.replace(".svg", "_orange.svg");
                dataSource[itemId].text = newText;
            }
            dropdown.option("dataSource", dataSource, true);
            this.resetDropdown();
        };
        TabWidgetFlexDropDown.prototype.resetDropdown = function () {
            var _this = this;
            var dropdown = $("#" + this._layoutContainerId + "_dropdown").data("ejDropDownList");
            var dataSource = dropdown.model.dataSource;
            dropdown.model.dataSource = null;
            dropdown.option("dataSource", dataSource, true);
            var lastDropdownItem = $("#" + this._layoutContainerId + "_dropdown_popup_wrapper").find("li").last();
            lastDropdownItem.html(tabWidgetLayoutProvider_1.TabWidgetLayoutProvider.getInstance().getTabOverviewFooterButtonsTemplate(this._layoutContainerId));
            var _loop_1 = function (i) {
                var buttonName = dropdown.model.dataSource[i]["id"];
                $("#" + this_1._layoutContainerId + "_dropdownList_button_" + buttonName).ejButton({
                    contentType: "imageonly",
                    prefixIcon: "e-icon " + this_1._layoutContainerId + "_dropdownList_button_" + buttonName,
                    create: this_1.setDropdownButtonStyle(this_1._layoutContainerId + "_dropdownList_button_" + buttonName, this_1._layoutContainerId),
                });
                $("#" + this_1._layoutContainerId + "_dropdownList_button_" + buttonName).on("click", function (e) {
                    _this.onCloseTab(buttonName);
                });
            };
            var this_1 = this;
            for (var i = 0; i < dropdown.model.dataSource.length; i++) {
                _loop_1(i);
            }
            $("#" + this._layoutContainerId + "_dropdown_closeAll")[0].addEventListener("click", function (e) { _this.onCloseAllTabs(e); });
            $("#" + this._layoutContainerId + "_dropdown_closeAllOther")[0].addEventListener("click", function (e) { _this.onCloseAllTabsButActive(e); });
        };
        /**
         *
         *
         * @param {*} itemName
         * @param {*} mouseWheelClicked
         * @memberof TabWidgetFlexDropDown
         */
        TabWidgetFlexDropDown.prototype.removeItemFromDropdown = function (itemName, mouseWheelClicked) {
            var dropdown = $("#" + this._dropDownContainerId).data("ejDropDownList");
            if (dropdown.model.dataSource != null) {
                for (var i = 0; i < dropdown.model.dataSource.length; i++) {
                    if (dropdown.model.dataSource[i].id == itemName) {
                        dropdown.model.dataSource.splice(i, 1);
                    }
                }
                var dataSource = dropdown.model.dataSource;
                dropdown.model.dataSource = null;
                dropdown.option("dataSource", dataSource);
            }
            this.resetDropdown();
            if (dropdown.model.dataSource.length == 1) {
                dropdown.hidePopup();
                this.hideDropDownMenuButton();
            }
            else if (!mouseWheelClicked) {
                dropdown.hidePopup();
                dropdown.showPopup();
            }
            else {
                dropdown.hidePopup();
            }
        };
        TabWidgetFlexDropDown.prototype.onCloseTab = function (tabName) {
            //let tabName = this.getTabNameFromClickEvent(event);
            this.eventTabBarCloseTab.raise(this, { tabName: tabName });
            this._closeTabButtonPressedFlag = true;
        };
        TabWidgetFlexDropDown.prototype.onCloseAllTabs = function (event) {
            this.eventTabBarCloseAllTabs.raise(this, event);
            this._closeTabButtonPressedFlag = true;
        };
        TabWidgetFlexDropDown.prototype.onCloseAllTabsButActive = function (event) {
            this.eventTabBarCloseAllTabsButActive.raise(this, event);
            this._closeTabButtonPressedFlag = true;
        };
        TabWidgetFlexDropDown.prototype.setDropdownButtonStyle = function (buttonId, layoutContainerId) {
            var dropdownButtonStyle = tabWidgetStyleProvider_1.TabWidgetStyleProvider.getInstance().getDropdownButtonStyle(buttonId);
            $("#" + layoutContainerId).append(dropdownButtonStyle);
        };
        TabWidgetFlexDropDown.prototype.hideDropDownMenuButton = function () {
            $("#" + this._dropDownContainerId + "_wrapper").css("display", "none");
        };
        TabWidgetFlexDropDown.prototype.showDropDownMenuButton = function () {
            $("#" + this._dropDownContainerId + "_wrapper").css("display", "block");
        };
        TabWidgetFlexDropDown.prototype.getTabNameFromItemText = function (itemText) {
            var text = itemText.trim();
            var whitespace = text.indexOf(' ', 1);
            var tabName = "tab_" + text.substr(whitespace + 1);
            return tabName;
        };
        TabWidgetFlexDropDown.prototype.getTabNameFromDropDownDataModelText = function (itemText) {
            var text = itemText.trim();
            var whitespace = text.indexOf(' ', 1);
            var tabName = "tab_" + text.substr(whitespace + 1);
            return tabName;
        };
        TabWidgetFlexDropDown.prototype.getTabNameFromClickEvent = function (event) {
            var str = event.currentTarget.id;
            var n = str.lastIndexOf('_button_');
            var result = str.substring(n + 8);
            //let tabName = event.currentTarget.id.substring(event.currentTarget.id.lastIndexOf("_") + 1);
            return result;
        };
        /**
         * Return Id of Element in Dropdown by TabId
         *
         * @param {string} tabId
         * @returns {number}
         * @memberof TabWidgetFlexDropDown
         */
        TabWidgetFlexDropDown.prototype.getItemIdFromTabId = function (tabId) {
            var dropdown = $("#" + this._dropDownContainerId).data("ejDropDownList");
            var dataSource = dropdown.model.dataSource;
            for (var i = 0; i < dataSource.length; i++) {
                if (tabId == dataSource[i].id) {
                    return i;
                }
            }
            return -1;
        };
        return TabWidgetFlexDropDown;
    }());
    exports.TabWidgetFlexDropDown = TabWidgetFlexDropDown;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiV2lkZ2V0RmxleERyb3BEb3duLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RhYldpZGdldC92aWV3L3RhYldpZGdldEZsZXhEcm9wRG93bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBSUE7UUFBMkMsZ0RBQXlDO1FBQXBGOztRQUFxRixDQUFDO1FBQUQsbUNBQUM7SUFBRCxDQUFDLEFBQXRGLENBQTJDLG1CQUFVLEdBQWlDO0lBQUEsQ0FBQztJQUN2RjtRQUFrQyx1Q0FBeUM7UUFBM0U7O1FBQTRFLENBQUM7UUFBRCwwQkFBQztJQUFELENBQUMsQUFBN0UsQ0FBa0MsbUJBQVUsR0FBaUM7SUFBQSxDQUFDO0lBQzlFO1FBQXNDLDJDQUF5QztRQUEvRTs7UUFBZ0YsQ0FBQztRQUFELDhCQUFDO0lBQUQsQ0FBQyxBQUFqRixDQUFzQyxtQkFBVSxHQUFpQztJQUFBLENBQUM7SUFDbEY7UUFBK0Msb0RBQXlDO1FBQXhGOztRQUF5RixDQUFDO1FBQUQsdUNBQUM7SUFBRCxDQUFDLEFBQTFGLENBQStDLG1CQUFVLEdBQWlDO0lBQUEsQ0FBQztJQUUzRjtRQUFBO1lBRUksaUNBQTRCLEdBQUcsSUFBSSw0QkFBNEIsRUFBRSxDQUFDO1lBQ2xFLHdCQUFtQixHQUFHLElBQUksbUJBQW1CLEVBQUUsQ0FBQztZQUNoRCw0QkFBdUIsR0FBRyxJQUFJLHVCQUF1QixFQUFFLENBQUM7WUFDeEQscUNBQWdDLEdBQUcsSUFBSSxnQ0FBZ0MsRUFBRSxDQUFDO1lBSWxFLCtCQUEwQixHQUFHLEtBQUssQ0FBQztRQWdQL0MsQ0FBQztRQTlPRyxrREFBa0IsR0FBbEIsVUFBbUIsaUJBQWlCLEVBQUUsc0JBQXNCO1lBQTVELGlCQTBCQztZQXpCRyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsaUJBQWlCLEdBQUMsV0FBVyxDQUFDO1lBQzFELElBQUksQ0FBQyxvQkFBb0IsQ0FB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SUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUN0QyxJQUFHLEtBQUssSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFDO29CQUN6QixPQUFPLENBQUMsQ0FBQTtpQkFDWDthQUNKO1lBRUQsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNkLENBQUM7UUFDTCw0QkFBQztJQUFELENBQUMsQUF6UEQsSUF5UEM7SUFDTyxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUYWJXaWRnZXRMYXlvdXRQcm92aWRlciB9IGZyb20gXCIuLi9sYXlvdXQvdGFiV2lkZ2V0TGF5b3V0UHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgVGFiV2lkZ2V0U3R5bGVQcm92aWRlciB9IGZyb20gXCIuLi90YWJXaWRnZXRTdHlsZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2V2ZW50c1wiO1xyXG5cclxuY2xhc3MgRXZlbnRUYWJTZWxlY3RlZEZyb21Ecm9wZG93biBleHRlbmRzIFR5cGVkRXZlbnQ8VGFiV2lkZ2V0RmxleERyb3BEb3duLCBvYmplY3Q+e307XHJcbmNsYXNzIEV2ZW50VGFiQmFyQ2xvc2VUYWIgZXh0ZW5kcyBUeXBlZEV2ZW50PFRhYldpZGdldEZsZXhEcm9wRG93biwgb2JqZWN0Pnt9O1xyXG5jbGFzcyBFdmVudFRhYkJhckNsb3NlQWxsVGFicyBleHRlbmRzIFR5cGVkRXZlbnQ8VGFiV2lkZ2V0RmxleERyb3BEb3duLCBvYmplY3Q+e307XHJcbmNsYXNzIEV2ZW50VGFiQmFyQ2xvc2VBbGxUYWJzQnV0QWN0aXZlIGV4dGVuZHMgVHlwZWRFdmVudDxUYWJXaWRnZXRGbGV4RHJvcERvd24sIG9iamVjdD57fTtcclxuXHJcbmNsYXNzIFRhYldpZGdldEZsZXhEcm9wRG93bnsgXHJcblxyXG4gICAgZXZlbnRUYWJTZWxlY3RlZEZyb21Ecm9wZG93biA9IG5ldyBFdmVudFRhYlNlbGVjdGVkRnJvbURyb3Bkb3duKCk7XHJcbiAgICBldmVudFRhYkJhckNsb3NlVGFiID0gbmV3IEV2ZW50VGFiQmFyQ2xvc2VUYWIoKTtcclxuICAgIGV2ZW50VGFiQmFyQ2xvc2VBbGxUYWJzID0gbmV3IEV2ZW50VGFiQmFyQ2xvc2VBbGxUYWJzKCk7XHJcbiAgICBldmVudFRhYkJhckNsb3NlQWxsVGFic0J1dEFjdGl2ZSA9IG5ldyBFdmVudFRhYkJhckNsb3NlQWxsVGFic0J1dEFjdGl2ZSgpO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF9kcm9wRG93bkNvbnRhaW5lcklkPzogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfbGF5b3V0Q29udGFpbmVySWQ/OiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9jbG9zZVRhYkJ1dHRvblByZXNzZWRGbGFnID0gZmFsc2U7XHJcblxyXG4gICAgYWRkRmxleFRhYkRyb3Bkb3duKGxheW91dENvbnRhaW5lcklkLCBmbGV4aWJsZVRhYkNvbnRhaW5lcklkKXtcclxuICAgICAgICB0aGlzLl9kcm9wRG93bkNvbnRhaW5lcklkID0gbGF5b3V0Q29udGFpbmVySWQrXCJfZHJvcGRvd25cIjtcclxuICAgICAgICB0aGlzLmFwcGVuZERyb3BEb3duTGF5b3V0KGZsZXhpYmxlVGFiQ29udGFpbmVySWQsIGxheW91dENvbnRhaW5lcklkKTtcclxuICAgICAgICBsZXQgZHJvcERvd25EYXRhID0gW107XHJcblxyXG4gICAgICAgICQoXCIjXCIrdGhpcy5fZHJvcERvd25Db250YWluZXJJZCkuZWpEcm9wRG93bkxpc3Qoe1xyXG4gICAgICAgICAgICB0YXJnZXRJRDogbGF5b3V0Q29udGFpbmVySWQgKyBcIl9kcm9wZG93bkxpc3RcIixcclxuICAgICAgICAgICAgd2lkdGg6IFwiNDhweFwiLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IFwiNTBweFwiLFxyXG4gICAgICAgICAgICBmaWVsZHM6IHtpZDogXCJpZFwiICwgdGV4dDogXCJ0ZXh0XCIsIG5hbWU6IFwibmFtZVwifSxcclxuICAgICAgICAgICAgZGF0YVNvdXJjZSA6IGRyb3BEb3duRGF0YSxcclxuICAgICAgICAgICAgdGVtcGxhdGU6IFRhYldpZGdldExheW91dFByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0VGFiT3ZlcnZpZXdEcm9wZG93blRlbXBsYXRlKGxheW91dENvbnRhaW5lcklkKSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG1pblBvcHVwV2lkdGg6IFwiMjgwcHhcIiwgXHJcbiAgICAgICAgICAgIHBvcHVwSGVpZ2h0IDogXCIyNTBweFwiLFxyXG5cclxuICAgICAgICAgICAgY2hhbmdlOiAoYXJncykgPT4gdGhpcy5vbkRyb3Bkb3duQ2hhbmdlZChhcmdzKSxcclxuICAgICAgICAgICAgcG9wdXBTaG93bjogKGFyZ3MpID0+IHRoaXMub25Ecm9wZG93blBvcHVwKGFyZ3MpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuYWRkSXRlbVRvRHJvcGRvd24oXCJmb290ZXJcIiwgXCJmb290ZXJJZFwiLCBsYXlvdXRDb250YWluZXJJZCk7XHJcbiAgICAgICAgdGhpcy5zZXREcm9wZG93bkxheW91dChsYXlvdXRDb250YWluZXJJZCk7XHJcbiAgICAgICAgdGhpcy5oaWRlRHJvcERvd25NZW51QnV0dG9uKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2xheW91dENvbnRhaW5lcklkID0gbGF5b3V0Q29udGFpbmVySWQ7XHJcbiAgICAgICAgbGV0IGRyb3BEb3duU3R5bGUgPSBUYWJXaWRnZXRTdHlsZVByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0TGF5b3V0U3R5bGVGb3JUYWJCYXJEcm9wRG93bihsYXlvdXRDb250YWluZXJJZCk7XHJcbiAgICAgICAgJChcIiNcIitsYXlvdXRDb250YWluZXJJZCkuYXBwZW5kKGRyb3BEb3duU3R5bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRHJvcGRvd25DaGFuZ2VkKGFyZ3Mpe1xyXG4gICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICBpZih0aGlzLl9jbG9zZVRhYkJ1dHRvblByZXNzZWRGbGFnICE9IHRydWUpe1xyXG4gICAgICAgICAgICBsZXQgZGF0YVNvdXJjZSA9IGFyZ3MubW9kZWwuZGF0YVNvdXJjZTtcclxuICAgICAgICAgICAgdGhpcy5zZXRUYWJTZWxlY3RlZChkYXRhU291cmNlW2FyZ3MuaXRlbUlkIV0uaWQpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHRhYklkID0gZGF0YVNvdXJjZVthcmdzLml0ZW1JZCFdLmlkO1xyXG4gICAgICAgICAgICB0YWJJZCA9IHRhYklkLnJlcGxhY2UoXCJ0YWJfXCIsXCJcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRUYWJTZWxlY3RlZEZyb21Ecm9wZG93bi5yYWlzZSh0aGlzLHt0YWJOYW1lOiB0YWJJZH0pXHJcblxyXG4gICAgICAgICAgICBsZXQgZHJvcGRvd24gPSAkKFwiI1wiK3RoaXMuX2xheW91dENvbnRhaW5lcklkICsgXCJfZHJvcGRvd25cIikuZGF0YShcImVqRHJvcERvd25MaXN0XCIpO1xyXG4gICAgICAgICAgICBkcm9wZG93bi5vcHRpb24oXCJkYXRhU291cmNlXCIsIGRhdGFTb3VyY2UsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0RHJvcGRvd24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fY2xvc2VUYWJCdXR0b25QcmVzc2VkRmxhZyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRHJvcGRvd25Qb3B1cChhcmdzKXtcclxuICAgICAgICAkKFwiaGVhZFwiKS5hcHBlbmQoJzxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj48L3N0eWxlPicpO1xyXG4gICAgICAgIHZhciBuZXdTdHlsZUVsZW1lbnQgPSAkKFwiaGVhZFwiKS5jaGlsZHJlbignOmxhc3QnKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgYXBwZW5kRHJvcERvd25MYXlvdXQoZmxleGlibGVUYWJDb250YWluZXJJZCwgbGF5b3V0Q29udGFpbmVySWQpe1xyXG4gICAgICAgIGxldCBodG1sID0gVGFiV2lkZ2V0TGF5b3V0UHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRGbGV4VGFiRHJvcGRvd25MYXlvdXQobGF5b3V0Q29udGFpbmVySWQpO1xyXG4gICAgICAgICQoXCIjXCIrZmxleGlibGVUYWJDb250YWluZXJJZCkuYXBwZW5kKGh0bWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERyb3Bkb3duTGF5b3V0KGxheW91dENvbnRhaW5lcklkOiBzdHJpbmcpe1xyXG5cclxuICAgICAgICBUYWJXaWRnZXRTdHlsZVByb3ZpZGVyLmdldEluc3RhbmNlKCkuc2V0RmxleFRhYlNlbGVjdGlvbkRyb3Bkb3duUG9wdXBTdHlsZShsYXlvdXRDb250YWluZXJJZCk7XHJcbiAgICBcclxuICAgICAgICBsZXQgZHJvcGRvd25TdHlsZSA9IFRhYldpZGdldFN0eWxlUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXREcm9wZG93blN0eWxlKGxheW91dENvbnRhaW5lcklkKTtcclxuICAgICAgICAkKFwiI1wiK2xheW91dENvbnRhaW5lcklkKS5hcHBlbmQoZHJvcGRvd25TdHlsZSk7IFxyXG5cclxuICAgICAgICBUYWJXaWRnZXRTdHlsZVByb3ZpZGVyLmdldEluc3RhbmNlKCkuc2V0T3ZlcnZpZXdEcm9wZG93bk1vdXNlT3ZlcihsYXlvdXRDb250YWluZXJJZCk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgYWRkSXRlbVRvRHJvcGRvd24odGFiTmFtZSwgdGFiSWQsIGxheW91dENvbnRhaW5lcklkLCBpY29uUGF0aCA9IFwiXCIpe1xyXG4gICAgICAgIHRoaXMuX2xheW91dENvbnRhaW5lcklkID0gbGF5b3V0Q29udGFpbmVySWQ7XHJcblxyXG4gICAgICAgIGxldCBkcm9wZG93biA9ICQoXCIjXCIrbGF5b3V0Q29udGFpbmVySWQgKyBcIl9kcm9wZG93blwiKS5kYXRhKFwiZWpEcm9wRG93bkxpc3RcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGRyb3Bkb3duLm1vZGVsLmRhdGFTb3VyY2UgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsZXQgdGV4dCAgPSAgYDxpbWcgc3JjPVwiYCtpY29uUGF0aCtgXCIgc3R5bGU9XCJ3aWR0aDoxN3B4OyBmbG9hdDpsZWZ0OyBtYXJnaW4tcmlnaHQ6IDVweDsgbWFyZ2luLXRvcDogMnB4OyBtYXJnaW4tbGVmdDogLTVweCBcIiA+YCArIHRhYk5hbWU7IFxyXG4gICAgICAgICAgICBkcm9wZG93bi5tb2RlbC5kYXRhU291cmNlLnNwbGljZSgwLCAwLCB7aWQgOiB0YWJJZCwgdGV4dCA6IHRleHQsIGljb25QYXRoOiBpY29uUGF0aCwgbmFtZTogdGFiTmFtZX0pO1xyXG4gICAgICAgICAgICB2YXIgZGF0YVNvdXJjZSA9IGRyb3Bkb3duLm1vZGVsLmRhdGFTb3VyY2U7XHJcbiAgICAgICAgICAgIGRyb3Bkb3duLm1vZGVsLmRhdGFTb3VyY2UgPSBudWxsO1xyXG4gICAgICAgICAgICBkcm9wZG93bi5vcHRpb24oXCJkYXRhU291cmNlXCIsIGRhdGFTb3VyY2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZXNldERyb3Bkb3duKCk7XHJcbiAgICAgICAgdGhpcy5zaG93RHJvcERvd25NZW51QnV0dG9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGFiU2VsZWN0ZWQodGFiSWQ6IHN0cmluZyl7XHJcbiAgICAgICAgdGFiSWQgPSB0YWJJZC5yZXBsYWNlKFwiX3RhYlwiLCBcIlwiKTtcclxuXHJcbiAgICAgICAgbGV0IGl0ZW1JZCA9IHRoaXMuZ2V0SXRlbUlkRnJvbVRhYklkKHRhYklkKTtcclxuXHJcbiAgICAgICAgbGV0IGRyb3Bkb3duID0gJChcIiNcIit0aGlzLl9sYXlvdXRDb250YWluZXJJZCErXCJfZHJvcGRvd25cIikuZGF0YShcImVqRHJvcERvd25MaXN0XCIpO1xyXG4gICAgICAgIHZhciBkYXRhU291cmNlID0gZHJvcGRvd24ubW9kZWwuZGF0YVNvdXJjZTtcclxuICAgICAgICBcclxuICAgICAgICBmb3IobGV0IGVsZW1lbnQgb2YgZGF0YVNvdXJjZSl7XHJcbiAgICAgICAgICAgIGVsZW1lbnQudGV4dCA9IGVsZW1lbnQudGV4dC5yZXBsYWNlKFwiX29yYW5nZS5zdmdcIiwgXCIuc3ZnXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoZGF0YVNvdXJjZVtpdGVtSWRdICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBuZXdUZXh0ID0gZGF0YVNvdXJjZVtpdGVtSWRdLnRleHQucmVwbGFjZShcIi5zdmdcIiwgXCJfb3JhbmdlLnN2Z1wiKTtcclxuICAgICAgICAgICAgZGF0YVNvdXJjZVtpdGVtSWRdLnRleHQgPSBuZXdUZXh0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZHJvcGRvd24ub3B0aW9uKFwiZGF0YVNvdXJjZVwiLCBkYXRhU291cmNlLCB0cnVlKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZXNldERyb3Bkb3duKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXNldERyb3Bkb3duKCl7XHJcblxyXG4gICAgICAgIGxldCBkcm9wZG93biA9ICQoXCIjXCIrdGhpcy5fbGF5b3V0Q29udGFpbmVySWQhK1wiX2Ryb3Bkb3duXCIpLmRhdGEoXCJlakRyb3BEb3duTGlzdFwiKTtcclxuXHJcbiAgICAgICAgdmFyIGRhdGFTb3VyY2UgPSBkcm9wZG93bi5tb2RlbC5kYXRhU291cmNlO1xyXG4gICAgICAgIGRyb3Bkb3duLm1vZGVsLmRhdGFTb3VyY2UgPSBudWxsO1xyXG4gICAgICAgIGRyb3Bkb3duLm9wdGlvbihcImRhdGFTb3VyY2VcIiwgZGF0YVNvdXJjZSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIGxldCBsYXN0RHJvcGRvd25JdGVtID0gJChcIiNcIit0aGlzLl9sYXlvdXRDb250YWluZXJJZCErXCJfZHJvcGRvd25fcG9wdXBfd3JhcHBlclwiKS5maW5kKFwibGlcIikubGFzdCgpO1xyXG4gICAgICAgIGxhc3REcm9wZG93bkl0ZW0uaHRtbChUYWJXaWRnZXRMYXlvdXRQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldFRhYk92ZXJ2aWV3Rm9vdGVyQnV0dG9uc1RlbXBsYXRlKHRoaXMuX2xheW91dENvbnRhaW5lcklkISEpKTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGRyb3Bkb3duLm1vZGVsLmRhdGFTb3VyY2UubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgYnV0dG9uTmFtZSA9IGRyb3Bkb3duLm1vZGVsLmRhdGFTb3VyY2VbaV1bXCJpZFwiXVxyXG4gICAgICAgICAgICAkKFwiI1wiK3RoaXMuX2xheW91dENvbnRhaW5lcklkIStcIl9kcm9wZG93bkxpc3RfYnV0dG9uX1wiK2J1dHRvbk5hbWUpLmVqQnV0dG9uKHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImltYWdlb25seVwiLFxyXG4gICAgICAgICAgICAgICAgcHJlZml4SWNvbjogXCJlLWljb24gXCIrIHRoaXMuX2xheW91dENvbnRhaW5lcklkIStcIl9kcm9wZG93bkxpc3RfYnV0dG9uX1wiK2J1dHRvbk5hbWUsXHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZTogdGhpcy5zZXREcm9wZG93bkJ1dHRvblN0eWxlKHRoaXMuX2xheW91dENvbnRhaW5lcklkIStcIl9kcm9wZG93bkxpc3RfYnV0dG9uX1wiK2J1dHRvbk5hbWUsIHRoaXMuX2xheW91dENvbnRhaW5lcklkISksXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkKFwiI1wiK3RoaXMuX2xheW91dENvbnRhaW5lcklkIStcIl9kcm9wZG93bkxpc3RfYnV0dG9uX1wiK2J1dHRvbk5hbWUpLm9uKFwiY2xpY2tcIiwoZTpFdmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNsb3NlVGFiKGJ1dHRvbk5hbWUpO30pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAkKFwiI1wiK3RoaXMuX2xheW91dENvbnRhaW5lcklkISArXCJfZHJvcGRvd25fY2xvc2VBbGxcIilbMF0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsKGU6RXZlbnQpID0+IHt0aGlzLm9uQ2xvc2VBbGxUYWJzKGUpO30pO1xyXG4gICAgICAgICQoXCIjXCIrdGhpcy5fbGF5b3V0Q29udGFpbmVySWQhICtcIl9kcm9wZG93bl9jbG9zZUFsbE90aGVyXCIpWzBdLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLChlOkV2ZW50KSA9PiB7dGhpcy5vbkNsb3NlQWxsVGFic0J1dEFjdGl2ZShlKTt9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBpdGVtTmFtZVxyXG4gICAgICogQHBhcmFtIHsqfSBtb3VzZVdoZWVsQ2xpY2tlZFxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldEZsZXhEcm9wRG93blxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlSXRlbUZyb21Ecm9wZG93bihpdGVtTmFtZSwgbW91c2VXaGVlbENsaWNrZWQpe1xyXG4gICAgICAgIGxldCBkcm9wZG93biA9ICQoXCIjXCIrdGhpcy5fZHJvcERvd25Db250YWluZXJJZCkuZGF0YShcImVqRHJvcERvd25MaXN0XCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChkcm9wZG93bi5tb2RlbC5kYXRhU291cmNlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGRyb3Bkb3duLm1vZGVsLmRhdGFTb3VyY2UhLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKGRyb3Bkb3duLm1vZGVsLmRhdGFTb3VyY2VbaV0uaWQgPT0gaXRlbU5hbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duLm1vZGVsLmRhdGFTb3VyY2Uuc3BsaWNlKGksMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGRhdGFTb3VyY2UgPSBkcm9wZG93bi5tb2RlbC5kYXRhU291cmNlO1xyXG4gICAgICAgICAgICBkcm9wZG93bi5tb2RlbC5kYXRhU291cmNlID0gbnVsbDtcclxuICAgICAgICAgICAgZHJvcGRvd24ub3B0aW9uKFwiZGF0YVNvdXJjZVwiLCBkYXRhU291cmNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIFxyXG4gICAgICAgIHRoaXMucmVzZXREcm9wZG93bigpO1xyXG5cclxuICAgICAgICBpZihkcm9wZG93bi5tb2RlbC5kYXRhU291cmNlLmxlbmd0aCA9PSAxKXtcclxuICAgICAgICAgICAgZHJvcGRvd24uaGlkZVBvcHVwKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZURyb3BEb3duTWVudUJ1dHRvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKCFtb3VzZVdoZWVsQ2xpY2tlZCl7XHJcbiAgICAgICAgICAgIGRyb3Bkb3duLmhpZGVQb3B1cCgpO1xyXG4gICAgICAgICAgICBkcm9wZG93bi5zaG93UG9wdXAoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgZHJvcGRvd24uaGlkZVBvcHVwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbG9zZVRhYih0YWJOYW1lKXtcclxuICAgICAgICAvL2xldCB0YWJOYW1lID0gdGhpcy5nZXRUYWJOYW1lRnJvbUNsaWNrRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRUYWJCYXJDbG9zZVRhYi5yYWlzZSh0aGlzLHt0YWJOYW1lOiB0YWJOYW1lfSk7XHJcbiAgICAgICAgdGhpcy5fY2xvc2VUYWJCdXR0b25QcmVzc2VkRmxhZyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsb3NlQWxsVGFicyhldmVudCl7XHJcbiAgICAgICAgdGhpcy5ldmVudFRhYkJhckNsb3NlQWxsVGFicy5yYWlzZSh0aGlzLGV2ZW50KTtcclxuICAgICAgICB0aGlzLl9jbG9zZVRhYkJ1dHRvblByZXNzZWRGbGFnID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xvc2VBbGxUYWJzQnV0QWN0aXZlKGV2ZW50KXtcclxuICAgICAgICB0aGlzLmV2ZW50VGFiQmFyQ2xvc2VBbGxUYWJzQnV0QWN0aXZlLnJhaXNlKHRoaXMsZXZlbnQpO1xyXG4gICAgICAgIHRoaXMuX2Nsb3NlVGFiQnV0dG9uUHJlc3NlZEZsYWcgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0RHJvcGRvd25CdXR0b25TdHlsZShidXR0b25JZDogc3RyaW5nLCBsYXlvdXRDb250YWluZXJJZCl7XHJcbiAgICAgICAgbGV0IGRyb3Bkb3duQnV0dG9uU3R5bGUgPSBUYWJXaWRnZXRTdHlsZVByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0RHJvcGRvd25CdXR0b25TdHlsZShidXR0b25JZCk7XHJcbiAgICAgICAgJChcIiNcIitsYXlvdXRDb250YWluZXJJZCkuYXBwZW5kKGRyb3Bkb3duQnV0dG9uU3R5bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGVEcm9wRG93bk1lbnVCdXR0b24oKXtcclxuICAgICAgICAkKFwiI1wiK3RoaXMuX2Ryb3BEb3duQ29udGFpbmVySWQgKyBcIl93cmFwcGVyXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG4gICAgfVxyXG4gICAgc2hvd0Ryb3BEb3duTWVudUJ1dHRvbigpe1xyXG4gICAgICAgICQoXCIjXCIrdGhpcy5fZHJvcERvd25Db250YWluZXJJZCArIFwiX3dyYXBwZXJcIikuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRhYk5hbWVGcm9tSXRlbVRleHQoaXRlbVRleHQ6IHN0cmluZykgOiBzdHJpbmd7XHJcbiAgICAgICAgbGV0IHRleHQgPSBpdGVtVGV4dC50cmltKCk7XHJcbiAgICAgICAgbGV0IHdoaXRlc3BhY2UgPSB0ZXh0LmluZGV4T2YoJyAnLCAxKTtcclxuICAgICAgICBsZXQgdGFiTmFtZSA9IFwidGFiX1wiK3RleHQuc3Vic3RyKHdoaXRlc3BhY2UgKyAxKTtcclxuICAgICAgICByZXR1cm4gdGFiTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUYWJOYW1lRnJvbURyb3BEb3duRGF0YU1vZGVsVGV4dChpdGVtVGV4dDogc3RyaW5nKSA6IHN0cmluZ3tcclxuICAgICAgICBsZXQgdGV4dCA9IGl0ZW1UZXh0LnRyaW0oKTtcclxuICAgICAgICBsZXQgd2hpdGVzcGFjZSA9IHRleHQuaW5kZXhPZignICcsIDEpO1xyXG4gICAgICAgIGxldCB0YWJOYW1lID0gXCJ0YWJfXCIrdGV4dC5zdWJzdHIod2hpdGVzcGFjZSArIDEpO1xyXG4gICAgICAgIHJldHVybiB0YWJOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRhYk5hbWVGcm9tQ2xpY2tFdmVudChldmVudCl7XHJcbiAgICAgICAgdmFyIHN0ciA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuaWQ7XHJcbiAgICAgICAgdmFyIG4gPSBzdHIubGFzdEluZGV4T2YoJ19idXR0b25fJyk7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHN0ci5zdWJzdHJpbmcobiArIDgpO1xyXG4gICAgICAgIC8vbGV0IHRhYk5hbWUgPSBldmVudC5jdXJyZW50VGFyZ2V0LmlkLnN1YnN0cmluZyhldmVudC5jdXJyZW50VGFyZ2V0LmlkLmxhc3RJbmRleE9mKFwiX1wiKSArIDEpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gSWQgb2YgRWxlbWVudCBpbiBEcm9wZG93biBieSBUYWJJZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0YWJJZFxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRGbGV4RHJvcERvd25cclxuICAgICAqL1xyXG4gICAgZ2V0SXRlbUlkRnJvbVRhYklkKHRhYklkOiBzdHJpbmcpIDogbnVtYmVye1xyXG4gICAgICAgIGxldCBkcm9wZG93biA9ICQoXCIjXCIrdGhpcy5fZHJvcERvd25Db250YWluZXJJZCkuZGF0YShcImVqRHJvcERvd25MaXN0XCIpO1xyXG4gICAgICAgIGxldCBkYXRhU291cmNlID0gZHJvcGRvd24ubW9kZWwuZGF0YVNvdXJjZTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGRhdGFTb3VyY2UubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZih0YWJJZCA9PSBkYXRhU291cmNlW2ldLmlkKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7VGFiV2lkZ2V0RmxleERyb3BEb3dufTsiXX0=