var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "../../communication/rest/opcUaRestServices", "../online/mappCockpitComponent", "../online/mappCockpitComponentMetaData", "../online/mappCockpitComponentReflection"], function (require, exports, opcUaRestServices_1, mappCockpitComponent_1, mappCockpitComponentMetaData_1, mappCockpitComponentReflection_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MappCockpitCommonInfoProvider = /** @class */ (function () {
        /**
         * creates an instance of MappCockpitCommonInfoProvider.
         * @memberof MappCockpitCommonInfoProvider
         */
        function MappCockpitCommonInfoProvider() {
            // holds the currently acive session id
            this._sessionId = -1;
            // holds the mapp cockpit nmespace index
            this._namespaceIndex = -1;
            // holds enum type definitions
            this._enumTypeDefinitions = [];
        }
        /**
         * gets a singleton instance of MappCockpitCommonInfoProvider
         *
         * @readonly
         * @type {MappCockpitCommonInfoProvider}
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.getInstance = function () {
            this._instance = this._instance ? this._instance : new MappCockpitCommonInfoProvider();
            return this._instance;
        };
        /**
         * initializes the info provider and populates it with commonly needed data
         *
         * @param {number} sessionId
         * @param {number} namespaceIndex
         * @returns {*}
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.prototype.initialize = function (sessionId, namespaceIndex) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this._sessionId = sessionId;
                            this._namespaceIndex = namespaceIndex;
                            // browse available enum type definitions
                            return [4 /*yield*/, this.readEnumTypeDefinitions()];
                        case 1:
                            // browse available enum type definitions
                            _a.sent();
                            console.log("MappCockpitCommonInfoProvider.readEnumTypeDefinitions %o", this._enumTypeDefinitions);
                            return [2 /*return*/];
                    }
                });
            });
        };
        MappCockpitCommonInfoProvider.prototype.readComponentMetaInfo = function (component) {
            return __awaiter(this, void 0, void 0, function () {
                var componentMetaReferences, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.browseNodeMetaInfo(this._sessionId, component.id)];
                        case 1:
                            componentMetaReferences = _a.sent();
                            if (componentMetaReferences) {
                                component.metaData = this.parseComponentMetaData(componentMetaReferences);
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Parses the components meta data
         *
         * @private
         * @param {InterfaceOpcUaRestResultNodeReference[]} metaInfoReferences
         * @returns
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.prototype.parseComponentMetaData = function (metaInfoReferences) {
            var metaData = {};
            try {
                metaInfoReferences.forEach(function (metaInfoReference) {
                    metaData[metaInfoReference.browseName] = JSON.parse(metaInfoReference.value);
                });
            }
            catch (e) {
                throw new Error("MappCockpitComponentDataModel.browseMetaData: could not parse meta data: " + e.message);
            }
            return metaData;
        };
        /**
         * Initializes the meta dat with specific sections
         *
         * @static
         * @param {MappCockpitComponentMetaData} metaData
         * @returns {*}
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.initializeMetaData = function (metaData) {
            // create and populate the parameters group
            metaData["Parameters"] = {};
            metaData["Parameters"]["Watchable"] = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.readParameters(metaData, ["Watchable"]);
            metaData["Parameters"]["Message"] = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.readMessageParameters(metaData);
            metaData["Parameters"]["Configuration"] = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.readParameters(metaData, ["Parameter", "Group"]);
            metaData["Parameters"]["WatchableState"] = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.readParameters(metaData, ["WatchableState"]);
            // create and populate the methods group
            metaData["Methods"] = {};
            metaData["Methods"]["Executable"] = mappCockpitComponentReflection_1.MappCockpitComponentMethodInfo.readMethods(metaData, ["MetaConfigCommands", "CommandsStructure"], ["Command"]);
            metaData["Methods"]["QuickCommand"] = mappCockpitComponentReflection_1.MappCockpitComponentMethodInfo.readMethods(metaData, ["MetaConfigQuickCommands", "QuickCommandsStructure"], ["QuickMethod"]);
        };
        Object.defineProperty(MappCockpitCommonInfoProvider.prototype, "enumTypeDefinitions", {
            /**
             * gets the available enum type definitions
             *
             * @readonly
             * @type {Array<MappCockpitComponentParameterEnum>}
             * @memberof MappCockpitCommonInfoProvider
             */
            get: function () {
                return this._enumTypeDefinitions;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * reads and updates enum type definitions
         *
         * @private
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.prototype.readEnumTypeDefinitions = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this;
                            return [4 /*yield*/, this.browseEnumTypeDefinitions(this._sessionId, this._namespaceIndex)];
                        case 1:
                            _a._enumTypeDefinitions = _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * reads enum definitions
         *
         * @private
         * @returns
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.prototype.browseEnumTypeDefinitions = function (sessionId, namespaceIndex) {
            return __awaiter(this, void 0, void 0, function () {
                var enums, allOpcUaEnums, opcUaEnums, readEnudDefinitionsRequests, i, opcUaEnum, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            enums = [];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.browseNodes(sessionId, opcUaRestServices_1.OpcUaRestServices.mappCockpitEnumsId)];
                        case 2:
                            allOpcUaEnums = _a.sent();
                            opcUaEnums = allOpcUaEnums.filter(function (opcUaEnum) {
                                return opcUaEnum.nodeId.indexOf(opcUaRestServices_1.OpcUaRestServices.mappCockpitNamespacePrefix + namespaceIndex) > -1;
                            });
                            readEnudDefinitionsRequests = [];
                            // collect enum def read requests
                            for (i = 0; i < opcUaEnums.length; i++) {
                                opcUaEnum = opcUaEnums[i];
                                // read the enum values as json
                                readEnudDefinitionsRequests.push(this.browseEnumValuesJson(sessionId, opcUaEnum));
                                // read the enum values as model reference
                                readEnudDefinitionsRequests.push(this.browseEnumValues(sessionId, opcUaEnum));
                            }
                            return [4 /*yield*/, Promise.all(readEnudDefinitionsRequests)];
                        case 3:
                            _a.sent();
                            enums = opcUaEnums.map(function (opcUaEnumsRef) { return new mappCockpitComponent_1.MappCockpitComponentParameterEnum(opcUaEnumsRef); });
                            return [3 /*break*/, 5];
                        case 4:
                            error_2 = _a.sent();
                            throw error_2;
                        case 5: return [2 /*return*/, enums];
                    }
                });
            });
        };
        /**
         * reads enum definitions for parameters
         *
         * @param {*} metaInfo
         * @returns an object with enum definitions with the parameter name as key
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.prototype.readEnumParameterDefinitions = function (componentParameters, metaInfo) {
            var enumParameters = {};
            // get the target model enum types
            var opcUaEnumTypes = MappCockpitCommonInfoProvider.getInstance().enumTypeDefinitions;
            // get the meta parameter infos
            var metaParameterInfo = MappCockpitCommonInfoProvider.readEnumMetaInfo(metaInfo);
            if (metaParameterInfo != undefined) {
                // get possible enum type meta items
                enumParameters = this.readEnumDefinitionsFromMetaInfo(metaParameterInfo, opcUaEnumTypes);
            }
            else {
                // without meta info we try to use the target model definitions.
                enumParameters = this.readEnumDefinitionFromTargetModel(componentParameters, opcUaEnumTypes);
            }
            return enumParameters;
        };
        /**
         * Reads the enum parameter meta info
         *
         * @private
         * @param {*} metaInfo
         * @returns
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.readEnumMetaInfo = function (metaInfo) {
            var metaParameterInfo;
            if (metaInfo) {
                // If no MetaConfigConfigProps are available only use watchables
                if (metaInfo.MetaConfigConfigProps != undefined) {
                    metaParameterInfo = metaInfo.MetaConfigConfigProps.ConfigurationStructure.Childs;
                    metaParameterInfo = metaParameterInfo.concat(metaInfo.MetaConfigWatchables.WatchablesStructure.Childs);
                }
                else {
                    if (metaInfo.MetaConfigWatchables != undefined) {
                        metaParameterInfo = metaInfo.MetaConfigWatchables.WatchablesStructure.Childs;
                    }
                }
            }
            return metaParameterInfo;
        };
        /**
         * Reads the available enum type definitions from the meta info
         *
         * @private
         * @param {*} metaParameterInfo
         * @param {MappCockpitComponentParameterEnum[]} opcUaEnumTypes
         * @returns {*}
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.prototype.readEnumDefinitionsFromMetaInfo = function (metaParameterInfo, opcUaEnumTypes) {
            var enumParameters = {};
            var metaParameterUsingEnums = MappCockpitCommonInfoProvider.readEnumMetaDefinitions(metaParameterInfo);
            metaParameterUsingEnums.forEach(function (enumParameterMetaItem) {
                var enumTypeRef = enumParameterMetaItem.TypeDef.EnumTypeRef;
                var matchingOpcUaEnumTypes = opcUaEnumTypes.filter(function (opcUaEnumType) { return opcUaEnumType.browseName === enumTypeRef; });
                if (matchingOpcUaEnumTypes.length === 1) {
                    // save the matching enum type info for the parameter name
                    enumParameters[enumParameterMetaItem.Ref] = matchingOpcUaEnumTypes[0];
                }
                else {
                    console.error("MappCockpitComponentParameterInfo - No enum type found for %o %o", enumTypeRef, enumParameterMetaItem);
                }
            });
            return enumParameters;
        };
        /**
         * Reads the enum definitions contained in the meta data
         *
         * @static
         * @param {*} metaParameterInfo
         * @returns
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.readEnumMetaDefinitions = function (metaParameterInfo) {
            var typeDefinitions = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(metaParameterInfo, ["Parameter", "Watchable", "Group"], function (metaItemGroupOrParameter) { return metaItemGroupOrParameter.hasOwnProperty("TypeDef"); });
            var enumTypeDefinitions = typeDefinitions.filter(function (typeDefinition) { return typeDefinition.TypeDef.hasOwnProperty("EnumTypeRef"); });
            return enumTypeDefinitions;
        };
        /**
         * reads the available enum type defintions from the target model
         *
         * @private
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @param {MappCockpitComponentParameterEnum[]} opcUaEnumTypes
         * @returns {*}
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.prototype.readEnumDefinitionFromTargetModel = function (componentParameters, opcUaEnumTypes) {
            var enumParameters = {};
            componentParameters.forEach(function (componentParameter) {
                var matchingOpcUaEnumTypes = opcUaEnumTypes.filter(function (opcUaEnumType) { return opcUaEnumType.browseName === componentParameter.dataType.name; });
                if (matchingOpcUaEnumTypes.length === 1) {
                    enumParameters[componentParameter.browseName] = matchingOpcUaEnumTypes[0];
                }
            });
            return enumParameters;
        };
        /**
         * reads enum type definitions for method parameters
         *
         * @param {MappCockpitComponentMethod} method
         * @param {*} metaInfo
         * @returns
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.prototype.readMetaEnumMethodParameterDefinitions = function (method, metaInfo) {
            var enumParameters = {};
            var opcUaEnumTypes = MappCockpitCommonInfoProvider.getInstance().enumTypeDefinitions;
            if (metaInfo == undefined)
                return enumParameters;
            // get the meta parameter infos
            if (metaInfo.MetaConfigCommands == undefined)
                return enumParameters;
            var metaMethodParameterInfo = metaInfo.MetaConfigCommands.CommandsStructure.Childs;
            if (metaMethodParameterInfo) {
                // get the command meta info
                var metaCommandInfo = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(metaMethodParameterInfo, ["Command"], function (command) { return command.Ref === method.browseName; });
                // get the commands parameter info
                var metaParameterUsingEnums = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(metaCommandInfo, ["Parameter"], function (metaItemGroupOrParameter) { return metaItemGroupOrParameter.hasOwnProperty("TypeDef"); });
                var _loop_1 = function (i) {
                    var enumParameterMetaItem = metaParameterUsingEnums[i];
                    var enumTypeRef = enumParameterMetaItem.TypeDef.EnumTypeRef;
                    var matchingOpcUaEnumTypes = opcUaEnumTypes.filter(function (opcUaEnumType) { return opcUaEnumType.browseName === enumTypeRef; });
                    if (matchingOpcUaEnumTypes.length > 0) {
                        // save the matching enum type info for the parameter name
                        enumParameters[enumParameterMetaItem.Ref] = matchingOpcUaEnumTypes[0];
                    }
                    else {
                        console.error("MappCockpitMethodParameterInfo - No enum type found for %o %o", enumTypeRef, enumParameterMetaItem);
                    }
                };
                // find and collect matching opcua enum type refs
                for (var i = 0; i < metaParameterUsingEnums.length; i++) {
                    _loop_1(i);
                }
            }
            return enumParameters;
        };
        /**
         * browses the enum values a sjson (for older targets)
         *
         * @private
         * @static
         * @param {number} sessionId
         * @param {*} opcUaEnum
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.prototype.browseEnumValuesJson = function (sessionId, opcUaEnum) {
            return __awaiter(this, void 0, void 0, function () {
                var enumValuesJsonString, enumValuesJson, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.readNodeAttribute(sessionId, opcUaEnum.nodeId, opcUaRestServices_1.OpcUaAttribute.DESCRIPTION)];
                        case 1:
                            enumValuesJsonString = _a.sent();
                            enumValuesJson = JSON.parse(enumValuesJsonString).enumValues.map(function (enumValueItem) { return { displayName: { locale: "", text: enumValueItem.text }, value: enumValueItem.value }; });
                            opcUaEnum.enumValuesJson = enumValuesJson;
                            return [3 /*break*/, 3];
                        case 2:
                            error_3 = _a.sent();
                            throw error_3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * browses the opc ua enum node for its value definitions
         *
         * @private
         * @static
         * @param {number} sessionId
         * @param {*} opcUaEnum
         * @returns
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.prototype.browseEnumValues = function (sessionId, opcUaEnum) {
            return __awaiter(this, void 0, void 0, function () {
                var enumValuesRef, enumValuesNodes, enumValues, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            enumValuesRef = undefined;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 5, , 6]);
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.browseNodes(sessionId, opcUaEnum.nodeId)];
                        case 2:
                            enumValuesNodes = _a.sent();
                            if (!enumValuesNodes) return [3 /*break*/, 4];
                            enumValues = enumValuesNodes.filter(function (enumValuesNode) { return enumValuesNode.browseName === "EnumValues" || enumValuesNode.browseName === "EnumStrings"; });
                            if (!(enumValues && enumValues.length > 0)) return [3 /*break*/, 4];
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.readNodeAttribute(sessionId, enumValues[0].nodeId, opcUaRestServices_1.OpcUaAttribute.VALUE)];
                        case 3:
                            enumValuesRef = _a.sent();
                            _a.label = 4;
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            error_4 = _a.sent();
                            throw error_4;
                        case 6:
                            opcUaEnum.enumValues = enumValuesRef;
                            return [2 /*return*/];
                    }
                });
            });
        };
        return MappCockpitCommonInfoProvider;
    }());
    exports.MappCockpitCommonInfoProvider = MappCockpitCommonInfoProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9kaWFnbm9zdGljcy9tYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFPQTtRQWVJOzs7V0FHRztRQUNIO1lBakJBLHVDQUF1QztZQUMvQixlQUFVLEdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDaEMsd0NBQXdDO1lBQ2hDLG9CQUFlLEdBQVcsQ0FBQyxDQUFDLENBQUM7WUFFckMsOEJBQThCO1lBQ3RCLHlCQUFvQixHQUFVLEVBQUUsQ0FBQztRQWF6QyxDQUFDO1FBR0Q7Ozs7OztXQU1HO1FBQ1cseUNBQVcsR0FBekI7WUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksNkJBQTZCLEVBQUUsQ0FBQztZQUN2RixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQztRQUdEOzs7Ozs7O1dBT0c7UUFDRyxrREFBVSxHQUFoQixVQUFpQixTQUFpQixFQUFFLGNBQXNCOzs7Ozs0QkFFdEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7NEJBQzVCLElBQUksQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDOzRCQUd0Qyx5Q0FBeUM7NEJBQ3pDLHFCQUFNLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxFQUFBOzs0QkFEcEMseUNBQXlDOzRCQUN6QyxTQUFvQyxDQUFDOzRCQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLDBEQUEwRCxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDOzs7OztTQUd0RztRQUdLLDZEQUFxQixHQUEzQixVQUE0QixTQUErQjs7Ozs7Ozs0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QUMsQ0FBQSxFQUFuQyx3QkFBbUM7NEJBQ25CLHFCQUFNLHFDQUFpQixDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLGtDQUFjLENBQUMsS0FBSyxDQUFDLEVBQUE7OzRCQUFoSCxhQUFhLEdBQUcsU0FBZ0csQ0FBQzs7Ozs7NEJBSXpILE1BQU0sT0FBSyxDQUFDOzs0QkFFaEIsU0FBUyxDQUFDLFVBQVUsR0FBRyxhQUFhLENBQUM7Ozs7O1NBQ3hDO1FBQ0wsb0NBQUM7SUFBRCxDQUFDLEFBL1hELElBK1hDO0lBR1Esc0VBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3BjVWFSZXN0U2VydmljZXMsIE9wY1VhQXR0cmlidXRlIH0gZnJvbSBcIi4uLy4uL2NvbW11bmljYXRpb24vcmVzdC9vcGNVYVJlc3RTZXJ2aWNlc1wiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW0sIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLCBNYXBwQ29ja3BpdENvbXBvbmVudCwgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIgfSBmcm9tIFwiLi4vb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0YURhdGEgfSBmcm9tIFwiLi4vb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50TWV0YURhdGFcIjtcclxuaW1wb3J0IHsgSW50ZXJmYWNlT3BjVWFSZXN0UmVzdWx0Tm9kZVJlZmVyZW5jZSB9IGZyb20gXCIuLi8uLi9jb21tdW5pY2F0aW9uL3Jlc3Qvb3BjVWFSZXN0UmVzdWx0VHlwZXNcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLCBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8gfSBmcm9tIFwiLi4vb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50UmVmbGVjdGlvblwiO1xyXG5cclxuXHJcbmNsYXNzIE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyIHtcclxuXHJcbiAgICAvLyBob2xkcyB0aGUgY3VycmVudGx5IGFjaXZlIHNlc3Npb24gaWRcclxuICAgIHByaXZhdGUgX3Nlc3Npb25JZDogbnVtYmVyID0gLTE7XHJcbiAgICAvLyBob2xkcyB0aGUgbWFwcCBjb2NrcGl0IG5tZXNwYWNlIGluZGV4XHJcbiAgICBwcml2YXRlIF9uYW1lc3BhY2VJbmRleDogbnVtYmVyID0gLTE7XHJcblxyXG4gICAgLy8gaG9sZHMgZW51bSB0eXBlIGRlZmluaXRpb25zXHJcbiAgICBwcml2YXRlIF9lbnVtVHlwZURlZmluaXRpb25zOiBhbnlbXSA9IFtdO1xyXG5cclxuICAgIC8vIGhvbGRzIGFuIGluc3RhbmNlIG9mIHRoaXMgY2xhc3NcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXI7XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXIuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyBhIHNpbmdsZXRvbiBpbnN0YW5jZSBvZiBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge01hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXIge1xyXG4gICAgICAgIHRoaXMuX2luc3RhbmNlID0gdGhpcy5faW5zdGFuY2UgPyB0aGlzLl9pbnN0YW5jZSA6IG5ldyBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlcigpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpbml0aWFsaXplcyB0aGUgaW5mbyBwcm92aWRlciBhbmQgcG9wdWxhdGVzIGl0IHdpdGggY29tbW9ubHkgbmVlZGVkIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbmFtZXNwYWNlSW5kZXhcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGluaXRpYWxpemUoc2Vzc2lvbklkOiBudW1iZXIsIG5hbWVzcGFjZUluZGV4OiBudW1iZXIpOiBQcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICB0aGlzLl9zZXNzaW9uSWQgPSBzZXNzaW9uSWQ7XHJcbiAgICAgICAgdGhpcy5fbmFtZXNwYWNlSW5kZXggPSBuYW1lc3BhY2VJbmRleDtcclxuXHJcblxyXG4gICAgICAgIC8vIGJyb3dzZSBhdmFpbGFibGUgZW51bSB0eXBlIGRlZmluaXRpb25zXHJcbiAgICAgICAgYXdhaXQgdGhpcy5yZWFkRW51bVR5cGVEZWZpbml0aW9ucygpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXIucmVhZEVudW1UeXBlRGVmaW5pdGlvbnMgJW9cIiwgdGhpcy5fZW51bVR5cGVEZWZpbml0aW9ucyk7XHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgYXN5bmMgcmVhZENvbXBvbmVudE1ldGFJbmZvKGNvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgY29tcG9uZW50TWV0YVJlZmVyZW5jZXMgPSBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5icm93c2VOb2RlTWV0YUluZm8odGhpcy5fc2Vzc2lvbklkLCBjb21wb25lbnQuaWQpO1xyXG4gICAgICAgICAgICBpZiAoY29tcG9uZW50TWV0YVJlZmVyZW5jZXMgKSB7XHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnQubWV0YURhdGEgPSB0aGlzLnBhcnNlQ29tcG9uZW50TWV0YURhdGEoY29tcG9uZW50TWV0YVJlZmVyZW5jZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGFyc2VzIHRoZSBjb21wb25lbnRzIG1ldGEgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0ludGVyZmFjZU9wY1VhUmVzdFJlc3VsdE5vZGVSZWZlcmVuY2VbXX0gbWV0YUluZm9SZWZlcmVuY2VzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcGFyc2VDb21wb25lbnRNZXRhRGF0YShtZXRhSW5mb1JlZmVyZW5jZXM6IEludGVyZmFjZU9wY1VhUmVzdFJlc3VsdE5vZGVSZWZlcmVuY2VbXSkge1xyXG4gICAgICAgIGxldCBtZXRhRGF0YSA9IHt9O1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBtZXRhSW5mb1JlZmVyZW5jZXMuZm9yRWFjaCgobWV0YUluZm9SZWZlcmVuY2U6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbWV0YURhdGFbbWV0YUluZm9SZWZlcmVuY2UuYnJvd3NlTmFtZV0gPSBKU09OLnBhcnNlKG1ldGFJbmZvUmVmZXJlbmNlLnZhbHVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbC5icm93c2VNZXRhRGF0YTogY291bGQgbm90IHBhcnNlIG1ldGEgZGF0YTogXCIgKyBlLm1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWV0YURhdGE7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIG1ldGEgZGF0IHdpdGggc3BlY2lmaWMgc2VjdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0YURhdGF9IG1ldGFEYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaW5pdGlhbGl6ZU1ldGFEYXRhKG1ldGFEYXRhOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGFEYXRhKTogYW55IHtcclxuICAgICAgICBcclxuICAgICAgICAvLyBjcmVhdGUgYW5kIHBvcHVsYXRlIHRoZSBwYXJhbWV0ZXJzIGdyb3VwXHJcbiAgICAgICAgbWV0YURhdGFbXCJQYXJhbWV0ZXJzXCJdID0ge307XHJcbiAgICAgICAgbWV0YURhdGFbXCJQYXJhbWV0ZXJzXCJdW1wiV2F0Y2hhYmxlXCJdID0gTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLnJlYWRQYXJhbWV0ZXJzKG1ldGFEYXRhLCBbXCJXYXRjaGFibGVcIl0pO1xyXG4gICAgICAgIG1ldGFEYXRhW1wiUGFyYW1ldGVyc1wiXVtcIk1lc3NhZ2VcIl0gPSBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8ucmVhZE1lc3NhZ2VQYXJhbWV0ZXJzKG1ldGFEYXRhKTtcclxuICAgICAgICBtZXRhRGF0YVtcIlBhcmFtZXRlcnNcIl1bXCJDb25maWd1cmF0aW9uXCJdID0gTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLnJlYWRQYXJhbWV0ZXJzKG1ldGFEYXRhLCBbXCJQYXJhbWV0ZXJcIiwgXCJHcm91cFwiXSk7XHJcbiAgICAgICAgbWV0YURhdGFbXCJQYXJhbWV0ZXJzXCJdW1wiV2F0Y2hhYmxlU3RhdGVcIl0gPSBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8ucmVhZFBhcmFtZXRlcnMobWV0YURhdGEsIFtcIldhdGNoYWJsZVN0YXRlXCJdKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIGFuZCBwb3B1bGF0ZSB0aGUgbWV0aG9kcyBncm91cFxyXG4gICAgICAgIG1ldGFEYXRhW1wiTWV0aG9kc1wiXSA9IHt9O1xyXG4gICAgICAgIG1ldGFEYXRhW1wiTWV0aG9kc1wiXVtcIkV4ZWN1dGFibGVcIl0gPSBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8ucmVhZE1ldGhvZHMobWV0YURhdGEsIFtcIk1ldGFDb25maWdDb21tYW5kc1wiLCBcIkNvbW1hbmRzU3RydWN0dXJlXCJdLCBbXCJDb21tYW5kXCJdKTtcclxuICAgICAgICBtZXRhRGF0YVtcIk1ldGhvZHNcIl1bXCJRdWlja0NvbW1hbmRcIl0gPSBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8ucmVhZE1ldGhvZHMobWV0YURhdGEsIFtcIk1ldGFDb25maWdRdWlja0NvbW1hbmRzXCIsIFwiUXVpY2tDb21tYW5kc1N0cnVjdHVyZVwiXSwgW1wiUXVpY2tNZXRob2RcIl0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIGF2YWlsYWJsZSBlbnVtIHR5cGUgZGVmaW5pdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW0+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgZW51bVR5cGVEZWZpbml0aW9ucygpOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZW51bVR5cGVEZWZpbml0aW9ucztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWFkcyBhbmQgdXBkYXRlcyBlbnVtIHR5cGUgZGVmaW5pdGlvbnNcclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIHJlYWRFbnVtVHlwZURlZmluaXRpb25zKCkge1xyXG4gICAgICAgIHRoaXMuX2VudW1UeXBlRGVmaW5pdGlvbnMgPSBhd2FpdCB0aGlzLmJyb3dzZUVudW1UeXBlRGVmaW5pdGlvbnModGhpcy5fc2Vzc2lvbklkLCB0aGlzLl9uYW1lc3BhY2VJbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWFkcyBlbnVtIGRlZmluaXRpb25zIFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgYnJvd3NlRW51bVR5cGVEZWZpbml0aW9ucyhzZXNzaW9uSWQ6IG51bWJlciwgbmFtZXNwYWNlSW5kZXgpIHtcclxuICAgICAgICBsZXQgZW51bXM6IGFueVtdID0gW107XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIGdldCBhbGwgYXZhaWxhYmxlIGVudW0gbm9kZXNcclxuICAgICAgICAgICAgbGV0IGFsbE9wY1VhRW51bXMgPSBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5icm93c2VOb2RlcyhzZXNzaW9uSWQsIE9wY1VhUmVzdFNlcnZpY2VzLm1hcHBDb2NrcGl0RW51bXNJZCk7XHJcblxyXG4gICAgICAgICAgICAvLyByZXRyaWV2ZSBlbnVtcyBvZiBtYXBwIENvY2twaXQgbmFtZXNwYWNlIG9ubHlcclxuICAgICAgICAgICAgbGV0IG9wY1VhRW51bXMgPSBhbGxPcGNVYUVudW1zLmZpbHRlcigob3BjVWFFbnVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3BjVWFFbnVtLm5vZGVJZC5pbmRleE9mKE9wY1VhUmVzdFNlcnZpY2VzLm1hcHBDb2NrcGl0TmFtZXNwYWNlUHJlZml4ICsgbmFtZXNwYWNlSW5kZXgpID4gLTE7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJlYWRFbnVkRGVmaW5pdGlvbnNSZXF1ZXN0cyA6UHJvbWlzZTxhbnk+W10gPSBbXTtcclxuICAgICAgICAgICAgLy8gY29sbGVjdCBlbnVtIGRlZiByZWFkIHJlcXVlc3RzXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3BjVWFFbnVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb3BjVWFFbnVtOiBhbnkgPSBvcGNVYUVudW1zW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHJlYWQgdGhlIGVudW0gdmFsdWVzIGFzIGpzb25cclxuICAgICAgICAgICAgICAgIHJlYWRFbnVkRGVmaW5pdGlvbnNSZXF1ZXN0cy5wdXNoKHRoaXMuYnJvd3NlRW51bVZhbHVlc0pzb24oc2Vzc2lvbklkLCBvcGNVYUVudW0pKTtcclxuICAgICAgICAgICAgICAgIC8vIHJlYWQgdGhlIGVudW0gdmFsdWVzIGFzIG1vZGVsIHJlZmVyZW5jZVxyXG4gICAgICAgICAgICAgICAgcmVhZEVudWREZWZpbml0aW9uc1JlcXVlc3RzLnB1c2godGhpcy5icm93c2VFbnVtVmFsdWVzKHNlc3Npb25JZCwgb3BjVWFFbnVtKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGF3YWl0IFByb21pc2UuYWxsKHJlYWRFbnVkRGVmaW5pdGlvbnNSZXF1ZXN0cyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGVudW1zID0gb3BjVWFFbnVtcy5tYXAoKG9wY1VhRW51bXNSZWYpID0+IHsgcmV0dXJuIG5ldyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW0ob3BjVWFFbnVtc1JlZikgfSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZW51bXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWFkcyBlbnVtIGRlZmluaXRpb25zIGZvciBwYXJhbWV0ZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBtZXRhSW5mb1xyXG4gICAgICogQHJldHVybnMgYW4gb2JqZWN0IHdpdGggZW51bSBkZWZpbml0aW9ucyB3aXRoIHRoZSBwYXJhbWV0ZXIgbmFtZSBhcyBrZXlcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlclxyXG4gICAgICovXHJcbiAgICByZWFkRW51bVBhcmFtZXRlckRlZmluaXRpb25zKGNvbXBvbmVudFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10sIG1ldGFJbmZvOiBhbnkpIHtcclxuICAgICAgICBsZXQgZW51bVBhcmFtZXRlcnMgPSB7fTtcclxuICAgICAgICAvLyBnZXQgdGhlIHRhcmdldCBtb2RlbCBlbnVtIHR5cGVzXHJcbiAgICAgICAgbGV0IG9wY1VhRW51bVR5cGVzID0gTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5lbnVtVHlwZURlZmluaXRpb25zO1xyXG4gICAgICAgIC8vIGdldCB0aGUgbWV0YSBwYXJhbWV0ZXIgaW5mb3NcclxuICAgICAgICBsZXQgbWV0YVBhcmFtZXRlckluZm8gPSBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlci5yZWFkRW51bU1ldGFJbmZvKG1ldGFJbmZvKTtcclxuICAgICAgICBpZiAobWV0YVBhcmFtZXRlckluZm8gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIC8vIGdldCBwb3NzaWJsZSBlbnVtIHR5cGUgbWV0YSBpdGVtc1xyXG4gICAgICAgICAgICBlbnVtUGFyYW1ldGVycyA9IHRoaXMucmVhZEVudW1EZWZpbml0aW9uc0Zyb21NZXRhSW5mbyhtZXRhUGFyYW1ldGVySW5mbywgb3BjVWFFbnVtVHlwZXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHdpdGhvdXQgbWV0YSBpbmZvIHdlIHRyeSB0byB1c2UgdGhlIHRhcmdldCBtb2RlbCBkZWZpbml0aW9ucy5cclxuICAgICAgICAgICAgZW51bVBhcmFtZXRlcnMgPSB0aGlzLnJlYWRFbnVtRGVmaW5pdGlvbkZyb21UYXJnZXRNb2RlbChjb21wb25lbnRQYXJhbWV0ZXJzLCBvcGNVYUVudW1UeXBlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbnVtUGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIHRoZSBlbnVtIHBhcmFtZXRlciBtZXRhIGluZm9cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBtZXRhSW5mb1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmVhZEVudW1NZXRhSW5mbyhtZXRhSW5mbzogYW55KSB7XHJcbiAgICAgICAgbGV0IG1ldGFQYXJhbWV0ZXJJbmZvO1xyXG4gICAgICAgIGlmIChtZXRhSW5mbykge1xyXG4gICAgICAgICAgICAvLyBJZiBubyBNZXRhQ29uZmlnQ29uZmlnUHJvcHMgYXJlIGF2YWlsYWJsZSBvbmx5IHVzZSB3YXRjaGFibGVzXHJcbiAgICAgICAgICAgIGlmIChtZXRhSW5mby5NZXRhQ29uZmlnQ29uZmlnUHJvcHMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBtZXRhUGFyYW1ldGVySW5mbyA9IG1ldGFJbmZvLk1ldGFDb25maWdDb25maWdQcm9wcy5Db25maWd1cmF0aW9uU3RydWN0dXJlLkNoaWxkcztcclxuICAgICAgICAgICAgICAgIG1ldGFQYXJhbWV0ZXJJbmZvID0gbWV0YVBhcmFtZXRlckluZm8uY29uY2F0KG1ldGFJbmZvLk1ldGFDb25maWdXYXRjaGFibGVzLldhdGNoYWJsZXNTdHJ1Y3R1cmUuQ2hpbGRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChtZXRhSW5mby5NZXRhQ29uZmlnV2F0Y2hhYmxlcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRhUGFyYW1ldGVySW5mbyA9IG1ldGFJbmZvLk1ldGFDb25maWdXYXRjaGFibGVzLldhdGNoYWJsZXNTdHJ1Y3R1cmUuQ2hpbGRzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWV0YVBhcmFtZXRlckluZm87XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyB0aGUgYXZhaWxhYmxlIGVudW0gdHlwZSBkZWZpbml0aW9ucyBmcm9tIHRoZSBtZXRhIGluZm9cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBtZXRhUGFyYW1ldGVySW5mb1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1bXX0gb3BjVWFFbnVtVHlwZXNcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVhZEVudW1EZWZpbml0aW9uc0Zyb21NZXRhSW5mbyhtZXRhUGFyYW1ldGVySW5mbzogYW55LCBvcGNVYUVudW1UeXBlczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtW10pOiBhbnkge1xyXG4gICAgICAgIGxldCBlbnVtUGFyYW1ldGVycyA9IHt9O1xyXG4gICAgICAgIGxldCBtZXRhUGFyYW1ldGVyVXNpbmdFbnVtcyA9IE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyLnJlYWRFbnVtTWV0YURlZmluaXRpb25zKG1ldGFQYXJhbWV0ZXJJbmZvKTtcclxuICAgICAgICBtZXRhUGFyYW1ldGVyVXNpbmdFbnVtcy5mb3JFYWNoKChlbnVtUGFyYW1ldGVyTWV0YUl0ZW0pID0+IHtcclxuICAgICAgICAgICAgbGV0IGVudW1UeXBlUmVmID0gZW51bVBhcmFtZXRlck1ldGFJdGVtLlR5cGVEZWYuRW51bVR5cGVSZWY7XHJcbiAgICAgICAgICAgIGxldCBtYXRjaGluZ09wY1VhRW51bVR5cGVzID0gb3BjVWFFbnVtVHlwZXMuZmlsdGVyKChvcGNVYUVudW1UeXBlKSA9PiB7IHJldHVybiBvcGNVYUVudW1UeXBlLmJyb3dzZU5hbWUgPT09IGVudW1UeXBlUmVmOyB9KTtcclxuICAgICAgICAgICAgaWYgKG1hdGNoaW5nT3BjVWFFbnVtVHlwZXMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBzYXZlIHRoZSBtYXRjaGluZyBlbnVtIHR5cGUgaW5mbyBmb3IgdGhlIHBhcmFtZXRlciBuYW1lXHJcbiAgICAgICAgICAgICAgICBlbnVtUGFyYW1ldGVyc1tlbnVtUGFyYW1ldGVyTWV0YUl0ZW0uUmVmXSA9IG1hdGNoaW5nT3BjVWFFbnVtVHlwZXNbMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvIC0gTm8gZW51bSB0eXBlIGZvdW5kIGZvciAlbyAlb1wiLCBlbnVtVHlwZVJlZiwgZW51bVBhcmFtZXRlck1ldGFJdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBlbnVtUGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIHRoZSBlbnVtIGRlZmluaXRpb25zIGNvbnRhaW5lZCBpbiB0aGUgbWV0YSBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsqfSBtZXRhUGFyYW1ldGVySW5mb1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmVhZEVudW1NZXRhRGVmaW5pdGlvbnMobWV0YVBhcmFtZXRlckluZm86IGFueSkge1xyXG4gICAgICAgIGxldCB0eXBlRGVmaW5pdGlvbnMgPSAgTWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YS5maWx0ZXJNZXRhSXRlbXMobWV0YVBhcmFtZXRlckluZm8sIFtcIlBhcmFtZXRlclwiLCBcIldhdGNoYWJsZVwiLCBcIkdyb3VwXCJdLCAobWV0YUl0ZW1Hcm91cE9yUGFyYW1ldGVyKSA9PiB7IHJldHVybiBtZXRhSXRlbUdyb3VwT3JQYXJhbWV0ZXIuaGFzT3duUHJvcGVydHkoXCJUeXBlRGVmXCIpOyB9KTtcclxuICAgICAgICBsZXQgZW51bVR5cGVEZWZpbml0aW9ucyA9IHR5cGVEZWZpbml0aW9ucy5maWx0ZXIoKHR5cGVEZWZpbml0aW9uKT0+IHtyZXR1cm4gdHlwZURlZmluaXRpb24uVHlwZURlZi5oYXNPd25Qcm9wZXJ0eShcIkVudW1UeXBlUmVmXCIpfSk7XHJcbiAgICAgICAgcmV0dXJuIGVudW1UeXBlRGVmaW5pdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWFkcyB0aGUgYXZhaWxhYmxlIGVudW0gdHlwZSBkZWZpbnRpb25zIGZyb20gdGhlIHRhcmdldCBtb2RlbFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGNvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtW119IG9wY1VhRW51bVR5cGVzXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRFbnVtRGVmaW5pdGlvbkZyb21UYXJnZXRNb2RlbChjb21wb25lbnRQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdLCBvcGNVYUVudW1UeXBlczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtW10pOiBhbnkge1xyXG4gICAgICAgIGxldCBlbnVtUGFyYW1ldGVycyA9IHt9O1xyXG4gICAgICAgIGNvbXBvbmVudFBhcmFtZXRlcnMuZm9yRWFjaCgoY29tcG9uZW50UGFyYW1ldGVyKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBtYXRjaGluZ09wY1VhRW51bVR5cGVzID0gb3BjVWFFbnVtVHlwZXMuZmlsdGVyKChvcGNVYUVudW1UeXBlKSA9PiB7IHJldHVybiBvcGNVYUVudW1UeXBlLmJyb3dzZU5hbWUgPT09IGNvbXBvbmVudFBhcmFtZXRlci5kYXRhVHlwZS5uYW1lOyB9KTtcclxuICAgICAgICAgICAgaWYgKG1hdGNoaW5nT3BjVWFFbnVtVHlwZXMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBlbnVtUGFyYW1ldGVyc1tjb21wb25lbnRQYXJhbWV0ZXIuYnJvd3NlTmFtZV0gPSBtYXRjaGluZ09wY1VhRW51bVR5cGVzWzBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGVudW1QYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBcclxuICAgICAqIHJlYWRzIGVudW0gdHlwZSBkZWZpbml0aW9ucyBmb3IgbWV0aG9kIHBhcmFtZXRlcnNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kfSBtZXRob2RcclxuICAgICAqIEBwYXJhbSB7Kn0gbWV0YUluZm9cclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcmVhZE1ldGFFbnVtTWV0aG9kUGFyYW1ldGVyRGVmaW5pdGlvbnMobWV0aG9kOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCwgbWV0YUluZm86IGFueSkge1xyXG4gICAgICAgIGxldCBlbnVtUGFyYW1ldGVycyA9IHt9O1xyXG5cclxuICAgICAgICBsZXQgb3BjVWFFbnVtVHlwZXMgPSBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlci5nZXRJbnN0YW5jZSgpLmVudW1UeXBlRGVmaW5pdGlvbnM7XHJcblxyXG4gICAgICAgIGlmIChtZXRhSW5mbyA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHJldHVybiBlbnVtUGFyYW1ldGVycztcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBtZXRhIHBhcmFtZXRlciBpbmZvc1xyXG4gICAgICAgIGlmIChtZXRhSW5mby5NZXRhQ29uZmlnQ29tbWFuZHMgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICByZXR1cm4gZW51bVBhcmFtZXRlcnM7XHJcblxyXG4gICAgICAgIGxldCBtZXRhTWV0aG9kUGFyYW1ldGVySW5mbyA9IG1ldGFJbmZvLk1ldGFDb25maWdDb21tYW5kcy5Db21tYW5kc1N0cnVjdHVyZS5DaGlsZHM7XHJcbiAgICAgICAgaWYgKG1ldGFNZXRob2RQYXJhbWV0ZXJJbmZvKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBnZXQgdGhlIGNvbW1hbmQgbWV0YSBpbmZvXHJcbiAgICAgICAgICAgIGxldCBtZXRhQ29tbWFuZEluZm8gPSBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGFEYXRhLmZpbHRlck1ldGFJdGVtcyhtZXRhTWV0aG9kUGFyYW1ldGVySW5mbywgW1wiQ29tbWFuZFwiXSwgKGNvbW1hbmQpID0+IHsgcmV0dXJuIGNvbW1hbmQuUmVmID09PSBtZXRob2QuYnJvd3NlTmFtZTsgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBnZXQgdGhlIGNvbW1hbmRzIHBhcmFtZXRlciBpbmZvXHJcbiAgICAgICAgICAgIGxldCBtZXRhUGFyYW1ldGVyVXNpbmdFbnVtcyA9IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0YURhdGEuZmlsdGVyTWV0YUl0ZW1zKG1ldGFDb21tYW5kSW5mbywgW1wiUGFyYW1ldGVyXCJdLCAobWV0YUl0ZW1Hcm91cE9yUGFyYW1ldGVyKSA9PiB7IHJldHVybiBtZXRhSXRlbUdyb3VwT3JQYXJhbWV0ZXIuaGFzT3duUHJvcGVydHkoXCJUeXBlRGVmXCIpOyB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGZpbmQgYW5kIGNvbGxlY3QgbWF0Y2hpbmcgb3BjdWEgZW51bSB0eXBlIHJlZnNcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZXRhUGFyYW1ldGVyVXNpbmdFbnVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZW51bVBhcmFtZXRlck1ldGFJdGVtID0gbWV0YVBhcmFtZXRlclVzaW5nRW51bXNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGVudW1UeXBlUmVmID0gZW51bVBhcmFtZXRlck1ldGFJdGVtLlR5cGVEZWYuRW51bVR5cGVSZWY7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWF0Y2hpbmdPcGNVYUVudW1UeXBlcyA9IG9wY1VhRW51bVR5cGVzLmZpbHRlcigob3BjVWFFbnVtVHlwZSkgPT4geyByZXR1cm4gb3BjVWFFbnVtVHlwZS5icm93c2VOYW1lID09PSBlbnVtVHlwZVJlZjsgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hpbmdPcGNVYUVudW1UeXBlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc2F2ZSB0aGUgbWF0Y2hpbmcgZW51bSB0eXBlIGluZm8gZm9yIHRoZSBwYXJhbWV0ZXIgbmFtZVxyXG4gICAgICAgICAgICAgICAgICAgIGVudW1QYXJhbWV0ZXJzW2VudW1QYXJhbWV0ZXJNZXRhSXRlbS5SZWZdID0gbWF0Y2hpbmdPcGNVYUVudW1UeXBlc1swXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlckluZm8gLSBObyBlbnVtIHR5cGUgZm91bmQgZm9yICVvICVvXCIsIGVudW1UeXBlUmVmLCBlbnVtUGFyYW1ldGVyTWV0YUl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbnVtUGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBicm93c2VzIHRoZSBlbnVtIHZhbHVlcyBhIHNqc29uIChmb3Igb2xkZXIgdGFyZ2V0cylcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHsqfSBvcGNVYUVudW1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGJyb3dzZUVudW1WYWx1ZXNKc29uKHNlc3Npb25JZDogbnVtYmVyLCBvcGNVYUVudW06IGFueSkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBlbnVtVmFsdWVzSnNvblN0cmluZyA9IGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLnJlYWROb2RlQXR0cmlidXRlKHNlc3Npb25JZCwgb3BjVWFFbnVtLm5vZGVJZCwgT3BjVWFBdHRyaWJ1dGUuREVTQ1JJUFRJT04pO1xyXG4gICAgICAgICAgICBsZXQgZW51bVZhbHVlc0pzb246IGFueVtdID0gSlNPTi5wYXJzZShlbnVtVmFsdWVzSnNvblN0cmluZykuZW51bVZhbHVlcy5tYXAoKGVudW1WYWx1ZUl0ZW0pID0+IHsgcmV0dXJuIHsgZGlzcGxheU5hbWU6IHsgbG9jYWxlOiBcIlwiLCB0ZXh0OiBlbnVtVmFsdWVJdGVtLnRleHQgfSwgdmFsdWU6IGVudW1WYWx1ZUl0ZW0udmFsdWUgfSB9KTtcclxuICAgICAgICAgICAgb3BjVWFFbnVtLmVudW1WYWx1ZXNKc29uID0gZW51bVZhbHVlc0pzb247XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYnJvd3NlcyB0aGUgb3BjIHVhIGVudW0gbm9kZSBmb3IgaXRzIHZhbHVlIGRlZmluaXRpb25zXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWRcclxuICAgICAqIEBwYXJhbSB7Kn0gb3BjVWFFbnVtXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgYnJvd3NlRW51bVZhbHVlcyhzZXNzaW9uSWQ6IG51bWJlciwgb3BjVWFFbnVtOiBhbnkpIHtcclxuICAgICAgICBsZXQgZW51bVZhbHVlc1JlZiA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgZW51bVZhbHVlc05vZGVzID0gYXdhaXQgT3BjVWFSZXN0U2VydmljZXMuYnJvd3NlTm9kZXMoc2Vzc2lvbklkLCBvcGNVYUVudW0ubm9kZUlkKTtcclxuICAgICAgICAgICAgaWYgKGVudW1WYWx1ZXNOb2Rlcykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGVudW1WYWx1ZXMgPSBlbnVtVmFsdWVzTm9kZXMuZmlsdGVyKChlbnVtVmFsdWVzTm9kZSkgPT4geyByZXR1cm4gKDxhbnk+ZW51bVZhbHVlc05vZGUpLmJyb3dzZU5hbWUgPT09IFwiRW51bVZhbHVlc1wiIHx8ICg8YW55PmVudW1WYWx1ZXNOb2RlKS5icm93c2VOYW1lID09PSBcIkVudW1TdHJpbmdzXCI7IH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVudW1WYWx1ZXMgJiYgZW51bVZhbHVlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW51bVZhbHVlc1JlZiA9IGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLnJlYWROb2RlQXR0cmlidXRlKHNlc3Npb25JZCwgZW51bVZhbHVlc1swXS5ub2RlSWQsIE9wY1VhQXR0cmlidXRlLlZBTFVFKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvcGNVYUVudW0uZW51bVZhbHVlcyA9IGVudW1WYWx1ZXNSZWY7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgeyBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlciB9Il19