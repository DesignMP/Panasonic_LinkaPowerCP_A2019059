define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * List of all errors that can occure in the textsystem.
     * The error types with defined error codes can occure in the productive return values.
     * For other error types "?Nul" can be returned in the productive return value.
     *
     * @export
     * @enum {number}
     */
    var TextSystemErrorTypes;
    (function (TextSystemErrorTypes) {
        TextSystemErrorTypes[TextSystemErrorTypes["EndlessRecursion"] = 1] = "EndlessRecursion";
        TextSystemErrorTypes[TextSystemErrorTypes["NoPassedArgumentlist"] = 2] = "NoPassedArgumentlist";
        TextSystemErrorTypes[TextSystemErrorTypes["InvalidIndexForArgumentList"] = 3] = "InvalidIndexForArgumentList";
        TextSystemErrorTypes[TextSystemErrorTypes["NoFormatterForInputArgumentFound"] = 4] = "NoFormatterForInputArgumentFound";
        TextSystemErrorTypes[TextSystemErrorTypes["RequestedTextNotFound"] = -2144327656] = "RequestedTextNotFound";
        TextSystemErrorTypes[TextSystemErrorTypes["ReadAccessToTextDatabaseFailed"] = -2144327660] = "ReadAccessToTextDatabaseFailed";
        TextSystemErrorTypes[TextSystemErrorTypes["CouldNotOpenTextDatabase"] = -2144327663] = "CouldNotOpenTextDatabase";
    })(TextSystemErrorTypes = exports.TextSystemErrorTypes || (exports.TextSystemErrorTypes = {}));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dFN5c3RlbUVycm9yVHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3RleHRQcm92aWRlci90ZXh0U3lzdGVtRXJyb3JUeXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBOzs7Ozs7O09BT0c7SUFDSCxJQUFZLG9CQVFYO0lBUkQsV0FBWSxvQkFBb0I7UUFDNUIsdUZBQW9CLENBQUE7UUFDcEIsK0ZBQW9CLENBQUE7UUFDcEIsNkdBQTJCLENBQUE7UUFDM0IsdUhBQWdDLENBQUE7UUFDaEMsMkdBQW1DLENBQUE7UUFDbkMsNkhBQTRDLENBQUE7UUFDNUMsaUhBQXNDLENBQUE7SUFDMUMsQ0FBQyxFQVJXLG9CQUFvQixHQUFwQiw0QkFBb0IsS0FBcEIsNEJBQW9CLFFBUS9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIExpc3Qgb2YgYWxsIGVycm9ycyB0aGF0IGNhbiBvY2N1cmUgaW4gdGhlIHRleHRzeXN0ZW0uXHJcbiAqIFRoZSBlcnJvciB0eXBlcyB3aXRoIGRlZmluZWQgZXJyb3IgY29kZXMgY2FuIG9jY3VyZSBpbiB0aGUgcHJvZHVjdGl2ZSByZXR1cm4gdmFsdWVzLlxyXG4gKiBGb3Igb3RoZXIgZXJyb3IgdHlwZXMgXCI/TnVsXCIgY2FuIGJlIHJldHVybmVkIGluIHRoZSBwcm9kdWN0aXZlIHJldHVybiB2YWx1ZS5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAZW51bSB7bnVtYmVyfVxyXG4gKi9cclxuZXhwb3J0IGVudW0gVGV4dFN5c3RlbUVycm9yVHlwZXMge1xyXG4gICAgRW5kbGVzc1JlY3Vyc2lvbiA9IDEsXHJcbiAgICBOb1Bhc3NlZEFyZ3VtZW50bGlzdCxcclxuICAgIEludmFsaWRJbmRleEZvckFyZ3VtZW50TGlzdCxcclxuICAgIE5vRm9ybWF0dGVyRm9ySW5wdXRBcmd1bWVudEZvdW5kLFxyXG4gICAgUmVxdWVzdGVkVGV4dE5vdEZvdW5kID0gLTIxNDQzMjc2NTYsXHJcbiAgICBSZWFkQWNjZXNzVG9UZXh0RGF0YWJhc2VGYWlsZWQgPSAtMjE0NDMyNzY2MCwgICAgICAgICAgICAgICBcclxuICAgIENvdWxkTm90T3BlblRleHREYXRhYmFzZSA9IC0yMTQ0MzI3NjYzLFxyXG59Il19