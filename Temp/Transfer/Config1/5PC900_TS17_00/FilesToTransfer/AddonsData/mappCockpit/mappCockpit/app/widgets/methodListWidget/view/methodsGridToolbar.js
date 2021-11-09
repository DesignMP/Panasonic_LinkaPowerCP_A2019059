define(["require", "exports", "../../../models/online/mappCockpitComponent", "../../common/domHelper", "../../../common/directoryProvider", "../../common/themeProvider", "../../common/customToolbarButton", "./methodsToolbarButton"], function (require, exports, mappCockpitComponent_1, domHelper_1, directoryProvider_1, themeProvider_1, customToolbarButton_1, methodsToolbarButton_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MethodGridToolbar = /** @class */ (function () {
        function MethodGridToolbar() {
            // Default button id 'Off'
            this.toolbarIdOff = "Off";
            // Default button id 'Abort'
            this.toolbarIdStop = "Abort";
            // Path to image directory
            this._imageDirectory = "../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "methodListWidget/style/images/toolbar/";
            // Holds an array of buttons used in the toolbar
            this._buttonList = new Array();
            // False if quickCommand buttons are used
            this._areDefaultButtons = true;
        }
        /**
         * Initialization of toolbar
         *
         * @param {HTMLDivElement} widgetMainDiv
         * @memberof MethodGridToolbar
         */
        MethodGridToolbar.prototype.initToolbar = function (widgetMainDiv) {
            this._widgetMainDiv = $(widgetMainDiv);
            this._parentDivId = this._widgetMainDiv[0].id;
            // Clear the button list
            this._buttonList.splice(0, this._buttonList.length);
        };
        /**
         * Get default toolbarButtons
         *
         * @returns {CustomToolbarButton[]}
         * @memberof MethodGridToolbar
         */
        MethodGridToolbar.prototype.getDefaultToolbarButtons = function () {
            var toolbar = [];
            toolbar.push(new customToolbarButton_1.CustomToolbarButton(this.toolbarIdOff, this.toolbarIdOff));
            toolbar.push(new customToolbarButton_1.CustomToolbarButton(this.toolbarIdStop, this.toolbarIdStop));
            return toolbar;
        };
        /**
         * Define toolbar buttons
         *
         * @param {MappCockpitQuickCommandParameter[]} commands
         * @returns {CustomToolbar[]}
         * @memberof MethodGridToolbar
         */
        MethodGridToolbar.prototype.getCustomToolbars = function (commands) {
            var toolbar = [];
            if (commands !== undefined && commands.length !== 0) {
                commands.forEach(function (command) {
                    //Text cannot contain spaces
                    var text = command.name.replace(/\s/g, '_');
                    toolbar.push(new customToolbarButton_1.CustomToolbarButton(text, command.tooltip));
                });
            }
            return toolbar;
        };
        /**
         * Dispose the toolbar
         *
         * @memberof MethodGridToolbar
         */
        MethodGridToolbar.prototype.dispose = function () {
            for (var i = 0; i < this._buttonList.length; i++) {
                this.destroyButton(this._buttonList[i].buttonId);
            }
        };
        /**
         * Add quick commands toolbar buttons
         *
         * @param {string} methodId
         * @param {string} imageName
         * @memberof MethodGridToolbar
         */
        MethodGridToolbar.prototype.addQuickCommandsToolbarButtons = function (methodId, imageName) {
            this._areDefaultButtons = false;
            var buttonId = this._parentDivId + "_" + methodId.replace(/\s/g, '_');
            var imagePath = this._imageDirectory + imageName + '.svg';
            //Add button to toolbar
            this.addMethodToolbarButton(buttonId, methodId, imagePath, '', '35px');
        };
        /**
         * Add default method toolbar buttons
         *
         * @memberof MethodGridToolbar
         */
        MethodGridToolbar.prototype.addDefaultToolbarButtons = function () {
            var powerOffIcon = themeProvider_1.ThemeProvider.getInstance().getThemedFilePath("widgets/methodListWidget/style/images/toolbar/Off_white.svg");
            var abortCommandIcon = themeProvider_1.ThemeProvider.getInstance().getThemedFilePath("widgets/methodListWidget/style/images/toolbar/Stop_white.svg");
            var buttonIdOff = this._parentDivId + "_" + this.toolbarIdOff;
            var buttonIdAbort = this._parentDivId + "_" + this.toolbarIdStop;
            //Add buttons to toolbar
            this.addMethodToolbarButton(buttonIdOff, "Power Off", powerOffIcon, this.toolbarIdOff, "100px");
            this.addMethodToolbarButton(buttonIdAbort, "Abort Command", abortCommandIcon, this.toolbarIdStop, "100px");
        };
        /**
         * Add method toolbar buttons
         *
         * @param {string} buttonId
         * @param {string} methodId
         * @param {string} imagePath
         * @param {string} text
         * @param {string} buttonWidth
         * @param {boolean} defaultButtons
         * @memberof MethodGridToolbar
         */
        MethodGridToolbar.prototype.addMethodToolbarButton = function (buttonId, methodId, imagePath, text, buttonWidth) {
            var _this = this;
            this._buttonList.push(new methodsToolbarButton_1.MethodsToolbarButton(buttonId, methodId));
            var buttonElement = this._widgetMainDiv.find("#" + buttonId);
            buttonElement.ejButton({
                cssClass: 'methodListToolbarButton',
                text: text,
                contentType: ej.ContentType.TextAndImage,
                width: buttonWidth,
                click: function (args) { return _this.toolbarButtonClick(methodId); },
            });
            this.setButtonImage(buttonId, imagePath);
        };
        /**
         * Defines the image for the button
         *
         * @private
         * @param {string} buttonId
         * @param {string} imagePath
         * @param {string} methodId
         * @param {boolean} defaultButtons
         * @memberof MethodGridToolbar
         */
        MethodGridToolbar.prototype.setButtonImage = function (buttonId, imagePath) {
            try {
                var buttonElement = this._widgetMainDiv.find("#" + buttonId)[0];
                buttonElement.style.backgroundImage = "url(" + imagePath + ")";
            }
            catch (e) {
                console.error('MethodsGridToolbar could not add button :' + buttonId + ', ' + e.message);
            }
        };
        /**
         * Destroys the button object
         *
         * @private
         * @param {string} toolbarId
         * @memberof MethodGridToolbar
         */
        MethodGridToolbar.prototype.destroyButton = function (toolbarId) {
            var buttonElement = this._widgetMainDiv.find("#" + toolbarId);
            var button = buttonElement.data("ejButton");
            if (button != undefined) {
                button.destroy();
            }
        };
        /**
         * Execute corresponding method when button is clicked
         *
         * @private
         * @param {string} methodId
         * @memberof MethodGridToolbar
         */
        MethodGridToolbar.prototype.toolbarButtonClick = function (methodId) {
            var method = mappCockpitComponent_1.MappCockpitComponentMethod.find(methodId, this._actualComponentMethods);
            if (method) {
                if (method.isExecutable != undefined && method.isExecutable.value == true) {
                    mappCockpitComponent_1.MappCockpitComponentMethod.execute(method);
                }
            }
        };
        /**
         * Set button state
         *
         * @private
         * @param {string} buttonId
         * @param {boolean} activated
         * @returns
         * @memberof MethodGridToolbar
         */
        MethodGridToolbar.prototype.setButtonState = function (buttonId, activated) {
            // get button instance;
            var buttonElement = this._widgetMainDiv.find("#" + buttonId);
            var button = buttonElement.data("ejButton");
            if (!button) {
                return;
            }
            this.setButtonClass(button, activated);
            domHelper_1.DomHelper.disableElement(buttonElement[0], !activated);
        };
        /**
         * Set specific button class
         *
         * @param {ej.Button} button
         * @param {(boolean | undefined)} activated
         * @memberof MethodGridToolbar
         */
        MethodGridToolbar.prototype.setButtonClass = function (button, activated) {
            if (activated) {
                if (this._areDefaultButtons) {
                    button.option({ cssClass: "methodListToolbarButton" });
                }
                else {
                    button.option({ cssClass: "quickCommandToolbarButton" });
                }
            }
            else {
                if (this._areDefaultButtons) {
                    button.option({ cssClass: "methodListToolbarButtonDeactivated" });
                }
                else {
                    button.option({ cssClass: "quickCommandToolbarButtonDeactivated" });
                }
            }
        };
        /**
         * Set executable methods
         *
         * @param {Array<MappCockpitComponentMethod>} actualComponentMethods
         * @memberof MethodGridToolbar
         */
        MethodGridToolbar.prototype.setActualComponentMethods = function (actualComponentMethods) {
            var _this = this;
            this._actualComponentMethods = actualComponentMethods;
            this._buttonList.forEach(function (button) {
                _this.observeMethodExecutabilityForButtonState(button.methodId, button.buttonId, button);
            });
        };
        /**
         * Update button state when executability is changed
         *
         * @private
         * @param {string} methodId
         * @param {string} buttonId
         * @param {ej.Button} button
         * @memberof MethodGridToolbar
         */
        MethodGridToolbar.prototype.observeMethodExecutabilityForButtonState = function (methodId, buttonId, button) {
            var _this = this;
            var method = mappCockpitComponent_1.MappCockpitComponentMethod.find(methodId, this._actualComponentMethods);
            if (method) {
                if (method.isExecutable != undefined) {
                    // Set init state of button   
                    this.setButtonState(buttonId, method.isExecutable.value);
                }
                method.isExecutable.changed(function (isExecutable) {
                    // Refresh button state if needed
                    _this.setButtonState(buttonId, isExecutable);
                });
            }
            else {
                this.setButtonState(buttonId, false);
            }
        };
        return MethodGridToolbar;
    }());
    exports.MethodGridToolbar = MethodGridToolbar;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0aG9kc0dyaWRUb29sYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL21ldGhvZExpc3RXaWRnZXQvdmlldy9tZXRob2RzR3JpZFRvb2xiYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBT0E7UUFBQTtZQUlJLDBCQUEwQjtZQUNULGlCQUFZLEdBQUcsS0FBSyxDQUFDO1lBQ3RDLDRCQUE0QjtZQUNYLGtCQUFhLEdBQUcsT0FBTyxDQUFDO1lBQ3pDLDBCQUEwQjtZQUNULG9CQUFlLEdBQUcsV0FBVyxHQUFHLHFDQUFpQixDQUFDLG1CQUFtQixFQUFFLEdBQUcsd0NBQXdDLENBQUE7WUFDbkksZ0RBQWdEO1lBQ3hDLGdCQUFXLEdBQUcsSUFBSSxLQUFLLEVBQXdCLENBQUM7WUFLeEQseUNBQXlDO1lBQ2pDLHVCQUFrQixHQUFHLElBQUksQ0FBQztRQStQdEMsQ0FBQztRQTdQRzs7Ozs7V0FLRztRQUNJLHVDQUFXLEdBQWxCLFVBQW1CLGFBQTZCO1lBQzVDLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFFOUMsd0JBQXdCO1lBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZELENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLG9EQUF3QixHQUEvQjtZQUNJLElBQUksT0FBTyxHQUEwQixFQUFFLENBQUM7WUFDeEMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLHlDQUFtQixDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDNUUsT0FBTyxDQUFDLElBQUksQ0FB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WSxDQUFDLE9BQU8sQ0FBQyxVQUFDLFlBQVk7b0JBQ3JDLGlDQUFpQztvQkFDakMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ2hELENBQUMsQ0FBQyxDQUFBO2FBQ0w7aUJBQ0c7Z0JBQ0EsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDeEM7UUFDTCxDQUFDO1FBRUwsd0JBQUM7SUFBRCxDQUFDLEFBaFJELElBZ1JDO0lBaFJZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLCBNYXBwQ29ja3BpdFF1aWNrQ29tbWFuZFBhcmFtZXRlciB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IERvbUhlbHBlciB9IGZyb20gXCIuLi8uLi9jb21tb24vZG9tSGVscGVyXCI7XHJcbmltcG9ydCB7IERpcmVjdG9yeVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9kaXJlY3RvcnlQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBUaGVtZVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90aGVtZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IEN1c3RvbVRvb2xiYXJCdXR0b24gfSBmcm9tIFwiLi4vLi4vY29tbW9uL2N1c3RvbVRvb2xiYXJCdXR0b25cIjtcclxuaW1wb3J0IHsgTWV0aG9kc1Rvb2xiYXJCdXR0b24gfSBmcm9tIFwiLi9tZXRob2RzVG9vbGJhckJ1dHRvblwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1ldGhvZEdyaWRUb29sYmFye1xyXG4gICAgXHJcbiAgICAvL0hvbGRzIGFuIGFycmF5IG9mIGV4ZWN1dGFibGUgbWV0aG9kc1xyXG4gICAgcHJpdmF0ZSBfYWN0dWFsQ29tcG9uZW50TWV0aG9kczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+fHVuZGVmaW5lZDtcclxuICAgIC8vIERlZmF1bHQgYnV0dG9uIGlkICdPZmYnXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRvb2xiYXJJZE9mZiA9IFwiT2ZmXCI7XHJcbiAgICAvLyBEZWZhdWx0IGJ1dHRvbiBpZCAnQWJvcnQnXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRvb2xiYXJJZFN0b3AgPSBcIkFib3J0XCI7XHJcbiAgICAvLyBQYXRoIHRvIGltYWdlIGRpcmVjdG9yeVxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfaW1hZ2VEaXJlY3RvcnkgPSBcIi4uLy4uLy4uL1wiICsgRGlyZWN0b3J5UHJvdmlkZXIuZ2V0V2lkZ2V0c0RpcmVjdG9yeSgpICsgXCJtZXRob2RMaXN0V2lkZ2V0L3N0eWxlL2ltYWdlcy90b29sYmFyL1wiXHJcbiAgICAvLyBIb2xkcyBhbiBhcnJheSBvZiBidXR0b25zIHVzZWQgaW4gdGhlIHRvb2xiYXJcclxuICAgIHByaXZhdGUgX2J1dHRvbkxpc3QgPSBuZXcgQXJyYXk8TWV0aG9kc1Rvb2xiYXJCdXR0b24+KCk7XHJcbiAgICAvLyBQYXJlbnQgZGl2IGlkXHJcbiAgICBwcml2YXRlIF9wYXJlbnREaXZJZDogc3RyaW5nfHVuZGVmaW5lZDtcclxuICAgIC8vIFdpZGdldCBtYWluIGRpdlxyXG4gICAgcHJpdmF0ZSBfd2lkZ2V0TWFpbkRpdiE6IEpRdWVyeTxIVE1MRGl2RWxlbWVudD47XHJcbiAgICAvLyBGYWxzZSBpZiBxdWlja0NvbW1hbmQgYnV0dG9ucyBhcmUgdXNlZFxyXG4gICAgcHJpdmF0ZSBfYXJlRGVmYXVsdEJ1dHRvbnMgPSB0cnVlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6YXRpb24gb2YgdG9vbGJhclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SFRNTERpdkVsZW1lbnR9IHdpZGdldE1haW5EaXZcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW5pdFRvb2xiYXIod2lkZ2V0TWFpbkRpdjogSFRNTERpdkVsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLl93aWRnZXRNYWluRGl2ID0gJCh3aWRnZXRNYWluRGl2KTtcclxuICAgICAgICB0aGlzLl9wYXJlbnREaXZJZCA9IHRoaXMuX3dpZGdldE1haW5EaXZbMF0uaWQ7XHJcblxyXG4gICAgICAgIC8vIENsZWFyIHRoZSBidXR0b24gbGlzdFxyXG4gICAgICAgIHRoaXMuX2J1dHRvbkxpc3Quc3BsaWNlKDAsdGhpcy5fYnV0dG9uTGlzdC5sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGRlZmF1bHQgdG9vbGJhckJ1dHRvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Q3VzdG9tVG9vbGJhckJ1dHRvbltdfVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZEdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0VG9vbGJhckJ1dHRvbnMoKTpDdXN0b21Ub29sYmFyQnV0dG9uW10ge1xyXG4gICAgICAgIGxldCB0b29sYmFyOiBDdXN0b21Ub29sYmFyQnV0dG9uW10gPSBbXTtcclxuICAgICAgICB0b29sYmFyLnB1c2gobmV3IEN1c3RvbVRvb2xiYXJCdXR0b24odGhpcy50b29sYmFySWRPZmYsIHRoaXMudG9vbGJhcklkT2ZmKSk7XHJcbiAgICAgICAgdG9vbGJhci5wdXNoKG5ldyBDdXN0b21Ub29sYmFyQnV0dG9uKHRoaXMudG9vbGJhcklkU3RvcCwgdGhpcy50b29sYmFySWRTdG9wKSk7XHJcbiAgICAgICAgcmV0dXJuIHRvb2xiYXI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lIHRvb2xiYXIgYnV0dG9uc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRRdWlja0NvbW1hbmRQYXJhbWV0ZXJbXX0gY29tbWFuZHNcclxuICAgICAqIEByZXR1cm5zIHtDdXN0b21Ub29sYmFyW119XHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEN1c3RvbVRvb2xiYXJzIChjb21tYW5kczogTWFwcENvY2twaXRRdWlja0NvbW1hbmRQYXJhbWV0ZXJbXSk6Q3VzdG9tVG9vbGJhckJ1dHRvbltdeyBcclxuICAgICAgICBsZXQgdG9vbGJhcjogQ3VzdG9tVG9vbGJhckJ1dHRvbltdID0gW107XHJcbiAgICAgICAgaWYgKGNvbW1hbmRzICE9PSB1bmRlZmluZWQgJiYgY29tbWFuZHMubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbW1hbmRzLmZvckVhY2goKGNvbW1hbmQpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vVGV4dCBjYW5ub3QgY29udGFpbiBzcGFjZXNcclxuICAgICAgICAgICAgICAgIGxldCB0ZXh0ID0gY29tbWFuZC5uYW1lLnJlcGxhY2UoL1xccy9nLCdfJyk7XHJcbiAgICAgICAgICAgICAgICB0b29sYmFyLnB1c2gobmV3IEN1c3RvbVRvb2xiYXJCdXR0b24odGV4dCwgY29tbWFuZC50b29sdGlwKSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0b29sYmFyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZSB0aGUgdG9vbGJhclxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpe1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fYnV0dG9uTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lCdXR0b24odGhpcy5fYnV0dG9uTGlzdFtpXS5idXR0b25JZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIHF1aWNrIGNvbW1hbmRzIHRvb2xiYXIgYnV0dG9ucyBcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZU5hbWVcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkUXVpY2tDb21tYW5kc1Rvb2xiYXJCdXR0b25zKG1ldGhvZElkOiBzdHJpbmcsIGltYWdlTmFtZTogc3RyaW5nKXtcclxuICAgICAgICB0aGlzLl9hcmVEZWZhdWx0QnV0dG9ucyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBsZXQgYnV0dG9uSWQgPSB0aGlzLl9wYXJlbnREaXZJZCAgKyBcIl9cIiArIG1ldGhvZElkLnJlcGxhY2UoL1xccy9nLCdfJyk7XHJcbiAgICAgICAgbGV0IGltYWdlUGF0aCA9IHRoaXMuX2ltYWdlRGlyZWN0b3J5ICsgaW1hZ2VOYW1lICsgJy5zdmcnO1xyXG5cclxuICAgICAgICAvL0FkZCBidXR0b24gdG8gdG9vbGJhclxyXG4gICAgICAgIHRoaXMuYWRkTWV0aG9kVG9vbGJhckJ1dHRvbihidXR0b25JZCwgbWV0aG9kSWQsIGltYWdlUGF0aCwgJycsICczNXB4JylcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBkZWZhdWx0IG1ldGhvZCB0b29sYmFyIGJ1dHRvbnNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZERlZmF1bHRUb29sYmFyQnV0dG9ucygpIHtcclxuICAgICAgICBsZXQgcG93ZXJPZmZJY29uID0gVGhlbWVQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldFRoZW1lZEZpbGVQYXRoKFwid2lkZ2V0cy9tZXRob2RMaXN0V2lkZ2V0L3N0eWxlL2ltYWdlcy90b29sYmFyL09mZl93aGl0ZS5zdmdcIik7XHJcbiAgICAgICAgbGV0IGFib3J0Q29tbWFuZEljb24gPSBUaGVtZVByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0VGhlbWVkRmlsZVBhdGgoXCJ3aWRnZXRzL21ldGhvZExpc3RXaWRnZXQvc3R5bGUvaW1hZ2VzL3Rvb2xiYXIvU3RvcF93aGl0ZS5zdmdcIik7XHJcbiAgICAgICAgbGV0IGJ1dHRvbklkT2ZmID0gdGhpcy5fcGFyZW50RGl2SWQgKyBcIl9cIiArIHRoaXMudG9vbGJhcklkT2ZmO1xyXG4gICAgICAgIGxldCBidXR0b25JZEFib3J0ID0gdGhpcy5fcGFyZW50RGl2SWQgKyBcIl9cIiArIHRoaXMudG9vbGJhcklkU3RvcDtcclxuXHJcbiAgICAgICAgLy9BZGQgYnV0dG9ucyB0byB0b29sYmFyXHJcbiAgICAgICAgdGhpcy5hZGRNZXRob2RUb29sYmFyQnV0dG9uKGJ1dHRvbklkT2ZmLCBcIlBvd2VyIE9mZlwiLCBwb3dlck9mZkljb24sIHRoaXMudG9vbGJhcklkT2ZmLCBcIjEwMHB4XCIpO1xyXG4gICAgICAgIHRoaXMuYWRkTWV0aG9kVG9vbGJhckJ1dHRvbihidXR0b25JZEFib3J0LCBcIkFib3J0IENvbW1hbmRcIiwgYWJvcnRDb21tYW5kSWNvbiwgdGhpcy50b29sYmFySWRTdG9wLCBcIjEwMHB4XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIG1ldGhvZCB0b29sYmFyIGJ1dHRvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYnV0dG9uSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2RJZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGltYWdlUGF0aFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBidXR0b25XaWR0aFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBkZWZhdWx0QnV0dG9uc1xyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZEdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRNZXRob2RUb29sYmFyQnV0dG9uKGJ1dHRvbklkOiBzdHJpbmcsIG1ldGhvZElkOiBzdHJpbmcsIGltYWdlUGF0aDogc3RyaW5nLCB0ZXh0OiBzdHJpbmcsIGJ1dHRvbldpZHRoOiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuX2J1dHRvbkxpc3QucHVzaChuZXcgTWV0aG9kc1Rvb2xiYXJCdXR0b24oYnV0dG9uSWQsIG1ldGhvZElkKSk7XHJcbiAgICAgICAgbGV0IGJ1dHRvbkVsZW1lbnQgPSB0aGlzLl93aWRnZXRNYWluRGl2LmZpbmQoXCIjXCIgKyBidXR0b25JZCk7XHJcbiAgICAgICAgYnV0dG9uRWxlbWVudC5lakJ1dHRvbih7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiAnbWV0aG9kTGlzdFRvb2xiYXJCdXR0b24nLFxyXG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogZWouQ29udGVudFR5cGUuVGV4dEFuZEltYWdlLFxyXG4gICAgICAgICAgICB3aWR0aDogYnV0dG9uV2lkdGgsXHJcbiAgICAgICAgICAgIGNsaWNrOiAoYXJncykgPT4gdGhpcy50b29sYmFyQnV0dG9uQ2xpY2sobWV0aG9kSWQpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2V0QnV0dG9uSW1hZ2UoYnV0dG9uSWQsIGltYWdlUGF0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHRoZSBpbWFnZSBmb3IgdGhlIGJ1dHRvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYnV0dG9uSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZVBhdGhcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2RJZFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBkZWZhdWx0QnV0dG9uc1xyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZEdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0QnV0dG9uSW1hZ2UoYnV0dG9uSWQ6IHN0cmluZywgaW1hZ2VQYXRoOiBzdHJpbmcpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgYnV0dG9uRWxlbWVudCA9IHRoaXMuX3dpZGdldE1haW5EaXYuZmluZChcIiNcIiArIGJ1dHRvbklkKVswXTtcclxuICAgICAgICAgICAgYnV0dG9uRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybChcIiArIGltYWdlUGF0aCArXCIpXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignTWV0aG9kc0dyaWRUb29sYmFyIGNvdWxkIG5vdCBhZGQgYnV0dG9uIDonICsgYnV0dG9uSWQgKyAnLCAnICsgZS5tZXNzYWdlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVzdHJveXMgdGhlIGJ1dHRvbiBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRvb2xiYXJJZFxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZEdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGVzdHJveUJ1dHRvbih0b29sYmFySWQ6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IGJ1dHRvbkVsZW1lbnQgPSB0aGlzLl93aWRnZXRNYWluRGl2LmZpbmQoXCIjXCIgKyB0b29sYmFySWQpO1xyXG4gICAgICAgIGxldCBidXR0b24gPSBidXR0b25FbGVtZW50LmRhdGEoXCJlakJ1dHRvblwiKTtcclxuICAgICAgICBpZihidXR0b24gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgYnV0dG9uLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeGVjdXRlIGNvcnJlc3BvbmRpbmcgbWV0aG9kIHdoZW4gYnV0dG9uIGlzIGNsaWNrZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZElkXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB0b29sYmFyQnV0dG9uQ2xpY2sobWV0aG9kSWQ6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IG1ldGhvZCA9IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLmZpbmQobWV0aG9kSWQsIHRoaXMuX2FjdHVhbENvbXBvbmVudE1ldGhvZHMpO1xyXG4gICAgICAgIGlmIChtZXRob2QpIHtcclxuICAgICAgICAgICAgaWYobWV0aG9kLmlzRXhlY3V0YWJsZSAhPSB1bmRlZmluZWQgJiYgbWV0aG9kLmlzRXhlY3V0YWJsZS52YWx1ZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLmV4ZWN1dGUobWV0aG9kKTsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBidXR0b24gc3RhdGUgXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBidXR0b25JZFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBhY3RpdmF0ZWRcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRCdXR0b25TdGF0ZShidXR0b25JZDogc3RyaW5nLCBhY3RpdmF0ZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQpe1xyXG4gICAgICAgIC8vIGdldCBidXR0b24gaW5zdGFuY2U7XHJcbiAgICAgICAgbGV0IGJ1dHRvbkVsZW1lbnQgPSB0aGlzLl93aWRnZXRNYWluRGl2LmZpbmQoXCIjXCIgKyBidXR0b25JZCk7XHJcbiAgICAgICAgbGV0IGJ1dHRvbiA9IGJ1dHRvbkVsZW1lbnQuZGF0YShcImVqQnV0dG9uXCIpO1xyXG4gICAgICAgIGlmKCFidXR0b24pe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0QnV0dG9uQ2xhc3MoYnV0dG9uLCBhY3RpdmF0ZWQpXHJcbiAgICAgICAgXHJcbiAgICAgICAgRG9tSGVscGVyLmRpc2FibGVFbGVtZW50KGJ1dHRvbkVsZW1lbnRbMF0sICFhY3RpdmF0ZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHNwZWNpZmljIGJ1dHRvbiBjbGFzc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7ZWouQnV0dG9ufSBidXR0b25cclxuICAgICAqIEBwYXJhbSB7KGJvb2xlYW4gfCB1bmRlZmluZWQpfSBhY3RpdmF0ZWRcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBzZXRCdXR0b25DbGFzcyhidXR0b246IGVqLkJ1dHRvbiwgYWN0aXZhdGVkOiBib29sZWFuIHwgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYoYWN0aXZhdGVkKXtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2FyZURlZmF1bHRCdXR0b25zKSB7XHJcbiAgICAgICAgICAgICAgICBidXR0b24ub3B0aW9uKHtjc3NDbGFzczogXCJtZXRob2RMaXN0VG9vbGJhckJ1dHRvblwifSk7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uLm9wdGlvbih7Y3NzQ2xhc3M6IFwicXVpY2tDb21tYW5kVG9vbGJhckJ1dHRvblwifSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2FyZURlZmF1bHRCdXR0b25zKSB7XHJcbiAgICAgICAgICAgICAgICBidXR0b24ub3B0aW9uKHtjc3NDbGFzczogXCJtZXRob2RMaXN0VG9vbGJhckJ1dHRvbkRlYWN0aXZhdGVkXCJ9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJ1dHRvbi5vcHRpb24oe2Nzc0NsYXNzOiBcInF1aWNrQ29tbWFuZFRvb2xiYXJCdXR0b25EZWFjdGl2YXRlZFwifSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgZXhlY3V0YWJsZSBtZXRob2RzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD59IGFjdHVhbENvbXBvbmVudE1ldGhvZHNcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0QWN0dWFsQ29tcG9uZW50TWV0aG9kcyhhY3R1YWxDb21wb25lbnRNZXRob2RzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD4pe1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbENvbXBvbmVudE1ldGhvZHMgPSBhY3R1YWxDb21wb25lbnRNZXRob2RzO1xyXG4gICAgICAgIHRoaXMuX2J1dHRvbkxpc3QuZm9yRWFjaChidXR0b24gPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9ic2VydmVNZXRob2RFeGVjdXRhYmlsaXR5Rm9yQnV0dG9uU3RhdGUoYnV0dG9uLm1ldGhvZElkLCBidXR0b24uYnV0dG9uSWQsIGJ1dHRvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGUgYnV0dG9uIHN0YXRlIHdoZW4gZXhlY3V0YWJpbGl0eSBpcyBjaGFuZ2VkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2RJZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJ1dHRvbklkXHJcbiAgICAgKiBAcGFyYW0ge2VqLkJ1dHRvbn0gYnV0dG9uXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvYnNlcnZlTWV0aG9kRXhlY3V0YWJpbGl0eUZvckJ1dHRvblN0YXRlKG1ldGhvZElkOiBzdHJpbmcsIGJ1dHRvbklkOiBzdHJpbmcsIGJ1dHRvbjogTWV0aG9kc1Rvb2xiYXJCdXR0b24pIHtcclxuICAgICAgICBsZXQgbWV0aG9kID0gIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLmZpbmQobWV0aG9kSWQsIHRoaXMuX2FjdHVhbENvbXBvbmVudE1ldGhvZHMpO1xyXG4gICAgICAgIGlmIChtZXRob2QpIHtcclxuICAgICAgICAgICAgaWYobWV0aG9kLmlzRXhlY3V0YWJsZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgLy8gU2V0IGluaXQgc3RhdGUgb2YgYnV0dG9uICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJ1dHRvblN0YXRlKGJ1dHRvbklkLCBtZXRob2QuaXNFeGVjdXRhYmxlLnZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtZXRob2QuaXNFeGVjdXRhYmxlLmNoYW5nZWQoKGlzRXhlY3V0YWJsZSk9PntcclxuICAgICAgICAgICAgICAgIC8vIFJlZnJlc2ggYnV0dG9uIHN0YXRlIGlmIG5lZWRlZFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCdXR0b25TdGF0ZShidXR0b25JZCwgaXNFeGVjdXRhYmxlKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zZXRCdXR0b25TdGF0ZShidXR0b25JZCwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iXX0=