define(["require", "exports", "../../../common/packageConversion/enum/objectTypeEnum", "../../../common/packageConversion/exportContainer", "../../../common/persistence/settings", "../../../common/packageConversion/enum/dataTypeEnum", "../../../common/packageConversion/enum/additionalMetaKeys", "../../../common/packageConversion/mceConversionError", "../../../common/packageConversion/enum/arrayTypeEnum", "../../../common/packageConversion/meta", "../../../common/packageConversion/package", "./seriesProvider", "../../common/series/settingIds"], function (require, exports, objectTypeEnum_1, exportContainer_1, settings_1, dataTypeEnum_1, additionalMetaKeys_1, mceConversionError_1, arrayTypeEnum_1, meta_1, package_1, seriesProvider_1, settingIds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DataIds;
    (function (DataIds) {
        DataIds["Series"] = "series";
    })(DataIds || (DataIds = {}));
    var SeriesProviderPackageAdapter = /** @class */ (function () {
        function SeriesProviderPackageAdapter() {
            //newest version of the package format
            this.currentPackageVersion = 1;
            //define settings key for value series as there is no SettingIds object provided
            this.seriesSettingsKey = "series";
            this.seriesIdsSettingsKey = "seriesIds";
            this.settingsType = "SeriesProvider";
            this.objectType = objectTypeEnum_1.ObjectType.SERIESPROVIDER;
        }
        SeriesProviderPackageAdapter.prototype.packageToSetting = function (packageData, container) {
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
        SeriesProviderPackageAdapter.prototype.packageV1ToSetting = function (packageData, container) {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            var setting = new settings_1.Settings(this.settingsType);
            if (((_c = (_b = (_a = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _a === void 0 ? void 0 : _a[DataIds.Series]) === null || _b === void 0 ? void 0 : _b.meta) === null || _c === void 0 ? void 0 : _c.dataType) == dataTypeEnum_1.DataType.ARRAY && ((_f = (_e = (_d = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _d === void 0 ? void 0 : _d[DataIds.Series]) === null || _e === void 0 ? void 0 : _e.meta) === null || _f === void 0 ? void 0 : _f[additionalMetaKeys_1.AdditionalMetaKeys.ARRAYTYPE]) === arrayTypeEnum_1.ArrayType.LINK) {
                var seriesSettingsArray_1 = new Array();
                var serieIds_1 = new Array();
                var seriesData = (_h = (_g = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _g === void 0 ? void 0 : _g[DataIds.Series]) === null || _h === void 0 ? void 0 : _h.data;
                if (seriesData != undefined) {
                    seriesData.forEach(function (id) {
                        var _a;
                        var seriesSetting = container.getSettingsByID(id);
                        if (seriesSetting !== null) {
                            seriesSettingsArray_1.push(seriesSetting);
                            serieIds_1.push(seriesProvider_1.SeriesProvider.getSeriesPersistingIdForComponent(seriesSetting.data[settingIds_1.SettingIds.SeriesId], (_a = packageData === null || packageData === void 0 ? void 0 : packageData.meta) === null || _a === void 0 ? void 0 : _a[additionalMetaKeys_1.AdditionalMetaKeys.KEY]));
                        }
                        else {
                            throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, DataIds.Series);
                        }
                    });
                }
                else {
                    throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, DataIds.Series);
                }
                setting.setValue(this.seriesSettingsKey, seriesSettingsArray_1);
                setting.setValue(this.seriesIdsSettingsKey, serieIds_1);
            }
            else {
                throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, DataIds.Series);
            }
            return setting;
        };
        SeriesProviderPackageAdapter.prototype.settingToPackage = function (settingsData) {
            var settings = settings_1.Settings.create(settingsData);
            var serieProviderData = {};
            var packageStructure = {
                packages: new Array(),
                topLevelID: NaN
            };
            if (settings.type === this.settingsType) {
                var id = meta_1.Meta.createID();
                var additionalMetaInfo = [{ key: additionalMetaKeys_1.AdditionalMetaKeys.OBJECTTYPE, value: this.objectType }, { key: additionalMetaKeys_1.AdditionalMetaKeys.ID, value: id }, { key: additionalMetaKeys_1.AdditionalMetaKeys.VERSION, value: this.currentPackageVersion }];
                var seriesProviderMeta = new meta_1.Meta(dataTypeEnum_1.DataType.OBJECT, additionalMetaInfo);
                var seriesMeta = new meta_1.Meta(dataTypeEnum_1.DataType.ARRAY, [{ key: additionalMetaKeys_1.AdditionalMetaKeys.ARRAYTYPE, value: arrayTypeEnum_1.ArrayType.LINK }]);
                var seriesLinks_1 = new Array();
                var seriesData = settings.getValue(this.seriesSettingsKey);
                if (seriesData !== undefined) {
                    seriesData.forEach(function (setting) {
                        var _a;
                        var seriesPackages = exportContainer_1.ExportContainer.createPackages(setting);
                        if (seriesPackages.packages.length > 0 && !Number.isNaN(seriesPackages.topLevelID)) {
                            seriesLinks_1.push(seriesPackages.topLevelID);
                            (_a = packageStructure.packages).push.apply(_a, seriesPackages.packages);
                        }
                    });
                    serieProviderData[DataIds.Series] = new package_1.Package(seriesMeta, seriesLinks_1);
                }
                else {
                    throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, this.seriesSettingsKey);
                }
                var seriesProviderPackage = new package_1.Package(seriesProviderMeta, serieProviderData);
                packageStructure.packages.push(seriesProviderPackage);
                packageStructure.topLevelID = id;
            }
            else {
                throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.UNSUPPORTED_VERSION, this.settingsType);
            }
            return packageStructure;
        };
        return SeriesProviderPackageAdapter;
    }());
    exports.SeriesProviderPackageAdapter = SeriesProviderPackageAdapter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVzUHJvdmlkZXJQYWNrYWdlQWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9zZXJpZXNQcm92aWRlci9zZXJpZXNQcm92aWRlclBhY2thZ2VBZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWdCQSxJQUFLLE9BRUo7SUFGRCxXQUFLLE9BQU87UUFDUiw0QkFBaUIsQ0FBQTtJQUNyQixDQUFDLEVBRkksT0FBTyxLQUFQLE9BQU8sUUFFWDtJQUVEO1FBWUk7WUFWQSxzQ0FBc0M7WUFDckIsMEJBQXFCLEdBQVcsQ0FBQyxDQUFDO1lBRW5ELGdGQUFnRjtZQUMvRCxzQkFBaUIsR0FBVyxRQUFRLENBQUM7WUFDckMseUJBQW9CLEdBQUcsV0FBVyxDQUFDO1lBTWhELElBQUksQ0FBQyxZQUFZLEdBQUcsZ0JBQWdCLENBQUM7WUFDckMsSUFBSSxDQUFDLFVBQVUsR0FBRywyQkFBVSxDQUFDLGNBQWMsQ0FBQztRQUNoRCxDQUFDO1FBRUQsdURBQWdCLEdBQWhCLFVBQWlCLFdBQXFCLEVBQUUsU0FBMEI7O1lBRTlELElBQUksT0FBTyxHQUFjLElBQUksbUJBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFekQsSUFBRyxPQUFBLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxJQUFJLDBDQUFFLFFBQVEsS0FBSSx1QkFBUSxDQUFDLE1BQU0sSUFBSSxPQUFBLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxJQUFJLDBDQUFHLHVDQUFrQixDQUFDLFVBQVUsTUFBSyxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUV4SCxjQUFPLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxJQUFJLDBDQUFHLHVDQUFrQixDQUFDLE9BQU8sR0FBRTtvQkFDbkQsS0FBSyxDQUFDO3dCQUNGLE9BQU8sR0FBRyxJQUFJLENBQUMsa0JB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USxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsRUFBRTs0QkFDL0UsYUFBVyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7NEJBQzVDLENBQUEsS0FBQSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUEsQ0FBQyxJQUFJLFdBQUksY0FBYyxDQUFDLFFBQVEsRUFBRTt5QkFDOUQ7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsaUJBQWlCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksaUJBQU8sQ0FBQyxVQUFVLEVBQUUsYUFBVyxDQUFDLENBQUE7aUJBQzNFO3FCQUFNO29CQUNILE1BQU0sdUNBQWtCLENBQUMsaUJBQWlCLENBQUMsMkNBQXNCLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2lCQUMzRztnQkFFRCxJQUFJLHFCQUFxQixHQUFHLElBQUksaUJBQU8sQ0FBQyxrQkFBa0IsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO2dCQUUvRSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7Z0JBQ3RELGdCQUFnQixDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7YUFFcEM7aUJBQU07Z0JBQ0gsTUFBTSx1Q0FBa0IsQ0FBQyxpQkFBaUIsQ0FBQywyQ0FBc0IsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDN0c7WUFFRCxPQUFPLGdCQUFnQixDQUFDO1FBQzVCLENBQUM7UUFDTCxtQ0FBQztJQUFELENBQUMsQUFsSEQsSUFrSEM7SUFFUSxvRUFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJUGFja2FnZUFkYXB0ZXIsIFBhY2thZ2VBcnJheVdpdGhUb3BMZXZlbElEIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9pbnRlcmZhY2UvcGFja2FnZUFkYXB0ZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgT2JqZWN0VHlwZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vZW51bS9vYmplY3RUeXBlRW51bVwiO1xyXG5pbXBvcnQgeyBJUGFja2FnZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vaW50ZXJmYWNlL3BhY2thZ2VJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgRXhwb3J0Q29udGFpbmVyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9leHBvcnRDb250YWluZXJcIjtcclxuaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBEYXRhVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vZW51bS9kYXRhVHlwZUVudW1cIjtcclxuaW1wb3J0IHsgQWRkaXRpb25hbE1ldGFLZXlzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9lbnVtL2FkZGl0aW9uYWxNZXRhS2V5c1wiO1xyXG5pbXBvcnQgeyBNY2VDb252ZXJzaW9uRXJyb3IsIE1jZUNvbnZlcnNpb25FcnJvclR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL21jZUNvbnZlcnNpb25FcnJvclwiO1xyXG5pbXBvcnQgeyBBcnJheVR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2VudW0vYXJyYXlUeXBlRW51bVwiO1xyXG5pbXBvcnQgeyBNZXRhIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9tZXRhXCI7XHJcbmltcG9ydCB7IFBhY2thZ2UgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL3BhY2thZ2VcIjtcclxuaW1wb3J0IHsgU2VyaWVzUHJvdmlkZXIgfSBmcm9tIFwiLi9zZXJpZXNQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBTZXR0aW5nSWRzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJpZXMvc2V0dGluZ0lkc1wiO1xyXG5cclxuXHJcbmVudW0gRGF0YUlkcyB7XHJcbiAgICBTZXJpZXMgPSBcInNlcmllc1wiXHJcbn1cclxuXHJcbmNsYXNzIFNlcmllc1Byb3ZpZGVyUGFja2FnZUFkYXB0ZXIgaW1wbGVtZW50cyBJUGFja2FnZUFkYXB0ZXIge1xyXG5cclxuICAgIC8vbmV3ZXN0IHZlcnNpb24gb2YgdGhlIHBhY2thZ2UgZm9ybWF0XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGN1cnJlbnRQYWNrYWdlVmVyc2lvbjogbnVtYmVyID0gMTtcclxuXHJcbiAgICAvL2RlZmluZSBzZXR0aW5ncyBrZXkgZm9yIHZhbHVlIHNlcmllcyBhcyB0aGVyZSBpcyBubyBTZXR0aW5nSWRzIG9iamVjdCBwcm92aWRlZFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBzZXJpZXNTZXR0aW5nc0tleTogc3RyaW5nID0gXCJzZXJpZXNcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2VyaWVzSWRzU2V0dGluZ3NLZXkgPSBcInNlcmllc0lkc1wiO1xyXG5cclxuICAgIHByaXZhdGUgc2V0dGluZ3NUeXBlOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIG9iamVjdFR5cGU6IE9iamVjdFR5cGU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5nc1R5cGUgPSBcIlNlcmllc1Byb3ZpZGVyXCI7XHJcbiAgICAgICAgdGhpcy5vYmplY3RUeXBlID0gT2JqZWN0VHlwZS5TRVJJRVNQUk9WSURFUjtcclxuICAgIH1cclxuXHJcbiAgICBwYWNrYWdlVG9TZXR0aW5nKHBhY2thZ2VEYXRhOiBJUGFja2FnZSwgY29udGFpbmVyOiBFeHBvcnRDb250YWluZXIpOiBJU2V0dGluZ3Mge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBzZXR0aW5nOiBJU2V0dGluZ3MgPSBuZXcgU2V0dGluZ3ModGhpcy5zZXR0aW5nc1R5cGUpO1xyXG5cclxuICAgICAgICBpZihwYWNrYWdlRGF0YT8ubWV0YT8uZGF0YVR5cGUgPT0gRGF0YVR5cGUuT0JKRUNUICYmIHBhY2thZ2VEYXRhPy5tZXRhPy5bQWRkaXRpb25hbE1ldGFLZXlzLk9CSkVDVFRZUEVdID09IHRoaXMub2JqZWN0VHlwZSkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgc3dpdGNoKHBhY2thZ2VEYXRhPy5tZXRhPy5bQWRkaXRpb25hbE1ldGFLZXlzLlZFUlNJT05dKXsgXHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZyA9IHRoaXMucGFja2FnZVYxVG9TZXR0aW5nKHBhY2thZ2VEYXRhLCBjb250YWluZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBNY2VDb252ZXJzaW9uRXJyb3IuY3JlYXRlRXJyb3JCeVR5cGUoTWNlQ29udmVyc2lvbkVycm9yVHlwZS5VTlNVUFBPUlRFRF9WRVJTSU9OLCB0aGlzLm9iamVjdFR5cGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgTWNlQ29udmVyc2lvbkVycm9yLmNyZWF0ZUVycm9yQnlUeXBlKE1jZUNvbnZlcnNpb25FcnJvclR5cGUuVU5TVVBQT1JURURfVFlQRSwgdGhpcy5vYmplY3RUeXBlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzZXR0aW5nO1xyXG4gICAgfSAgICBcclxuXHJcbiAgICBwcml2YXRlIHBhY2thZ2VWMVRvU2V0dGluZyhwYWNrYWdlRGF0YTogSVBhY2thZ2UsIGNvbnRhaW5lcjogRXhwb3J0Q29udGFpbmVyKTogSVNldHRpbmdzIHtcclxuXHJcbiAgICAgICAgbGV0IHNldHRpbmcgPSBuZXcgU2V0dGluZ3ModGhpcy5zZXR0aW5nc1R5cGUpO1xyXG5cclxuICAgICAgICBpZihwYWNrYWdlRGF0YT8uZGF0YT8uW0RhdGFJZHMuU2VyaWVzXT8ubWV0YT8uZGF0YVR5cGUgPT0gRGF0YVR5cGUuQVJSQVkgJiYgcGFja2FnZURhdGE/LmRhdGE/LltEYXRhSWRzLlNlcmllc10/Lm1ldGE/LltBZGRpdGlvbmFsTWV0YUtleXMuQVJSQVlUWVBFXSA9PT0gQXJyYXlUeXBlLkxJTkspIHtcclxuICAgICAgICAgICAgbGV0IHNlcmllc1NldHRpbmdzQXJyYXkgPSBuZXcgQXJyYXk8SVNldHRpbmdzPigpO1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVJZHMgPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVzRGF0YTogQXJyYXk8bnVtYmVyPiA9IHBhY2thZ2VEYXRhPy5kYXRhPy5bRGF0YUlkcy5TZXJpZXNdPy5kYXRhO1xyXG4gICAgICAgICAgICBpZihzZXJpZXNEYXRhICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBzZXJpZXNEYXRhLmZvckVhY2goKGlkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlcmllc1NldHRpbmcgPSBjb250YWluZXIuZ2V0U2V0dGluZ3NCeUlEKGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihzZXJpZXNTZXR0aW5nICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcmllc1NldHRpbmdzQXJyYXkucHVzaChzZXJpZXNTZXR0aW5nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWVJZHMucHVzaChTZXJpZXNQcm92aWRlci5nZXRTZXJpZXNQZXJzaXN0aW5nSWRGb3JDb21wb25lbnQoc2VyaWVzU2V0dGluZy5kYXRhW1NldHRpbmdJZHMuU2VyaWVzSWRdLCBwYWNrYWdlRGF0YT8ubWV0YT8uW0FkZGl0aW9uYWxNZXRhS2V5cy5LRVldKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgTWNlQ29udmVyc2lvbkVycm9yLmNyZWF0ZUVycm9yQnlUeXBlKE1jZUNvbnZlcnNpb25FcnJvclR5cGUuTUlTU0lOR19EQVRBLCBEYXRhSWRzLlNlcmllcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBNY2VDb252ZXJzaW9uRXJyb3IuY3JlYXRlRXJyb3JCeVR5cGUoTWNlQ29udmVyc2lvbkVycm9yVHlwZS5NSVNTSU5HX0RBVEEsIERhdGFJZHMuU2VyaWVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXR0aW5nLnNldFZhbHVlKHRoaXMuc2VyaWVzU2V0dGluZ3NLZXksIHNlcmllc1NldHRpbmdzQXJyYXkpO1xyXG4gICAgICAgICAgICBzZXR0aW5nLnNldFZhbHVlKHRoaXMuc2VyaWVzSWRzU2V0dGluZ3NLZXksIHNlcmllSWRzKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgTWNlQ29udmVyc2lvbkVycm9yLmNyZWF0ZUVycm9yQnlUeXBlKE1jZUNvbnZlcnNpb25FcnJvclR5cGUuTUlTU0lOR19EQVRBLCBEYXRhSWRzLlNlcmllcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2V0dGluZztcclxuICAgIH1cclxuXHJcbiAgICBzZXR0aW5nVG9QYWNrYWdlKHNldHRpbmdzRGF0YTogSVNldHRpbmdzKTogUGFja2FnZUFycmF5V2l0aFRvcExldmVsSUQge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBzZXR0aW5ncyA9IFNldHRpbmdzLmNyZWF0ZShzZXR0aW5nc0RhdGEpO1xyXG5cclxuICAgICAgICBsZXQgc2VyaWVQcm92aWRlckRhdGE6IHsgW2luZGV4OiBzdHJpbmddOiAgSVBhY2thZ2UgfSAgPSB7fTtcclxuXHJcbiAgICAgICAgbGV0IHBhY2thZ2VTdHJ1Y3R1cmU6IFBhY2thZ2VBcnJheVdpdGhUb3BMZXZlbElEID0ge1xyXG4gICAgICAgICAgICBwYWNrYWdlczogbmV3IEFycmF5PElQYWNrYWdlPigpLFxyXG4gICAgICAgICAgICB0b3BMZXZlbElEOiBOYU5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZihzZXR0aW5ncy50eXBlID09PSB0aGlzLnNldHRpbmdzVHlwZSkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGlkID0gTWV0YS5jcmVhdGVJRCgpO1xyXG4gICAgICAgICAgICBsZXQgYWRkaXRpb25hbE1ldGFJbmZvID0gW3trZXk6IEFkZGl0aW9uYWxNZXRhS2V5cy5PQkpFQ1RUWVBFLCB2YWx1ZTogdGhpcy5vYmplY3RUeXBlfSwge2tleTogQWRkaXRpb25hbE1ldGFLZXlzLklELCB2YWx1ZTogaWR9LCB7a2V5OiBBZGRpdGlvbmFsTWV0YUtleXMuVkVSU0lPTiwgdmFsdWU6IHRoaXMuY3VycmVudFBhY2thZ2VWZXJzaW9ufV07XHJcbiAgICAgICAgICAgIGxldCBzZXJpZXNQcm92aWRlck1ldGEgPSBuZXcgTWV0YShEYXRhVHlwZS5PQkpFQ1QsIGFkZGl0aW9uYWxNZXRhSW5mbyk7XHJcbiAgICAgICAgICAgIGxldCBzZXJpZXNNZXRhID0gbmV3IE1ldGEoRGF0YVR5cGUuQVJSQVksIFt7a2V5OiBBZGRpdGlvbmFsTWV0YUtleXMuQVJSQVlUWVBFLCB2YWx1ZTogQXJyYXlUeXBlLkxJTkt9XSk7XHJcbiAgICAgICAgICAgIGxldCBzZXJpZXNMaW5rcyA9IG5ldyBBcnJheTxudW1iZXI+KCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2VyaWVzRGF0YTogQXJyYXk8SVNldHRpbmdzPiA9IHNldHRpbmdzLmdldFZhbHVlKHRoaXMuc2VyaWVzU2V0dGluZ3NLZXkpO1xyXG4gICAgICAgICAgICBpZihzZXJpZXNEYXRhICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHNlcmllc0RhdGEuZm9yRWFjaCgoc2V0dGluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzZXJpZXNQYWNrYWdlcyA9IEV4cG9ydENvbnRhaW5lci5jcmVhdGVQYWNrYWdlcyhzZXR0aW5nKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihzZXJpZXNQYWNrYWdlcy5wYWNrYWdlcy5sZW5ndGggPiAwICYmICFOdW1iZXIuaXNOYU4oc2VyaWVzUGFja2FnZXMudG9wTGV2ZWxJRCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWVzTGlua3MucHVzaChzZXJpZXNQYWNrYWdlcy50b3BMZXZlbElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFja2FnZVN0cnVjdHVyZS5wYWNrYWdlcy5wdXNoKC4uLnNlcmllc1BhY2thZ2VzLnBhY2thZ2VzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHNlcmllUHJvdmlkZXJEYXRhW0RhdGFJZHMuU2VyaWVzXSA9IG5ldyBQYWNrYWdlKHNlcmllc01ldGEsIHNlcmllc0xpbmtzKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgTWNlQ29udmVyc2lvbkVycm9yLmNyZWF0ZUVycm9yQnlUeXBlKE1jZUNvbnZlcnNpb25FcnJvclR5cGUuTUlTU0lOR19EQVRBLCB0aGlzLnNlcmllc1NldHRpbmdzS2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgc2VyaWVzUHJvdmlkZXJQYWNrYWdlID0gbmV3IFBhY2thZ2Uoc2VyaWVzUHJvdmlkZXJNZXRhLCBzZXJpZVByb3ZpZGVyRGF0YSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBwYWNrYWdlU3RydWN0dXJlLnBhY2thZ2VzLnB1c2goc2VyaWVzUHJvdmlkZXJQYWNrYWdlKTtcclxuICAgICAgICAgICAgcGFja2FnZVN0cnVjdHVyZS50b3BMZXZlbElEID0gaWQ7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgTWNlQ29udmVyc2lvbkVycm9yLmNyZWF0ZUVycm9yQnlUeXBlKE1jZUNvbnZlcnNpb25FcnJvclR5cGUuVU5TVVBQT1JURURfVkVSU0lPTiwgdGhpcy5zZXR0aW5nc1R5cGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHBhY2thZ2VTdHJ1Y3R1cmU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFNlcmllc1Byb3ZpZGVyUGFja2FnZUFkYXB0ZXIgfSJdfQ==