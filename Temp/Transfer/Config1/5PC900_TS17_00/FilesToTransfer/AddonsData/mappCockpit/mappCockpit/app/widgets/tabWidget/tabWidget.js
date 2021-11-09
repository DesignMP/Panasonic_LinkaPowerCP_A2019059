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
define(["require", "exports", "../common/layoutWidgetBase", "./view/tabWidgetFlexTab", "./interfaces/tabWidgetInterface", "./view/tabWidgetFixedTab", "./layout/tabWidgetLayoutProvider", "./view/tabWidgetFlexDropDown", "../common/viewTypeProvider", "../common/uniqueIdGenerator", "./componentDefaultDefinition", "../common/widgetBase"], function (require, exports, layoutWidgetBase_1, tabWidgetFlexTab_1, tabWidgetInterface_1, tabWidgetFixedTab_1, tabWidgetLayoutProvider_1, tabWidgetFlexDropDown_1, viewTypeProvider_1, uniqueIdGenerator_1, componentDefaultDefinition_1, widgetBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.topBarClassName = "TopBar";
    var tabWidgetFlexTabAreaWidth = "100%";
    var tabWidgetRightTabAreaWidth = "0px";
    var TabWidget = /** @class */ (function (_super) {
        __extends(TabWidget, _super);
        function TabWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._rightTabContainerId = "tabWidgetTabContainerRight";
            _this._flexibleTabContainerId = "tabWidgetFlexibleTabContainer";
            _this._leftTabContainerId = "tabWidgetTabContainerLeft";
            _this._tabSelectedFromDropDownHandler = function (sender, eventArgs) { _this.onTabClicked(eventArgs); };
            _this._tabBarCloseTabHandler = function (sender, args) { _this.closeTab(args, false); };
            _this._tabBarCloseAllTabsHandler = function (sender, args) { _this.closeAllTabs(args); };
            _this._tabBarCloseAllTabsButActiveHandler = function (sender, args) { _this.closeAllTabsButActive(args); };
            _this._tabClickedHandler = function (sender, args) { _this.onTabClicked(args); };
            _this._tabWheelClickedHandler = function (sender, args) { _this.onTabWheelClicked(args); };
            _this._activeTabHiddenHandler = function (sender, args) { _this.onActiveTabHidden(sender, args); };
            return _this;
        }
        /**
         *
         *
         * @memberof TabWidget
         */
        TabWidget.prototype.initialize = function () {
            this._actualWidth = 500;
            this._actualHeight = 500;
            this._flexDropDown = new tabWidgetFlexDropDown_1.TabWidgetFlexDropDown();
            this.attachFlexDropDownEvents();
            var layoutContainerId = widgetBase_1.WidgetBase.getUniqueDivId();
            this.setUniqueTabContainerIds(layoutContainerId);
            _super.prototype.initialize.call(this);
        };
        TabWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        TabWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this.dataModel = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.TabWidgetDataModel);
        };
        TabWidget.prototype.dispose = function () {
            // Dispose widgets
            this._widgets.forEach(function (widget) {
                if (widget != undefined) {
                    widget.dispose();
                }
            });
            this.dataModel.dispose();
            this.detachFlexDropDownEvents();
            _super.prototype.dispose.call(this);
        };
        /**
         * Attaches the flexDropDown events
         *
         * @private
         * @memberof TabWidget
         */
        TabWidget.prototype.attachFlexDropDownEvents = function () {
            if (this._flexDropDown != undefined) {
                this._flexDropDown.eventTabSelectedFromDropdown.attach(this._tabSelectedFromDropDownHandler);
                this._flexDropDown.eventTabBarCloseTab.attach(this._tabBarCloseTabHandler);
                this._flexDropDown.eventTabBarCloseAllTabs.attach(this._tabBarCloseAllTabsHandler);
                this._flexDropDown.eventTabBarCloseAllTabsButActive.attach(this._tabBarCloseAllTabsButActiveHandler);
            }
        };
        /**
         * Detaches the flexDropDown events
         *
         * @private
         * @memberof TabWidget
         */
        TabWidget.prototype.detachFlexDropDownEvents = function () {
            if (this._flexDropDown != undefined) {
                this._flexDropDown.eventTabSelectedFromDropdown.detach(this._tabSelectedFromDropDownHandler);
                this._flexDropDown.eventTabBarCloseTab.detach(this._tabBarCloseTabHandler);
                this._flexDropDown.eventTabBarCloseAllTabs.detach(this._tabBarCloseAllTabsHandler);
                this._flexDropDown.eventTabBarCloseAllTabsButActive.detach(this._tabBarCloseAllTabsButActiveHandler);
            }
        };
        /**
         *
         *
         * @private
         * @param {string} layoutContainerId
         * @memberof TabWidget
         */
        TabWidget.prototype.setUniqueTabContainerIds = function (layoutContainerId) {
            this._rightTabContainerId = layoutContainerId + "_tabWidgetTabContainerRight";
            this._flexibleTabContainerId = layoutContainerId + "_tabWidgetFlexibleTabContainer";
            this._leftTabContainerId = layoutContainerId + "_tabWidgetTabContainerLeft";
        };
        /**
         * Creates the layout of the widget
         *
         * @memberof TabWidget
         */
        TabWidget.prototype.createLayout = function () {
            var tabLayout = tabWidgetLayoutProvider_1.TabWidgetLayoutProvider.getInstance().getTabBarLayout(this.mainDivId, this._leftTabContainerId, this._flexibleTabContainerId, this._rightTabContainerId);
            $(this.mainDiv).append(tabLayout);
            //$("."+mainNavigationClassName).parent().append($(`<div id="`+ this._rightTabContainerId +`" class="topBarTabContainerRight"></div>`))
            this._flexDropDown.addFlexTabDropdown(this.mainDivId, this._flexibleTabContainerId);
            this.adaptWidthOfFlexTabBar();
        };
        /**
         * Loads the styles for the tab widget
         *
         * @memberof TabWidget
         */
        TabWidget.prototype.loadStyles = function () {
            _super.prototype.addStyle.call(this, "widgets/tabWidget/style/css/tabWidgetStyle.css");
        };
        /**
         *
         *
         * @memberof TabWidget
         */
        TabWidget.prototype.activate = function () {
            if (this.dataModel.getFlexTabs().length == 0) {
                this.selectOverview();
            }
            var widget = this.dataModel.getActiveTab().widget;
            if (widget != undefined) {
                widget.activate();
            }
        };
        TabWidget.prototype.deactivate = function () {
            var tabs = this.dataModel.getAllTabs();
            for (var _i = 0, tabs_1 = tabs; _i < tabs_1.length; _i++) {
                var element = tabs_1[_i];
                if (element.widget != undefined) {
                    element.widget.deactivate();
                }
            }
        };
        /**
         *
         *
         * @param {IWidget} widget
         * @param {string} tabName
         * @param {ViewType} viewType
         * @param {*} data
         * @memberof TabWidget
         */
        TabWidget.prototype.addWidget = function (widget, tabName, viewType, data) {
            _super.prototype.addWidget.call(this, widget, tabName, viewType);
            var tabId = tabName + "_" + viewType.toString();
            tabId = uniqueIdGenerator_1.UniqueIdGenerator.getInstance().getUniqueIdFromString(tabId);
            tabId = tabId.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '_');
            var iconPath = viewTypeProvider_1.ViewTypeProvider.getInstance().getIconByViewType(viewType);
            var newTab = this.addNewTab(data.widgetPosition, iconPath, tabId, tabName);
            if (newTab) {
                newTab.addWidget(widget);
            }
        };
        /**
         *
         *
         * @private
         * @param {*} widgetPosition
         * @param {*} iconPath
         * @param {*} tabId
         * @returns
         * @memberof TabWidget
         */
        TabWidget.prototype.addNewTab = function (widgetPosition, iconPath, tabId, displayName) {
            var newTab;
            switch (widgetPosition) {
                case tabWidgetInterface_1.TabWidgetWidgetPositons.flex:
                    newTab = this.addFlexibleTab(tabId, iconPath, displayName);
                    break;
                case tabWidgetInterface_1.TabWidgetWidgetPositons.right:
                    newTab = this.addFixedTab(tabId, iconPath, this._rightTabContainerId);
                    break;
                case tabWidgetInterface_1.TabWidgetWidgetPositons.left:
                    newTab = this.addFixedTab(tabId, iconPath, this._leftTabContainerId);
                    break;
            }
            this.registerEventsForTab(newTab);
            this.dataModel.addTab(newTab);
            return newTab;
        };
        /**
         *
         *
         * @private
         * @param {ITabWidgetTab} tab
         * @memberof TabWidget
         */
        TabWidget.prototype.registerEventsForTab = function (tab) {
            if (tab != undefined) {
                tab.eventTabWidgetTabClicked.attach(this._tabClickedHandler);
                tab.eventTabWidgetTabWheelClicked.attach(this._tabWheelClickedHandler);
                tab.eventTabWidgetActiveHidden.attach(this._activeTabHiddenHandler);
            }
        };
        TabWidget.prototype.unregisterEventsForTab = function (tab) {
            if (tab != undefined) {
                tab.eventTabWidgetTabClicked.detach(this._tabClickedHandler);
                tab.eventTabWidgetTabWheelClicked.detach(this._tabWheelClickedHandler);
                tab.eventTabWidgetActiveHidden.detach(this._activeTabHiddenHandler);
            }
        };
        /**
         *
         *
         * @private
         * @param {*} tabID
         * @param {*} iconPath
         * @returns {ITabWidgetTab}
         * @memberof TabWidget
         */
        TabWidget.prototype.addFlexibleTab = function (tabID, iconPath, displayName) {
            var newTab = new tabWidgetFlexTab_1.TabWidgetFlexTab();
            newTab.appendTabLayout(this.mainDiv, this._flexibleTabContainerId + "_flexBox", tabID, displayName);
            newTab.setIcon(iconPath);
            this._flexDropDown.addItemToDropdown(displayName, newTab.tabContainerId, this.mainDivId, iconPath);
            return newTab;
        };
        /**
         *
         *
         * @private
         * @param {*} tabName
         * @param {*} iconPath
         * @param {*} widgetPosition
         * @returns {ITabWidgetTab}
         * @memberof TabWidget
         */
        TabWidget.prototype.addFixedTab = function (tabName, iconPath, widgetPosition) {
            var newTab = new tabWidgetFixedTab_1.TabWidgetFixedTab();
            newTab.appendTabLayout(this.mainDiv, widgetPosition, tabName, "");
            newTab.setIcon(iconPath);
            return newTab;
        };
        /**
         *
         *
         * @private
         * @memberof TabWidget
         */
        TabWidget.prototype.adaptWidthOfFlexTabBar = function () {
            tabWidgetFlexTabAreaWidth = "calc( 100% - 54px )";
            tabWidgetRightTabAreaWidth = "calc( 0px + 51px )";
            document.documentElement.style.setProperty('--tabWidgetFlexTabAreaWidth', tabWidgetFlexTabAreaWidth);
            document.documentElement.style.setProperty('--tabWidgetRightTabAreaWidth', tabWidgetRightTabAreaWidth);
        };
        /**
         *
         *
         * @private
         * @param {ITabWidgetTab} sender
         * @param {object} eventArgs
         * @returns {*}
         * @memberof TabWidget
         */
        TabWidget.prototype.onActiveTabHidden = function (sender, eventArgs) {
            if (eventArgs["eventTrigger"] == "resize") {
                var newIndex = this.dataModel.getFlexTabIndex(sender) - 1;
                if (newIndex >= 0) {
                    this.dataModel.setFlexTabPosition(newIndex, sender);
                    sender.isVisible(eventArgs["eventTrigger"]);
                }
            }
            else {
                this.dataModel.setFlexTabPosition(0, sender);
            }
        };
        /**
         *
         *
         * @private
         * @param {*} args
         * @memberof TabWidget
         */
        TabWidget.prototype.onTabClicked = function (args) {
            this.selectTab(args.tabName);
        };
        /**
         *
         *
         * @private
         * @param {*} args
         * @memberof TabWidget
         */
        TabWidget.prototype.onTabWheelClicked = function (args) {
            this.closeTab(args, true);
        };
        /**
         *
         *
         * @param {*} tabName
         * @returns {ITabWidgetTab}
         * @memberof TabWidget
         */
        TabWidget.prototype.selectTab = function (tabName) {
            var tabId = "tab_" + tabName;
            var selectedTab = this.dataModel.getTabById(tabId);
            if (selectedTab != undefined && !selectedTab.isActive) {
                this._flexDropDown.setTabSelected(tabId);
                this.setTabActive(selectedTab);
                this.resizeTab(selectedTab);
            }
            else if (selectedTab == undefined) {
                console.error("selected Tab is not defined");
            }
            return selectedTab;
        };
        /**
         *
         *
         * @private
         * @param {ITabWidgetTab} selectedTab
         * @memberof TabWidget
         */
        TabWidget.prototype.setTabActive = function (selectedTab) {
            this.setAllTabsInactive();
            if (this.dataModel.getActiveTab().widget != undefined) {
                this.dataModel.getActiveTab().widget.deactivate();
            }
            selectedTab.setActive();
            if (selectedTab.widget != undefined) {
                selectedTab.widget.activate();
            }
            this.dataModel.setActiveTab(selectedTab);
        };
        /**
         *
         *
         * @private
         * @param {ITabWidgetTab} selectedTab
         * @memberof TabWidget
         */
        TabWidget.prototype.resizeTab = function (selectedTab) {
            if (selectedTab.widget != undefined) {
                selectedTab.widget.resize(this._actualWidth, this._actualHeight);
            }
        };
        /**
         *
         *
         * @private
         * @memberof TabWidget
         */
        TabWidget.prototype.setAllTabsInactive = function () {
            for (var i = 0; i < this.dataModel.getAllTabs().length; i++) {
                this.dataModel.getAllTabs()[i].setDisplayNone();
                this.dataModel.getAllTabs()[i].removeStyleClassActive();
            }
        };
        TabWidget.prototype.onAbsoluteTabSelected = function () {
            for (var i = 0; i < this.dataModel.getAllTabs().length; i++) {
                this.dataModel.getAllTabs()[i].removeStyleClassActive();
            }
            var rightHandSideBarButtons = $(".rightHandSideBarButton");
            for (var i = 0; i < rightHandSideBarButtons.length; i++) {
                rightHandSideBarButtons[i].className = rightHandSideBarButtons[i].className.replace(" active", "");
                rightHandSideBarButtons[i].getElementsByTagName('img')[0].src = rightHandSideBarButtons[i].getElementsByTagName('img')[0].src.replace('_active.svg', '.svg');
            }
            var absoluteTabs = $(".absoluteTab");
            for (var i = 0; i < rightHandSideBarButtons.length; i++) {
                absoluteTabs[i].style.display = "none";
            }
        };
        /**
         *
         *
         * @param {number} width
         * @param {number} height
         * @memberof TabWidget
         */
        TabWidget.prototype.resize = function (width, height) {
            this._actualWidth = width;
            this._actualHeight = height;
            // Set size of tab control itself
            this.mainDiv.style.width = width + "px";
            this.mainDiv.style.height = height + "px";
            this.dataModel.getActiveTab().isVisible("resize");
            if (this.dataModel.getActiveTab().widget != undefined) {
                this.dataModel.getActiveTab().widget.resize(width, height);
            }
        };
        /**
         *
         *
         * @memberof TabWidget
         */
        TabWidget.prototype.selectOverview = function () {
            var fixedTabs = this.dataModel.data.fixedTabs;
            var overviewId = fixedTabs[fixedTabs.length - 1].tabContainerId;
            overviewId = overviewId.replace("tab_", "");
            this.selectTab(overviewId);
        };
        /**
         *
         *
         * @private
         * @param {ITabWidgetTab} tabToRemove
         * @param {*} mouseWheelClicked
         * @memberof TabWidget
         */
        TabWidget.prototype.removeTab = function (tabToRemove, mouseWheelClicked) {
            if (tabToRemove == this.dataModel.getActiveTab()) {
                var flexTabIndex = this.dataModel.getFlexTabIndex(tabToRemove);
                if ((this.dataModel.getFlexTabs()[flexTabIndex - 1]) != undefined) {
                    this.selectTab(this.dataModel.getFlexTabs()[flexTabIndex - 1].tabName);
                }
                else if ((this.dataModel.getFlexTabs()[flexTabIndex + 1]) != undefined) {
                    this.selectTab(this.dataModel.getFlexTabs()[flexTabIndex + 1].tabName);
                }
                else {
                    this.selectOverview();
                }
            }
            var index = this.dataModel.data.flexTabs.indexOf(tabToRemove, 0);
            if (index > -1) {
                this.dataModel.data.flexTabs.splice(index, 1);
            }
            this._flexDropDown.removeItemFromDropdown(tabToRemove.tabContainerId, mouseWheelClicked);
            var tabContainer = document.getElementById(tabToRemove.tabContainerId);
            var tabContainertab = document.getElementById(tabToRemove.tabContainerId + "_tab");
            tabContainertab.parentNode.removeChild(tabContainertab);
            tabContainer.parentNode.removeChild(tabContainer);
            this.unregisterEventsForTab(tabToRemove);
            _super.prototype.removeWidget.call(this, tabToRemove.widget);
        };
        /**
         *
         *
         * @private
         * @param {*} args
         * @param {*} mouseWheelClicked
         * @memberof TabWidget
         */
        TabWidget.prototype.closeTab = function (args, mouseWheelClicked) {
            var tabToClose = this.dataModel.getTabById(args.tabName);
            if (tabToClose != undefined) {
                //tabToClose.widget.saveComponentSettings();
                if (tabToClose.widget != undefined) {
                    tabToClose.widget.dispose();
                }
                this.removeTab(tabToClose, mouseWheelClicked);
            }
        };
        /**
         *
         *
         * @private
         * @param {*} args
         * @memberof TabWidget
         */
        TabWidget.prototype.closeAllTabs = function (args) {
            var tabsToClose = new Array();
            for (var i = 0; i < this.dataModel.getFlexTabs().length; i++) {
                tabsToClose.push(this.dataModel.getFlexTabs()[i]);
            }
            for (var i = 0; i < tabsToClose.length; i++) {
                tabsToClose[i].widget.dispose();
                this.removeTab(tabsToClose[i], false);
            }
        };
        /**
         *
         *
         * @private
         * @param {*} args
         * @memberof TabWidget
         */
        TabWidget.prototype.closeAllTabsButActive = function (args) {
            var tabsToClose = new Array();
            for (var i = 0; i < this.dataModel.getFlexTabs().length; i++) {
                if (this.dataModel.getFlexTabs()[i] != this.dataModel.getActiveTab()) {
                    tabsToClose.push(this.dataModel.getFlexTabs()[i]);
                }
            }
            for (var i = 0; i < tabsToClose.length; i++) {
                tabsToClose[i].widget.dispose();
                this.removeTab(tabsToClose[i], false);
            }
        };
        return TabWidget;
    }(layoutWidgetBase_1.LayoutWidgetBase));
    exports.TabWidget = TabWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RhYldpZGdldC90YWJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQWVhLFFBQUEsZUFBZSxHQUFHLFFBQVEsQ0FBQztJQUV4QyxJQUFJLHlCQUF5QixHQUFHLE1BQU0sQ0FBQztJQUN2QyxJQUFJLDBCQUEwQixHQUFHLEtBQUssQ0FBQztJQUd2QztRQUF3Qiw2QkFBZ0I7UUFBeEM7WUFBQSxxRUE0aEJDO1lBMWhCRywwQkFBb0IsR0FBRyw0QkFBNEIsQ0FBQTtZQUNuRCw2QkFBdUIsR0FBRywrQkFBK0IsQ0FBQztZQUMxRCx5QkFBbUIsR0FBRywyQkFBMkIsQ0FBQTtZQU16QyxxQ0FBK0IsR0FBRyxVQUFDLE1BQU0sRUFBRSxTQUFTLElBQU8sS0FBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQztZQUN6Riw0QkFBc0IsR0FBRyxVQUFDLE1BQU0sRUFBQyxJQUFJLElBQU0sS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUM7WUFDdkUsZ0NBQTBCLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFNLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUM7WUFDeEUseUNBQW1DLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFNLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQztZQUUxRix3QkFBa0IsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElBQU0sS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQztZQUNqRSw2QkFBdUIsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElB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b0JBQ2hFLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNyRDthQUNKO1lBQ0QsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQ3ZDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ3pDO1FBQ0wsQ0FBQztRQUNMLGdCQUFDO0lBQUQsQ0FBQyxBQTVoQkQsQ0FBd0IsbUNBQWdCLEdBNGhCdkM7SUFDTyw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExheW91dFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL2xheW91dFdpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgSVdpZGdldCB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy93aWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVGFiV2lkZ2V0RmxleFRhYiB9IGZyb20gXCIuL3ZpZXcvdGFiV2lkZ2V0RmxleFRhYlwiO1xyXG5pbXBvcnQgeyBJVGFiV2lkZ2V0VGFiIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy90YWJXaWRnZXRUYWJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVRhYldpZGdldERhdGFNb2RlbCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvdG9wQmFyRGF0YU1vZGVsL2ludGVyZmFjZXMvdGFiV2lkZ2V0RGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRhYldpZGdldFdpZGdldFBvc2l0b25zfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3RhYldpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUYWJXaWRnZXRGaXhlZFRhYiB9IGZyb20gXCIuL3ZpZXcvdGFiV2lkZ2V0Rml4ZWRUYWJcIjtcclxuaW1wb3J0IHsgVGFiV2lkZ2V0TGF5b3V0UHJvdmlkZXIgfSBmcm9tIFwiLi9sYXlvdXQvdGFiV2lkZ2V0TGF5b3V0UHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgVGFiV2lkZ2V0RmxleERyb3BEb3duIH0gZnJvbSBcIi4vdmlldy90YWJXaWRnZXRGbGV4RHJvcERvd25cIjtcclxuaW1wb3J0IHsgVGFiV2lkZ2V0U3R5bGVQcm92aWRlciB9IGZyb20gXCIuL3RhYldpZGdldFN0eWxlUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgVmlld1R5cGVQcm92aWRlciwgVmlld1R5cGV9IGZyb20gXCIuLi9jb21tb24vdmlld1R5cGVQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBVbmlxdWVJZEdlbmVyYXRvciB9IGZyb20gXCIuLi9jb21tb24vdW5pcXVlSWRHZW5lcmF0b3JcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24gfSBmcm9tIFwiLi9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi93aWRnZXRCYXNlXCI7XHJcblxyXG5leHBvcnQgY29uc3QgdG9wQmFyQ2xhc3NOYW1lID0gXCJUb3BCYXJcIjtcclxuXHJcbmxldCB0YWJXaWRnZXRGbGV4VGFiQXJlYVdpZHRoID0gXCIxMDAlXCI7XHJcbmxldCB0YWJXaWRnZXRSaWdodFRhYkFyZWFXaWR0aCA9IFwiMHB4XCI7XHJcblxyXG5cclxuY2xhc3MgVGFiV2lkZ2V0IGV4dGVuZHMgTGF5b3V0V2lkZ2V0QmFzZSB7XHJcblxyXG4gICAgX3JpZ2h0VGFiQ29udGFpbmVySWQgPSBcInRhYldpZGdldFRhYkNvbnRhaW5lclJpZ2h0XCJcclxuICAgIF9mbGV4aWJsZVRhYkNvbnRhaW5lcklkID0gXCJ0YWJXaWRnZXRGbGV4aWJsZVRhYkNvbnRhaW5lclwiO1xyXG4gICAgX2xlZnRUYWJDb250YWluZXJJZCA9IFwidGFiV2lkZ2V0VGFiQ29udGFpbmVyTGVmdFwiXHJcblxyXG4gICAgX2ZsZXhEcm9wRG93bj86IFRhYldpZGdldEZsZXhEcm9wRG93bjtcclxuXHJcbiAgICBkYXRhTW9kZWwhOiBJVGFiV2lkZ2V0RGF0YU1vZGVsO1xyXG4gICBcclxuICAgIHByaXZhdGUgX3RhYlNlbGVjdGVkRnJvbURyb3BEb3duSGFuZGxlciA9IChzZW5kZXIsIGV2ZW50QXJncykgPT4geyB0aGlzLm9uVGFiQ2xpY2tlZChldmVudEFyZ3MpfTtcclxuICAgIHByaXZhdGUgX3RhYkJhckNsb3NlVGFiSGFuZGxlciA9IChzZW5kZXIsYXJncykgPT4ge3RoaXMuY2xvc2VUYWIoYXJncywgZmFsc2UpfTtcclxuICAgIHByaXZhdGUgX3RhYkJhckNsb3NlQWxsVGFic0hhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpID0+IHt0aGlzLmNsb3NlQWxsVGFicyhhcmdzKX07XHJcbiAgICBwcml2YXRlIF90YWJCYXJDbG9zZUFsbFRhYnNCdXRBY3RpdmVIYW5kbGVyID0gKHNlbmRlcixhcmdzKSA9PiB7dGhpcy5jbG9zZUFsbFRhYnNCdXRBY3RpdmUoYXJncyl9O1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF90YWJDbGlja2VkSGFuZGxlciA9IChzZW5kZXIsIGFyZ3MpID0+IHt0aGlzLm9uVGFiQ2xpY2tlZChhcmdzKX07XHJcbiAgICBwcml2YXRlIF90YWJXaGVlbENsaWNrZWRIYW5kbGVyID0gKHNlbmRlciwgYXJncykgPT4ge3RoaXMub25UYWJXaGVlbENsaWNrZWQoYXJncyl9O1xyXG4gICAgcHJpdmF0ZSBfYWN0aXZlVGFiSGlkZGVuSGFuZGxlciA9IChzZW5kZXIsYXJncykgPT4ge3RoaXMub25BY3RpdmVUYWJIaWRkZW4oc2VuZGVyLGFyZ3MpfTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZSgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fYWN0dWFsV2lkdGg9NTAwO1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbEhlaWdodD01MDA7XHJcblxyXG4gICAgICAgIHRoaXMuX2ZsZXhEcm9wRG93biA9IG5ldyBUYWJXaWRnZXRGbGV4RHJvcERvd24oKTtcclxuICAgICAgICB0aGlzLmF0dGFjaEZsZXhEcm9wRG93bkV2ZW50cygpO1xyXG5cclxuICAgICAgICBsZXQgbGF5b3V0Q29udGFpbmVySWQgPSBXaWRnZXRCYXNlLmdldFVuaXF1ZURpdklkKCk7XHJcbiAgICAgICAgdGhpcy5zZXRVbmlxdWVUYWJDb250YWluZXJJZHMobGF5b3V0Q29udGFpbmVySWQpO1xyXG5cclxuICAgICAgICBzdXBlci5pbml0aWFsaXplKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldERlZmF1bHREZWZpbml0aW9uKG5ldyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbigpKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVkKCl7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZWQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhTW9kZWwgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uVGFiV2lkZ2V0RGF0YU1vZGVsKSBhcyBJVGFiV2lkZ2V0RGF0YU1vZGVsO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICAvLyBEaXNwb3NlIHdpZGdldHNcclxuICAgICAgICB0aGlzLl93aWRnZXRzLmZvckVhY2goKHdpZGdldCkgPT4ge1xyXG4gICAgICAgICAgICBpZih3aWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHdpZGdldC5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhTW9kZWwuZGlzcG9zZSgpO1xyXG4gICAgICAgIHRoaXMuZGV0YWNoRmxleERyb3BEb3duRXZlbnRzKCk7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaGVzIHRoZSBmbGV4RHJvcERvd24gZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhdHRhY2hGbGV4RHJvcERvd25FdmVudHMoKXtcclxuICAgICAgICBpZih0aGlzLl9mbGV4RHJvcERvd24gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fZmxleERyb3BEb3duLmV2ZW50VGFiU2VsZWN0ZWRGcm9tRHJvcGRvd24uYXR0YWNoKHRoaXMuX3RhYlNlbGVjdGVkRnJvbURyb3BEb3duSGFuZGxlcik7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZsZXhEcm9wRG93bi5ldmVudFRhYkJhckNsb3NlVGFiLmF0dGFjaCh0aGlzLl90YWJCYXJDbG9zZVRhYkhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9mbGV4RHJvcERvd24uZXZlbnRUYWJCYXJDbG9zZUFsbFRhYnMuYXR0YWNoKHRoaXMuX3RhYkJhckNsb3NlQWxsVGFic0hhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9mbGV4RHJvcERvd24uZXZlbnRUYWJCYXJDbG9zZUFsbFRhYnNCdXRBY3RpdmUuYXR0YWNoKHRoaXMuX3RhYkJhckNsb3NlQWxsVGFic0J1dEFjdGl2ZUhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGFjaGVzIHRoZSBmbGV4RHJvcERvd24gZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZXRhY2hGbGV4RHJvcERvd25FdmVudHMoKXtcclxuICAgICAgICBpZih0aGlzLl9mbGV4RHJvcERvd24gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fZmxleERyb3BEb3duLmV2ZW50VGFiU2VsZWN0ZWRGcm9tRHJvcGRvd24uZGV0YWNoKHRoaXMuX3RhYlNlbGVjdGVkRnJvbURyb3BEb3duSGFuZGxlcik7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZsZXhEcm9wRG93bi5ldmVudFRhYkJhckNsb3NlVGFiLmRldGFjaCh0aGlzLl90YWJCYXJDbG9zZVRhYkhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9mbGV4RHJvcERvd24uZXZlbnRUYWJCYXJDbG9zZUFsbFRhYnMuZGV0YWNoKHRoaXMuX3RhYkJhckNsb3NlQWxsVGFic0hhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9mbGV4RHJvcERvd24uZXZlbnRUYWJCYXJDbG9zZUFsbFRhYnNCdXRBY3RpdmUuZGV0YWNoKHRoaXMuX3RhYkJhckNsb3NlQWxsVGFic0J1dEFjdGl2ZUhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYXlvdXRDb250YWluZXJJZFxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFVuaXF1ZVRhYkNvbnRhaW5lcklkcyhsYXlvdXRDb250YWluZXJJZDogc3RyaW5nKXtcclxuICAgICAgICB0aGlzLl9yaWdodFRhYkNvbnRhaW5lcklkID0gbGF5b3V0Q29udGFpbmVySWQgKyBcIl90YWJXaWRnZXRUYWJDb250YWluZXJSaWdodFwiXHJcbiAgICAgICAgdGhpcy5fZmxleGlibGVUYWJDb250YWluZXJJZCA9IGxheW91dENvbnRhaW5lcklkICsgXCJfdGFiV2lkZ2V0RmxleGlibGVUYWJDb250YWluZXJcIjtcclxuICAgICAgICB0aGlzLl9sZWZ0VGFiQ29udGFpbmVySWQgPSBsYXlvdXRDb250YWluZXJJZCArIFwiX3RhYldpZGdldFRhYkNvbnRhaW5lckxlZnRcIlxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGxheW91dCBvZiB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVMYXlvdXQoKSB7XHJcblxyXG4gICAgICAgIGxldCB0YWJMYXlvdXQ6IHN0cmluZyA9IFRhYldpZGdldExheW91dFByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0VGFiQmFyTGF5b3V0KHRoaXMubWFpbkRpdklkLCB0aGlzLl9sZWZ0VGFiQ29udGFpbmVySWQsdGhpcy5fZmxleGlibGVUYWJDb250YWluZXJJZCx0aGlzLl9yaWdodFRhYkNvbnRhaW5lcklkKTtcclxuICAgICAgICAkKHRoaXMubWFpbkRpdikuYXBwZW5kKHRhYkxheW91dCk7XHJcbiAgICAgICAgLy8kKFwiLlwiK21haW5OYXZpZ2F0aW9uQ2xhc3NOYW1lKS5wYXJlbnQoKS5hcHBlbmQoJChgPGRpdiBpZD1cImArIHRoaXMuX3JpZ2h0VGFiQ29udGFpbmVySWQgK2BcIiBjbGFzcz1cInRvcEJhclRhYkNvbnRhaW5lclJpZ2h0XCI+PC9kaXY+YCkpXHJcbiAgICAgICAgdGhpcy5fZmxleERyb3BEb3duIS5hZGRGbGV4VGFiRHJvcGRvd24odGhpcy5tYWluRGl2SWQsIHRoaXMuX2ZsZXhpYmxlVGFiQ29udGFpbmVySWQpO1xyXG4gICAgICAgIHRoaXMuYWRhcHRXaWR0aE9mRmxleFRhYkJhcigpO1xyXG4gICAgfSAgICBcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgc3R5bGVzIGZvciB0aGUgdGFiIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgbG9hZFN0eWxlcygpe1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy90YWJXaWRnZXQvc3R5bGUvY3NzL3RhYldpZGdldFN0eWxlLmNzc1wiKTtcclxuICAgIH1cclxuICAgICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgYWN0aXZhdGUoKXtcclxuICAgICAgICBpZih0aGlzLmRhdGFNb2RlbC5nZXRGbGV4VGFicygpLmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RPdmVydmlldygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgd2lkZ2V0ID0gdGhpcy5kYXRhTW9kZWwuZ2V0QWN0aXZlVGFiKCkud2lkZ2V0O1xyXG4gICAgICAgIGlmKHdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB3aWRnZXQuYWN0aXZhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVhY3RpdmF0ZSgpe1xyXG4gICAgICAgIGxldCB0YWJzID0gdGhpcy5kYXRhTW9kZWwuZ2V0QWxsVGFicygpO1xyXG4gICAgICAgIGZvcihsZXQgZWxlbWVudCBvZiB0YWJzKXtcclxuICAgICAgICAgICAgaWYoZWxlbWVudC53aWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQud2lkZ2V0IS5kZWFjdGl2YXRlKCk7XHJcbiAgICAgICAgICAgIH0gICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJV2lkZ2V0fSB3aWRnZXRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0YWJOYW1lXHJcbiAgICAgKiBAcGFyYW0ge1ZpZXdUeXBlfSB2aWV3VHlwZVxyXG4gICAgICogQHBhcmFtIHsqfSBkYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGFkZFdpZGdldCh3aWRnZXQ6IElXaWRnZXQsIHRhYk5hbWU6IHN0cmluZywgdmlld1R5cGU6IFZpZXdUeXBlLCBkYXRhIDogYW55KXtcclxuICAgICAgICBzdXBlci5hZGRXaWRnZXQod2lkZ2V0LCB0YWJOYW1lLCB2aWV3VHlwZSk7XHJcbiAgICAgICAgbGV0IHRhYklkID0gdGFiTmFtZSArIFwiX1wiICsgdmlld1R5cGUudG9TdHJpbmcoKTtcclxuICAgICAgICB0YWJJZCA9IFVuaXF1ZUlkR2VuZXJhdG9yLmdldEluc3RhbmNlKCkuZ2V0VW5pcXVlSWRGcm9tU3RyaW5nKHRhYklkKVxyXG4gICAgICAgIHRhYklkID0gdGFiSWQucmVwbGFjZSgvWyZcXC9cXFxcIywrKCkkfiUuJ1wiOio/PD57fV0vZywnXycpO1xyXG5cclxuICAgICAgICBsZXQgaWNvblBhdGggPSBWaWV3VHlwZVByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0SWNvbkJ5Vmlld1R5cGUodmlld1R5cGUpO1xyXG4gICAgICAgIGxldCBuZXdUYWIgPSB0aGlzLmFkZE5ld1RhYihkYXRhLndpZGdldFBvc2l0aW9uLCBpY29uUGF0aCwgdGFiSWQsIHRhYk5hbWUpO1xyXG4gICAgICAgIGlmKG5ld1RhYil7XHJcbiAgICAgICAgICAgIG5ld1RhYi5hZGRXaWRnZXQod2lkZ2V0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHdpZGdldFBvc2l0aW9uXHJcbiAgICAgKiBAcGFyYW0geyp9IGljb25QYXRoXHJcbiAgICAgKiBAcGFyYW0geyp9IHRhYklkXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZE5ld1RhYih3aWRnZXRQb3NpdGlvbiwgaWNvblBhdGgsIHRhYklkLCBkaXNwbGF5TmFtZSl7XHJcbiAgICAgICAgbGV0IG5ld1RhYjogSVRhYldpZGdldFRhYiB8IHVuZGVmaW5lZDtcclxuICAgICAgICBzd2l0Y2ggKHdpZGdldFBvc2l0aW9uKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgVGFiV2lkZ2V0V2lkZ2V0UG9zaXRvbnMuZmxleCA6XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3VGFiID0gdGhpcy5hZGRGbGV4aWJsZVRhYih0YWJJZCwgaWNvblBhdGgsIGRpc3BsYXlOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgVGFiV2lkZ2V0V2lkZ2V0UG9zaXRvbnMucmlnaHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3VGFiID0gdGhpcy5hZGRGaXhlZFRhYih0YWJJZCxpY29uUGF0aCx0aGlzLl9yaWdodFRhYkNvbnRhaW5lcklkKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjYXNlIFRhYldpZGdldFdpZGdldFBvc2l0b25zLmxlZnQ6XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3VGFiID0gdGhpcy5hZGRGaXhlZFRhYih0YWJJZCxpY29uUGF0aCx0aGlzLl9sZWZ0VGFiQ29udGFpbmVySWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50c0ZvclRhYihuZXdUYWIpO1xyXG4gICAgICAgIHRoaXMuZGF0YU1vZGVsLmFkZFRhYihuZXdUYWIhKTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gbmV3VGFiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJVGFiV2lkZ2V0VGFifSB0YWJcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWdpc3RlckV2ZW50c0ZvclRhYih0YWI6IElUYWJXaWRnZXRUYWJ8dW5kZWZpbmVkKXtcclxuICAgICAgICBpZih0YWIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGFiLmV2ZW50VGFiV2lkZ2V0VGFiQ2xpY2tlZC5hdHRhY2godGhpcy5fdGFiQ2xpY2tlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0YWIuZXZlbnRUYWJXaWRnZXRUYWJXaGVlbENsaWNrZWQuYXR0YWNoKHRoaXMuX3RhYldoZWVsQ2xpY2tlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0YWIuZXZlbnRUYWJXaWRnZXRBY3RpdmVIaWRkZW4uYXR0YWNoKHRoaXMuX2FjdGl2ZVRhYkhpZGRlbkhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVucmVnaXN0ZXJFdmVudHNGb3JUYWIodGFiOiBJVGFiV2lkZ2V0VGFifHVuZGVmaW5lZCl7XHJcbiAgICAgICAgaWYodGFiICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRhYi5ldmVudFRhYldpZGdldFRhYkNsaWNrZWQuZGV0YWNoKHRoaXMuX3RhYkNsaWNrZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGFiLmV2ZW50VGFiV2lkZ2V0VGFiV2hlZWxDbGlja2VkLmRldGFjaCh0aGlzLl90YWJXaGVlbENsaWNrZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGFiLmV2ZW50VGFiV2lkZ2V0QWN0aXZlSGlkZGVuLmRldGFjaCh0aGlzLl9hY3RpdmVUYWJIaWRkZW5IYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHRhYklEXHJcbiAgICAgKiBAcGFyYW0geyp9IGljb25QYXRoXHJcbiAgICAgKiBAcmV0dXJucyB7SVRhYldpZGdldFRhYn1cclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRGbGV4aWJsZVRhYih0YWJJRCxpY29uUGF0aCwgZGlzcGxheU5hbWUpIDogSVRhYldpZGdldFRhYntcclxuICAgICAgICBsZXQgbmV3VGFiOiBJVGFiV2lkZ2V0VGFiID0gbmV3IFRhYldpZGdldEZsZXhUYWIoKTtcclxuICAgICAgICBuZXdUYWIuYXBwZW5kVGFiTGF5b3V0KHRoaXMubWFpbkRpdiwgdGhpcy5fZmxleGlibGVUYWJDb250YWluZXJJZCtcIl9mbGV4Qm94XCIsIHRhYklELCBkaXNwbGF5TmFtZSk7XHJcbiAgICAgICAgbmV3VGFiLnNldEljb24oaWNvblBhdGgpO1xyXG5cclxuICAgICAgICB0aGlzLl9mbGV4RHJvcERvd24hLmFkZEl0ZW1Ub0Ryb3Bkb3duKGRpc3BsYXlOYW1lLCBuZXdUYWIudGFiQ29udGFpbmVySWQsIHRoaXMubWFpbkRpdklkLCBpY29uUGF0aCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ld1RhYjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gdGFiTmFtZVxyXG4gICAgICogQHBhcmFtIHsqfSBpY29uUGF0aFxyXG4gICAgICogQHBhcmFtIHsqfSB3aWRnZXRQb3NpdGlvblxyXG4gICAgICogQHJldHVybnMge0lUYWJXaWRnZXRUYWJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkRml4ZWRUYWIodGFiTmFtZSxpY29uUGF0aCwgd2lkZ2V0UG9zaXRpb24pIDogSVRhYldpZGdldFRhYntcclxuICAgICAgICBsZXQgbmV3VGFiOiBJVGFiV2lkZ2V0VGFiID0gbmV3IFRhYldpZGdldEZpeGVkVGFiKCk7XHJcbiAgICAgICAgbmV3VGFiLmFwcGVuZFRhYkxheW91dCh0aGlzLm1haW5EaXYsIHdpZGdldFBvc2l0aW9uLCB0YWJOYW1lLCBcIlwiKTtcclxuICAgICAgICBuZXdUYWIuc2V0SWNvbihpY29uUGF0aCk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXdUYWI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRhcHRXaWR0aE9mRmxleFRhYkJhcigpe1xyXG4gICAgICAgIHRhYldpZGdldEZsZXhUYWJBcmVhV2lkdGggPSBcImNhbGMoIDEwMCUgLSA1NHB4IClcIjtcclxuICAgICAgICB0YWJXaWRnZXRSaWdodFRhYkFyZWFXaWR0aCA9IFwiY2FsYyggMHB4ICsgNTFweCApXCI7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IS5zdHlsZS5zZXRQcm9wZXJ0eSgnLS10YWJXaWRnZXRGbGV4VGFiQXJlYVdpZHRoJywgdGFiV2lkZ2V0RmxleFRhYkFyZWFXaWR0aCk7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IS5zdHlsZS5zZXRQcm9wZXJ0eSgnLS10YWJXaWRnZXRSaWdodFRhYkFyZWFXaWR0aCcsIHRhYldpZGdldFJpZ2h0VGFiQXJlYVdpZHRoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVRhYldpZGdldFRhYn0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnRBcmdzXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkFjdGl2ZVRhYkhpZGRlbihzZW5kZXI6IElUYWJXaWRnZXRUYWIsIGV2ZW50QXJnczogb2JqZWN0KTogYW55IHtcclxuICAgICAgICBpZihldmVudEFyZ3NbXCJldmVudFRyaWdnZXJcIl0gPT0gXCJyZXNpemVcIil7XHJcbiAgICAgICAgICAgIGxldCBuZXdJbmRleCA9IHRoaXMuZGF0YU1vZGVsLmdldEZsZXhUYWJJbmRleChzZW5kZXIpLTE7XHJcbiAgICAgICAgICAgIGlmKG5ld0luZGV4ID49IDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhTW9kZWwuc2V0RmxleFRhYlBvc2l0aW9uKG5ld0luZGV4LCBzZW5kZXIpO1xyXG4gICAgICAgICAgICAgICAgc2VuZGVyLmlzVmlzaWJsZShldmVudEFyZ3NbXCJldmVudFRyaWdnZXJcIl0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YU1vZGVsLnNldEZsZXhUYWJQb3NpdGlvbigwLHNlbmRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25UYWJDbGlja2VkKGFyZ3Mpe1xyXG4gICAgICAgIHRoaXMuc2VsZWN0VGFiKGFyZ3MudGFiTmFtZSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uVGFiV2hlZWxDbGlja2VkKGFyZ3Mpe1xyXG4gICAgICAgIHRoaXMuY2xvc2VUYWIoYXJncywgdHJ1ZSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSB0YWJOYW1lXHJcbiAgICAgKiBAcmV0dXJucyB7SVRhYldpZGdldFRhYn1cclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgc2VsZWN0VGFiKHRhYk5hbWUpIDogSVRhYldpZGdldFRhYnx1bmRlZmluZWR7XHJcbiAgICAgICAgbGV0IHRhYklkID0gXCJ0YWJfXCIrdGFiTmFtZTtcclxuICAgICAgICBsZXQgc2VsZWN0ZWRUYWIgPSB0aGlzLmRhdGFNb2RlbC5nZXRUYWJCeUlkKHRhYklkKTtcclxuICAgICAgICBpZiAoc2VsZWN0ZWRUYWIgIT0gdW5kZWZpbmVkICYmICFzZWxlY3RlZFRhYi5pc0FjdGl2ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZsZXhEcm9wRG93biEuc2V0VGFiU2VsZWN0ZWQodGFiSWQpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRhYkFjdGl2ZShzZWxlY3RlZFRhYik7XHJcbiAgICAgICAgICAgIHRoaXMucmVzaXplVGFiKHNlbGVjdGVkVGFiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihzZWxlY3RlZFRhYiA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwic2VsZWN0ZWQgVGFiIGlzIG5vdCBkZWZpbmVkXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZWxlY3RlZFRhYjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVRhYldpZGdldFRhYn0gc2VsZWN0ZWRUYWJcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRUYWJBY3RpdmUoc2VsZWN0ZWRUYWI6IElUYWJXaWRnZXRUYWIpe1xyXG4gICAgICAgIHRoaXMuc2V0QWxsVGFic0luYWN0aXZlKCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuZGF0YU1vZGVsLmdldEFjdGl2ZVRhYigpLndpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFNb2RlbC5nZXRBY3RpdmVUYWIoKS53aWRnZXQhLmRlYWN0aXZhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZWN0ZWRUYWIuc2V0QWN0aXZlKCk7XHJcbiAgICAgICAgaWYoc2VsZWN0ZWRUYWIud2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzZWxlY3RlZFRhYi53aWRnZXQuYWN0aXZhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kYXRhTW9kZWwuc2V0QWN0aXZlVGFiKHNlbGVjdGVkVGFiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVRhYldpZGdldFRhYn0gc2VsZWN0ZWRUYWJcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZXNpemVUYWIoc2VsZWN0ZWRUYWI6IElUYWJXaWRnZXRUYWIpe1xyXG4gICAgICAgIGlmKHNlbGVjdGVkVGFiLndpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBzZWxlY3RlZFRhYi53aWRnZXQhLnJlc2l6ZSh0aGlzLl9hY3R1YWxXaWR0aCwgdGhpcy5fYWN0dWFsSGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHNldEFsbFRhYnNJbmFjdGl2ZSgpe1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmRhdGFNb2RlbC5nZXRBbGxUYWJzKCkubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YU1vZGVsLmdldEFsbFRhYnMoKVtpXS5zZXREaXNwbGF5Tm9uZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFNb2RlbC5nZXRBbGxUYWJzKClbaV0ucmVtb3ZlU3R5bGVDbGFzc0FjdGl2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkFic29sdXRlVGFiU2VsZWN0ZWQoKXtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5kYXRhTW9kZWwuZ2V0QWxsVGFicygpLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFNb2RlbC5nZXRBbGxUYWJzKClbaV0ucmVtb3ZlU3R5bGVDbGFzc0FjdGl2ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJpZ2h0SGFuZFNpZGVCYXJCdXR0b25zID0gJChcIi5yaWdodEhhbmRTaWRlQmFyQnV0dG9uXCIpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCByaWdodEhhbmRTaWRlQmFyQnV0dG9ucy5sZW5ndGggOyBpKyspe1xyXG4gICAgICAgICAgICByaWdodEhhbmRTaWRlQmFyQnV0dG9uc1tpXS5jbGFzc05hbWUgPSByaWdodEhhbmRTaWRlQmFyQnV0dG9uc1tpXS5jbGFzc05hbWUucmVwbGFjZShcIiBhY3RpdmVcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIHJpZ2h0SGFuZFNpZGVCYXJCdXR0b25zW2ldLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKVswXS5zcmMgPSByaWdodEhhbmRTaWRlQmFyQnV0dG9uc1tpXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJylbMF0uc3JjLnJlcGxhY2UoJ19hY3RpdmUuc3ZnJywgJy5zdmcnKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYWJzb2x1dGVUYWJzID0gJChcIi5hYnNvbHV0ZVRhYlwiKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcmlnaHRIYW5kU2lkZUJhckJ1dHRvbnMubGVuZ3RoIDsgaSsrKXtcclxuICAgICAgICAgICAgYWJzb2x1dGVUYWJzW2ldLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXtcclxuXHJcbiAgICAgICAgdGhpcy5fYWN0dWFsV2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLl9hY3R1YWxIZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgICAgIC8vIFNldCBzaXplIG9mIHRhYiBjb250cm9sIGl0c2VsZlxyXG4gICAgICAgIHRoaXMubWFpbkRpdi5zdHlsZS53aWR0aCA9IHdpZHRoICsgXCJweFwiO1xyXG4gICAgICAgIHRoaXMubWFpbkRpdi5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyBcInB4XCI7XHJcbiAgICBcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhTW9kZWwuZ2V0QWN0aXZlVGFiKCkuaXNWaXNpYmxlKFwicmVzaXplXCIpXHJcbiAgICAgICAgaWYodGhpcy5kYXRhTW9kZWwuZ2V0QWN0aXZlVGFiKCkud2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YU1vZGVsLmdldEFjdGl2ZVRhYigpLndpZGdldCEucmVzaXplKHdpZHRoLGhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZWxlY3RPdmVydmlldygpe1xyXG4gICAgICAgIGxldCBmaXhlZFRhYnMgPSB0aGlzLmRhdGFNb2RlbC5kYXRhLmZpeGVkVGFicztcclxuICAgICAgICBsZXQgb3ZlcnZpZXdJZCA9IGZpeGVkVGFic1tmaXhlZFRhYnMubGVuZ3RoLTFdLnRhYkNvbnRhaW5lcklkO1xyXG4gICAgICAgIG92ZXJ2aWV3SWQgPSBvdmVydmlld0lkLnJlcGxhY2UoXCJ0YWJfXCIsXCJcIik7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RUYWIob3ZlcnZpZXdJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lUYWJXaWRnZXRUYWJ9IHRhYlRvUmVtb3ZlXHJcbiAgICAgKiBAcGFyYW0geyp9IG1vdXNlV2hlZWxDbGlja2VkXHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVtb3ZlVGFiKHRhYlRvUmVtb3ZlOiBJVGFiV2lkZ2V0VGFiLCBtb3VzZVdoZWVsQ2xpY2tlZCl7XHJcbiAgICAgICAgaWYodGFiVG9SZW1vdmUgPT0gdGhpcy5kYXRhTW9kZWwuZ2V0QWN0aXZlVGFiKCkpe1xyXG4gICAgICAgICAgICBsZXQgZmxleFRhYkluZGV4ID0gdGhpcy5kYXRhTW9kZWwuZ2V0RmxleFRhYkluZGV4KHRhYlRvUmVtb3ZlKTtcclxuICAgICAgICAgICAgaWYoKHRoaXMuZGF0YU1vZGVsLmdldEZsZXhUYWJzKClbZmxleFRhYkluZGV4IC0gMV0pICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFRhYih0aGlzLmRhdGFNb2RlbC5nZXRGbGV4VGFicygpW2ZsZXhUYWJJbmRleCAtIDFdLnRhYk5hbWUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZigodGhpcy5kYXRhTW9kZWwuZ2V0RmxleFRhYnMoKVtmbGV4VGFiSW5kZXggKyAxXSkgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFiKHRoaXMuZGF0YU1vZGVsLmdldEZsZXhUYWJzKClbZmxleFRhYkluZGV4ICsgMV0udGFiTmFtZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RPdmVydmlldygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuZGF0YU1vZGVsLmRhdGEuZmxleFRhYnMuaW5kZXhPZih0YWJUb1JlbW92ZSwgMCk7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhTW9kZWwuZGF0YS5mbGV4VGFicy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9mbGV4RHJvcERvd24hLnJlbW92ZUl0ZW1Gcm9tRHJvcGRvd24odGFiVG9SZW1vdmUudGFiQ29udGFpbmVySWQhLCBtb3VzZVdoZWVsQ2xpY2tlZCk7XHJcblxyXG4gICAgICAgIGxldCB0YWJDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YWJUb1JlbW92ZS50YWJDb250YWluZXJJZCEpO1xyXG4gICAgICAgIGxldCB0YWJDb250YWluZXJ0YWIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YWJUb1JlbW92ZS50YWJDb250YWluZXJJZCtcIl90YWJcIik7XHJcblxyXG4gICAgICAgIHRhYkNvbnRhaW5lcnRhYiEucGFyZW50Tm9kZSEucmVtb3ZlQ2hpbGQodGFiQ29udGFpbmVydGFiISk7XHJcbiAgICAgICAgdGFiQ29udGFpbmVyIS5wYXJlbnROb2RlIS5yZW1vdmVDaGlsZCh0YWJDb250YWluZXIhKTtcclxuICAgICAgICB0aGlzLnVucmVnaXN0ZXJFdmVudHNGb3JUYWIodGFiVG9SZW1vdmUpO1xyXG4gICAgICAgIHN1cGVyLnJlbW92ZVdpZGdldCh0YWJUb1JlbW92ZS53aWRnZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAcGFyYW0geyp9IG1vdXNlV2hlZWxDbGlja2VkXHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2xvc2VUYWIoYXJncywgbW91c2VXaGVlbENsaWNrZWQpe1xyXG4gICAgICAgIGxldCB0YWJUb0Nsb3NlID0gdGhpcy5kYXRhTW9kZWwuZ2V0VGFiQnlJZChhcmdzLnRhYk5hbWUpOyAgIFxyXG4gICAgICAgIGlmKHRhYlRvQ2xvc2UgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy90YWJUb0Nsb3NlLndpZGdldC5zYXZlQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgaWYodGFiVG9DbG9zZS53aWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHRhYlRvQ2xvc2Uud2lkZ2V0LmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVRhYih0YWJUb0Nsb3NlLCBtb3VzZVdoZWVsQ2xpY2tlZCk7XHJcbiAgICAgICAgfSAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2xvc2VBbGxUYWJzKGFyZ3Mpe1xyXG4gICAgICAgIGxldCB0YWJzVG9DbG9zZSA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5kYXRhTW9kZWwuZ2V0RmxleFRhYnMoKS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIHRhYnNUb0Nsb3NlLnB1c2godGhpcy5kYXRhTW9kZWwuZ2V0RmxleFRhYnMoKVtpXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGFic1RvQ2xvc2UubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICB0YWJzVG9DbG9zZVtpXS53aWRnZXQuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVRhYih0YWJzVG9DbG9zZVtpXSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNsb3NlQWxsVGFic0J1dEFjdGl2ZShhcmdzKXtcclxuICAgICAgICBsZXQgdGFic1RvQ2xvc2UgPSBuZXcgQXJyYXkoKTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZGF0YU1vZGVsLmdldEZsZXhUYWJzKCkubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZih0aGlzLmRhdGFNb2RlbC5nZXRGbGV4VGFicygpW2ldICE9IHRoaXMuZGF0YU1vZGVsLmdldEFjdGl2ZVRhYigpKXtcclxuICAgICAgICAgICAgICAgIHRhYnNUb0Nsb3NlLnB1c2godGhpcy5kYXRhTW9kZWwuZ2V0RmxleFRhYnMoKVtpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRhYnNUb0Nsb3NlLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgdGFic1RvQ2xvc2VbaV0ud2lkZ2V0LmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVUYWIodGFic1RvQ2xvc2VbaV0sIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IHtUYWJXaWRnZXR9OyJdfQ==