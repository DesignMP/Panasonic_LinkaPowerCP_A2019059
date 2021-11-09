define(["require", "exports", "./subFormatterSelector", "./editStringHelper", "./formatItemIdentifier", "./rawTextItem", "./formatItem", "./formatterInputArguments/formatterInputArgumentString", "../textItem", "../textSystemErrorType", "../textSystemErrorHandler"], function (require, exports, subFormatterSelector_1, editStringHelper_1, formatItemIdentifier_1, rawTextItem_1, formatItem_1, formatterInputArgumentString_1, textItem_1, textSystemErrorType_1, textSystemErrorHandler_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Format strings are text templates consisting of UTF-8 text areas and optional format items. When the text is displayed,
     * the respective format items are replaced by text fragments that are generated based on the specified contained in the
     * format item, for example to display measured values from variables, to apply measured values in user-defined event messages
     * or put together strings for displaying in HMI applications. Basic syntax of a format item:
     *
     * {<DataSource>|[<FormatSpecification>]}
     *
     * In other words, format items are delimited by { and } and always contain a data source,
     * which can then be followed by a | (pipe) character and format specification (optional).
     *
     * @static
     * @class TextFormatter
     */
    var TextFormatter = /** @class */ (function () {
        /**
        * Creates an instance of TextFormatter.
        * @memberof TextFormatter
        */
        function TextFormatter() {
            this._errorContainer = new Array();
            this._recursionCnt = 0;
        }
        /**
        * call method for using TextFormatter
        *
        * @param {string} text
        * @param {ITextProvider} textSystemInterface
        * @param {FormatterInputArgumentList | undefined} argumentList
        * @param {*} [languageCode=this._selectedLanguage]
        * @returns {TextItem}
        * @memberof TextFormatter
        */
        TextFormatter.prototype.formatText = function (rawText, textSystemInterface, argumentList, languageCode) {
            var text = new textItem_1.TextItem();
            // Reset all members before starting
            this._errorContainer = new Array();
            this._recursionCnt = 0;
            rawText = this.replaceFormatItems(rawText, textSystemInterface, argumentList, languageCode);
            // change "{{" to "{"
            var regex = RegExp(formatItemIdentifier_1.FormatItemIdentifier.next + formatItemIdentifier_1.FormatItemIdentifier.next, 'g');
            text.value = rawText.replace(regex, formatItemIdentifier_1.FormatItemIdentifier.next);
            text.errors = this._errorContainer;
            return text;
        };
        /**
         * Search for format items and change the items with the value from data source
         *
         * @param {string} rawData
         * @param {ITextProvider} textSystemInterface
         * @param {FormatterInputArgumentList | undefined} argumentList
         * @param {*} [languageCode=this._selectedLanguage]
         * @returns {string}
         * @memberof TextFormatter
         */
        TextFormatter.prototype.replaceFormatItems = function (rawData, textSystemInterface, argumentList, languageCode) {
            var formattedData = "";
            var rawTextItem = new rawTextItem_1.RawTextItem();
            rawTextItem.data = rawData;
            // ends if no further format item is found
            while (rawTextItem.containsFurtherFormatItem()) {
                formattedData += rawTextItem.getTextBeforeFormatItem();
                rawTextItem.removeTextBeforeFormatItem();
                // Format item build with "="
                rawTextItem = this.processDynamicBuildFormatItem(rawTextItem, textSystemInterface, argumentList, languageCode);
                // get the the result of the formatting and add it to the allredy formatted data
                var processedItem = this.processFormatItem(rawTextItem.getFormatItemWithoutCurls(), textSystemInterface, argumentList, languageCode);
                formattedData += processedItem;
                rawTextItem.removeFormattedText();
            }
            return formattedData + rawTextItem.data;
        };
        /**
         * If the format item is starting with "=", a recurisve search for other format items starts.
         * If the recursion is done the last format item is returned ready for being processed
         *
         * @private
         * @param {RawTextItem} rawTextItem
         * @param {ITextProvider} [textSystemInterface]
         * @param {FormatterInputArgumentList} [argumentList]
         * @param {string} [languageCode]
         * @return {*}  {RawTextItem}
         * @memberof TextFormatter
         */
        TextFormatter.prototype.processDynamicBuildFormatItem = function (rawTextItem, textSystemInterface, argumentList, languageCode) {
            // if there is a "=", "{=" gets removed
            if (rawTextItem.containsRecursiveFormatItem()) {
                // Recursion: process the inner format items. The before removed "{" need to be added in front again that it gets processed again.
                rawTextItem.data = formatItemIdentifier_1.FormatItemIdentifier.next + this.replaceFormatItems(rawTextItem.data, textSystemInterface, argumentList, languageCode);
            }
            return rawTextItem;
        };
        /**
         * Get the formatted string of the format item
         *
         * @param {string} rawItem
         * @param {ITextProvider | undefined} textSystemInterface
         * @param {FormatterInputArgumentList | undefined} argumentList
         * @param {*} [languageCode=this._selectedLanguage]
         * @returns {string}
         * @memberof TextFormatter
         */
        TextFormatter.prototype.processFormatItem = function (rawItem, textSystemInterface, argumentList, languageCode) {
            var formattedItem = "";
            try {
                // get the format item information {<DataSource>|[<FormatSpecification>]} from raw string
                var formatItem = new formatItem_1.FormatItem(rawItem, argumentList);
                // receive the input argument for the respective datasource
                var inputArgument = this.receiveInputArgumentFromDataSource(formatItem, textSystemInterface, argumentList, languageCode);
                // apply format Specification
                formattedItem = subFormatterSelector_1.SubFormatterSelector.formatArgumentItem(inputArgument, formatItem.formatSpecification);
                // In recursive format items the result is checked for inner format items
                formattedItem = this.processRecursiveFormatItem(formattedItem, formatItem, textSystemInterface, argumentList, languageCode);
            }
            catch (error) {
                // reset the recursion counter
                this._recursionCnt = 0;
                // Errors ar only pushed at this place
                this._errorContainer.push(error.value);
                // The before created errormessage gets shown in the formatted string instead of the format item
                formattedItem = error.message;
            }
            return formattedItem;
        };
        /**
         * Selects the right datasource and receives the raw input argument
         *
         * @private
         * @param {FormatItem} formatItem
         * @param {ITextProvider} [textSystemInterface]
         * @param {FormatterInputArgumentList} [argumentList]
         * @param {string} [languageCode]
         * @return {*}  {IFormatterInputArgument}
         * @memberof TextFormatter
         */
        TextFormatter.prototype.receiveInputArgumentFromDataSource = function (formatItem, textSystemInterface, argumentList, languageCode) {
            var inputArgument;
            if (formatItem.dataSourceType === formatItem_1.DataSourceTypes.external) {
                // Remove the external data source identifier ("$") from rawItem and pass it for getting the text from the textsystem
                inputArgument = this.receiveInputArgumentFromExternalDataSource(formatItem, textSystemInterface, languageCode);
            }
            // Else its an argument data source
            else {
                inputArgument = this.receiveInputArgumentFromArgumentDataSource(formatItem, argumentList);
            }
            return inputArgument;
        };
        /**
         * Process the externl data source.
         * Searches recoursive for further format items in the processed string.
         * Can throw Error strings
         *
         * @private
         * @param {FormatItem} formatItem
         * @param {(ITextProvider | undefined)} textSystemInterface
         * @param {string} [languageCode]
         * @return {*}  {IFormatterInputArgument}
         * @memberof TextFormatter
         */
        TextFormatter.prototype.receiveInputArgumentFromExternalDataSource = function (formatItem, textSystemInterface, languageCode) {
            // check if there is a textsystem instance
            if (textSystemInterface === undefined) {
                var errorMessage = textSystemErrorHandler_1.TextSystemErrorHandler.getErrorMessageBySource(textSystemErrorType_1.TextSystemErrorTypes.CouldNotOpenTextDatabase, formatItem.dataSource);
                textSystemErrorHandler_1.TextSystemErrorHandler.throwFormatterErrors(textSystemErrorType_1.TextSystemErrorTypes.CouldNotOpenTextDatabase, errorMessage);
            }
            // Get TextItem from textsystem
            var textItem = textSystemInterface.getRawTextByFullyQualifiedTextId(formatItem.dataSource, languageCode);
            var formattedItem = textItem.value;
            // Wenn Fehler aufgetreten sind werden diese in den errorContainer gepusht und eine exeption wird geworfen
            if (!textItem.isValid()) {
                textSystemErrorHandler_1.TextSystemErrorHandler.throwFormatterErrors(textItem.errors[0], formattedItem);
            }
            // convert the received string in database to FormatterInputArgumentString
            var inputArgument = new formatterInputArgumentString_1.FormatterInputArgumentString(formattedItem);
            return inputArgument;
        };
        /**
         * Process the argument data source
         * Can throw Error strings
         *
         * @private
         * @param {FormatItem} formatItem
         * @param {(FormatterInputArgumentList | undefined)} argumentList
         * @return {*}  {IFormatterInputArgument}
         * @memberof TextFormatter
         */
        TextFormatter.prototype.receiveInputArgumentFromArgumentDataSource = function (formatItem, argumentList) {
            var checkedInputArgument = editStringHelper_1.EditStringHelper.getInputArgumentFromText(formatItem.dataSource, argumentList);
            if (checkedInputArgument.error !== 0) {
                textSystemErrorHandler_1.TextSystemErrorHandler.throwFormatterErrors(checkedInputArgument.error, textSystemErrorHandler_1.TextSystemErrorHandler.defaultErrorMessage);
            }
            return checkedInputArgument.inputArgument;
        };
        /**
         * Checks if the processed format item need to be processed again for inner format items
         * The recursion is limited by 10
         *
         * @private
         * @param {string} formattedItem
         * @param {FormatItem} formatItem
         * @param {ITextProvider} [textSystemInterface]
         * @param {FormatterInputArgumentList} [argumentList]
         * @param {string} [languageCode]
         * @return {*}  {RawTextItem}
         * @memberof TextFormatter
         */
        TextFormatter.prototype.processRecursiveFormatItem = function (formattedItem, formatItem, textSystemInterface, argumentList, languageCode) {
            if (formatItem.isRecursive()) {
                this._recursionCnt++;
                // disables endless recursion of external data source items
                if (this._recursionCnt >= 10) {
                    textSystemErrorHandler_1.TextSystemErrorHandler.throwFormatterErrors(textSystemErrorType_1.TextSystemErrorTypes.EndlessRecursion, textSystemErrorHandler_1.TextSystemErrorHandler.defaultErrorMessage);
                }
                // Recursion: Search for a format item in the formatted item
                formattedItem = this.replaceFormatItems(formattedItem, textSystemInterface, argumentList, languageCode);
            }
            else {
                // reset the recursion counter
                this._recursionCnt = 0;
            }
            return formattedItem;
        };
        return TextFormatter;
    }());
    exports.TextFormatter = TextFormatter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dEZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3RleHRQcm92aWRlci90ZXh0Rm9ybWF0dGVyL3RleHRGb3JtYXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBY0E7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUVGO1FBWUk7OztVQUdFO1FBQ0g7WUFDSSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksS0FBSyxFQUF3QixDQUFDO1lBQ3pELElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLENBQUM7UUFFQTs7Ozs7Ozs7O1VBU0U7UUFDSSxrQ0FBVSxHQUFqQixVQUFrQixPQUFlLEVBQUUsbUJBQW9DLEVBQUUsWUFBMEMsRUFBRSxZQUFvQjtZQUVySSxJQUFJLElBQUksR0FBYSxJQUFJLG1CQUFRLEVBQUUsQ0FBQztZQUVwQyxvQ0FBb0M7WUFDcEMsSUFBSSxDQUFDLGVBQWUsR0FBSSxJQUFJLEtBQUssRUFBd0IsQ0FBQztZQUMxRCxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztZQUV2QixPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFFNUYscUJBQXFCO1lBQ3JCLElBQUksS0FBSyxHQUFXLE1BQU0sQ0FBQywyQ0FBb0IsQ0FBQyxJQUFJLEdBQUcsMkNBQW9CLENBQUMsSUFBSSxFQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RGLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsMkNBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1lBRW5DLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFFRDs7Ozs7Ozs7O1dBU0c7UUFDSyww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Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3ViRm9ybWF0dGVyU2VsZWN0b3IgfSBmcm9tIFwiLi9zdWJGb3JtYXR0ZXJTZWxlY3RvclwiO1xyXG5pbXBvcnQgeyBDaGVja2VkSW5wdXRBcmd1bWVudCwgRWRpdFN0cmluZ0hlbHBlciB9IGZyb20gXCIuL2VkaXRTdHJpbmdIZWxwZXJcIlxyXG5pbXBvcnQgeyBJRm9ybWF0dGVySW5wdXRBcmd1bWVudH0gZnJvbSBcIi4uL2ludGVyZmFjZS9mb3JtYXR0ZXJJbnB1dEFyZ3VtZW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElUZXh0UHJvdmlkZXIgfSBmcm9tIFwiLi4vaW50ZXJmYWNlL3RleHRQcm92aWRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50TGlzdCB9IGZyb20gXCIuL2Zvcm1hdHRlcklucHV0QXJndW1lbnRzL2Zvcm1hdHRlcklucHV0QXJndW1lbnRMaXN0XCI7XHJcbmltcG9ydCB7IEZvcm1hdEl0ZW1JZGVudGlmaWVyIH0gZnJvbSBcIi4vZm9ybWF0SXRlbUlkZW50aWZpZXJcIjtcclxuaW1wb3J0IHsgUmF3VGV4dEl0ZW0gfSBmcm9tIFwiLi9yYXdUZXh0SXRlbVwiO1xyXG5pbXBvcnQgeyBEYXRhU291cmNlVHlwZXMsIEZvcm1hdEl0ZW0gfSBmcm9tIFwiLi9mb3JtYXRJdGVtXCI7XHJcbmltcG9ydCB7IEZvcm1hdHRlcklucHV0QXJndW1lbnRTdHJpbmcgfSBmcm9tIFwiLi9mb3JtYXR0ZXJJbnB1dEFyZ3VtZW50cy9mb3JtYXR0ZXJJbnB1dEFyZ3VtZW50U3RyaW5nXCI7XHJcbmltcG9ydCB7IFRleHRJdGVtIGFzIFRleHRJdGVtIH0gZnJvbSBcIi4uL3RleHRJdGVtXCI7XHJcbmltcG9ydCB7IFRleHRTeXN0ZW1FcnJvclR5cGVzIH0gZnJvbSBcIi4uL3RleHRTeXN0ZW1FcnJvclR5cGVcIjtcclxuaW1wb3J0IHsgVGV4dFN5c3RlbUVycm9ySGFuZGxlciB9IGZyb20gXCIuLi90ZXh0U3lzdGVtRXJyb3JIYW5kbGVyXCI7XHJcbmltcG9ydCB7IElUZXh0Rm9ybWF0dGVyIH0gZnJvbSBcIi4uL2ludGVyZmFjZS90ZXh0Rm9ybWF0dGVySW50ZXJmYWNlXCI7XHJcblxyXG4vKipcclxuICogRm9ybWF0IHN0cmluZ3MgYXJlIHRleHQgdGVtcGxhdGVzIGNvbnNpc3Rpbmcgb2YgVVRGLTggdGV4dCBhcmVhcyBhbmQgb3B0aW9uYWwgZm9ybWF0IGl0ZW1zLiBXaGVuIHRoZSB0ZXh0IGlzIGRpc3BsYXllZCwgXHJcbiAqIHRoZSByZXNwZWN0aXZlIGZvcm1hdCBpdGVtcyBhcmUgcmVwbGFjZWQgYnkgdGV4dCBmcmFnbWVudHMgdGhhdCBhcmUgZ2VuZXJhdGVkIGJhc2VkIG9uIHRoZSBzcGVjaWZpZWQgY29udGFpbmVkIGluIHRoZSBcclxuICogZm9ybWF0IGl0ZW0sIGZvciBleGFtcGxlIHRvIGRpc3BsYXkgbWVhc3VyZWQgdmFsdWVzIGZyb20gdmFyaWFibGVzLCB0byBhcHBseSBtZWFzdXJlZCB2YWx1ZXMgaW4gdXNlci1kZWZpbmVkIGV2ZW50IG1lc3NhZ2VzXHJcbiAqIG9yIHB1dCB0b2dldGhlciBzdHJpbmdzIGZvciBkaXNwbGF5aW5nIGluIEhNSSBhcHBsaWNhdGlvbnMuIEJhc2ljIHN5bnRheCBvZiBhIGZvcm1hdCBpdGVtOlxyXG4gKiBcclxuICogezxEYXRhU291cmNlPnxbPEZvcm1hdFNwZWNpZmljYXRpb24+XX1cclxuICogXHJcbiAqIEluIG90aGVyIHdvcmRzLCBmb3JtYXQgaXRlbXMgYXJlIGRlbGltaXRlZCBieSB7IGFuZCB9IGFuZCBhbHdheXMgY29udGFpbiBhIGRhdGEgc291cmNlLCBcclxuICogd2hpY2ggY2FuIHRoZW4gYmUgZm9sbG93ZWQgYnkgYSB8IChwaXBlKSBjaGFyYWN0ZXIgYW5kIGZvcm1hdCBzcGVjaWZpY2F0aW9uIChvcHRpb25hbCkuIFxyXG4gKiBcclxuICogQHN0YXRpY1xyXG4gKiBAY2xhc3MgVGV4dEZvcm1hdHRlclxyXG4gKi9cclxuXHJcbiBleHBvcnQgY2xhc3MgVGV4dEZvcm1hdHRlciBpbXBsZW1lbnRzIElUZXh0Rm9ybWF0dGVyIHtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBPbmx5IGVycm9ycyB0aGF0IGxlYWRzIHRvIGFuIHVucmVzb2x2ZWQgZm9ybWF0IEl0ZW0gYXJlIHB1c2hlZCB0byB0aGUgZXJyb3JDb250YWluZXJcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dEZvcm1hdHRlclxyXG4gICAgICovIFxyXG4gICAgcHJpdmF0ZSBfZXJyb3JDb250YWluZXI6IEFycmF5PFRleHRTeXN0ZW1FcnJvclR5cGVzPjtcclxuXHJcbiAgICAvLyBDb3VudGVyIHRvIGVuc3VyZSB0byBkb24ndCBnZXQgc3R1Y2sgaW4gYW4gZW5kbGVzcyByZWN1cnNpb25cclxuICAgIHByaXZhdGUgX3JlY3Vyc2lvbkNudDogbnVtYmVyO1xyXG5cclxuICAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgVGV4dEZvcm1hdHRlci5cclxuICAgICAqIEBtZW1iZXJvZiBUZXh0Rm9ybWF0dGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl9lcnJvckNvbnRhaW5lciA9IG5ldyBBcnJheTxUZXh0U3lzdGVtRXJyb3JUeXBlcz4oKTtcclxuICAgICAgICB0aGlzLl9yZWN1cnNpb25DbnQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgICAvKipcclxuICAgICAqIGNhbGwgbWV0aG9kIGZvciB1c2luZyBUZXh0Rm9ybWF0dGVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICAgICAqIEBwYXJhbSB7SVRleHRQcm92aWRlcn0gdGV4dFN5c3RlbUludGVyZmFjZVxyXG4gICAgICogQHBhcmFtIHtGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50TGlzdCB8IHVuZGVmaW5lZH0gYXJndW1lbnRMaXN0XHJcbiAgICAgKiBAcGFyYW0geyp9IFtsYW5ndWFnZUNvZGU9dGhpcy5fc2VsZWN0ZWRMYW5ndWFnZV1cclxuICAgICAqIEByZXR1cm5zIHtUZXh0SXRlbX1cclxuICAgICAqIEBtZW1iZXJvZiBUZXh0Rm9ybWF0dGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmb3JtYXRUZXh0KHJhd1RleHQ6IHN0cmluZywgdGV4dFN5c3RlbUludGVyZmFjZSA/OiBJVGV4dFByb3ZpZGVyLCBhcmd1bWVudExpc3QgPzogRm9ybWF0dGVySW5wdXRBcmd1bWVudExpc3QsIGxhbmd1YWdlQ29kZT86c3RyaW5nKTogVGV4dEl0ZW0ge1xyXG4gICAgIFxyXG4gICAgICAgIGxldCB0ZXh0OiBUZXh0SXRlbSA9IG5ldyBUZXh0SXRlbSgpO1xyXG5cclxuICAgICAgICAvLyBSZXNldCBhbGwgbWVtYmVycyBiZWZvcmUgc3RhcnRpbmdcclxuICAgICAgICB0aGlzLl9lcnJvckNvbnRhaW5lciA9ICBuZXcgQXJyYXk8VGV4dFN5c3RlbUVycm9yVHlwZXM+KCk7XHJcbiAgICAgICAgdGhpcy5fcmVjdXJzaW9uQ250ID0gMDtcclxuXHJcbiAgICAgICAgcmF3VGV4dCA9IHRoaXMucmVwbGFjZUZvcm1hdEl0ZW1zKHJhd1RleHQsIHRleHRTeXN0ZW1JbnRlcmZhY2UsIGFyZ3VtZW50TGlzdCwgbGFuZ3VhZ2VDb2RlKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBjaGFuZ2UgXCJ7e1wiIHRvIFwie1wiXHJcbiAgICAgICAgbGV0IHJlZ2V4OiBSZWdFeHAgPSBSZWdFeHAoRm9ybWF0SXRlbUlkZW50aWZpZXIubmV4dCArIEZvcm1hdEl0ZW1JZGVudGlmaWVyLm5leHQsJ2cnKTtcclxuICAgICAgICB0ZXh0LnZhbHVlID0gcmF3VGV4dC5yZXBsYWNlKHJlZ2V4LCBGb3JtYXRJdGVtSWRlbnRpZmllci5uZXh0KTtcclxuICAgICAgICB0ZXh0LmVycm9ycyA9IHRoaXMuX2Vycm9yQ29udGFpbmVyO1xyXG5cclxuICAgICAgICByZXR1cm4gdGV4dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlYXJjaCBmb3IgZm9ybWF0IGl0ZW1zIGFuZCBjaGFuZ2UgdGhlIGl0ZW1zIHdpdGggdGhlIHZhbHVlIGZyb20gZGF0YSBzb3VyY2VcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJhd0RhdGFcclxuICAgICAqIEBwYXJhbSB7SVRleHRQcm92aWRlcn0gdGV4dFN5c3RlbUludGVyZmFjZVxyXG4gICAgICogQHBhcmFtIHtGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50TGlzdCB8IHVuZGVmaW5lZH0gYXJndW1lbnRMaXN0XHJcbiAgICAgKiBAcGFyYW0geyp9IFtsYW5ndWFnZUNvZGU9dGhpcy5fc2VsZWN0ZWRMYW5ndWFnZV1cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dEZvcm1hdHRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlcGxhY2VGb3JtYXRJdGVtcyhyYXdEYXRhOiBzdHJpbmcsIHRleHRTeXN0ZW1JbnRlcmZhY2UgPzogSVRleHRQcm92aWRlciwgYXJndW1lbnRMaXN0ID86IEZvcm1hdHRlcklucHV0QXJndW1lbnRMaXN0LCBsYW5ndWFnZUNvZGU/OnN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGZvcm1hdHRlZERhdGE6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgICAgIGxldCByYXdUZXh0SXRlbTogUmF3VGV4dEl0ZW0gPSBuZXcgUmF3VGV4dEl0ZW0oKTtcclxuXHJcbiAgICAgICAgcmF3VGV4dEl0ZW0uZGF0YSA9IHJhd0RhdGE7XHJcbiAgICAgICBcclxuICAgICAgICAvLyBlbmRzIGlmIG5vIGZ1cnRoZXIgZm9ybWF0IGl0ZW0gaXMgZm91bmRcclxuICAgICAgICB3aGlsZShyYXdUZXh0SXRlbS5jb250YWluc0Z1cnRoZXJGb3JtYXRJdGVtKCkpIHtcclxuXHJcbiAgICAgICAgICAgIGZvcm1hdHRlZERhdGEgKz0gcmF3VGV4dEl0ZW0uZ2V0VGV4dEJlZm9yZUZvcm1hdEl0ZW0oKTtcclxuICAgICAgICAgICAgcmF3VGV4dEl0ZW0ucmVtb3ZlVGV4dEJlZm9yZUZvcm1hdEl0ZW0oKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEZvcm1hdCBpdGVtIGJ1aWxkIHdpdGggXCI9XCJcclxuICAgICAgICAgICAgcmF3VGV4dEl0ZW0gPSB0aGlzLnByb2Nlc3NEeW5hbWljQnVpbGRGb3JtYXRJdGVtKHJhd1RleHRJdGVtLCB0ZXh0U3lzdGVtSW50ZXJmYWNlLCBhcmd1bWVudExpc3QsIGxhbmd1YWdlQ29kZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBnZXQgdGhlIHRoZSByZXN1bHQgb2YgdGhlIGZvcm1hdHRpbmcgYW5kIGFkZCBpdCB0byB0aGUgYWxscmVkeSBmb3JtYXR0ZWQgZGF0YVxyXG4gICAgICAgICAgICBsZXQgcHJvY2Vzc2VkSXRlbTogc3RyaW5nID0gdGhpcy5wcm9jZXNzRm9ybWF0SXRlbShyYXdUZXh0SXRlbS5nZXRGb3JtYXRJdGVtV2l0aG91dEN1cmxzKCksIHRleHRTeXN0ZW1JbnRlcmZhY2UsIGFyZ3VtZW50TGlzdCwgbGFuZ3VhZ2VDb2RlKTsgICBcclxuICAgICAgICAgICAgZm9ybWF0dGVkRGF0YSArPSBwcm9jZXNzZWRJdGVtO1xyXG4gICAgICAgICAgICByYXdUZXh0SXRlbS5yZW1vdmVGb3JtYXR0ZWRUZXh0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZm9ybWF0dGVkRGF0YSArIHJhd1RleHRJdGVtLmRhdGE7XHJcbiAgICB9IFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSWYgdGhlIGZvcm1hdCBpdGVtIGlzIHN0YXJ0aW5nIHdpdGggXCI9XCIsIGEgcmVjdXJpc3ZlIHNlYXJjaCBmb3Igb3RoZXIgZm9ybWF0IGl0ZW1zIHN0YXJ0cy5cclxuICAgICAqIElmIHRoZSByZWN1cnNpb24gaXMgZG9uZSB0aGUgbGFzdCBmb3JtYXQgaXRlbSBpcyByZXR1cm5lZCByZWFkeSBmb3IgYmVpbmcgcHJvY2Vzc2VkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7UmF3VGV4dEl0ZW19IHJhd1RleHRJdGVtXHJcbiAgICAgKiBAcGFyYW0ge0lUZXh0UHJvdmlkZXJ9IFt0ZXh0U3lzdGVtSW50ZXJmYWNlXVxyXG4gICAgICogQHBhcmFtIHtGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50TGlzdH0gW2FyZ3VtZW50TGlzdF1cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbbGFuZ3VhZ2VDb2RlXVxyXG4gICAgICogQHJldHVybiB7Kn0gIHtSYXdUZXh0SXRlbX1cclxuICAgICAqIEBtZW1iZXJvZiBUZXh0Rm9ybWF0dGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcHJvY2Vzc0R5bmFtaWNCdWlsZEZvcm1hdEl0ZW0ocmF3VGV4dEl0ZW06IFJhd1RleHRJdGVtLCB0ZXh0U3lzdGVtSW50ZXJmYWNlID86IElUZXh0UHJvdmlkZXIsIGFyZ3VtZW50TGlzdCA/OiBGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50TGlzdCwgbGFuZ3VhZ2VDb2RlPzpzdHJpbmcpIDogUmF3VGV4dEl0ZW0ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGlmIHRoZXJlIGlzIGEgXCI9XCIsIFwiez1cIiBnZXRzIHJlbW92ZWRcclxuICAgICAgICBpZihyYXdUZXh0SXRlbS5jb250YWluc1JlY3Vyc2l2ZUZvcm1hdEl0ZW0oKSkgeyAgICAgIFxyXG4gICAgICAgICAgICAvLyBSZWN1cnNpb246IHByb2Nlc3MgdGhlIGlubmVyIGZvcm1hdCBpdGVtcy4gVGhlIGJlZm9yZSByZW1vdmVkIFwie1wiIG5lZWQgdG8gYmUgYWRkZWQgaW4gZnJvbnQgYWdhaW4gdGhhdCBpdCBnZXRzIHByb2Nlc3NlZCBhZ2Fpbi5cclxuICAgICAgICAgICAgcmF3VGV4dEl0ZW0uZGF0YSA9ICBGb3JtYXRJdGVtSWRlbnRpZmllci5uZXh0ICsgdGhpcy5yZXBsYWNlRm9ybWF0SXRlbXMocmF3VGV4dEl0ZW0uZGF0YSwgdGV4dFN5c3RlbUludGVyZmFjZSwgYXJndW1lbnRMaXN0LCBsYW5ndWFnZUNvZGUpO1xyXG4gICAgICAgIH0gIFxyXG5cclxuICAgICAgICByZXR1cm4gcmF3VGV4dEl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIGZvcm1hdHRlZCBzdHJpbmcgb2YgdGhlIGZvcm1hdCBpdGVtXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByYXdJdGVtIFxyXG4gICAgICogQHBhcmFtIHtJVGV4dFByb3ZpZGVyIHwgdW5kZWZpbmVkfSB0ZXh0U3lzdGVtSW50ZXJmYWNlXHJcbiAgICAgKiBAcGFyYW0ge0Zvcm1hdHRlcklucHV0QXJndW1lbnRMaXN0IHwgdW5kZWZpbmVkfSBhcmd1bWVudExpc3RcclxuICAgICAqIEBwYXJhbSB7Kn0gW2xhbmd1YWdlQ29kZT10aGlzLl9zZWxlY3RlZExhbmd1YWdlXVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBUZXh0Rm9ybWF0dGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcHJvY2Vzc0Zvcm1hdEl0ZW0ocmF3SXRlbTogc3RyaW5nLCB0ZXh0U3lzdGVtSW50ZXJmYWNlID86IElUZXh0UHJvdmlkZXIsIGFyZ3VtZW50TGlzdCA/OiBGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50TGlzdCwgbGFuZ3VhZ2VDb2RlID86IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGZvcm1hdHRlZEl0ZW06IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBmb3JtYXQgaXRlbSBpbmZvcm1hdGlvbiB7PERhdGFTb3VyY2U+fFs8Rm9ybWF0U3BlY2lmaWNhdGlvbj5dfSBmcm9tIHJhdyBzdHJpbmdcclxuICAgICAgICAgICAgbGV0IGZvcm1hdEl0ZW06IEZvcm1hdEl0ZW0gPSBuZXcgRm9ybWF0SXRlbShyYXdJdGVtLCBhcmd1bWVudExpc3QpO1xyXG5cclxuICAgICAgICAgICAgLy8gcmVjZWl2ZSB0aGUgaW5wdXQgYXJndW1lbnQgZm9yIHRoZSByZXNwZWN0aXZlIGRhdGFzb3VyY2VcclxuICAgICAgICAgICAgbGV0IGlucHV0QXJndW1lbnQ6IElGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50ID0gdGhpcy5yZWNlaXZlSW5wdXRBcmd1bWVudEZyb21EYXRhU291cmNlKGZvcm1hdEl0ZW0sIHRleHRTeXN0ZW1JbnRlcmZhY2UsIGFyZ3VtZW50TGlzdCwgbGFuZ3VhZ2VDb2RlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFwcGx5IGZvcm1hdCBTcGVjaWZpY2F0aW9uXHJcbiAgICAgICAgICAgIGZvcm1hdHRlZEl0ZW0gPSBTdWJGb3JtYXR0ZXJTZWxlY3Rvci5mb3JtYXRBcmd1bWVudEl0ZW0oaW5wdXRBcmd1bWVudCwgZm9ybWF0SXRlbS5mb3JtYXRTcGVjaWZpY2F0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEluIHJlY3Vyc2l2ZSBmb3JtYXQgaXRlbXMgdGhlIHJlc3VsdCBpcyBjaGVja2VkIGZvciBpbm5lciBmb3JtYXQgaXRlbXNcclxuICAgICAgICAgICAgZm9ybWF0dGVkSXRlbSA9IHRoaXMucHJvY2Vzc1JlY3Vyc2l2ZUZvcm1hdEl0ZW0oZm9ybWF0dGVkSXRlbSwgZm9ybWF0SXRlbSwgdGV4dFN5c3RlbUludGVyZmFjZSwgYXJndW1lbnRMaXN0LCBsYW5ndWFnZUNvZGUpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2goZXJyb3IpIHtcclxuICAgICAgICAgICAgLy8gcmVzZXQgdGhlIHJlY3Vyc2lvbiBjb3VudGVyXHJcbiAgICAgICAgICAgIHRoaXMuX3JlY3Vyc2lvbkNudCA9IDA7XHJcblxyXG4gICAgICAgICAgICAvLyBFcnJvcnMgYXIgb25seSBwdXNoZWQgYXQgdGhpcyBwbGFjZVxyXG4gICAgICAgICAgICB0aGlzLl9lcnJvckNvbnRhaW5lci5wdXNoKGVycm9yLnZhbHVlKTtcclxuICAgICAgICAgICAgLy8gVGhlIGJlZm9yZSBjcmVhdGVkIGVycm9ybWVzc2FnZSBnZXRzIHNob3duIGluIHRoZSBmb3JtYXR0ZWQgc3RyaW5nIGluc3RlYWQgb2YgdGhlIGZvcm1hdCBpdGVtXHJcbiAgICAgICAgICAgIGZvcm1hdHRlZEl0ZW0gPSBlcnJvci5tZXNzYWdlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcm1hdHRlZEl0ZW07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2VsZWN0cyB0aGUgcmlnaHQgZGF0YXNvdXJjZSBhbmQgcmVjZWl2ZXMgdGhlIHJhdyBpbnB1dCBhcmd1bWVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0Zvcm1hdEl0ZW19IGZvcm1hdEl0ZW1cclxuICAgICAqIEBwYXJhbSB7SVRleHRQcm92aWRlcn0gW3RleHRTeXN0ZW1JbnRlcmZhY2VdXHJcbiAgICAgKiBAcGFyYW0ge0Zvcm1hdHRlcklucHV0QXJndW1lbnRMaXN0fSBbYXJndW1lbnRMaXN0XVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtsYW5ndWFnZUNvZGVdXHJcbiAgICAgKiBAcmV0dXJuIHsqfSAge0lGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50fVxyXG4gICAgICogQG1lbWJlcm9mIFRleHRGb3JtYXR0ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWNlaXZlSW5wdXRBcmd1bWVudEZyb21EYXRhU291cmNlKGZvcm1hdEl0ZW06IEZvcm1hdEl0ZW0sIHRleHRTeXN0ZW1JbnRlcmZhY2UgPzogSVRleHRQcm92aWRlciwgYXJndW1lbnRMaXN0ID86IEZvcm1hdHRlcklucHV0QXJndW1lbnRMaXN0LCBsYW5ndWFnZUNvZGUgPzogc3RyaW5nKTogSUZvcm1hdHRlcklucHV0QXJndW1lbnQge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBpbnB1dEFyZ3VtZW50OiBJRm9ybWF0dGVySW5wdXRBcmd1bWVudDtcclxuXHJcbiAgICAgICAgaWYoZm9ybWF0SXRlbS5kYXRhU291cmNlVHlwZSA9PT0gRGF0YVNvdXJjZVR5cGVzLmV4dGVybmFsKSB7XHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgZXh0ZXJuYWwgZGF0YSBzb3VyY2UgaWRlbnRpZmllciAoXCIkXCIpIGZyb20gcmF3SXRlbSBhbmQgcGFzcyBpdCBmb3IgZ2V0dGluZyB0aGUgdGV4dCBmcm9tIHRoZSB0ZXh0c3lzdGVtXHJcbiAgICAgICAgICAgIGlucHV0QXJndW1lbnQgPSB0aGlzLnJlY2VpdmVJbnB1dEFyZ3VtZW50RnJvbUV4dGVybmFsRGF0YVNvdXJjZShmb3JtYXRJdGVtLCB0ZXh0U3lzdGVtSW50ZXJmYWNlLCBsYW5ndWFnZUNvZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBFbHNlIGl0cyBhbiBhcmd1bWVudCBkYXRhIHNvdXJjZVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpbnB1dEFyZ3VtZW50ID0gdGhpcy5yZWNlaXZlSW5wdXRBcmd1bWVudEZyb21Bcmd1bWVudERhdGFTb3VyY2UoZm9ybWF0SXRlbSwgYXJndW1lbnRMaXN0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpbnB1dEFyZ3VtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvY2VzcyB0aGUgZXh0ZXJubCBkYXRhIHNvdXJjZS4gXHJcbiAgICAgKiBTZWFyY2hlcyByZWNvdXJzaXZlIGZvciBmdXJ0aGVyIGZvcm1hdCBpdGVtcyBpbiB0aGUgcHJvY2Vzc2VkIHN0cmluZy5cclxuICAgICAqIENhbiB0aHJvdyBFcnJvciBzdHJpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Rm9ybWF0SXRlbX0gZm9ybWF0SXRlbVxyXG4gICAgICogQHBhcmFtIHsoSVRleHRQcm92aWRlciB8IHVuZGVmaW5lZCl9IHRleHRTeXN0ZW1JbnRlcmZhY2VcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbbGFuZ3VhZ2VDb2RlXVxyXG4gICAgICogQHJldHVybiB7Kn0gIHtJRm9ybWF0dGVySW5wdXRBcmd1bWVudH1cclxuICAgICAqIEBtZW1iZXJvZiBUZXh0Rm9ybWF0dGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVjZWl2ZUlucHV0QXJndW1lbnRGcm9tRXh0ZXJuYWxEYXRhU291cmNlKGZvcm1hdEl0ZW06IEZvcm1hdEl0ZW0sIHRleHRTeXN0ZW1JbnRlcmZhY2UgPzogSVRleHRQcm92aWRlciwgbGFuZ3VhZ2VDb2RlID86IHN0cmluZyk6IElGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50IHtcclxuXHJcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlcmUgaXMgYSB0ZXh0c3lzdGVtIGluc3RhbmNlXHJcbiAgICAgICAgaWYodGV4dFN5c3RlbUludGVyZmFjZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGxldCBlcnJvck1lc3NhZ2U6IHN0cmluZyA9IFRleHRTeXN0ZW1FcnJvckhhbmRsZXIuZ2V0RXJyb3JNZXNzYWdlQnlTb3VyY2UoVGV4dFN5c3RlbUVycm9yVHlwZXMuQ291bGROb3RPcGVuVGV4dERhdGFiYXNlLCBmb3JtYXRJdGVtLmRhdGFTb3VyY2UpO1xyXG4gICAgICAgICAgICBUZXh0U3lzdGVtRXJyb3JIYW5kbGVyLnRocm93Rm9ybWF0dGVyRXJyb3JzKFRleHRTeXN0ZW1FcnJvclR5cGVzLkNvdWxkTm90T3BlblRleHREYXRhYmFzZSwgZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEdldCBUZXh0SXRlbSBmcm9tIHRleHRzeXN0ZW1cclxuICAgICAgICBsZXQgdGV4dEl0ZW06IFRleHRJdGVtID0gdGV4dFN5c3RlbUludGVyZmFjZS5nZXRSYXdUZXh0QnlGdWxseVF1YWxpZmllZFRleHRJZChmb3JtYXRJdGVtLmRhdGFTb3VyY2UsIGxhbmd1YWdlQ29kZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGZvcm1hdHRlZEl0ZW06IHN0cmluZyA9IHRleHRJdGVtLnZhbHVlO1xyXG5cclxuICAgICAgICAvLyBXZW5uIEZlaGxlciBhdWZnZXRyZXRlbiBzaW5kIHdlcmRlbiBkaWVzZSBpbiBkZW4gZXJyb3JDb250YWluZXIgZ2VwdXNodCB1bmQgZWluZSBleGVwdGlvbiB3aXJkIGdld29yZmVuXHJcbiAgICAgICAgaWYoIXRleHRJdGVtLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICBUZXh0U3lzdGVtRXJyb3JIYW5kbGVyLnRocm93Rm9ybWF0dGVyRXJyb3JzKHRleHRJdGVtLmVycm9yc1swXSwgZm9ybWF0dGVkSXRlbSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjb252ZXJ0IHRoZSByZWNlaXZlZCBzdHJpbmcgaW4gZGF0YWJhc2UgdG8gRm9ybWF0dGVySW5wdXRBcmd1bWVudFN0cmluZ1xyXG4gICAgICAgIGxldCBpbnB1dEFyZ3VtZW50OiBGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50U3RyaW5nID0gbmV3IEZvcm1hdHRlcklucHV0QXJndW1lbnRTdHJpbmcoZm9ybWF0dGVkSXRlbSk7XHJcblxyXG4gICAgICAgIHJldHVybiBpbnB1dEFyZ3VtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvY2VzcyB0aGUgYXJndW1lbnQgZGF0YSBzb3VyY2UgXHJcbiAgICAgKiBDYW4gdGhyb3cgRXJyb3Igc3RyaW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0Zvcm1hdEl0ZW19IGZvcm1hdEl0ZW1cclxuICAgICAqIEBwYXJhbSB7KEZvcm1hdHRlcklucHV0QXJndW1lbnRMaXN0IHwgdW5kZWZpbmVkKX0gYXJndW1lbnRMaXN0XHJcbiAgICAgKiBAcmV0dXJuIHsqfSAge0lGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50fVxyXG4gICAgICogQG1lbWJlcm9mIFRleHRGb3JtYXR0ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWNlaXZlSW5wdXRBcmd1bWVudEZyb21Bcmd1bWVudERhdGFTb3VyY2UoZm9ybWF0SXRlbTogRm9ybWF0SXRlbSwgYXJndW1lbnRMaXN0ID86IEZvcm1hdHRlcklucHV0QXJndW1lbnRMaXN0KTogSUZvcm1hdHRlcklucHV0QXJndW1lbnQge1xyXG5cclxuICAgICAgICBsZXQgY2hlY2tlZElucHV0QXJndW1lbnQ6IENoZWNrZWRJbnB1dEFyZ3VtZW50ID0gRWRpdFN0cmluZ0hlbHBlci5nZXRJbnB1dEFyZ3VtZW50RnJvbVRleHQoZm9ybWF0SXRlbS5kYXRhU291cmNlLCBhcmd1bWVudExpc3QpO1xyXG5cclxuICAgICAgICBpZihjaGVja2VkSW5wdXRBcmd1bWVudC5lcnJvciAhPT0gMCkge1xyXG4gICAgICAgICAgICBUZXh0U3lzdGVtRXJyb3JIYW5kbGVyLnRocm93Rm9ybWF0dGVyRXJyb3JzKGNoZWNrZWRJbnB1dEFyZ3VtZW50LmVycm9yLCBUZXh0U3lzdGVtRXJyb3JIYW5kbGVyLmRlZmF1bHRFcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNoZWNrZWRJbnB1dEFyZ3VtZW50LmlucHV0QXJndW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGhlIHByb2Nlc3NlZCBmb3JtYXQgaXRlbSBuZWVkIHRvIGJlIHByb2Nlc3NlZCBhZ2FpbiBmb3IgaW5uZXIgZm9ybWF0IGl0ZW1zXHJcbiAgICAgKiBUaGUgcmVjdXJzaW9uIGlzIGxpbWl0ZWQgYnkgMTBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZvcm1hdHRlZEl0ZW1cclxuICAgICAqIEBwYXJhbSB7Rm9ybWF0SXRlbX0gZm9ybWF0SXRlbVxyXG4gICAgICogQHBhcmFtIHtJVGV4dFByb3ZpZGVyfSBbdGV4dFN5c3RlbUludGVyZmFjZV1cclxuICAgICAqIEBwYXJhbSB7Rm9ybWF0dGVySW5wdXRBcmd1bWVudExpc3R9IFthcmd1bWVudExpc3RdXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2xhbmd1YWdlQ29kZV1cclxuICAgICAqIEByZXR1cm4geyp9ICB7UmF3VGV4dEl0ZW19XHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dEZvcm1hdHRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHByb2Nlc3NSZWN1cnNpdmVGb3JtYXRJdGVtKGZvcm1hdHRlZEl0ZW06IHN0cmluZywgZm9ybWF0SXRlbTogRm9ybWF0SXRlbSwgdGV4dFN5c3RlbUludGVyZmFjZSA/OiBJVGV4dFByb3ZpZGVyLCBhcmd1bWVudExpc3QgPzogRm9ybWF0dGVySW5wdXRBcmd1bWVudExpc3QsIGxhbmd1YWdlQ29kZT86c3RyaW5nKSA6IHN0cmluZyB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoZm9ybWF0SXRlbS5pc1JlY3Vyc2l2ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5fcmVjdXJzaW9uQ250Kys7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBkaXNhYmxlcyBlbmRsZXNzIHJlY3Vyc2lvbiBvZiBleHRlcm5hbCBkYXRhIHNvdXJjZSBpdGVtc1xyXG4gICAgICAgICAgICBpZih0aGlzLl9yZWN1cnNpb25DbnQgPj0gMTApIHtcclxuICAgICAgICAgICAgICAgIFRleHRTeXN0ZW1FcnJvckhhbmRsZXIudGhyb3dGb3JtYXR0ZXJFcnJvcnMoVGV4dFN5c3RlbUVycm9yVHlwZXMuRW5kbGVzc1JlY3Vyc2lvbiwgVGV4dFN5c3RlbUVycm9ySGFuZGxlci5kZWZhdWx0RXJyb3JNZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gUmVjdXJzaW9uOiBTZWFyY2ggZm9yIGEgZm9ybWF0IGl0ZW0gaW4gdGhlIGZvcm1hdHRlZCBpdGVtXHJcbiAgICAgICAgICAgIGZvcm1hdHRlZEl0ZW0gPSAgdGhpcy5yZXBsYWNlRm9ybWF0SXRlbXMoZm9ybWF0dGVkSXRlbSwgdGV4dFN5c3RlbUludGVyZmFjZSwgYXJndW1lbnRMaXN0LCBsYW5ndWFnZUNvZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gcmVzZXQgdGhlIHJlY3Vyc2lvbiBjb3VudGVyXHJcbiAgICAgICAgICAgIHRoaXMuX3JlY3Vyc2lvbkNudCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZm9ybWF0dGVkSXRlbTtcclxuICAgIH1cclxufSJdfQ==