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
define(["require", "exports", "./baseSeriesPackageAdapter", "../../../common/packageConversion/enum/objectTypeEnum"], function (require, exports, baseSeriesPackageAdapter_1, objectTypeEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var YTSeriesPackageAdapter = /** @class */ (function (_super) {
        __extends(YTSeriesPackageAdapter, _super);
        function YTSeriesPackageAdapter() {
            var _this = _super.call(this) || this;
            _this.settingsType = "YTSeries";
            _this.objectType = objectTypeEnum_1.ObjectType.YTSERIES;
            return _this;
        }
        return YTSeriesPackageAdapter;
    }(baseSeriesPackageAdapter_1.BaseSeriesPackageAdapter));
    exports.YTSeriesPackageAdapter = YTSeriesPackageAdapter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXRTZXJpZXNQYWNrYWdlQWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9zZXJpZXMveXRTZXJpZXNQYWNrYWdlQWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBR0E7UUFBNEMsMENBQXdCO1FBRWhFO1lBQUEsWUFDSSxpQkFBTyxTQUdWO1lBRkcsS0FBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUM7WUFDL0IsS0FBSSxDQUFDLFVBQVUsR0FBRywyQkFBVSxDQUFDLFFBQVEsQ0FBQzs7UUFDMUMsQ0FBQztRQUNMLDZCQUFDO0lBQUQsQ0FBQyxBQVBELENBQTRDLG1EQUF3QixHQU9uRTtJQVBZLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VTZXJpZXNQYWNrYWdlQWRhcHRlciB9IGZyb20gXCIuL2Jhc2VTZXJpZXNQYWNrYWdlQWRhcHRlclwiO1xyXG5pbXBvcnQgeyBPYmplY3RUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9lbnVtL29iamVjdFR5cGVFbnVtXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgWVRTZXJpZXNQYWNrYWdlQWRhcHRlciBleHRlbmRzIEJhc2VTZXJpZXNQYWNrYWdlQWRhcHRlcntcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3NUeXBlID0gXCJZVFNlcmllc1wiO1xyXG4gICAgICAgIHRoaXMub2JqZWN0VHlwZSA9IE9iamVjdFR5cGUuWVRTRVJJRVM7XHJcbiAgICB9XHJcbn0iXX0=