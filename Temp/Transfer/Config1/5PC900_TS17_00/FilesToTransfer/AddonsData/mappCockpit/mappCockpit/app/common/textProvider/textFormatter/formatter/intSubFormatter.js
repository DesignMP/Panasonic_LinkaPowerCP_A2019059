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
define(["require", "exports", "../formatSpecification/formatSpecificationType", "./baseFormatter", "./baseFormatterHelper"], function (require, exports, formatSpecificationType_1, baseFormatter_1, baseFormatterHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Subformatter for processing integer input arguments
     *
     * @export
     * @class IntSubFormatter
     * @extends {BaseFormatter}
     */
    var IntSubFormatter = /** @class */ (function (_super) {
        __extends(IntSubFormatter, _super);
        function IntSubFormatter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Adapt the argument to the type with the passed precision
         *
         * @override
         * @param {(number | string)} inputArgument
         * @param {number} precision
         * @param {(FormatSpecificationTypes} type
         * @return {*}  {string}
         * @memberof IntSubFormatter
         */
        IntSubFormatter.prototype.useFormatSpecificationPrecisionAndType = function (inputArgument, precision, type) {
            var argument = inputArgument;
            var formattedArgument = this.adaptType(argument, type);
            formattedArgument = this.preciseArgument(formattedArgument, precision);
            return formattedArgument;
        };
        /**
         * Adapt the argument to the type if there is a suitable type
         * else convert the argument from number to string
         *
         * @private
         * @param {number} argument
         * @param {FormatSpecificationTypes} [formatSpecificationType]
         * @return {*}  {string}
         * @memberof IntSubFormatter
         */
        IntSubFormatter.prototype.adaptType = function (argument, formatSpecificationType) {
            var addaptedArgument = argument.toString();
            if (formatSpecificationType === formatSpecificationType_1.FormatSpecificationTypes.octalNumber) {
                addaptedArgument = argument.toString(8);
            }
            if (formatSpecificationType === formatSpecificationType_1.FormatSpecificationTypes.hexadecimalLowercase) {
                addaptedArgument = argument.toString(16);
                addaptedArgument = addaptedArgument.toLowerCase();
            }
            if (formatSpecificationType === formatSpecificationType_1.FormatSpecificationTypes.hexadecimalUppercase) {
                addaptedArgument = argument.toString(16);
                addaptedArgument = addaptedArgument.toUpperCase();
            }
            return addaptedArgument;
        };
        /**
         * As long the precision > argument.length, "0" are appended on front of the argument
         *
         * @private
         * @param {string} argument
         * @param {number} precision
         * @return {*}  {string}
         * @memberof IntSubFormatter
         */
        IntSubFormatter.prototype.preciseArgument = function (argument, precision) {
            return baseFormatterHelper_1.BaseFormatterHelper.extendArgumentToLength(argument, precision, true, "0");
        };
        return IntSubFormatter;
    }(baseFormatter_1.BaseFormatter));
    exports.IntSubFormatter = IntSubFormatter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50U3ViRm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vdGV4dFByb3ZpZGVyL3RleHRGb3JtYXR0ZXIvZm9ybWF0dGVyL2ludFN1YkZvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBSUE7Ozs7OztPQU1HO0lBQ0g7UUFBcUMsbUNBQWE7UUFBbEQ7O1FBa0VBLENBQUM7UUFoRUc7Ozs7Ozs7OztXQVNHO1FBQ0ksZ0VBQXNDLEdBQTdDLFVBQThDLGFBQThCLEVBQUUsU0FBaUIsRUFBRSxJQUE4QjtZQUMzSCxJQUFJLFFBQVEsR0FBVyxhQUF1QixDQUFDO1lBRS9DLElBQUksaUJBQWlCLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFL0QsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUV2RSxPQUFPLGlCQUFpQixDQUFDO1FBRTdCLENBQUM7UUFFRDs7Ozs7Ozs7O1dBU0c7UUFDSyxtQ0FBUyxHQUFqQixVQUFrQixRQUFnQixFQUFFLHVCQUFrRDtZQUVsRixJQUFJLGdCQUFnQixHQUFXLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUVuRCxJQUFHLHVCQUF1QixLQUFLLGtEQUF3QixDQUFDLFdBQVcsRUFBRTtnQkFDakUsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMzQztZQUNELElBQUcsdUJBQXVCLEtBQUssa0RBQXdCLENBQUMsb0JBQW9CLEVBQUU7Z0JBQzFFLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3pDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO2FBRXJEO1lBQ0QsSUFBRyx1QkFBdUIsS0FBSyxrREFBd0IsQ0FBQyxvQkFBb0IsRUFBRTtnQkFDMUUsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDekMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDckQ7WUFFRCxPQUFPLGdCQUFnQixDQUFDO1FBQzVCLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNLLHlDQUFlLEdBQXZCLFVBQXdCLFFBQWdCLEVBQUUsU0FBaUI7WUFFdkQsT0FBTyx5Q0FBbUIsQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN0RixDQUFDO1FBQ0wsc0JBQUM7SUFBRCxDQUFDLEFBbEVELENBQXFDLDZCQUFhLEdBa0VqRDtJQWxFWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1hdFNwZWNpZmljYXRpb25UeXBlcyB9IGZyb20gXCIuLi9mb3JtYXRTcGVjaWZpY2F0aW9uL2Zvcm1hdFNwZWNpZmljYXRpb25UeXBlXCI7XHJcbmltcG9ydCB7IEJhc2VGb3JtYXR0ZXIgfSBmcm9tIFwiLi9iYXNlRm9ybWF0dGVyXCI7XHJcbmltcG9ydCB7IEJhc2VGb3JtYXR0ZXJIZWxwZXIgfSBmcm9tIFwiLi9iYXNlRm9ybWF0dGVySGVscGVyXCI7XHJcblxyXG4vKipcclxuICogU3ViZm9ybWF0dGVyIGZvciBwcm9jZXNzaW5nIGludGVnZXIgaW5wdXQgYXJndW1lbnRzXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIEludFN1YkZvcm1hdHRlclxyXG4gKiBAZXh0ZW5kcyB7QmFzZUZvcm1hdHRlcn1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBJbnRTdWJGb3JtYXR0ZXIgZXh0ZW5kcyBCYXNlRm9ybWF0dGVyeyAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRhcHQgdGhlIGFyZ3VtZW50IHRvIHRoZSB0eXBlIHdpdGggdGhlIHBhc3NlZCBwcmVjaXNpb25cclxuICAgICAqIFxyXG4gICAgICogQG92ZXJyaWRlXHJcbiAgICAgKiBAcGFyYW0geyhudW1iZXIgfCBzdHJpbmcpfSBpbnB1dEFyZ3VtZW50XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcHJlY2lzaW9uXHJcbiAgICAgKiBAcGFyYW0geyhGb3JtYXRTcGVjaWZpY2F0aW9uVHlwZXN9IHR5cGVcclxuICAgICAqIEByZXR1cm4geyp9ICB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIEludFN1YkZvcm1hdHRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXNlRm9ybWF0U3BlY2lmaWNhdGlvblByZWNpc2lvbkFuZFR5cGUoaW5wdXRBcmd1bWVudDogbnVtYmVyIHwgc3RyaW5nLCBwcmVjaXNpb246IG51bWJlciwgdHlwZTogRm9ybWF0U3BlY2lmaWNhdGlvblR5cGVzKSA6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGFyZ3VtZW50OiBudW1iZXIgPSBpbnB1dEFyZ3VtZW50IGFzIG51bWJlcjtcclxuXHJcbiAgICAgICAgbGV0IGZvcm1hdHRlZEFyZ3VtZW50OiBzdHJpbmcgPSB0aGlzLmFkYXB0VHlwZShhcmd1bWVudCwgdHlwZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9ybWF0dGVkQXJndW1lbnQgPSB0aGlzLnByZWNpc2VBcmd1bWVudChmb3JtYXR0ZWRBcmd1bWVudCwgcHJlY2lzaW9uKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcm1hdHRlZEFyZ3VtZW50O1xyXG5cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGFwdCB0aGUgYXJndW1lbnQgdG8gdGhlIHR5cGUgaWYgdGhlcmUgaXMgYSBzdWl0YWJsZSB0eXBlXHJcbiAgICAgKiBlbHNlIGNvbnZlcnQgdGhlIGFyZ3VtZW50IGZyb20gbnVtYmVyIHRvIHN0cmluZ1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYXJndW1lbnRcclxuICAgICAqIEBwYXJhbSB7Rm9ybWF0U3BlY2lmaWNhdGlvblR5cGVzfSBbZm9ybWF0U3BlY2lmaWNhdGlvblR5cGVdXHJcbiAgICAgKiBAcmV0dXJuIHsqfSAge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBJbnRTdWJGb3JtYXR0ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGFwdFR5cGUoYXJndW1lbnQ6IG51bWJlciwgZm9ybWF0U3BlY2lmaWNhdGlvblR5cGU/OiBGb3JtYXRTcGVjaWZpY2F0aW9uVHlwZXMpIDogc3RyaW5nIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgYWRkYXB0ZWRBcmd1bWVudDogc3RyaW5nID0gYXJndW1lbnQudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgaWYoZm9ybWF0U3BlY2lmaWNhdGlvblR5cGUgPT09IEZvcm1hdFNwZWNpZmljYXRpb25UeXBlcy5vY3RhbE51bWJlcikge1xyXG4gICAgICAgICAgICBhZGRhcHRlZEFyZ3VtZW50ID0gYXJndW1lbnQudG9TdHJpbmcoOCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGZvcm1hdFNwZWNpZmljYXRpb25UeXBlID09PSBGb3JtYXRTcGVjaWZpY2F0aW9uVHlwZXMuaGV4YWRlY2ltYWxMb3dlcmNhc2UpIHtcclxuICAgICAgICAgICAgYWRkYXB0ZWRBcmd1bWVudCA9IGFyZ3VtZW50LnRvU3RyaW5nKDE2KTtcclxuICAgICAgICAgICAgYWRkYXB0ZWRBcmd1bWVudCA9IGFkZGFwdGVkQXJndW1lbnQudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGZvcm1hdFNwZWNpZmljYXRpb25UeXBlID09PSBGb3JtYXRTcGVjaWZpY2F0aW9uVHlwZXMuaGV4YWRlY2ltYWxVcHBlcmNhc2UpIHtcclxuICAgICAgICAgICAgYWRkYXB0ZWRBcmd1bWVudCA9IGFyZ3VtZW50LnRvU3RyaW5nKDE2KTtcclxuICAgICAgICAgICAgYWRkYXB0ZWRBcmd1bWVudCA9IGFkZGFwdGVkQXJndW1lbnQudG9VcHBlckNhc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhZGRhcHRlZEFyZ3VtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXMgbG9uZyB0aGUgcHJlY2lzaW9uID4gYXJndW1lbnQubGVuZ3RoLCBcIjBcIiBhcmUgYXBwZW5kZWQgb24gZnJvbnQgb2YgdGhlIGFyZ3VtZW50XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhcmd1bWVudFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHByZWNpc2lvblxyXG4gICAgICogQHJldHVybiB7Kn0gIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgSW50U3ViRm9ybWF0dGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcHJlY2lzZUFyZ3VtZW50KGFyZ3VtZW50OiBzdHJpbmcsIHByZWNpc2lvbjogbnVtYmVyKSA6IHN0cmluZyB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIEJhc2VGb3JtYXR0ZXJIZWxwZXIuZXh0ZW5kQXJndW1lbnRUb0xlbmd0aChhcmd1bWVudCwgcHJlY2lzaW9uLCB0cnVlLCBcIjBcIik7XHJcbiAgICB9XHJcbn0iXX0=