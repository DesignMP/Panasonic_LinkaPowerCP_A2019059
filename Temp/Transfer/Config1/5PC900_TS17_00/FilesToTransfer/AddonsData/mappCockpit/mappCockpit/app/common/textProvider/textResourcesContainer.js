define(["require", "exports", "./textFormatter/editStringHelper"], function (require, exports, editStringHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Holds all available TextResources
     *
     * @export
     * @class TextResourcesContainer
     */
    var TextResourcesContainer = /** @class */ (function () {
        function TextResourcesContainer() {
            this._textData = new Array();
        }
        /**
         * Finds a TextResource by the passed namespace and language Code
         * If no TextResource is found undefined is returned
         *
         * @param {string} namespace
         * @param {string} languageCode
         * @return {*}  {(TextResource | undefined)}
         * @memberof TextResourceContainer
         */
        TextResourcesContainer.prototype.getTextResource = function (namespace, languageCode) {
            return this._textData.find(function (textResource) { return textResource.namespace === namespace && textResource.languageCode === languageCode; });
        };
        /**
         * This method allows to add a new namespace with texts.
         * If the namespace exists in the given languages, the existing one is completely replaced.
         *
         * @param {TextResource} textResource
         * @memberof TextResourcesContainer
         */
        TextResourcesContainer.prototype.addReplaceTextResource = function (textResource) {
            // Search for the position of allready existing textResources with similar namespace and languagecode
            var index = this._textData.findIndex(function (entry) { return (entry.namespace === textResource.namespace && entry.languageCode === textResource.languageCode); });
            // If the index is valid, the textResource is replaced in the position of the index, otherwise the textResource is added
            if (editStringHelper_1.EditStringHelper.indexIsValid(index)) {
                this._textData.splice(index, 1, textResource);
            }
            else {
                this._textData.push(textResource);
            }
        };
        /**
         * This method allows to add several new textResources.
         * If a namespace exists in the given languages, the existing one is completely replaced.
         *
         * @param {Array<TextResource>} textResources
         * @memberof TextResourcesContainer
         */
        TextResourcesContainer.prototype.addReplaceArrayOfTextResources = function (textResources) {
            var _this = this;
            textResources.forEach(function (textResource) {
                _this.addReplaceTextResource(textResource);
            });
        };
        /**
         * Get all textResources in a suitable format for persisting
         *
         * @memberof TextResourcesContainer
         */
        TextResourcesContainer.prototype.getRecoursesSettings = function () {
            var textResourcesAsSettings = new Array();
            this._textData.forEach(function (resource) {
                textResourcesAsSettings.push(resource.getSettings());
            });
            return textResourcesAsSettings;
        };
        /**
         * All elements are deleted (also if this array is accessed by other references)
         *
         * @memberof TextResourcesContainer
         */
        TextResourcesContainer.prototype.clearAllTexts = function () {
            this._textData.splice(0, this._textData.length);
        };
        return TextResourcesContainer;
    }());
    exports.TextResourcesContainer = TextResourcesContainer;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dFJlc291cmNlc0NvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3RleHRQcm92aWRlci90ZXh0UmVzb3VyY2VzQ29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUlBOzs7OztPQUtHO0lBQ0g7UUFXSTtZQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQWdCLENBQUM7UUFDL0MsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0ksZ0RBQWUsR0FBdEIsVUFBdUIsU0FBaUIsRUFBRSxZQUFvQjtZQUUxRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFFLFVBQUEsWUFBWSxJQUFJLE9BQUEsWUFBWSxDQUFDLFNBQVMsS0FBSyxTQUFTLElBQUksWUFBWSxDQUFDLFlBQVksS0FBSyxZQUFZLEVBQWxGLENBQWtGLENBQUMsQ0FBQztRQUNwSSxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksdURBQXNCLEdBQTdCLFVBQThCLFlBQTJCO1lBRXJELHFHQUFxRztZQUNyRyxJQUFJLEtBQUssR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxZQUFZLENBQUMsU0FBUyxJQUFJLEtBQUssQ0FBQyxZQUFZLEtBQUssWUFBWSxDQUFDLFlBQVksQ0FBQyxFQUFoRyxDQUFnRyxDQUFDLENBQUM7WUFFeEosd0hBQXdIO1lBQ3hILElBQUcsbUNBQWdCLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO2FBQ2pEO2lCQUNJO2dCQUNELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ3JDO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLCtEQUE4QixHQUFyQyxVQUFzQyxhQUFtQztZQUF6RSxpQkFJQztZQUhHLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQSxZQUFZO2dCQUM5QixLQUFJLENBQUMsc0JBQXNCLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDOUMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNJLHFEQUFvQixHQUEzQjtZQUVJLElBQUksdUJBQXVCLEdBQXFCLElBQUksS0FBSyxFQUFhLENBQUM7WUFFdkUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxRQUFRO2dCQUM1Qix1QkFBdUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7WUFDekQsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLHVCQUF1QixDQUFDO1FBQ25DLENBQUM7UUFFRDs7OztXQUlHO1FBQ0ksOENBQWEsR0FBcEI7WUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBQ0wsNkJBQUM7SUFBRCxDQUFDLEFBdkZELElBdUZDO0lBdkZZLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElTZXR0aW5ncyB9IGZyb20gXCIuLi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEVkaXRTdHJpbmdIZWxwZXIgfSBmcm9tIFwiLi90ZXh0Rm9ybWF0dGVyL2VkaXRTdHJpbmdIZWxwZXJcIjtcclxuaW1wb3J0IHsgVGV4dFJlc291cmNlIH0gZnJvbSBcIi4vdGV4dFJlc291cmNlXCI7XHJcblxyXG4vKipcclxuICogSG9sZHMgYWxsIGF2YWlsYWJsZSBUZXh0UmVzb3VyY2VzXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIFRleHRSZXNvdXJjZXNDb250YWluZXJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUZXh0UmVzb3VyY2VzQ29udGFpbmVyIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnRhaW5lciBob2xkaW5nIGFsbCBkZWNsYXJlZCB0ZXh0UmVzb3VyY2VzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHtBcnJheTxUZXh0UmVzb3VyY2U+fVxyXG4gICAgICogQG1lbWJlcm9mIFRleHRSZXNvdXJjZUNvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF90ZXh0RGF0YTogQXJyYXk8VGV4dFJlc291cmNlPjtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fdGV4dERhdGEgPSBuZXcgQXJyYXk8VGV4dFJlc291cmNlPigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmluZHMgYSBUZXh0UmVzb3VyY2UgYnkgdGhlIHBhc3NlZCBuYW1lc3BhY2UgYW5kIGxhbmd1YWdlIENvZGVcclxuICAgICAqIElmIG5vIFRleHRSZXNvdXJjZSBpcyBmb3VuZCB1bmRlZmluZWQgaXMgcmV0dXJuZWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZXNwYWNlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2VDb2RlXHJcbiAgICAgKiBAcmV0dXJuIHsqfSAgeyhUZXh0UmVzb3VyY2UgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFRleHRSZXNvdXJjZUNvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0VGV4dFJlc291cmNlKG5hbWVzcGFjZTogc3RyaW5nLCBsYW5ndWFnZUNvZGU6IHN0cmluZykgOiBUZXh0UmVzb3VyY2UgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzLl90ZXh0RGF0YS5maW5kKCB0ZXh0UmVzb3VyY2UgPT4gdGV4dFJlc291cmNlLm5hbWVzcGFjZSA9PT0gbmFtZXNwYWNlICYmIHRleHRSZXNvdXJjZS5sYW5ndWFnZUNvZGUgPT09IGxhbmd1YWdlQ29kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBhbGxvd3MgdG8gYWRkIGEgbmV3IG5hbWVzcGFjZSB3aXRoIHRleHRzLiBcclxuICAgICAqIElmIHRoZSBuYW1lc3BhY2UgZXhpc3RzIGluIHRoZSBnaXZlbiBsYW5ndWFnZXMsIHRoZSBleGlzdGluZyBvbmUgaXMgY29tcGxldGVseSByZXBsYWNlZC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1RleHRSZXNvdXJjZX0gdGV4dFJlc291cmNlXHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dFJlc291cmNlc0NvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkUmVwbGFjZVRleHRSZXNvdXJjZSh0ZXh0UmVzb3VyY2UgOiBUZXh0UmVzb3VyY2Upe1xyXG5cclxuICAgICAgICAvLyBTZWFyY2ggZm9yIHRoZSBwb3NpdGlvbiBvZiBhbGxyZWFkeSBleGlzdGluZyB0ZXh0UmVzb3VyY2VzIHdpdGggc2ltaWxhciBuYW1lc3BhY2UgYW5kIGxhbmd1YWdlY29kZVxyXG4gICAgICAgIGxldCBpbmRleDogbnVtYmVyID0gdGhpcy5fdGV4dERhdGEuZmluZEluZGV4KGVudHJ5ID0+IChlbnRyeS5uYW1lc3BhY2UgPT09IHRleHRSZXNvdXJjZS5uYW1lc3BhY2UgJiYgZW50cnkubGFuZ3VhZ2VDb2RlID09PSB0ZXh0UmVzb3VyY2UubGFuZ3VhZ2VDb2RlKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gSWYgdGhlIGluZGV4IGlzIHZhbGlkLCB0aGUgdGV4dFJlc291cmNlIGlzIHJlcGxhY2VkIGluIHRoZSBwb3NpdGlvbiBvZiB0aGUgaW5kZXgsIG90aGVyd2lzZSB0aGUgdGV4dFJlc291cmNlIGlzIGFkZGVkXHJcbiAgICAgICAgaWYoRWRpdFN0cmluZ0hlbHBlci5pbmRleElzVmFsaWQoaW5kZXgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RleHREYXRhLnNwbGljZShpbmRleCwgMSwgdGV4dFJlc291cmNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RleHREYXRhLnB1c2godGV4dFJlc291cmNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBhbGxvd3MgdG8gYWRkIHNldmVyYWwgbmV3IHRleHRSZXNvdXJjZXMuIFxyXG4gICAgICogSWYgYSBuYW1lc3BhY2UgZXhpc3RzIGluIHRoZSBnaXZlbiBsYW5ndWFnZXMsIHRoZSBleGlzdGluZyBvbmUgaXMgY29tcGxldGVseSByZXBsYWNlZC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PFRleHRSZXNvdXJjZT59IHRleHRSZXNvdXJjZXNcclxuICAgICAqIEBtZW1iZXJvZiBUZXh0UmVzb3VyY2VzQ29udGFpbmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRSZXBsYWNlQXJyYXlPZlRleHRSZXNvdXJjZXModGV4dFJlc291cmNlcyA6IEFycmF5PFRleHRSZXNvdXJjZT4pe1xyXG4gICAgICAgIHRleHRSZXNvdXJjZXMuZm9yRWFjaCh0ZXh0UmVzb3VyY2UgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFJlcGxhY2VUZXh0UmVzb3VyY2UodGV4dFJlc291cmNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBhbGwgdGV4dFJlc291cmNlcyBpbiBhIHN1aXRhYmxlIGZvcm1hdCBmb3IgcGVyc2lzdGluZ1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUZXh0UmVzb3VyY2VzQ29udGFpbmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRSZWNvdXJzZXNTZXR0aW5ncygpOiBBcnJheTxJU2V0dGluZ3M+IHtcclxuXHJcbiAgICAgICAgbGV0IHRleHRSZXNvdXJjZXNBc1NldHRpbmdzOiBBcnJheTxJU2V0dGluZ3M+ID0gbmV3IEFycmF5PElTZXR0aW5ncz4oKTtcclxuXHJcbiAgICAgICAgdGhpcy5fdGV4dERhdGEuZm9yRWFjaCgocmVzb3VyY2UpID0+IHtcclxuICAgICAgICAgICAgdGV4dFJlc291cmNlc0FzU2V0dGluZ3MucHVzaChyZXNvdXJjZS5nZXRTZXR0aW5ncygpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRleHRSZXNvdXJjZXNBc1NldHRpbmdzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWxsIGVsZW1lbnRzIGFyZSBkZWxldGVkIChhbHNvIGlmIHRoaXMgYXJyYXkgaXMgYWNjZXNzZWQgYnkgb3RoZXIgcmVmZXJlbmNlcylcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dFJlc291cmNlc0NvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xlYXJBbGxUZXh0cygpIHtcclxuICAgICAgICB0aGlzLl90ZXh0RGF0YS5zcGxpY2UoMCx0aGlzLl90ZXh0RGF0YS5sZW5ndGgpO1xyXG4gICAgfVxyXG59Il19