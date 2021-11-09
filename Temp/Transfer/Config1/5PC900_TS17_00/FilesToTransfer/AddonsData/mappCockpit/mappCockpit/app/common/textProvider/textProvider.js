define(["require", "exports", "./componentDefaultDefinition", "../componentBase/componentBase", "./textResource", "./languageCodes", "./settingIds", "./textFormatter/textFormatter", "./textResourcesContainer", "./textSystemErrorHandler", "./textProviderHelper"], function (require, exports, componentDefaultDefinition_1, componentBase_1, textResource_1, languageCodes_1, settingIds_1, textFormatter_1, textResourcesContainer_1, textSystemErrorHandler_1, textProviderHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This class handles provides access to all multilanguage texts
     * Texts are packaged in languages and namespaces
     * For searching for textresources the hirarchy is: language -> namepsage -> TextID
     *
     * @export
     * @class TextProvider
     * @extends {ComponentWithoutSettingsBase}
     * @implements {ITextProvider}
     */
    var TextProvider = /** @class */ (function () {
        /**
         * Creates an instance of TextProvider.
         *
         * @memberof TextProvider
         */
        function TextProvider() {
            /**
             * At first the TextSystem tries to find the namespace with the _selectedLanguage as languagecode
             *
             * @private
             * @type {string}
             * @memberof TextProvider
             */
            this._selectedLanguage = "";
            /**
             * If there is no namespace found with the _selectedLanguage as languagecode, the _fallbackLanguage is used
             *
             * @private
             * @type {string}
             * @memberof TextProvider
             */
            this._fallbackLanguage = "";
            /**
             * If there is also no namespace found with the _fallbackLanguage as languagecode, the _systemLanguage is used
             * The system language of the TextSystem is english
             *
             * @private
             * @memberof TextProvider
             */
            this._systemLanguage = languageCodes_1.LanguageCodes.english;
            /**
             *
             *
             * @private
             * @type {TextResourcesContainer}
             * @memberof TextProvider
             */
            this._resources = new textResourcesContainer_1.TextResourcesContainer();
            /**
             * Is used for persisting the TextSystem
             *
             * @type {ComponentBase}
             * @memberof TextProvider
             */
            this.component = new componentBase_1.ComponentBase(undefined, this);
        }
        /**
         * Initializes the component
         *
         * @memberof TextProvider
         */
        TextProvider.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
        };
        /**
         * Loads the peristed data for the TextSystem
         *
         * @memberof TextProvider
         */
        TextProvider.prototype.initialize = function () {
            this.component.loadComponentSettings();
        };
        /**
         * Disposes this component
         *
         * @memberof TextProvider
         */
        TextProvider.prototype.dispose = function () {
            this._resources.clearAllTexts();
        };
        /**
         * Clears all the data of this component
         *
         * @memberof TextProvider
         */
        TextProvider.prototype.clear = function () {
            this._resources.clearAllTexts();
            this.component.saveComponentSettings();
        };
        /**
         * Gets the current ComponentSettings
         *
         * @returns {ComponentSettings}
         * @memberof TextProvider
         */
        TextProvider.prototype.getComponentSettings = function () {
            // Get a valid format for persiting the textresources
            var textResourcesAsSettings = this._resources.getRecoursesSettings();
            // persist the selectedLanguage, fallbackLanguage and recourses
            this.component.setSetting(settingIds_1.SettingIds.TextResources, textResourcesAsSettings);
            this.component.setSetting(settingIds_1.SettingIds.SelectedLanguage, this._selectedLanguage);
            this.component.setSetting(settingIds_1.SettingIds.FallbackLanguage, this._fallbackLanguage);
            return this.component.getComponentSettings();
        };
        /**
         * Sets the given ComponentSettings
         *
         * @param {(ComponentSettings|undefined)} settings
         * @returns
         * @memberof TextProvider
         */
        TextProvider.prototype.setComponentSettings = function (settings) {
            var _this = this;
            this._resources.clearAllTexts();
            this.component.setComponentSettings(settings);
            if (settings === undefined) {
                return;
            }
            // load the selectedLanguage, fallbackLanguage and recourses from the component
            this._selectedLanguage = this.component.getSetting(settingIds_1.SettingIds.SelectedLanguage);
            this._fallbackLanguage = this.component.getSetting(settingIds_1.SettingIds.FallbackLanguage);
            var textResourcesSettings = this.component.getSetting(settingIds_1.SettingIds.TextResources);
            if (textResourcesSettings === undefined) {
                return;
            }
            // get the correct resource type from settings array
            textResourcesSettings.forEach(function (textResourcesSetting) {
                var textResource = textResource_1.TextResource.create(textResourcesSetting);
                _this._resources.addReplaceTextResource(textResource);
            });
        };
        /**
         * Sets the selected language
         *
         * @param {(ComponentSettings|undefined)} settings
         * @returns
         * @memberof TextProvider
         */
        TextProvider.prototype.setSelectedLanguage = function (selectedLanguage) {
            this._selectedLanguage = selectedLanguage;
            this.component.saveComponentSettings();
        };
        /**
         * Sets the fallback language
         *
         * @param {(ComponentSettings|undefined)} settings
         * @returns
         * @memberof TextProvider
         */
        TextProvider.prototype.setFallbackLanguage = function (fallbackLanguage) {
            this._fallbackLanguage = fallbackLanguage;
            this.component.saveComponentSettings();
        };
        /**
         * Add textRecourses to the allready existing ones.
         * If a resource with same namespace and languagecode exist allready, the existing one is replaced.
         *
         * @memberof TextProvider
         */
        TextProvider.prototype.addOrReplaceTextRecourses = function (textResources) {
            this._resources.addReplaceArrayOfTextResources(textResources);
            this.component.saveComponentSettings();
        };
        /**
         * Returns the requested text, a fallback text or an error text.
         * In case of an error the error is included in the returned error container
         *
         * @param {string} namespace
         * @param {string} textID
         * @param {*} [languageCode=this.fallbackLanguage]
         * @returns {string}
         * @memberof TextSystem
         */
        TextProvider.prototype.getRawText = function (namespace, textID, languageCode) {
            if (languageCode === void 0) { languageCode = this._selectedLanguage; }
            var text = textProviderHelper_1.TextFormatterHelper.getTextNoFallback(this._resources, namespace, textID, languageCode);
            // fallback 1: use fallback language
            if (!text.isValid()) {
                text = textProviderHelper_1.TextFormatterHelper.getTextNoFallback(this._resources, namespace, textID, this._fallbackLanguage);
            }
            // fallback 2: use system language
            if (!text.isValid()) {
                text = textProviderHelper_1.TextFormatterHelper.getTextNoFallback(this._resources, namespace, textID, this._systemLanguage);
            }
            // generate Error message
            if (!text.isValid()) {
                text.value = textSystemErrorHandler_1.TextSystemErrorHandler.getErrorMessageByNamespaceAndID(text.errors[0], namespace, textID);
            }
            return text;
        };
        /**
         * Returns the requested text, a fallback text or an error text
         *
         * @param {string} fullyQualifiedTextID
         * @param {*} [languageCode=this._selectedLanguage]
         * @returns {string}
         * @memberof TextProvider
         */
        TextProvider.prototype.getRawTextByFullyQualifiedTextId = function (fullyQualifiedTextID, languageCode) {
            if (languageCode === void 0) { languageCode = this._selectedLanguage; }
            // retrieve namespace and textId
            var textQualifier = textProviderHelper_1.TextFormatterHelper.decodeFullyQualifiedTextId(fullyQualifiedTextID);
            return this.getRawText(textQualifier.namespace, textQualifier.textId, languageCode);
        };
        /**
         * Returns the text with resolved format items
         *
         * @param {string} namespace
         * @param {string} textID
         * @param {FormatterInputArgumentList} formatterArgs
         * @param {*} [languageCode=this._selectedLanguage]
         * @returns {string}
         * @memberof TextProvider
         */
        TextProvider.prototype.getFormattedText = function (namespace, textID, formatterArgs, languageCode) {
            if (languageCode === void 0) { languageCode = this._selectedLanguage; }
            // get the text that the formatter should work with
            var text = this.getRawText(namespace, textID, languageCode);
            if (text.isValid()) {
                // prepare a referece the this text system, so that the formatter can get a text if required (e.g. to resolve a format item such as {$someNamespace/someTextId})
                var textSystemInterface = this;
                // format the raw text
                var formatter = new textFormatter_1.TextFormatter();
                text = formatter.formatText(text.value, textSystemInterface, formatterArgs, languageCode);
            }
            else {
                // the text data could not be found
                text.value = textSystemErrorHandler_1.TextSystemErrorHandler.getErrorMessageByNamespaceAndID(text.errors[0], namespace, textID);
            }
            return text;
        };
        return TextProvider;
    }());
    exports.TextProvider = TextProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dFByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vdGV4dFByb3ZpZGVyL3RleHRQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFnQkE7Ozs7Ozs7OztPQVNHO0lBQ0g7UUE4Q0k7Ozs7V0FJRztRQUNIO1lBakRBOzs7Ozs7ZUFNRztZQUNLLHNCQUFpQixHQUFXLEVBQUUsQ0FBQztZQUV2Qzs7Ozs7O2VBTUc7WUFDSyxzQkFBaUIsR0FBVyxFQUFFLENBQUM7WUFFdkM7Ozs7OztlQU1HO1lBQ2Msb0JBQWUsR0FBRyw2QkFBYSxDQUFDLE9BQU8sQ0FBQztZQUV6RDs7Ozs7O2VBTUc7WUFDSyxlQUFVLEdBQTJCLElBQUksK0NBQXNCLEVBQUUsQ0FBQztZQUUxRTs7Ozs7ZUFLRztZQUNJLGNBQVMsR0FBa0IsSUFBSSw2QkFBYSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQU85QyxDQUFDO1FBRXhCOzs7O1dBSUc7UUFDSSwwQ0FBbUIsR0FBMUI7WUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLElBQUksdURBQTBCLEVBQUUsQ0FBQyxDQUFDO1FBQzFFLENBQUM7UUFFRDs7OztXQUlHO1FBQ0ksaUNBQVUsR0FBakI7WUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDM0MsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSSw4QkFBTyxHQUFkO1lBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNwQyxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNJLDRCQUFLLEdBQVo7WUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUMzQyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSwyQ0FBb0IsR0FBM0I7WUFD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QyxVQUFVLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQztZQUV0RSxJQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDZixnS0FBZ0s7Z0JBQ2hLLElBQUksbUJBQW1CLEdBQW1CLElBQUksQ0FBQztnQkFFL0Msc0JBQXNCO2dCQUN0QixJQUFJLFNBQVMsR0FBbUIsSUFBSSw2QkFBYSxFQUFFLENBQUM7Z0JBQ3BELElBQUksR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsbUJBQW1CLEVBQUUsYUFBYSxFQUFFLFlBQVksQ0FBQyxDQUFDO2FBQzdGO2lCQUNJO2dCQUNELG1DQUFtQztnQkFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRywrQ0FBc0IsQ0FBQywrQkFBK0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQzthQUMxRztZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDTCxtQkFBQztJQUFELENBQUMsQUE3UEQsSUE2UEM7SUE3UFksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJVGV4dFByb3ZpZGVyIH0gZnJvbSBcIi4vaW50ZXJmYWNlL3RleHRQcm92aWRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiB9IGZyb20gXCIuL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50QmFzZSB9IGZyb20gXCIuLi9jb21wb25lbnRCYXNlL2NvbXBvbmVudEJhc2VcIjtcclxuaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRleHRSZXNvdXJjZSB9IGZyb20gXCIuL3RleHRSZXNvdXJjZVwiO1xyXG5pbXBvcnQgeyBMYW5ndWFnZUNvZGVzIH0gZnJvbSBcIi4vbGFuZ3VhZ2VDb2Rlc1wiO1xyXG5pbXBvcnQgeyBTZXR0aW5nSWRzIH0gZnJvbSBcIi4vc2V0dGluZ0lkc1wiO1xyXG5pbXBvcnQgeyBUZXh0Rm9ybWF0dGVyIH0gZnJvbSBcIi4vdGV4dEZvcm1hdHRlci90ZXh0Rm9ybWF0dGVyXCI7XHJcbmltcG9ydCB7IEZvcm1hdHRlcklucHV0QXJndW1lbnRMaXN0IH0gZnJvbSBcIi4vdGV4dEZvcm1hdHRlci9mb3JtYXR0ZXJJbnB1dEFyZ3VtZW50cy9mb3JtYXR0ZXJJbnB1dEFyZ3VtZW50TGlzdFwiO1xyXG5pbXBvcnQgeyBUZXh0SXRlbSB9IGZyb20gXCIuL3RleHRJdGVtXCI7XHJcbmltcG9ydCB7IFRleHRSZXNvdXJjZXNDb250YWluZXIgfSBmcm9tIFwiLi90ZXh0UmVzb3VyY2VzQ29udGFpbmVyXCI7XHJcbmltcG9ydCB7IFRleHRTeXN0ZW1FcnJvckhhbmRsZXIgfSBmcm9tIFwiLi90ZXh0U3lzdGVtRXJyb3JIYW5kbGVyXCI7XHJcbmltcG9ydCB7IFRleHRGb3JtYXR0ZXJIZWxwZXIgfSBmcm9tIFwiLi90ZXh0UHJvdmlkZXJIZWxwZXJcIjtcclxuaW1wb3J0IHsgSVRleHRGb3JtYXR0ZXIgfSBmcm9tIFwiLi9pbnRlcmZhY2UvdGV4dEZvcm1hdHRlckludGVyZmFjZVwiO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgaGFuZGxlcyBwcm92aWRlcyBhY2Nlc3MgdG8gYWxsIG11bHRpbGFuZ3VhZ2UgdGV4dHNcclxuICogVGV4dHMgYXJlIHBhY2thZ2VkIGluIGxhbmd1YWdlcyBhbmQgbmFtZXNwYWNlc1xyXG4gKiBGb3Igc2VhcmNoaW5nIGZvciB0ZXh0cmVzb3VyY2VzIHRoZSBoaXJhcmNoeSBpczogbGFuZ3VhZ2UgLT4gbmFtZXBzYWdlIC0+IFRleHRJRFxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBUZXh0UHJvdmlkZXJcclxuICogQGV4dGVuZHMge0NvbXBvbmVudFdpdGhvdXRTZXR0aW5nc0Jhc2V9XHJcbiAqIEBpbXBsZW1lbnRzIHtJVGV4dFByb3ZpZGVyfVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRleHRQcm92aWRlciBpbXBsZW1lbnRzIElUZXh0UHJvdmlkZXJ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBdCBmaXJzdCB0aGUgVGV4dFN5c3RlbSB0cmllcyB0byBmaW5kIHRoZSBuYW1lc3BhY2Ugd2l0aCB0aGUgX3NlbGVjdGVkTGFuZ3VhZ2UgYXMgbGFuZ3VhZ2Vjb2RlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3NlbGVjdGVkTGFuZ3VhZ2U6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJZiB0aGVyZSBpcyBubyBuYW1lc3BhY2UgZm91bmQgd2l0aCB0aGUgX3NlbGVjdGVkTGFuZ3VhZ2UgYXMgbGFuZ3VhZ2Vjb2RlLCB0aGUgX2ZhbGxiYWNrTGFuZ3VhZ2UgaXMgdXNlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFRleHRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9mYWxsYmFja0xhbmd1YWdlOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSWYgdGhlcmUgaXMgYWxzbyBubyBuYW1lc3BhY2UgZm91bmQgd2l0aCB0aGUgX2ZhbGxiYWNrTGFuZ3VhZ2UgYXMgbGFuZ3VhZ2Vjb2RlLCB0aGUgX3N5c3RlbUxhbmd1YWdlIGlzIHVzZWRcclxuICAgICAqIFRoZSBzeXN0ZW0gbGFuZ3VhZ2Ugb2YgdGhlIFRleHRTeXN0ZW0gaXMgZW5nbGlzaCBcclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUZXh0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfc3lzdGVtTGFuZ3VhZ2UgPSBMYW5ndWFnZUNvZGVzLmVuZ2xpc2g7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7VGV4dFJlc291cmNlc0NvbnRhaW5lcn1cclxuICAgICAqIEBtZW1iZXJvZiBUZXh0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfcmVzb3VyY2VzOiBUZXh0UmVzb3VyY2VzQ29udGFpbmVyID0gbmV3IFRleHRSZXNvdXJjZXNDb250YWluZXIoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIElzIHVzZWQgZm9yIHBlcnNpc3RpbmcgdGhlIFRleHRTeXN0ZW1cclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7Q29tcG9uZW50QmFzZX1cclxuICAgICAqIEBtZW1iZXJvZiBUZXh0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbXBvbmVudDogQ29tcG9uZW50QmFzZSA9IG5ldyBDb21wb25lbnRCYXNlKHVuZGVmaW5lZCwgdGhpcyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFRleHRQcm92aWRlci5cclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlcm9mIFRleHRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IgKCkge31cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIHRoZSBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0RGVmYXVsdERlZmluaXRpb24obmV3IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgdGhlIHBlcmlzdGVkIGRhdGEgZm9yIHRoZSBUZXh0U3lzdGVtXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRleHRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW5pdGlhbGl6ZSgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmxvYWRDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZXMgdGhpcyBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXNwb3NlKCl7XHJcbiAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmNsZWFyQWxsVGV4dHMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogXHJcbiAgICAgKiBDbGVhcnMgYWxsIHRoZSBkYXRhIG9mIHRoaXMgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRleHRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xlYXIoKXtcclxuICAgICAgICB0aGlzLl9yZXNvdXJjZXMuY2xlYXJBbGxUZXh0cygpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNhdmVDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgY3VycmVudCBDb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnRTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBUZXh0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldENvbXBvbmVudFNldHRpbmdzKCk6IENvbXBvbmVudFNldHRpbmdzIHtcclxuICAgICAgICAvLyBHZXQgYSB2YWxpZCBmb3JtYXQgZm9yIHBlcnNpdGluZyB0aGUgdGV4dHJlc291cmNlc1xyXG4gICAgICAgIGxldCB0ZXh0UmVzb3VyY2VzQXNTZXR0aW5nczogQXJyYXk8SVNldHRpbmdzPiA9IHRoaXMuX3Jlc291cmNlcy5nZXRSZWNvdXJzZXNTZXR0aW5ncygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHBlcnNpc3QgdGhlIHNlbGVjdGVkTGFuZ3VhZ2UsIGZhbGxiYWNrTGFuZ3VhZ2UgYW5kIHJlY291cnNlc1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldFNldHRpbmcoU2V0dGluZ0lkcy5UZXh0UmVzb3VyY2VzLCB0ZXh0UmVzb3VyY2VzQXNTZXR0aW5ncyk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0U2V0dGluZyhTZXR0aW5nSWRzLlNlbGVjdGVkTGFuZ3VhZ2UsIHRoaXMuX3NlbGVjdGVkTGFuZ3VhZ2UpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldFNldHRpbmcoU2V0dGluZ0lkcy5GYWxsYmFja0xhbmd1YWdlLCB0aGlzLl9mYWxsYmFja0xhbmd1YWdlKTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGdpdmVuIENvbXBvbmVudFNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsoQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVkKX0gc2V0dGluZ3NcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRDb21wb25lbnRTZXR0aW5ncyhzZXR0aW5nczogQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmNsZWFyQWxsVGV4dHMoKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXRDb21wb25lbnRTZXR0aW5ncyhzZXR0aW5ncyk7XHJcblxyXG4gICAgICAgIGlmKHNldHRpbmdzID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAvLyBsb2FkIHRoZSBzZWxlY3RlZExhbmd1YWdlLCBmYWxsYmFja0xhbmd1YWdlIGFuZCByZWNvdXJzZXMgZnJvbSB0aGUgY29tcG9uZW50XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRMYW5ndWFnZSA9IHRoaXMuY29tcG9uZW50LmdldFNldHRpbmcoU2V0dGluZ0lkcy5TZWxlY3RlZExhbmd1YWdlKSBhcyBzdHJpbmc7XHJcbiAgICAgICAgdGhpcy5fZmFsbGJhY2tMYW5ndWFnZSA9IHRoaXMuY29tcG9uZW50LmdldFNldHRpbmcoU2V0dGluZ0lkcy5GYWxsYmFja0xhbmd1YWdlKSBhcyBzdHJpbmc7XHJcbiAgICAgICAgbGV0IHRleHRSZXNvdXJjZXNTZXR0aW5ncyA6IEFycmF5PElTZXR0aW5ncz4gPSB0aGlzLmNvbXBvbmVudC5nZXRTZXR0aW5nKFNldHRpbmdJZHMuVGV4dFJlc291cmNlcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGV4dFJlc291cmNlc1NldHRpbmdzID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47IFxyXG4gICAgICAgIH0gICAgICAgIFxyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIGNvcnJlY3QgcmVzb3VyY2UgdHlwZSBmcm9tIHNldHRpbmdzIGFycmF5XHJcbiAgICAgICAgdGV4dFJlc291cmNlc1NldHRpbmdzLmZvckVhY2godGV4dFJlc291cmNlc1NldHRpbmcgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdGV4dFJlc291cmNlID0gVGV4dFJlc291cmNlLmNyZWF0ZSh0ZXh0UmVzb3VyY2VzU2V0dGluZyk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcy5hZGRSZXBsYWNlVGV4dFJlc291cmNlKHRleHRSZXNvdXJjZSk7XHJcbiAgICAgICAgfSk7ICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHNlbGVjdGVkIGxhbmd1YWdlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsoQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVkKX0gc2V0dGluZ3NcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRTZWxlY3RlZExhbmd1YWdlKHNlbGVjdGVkTGFuZ3VhZ2U6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkTGFuZ3VhZ2UgPSBzZWxlY3RlZExhbmd1YWdlO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNhdmVDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBmYWxsYmFjayBsYW5ndWFnZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7KENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZCl9IHNldHRpbmdzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFRleHRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0RmFsbGJhY2tMYW5ndWFnZShmYWxsYmFja0xhbmd1YWdlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9mYWxsYmFja0xhbmd1YWdlID0gZmFsbGJhY2tMYW5ndWFnZTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zYXZlQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCB0ZXh0UmVjb3Vyc2VzIHRvIHRoZSBhbGxyZWFkeSBleGlzdGluZyBvbmVzLiBcclxuICAgICAqIElmIGEgcmVzb3VyY2Ugd2l0aCBzYW1lIG5hbWVzcGFjZSBhbmQgbGFuZ3VhZ2Vjb2RlIGV4aXN0IGFsbHJlYWR5LCB0aGUgZXhpc3Rpbmcgb25lIGlzIHJlcGxhY2VkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUZXh0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZE9yUmVwbGFjZVRleHRSZWNvdXJzZXModGV4dFJlc291cmNlczogQXJyYXk8VGV4dFJlc291cmNlPikge1xyXG4gICAgICAgIHRoaXMuX3Jlc291cmNlcy5hZGRSZXBsYWNlQXJyYXlPZlRleHRSZXNvdXJjZXModGV4dFJlc291cmNlcyk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2F2ZUNvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgcmVxdWVzdGVkIHRleHQsIGEgZmFsbGJhY2sgdGV4dCBvciBhbiBlcnJvciB0ZXh0LlxyXG4gICAgICogSW4gY2FzZSBvZiBhbiBlcnJvciB0aGUgZXJyb3IgaXMgaW5jbHVkZWQgaW4gdGhlIHJldHVybmVkIGVycm9yIGNvbnRhaW5lclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lc3BhY2VcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0SURcclxuICAgICAqIEBwYXJhbSB7Kn0gW2xhbmd1YWdlQ29kZT10aGlzLmZhbGxiYWNrTGFuZ3VhZ2VdXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFRleHRTeXN0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFJhd1RleHQobmFtZXNwYWNlOiBzdHJpbmcsIHRleHRJRDpzdHJpbmcsIGxhbmd1YWdlQ29kZSA9IHRoaXMuX3NlbGVjdGVkTGFuZ3VhZ2UpOiBUZXh0SXRlbSB7XHJcblxyXG4gICAgICAgIGxldCB0ZXh0OiBUZXh0SXRlbSA9IFRleHRGb3JtYXR0ZXJIZWxwZXIuZ2V0VGV4dE5vRmFsbGJhY2sodGhpcy5fcmVzb3VyY2VzLCBuYW1lc3BhY2UsIHRleHRJRCwgbGFuZ3VhZ2VDb2RlKTtcclxuXHJcbiAgICAgICAgLy8gZmFsbGJhY2sgMTogdXNlIGZhbGxiYWNrIGxhbmd1YWdlXHJcbiAgICAgICAgaWYoIXRleHQuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIHRleHQgPSBUZXh0Rm9ybWF0dGVySGVscGVyLmdldFRleHROb0ZhbGxiYWNrKHRoaXMuX3Jlc291cmNlcywgbmFtZXNwYWNlLCB0ZXh0SUQsIHRoaXMuX2ZhbGxiYWNrTGFuZ3VhZ2UpOyAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGZhbGxiYWNrIDI6IHVzZSBzeXN0ZW0gbGFuZ3VhZ2VcclxuICAgICAgICBpZighdGV4dC5pc1ZhbGlkKCkpe1xyXG4gICAgICAgICAgICB0ZXh0ID0gVGV4dEZvcm1hdHRlckhlbHBlci5nZXRUZXh0Tm9GYWxsYmFjayh0aGlzLl9yZXNvdXJjZXMsIG5hbWVzcGFjZSwgdGV4dElELCB0aGlzLl9zeXN0ZW1MYW5ndWFnZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBnZW5lcmF0ZSBFcnJvciBtZXNzYWdlXHJcbiAgICAgICAgaWYoIXRleHQuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIHRleHQudmFsdWUgPSBUZXh0U3lzdGVtRXJyb3JIYW5kbGVyLmdldEVycm9yTWVzc2FnZUJ5TmFtZXNwYWNlQW5kSUQodGV4dC5lcnJvcnNbMF0sIG5hbWVzcGFjZSwgdGV4dElEKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0ZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgcmVxdWVzdGVkIHRleHQsIGEgZmFsbGJhY2sgdGV4dCBvciBhbiBlcnJvciB0ZXh0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZ1bGx5UXVhbGlmaWVkVGV4dElEXHJcbiAgICAgKiBAcGFyYW0geyp9IFtsYW5ndWFnZUNvZGU9dGhpcy5fc2VsZWN0ZWRMYW5ndWFnZV1cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRSYXdUZXh0QnlGdWxseVF1YWxpZmllZFRleHRJZChmdWxseVF1YWxpZmllZFRleHRJRCA6IHN0cmluZywgbGFuZ3VhZ2VDb2RlID0gdGhpcy5fc2VsZWN0ZWRMYW5ndWFnZSk6IFRleHRJdGVtIHtcclxuICAgICAgICBcclxuICAgICAgICAvLyByZXRyaWV2ZSBuYW1lc3BhY2UgYW5kIHRleHRJZFxyXG4gICAgICAgIGxldCB0ZXh0UXVhbGlmaWVyID0gVGV4dEZvcm1hdHRlckhlbHBlci5kZWNvZGVGdWxseVF1YWxpZmllZFRleHRJZChmdWxseVF1YWxpZmllZFRleHRJRCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFJhd1RleHQodGV4dFF1YWxpZmllci5uYW1lc3BhY2UsIHRleHRRdWFsaWZpZXIudGV4dElkLCBsYW5ndWFnZUNvZGUpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRleHQgd2l0aCByZXNvbHZlZCBmb3JtYXQgaXRlbXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZXNwYWNlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dElEXHJcbiAgICAgKiBAcGFyYW0ge0Zvcm1hdHRlcklucHV0QXJndW1lbnRMaXN0fSBmb3JtYXR0ZXJBcmdzXHJcbiAgICAgKiBAcGFyYW0geyp9IFtsYW5ndWFnZUNvZGU9dGhpcy5fc2VsZWN0ZWRMYW5ndWFnZV1cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRGb3JtYXR0ZWRUZXh0KG5hbWVzcGFjZTogc3RyaW5nLCB0ZXh0SUQ6c3RyaW5nLCBmb3JtYXR0ZXJBcmdzIDogRm9ybWF0dGVySW5wdXRBcmd1bWVudExpc3QsIGxhbmd1YWdlQ29kZSA9IHRoaXMuX3NlbGVjdGVkTGFuZ3VhZ2UpOiBUZXh0SXRlbSB7XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgdGV4dCB0aGF0IHRoZSBmb3JtYXR0ZXIgc2hvdWxkIHdvcmsgd2l0aFxyXG4gICAgICAgIGxldCB0ZXh0OiBUZXh0SXRlbSA9IHRoaXMuZ2V0UmF3VGV4dChuYW1lc3BhY2UsIHRleHRJRCwgbGFuZ3VhZ2VDb2RlKTtcclxuXHJcbiAgICAgICAgaWYodGV4dC5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgLy8gcHJlcGFyZSBhIHJlZmVyZWNlIHRoZSB0aGlzIHRleHQgc3lzdGVtLCBzbyB0aGF0IHRoZSBmb3JtYXR0ZXIgY2FuIGdldCBhIHRleHQgaWYgcmVxdWlyZWQgKGUuZy4gdG8gcmVzb2x2ZSBhIGZvcm1hdCBpdGVtIHN1Y2ggYXMgeyRzb21lTmFtZXNwYWNlL3NvbWVUZXh0SWR9KVxyXG4gICAgICAgICAgICBsZXQgdGV4dFN5c3RlbUludGVyZmFjZSA6IElUZXh0UHJvdmlkZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gZm9ybWF0IHRoZSByYXcgdGV4dFxyXG4gICAgICAgICAgICBsZXQgZm9ybWF0dGVyOiBJVGV4dEZvcm1hdHRlciA9IG5ldyBUZXh0Rm9ybWF0dGVyKCk7XHJcbiAgICAgICAgICAgIHRleHQgPSBmb3JtYXR0ZXIuZm9ybWF0VGV4dCh0ZXh0LnZhbHVlLCB0ZXh0U3lzdGVtSW50ZXJmYWNlLCBmb3JtYXR0ZXJBcmdzLCBsYW5ndWFnZUNvZGUpOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHRoZSB0ZXh0IGRhdGEgY291bGQgbm90IGJlIGZvdW5kXHJcbiAgICAgICAgICAgIHRleHQudmFsdWUgPSBUZXh0U3lzdGVtRXJyb3JIYW5kbGVyLmdldEVycm9yTWVzc2FnZUJ5TmFtZXNwYWNlQW5kSUQodGV4dC5lcnJvcnNbMF0sIG5hbWVzcGFjZSwgdGV4dElEKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0ZXh0O1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbiJdfQ==