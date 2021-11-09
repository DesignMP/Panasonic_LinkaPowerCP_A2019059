define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Used as return value for the usage of the textsystem
     *
     * @export
     * @class TextItem
     */
    var TextItem = /** @class */ (function () {
        // set default values
        function TextItem() {
            this._value = "";
            this._errors = new Array();
        }
        Object.defineProperty(TextItem.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                this._value = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextItem.prototype, "errors", {
            get: function () {
                return this._errors;
            },
            set: function (errors) {
                this._errors = errors;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Returns true wenn no error occured, false otherwise
         *
         * @return {*}  {boolean}
         * @memberof TextItem
         */
        TextItem.prototype.isValid = function () {
            if (this.errors.length === 0) {
                return true;
            }
            return false;
        };
        return TextItem;
    }());
    exports.TextItem = TextItem;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dEl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi90ZXh0UHJvdmlkZXIvdGV4dEl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBRUE7Ozs7O09BS0c7SUFDSDtRQW9CSSxxQkFBcUI7UUFDckI7WUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksS0FBSyxFQUF3QixDQUFDO1FBQ3JELENBQUM7UUFFRCxzQkFBVywyQkFBSztpQkFJaEI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3ZCLENBQUM7aUJBTkQsVUFBa0IsS0FBYTtnQkFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDeEIsQ0FBQzs7O1dBQUE7UUFNRCxzQkFBVyw0QkFBTTtpQkFJakI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3hCLENBQUM7aUJBTkQsVUFBbUIsTUFBbUM7Z0JBQ2xELElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQzFCLENBQUM7OztXQUFBO1FBTUQ7Ozs7O1dBS0c7UUFDSSwwQkFBTyxHQUFkO1lBQ0ksSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3pCLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQ0wsZUFBQztJQUFELENBQUMsQUF0REQsSUFzREM7SUF0RFksNEJBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZXh0U3lzdGVtRXJyb3JUeXBlcyB9IGZyb20gXCIuL3RleHRTeXN0ZW1FcnJvclR5cGVcIjtcclxuXHJcbi8qKlxyXG4gKiBVc2VkIGFzIHJldHVybiB2YWx1ZSBmb3IgdGhlIHVzYWdlIG9mIHRoZSB0ZXh0c3lzdGVtIFxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBUZXh0SXRlbVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRleHRJdGVtIHtcclxuICAgXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHRoZSByZXN1bHRpbmcgc3RyaW5nIG9mIHRleHRzeXN0ZW0gZnVuY3Rpb25zXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dEl0ZW1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfdmFsdWU6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIGFsbCBlcnJvcnMgb2NjdXJlZCBkdXJpbmcgYSBmdW5jdGlvbiBleGVjdXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUge0FycmF5PFRleHRTeXN0ZW1FcnJvclR5cGVzPn1cclxuICAgICAqIEBtZW1iZXJvZiBUZXh0SXRlbVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9lcnJvcnM6IEFycmF5PFRleHRTeXN0ZW1FcnJvclR5cGVzPjtcclxuXHJcbiAgICAvLyBzZXQgZGVmYXVsdCB2YWx1ZXNcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuX2Vycm9ycyA9IG5ldyBBcnJheTxUZXh0U3lzdGVtRXJyb3JUeXBlcz4oKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHZhbHVlICh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHZhbHVlICgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGVycm9ycyAoZXJyb3JzOiBBcnJheTxUZXh0U3lzdGVtRXJyb3JUeXBlcz4pIHtcclxuICAgICAgICB0aGlzLl9lcnJvcnMgPSBlcnJvcnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBlcnJvcnMgKCk6IEFycmF5PFRleHRTeXN0ZW1FcnJvclR5cGVzPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Vycm9ycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSB3ZW5uIG5vIGVycm9yIG9jY3VyZWQsIGZhbHNlIG90aGVyd2lzZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4geyp9ICB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBUZXh0SXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNWYWxpZCgpOiBib29sZWFuIHtcclxuICAgICAgICBpZih0aGlzLmVycm9ycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufSJdfQ==