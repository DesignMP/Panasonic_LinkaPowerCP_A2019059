define(["require", "exports", "../persistence/settings", "./textItem", "./settingIds", "./textSystemErrorType"], function (require, exports, settings_1, textItem_1, settingIds_1, textSystemErrorType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * A text resource includes all textData in a unique namespace + languageCode
     * Each text resource can have its own language cude
     *
     * @export
     * @class TextResource
     */
    var TextResource = /** @class */ (function () {
        /**
         * Creates an instance of TextResource.
         *
         * @param {string} namespace
         * @param {Map<string,string>} texts
         * @param {string} languageCode
         * @memberof TextResource
         */
        function TextResource(namespace, texts, languageCode) {
            /**
             * The keyvalue is the textID that is mapped to the string data
             *
             * @private
             * @memberof TextResource
             */
            this._textData = new Map();
            this._namespace = namespace;
            this._languageCode = languageCode;
            this._textData = texts;
        }
        Object.defineProperty(TextResource.prototype, "languageCode", {
            get: function () {
                return this._languageCode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextResource.prototype, "namespace", {
            get: function () {
                return this._namespace;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextResource.prototype, "textData", {
            get: function () {
                return this._textData;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Get the data from the passed textID
         * If there is no entry found an error gets pushed in the TextItem
         *
         * @param {string} textId
         * @return {*}  {TextItem}
         * @memberof TextResource
         */
        TextResource.prototype.getText = function (textId) {
            var text = this._textData.get(textId);
            var foundText = new textItem_1.TextItem();
            if (text !== undefined) {
                foundText.value = text;
            }
            else {
                foundText.errors.push(textSystemErrorType_1.TextSystemErrorTypes.RequestedTextNotFound);
            }
            return foundText;
        };
        /**
         * Prepare the TextResource to a suitable format for persiting
         *
         * @return {*}  {ISettings}
         * @memberof TextResource
         */
        TextResource.prototype.getSettings = function () {
            var settings = new settings_1.Settings(settingIds_1.SettingIds.TextResource);
            settings.setValue(settingIds_1.SettingIds.Namespace, this._namespace);
            settings.setValue(settingIds_1.SettingIds.LanguageCode, this._languageCode);
            settings.setValue(settingIds_1.SettingIds.TextData, this._textData);
            return settings;
        };
        /**
         * creates a textResource from persisting data
         *
         * @static
         * @param {ISettings} settings
         * @return {*}  {TextResource}
         * @memberof TextResource
         */
        TextResource.create = function (settings) {
            var settingsObj = settings_1.Settings.create(settings);
            var namespace = settingsObj.getValue(settingIds_1.SettingIds.Namespace);
            var languageCode = settingsObj.getValue(settingIds_1.SettingIds.LanguageCode);
            var textData = settingsObj.getValue(settingIds_1.SettingIds.TextData);
            return new TextResource(namespace, textData, languageCode);
        };
        return TextResource;
    }());
    exports.TextResource = TextResource;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dFJlc291cmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vdGV4dFByb3ZpZGVyL3RleHRSZXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFNQTs7Ozs7O09BTUc7SUFDSDtRQTRCSTs7Ozs7OztXQU9HO1FBQ0gsc0JBQW1CLFNBQWlCLEVBQUUsS0FBd0IsRUFBRSxZQUFvQjtZQWhCcEY7Ozs7O2VBS0c7WUFDSyxjQUFTLEdBQUcsSUFBSSxHQUFHLEVBQWlCLENBQUM7WUFXekMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7WUFDNUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUM7WUFDbEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDM0IsQ0FBQztRQUVELHNCQUFXLHNDQUFZO2lCQUF2QjtnQkFDSSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7WUFDOUIsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBVyxtQ0FBUztpQkFBcEI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQzNCLENBQUM7OztXQUFBO1FBRUQsc0JBQVcsa0NBQVE7aUJBQW5CO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUMxQixDQUFDOzs7V0FBQTtRQUVEOzs7Ozs7O1dBT0c7UUFDSSw4QkFBTyxHQUFkLFVBQWUsTUFBZTtZQUUxQixJQUFJLElBQUksR0FBdUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUQsSUFBSSxTQUFTLEdBQWEsSUFBSSxtQkFBUSxFQUFFLENBQUM7WUFFekMsSUFBRyxJQUFJLEtBQUssU0FBUyxFQUFFO2dCQUNuQixTQUFTLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQzthQUMxQjtpQkFDSTtnQkFDRCxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywwQ0FBb0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2FBQ3JFO1lBRUQsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ksa0NBQVcsR0FBbEI7WUFDSSxJQUFJLFFBQVEsR0FBRyxJQUFJLG1CQUFRLENBQUMsdUJBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUVyRCxRQUFRLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN6RCxRQUFRLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMvRCxRQUFRLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUV2RCxPQUFPLFFBQVEsQ0FBQztRQUNwQixDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNXLG1CQUFNLEdBQXBCLFVBQXFCLFFBQW9CO1lBRXJDLElBQUksV0FBVyxHQUFHLG1CQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVDLElBQUksU0FBUyxHQUFZLFdBQVcsQ0FBQyxRQUFRLENBQUMsdUJBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNwRSxJQUFJLFlBQVksR0FBWSxXQUFXLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDMUUsSUFBSSxRQUFRLEdBQXdCLFdBQVcsQ0FBQyxRQUFRLENBQUMsdUJBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUU5RSxPQUFPLElBQUksWUFBWSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDL0QsQ0FBQztRQUVMLG1CQUFDO0lBQUQsQ0FBQyxBQS9HRCxJQStHQztJQS9HWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElTZXR0aW5ncyB9IGZyb20gXCIuLi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIi4uL3BlcnNpc3RlbmNlL3NldHRpbmdzXCI7XHJcbmltcG9ydCB7IFRleHRJdGVtIH0gZnJvbSBcIi4vdGV4dEl0ZW1cIjtcclxuaW1wb3J0IHsgU2V0dGluZ0lkcyB9IGZyb20gXCIuL3NldHRpbmdJZHNcIjtcclxuaW1wb3J0IHsgVGV4dFN5c3RlbUVycm9yVHlwZXMgfSBmcm9tIFwiLi90ZXh0U3lzdGVtRXJyb3JUeXBlXCI7XHJcblxyXG4vKipcclxuICogQSB0ZXh0IHJlc291cmNlIGluY2x1ZGVzIGFsbCB0ZXh0RGF0YSBpbiBhIHVuaXF1ZSBuYW1lc3BhY2UgKyBsYW5ndWFnZUNvZGVcclxuICogRWFjaCB0ZXh0IHJlc291cmNlIGNhbiBoYXZlIGl0cyBvd24gbGFuZ3VhZ2UgY3VkZVxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBUZXh0UmVzb3VyY2VcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUZXh0UmVzb3VyY2Uge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVW5pcXVlIG5hbWVzcGFjZSBvZiB0aGUgdGV4dHJlc291cmNlIGluIGEgc3BlY2lmaWMgbGFuZ3VhZ2VcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBUZXh0UmVzb3VyY2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfbmFtZXNwYWNlIDogc3RyaW5nO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFNob3dzIHRoZSBsYW5nYXVnZSBvZiB0aGUgVGV4dFJlc291cmNlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dFJlc291cmNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2xhbmd1YWdlQ29kZSA6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBrZXl2YWx1ZSBpcyB0aGUgdGV4dElEIHRoYXQgaXMgbWFwcGVkIHRvIHRoZSBzdHJpbmcgZGF0YVxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRleHRSZXNvdXJjZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF90ZXh0RGF0YSA9IG5ldyBNYXA8c3RyaW5nLHN0cmluZz4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgVGV4dFJlc291cmNlLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZXNwYWNlXHJcbiAgICAgKiBAcGFyYW0ge01hcDxzdHJpbmcsc3RyaW5nPn0gdGV4dHNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZUNvZGVcclxuICAgICAqIEBtZW1iZXJvZiBUZXh0UmVzb3VyY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKG5hbWVzcGFjZTogc3RyaW5nLCB0ZXh0czpNYXA8c3RyaW5nLHN0cmluZz4sIGxhbmd1YWdlQ29kZTogc3RyaW5nKXtcclxuICAgICAgICB0aGlzLl9uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XHJcbiAgICAgICAgdGhpcy5fbGFuZ3VhZ2VDb2RlID0gbGFuZ3VhZ2VDb2RlO1xyXG4gICAgICAgIHRoaXMuX3RleHREYXRhID0gdGV4dHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBsYW5ndWFnZUNvZGUoKSA6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhbmd1YWdlQ29kZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG5hbWVzcGFjZSgpIDogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZXNwYWNlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IHRleHREYXRhKCkgOiBNYXA8c3RyaW5nLHN0cmluZz57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RleHREYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBkYXRhIGZyb20gdGhlIHBhc3NlZCB0ZXh0SURcclxuICAgICAqIElmIHRoZXJlIGlzIG5vIGVudHJ5IGZvdW5kIGFuIGVycm9yIGdldHMgcHVzaGVkIGluIHRoZSBUZXh0SXRlbVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0SWRcclxuICAgICAqIEByZXR1cm4geyp9ICB7VGV4dEl0ZW19XHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dFJlc291cmNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRUZXh0KHRleHRJZCA6IHN0cmluZykgOiBUZXh0SXRlbSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHRleHQ6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHRoaXMuX3RleHREYXRhLmdldCh0ZXh0SWQpO1xyXG4gICAgICAgIGxldCBmb3VuZFRleHQ6IFRleHRJdGVtID0gbmV3IFRleHRJdGVtKCk7XHJcbiAgICAgICBcclxuICAgICAgICBpZih0ZXh0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZm91bmRUZXh0LnZhbHVlID0gdGV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGZvdW5kVGV4dC5lcnJvcnMucHVzaChUZXh0U3lzdGVtRXJyb3JUeXBlcy5SZXF1ZXN0ZWRUZXh0Tm90Rm91bmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZvdW5kVGV4dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFByZXBhcmUgdGhlIFRleHRSZXNvdXJjZSB0byBhIHN1aXRhYmxlIGZvcm1hdCBmb3IgcGVyc2l0aW5nXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7Kn0gIHtJU2V0dGluZ3N9XHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dFJlc291cmNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRTZXR0aW5ncygpOiBJU2V0dGluZ3N7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0gbmV3IFNldHRpbmdzKFNldHRpbmdJZHMuVGV4dFJlc291cmNlKTsgICBcclxuXHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5OYW1lc3BhY2UsIHRoaXMuX25hbWVzcGFjZSk7XHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5MYW5ndWFnZUNvZGUsIHRoaXMuX2xhbmd1YWdlQ29kZSk7XHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5UZXh0RGF0YSwgdGhpcy5fdGV4dERhdGEpO1xyXG5cclxuICAgICAgICByZXR1cm4gc2V0dGluZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGVzIGEgdGV4dFJlc291cmNlIGZyb20gcGVyc2lzdGluZyBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtJU2V0dGluZ3N9IHNldHRpbmdzXHJcbiAgICAgKiBAcmV0dXJuIHsqfSAge1RleHRSZXNvdXJjZX1cclxuICAgICAqIEBtZW1iZXJvZiBUZXh0UmVzb3VyY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUoc2V0dGluZ3MgOiBJU2V0dGluZ3MpIDogVGV4dFJlc291cmNle1xyXG5cclxuICAgICAgICBsZXQgc2V0dGluZ3NPYmogPSBTZXR0aW5ncy5jcmVhdGUoc2V0dGluZ3MpO1xyXG4gICAgICAgIGxldCBuYW1lc3BhY2UgOiBzdHJpbmcgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLk5hbWVzcGFjZSk7XHJcbiAgICAgICAgbGV0IGxhbmd1YWdlQ29kZSA6IHN0cmluZyA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuTGFuZ3VhZ2VDb2RlKTtcclxuICAgICAgICBsZXQgdGV4dERhdGEgOiBNYXA8c3RyaW5nLHN0cmluZz4gPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLlRleHREYXRhKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBUZXh0UmVzb3VyY2UobmFtZXNwYWNlLCB0ZXh0RGF0YSwgbGFuZ3VhZ2VDb2RlKTtcclxuICAgIH1cclxuXHJcbn0iXX0=