define(["require", "exports", "../../common/directoryProvider", "./toolbarButton", "./domHelper", "./themeProvider", "./customToolbarButton"], function (require, exports, directoryProvider_1, toolbarButton_1, domHelper_1, themeProvider_1, customToolbarButton_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ToolbarButtonAlignment;
    (function (ToolbarButtonAlignment) {
        ToolbarButtonAlignment[ToolbarButtonAlignment["Left"] = 0] = "Left";
        ToolbarButtonAlignment[ToolbarButtonAlignment["Right"] = 1] = "Right";
    })(ToolbarButtonAlignment || (ToolbarButtonAlignment = {}));
    exports.ToolbarButtonAlignment = ToolbarButtonAlignment;
    var TreeGridToolbarBase = /** @class */ (function () {
        /**
         * Creates an instance of TreeGridToolbarBase.
         * @param {HTMLDivElement} widgetMainDiv
         * @memberof TreeGridToolbarBase
         */
        function TreeGridToolbarBase(widgetMainDiv) {
            this._collapseButtonId = "collapse";
            this._expandButtonId = "expand";
            this._collapseButtonToolTip = "Collapse all childs";
            this._expandButtonToolTip = "Expand all childs";
            this._imageDirectory = "../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "common/style/images/tree/toolbar/";
            this._collapseLevel = 0;
            this._widgetMainDiv = widgetMainDiv;
            this._toolbarButtons = new Array();
        }
        /**
         * Adds a new toolbar button to the toolbar buttons list
         *
         * @param {string} id must be without spaces
         * @param {string} tooltip
         * @param {string} icon
         * @param {string} [align="left"]
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.addToolbarButton = function (id, tooltip, icon, align) {
            if (align === void 0) { align = ToolbarButtonAlignment.Left; }
            // add toolbar button needed to show a toolbar
            this._toolbarButtons.push(new toolbarButton_1.ToolbarButton(id, tooltip, icon, align));
        };
        TreeGridToolbarBase.prototype.setCollapseLevel = function (level) {
            this._collapseLevel = level;
        };
        TreeGridToolbarBase.prototype.addCollapseButton = function () {
            // add toolbar button for collapse
            this._toolbarButtons.push(new toolbarButton_1.ToolbarButton(this._collapseButtonId, this._collapseButtonToolTip, this._imageDirectory + "collapse.svg", ToolbarButtonAlignment.Left));
        };
        TreeGridToolbarBase.prototype.addExpandButton = function () {
            // add toolbar button for expand
            this._toolbarButtons.push(new toolbarButton_1.ToolbarButton(this._expandButtonId, this._expandButtonToolTip, this._imageDirectory + "expand.svg", ToolbarButtonAlignment.Left));
        };
        TreeGridToolbarBase.prototype.hideCollapseButton = function (hide) {
            // hide collapse toolbar button
            this.hideButton(this._collapseButtonId, hide);
        };
        TreeGridToolbarBase.prototype.hideExpandButton = function (hide) {
            // hide expand toolbar button
            this.hideButton(this._expandButtonId, hide);
        };
        TreeGridToolbarBase.prototype.toolbarClick = function (args, widget) { };
        TreeGridToolbarBase.prototype.toolbarClickBase = function (args) {
            var clickedToolbarId = this.getClickedToolbarId(args.itemName, args.model.toolbarSettings);
            if (clickedToolbarId == this._collapseButtonId) {
                if (this._collapseLevel == 0) {
                    this.getTreeGridObject().collapseAll();
                }
                else {
                    this.getTreeGridObject().collapseAtLevel(this._collapseLevel);
                }
            }
            else if (clickedToolbarId == this._expandButtonId) {
                this.getTreeGridObject().expandAll();
            }
        };
        /**
         * Returns true if Expand or Collapse button is selected
         *
         * @param {*} args
         * @returns {boolean}
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.isExpandCollapseSelected = function (args) {
            var clickedToolbarId = this.getClickedToolbarId(args.itemName, args.model.toolbarSettings);
            if (clickedToolbarId === this._collapseButtonId || clickedToolbarId === this._expandButtonId) {
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * Returns the toolbar definition for the tree grid
         *
         * @returns {CustomToolbarButton[]}
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.getCustomToolbars = function () {
            var toolbars = [];
            this._toolbarButtons.forEach(function (button) {
                toolbars.push(new customToolbarButton_1.CustomToolbarButton(button.id, button.tooltip));
            });
            return toolbars;
        };
        /**
         * Disables the button (e.g. show the "..._deactivated.svg icon instead of "....svg")
         *
         * @param {string} buttonId
         * @param {boolean} disable
         * @param {boolean} [isIcon]
         * @returns
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.disableButton = function (buttonId, disable, isIcon) {
            var button = this.getToolbarButton(buttonId);
            if (button == undefined) {
                console.error("Button id not found! id: " + buttonId);
                return;
            }
            button.disabled = disable;
            var element = this.getElementByToolbarButtonElementId(button.id);
            if (element == undefined) {
                return;
            }
            var icon = button.icon;
            if (disable == true) {
                if (!isIcon) {
                    icon = this.getDeactivatedIcon(button.icon);
                }
                element.classList.remove("toolbarButton");
                element.classList.add("toolbarButtonDeactivated");
            }
            else {
                element.classList.remove("toolbarButtonDeactivated");
                element.classList.add("toolbarButton");
            }
            domHelper_1.DomHelper.disableElement(element, disable);
            if (!isIcon) {
                element.style.backgroundImage = "url(" + this.getImagePath(icon) + ")";
            }
        };
        /**
         * Updates image of icon
         *
         * @param {string} buttonId
         * @param {string} icon
         * @returns
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.updateButtonIcon = function (buttonId, icon) {
            var button = this.getToolbarButton(buttonId);
            if (button == undefined) {
                console.error("Button id not found! id: " + buttonId);
                return;
            }
            var element = this.getElementByToolbarButtonElementId(button.id);
            if (element == undefined) {
                return;
            }
            element.innerHTML = icon;
            element.style.height = "20px";
            element.style.width = "24px";
            element.style.backgroundImage = "";
        };
        /**
         * Hides(Shows) the button with the given id
         *
         * @param {string} buttonId
         * @param {boolean} hide
         * @returns
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.hideButton = function (buttonId, hide) {
            var button = this.getToolbarButton(buttonId);
            if (button == undefined) {
                console.error("Button id not found! id: " + buttonId);
                return;
            }
            var element = this.getElementByToolbarButtonElementId(button.id);
            if (element != undefined) {
                if (hide == true) {
                    element.style.display = "none";
                }
                else {
                    element.style.display = "";
                }
            }
        };
        /**
         * Shows the button highlighted (e.g orange background)
         *
         * @param {string} buttonId
         * @param {boolean} activate
         * @returns
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.activateButton = function (buttonId, activate) {
            var button = this.getToolbarButton(buttonId);
            if (button == undefined) {
                console.error("Button id not found! id: " + buttonId);
                return;
            }
            var element = this.getElementByToolbarButtonElementId(button.id);
            if (element != undefined) {
                if (activate == true) {
                    element.style.backgroundColor = "var(--main-orange)";
                }
                else {
                    element.style.backgroundColor = "";
                }
            }
        };
        /**
         * Returns the id of the toolbar button that was clicked. Only if the toolbar button is not deactivated!
         *
         * @param {string} toolTipText
         * @param {*} toolbarSettings
         * @returns {string}
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.getClickedToolbarId = function (toolTipText, toolbarSettings) {
            // TODO: why itemName == tooltiptext of customtoolbar and not the id!!!
            // ej.TreeGrid.ToolbarItems.Add = "add" => will be "Add" in itemName!!!
            // custom toolbar
            for (var index = 0; index < toolbarSettings.customToolbarItems.length; index++) {
                if (toolbarSettings.customToolbarItems[index].tooltipText == toolTipText) {
                    var button = this.getToolbarButton(toolbarSettings.customToolbarItems[index].text);
                    if (button != undefined && button.disabled == false) {
                        return toolbarSettings.customToolbarItems[index].text;
                    }
                    return "";
                }
            }
            return "";
        };
        /**
         * Sets the styles of all the toolbar buttons
         *
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.setStyleForToolbarIcons = function () {
            for (var i = 0; i < this._toolbarButtons.length; i++) {
                $(this._widgetMainDiv).append(this.getImageStyle(this._toolbarButtons[i].id, this._toolbarButtons[i].icon));
                // add toolbar class to element
                var element = this.getElementByToolbarButtonElementId(this._toolbarButtons[i].id);
                if (element != undefined) {
                    element.classList.add("toolbarButton");
                }
            }
        };
        /**
         * Resize the toolbar to the given width
         * Sets the position of the right aligned buttons
         *
         * @param {number} width
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.resize = function (width) {
            var buttonWidth = 31; // TODO: get 31px from div/svg
            var leftButtonCount = this.getVisibleToolbarButtonOnLeftSideCount();
            var rightButtonCount = this.getVisibleToolbarButtonsOnRightSideCount();
            var buttonCount = leftButtonCount + rightButtonCount;
            if (width > (buttonCount * buttonWidth)) { // Only move buttons from right to left if there is enought space  
                // Set the position of the buttons that should be on the right side of the toolbar
                for (var i = 0; i < this._toolbarButtons.length; i++) {
                    if (this._toolbarButtons[i].align == ToolbarButtonAlignment.Right) {
                        var element = this.getElementByToolbarButtonElementId(this._toolbarButtons[i].id);
                        if (element != undefined) {
                            element.parentElement.style.width = width.toString() + "px";
                            var newPosition = width - (leftButtonCount * buttonWidth) - ((rightButtonCount) * buttonWidth);
                            element.style.left = newPosition.toString() + "px";
                        }
                    }
                }
            }
        };
        /**
         * Returns the number of the visible toolbar buttons on the right side
         *
         * @private
         * @returns {number}
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.getVisibleToolbarButtonsOnRightSideCount = function () {
            var visibleToolbarButtons = 0;
            for (var i = 0; i < this._toolbarButtons.length; i++) {
                if (this._toolbarButtons[i].align == ToolbarButtonAlignment.Right) {
                    var element = this.getElementByToolbarButtonElementId(this._toolbarButtons[i].id);
                    if (element != undefined) {
                        if (element.style.display != "none") {
                            visibleToolbarButtons++;
                        }
                    }
                }
            }
            return visibleToolbarButtons;
        };
        /**
         * Returns the number of the visible toolbar buttons on the left side
         *
         * @private
         * @returns
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.getVisibleToolbarButtonOnLeftSideCount = function () {
            var visibleToolbarButtons = 0;
            for (var i = 0; i < this._toolbarButtons.length; i++) {
                if (this._toolbarButtons[i].align == ToolbarButtonAlignment.Left) {
                    var element = this.getElementByToolbarButtonElementId(this._toolbarButtons[i].id);
                    if (element != undefined) {
                        if (element.style.display != "none") {
                            visibleToolbarButtons++;
                        }
                    }
                }
            }
            return visibleToolbarButtons;
        };
        TreeGridToolbarBase.prototype.getImageStyle = function (toolbarId, imageName) {
            var elementId = this.getElementId(toolbarId);
            return "\n            <style type=\"text/css\">\n            " + elementId + " {\n                background-image: url(" + this.getImagePath(imageName) + ");\n                background-size: 20px 20px;\n                background-repeat: no-repeat;\n                background-position: center center;\n                height: 20px;\n                width: 24px;\n            }\n            </style>";
        };
        TreeGridToolbarBase.prototype.getImagePath = function (imageName) {
            return themeProvider_1.ThemeProvider.getInstance().getThemedFilePath(imageName);
        };
        TreeGridToolbarBase.prototype.getDeactivatedIcon = function (icon) {
            return icon.replace(".svg", "_deactivated.svg");
        };
        TreeGridToolbarBase.prototype.getToolbarButton = function (id) {
            return this._toolbarButtons.filter(function (toolbarButton) { return toolbarButton.id == id; })[0];
        };
        /**
         * Returns the HTMLDivElement of the toolbar button for the given id
         *
         * @private
         * @param {string} toolbarButtonId
         * @returns {(HTMLDivElement | undefined)}
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.getElementByToolbarButtonElementId = function (toolbarButtonId) {
            var id = this.getElementId(toolbarButtonId);
            var mySubDiv = this._widgetMainDiv.querySelector(id);
            if (mySubDiv == null) {
                return undefined;
            }
            return mySubDiv;
        };
        /**
         * Returns the element id incl. "#..."
         *
         * @private
         * @param {string} toolbarId
         * @returns {string}
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.getElementId = function (toolbarId) {
            return "#" + this._widgetMainDiv.id + "_" + toolbarId;
        };
        /**
         * Returns the ej tree grid object
         *
         * @returns {ej.TreeGrid}
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.getTreeGridObject = function () {
            return $(this._widgetMainDiv).data("ejTreeGrid");
        };
        return TreeGridToolbarBase;
    }());
    exports.TreeGridToolbarBase = TreeGridToolbarBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZUdyaWRUb29sYmFyQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21tb24vdHJlZUdyaWRUb29sYmFyQmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFRQSxJQUFLLHNCQUdKO0lBSEQsV0FBSyxzQkFBc0I7UUFDdkIsbUVBQUksQ0FBQTtRQUNKLHFFQUFLLENBQUE7SUFDVCxDQUFDLEVBSEksc0JBQXNCLEtBQXRCLHNCQUFzQixRQUcxQjtJQTBaNEIsd0RBQXNCO0lBeFpuRDtRQWdCSTs7OztXQUlHO1FBQ0gsNkJBQW1CLGFBQTZCO1lBZnhDLHNCQUFpQixHQUFXLFVBQVUsQ0FBQztZQUN2QyxvQkFBZSxHQUFXLFFBQVEsQ0FBQztZQUVuQywyQkFBc0IsR0FBVyxxQkFBcUIsQ0FBQztZQUN2RCx5QkFBb0IsR0FBVyxtQkFBbUIsQ0FBQztZQUVuRCxvQkFBZSxHQUFHLFdBQVcsR0FBRyxxQ0FBaUIsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLG1DQUFtQyxDQUFDO1lBRTlHLG1CQUFjLEdBQVUsQ0FBQyxDQUFDO1lBUTlCLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxLQUFLLEVBQWlCLENBQUM7UUFDdEQsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0ksOENBQWdCLEdBQXZCLFVBQXdCLEVBQVUsRUFBRSxPQUFlLEVBQUUsSUFBWSxFQUFFLEtBQTJEO1lBQTNELHNCQUFBLEVBQUEsUUFBZ0Msc0JBQXNCLENBQUMsSUFBSTtZQUMxSCw4Q0FBOEM7WUFDOUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSw2QkFBYSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDM0UsQ0FBQztRQUVNLDhDQUFnQixHQUF2QixVQUF3QixLQUFhO1lBQ2pDLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLENBQUM7UUFFTSwrQ0FBaUIsR0FBeEI7WUFDSSxrQ0FBa0M7WUFDbEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSw2QkFBYSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLGVBQWUsR0FBRyxjQUFjLEVBQUUsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMxSyxDQUFDO1FBRU0sNkNBQWUsR0FBdEI7WUFDSSxnQ0FBZ0M7WUFDaEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSw2QkFBYSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxlQUFlLEdBQUcsWUFBWSxFQUFFLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDcEssQ0FBQztRQUVNLGdEQUFrQixHQUF6QixVQUEwQixJQUFhO1lBQ25DLCtCQUErQjtZQUMvQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRCxDQUFDO1FBRU0sOENBQWdCLEdBQXZCLFVBQXdCLElBQWE7WUFDakMsNkJBQTZCO1lBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNoRCxDQUFDO1FBRU0sMENBQVksR0FBbkIsVUFBb0IsSUFBSSxFQUFFLE1BQWUsSUFBRSxDQUFDO1FBRXJDLDhDQUFnQixHQUF2QixVQUF5QixJQUFJO1lBQ3pCLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUMzRixJQUFJLGdCQUFnQixJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtnQkFDNUMsSUFBRyxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsRUFBQztvQkFDeEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQzFDO3FCQUNHO29CQUNBLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7aUJBQ2pFO2FBQ0o7aUJBQ0ksSUFBSSxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUMvQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUN4QztRQUNMLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSSxzREFBd0IsR0FBL0IsVUFBaUMsSUFBSTtZQUNqQyxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDM0YsSUFBSSxnQkFBZ0IsS0FBSyxJQUFJLENBQUMsaUJBQWlCLElBQUksZ0JBQWdCLEtBQUssSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFDMUYsT0FBTyxJQUFJLENBQUM7YUFDZjtpQkFDSTtnQkFDRCxPQUFPLEtBQUssQ0FBQzthQUNoQjtRQUNMLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLCtDQUFpQixHQUF4QjtZQUNJLElBQUksUUFBUSxHQUEwQixFQUFFLENBQUM7WUFDekMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNO2dCQUNoQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUkseUNBQW1CLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN0RSxDQUFDLENBQUMsQ0FBQTtZQUVGLE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNJLDJDQUFhLEdBQXBCLFVBQXFCLFFBQWUsRUFBRSxPQUFnQixFQUFFLE1BQWdCO1lBQ3BFLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3QyxJQUFHLE1BQU0sSUFBSSxTQUFTLEVBQUM7Z0JBQ25CLE9BQU8sQ0FBQyxLQUFLLENBQUMsMkJBQTJCLEdBQUcsUUFBUSxDQUFDLENBQUM7Z0JBQ3RELE9BQU87YUFDVjtZQUNELE1BQU0sQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1lBRTFCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDakUsSUFBRyxPQUFPLElBQUksU0FBUyxFQUFDO2dCQUNwQixPQUFPO2FBQ1Y7WUFDRCxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ3ZCLElBQUcsT0FBTyxJQUFJLElBQUksRUFBQztnQkFDZixJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNULElBQUksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUMvQztnQkFDRCxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDMUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQzthQUNyRDtpQkFDRztnQkFDQSxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO2dCQUNyRCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUMxQztZQUNELHFCQUFTLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNULE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQzthQUMxRTtRQUNMLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ksOENBQWdCLEdBQXZCLFVBQXdCLFFBQWUsRUFBRSxJQUFZO1lBQ2pELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3QyxJQUFHLE1BQU0sSUFBSSxTQUFTLEVBQUM7Z0JBQ25CLE9BQU8sQ0FBQyxLQUFLLENBQUMsMkJBQTJCLEdBQUcsUUFBUSxDQUFDLENBQUM7Z0JBQ3RELE9BQU87YUFDVjtZQUNELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDakUsSUFBRyxPQUFPLElBQUksU0FBUyxFQUFDO2dCQUNwQixPQUFPO2FBQ1Y7WUFDRCxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN6QixPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDOUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1lBQzdCLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUN2QyxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNJLHdDQUFVLEdBQWpCLFVBQWtCLFFBQWdCLEVBQUUsSUFBYTtZQUM3QyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDN0MsSUFBRyxNQUFNLElBQUksU0FBUyxFQUFDO2dCQUNuQixPQUFPLENBQUMsS0FBSyxDQUFDLDJCQUEyQixHQUFHLFFBQVEsQ0FBQyxDQUFDO2dCQUN0RCxPQUFPO2FBQ1Y7WUFDRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsa0NBQWtDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2pFLElBQUcsT0FBTyxJQUFJLFNBQVMsRUFBQztnQkFDcEIsSUFBRyxJQUFJLElBQUksSUFBSSxFQUFDO29CQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztpQkFDbEM7cUJBQ0c7b0JBQ0EsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO2lCQUM5QjthQUNKO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSSw0Q0FBYyxHQUFyQixVQUFzQixRQUFnQixFQUFFLFFBQWlCO1lBQ3JELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3QyxJQUFHLE1BQU0sSUFBSSxTQUFTLEVBQUM7Z0JBQ25CLE9BQU8sQ0FBQyxLQUFLLENBQUMsMkJBQTJCLEdBQUcsUUFBUSxDQUFDLENBQUM7Z0JBQ3RELE9BQU87YUFDVjtZQUNELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDakUsSUFBRyxPQUFPLElBQUksU0FBUyxFQUFDO2dCQUNwQixJQUFHLFFBQVEsSUFBSSxJQUFJLEVBQUM7b0JBQ2hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLG9CQUFvQixDQUFDO2lCQUN4RDtxQkFDRztvQkFDQSxPQUFPLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7aUJBQ3RDO2FBQ0o7UUFDTCxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNJLGlEQUFtQixHQUExQixVQUEyQixXQUFtQixFQUFFLGVBQWU7WUFDM0QsdUVBQXVFO1lBQ3ZFLHVFQUF1RTtZQUV2RSxpQkFBaUI7WUFDakIsS0FBSSxJQUFJLEtBQUssR0FBRSxDQUFDLEVBQUUsS0FBSyxHQUFHLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUM7Z0JBQ3pFLElBQUcsZUFBZSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsSUFBSSxXQUFXLEVBQUM7b0JBRXBFLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ25GLElBQUcsTUFBTSxJQUFJLFNBQVMsSUFBSSxNQUFNLENBQUMsUUFBUSxJQUFJLEtBQUssRUFBQzt3QkFDL0MsT0FBTyxlQUFlLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDO3FCQUN6RDtvQkFDRCxPQUFPLEVBQUUsQ0FBQztpQkFDYjthQUNKO1lBQ0QsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNJLHFEQUF1QixHQUE5QjtZQUNJLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDOUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBRTVHLCtCQUErQjtnQkFDL0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2xGLElBQUcsT0FBTyxJQUFJLFNBQVMsRUFBQztvQkFDcEIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7aUJBQzFDO2FBQ0o7UUFDTCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksb0NBQU0sR0FBYixVQUFjLEtBQWE7WUFDdkIsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDLENBQUMsOEJBQThCO1lBQ3BELElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxzQ0FBc0MsRUFBRSxDQUFDO1lBQ3BFLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHdDQUF3QyxFQUFFLENBQUM7WUFDdkUsSUFBSSxXQUFXLEdBQUcsZUFBZSxHQUFDLGdCQUFnQixDQUFDO1lBQ25ELElBQUcsS0FBSyxHQUFHLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxFQUFDLEVBQUUsbUVBQW1FO2dCQUN4RyxrRkFBa0Y7Z0JBQ2xGLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztvQkFDOUMsSUFBRyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxzQkFBc0IsQ0FBQyxLQUFLLEVBQUM7d0JBQzdELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUNsRixJQUFHLE9BQU8sSUFBSSxTQUFTLEVBQUM7NEJBQ3BCLE9BQU8sQ0FBQyxhQUFjLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDOzRCQUU3RCxJQUFJLFdBQVcsR0FBRyxLQUFLLEdBQUcsQ0FBQyxlQUFlLEdBQUMsV0FBVyxDQUFDLEdBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEdBQUMsV0FBVyxDQUFDLENBQUM7NEJBQ3pGLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUM7eUJBQ3REO3FCQUNKO2lCQUNKO2FBQ0o7UUFDTCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssc0VBQXdDLEdBQWhEO1lBQ0ksSUFBSSxxQkFBcUIsR0FBRyxDQUFDLENBQUM7WUFDOUIsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUM1QyxJQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLHNCQUFzQixDQUFDLEtBQUssRUFBQztvQkFDN0QsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ2xGLElBQUcsT0FBTyxJQUFJLFNBQVMsRUFBQzt3QkFDcEIsSUFBRyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxNQUFNLEVBQUM7NEJBQy9CLHFCQUFxQixFQUFFLENBQUM7eUJBQzNCO3FCQUNKO2lCQUNKO2FBQ0o7WUFDRCxPQUFPLHFCQUFxQixDQUFDO1FBQ2pDLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSyxvRUFBc0MsR0FBOUM7WUFDSSxJQUFJLHFCQUFxQixHQUFDLENBQUMsQ0FBQztZQUM1QixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQzVDLElBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksc0JBQXNCLENBQUMsSUFBSSxFQUFDO29CQUM1RCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsa0NBQWtDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDbEYsSUFBRyxPQUFPLElBQUksU0FBUyxFQUFDO3dCQUNwQixJQUFHLE9BQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLE1BQU0sRUFBQzs0QkFDaEMscUJBQXFCLEVBQUUsQ0FBQzt5QkFDM0I7cUJBQ0o7aUJBQ0o7YUFDSjtZQUNELE9BQU8scUJBQXFCLENBQUM7UUFDakMsQ0FBQztRQUVPLDJDQUFhLEdBQXJCLFVBQXNCLFNBQWlCLEVBQUUsU0FBZ0I7WUFDckQsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM3QyxPQUFPLHVEQUVGLEdBQUcsU0FBUyxHQUFFLDRDQUNZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyx1UEFPcEQsQ0FBQztRQUNsQixDQUFDO1FBRU8sMENBQVksR0FBcEIsVUFBcUIsU0FBaUI7WUFDbEMsT0FBTyw2QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BFLENBQUM7UUFFTyxnREFBa0IsR0FBMUIsVUFBMkIsSUFBWTtZQUNuQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDcEQsQ0FBQztRQUVTLDhDQUFnQixHQUExQixVQUEyQixFQUFVO1lBQ2pDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsVUFBQSxhQUFhLElBQUssT0FBTyxhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVGLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ssZ0VBQWtDLEdBQTFDLFVBQTJDLGVBQXVCO1lBQzlELElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLENBQUE7WUFDM0MsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckQsSUFBRyxRQUFRLElBQUksSUFBSSxFQUFDO2dCQUNoQixPQUFPLFNBQVMsQ0FBQzthQUNwQjtZQUNELE9BQXVCLFFBQVEsQ0FBQztRQUNwQyxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNLLDBDQUFZLEdBQXBCLFVBQXFCLFNBQWlCO1lBQ2xDLE9BQU8sR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxHQUFHLEdBQUcsR0FBRyxTQUFTLENBQUM7UUFDMUQsQ0FBQztRQUVKOzs7OztXQUtNO1FBQ0gsK0NBQWlCLEdBQWpCO1lBQ0YsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBQ0wsMEJBQUM7SUFBRCxDQUFDLEFBdFpELElBc1pDO0lBRU8sa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0b3J5UHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdG9yeVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFRvb2xiYXJCdXR0b24gfSBmcm9tIFwiLi90b29sYmFyQnV0dG9uXCI7XHJcbmltcG9ydCB7IERvbUhlbHBlciB9IGZyb20gXCIuL2RvbUhlbHBlclwiO1xyXG5pbXBvcnQgeyBUaGVtZVByb3ZpZGVyIH0gZnJvbSBcIi4vdGhlbWVQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBJV2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy93aWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ3VzdG9tVG9vbGJhckJ1dHRvbiB9IGZyb20gXCIuL2N1c3RvbVRvb2xiYXJCdXR0b25cIjtcclxuXHJcblxyXG5lbnVtIFRvb2xiYXJCdXR0b25BbGlnbm1lbnR7XHJcbiAgICBMZWZ0LFxyXG4gICAgUmlnaHQsXHJcbn1cclxuXHJcbmFic3RyYWN0IGNsYXNzIFRyZWVHcmlkVG9vbGJhckJhc2V7XHJcblxyXG4gICAgcHJvdGVjdGVkIF93aWRnZXRNYWluRGl2OiBIVE1MRGl2RWxlbWVudDtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfdG9vbGJhckJ1dHRvbnM6IEFycmF5PFRvb2xiYXJCdXR0b24+O1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF9jb2xsYXBzZUJ1dHRvbklkOiBzdHJpbmcgPSBcImNvbGxhcHNlXCI7XHJcbiAgICBwcml2YXRlIF9leHBhbmRCdXR0b25JZDogc3RyaW5nID0gXCJleHBhbmRcIjtcclxuXHJcbiAgICBwcml2YXRlIF9jb2xsYXBzZUJ1dHRvblRvb2xUaXA6IHN0cmluZyA9IFwiQ29sbGFwc2UgYWxsIGNoaWxkc1wiO1xyXG4gICAgcHJpdmF0ZSBfZXhwYW5kQnV0dG9uVG9vbFRpcDogc3RyaW5nID0gXCJFeHBhbmQgYWxsIGNoaWxkc1wiO1xyXG5cclxuICAgIHByaXZhdGUgX2ltYWdlRGlyZWN0b3J5ID0gXCIuLi8uLi8uLi9cIiArIERpcmVjdG9yeVByb3ZpZGVyLmdldFdpZGdldHNEaXJlY3RvcnkoKSArIFwiY29tbW9uL3N0eWxlL2ltYWdlcy90cmVlL3Rvb2xiYXIvXCI7XHJcblxyXG4gICAgcHJpdmF0ZSBfY29sbGFwc2VMZXZlbDpudW1iZXIgPSAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBUcmVlR3JpZFRvb2xiYXJCYXNlLlxyXG4gICAgICogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gd2lkZ2V0TWFpbkRpdlxyXG4gICAgICogQG1lbWJlcm9mIFRyZWVHcmlkVG9vbGJhckJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHdpZGdldE1haW5EaXY6IEhUTUxEaXZFbGVtZW50KXtcclxuICAgICAgICB0aGlzLl93aWRnZXRNYWluRGl2ID0gd2lkZ2V0TWFpbkRpdjtcclxuICAgICAgICB0aGlzLl90b29sYmFyQnV0dG9ucyA9IG5ldyBBcnJheTxUb29sYmFyQnV0dG9uPigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIG5ldyB0b29sYmFyIGJ1dHRvbiB0byB0aGUgdG9vbGJhciBidXR0b25zIGxpc3RcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgbXVzdCBiZSB3aXRob3V0IHNwYWNlc1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRvb2x0aXBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpY29uXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2FsaWduPVwibGVmdFwiXVxyXG4gICAgICogQG1lbWJlcm9mIFRyZWVHcmlkVG9vbGJhckJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZFRvb2xiYXJCdXR0b24oaWQ6IHN0cmluZywgdG9vbHRpcDogc3RyaW5nLCBpY29uOiBzdHJpbmcsIGFsaWduOiBUb29sYmFyQnV0dG9uQWxpZ25tZW50ID0gVG9vbGJhckJ1dHRvbkFsaWdubWVudC5MZWZ0KXtcclxuICAgICAgICAvLyBhZGQgdG9vbGJhciBidXR0b24gbmVlZGVkIHRvIHNob3cgYSB0b29sYmFyXHJcbiAgICAgICAgdGhpcy5fdG9vbGJhckJ1dHRvbnMucHVzaChuZXcgVG9vbGJhckJ1dHRvbihpZCwgdG9vbHRpcCwgaWNvbiwgYWxpZ24pKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIHNldENvbGxhcHNlTGV2ZWwobGV2ZWw6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5fY29sbGFwc2VMZXZlbCA9IGxldmVsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRDb2xsYXBzZUJ1dHRvbigpe1xyXG4gICAgICAgIC8vIGFkZCB0b29sYmFyIGJ1dHRvbiBmb3IgY29sbGFwc2VcclxuICAgICAgICB0aGlzLl90b29sYmFyQnV0dG9ucy5wdXNoKG5ldyBUb29sYmFyQnV0dG9uKHRoaXMuX2NvbGxhcHNlQnV0dG9uSWQsIHRoaXMuX2NvbGxhcHNlQnV0dG9uVG9vbFRpcCwgdGhpcy5faW1hZ2VEaXJlY3RvcnkgKyBcImNvbGxhcHNlLnN2Z1wiLCBUb29sYmFyQnV0dG9uQWxpZ25tZW50LkxlZnQpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkRXhwYW5kQnV0dG9uKCl7XHJcbiAgICAgICAgLy8gYWRkIHRvb2xiYXIgYnV0dG9uIGZvciBleHBhbmRcclxuICAgICAgICB0aGlzLl90b29sYmFyQnV0dG9ucy5wdXNoKG5ldyBUb29sYmFyQnV0dG9uKHRoaXMuX2V4cGFuZEJ1dHRvbklkLCB0aGlzLl9leHBhbmRCdXR0b25Ub29sVGlwLCB0aGlzLl9pbWFnZURpcmVjdG9yeSArIFwiZXhwYW5kLnN2Z1wiLCBUb29sYmFyQnV0dG9uQWxpZ25tZW50LkxlZnQpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZUNvbGxhcHNlQnV0dG9uKGhpZGU6IGJvb2xlYW4pe1xyXG4gICAgICAgIC8vIGhpZGUgY29sbGFwc2UgdG9vbGJhciBidXR0b25cclxuICAgICAgICB0aGlzLmhpZGVCdXR0b24odGhpcy5fY29sbGFwc2VCdXR0b25JZCwgaGlkZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpZGVFeHBhbmRCdXR0b24oaGlkZTogYm9vbGVhbil7XHJcbiAgICAgICAgLy8gaGlkZSBleHBhbmQgdG9vbGJhciBidXR0b25cclxuICAgICAgICB0aGlzLmhpZGVCdXR0b24odGhpcy5fZXhwYW5kQnV0dG9uSWQsIGhpZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b29sYmFyQ2xpY2soYXJncywgd2lkZ2V0OiBJV2lkZ2V0KXt9XHJcblxyXG4gICAgcHVibGljIHRvb2xiYXJDbGlja0Jhc2UgKGFyZ3Mpe1xyXG4gICAgICAgIHZhciBjbGlja2VkVG9vbGJhcklkID0gdGhpcy5nZXRDbGlja2VkVG9vbGJhcklkKGFyZ3MuaXRlbU5hbWUsIGFyZ3MubW9kZWwudG9vbGJhclNldHRpbmdzKTtcclxuICAgICAgICBpZiAoY2xpY2tlZFRvb2xiYXJJZCA9PSB0aGlzLl9jb2xsYXBzZUJ1dHRvbklkKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2NvbGxhcHNlTGV2ZWwgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCkuY29sbGFwc2VBbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpLmNvbGxhcHNlQXRMZXZlbCh0aGlzLl9jb2xsYXBzZUxldmVsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjbGlja2VkVG9vbGJhcklkID09IHRoaXMuX2V4cGFuZEJ1dHRvbklkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKS5leHBhbmRBbGwoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgRXhwYW5kIG9yIENvbGxhcHNlIGJ1dHRvbiBpcyBzZWxlY3RlZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJlZUdyaWRUb29sYmFyQmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNFeHBhbmRDb2xsYXBzZVNlbGVjdGVkIChhcmdzKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdmFyIGNsaWNrZWRUb29sYmFySWQgPSB0aGlzLmdldENsaWNrZWRUb29sYmFySWQoYXJncy5pdGVtTmFtZSwgYXJncy5tb2RlbC50b29sYmFyU2V0dGluZ3MpO1xyXG4gICAgICAgIGlmIChjbGlja2VkVG9vbGJhcklkID09PSB0aGlzLl9jb2xsYXBzZUJ1dHRvbklkIHx8IGNsaWNrZWRUb29sYmFySWQgPT09IHRoaXMuX2V4cGFuZEJ1dHRvbklkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0b29sYmFyIGRlZmluaXRpb24gZm9yIHRoZSB0cmVlIGdyaWRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Q3VzdG9tVG9vbGJhckJ1dHRvbltdfVxyXG4gICAgICogQG1lbWJlcm9mIFRyZWVHcmlkVG9vbGJhckJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEN1c3RvbVRvb2xiYXJzICgpOkN1c3RvbVRvb2xiYXJCdXR0b25bXXtcclxuICAgICAgICBsZXQgdG9vbGJhcnM6IEN1c3RvbVRvb2xiYXJCdXR0b25bXSA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXJCdXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xyXG4gICAgICAgICAgICB0b29sYmFycy5wdXNoKG5ldyBDdXN0b21Ub29sYmFyQnV0dG9uKGJ1dHRvbi5pZCwgYnV0dG9uLnRvb2x0aXApKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICByZXR1cm4gdG9vbGJhcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNhYmxlcyB0aGUgYnV0dG9uIChlLmcuIHNob3cgdGhlIFwiLi4uX2RlYWN0aXZhdGVkLnN2ZyBpY29uIGluc3RlYWQgb2YgXCIuLi4uc3ZnXCIpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJ1dHRvbklkXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGRpc2FibGVcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzSWNvbl1cclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJlZUdyaWRUb29sYmFyQmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGlzYWJsZUJ1dHRvbihidXR0b25JZDpzdHJpbmcsIGRpc2FibGU6IGJvb2xlYW4sIGlzSWNvbj86IGJvb2xlYW4pe1xyXG4gICAgICAgIGxldCBidXR0b24gPSB0aGlzLmdldFRvb2xiYXJCdXR0b24oYnV0dG9uSWQpO1xyXG4gICAgICAgIGlmKGJ1dHRvbiA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQnV0dG9uIGlkIG5vdCBmb3VuZCEgaWQ6IFwiICsgYnV0dG9uSWQpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJ1dHRvbi5kaXNhYmxlZCA9IGRpc2FibGU7XHJcblxyXG4gICAgICAgIGxldCBlbGVtZW50ID0gdGhpcy5nZXRFbGVtZW50QnlUb29sYmFyQnV0dG9uRWxlbWVudElkKGJ1dHRvbi5pZCk7XHJcbiAgICAgICAgaWYoZWxlbWVudCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpY29uID0gYnV0dG9uLmljb247XHJcbiAgICAgICAgaWYoZGlzYWJsZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgaWYgKCFpc0ljb24pIHtcclxuICAgICAgICAgICAgICAgIGljb24gPSB0aGlzLmdldERlYWN0aXZhdGVkSWNvbihidXR0b24uaWNvbik7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInRvb2xiYXJCdXR0b25cIik7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInRvb2xiYXJCdXR0b25EZWFjdGl2YXRlZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwidG9vbGJhckJ1dHRvbkRlYWN0aXZhdGVkXCIpO1xyXG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ0b29sYmFyQnV0dG9uXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBEb21IZWxwZXIuZGlzYWJsZUVsZW1lbnQoZWxlbWVudCwgZGlzYWJsZSk7XHJcbiAgICAgICAgaWYgKCFpc0ljb24pIHtcclxuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybChcIiArIHRoaXMuZ2V0SW1hZ2VQYXRoKGljb24pICsgXCIpXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyBpbWFnZSBvZiBpY29uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJ1dHRvbklkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWNvblxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBUcmVlR3JpZFRvb2xiYXJCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGRhdGVCdXR0b25JY29uKGJ1dHRvbklkOnN0cmluZywgaWNvbjogc3RyaW5nKXtcclxuICAgICAgICBsZXQgYnV0dG9uID0gdGhpcy5nZXRUb29sYmFyQnV0dG9uKGJ1dHRvbklkKTtcclxuICAgICAgICBpZihidXR0b24gPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkJ1dHRvbiBpZCBub3QgZm91bmQhIGlkOiBcIiArIGJ1dHRvbklkKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXMuZ2V0RWxlbWVudEJ5VG9vbGJhckJ1dHRvbkVsZW1lbnRJZChidXR0b24uaWQpO1xyXG4gICAgICAgIGlmKGVsZW1lbnQgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IGljb247XHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBcIjIwcHhcIjtcclxuICAgICAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gXCIyNHB4XCI7XHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGlkZXMoU2hvd3MpIHRoZSBidXR0b24gd2l0aCB0aGUgZ2l2ZW4gaWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYnV0dG9uSWRcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaGlkZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBUcmVlR3JpZFRvb2xiYXJCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoaWRlQnV0dG9uKGJ1dHRvbklkOiBzdHJpbmcsIGhpZGU6IGJvb2xlYW4pe1xyXG4gICAgICAgIGxldCBidXR0b24gPSB0aGlzLmdldFRvb2xiYXJCdXR0b24oYnV0dG9uSWQpO1xyXG4gICAgICAgIGlmKGJ1dHRvbiA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQnV0dG9uIGlkIG5vdCBmb3VuZCEgaWQ6IFwiICsgYnV0dG9uSWQpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBlbGVtZW50ID0gdGhpcy5nZXRFbGVtZW50QnlUb29sYmFyQnV0dG9uRWxlbWVudElkKGJ1dHRvbi5pZCk7XHJcbiAgICAgICAgaWYoZWxlbWVudCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZihoaWRlID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTaG93cyB0aGUgYnV0dG9uIGhpZ2hsaWdodGVkIChlLmcgb3JhbmdlIGJhY2tncm91bmQpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJ1dHRvbklkXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGFjdGl2YXRlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFRyZWVHcmlkVG9vbGJhckJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFjdGl2YXRlQnV0dG9uKGJ1dHRvbklkOiBzdHJpbmcsIGFjdGl2YXRlOiBib29sZWFuKXtcclxuICAgICAgICBsZXQgYnV0dG9uID0gdGhpcy5nZXRUb29sYmFyQnV0dG9uKGJ1dHRvbklkKTtcclxuICAgICAgICBpZihidXR0b24gPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkJ1dHRvbiBpZCBub3QgZm91bmQhIGlkOiBcIiArIGJ1dHRvbklkKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXMuZ2V0RWxlbWVudEJ5VG9vbGJhckJ1dHRvbkVsZW1lbnRJZChidXR0b24uaWQpO1xyXG4gICAgICAgIGlmKGVsZW1lbnQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYoYWN0aXZhdGUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tbWFpbi1vcmFuZ2UpXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGlkIG9mIHRoZSB0b29sYmFyIGJ1dHRvbiB0aGF0IHdhcyBjbGlja2VkLiBPbmx5IGlmIHRoZSB0b29sYmFyIGJ1dHRvbiBpcyBub3QgZGVhY3RpdmF0ZWQhXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRvb2xUaXBUZXh0XHJcbiAgICAgKiBAcGFyYW0geyp9IHRvb2xiYXJTZXR0aW5nc1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBUcmVlR3JpZFRvb2xiYXJCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRDbGlja2VkVG9vbGJhcklkKHRvb2xUaXBUZXh0OiBzdHJpbmcsIHRvb2xiYXJTZXR0aW5ncyk6c3RyaW5ne1xyXG4gICAgICAgIC8vIFRPRE86IHdoeSBpdGVtTmFtZSA9PSB0b29sdGlwdGV4dCBvZiBjdXN0b210b29sYmFyIGFuZCBub3QgdGhlIGlkISEhXHJcbiAgICAgICAgLy8gZWouVHJlZUdyaWQuVG9vbGJhckl0ZW1zLkFkZCA9IFwiYWRkXCIgPT4gd2lsbCBiZSBcIkFkZFwiIGluIGl0ZW1OYW1lISEhXHJcblxyXG4gICAgICAgIC8vIGN1c3RvbSB0b29sYmFyXHJcbiAgICAgICAgZm9yKGxldCBpbmRleCA9MDsgaW5kZXggPCB0b29sYmFyU2V0dGluZ3MuY3VzdG9tVG9vbGJhckl0ZW1zLmxlbmd0aDsgaW5kZXgrKyl7XHJcbiAgICAgICAgICAgIGlmKHRvb2xiYXJTZXR0aW5ncy5jdXN0b21Ub29sYmFySXRlbXNbaW5kZXhdLnRvb2x0aXBUZXh0ID09IHRvb2xUaXBUZXh0KXtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IGJ1dHRvbiA9IHRoaXMuZ2V0VG9vbGJhckJ1dHRvbih0b29sYmFyU2V0dGluZ3MuY3VzdG9tVG9vbGJhckl0ZW1zW2luZGV4XS50ZXh0KTtcclxuICAgICAgICAgICAgICAgIGlmKGJ1dHRvbiAhPSB1bmRlZmluZWQgJiYgYnV0dG9uLmRpc2FibGVkID09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9vbGJhclNldHRpbmdzLmN1c3RvbVRvb2xiYXJJdGVtc1tpbmRleF0udGV4dDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgc3R5bGVzIG9mIGFsbCB0aGUgdG9vbGJhciBidXR0b25zXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyZWVHcmlkVG9vbGJhckJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFN0eWxlRm9yVG9vbGJhckljb25zKCkge1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgdGhpcy5fdG9vbGJhckJ1dHRvbnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAkKHRoaXMuX3dpZGdldE1haW5EaXYpLmFwcGVuZCh0aGlzLmdldEltYWdlU3R5bGUodGhpcy5fdG9vbGJhckJ1dHRvbnNbaV0uaWQsIHRoaXMuX3Rvb2xiYXJCdXR0b25zW2ldLmljb24pKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGFkZCB0b29sYmFyIGNsYXNzIHRvIGVsZW1lbnRcclxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzLmdldEVsZW1lbnRCeVRvb2xiYXJCdXR0b25FbGVtZW50SWQodGhpcy5fdG9vbGJhckJ1dHRvbnNbaV0uaWQpO1xyXG4gICAgICAgICAgICBpZihlbGVtZW50ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ0b29sYmFyQnV0dG9uXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2l6ZSB0aGUgdG9vbGJhciB0byB0aGUgZ2l2ZW4gd2lkdGhcclxuICAgICAqIFNldHMgdGhlIHBvc2l0aW9uIG9mIHRoZSByaWdodCBhbGlnbmVkIGJ1dHRvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBtZW1iZXJvZiBUcmVlR3JpZFRvb2xiYXJCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZXNpemUod2lkdGg6IG51bWJlcil7XHJcbiAgICAgICAgbGV0IGJ1dHRvbldpZHRoID0gMzE7IC8vIFRPRE86IGdldCAzMXB4IGZyb20gZGl2L3N2Z1xyXG4gICAgICAgIGxldCBsZWZ0QnV0dG9uQ291bnQgPSB0aGlzLmdldFZpc2libGVUb29sYmFyQnV0dG9uT25MZWZ0U2lkZUNvdW50KCk7XHJcbiAgICAgICAgbGV0IHJpZ2h0QnV0dG9uQ291bnQgPSB0aGlzLmdldFZpc2libGVUb29sYmFyQnV0dG9uc09uUmlnaHRTaWRlQ291bnQoKTtcclxuICAgICAgICBsZXQgYnV0dG9uQ291bnQgPSBsZWZ0QnV0dG9uQ291bnQrcmlnaHRCdXR0b25Db3VudDtcclxuICAgICAgICBpZih3aWR0aCA+IChidXR0b25Db3VudCAqIGJ1dHRvbldpZHRoKSl7IC8vIE9ubHkgbW92ZSBidXR0b25zIGZyb20gcmlnaHQgdG8gbGVmdCBpZiB0aGVyZSBpcyBlbm91Z2h0IHNwYWNlICBcclxuICAgICAgICAgICAgLy8gU2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgYnV0dG9ucyB0aGF0IHNob3VsZCBiZSBvbiB0aGUgcmlnaHQgc2lkZSBvZiB0aGUgdG9vbGJhclxyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHRoaXMuX3Rvb2xiYXJCdXR0b25zLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX3Rvb2xiYXJCdXR0b25zW2ldLmFsaWduID09IFRvb2xiYXJCdXR0b25BbGlnbm1lbnQuUmlnaHQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbGVtZW50ID0gdGhpcy5nZXRFbGVtZW50QnlUb29sYmFyQnV0dG9uRWxlbWVudElkKHRoaXMuX3Rvb2xiYXJCdXR0b25zW2ldLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihlbGVtZW50ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucGFyZW50RWxlbWVudCEuc3R5bGUud2lkdGggPSB3aWR0aC50b1N0cmluZygpICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1Bvc2l0aW9uID0gd2lkdGggLSAobGVmdEJ1dHRvbkNvdW50KmJ1dHRvbldpZHRoKS0oKHJpZ2h0QnV0dG9uQ291bnQpKmJ1dHRvbldpZHRoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gbmV3UG9zaXRpb24udG9TdHJpbmcoKSArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgdGhlIHZpc2libGUgdG9vbGJhciBidXR0b25zIG9uIHRoZSByaWdodCBzaWRlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJlZUdyaWRUb29sYmFyQmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFZpc2libGVUb29sYmFyQnV0dG9uc09uUmlnaHRTaWRlQ291bnQoKTogbnVtYmVye1xyXG4gICAgICAgIGxldCB2aXNpYmxlVG9vbGJhckJ1dHRvbnMgPSAwO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHRoaXMuX3Rvb2xiYXJCdXR0b25zLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYodGhpcy5fdG9vbGJhckJ1dHRvbnNbaV0uYWxpZ24gPT0gVG9vbGJhckJ1dHRvbkFsaWdubWVudC5SaWdodCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXMuZ2V0RWxlbWVudEJ5VG9vbGJhckJ1dHRvbkVsZW1lbnRJZCh0aGlzLl90b29sYmFyQnV0dG9uc1tpXS5pZCk7XHJcbiAgICAgICAgICAgICAgICBpZihlbGVtZW50ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZWxlbWVudC5zdHlsZS5kaXNwbGF5ICE9IFwibm9uZVwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJsZVRvb2xiYXJCdXR0b25zKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2aXNpYmxlVG9vbGJhckJ1dHRvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgdGhlIHZpc2libGUgdG9vbGJhciBidXR0b25zIG9uIHRoZSBsZWZ0IHNpZGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBUcmVlR3JpZFRvb2xiYXJCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VmlzaWJsZVRvb2xiYXJCdXR0b25PbkxlZnRTaWRlQ291bnQoKXtcclxuICAgICAgICBsZXQgdmlzaWJsZVRvb2xiYXJCdXR0b25zPTA7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8dGhpcy5fdG9vbGJhckJ1dHRvbnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZih0aGlzLl90b29sYmFyQnV0dG9uc1tpXS5hbGlnbiA9PSBUb29sYmFyQnV0dG9uQWxpZ25tZW50LkxlZnQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzLmdldEVsZW1lbnRCeVRvb2xiYXJCdXR0b25FbGVtZW50SWQodGhpcy5fdG9vbGJhckJ1dHRvbnNbaV0uaWQpO1xyXG4gICAgICAgICAgICAgICAgaWYoZWxlbWVudCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQhLnN0eWxlLmRpc3BsYXkgIT0gXCJub25lXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmxlVG9vbGJhckJ1dHRvbnMrKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZpc2libGVUb29sYmFyQnV0dG9ucztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEltYWdlU3R5bGUodG9vbGJhcklkOiBzdHJpbmcsIGltYWdlTmFtZTpzdHJpbmcpe1xyXG4gICAgICAgIGxldCBlbGVtZW50SWQgPSB0aGlzLmdldEVsZW1lbnRJZCh0b29sYmFySWQpOyBcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICA8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+XHJcbiAgICAgICAgICAgIGAgKyBlbGVtZW50SWQgK2Age1xyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGAgKyB0aGlzLmdldEltYWdlUGF0aChpbWFnZU5hbWUpICsgYCk7XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IDIwcHggMjBweDtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAyMHB4O1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDI0cHg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPC9zdHlsZT5gO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0SW1hZ2VQYXRoKGltYWdlTmFtZTogc3RyaW5nKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBUaGVtZVByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0VGhlbWVkRmlsZVBhdGgoaW1hZ2VOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldERlYWN0aXZhdGVkSWNvbihpY29uOiBzdHJpbmcpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gaWNvbi5yZXBsYWNlKFwiLnN2Z1wiLCBcIl9kZWFjdGl2YXRlZC5zdmdcIik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCBnZXRUb29sYmFyQnV0dG9uKGlkOiBzdHJpbmcpOiBUb29sYmFyQnV0dG9ufHVuZGVmaW5lZHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdG9vbGJhckJ1dHRvbnMuZmlsdGVyKHRvb2xiYXJCdXR0b24gPT4ge3JldHVybiB0b29sYmFyQnV0dG9uLmlkID09IGlkfSlbMF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBIVE1MRGl2RWxlbWVudCBvZiB0aGUgdG9vbGJhciBidXR0b24gZm9yIHRoZSBnaXZlbiBpZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdG9vbGJhckJ1dHRvbklkXHJcbiAgICAgKiBAcmV0dXJucyB7KEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBUcmVlR3JpZFRvb2xiYXJCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0RWxlbWVudEJ5VG9vbGJhckJ1dHRvbkVsZW1lbnRJZCh0b29sYmFyQnV0dG9uSWQ6IHN0cmluZyk6IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVke1xyXG4gICAgICAgIGxldCBpZCA9IHRoaXMuZ2V0RWxlbWVudElkKHRvb2xiYXJCdXR0b25JZClcclxuICAgICAgICBsZXQgbXlTdWJEaXYgPSB0aGlzLl93aWRnZXRNYWluRGl2LnF1ZXJ5U2VsZWN0b3IoaWQpO1xyXG4gICAgICAgIGlmKG15U3ViRGl2ID09IG51bGwpe1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gPEhUTUxEaXZFbGVtZW50Pm15U3ViRGl2O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZWxlbWVudCBpZCBpbmNsLiBcIiMuLi5cIlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdG9vbGJhcklkXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFRyZWVHcmlkVG9vbGJhckJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRFbGVtZW50SWQodG9vbGJhcklkOiBzdHJpbmcpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIFwiI1wiICsgdGhpcy5fd2lkZ2V0TWFpbkRpdi5pZCArIFwiX1wiICsgdG9vbGJhcklkO1xyXG4gICAgfVxyXG5cclxuXHQvKipcclxuICAgICAqIFJldHVybnMgdGhlIGVqIHRyZWUgZ3JpZCBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7ZWouVHJlZUdyaWR9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJlZUdyaWRUb29sYmFyQmFzZVxyXG4gICAgICovXHJcbiAgICBnZXRUcmVlR3JpZE9iamVjdCgpOiBlai5UcmVlR3JpZHtcclxuXHRcdHJldHVybiAkKHRoaXMuX3dpZGdldE1haW5EaXYpLmRhdGEoXCJlalRyZWVHcmlkXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1RyZWVHcmlkVG9vbGJhckJhc2UsIFRvb2xiYXJCdXR0b25BbGlnbm1lbnR9OyJdfQ==