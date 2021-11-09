define(["require", "exports", "../../common/packageConversion/enum/objectTypeEnum", "../../common/packageConversion/exportContainer", "../../common/persistence/settings", "../../common/packageConversion/enum/dataTypeEnum", "../../common/packageConversion/enum/additionalMetaKeys", "../../common/packageConversion/mceConversionError", "../../common/packageConversion/enum/arrayTypeEnum", "../../common/packageConversion/meta", "../../common/packageConversion/package"], function (require, exports, objectTypeEnum_1, exportContainer_1, settings_1, dataTypeEnum_1, additionalMetaKeys_1, mceConversionError_1, arrayTypeEnum_1, meta_1, package_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DataIds;
    (function (DataIds) {
        DataIds["DataModel"] = "dataModel";
    })(DataIds || (DataIds = {}));
    var ChartManagerDataModelPackageAdapter = /** @class */ (function () {
        function ChartManagerDataModelPackageAdapter() {
            //newest version of the package format
            this.currentPackageVersion = 1;
            //define settings key for value categories as there is no SettingIds object provided
            this.dataModelSettingsKey = "dataModel";
            this.settingsType = "ChartManagerDataModel";
            this.objectType = objectTypeEnum_1.ObjectType.CHARTMANAGERDATAMODEL;
        }
        ChartManagerDataModelPackageAdapter.prototype.packageToSetting = function (packageData, container) {
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
        ChartManagerDataModelPackageAdapter.prototype.packageV1ToSetting = function (packageData, container) {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            var setting = new settings_1.Settings(this.settingsType);
            if (((_c = (_b = (_a = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _a === void 0 ? void 0 : _a[DataIds.DataModel]) === null || _b === void 0 ? void 0 : _b.meta) === null || _c === void 0 ? void 0 : _c.dataType) === dataTypeEnum_1.DataType.ARRAY && ((_f = (_e = (_d = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _d === void 0 ? void 0 : _d[DataIds.DataModel]) === null || _e === void 0 ? void 0 : _e.meta) === null || _f === void 0 ? void 0 : _f[additionalMetaKeys_1.AdditionalMetaKeys.ARRAYTYPE]) === arrayTypeEnum_1.ArrayType.LINK) {
                var dataModelSettingsArray_1 = new Array();
                var dataModelData = (_h = (_g = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _g === void 0 ? void 0 : _g[DataIds.DataModel]) === null || _h === void 0 ? void 0 : _h.data;
                if (dataModelData !== undefined) {
                    dataModelData.forEach(function (id) {
                        var dataModelSetting = container.getSettingsByID(id);
                        if (dataModelSetting !== null) {
                            dataModelSettingsArray_1.push(dataModelSetting);
                        }
                        else {
                            throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, DataIds.DataModel);
                        }
                    });
                    setting.setValue(this.dataModelSettingsKey, dataModelSettingsArray_1);
                }
                else {
                    throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, DataIds.DataModel);
                }
            }
            else {
                throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, DataIds.DataModel);
            }
            return setting;
        };
        ChartManagerDataModelPackageAdapter.prototype.settingToPackage = function (settingsData) {
            var _this = this;
            var settings = settings_1.Settings.create(settingsData);
            var chartManagerDataModelData = {};
            var packageStructure = {
                packages: new Array(),
                topLevelID: NaN
            };
            if (settings.type === this.settingsType) {
                var id = meta_1.Meta.createID();
                var additionalMetaInfo = [{ key: additionalMetaKeys_1.AdditionalMetaKeys.OBJECTTYPE, value: this.objectType }, { key: additionalMetaKeys_1.AdditionalMetaKeys.ID, value: id }, { key: additionalMetaKeys_1.AdditionalMetaKeys.VERSION, value: this.currentPackageVersion }];
                var chartManagerDataModelMeta = new meta_1.Meta(dataTypeEnum_1.DataType.OBJECT, additionalMetaInfo);
                var dataModelMeta = new meta_1.Meta(dataTypeEnum_1.DataType.ARRAY, [{ key: additionalMetaKeys_1.AdditionalMetaKeys.ARRAYTYPE, value: arrayTypeEnum_1.ArrayType.LINK }]);
                var dataModelLinks_1 = new Array();
                var categoriesData = settings.getValue(this.dataModelSettingsKey);
                if (categoriesData !== undefined) {
                    categoriesData.forEach(function (settings) {
                        var _a;
                        var categoryPackageStructure = exportContainer_1.ExportContainer.createPackages(settings);
                        if (categoryPackageStructure.packages.length > 0 && !Number.isNaN(categoryPackageStructure.topLevelID)) {
                            dataModelLinks_1.push(categoryPackageStructure.topLevelID);
                            (_a = packageStructure.packages).push.apply(_a, categoryPackageStructure.packages);
                        }
                        else {
                            throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, _this.dataModelSettingsKey);
                        }
                    });
                    chartManagerDataModelData[DataIds.DataModel] = new package_1.Package(dataModelMeta, dataModelLinks_1);
                }
                else {
                    throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, this.dataModelSettingsKey);
                }
                var chartManagerDataModelPackage = new package_1.Package(chartManagerDataModelMeta, chartManagerDataModelData);
                packageStructure.packages.push(chartManagerDataModelPackage);
                packageStructure.topLevelID = id;
            }
            else {
                throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.UNSUPPORTED_TYPE, this.settingsType);
            }
            return packageStructure;
        };
        return ChartManagerDataModelPackageAdapter;
    }());
    exports.ChartManagerDataModelPackageAdapter = ChartManagerDataModelPackageAdapter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRNYW5hZ2VyRGF0YU1vZGVsUGFja2FnZUFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsUGFja2FnZUFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBY0EsSUFBSyxPQUVKO0lBRkQsV0FBSyxPQUFPO1FBQ1Isa0NBQXVCLENBQUE7SUFDM0IsQ0FBQyxFQUZJLE9BQU8sS0FBUCxPQUFPLFFBRVg7SUFFRDtRQVdJO1lBVEEsc0NBQXNDO1lBQ3JCLDBCQUFxQixHQUFXLENBQUMsQ0FBQztZQUVuRCxvRkFBb0Y7WUFDbkUseUJBQW9CLEdBQUcsV0FBVyxDQUFBO1lBTS9DLElBQUksQ0FBQyxZQUFZLEdBQUcsdUJBQXVCLENBQUM7WUFDNUMsSUFBSSxDQUFDLFVBQVUsR0FBRywyQkFBVSxDQUFDLHFCQUFxQixDQUFDO1FBQ3ZELENBQUM7UUFFRCw4REFBZ0IsR0FBaEIsVUFBaUIsV0FBcUIsRUFBRSxTQUEwQjs7WUFFOUQsSUFBSSxPQUFPLEdBQWMsSUFBSSxtQkFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUV6RCxJQUFHLE9BQUEsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLElBQUksMENBQUUsUUFBUSxLQUFJLHVCQUFRLENBQUMsTUFBTSxJQUFJLE9BQUEsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLElBQUksMENBQUcsdUNBQWtCLENBQUMsVUFBVSxNQUFLLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBRXhILGNBQU8sV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLElBQUksMENBQUcsdUNBQWtCLENBQUMsT0FBTyxHQUFFO29CQUNuRCxLQUFLLENBQUM7d0JBQ0YsT0FBTyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVB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LFlBQVksRUFBRSxLQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQzt5QkFDOUc7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7b0JBQ0gseUJBQXlCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksaUJBQU8sQ0FBQyxhQUFhLEVBQUUsZ0JBQWMsQ0FBQyxDQUFDO2lCQUM3RjtxQkFBTTtvQkFDSCxNQUFNLHVDQUFrQixDQUFDLGlCQUFpQixDQUFDLDJDQUFzQixDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztpQkFDOUc7Z0JBR0QsSUFBSSw0QkFBNEIsR0FBRyxJQUFJLGlCQUFPLENBQUMseUJBQXlCLEVBQUUseUJBQXlCLENBQUMsQ0FBQztnQkFFckcsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2dCQUM3RCxnQkFBZ0IsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO2FBQ3BDO2lCQUFNO2dCQUNILE1BQU0sdUNBQWtCLENBQUMsaUJBQWlCLENBQUMsMkNBQXNCLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzFHO1lBRUQsT0FBTyxnQkFBZ0IsQ0FBQztRQUM1QixDQUFDO1FBQ0wsMENBQUM7SUFBRCxDQUFDLEFBN0dELElBNkdDO0lBRVEsa0ZBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVBhY2thZ2VBZGFwdGVyLCBQYWNrYWdlQXJyYXlXaXRoVG9wTGV2ZWxJRCB9IGZyb20gXCIuLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vaW50ZXJmYWNlL3BhY2thZ2VBZGFwdGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE9iamVjdFR5cGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2VudW0vb2JqZWN0VHlwZUVudW1cIjtcclxuaW1wb3J0IHsgSVBhY2thZ2UgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2ludGVyZmFjZS9wYWNrYWdlSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEV4cG9ydENvbnRhaW5lciB9IGZyb20gXCIuLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vZXhwb3J0Q29udGFpbmVyXCI7XHJcbmltcG9ydCB7IElTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9zZXR0aW5nc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vcGVyc2lzdGVuY2Uvc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgRGF0YVR5cGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2VudW0vZGF0YVR5cGVFbnVtXCI7XHJcbmltcG9ydCB7IEFkZGl0aW9uYWxNZXRhS2V5cyB9IGZyb20gXCIuLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vZW51bS9hZGRpdGlvbmFsTWV0YUtleXNcIjtcclxuaW1wb3J0IHsgTWNlQ29udmVyc2lvbkVycm9yLCBNY2VDb252ZXJzaW9uRXJyb3JUeXBlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9tY2VDb252ZXJzaW9uRXJyb3JcIjtcclxuaW1wb3J0IHsgQXJyYXlUeXBlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9lbnVtL2FycmF5VHlwZUVudW1cIjtcclxuaW1wb3J0IHsgTWV0YSB9IGZyb20gXCIuLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vbWV0YVwiO1xyXG5pbXBvcnQgeyBQYWNrYWdlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9wYWNrYWdlXCI7XHJcblxyXG5cclxuZW51bSBEYXRhSWRzIHtcclxuICAgIERhdGFNb2RlbCA9IFwiZGF0YU1vZGVsXCJcclxufVxyXG5cclxuY2xhc3MgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsUGFja2FnZUFkYXB0ZXIgaW1wbGVtZW50cyBJUGFja2FnZUFkYXB0ZXIge1xyXG5cclxuICAgIC8vbmV3ZXN0IHZlcnNpb24gb2YgdGhlIHBhY2thZ2UgZm9ybWF0XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGN1cnJlbnRQYWNrYWdlVmVyc2lvbjogbnVtYmVyID0gMTtcclxuXHJcbiAgICAvL2RlZmluZSBzZXR0aW5ncyBrZXkgZm9yIHZhbHVlIGNhdGVnb3JpZXMgYXMgdGhlcmUgaXMgbm8gU2V0dGluZ0lkcyBvYmplY3QgcHJvdmlkZWRcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZGF0YU1vZGVsU2V0dGluZ3NLZXkgPSBcImRhdGFNb2RlbFwiXHJcblxyXG4gICAgcHJpdmF0ZSBzZXR0aW5nc1R5cGU6IHN0cmluZztcclxuICAgIHByaXZhdGUgb2JqZWN0VHlwZTogT2JqZWN0VHlwZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnNldHRpbmdzVHlwZSA9IFwiQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsXCI7XHJcbiAgICAgICAgdGhpcy5vYmplY3RUeXBlID0gT2JqZWN0VHlwZS5DSEFSVE1BTkFHRVJEQVRBTU9ERUw7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHBhY2thZ2VUb1NldHRpbmcocGFja2FnZURhdGE6IElQYWNrYWdlLCBjb250YWluZXI6IEV4cG9ydENvbnRhaW5lcik6IElTZXR0aW5ncyB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHNldHRpbmc6IElTZXR0aW5ncyA9IG5ldyBTZXR0aW5ncyh0aGlzLnNldHRpbmdzVHlwZSk7XHJcblxyXG4gICAgICAgIGlmKHBhY2thZ2VEYXRhPy5tZXRhPy5kYXRhVHlwZSA9PSBEYXRhVHlwZS5PQkpFQ1QgJiYgcGFja2FnZURhdGE/Lm1ldGE/LltBZGRpdGlvbmFsTWV0YUtleXMuT0JKRUNUVFlQRV0gPT0gdGhpcy5vYmplY3RUeXBlKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIHN3aXRjaChwYWNrYWdlRGF0YT8ubWV0YT8uW0FkZGl0aW9uYWxNZXRhS2V5cy5WRVJTSU9OXSl7IFxyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmcgPSB0aGlzLnBhY2thZ2VWMVRvU2V0dGluZyhwYWNrYWdlRGF0YSwgY29udGFpbmVyKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgTWNlQ29udmVyc2lvbkVycm9yLmNyZWF0ZUVycm9yQnlUeXBlKE1jZUNvbnZlcnNpb25FcnJvclR5cGUuVU5TVVBQT1JURURfVkVSU0lPTiwgdGhpcy5vYmplY3RUeXBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IE1jZUNvbnZlcnNpb25FcnJvci5jcmVhdGVFcnJvckJ5VHlwZShNY2VDb252ZXJzaW9uRXJyb3JUeXBlLlVOU1VQUE9SVEVEX1RZUEUsIHRoaXMub2JqZWN0VHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXR0aW5nO1xyXG4gICAgfSAgICBcclxuXHJcbiAgICBwcml2YXRlIHBhY2thZ2VWMVRvU2V0dGluZyhwYWNrYWdlRGF0YTogSVBhY2thZ2UsIGNvbnRhaW5lcjogRXhwb3J0Q29udGFpbmVyKTogSVNldHRpbmdzIHtcclxuXHJcbiAgICAgICAgbGV0IHNldHRpbmcgPSBuZXcgU2V0dGluZ3ModGhpcy5zZXR0aW5nc1R5cGUpO1xyXG5cclxuICAgICAgICBpZihwYWNrYWdlRGF0YT8uZGF0YT8uW0RhdGFJZHMuRGF0YU1vZGVsXT8ubWV0YT8uZGF0YVR5cGUgPT09IERhdGFUeXBlLkFSUkFZICYmIHBhY2thZ2VEYXRhPy5kYXRhPy5bRGF0YUlkcy5EYXRhTW9kZWxdPy5tZXRhPy5bQWRkaXRpb25hbE1ldGFLZXlzLkFSUkFZVFlQRV0gPT09IEFycmF5VHlwZS5MSU5LKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhTW9kZWxTZXR0aW5nc0FycmF5ID0gbmV3IEFycmF5PElTZXR0aW5ncz4oKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBkYXRhTW9kZWxEYXRhOiBBcnJheTxudW1iZXI+ID0gcGFja2FnZURhdGE/LmRhdGE/LltEYXRhSWRzLkRhdGFNb2RlbF0/LmRhdGE7XHJcbiAgICAgICAgICAgIGlmKGRhdGFNb2RlbERhdGEgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YU1vZGVsRGF0YS5mb3JFYWNoKChpZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhTW9kZWxTZXR0aW5nID0gY29udGFpbmVyLmdldFNldHRpbmdzQnlJRChpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YU1vZGVsU2V0dGluZyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhTW9kZWxTZXR0aW5nc0FycmF5LnB1c2goZGF0YU1vZGVsU2V0dGluZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBNY2VDb252ZXJzaW9uRXJyb3IuY3JlYXRlRXJyb3JCeVR5cGUoTWNlQ29udmVyc2lvbkVycm9yVHlwZS5NSVNTSU5HX0RBVEEsIERhdGFJZHMuRGF0YU1vZGVsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHNldHRpbmcuc2V0VmFsdWUodGhpcy5kYXRhTW9kZWxTZXR0aW5nc0tleSwgZGF0YU1vZGVsU2V0dGluZ3NBcnJheSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBNY2VDb252ZXJzaW9uRXJyb3IuY3JlYXRlRXJyb3JCeVR5cGUoTWNlQ29udmVyc2lvbkVycm9yVHlwZS5NSVNTSU5HX0RBVEEsIERhdGFJZHMuRGF0YU1vZGVsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBNY2VDb252ZXJzaW9uRXJyb3IuY3JlYXRlRXJyb3JCeVR5cGUoTWNlQ29udmVyc2lvbkVycm9yVHlwZS5NSVNTSU5HX0RBVEEsIERhdGFJZHMuRGF0YU1vZGVsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzZXR0aW5nO1xyXG4gICAgfVxyXG4gICAgc2V0dGluZ1RvUGFja2FnZShzZXR0aW5nc0RhdGE6IElTZXR0aW5ncyk6IFBhY2thZ2VBcnJheVdpdGhUb3BMZXZlbElEIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgc2V0dGluZ3MgPSBTZXR0aW5ncy5jcmVhdGUoc2V0dGluZ3NEYXRhKTtcclxuXHJcbiAgICAgICAgbGV0IGNoYXJ0TWFuYWdlckRhdGFNb2RlbERhdGE6IHsgW2luZGV4OiBzdHJpbmddOiAgSVBhY2thZ2UgfSAgPSB7fTtcclxuXHJcbiAgICAgICAgbGV0IHBhY2thZ2VTdHJ1Y3R1cmU6IFBhY2thZ2VBcnJheVdpdGhUb3BMZXZlbElEID0ge1xyXG4gICAgICAgICAgICBwYWNrYWdlczogbmV3IEFycmF5PElQYWNrYWdlPigpLFxyXG4gICAgICAgICAgICB0b3BMZXZlbElEOiBOYU5cclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmKHNldHRpbmdzLnR5cGUgPT09IHRoaXMuc2V0dGluZ3NUeXBlKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgaWQgPSBNZXRhLmNyZWF0ZUlEKCk7XHJcbiAgICAgICAgICAgIGxldCBhZGRpdGlvbmFsTWV0YUluZm8gPSBbe2tleTogQWRkaXRpb25hbE1ldGFLZXlzLk9CSkVDVFRZUEUsIHZhbHVlOiB0aGlzLm9iamVjdFR5cGV9LCB7a2V5OiBBZGRpdGlvbmFsTWV0YUtleXMuSUQsIHZhbHVlOiBpZH0sIHtrZXk6IEFkZGl0aW9uYWxNZXRhS2V5cy5WRVJTSU9OLCB2YWx1ZTogdGhpcy5jdXJyZW50UGFja2FnZVZlcnNpb259XTtcclxuICAgICAgICAgICAgbGV0IGNoYXJ0TWFuYWdlckRhdGFNb2RlbE1ldGEgPSBuZXcgTWV0YShEYXRhVHlwZS5PQkpFQ1QsIGFkZGl0aW9uYWxNZXRhSW5mbyk7XHJcbiAgICAgICAgICAgIGxldCBkYXRhTW9kZWxNZXRhID0gbmV3IE1ldGEoRGF0YVR5cGUuQVJSQVksIFt7a2V5OiBBZGRpdGlvbmFsTWV0YUtleXMuQVJSQVlUWVBFLCB2YWx1ZTogQXJyYXlUeXBlLkxJTkt9XSk7XHJcbiAgICAgICAgICAgIGxldCBkYXRhTW9kZWxMaW5rcyA9IG5ldyBBcnJheTxudW1iZXI+KCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgY2F0ZWdvcmllc0RhdGE6IEFycmF5PElTZXR0aW5ncz4gPSBzZXR0aW5ncy5nZXRWYWx1ZSh0aGlzLmRhdGFNb2RlbFNldHRpbmdzS2V5KTtcclxuICAgICAgICAgICAgaWYoY2F0ZWdvcmllc0RhdGEgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcmllc0RhdGEuZm9yRWFjaCgoc2V0dGluZ3MpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2F0ZWdvcnlQYWNrYWdlU3RydWN0dXJlID0gRXhwb3J0Q29udGFpbmVyLmNyZWF0ZVBhY2thZ2VzKHNldHRpbmdzKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihjYXRlZ29yeVBhY2thZ2VTdHJ1Y3R1cmUucGFja2FnZXMubGVuZ3RoID4gMCAmJiAhTnVtYmVyLmlzTmFOKGNhdGVnb3J5UGFja2FnZVN0cnVjdHVyZS50b3BMZXZlbElEKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhTW9kZWxMaW5rcy5wdXNoKGNhdGVnb3J5UGFja2FnZVN0cnVjdHVyZS50b3BMZXZlbElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFja2FnZVN0cnVjdHVyZS5wYWNrYWdlcy5wdXNoKC4uLmNhdGVnb3J5UGFja2FnZVN0cnVjdHVyZS5wYWNrYWdlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgTWNlQ29udmVyc2lvbkVycm9yLmNyZWF0ZUVycm9yQnlUeXBlKE1jZUNvbnZlcnNpb25FcnJvclR5cGUuTUlTU0lOR19EQVRBLCB0aGlzLmRhdGFNb2RlbFNldHRpbmdzS2V5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGNoYXJ0TWFuYWdlckRhdGFNb2RlbERhdGFbRGF0YUlkcy5EYXRhTW9kZWxdID0gbmV3IFBhY2thZ2UoZGF0YU1vZGVsTWV0YSwgZGF0YU1vZGVsTGlua3MpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgTWNlQ29udmVyc2lvbkVycm9yLmNyZWF0ZUVycm9yQnlUeXBlKE1jZUNvbnZlcnNpb25FcnJvclR5cGUuTUlTU0lOR19EQVRBLCB0aGlzLmRhdGFNb2RlbFNldHRpbmdzS2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIGxldCBjaGFydE1hbmFnZXJEYXRhTW9kZWxQYWNrYWdlID0gbmV3IFBhY2thZ2UoY2hhcnRNYW5hZ2VyRGF0YU1vZGVsTWV0YSwgY2hhcnRNYW5hZ2VyRGF0YU1vZGVsRGF0YSk7XHJcblxyXG4gICAgICAgICAgICBwYWNrYWdlU3RydWN0dXJlLnBhY2thZ2VzLnB1c2goY2hhcnRNYW5hZ2VyRGF0YU1vZGVsUGFja2FnZSk7XHJcbiAgICAgICAgICAgIHBhY2thZ2VTdHJ1Y3R1cmUudG9wTGV2ZWxJRCA9IGlkO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IE1jZUNvbnZlcnNpb25FcnJvci5jcmVhdGVFcnJvckJ5VHlwZShNY2VDb252ZXJzaW9uRXJyb3JUeXBlLlVOU1VQUE9SVEVEX1RZUEUsIHRoaXMuc2V0dGluZ3NUeXBlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBwYWNrYWdlU3RydWN0dXJlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBDaGFydE1hbmFnZXJEYXRhTW9kZWxQYWNrYWdlQWRhcHRlciB9Il19