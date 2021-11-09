define(["require", "exports", "./textItem", "./textQualifier", "./textSystemErrorType"], function (require, exports, textItem_1, textQualifier_1, textSystemErrorType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Static class that provides helper functions for the textProvider
     *
     * @export
     * @class TextFormatterHelper
     */
    var TextFormatterHelper = /** @class */ (function () {
        function TextFormatterHelper() {
        }
        /**
         * Searches for text data in the text recourses.
         * If nothing is found than a specific error is pushed to the output item.
         *
         * @public
         * @static
         * @param {TextResourcesContainer} recourses
         * @param {string} namespace
         * @param {string} textID
         * @param {string} languageCode
         * @return {*}  {TextItem}
         * @memberof TextProvider
         */
        TextFormatterHelper.getTextNoFallback = function (recourses, namespace, textID, languageCode) {
            var text = new textItem_1.TextItem();
            var textResource = recourses.getTextResource(namespace, languageCode);
            if (textResource !== undefined) {
                text = textResource.getText(textID);
            }
            else {
                text.errors.push(textSystemErrorType_1.TextSystemErrorTypes.ReadAccessToTextDatabaseFailed);
            }
            return text;
        };
        /**
         * Seperate a string "namespacePart1/.../namepacePartn/TextId1" into:
         * namespace = "namespacePart1/.../namepacePartn" and
         * textId = "TextId1"
         *
         * @public
         * @static
         * @param {string} fullyQaulifiedTextId
         * @return {*}  {TextQualifier}
         * @memberof TextProvider
         */
        TextFormatterHelper.decodeFullyQualifiedTextId = function (fullyQaulifiedTextId) {
            // seperate elements by "/"
            var elements = fullyQaulifiedTextId.split(this.namespaceSeperator);
            // the last element is the textId
            var textId = elements[elements.length - 1];
            // remove the last element
            elements.pop();
            // concatenate all elmenets insrting the "/" again
            var namespace = elements.join(this.namespaceSeperator);
            return new textQualifier_1.TextQualifier(namespace, textId);
        };
        TextFormatterHelper.namespaceSeperator = "/";
        return TextFormatterHelper;
    }());
    exports.TextFormatterHelper = TextFormatterHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dFByb3ZpZGVySGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vdGV4dFByb3ZpZGVyL3RleHRQcm92aWRlckhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFNQTs7Ozs7T0FLRztJQUNIO1FBSUk7UUFBd0IsQ0FBQztRQUV6Qjs7Ozs7Ozs7Ozs7O1dBWUc7UUFDVyxxQ0FBaUIsR0FBL0IsVUFBZ0MsU0FBaUMsRUFBQyxTQUFpQixFQUFFLE1BQWMsRUFBRSxZQUFZO1lBRTdHLElBQUksSUFBSSxHQUFhLElBQUksbUJBQVEsRUFBRSxDQUFDO1lBRXBDLElBQUksWUFBWSxHQUE2QixTQUFTLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUVoRyxJQUFHLFlBQVksS0FBSyxTQUFTLEVBQUU7Z0JBQzNCLElBQUksR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3ZDO2lCQUNJO2dCQUNELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDBDQUFvQixDQUFDLDhCQUE4QixDQUFDLENBQUM7YUFDekU7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNXLDhDQUEwQixHQUF4QyxVQUF5QyxvQkFBNkI7WUFFbEUsMkJBQTJCO1lBQzNCLElBQUksUUFBUSxHQUFHLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUVuRSxpQ0FBaUM7WUFDakMsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUM7WUFFekMsMEJBQTBCO1lBQzFCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUVmLGtEQUFrRDtZQUNsRCxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBRXZELE9BQU8sSUFBSSw2QkFBYSxDQUFDLFNBQVMsRUFBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBM0R1QixzQ0FBa0IsR0FBRyxHQUFHLENBQUM7UUE0RHJELDBCQUFDO0tBQUEsQUE5REQsSUE4REM7SUE5RFksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGV4dEl0ZW0gfSBmcm9tIFwiLi90ZXh0SXRlbVwiO1xyXG5pbXBvcnQgeyBUZXh0UXVhbGlmaWVyIH0gZnJvbSBcIi4vdGV4dFF1YWxpZmllclwiO1xyXG5pbXBvcnQgeyBUZXh0UmVzb3VyY2UgfSBmcm9tIFwiLi90ZXh0UmVzb3VyY2VcIjtcclxuaW1wb3J0IHsgVGV4dFJlc291cmNlc0NvbnRhaW5lciB9IGZyb20gXCIuL3RleHRSZXNvdXJjZXNDb250YWluZXJcIjtcclxuaW1wb3J0IHsgVGV4dFN5c3RlbUVycm9yVHlwZXMgfSBmcm9tIFwiLi90ZXh0U3lzdGVtRXJyb3JUeXBlXCI7XHJcblxyXG4vKipcclxuICogU3RhdGljIGNsYXNzIHRoYXQgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyBmb3IgdGhlIHRleHRQcm92aWRlclxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBUZXh0Rm9ybWF0dGVySGVscGVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVGV4dEZvcm1hdHRlckhlbHBlciB7XHJcbiAgICBcclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IG5hbWVzcGFjZVNlcGVyYXRvciA9IFwiL1wiO1xyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IgKCkge31cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlYXJjaGVzIGZvciB0ZXh0IGRhdGEgaW4gdGhlIHRleHQgcmVjb3Vyc2VzLiBcclxuICAgICAqIElmIG5vdGhpbmcgaXMgZm91bmQgdGhhbiBhIHNwZWNpZmljIGVycm9yIGlzIHB1c2hlZCB0byB0aGUgb3V0cHV0IGl0ZW0uXHJcbiAgICAgKlxyXG4gICAgICogQHB1YmxpY1xyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtUZXh0UmVzb3VyY2VzQ29udGFpbmVyfSByZWNvdXJzZXNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lc3BhY2VcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0SURcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZUNvZGVcclxuICAgICAqIEByZXR1cm4geyp9ICB7VGV4dEl0ZW19XHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0VGV4dE5vRmFsbGJhY2socmVjb3Vyc2VzOiBUZXh0UmVzb3VyY2VzQ29udGFpbmVyLG5hbWVzcGFjZTogc3RyaW5nLCB0ZXh0SUQ6IHN0cmluZywgbGFuZ3VhZ2VDb2RlKTogVGV4dEl0ZW0ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB0ZXh0OiBUZXh0SXRlbSA9IG5ldyBUZXh0SXRlbSgpO1xyXG5cclxuICAgICAgICBsZXQgdGV4dFJlc291cmNlOiBUZXh0UmVzb3VyY2UgfCB1bmRlZmluZWQgPSByZWNvdXJzZXMuZ2V0VGV4dFJlc291cmNlKG5hbWVzcGFjZSwgbGFuZ3VhZ2VDb2RlKTsgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgaWYodGV4dFJlc291cmNlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGV4dCA9IHRleHRSZXNvdXJjZS5nZXRUZXh0KHRleHRJRCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0ZXh0LmVycm9ycy5wdXNoKFRleHRTeXN0ZW1FcnJvclR5cGVzLlJlYWRBY2Nlc3NUb1RleHREYXRhYmFzZUZhaWxlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0ZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VwZXJhdGUgYSBzdHJpbmcgXCJuYW1lc3BhY2VQYXJ0MS8uLi4vbmFtZXBhY2VQYXJ0bi9UZXh0SWQxXCIgaW50bzogIFxyXG4gICAgICogbmFtZXNwYWNlID0gXCJuYW1lc3BhY2VQYXJ0MS8uLi4vbmFtZXBhY2VQYXJ0blwiIGFuZCBcclxuICAgICAqIHRleHRJZCA9IFwiVGV4dElkMVwiXHJcbiAgICAgKiBcclxuICAgICAqIEBwdWJsaWMgXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZnVsbHlRYXVsaWZpZWRUZXh0SWRcclxuICAgICAqIEByZXR1cm4geyp9ICB7VGV4dFF1YWxpZmllcn1cclxuICAgICAqIEBtZW1iZXJvZiBUZXh0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBkZWNvZGVGdWxseVF1YWxpZmllZFRleHRJZChmdWxseVFhdWxpZmllZFRleHRJZCA6IHN0cmluZykgOiBUZXh0UXVhbGlmaWVye1xyXG5cclxuICAgICAgICAvLyBzZXBlcmF0ZSBlbGVtZW50cyBieSBcIi9cIlxyXG4gICAgICAgIGxldCBlbGVtZW50cyA9IGZ1bGx5UWF1bGlmaWVkVGV4dElkLnNwbGl0KHRoaXMubmFtZXNwYWNlU2VwZXJhdG9yKTsgXHJcblxyXG4gICAgICAgIC8vIHRoZSBsYXN0IGVsZW1lbnQgaXMgdGhlIHRleHRJZFxyXG4gICAgICAgIGxldCB0ZXh0SWQgPSBlbGVtZW50c1tlbGVtZW50cy5sZW5ndGgtMV07XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcmVtb3ZlIHRoZSBsYXN0IGVsZW1lbnRcclxuICAgICAgICBlbGVtZW50cy5wb3AoKTsgXHJcblxyXG4gICAgICAgIC8vIGNvbmNhdGVuYXRlIGFsbCBlbG1lbmV0cyBpbnNydGluZyB0aGUgXCIvXCIgYWdhaW5cclxuICAgICAgICBsZXQgbmFtZXNwYWNlID0gZWxlbWVudHMuam9pbih0aGlzLm5hbWVzcGFjZVNlcGVyYXRvcik7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgVGV4dFF1YWxpZmllcihuYW1lc3BhY2UsdGV4dElkKTtcclxuICAgIH1cclxufSJdfQ==