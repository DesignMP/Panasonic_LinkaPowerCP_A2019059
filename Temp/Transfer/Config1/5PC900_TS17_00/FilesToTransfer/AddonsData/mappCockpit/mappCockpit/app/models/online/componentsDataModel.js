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
define(["require", "exports", "../diagnostics/mappCockpitDiagnosticProvider", "./mappCockpitComponent", "../../framework/events", "../dataModelInterface", "../dataModelBase", "../../framework/property", "../../framework/command", "../diagnostics/mappCockpitCommonInfoProvider", "./mappCockpitComponentReflection", "../../common/mappCockpitConfig"], function (require, exports, mappCockpitDiagnosticProvider_1, mappCockpitComponent_1, events_1, dataModelInterface_1, dataModelBase_1, property_1, command_1, mappCockpitCommonInfoProvider_1, mappCockpitComponentReflection_1, mappCockpitConfig_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventTraceDataLoaded = /** @class */ (function (_super) {
        __extends(EventTraceDataLoaded, _super);
        function EventTraceDataLoaded() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventTraceDataLoaded;
    }(events_1.TypedEvent));
    ;
    var EventComponentsUpdated = /** @class */ (function (_super) {
        __extends(EventComponentsUpdated, _super);
        function EventComponentsUpdated() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventComponentsUpdated;
    }(events_1.TypedEvent));
    ;
    var EventComponentParametersUpdated = /** @class */ (function (_super) {
        __extends(EventComponentParametersUpdated, _super);
        function EventComponentParametersUpdated() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventComponentParametersUpdated;
    }(events_1.TypedEvent));
    ;
    var EventComponentMethodsUpdated = /** @class */ (function (_super) {
        __extends(EventComponentMethodsUpdated, _super);
        function EventComponentMethodsUpdated() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventComponentMethodsUpdated;
    }(events_1.TypedEvent));
    ;
    var EventParameterValuesUpdated = /** @class */ (function (_super) {
        __extends(EventParameterValuesUpdated, _super);
        function EventParameterValuesUpdated() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventParameterValuesUpdated;
    }(events_1.TypedEvent));
    ;
    var EventModelConnection = /** @class */ (function (_super) {
        __extends(EventModelConnection, _super);
        function EventModelConnection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventModelConnection;
    }(events_1.TypedEvent));
    ;
    /**
     * The class implements the main data model for mapp Cockpit.
     *
     * @class MappCockpitComponentDataModel
     */
    var MappCockpitComponentDataModel = /** @class */ (function () {
        /**
         * Creates an instance of MappCockpitComponentDataModel.
         * @memberof MappCockpitComponentDataModel
         */
        function MappCockpitComponentDataModel() {
            var _this = this;
            // Create a data source for the components.
            this._componentsSource = property_1.Property.create([]);
            this._userComponentsSource = property_1.Property.create([], function (dataLink) { _this.requestReadUserComponents(dataLink); });
            // Holds user roles
            this._userRoles = property_1.Property.create([]);
            // specifies interval for connection observation
            this._connectionObservationInterval = 1000;
            // specefies the connection observation id
            this._connectionObservationTimerId = -1;
            // holds the current model connection state
            this._modelConnected = false;
            this._observablesChangedHandler = function (sender, eventArgs) { _this.handleObservableItemsChanged(eventArgs); };
            // Initialize members
            this._mappCockpitDiagnosticProvider = new mappCockpitDiagnosticProvider_1.MappCockpitDiagnosticProvider(this);
            this._components = [];
            // Create event sources
            this.eventTraceDataLoaded = new EventTraceDataLoaded();
            this.eventComponentsUpdated = new EventComponentsUpdated();
            this.eventComponentParametersUpdated = new EventComponentParametersUpdated();
            this.eventParameterValuesUpdated = new EventParameterValuesUpdated();
            this.eventComponentMethodsUpdated = new EventComponentMethodsUpdated();
            this.eventModelConnectionChanged = new EventModelConnection();
            // forward the event
            this._mappCockpitDiagnosticProvider.eventObservablesChanged.attach(this._observablesChangedHandler);
            // Create and initialize commands
            this.createCommands();
        }
        /**
         * Dispose the MappCockpitComponentDataModel
         *
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.dispose = function () {
            // detach events
            this._mappCockpitDiagnosticProvider.eventObservablesChanged.detach(this._observablesChangedHandler);
            this._mappCockpitDiagnosticProvider.dispose();
        };
        /**
         * Creates exposed commands
         *
         * @private
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.createCommands = function () {
            this._commandChangeUser = command_1.Command.create(this, this.executeCommandChangeUser());
        };
        /**
         * initializes the data model
         *
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.initialize = function () {
        };
        Object.defineProperty(MappCockpitComponentDataModel.prototype, "traceProvider", {
            /**
             * Gets the trace provider
             *
             * @readonly
             * @type {MappCockpitTraceProvider}
             * @memberof MappCockpitComponentDataModel
             */
            get: function () {
                return this._mappCockpitDiagnosticProvider.traceProvider;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * connects the data model to the data source
         *
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.connect = function () {
            return __awaiter(this, void 0, void 0, function () {
                var error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.beginSession()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.browseComponents()];
                        case 2:
                            _a.sent();
                            // after connectin successfully
                            this.startObserveModelConnection();
                            return [2 /*return*/, true];
                        case 3:
                            error_1 = _a.sent();
                            return [2 /*return*/, false];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        Object.defineProperty(MappCockpitComponentDataModel.prototype, "commandChangeUser", {
            get: function () {
                return this._commandChangeUser;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentDataModel.prototype, "components", {
            /**
             * Returns the available mapp components
             *
             * @readonly
             * @type {Array<MappCockpitComponent>}
             * @memberof MappCockpitComponentDataModel
             */
            get: function () {
                return this._components;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentDataModel.prototype, "componentsSource", {
            get: function () {
                return this._componentsSource;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentDataModel.prototype, "userComponentsSource", {
            get: function () {
                return this._userComponentsSource;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentDataModel.prototype, "userRoles", {
            /**
             * Gets the current user roles
             *
             * @readonly
             * @type {string[]}
             * @memberof MappCockpitComponentDataModel
             */
            get: function () {
                return this._userRoles;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentDataModel.prototype, "writeAccess", {
            /**
             *
             *
             * @returns {boolean}
             * @memberof MappCockpitComponentDataModel
             */
            get: function () {
                var modelHasWriteAccess = false;
                if (this.userRoles.value.length > 0) {
                    // update the write access right according the current role
                    modelHasWriteAccess = this.userRoles.value.some(function (userRole) { return userRole === mappCockpitConfig_1.MappCockpitConfiguration.writeAccessRole; });
                }
                return modelHasWriteAccess;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Clears the data model
         *
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.clear = function () {
            this._components = [];
        };
        /**
         * Browses all available resources and updates the model
         *
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.browseComponents = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            // Update components in model
                            _a = this;
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.componentProvider.browseComponents()];
                        case 1:
                            // Update components in model
                            _a._components = _b.sent();
                            return [4 /*yield*/, this.updateComponentMetaData()];
                        case 2:
                            _b.sent();
                            // Connect to model
                            this.connectComponentsToModel();
                            this.componentsSource.value = this._components;
                            return [2 /*return*/, this._components];
                    }
                });
            });
        };
        /**
         * Connects the components to the maon data model
         *
         * @private
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.connectComponentsToModel = function () {
            var _this = this;
            this._components.forEach(function (component) { component.model = _this; });
        };
        /**
         * Updates the components meta data
         *
         * @private
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.updateComponentMetaData = function () {
            return __awaiter(this, void 0, void 0, function () {
                var i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < this._components.length)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.browseMetaInfo(this._components[i])];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Reads the available user components
         *
         * @private
         * @param {Property<MappCockpitComponent[]>} dataLink
         * @returns {Promise<MappCockpitComponent[]>}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.requestReadUserComponents = function (dataLink) {
            return __awaiter(this, void 0, void 0, function () {
                var components;
                return __generator(this, function (_a) {
                    components = [];
                    try {
                        // filter components to be exposed to the user
                        components = this._components.filter(function (component) { return component.metaData; });
                        components.forEach(function (component) { mappCockpitComponent_1.MappCockpitComponent.registerUserComponent(component); });
                        dataLink.readRequestExecuted(components);
                    }
                    catch (error) {
                        console.error(error);
                        dataLink.readRequestRejected(error);
                    }
                    return [2 /*return*/, components];
                });
            });
        };
        /**
         * browses the meta data, parameters ans methods of a single component
         *
         * @private
         * @param {MappCockpitComponent} mappCockpitComponent
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.browseComponent = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.browseParameters(mappCockpitComponent)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.browseMethods(mappCockpitComponent)];
                        case 2:
                            _a.sent();
                            console.log("MappCockpitComponentDataModel.browseComponent: %o", mappCockpitComponent);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Called after components update
         *
         * @param {MappCockpitComponent[]} mappCockpitComponents
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.onComponentsUpdated = function (mappCockpitComponents) {
            this.eventComponentsUpdated.raise(this, mappCockpitComponents);
        };
        /**
           * browses the meta info for a component
         *
         * @param {MappCockpitComponent} mappCockpitComponent
         * @returns {Promise<any>}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.browseMetaInfo = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                var metaInfoReferences, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.browseMetaInfo(mappCockpitComponent)];
                        case 1:
                            metaInfoReferences = _a.sent();
                            if (metaInfoReferences) {
                                mappCockpitComponent.metaData = this.readMetaData(metaInfoReferences);
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            e_1 = _a.sent();
                            console.error(e_1.message);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/, mappCockpitComponent.metaData];
                    }
                });
            });
        };
        /**
         * Browses available component parameters
         *
         * @returns {Promise<void>}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.browseParameters = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            // Update components in model
                            _a = mappCockpitComponent;
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.browseParameters(mappCockpitComponent)];
                        case 1:
                            // Update components in model
                            _a.parameters = _b.sent();
                            // retrieve and update user parameters
                            return [4 /*yield*/, this.retrieveUserParameters(mappCockpitComponent)];
                        case 2:
                            // retrieve and update user parameters
                            _b.sent();
                            return [2 /*return*/, mappCockpitComponent.parameters];
                    }
                });
            });
        };
        /**
         * Browses and updates the methods input parameters
         *
         * @param {MappCockpitComponentMethod} mappCockpitComponentMethod
         * @returns {Promise<MappCockpitMethodParameter[]>}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.browseMethodInputParameters = function (mappCockpitComponentMethod) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // browse and update the methods parameters
                        return [4 /*yield*/, this._mappCockpitDiagnosticProvider.browseMethodParameters([mappCockpitComponentMethod])];
                        case 1:
                            // browse and update the methods parameters
                            _a.sent();
                            // update the parameter data types
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.updateMethodParameterDataTypes([mappCockpitComponentMethod])];
                        case 2:
                            // update the parameter data types
                            _a.sent();
                            return [2 /*return*/, mappCockpitComponentMethod.inputParameters];
                    }
                });
            });
        };
        /**
         * Retrieves the component parameters relevant for the user. They are specified by meta data
         *
         * @private
         * @param {MappCockpitComponent} mappCockpitComponent
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.retrieveUserParameters = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                var watchableMetaConfig, watchableStateMetaConfig;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            watchableMetaConfig = ['MetaConfigWatchables', 'WatchablesStructure', 'Watchable'];
                            watchableStateMetaConfig = ['MetaConfigWatchablesStates', 'WatchablesStatesStructure', 'WatchableState'];
                            mappCockpitComponent.messageParameters = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.retrieveMessageParameters(mappCockpitComponent.parameters);
                            if (!mappCockpitComponent.metaData) return [3 /*break*/, 5];
                            if (!(mappCockpitComponent.metaData.hasOwnProperty("Parameters") && mappCockpitComponent.metaData["Parameters"].hasOwnProperty("Watchable"))) return [3 /*break*/, 2];
                            mappCockpitComponent.watchableParameters = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.retrieveWatchableParameters(mappCockpitComponent.parameters, watchableMetaConfig);
                            if (!(mappCockpitComponent.watchableParameters.length > 0)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.updateParameterDataTypes(mappCockpitComponent.watchableParameters)];
                        case 1:
                            _a.sent();
                            mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.updateParameter(mappCockpitComponent.watchableParameters, mappCockpitComponent.metaData["Parameters"]["Watchable"]);
                            _a.label = 2;
                        case 2:
                            if (!(mappCockpitComponent.metaData.hasOwnProperty("Parameters") && mappCockpitComponent.metaData["Parameters"].hasOwnProperty("Configuration"))) return [3 /*break*/, 4];
                            mappCockpitComponent.configurationParameters = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.retrieveConfigurationParameters(mappCockpitComponent.parameters);
                            if (!(mappCockpitComponent.configurationParameters.length > 0)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.updateParameterDataTypes(mappCockpitComponent.configurationParameters)];
                        case 3:
                            _a.sent();
                            mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.updateParameter(mappCockpitComponent.configurationParameters, mappCockpitComponent.metaData["Parameters"]["Configuration"]);
                            _a.label = 4;
                        case 4:
                            if (mappCockpitComponent.metaData.hasOwnProperty("Parameters") && mappCockpitComponent.metaData["Parameters"].hasOwnProperty("WatchableState") && mappCockpitComponent.watchableParameters.length > 0) {
                                mappCockpitComponent.watchableStateParameters = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.retrieveWatchableStates(mappCockpitComponent.watchableParameters, watchableStateMetaConfig);
                            }
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * writes the value to component parameter
         *
         * @param {MappCockpitComponentParameter} parameter
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.writeComponentParameter = function (parameter) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._mappCockpitDiagnosticProvider.writeParameterValue(parameter, parameter.value)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * browses the component methods
         *
         * @param {MappCockpitComponent} mappCockpitComponent
         * @returns {Promise<MappCockpitComponentMethod[]>}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.browseMethods = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                var methodsMetaConfig, quickCommandsMetaConfig, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            methodsMetaConfig = ['MetaConfigCommands', 'CommandsStructure', 'Command'];
                            quickCommandsMetaConfig = ['MetaConfigQuickCommands', 'QuickCommandsStructure', 'QuickCommand'];
                            // Update component methods in model
                            _a = mappCockpitComponent;
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.browseMethods(mappCockpitComponent)];
                        case 1:
                            // Update component methods in model
                            _a.methods = _b.sent();
                            // filter the methods to the ones specefied by meta info
                            mappCockpitComponent.userMethods = mappCockpitComponentReflection_1.MappCockpitComponentMethodInfo.retrieveExecutableMethods(mappCockpitComponent.methods, methodsMetaConfig);
                            mappCockpitComponent.quickCommands = mappCockpitComponentReflection_1.MappCockpitComponentMethodInfo.retrieveQuickCommands(mappCockpitComponent.methods, quickCommandsMetaConfig);
                            return [2 /*return*/, mappCockpitComponent.methods];
                    }
                });
            });
        };
        /**
         * Retrieves the methods relevant for the user. They are specified by meta data
         *
         * @private
         * @param {MappCockpitComponent} mappCockpitComponent
         * @param {*} componentMethods
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.retrieveUserMethods = function (mappCockpitComponent, componentMethods) {
            var userMethods = [];
            if (mappCockpitComponent.metaData && mappCockpitComponent.metaData.hasOwnProperty("Methods") && mappCockpitComponent.metaData["Methods"].hasOwnProperty("Executable")) {
                var methodsMeta_1 = mappCockpitComponent.metaData["Methods"]["Executable"];
                userMethods = componentMethods.filter(function (method) { return methodsMeta_1[method.browseName]; });
            }
            return userMethods;
        };
        /**
         * reads the meta infos into a single object
         *
         * @private
         * @param {Array<string>} metaParameters
         * @returns
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.readMetaData = function (metaParameters) {
            var metaData = {};
            try {
                metaParameters.forEach(function (metaParameter) {
                    if (metaParameter.value == "") { // Fallback: Use empty object in case of empty metaInfo
                        metaParameter.value = "{}";
                    }
                    //Just for prototype: Enable/Disable of methods
                    // if (metaParameter.nodeId == "ns=5;s=gAxis1.MetaConfigCommands") {
                    //     metaParameter.value = '{"CommandsStructure":{"Scope":"mapp/Motion/Axis/AcpAxis","Childs":[{"Group":{"DisplayName":"Preparation","Childs":[{"Command":{"DisplayName":"Power on","Ref":"Power On","WatchableVariablesMapping":[["Is Powered","Is_Powered"]],"EnableStateExpression":"Is_Powered == false ? true : false"}},{"Command":{"DisplayName":"Power off","Ref":"Power Off","WatchableVariablesMapping":[["Is Powered","Is_Powered"]],"EnableStateExpression":"Is_Powered == true ? true : false"}},{"Command":{"DisplayName":"Init home","Ref":"Init Home","Parameters":[{"Parameter":{"DisplayName":"Homing mode","Ref":"Homing Mode","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::InitHomeReduced"}}},{"Parameter":{"DisplayName":"Position","Ref":"Position","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Start velocity","Ref":"Start Velocity","DefaultValue":"0.0","EU":"mm/s"}},{"Parameter":{"DisplayName":"Homing velocity","Ref":"Homing Velocity","DefaultValue":"0.0","EU":"mm/s"}},{"Parameter":{"DisplayName":"Acceleration","Ref":"Acceleration","DefaultValue":"0.0","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Switch edge","Ref":"SwitchEdge","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::InitHomeDirection"}}},{"Parameter":{"DisplayName":"Start direction","Ref":"Start Direction","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::InitHomeDirection"}}},{"Parameter":{"DisplayName":"Homing direction","Ref":"Homing Direction","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::InitHomeDirection"}}},{"Parameter":{"DisplayName":"Reference pulse","Ref":"Reference Pulse","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::Switch"}}},{"Parameter":{"DisplayName":"Keep direction","Ref":"Keep Direction","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::Switch"}}},{"Parameter":{"DisplayName":"Reference pulse blocking distance","Ref":"Reference Pulse Blocking Distance","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Torque limit","Ref":"Torque Limit","DefaultValue":"0.0","EU":"N·m"}},{"Parameter":{"DisplayName":"Block detection position error","Ref":"Block Detection Position Error","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Position error stop limit","Ref":"Position Error Stop Limit","DefaultValue":"0.0","EU":"mm"}}]}},{"Command":{"DisplayName":"Home","Ref":"Home","Parameters":[{"Parameter":{"DisplayName":"Position","Ref":"Position","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Homing mode","Ref":"Homing Mode","DefaultValue":"140","TypeDef":{"EnumTypeRef":"AcpAx::HomingReduced"}}}]}}]}},{"Group":{"DisplayName":"Administration","Childs":[{"Command":{"DisplayName":"Reset","Ref":"Reset"}},{"Command":{"DisplayName":"Set override","Ref":"Set Override","Parameters":[{"Parameter":{"DisplayName":"Velocity factor","Ref":"Velocity Factor","DefaultValue":"1.0"}},{"Parameter":{"DisplayName":"Acceleration factor","Ref":"Acceleration Factor","DefaultValue":"1.0"}}]}},{"Command":{"DisplayName":"Command error","Ref":"CommandError","Parameters":[{"Parameter":{"DisplayName":"Command","Ref":"Command","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::CommandErrors"}}}]}},{"Command":{"DisplayName":"Read ParID","Ref":"Read ParId","Parameters":[{"Parameter":{"DisplayName":"ParID","Ref":"ParId","DefaultValue":"0"}}]}},{"Command":{"DisplayName":"Write ParID","Ref":"Write ParId","Parameters":[{"Parameter":{"DisplayName":"ParID","Ref":"ParId","DefaultValue":"0"}},{"Parameter":{"DisplayName":"Value","Ref":"Value","DefaultValue":"0"}}]}}]}},{"Group":{"DisplayName":"Movement","Childs":[{"Command":{"DisplayName":"Move absolute","Ref":"Move Absolute","Parameters":[{"Parameter":{"DisplayName":"Position","Ref":"Position","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Velocity","Ref":"Velocity","DefaultValue":"2","EU":"mm/s"}},{"Parameter":{"DisplayName":"Acceleration","Ref":"Acceleration","DefaultValue":"10","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Deceleration","Ref":"Deceleration","DefaultValue":"10","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Direction","Ref":"Direction","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::MoveAbsDirection"}}}]}},{"Command":{"DisplayName":"Move additive","Ref":"Move Additive","Parameters":[{"Parameter":{"DisplayName":"Distance","Ref":"Distance","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Velocity","Ref":"Velocity","DefaultValue":"2","EU":"mm/s"}},{"Parameter":{"DisplayName":"Acceleration","Ref":"Acceleration","DefaultValue":"10","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Deceleration","Ref":"Deceleration","DefaultValue":"10","EU":"mm/s²"}}]}},{"Command":{"DisplayName":"Move velocity","Ref":"Move Velocity","Parameters":[{"Parameter":{"DisplayName":"Velocity","Ref":"Velocity","DefaultValue":"2","EU":"mm/s"}},{"Parameter":{"DisplayName":"Acceleration","Ref":"Acceleration","DefaultValue":"10","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Deceleration","Ref":"Deceleration","DefaultValue":"10","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Direction","Ref":"Direction","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::MoveVeloDirection"}}}]}},{"Command":{"DisplayName":"Gear in","Ref":"Gear In","Parameters":[{"Parameter":{"DisplayName":"Master","Ref":"Master","DefaultValue":""}},{"Parameter":{"DisplayName":"Ratio numerator","Ref":"Ratio Numerator","DefaultValue":"0.0"}},{"Parameter":{"DisplayName":"Ratio denominator","Ref":"Ratio Denominator","DefaultValue":"0.0"}},{"Parameter":{"DisplayName":"Master value source","Ref":"Master Value Source","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::ValueSource"}}},{"Parameter":{"DisplayName":"Acceleration","Ref":"Acceleration","DefaultValue":"0.0","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Deceleration","Ref":"Deceleration","DefaultValue":"0.0","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Master max velocity","Ref":"Master Max Velocity","DefaultValue":"0.0","EU":"mm/s"}}]}},{"Command":{"DisplayName":"Cam in","Ref":"CamIn","Parameters":[{"Parameter":{"DisplayName":"Master","Ref":"Master","DefaultValue":""}},{"Parameter":{"DisplayName":"Master offset","Ref":"MasterOffset","DefaultValue":"0.0","EU":"mm/s"}},{"Parameter":{"DisplayName":"Slave offset","Ref":"SlaveOffset","DefaultValue":"0.0","EU":"mm/s"}},{"Parameter":{"DisplayName":"Master scaling","Ref":"MasterScaling","DefaultValue":"0"}},{"Parameter":{"DisplayName":"Slave scaling","Ref":"SlaveScaling","DefaultValue":"0"}},{"Parameter":{"DisplayName":"Start mode","Ref":"StartMode","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::CamStartMode"}}},{"Parameter":{"DisplayName":"Master value source","Ref":"MasterValueSource","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::ValueSourceCamIn"}}},{"Parameter":{"DisplayName":"Cam ID","Ref":"CamID","DefaultValue":"65535"}},{"Parameter":{"DisplayName":"Periodic","Ref":"Periodic","DefaultValue":"0"}},{"Parameter":{"DisplayName":"Velocity","Ref":"Velocity","DefaultValue":"0.0","EU":"mm/s"}},{"Parameter":{"DisplayName":"Acceleration","Ref":"Acceleration","DefaultValue":"0.0","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Deceleration","Ref":"Deceleration","DefaultValue":"0.0","EU":"mm/s²"}}]}},{"Command":{"DisplayName":"Torque control","Ref":"Torque Control","Parameters":[{"Parameter":{"DisplayName":"Torque","Ref":"Torque","DefaultValue":"0.0","EU":"N·m"}},{"Parameter":{"DisplayName":"Torque ramp","Ref":"Torque Ramp","DefaultValue":"0.0","EU":"N·m/s"}},{"Parameter":{"DisplayName":"Velocity","Ref":"Velocity","DefaultValue":"0.0","EU":"mm/s"}},{"Parameter":{"DisplayName":"Acceleration","Ref":"Acceleration","DefaultValue":"0.0","EU":"mm/s²"}}]}},{"Command":{"DisplayName":"Brake operation","Ref":"Brake Operation","Parameters":[{"Parameter":{"DisplayName":"Command","Ref":"Command","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::BrakeCommand"}}}]}},{"Command":{"DisplayName":"Halt","Ref":"Halt","Parameters":[{"Parameter":{"DisplayName":"Deceleration","Ref":"Deceleration","DefaultValue":"10","EU":"mm/s²"}}]}}]}},{"Group":{"DisplayName":"Load simulation","Childs":[{"Command":{"DisplayName":"Load simulation command","Ref":"Load Simulation Command","Parameters":[{"Parameter":{"DisplayName":"Command","Ref":"Command","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::SimulationCommand"}}}]}},{"Command":{"DisplayName":"Load simulation set params auto","Ref":"Load Simulation Set Params Auto","Parameters":[{"Parameter":{"DisplayName":"Additive load ParID","Ref":"Additive Load ParId","DefaultValue":"0"}}]}},{"Command":{"DisplayName":"Load simulation set params one mass","Ref":"Load Simulation Set Params One Mass","Parameters":[{"Parameter":{"DisplayName":"Additive load ParID","Ref":"Additive Load ParId","DefaultValue":"0"}},{"Parameter":{"DisplayName":"Inertia","Ref":"Inertia","DefaultValue":"0.0","EU":"kg·m²"}},{"Parameter":{"DisplayName":"Static friction","Ref":"Static Friction","DefaultValue":"0.0","EU":"N·m"}},{"Parameter":{"DisplayName":"Viscous friction","Ref":"Viscous Friction","DefaultValue":"0.0","EU":"N·m·s"}}]}},{"Command":{"DisplayName":"Load simulation set params two masses","Ref":"Load Simulation Set Params Two Masses","Parameters":[{"Parameter":{"DisplayName":"Additive load ParID","Ref":"Additive Load ParId","DefaultValue":"0"}},{"Parameter":{"DisplayName":"Inertia M1","Ref":"Inertia M1","DefaultValue":"0.0","EU":"kg·m²"}},{"Parameter":{"DisplayName":"Static friction M1","Ref":"Static Friction M1","DefaultValue":"0.0","EU":"N·m"}},{"Parameter":{"DisplayName":"Viscous friction M1","Ref":"Viscous Friction M1","DefaultValue":"0.0","EU":"N·m·s"}},{"Parameter":{"DisplayName":"Inertia M2","Ref":"Inertia M2","DefaultValue":"0.0","EU":"kg·m²"}},{"Parameter":{"DisplayName":"Static friction M2","Ref":"Static Friction M2","DefaultValue":"0.0","EU":"N·m"}},{"Parameter":{"DisplayName":"Viscous friction M2","Ref":"Viscous Friction M2","DefaultValue":"0.0","EU":"N·m·s"}},{"Parameter":{"DisplayName":"Stiffness","Ref":"Stiffness","DefaultValue":"0.0","EU":"N·m/rad"}},{"Parameter":{"DisplayName":"Damping","Ref":"Damping","DefaultValue":"0.0","EU":"N·m·s/rad"}}]}}]}},{"Group":{"DisplayName":"AutoTune","Childs":[{"Command":{"DisplayName":"Autotune position controller","Ref":"Auto Tune Position Controller","Parameters":[{"Parameter":{"DisplayName":"Orientation","Ref":"Orientation","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningOrientation"}}},{"Parameter":{"DisplayName":"Max current percent","Ref":"Max Current Percent","DefaultValue":"50","EU":"%"}},{"Parameter":{"DisplayName":"Max distance","Ref":"Max Distance","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Max position error","Ref":"Max Position Error","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Operating point","Ref":"Operating Point","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningOperationPoint"}}},{"Parameter":{"DisplayName":"Velocity","Ref":"Velocity","DefaultValue":"0.0","EU":"mm/s"}},{"Parameter":{"DisplayName":"Acceleration","Ref":"Acceleration","DefaultValue":"0.0","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Max proportional gain","Ref":"Max Proportional Gain","DefaultValue":"2000.0","EU":"As"}},{"Parameter":{"DisplayName":"Proportional gain percent","Ref":"Proportional Gain Percent","DefaultValue":"100.0","EU":"%"}},{"Parameter":{"DisplayName":"Signal type","Ref":"Signal Type","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningExcitationSignal"}}},{"Parameter":{"DisplayName":"Signal order","Ref":"Signal Order","DefaultValue":"9"}},{"Parameter":{"DisplayName":"Delay time","Ref":"Delay Time","DefaultValue":"0.0","EU":"s"}},{"Parameter":{"DisplayName":"Signal start frequency","Ref":"Signal Start Frequency","DefaultValue":"0.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Signal stop frequency","Ref":"Signal Stop Frequency","DefaultValue":"0.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Signal time","Ref":"Signal Time","DefaultValue":"0.0","EU":"s"}}]}},{"Command":{"DisplayName":"Autotune speed controller","Ref":"Auto Tune Speed Controller","Parameters":[{"Parameter":{"DisplayName":"Orientation","Ref":"Orientation","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningOrientation"}}},{"Parameter":{"DisplayName":"Max current percent","Ref":"Max Current Percent","DefaultValue":"50","EU":"%"}},{"Parameter":{"DisplayName":"Max distance","Ref":"Max Distance","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Max position error","Ref":"Max Position Error","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Loop filter1 mode","Ref":"Loop Filter1 Mode","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningLoopFilterMode"}}},{"Parameter":{"DisplayName":"Filter time mode","Ref":"Filter Time Mode","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningFilterTimeMode"}}},{"Parameter":{"DisplayName":"Integration time mode","Ref":"Integration Time Mode","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningIntegrationTimeMode"}}},{"Parameter":{"DisplayName":"Operating point","Ref":"Operating Point","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningOperationPoint"}}},{"Parameter":{"DisplayName":"Velocity","Ref":"Velocity","DefaultValue":"0.0","EU":"mm/s"}},{"Parameter":{"DisplayName":"Acceleration","Ref":"Acceleration","DefaultValue":"0.0","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Max proportional gain","Ref":"Max Proportional Gain","DefaultValue":"2000.0","EU":"As"}},{"Parameter":{"DisplayName":"Proportional gain percent","Ref":"Proportional Gain Percent","DefaultValue":"100.0","EU":"%"}},{"Parameter":{"DisplayName":"Resonance factor","Ref":"Resonance Factor","DefaultValue":"2.0"}},{"Parameter":{"DisplayName":"Inertia estimation lower frequency","Ref":"Inertia Estimation Lower Frequency","DefaultValue":"10.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Inertia estimation upper frequency","Ref":"Inertia Estimation Upper Frequency","DefaultValue":"40.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Signal type","Ref":"Signal Type","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningExcitationSignal"}}},{"Parameter":{"DisplayName":"Signal order","Ref":"Signal Order","DefaultValue":"9"}},{"Parameter":{"DisplayName":"Delay time","Ref":"Delay Time","DefaultValue":"0.0","EU":"s"}},{"Parameter":{"DisplayName":"Signal start frequency","Ref":"Signal Start Frequency","DefaultValue":"0.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Signal stop frequency","Ref":"Signal Stop Frequency","DefaultValue":"0.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Signal time","Ref":"Signal Time","DefaultValue":"0.0","EU":"s"}}]}},{"Command":{"DisplayName":"Autotune feed forward","Ref":"Auto Tune Feed Forward","Parameters":[{"Parameter":{"DisplayName":"Direction","Ref":"Direction","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::Direction"}}},{"Parameter":{"DisplayName":"Orientation","Ref":"Orientation","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningOrientation"}}},{"Parameter":{"DisplayName":"Max distance","Ref":"Max Distance","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Max position error","Ref":"Max Position Error","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Velocity","Ref":"Velocity","DefaultValue":"0.0","EU":"mm/s"}},{"Parameter":{"DisplayName":"Acceleration","Ref":"Acceleration","DefaultValue":"0.0","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Max current percentage","Ref":"Max Current Percentage","DefaultValue":"50","EU":"%"}},{"Parameter":{"DisplayName":"Max velocity percentage","Ref":"Max Velocity Percentage","DefaultValue":"50","EU":"%"}},{"Parameter":{"DisplayName":"Signal type","Ref":"Signal Type","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningExcitationSignal"}}},{"Parameter":{"DisplayName":"Signal order","Ref":"Signal Order","DefaultValue":"9"}},{"Parameter":{"DisplayName":"Delay time","Ref":"Delay Time","DefaultValue":"0.0","EU":"s"}},{"Parameter":{"DisplayName":"Signal start frequency","Ref":"Signal Start Frequency","DefaultValue":"0.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Signal stop frequency","Ref":"Signal Stop Frequency","DefaultValue":"0.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Signal time","Ref":"Signal Time","DefaultValue":"0.0","EU":"s"}}]}},{"Command":{"DisplayName":"Autotune loop filters","Ref":"Auto Tune Loop Filters","Parameters":[{"Parameter":{"DisplayName":"Loop filter 1 mode","Ref":"Loop Filter1 Mode","DefaultValue":"1","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningLoopFilterMode"}}},{"Parameter":{"DisplayName":"Loop filter 2 mode","Ref":"Loop Filter2 Mode","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningLoopFilterMode"}}},{"Parameter":{"DisplayName":"Loop filter 3 mode","Ref":"Loop Filter3 Mode","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningLoopFilterMode"}}},{"Parameter":{"DisplayName":"Orientation","Ref":"Orientation","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningOrientation"}}},{"Parameter":{"DisplayName":"Max current percent","Ref":"Max Current Percent","DefaultValue":"50","EU":"%"}},{"Parameter":{"DisplayName":"Max distance","Ref":"Max Distance","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Max position error","Ref":"Max Position Error","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Operating point","Ref":"Operating Point","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningOperationPoint"}}},{"Parameter":{"DisplayName":"Velocity","Ref":"Velocity","DefaultValue":"0.0","EU":"mm/s"}},{"Parameter":{"DisplayName":"Acceleration","Ref":"Acceleration","DefaultValue":"0.0","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Resonance factor","Ref":"Resonance Factor","DefaultValue":"2"}},{"Parameter":{"DisplayName":"Signal type","Ref":"Signal Type","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningExcitationSignal"}}},{"Parameter":{"DisplayName":"Signal order","Ref":"Signal Order","DefaultValue":"9"}},{"Parameter":{"DisplayName":"Delay time","Ref":"Delay Time","DefaultValue":"0.0","EU":"s"}},{"Parameter":{"DisplayName":"Signal start frequency","Ref":"Signal Start Frequency","DefaultValue":"0.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Signal stop frequency","Ref":"Signal Stop Frequency","DefaultValue":"0.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Signal time","Ref":"Signal Time","DefaultValue":"0.0","EU":"s"}}]}},{"Command":{"DisplayName":"Autotune test","Ref":"Auto Tune Test","Parameters":[{"Parameter":{"DisplayName":"Mode","Ref":"Mode","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningTestMode"}}},{"Parameter":{"DisplayName":"Orientation","Ref":"Orientation","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningOrientation"}}},{"Parameter":{"DisplayName":"Max current percent","Ref":"Max Current Percent","DefaultValue":"50","EU":"%"}},{"Parameter":{"DisplayName":"Max distance","Ref":"Max Distance","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Max position error","Ref":"Max Position Error","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Signal type","Ref":"Signal Type","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningExcitationSignal"}}},{"Parameter":{"DisplayName":"Signal order","Ref":"Signal Order","DefaultValue":"9"}},{"Parameter":{"DisplayName":"Delay time","Ref":"Delay Time","DefaultValue":"0.0","EU":"s"}},{"Parameter":{"DisplayName":"Signal start frequency","Ref":"Signal Start Frequency","DefaultValue":"0.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Signal stop frequency","Ref":"Signal Stop Frequency","DefaultValue":"0.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Signal time","Ref":"Signal Time","DefaultValue":"0.0","EU":"s"}}]}}]}}]}}'
                    // }
                    metaData[metaParameter.browseName] = JSON.parse(metaParameter.value);
                    //Just for prototype: watchableIcons
                    //var watchstateMetaData = '{"WatchablesStatesStructure":{"Scope":"mapp/Motion/Axis/AcpAxis","Childs":[{"Group":{"DisplayName":"Main","Childs":[{"WatchableState":{"Ref":"Axis_state","WatchableVariablesMapping":[["Communication Ready","Communication"],["PlcOpen State","PLC_State"]],"IconExpression":"Communication == false ? 1 : PLC_State == 1 ? 2 : PLC_State == 2 ? 3 : PLC_State == 3 or PLC_State == 4 or PLC_State == 5 ? 4 : PLC_State == 6 ? 5 : PLC_State == 7 ? 6 : 0","Icon":{"0":{"ImageName":"GearDisabled","Tooltip":"Axis is disabled"},"1":{"ImageName":"CommunicationNotReady","Tooltip":"Communication is not ready"},"2":{"ImageName":"GearEnabled","Tooltip":"Axis is standstill"},"3":{"ImageName":"GeneralError","Tooltip":"Axis is in error state"},"4":{"ImageName":"GearRotating","Tooltip":"Axis is moving"},"5":{"ImageName":"GearsRotating","Tooltip":"Axis is synchronized"}}}},{"WatchableState":{"Ref":"Controller_state","WatchableVariablesMapping":[["Is Powered","Is_Powered"]],"IconExpression":"Is_Powered == true ? 1 : 0","Icon":{"0":{"ImageName":"Off","Tooltip":"Controller is switched off"},"1":{"ImageName":"On","Tooltip":"Controller is switched on"}}}},{"WatchableState":{"Ref":"Axis_reference_state","WatchableVariablesMapping":[["Is Homed","Is_Homed"],["PlcOpen State","PLC_State"]],"IconExpression":"Is_Homed == true ? 1 : PLC_State == 7 ? 2: 0","Icon":{"0":{"ImageName":"UnkownPosition","Tooltip":"Axis is not homed"},"1":{"ImageName":"KnownPosition","Tooltip":"Axis is homed"},"2":{"ImageName":"FindingPosition","Tooltip":"Axis is homing"}}}}]}}]}}'; 
                    //metaData['MetaConfigWatchablesStates'] = JSON.parse(watchstateMetaData);
                    //Just for prototype: quickCommands
                    // var quickMethod = ' {"QuickCommandsStructure":{"Scope":"mapp/Motion/Axis/AcpAxis","Childs":[{"Group":{"DisplayName":"Main","Childs":[{"QuickCommand":{"Ref":"Power On","Tooltip":"Power on","ImageName":"On"}},{"QuickCommand":{"Ref":"Power Off","Tooltip":"Power off","ImageName":"Off"}},{"QuickCommand":{"Ref":"Abort Command","Tooltip":"Abort command","ImageName":"Stop"}},{"QuickCommand":{"Ref":"Reset","Tooltip":"Reset","ImageName":"Reset"}}]}}]}} '
                    // metaData['MetaConfigQuickCommands'] = JSON.parse(quickMethod);
                });
                // update specific parameter types in meta data object
                mappCockpitCommonInfoProvider_1.MappCockpitCommonInfoProvider.initializeMetaData(metaData);
            }
            catch (e) {
                throw new Error("MappCockpitComponentDataModel.browseMetaData: could not parse meta data: " + e.message);
            }
            return metaData;
        };
        MappCockpitComponentDataModel.prototype.executeComponentMethod = function (componentMethod) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._mappCockpitDiagnosticProvider.executeComponentMethod(componentMethod)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * called after component parameters have been updated
         *
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        // Obsolete because components can't be updated at runtime
        /*onComponentParametersUpdated(component: MappCockpitComponent, componentParameters: MappCockpitComponentParameter[]): any {
            this.eventComponentParametersUpdated.raise(this, new EventModelChangedArgs(this, ModelChangeType.updateTarget, "updatedComponentParameters", componentParameters));
        }*/
        /**
         * called after component methods have been updated
         *
         * @param {MappCockpitComponent} component
         * @param {MappCockpitComponentParameter[]} componentMethods
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        // Obsolete because components can't be updated at runtime
        /*onComponentMethodsUpdated(component: MappCockpitComponent, componentMethods: MappCockpitComponentMethod[]): any {
            this.eventComponentMethodsUpdated.raise(this, new EventModelChangedArgs(this, ModelChangeType.updateTarget, "updatedComponentMethods", componentMethods));
        }*/
        /**
         * reads  and updates the parameter values of the specified parameter list
         *
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.readParameterValues = function (componentParameters) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._mappCockpitDiagnosticProvider.readParameterValues(componentParameters)];
                        case 1:
                            _a.sent();
                            this.onParameterValuesUpdated(componentParameters);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * observes the parameters for value changes
         *
         * @param {IObserver} observer
         * @param {MappCockpitComponentItem[]} observableDataModelItems
         * @returns {Promise<any>}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.observeDataModelItems = function (observer, observableDataModelItems) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._mappCockpitDiagnosticProvider.observeComponentModelItems(observer, observableDataModelItems)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Unobserves the passed parameters.
         *
         * @param {*} observer
         * @param {MappCockpitComponentParameter[]} observableParameters
         * @param {boolean} suspend
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.unobserveComponentModelItems = function (observer, observableParameters, suspend) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._mappCockpitDiagnosticProvider.unobserveComponentModelItems(observer, observableParameters, suspend)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * handles observable changed notifications
         *
         * @private
         * @param {EventObservedItemsChangedArgs} eventArgs
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.handleObservableItemsChanged = function (eventArgs) {
            if (eventArgs.observer instanceof dataModelBase_1.DataModelBase) {
                // create model changed args
                var modelItemsChangedArgs = new dataModelInterface_1.EventModelChangedArgs(eventArgs.observer, dataModelInterface_1.ModelChangeType.updateTarget, "changed observables", eventArgs.changedItems);
                // notify observers from changing model items
                eventArgs.observer.onModelItemsChanged(eventArgs.observer, modelItemsChangedArgs);
            }
        };
        /**
         * notify from updating the specified parameters values
         *
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.onParameterValuesUpdated = function (componentParameters) {
            this.eventParameterValuesUpdated.raise(this, componentParameters);
        };
        /**
         * Called when the model has been successfully connected
         *
         * @private
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.onModelConnected = function () {
            this._modelConnected = true;
            this.onModelConnectionChanged(this._modelConnected);
        };
        /**
         * Called when the model has lost the connection to the target
         *
         * @private
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.onModelDisconnected = function () {
            // notify connection change
            this._modelConnected = false;
            this.onModelConnectionChanged(this._modelConnected);
        };
        /**
         * Observes the connection if it is still alive
         *
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.startObserveModelConnection = function () {
            var _this = this;
            // initially notify the successfull connection
            this.onModelConnected();
            // establish a timer for watching the connection
            if (this._connectionObservationTimerId == -1) {
                this._connectionObservationTimerId = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.observeModelConnection()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }, this._connectionObservationInterval);
            }
        };
        /**
         * Obsereves the model connection
         *
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.observeModelConnection = function () {
            return __awaiter(this, void 0, void 0, function () {
                var isConnected;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._mappCockpitDiagnosticProvider.checkTargetConnection()];
                        case 1:
                            isConnected = _a.sent();
                            if (isConnected) {
                                if (!this._modelConnected) {
                                    this.onModelConnected();
                                }
                            }
                            else {
                                if (this._modelConnected) {
                                    this.onModelDisconnected();
                                }
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Called when the model connection has changed
         *
         * @param {boolean} connected
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.onModelConnectionChanged = function (connected) {
            this.eventModelConnectionChanged.raise(this, connected);
        };
        /**
         * Provides command for changing the user to be logged in
         *
         * @returns {ICommandExecutionDelegate<any,any>}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.executeCommandChangeUser = function () {
            var _this = this;
            return function (userInfo, commandResponse) { return __awaiter(_this, void 0, void 0, function () {
                var _a, error_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            // update the user roles
                            _a = this._userRoles;
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.changeUser(userInfo)];
                        case 1:
                            // update the user roles
                            _a.value = (_b.sent());
                            commandResponse.executed(this._userRoles);
                            return [3 /*break*/, 3];
                        case 2:
                            error_2 = _b.sent();
                            commandResponse.rejected(error_2);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
        };
        return MappCockpitComponentDataModel;
    }());
    exports.MappCockpitComponentDataModel = MappCockpitComponentDataModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50c0RhdGFNb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL29ubGluZS9jb21wb25lbnRzRGF0YU1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFnQkE7UUFBbUMsd0NBQW9EO1FBQXZGOztRQUF5RixDQUFDO1FBQUQsMkJBQUM7SUFBRCxDQUFDLEFBQTFGLENBQW1DLG1CQUFVLEdBQTZDO0lBQUEsQ0FBQztJQUMzRjtRQUFxQywwQ0FBaUU7UUFBdEc7O1FBQXdHLENBQUM7UUFBRCw2QkFBQztJQUFELENBQUMsQUFBekcsQ0FBcUMsbUJBQVUsR0FBMEQ7SUFBQSxDQUFDO0lBQzFHO1FBQThDLG1EQUFnRTtRQUE5Rzs7UUFBZ0gsQ0FBQztRQUFELHNDQUFDO0lBQUQsQ0FBQyxBQUFqSCxDQUE4QyxtQkFBVSxHQUF5RDtJQUFBLENBQUM7SUFDbEg7UUFBMkMsZ0RBQWdFO1FBQTNHOztRQUE2RyxDQUFDO1FBQUQsbUNBQUM7SUFBRCxDQUFDLEFBQTlHLENBQTJDLG1CQUFVLEdBQXlEO0lBQUEsQ0FBQztJQUMvRztRQUEwQywrQ0FBK0U7UUFBekg7O1FBQTJILENBQUM7UUFBRCxrQ0FBQztJQUFELENBQUMsQUFBNUgsQ0FBMEMsbUJBQVUsR0FBd0U7SUFBQSxDQUFDO0lBRTdIO1FBQW1DLHdDQUFrRDtRQUFyRjs7UUFBc0YsQ0FBQztRQUFELDJCQUFDO0lBQUQsQ0FBQyxBQUF2RixDQUFtQyxtQkFBVSxHQUEwQztJQUFBLENBQUM7SUFFeEY7Ozs7T0FJRztJQUNIO1FBd0NJOzs7V0FHRztRQUNIO1lBQUEsaUJBb0JDO1lBM0NELDJDQUEyQztZQUNuQyxzQkFBaUIsR0FBMEMsbUJBQVEsQ0FBQyxNQUFNLENBQThCLEVBQUUsQ0FBQyxDQUFDO1lBQzVHLDBCQUFxQixHQUEwQyxt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WUFBQSxpQkFVQztZQVRHLE9BQU8sVUFBTyxRQUFZLEVBQUUsZUFBdUQ7Ozs7Ozs0QkFFM0Usd0JBQXdCOzRCQUN4QixLQUFBLElBQUksQ0FBQyxVQUFVLENBQUE7NEJBQVUscUJBQU0sSUFBSSxDQUFDLDhCQUE4QixDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBQTs7NEJBRHZGLHdCQUF3Qjs0QkFDeEIsR0FBZ0IsS0FBSyxJQUFJLFNBQTBFLENBQUEsQ0FBQzs0QkFDcEcsZUFBZSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Ozs7NEJBRTFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsT0FBSyxDQUFDLENBQUM7Ozs7O2lCQUV2QyxDQUFDO1FBQ04sQ0FBQztRQUNMLG9DQUFDO0lBQUQsQ0FBQyxBQXpvQkQsSUF5b0JDO0lBRVEsc0VBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIgfSBmcm9tIFwiLi4vZGlhZ25vc3RpY3MvbWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnQsIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLCBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCwgTWFwcENvY2twaXRDb21wb25lbnRJdGVtLCBNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlciB9IGZyb20gXCIuL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0VHJhY2VQcm92aWRlciB9IGZyb20gXCIuLi9kaWFnbm9zdGljcy90cmFjZS9tYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gJy4uLy4uL2ZyYW1ld29yay9ldmVudHMnO1xyXG5pbXBvcnQgeyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MsIE1vZGVsQ2hhbmdlVHlwZSB9IGZyb20gXCIuLi9kYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgRXZlbnRPYnNlcnZlZEl0ZW1zQ2hhbmdlZEFyZ3MgfSBmcm9tIFwiLi4vZGlhZ25vc3RpY3MvbWFwcENvY2twaXREaWFnbm9zdGljTW9uaXRvcmluZ1Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7IERhdGFNb2RlbEJhc2UgfSBmcm9tIFwiLi4vZGF0YU1vZGVsQmFzZVwiO1xyXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvcHJvcGVydHlcIjtcclxuaW1wb3J0IHsgQ29tbWFuZCwgSUNvbW1hbmRFeGVjdXRpb25SZXNwb25zZURlbGVnYXRlLCBJQ29tbWFuZEV4ZWN1dGlvbkRlbGVnYXRlIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9jb21tYW5kXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyIH0gZnJvbSBcIi4uL2RpYWdub3N0aWNzL21hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFRyYWNlRGF0YSB9IGZyb20gXCIuLi9kaWFnbm9zdGljcy90cmFjZS90cmFjZURhdGFSZWFkZXJcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLCBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8gfSBmcm9tIFwiLi9tYXBwQ29ja3BpdENvbXBvbmVudFJlZmxlY3Rpb25cIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb25maWd1cmF0aW9uIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9tYXBwQ29ja3BpdENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBJT2JzZXJ2ZXIgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2ludGVyZmFjZXMvb2JzZXJ2ZXJcIjtcclxuXHJcblxyXG5jbGFzcyBFdmVudFRyYWNlRGF0YUxvYWRlZCBleHRlbmRzIFR5cGVkRXZlbnQ8TWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwsIFRyYWNlRGF0YT57IH07XHJcbmNsYXNzIEV2ZW50Q29tcG9uZW50c1VwZGF0ZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsLCBNYXBwQ29ja3BpdENvbXBvbmVudFtdPnsgfTtcclxuY2xhc3MgRXZlbnRDb21wb25lbnRQYXJhbWV0ZXJzVXBkYXRlZCBleHRlbmRzIFR5cGVkRXZlbnQ8TWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwsIEV2ZW50TW9kZWxDaGFuZ2VkQXJncz57IH07XHJcbmNsYXNzIEV2ZW50Q29tcG9uZW50TWV0aG9kc1VwZGF0ZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsLCBFdmVudE1vZGVsQ2hhbmdlZEFyZ3M+eyB9O1xyXG5jbGFzcyBFdmVudFBhcmFtZXRlclZhbHVlc1VwZGF0ZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsLCBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4+eyB9O1xyXG5cclxuY2xhc3MgRXZlbnRNb2RlbENvbm5lY3Rpb24gZXh0ZW5kcyBUeXBlZEV2ZW50PE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsLCBib29sZWFuPnt9O1xyXG5cclxuLyoqXHJcbiAqIFRoZSBjbGFzcyBpbXBsZW1lbnRzIHRoZSBtYWluIGRhdGEgbW9kZWwgZm9yIG1hcHAgQ29ja3BpdC4gXHJcbiAqXHJcbiAqIEBjbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gKi9cclxuY2xhc3MgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwge1xyXG5cclxuICAgIHByb3RlY3RlZCBfbWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXI6IE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyO1xyXG5cclxuICAgIHByb3RlY3RlZCBfY29tcG9uZW50czogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnQ+O1xyXG5cclxuICAgIC8vIERlY2xhcmUgZXZlbnQgdHJhY2UgZGF0YSBsb2FkZWRcclxuICAgIHB1YmxpYyBldmVudFRyYWNlRGF0YUxvYWRlZDogRXZlbnRUcmFjZURhdGFMb2FkZWQ7XHJcblxyXG4gICAgLy8gRGVjbGFyZSBldmVudCB0cmFjZSBkYXRhIGxvYWRlZFxyXG4gICAgcHVibGljIGV2ZW50Q29tcG9uZW50c1VwZGF0ZWQ6IEV2ZW50Q29tcG9uZW50c1VwZGF0ZWQ7XHJcblxyXG4gICAgcHVibGljIGV2ZW50Q29tcG9uZW50UGFyYW1ldGVyc1VwZGF0ZWQ6IEV2ZW50Q29tcG9uZW50UGFyYW1ldGVyc1VwZGF0ZWQ7XHJcblxyXG4gICAgcHVibGljIGV2ZW50Q29tcG9uZW50TWV0aG9kc1VwZGF0ZWQ6IEV2ZW50Q29tcG9uZW50TWV0aG9kc1VwZGF0ZWQ7XHJcblxyXG4gICAgcHVibGljIGV2ZW50UGFyYW1ldGVyVmFsdWVzVXBkYXRlZDogRXZlbnRQYXJhbWV0ZXJWYWx1ZXNVcGRhdGVkO1xyXG5cclxuICAgIC8vIERlY2xhcmUgZXZlbnQgZm9yIG1vZGVsIGNvbm5lY3Rpb24gY2hhbmdlXHJcbiAgICBwdWJsaWMgZXZlbnRNb2RlbENvbm5lY3Rpb25DaGFuZ2VkOiBFdmVudE1vZGVsQ29ubmVjdGlvbjtcclxuXHJcbiAgICAvLyBDcmVhdGUgYSBkYXRhIHNvdXJjZSBmb3IgdGhlIGNvbXBvbmVudHMuXHJcbiAgICBwcml2YXRlIF9jb21wb25lbnRzU291cmNlOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudD4+ID0gUHJvcGVydHkuY3JlYXRlPEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50Pj4oW10pO1xyXG4gICAgcHJpdmF0ZSBfdXNlckNvbXBvbmVudHNTb3VyY2U6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50Pj4gPSBQcm9wZXJ0eS5jcmVhdGU8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnQ+PihbXSwoZGF0YUxpbmspPT57dGhpcy5yZXF1ZXN0UmVhZFVzZXJDb21wb25lbnRzKGRhdGFMaW5rKTt9KTtcclxuXHJcbiAgICAvLyBDb21tYW5kIGZvciBjaGFuZ2luZyB0aGUgdXNlclxyXG4gICAgcHJpdmF0ZSBfY29tbWFuZENoYW5nZVVzZXIhOiBDb21tYW5kPHt9LCB7fT47XHJcbiAgICBcclxuICAgIC8vIEhvbGRzIHVzZXIgcm9sZXNcclxuICAgIHByaXZhdGUgX3VzZXJSb2xlczogUHJvcGVydHk8c3RyaW5nW10+ID0gIFByb3BlcnR5LmNyZWF0ZTxzdHJpbmdbXT4oW10pO1xyXG5cclxuICAgIC8vIHNwZWNpZmllcyBpbnRlcnZhbCBmb3IgY29ubmVjdGlvbiBvYnNlcnZhdGlvblxyXG4gICAgcHJpdmF0ZSAgX2Nvbm5lY3Rpb25PYnNlcnZhdGlvbkludGVydmFsOiBudW1iZXIgPSAxMDAwO1xyXG4gICAgLy8gc3BlY2VmaWVzIHRoZSBjb25uZWN0aW9uIG9ic2VydmF0aW9uIGlkXHJcbiAgICBwcml2YXRlIF9jb25uZWN0aW9uT2JzZXJ2YXRpb25UaW1lcklkOiBudW1iZXIgPSAtMTtcclxuICAgIC8vIGhvbGRzIHRoZSBjdXJyZW50IG1vZGVsIGNvbm5lY3Rpb24gc3RhdGVcclxuICAgIHByaXZhdGUgX21vZGVsQ29ubmVjdGVkID0gZmFsc2U7XHJcblxyXG4gICAgcHJpdmF0ZSBfb2JzZXJ2YWJsZXNDaGFuZ2VkSGFuZGxlciA9IChzZW5kZXIsIGV2ZW50QXJncykgPT4geyB0aGlzLmhhbmRsZU9ic2VydmFibGVJdGVtc0NoYW5nZWQoZXZlbnRBcmdzKTsgfTsgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsLlxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgICAgICAvLyBJbml0aWFsaXplIG1lbWJlcnNcclxuICAgICAgICB0aGlzLl9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlciA9IG5ldyBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlcih0aGlzKTtcclxuICAgICAgICB0aGlzLl9jb21wb25lbnRzID0gW107XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBldmVudCBzb3VyY2VzXHJcbiAgICAgICAgdGhpcy5ldmVudFRyYWNlRGF0YUxvYWRlZCA9IG5ldyBFdmVudFRyYWNlRGF0YUxvYWRlZCgpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRDb21wb25lbnRzVXBkYXRlZCA9IG5ldyBFdmVudENvbXBvbmVudHNVcGRhdGVkKCk7XHJcbiAgICAgICAgdGhpcy5ldmVudENvbXBvbmVudFBhcmFtZXRlcnNVcGRhdGVkID0gbmV3IEV2ZW50Q29tcG9uZW50UGFyYW1ldGVyc1VwZGF0ZWQoKTtcclxuICAgICAgICB0aGlzLmV2ZW50UGFyYW1ldGVyVmFsdWVzVXBkYXRlZCA9IG5ldyBFdmVudFBhcmFtZXRlclZhbHVlc1VwZGF0ZWQoKTtcclxuICAgICAgICB0aGlzLmV2ZW50Q29tcG9uZW50TWV0aG9kc1VwZGF0ZWQgPSBuZXcgRXZlbnRDb21wb25lbnRNZXRob2RzVXBkYXRlZCgpO1xyXG5cclxuICAgICAgICB0aGlzLmV2ZW50TW9kZWxDb25uZWN0aW9uQ2hhbmdlZCA9IG5ldyBFdmVudE1vZGVsQ29ubmVjdGlvbigpO1xyXG5cclxuICAgICAgICAvLyBmb3J3YXJkIHRoZSBldmVudFxyXG4gICAgICAgIHRoaXMuX21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyLmV2ZW50T2JzZXJ2YWJsZXNDaGFuZ2VkLmF0dGFjaCh0aGlzLl9vYnNlcnZhYmxlc0NoYW5nZWRIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGFuZCBpbml0aWFsaXplIGNvbW1hbmRzXHJcbiAgICAgICAgdGhpcy5jcmVhdGVDb21tYW5kcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZSB0aGUgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgZGlzcG9zZSgpe1xyXG4gICAgICAgIC8vIGRldGFjaCBldmVudHNcclxuICAgICAgICB0aGlzLl9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlci5ldmVudE9ic2VydmFibGVzQ2hhbmdlZC5kZXRhY2godGhpcy5fb2JzZXJ2YWJsZXNDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5fbWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBleHBvc2VkIGNvbW1hbmRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZUNvbW1hbmRzKCkge1xyXG4gICAgICAgIHRoaXMuX2NvbW1hbmRDaGFuZ2VVc2VyID0gQ29tbWFuZC5jcmVhdGU8e30se30+KHRoaXMsIHRoaXMuZXhlY3V0ZUNvbW1hbmRDaGFuZ2VVc2VyKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaW5pdGlhbGl6ZXMgdGhlIGRhdGEgbW9kZWxcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZSgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSB0cmFjZSBwcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge01hcHBDb2NrcGl0VHJhY2VQcm92aWRlcn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHRyYWNlUHJvdmlkZXIoKTogTWFwcENvY2twaXRUcmFjZVByb3ZpZGVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIudHJhY2VQcm92aWRlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvbm5lY3RzIHRoZSBkYXRhIG1vZGVsIHRvIHRoZSBkYXRhIHNvdXJjZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGNvbm5lY3QoKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuXHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyLmJlZ2luU2Vzc2lvbigpO1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmJyb3dzZUNvbXBvbmVudHMoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFmdGVyIGNvbm5lY3RpbiBzdWNjZXNzZnVsbHlcclxuICAgICAgICAgICAgdGhpcy5zdGFydE9ic2VydmVNb2RlbENvbm5lY3Rpb24oKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbW1hbmRDaGFuZ2VVc2VyKCk6IENvbW1hbmQ8e30sIHt9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbW1hbmRDaGFuZ2VVc2VyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgYXZhaWxhYmxlIG1hcHAgY29tcG9uZW50c1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge0FycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50Pn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGNvbXBvbmVudHMoKTogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29tcG9uZW50cztcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGdldCBjb21wb25lbnRzU291cmNlKCkgOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudD4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29tcG9uZW50c1NvdXJjZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHVzZXJDb21wb25lbnRzU291cmNlKCkgOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudD4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdXNlckNvbXBvbmVudHNTb3VyY2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgY3VycmVudCB1c2VyIHJvbGVzXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nW119XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB1c2VyUm9sZXMoKSA6IFByb3BlcnR5PHN0cmluZ1tdPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzZXJSb2xlcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB3cml0ZUFjY2VzcygpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICBsZXQgbW9kZWxIYXNXcml0ZUFjY2VzcyA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLnVzZXJSb2xlcy52YWx1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgd3JpdGUgYWNjZXNzIHJpZ2h0IGFjY29yZGluZyB0aGUgY3VycmVudCByb2xlXHJcbiAgICAgICAgICAgIG1vZGVsSGFzV3JpdGVBY2Nlc3MgPSB0aGlzLnVzZXJSb2xlcy52YWx1ZS5zb21lKCh1c2VyUm9sZSk9PnsgcmV0dXJuIHVzZXJSb2xlID09PSBNYXBwQ29ja3BpdENvbmZpZ3VyYXRpb24ud3JpdGVBY2Nlc3NSb2xlICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1vZGVsSGFzV3JpdGVBY2Nlc3M7XHJcbiAgICB9ICAgXHJcbiAgXHJcbiAgICAvKipcclxuICAgICAqIENsZWFycyB0aGUgZGF0YSBtb2RlbFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudHMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJyb3dzZXMgYWxsIGF2YWlsYWJsZSByZXNvdXJjZXMgYW5kIHVwZGF0ZXMgdGhlIG1vZGVsXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgYXN5bmMgYnJvd3NlQ29tcG9uZW50cygpOiBQcm9taXNlPE1hcHBDb2NrcGl0Q29tcG9uZW50W10+IHtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIGNvbXBvbmVudHMgaW4gbW9kZWxcclxuICAgICAgICB0aGlzLl9jb21wb25lbnRzID0gYXdhaXQgdGhpcy5fbWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIuY29tcG9uZW50UHJvdmlkZXIuYnJvd3NlQ29tcG9uZW50cygpO1xyXG5cclxuICAgICAgICBhd2FpdCB0aGlzLnVwZGF0ZUNvbXBvbmVudE1ldGFEYXRhKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQ29ubmVjdCB0byBtb2RlbFxyXG4gICAgICAgIHRoaXMuY29ubmVjdENvbXBvbmVudHNUb01vZGVsKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY29tcG9uZW50c1NvdXJjZS52YWx1ZSA9IHRoaXMuX2NvbXBvbmVudHM7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wb25lbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29ubmVjdHMgdGhlIGNvbXBvbmVudHMgdG8gdGhlIG1hb24gZGF0YSBtb2RlbFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25uZWN0Q29tcG9uZW50c1RvTW9kZWwoKSB7XHJcbiAgICAgICAgdGhpcy5fY29tcG9uZW50cy5mb3JFYWNoKChjb21wb25lbnQpID0+IHsgKDxhbnk+Y29tcG9uZW50KS5tb2RlbCA9IHRoaXM7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgY29tcG9uZW50cyBtZXRhIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgdXBkYXRlQ29tcG9uZW50TWV0YURhdGEoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jb21wb25lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuYnJvd3NlTWV0YUluZm8odGhpcy5fY29tcG9uZW50c1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgdGhlIGF2YWlsYWJsZSB1c2VyIGNvbXBvbmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudFtdPn0gZGF0YUxpbmtcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPE1hcHBDb2NrcGl0Q29tcG9uZW50W10+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgcmVxdWVzdFJlYWRVc2VyQ29tcG9uZW50cyhkYXRhTGluazogUHJvcGVydHk8TWFwcENvY2twaXRDb21wb25lbnRbXT4pOiBQcm9taXNlPE1hcHBDb2NrcGl0Q29tcG9uZW50W10+IHtcclxuICAgICAgICBsZXQgY29tcG9uZW50czogTWFwcENvY2twaXRDb21wb25lbnRbXSA9IFtdO1xyXG5cclxuICAgICAgICB0cnkgeyAgICAgIFxyXG4gICAgICAgICAgICAvLyBmaWx0ZXIgY29tcG9uZW50cyB0byBiZSBleHBvc2VkIHRvIHRoZSB1c2VyXHJcbiAgICAgICAgICAgIGNvbXBvbmVudHMgPSB0aGlzLl9jb21wb25lbnRzLmZpbHRlcigoY29tcG9uZW50KSA9PiB7IHJldHVybiBjb21wb25lbnQubWV0YURhdGE7IH0pO1xyXG5cclxuICAgICAgICAgICAgY29tcG9uZW50cy5mb3JFYWNoKChjb21wb25lbnQpPT57IE1hcHBDb2NrcGl0Q29tcG9uZW50LnJlZ2lzdGVyVXNlckNvbXBvbmVudChjb21wb25lbnQpOyB9KTtcclxuXHJcbiAgICAgICAgICAgIGRhdGFMaW5rLnJlYWRSZXF1ZXN0RXhlY3V0ZWQoY29tcG9uZW50cyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIGRhdGFMaW5rLnJlYWRSZXF1ZXN0UmVqZWN0ZWQoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29tcG9uZW50cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGJyb3dzZXMgdGhlIG1ldGEgZGF0YSwgcGFyYW1ldGVycyBhbnMgbWV0aG9kcyBvZiBhIHNpbmdsZSBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudH0gbWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgYnJvd3NlQ29tcG9uZW50KG1hcHBDb2NrcGl0Q29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudCkge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuYnJvd3NlUGFyYW1ldGVycyhtYXBwQ29ja3BpdENvbXBvbmVudCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5icm93c2VNZXRob2RzKG1hcHBDb2NrcGl0Q29tcG9uZW50KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsLmJyb3dzZUNvbXBvbmVudDogJW9cIiwgbWFwcENvY2twaXRDb21wb25lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIGFmdGVyIGNvbXBvbmVudHMgdXBkYXRlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFtdfSBtYXBwQ29ja3BpdENvbXBvbmVudHNcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIG9uQ29tcG9uZW50c1VwZGF0ZWQobWFwcENvY2twaXRDb21wb25lbnRzOiBNYXBwQ29ja3BpdENvbXBvbmVudFtdKTogYW55IHtcclxuICAgICAgICB0aGlzLmV2ZW50Q29tcG9uZW50c1VwZGF0ZWQucmFpc2UodGhpcywgbWFwcENvY2twaXRDb21wb25lbnRzKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICAgKiBicm93c2VzIHRoZSBtZXRhIGluZm8gZm9yIGEgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudH0gbWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgYXN5bmMgYnJvd3NlTWV0YUluZm8obWFwcENvY2twaXRDb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50KTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBVcGRhdGUgY29tcG9uZW50cyBpbiBtb2RlbFxyXG4gICAgICAgICAgICBsZXQgbWV0YUluZm9SZWZlcmVuY2VzID0gYXdhaXQgdGhpcy5fbWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIuYnJvd3NlTWV0YUluZm8obWFwcENvY2twaXRDb21wb25lbnQpO1xyXG4gICAgICAgICAgICBpZiAobWV0YUluZm9SZWZlcmVuY2VzKSB7XHJcbiAgICAgICAgICAgICAgICBtYXBwQ29ja3BpdENvbXBvbmVudC5tZXRhRGF0YSA9IHRoaXMucmVhZE1ldGFEYXRhKG1ldGFJbmZvUmVmZXJlbmNlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZS5tZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1hcHBDb2NrcGl0Q29tcG9uZW50Lm1ldGFEYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQnJvd3NlcyBhdmFpbGFibGUgY29tcG9uZW50IHBhcmFtZXRlcnNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBhc3luYyBicm93c2VQYXJhbWV0ZXJzKG1hcHBDb2NrcGl0Q29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudCk6IFByb21pc2U8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXT4ge1xyXG4gICAgICAgIC8vIFVwZGF0ZSBjb21wb25lbnRzIGluIG1vZGVsXHJcbiAgICAgICAgbWFwcENvY2twaXRDb21wb25lbnQucGFyYW1ldGVycyA9IGF3YWl0IHRoaXMuX21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyLmJyb3dzZVBhcmFtZXRlcnMobWFwcENvY2twaXRDb21wb25lbnQpO1xyXG5cclxuICAgICAgICAvLyByZXRyaWV2ZSBhbmQgdXBkYXRlIHVzZXIgcGFyYW1ldGVyc1xyXG4gICAgICAgIGF3YWl0IHRoaXMucmV0cmlldmVVc2VyUGFyYW1ldGVycyhtYXBwQ29ja3BpdENvbXBvbmVudCk7XHJcbiAgICAgICBcclxuICAgICAgICByZXR1cm4gbWFwcENvY2twaXRDb21wb25lbnQucGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJyb3dzZXMgYW5kIHVwZGF0ZXMgdGhlIG1ldGhvZHMgaW5wdXQgcGFyYW1ldGVyc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2R9IG1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcltdPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBhc3luYyBicm93c2VNZXRob2RJbnB1dFBhcmFtZXRlcnMobWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKTogUHJvbWlzZTxNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcltdPiB7XHJcblxyXG4gICAgICAgIC8vIGJyb3dzZSBhbmQgdXBkYXRlIHRoZSBtZXRob2RzIHBhcmFtZXRlcnNcclxuICAgICAgICBhd2FpdCB0aGlzLl9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlci5icm93c2VNZXRob2RQYXJhbWV0ZXJzKFttYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZF0pO1xyXG5cclxuICAgICAgICAvLyB1cGRhdGUgdGhlIHBhcmFtZXRlciBkYXRhIHR5cGVzXHJcbiAgICAgICAgYXdhaXQgdGhpcy5fbWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIudXBkYXRlTWV0aG9kUGFyYW1ldGVyRGF0YVR5cGVzKFttYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZF0pOyAgXHJcbiAgICAgICBcclxuICAgICAgICByZXR1cm4gbWFwcENvY2twaXRDb21wb25lbnRNZXRob2QuaW5wdXRQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0cmlldmVzIHRoZSBjb21wb25lbnQgcGFyYW1ldGVycyByZWxldmFudCBmb3IgdGhlIHVzZXIuIFRoZXkgYXJlIHNwZWNpZmllZCBieSBtZXRhIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudH0gbWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIHJldHJpZXZlVXNlclBhcmFtZXRlcnMobWFwcENvY2twaXRDb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50KSB7XHJcbiAgICAgICAgbGV0IHdhdGNoYWJsZU1ldGFDb25maWcgPSBbJ01ldGFDb25maWdXYXRjaGFibGVzJywgJ1dhdGNoYWJsZXNTdHJ1Y3R1cmUnLCAnV2F0Y2hhYmxlJ107XHJcbiAgICAgICAgbGV0IHdhdGNoYWJsZVN0YXRlTWV0YUNvbmZpZyA9IFsnTWV0YUNvbmZpZ1dhdGNoYWJsZXNTdGF0ZXMnLCAnV2F0Y2hhYmxlc1N0YXRlc1N0cnVjdHVyZScsICdXYXRjaGFibGVTdGF0ZSddO1xyXG5cclxuICAgICAgICBtYXBwQ29ja3BpdENvbXBvbmVudC5tZXNzYWdlUGFyYW1ldGVycyA9IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby5yZXRyaWV2ZU1lc3NhZ2VQYXJhbWV0ZXJzKG1hcHBDb2NrcGl0Q29tcG9uZW50LnBhcmFtZXRlcnMpO1xyXG4gICAgICAgIGlmIChtYXBwQ29ja3BpdENvbXBvbmVudC5tZXRhRGF0YSkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICBpZiAoIG1hcHBDb2NrcGl0Q29tcG9uZW50Lm1ldGFEYXRhLmhhc093blByb3BlcnR5KFwiUGFyYW1ldGVyc1wiKSAmJiBtYXBwQ29ja3BpdENvbXBvbmVudC5tZXRhRGF0YVtcIlBhcmFtZXRlcnNcIl0uaGFzT3duUHJvcGVydHkoXCJXYXRjaGFibGVcIikpIHtcclxuICAgICAgICAgICAgICAgIG1hcHBDb2NrcGl0Q29tcG9uZW50LndhdGNoYWJsZVBhcmFtZXRlcnMgPSBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8ucmV0cmlldmVXYXRjaGFibGVQYXJhbWV0ZXJzKG1hcHBDb2NrcGl0Q29tcG9uZW50LnBhcmFtZXRlcnMsIHdhdGNoYWJsZU1ldGFDb25maWcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hcHBDb2NrcGl0Q29tcG9uZW50LndhdGNoYWJsZVBhcmFtZXRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyLnVwZGF0ZVBhcmFtZXRlckRhdGFUeXBlcyhtYXBwQ29ja3BpdENvbXBvbmVudC53YXRjaGFibGVQYXJhbWV0ZXJzKTsgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLnVwZGF0ZVBhcmFtZXRlcihtYXBwQ29ja3BpdENvbXBvbmVudC53YXRjaGFibGVQYXJhbWV0ZXJzLCBtYXBwQ29ja3BpdENvbXBvbmVudC5tZXRhRGF0YVtcIlBhcmFtZXRlcnNcIl1bXCJXYXRjaGFibGVcIl0pOyAgICAgXHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgIFxyXG4gICBcclxuICAgICAgICAgICAgaWYgKCBtYXBwQ29ja3BpdENvbXBvbmVudC5tZXRhRGF0YS5oYXNPd25Qcm9wZXJ0eShcIlBhcmFtZXRlcnNcIikgJiYgbWFwcENvY2twaXRDb21wb25lbnQubWV0YURhdGFbXCJQYXJhbWV0ZXJzXCJdLmhhc093blByb3BlcnR5KFwiQ29uZmlndXJhdGlvblwiKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIG1hcHBDb2NrcGl0Q29tcG9uZW50LmNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzID0gTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLnJldHJpZXZlQ29uZmlndXJhdGlvblBhcmFtZXRlcnMobWFwcENvY2twaXRDb21wb25lbnQucGFyYW1ldGVycyk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWFwcENvY2twaXRDb21wb25lbnQuY29uZmlndXJhdGlvblBhcmFtZXRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyLnVwZGF0ZVBhcmFtZXRlckRhdGFUeXBlcyhtYXBwQ29ja3BpdENvbXBvbmVudC5jb25maWd1cmF0aW9uUGFyYW1ldGVycyk7ICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLnVwZGF0ZVBhcmFtZXRlcihtYXBwQ29ja3BpdENvbXBvbmVudC5jb25maWd1cmF0aW9uUGFyYW1ldGVycywgbWFwcENvY2twaXRDb21wb25lbnQubWV0YURhdGFbXCJQYXJhbWV0ZXJzXCJdW1wiQ29uZmlndXJhdGlvblwiXSk7ICAgICBcclxuICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0gICBcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICggbWFwcENvY2twaXRDb21wb25lbnQubWV0YURhdGEuaGFzT3duUHJvcGVydHkoXCJQYXJhbWV0ZXJzXCIpICYmIG1hcHBDb2NrcGl0Q29tcG9uZW50Lm1ldGFEYXRhW1wiUGFyYW1ldGVyc1wiXS5oYXNPd25Qcm9wZXJ0eShcIldhdGNoYWJsZVN0YXRlXCIpICYmIG1hcHBDb2NrcGl0Q29tcG9uZW50LndhdGNoYWJsZVBhcmFtZXRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbWFwcENvY2twaXRDb21wb25lbnQud2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXJzID0gTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLnJldHJpZXZlV2F0Y2hhYmxlU3RhdGVzKG1hcHBDb2NrcGl0Q29tcG9uZW50LndhdGNoYWJsZVBhcmFtZXRlcnMsIHdhdGNoYWJsZVN0YXRlTWV0YUNvbmZpZyk7ICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB3cml0ZXMgdGhlIHZhbHVlIHRvIGNvbXBvbmVudCBwYXJhbWV0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyfSBwYXJhbWV0ZXJcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBhc3luYyB3cml0ZUNvbXBvbmVudFBhcmFtZXRlcihwYXJhbWV0ZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyKSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5fbWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIud3JpdGVQYXJhbWV0ZXJWYWx1ZShwYXJhbWV0ZXIsIHBhcmFtZXRlci52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBicm93c2VzIHRoZSBjb21wb25lbnQgbWV0aG9kc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnR9IG1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBhc3luYyBicm93c2VNZXRob2RzKG1hcHBDb2NrcGl0Q29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudCk6IFByb21pc2U8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXT4ge1xyXG4gICAgICAgIGxldCBtZXRob2RzTWV0YUNvbmZpZyA9IFsnTWV0YUNvbmZpZ0NvbW1hbmRzJywgJ0NvbW1hbmRzU3RydWN0dXJlJywgJ0NvbW1hbmQnXTtcclxuICAgICAgICBsZXQgcXVpY2tDb21tYW5kc01ldGFDb25maWcgPSBbJ01ldGFDb25maWdRdWlja0NvbW1hbmRzJywgJ1F1aWNrQ29tbWFuZHNTdHJ1Y3R1cmUnLCAnUXVpY2tDb21tYW5kJ107XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSBjb21wb25lbnQgbWV0aG9kcyBpbiBtb2RlbFxyXG4gICAgICAgIG1hcHBDb2NrcGl0Q29tcG9uZW50Lm1ldGhvZHMgPSBhd2FpdCB0aGlzLl9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlci5icm93c2VNZXRob2RzKG1hcHBDb2NrcGl0Q29tcG9uZW50KTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBmaWx0ZXIgdGhlIG1ldGhvZHMgdG8gdGhlIG9uZXMgc3BlY2VmaWVkIGJ5IG1ldGEgaW5mb1xyXG4gICAgICAgIG1hcHBDb2NrcGl0Q29tcG9uZW50LnVzZXJNZXRob2RzID0gTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvLnJldHJpZXZlRXhlY3V0YWJsZU1ldGhvZHMobWFwcENvY2twaXRDb21wb25lbnQubWV0aG9kcywgbWV0aG9kc01ldGFDb25maWcpO1xyXG4gICAgICAgIG1hcHBDb2NrcGl0Q29tcG9uZW50LnF1aWNrQ29tbWFuZHMgPSBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8ucmV0cmlldmVRdWlja0NvbW1hbmRzKG1hcHBDb2NrcGl0Q29tcG9uZW50Lm1ldGhvZHMsIHF1aWNrQ29tbWFuZHNNZXRhQ29uZmlnKTtcclxuICAgICAgICByZXR1cm4gbWFwcENvY2twaXRDb21wb25lbnQubWV0aG9kcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcyB0aGUgbWV0aG9kcyByZWxldmFudCBmb3IgdGhlIHVzZXIuIFRoZXkgYXJlIHNwZWNpZmllZCBieSBtZXRhIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudH0gbWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqIEBwYXJhbSB7Kn0gY29tcG9uZW50TWV0aG9kc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmV0cmlldmVVc2VyTWV0aG9kcyhtYXBwQ29ja3BpdENvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnQsIGNvbXBvbmVudE1ldGhvZHM6IGFueSk6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10ge1xyXG4gICAgICAgIGxldCB1c2VyTWV0aG9kczogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXSA9IFtdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChtYXBwQ29ja3BpdENvbXBvbmVudC5tZXRhRGF0YSAmJiAgbWFwcENvY2twaXRDb21wb25lbnQubWV0YURhdGEuaGFzT3duUHJvcGVydHkoXCJNZXRob2RzXCIpICYmIG1hcHBDb2NrcGl0Q29tcG9uZW50Lm1ldGFEYXRhW1wiTWV0aG9kc1wiXS5oYXNPd25Qcm9wZXJ0eShcIkV4ZWN1dGFibGVcIikpIHtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZHNNZXRhID0gbWFwcENvY2twaXRDb21wb25lbnQubWV0YURhdGFbXCJNZXRob2RzXCJdW1wiRXhlY3V0YWJsZVwiXTtcclxuICAgICAgICAgICAgdXNlck1ldGhvZHMgPSBjb21wb25lbnRNZXRob2RzLmZpbHRlcigobWV0aG9kKSA9PiB7IHJldHVybiBtZXRob2RzTWV0YVttZXRob2QuYnJvd3NlTmFtZV07IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdXNlck1ldGhvZHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWFkcyB0aGUgbWV0YSBpbmZvcyBpbnRvIGEgc2luZ2xlIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IG1ldGFQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVhZE1ldGFEYXRhKG1ldGFQYXJhbWV0ZXJzOiBBcnJheTxzdHJpbmc+KSB7XHJcbiAgICAgICAgbGV0IG1ldGFEYXRhID0ge307XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIG1ldGFQYXJhbWV0ZXJzLmZvckVhY2goKG1ldGFQYXJhbWV0ZXI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYobWV0YVBhcmFtZXRlci52YWx1ZSA9PSBcIlwiKXsgLy8gRmFsbGJhY2s6IFVzZSBlbXB0eSBvYmplY3QgaW4gY2FzZSBvZiBlbXB0eSBtZXRhSW5mb1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGFQYXJhbWV0ZXIudmFsdWUgPSBcInt9XCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vSnVzdCBmb3IgcHJvdG90eXBlOiBFbmFibGUvRGlzYWJsZSBvZiBtZXRob2RzXHJcbiAgICAgICAgICAgICAgICAvLyBpZiAobWV0YVBhcmFtZXRlci5ub2RlSWQgPT0gXCJucz01O3M9Z0F4aXMxLk1ldGFDb25maWdDb21tYW5kc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgbWV0YVBhcmFtZXRlci52YWx1ZSA9ICd7XCJDb21tYW5kc1N0cnVjdHVyZVwiOntcIlNjb3BlXCI6XCJtYXBwL01vdGlvbi9BeGlzL0FjcEF4aXNcIixcIkNoaWxkc1wiOlt7XCJHcm91cFwiOntcIkRpc3BsYXlOYW1lXCI6XCJQcmVwYXJhdGlvblwiLFwiQ2hpbGRzXCI6W3tcIkNvbW1hbmRcIjp7XCJEaXNwbGF5TmFtZVwiOlwiUG93ZXIgb25cIixcIlJlZlwiOlwiUG93ZXIgT25cIixcIldhdGNoYWJsZVZhcmlhYmxlc01hcHBpbmdcIjpbW1wiSXMgUG93ZXJlZFwiLFwiSXNfUG93ZXJlZFwiXV0sXCJFbmFibGVTdGF0ZUV4cHJlc3Npb25cIjpcIklzX1Bvd2VyZWQgPT0gZmFsc2UgPyB0cnVlIDogZmFsc2VcIn19LHtcIkNvbW1hbmRcIjp7XCJEaXNwbGF5TmFtZVwiOlwiUG93ZXIgb2ZmXCIsXCJSZWZcIjpcIlBvd2VyIE9mZlwiLFwiV2F0Y2hhYmxlVmFyaWFibGVzTWFwcGluZ1wiOltbXCJJcyBQb3dlcmVkXCIsXCJJc19Qb3dlcmVkXCJdXSxcIkVuYWJsZVN0YXRlRXhwcmVzc2lvblwiOlwiSXNfUG93ZXJlZCA9PSB0cnVlID8gdHJ1ZSA6IGZhbHNlXCJ9fSx7XCJDb21tYW5kXCI6e1wiRGlzcGxheU5hbWVcIjpcIkluaXQgaG9tZVwiLFwiUmVmXCI6XCJJbml0IEhvbWVcIixcIlBhcmFtZXRlcnNcIjpbe1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkhvbWluZyBtb2RlXCIsXCJSZWZcIjpcIkhvbWluZyBNb2RlXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQWNwQXg6OkluaXRIb21lUmVkdWNlZFwifX19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJQb3NpdGlvblwiLFwiUmVmXCI6XCJQb3NpdGlvblwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbVwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlN0YXJ0IHZlbG9jaXR5XCIsXCJSZWZcIjpcIlN0YXJ0IFZlbG9jaXR5XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tL3NcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJIb21pbmcgdmVsb2NpdHlcIixcIlJlZlwiOlwiSG9taW5nIFZlbG9jaXR5XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tL3NcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJBY2NlbGVyYXRpb25cIixcIlJlZlwiOlwiQWNjZWxlcmF0aW9uXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tL3PCslwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlN3aXRjaCBlZGdlXCIsXCJSZWZcIjpcIlN3aXRjaEVkZ2VcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBeGlzOjpJbml0SG9tZURpcmVjdGlvblwifX19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJTdGFydCBkaXJlY3Rpb25cIixcIlJlZlwiOlwiU3RhcnQgRGlyZWN0aW9uXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQXhpczo6SW5pdEhvbWVEaXJlY3Rpb25cIn19fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiSG9taW5nIGRpcmVjdGlvblwiLFwiUmVmXCI6XCJIb21pbmcgRGlyZWN0aW9uXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQXhpczo6SW5pdEhvbWVEaXJlY3Rpb25cIn19fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiUmVmZXJlbmNlIHB1bHNlXCIsXCJSZWZcIjpcIlJlZmVyZW5jZSBQdWxzZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkF4aXM6OlN3aXRjaFwifX19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJLZWVwIGRpcmVjdGlvblwiLFwiUmVmXCI6XCJLZWVwIERpcmVjdGlvblwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkF4aXM6OlN3aXRjaFwifX19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJSZWZlcmVuY2UgcHVsc2UgYmxvY2tpbmcgZGlzdGFuY2VcIixcIlJlZlwiOlwiUmVmZXJlbmNlIFB1bHNlIEJsb2NraW5nIERpc3RhbmNlXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiVG9ycXVlIGxpbWl0XCIsXCJSZWZcIjpcIlRvcnF1ZSBMaW1pdFwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJOwrdtXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiQmxvY2sgZGV0ZWN0aW9uIHBvc2l0aW9uIGVycm9yXCIsXCJSZWZcIjpcIkJsb2NrIERldGVjdGlvbiBQb3NpdGlvbiBFcnJvclwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbVwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlBvc2l0aW9uIGVycm9yIHN0b3AgbGltaXRcIixcIlJlZlwiOlwiUG9zaXRpb24gRXJyb3IgU3RvcCBMaW1pdFwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbVwifX1dfX0se1wiQ29tbWFuZFwiOntcIkRpc3BsYXlOYW1lXCI6XCJIb21lXCIsXCJSZWZcIjpcIkhvbWVcIixcIlBhcmFtZXRlcnNcIjpbe1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlBvc2l0aW9uXCIsXCJSZWZcIjpcIlBvc2l0aW9uXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiSG9taW5nIG1vZGVcIixcIlJlZlwiOlwiSG9taW5nIE1vZGVcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMTQwXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkFjcEF4OjpIb21pbmdSZWR1Y2VkXCJ9fX1dfX1dfX0se1wiR3JvdXBcIjp7XCJEaXNwbGF5TmFtZVwiOlwiQWRtaW5pc3RyYXRpb25cIixcIkNoaWxkc1wiOlt7XCJDb21tYW5kXCI6e1wiRGlzcGxheU5hbWVcIjpcIlJlc2V0XCIsXCJSZWZcIjpcIlJlc2V0XCJ9fSx7XCJDb21tYW5kXCI6e1wiRGlzcGxheU5hbWVcIjpcIlNldCBvdmVycmlkZVwiLFwiUmVmXCI6XCJTZXQgT3ZlcnJpZGVcIixcIlBhcmFtZXRlcnNcIjpbe1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlZlbG9jaXR5IGZhY3RvclwiLFwiUmVmXCI6XCJWZWxvY2l0eSBGYWN0b3JcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMS4wXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiQWNjZWxlcmF0aW9uIGZhY3RvclwiLFwiUmVmXCI6XCJBY2NlbGVyYXRpb24gRmFjdG9yXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjEuMFwifX1dfX0se1wiQ29tbWFuZFwiOntcIkRpc3BsYXlOYW1lXCI6XCJDb21tYW5kIGVycm9yXCIsXCJSZWZcIjpcIkNvbW1hbmRFcnJvclwiLFwiUGFyYW1ldGVyc1wiOlt7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiQ29tbWFuZFwiLFwiUmVmXCI6XCJDb21tYW5kXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQXhpczo6Q29tbWFuZEVycm9yc1wifX19XX19LHtcIkNvbW1hbmRcIjp7XCJEaXNwbGF5TmFtZVwiOlwiUmVhZCBQYXJJRFwiLFwiUmVmXCI6XCJSZWFkIFBhcklkXCIsXCJQYXJhbWV0ZXJzXCI6W3tcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJQYXJJRFwiLFwiUmVmXCI6XCJQYXJJZFwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCJ9fV19fSx7XCJDb21tYW5kXCI6e1wiRGlzcGxheU5hbWVcIjpcIldyaXRlIFBhcklEXCIsXCJSZWZcIjpcIldyaXRlIFBhcklkXCIsXCJQYXJhbWV0ZXJzXCI6W3tcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJQYXJJRFwiLFwiUmVmXCI6XCJQYXJJZFwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiVmFsdWVcIixcIlJlZlwiOlwiVmFsdWVcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwifX1dfX1dfX0se1wiR3JvdXBcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTW92ZW1lbnRcIixcIkNoaWxkc1wiOlt7XCJDb21tYW5kXCI6e1wiRGlzcGxheU5hbWVcIjpcIk1vdmUgYWJzb2x1dGVcIixcIlJlZlwiOlwiTW92ZSBBYnNvbHV0ZVwiLFwiUGFyYW1ldGVyc1wiOlt7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiUG9zaXRpb25cIixcIlJlZlwiOlwiUG9zaXRpb25cIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW1cIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJWZWxvY2l0eVwiLFwiUmVmXCI6XCJWZWxvY2l0eVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIyXCIsXCJFVVwiOlwibW0vc1wifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkFjY2VsZXJhdGlvblwiLFwiUmVmXCI6XCJBY2NlbGVyYXRpb25cIixcIkRlZmF1bHRWYWx1ZVwiOlwiMTBcIixcIkVVXCI6XCJtbS9zwrJcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJEZWNlbGVyYXRpb25cIixcIlJlZlwiOlwiRGVjZWxlcmF0aW9uXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjEwXCIsXCJFVVwiOlwibW0vc8KyXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiRGlyZWN0aW9uXCIsXCJSZWZcIjpcIkRpcmVjdGlvblwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkF4aXM6Ok1vdmVBYnNEaXJlY3Rpb25cIn19fV19fSx7XCJDb21tYW5kXCI6e1wiRGlzcGxheU5hbWVcIjpcIk1vdmUgYWRkaXRpdmVcIixcIlJlZlwiOlwiTW92ZSBBZGRpdGl2ZVwiLFwiUGFyYW1ldGVyc1wiOlt7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiRGlzdGFuY2VcIixcIlJlZlwiOlwiRGlzdGFuY2VcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW1cIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJWZWxvY2l0eVwiLFwiUmVmXCI6XCJWZWxvY2l0eVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIyXCIsXCJFVVwiOlwibW0vc1wifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkFjY2VsZXJhdGlvblwiLFwiUmVmXCI6XCJBY2NlbGVyYXRpb25cIixcIkRlZmF1bHRWYWx1ZVwiOlwiMTBcIixcIkVVXCI6XCJtbS9zwrJcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJEZWNlbGVyYXRpb25cIixcIlJlZlwiOlwiRGVjZWxlcmF0aW9uXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjEwXCIsXCJFVVwiOlwibW0vc8KyXCJ9fV19fSx7XCJDb21tYW5kXCI6e1wiRGlzcGxheU5hbWVcIjpcIk1vdmUgdmVsb2NpdHlcIixcIlJlZlwiOlwiTW92ZSBWZWxvY2l0eVwiLFwiUGFyYW1ldGVyc1wiOlt7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiVmVsb2NpdHlcIixcIlJlZlwiOlwiVmVsb2NpdHlcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMlwiLFwiRVVcIjpcIm1tL3NcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJBY2NlbGVyYXRpb25cIixcIlJlZlwiOlwiQWNjZWxlcmF0aW9uXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjEwXCIsXCJFVVwiOlwibW0vc8KyXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiRGVjZWxlcmF0aW9uXCIsXCJSZWZcIjpcIkRlY2VsZXJhdGlvblwiLFwiRGVmYXVsdFZhbHVlXCI6XCIxMFwiLFwiRVVcIjpcIm1tL3PCslwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkRpcmVjdGlvblwiLFwiUmVmXCI6XCJEaXJlY3Rpb25cIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBeGlzOjpNb3ZlVmVsb0RpcmVjdGlvblwifX19XX19LHtcIkNvbW1hbmRcIjp7XCJEaXNwbGF5TmFtZVwiOlwiR2VhciBpblwiLFwiUmVmXCI6XCJHZWFyIEluXCIsXCJQYXJhbWV0ZXJzXCI6W3tcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJNYXN0ZXJcIixcIlJlZlwiOlwiTWFzdGVyXCIsXCJEZWZhdWx0VmFsdWVcIjpcIlwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlJhdGlvIG51bWVyYXRvclwiLFwiUmVmXCI6XCJSYXRpbyBOdW1lcmF0b3JcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiUmF0aW8gZGVub21pbmF0b3JcIixcIlJlZlwiOlwiUmF0aW8gRGVub21pbmF0b3JcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTWFzdGVyIHZhbHVlIHNvdXJjZVwiLFwiUmVmXCI6XCJNYXN0ZXIgVmFsdWUgU291cmNlXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQXhpczo6VmFsdWVTb3VyY2VcIn19fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiQWNjZWxlcmF0aW9uXCIsXCJSZWZcIjpcIkFjY2VsZXJhdGlvblwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbS9zwrJcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJEZWNlbGVyYXRpb25cIixcIlJlZlwiOlwiRGVjZWxlcmF0aW9uXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tL3PCslwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIk1hc3RlciBtYXggdmVsb2NpdHlcIixcIlJlZlwiOlwiTWFzdGVyIE1heCBWZWxvY2l0eVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbS9zXCJ9fV19fSx7XCJDb21tYW5kXCI6e1wiRGlzcGxheU5hbWVcIjpcIkNhbSBpblwiLFwiUmVmXCI6XCJDYW1JblwiLFwiUGFyYW1ldGVyc1wiOlt7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTWFzdGVyXCIsXCJSZWZcIjpcIk1hc3RlclwiLFwiRGVmYXVsdFZhbHVlXCI6XCJcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJNYXN0ZXIgb2Zmc2V0XCIsXCJSZWZcIjpcIk1hc3Rlck9mZnNldFwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbS9zXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU2xhdmUgb2Zmc2V0XCIsXCJSZWZcIjpcIlNsYXZlT2Zmc2V0XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tL3NcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJNYXN0ZXIgc2NhbGluZ1wiLFwiUmVmXCI6XCJNYXN0ZXJTY2FsaW5nXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJTbGF2ZSBzY2FsaW5nXCIsXCJSZWZcIjpcIlNsYXZlU2NhbGluZ1wiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU3RhcnQgbW9kZVwiLFwiUmVmXCI6XCJTdGFydE1vZGVcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBeGlzOjpDYW1TdGFydE1vZGVcIn19fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTWFzdGVyIHZhbHVlIHNvdXJjZVwiLFwiUmVmXCI6XCJNYXN0ZXJWYWx1ZVNvdXJjZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkF4aXM6OlZhbHVlU291cmNlQ2FtSW5cIn19fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiQ2FtIElEXCIsXCJSZWZcIjpcIkNhbUlEXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjY1NTM1XCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiUGVyaW9kaWNcIixcIlJlZlwiOlwiUGVyaW9kaWNcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlZlbG9jaXR5XCIsXCJSZWZcIjpcIlZlbG9jaXR5XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tL3NcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJBY2NlbGVyYXRpb25cIixcIlJlZlwiOlwiQWNjZWxlcmF0aW9uXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tL3PCslwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkRlY2VsZXJhdGlvblwiLFwiUmVmXCI6XCJEZWNlbGVyYXRpb25cIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW0vc8KyXCJ9fV19fSx7XCJDb21tYW5kXCI6e1wiRGlzcGxheU5hbWVcIjpcIlRvcnF1ZSBjb250cm9sXCIsXCJSZWZcIjpcIlRvcnF1ZSBDb250cm9sXCIsXCJQYXJhbWV0ZXJzXCI6W3tcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJUb3JxdWVcIixcIlJlZlwiOlwiVG9ycXVlXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIk7Ct21cIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJUb3JxdWUgcmFtcFwiLFwiUmVmXCI6XCJUb3JxdWUgUmFtcFwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJOwrdtL3NcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJWZWxvY2l0eVwiLFwiUmVmXCI6XCJWZWxvY2l0eVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbS9zXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiQWNjZWxlcmF0aW9uXCIsXCJSZWZcIjpcIkFjY2VsZXJhdGlvblwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbS9zwrJcIn19XX19LHtcIkNvbW1hbmRcIjp7XCJEaXNwbGF5TmFtZVwiOlwiQnJha2Ugb3BlcmF0aW9uXCIsXCJSZWZcIjpcIkJyYWtlIE9wZXJhdGlvblwiLFwiUGFyYW1ldGVyc1wiOlt7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiQ29tbWFuZFwiLFwiUmVmXCI6XCJDb21tYW5kXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQXhpczo6QnJha2VDb21tYW5kXCJ9fX1dfX0se1wiQ29tbWFuZFwiOntcIkRpc3BsYXlOYW1lXCI6XCJIYWx0XCIsXCJSZWZcIjpcIkhhbHRcIixcIlBhcmFtZXRlcnNcIjpbe1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkRlY2VsZXJhdGlvblwiLFwiUmVmXCI6XCJEZWNlbGVyYXRpb25cIixcIkRlZmF1bHRWYWx1ZVwiOlwiMTBcIixcIkVVXCI6XCJtbS9zwrJcIn19XX19XX19LHtcIkdyb3VwXCI6e1wiRGlzcGxheU5hbWVcIjpcIkxvYWQgc2ltdWxhdGlvblwiLFwiQ2hpbGRzXCI6W3tcIkNvbW1hbmRcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTG9hZCBzaW11bGF0aW9uIGNvbW1hbmRcIixcIlJlZlwiOlwiTG9hZCBTaW11bGF0aW9uIENvbW1hbmRcIixcIlBhcmFtZXRlcnNcIjpbe1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkNvbW1hbmRcIixcIlJlZlwiOlwiQ29tbWFuZFwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkF4aXM6OlNpbXVsYXRpb25Db21tYW5kXCJ9fX1dfX0se1wiQ29tbWFuZFwiOntcIkRpc3BsYXlOYW1lXCI6XCJMb2FkIHNpbXVsYXRpb24gc2V0IHBhcmFtcyBhdXRvXCIsXCJSZWZcIjpcIkxvYWQgU2ltdWxhdGlvbiBTZXQgUGFyYW1zIEF1dG9cIixcIlBhcmFtZXRlcnNcIjpbe1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkFkZGl0aXZlIGxvYWQgUGFySURcIixcIlJlZlwiOlwiQWRkaXRpdmUgTG9hZCBQYXJJZFwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCJ9fV19fSx7XCJDb21tYW5kXCI6e1wiRGlzcGxheU5hbWVcIjpcIkxvYWQgc2ltdWxhdGlvbiBzZXQgcGFyYW1zIG9uZSBtYXNzXCIsXCJSZWZcIjpcIkxvYWQgU2ltdWxhdGlvbiBTZXQgUGFyYW1zIE9uZSBNYXNzXCIsXCJQYXJhbWV0ZXJzXCI6W3tcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJBZGRpdGl2ZSBsb2FkIFBhcklEXCIsXCJSZWZcIjpcIkFkZGl0aXZlIExvYWQgUGFySWRcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkluZXJ0aWFcIixcIlJlZlwiOlwiSW5lcnRpYVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJrZ8K3bcKyXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU3RhdGljIGZyaWN0aW9uXCIsXCJSZWZcIjpcIlN0YXRpYyBGcmljdGlvblwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJOwrdtXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiVmlzY291cyBmcmljdGlvblwiLFwiUmVmXCI6XCJWaXNjb3VzIEZyaWN0aW9uXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIk7Ct23Ct3NcIn19XX19LHtcIkNvbW1hbmRcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTG9hZCBzaW11bGF0aW9uIHNldCBwYXJhbXMgdHdvIG1hc3Nlc1wiLFwiUmVmXCI6XCJMb2FkIFNpbXVsYXRpb24gU2V0IFBhcmFtcyBUd28gTWFzc2VzXCIsXCJQYXJhbWV0ZXJzXCI6W3tcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJBZGRpdGl2ZSBsb2FkIFBhcklEXCIsXCJSZWZcIjpcIkFkZGl0aXZlIExvYWQgUGFySWRcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkluZXJ0aWEgTTFcIixcIlJlZlwiOlwiSW5lcnRpYSBNMVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJrZ8K3bcKyXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU3RhdGljIGZyaWN0aW9uIE0xXCIsXCJSZWZcIjpcIlN0YXRpYyBGcmljdGlvbiBNMVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJOwrdtXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiVmlzY291cyBmcmljdGlvbiBNMVwiLFwiUmVmXCI6XCJWaXNjb3VzIEZyaWN0aW9uIE0xXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIk7Ct23Ct3NcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJJbmVydGlhIE0yXCIsXCJSZWZcIjpcIkluZXJ0aWEgTTJcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwia2fCt23CslwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlN0YXRpYyBmcmljdGlvbiBNMlwiLFwiUmVmXCI6XCJTdGF0aWMgRnJpY3Rpb24gTTJcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwiTsK3bVwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlZpc2NvdXMgZnJpY3Rpb24gTTJcIixcIlJlZlwiOlwiVmlzY291cyBGcmljdGlvbiBNMlwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJOwrdtwrdzXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU3RpZmZuZXNzXCIsXCJSZWZcIjpcIlN0aWZmbmVzc1wiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJOwrdtL3JhZFwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkRhbXBpbmdcIixcIlJlZlwiOlwiRGFtcGluZ1wiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJOwrdtwrdzL3JhZFwifX1dfX1dfX0se1wiR3JvdXBcIjp7XCJEaXNwbGF5TmFtZVwiOlwiQXV0b1R1bmVcIixcIkNoaWxkc1wiOlt7XCJDb21tYW5kXCI6e1wiRGlzcGxheU5hbWVcIjpcIkF1dG90dW5lIHBvc2l0aW9uIGNvbnRyb2xsZXJcIixcIlJlZlwiOlwiQXV0byBUdW5lIFBvc2l0aW9uIENvbnRyb2xsZXJcIixcIlBhcmFtZXRlcnNcIjpbe1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIk9yaWVudGF0aW9uXCIsXCJSZWZcIjpcIk9yaWVudGF0aW9uXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQWNwQXg6OkF1dG9UdW5pbmdPcmllbnRhdGlvblwifX19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJNYXggY3VycmVudCBwZXJjZW50XCIsXCJSZWZcIjpcIk1heCBDdXJyZW50IFBlcmNlbnRcIixcIkRlZmF1bHRWYWx1ZVwiOlwiNTBcIixcIkVVXCI6XCIlXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTWF4IGRpc3RhbmNlXCIsXCJSZWZcIjpcIk1heCBEaXN0YW5jZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbVwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIk1heCBwb3NpdGlvbiBlcnJvclwiLFwiUmVmXCI6XCJNYXggUG9zaXRpb24gRXJyb3JcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW1cIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJPcGVyYXRpbmcgcG9pbnRcIixcIlJlZlwiOlwiT3BlcmF0aW5nIFBvaW50XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQWNwQXg6OkF1dG9UdW5pbmdPcGVyYXRpb25Qb2ludFwifX19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJWZWxvY2l0eVwiLFwiUmVmXCI6XCJWZWxvY2l0eVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbS9zXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiQWNjZWxlcmF0aW9uXCIsXCJSZWZcIjpcIkFjY2VsZXJhdGlvblwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbS9zwrJcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJNYXggcHJvcG9ydGlvbmFsIGdhaW5cIixcIlJlZlwiOlwiTWF4IFByb3BvcnRpb25hbCBHYWluXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjIwMDAuMFwiLFwiRVVcIjpcIkFzXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiUHJvcG9ydGlvbmFsIGdhaW4gcGVyY2VudFwiLFwiUmVmXCI6XCJQcm9wb3J0aW9uYWwgR2FpbiBQZXJjZW50XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjEwMC4wXCIsXCJFVVwiOlwiJVwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlNpZ25hbCB0eXBlXCIsXCJSZWZcIjpcIlNpZ25hbCBUeXBlXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQWNwQXg6OkF1dG9UdW5pbmdFeGNpdGF0aW9uU2lnbmFsXCJ9fX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlNpZ25hbCBvcmRlclwiLFwiUmVmXCI6XCJTaWduYWwgT3JkZXJcIixcIkRlZmF1bHRWYWx1ZVwiOlwiOVwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkRlbGF5IHRpbWVcIixcIlJlZlwiOlwiRGVsYXkgVGltZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJzXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU2lnbmFsIHN0YXJ0IGZyZXF1ZW5jeVwiLFwiUmVmXCI6XCJTaWduYWwgU3RhcnQgRnJlcXVlbmN5XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIkh6XCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU2lnbmFsIHN0b3AgZnJlcXVlbmN5XCIsXCJSZWZcIjpcIlNpZ25hbCBTdG9wIEZyZXF1ZW5jeVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJIelwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlNpZ25hbCB0aW1lXCIsXCJSZWZcIjpcIlNpZ25hbCBUaW1lXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcInNcIn19XX19LHtcIkNvbW1hbmRcIjp7XCJEaXNwbGF5TmFtZVwiOlwiQXV0b3R1bmUgc3BlZWQgY29udHJvbGxlclwiLFwiUmVmXCI6XCJBdXRvIFR1bmUgU3BlZWQgQ29udHJvbGxlclwiLFwiUGFyYW1ldGVyc1wiOlt7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiT3JpZW50YXRpb25cIixcIlJlZlwiOlwiT3JpZW50YXRpb25cIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBY3BBeDo6QXV0b1R1bmluZ09yaWVudGF0aW9uXCJ9fX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIk1heCBjdXJyZW50IHBlcmNlbnRcIixcIlJlZlwiOlwiTWF4IEN1cnJlbnQgUGVyY2VudFwiLFwiRGVmYXVsdFZhbHVlXCI6XCI1MFwiLFwiRVVcIjpcIiVcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJNYXggZGlzdGFuY2VcIixcIlJlZlwiOlwiTWF4IERpc3RhbmNlXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTWF4IHBvc2l0aW9uIGVycm9yXCIsXCJSZWZcIjpcIk1heCBQb3NpdGlvbiBFcnJvclwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbVwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkxvb3AgZmlsdGVyMSBtb2RlXCIsXCJSZWZcIjpcIkxvb3AgRmlsdGVyMSBNb2RlXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQWNwQXg6OkF1dG9UdW5pbmdMb29wRmlsdGVyTW9kZVwifX19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJGaWx0ZXIgdGltZSBtb2RlXCIsXCJSZWZcIjpcIkZpbHRlciBUaW1lIE1vZGVcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBY3BBeDo6QXV0b1R1bmluZ0ZpbHRlclRpbWVNb2RlXCJ9fX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkludGVncmF0aW9uIHRpbWUgbW9kZVwiLFwiUmVmXCI6XCJJbnRlZ3JhdGlvbiBUaW1lIE1vZGVcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBY3BBeDo6QXV0b1R1bmluZ0ludGVncmF0aW9uVGltZU1vZGVcIn19fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiT3BlcmF0aW5nIHBvaW50XCIsXCJSZWZcIjpcIk9wZXJhdGluZyBQb2ludFwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkFjcEF4OjpBdXRvVHVuaW5nT3BlcmF0aW9uUG9pbnRcIn19fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiVmVsb2NpdHlcIixcIlJlZlwiOlwiVmVsb2NpdHlcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW0vc1wifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkFjY2VsZXJhdGlvblwiLFwiUmVmXCI6XCJBY2NlbGVyYXRpb25cIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW0vc8KyXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTWF4IHByb3BvcnRpb25hbCBnYWluXCIsXCJSZWZcIjpcIk1heCBQcm9wb3J0aW9uYWwgR2FpblwiLFwiRGVmYXVsdFZhbHVlXCI6XCIyMDAwLjBcIixcIkVVXCI6XCJBc1wifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlByb3BvcnRpb25hbCBnYWluIHBlcmNlbnRcIixcIlJlZlwiOlwiUHJvcG9ydGlvbmFsIEdhaW4gUGVyY2VudFwiLFwiRGVmYXVsdFZhbHVlXCI6XCIxMDAuMFwiLFwiRVVcIjpcIiVcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJSZXNvbmFuY2UgZmFjdG9yXCIsXCJSZWZcIjpcIlJlc29uYW5jZSBGYWN0b3JcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMi4wXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiSW5lcnRpYSBlc3RpbWF0aW9uIGxvd2VyIGZyZXF1ZW5jeVwiLFwiUmVmXCI6XCJJbmVydGlhIEVzdGltYXRpb24gTG93ZXIgRnJlcXVlbmN5XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjEwLjBcIixcIkVVXCI6XCJIelwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkluZXJ0aWEgZXN0aW1hdGlvbiB1cHBlciBmcmVxdWVuY3lcIixcIlJlZlwiOlwiSW5lcnRpYSBFc3RpbWF0aW9uIFVwcGVyIEZyZXF1ZW5jeVwiLFwiRGVmYXVsdFZhbHVlXCI6XCI0MC4wXCIsXCJFVVwiOlwiSHpcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJTaWduYWwgdHlwZVwiLFwiUmVmXCI6XCJTaWduYWwgVHlwZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkFjcEF4OjpBdXRvVHVuaW5nRXhjaXRhdGlvblNpZ25hbFwifX19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJTaWduYWwgb3JkZXJcIixcIlJlZlwiOlwiU2lnbmFsIE9yZGVyXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjlcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJEZWxheSB0aW1lXCIsXCJSZWZcIjpcIkRlbGF5IFRpbWVcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwic1wifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlNpZ25hbCBzdGFydCBmcmVxdWVuY3lcIixcIlJlZlwiOlwiU2lnbmFsIFN0YXJ0IEZyZXF1ZW5jeVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJIelwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlNpZ25hbCBzdG9wIGZyZXF1ZW5jeVwiLFwiUmVmXCI6XCJTaWduYWwgU3RvcCBGcmVxdWVuY3lcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwiSHpcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJTaWduYWwgdGltZVwiLFwiUmVmXCI6XCJTaWduYWwgVGltZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJzXCJ9fV19fSx7XCJDb21tYW5kXCI6e1wiRGlzcGxheU5hbWVcIjpcIkF1dG90dW5lIGZlZWQgZm9yd2FyZFwiLFwiUmVmXCI6XCJBdXRvIFR1bmUgRmVlZCBGb3J3YXJkXCIsXCJQYXJhbWV0ZXJzXCI6W3tcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJEaXJlY3Rpb25cIixcIlJlZlwiOlwiRGlyZWN0aW9uXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQXhpczo6RGlyZWN0aW9uXCJ9fX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIk9yaWVudGF0aW9uXCIsXCJSZWZcIjpcIk9yaWVudGF0aW9uXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQWNwQXg6OkF1dG9UdW5pbmdPcmllbnRhdGlvblwifX19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJNYXggZGlzdGFuY2VcIixcIlJlZlwiOlwiTWF4IERpc3RhbmNlXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTWF4IHBvc2l0aW9uIGVycm9yXCIsXCJSZWZcIjpcIk1heCBQb3NpdGlvbiBFcnJvclwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbVwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlZlbG9jaXR5XCIsXCJSZWZcIjpcIlZlbG9jaXR5XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tL3NcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJBY2NlbGVyYXRpb25cIixcIlJlZlwiOlwiQWNjZWxlcmF0aW9uXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tL3PCslwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIk1heCBjdXJyZW50IHBlcmNlbnRhZ2VcIixcIlJlZlwiOlwiTWF4IEN1cnJlbnQgUGVyY2VudGFnZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCI1MFwiLFwiRVVcIjpcIiVcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJNYXggdmVsb2NpdHkgcGVyY2VudGFnZVwiLFwiUmVmXCI6XCJNYXggVmVsb2NpdHkgUGVyY2VudGFnZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCI1MFwiLFwiRVVcIjpcIiVcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJTaWduYWwgdHlwZVwiLFwiUmVmXCI6XCJTaWduYWwgVHlwZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkFjcEF4OjpBdXRvVHVuaW5nRXhjaXRhdGlvblNpZ25hbFwifX19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJTaWduYWwgb3JkZXJcIixcIlJlZlwiOlwiU2lnbmFsIE9yZGVyXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjlcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJEZWxheSB0aW1lXCIsXCJSZWZcIjpcIkRlbGF5IFRpbWVcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwic1wifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlNpZ25hbCBzdGFydCBmcmVxdWVuY3lcIixcIlJlZlwiOlwiU2lnbmFsIFN0YXJ0IEZyZXF1ZW5jeVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJIelwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlNpZ25hbCBzdG9wIGZyZXF1ZW5jeVwiLFwiUmVmXCI6XCJTaWduYWwgU3RvcCBGcmVxdWVuY3lcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwiSHpcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJTaWduYWwgdGltZVwiLFwiUmVmXCI6XCJTaWduYWwgVGltZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJzXCJ9fV19fSx7XCJDb21tYW5kXCI6e1wiRGlzcGxheU5hbWVcIjpcIkF1dG90dW5lIGxvb3AgZmlsdGVyc1wiLFwiUmVmXCI6XCJBdXRvIFR1bmUgTG9vcCBGaWx0ZXJzXCIsXCJQYXJhbWV0ZXJzXCI6W3tcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJMb29wIGZpbHRlciAxIG1vZGVcIixcIlJlZlwiOlwiTG9vcCBGaWx0ZXIxIE1vZGVcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMVwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBY3BBeDo6QXV0b1R1bmluZ0xvb3BGaWx0ZXJNb2RlXCJ9fX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkxvb3AgZmlsdGVyIDIgbW9kZVwiLFwiUmVmXCI6XCJMb29wIEZpbHRlcjIgTW9kZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkFjcEF4OjpBdXRvVHVuaW5nTG9vcEZpbHRlck1vZGVcIn19fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTG9vcCBmaWx0ZXIgMyBtb2RlXCIsXCJSZWZcIjpcIkxvb3AgRmlsdGVyMyBNb2RlXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQWNwQXg6OkF1dG9UdW5pbmdMb29wRmlsdGVyTW9kZVwifX19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJPcmllbnRhdGlvblwiLFwiUmVmXCI6XCJPcmllbnRhdGlvblwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkFjcEF4OjpBdXRvVHVuaW5nT3JpZW50YXRpb25cIn19fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTWF4IGN1cnJlbnQgcGVyY2VudFwiLFwiUmVmXCI6XCJNYXggQ3VycmVudCBQZXJjZW50XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjUwXCIsXCJFVVwiOlwiJVwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIk1heCBkaXN0YW5jZVwiLFwiUmVmXCI6XCJNYXggRGlzdGFuY2VcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW1cIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJNYXggcG9zaXRpb24gZXJyb3JcIixcIlJlZlwiOlwiTWF4IFBvc2l0aW9uIEVycm9yXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiT3BlcmF0aW5nIHBvaW50XCIsXCJSZWZcIjpcIk9wZXJhdGluZyBQb2ludFwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkFjcEF4OjpBdXRvVHVuaW5nT3BlcmF0aW9uUG9pbnRcIn19fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiVmVsb2NpdHlcIixcIlJlZlwiOlwiVmVsb2NpdHlcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW0vc1wifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkFjY2VsZXJhdGlvblwiLFwiUmVmXCI6XCJBY2NlbGVyYXRpb25cIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW0vc8KyXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiUmVzb25hbmNlIGZhY3RvclwiLFwiUmVmXCI6XCJSZXNvbmFuY2UgRmFjdG9yXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjJcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJTaWduYWwgdHlwZVwiLFwiUmVmXCI6XCJTaWduYWwgVHlwZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkFjcEF4OjpBdXRvVHVuaW5nRXhjaXRhdGlvblNpZ25hbFwifX19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJTaWduYWwgb3JkZXJcIixcIlJlZlwiOlwiU2lnbmFsIE9yZGVyXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjlcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJEZWxheSB0aW1lXCIsXCJSZWZcIjpcIkRlbGF5IFRpbWVcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwic1wifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlNpZ25hbCBzdGFydCBmcmVxdWVuY3lcIixcIlJlZlwiOlwiU2lnbmFsIFN0YXJ0IEZyZXF1ZW5jeVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJIelwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlNpZ25hbCBzdG9wIGZyZXF1ZW5jeVwiLFwiUmVmXCI6XCJTaWduYWwgU3RvcCBGcmVxdWVuY3lcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwiSHpcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJTaWduYWwgdGltZVwiLFwiUmVmXCI6XCJTaWduYWwgVGltZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJzXCJ9fV19fSx7XCJDb21tYW5kXCI6e1wiRGlzcGxheU5hbWVcIjpcIkF1dG90dW5lIHRlc3RcIixcIlJlZlwiOlwiQXV0byBUdW5lIFRlc3RcIixcIlBhcmFtZXRlcnNcIjpbe1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIk1vZGVcIixcIlJlZlwiOlwiTW9kZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkFjcEF4OjpBdXRvVHVuaW5nVGVzdE1vZGVcIn19fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiT3JpZW50YXRpb25cIixcIlJlZlwiOlwiT3JpZW50YXRpb25cIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBY3BBeDo6QXV0b1R1bmluZ09yaWVudGF0aW9uXCJ9fX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIk1heCBjdXJyZW50IHBlcmNlbnRcIixcIlJlZlwiOlwiTWF4IEN1cnJlbnQgUGVyY2VudFwiLFwiRGVmYXVsdFZhbHVlXCI6XCI1MFwiLFwiRVVcIjpcIiVcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJNYXggZGlzdGFuY2VcIixcIlJlZlwiOlwiTWF4IERpc3RhbmNlXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTWF4IHBvc2l0aW9uIGVycm9yXCIsXCJSZWZcIjpcIk1heCBQb3NpdGlvbiBFcnJvclwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbVwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlNpZ25hbCB0eXBlXCIsXCJSZWZcIjpcIlNpZ25hbCBUeXBlXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQWNwQXg6OkF1dG9UdW5pbmdFeGNpdGF0aW9uU2lnbmFsXCJ9fX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlNpZ25hbCBvcmRlclwiLFwiUmVmXCI6XCJTaWduYWwgT3JkZXJcIixcIkRlZmF1bHRWYWx1ZVwiOlwiOVwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkRlbGF5IHRpbWVcIixcIlJlZlwiOlwiRGVsYXkgVGltZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJzXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU2lnbmFsIHN0YXJ0IGZyZXF1ZW5jeVwiLFwiUmVmXCI6XCJTaWduYWwgU3RhcnQgRnJlcXVlbmN5XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIkh6XCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU2lnbmFsIHN0b3AgZnJlcXVlbmN5XCIsXCJSZWZcIjpcIlNpZ25hbCBTdG9wIEZyZXF1ZW5jeVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJIelwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlNpZ25hbCB0aW1lXCIsXCJSZWZcIjpcIlNpZ25hbCBUaW1lXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcInNcIn19XX19XX19XX19J1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgbWV0YURhdGFbbWV0YVBhcmFtZXRlci5icm93c2VOYW1lXSA9IEpTT04ucGFyc2UobWV0YVBhcmFtZXRlci52YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9KdXN0IGZvciBwcm90b3R5cGU6IHdhdGNoYWJsZUljb25zXHJcbiAgICAgICAgICAgICAgICAvL3ZhciB3YXRjaHN0YXRlTWV0YURhdGEgPSAne1wiV2F0Y2hhYmxlc1N0YXRlc1N0cnVjdHVyZVwiOntcIlNjb3BlXCI6XCJtYXBwL01vdGlvbi9BeGlzL0FjcEF4aXNcIixcIkNoaWxkc1wiOlt7XCJHcm91cFwiOntcIkRpc3BsYXlOYW1lXCI6XCJNYWluXCIsXCJDaGlsZHNcIjpbe1wiV2F0Y2hhYmxlU3RhdGVcIjp7XCJSZWZcIjpcIkF4aXNfc3RhdGVcIixcIldhdGNoYWJsZVZhcmlhYmxlc01hcHBpbmdcIjpbW1wiQ29tbXVuaWNhdGlvbiBSZWFkeVwiLFwiQ29tbXVuaWNhdGlvblwiXSxbXCJQbGNPcGVuIFN0YXRlXCIsXCJQTENfU3RhdGVcIl1dLFwiSWNvbkV4cHJlc3Npb25cIjpcIkNvbW11bmljYXRpb24gPT0gZmFsc2UgPyAxIDogUExDX1N0YXRlID09IDEgPyAyIDogUExDX1N0YXRlID09IDIgPyAzIDogUExDX1N0YXRlID09IDMgb3IgUExDX1N0YXRlID09IDQgb3IgUExDX1N0YXRlID09IDUgPyA0IDogUExDX1N0YXRlID09IDYgPyA1IDogUExDX1N0YXRlID09IDcgPyA2IDogMFwiLFwiSWNvblwiOntcIjBcIjp7XCJJbWFnZU5hbWVcIjpcIkdlYXJEaXNhYmxlZFwiLFwiVG9vbHRpcFwiOlwiQXhpcyBpcyBkaXNhYmxlZFwifSxcIjFcIjp7XCJJbWFnZU5hbWVcIjpcIkNvbW11bmljYXRpb25Ob3RSZWFkeVwiLFwiVG9vbHRpcFwiOlwiQ29tbXVuaWNhdGlvbiBpcyBub3QgcmVhZHlcIn0sXCIyXCI6e1wiSW1hZ2VOYW1lXCI6XCJHZWFyRW5hYmxlZFwiLFwiVG9vbHRpcFwiOlwiQXhpcyBpcyBzdGFuZHN0aWxsXCJ9LFwiM1wiOntcIkltYWdlTmFtZVwiOlwiR2VuZXJhbEVycm9yXCIsXCJUb29sdGlwXCI6XCJBeGlzIGlzIGluIGVycm9yIHN0YXRlXCJ9LFwiNFwiOntcIkltYWdlTmFtZVwiOlwiR2VhclJvdGF0aW5nXCIsXCJUb29sdGlwXCI6XCJBeGlzIGlzIG1vdmluZ1wifSxcIjVcIjp7XCJJbWFnZU5hbWVcIjpcIkdlYXJzUm90YXRpbmdcIixcIlRvb2x0aXBcIjpcIkF4aXMgaXMgc3luY2hyb25pemVkXCJ9fX19LHtcIldhdGNoYWJsZVN0YXRlXCI6e1wiUmVmXCI6XCJDb250cm9sbGVyX3N0YXRlXCIsXCJXYXRjaGFibGVWYXJpYWJsZXNNYXBwaW5nXCI6W1tcIklzIFBvd2VyZWRcIixcIklzX1Bvd2VyZWRcIl1dLFwiSWNvbkV4cHJlc3Npb25cIjpcIklzX1Bvd2VyZWQgPT0gdHJ1ZSA/IDEgOiAwXCIsXCJJY29uXCI6e1wiMFwiOntcIkltYWdlTmFtZVwiOlwiT2ZmXCIsXCJUb29sdGlwXCI6XCJDb250cm9sbGVyIGlzIHN3aXRjaGVkIG9mZlwifSxcIjFcIjp7XCJJbWFnZU5hbWVcIjpcIk9uXCIsXCJUb29sdGlwXCI6XCJDb250cm9sbGVyIGlzIHN3aXRjaGVkIG9uXCJ9fX19LHtcIldhdGNoYWJsZVN0YXRlXCI6e1wiUmVmXCI6XCJBeGlzX3JlZmVyZW5jZV9zdGF0ZVwiLFwiV2F0Y2hhYmxlVmFyaWFibGVzTWFwcGluZ1wiOltbXCJJcyBIb21lZFwiLFwiSXNfSG9tZWRcIl0sW1wiUGxjT3BlbiBTdGF0ZVwiLFwiUExDX1N0YXRlXCJdXSxcIkljb25FeHByZXNzaW9uXCI6XCJJc19Ib21lZCA9PSB0cnVlID8gMSA6IFBMQ19TdGF0ZSA9PSA3ID8gMjogMFwiLFwiSWNvblwiOntcIjBcIjp7XCJJbWFnZU5hbWVcIjpcIlVua293blBvc2l0aW9uXCIsXCJUb29sdGlwXCI6XCJBeGlzIGlzIG5vdCBob21lZFwifSxcIjFcIjp7XCJJbWFnZU5hbWVcIjpcIktub3duUG9zaXRpb25cIixcIlRvb2x0aXBcIjpcIkF4aXMgaXMgaG9tZWRcIn0sXCIyXCI6e1wiSW1hZ2VOYW1lXCI6XCJGaW5kaW5nUG9zaXRpb25cIixcIlRvb2x0aXBcIjpcIkF4aXMgaXMgaG9taW5nXCJ9fX19XX19XX19JzsgXHJcbiAgICAgICAgICAgICAgICAvL21ldGFEYXRhWydNZXRhQ29uZmlnV2F0Y2hhYmxlc1N0YXRlcyddID0gSlNPTi5wYXJzZSh3YXRjaHN0YXRlTWV0YURhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vSnVzdCBmb3IgcHJvdG90eXBlOiBxdWlja0NvbW1hbmRzXHJcbiAgICAgICAgICAgICAgICAvLyB2YXIgcXVpY2tNZXRob2QgPSAnIHtcIlF1aWNrQ29tbWFuZHNTdHJ1Y3R1cmVcIjp7XCJTY29wZVwiOlwibWFwcC9Nb3Rpb24vQXhpcy9BY3BBeGlzXCIsXCJDaGlsZHNcIjpbe1wiR3JvdXBcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTWFpblwiLFwiQ2hpbGRzXCI6W3tcIlF1aWNrQ29tbWFuZFwiOntcIlJlZlwiOlwiUG93ZXIgT25cIixcIlRvb2x0aXBcIjpcIlBvd2VyIG9uXCIsXCJJbWFnZU5hbWVcIjpcIk9uXCJ9fSx7XCJRdWlja0NvbW1hbmRcIjp7XCJSZWZcIjpcIlBvd2VyIE9mZlwiLFwiVG9vbHRpcFwiOlwiUG93ZXIgb2ZmXCIsXCJJbWFnZU5hbWVcIjpcIk9mZlwifX0se1wiUXVpY2tDb21tYW5kXCI6e1wiUmVmXCI6XCJBYm9ydCBDb21tYW5kXCIsXCJUb29sdGlwXCI6XCJBYm9ydCBjb21tYW5kXCIsXCJJbWFnZU5hbWVcIjpcIlN0b3BcIn19LHtcIlF1aWNrQ29tbWFuZFwiOntcIlJlZlwiOlwiUmVzZXRcIixcIlRvb2x0aXBcIjpcIlJlc2V0XCIsXCJJbWFnZU5hbWVcIjpcIlJlc2V0XCJ9fV19fV19fSAnXHJcbiAgICAgICAgICAgICAgICAvLyBtZXRhRGF0YVsnTWV0YUNvbmZpZ1F1aWNrQ29tbWFuZHMnXSA9IEpTT04ucGFyc2UocXVpY2tNZXRob2QpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIHVwZGF0ZSBzcGVjaWZpYyBwYXJhbWV0ZXIgdHlwZXMgaW4gbWV0YSBkYXRhIG9iamVjdFxyXG4gICAgICAgICAgICBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlci5pbml0aWFsaXplTWV0YURhdGEobWV0YURhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbC5icm93c2VNZXRhRGF0YTogY291bGQgbm90IHBhcnNlIG1ldGEgZGF0YTogXCIgKyBlLm1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWV0YURhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZXhlY3V0ZUNvbXBvbmVudE1ldGhvZChjb21wb25lbnRNZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fbWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIuZXhlY3V0ZUNvbXBvbmVudE1ldGhvZChjb21wb25lbnRNZXRob2QpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY2FsbGVkIGFmdGVyIGNvbXBvbmVudCBwYXJhbWV0ZXJzIGhhdmUgYmVlbiB1cGRhdGVkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBjb21wb25lbnRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICAvLyBPYnNvbGV0ZSBiZWNhdXNlIGNvbXBvbmVudHMgY2FuJ3QgYmUgdXBkYXRlZCBhdCBydW50aW1lXHJcbiAgICAvKm9uQ29tcG9uZW50UGFyYW1ldGVyc1VwZGF0ZWQoY29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudCwgY29tcG9uZW50UGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSk6IGFueSB7XHJcbiAgICAgICAgdGhpcy5ldmVudENvbXBvbmVudFBhcmFtZXRlcnNVcGRhdGVkLnJhaXNlKHRoaXMsIG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgXCJ1cGRhdGVkQ29tcG9uZW50UGFyYW1ldGVyc1wiLCBjb21wb25lbnRQYXJhbWV0ZXJzKSk7XHJcbiAgICB9Ki9cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNhbGxlZCBhZnRlciBjb21wb25lbnQgbWV0aG9kcyBoYXZlIGJlZW4gdXBkYXRlZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnR9IGNvbXBvbmVudFxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBjb21wb25lbnRNZXRob2RzXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICAvLyBPYnNvbGV0ZSBiZWNhdXNlIGNvbXBvbmVudHMgY2FuJ3QgYmUgdXBkYXRlZCBhdCBydW50aW1lXHJcbiAgICAvKm9uQ29tcG9uZW50TWV0aG9kc1VwZGF0ZWQoY29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudCwgY29tcG9uZW50TWV0aG9kczogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXSk6IGFueSB7XHJcbiAgICAgICAgdGhpcy5ldmVudENvbXBvbmVudE1ldGhvZHNVcGRhdGVkLnJhaXNlKHRoaXMsIG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgXCJ1cGRhdGVkQ29tcG9uZW50TWV0aG9kc1wiLCBjb21wb25lbnRNZXRob2RzKSk7XHJcbiAgICB9Ki9cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlYWRzICBhbmQgdXBkYXRlcyB0aGUgcGFyYW1ldGVyIHZhbHVlcyBvZiB0aGUgc3BlY2lmaWVkIHBhcmFtZXRlciBsaXN0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBjb21wb25lbnRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBhc3luYyByZWFkUGFyYW1ldGVyVmFsdWVzKGNvbXBvbmVudFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuX21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyLnJlYWRQYXJhbWV0ZXJWYWx1ZXMoY29tcG9uZW50UGFyYW1ldGVycyk7XHJcbiAgICAgICAgdGhpcy5vblBhcmFtZXRlclZhbHVlc1VwZGF0ZWQoY29tcG9uZW50UGFyYW1ldGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBvYnNlcnZlcyB0aGUgcGFyYW1ldGVycyBmb3IgdmFsdWUgY2hhbmdlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SU9ic2VydmVyfSBvYnNlcnZlclxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW1bXX0gb2JzZXJ2YWJsZURhdGFNb2RlbEl0ZW1zXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIG9ic2VydmVEYXRhTW9kZWxJdGVtcyhvYnNlcnZlcjogSU9ic2VydmVyLCBvYnNlcnZhYmxlRGF0YU1vZGVsSXRlbXM6IE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVtdKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBhd2FpdCB0aGlzLl9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlci5vYnNlcnZlQ29tcG9uZW50TW9kZWxJdGVtcyhvYnNlcnZlciwgb2JzZXJ2YWJsZURhdGFNb2RlbEl0ZW1zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVub2JzZXJ2ZXMgdGhlIHBhc3NlZCBwYXJhbWV0ZXJzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gb2JzZXJ2ZXJcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gb2JzZXJ2YWJsZVBhcmFtZXRlcnNcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gc3VzcGVuZFxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIHVub2JzZXJ2ZUNvbXBvbmVudE1vZGVsSXRlbXMob2JzZXJ2ZXI6IGFueSwgb2JzZXJ2YWJsZVBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10sIHN1c3BlbmQ6Ym9vbGVhbikge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuX21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyLnVub2JzZXJ2ZUNvbXBvbmVudE1vZGVsSXRlbXMob2JzZXJ2ZXIsIG9ic2VydmFibGVQYXJhbWV0ZXJzLHN1c3BlbmQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaGFuZGxlcyBvYnNlcnZhYmxlIGNoYW5nZWQgbm90aWZpY2F0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50T2JzZXJ2ZWRJdGVtc0NoYW5nZWRBcmdzfSBldmVudEFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGhhbmRsZU9ic2VydmFibGVJdGVtc0NoYW5nZWQoZXZlbnRBcmdzOiBFdmVudE9ic2VydmVkSXRlbXNDaGFuZ2VkQXJncykge1xyXG5cclxuICAgICAgICBpZiAoZXZlbnRBcmdzLm9ic2VydmVyIGluc3RhbmNlb2YgRGF0YU1vZGVsQmFzZSkge1xyXG5cclxuICAgICAgICAgICAgLy8gY3JlYXRlIG1vZGVsIGNoYW5nZWQgYXJnc1xyXG4gICAgICAgICAgICBsZXQgbW9kZWxJdGVtc0NoYW5nZWRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyhldmVudEFyZ3Mub2JzZXJ2ZXIsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIFwiY2hhbmdlZCBvYnNlcnZhYmxlc1wiLCBldmVudEFyZ3MuY2hhbmdlZEl0ZW1zKTtcclxuICAgICAgICAgICAgLy8gbm90aWZ5IG9ic2VydmVycyBmcm9tIGNoYW5naW5nIG1vZGVsIGl0ZW1zXHJcbiAgICAgICAgICAgIGV2ZW50QXJncy5vYnNlcnZlci5vbk1vZGVsSXRlbXNDaGFuZ2VkKGV2ZW50QXJncy5vYnNlcnZlciwgbW9kZWxJdGVtc0NoYW5nZWRBcmdzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBub3RpZnkgZnJvbSB1cGRhdGluZyB0aGUgc3BlY2lmaWVkIHBhcmFtZXRlcnMgdmFsdWVzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBjb21wb25lbnRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uUGFyYW1ldGVyVmFsdWVzVXBkYXRlZChjb21wb25lbnRQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKTogYW55IHtcclxuICAgICAgICB0aGlzLmV2ZW50UGFyYW1ldGVyVmFsdWVzVXBkYXRlZC5yYWlzZSh0aGlzLCBjb21wb25lbnRQYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCB3aGVuIHRoZSBtb2RlbCBoYXMgYmVlbiBzdWNjZXNzZnVsbHkgY29ubmVjdGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uTW9kZWxDb25uZWN0ZWQoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX21vZGVsQ29ubmVjdGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm9uTW9kZWxDb25uZWN0aW9uQ2hhbmdlZCh0aGlzLl9tb2RlbENvbm5lY3RlZCk7IFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIHdoZW4gdGhlIG1vZGVsIGhhcyBsb3N0IHRoZSBjb25uZWN0aW9uIHRvIHRoZSB0YXJnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25Nb2RlbERpc2Nvbm5lY3RlZCgpIHtcclxuICAgICAgICAvLyBub3RpZnkgY29ubmVjdGlvbiBjaGFuZ2VcclxuICAgICAgICB0aGlzLl9tb2RlbENvbm5lY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMub25Nb2RlbENvbm5lY3Rpb25DaGFuZ2VkKHRoaXMuX21vZGVsQ29ubmVjdGVkKTsgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnNlcnZlcyB0aGUgY29ubmVjdGlvbiBpZiBpdCBpcyBzdGlsbCBhbGl2ZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhcnRPYnNlcnZlTW9kZWxDb25uZWN0aW9uKCk6IGFueSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gaW5pdGlhbGx5IG5vdGlmeSB0aGUgc3VjY2Vzc2Z1bGwgY29ubmVjdGlvblxyXG4gICAgICAgIHRoaXMub25Nb2RlbENvbm5lY3RlZCgpO1xyXG5cclxuICAgICAgICAvLyBlc3RhYmxpc2ggYSB0aW1lciBmb3Igd2F0Y2hpbmcgdGhlIGNvbm5lY3Rpb25cclxuICAgICAgICBpZiAodGhpcy5fY29ubmVjdGlvbk9ic2VydmF0aW9uVGltZXJJZCA9PSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25uZWN0aW9uT2JzZXJ2YXRpb25UaW1lcklkID0gc2V0SW50ZXJ2YWwoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5vYnNlcnZlTW9kZWxDb25uZWN0aW9uKCk7XHJcbiAgICAgICAgICAgIH0sIHRoaXMuX2Nvbm5lY3Rpb25PYnNlcnZhdGlvbkludGVydmFsKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnNlcmV2ZXMgdGhlIG1vZGVsIGNvbm5lY3Rpb24gXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBvYnNlcnZlTW9kZWxDb25uZWN0aW9uKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHJlYWQgdGhlIGNvbm5lY3Rpb24gc3RhdGVcclxuICAgICAgICBsZXQgaXNDb25uZWN0ZWQgPSBhd2FpdCB0aGlzLl9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlci5jaGVja1RhcmdldENvbm5lY3Rpb24oKTsgICBcclxuIFxyXG4gICAgICAgIGlmIChpc0Nvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX21vZGVsQ29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTW9kZWxDb25uZWN0ZWQoKTtcclxuICAgICAgICAgICAgfSAgICAgICBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX21vZGVsQ29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTW9kZWxEaXNjb25uZWN0ZWQoKTsgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgd2hlbiB0aGUgbW9kZWwgY29ubmVjdGlvbiBoYXMgY2hhbmdlZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gY29ubmVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBvbk1vZGVsQ29ubmVjdGlvbkNoYW5nZWQoY29ubmVjdGVkOmJvb2xlYW4pOiBhbnkge1xyXG4gICAgICAgIHRoaXMuZXZlbnRNb2RlbENvbm5lY3Rpb25DaGFuZ2VkLnJhaXNlKHRoaXMsY29ubmVjdGVkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb3ZpZGVzIGNvbW1hbmQgZm9yIGNoYW5naW5nIHRoZSB1c2VyIHRvIGJlIGxvZ2dlZCBpblxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtJQ29tbWFuZEV4ZWN1dGlvbkRlbGVnYXRlPGFueSxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIGV4ZWN1dGVDb21tYW5kQ2hhbmdlVXNlcigpOiBJQ29tbWFuZEV4ZWN1dGlvbkRlbGVnYXRlPGFueSxhbnk+IHtcclxuICAgICAgICByZXR1cm4gYXN5bmMgKHVzZXJJbmZvOiB7fSwgY29tbWFuZFJlc3BvbnNlOiBJQ29tbWFuZEV4ZWN1dGlvblJlc3BvbnNlRGVsZWdhdGU8YW55PikgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSB1c2VyIHJvbGVzXHJcbiAgICAgICAgICAgICAgICB0aGlzLl91c2VyUm9sZXMudmFsdWUgPSAgYXdhaXQgdGhpcy5fbWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIuY2hhbmdlVXNlcih1c2VySW5mbykgYXMgc3RyaW5nW107XHJcbiAgICAgICAgICAgICAgICBjb21tYW5kUmVzcG9uc2UuZXhlY3V0ZWQodGhpcy5fdXNlclJvbGVzKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbW1hbmRSZXNwb25zZS5yZWplY3RlZChlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCB9OyJdfQ==