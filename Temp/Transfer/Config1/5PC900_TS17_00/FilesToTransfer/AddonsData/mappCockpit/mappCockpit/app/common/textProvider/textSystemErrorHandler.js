define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Static class for creating error messages for the textsystem
     *
     * @export
     * @class TextSystemErrorHandler
     */
    var TextSystemErrorHandler = /** @class */ (function () {
        /**
         * Creates a static instance of TextSystemErrorHandler.
         * @private
         * @memberof TextSystemErrorHandler
         */
        function TextSystemErrorHandler() {
        }
        /**
         * SHOULD ONLY BE USED FOR DEFINED ERROR TYPES!
         * Put together namespace and textID to get the source and returns a specific error message
         *
         * @static
         * @param {TextSystemErrorTypes} errorType
         * @param {string} namespace
         * @param {string} textID
         * @return {*}  {string}
         * @memberof TextSystemErrorHandler
         */
        TextSystemErrorHandler.getErrorMessageByNamespaceAndID = function (errorType, namespace, textID) {
            var source = namespace + "/" + textID;
            return this.getErrorMessageBySource(errorType, source);
        };
        /**
         * SHOULD ONLY BE USED FOR DEFINED ERROR TYPES!
         * Returns a specific error message containing the error and the attampted access
         *
         * @static
         * @param {TextSystemErrorTypes} errorType
         * @param {string} source
         * @return {*}  {string}
         * @memberof TextSystemErrorHandler
         */
        TextSystemErrorHandler.getErrorMessageBySource = function (errorType, source) {
            return "{Error " + errorType + ": $" + source + "}";
        };
        /**
         * Is used for the exeption handling in the formatter.
         *
         * @static
         * @param {TextSystemErrorTypes} errorType
         * @param {string} message
         * @return {*}  null
         * @memberof TextSystemErrorHandler
         */
        TextSystemErrorHandler.throwFormatterErrors = function (errorType, textSystemErrorMessage) {
            throw { value: errorType, message: textSystemErrorMessage };
        };
        // In case of no specific Error Message this string should be used
        TextSystemErrorHandler.defaultErrorMessage = "?Nul";
        return TextSystemErrorHandler;
    }());
    exports.TextSystemErrorHandler = TextSystemErrorHandler;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dFN5c3RlbUVycm9ySGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3RleHRQcm92aWRlci90ZXh0U3lzdGVtRXJyb3JIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUVBOzs7OztPQUtHO0lBQ0g7UUFLSTs7OztXQUlHO1FBQ0g7UUFBd0IsQ0FBQztRQUV6Qjs7Ozs7Ozs7OztXQVVHO1FBQ1csc0RBQStCLEdBQTdDLFVBQThDLFNBQStCLEVBQUUsU0FBaUIsRUFBRSxNQUFjO1lBQzVHLElBQUksTUFBTSxHQUFHLFNBQVMsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDO1lBQ3RDLE9BQU8sSUFBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMzRCxDQUFDO1FBRUQ7Ozs7Ozs7OztXQVNHO1FBQ1csOENBQXVCLEdBQXJDLFVBQXNDLFNBQStCLEVBQUUsTUFBYztZQUNqRixPQUFPLFNBQVMsR0FBRyxTQUFTLEdBQUcsS0FBSyxHQUFHLE1BQU0sR0FBSSxHQUFHLENBQUM7UUFDekQsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ1csMkNBQW9CLEdBQWxDLFVBQW1DLFNBQStCLEVBQUUsc0JBQThCO1lBQzlGLE1BQU0sRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxzQkFBc0IsRUFBQyxDQUFDO1FBQzlELENBQUM7UUFuREQsa0VBQWtFO1FBQzNDLDBDQUFtQixHQUFXLE1BQU0sQ0FBQztRQW1EaEUsNkJBQUM7S0FBQSxBQXRERCxJQXNEQztJQXREWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZXh0U3lzdGVtRXJyb3JUeXBlcyB9IGZyb20gXCIuL3RleHRTeXN0ZW1FcnJvclR5cGVcIlxyXG5cclxuLyoqXHJcbiAqIFN0YXRpYyBjbGFzcyBmb3IgY3JlYXRpbmcgZXJyb3IgbWVzc2FnZXMgZm9yIHRoZSB0ZXh0c3lzdGVtXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIFRleHRTeXN0ZW1FcnJvckhhbmRsZXJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUZXh0U3lzdGVtRXJyb3JIYW5kbGVyIHtcclxuICAgIFxyXG4gICAgLy8gSW4gY2FzZSBvZiBubyBzcGVjaWZpYyBFcnJvciBNZXNzYWdlIHRoaXMgc3RyaW5nIHNob3VsZCBiZSB1c2VkXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGRlZmF1bHRFcnJvck1lc3NhZ2U6IHN0cmluZyA9IFwiP051bFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIHN0YXRpYyBpbnN0YW5jZSBvZiBUZXh0U3lzdGVtRXJyb3JIYW5kbGVyLlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUZXh0U3lzdGVtRXJyb3JIYW5kbGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IgKCkge31cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNIT1VMRCBPTkxZIEJFIFVTRUQgRk9SIERFRklORUQgRVJST1IgVFlQRVMhXHJcbiAgICAgKiBQdXQgdG9nZXRoZXIgbmFtZXNwYWNlIGFuZCB0ZXh0SUQgdG8gZ2V0IHRoZSBzb3VyY2UgYW5kIHJldHVybnMgYSBzcGVjaWZpYyBlcnJvciBtZXNzYWdlIFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7VGV4dFN5c3RlbUVycm9yVHlwZXN9IGVycm9yVHlwZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVzcGFjZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRJRFxyXG4gICAgICogQHJldHVybiB7Kn0gIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dFN5c3RlbUVycm9ySGFuZGxlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEVycm9yTWVzc2FnZUJ5TmFtZXNwYWNlQW5kSUQoZXJyb3JUeXBlOiBUZXh0U3lzdGVtRXJyb3JUeXBlcywgbmFtZXNwYWNlOiBzdHJpbmcsIHRleHRJRDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgc291cmNlID0gbmFtZXNwYWNlICsgXCIvXCIgKyB0ZXh0SUQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RXJyb3JNZXNzYWdlQnlTb3VyY2UoZXJyb3JUeXBlLCBzb3VyY2UpOyBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNIT1VMRCBPTkxZIEJFIFVTRUQgRk9SIERFRklORUQgRVJST1IgVFlQRVMhXHJcbiAgICAgKiBSZXR1cm5zIGEgc3BlY2lmaWMgZXJyb3IgbWVzc2FnZSBjb250YWluaW5nIHRoZSBlcnJvciBhbmQgdGhlIGF0dGFtcHRlZCBhY2Nlc3NcclxuICAgICAqIFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtUZXh0U3lzdGVtRXJyb3JUeXBlc30gZXJyb3JUeXBlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc291cmNlXHJcbiAgICAgKiBAcmV0dXJuIHsqfSAge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBUZXh0U3lzdGVtRXJyb3JIYW5kbGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0RXJyb3JNZXNzYWdlQnlTb3VyY2UoZXJyb3JUeXBlOiBUZXh0U3lzdGVtRXJyb3JUeXBlcywgc291cmNlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIntFcnJvciBcIiArIGVycm9yVHlwZSArIFwiOiAkXCIgKyBzb3VyY2UgICsgXCJ9XCI7IFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSXMgdXNlZCBmb3IgdGhlIGV4ZXB0aW9uIGhhbmRsaW5nIGluIHRoZSBmb3JtYXR0ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtUZXh0U3lzdGVtRXJyb3JUeXBlc30gZXJyb3JUeXBlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZVxyXG4gICAgICogQHJldHVybiB7Kn0gIG51bGxcclxuICAgICAqIEBtZW1iZXJvZiBUZXh0U3lzdGVtRXJyb3JIYW5kbGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdGhyb3dGb3JtYXR0ZXJFcnJvcnMoZXJyb3JUeXBlOiBUZXh0U3lzdGVtRXJyb3JUeXBlcywgdGV4dFN5c3RlbUVycm9yTWVzc2FnZTogc3RyaW5nKSA6IG5ldmVyIHtcclxuICAgICAgICB0aHJvdyB7dmFsdWU6IGVycm9yVHlwZSwgbWVzc2FnZTogdGV4dFN5c3RlbUVycm9yTWVzc2FnZX07XHJcbiAgICB9XHJcbn0iXX0=