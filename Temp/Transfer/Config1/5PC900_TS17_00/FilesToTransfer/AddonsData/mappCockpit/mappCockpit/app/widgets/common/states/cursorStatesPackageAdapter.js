define(["require", "exports", "../../../common/packageConversion/enum/objectTypeEnum", "../../../common/persistence/settings", "../../../common/packageConversion/enum/dataTypeEnum", "../../../common/packageConversion/enum/additionalMetaKeys", "../../../common/packageConversion/mceConversionError", "../../../common/packageConversion/meta", "../../../common/packageConversion/package", "./settingIds"], function (require, exports, objectTypeEnum_1, settings_1, dataTypeEnum_1, additionalMetaKeys_1, mceConversionError_1, meta_1, package_1, settingIds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DataIds;
    (function (DataIds) {
        DataIds["TimeCursorStates"] = "timeCursorStates";
        DataIds["FrequencyCursorStates"] = "frequencyCursorStates";
        DataIds["Position"] = "position";
        DataIds["Active"] = "active";
    })(DataIds || (DataIds = {}));
    /**
     * Handles the conversion of CursorStates data between Settings and package formats.
     *
     * @class CursorStatesPackageAdapter
     * @implements {IPackageAdapter}
     */
    var CursorStatesPackageAdapter = /** @class */ (function () {
        /**
         * Creates an instance of CursorStatesPackageAdapter.
         * Sets settings and object type.
         *
         * @memberof CursorStatesPackageAdapter
         */
        function CursorStatesPackageAdapter() {
            //newest version of package format
            this.currentPackageVersion = 1;
            //CursorState ObjectType (not a seperate adapter)
            this.cursorStateDataObjectType = "cursorstatedata";
            this.settingsType = "CursorStates";
            this.objectType = objectTypeEnum_1.ObjectType.CURSORSTATES;
        }
        /**
         * Converts CursorStates data from package to Settings format (import).
         *
         * @param {IPackage} packageData
         * @param {ExportContainer} container
         * @returns {ISettings}
         * @memberof CursorStatesPackageAdapter
         */
        CursorStatesPackageAdapter.prototype.packageToSetting = function (packageData, container) {
            var _a, _b, _c;
            var setting = new settings_1.Settings(this.settingsType);
            //version selection
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
        /**
         * Converts CursorStates data from package format in version 1 to settings format (import).
         *
         * @private
         * @param {IPackage} packageData
         * @param {ExportContainer} container
         * @returns {ISettings}
         * @memberof CursorStatesPackageAdapter
         */
        CursorStatesPackageAdapter.prototype.packageV1ToSetting = function (packageData, container) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
            var setting = new settings_1.Settings(this.settingsType);
            // get cursorstates of time cursors from package and set them to the settings object
            if (((_c = (_b = (_a = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _a === void 0 ? void 0 : _a[DataIds.TimeCursorStates]) === null || _b === void 0 ? void 0 : _b.meta) === null || _c === void 0 ? void 0 : _c.dataType) == dataTypeEnum_1.DataType.ARRAY && ((_f = (_e = (_d = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _d === void 0 ? void 0 : _d[DataIds.TimeCursorStates]) === null || _e === void 0 ? void 0 : _e.meta) === null || _f === void 0 ? void 0 : _f[additionalMetaKeys_1.AdditionalMetaKeys.ARRAYTYPE]) == this.cursorStateDataObjectType) {
                var timeCursorStatesArray = (_h = (_g = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _g === void 0 ? void 0 : _g[DataIds.TimeCursorStates]) === null || _h === void 0 ? void 0 : _h.data;
                setting.setValue(settingIds_1.SettingIds.TimeCursorPositions, timeCursorStatesArray.map(function (cursorState) { return cursorState.position; }));
                setting.setValue(settingIds_1.SettingIds.TimeCursorActiveState, timeCursorStatesArray.map(function (cursorState) { return cursorState.active; }));
            }
            else {
                throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, DataIds.TimeCursorStates);
            }
            // get cursorstates of frequency cursors from package and set them to the settings object
            if (((_l = (_k = (_j = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _j === void 0 ? void 0 : _j[DataIds.FrequencyCursorStates]) === null || _k === void 0 ? void 0 : _k.meta) === null || _l === void 0 ? void 0 : _l.dataType) == dataTypeEnum_1.DataType.ARRAY && ((_p = (_o = (_m = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _m === void 0 ? void 0 : _m[DataIds.FrequencyCursorStates]) === null || _o === void 0 ? void 0 : _o.meta) === null || _p === void 0 ? void 0 : _p[additionalMetaKeys_1.AdditionalMetaKeys.ARRAYTYPE]) == this.cursorStateDataObjectType) {
                var fftCursorStatesArray = (_r = (_q = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _q === void 0 ? void 0 : _q[DataIds.FrequencyCursorStates]) === null || _r === void 0 ? void 0 : _r.data;
                setting.setValue(settingIds_1.SettingIds.FftCursorPositions, fftCursorStatesArray.map(function (cursorState) { return cursorState.position; }));
                setting.setValue(settingIds_1.SettingIds.FftCursorActiveState, fftCursorStatesArray.map(function (cursorState) { return cursorState.active; }));
            }
            else {
                throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, DataIds.FrequencyCursorStates);
            }
            return setting;
        };
        /**
         * Merges arrays containing CursorPosition and CursorActivateState into one.
         *
         * @private
         * @param {Array<number>} cursorPositionArray
         * @param {Array<boolean>} cursorActiveStateArray
         * @returns {Array<CursorStateDataObject>}
         * @memberof CursorStatesPackageAdapter
         */
        CursorStatesPackageAdapter.prototype.buildcursorStateDataObjectArray = function (cursorPositionArray, cursorActiveStateArray) {
            var cursorStateDataObjectArray = new Array();
            for (var i = 0; i < cursorPositionArray.length && i < cursorActiveStateArray.length; i++) {
                var cursorStateDataObject = {};
                cursorStateDataObject[DataIds.Position] = cursorPositionArray[i];
                cursorStateDataObject[DataIds.Active] = cursorActiveStateArray[i];
                cursorStateDataObjectArray.push(cursorStateDataObject);
            }
            return cursorStateDataObjectArray;
        };
        /**
         * Converts CursorStates data from settings to package format (export).
         *
         * @param {ISettings} settingsData
         * @returns {PackageArrayWithTopLevelID}
         * @memberof CursorStatesPackageAdapter
         */
        CursorStatesPackageAdapter.prototype.settingToPackage = function (settingsData) {
            var settings = settings_1.Settings.create(settingsData);
            var seriesData = {};
            var packageStructure = {
                packages: new Array(),
                topLevelID: NaN
            };
            if (settings.type === this.settingsType) {
                var id = meta_1.Meta.createID();
                var additionalMetaInfo = [{ key: additionalMetaKeys_1.AdditionalMetaKeys.OBJECTTYPE, value: this.objectType }, { key: additionalMetaKeys_1.AdditionalMetaKeys.ID, value: id }, { key: additionalMetaKeys_1.AdditionalMetaKeys.VERSION, value: this.currentPackageVersion }];
                var seriesMeta = new meta_1.Meta(dataTypeEnum_1.DataType.OBJECT, additionalMetaInfo);
                // get cursorstates of time cursors from setting and set them to the package object
                var timeCursorPositionData = settings.getValue(settingIds_1.SettingIds.TimeCursorPositions);
                var timeCursorActiveStateData = settings.getValue(settingIds_1.SettingIds.TimeCursorActiveState);
                if (timeCursorPositionData !== undefined && timeCursorActiveStateData !== undefined) {
                    var timeCursorStateDataObject = this.buildcursorStateDataObjectArray(timeCursorPositionData, timeCursorActiveStateData);
                    seriesData[DataIds.TimeCursorStates] = new package_1.Package(new meta_1.Meta(dataTypeEnum_1.DataType.ARRAY, [{ key: additionalMetaKeys_1.AdditionalMetaKeys.ARRAYTYPE, value: this.cursorStateDataObjectType }]), timeCursorStateDataObject);
                }
                else {
                    throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, settingIds_1.SettingIds.TimeCursorPositions);
                }
                // get cursorstates of frequency cursors from setting and set them to the package object
                var frequencyCursorPositionData = settings.getValue(settingIds_1.SettingIds.FftCursorPositions);
                var frequencyCursorActiveStateData = settings.getValue(settingIds_1.SettingIds.FftCursorActiveState);
                if (frequencyCursorPositionData !== undefined && frequencyCursorActiveStateData !== undefined) {
                    var frequencyCursorStateDataObject = this.buildcursorStateDataObjectArray(frequencyCursorPositionData, frequencyCursorActiveStateData);
                    seriesData[DataIds.FrequencyCursorStates] = new package_1.Package(new meta_1.Meta(dataTypeEnum_1.DataType.ARRAY, [{ key: additionalMetaKeys_1.AdditionalMetaKeys.ARRAYTYPE, value: this.cursorStateDataObjectType }]), frequencyCursorStateDataObject);
                }
                else {
                    throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, settingIds_1.SettingIds.FftCursorPositions);
                }
                var seriesPackage = new package_1.Package(seriesMeta, seriesData);
                packageStructure.packages.push(seriesPackage);
                packageStructure.topLevelID = id;
            }
            else {
                throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.UNSUPPORTED_VERSION, this.settingsType);
            }
            return packageStructure;
        };
        return CursorStatesPackageAdapter;
    }());
    exports.CursorStatesPackageAdapter = CursorStatesPackageAdapter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29yU3RhdGVzUGFja2FnZUFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tbW9uL3N0YXRlcy9jdXJzb3JTdGF0ZXNQYWNrYWdlQWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFjQSxJQUFLLE9BS0o7SUFMRCxXQUFLLE9BQU87UUFDUixnREFBcUMsQ0FBQTtRQUNyQywwREFBK0MsQ0FBQTtRQUMvQyxnQ0FBcUIsQ0FBQTtRQUNyQiw0QkFBaUIsQ0FBQTtJQUNyQixDQUFDLEVBTEksT0FBTyxLQUFQLE9BQU8sUUFLWDtJQU1EOzs7OztPQUtHO0lBQ0g7UUFlSTs7Ozs7V0FLRztRQUNIO1lBbkJBLGtDQUFrQztZQUNqQiwwQkFBcUIsR0FBRyxDQUFDLENBQUM7WUFFM0MsaURBQWlEO1lBQ2hDLDhCQUF5QixHQUFHLGlCQUFpQixDQUFDO1lBZ0IzRCxJQUFJLENBQUMsWUFBWSxHQUFHLGNBQWMsQ0FBQztZQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLDJCQUFVLENBQUMsWUFBWSxDQUFDO1FBQzlDLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0gscURBQWdCLEdBQWhCLFVBQWlCLFdBQXFCLEVBQUUsU0FBMEI7O1lBRTlELElBQUksT0FBTyxHQUFjLElBQUksbUJBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFekQsbUJBQW1CO1lBQ25CLElBQUcsT0FBQSxXQUFXLGFBQVgsV0FBVyx1QkFBWCxXQUFXLENBQUUsSUFBSSwwQ0FBRSxRQUFRLEtBQUksdUJBQVEsQ0FBQyxNQUFNLElBQUksT0FBQSxXQUFXLGFBQVgsV0FBVyx1QkFBWCxXQUFXLENBQUUsSUFBSSwwQ0FBRyx1Q0FBa0IsQ0FBQyxVQUFVLE1BQUssSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFFeEgsY0FBTyxXQUFXLGFBQVgsV0FBVyx1QkFBWCxXQUFXLENBQUUsSUFBSSwwQ0FBRyx1Q0FBa0IsQ0FBQyxPQUFPLEdBQUU7b0JBQ25ELEtBQUssQ0FBQzt3QkFDRixPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQzt3QkFDMUQsTUFBTTtvQkFDVjt3QkFDSSxNQUFNLHVDQUFrQixDQUFDLGlCQUFpQixDQUFDLDJDQUFzQixDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtpQkFDOUc7YUFDSjtpQkFBTTtnQkFDSCxNQUFNLHVDQUFrQixDQUFDLGlCQUFpQixDQUFDLDJDQUFzQixDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTthQUN2RztZQUVELE9BQU8sT0FBTyxDQUFDO1FBRW5CLENBQUM7UUFHRDs7Ozs7Ozs7V0FRRztRQUNLLHVEQUFrQixHQUExQixVQUEyQixXQUFxQixFQUFFLFNBQTBCOztZQUN4RSxJQUFJLE9BQU8sR0FBRyxJQUFJLG1CQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRTlDLG9GQUFvRjtZQUNwRixJQUFHLG1CQUFBLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxJQUFJLDBDQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsMkNBQUcsSUFBSSwwQ0FBRSxRQUFRLEtBQUksdUJBQVEsQ0FBQyxLQUFLLElBQUksbUJBQUEsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLElBQUksMENBQUcsT0FBTyxDQUFDLGdCQUFnQiwyQ0FBRyxJQUFJLDBDQUFHLHVDQUFrQixDQUFDLFNBQVMsTUFBSyxJQUFJLENBQUMseUJBQXlCLEVBQUU7Z0JBQ3pNLElBQUkscUJBQXFCLGVBQWlDLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxJQUFJLDBDQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsMkNBQUcsSUFBSSxDQUFDO2dCQUU5RyxPQUFPLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMsbUJBQW1CLEVBQUUscUJBQXFCLENBQUMsR0FBRyxDQUFDLFVBQUMsV0FBVyxJQUFPLE9BQU8sV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9ILE9BQU8sQ0FBQyxRQUFRLENBQUMsdUJBQVUsQ0FBQyxxQkFBcUIsRUFBRSxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsVUFBQyxXQUFXLElBQU8sT0FBTyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNsSTtpQkFBTTtnQkFDSCxNQUFNLHVDQUFrQixDQUFDLGlCQUFpQixDQUFDLDJDQUFzQixDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzthQUM3RztZQUVELHlGQUF5RjtZQUN6RixJQUFHLG1CQUFBLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxJQUFJLDBDQUFHLE9BQU8sQ0FBQyxxQkFBcUIsMkNBQUcsSUFBSSwwQ0FBRSxRQUFRLEtBQUksdUJBQVEsQ0FBQyxLQUFLLElBQUksbUJBQUEsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLElBQUksMENBQUcsT0FBTyxDQUFDLHFCQUFxQiwyQ0FBRyxJQUFJLDBDQUFHLHVDQUFrQixDQUFDLFNBQVMsTUFBSyxJQUFJLENBQUMseUJBQXlCLEVBQUU7Z0JBQ25OLElBQUksb0JBQW9CLGVBQWlDLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxJQUFJLDBDQUFHLE9BQU8sQ0FBQyxxQkFBcUIsMkNBQUcsSUFBSSxDQUFDO2dCQUVsSCxPQUFPLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMsa0JBQWtCLEVBQUUsb0JBQW9CLENBQUMsR0FBRyxDQUFDLFVBQUMsV0FBVyxJQUFPLE9BQU8sV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdILE9BQU8sQ0FBQyxRQUFRLENBQUMsdUJBQVUsQ0FBQyxvQkFBb0IsRUFBRSxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsVUFBQyxXQUFXLElBQU8sT0FBTyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNoSTtpQkFBTTtnQkFDSCxNQUFNLHVDQUFrQixDQUFDLGlCQUFpQixDQUFDLDJDQUFzQixDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQzthQUNsSDtZQUVELE9BQU8sT0FBTyxDQUFDO1FBQ25CLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNLLG9FQUErQixHQUF2QyxVQUF3QyxtQkFBa0MsRUFBRSxzQkFBc0M7WUFDOUcsSUFBSSwwQkFBMEIsR0FBaUMsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUUzRSxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsbUJBQW1CLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBRXJGLElBQUkscUJBQXFCLEdBQUUsRUFBRSxDQUFDO2dCQUU5QixxQkFBcUIsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pFLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEUsMEJBQTBCLENBQUMsSUFBSSxDQUFDLHFCQUE4QyxDQUFDLENBQUM7YUFDbkY7WUFFRCxPQUFPLDBCQUEwQixDQUFDO1FBQ3RDLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSCxxREFBZ0IsR0FBaEIsVUFBaUIsWUFBdUI7WUFFcEMsSUFBSSxRQUFRLEdBQUcsbUJBQVEsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFN0MsSUFBSSxVQUFVLEdBQW9DLEVBQUUsQ0FBQztZQUVyRCxJQUFJLGdCQUFnQixHQUErQjtnQkFDOUMsUUFBUSxFQUFFLElBQUksS0FBSyxFQUFZO2dCQUMvQixVQUFVLEVBQUUsR0FBRzthQUNuQixDQUFDO1lBRUYsSUFBRyxRQUFRLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBRXBDLElBQUksRUFBRSxHQUFHLFdBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDekIsSUFBSSxrQkFBa0IsR0FBRyxDQUFDLEVBQUMsR0FBRyxFQUFFLHVDQUFrQixDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFFLHVDQUFrQixDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUUsdUNBQWtCLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMscUJBQXFCLEVBQUMsQ0FBQyxDQUFDO2dCQUN2TSxJQUFJLFVBQVUsR0FBRyxJQUFJLFdBQUksQ0FBQyx1QkFBUSxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO2dCQUUvRCxtRkFBbUY7Z0JBQ25GLElBQUksc0JBQXNCLEdBQThCLFFBQVEsQ0FBQyxRQUFRLENBQUMsdUJBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUMxRyxJQUFJLHlCQUF5QixHQUErQixRQUFRLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMscUJBQXFCLENBQUMsQ0FBQztnQkFFaEgsSUFBRyxzQkFBc0IsS0FBSyxTQUFTLElBQUkseUJBQXlCLEtBQUssU0FBUyxFQUFFO29CQUNoRixJQUFJLHlCQUF5QixHQUFHLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxzQkFBc0IsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO29CQUN4SCxVQUFVLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsSUFBSSxpQkFBTyxDQUFDLElBQUksV0FBSSxDQUFDLHVCQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBQyxHQUFHLEVBQUMsdUNBQWtCLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMseUJBQXlCLEVBQUMsQ0FBQyxDQUFDLEVBQUUseUJBQXlCLENBQUMsQ0FBQztpQkFDeEw7cUJBQU07b0JBQ0gsTUFBTSx1Q0FBa0IsQ0FBQyxpQkFBaUIsQ0FBQywyQ0FBc0IsQ0FBQyxZQUFZLEVBQUUsdUJBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2lCQUNuSDtnQkFFRCx3RkFBd0Y7Z0JBQ3hGLElBQUksMkJBQTJCLEdBQThCLFFBQVEsQ0FBQyxRQUFRLENBQUMsdUJBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUM5RyxJQUFJLDhCQUE4QixHQUErQixRQUFRLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMsb0JBQW9CLENBQUMsQ0FBQztnQkFFcEgsSUFBRywyQkFBMkIsS0FBSyxTQUFTLElBQUksOEJBQThCLEtBQUssU0FBUyxFQUFFO29CQUMxRixJQUFJLDhCQUE4QixHQUFHLElBQUksQ0FBQywrQkFBK0IsQ0FBQywyQkFBMkIsRUFBRSw4QkFBOEIsQ0FBQyxDQUFDO29CQUN2SSxVQUFVLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLEdBQUcsSUFBSSxpQkFBTyxDQUFDLElBQUksV0FBSSxDQUFDLHVCQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBQyxHQUFHLEVBQUMsdUNBQWtCLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMseUJBQXlCLEVBQUMsQ0FBQyxDQUFDLEVBQUUsOEJBQThCLENBQUMsQ0FBQztpQkFDbE07cUJBQU07b0JBQ0gsTUFBTSx1Q0FBa0IsQ0FBQyxpQkFBaUIsQ0FBQywyQ0FBc0IsQ0FBQyxZQUFZLEVBQUUsdUJBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2lCQUNsSDtnQkFHRCxJQUFJLGFBQWEsR0FBRyxJQUFJLGlCQUFPLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUV4RCxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUM5QyxnQkFBZ0IsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO2FBQ3BDO2lCQUFNO2dCQUNILE1BQU0sdUNBQWtCLENBQUMsaUJBQWlCLENBQUMsMkNBQXNCLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzdHO1lBRUQsT0FBTyxnQkFBZ0IsQ0FBQztRQUM1QixDQUFDO1FBQ0wsaUNBQUM7SUFBRCxDQUFDLEFBN0tELElBNktDO0lBRVEsZ0VBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVBhY2thZ2VBZGFwdGVyLCBQYWNrYWdlQXJyYXlXaXRoVG9wTGV2ZWxJRCB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vaW50ZXJmYWNlL3BhY2thZ2VBZGFwdGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE9iamVjdFR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2VudW0vb2JqZWN0VHlwZUVudW1cIjtcclxuaW1wb3J0IHsgRXhwb3J0Q29udGFpbmVyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9leHBvcnRDb250YWluZXJcIjtcclxuaW1wb3J0IHsgSVBhY2thZ2UgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2ludGVyZmFjZS9wYWNrYWdlSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9zZXR0aW5nc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGVyc2lzdGVuY2Uvc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgRGF0YVR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2VudW0vZGF0YVR5cGVFbnVtXCI7XHJcbmltcG9ydCB7IEFkZGl0aW9uYWxNZXRhS2V5cyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vZW51bS9hZGRpdGlvbmFsTWV0YUtleXNcIjtcclxuaW1wb3J0IHsgTWNlQ29udmVyc2lvbkVycm9yVHlwZSwgTWNlQ29udmVyc2lvbkVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9tY2VDb252ZXJzaW9uRXJyb3JcIjtcclxuaW1wb3J0IHsgTWV0YSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vbWV0YVwiO1xyXG5pbXBvcnQgeyBQYWNrYWdlIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9wYWNrYWdlXCI7XHJcbmltcG9ydCB7IFNldHRpbmdJZHMgfSBmcm9tIFwiLi9zZXR0aW5nSWRzXCI7XHJcblxyXG5cclxuZW51bSBEYXRhSWRzIHsgLy8ga2V5cyBvZiBkYXRhIGVudHJpZXMgaW4gdGhlIHBhY2thZ2UgZm9ybWF0XHJcbiAgICBUaW1lQ3Vyc29yU3RhdGVzID0gXCJ0aW1lQ3Vyc29yU3RhdGVzXCIsXHJcbiAgICBGcmVxdWVuY3lDdXJzb3JTdGF0ZXMgPSBcImZyZXF1ZW5jeUN1cnNvclN0YXRlc1wiLFxyXG4gICAgUG9zaXRpb24gPSBcInBvc2l0aW9uXCIsXHJcbiAgICBBY3RpdmUgPSBcImFjdGl2ZVwiXHJcbn1cclxudHlwZSBDdXJzb3JTdGF0ZURhdGFPYmplY3QgPSB7IC8vIHR5cGUgb2YgZGF0YSBvYmplY3QgZm9yIGN1cnNvcnN0YXRlXHJcbiAgICBwb3NpdGlvbjogbnVtYmVyLFxyXG4gICAgYWN0aXZlOiBib29sZWFuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBIYW5kbGVzIHRoZSBjb252ZXJzaW9uIG9mIEN1cnNvclN0YXRlcyBkYXRhIGJldHdlZW4gU2V0dGluZ3MgYW5kIHBhY2thZ2UgZm9ybWF0cy5cclxuICpcclxuICogQGNsYXNzIEN1cnNvclN0YXRlc1BhY2thZ2VBZGFwdGVyXHJcbiAqIEBpbXBsZW1lbnRzIHtJUGFja2FnZUFkYXB0ZXJ9XHJcbiAqL1xyXG5jbGFzcyBDdXJzb3JTdGF0ZXNQYWNrYWdlQWRhcHRlciBpbXBsZW1lbnRzIElQYWNrYWdlQWRhcHRlciB7XHJcbiAgIFxyXG4gICAgLy9uZXdlc3QgdmVyc2lvbiBvZiBwYWNrYWdlIGZvcm1hdFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjdXJyZW50UGFja2FnZVZlcnNpb24gPSAxO1xyXG5cclxuICAgIC8vQ3Vyc29yU3RhdGUgT2JqZWN0VHlwZSAobm90IGEgc2VwZXJhdGUgYWRhcHRlcilcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgY3Vyc29yU3RhdGVEYXRhT2JqZWN0VHlwZSA9IFwiY3Vyc29yc3RhdGVkYXRhXCI7XHJcblxyXG4gICAgLy9UeXBlIGlkIGlkZW50aWZ5aW5nIHRoZSB0eXBlIG9mIHNldHRpbmdcclxuICAgIHByb3RlY3RlZCBzZXR0aW5nc1R5cGU6IHN0cmluZztcclxuXHJcbiAgICAvL1R5cGUgaWQgaWRlbnRpZnlpbmcgdGhlIHR5cGUgb2YgcGFja2FnZVxyXG4gICAgcHJvdGVjdGVkIG9iamVjdFR5cGU6IE9iamVjdFR5cGU7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDdXJzb3JTdGF0ZXNQYWNrYWdlQWRhcHRlci5cclxuICAgICAqIFNldHMgc2V0dGluZ3MgYW5kIG9iamVjdCB0eXBlLlxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU3RhdGVzUGFja2FnZUFkYXB0ZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5nc1R5cGUgPSBcIkN1cnNvclN0YXRlc1wiO1xyXG4gICAgICAgIHRoaXMub2JqZWN0VHlwZSA9IE9iamVjdFR5cGUuQ1VSU09SU1RBVEVTO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydHMgQ3Vyc29yU3RhdGVzIGRhdGEgZnJvbSBwYWNrYWdlIHRvIFNldHRpbmdzIGZvcm1hdCAoaW1wb3J0KS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lQYWNrYWdlfSBwYWNrYWdlRGF0YVxyXG4gICAgICogQHBhcmFtIHtFeHBvcnRDb250YWluZXJ9IGNvbnRhaW5lclxyXG4gICAgICogQHJldHVybnMge0lTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTdGF0ZXNQYWNrYWdlQWRhcHRlclxyXG4gICAgICovXHJcbiAgICBwYWNrYWdlVG9TZXR0aW5nKHBhY2thZ2VEYXRhOiBJUGFja2FnZSwgY29udGFpbmVyOiBFeHBvcnRDb250YWluZXIpOiBJU2V0dGluZ3Mge1xyXG5cclxuICAgICAgICBsZXQgc2V0dGluZzogSVNldHRpbmdzID0gbmV3IFNldHRpbmdzKHRoaXMuc2V0dGluZ3NUeXBlKTtcclxuXHJcbiAgICAgICAgLy92ZXJzaW9uIHNlbGVjdGlvblxyXG4gICAgICAgIGlmKHBhY2thZ2VEYXRhPy5tZXRhPy5kYXRhVHlwZSA9PSBEYXRhVHlwZS5PQkpFQ1QgJiYgcGFja2FnZURhdGE/Lm1ldGE/LltBZGRpdGlvbmFsTWV0YUtleXMuT0JKRUNUVFlQRV0gPT0gdGhpcy5vYmplY3RUeXBlKSB7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHN3aXRjaChwYWNrYWdlRGF0YT8ubWV0YT8uW0FkZGl0aW9uYWxNZXRhS2V5cy5WRVJTSU9OXSl7IFxyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmcgPSB0aGlzLnBhY2thZ2VWMVRvU2V0dGluZyhwYWNrYWdlRGF0YSwgY29udGFpbmVyKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgTWNlQ29udmVyc2lvbkVycm9yLmNyZWF0ZUVycm9yQnlUeXBlKE1jZUNvbnZlcnNpb25FcnJvclR5cGUuVU5TVVBQT1JURURfVkVSU0lPTiwgdGhpcy5vYmplY3RUeXBlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgTWNlQ29udmVyc2lvbkVycm9yLmNyZWF0ZUVycm9yQnlUeXBlKE1jZUNvbnZlcnNpb25FcnJvclR5cGUuVU5TVVBQT1JURURfVFlQRSwgdGhpcy5vYmplY3RUeXBlKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNldHRpbmc7XHJcbiAgICBcclxuICAgIH0gICAgXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydHMgQ3Vyc29yU3RhdGVzIGRhdGEgZnJvbSBwYWNrYWdlIGZvcm1hdCBpbiB2ZXJzaW9uIDEgdG8gc2V0dGluZ3MgZm9ybWF0IChpbXBvcnQpLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lQYWNrYWdlfSBwYWNrYWdlRGF0YVxyXG4gICAgICogQHBhcmFtIHtFeHBvcnRDb250YWluZXJ9IGNvbnRhaW5lclxyXG4gICAgICogQHJldHVybnMge0lTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTdGF0ZXNQYWNrYWdlQWRhcHRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHBhY2thZ2VWMVRvU2V0dGluZyhwYWNrYWdlRGF0YTogSVBhY2thZ2UsIGNvbnRhaW5lcjogRXhwb3J0Q29udGFpbmVyKTogSVNldHRpbmdzIHtcclxuICAgICAgICBsZXQgc2V0dGluZyA9IG5ldyBTZXR0aW5ncyh0aGlzLnNldHRpbmdzVHlwZSk7XHJcblxyXG4gICAgICAgIC8vIGdldCBjdXJzb3JzdGF0ZXMgb2YgdGltZSBjdXJzb3JzIGZyb20gcGFja2FnZSBhbmQgc2V0IHRoZW0gdG8gdGhlIHNldHRpbmdzIG9iamVjdFxyXG4gICAgICAgIGlmKHBhY2thZ2VEYXRhPy5kYXRhPy5bRGF0YUlkcy5UaW1lQ3Vyc29yU3RhdGVzXT8ubWV0YT8uZGF0YVR5cGUgPT0gRGF0YVR5cGUuQVJSQVkgJiYgcGFja2FnZURhdGE/LmRhdGE/LltEYXRhSWRzLlRpbWVDdXJzb3JTdGF0ZXNdPy5tZXRhPy5bQWRkaXRpb25hbE1ldGFLZXlzLkFSUkFZVFlQRV0gPT0gdGhpcy5jdXJzb3JTdGF0ZURhdGFPYmplY3RUeXBlKSB7XHJcbiAgICAgICAgICAgIGxldCB0aW1lQ3Vyc29yU3RhdGVzQXJyYXk6IEFycmF5PEN1cnNvclN0YXRlRGF0YU9iamVjdD4gPSBwYWNrYWdlRGF0YT8uZGF0YT8uW0RhdGFJZHMuVGltZUN1cnNvclN0YXRlc10/LmRhdGE7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzZXR0aW5nLnNldFZhbHVlKFNldHRpbmdJZHMuVGltZUN1cnNvclBvc2l0aW9ucywgdGltZUN1cnNvclN0YXRlc0FycmF5Lm1hcCgoY3Vyc29yU3RhdGUpID0+IHsgcmV0dXJuIGN1cnNvclN0YXRlLnBvc2l0aW9uOyB9KSk7XHJcbiAgICAgICAgICAgIHNldHRpbmcuc2V0VmFsdWUoU2V0dGluZ0lkcy5UaW1lQ3Vyc29yQWN0aXZlU3RhdGUsIHRpbWVDdXJzb3JTdGF0ZXNBcnJheS5tYXAoKGN1cnNvclN0YXRlKSA9PiB7IHJldHVybiBjdXJzb3JTdGF0ZS5hY3RpdmU7IH0pKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBNY2VDb252ZXJzaW9uRXJyb3IuY3JlYXRlRXJyb3JCeVR5cGUoTWNlQ29udmVyc2lvbkVycm9yVHlwZS5NSVNTSU5HX0RBVEEsIERhdGFJZHMuVGltZUN1cnNvclN0YXRlcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBnZXQgY3Vyc29yc3RhdGVzIG9mIGZyZXF1ZW5jeSBjdXJzb3JzIGZyb20gcGFja2FnZSBhbmQgc2V0IHRoZW0gdG8gdGhlIHNldHRpbmdzIG9iamVjdFxyXG4gICAgICAgIGlmKHBhY2thZ2VEYXRhPy5kYXRhPy5bRGF0YUlkcy5GcmVxdWVuY3lDdXJzb3JTdGF0ZXNdPy5tZXRhPy5kYXRhVHlwZSA9PSBEYXRhVHlwZS5BUlJBWSAmJiBwYWNrYWdlRGF0YT8uZGF0YT8uW0RhdGFJZHMuRnJlcXVlbmN5Q3Vyc29yU3RhdGVzXT8ubWV0YT8uW0FkZGl0aW9uYWxNZXRhS2V5cy5BUlJBWVRZUEVdID09IHRoaXMuY3Vyc29yU3RhdGVEYXRhT2JqZWN0VHlwZSkge1xyXG4gICAgICAgICAgICBsZXQgZmZ0Q3Vyc29yU3RhdGVzQXJyYXk6IEFycmF5PEN1cnNvclN0YXRlRGF0YU9iamVjdD4gPSBwYWNrYWdlRGF0YT8uZGF0YT8uW0RhdGFJZHMuRnJlcXVlbmN5Q3Vyc29yU3RhdGVzXT8uZGF0YTtcclxuXHJcbiAgICAgICAgICAgIHNldHRpbmcuc2V0VmFsdWUoU2V0dGluZ0lkcy5GZnRDdXJzb3JQb3NpdGlvbnMsIGZmdEN1cnNvclN0YXRlc0FycmF5Lm1hcCgoY3Vyc29yU3RhdGUpID0+IHsgcmV0dXJuIGN1cnNvclN0YXRlLnBvc2l0aW9uOyB9KSk7XHJcbiAgICAgICAgICAgIHNldHRpbmcuc2V0VmFsdWUoU2V0dGluZ0lkcy5GZnRDdXJzb3JBY3RpdmVTdGF0ZSwgZmZ0Q3Vyc29yU3RhdGVzQXJyYXkubWFwKChjdXJzb3JTdGF0ZSkgPT4geyByZXR1cm4gY3Vyc29yU3RhdGUuYWN0aXZlOyB9KSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgTWNlQ29udmVyc2lvbkVycm9yLmNyZWF0ZUVycm9yQnlUeXBlKE1jZUNvbnZlcnNpb25FcnJvclR5cGUuTUlTU0lOR19EQVRBLCBEYXRhSWRzLkZyZXF1ZW5jeUN1cnNvclN0YXRlcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2V0dGluZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1lcmdlcyBhcnJheXMgY29udGFpbmluZyBDdXJzb3JQb3NpdGlvbiBhbmQgQ3Vyc29yQWN0aXZhdGVTdGF0ZSBpbnRvIG9uZS5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBjdXJzb3JQb3NpdGlvbkFycmF5XHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PGJvb2xlYW4+fSBjdXJzb3JBY3RpdmVTdGF0ZUFycmF5XHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8Q3Vyc29yU3RhdGVEYXRhT2JqZWN0Pn1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTdGF0ZXNQYWNrYWdlQWRhcHRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGJ1aWxkY3Vyc29yU3RhdGVEYXRhT2JqZWN0QXJyYXkoY3Vyc29yUG9zaXRpb25BcnJheTogQXJyYXk8bnVtYmVyPiwgY3Vyc29yQWN0aXZlU3RhdGVBcnJheTogQXJyYXk8Ym9vbGVhbj4pOiBBcnJheTxDdXJzb3JTdGF0ZURhdGFPYmplY3Q+IHtcclxuICAgICAgICBsZXQgY3Vyc29yU3RhdGVEYXRhT2JqZWN0QXJyYXk6IEFycmF5PEN1cnNvclN0YXRlRGF0YU9iamVjdD4gPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICBcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgY3Vyc29yUG9zaXRpb25BcnJheS5sZW5ndGggJiYgaSA8IGN1cnNvckFjdGl2ZVN0YXRlQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBjdXJzb3JTdGF0ZURhdGFPYmplY3Q9IHt9O1xyXG5cclxuICAgICAgICAgICAgY3Vyc29yU3RhdGVEYXRhT2JqZWN0W0RhdGFJZHMuUG9zaXRpb25dID0gY3Vyc29yUG9zaXRpb25BcnJheVtpXTtcclxuICAgICAgICAgICAgY3Vyc29yU3RhdGVEYXRhT2JqZWN0W0RhdGFJZHMuQWN0aXZlXSA9IGN1cnNvckFjdGl2ZVN0YXRlQXJyYXlbaV07XHJcbiAgICAgICAgICAgIGN1cnNvclN0YXRlRGF0YU9iamVjdEFycmF5LnB1c2goY3Vyc29yU3RhdGVEYXRhT2JqZWN0IGFzIEN1cnNvclN0YXRlRGF0YU9iamVjdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY3Vyc29yU3RhdGVEYXRhT2JqZWN0QXJyYXk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0cyBDdXJzb3JTdGF0ZXMgZGF0YSBmcm9tIHNldHRpbmdzIHRvIHBhY2thZ2UgZm9ybWF0IChleHBvcnQpLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVNldHRpbmdzfSBzZXR0aW5nc0RhdGFcclxuICAgICAqIEByZXR1cm5zIHtQYWNrYWdlQXJyYXlXaXRoVG9wTGV2ZWxJRH1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTdGF0ZXNQYWNrYWdlQWRhcHRlclxyXG4gICAgICovXHJcbiAgICBzZXR0aW5nVG9QYWNrYWdlKHNldHRpbmdzRGF0YTogSVNldHRpbmdzKTogUGFja2FnZUFycmF5V2l0aFRvcExldmVsSUQge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBzZXR0aW5ncyA9IFNldHRpbmdzLmNyZWF0ZShzZXR0aW5nc0RhdGEpO1xyXG5cclxuICAgICAgICBsZXQgc2VyaWVzRGF0YTogeyBbaW5kZXg6IHN0cmluZ106ICBJUGFja2FnZSB9ICA9IHt9O1xyXG5cclxuICAgICAgICBsZXQgcGFja2FnZVN0cnVjdHVyZTogUGFja2FnZUFycmF5V2l0aFRvcExldmVsSUQgPSB7XHJcbiAgICAgICAgICAgICBwYWNrYWdlczogbmV3IEFycmF5PElQYWNrYWdlPigpLFxyXG4gICAgICAgICAgICAgdG9wTGV2ZWxJRDogTmFOXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYoc2V0dGluZ3MudHlwZSA9PT0gdGhpcy5zZXR0aW5nc1R5cGUpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBpZCA9IE1ldGEuY3JlYXRlSUQoKTtcclxuICAgICAgICAgICAgbGV0IGFkZGl0aW9uYWxNZXRhSW5mbyA9IFt7a2V5OiBBZGRpdGlvbmFsTWV0YUtleXMuT0JKRUNUVFlQRSwgdmFsdWU6IHRoaXMub2JqZWN0VHlwZX0sIHtrZXk6IEFkZGl0aW9uYWxNZXRhS2V5cy5JRCwgdmFsdWU6IGlkfSwge2tleTogQWRkaXRpb25hbE1ldGFLZXlzLlZFUlNJT04sIHZhbHVlOiB0aGlzLmN1cnJlbnRQYWNrYWdlVmVyc2lvbn1dO1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVzTWV0YSA9IG5ldyBNZXRhKERhdGFUeXBlLk9CSkVDVCwgYWRkaXRpb25hbE1ldGFJbmZvKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGdldCBjdXJzb3JzdGF0ZXMgb2YgdGltZSBjdXJzb3JzIGZyb20gc2V0dGluZyBhbmQgc2V0IHRoZW0gdG8gdGhlIHBhY2thZ2Ugb2JqZWN0XHJcbiAgICAgICAgICAgIGxldCB0aW1lQ3Vyc29yUG9zaXRpb25EYXRhOiBBcnJheTxudW1iZXI+IHwgdW5kZWZpbmVkID0gc2V0dGluZ3MuZ2V0VmFsdWUoU2V0dGluZ0lkcy5UaW1lQ3Vyc29yUG9zaXRpb25zKTtcclxuICAgICAgICAgICAgbGV0IHRpbWVDdXJzb3JBY3RpdmVTdGF0ZURhdGE6IEFycmF5PGJvb2xlYW4+IHwgdW5kZWZpbmVkID0gc2V0dGluZ3MuZ2V0VmFsdWUoU2V0dGluZ0lkcy5UaW1lQ3Vyc29yQWN0aXZlU3RhdGUpO1xyXG5cclxuICAgICAgICAgICAgaWYodGltZUN1cnNvclBvc2l0aW9uRGF0YSAhPT0gdW5kZWZpbmVkICYmIHRpbWVDdXJzb3JBY3RpdmVTdGF0ZURhdGEgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRpbWVDdXJzb3JTdGF0ZURhdGFPYmplY3QgPSB0aGlzLmJ1aWxkY3Vyc29yU3RhdGVEYXRhT2JqZWN0QXJyYXkodGltZUN1cnNvclBvc2l0aW9uRGF0YSwgdGltZUN1cnNvckFjdGl2ZVN0YXRlRGF0YSk7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXNEYXRhW0RhdGFJZHMuVGltZUN1cnNvclN0YXRlc10gPSBuZXcgUGFja2FnZShuZXcgTWV0YShEYXRhVHlwZS5BUlJBWSwgW3trZXk6QWRkaXRpb25hbE1ldGFLZXlzLkFSUkFZVFlQRSwgdmFsdWU6IHRoaXMuY3Vyc29yU3RhdGVEYXRhT2JqZWN0VHlwZX1dKSwgdGltZUN1cnNvclN0YXRlRGF0YU9iamVjdCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBNY2VDb252ZXJzaW9uRXJyb3IuY3JlYXRlRXJyb3JCeVR5cGUoTWNlQ29udmVyc2lvbkVycm9yVHlwZS5NSVNTSU5HX0RBVEEsIFNldHRpbmdJZHMuVGltZUN1cnNvclBvc2l0aW9ucyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGdldCBjdXJzb3JzdGF0ZXMgb2YgZnJlcXVlbmN5IGN1cnNvcnMgZnJvbSBzZXR0aW5nIGFuZCBzZXQgdGhlbSB0byB0aGUgcGFja2FnZSBvYmplY3RcclxuICAgICAgICAgICAgbGV0IGZyZXF1ZW5jeUN1cnNvclBvc2l0aW9uRGF0YTogQXJyYXk8bnVtYmVyPiB8IHVuZGVmaW5lZCA9IHNldHRpbmdzLmdldFZhbHVlKFNldHRpbmdJZHMuRmZ0Q3Vyc29yUG9zaXRpb25zKTtcclxuICAgICAgICAgICAgbGV0IGZyZXF1ZW5jeUN1cnNvckFjdGl2ZVN0YXRlRGF0YTogQXJyYXk8Ym9vbGVhbj4gfCB1bmRlZmluZWQgPSBzZXR0aW5ncy5nZXRWYWx1ZShTZXR0aW5nSWRzLkZmdEN1cnNvckFjdGl2ZVN0YXRlKTtcclxuXHJcbiAgICAgICAgICAgIGlmKGZyZXF1ZW5jeUN1cnNvclBvc2l0aW9uRGF0YSAhPT0gdW5kZWZpbmVkICYmIGZyZXF1ZW5jeUN1cnNvckFjdGl2ZVN0YXRlRGF0YSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZnJlcXVlbmN5Q3Vyc29yU3RhdGVEYXRhT2JqZWN0ID0gdGhpcy5idWlsZGN1cnNvclN0YXRlRGF0YU9iamVjdEFycmF5KGZyZXF1ZW5jeUN1cnNvclBvc2l0aW9uRGF0YSwgZnJlcXVlbmN5Q3Vyc29yQWN0aXZlU3RhdGVEYXRhKTtcclxuICAgICAgICAgICAgICAgIHNlcmllc0RhdGFbRGF0YUlkcy5GcmVxdWVuY3lDdXJzb3JTdGF0ZXNdID0gbmV3IFBhY2thZ2UobmV3IE1ldGEoRGF0YVR5cGUuQVJSQVksIFt7a2V5OkFkZGl0aW9uYWxNZXRhS2V5cy5BUlJBWVRZUEUsIHZhbHVlOiB0aGlzLmN1cnNvclN0YXRlRGF0YU9iamVjdFR5cGV9XSksIGZyZXF1ZW5jeUN1cnNvclN0YXRlRGF0YU9iamVjdCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBNY2VDb252ZXJzaW9uRXJyb3IuY3JlYXRlRXJyb3JCeVR5cGUoTWNlQ29udmVyc2lvbkVycm9yVHlwZS5NSVNTSU5HX0RBVEEsIFNldHRpbmdJZHMuRmZ0Q3Vyc29yUG9zaXRpb25zKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCBzZXJpZXNQYWNrYWdlID0gbmV3IFBhY2thZ2Uoc2VyaWVzTWV0YSwgc2VyaWVzRGF0YSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBwYWNrYWdlU3RydWN0dXJlLnBhY2thZ2VzLnB1c2goc2VyaWVzUGFja2FnZSk7XHJcbiAgICAgICAgICAgIHBhY2thZ2VTdHJ1Y3R1cmUudG9wTGV2ZWxJRCA9IGlkO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IE1jZUNvbnZlcnNpb25FcnJvci5jcmVhdGVFcnJvckJ5VHlwZShNY2VDb252ZXJzaW9uRXJyb3JUeXBlLlVOU1VQUE9SVEVEX1ZFUlNJT04sIHRoaXMuc2V0dGluZ3NUeXBlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBwYWNrYWdlU3RydWN0dXJlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBDdXJzb3JTdGF0ZXNQYWNrYWdlQWRhcHRlciB9Il19