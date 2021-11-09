define(["require", "exports", "../interface/formatterInputArgumentInterface", "../textSystemErrorHandler", "../textSystemErrorType", "./formatter/floatSubFormatter", "./formatter/intSubFormatter", "./formatter/stringSubFormatter"], function (require, exports, formatterInputArgumentInterface_1, textSystemErrorHandler_1, textSystemErrorType_1, floatSubFormatter_1, intSubFormatter_1, stringSubFormatter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This class selects the right formatter to process a single format item
     *
     * @export
     * @static
     * @class SubFormatterSelector
     */
    var SubFormatterSelector = /** @class */ (function () {
        /**
         * Constructor set to private SubFormatterSelector class should only provide static functions.
         * Creates an instance of SubFormatterSelector.
         * @memberof SubFormatterSelector
         */
        function SubFormatterSelector() {
        }
        ;
        /**
         * Get the formatted string of the argument data source.
         * Selects the right formatter for the passed input argument
         *
         * @static
         * @param {IInputArgument} argumentItem
         * @param {(string | undefined)} [formatSpecification=undefined]
         * @return {string}
         * @memberof SubFormatterSelector
         */
        SubFormatterSelector.formatArgumentItem = function (argumentItem, formatSpecification) {
            var formattedItem = "";
            // get the formatter for the given input argument
            var subformatter = this._subFormatterMap.get(argumentItem.inputType);
            if (subformatter !== undefined) {
                formattedItem = subformatter.format(argumentItem.argument, formatSpecification, argumentItem.engineeringUnit);
            }
            else {
                textSystemErrorHandler_1.TextSystemErrorHandler.throwFormatterErrors(textSystemErrorType_1.TextSystemErrorTypes.NoFormatterForInputArgumentFound, textSystemErrorHandler_1.TextSystemErrorHandler.defaultErrorMessage);
            }
            return formattedItem;
        };
        // Map used for getting the right subformatter
        SubFormatterSelector._subFormatterMap = new Map([
            [formatterInputArgumentInterface_1.FormatterArgumentTypes.Integer, new intSubFormatter_1.IntSubFormatter()],
            [formatterInputArgumentInterface_1.FormatterArgumentTypes.Float, new floatSubFormatter_1.FloatSubFormatter()],
            [formatterInputArgumentInterface_1.FormatterArgumentTypes.String, new stringSubFormatter_1.StringSubFormatter()]
        ]);
        return SubFormatterSelector;
    }());
    exports.SubFormatterSelector = SubFormatterSelector;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ViRm9ybWF0dGVyU2VsZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi90ZXh0UHJvdmlkZXIvdGV4dEZvcm1hdHRlci9zdWJGb3JtYXR0ZXJTZWxlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFTQTs7Ozs7O09BTUc7SUFDSDtRQVNJOzs7O1dBSUc7UUFDSDtRQUF1QixDQUFDO1FBQUEsQ0FBQztRQUV6Qjs7Ozs7Ozs7O1dBU0c7UUFDVyx1Q0FBa0IsR0FBaEMsVUFBaUMsWUFBcUMsRUFBRSxtQkFBeUM7WUFFN0csSUFBSSxhQUFhLEdBQVcsRUFBRSxDQUFDO1lBRS9CLGlEQUFpRDtZQUNqRCxJQUFJLFlBQVksR0FBK0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFakcsSUFBRyxZQUFZLEtBQUssU0FBUyxFQUFFO2dCQUMzQixhQUFhLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLG1CQUFtQixFQUFFLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUNqSDtpQkFDSTtnQkFDRCwrQ0FBc0IsQ0FBQyxvQkFBb0IsQ0FBQywwQ0FBb0IsQ0FBQyxnQ0FBZ0MsRUFBRSwrQ0FBc0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2FBQ2xKO1lBRUQsT0FBTyxhQUFhLENBQUM7UUFDekIsQ0FBQztRQXZDRCw4Q0FBOEM7UUFDdEIscUNBQWdCLEdBQWdELElBQUksR0FBRyxDQUF3QztZQUNuSSxDQUFDLHdEQUFzQixDQUFDLE9BQU8sRUFBRSxJQUFJLGlDQUFlLEVBQUUsQ0FBQztZQUN2RCxDQUFDLHdEQUFzQixDQUFDLEtBQUssRUFBRSxJQUFJLHFDQUFpQixFQUFFLENBQUM7WUFDdkQsQ0FBQyx3REFBc0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSx1Q0FBa0IsRUFBRSxDQUFDO1NBQzVELENBQUMsQ0FBQztRQW1DUCwyQkFBQztLQUFBLEFBMUNELElBMENDO0lBMUNZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElGb3JtYXRTcGVjaWZpY2F0aW9uIH0gZnJvbSBcIi4uL2ludGVyZmFjZS9mb3JtYXRTcGVjaWZpY2F0aW9uSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEZvcm1hdHRlckFyZ3VtZW50VHlwZXMsIElGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50IH0gZnJvbSBcIi4uL2ludGVyZmFjZS9mb3JtYXR0ZXJJbnB1dEFyZ3VtZW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTdWJGb3JtYXR0ZXIgfSBmcm9tIFwiLi4vaW50ZXJmYWNlL3N1YkZvcm1hdHRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUZXh0U3lzdGVtRXJyb3JIYW5kbGVyIH0gZnJvbSBcIi4uL3RleHRTeXN0ZW1FcnJvckhhbmRsZXJcIjtcclxuaW1wb3J0IHsgVGV4dFN5c3RlbUVycm9yVHlwZXMgfSBmcm9tIFwiLi4vdGV4dFN5c3RlbUVycm9yVHlwZVwiO1xyXG5pbXBvcnQgeyBGbG9hdFN1YkZvcm1hdHRlciB9IGZyb20gXCIuL2Zvcm1hdHRlci9mbG9hdFN1YkZvcm1hdHRlclwiO1xyXG5pbXBvcnQgeyBJbnRTdWJGb3JtYXR0ZXIgfSBmcm9tIFwiLi9mb3JtYXR0ZXIvaW50U3ViRm9ybWF0dGVyXCI7XHJcbmltcG9ydCB7IFN0cmluZ1N1YkZvcm1hdHRlciB9IGZyb20gXCIuL2Zvcm1hdHRlci9zdHJpbmdTdWJGb3JtYXR0ZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIHNlbGVjdHMgdGhlIHJpZ2h0IGZvcm1hdHRlciB0byBwcm9jZXNzIGEgc2luZ2xlIGZvcm1hdCBpdGVtXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQHN0YXRpY1xyXG4gKiBAY2xhc3MgU3ViRm9ybWF0dGVyU2VsZWN0b3JcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTdWJGb3JtYXR0ZXJTZWxlY3RvciB7XHJcbiAgICBcclxuICAgIC8vIE1hcCB1c2VkIGZvciBnZXR0aW5nIHRoZSByaWdodCBzdWJmb3JtYXR0ZXJcclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9zdWJGb3JtYXR0ZXJNYXAgOiBNYXA8Rm9ybWF0dGVyQXJndW1lbnRUeXBlcywgSVN1YkZvcm1hdHRlcj4gPSBuZXcgTWFwPEZvcm1hdHRlckFyZ3VtZW50VHlwZXMsIElTdWJGb3JtYXR0ZXI+KFtcclxuICAgICAgICBbRm9ybWF0dGVyQXJndW1lbnRUeXBlcy5JbnRlZ2VyLCBuZXcgSW50U3ViRm9ybWF0dGVyKCldLFxyXG4gICAgICAgIFtGb3JtYXR0ZXJBcmd1bWVudFR5cGVzLkZsb2F0LCBuZXcgRmxvYXRTdWJGb3JtYXR0ZXIoKV0sIFxyXG4gICAgICAgIFtGb3JtYXR0ZXJBcmd1bWVudFR5cGVzLlN0cmluZywgbmV3IFN0cmluZ1N1YkZvcm1hdHRlcigpXVxyXG4gICAgXSk7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ29uc3RydWN0b3Igc2V0IHRvIHByaXZhdGUgU3ViRm9ybWF0dGVyU2VsZWN0b3IgY2xhc3Mgc2hvdWxkIG9ubHkgcHJvdmlkZSBzdGF0aWMgZnVuY3Rpb25zLlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTdWJGb3JtYXR0ZXJTZWxlY3Rvci5cclxuICAgICAqIEBtZW1iZXJvZiBTdWJGb3JtYXR0ZXJTZWxlY3RvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIGZvcm1hdHRlZCBzdHJpbmcgb2YgdGhlIGFyZ3VtZW50IGRhdGEgc291cmNlLlxyXG4gICAgICogU2VsZWN0cyB0aGUgcmlnaHQgZm9ybWF0dGVyIGZvciB0aGUgcGFzc2VkIGlucHV0IGFyZ3VtZW50XHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtJSW5wdXRBcmd1bWVudH0gYXJndW1lbnRJdGVtXHJcbiAgICAgKiBAcGFyYW0geyhzdHJpbmcgfCB1bmRlZmluZWQpfSBbZm9ybWF0U3BlY2lmaWNhdGlvbj11bmRlZmluZWRdXHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU3ViRm9ybWF0dGVyU2VsZWN0b3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmb3JtYXRBcmd1bWVudEl0ZW0oYXJndW1lbnRJdGVtOiBJRm9ybWF0dGVySW5wdXRBcmd1bWVudCwgZm9ybWF0U3BlY2lmaWNhdGlvbjogSUZvcm1hdFNwZWNpZmljYXRpb24pOiBzdHJpbmcge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBmb3JtYXR0ZWRJdGVtOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIGZvcm1hdHRlciBmb3IgdGhlIGdpdmVuIGlucHV0IGFyZ3VtZW50XHJcbiAgICAgICAgbGV0IHN1YmZvcm1hdHRlciA6IElTdWJGb3JtYXR0ZXIgfCB1bmRlZmluZWQgPSB0aGlzLl9zdWJGb3JtYXR0ZXJNYXAuZ2V0KGFyZ3VtZW50SXRlbS5pbnB1dFR5cGUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHN1YmZvcm1hdHRlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGZvcm1hdHRlZEl0ZW0gPSBzdWJmb3JtYXR0ZXIuZm9ybWF0KGFyZ3VtZW50SXRlbS5hcmd1bWVudCwgZm9ybWF0U3BlY2lmaWNhdGlvbiwgYXJndW1lbnRJdGVtLmVuZ2luZWVyaW5nVW5pdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBUZXh0U3lzdGVtRXJyb3JIYW5kbGVyLnRocm93Rm9ybWF0dGVyRXJyb3JzKFRleHRTeXN0ZW1FcnJvclR5cGVzLk5vRm9ybWF0dGVyRm9ySW5wdXRBcmd1bWVudEZvdW5kLCBUZXh0U3lzdGVtRXJyb3JIYW5kbGVyLmRlZmF1bHRFcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcm1hdHRlZEl0ZW07XHJcbiAgICB9XHJcbn1cclxuIl19