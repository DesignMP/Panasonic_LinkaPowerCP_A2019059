define(["require", "exports", "../../common/packageConversion/enum/objectTypeEnum", "../../common/packageConversion/exportContainer", "../../common/persistence/settings", "../../common/packageConversion/enum/dataTypeEnum", "../../common/packageConversion/enum/additionalMetaKeys", "../../common/packageConversion/mceConversionError", "./settingIds", "../../common/packageConversion/package", "../../common/packageConversion/meta", "../../common/packageConversion/enum/arrayTypeEnum"], function (require, exports, objectTypeEnum_1, exportContainer_1, settings_1, dataTypeEnum_1, additionalMetaKeys_1, mceConversionError_1, settingIds_1, package_1, meta_1, arrayTypeEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //Enum to map the numbers, representing a charttype to a string and back again
    var ChartTypeMapping;
    (function (ChartTypeMapping) {
        ChartTypeMapping[ChartTypeMapping["yt"] = 0] = "yt";
        ChartTypeMapping[ChartTypeMapping["xy"] = 1] = "xy";
        ChartTypeMapping[ChartTypeMapping["fft"] = 2] = "fft";
    })(ChartTypeMapping || (ChartTypeMapping = {}));
    var DataIds;
    (function (DataIds) {
        DataIds["ChartName"] = "name";
        DataIds["ChartType"] = "type";
        DataIds["ChartExpandState"] = "expandState";
        DataIds["ChartScales"] = "scales";
    })(DataIds || (DataIds = {}));
    var ChartManagerChartPackageAdapter = /** @class */ (function () {
        function ChartManagerChartPackageAdapter() {
            //newest version of package format
            this.currentPackageVersion = 1;
            this.settingsType = "Chart";
            this.objectType = objectTypeEnum_1.ObjectType.CHART;
        }
        ChartManagerChartPackageAdapter.prototype.packageToSetting = function (packageData, container) {
            var _a, _b, _c;
            var setting = new settings_1.Settings(this.settingsType);
            if (((_a = packageData === null || packageData === void 0 ? void 0 : packageData.meta) === null || _a === void 0 ? void 0 : _a.dataType) == dataTypeEnum_1.DataType.OBJECT && ((_b = packageData === null || packageData === void 0 ? void 0 : packageData.meta) === null || _b === void 0 ? void 0 : _b[additionalMetaKeys_1.AdditionalMetaKeys.OBJECTTYPE]) == this.objectType) {
                switch ((_c = packageData === null || packageData === void 0 ? void 0 : packageData.meta) === null || _c === void 0 ? void 0 : _c[additionalMetaKeys_1.AdditionalMetaKeys.VERSION]) {
                    case 1:
                        setting = this.packageV1ToSetting(packageData, container);
                        break;
                    default:
                        throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.UNSUPPORTED_VERSION, this.objectType);
                }
            }
            else {
                throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.UNSUPPORTED_TYPE, this.objectType);
            }
            return setting;
        };
        ChartManagerChartPackageAdapter.prototype.packageV1ToSetting = function (packageData, container) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
            var setting = new settings_1.Settings(this.settingsType);
            if (((_c = (_b = (_a = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _a === void 0 ? void 0 : _a[DataIds.ChartType]) === null || _b === void 0 ? void 0 : _b.meta) === null || _c === void 0 ? void 0 : _c.dataType) == dataTypeEnum_1.DataType.NUMBER) { // replaces the chart type (readable) with  originally required number
                var chartType = (_e = (_d = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _d === void 0 ? void 0 : _d[DataIds.ChartType]) === null || _e === void 0 ? void 0 : _e.data;
                setting.setValue(settingIds_1.SettingIds.ChartType, ChartTypeMapping[chartType]);
            }
            else {
                throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, DataIds.ChartType);
            }
            if (((_h = (_g = (_f = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _f === void 0 ? void 0 : _f[DataIds.ChartName]) === null || _g === void 0 ? void 0 : _g.meta) === null || _h === void 0 ? void 0 : _h.dataType) == dataTypeEnum_1.DataType.STRING) {
                setting.setValue(settingIds_1.SettingIds.ChartName, (_k = (_j = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _j === void 0 ? void 0 : _j[DataIds.ChartName]) === null || _k === void 0 ? void 0 : _k.data);
            }
            else {
                throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, DataIds.ChartName);
            }
            if (((_o = (_m = (_l = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _l === void 0 ? void 0 : _l[DataIds.ChartExpandState]) === null || _m === void 0 ? void 0 : _m.meta) === null || _o === void 0 ? void 0 : _o.dataType) == dataTypeEnum_1.DataType.BOOLEAN) {
                setting.setValue(settingIds_1.SettingIds.ChartExpandState, (_q = (_p = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _p === void 0 ? void 0 : _p[DataIds.ChartExpandState]) === null || _q === void 0 ? void 0 : _q.data);
            }
            else {
                throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, DataIds.ChartExpandState);
            }
            if (((_s = (_r = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _r === void 0 ? void 0 : _r[DataIds.ChartScales]) === null || _s === void 0 ? void 0 : _s.meta.dataType) == dataTypeEnum_1.DataType.ARRAY && ((_v = (_u = (_t = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _t === void 0 ? void 0 : _t[DataIds.ChartScales]) === null || _u === void 0 ? void 0 : _u.meta) === null || _v === void 0 ? void 0 : _v[additionalMetaKeys_1.AdditionalMetaKeys.ARRAYTYPE]) == arrayTypeEnum_1.ArrayType.LINK) {
                var chartScalesSettingsArray_1 = new Array();
                var chartScalesData = (_x = (_w = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _w === void 0 ? void 0 : _w[DataIds.ChartScales]) === null || _x === void 0 ? void 0 : _x.data;
                if (chartScalesData !== undefined) {
                    chartScalesData.forEach(function (id) {
                        var chartScaleSetting = container.getSettingsByID(id);
                        if (chartScaleSetting !== null) {
                            chartScalesSettingsArray_1.push(chartScaleSetting);
                        }
                        else {
                            throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, DataIds.ChartScales);
                        }
                    });
                    setting.setValue(DataIds.ChartScales, chartScalesSettingsArray_1);
                }
                else {
                    throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, DataIds.ChartScales);
                }
            }
            else {
                throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, DataIds.ChartScales);
            }
            return setting;
        };
        ChartManagerChartPackageAdapter.prototype.settingToPackage = function (settingsData) {
            var settings = settings_1.Settings.create(settingsData);
            var chartData = {};
            var packageStructure = {
                packages: new Array(),
                topLevelID: NaN
            };
            if (settings.type === this.settingsType) {
                var id = meta_1.Meta.createID();
                var additionalMetaInfo = [{ key: additionalMetaKeys_1.AdditionalMetaKeys.OBJECTTYPE, value: this.objectType }, { key: additionalMetaKeys_1.AdditionalMetaKeys.ID, value: id }, { key: additionalMetaKeys_1.AdditionalMetaKeys.VERSION, value: this.currentPackageVersion }];
                var chartMeta = new meta_1.Meta(dataTypeEnum_1.DataType.OBJECT, additionalMetaInfo);
                var chartTypeData = settings.getValue(settingIds_1.SettingIds.ChartType);
                if (chartTypeData !== undefined) { // replaces chart type (number) with readable text
                    chartData[DataIds.ChartType] = new package_1.Package(new meta_1.Meta(dataTypeEnum_1.DataType.NUMBER), ChartTypeMapping[chartTypeData]);
                }
                else {
                    throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, settingIds_1.SettingIds.ChartType);
                }
                var chartNameData = settings.getValue(settingIds_1.SettingIds.ChartName);
                if (chartNameData !== undefined) {
                    chartData[DataIds.ChartName] = new package_1.Package(new meta_1.Meta(dataTypeEnum_1.DataType.STRING), chartNameData);
                }
                else {
                    throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, settingIds_1.SettingIds.ChartName);
                }
                var chartExpandStateData = settings.getValue(settingIds_1.SettingIds.ChartExpandState);
                if (chartExpandStateData !== undefined) {
                    chartData[DataIds.ChartExpandState] = new package_1.Package(new meta_1.Meta(dataTypeEnum_1.DataType.BOOLEAN), chartExpandStateData);
                }
                else {
                    throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, settingIds_1.SettingIds.ChartExpandState);
                }
                var chartScalesMeta = new meta_1.Meta(dataTypeEnum_1.DataType.ARRAY, [{ key: additionalMetaKeys_1.AdditionalMetaKeys.ARRAYTYPE, value: arrayTypeEnum_1.ArrayType.LINK }]);
                var chartScalesLinks_1 = new Array();
                var chartScalesData = settings.getValue(settingIds_1.SettingIds.ChartScales);
                if (chartScalesData !== undefined) {
                    chartScalesData.forEach(function (settings) {
                        var _a;
                        var chartScalesPackageStructure = exportContainer_1.ExportContainer.createPackages(settings);
                        if (chartScalesPackageStructure.packages.length > 0 && !Number.isNaN(chartScalesPackageStructure.topLevelID)) {
                            chartScalesLinks_1.push(chartScalesPackageStructure.topLevelID);
                            (_a = packageStructure.packages).push.apply(_a, chartScalesPackageStructure.packages);
                        }
                        else {
                            throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, settingIds_1.SettingIds.ChartScales);
                        }
                    });
                    chartData[DataIds.ChartScales] = new package_1.Package(chartScalesMeta, chartScalesLinks_1);
                }
                else {
                    throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, settingIds_1.SettingIds.ChartScales);
                }
                var chartPackage = new package_1.Package(chartMeta, chartData);
                packageStructure.packages.push(chartPackage);
                packageStructure.topLevelID = id;
            }
            else {
                throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.UNSUPPORTED_VERSION, this.settingsType);
            }
            return packageStructure;
        };
        return ChartManagerChartPackageAdapter;
    }());
    exports.ChartManagerChartPackageAdapter = ChartManagerChartPackageAdapter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRNYW5hZ2VyQ2hhcnRQYWNrYWdlQWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9jaGFydE1hbmFnZXJDaGFydFBhY2thZ2VBZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWNBLDhFQUE4RTtJQUM5RSxJQUFLLGdCQUlKO0lBSkQsV0FBSyxnQkFBZ0I7UUFDakIsbURBQU0sQ0FBQTtRQUNOLG1EQUFNLENBQUE7UUFDTixxREFBTyxDQUFBO0lBQ1gsQ0FBQyxFQUpJLGdCQUFnQixLQUFoQixnQkFBZ0IsUUFJcEI7SUFFRCxJQUFLLE9BS0o7SUFMRCxXQUFLLE9BQU87UUFDUiw2QkFBa0IsQ0FBQTtRQUNsQiw2QkFBa0IsQ0FBQTtRQUNsQiwyQ0FBZ0MsQ0FBQTtRQUNoQyxpQ0FBc0IsQ0FBQTtJQUMxQixDQUFDLEVBTEksT0FBTyxLQUFQLE9BQU8sUUFLWDtJQUVEO1FBUUk7WUFOQSxrQ0FBa0M7WUFDakIsMEJBQXFCLEdBQUcsQ0FBQyxDQUFDO1lBTXZDLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO1lBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsMkJBQVUsQ0FBQyxLQUFLLENBQUM7UUFDdkMsQ0FBQztRQUNELDBEQUFnQixHQUFoQixVQUFpQixXQUFxQixFQUFFLFNBQTBCOztZQUU5RCxJQUFJLE9BQU8sR0FBYyxJQUFJLG1CQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRXpELElBQUcsT0FBQSxXQUFXLGFBQVgsV0FBVyx1QkFBWCxXQUFXLENBQUUsSUFBSSwwQ0FBRSxRQUFRLEtBQUksdUJBQVEsQ0FBQyxNQUFNLElBQUksT0FBQSxXQUFXLGFBQVgsV0FBVyx1QkFBWCxXQUFXLENBQUUsSUFBSSwwQ0FBRyx1Q0FBa0IsQ0FBQyxVQUFVLE1BQUssSUFBSSxDQUFDLFVBQVUsRUFBRTtn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QUFDLFlBQVksQ0FBQyxDQUFDO2FBQzdHO1lBRUQsT0FBTyxnQkFBZ0IsQ0FBQztRQUM1QixDQUFDO1FBQ0wsc0NBQUM7SUFBRCxDQUFDLEFBbEpELElBa0pDO0lBRVEsMEVBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVBhY2thZ2VBZGFwdGVyLCBQYWNrYWdlQXJyYXlXaXRoVG9wTGV2ZWxJRCB9IGZyb20gXCIuLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vaW50ZXJmYWNlL3BhY2thZ2VBZGFwdGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE9iamVjdFR5cGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2VudW0vb2JqZWN0VHlwZUVudW1cIjtcclxuaW1wb3J0IHsgSVBhY2thZ2UgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2ludGVyZmFjZS9wYWNrYWdlSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEV4cG9ydENvbnRhaW5lciB9IGZyb20gXCIuLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vZXhwb3J0Q29udGFpbmVyXCI7XHJcbmltcG9ydCB7IElTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9zZXR0aW5nc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vcGVyc2lzdGVuY2Uvc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgRGF0YVR5cGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2VudW0vZGF0YVR5cGVFbnVtXCI7XHJcbmltcG9ydCB7IEFkZGl0aW9uYWxNZXRhS2V5cyB9IGZyb20gXCIuLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vZW51bS9hZGRpdGlvbmFsTWV0YUtleXNcIjtcclxuaW1wb3J0IHsgTWNlQ29udmVyc2lvbkVycm9yLCBNY2VDb252ZXJzaW9uRXJyb3JUeXBlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9tY2VDb252ZXJzaW9uRXJyb3JcIjtcclxuaW1wb3J0IHsgU2V0dGluZ0lkcyB9IGZyb20gXCIuL3NldHRpbmdJZHNcIjtcclxuaW1wb3J0IHsgUGFja2FnZSB9IGZyb20gXCIuLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vcGFja2FnZVwiO1xyXG5pbXBvcnQgeyBNZXRhIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9tZXRhXCI7XHJcbmltcG9ydCB7IEFycmF5VHlwZSB9IGZyb20gXCIuLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vZW51bS9hcnJheVR5cGVFbnVtXCI7XHJcblxyXG4vL0VudW0gdG8gbWFwIHRoZSBudW1iZXJzLCByZXByZXNlbnRpbmcgYSBjaGFydHR5cGUgdG8gYSBzdHJpbmcgYW5kIGJhY2sgYWdhaW5cclxuZW51bSBDaGFydFR5cGVNYXBwaW5nIHsgLy8gbWFrZSBzdXJlIHRoaXMgZW51bSBzdGF5cyBzeW5jaHJvbml6ZWQgd2l0aCB0aGUgQ2hhcnRNYW5hZ2VyQ2hhcnQgQ2hhcnRUeXBlcyBlbnVtXHJcbiAgICB5dCA9IDAsXHJcbiAgICB4eSA9IDEsXHJcbiAgICBmZnQgPSAyXHJcbn1cclxuXHJcbmVudW0gRGF0YUlkcyB7XHJcbiAgICBDaGFydE5hbWUgPSBcIm5hbWVcIixcclxuICAgIENoYXJ0VHlwZSA9IFwidHlwZVwiLFxyXG4gICAgQ2hhcnRFeHBhbmRTdGF0ZSA9IFwiZXhwYW5kU3RhdGVcIixcclxuICAgIENoYXJ0U2NhbGVzID0gXCJzY2FsZXNcIlxyXG59XHJcblxyXG5jbGFzcyBDaGFydE1hbmFnZXJDaGFydFBhY2thZ2VBZGFwdGVyIGltcGxlbWVudHMgSVBhY2thZ2VBZGFwdGVyIHtcclxuICAgXHJcbiAgICAvL25ld2VzdCB2ZXJzaW9uIG9mIHBhY2thZ2UgZm9ybWF0XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGN1cnJlbnRQYWNrYWdlVmVyc2lvbiA9IDE7XHJcblxyXG4gICAgcHJvdGVjdGVkIHNldHRpbmdzVHlwZTogc3RyaW5nO1xyXG4gICAgcHJvdGVjdGVkIG9iamVjdFR5cGU6IE9iamVjdFR5cGU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5nc1R5cGUgPSBcIkNoYXJ0XCI7XHJcbiAgICAgICAgdGhpcy5vYmplY3RUeXBlID0gT2JqZWN0VHlwZS5DSEFSVDtcclxuICAgIH1cclxuICAgIHBhY2thZ2VUb1NldHRpbmcocGFja2FnZURhdGE6IElQYWNrYWdlLCBjb250YWluZXI6IEV4cG9ydENvbnRhaW5lcik6IElTZXR0aW5ncyB7XHJcblxyXG4gICAgICAgIGxldCBzZXR0aW5nOiBJU2V0dGluZ3MgPSBuZXcgU2V0dGluZ3ModGhpcy5zZXR0aW5nc1R5cGUpO1xyXG5cclxuICAgICAgICBpZihwYWNrYWdlRGF0YT8ubWV0YT8uZGF0YVR5cGUgPT0gRGF0YVR5cGUuT0JKRUNUICYmIHBhY2thZ2VEYXRhPy5tZXRhPy5bQWRkaXRpb25hbE1ldGFLZXlzLk9CSkVDVFRZUEVdID09IHRoaXMub2JqZWN0VHlwZSkge1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBzd2l0Y2gocGFja2FnZURhdGE/Lm1ldGE/LltBZGRpdGlvbmFsTWV0YUtleXMuVkVSU0lPTl0peyBcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nID0gdGhpcy5wYWNrYWdlVjFUb1NldHRpbmcocGFja2FnZURhdGEsIGNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IE1jZUNvbnZlcnNpb25FcnJvci5jcmVhdGVFcnJvckJ5VHlwZShNY2VDb252ZXJzaW9uRXJyb3JUeXBlLlVOU1VQUE9SVEVEX1ZFUlNJT04sIHRoaXMub2JqZWN0VHlwZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IE1jZUNvbnZlcnNpb25FcnJvci5jcmVhdGVFcnJvckJ5VHlwZShNY2VDb252ZXJzaW9uRXJyb3JUeXBlLlVOU1VQUE9SVEVEX1RZUEUsIHRoaXMub2JqZWN0VHlwZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzZXR0aW5nO1xyXG4gICAgXHJcbiAgICB9ICAgIFxyXG5cclxuICAgIHByaXZhdGUgcGFja2FnZVYxVG9TZXR0aW5nKHBhY2thZ2VEYXRhOiBJUGFja2FnZSwgY29udGFpbmVyOiBFeHBvcnRDb250YWluZXIpOiBJU2V0dGluZ3Mge1xyXG4gICAgICAgIGxldCBzZXR0aW5nID0gbmV3IFNldHRpbmdzKHRoaXMuc2V0dGluZ3NUeXBlKTtcclxuXHJcbiAgICAgICAgaWYocGFja2FnZURhdGE/LmRhdGE/LltEYXRhSWRzLkNoYXJ0VHlwZV0/Lm1ldGE/LmRhdGFUeXBlID09IERhdGFUeXBlLk5VTUJFUikgeyAvLyByZXBsYWNlcyB0aGUgY2hhcnQgdHlwZSAocmVhZGFibGUpIHdpdGggIG9yaWdpbmFsbHkgcmVxdWlyZWQgbnVtYmVyXHJcbiAgICAgICAgICAgIGxldCBjaGFydFR5cGU6IHN0cmluZyA9IHBhY2thZ2VEYXRhPy5kYXRhPy5bRGF0YUlkcy5DaGFydFR5cGVdPy5kYXRhXHJcbiAgICAgICAgICAgIHNldHRpbmcuc2V0VmFsdWUoU2V0dGluZ0lkcy5DaGFydFR5cGUsIENoYXJ0VHlwZU1hcHBpbmdbY2hhcnRUeXBlXSk7IFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IE1jZUNvbnZlcnNpb25FcnJvci5jcmVhdGVFcnJvckJ5VHlwZShNY2VDb252ZXJzaW9uRXJyb3JUeXBlLk1JU1NJTkdfREFUQSwgRGF0YUlkcy5DaGFydFR5cGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihwYWNrYWdlRGF0YT8uZGF0YT8uW0RhdGFJZHMuQ2hhcnROYW1lXT8ubWV0YT8uZGF0YVR5cGUgPT0gRGF0YVR5cGUuU1RSSU5HKSB7IFxyXG4gICAgICAgICAgICBzZXR0aW5nLnNldFZhbHVlKFNldHRpbmdJZHMuQ2hhcnROYW1lLCBwYWNrYWdlRGF0YT8uZGF0YT8uW0RhdGFJZHMuQ2hhcnROYW1lXT8uZGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgTWNlQ29udmVyc2lvbkVycm9yLmNyZWF0ZUVycm9yQnlUeXBlKE1jZUNvbnZlcnNpb25FcnJvclR5cGUuTUlTU0lOR19EQVRBLCBEYXRhSWRzLkNoYXJ0TmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHBhY2thZ2VEYXRhPy5kYXRhPy5bRGF0YUlkcy5DaGFydEV4cGFuZFN0YXRlXT8ubWV0YT8uZGF0YVR5cGUgPT0gRGF0YVR5cGUuQk9PTEVBTikge1xyXG4gICAgICAgICAgICBzZXR0aW5nLnNldFZhbHVlKFNldHRpbmdJZHMuQ2hhcnRFeHBhbmRTdGF0ZSwgcGFja2FnZURhdGE/LmRhdGE/LltEYXRhSWRzLkNoYXJ0RXhwYW5kU3RhdGVdPy5kYXRhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBNY2VDb252ZXJzaW9uRXJyb3IuY3JlYXRlRXJyb3JCeVR5cGUoTWNlQ29udmVyc2lvbkVycm9yVHlwZS5NSVNTSU5HX0RBVEEsIERhdGFJZHMuQ2hhcnRFeHBhbmRTdGF0ZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocGFja2FnZURhdGE/LmRhdGE/LltEYXRhSWRzLkNoYXJ0U2NhbGVzXT8ubWV0YS5kYXRhVHlwZSA9PSBEYXRhVHlwZS5BUlJBWSAmJiBwYWNrYWdlRGF0YT8uZGF0YT8uW0RhdGFJZHMuQ2hhcnRTY2FsZXNdPy5tZXRhPy5bQWRkaXRpb25hbE1ldGFLZXlzLkFSUkFZVFlQRV0gPT0gQXJyYXlUeXBlLkxJTkspIHtcclxuICAgICAgICAgICAgbGV0IGNoYXJ0U2NhbGVzU2V0dGluZ3NBcnJheSA9IG5ldyBBcnJheTxJU2V0dGluZ3M+KCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgY2hhcnRTY2FsZXNEYXRhOiBBcnJheTxudW1iZXI+ID0gcGFja2FnZURhdGE/LmRhdGE/LltEYXRhSWRzLkNoYXJ0U2NhbGVzXT8uZGF0YTtcclxuICAgICAgICAgICAgaWYoY2hhcnRTY2FsZXNEYXRhICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNoYXJ0U2NhbGVzRGF0YS5mb3JFYWNoKChpZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGFydFNjYWxlU2V0dGluZyA9IGNvbnRhaW5lci5nZXRTZXR0aW5nc0J5SUQoaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNoYXJ0U2NhbGVTZXR0aW5nICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJ0U2NhbGVzU2V0dGluZ3NBcnJheS5wdXNoKGNoYXJ0U2NhbGVTZXR0aW5nKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IE1jZUNvbnZlcnNpb25FcnJvci5jcmVhdGVFcnJvckJ5VHlwZShNY2VDb252ZXJzaW9uRXJyb3JUeXBlLk1JU1NJTkdfREFUQSwgRGF0YUlkcy5DaGFydFNjYWxlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nLnNldFZhbHVlKERhdGFJZHMuQ2hhcnRTY2FsZXMsIGNoYXJ0U2NhbGVzU2V0dGluZ3NBcnJheSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBNY2VDb252ZXJzaW9uRXJyb3IuY3JlYXRlRXJyb3JCeVR5cGUoTWNlQ29udmVyc2lvbkVycm9yVHlwZS5NSVNTSU5HX0RBVEEsIERhdGFJZHMuQ2hhcnRTY2FsZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgTWNlQ29udmVyc2lvbkVycm9yLmNyZWF0ZUVycm9yQnlUeXBlKE1jZUNvbnZlcnNpb25FcnJvclR5cGUuTUlTU0lOR19EQVRBLCBEYXRhSWRzLkNoYXJ0U2NhbGVzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzZXR0aW5nO1xyXG4gICAgfVxyXG4gICAgc2V0dGluZ1RvUGFja2FnZShzZXR0aW5nc0RhdGE6IElTZXR0aW5ncyk6IFBhY2thZ2VBcnJheVdpdGhUb3BMZXZlbElEIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgc2V0dGluZ3MgPSBTZXR0aW5ncy5jcmVhdGUoc2V0dGluZ3NEYXRhKTtcclxuXHJcbiAgICAgICAgbGV0IGNoYXJ0RGF0YTogeyBbaW5kZXg6IHN0cmluZ106ICBJUGFja2FnZSB9ICA9IHt9O1xyXG5cclxuICAgICAgICBsZXQgcGFja2FnZVN0cnVjdHVyZTogUGFja2FnZUFycmF5V2l0aFRvcExldmVsSUQgPSB7XHJcbiAgICAgICAgICAgICBwYWNrYWdlczogbmV3IEFycmF5PElQYWNrYWdlPigpLFxyXG4gICAgICAgICAgICAgdG9wTGV2ZWxJRDogTmFOXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYoc2V0dGluZ3MudHlwZSA9PT0gdGhpcy5zZXR0aW5nc1R5cGUpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBpZCA9IE1ldGEuY3JlYXRlSUQoKTtcclxuICAgICAgICAgICAgbGV0IGFkZGl0aW9uYWxNZXRhSW5mbyA9IFt7a2V5OiBBZGRpdGlvbmFsTWV0YUtleXMuT0JKRUNUVFlQRSwgdmFsdWU6IHRoaXMub2JqZWN0VHlwZX0sIHtrZXk6IEFkZGl0aW9uYWxNZXRhS2V5cy5JRCwgdmFsdWU6IGlkfSwge2tleTogQWRkaXRpb25hbE1ldGFLZXlzLlZFUlNJT04sIHZhbHVlOiB0aGlzLmN1cnJlbnRQYWNrYWdlVmVyc2lvbn1dO1xyXG4gICAgICAgICAgICBsZXQgY2hhcnRNZXRhID0gbmV3IE1ldGEoRGF0YVR5cGUuT0JKRUNULCBhZGRpdGlvbmFsTWV0YUluZm8pO1xyXG5cclxuICAgICAgICAgICAgbGV0IGNoYXJ0VHlwZURhdGEgPSBzZXR0aW5ncy5nZXRWYWx1ZShTZXR0aW5nSWRzLkNoYXJ0VHlwZSk7XHJcbiAgICAgICAgICAgIGlmKGNoYXJ0VHlwZURhdGEgIT09IHVuZGVmaW5lZCkgeyAvLyByZXBsYWNlcyBjaGFydCB0eXBlIChudW1iZXIpIHdpdGggcmVhZGFibGUgdGV4dFxyXG4gICAgICAgICAgICAgICAgY2hhcnREYXRhW0RhdGFJZHMuQ2hhcnRUeXBlXSA9IG5ldyBQYWNrYWdlKG5ldyBNZXRhKERhdGFUeXBlLk5VTUJFUiksIENoYXJ0VHlwZU1hcHBpbmdbY2hhcnRUeXBlRGF0YV0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgTWNlQ29udmVyc2lvbkVycm9yLmNyZWF0ZUVycm9yQnlUeXBlKE1jZUNvbnZlcnNpb25FcnJvclR5cGUuTUlTU0lOR19EQVRBLCBTZXR0aW5nSWRzLkNoYXJ0VHlwZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBjaGFydE5hbWVEYXRhID0gc2V0dGluZ3MuZ2V0VmFsdWUoU2V0dGluZ0lkcy5DaGFydE5hbWUpO1xyXG4gICAgICAgICAgICBpZihjaGFydE5hbWVEYXRhICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNoYXJ0RGF0YVtEYXRhSWRzLkNoYXJ0TmFtZV0gPSBuZXcgUGFja2FnZShuZXcgTWV0YShEYXRhVHlwZS5TVFJJTkcpLCBjaGFydE5hbWVEYXRhKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IE1jZUNvbnZlcnNpb25FcnJvci5jcmVhdGVFcnJvckJ5VHlwZShNY2VDb252ZXJzaW9uRXJyb3JUeXBlLk1JU1NJTkdfREFUQSwgU2V0dGluZ0lkcy5DaGFydE5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgbGV0IGNoYXJ0RXhwYW5kU3RhdGVEYXRhID0gc2V0dGluZ3MuZ2V0VmFsdWUoU2V0dGluZ0lkcy5DaGFydEV4cGFuZFN0YXRlKTtcclxuICAgICAgICAgICAgaWYoY2hhcnRFeHBhbmRTdGF0ZURhdGEgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgY2hhcnREYXRhW0RhdGFJZHMuQ2hhcnRFeHBhbmRTdGF0ZV0gPSBuZXcgUGFja2FnZShuZXcgTWV0YShEYXRhVHlwZS5CT09MRUFOKSwgY2hhcnRFeHBhbmRTdGF0ZURhdGEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgTWNlQ29udmVyc2lvbkVycm9yLmNyZWF0ZUVycm9yQnlUeXBlKE1jZUNvbnZlcnNpb25FcnJvclR5cGUuTUlTU0lOR19EQVRBLCBTZXR0aW5nSWRzLkNoYXJ0RXhwYW5kU3RhdGUpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGNoYXJ0U2NhbGVzTWV0YSA9IG5ldyBNZXRhKERhdGFUeXBlLkFSUkFZLCBbe2tleTogQWRkaXRpb25hbE1ldGFLZXlzLkFSUkFZVFlQRSwgdmFsdWU6IEFycmF5VHlwZS5MSU5LfV0pO1xyXG4gICAgICAgICAgICBsZXQgY2hhcnRTY2FsZXNMaW5rcyA9IG5ldyBBcnJheTxudW1iZXI+KCk7XHJcbiAgICAgICAgICAgIGxldCBjaGFydFNjYWxlc0RhdGE6IEFycmF5PElTZXR0aW5ncz4gPSBzZXR0aW5ncy5nZXRWYWx1ZShTZXR0aW5nSWRzLkNoYXJ0U2NhbGVzKTtcclxuICAgICAgICAgICAgaWYoY2hhcnRTY2FsZXNEYXRhICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNoYXJ0U2NhbGVzRGF0YS5mb3JFYWNoKChzZXR0aW5ncykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGFydFNjYWxlc1BhY2thZ2VTdHJ1Y3R1cmUgPSBFeHBvcnRDb250YWluZXIuY3JlYXRlUGFja2FnZXMoc2V0dGluZ3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNoYXJ0U2NhbGVzUGFja2FnZVN0cnVjdHVyZS5wYWNrYWdlcy5sZW5ndGggPiAwICYmICFOdW1iZXIuaXNOYU4oY2hhcnRTY2FsZXNQYWNrYWdlU3RydWN0dXJlLnRvcExldmVsSUQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJ0U2NhbGVzTGlua3MucHVzaChjaGFydFNjYWxlc1BhY2thZ2VTdHJ1Y3R1cmUudG9wTGV2ZWxJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhY2thZ2VTdHJ1Y3R1cmUucGFja2FnZXMucHVzaCguLi5jaGFydFNjYWxlc1BhY2thZ2VTdHJ1Y3R1cmUucGFja2FnZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IE1jZUNvbnZlcnNpb25FcnJvci5jcmVhdGVFcnJvckJ5VHlwZShNY2VDb252ZXJzaW9uRXJyb3JUeXBlLk1JU1NJTkdfREFUQSwgU2V0dGluZ0lkcy5DaGFydFNjYWxlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBjaGFydERhdGFbRGF0YUlkcy5DaGFydFNjYWxlc10gPSBuZXcgUGFja2FnZShjaGFydFNjYWxlc01ldGEsIGNoYXJ0U2NhbGVzTGlua3MpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgTWNlQ29udmVyc2lvbkVycm9yLmNyZWF0ZUVycm9yQnlUeXBlKE1jZUNvbnZlcnNpb25FcnJvclR5cGUuTUlTU0lOR19EQVRBLCBTZXR0aW5nSWRzLkNoYXJ0U2NhbGVzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBsZXQgY2hhcnRQYWNrYWdlID0gbmV3IFBhY2thZ2UoY2hhcnRNZXRhLCBjaGFydERhdGEpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcGFja2FnZVN0cnVjdHVyZS5wYWNrYWdlcy5wdXNoKGNoYXJ0UGFja2FnZSk7XHJcbiAgICAgICAgICAgIHBhY2thZ2VTdHJ1Y3R1cmUudG9wTGV2ZWxJRCA9IGlkO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IE1jZUNvbnZlcnNpb25FcnJvci5jcmVhdGVFcnJvckJ5VHlwZShNY2VDb252ZXJzaW9uRXJyb3JUeXBlLlVOU1VQUE9SVEVEX1ZFUlNJT04sIHRoaXMuc2V0dGluZ3NUeXBlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBwYWNrYWdlU3RydWN0dXJlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBDaGFydE1hbmFnZXJDaGFydFBhY2thZ2VBZGFwdGVyIH0iXX0=