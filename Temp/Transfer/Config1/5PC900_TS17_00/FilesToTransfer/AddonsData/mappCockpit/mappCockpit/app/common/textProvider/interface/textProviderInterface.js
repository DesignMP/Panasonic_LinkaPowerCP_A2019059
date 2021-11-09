define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dFByb3ZpZGVySW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vdGV4dFByb3ZpZGVyL2ludGVyZmFjZS90ZXh0UHJvdmlkZXJJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vY29tcG9uZW50QmFzZS9pbnRlcmZhY2VzL2NvbXBvbmVudEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50TGlzdCB9IGZyb20gXCIuLi90ZXh0Rm9ybWF0dGVyL2Zvcm1hdHRlcklucHV0QXJndW1lbnRzL2Zvcm1hdHRlcklucHV0QXJndW1lbnRMaXN0XCI7XHJcbmltcG9ydCB7IFRleHRJdGVtIH0gZnJvbSBcIi4uL3RleHRJdGVtXCI7XHJcbmltcG9ydCB7IFRleHRSZXNvdXJjZSB9IGZyb20gXCIuLi90ZXh0UmVzb3VyY2VcIjtcclxuXHJcblxyXG4vKipcclxuICogRGVjbGFyZXMgdGhlIHNlcmllcyBwcm92aWRlciBpbnRlcmZhY2UsIHdoaWNoIGNvbnRhaW5zIGFsbCBmdW5jdGlvbnMgZm9yIHRoZSB0ZXh0c3lzdGVtXHJcbiAqXHJcbiAqIEBpbnRlcmZhY2UgSVRleHRTeXN0ZW1cclxuICAqL1xyXG4gZXhwb3J0IGludGVyZmFjZSBJVGV4dFByb3ZpZGVyIGV4dGVuZHMgSUNvbXBvbmVudHtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBVc2VkIHdoZW4gbmFtZXNwYWNlIGFuZCB0ZXh0SUQgaXMgYXZhaWxhYmxlXHJcbiAgICAgKiBSZXR1cm5zIHRoZSByZXF1ZXN0ZWQgdGV4dCwgYSBmYWxsYmFjayB0ZXh0IG9yIGFuIGVycm9yIHRleHQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVzcGFjZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRJRFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtsYW5ndWFnZUNvZGVdXHJcbiAgICAgKiBAcmV0dXJuIHsqfSAge1RleHRJdGVtfVxyXG4gICAgICogQG1lbWJlcm9mIElUZXh0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgZ2V0UmF3VGV4dChuYW1lc3BhY2U6IHN0cmluZywgdGV4dElEOiBzdHJpbmcsIGxhbmd1YWdlQ29kZT86IHN0cmluZyApOiBUZXh0SXRlbTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiB1c2VkIHdoZW4gdGhlIHdob2xlIHBhdGggaXMgYXZhaWxhYmxlOiA8bmFtZXNwYWNlL3RleHRJRD5cclxuICAgICAqIFJldHVybnMgdGhlIHJlcXVlc3RlZCB0ZXh0LCBhIGZhbGxiYWNrIHRleHQgb3IgYW4gZXJyb3IgdGV4dFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmdWxseVF1YWxpZmllZFRleHRJRFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtsYW5ndWFnZUNvZGVdXHJcbiAgICAgKiBAcmV0dXJuIHsqfSAge1RleHRJdGVtfVxyXG4gICAgICogQG1lbWJlcm9mIElUZXh0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgZ2V0UmF3VGV4dEJ5RnVsbHlRdWFsaWZpZWRUZXh0SWQoZnVsbHlRdWFsaWZpZWRUZXh0SUQgOiBzdHJpbmcsIGxhbmd1YWdlQ29kZT86IHN0cmluZykgOiBUZXh0SXRlbTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0ZXh0IHdpdGggcmVzb2x2ZWQgZm9ybWF0IGl0ZW1zXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVzcGFjZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRJRFxyXG4gICAgICogQHBhcmFtIHtGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50TGlzdH0gZm9ybWF0dGVyQXJnc1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtsYW5ndWFnZUNvZGVdXHJcbiAgICAgKiBAcmV0dXJuIHsqfSAge1RleHRJdGVtfVxyXG4gICAgICogQG1lbWJlcm9mIElUZXh0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgZ2V0Rm9ybWF0dGVkVGV4dChuYW1lc3BhY2U6IHN0cmluZywgdGV4dElEOiBzdHJpbmcsIGZvcm1hdHRlckFyZ3MgOiBGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50TGlzdCwgbGFuZ3VhZ2VDb2RlPzogc3RyaW5nICkgOiBUZXh0SXRlbTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHNlbGVjdGVkIGxhbmd1YWdlIGZvciB0aGUgdGV4dHN5dGVtXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdGVkTGFuZ3VhZ2VcclxuICAgICAqIEBtZW1iZXJvZiBJVGV4dFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHNldFNlbGVjdGVkTGFuZ3VhZ2Uoc2VsZWN0ZWRMYW5ndWFnZTogc3RyaW5nKTsgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBmYWxsYmFjayBsYW5ndWFnZSBmb3IgdGhlIHRleHRzeXRlbVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmYWxsYmFja0xhbmd1YWdlXHJcbiAgICAgKiBAbWVtYmVyb2YgSVRleHRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBzZXRGYWxsYmFja0xhbmd1YWdlKGZhbGxiYWNrTGFuZ3VhZ2U6IHN0cmluZyk7IFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIHRleHRSZWNvdXJzZXMgdG8gdGhlIGFsbHJlYWR5IGV4aXN0aW5nIG9uZXMuIFxyXG4gICAgICogSWYgYSByZXNvdXJjZSB3aXRoIHNhbWUgbmFtZXNwYWNlIGFuZCBsYW5ndWFnZWNvZGUgZXhpc3QgYWxscmVhZHksIHRoZSBleGlzdGluZyBvbmUgaXMgcmVwbGFjZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxUZXh0UmVzb3VyY2U+fSB0ZXh0UmVzb3VyY2VzXHJcbiAgICAgKiBAbWVtYmVyb2YgSVRleHRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBhZGRPclJlcGxhY2VUZXh0UmVjb3Vyc2VzKHRleHRSZXNvdXJjZXM6IEFycmF5PFRleHRSZXNvdXJjZT4pO1xyXG5cclxuICAgIC8qKiBcclxuICAgICAqIENsZWFycyBhbGwgdGhlIHRleHQgcmVzb3VyY2VzIG9mIHRoaXMgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRleHRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBjbGVhcigpO1xyXG59Il19