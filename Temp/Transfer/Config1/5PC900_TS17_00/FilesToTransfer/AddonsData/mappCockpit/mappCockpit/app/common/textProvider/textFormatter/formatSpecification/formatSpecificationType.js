define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FormatSpecificationTypes;
    (function (FormatSpecificationTypes) {
        FormatSpecificationTypes["noType"] = "no type";
        FormatSpecificationTypes["signedInteger"] = "d o. i";
        FormatSpecificationTypes["unsignedInteger"] = "u";
        FormatSpecificationTypes["octalNumber"] = "o";
        FormatSpecificationTypes["hexadecimalLowercase"] = "x";
        FormatSpecificationTypes["hexadecimalUppercase"] = "X";
        FormatSpecificationTypes["decimalOutput"] = "f";
        FormatSpecificationTypes["scientificERepresentationLowerCase"] = "e";
        FormatSpecificationTypes["scientificERepresentationUpperCase"] = "E";
        FormatSpecificationTypes["lengthOptimizedOutput"] = "g o. G";
    })(FormatSpecificationTypes = exports.FormatSpecificationTypes || (exports.FormatSpecificationTypes = {}));
    /**
     * This class provides static formatSpecificationType functions
     *
     * @static
     * @class FormatSpecificationType
     */
    var FormatSpecificationType = /** @class */ (function () {
        /**
         * Constructor set to private FormatSpecificationType class should only provide static functions.
         * Creates an instance of FormatSpecificationType.
         * @memberof FormatSpecificationType
         */
        function FormatSpecificationType() {
        }
        ;
        /**
         * Check if the type string match to an IFormatSpecificationType and returns that
         * If there is no the IFormatSpecifaction.type is set to undefined
         *
         * @static
         * @param {IFormatSpecification} formatSpecification
         * @param {string} type
         * @return {IFormatSpecification}
         * @memberof FormatSpecificationType
         */
        FormatSpecificationType.getFormatSpecificationType = function (formatSpecification, type) {
            // get the type or undefined
            var formatSpecificationType = this._typeMap.get(type);
            if (formatSpecificationType === undefined) {
                formatSpecificationType = FormatSpecificationTypes.noType;
            }
            formatSpecification.type = formatSpecificationType;
            return formatSpecification;
        };
        /**
         * Returns either the position from the textFormatSpecification before the type information
         * or the last position of the string when there is no type
         *
         * @static
         * @param {string} textFormatSpecification
         * @return {*}  {number}
         * @memberof FormatSpecificationType
         */
        FormatSpecificationType.getTypeSeperator = function (textFormatSpecification) {
            var typeSeperator = textFormatSpecification.length - 1;
            if (this._typeMap.get(textFormatSpecification[typeSeperator]) === undefined) {
                ++typeSeperator;
            }
            return typeSeperator;
        };
        FormatSpecificationType._typeMap = new Map([
            ["d", FormatSpecificationTypes.signedInteger],
            ["i", FormatSpecificationTypes.signedInteger],
            ["u", FormatSpecificationTypes.unsignedInteger],
            ["o", FormatSpecificationTypes.octalNumber],
            ["x", FormatSpecificationTypes.hexadecimalLowercase],
            ["X", FormatSpecificationTypes.hexadecimalUppercase],
            ["f", FormatSpecificationTypes.decimalOutput],
            ["e", FormatSpecificationTypes.scientificERepresentationLowerCase],
            ["E", FormatSpecificationTypes.scientificERepresentationUpperCase],
            ["g", FormatSpecificationTypes.lengthOptimizedOutput],
            ["G", FormatSpecificationTypes.lengthOptimizedOutput]
        ]);
        return FormatSpecificationType;
    }());
    exports.FormatSpecificationType = FormatSpecificationType;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0U3BlY2lmaWNhdGlvblR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi90ZXh0UHJvdmlkZXIvdGV4dEZvcm1hdHRlci9mb3JtYXRTcGVjaWZpY2F0aW9uL2Zvcm1hdFNwZWNpZmljYXRpb25UeXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUVBLElBQVksd0JBV1g7SUFYRCxXQUFZLHdCQUF3QjtRQUNoQyw4Q0FBa0IsQ0FBQTtRQUNsQixvREFBdUIsQ0FBQTtRQUN2QixpREFBcUIsQ0FBQTtRQUNyQiw2Q0FBaUIsQ0FBQTtRQUNqQixzREFBMEIsQ0FBQTtRQUMxQixzREFBMEIsQ0FBQTtRQUMxQiwrQ0FBbUIsQ0FBQTtRQUNuQixvRUFBd0MsQ0FBQTtRQUN4QyxvRUFBd0MsQ0FBQTtRQUN4Qyw0REFBZ0MsQ0FBQTtJQUNwQyxDQUFDLEVBWFcsd0JBQXdCLEdBQXhCLGdDQUF3QixLQUF4QixnQ0FBd0IsUUFXbkM7SUFFRDs7Ozs7T0FLRztJQUNIO1FBZ0JJOzs7O1dBSUc7UUFDSDtRQUF1QixDQUFDO1FBQUEsQ0FBQztRQUV6Qjs7Ozs7Ozs7O1dBU0c7UUFDVyxrREFBMEIsR0FBeEMsVUFBeUMsbUJBQXlDLEVBQUUsSUFBWTtZQUU1Riw0QkFBNEI7WUFDNUIsSUFBSSx1QkFBdUIsR0FBeUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFNUYsSUFBRyx1QkFBdUIsS0FBSyxTQUFTLEVBQUU7Z0JBQ3RDLHVCQUF1QixHQUFHLHdCQUF3QixDQUFDLE1BQU0sQ0FBQzthQUM3RDtZQUVELG1CQUFtQixDQUFDLElBQUksR0FBRyx1QkFBdUIsQ0FBQztZQUVuRCxPQUFPLG1CQUFtQixDQUFDO1FBQy9CLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNXLHdDQUFnQixHQUE5QixVQUErQix1QkFBK0I7WUFFMUQsSUFBSSxhQUFhLEdBQVcsdUJBQXVCLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQztZQUU3RCxJQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUFFO2dCQUN4RSxFQUFFLGFBQWEsQ0FBQzthQUNuQjtZQUVELE9BQU8sYUFBYSxDQUFDO1FBQ3pCLENBQUM7UUEvRHVCLGdDQUFRLEdBQTJDLElBQUksR0FBRyxDQUFvQztZQUNsSCxDQUFDLEdBQUcsRUFBRSx3QkFBd0IsQ0FBQyxhQUFhLENBQUM7WUFDN0MsQ0FBQyxHQUFHLEVBQUUsd0JBQXdCLENBQUMsYUFBYSxDQUFDO1lBQzdDLENBQUMsR0FBRyxFQUFFLHdCQUF3QixDQUFDLGVBQWUsQ0FBQztZQUMvQyxDQUFDLEdBQUcsRUFBRSx3QkFBd0IsQ0FBQyxXQUFXLENBQUM7WUFDM0MsQ0FBQyxHQUFHLEVBQUUsd0JBQXdCLENBQUMsb0JBQW9CLENBQUM7WUFDcEQsQ0FBQyxHQUFHLEVBQUUsd0JBQXdCLENBQUMsb0JBQW9CLENBQUM7WUFDcEQsQ0FBQyxHQUFHLEVBQUUsd0JBQXdCLENBQUMsYUFBYSxDQUFDO1lBQzdDLENBQUMsR0FBRyxFQUFFLHdCQUF3QixDQUFDLGtDQUFrQyxDQUFDO1lBQ2xFLENBQUMsR0FBRyxFQUFFLHdCQUF3QixDQUFDLGtDQUFrQyxDQUFDO1lBQ2xFLENBQUMsR0FBRyxFQUFFLHdCQUF3QixDQUFDLHFCQUFxQixDQUFDO1lBQ3JELENBQUMsR0FBRyxFQUFFLHdCQUF3QixDQUFDLHFCQUFxQixDQUFDO1NBQ3hELENBQUMsQ0FBQztRQW9EUCw4QkFBQztLQUFBLEFBbEVELElBa0VDO0lBbEVZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElGb3JtYXRTcGVjaWZpY2F0aW9uIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZS9mb3JtYXRTcGVjaWZpY2F0aW9uSW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgZW51bSBGb3JtYXRTcGVjaWZpY2F0aW9uVHlwZXN7XHJcbiAgICBub1R5cGUgPSBcIm5vIHR5cGVcIiwgICAgICAgICAgICAgICAgICAgICAvLyBkZWZhdWx0IHdoZW4gbm8gdHlwZSBpcyBwYXNzZWRcclxuICAgIHNpZ25lZEludGVnZXIgPVwiZCBvLiBpXCIsXHJcbiAgICB1bnNpZ25lZEludGVnZXIgPSBcInVcIixcclxuICAgIG9jdGFsTnVtYmVyID0gXCJvXCIsXHJcbiAgICBoZXhhZGVjaW1hbExvd2VyY2FzZSA9IFwieFwiLFxyXG4gICAgaGV4YWRlY2ltYWxVcHBlcmNhc2UgPSBcIlhcIixcclxuICAgIGRlY2ltYWxPdXRwdXQgPSBcImZcIixcclxuICAgIHNjaWVudGlmaWNFUmVwcmVzZW50YXRpb25Mb3dlckNhc2UgPSBcImVcIixcclxuICAgIHNjaWVudGlmaWNFUmVwcmVzZW50YXRpb25VcHBlckNhc2UgPSBcIkVcIixcclxuICAgIGxlbmd0aE9wdGltaXplZE91dHB1dCA9IFwiZyBvLiBHXCJcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgcHJvdmlkZXMgc3RhdGljIGZvcm1hdFNwZWNpZmljYXRpb25UeXBlIGZ1bmN0aW9uc1xyXG4gKiBcclxuICogQHN0YXRpY1xyXG4gKiBAY2xhc3MgRm9ybWF0U3BlY2lmaWNhdGlvblR5cGVcclxuICovXHJcbmV4cG9ydCBjbGFzcyBGb3JtYXRTcGVjaWZpY2F0aW9uVHlwZXtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX3R5cGVNYXAgOiBNYXA8c3RyaW5nLCBGb3JtYXRTcGVjaWZpY2F0aW9uVHlwZXM+ID0gbmV3IE1hcCA8c3RyaW5nLCBGb3JtYXRTcGVjaWZpY2F0aW9uVHlwZXM+KFtcclxuICAgICAgICBbXCJkXCIsIEZvcm1hdFNwZWNpZmljYXRpb25UeXBlcy5zaWduZWRJbnRlZ2VyXSxcclxuICAgICAgICBbXCJpXCIsIEZvcm1hdFNwZWNpZmljYXRpb25UeXBlcy5zaWduZWRJbnRlZ2VyXSxcclxuICAgICAgICBbXCJ1XCIsIEZvcm1hdFNwZWNpZmljYXRpb25UeXBlcy51bnNpZ25lZEludGVnZXJdLCBcclxuICAgICAgICBbXCJvXCIsIEZvcm1hdFNwZWNpZmljYXRpb25UeXBlcy5vY3RhbE51bWJlcl0sIFxyXG4gICAgICAgIFtcInhcIiwgRm9ybWF0U3BlY2lmaWNhdGlvblR5cGVzLmhleGFkZWNpbWFsTG93ZXJjYXNlXSxcclxuICAgICAgICBbXCJYXCIsIEZvcm1hdFNwZWNpZmljYXRpb25UeXBlcy5oZXhhZGVjaW1hbFVwcGVyY2FzZV0sIFxyXG4gICAgICAgIFtcImZcIiwgRm9ybWF0U3BlY2lmaWNhdGlvblR5cGVzLmRlY2ltYWxPdXRwdXRdLFxyXG4gICAgICAgIFtcImVcIiwgRm9ybWF0U3BlY2lmaWNhdGlvblR5cGVzLnNjaWVudGlmaWNFUmVwcmVzZW50YXRpb25Mb3dlckNhc2VdLFxyXG4gICAgICAgIFtcIkVcIiwgRm9ybWF0U3BlY2lmaWNhdGlvblR5cGVzLnNjaWVudGlmaWNFUmVwcmVzZW50YXRpb25VcHBlckNhc2VdLFxyXG4gICAgICAgIFtcImdcIiwgRm9ybWF0U3BlY2lmaWNhdGlvblR5cGVzLmxlbmd0aE9wdGltaXplZE91dHB1dF0sICAgICAgICBcclxuICAgICAgICBbXCJHXCIsIEZvcm1hdFNwZWNpZmljYXRpb25UeXBlcy5sZW5ndGhPcHRpbWl6ZWRPdXRwdXRdXHJcbiAgICBdKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnN0cnVjdG9yIHNldCB0byBwcml2YXRlIEZvcm1hdFNwZWNpZmljYXRpb25UeXBlIGNsYXNzIHNob3VsZCBvbmx5IHByb3ZpZGUgc3RhdGljIGZ1bmN0aW9ucy5cclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgRm9ybWF0U3BlY2lmaWNhdGlvblR5cGUuXHJcbiAgICAgKiBAbWVtYmVyb2YgRm9ybWF0U3BlY2lmaWNhdGlvblR5cGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaWYgdGhlIHR5cGUgc3RyaW5nIG1hdGNoIHRvIGFuIElGb3JtYXRTcGVjaWZpY2F0aW9uVHlwZSBhbmQgcmV0dXJucyB0aGF0XHJcbiAgICAgKiBJZiB0aGVyZSBpcyBubyB0aGUgSUZvcm1hdFNwZWNpZmFjdGlvbi50eXBlIGlzIHNldCB0byB1bmRlZmluZWQgXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtJRm9ybWF0U3BlY2lmaWNhdGlvbn0gZm9ybWF0U3BlY2lmaWNhdGlvblxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcclxuICAgICAqIEByZXR1cm4ge0lGb3JtYXRTcGVjaWZpY2F0aW9ufVxyXG4gICAgICogQG1lbWJlcm9mIEZvcm1hdFNwZWNpZmljYXRpb25UeXBlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Rm9ybWF0U3BlY2lmaWNhdGlvblR5cGUoZm9ybWF0U3BlY2lmaWNhdGlvbjogSUZvcm1hdFNwZWNpZmljYXRpb24sIHR5cGU6IHN0cmluZykgOiBJRm9ybWF0U3BlY2lmaWNhdGlvbiB7ICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGdldCB0aGUgdHlwZSBvciB1bmRlZmluZWRcclxuICAgICAgICBsZXQgZm9ybWF0U3BlY2lmaWNhdGlvblR5cGU6IEZvcm1hdFNwZWNpZmljYXRpb25UeXBlcyB8IHVuZGVmaW5lZCA9IHRoaXMuX3R5cGVNYXAuZ2V0KHR5cGUpO1xyXG5cclxuICAgICAgICBpZihmb3JtYXRTcGVjaWZpY2F0aW9uVHlwZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGZvcm1hdFNwZWNpZmljYXRpb25UeXBlID0gRm9ybWF0U3BlY2lmaWNhdGlvblR5cGVzLm5vVHlwZTtcclxuICAgICAgICB9IFxyXG5cclxuICAgICAgICBmb3JtYXRTcGVjaWZpY2F0aW9uLnR5cGUgPSBmb3JtYXRTcGVjaWZpY2F0aW9uVHlwZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcm1hdFNwZWNpZmljYXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGVpdGhlciB0aGUgcG9zaXRpb24gZnJvbSB0aGUgdGV4dEZvcm1hdFNwZWNpZmljYXRpb24gYmVmb3JlIHRoZSB0eXBlIGluZm9ybWF0aW9uXHJcbiAgICAgKiBvciB0aGUgbGFzdCBwb3NpdGlvbiBvZiB0aGUgc3RyaW5nIHdoZW4gdGhlcmUgaXMgbm8gdHlwZVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0Rm9ybWF0U3BlY2lmaWNhdGlvblxyXG4gICAgICogQHJldHVybiB7Kn0gIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgRm9ybWF0U3BlY2lmaWNhdGlvblR5cGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRUeXBlU2VwZXJhdG9yKHRleHRGb3JtYXRTcGVjaWZpY2F0aW9uOiBzdHJpbmcpIDogbnVtYmVyIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgdHlwZVNlcGVyYXRvcjogbnVtYmVyID0gdGV4dEZvcm1hdFNwZWNpZmljYXRpb24ubGVuZ3RoLTE7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5fdHlwZU1hcC5nZXQodGV4dEZvcm1hdFNwZWNpZmljYXRpb25bdHlwZVNlcGVyYXRvcl0pID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgKyt0eXBlU2VwZXJhdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHR5cGVTZXBlcmF0b3I7XHJcbiAgICB9XHJcbn1cclxuIl19