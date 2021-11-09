define(["require", "exports", "../metaClassReflectionInfo", "../../../framework/reflection/metaClassProperties"], function (require, exports, metaClassReflectionInfo_1, metaClassProperties_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MetaClassProperties = metaClassProperties_1.MetaClassProperties;
    /**
     * Decorator for reflecting the meta properties
     *
     * @export
     * @param {string} propertyName
     * @param {*} propertyValue
     * @returns
     */
    function metaClassProperty(propertyName, propertyValue) {
        // return decorator function
        return function registerClassName(constructor) {
            // register the meta class property
            metaClassReflectionInfo_1.MetaClassReflectionInfo.registerProperty(constructor, propertyName, propertyValue);
        };
    }
    exports.metaClassProperty = metaClassProperty;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YUNsYXNzUHJvcGVydHlEZWNvcmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2ZyYW1ld29yay9yZWZsZWN0aW9uL2RlY29yYXRvcnMvbWV0YUNsYXNzUHJvcGVydHlEZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBcUIwQiw4QkFuQmxCLHlDQUFtQixDQW1Ca0I7SUFoQjdDOzs7Ozs7O09BT0c7SUFDSCxTQUFTLGlCQUFpQixDQUFDLFlBQW1CLEVBQUMsYUFBaUI7UUFDNUQsNEJBQTRCO1FBQzVCLE9BQU8sU0FBUyxpQkFBaUIsQ0FBQyxXQUF3QjtZQUN0RCxtQ0FBbUM7WUFDbkMsaURBQXVCLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQztRQUN2RixDQUFDLENBQUE7SUFDTCxDQUFDO0lBRU8sOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVENvbnN0cnVjdG9yIH0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudEh1Yi9jb21tb24vY29tbW9uVHlwZXNcIjtcclxuaW1wb3J0IHsgTWV0YUNsYXNzUmVmbGVjdGlvbkluZm8gfSBmcm9tIFwiLi4vbWV0YUNsYXNzUmVmbGVjdGlvbkluZm9cIjtcclxuaW1wb3J0IHtNZXRhQ2xhc3NQcm9wZXJ0aWVzfSAgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9yZWZsZWN0aW9uL21ldGFDbGFzc1Byb3BlcnRpZXNcIjtcclxuXHJcblxyXG4vKipcclxuICogRGVjb3JhdG9yIGZvciByZWZsZWN0aW5nIHRoZSBtZXRhIHByb3BlcnRpZXNcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHlOYW1lXHJcbiAqIEBwYXJhbSB7Kn0gcHJvcGVydHlWYWx1ZVxyXG4gKiBAcmV0dXJuc1xyXG4gKi9cclxuZnVuY3Rpb24gbWV0YUNsYXNzUHJvcGVydHkocHJvcGVydHlOYW1lOnN0cmluZyxwcm9wZXJ0eVZhbHVlOmFueSkge1xyXG4gICAgLy8gcmV0dXJuIGRlY29yYXRvciBmdW5jdGlvblxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHJlZ2lzdGVyQ2xhc3NOYW1lKGNvbnN0cnVjdG9yOlRDb25zdHJ1Y3Rvcikge1xyXG4gICAgICAgIC8vIHJlZ2lzdGVyIHRoZSBtZXRhIGNsYXNzIHByb3BlcnR5XHJcbiAgICAgICAgTWV0YUNsYXNzUmVmbGVjdGlvbkluZm8ucmVnaXN0ZXJQcm9wZXJ0eShjb25zdHJ1Y3RvciwgcHJvcGVydHlOYW1lLCBwcm9wZXJ0eVZhbHVlKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHttZXRhQ2xhc3NQcm9wZXJ0eSxNZXRhQ2xhc3NQcm9wZXJ0aWVzfTsiXX0=