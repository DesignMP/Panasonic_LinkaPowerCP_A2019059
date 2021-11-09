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
define(["require", "exports", "../../framework/property", "../../framework/command", "./mappCockpitComponentReflection", "../../common/numericHelper", "../../widgets/methodParameterListWidget/parameterFilter", "../common/stateExpression/watchableStateExpression"], function (require, exports, property_1, command_1, mappCockpitComponentReflection_1, numericHelper_1, parameterFilter_1, watchableStateExpression_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implements the base memebers for managing component model members.
     *
     * @class MappCockpitComponentItem
    /**
     *
     *
     * @class MappCockpitComponentItem
     */
    var MappCockpitComponentItem = /** @class */ (function () {
        /**
         * creates an instance of MappCockpitComponentItem.
         * @param {MappCockpitComponentItem} component
         * @param {string} name
         * @param {*} reference
         * @memberof MappCockpitComponentItem
         */
        function MappCockpitComponentItem(component, name, reference) {
            // Holds the items value
            // protected _value: any = "";
            // holds subitems if any
            this._items = [];
            this._valueSource = property_1.Property.create("");
            // holds the user roles
            this._writeAccess = property_1.Property.create(false);
            // specifies a response delaget for write requets
            this._reflectedWriteResponseDelegate = undefined;
            this._reference = reference;
            this._displayName = name;
            this._component = component;
        }
        Object.defineProperty(MappCockpitComponentItem.prototype, "displayName", {
            /**
             * Returns the items display name
             *
             * @readonly
             * @type {string}
             * @memberof MappCockpitComponentItem
             */
            get: function () {
                return this._displayName;
            },
            set: function (displayName) {
                this._displayName = displayName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "browseName", {
            get: function () {
                return this._reference.browseName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "name", {
            get: function () {
                return this._reference.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "component", {
            get: function () {
                return this._component;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "writeAccess", {
            /**
             * Gets the current user roles
             *
             * @readonly
             * @type {string[]}
             * @memberof MappCockpitComponentDataModel
             */
            get: function () {
                return this._writeAccess;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "id", {
            /**
             * Returns the items id
             *
             * @readonly
             * @type {string}
             * @memberof MappCockpitComponentItem
             */
            get: function () {
                return this._reference.nodeId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "value", {
            /**
             * sets/gets the items value object
             *
             * @readonly
             * @type {(MappCockpitComponentParameterValue|undefined)}
             * @memberof MappCockpitComponentParameter
             */
            get: function () {
                return this._valueSource.value;
            },
            set: function (value) {
                this._valueSource.value = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "valueSource", {
            get: function () {
                return this._valueSource;
            },
            set: function (valueSource) {
                this._valueSource = valueSource;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "reflectedWriteResponseDelegate", {
            /**
             * Gets the delegate for observing write respomses
             *
             * @memberof MappCockpitComponentItem
             */
            get: function () {
                return this._reflectedWriteResponseDelegate;
            },
            /**
             * Sets a delegate for observing write responses
             *
             * @memberof MappCockpitComponentItem
             */
            set: function (reflectedWriteResponseDelegate) {
                this._reflectedWriteResponseDelegate = reflectedWriteResponseDelegate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "displayValue", {
            /**
             * gets the value as formatted string if appropiate
             *
             * @type {*}
             * @memberof MappCockpitComponentItem
             */
            get: function () {
                return this._valueSource.toString();
            },
            set: function (inputValue) {
                this._valueSource.value = inputValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "dataTypeId", {
            get: function () {
                return this._reference.dataType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "items", {
            /**
             * gets the subitems if any
             *
             * @readonly
             * @type {Array<MappCockpitComponentItem>}
             * @memberof MappCockpitComponentItem
             */
            get: function () {
                return this._items;
            },
            enumerable: true,
            configurable: true
        });
        return MappCockpitComponentItem;
    }());
    exports.MappCockpitComponentItem = MappCockpitComponentItem;
    /**
     * The class represents a component to be used within mapp cockpit UI
     *
     * @class MappCockpitComponent
     */
    var MappCockpitComponent = /** @class */ (function (_super) {
        __extends(MappCockpitComponent, _super);
        function MappCockpitComponent() {
            /**
             * Holds the component methods
             *
             * @protected
             * @type {Array<MappCockpitComponentMethod>}
             * @memberof MappCockpitComponent
             */
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // Holds the component methods
            _this._methods = [];
            _this._quickCommands = [];
            _this._userMethods = [];
            // Holds the component parameters
            _this._parameters = [];
            _this._watchableParameters = [];
            _this._watchableStateParameters = [];
            _this._configurationParameters = [];
            _this._messageParameters = [];
            _this._metaData = undefined;
            _this._parametersSource = property_1.Property.create([], function (dataLink) { _this.requestReadComponentParameters(dataLink); });
            _this._messageParametersSource = property_1.Property.create([], function (dataLink) { _this.requestReadComponentParameters(dataLink); });
            _this._watchableParametersSource = property_1.Property.create([], function (dataLink) { _this.requestReadComponentParameters(dataLink); });
            _this._configurationParametersSource = property_1.Property.create([], function (dataLink) { _this.requestReadComponentParameters(dataLink); });
            _this._methodsSource = property_1.Property.create([], function (dataLink) { _this.requestReadComponentMethods(dataLink); });
            _this._commandConnect = command_1.Command.create(_this, _this.executeCommandConnect());
            return _this;
        }
        Object.defineProperty(MappCockpitComponent.prototype, "commandConnectComponent", {
            /**
             * sets/gets the parameters of the component
             *
             * @readonly
             * @type {Array<MappCockpitComponentParameter>}
             * @memberof MappCockpitComponent
             */
            get: function () {
                return this._commandConnect;
            },
            enumerable: true,
            configurable: true
        });
        MappCockpitComponent.prototype.executeCommandConnect = function () {
            var _this = this;
            return function (commandPars, commandResponse) { return __awaiter(_this, void 0, void 0, function () {
                var model, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            model = this.model;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            if (!model) return [3 /*break*/, 3];
                            // read parameter component set
                            return [4 /*yield*/, model.browseComponent(this)];
                        case 2:
                            // read parameter component set
                            _a.sent();
                            // intitially update the components access rights
                            this.updateComponentAccessRights(model);
                            // watch access right changes
                            this.observeComponentAccessRights(model);
                            // update the data link
                            commandResponse.executed();
                            _a.label = 3;
                        case 3: return [3 /*break*/, 5];
                        case 4:
                            error_1 = _a.sent();
                            commandResponse.rejected(error_1);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            }); };
        };
        /**
         * Observes changes of the access rights
         *
         * @private
         * @param {MappCockpitComponentDataModel} mainModel
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.prototype.observeComponentAccessRights = function (mainModel) {
            var _this = this;
            mainModel.userRoles.changed(function (userRoles) {
                _this.updateComponentAccessRights(mainModel);
            });
        };
        /**
         * Updates the componentrs access rights
         *
         * @private
         * @param {MappCockpitComponentDataModel} mainModel
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.prototype.updateComponentAccessRights = function (mainModel) {
            var writeAccess = mainModel.writeAccess;
            console.log("user roles changed %o write access =%o", mainModel.userRoles.value, writeAccess);
            this.updateComponentMemberAccessRights(writeAccess);
            this.writeAccess.value = writeAccess;
        };
        /**
         * Updates the access rights of component members
         *
         * @param {boolean} writeAccess
         * @returns {*}
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.prototype.updateComponentMemberAccessRights = function (writeAccess) {
            this.updateParameterAccessRights(writeAccess);
            this.updateMethodsAccessRights(writeAccess);
        };
        /**
         * Updates the parameters access rights
         *
         * @private
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.prototype.updateParameterAccessRights = function (writeAccess) {
            this.parameters.forEach(function (parameter) {
                // rewrite the parameters write access property with its original raw value to force triggering the changed event. This is just a workaround
                // to fix the log in/out problem displaying wrong readonly states.
                // the workaround is intended to be replaced by proper batch refresh requests!
                parameter.isWriteable.value = parameter.isWriteable._value;
            });
        };
        /**
         * Updates the methods access rights
         *
         * @private
         * @returns {*}
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.prototype.updateMethodsAccessRights = function (writeAccess) {
            this.methods.forEach(function (method) {
                method.isExecutable.value = writeAccess;
            });
        };
        Object.defineProperty(MappCockpitComponent.prototype, "methods", {
            /**
             * sets/gets the parameters of the component
             *
             * @readonly
             * @type {Array<MappCockpitComponentParameter>}
             * @memberof MappCockpitComponent
             */
            get: function () {
                return this._methods;
            },
            set: function (methods) {
                this._methods = methods;
                this._methodsSource.value = this._methods;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "methodsSource", {
            get: function () {
                return this._methodsSource;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "quickCommands", {
            get: function () {
                return this._quickCommands;
            },
            set: function (quickCommands) {
                this._quickCommands = quickCommands;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "userMethods", {
            get: function () {
                return this._userMethods;
            },
            set: function (methods) {
                this._userMethods = methods;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "parameters", {
            /**
             * sets/gets the parameters of the component
             *
             * @readonly
             * @type {Array<MappCockpitComponentParameter>}
             * @memberof MappCockpitComponent
             */
            get: function () {
                return this._parameters;
            },
            set: function (parameters) {
                this._parameters = parameters;
                this._parametersSource.value = this._parameters;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "watchableParameters", {
            get: function () {
                return this._watchableParameters;
            },
            set: function (parameters) {
                this._watchableParameters = parameters;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "watchableStateParameters", {
            get: function () {
                return this._watchableStateParameters;
            },
            set: function (parameters) {
                this._watchableStateParameters = parameters;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "messageParameters", {
            get: function () {
                return this._messageParameters;
            },
            set: function (parameters) {
                this._messageParameters = parameters;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "configurationParameters", {
            get: function () {
                return this._configurationParameters;
            },
            set: function (parameters) {
                this._configurationParameters = parameters;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "parametersSource", {
            get: function () {
                return this._parametersSource;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "messageParametersSource", {
            get: function () {
                // filter the watchables and update the watchables parameter list
                this._messageParametersSource.value = this._messageParameters;
                return this._messageParametersSource;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "watchableParametersSource", {
            get: function () {
                // filter the watchables and update the watchables parameter list
                this._watchableParametersSource.value = this._watchableParameters;
                return this._watchableParametersSource;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "configurationParametersSource", {
            get: function () {
                this._configurationParametersSource.value = this._configurationParameters;
                return this._configurationParametersSource;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * refreshes the components parameter list
         *
         * @private
         * @param {Property<MappCockpitComponentParameter[]>} dataLink
         * @returns {*}
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.prototype.requestReadComponentParameters = function (dataLink) {
            return __awaiter(this, void 0, void 0, function () {
                var componentParameters, model, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            componentParameters = [];
                            model = this.model;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            if (!model) return [3 /*break*/, 3];
                            return [4 /*yield*/, model.browseParameters(this)];
                        case 2:
                            // read parameter component set
                            componentParameters = _a.sent();
                            // update the data link
                            dataLink.readRequestExecuted(componentParameters);
                            _a.label = 3;
                        case 3: return [3 /*break*/, 5];
                        case 4:
                            error_2 = _a.sent();
                            dataLink.readRequestRejected(error_2);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/, componentParameters];
                    }
                });
            });
        };
        /**
         * Refreshes the components methods
         *
         * @param {Property<MappCockpitComponentMethod[]>} dataLink
         * @returns {*}
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.prototype.requestReadComponentMethods = function (dataLink) {
            return __awaiter(this, void 0, void 0, function () {
                var componentMethods, model, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            componentMethods = [];
                            model = this.model;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            if (!model) return [3 /*break*/, 3];
                            return [4 /*yield*/, model.browseMethods(this)];
                        case 2:
                            // read parameter component set
                            componentMethods = _a.sent();
                            // update the data link
                            dataLink.readRequestExecuted(componentMethods);
                            _a.label = 3;
                        case 3: return [3 /*break*/, 5];
                        case 4:
                            error_3 = _a.sent();
                            dataLink.readRequestRejected(error_3);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/, componentMethods];
                    }
                });
            });
        };
        Object.defineProperty(MappCockpitComponent.prototype, "metaData", {
            /**
             *  gets the meta data of a component
             *
             * @type {*}
             * @memberof MappCockpitComponent
             */
            get: function () {
                return this._metaData;
            },
            set: function (metaData) {
                this._metaData = metaData;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Registers or marks the component as user component
         *
         * @static
         * @param {MappCockpitComponent} component
         * @returns {*}
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.registerUserComponent = function (component) {
            component.isUserComponent = true;
        };
        /**
         * Determines if the component is a user component
         *
         * @static
         * @param {MappCockpitComponent} component
         * @returns {boolean}
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.isUserComponent = function (component) {
            return component.isUserComponent;
        };
        return MappCockpitComponent;
    }(MappCockpitComponentItem));
    exports.MappCockpitComponent = MappCockpitComponent;
    /**
     * The class implements method access.
     *
     * @class MappCockpitComponentMethod
     */
    var MappCockpitComponentMethod = /** @class */ (function (_super) {
        __extends(MappCockpitComponentMethod, _super);
        function MappCockpitComponentMethod() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // Holds the method parameters
            _this._inputParameters = [];
            // specefies if the method is executable
            _this._isExecutable = property_1.Property.create(false, undefined, undefined, function (value) { return _this.methodIsExecutable(value); });
            return _this;
        }
        Object.defineProperty(MappCockpitComponentMethod.prototype, "inputParameters", {
            /**
             * Returns the input parameters of the method
             *
             * @readonly
             * @type {Array<MappCockpitMethodParameter>}
             * @memberof MappCockpitComponentMethod
             */
            get: function () {
                return this._inputParameters;
            },
            set: function (value) {
                this._inputParameters = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Invokes the execution of the component method
         *
         * @static
         * @param {MappCockpitComponentMethod} componentMethod
         * @returns {*}
         * @memberof MappCockpitComponentMethod
         */
        MappCockpitComponentMethod.execute = function (componentMethod) {
            return __awaiter(this, void 0, void 0, function () {
                var model;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            model = componentMethod.component.model;
                            if (!(model && model.executeComponentMethod)) return [3 /*break*/, 2];
                            return [4 /*yield*/, model.executeComponentMethod(componentMethod)];
                        case 1: 
                        // invoke the execution of the method
                        return [2 /*return*/, _a.sent()];
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Finds a method by name
         *
         * @static
         * @param {string} methodName
         * @param {(MappCockpitComponentMethod[]|undefined)} componentMethods
         * @param {boolean} [includeInternals=true]
         * @returns {MappCockpitComponentMethod|undefined}
         * @memberof MappCockpitComponentMethod
         */
        MappCockpitComponentMethod.find = function (methodName, componentMethods, includeInternals) {
            if (includeInternals === void 0) { includeInternals = true; }
            var method = undefined;
            if (componentMethods) {
                var model = componentMethods[0].component.model;
                if (model) {
                    // get the executable methods
                    var executableMethods = includeInternals ? componentMethods[0].component.methods : componentMethods;
                    var matchingMethods = executableMethods.filter(function (method) { return method.browseName === methodName; });
                    if (matchingMethods.length === 1) {
                        // call the requested method
                        method = matchingMethods[0];
                    }
                }
            }
            return method;
        };
        Object.defineProperty(MappCockpitComponentMethod.prototype, "isExecutable", {
            /**
             * Gets if the method is executable
             *
             * @readonly
             * @type {Property<boolean>}
             * @memberof MappCockpitComponentMethod
             */
            get: function () {
                return this._isExecutable;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Determines if the methid is executable
         *
         * @param {boolean} executable
         * @returns {*}
         * @memberof MappCockpitComponentMethod
         */
        MappCockpitComponentMethod.prototype.methodIsExecutable = function (executable) {
            var isExecutableValue = executable;
            var model = this.component.model;
            if (model && this.component) {
                // enable method execution for non user components
                isExecutableValue = MappCockpitComponent.isUserComponent(this.component) ? isExecutableValue : true;
            }
            return isExecutableValue;
        };
        /**
         * Updates the methods input parameters
         *
         * @static
         * @param {MappCockpitComponentMethod} componentMethod
         * @returns {Promise<MappCockpitMethodParameter[]>}
         * @memberof MappCockpitComponentMethod
         */
        MappCockpitComponentMethod.updateInputParameters = function (componentMethod) {
            return __awaiter(this, void 0, void 0, function () {
                var model;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            model = componentMethod.component.model;
                            if (!(model && model.executeComponentMethod)) return [3 /*break*/, 2];
                            return [4 /*yield*/, model.browseMethodInputParameters(componentMethod)];
                        case 1:
                            _a.sent();
                            mappCockpitComponentReflection_1.MappCockpitComponentMethodInfo.updateMethodInputParameters(componentMethod);
                            _a.label = 2;
                        case 2: return [2 /*return*/, componentMethod.inputParameters];
                    }
                });
            });
        };
        return MappCockpitComponentMethod;
    }(MappCockpitComponentItem));
    exports.MappCockpitComponentMethod = MappCockpitComponentMethod;
    var MappCockpitParameter = /** @class */ (function (_super) {
        __extends(MappCockpitParameter, _super);
        function MappCockpitParameter() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // Holds the parameters type
            _this._dataType = new MappCockpitParameterDataType();
            _this._enumRef = new MappCockpitComponentParameterEnum(null);
            _this._engineeringUnit = "";
            _this._isWriteable = property_1.Property.create(false, undefined, undefined, function (value) { return _this.parameterIsWritable(value); });
            return _this;
        }
        Object.defineProperty(MappCockpitParameter.prototype, "dataType", {
            /**
             * Returns the parameters value object
             *
             * @readonly
             * @type {(MappCockpitParameterDataType)}
             * @memberof MappCockpitParameter
             */
            get: function () {
                return this._dataType;
            },
            set: function (dataType) {
                this._dataType = dataType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitParameter.prototype, "engineeringUnit", {
            get: function () {
                return this._engineeringUnit;
            },
            set: function (engineeringUnit) {
                this._engineeringUnit = engineeringUnit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitParameter.prototype, "enumType", {
            get: function () {
                return this._enumRef;
            },
            set: function (enumRef) {
                this._enumRef = enumRef;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitParameter.prototype, "isWriteable", {
            get: function () {
                return this._isWriteable;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Determines if the properties value is writable.
         *
         * @private
         * @param {boolean} value
         * @returns {boolean}
         * @memberof MappCockpitParameter
         */
        MappCockpitParameter.prototype.parameterIsWritable = function (writable) {
            var writableValue = writable;
            var model = this.component.model;
            if (model) {
                writableValue = writable && model.writeAccess;
            }
            return writableValue;
        };
        Object.defineProperty(MappCockpitParameter.prototype, "displayValue", {
            get: function () {
                return this.valueToString(this._valueSource.value);
            },
            set: function (inputValue) {
                var newValue = this.valueFromString(inputValue);
                this.value = newValue;
                console.log("MappCockpitParameter.setDisplayValue %o for %o", this.value, inputValue);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * converts the parameter value to a formatted string
         *
         * @param {*} _value
         * @returns {string}
         * @memberof MappCockpitParameter
         */
        MappCockpitParameter.prototype.valueToString = function (_value) {
            var valueString = "";
            // avoid converting null or undefined value
            if (this._valueSource.value != null && this._valueSource.value != undefined) {
                valueString = this._valueSource.value.toString();
                valueString = numericHelper_1.NumericHelper.convertNumericString(valueString, this.dataType.name);
                if (this.enumType.isDefined) {
                    valueString = this.enumType.getDisplayValue(this._valueSource.value);
                }
            }
            return valueString;
        };
        /**
         * converts a parameter value string to a value according to the parameters data type
         *
         * @param {string} inputValue
         * @returns {*}
         * @memberof MappCockpitParameter
         */
        MappCockpitParameter.prototype.valueFromString = function (inputValue) {
            // set an empty string for an undefined input value
            var value = inputValue !== undefined && inputValue !== null ? inputValue : "";
            // replace the enum string by the value if there is one defined.
            if (this.enumType.isDefined) {
                value = this.enumType.getValue(inputValue);
            }
            return value;
        };
        return MappCockpitParameter;
    }(MappCockpitComponentItem));
    /**
     * The class implements a component parameter
     *
     * @class MappCockpitComponentParameter
     */
    var MappCockpitComponentParameter = /** @class */ (function (_super) {
        __extends(MappCockpitComponentParameter, _super);
        function MappCockpitComponentParameter(component, name, reference) {
            var _this = _super.call(this, component, name, reference) || this;
            _this._valueSource = property_1.Property.create("", undefined, function (dataLink) { return _this.requestWriteValue(dataLink); });
            return _this;
        }
        /**
         * Writes the current parameter value to target
         *
         * @memberof MappCockpitComponentParameter
         */
        MappCockpitComponentParameter.prototype.write = function (reflectedWriteResponseDelegate) {
            // connect the write response delegate
            this.reflectedWriteResponseDelegate = reflectedWriteResponseDelegate;
            // execute writing the parameter value
            this.valueSource.write();
        };
        /**
         * Writes the data links value to target
         *
         * @private
         * @param {Property<any>} dataLink
         * @memberof MappCockpitComponentParameter
         */
        MappCockpitComponentParameter.prototype.requestWriteValue = function (dataLink) {
            return __awaiter(this, void 0, void 0, function () {
                var component, model, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            component = this.component;
                            if (!(component && component.model)) return [3 /*break*/, 2];
                            model = component.model;
                            return [4 /*yield*/, model.writeComponentParameter(this)];
                        case 1:
                            _a.sent();
                            dataLink.writeRequestExecuted(null);
                            _a.label = 2;
                        case 2: return [3 /*break*/, 4];
                        case 3:
                            error_4 = _a.sent();
                            dataLink.writeRequestRejected(error_4);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Initiates the observation of parameter value changes
         *
         * @static
         * @param {MappCockpitComponentParameter[]} watchableParameters
         * @returns {*}
         * @memberof MappCockpitComponentParameter
         */
        MappCockpitComponentParameter.observeParameterValueChanges = function (observer, observableParameters) {
            if (observableParameters.length > 0 && observableParameters[0] != undefined) {
                // get the parameters model from the parent component
                var model = MappCockpitComponentParameter.getModel(observableParameters[0]);
                if (model && model.observeDataModelItems) {
                    // invoke the observation on the model
                    model.observeDataModelItems(observer, observableParameters);
                }
            }
        };
        /**
         * Activates model items registered for observation
         *
         * @static
         * @param {*} observer
         * @param {MappCockpitComponentParameter[]} observableParameters
         * @returns {*}
         * @memberof MappCockpitComponentParameter
         */
        MappCockpitComponentParameter.activateComponentModelItems = function (observer, observableParameters) {
            //TODO: implement model item activation handling
        };
        /**
         * Unobserves all observables associated with the observer
         *
         * @static
         * @param {*} observer
         * @param {MappCockpitComponentParameter[]} observedParameters
         * @param {boolean} [suspend=true] suspends the observation if true otherwise removes the whole subscription
         * @memberof MappCockpitComponentParameter
         */
        MappCockpitComponentParameter.unobserveComponentModelItems = function (observer, observedParameters, suspend) {
            if (suspend === void 0) { suspend = true; }
            if (observedParameters.length > 0 && observedParameters[0] != undefined) {
                var model = MappCockpitComponentParameter.getModel(observedParameters[0]);
                if (model && model.unobserveComponentModelItems) {
                    // invoke the unobservation on the model
                    model.unobserveComponentModelItems(observer, observedParameters, suspend);
                }
            }
        };
        /**
         * Deactivates model items registered for observation
         *
         * @static
         * @param {*} observer
         * @param {MappCockpitComponentParameter[]} observedParameters
         * @param {boolean} [suspend=true]
         * @memberof MappCockpitComponentParameter
         */
        MappCockpitComponentParameter.deactivateComponentModelItems = function (observer, observedParameters, suspend) {
            if (suspend === void 0) { suspend = true; }
            //TODO: implement model item deactivation handling
        };
        /**
         * Gets the parameters model
         *
         * @private
         * @static
         * @param {MappCockpitComponentParameter[]} observableParameters
         * @returns
         * @memberof MappCockpitComponentParameter
         */
        MappCockpitComponentParameter.getModel = function (componentParameter) {
            if (!componentParameter) {
                console.error("componentParameter undefined !");
            }
            if (!componentParameter.component) {
                console.error("componentParameter.component undefined !");
            }
            return componentParameter.component.model;
        };
        return MappCockpitComponentParameter;
    }(MappCockpitParameter));
    exports.MappCockpitComponentParameter = MappCockpitComponentParameter;
    /**
     * Defines class used for state icons
     *
     * @class MappCockpitStateParameter
     */
    var MappCockpitStateParameter = /** @class */ (function () {
        function MappCockpitStateParameter(name, expression, watchableMapping, icon) {
            // Holds watchable state expression class
            this.stateExpression = new watchableStateExpression_1.WatchableStateExpression();
            this._name = name;
            this.stateExpression = new watchableStateExpression_1.WatchableStateExpression(name, expression, watchableMapping, icon);
        }
        Object.defineProperty(MappCockpitStateParameter.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        return MappCockpitStateParameter;
    }());
    exports.MappCockpitStateParameter = MappCockpitStateParameter;
    /**
     * implements a method parameter
     *
     * @class MappCockpitMethodParameter
     * @extends {MappCockpitParameter}
     */
    var MappCockpitMethodParameter = /** @class */ (function (_super) {
        __extends(MappCockpitMethodParameter, _super);
        function MappCockpitMethodParameter(component, name, reference) {
            var _this = _super.call(this, component, name, reference) || this;
            _this._filter = new parameterFilter_1.ParameterFilter();
            return _this;
        }
        Object.defineProperty(MappCockpitMethodParameter.prototype, "filter", {
            get: function () {
                return this._filter;
            },
            set: function (filter) {
                this._filter = filter;
            },
            enumerable: true,
            configurable: true
        });
        return MappCockpitMethodParameter;
    }(MappCockpitParameter));
    exports.MappCockpitMethodParameter = MappCockpitMethodParameter;
    /**
     * Defines the clas for quickcommands
     *
     * @class MappCockpitQuickCommandParameter
     */
    var MappCockpitQuickCommandParameter = /** @class */ (function () {
        function MappCockpitQuickCommandParameter(name, tooltip, imageName) {
            this._name = name;
            this._tooltip = tooltip;
            this._imageName = imageName;
        }
        Object.defineProperty(MappCockpitQuickCommandParameter.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitQuickCommandParameter.prototype, "tooltip", {
            get: function () {
                return this._tooltip;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitQuickCommandParameter.prototype, "imageName", {
            get: function () {
                return this._imageName;
            },
            enumerable: true,
            configurable: true
        });
        return MappCockpitQuickCommandParameter;
    }());
    exports.MappCockpitQuickCommandParameter = MappCockpitQuickCommandParameter;
    /**
     * defines the parameter data type
     *
     * @class MappCockpitComponentParameterDataType
     */
    var MappCockpitParameterDataType = /** @class */ (function () {
        function MappCockpitParameterDataType(dataTypeId, dataTypeName) {
            if (dataTypeId === void 0) { dataTypeId = "undefined"; }
            if (dataTypeName === void 0) { dataTypeName = "undefined"; }
            this._dataTypeId = "undefined";
            this._dataTypeName = "undefined";
            this._dataTypeId = dataTypeId;
            this._dataTypeName = dataTypeName;
        }
        Object.defineProperty(MappCockpitParameterDataType.prototype, "id", {
            get: function () {
                return this, this._dataTypeId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitParameterDataType.prototype, "name", {
            get: function () {
                return this._dataTypeName;
            },
            enumerable: true,
            configurable: true
        });
        return MappCockpitParameterDataType;
    }());
    exports.MappCockpitParameterDataType = MappCockpitParameterDataType;
    /**
     * implements a single enum value with value and string
     *
     * @class MappCockpitComponentParameterEnumValue
     */
    var MappCockpitComponentParameterEnumValue = /** @class */ (function () {
        /**
         * Creates an instance of MappCockpitComponentParameterEnumValue.
         * @param {string} displayText
         * @param {*} value
         * @memberof MappCockpitComponentParameterEnumValue
         */
        function MappCockpitComponentParameterEnumValue(displayText, value) {
            this._displayValue = "undefined";
            this._value = null;
            this._displayValue = displayText;
            this._value = value;
        }
        Object.defineProperty(MappCockpitComponentParameterEnumValue.prototype, "value", {
            /**
             * gets the value of the enum
             *
             * @readonly
             * @type {*}
             * @memberof MappCockpitComponentParameterEnumValue
             */
            get: function () {
                return this._value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentParameterEnumValue.prototype, "displayValue", {
            /**
             * gets the string of the enum value
             *
             * @readonly
             * @type {string}
             * @memberof MappCockpitComponentParameterEnumValue
             */
            get: function () {
                return this._displayValue;
            },
            enumerable: true,
            configurable: true
        });
        return MappCockpitComponentParameterEnumValue;
    }());
    exports.MappCockpitComponentParameterEnumValue = MappCockpitComponentParameterEnumValue;
    /**
     * implements a parameter enum holding a collection of enum items
     *
     * @class MappCockpitComponentParameterEnum
     */
    var MappCockpitComponentParameterEnum = /** @class */ (function () {
        function MappCockpitComponentParameterEnum(enumValuesReference) {
            if (enumValuesReference === void 0) { enumValuesReference = null; }
            this._browseName = "";
            this._enumValuesReference = enumValuesReference;
            if (this._enumValuesReference) {
                this._browseName = this._enumValuesReference.browseName;
                this._enumValues = this._enumValuesReference.enumValues.map(function (enumValueRef) { return new MappCockpitComponentParameterEnumValue(enumValueRef.displayName.text, enumValueRef.value); });
            }
        }
        Object.defineProperty(MappCockpitComponentParameterEnum.prototype, "browseName", {
            /**
             * gets the browse name of the enum
             *
             * @readonly
             * @type {string}
             * @memberof MappCockpitComponentParameterEnum
             */
            get: function () {
                return this._enumValuesReference.browseName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentParameterEnum.prototype, "values", {
            /**
             * gets the collection of enum items
             *
             * @readonly
             * @type {MappCockpitComponentParameterEnumValue[]}
             * @memberof MappCockpitComponentParameterEnum
             */
            get: function () {
                return this._enumValues;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentParameterEnum.prototype, "isDefined", {
            /**
             * determines if the enum is defined and contains values
             *
             * @readonly
             * @type {boolean}
             * @memberof MappCockpitComponentParameterEnum
             */
            get: function () {
                return this._enumValues && this._enumValues.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * gets a string matching the specified enum value, otherwise return value string as default.
         *
         * @returns {*}
         * @memberof MappCockpitComponentParameterEnum
         */
        MappCockpitComponentParameterEnum.prototype.getDisplayValue = function (enumValue) {
            // get an enum item matching the requested value
            var matchingEnumItem = this.findMatchingEnumItemByValue(enumValue);
            // update the value string to the matching one or use the default string
            var enumValueString = matchingEnumItem ? matchingEnumItem.displayValue : enumValue.toString();
            return enumValueString;
        };
        /**
         *
         *
         * @param {string} inputValue
         * @returns {*}
         * @memberof MappCockpitComponentParameterEnum
         */
        MappCockpitComponentParameterEnum.prototype.getValue = function (enumDisplayValue) {
            var enumValue = enumDisplayValue;
            // get an enum item matching the requested string
            var matchingEnumItem = this.findMatchingEnumItemByString(enumDisplayValue);
            if (matchingEnumItem) {
                enumValue = matchingEnumItem.value;
            }
            else {
                console.error("MappCockpitComponentParameterEnum.getValue: could not find matching enum value for %o", enumDisplayValue);
            }
            return enumValue;
        };
        /**
         * find an enum item with matching value
         *
         * @private
         * @param {*} enumValue
         * @returns
         * @memberof MappCockpitComponentParameterEnum
         */
        MappCockpitComponentParameterEnum.prototype.findMatchingEnumItemByValue = function (enumValue) {
            var matchingEnumItem = this._enumValues.filter(function (enumItem) { return enumItem.value == enumValue; });
            return matchingEnumItem.length === 1 ? matchingEnumItem[0] : undefined;
        };
        /**
         * find an enum item with matching string
         *
         * @param {string} enumDisplayValue
         * @returns {*}
         * @memberof MappCockpitComponentParameterEnum
         */
        MappCockpitComponentParameterEnum.prototype.findMatchingEnumItemByString = function (enumDisplayValue) {
            var matchingEnumItem = this._enumValues.filter(function (enumItem) { return enumItem.displayValue === enumDisplayValue; });
            return matchingEnumItem.length === 1 ? matchingEnumItem[0] : undefined;
        };
        return MappCockpitComponentParameterEnum;
    }());
    exports.MappCockpitComponentParameterEnum = MappCockpitComponentParameterEnum;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVdBOzs7Ozs7OztPQVFHO0lBQ0g7UUF3Qkk7Ozs7OztXQU1HO1FBQ0gsa0NBQVksU0FBMEMsRUFBRSxJQUFZLEVBQUUsU0FBYztZQTNCcEYsd0JBQXdCO1lBQ3hCLDhCQUE4QjtZQUM5Qix3QkFBd0I7WUFDZCxXQUFNLEdBQW9DLEVBQUUsQ0FBQztZQVE3QyxpQkFBWSxHQUFrQixtQkFBUSxDQUFDLE1BQU0sQ0FBTSxFQUFFLENBQUMsQ0FBQztZQUVqRSx1QkFBdUI7WUFDZixpQkFBWSxHQUFzQixtQkFBUSxDQUFDLE1BQU0sQ0FBVSxLQUFLLENBQUMsQ0FBQztZQUUxRSxpREFBaUQ7WUFDekMsb0NBQStCLEdBQTRDLFNBQVMsQ0FBQztZQVd6RixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztZQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUNoQyxDQUFDO1FBU0Qsc0JBQVcsaURBQVc7WUFQdEI7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztZQUM3QixDQUFDO2lCQUVELFVBQXVCLFdBQW1CO2dCQUN0QyxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztZQUNwQyxDQUFDOzs7V0FKQTtRQU1ELHNCQUFXLGdEQUFVO2lCQUFyQjtnQkFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO1lBQ3RDLENBQUM7OztXQUFBO1FBRUQsc0JBQVcsMENBQUk7aUJBQWY7Z0JBQ0ks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M0UsQ0FBQztRQUdMLHdDQUFDO0lBQUQsQ0FBQyxBQW5IRCxJQW1IQztJQUdtSiw4RUFBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGFEYXRhIH0gZnJvbSBcIi4vbWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YVwiO1xyXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvcHJvcGVydHlcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwgfSBmcm9tIFwiLi9jb21wb25lbnRzRGF0YU1vZGVsXCI7XHJcbmltcG9ydCB7IENvbW1hbmQsIElDb21tYW5kRXhlY3V0aW9uRGVsZWdhdGUgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2NvbW1hbmRcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvIH0gZnJvbSBcIi4vbWFwcENvY2twaXRDb21wb25lbnRSZWZsZWN0aW9uXCI7XHJcbmltcG9ydCB7IE51bWVyaWNIZWxwZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL251bWVyaWNIZWxwZXJcIjtcclxuaW1wb3J0IHsgSU9ic2VydmVyIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9pbnRlcmZhY2VzL29ic2VydmVyXCI7XHJcbmltcG9ydCB7IElWYWx1ZUxpc3RJdGVtIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9pbnRlcmZhY2VzL3ZhbHVlTGlzdEl0ZW1JbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUGFyYW1ldGVyRmlsdGVyIH0gZnJvbSBcIi4uLy4uL3dpZGdldHMvbWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldC9wYXJhbWV0ZXJGaWx0ZXJcIjtcclxuaW1wb3J0IHsgV2F0Y2hhYmxlU3RhdGVFeHByZXNzaW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9zdGF0ZUV4cHJlc3Npb24vd2F0Y2hhYmxlU3RhdGVFeHByZXNzaW9uXCI7XHJcblxyXG4vKipcclxuICogSW1wbGVtZW50cyB0aGUgYmFzZSBtZW1lYmVycyBmb3IgbWFuYWdpbmcgY29tcG9uZW50IG1vZGVsIG1lbWJlcnMuXHJcbiAqXHJcbiAqIEBjbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW1cclxuLyoqXHJcbiAqXHJcbiAqXHJcbiAqIEBjbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW1cclxuICovXHJcbmNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbSB7XHJcblxyXG4gICAgLy8gSG9sZHMgYSByZWZlcmVuY2UgdG8gdGhlIHVuZGVybHlpbmcgaXRlbVxyXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IF9yZWZlcmVuY2U6IGFueTtcclxuICAgIC8vIEhvbGRzIHRoZSBpdGVtcyB2YWx1ZVxyXG4gICAgLy8gcHJvdGVjdGVkIF92YWx1ZTogYW55ID0gXCJcIjtcclxuICAgIC8vIGhvbGRzIHN1Yml0ZW1zIGlmIGFueVxyXG4gICAgcHJvdGVjdGVkIF9pdGVtczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRJdGVtPiA9IFtdO1xyXG5cclxuICAgIC8vIGhvbGRzIHRoZSBkaWFwbGF5IG5hbWVcclxuICAgIHByb3RlY3RlZCBfZGlzcGxheU5hbWU6IGFueTtcclxuXHJcbiAgICAvLyBob2xkcyB0aGUgY29tcG9uZW50IHJlcHJlc2VudGluZyB0aGUgb3duZXIgb2YgdGhlIGNvbXBvbmVudCBpdGVtXHJcbiAgICBwcm90ZWN0ZWQgX2NvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnRJdGVtIHwgbnVsbDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgX3ZhbHVlU291cmNlOiBQcm9wZXJ0eTxhbnk+ID0gUHJvcGVydHkuY3JlYXRlPGFueT4oXCJcIik7XHJcblxyXG4gICAgLy8gaG9sZHMgdGhlIHVzZXIgcm9sZXNcclxuICAgIHByaXZhdGUgX3dyaXRlQWNjZXNzOiBQcm9wZXJ0eTxib29sZWFuPiA9IFByb3BlcnR5LmNyZWF0ZTxib29sZWFuPihmYWxzZSk7XHJcblxyXG4gICAgLy8gc3BlY2lmaWVzIGEgcmVzcG9uc2UgZGVsYWdldCBmb3Igd3JpdGUgcmVxdWV0c1xyXG4gICAgcHJpdmF0ZSBfcmVmbGVjdGVkV3JpdGVSZXNwb25zZURlbGVnYXRlOiAoKHJlc3VsdERhdGE6IGFueSkgPT4gdm9pZCkgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0uXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50SXRlbX0gY29tcG9uZW50XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQHBhcmFtIHsqfSByZWZlcmVuY2VcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW1cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoY29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0gfCBudWxsLCBuYW1lOiBzdHJpbmcsIHJlZmVyZW5jZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fcmVmZXJlbmNlID0gcmVmZXJlbmNlO1xyXG4gICAgICAgIHRoaXMuX2Rpc3BsYXlOYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLl9jb21wb25lbnQgPSBjb21wb25lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpdGVtcyBkaXNwbGF5IG5hbWUgXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGRpc3BsYXlOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc3BsYXlOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZGlzcGxheU5hbWUoZGlzcGxheU5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2Rpc3BsYXlOYW1lID0gZGlzcGxheU5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBicm93c2VOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlZmVyZW5jZS5icm93c2VOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZWZlcmVuY2UubmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbXBvbmVudCgpOiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0gfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29tcG9uZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgY3VycmVudCB1c2VyIHJvbGVzXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nW119XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB3cml0ZUFjY2VzcygpOiBQcm9wZXJ0eTxib29sZWFuPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dyaXRlQWNjZXNzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGl0ZW1zIGlkXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGlkKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlZmVyZW5jZS5ub2RlSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzZXRzL2dldHMgdGhlIGl0ZW1zIHZhbHVlIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUgeyhNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlclZhbHVlfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB2YWx1ZSgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZVNvdXJjZS52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl92YWx1ZVNvdXJjZS52YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdmFsdWVTb3VyY2UoKTogUHJvcGVydHk8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlU291cmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdmFsdWVTb3VyY2UodmFsdWVTb3VyY2U6IFByb3BlcnR5PGFueT4pIHtcclxuICAgICAgICB0aGlzLl92YWx1ZVNvdXJjZSA9IHZhbHVlU291cmNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyBhIGRlbGVnYXRlIGZvciBvYnNlcnZpbmcgd3JpdGUgcmVzcG9uc2VzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IHJlZmxlY3RlZFdyaXRlUmVzcG9uc2VEZWxlZ2F0ZShyZWZsZWN0ZWRXcml0ZVJlc3BvbnNlRGVsZWdhdGU6ICgocmVmbGVjdGVkV3JpdGVSZXNwb25zZVZhbHVlOiBhbnkpID0+IHZvaWQpIHwgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5fcmVmbGVjdGVkV3JpdGVSZXNwb25zZURlbGVnYXRlID0gcmVmbGVjdGVkV3JpdGVSZXNwb25zZURlbGVnYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgZGVsZWdhdGUgZm9yIG9ic2VydmluZyB3cml0ZSByZXNwb21zZXNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRJdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmVmbGVjdGVkV3JpdGVSZXNwb25zZURlbGVnYXRlKCk6ICgocmVmbGVjdGVkV3JpdGVSZXNwb25zZVZhbHVlOiBhbnkpID0+IHZvaWQpIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVmbGVjdGVkV3JpdGVSZXNwb25zZURlbGVnYXRlO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIHRoZSB2YWx1ZSBhcyBmb3JtYXR0ZWQgc3RyaW5nIGlmIGFwcHJvcGlhdGVcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBkaXNwbGF5VmFsdWUoKTogU3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWVTb3VyY2UudG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHNldCBkaXNwbGF5VmFsdWUoaW5wdXRWYWx1ZTogU3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fdmFsdWVTb3VyY2UudmFsdWUgPSBpbnB1dFZhbHVlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGRhdGFUeXBlSWQoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVmZXJlbmNlLmRhdGFUeXBlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyB0aGUgc3ViaXRlbXMgaWYgYW55XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRJdGVtPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpdGVtcygpOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXM7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogVGhlIGNsYXNzIHJlcHJlc2VudHMgYSBjb21wb25lbnQgdG8gYmUgdXNlZCB3aXRoaW4gbWFwcCBjb2NrcGl0IFVJXHJcbiAqXHJcbiAqIEBjbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gKi9cclxuY2xhc3MgTWFwcENvY2twaXRDb21wb25lbnQgZXh0ZW5kcyBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0ge1xyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgY29tcG9uZW50IG1ldGhvZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAdHlwZSB7QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKi9cclxuXHJcbiAgICAvLyBIb2xkcyB0aGUgY29tcG9uZW50IG1ldGhvZHNcclxuICAgIHByaXZhdGUgX21ldGhvZHM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kPiA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfcXVpY2tDb21tYW5kczogQXJyYXk8TWFwcENvY2twaXRRdWlja0NvbW1hbmRQYXJhbWV0ZXI+ID0gW107XHJcbiAgICBwcml2YXRlIF91c2VyTWV0aG9kczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+ID0gW107XHJcblxyXG4gICAgLy8gSG9sZHMgdGhlIGNvbXBvbmVudCBwYXJhbWV0ZXJzXHJcbiAgICBwcml2YXRlIF9wYXJhbWV0ZXJzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4gPSBbXTtcclxuICAgIHByaXZhdGUgX3dhdGNoYWJsZVBhcmFtZXRlcnM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPiA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfd2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXJzOiBBcnJheTxNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyPiA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfY29uZmlndXJhdGlvblBhcmFtZXRlcnM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPiA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfbWVzc2FnZVBhcmFtZXRlcnM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPiA9IFtdO1xyXG5cclxuXHJcbiAgICBwcml2YXRlIF9tZXRhRGF0YTogTWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX3BhcmFtZXRlcnNTb3VyY2U6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPj4gPSBQcm9wZXJ0eS5jcmVhdGU8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+PihbXSwgKGRhdGFMaW5rKSA9PiB7IHRoaXMucmVxdWVzdFJlYWRDb21wb25lbnRQYXJhbWV0ZXJzKGRhdGFMaW5rKTsgfSk7XHJcbiAgICBwcml2YXRlIF9tZXNzYWdlUGFyYW1ldGVyc1NvdXJjZTogUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+PiA9IFByb3BlcnR5LmNyZWF0ZTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4+KFtdLCAoZGF0YUxpbmspID0+IHsgdGhpcy5yZXF1ZXN0UmVhZENvbXBvbmVudFBhcmFtZXRlcnMoZGF0YUxpbmspOyB9KTtcclxuICAgIHByaXZhdGUgX3dhdGNoYWJsZVBhcmFtZXRlcnNTb3VyY2U6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPj4gPSBQcm9wZXJ0eS5jcmVhdGU8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+PihbXSwgKGRhdGFMaW5rKSA9PiB7IHRoaXMucmVxdWVzdFJlYWRDb21wb25lbnRQYXJhbWV0ZXJzKGRhdGFMaW5rKTsgfSk7XHJcbiAgICBwcml2YXRlIF9jb25maWd1cmF0aW9uUGFyYW1ldGVyc1NvdXJjZTogUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+PiA9IFByb3BlcnR5LmNyZWF0ZTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4+KFtdLCAoZGF0YUxpbmspID0+IHsgdGhpcy5yZXF1ZXN0UmVhZENvbXBvbmVudFBhcmFtZXRlcnMoZGF0YUxpbmspOyB9KTtcclxuXHJcbiAgICBwcml2YXRlIF9tZXRob2RzU291cmNlOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD4+ID0gUHJvcGVydHkuY3JlYXRlPEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kPj4oW10sIChkYXRhTGluaykgPT4geyB0aGlzLnJlcXVlc3RSZWFkQ29tcG9uZW50TWV0aG9kcyhkYXRhTGluayk7IH0pO1xyXG4gICAgcHJpdmF0ZSBfY29tbWFuZENvbm5lY3QgPSBDb21tYW5kLmNyZWF0ZTxhbnksIGFueT4odGhpcywgdGhpcy5leGVjdXRlQ29tbWFuZENvbm5lY3QoKSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzZXRzL2dldHMgdGhlIHBhcmFtZXRlcnMgb2YgdGhlIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge0FycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcblxyXG4gICAgcHVibGljIGdldCBjb21tYW5kQ29ubmVjdENvbXBvbmVudCgpOiBDb21tYW5kPGFueSwgYW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbW1hbmRDb25uZWN0O1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBleGVjdXRlQ29tbWFuZENvbm5lY3QoKTogSUNvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZTxhbnksIGFueT4ge1xyXG4gICAgICAgIHJldHVybiBhc3luYyAoY29tbWFuZFBhcnMsIGNvbW1hbmRSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbW9kZWwgPSAoPGFueT50aGlzKS5tb2RlbCBhcyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbDtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGlmIChtb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlYWQgcGFyYW1ldGVyIGNvbXBvbmVudCBzZXRcclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCBtb2RlbC5icm93c2VDb21wb25lbnQodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGludGl0aWFsbHkgdXBkYXRlIHRoZSBjb21wb25lbnRzIGFjY2VzcyByaWdodHNcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudEFjY2Vzc1JpZ2h0cyhtb2RlbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHdhdGNoIGFjY2VzcyByaWdodCBjaGFuZ2VzXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vYnNlcnZlQ29tcG9uZW50QWNjZXNzUmlnaHRzKG1vZGVsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBkYXRhIGxpbmtcclxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kUmVzcG9uc2UuZXhlY3V0ZWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbW1hbmRSZXNwb25zZS5yZWplY3RlZChlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2JzZXJ2ZXMgY2hhbmdlcyBvZiB0aGUgYWNjZXNzIHJpZ2h0c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsfSBtYWluTW9kZWxcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9ic2VydmVDb21wb25lbnRBY2Nlc3NSaWdodHMobWFpbk1vZGVsOiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCkge1xyXG4gICAgICAgIG1haW5Nb2RlbC51c2VyUm9sZXMuY2hhbmdlZCgodXNlclJvbGVzKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29tcG9uZW50QWNjZXNzUmlnaHRzKG1haW5Nb2RlbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBjb21wb25lbnRycyBhY2Nlc3MgcmlnaHRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWx9IG1haW5Nb2RlbFxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlQ29tcG9uZW50QWNjZXNzUmlnaHRzKG1haW5Nb2RlbDogTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwpIHtcclxuICAgICAgICBsZXQgd3JpdGVBY2Nlc3MgPSBtYWluTW9kZWwud3JpdGVBY2Nlc3M7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ1c2VyIHJvbGVzIGNoYW5nZWQgJW8gd3JpdGUgYWNjZXNzID0lb1wiLCBtYWluTW9kZWwudXNlclJvbGVzLnZhbHVlLCB3cml0ZUFjY2Vzcyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDb21wb25lbnRNZW1iZXJBY2Nlc3NSaWdodHMod3JpdGVBY2Nlc3MpO1xyXG4gICAgICAgIHRoaXMud3JpdGVBY2Nlc3MudmFsdWUgPSB3cml0ZUFjY2VzcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGFjY2VzcyByaWdodHMgb2YgY29tcG9uZW50IG1lbWJlcnNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHdyaXRlQWNjZXNzXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICB1cGRhdGVDb21wb25lbnRNZW1iZXJBY2Nlc3NSaWdodHMod3JpdGVBY2Nlc3M6IGJvb2xlYW4pOiBhbnkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlUGFyYW1ldGVyQWNjZXNzUmlnaHRzKHdyaXRlQWNjZXNzKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1ldGhvZHNBY2Nlc3NSaWdodHMod3JpdGVBY2Nlc3MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgcGFyYW1ldGVycyBhY2Nlc3MgcmlnaHRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVBhcmFtZXRlckFjY2Vzc1JpZ2h0cyh3cml0ZUFjY2VzczogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5mb3JFYWNoKChwYXJhbWV0ZXIpID0+IHtcclxuICAgICAgICAgICAgLy8gcmV3cml0ZSB0aGUgcGFyYW1ldGVycyB3cml0ZSBhY2Nlc3MgcHJvcGVydHkgd2l0aCBpdHMgb3JpZ2luYWwgcmF3IHZhbHVlIHRvIGZvcmNlIHRyaWdnZXJpbmcgdGhlIGNoYW5nZWQgZXZlbnQuIFRoaXMgaXMganVzdCBhIHdvcmthcm91bmRcclxuICAgICAgICAgICAgLy8gdG8gZml4IHRoZSBsb2cgaW4vb3V0IHByb2JsZW0gZGlzcGxheWluZyB3cm9uZyByZWFkb25seSBzdGF0ZXMuXHJcbiAgICAgICAgICAgIC8vIHRoZSB3b3JrYXJvdW5kIGlzIGludGVuZGVkIHRvIGJlIHJlcGxhY2VkIGJ5IHByb3BlciBiYXRjaCByZWZyZXNoIHJlcXVlc3RzIVxyXG4gICAgICAgICAgICBwYXJhbWV0ZXIuaXNXcml0ZWFibGUudmFsdWUgPSAoPGFueT5wYXJhbWV0ZXIuaXNXcml0ZWFibGUpLl92YWx1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIG1ldGhvZHMgYWNjZXNzIHJpZ2h0c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZU1ldGhvZHNBY2Nlc3NSaWdodHMod3JpdGVBY2Nlc3M6IGJvb2xlYW4pOiBhbnkge1xyXG4gICAgICAgIHRoaXMubWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHtcclxuICAgICAgICAgICAgbWV0aG9kLmlzRXhlY3V0YWJsZS52YWx1ZSA9IHdyaXRlQWNjZXNzO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHNldHMvZ2V0cyB0aGUgcGFyYW1ldGVycyBvZiB0aGUgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIGdldCBtZXRob2RzKCk6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21ldGhvZHM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IG1ldGhvZHMobWV0aG9kczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+KSB7XHJcbiAgICAgICAgdGhpcy5fbWV0aG9kcyA9IG1ldGhvZHM7XHJcbiAgICAgICAgdGhpcy5fbWV0aG9kc1NvdXJjZS52YWx1ZSA9IHRoaXMuX21ldGhvZHM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1ldGhvZHNTb3VyY2UoKTogUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21ldGhvZHNTb3VyY2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHF1aWNrQ29tbWFuZHMoKTogQXJyYXk8TWFwcENvY2twaXRRdWlja0NvbW1hbmRQYXJhbWV0ZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcXVpY2tDb21tYW5kcztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgcXVpY2tDb21tYW5kcyhxdWlja0NvbW1hbmRzOiBBcnJheTxNYXBwQ29ja3BpdFF1aWNrQ29tbWFuZFBhcmFtZXRlcj4pIHtcclxuICAgICAgICB0aGlzLl9xdWlja0NvbW1hbmRzID0gcXVpY2tDb21tYW5kcztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdXNlck1ldGhvZHMoKTogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdXNlck1ldGhvZHM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHVzZXJNZXRob2RzKG1ldGhvZHM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kPikge1xyXG4gICAgICAgIHRoaXMuX3VzZXJNZXRob2RzID0gbWV0aG9kcztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzZXRzL2dldHMgdGhlIHBhcmFtZXRlcnMgb2YgdGhlIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge0FycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBnZXQgcGFyYW1ldGVycygpOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBwYXJhbWV0ZXJzKHBhcmFtZXRlcnM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPikge1xyXG4gICAgICAgIHRoaXMuX3BhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzO1xyXG4gICAgICAgIHRoaXMuX3BhcmFtZXRlcnNTb3VyY2UudmFsdWUgPSB0aGlzLl9wYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXQgd2F0Y2hhYmxlUGFyYW1ldGVycygpOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCB3YXRjaGFibGVQYXJhbWV0ZXJzKHBhcmFtZXRlcnM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPikge1xyXG4gICAgICAgIHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB3YXRjaGFibGVTdGF0ZVBhcmFtZXRlcnMoKTogQXJyYXk8TWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93YXRjaGFibGVTdGF0ZVBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHdhdGNoYWJsZVN0YXRlUGFyYW1ldGVycyhwYXJhbWV0ZXJzOiBBcnJheTxNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyPikge1xyXG4gICAgICAgIHRoaXMuX3dhdGNoYWJsZVN0YXRlUGFyYW1ldGVycyA9IHBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1lc3NhZ2VQYXJhbWV0ZXJzKCk6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lc3NhZ2VQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBtZXNzYWdlUGFyYW1ldGVycyhwYXJhbWV0ZXJzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4pIHtcclxuICAgICAgICB0aGlzLl9tZXNzYWdlUGFyYW1ldGVycyA9IHBhcmFtZXRlcnM7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldCBjb25maWd1cmF0aW9uUGFyYW1ldGVycygpOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWd1cmF0aW9uUGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgY29uZmlndXJhdGlvblBhcmFtZXRlcnMocGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+KSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlndXJhdGlvblBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXQgcGFyYW1ldGVyc1NvdXJjZSgpOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFyYW1ldGVyc1NvdXJjZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWVzc2FnZVBhcmFtZXRlcnNTb3VyY2UoKTogUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+PiB7XHJcbiAgICAgICAgLy8gZmlsdGVyIHRoZSB3YXRjaGFibGVzIGFuZCB1cGRhdGUgdGhlIHdhdGNoYWJsZXMgcGFyYW1ldGVyIGxpc3RcclxuICAgICAgICB0aGlzLl9tZXNzYWdlUGFyYW1ldGVyc1NvdXJjZS52YWx1ZSA9IHRoaXMuX21lc3NhZ2VQYXJhbWV0ZXJzO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXNzYWdlUGFyYW1ldGVyc1NvdXJjZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgd2F0Y2hhYmxlUGFyYW1ldGVyc1NvdXJjZSgpOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4+IHtcclxuICAgICAgICAvLyBmaWx0ZXIgdGhlIHdhdGNoYWJsZXMgYW5kIHVwZGF0ZSB0aGUgd2F0Y2hhYmxlcyBwYXJhbWV0ZXIgbGlzdFxyXG4gICAgICAgIHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnNTb3VyY2UudmFsdWUgPSB0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzU291cmNlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXQgY29uZmlndXJhdGlvblBhcmFtZXRlcnNTb3VyY2UoKTogUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+PiB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlndXJhdGlvblBhcmFtZXRlcnNTb3VyY2UudmFsdWUgPSB0aGlzLl9jb25maWd1cmF0aW9uUGFyYW1ldGVycztcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlndXJhdGlvblBhcmFtZXRlcnNTb3VyY2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWZyZXNoZXMgdGhlIGNvbXBvbmVudHMgcGFyYW1ldGVyIGxpc3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdPn0gZGF0YUxpbmtcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgcmVxdWVzdFJlYWRDb21wb25lbnRQYXJhbWV0ZXJzKGRhdGFMaW5rOiBQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdPik6IFByb21pc2U8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXT4ge1xyXG4gICAgICAgIGxldCBjb21wb25lbnRQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdID0gW107XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBjb21wb25lbnRzIG1haW4gbW9kZWxcclxuICAgICAgICBsZXQgbW9kZWwgPSAoPGFueT50aGlzKS5tb2RlbCBhcyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbDtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAobW9kZWwpIHtcclxuICAgICAgICAgICAgICAgIC8vIHJlYWQgcGFyYW1ldGVyIGNvbXBvbmVudCBzZXRcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudFBhcmFtZXRlcnMgPSBhd2FpdCBtb2RlbC5icm93c2VQYXJhbWV0ZXJzKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBkYXRhIGxpbmtcclxuICAgICAgICAgICAgICAgIGRhdGFMaW5rLnJlYWRSZXF1ZXN0RXhlY3V0ZWQoY29tcG9uZW50UGFyYW1ldGVycyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBkYXRhTGluay5yZWFkUmVxdWVzdFJlamVjdGVkKGVycm9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZnJlc2hlcyB0aGUgY29tcG9uZW50cyBtZXRob2RzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdPn0gZGF0YUxpbmtcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgcmVxdWVzdFJlYWRDb21wb25lbnRNZXRob2RzKGRhdGFMaW5rOiBQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdPik6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudE1ldGhvZHM6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10gPSBbXTtcclxuICAgICAgICAvLyBnZXQgdGhlIGNvbXBvbmVudHMgbWFpbiBtb2RlbFxyXG4gICAgICAgIGxldCBtb2RlbCA9ICg8YW55PnRoaXMpLm1vZGVsIGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChtb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gcmVhZCBwYXJhbWV0ZXIgY29tcG9uZW50IHNldFxyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50TWV0aG9kcyA9IGF3YWl0IG1vZGVsLmJyb3dzZU1ldGhvZHModGhpcyk7XHJcbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgdGhlIGRhdGEgbGlua1xyXG4gICAgICAgICAgICAgICAgZGF0YUxpbmsucmVhZFJlcXVlc3RFeGVjdXRlZChjb21wb25lbnRNZXRob2RzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGRhdGFMaW5rLnJlYWRSZXF1ZXN0UmVqZWN0ZWQoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudE1ldGhvZHM7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqICBnZXRzIHRoZSBtZXRhIGRhdGEgb2YgYSBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBnZXQgbWV0YURhdGEoKTogTWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YSB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21ldGFEYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBtZXRhRGF0YShtZXRhRGF0YTogTWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YSB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuX21ldGFEYXRhID0gbWV0YURhdGE7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXJzIG9yIG1hcmtzIHRoZSBjb21wb25lbnQgYXMgdXNlciBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50fSBjb21wb25lbnRcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZWdpc3RlclVzZXJDb21wb25lbnQoY29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudCk6IHZvaWQge1xyXG4gICAgICAgICg8YW55PmNvbXBvbmVudCkuaXNVc2VyQ29tcG9uZW50ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGVybWluZXMgaWYgdGhlIGNvbXBvbmVudCBpcyBhIHVzZXIgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudH0gY29tcG9uZW50XHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaXNVc2VyQ29tcG9uZW50KGNvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKDxhbnk+Y29tcG9uZW50KS5pc1VzZXJDb21wb25lbnQ7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vKipcclxuICogVGhlIGNsYXNzIGltcGxlbWVudHMgbWV0aG9kIGFjY2Vzcy5cclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCBleHRlbmRzIE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbSB7XHJcblxyXG4gICAgLy8gSG9sZHMgdGhlIG1ldGhvZCBwYXJhbWV0ZXJzXHJcbiAgICBwcml2YXRlIF9pbnB1dFBhcmFtZXRlcnM6IEFycmF5PE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyPiA9IFtdO1xyXG4gICAgXHJcbiAgICAvLyBzcGVjZWZpZXMgaWYgdGhlIG1ldGhvZCBpcyBleGVjdXRhYmxlXHJcbiAgICBwcm90ZWN0ZWQgX2lzRXhlY3V0YWJsZTogUHJvcGVydHk8Ym9vbGVhbj4gPSBQcm9wZXJ0eS5jcmVhdGU8Ym9vbGVhbj4oZmFsc2UsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCAodmFsdWUpID0+IHRoaXMubWV0aG9kSXNFeGVjdXRhYmxlKHZhbHVlKSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpbnB1dCBwYXJhbWV0ZXJzIG9mIHRoZSBtZXRob2RcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtBcnJheTxNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcj59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpbnB1dFBhcmFtZXRlcnMoKTogQXJyYXk8TWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5wdXRQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgaW5wdXRQYXJhbWV0ZXJzKHZhbHVlOiBBcnJheTxNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcj4pIHtcclxuICAgICAgICB0aGlzLl9pbnB1dFBhcmFtZXRlcnMgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEludm9rZXMgdGhlIGV4ZWN1dGlvbiBvZiB0aGUgY29tcG9uZW50IG1ldGhvZFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2R9IGNvbXBvbmVudE1ldGhvZFxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIGV4ZWN1dGUoY29tcG9uZW50TWV0aG9kOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBtZXRob2RzIG1vZGVsIGZyb20gdGhlIHBhcmVudCBjb21wb25lbnRcclxuICAgICAgICBsZXQgbW9kZWwgPSAoPGFueT5jb21wb25lbnRNZXRob2QuY29tcG9uZW50KS5tb2RlbCBhcyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbDtcclxuICAgICAgICBpZiAobW9kZWwgJiYgbW9kZWwuZXhlY3V0ZUNvbXBvbmVudE1ldGhvZCkge1xyXG4gICAgICAgICAgICAvLyBpbnZva2UgdGhlIGV4ZWN1dGlvbiBvZiB0aGUgbWV0aG9kXHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBtb2RlbC5leGVjdXRlQ29tcG9uZW50TWV0aG9kKGNvbXBvbmVudE1ldGhvZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmluZHMgYSBtZXRob2QgYnkgbmFtZVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2ROYW1lXHJcbiAgICAgKiBAcGFyYW0geyhNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdfHVuZGVmaW5lZCl9IGNvbXBvbmVudE1ldGhvZHNcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2luY2x1ZGVJbnRlcm5hbHM9dHJ1ZV1cclxuICAgICAqIEByZXR1cm5zIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZHx1bmRlZmluZWR9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGZpbmQobWV0aG9kTmFtZTogc3RyaW5nLCBjb21wb25lbnRNZXRob2RzOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdIHwgdW5kZWZpbmVkLCBpbmNsdWRlSW50ZXJuYWxzOiBib29sZWFuID0gdHJ1ZSk6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kIHwgdW5kZWZpbmVkIHtcclxuXHJcbiAgICAgICAgbGV0IG1ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIGlmIChjb21wb25lbnRNZXRob2RzKSB7XHJcbiAgICAgICAgICAgIGxldCBtb2RlbCA9ICg8YW55PmNvbXBvbmVudE1ldGhvZHNbMF0uY29tcG9uZW50KS5tb2RlbCBhcyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbDtcclxuICAgICAgICAgICAgaWYgKG1vZGVsKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBleGVjdXRhYmxlIG1ldGhvZHNcclxuICAgICAgICAgICAgICAgIGxldCBleGVjdXRhYmxlTWV0aG9kcyA9IGluY2x1ZGVJbnRlcm5hbHMgPyAoPGFueT5jb21wb25lbnRNZXRob2RzWzBdKS5jb21wb25lbnQubWV0aG9kcyA6IGNvbXBvbmVudE1ldGhvZHM7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG1hdGNoaW5nTWV0aG9kcyA9IGV4ZWN1dGFibGVNZXRob2RzLmZpbHRlcigobWV0aG9kKSA9PiB7IHJldHVybiBtZXRob2QuYnJvd3NlTmFtZSA9PT0gbWV0aG9kTmFtZSB9KTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXRjaGluZ01ldGhvZHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FsbCB0aGUgcmVxdWVzdGVkIG1ldGhvZFxyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZCA9IG1hdGNoaW5nTWV0aG9kc1swXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1ldGhvZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgaWYgdGhlIG1ldGhvZCBpcyBleGVjdXRhYmxlXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7UHJvcGVydHk8Ym9vbGVhbj59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpc0V4ZWN1dGFibGUoKTogUHJvcGVydHk8Ym9vbGVhbj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc0V4ZWN1dGFibGU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0ZXJtaW5lcyBpZiB0aGUgbWV0aGlkIGlzIGV4ZWN1dGFibGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGV4ZWN1dGFibGVcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbWV0aG9kSXNFeGVjdXRhYmxlKGV4ZWN1dGFibGU6IGJvb2xlYW4pOiBhbnkge1xyXG4gICAgICAgIGxldCBpc0V4ZWN1dGFibGVWYWx1ZSA9IGV4ZWN1dGFibGU7XHJcbiAgICAgICAgbGV0IG1vZGVsID0gKDxhbnk+dGhpcy5jb21wb25lbnQpLm1vZGVsIGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsO1xyXG4gICAgICAgIGlmIChtb2RlbCAmJiB0aGlzLmNvbXBvbmVudCkge1xyXG4gICAgICAgICAgICAvLyBlbmFibGUgbWV0aG9kIGV4ZWN1dGlvbiBmb3Igbm9uIHVzZXIgY29tcG9uZW50c1xyXG4gICAgICAgICAgICBpc0V4ZWN1dGFibGVWYWx1ZSA9IE1hcHBDb2NrcGl0Q29tcG9uZW50LmlzVXNlckNvbXBvbmVudCh0aGlzLmNvbXBvbmVudCBhcyBNYXBwQ29ja3BpdENvbXBvbmVudCkgPyBpc0V4ZWN1dGFibGVWYWx1ZSA6IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpc0V4ZWN1dGFibGVWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIG1ldGhvZHMgaW5wdXQgcGFyYW1ldGVyc1xyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2R9IGNvbXBvbmVudE1ldGhvZFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8TWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJbXT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIHVwZGF0ZUlucHV0UGFyYW1ldGVycyhjb21wb25lbnRNZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKTogUHJvbWlzZTxNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcltdPiB7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBtZXRob2RzIG1vZGVsIGZyb20gdGhlIHBhcmVudCBjb21wb25lbnRcclxuICAgICAgICBsZXQgbW9kZWwgPSAoPGFueT5jb21wb25lbnRNZXRob2QuY29tcG9uZW50KS5tb2RlbCBhcyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbDtcclxuICAgICAgICBpZiAobW9kZWwgJiYgbW9kZWwuZXhlY3V0ZUNvbXBvbmVudE1ldGhvZCkge1xyXG4gICAgICAgICAgICBhd2FpdCBtb2RlbC5icm93c2VNZXRob2RJbnB1dFBhcmFtZXRlcnMoY29tcG9uZW50TWV0aG9kKTtcclxuICAgICAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvLnVwZGF0ZU1ldGhvZElucHV0UGFyYW1ldGVycyhjb21wb25lbnRNZXRob2QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29tcG9uZW50TWV0aG9kLmlucHV0UGFyYW1ldGVycztcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmNsYXNzIE1hcHBDb2NrcGl0UGFyYW1ldGVyIGV4dGVuZHMgTWFwcENvY2twaXRDb21wb25lbnRJdGVtIHtcclxuXHJcblxyXG4gICAgLy8gSG9sZHMgdGhlIHBhcmFtZXRlcnMgdHlwZVxyXG4gICAgcHJvdGVjdGVkIF9kYXRhVHlwZTogTWFwcENvY2twaXRQYXJhbWV0ZXJEYXRhVHlwZSA9IG5ldyBNYXBwQ29ja3BpdFBhcmFtZXRlckRhdGFUeXBlKCk7XHJcbiAgICBwcm90ZWN0ZWQgX2VudW1SZWY6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bSA9IG5ldyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW0obnVsbCk7XHJcbiAgICBwcm90ZWN0ZWQgX2VuZ2luZWVyaW5nVW5pdDogc3RyaW5nID0gXCJcIjtcclxuICAgIHByb3RlY3RlZCBfaXNXcml0ZWFibGU6IFByb3BlcnR5PGJvb2xlYW4+ID0gUHJvcGVydHkuY3JlYXRlPGJvb2xlYW4+KGZhbHNlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgKHZhbHVlKSA9PiB0aGlzLnBhcmFtZXRlcklzV3JpdGFibGUodmFsdWUpKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHBhcmFtZXRlcnMgdmFsdWUgb2JqZWN0XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7KE1hcHBDb2NrcGl0UGFyYW1ldGVyRGF0YVR5cGUpfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0UGFyYW1ldGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgZGF0YVR5cGUoKTogTWFwcENvY2twaXRQYXJhbWV0ZXJEYXRhVHlwZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFUeXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZGF0YVR5cGUoZGF0YVR5cGU6IE1hcHBDb2NrcGl0UGFyYW1ldGVyRGF0YVR5cGUpIHtcclxuICAgICAgICB0aGlzLl9kYXRhVHlwZSA9IGRhdGFUeXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZW5naW5lZXJpbmdVbml0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuZ2luZWVyaW5nVW5pdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGVuZ2luZWVyaW5nVW5pdChlbmdpbmVlcmluZ1VuaXQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2VuZ2luZWVyaW5nVW5pdCA9IGVuZ2luZWVyaW5nVW5pdDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldCBlbnVtVHlwZSgpOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW0ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lbnVtUmVmO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc2V0IGVudW1UeXBlKGVudW1SZWY6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bSkge1xyXG4gICAgICAgIHRoaXMuX2VudW1SZWYgPSBlbnVtUmVmO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzV3JpdGVhYmxlKCk6IFByb3BlcnR5PGJvb2xlYW4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNXcml0ZWFibGU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0ZXJtaW5lcyBpZiB0aGUgcHJvcGVydGllcyB2YWx1ZSBpcyB3cml0YWJsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSB2YWx1ZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRQYXJhbWV0ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBwYXJhbWV0ZXJJc1dyaXRhYmxlKHdyaXRhYmxlOiBib29sZWFuKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IHdyaXRhYmxlVmFsdWUgPSB3cml0YWJsZTtcclxuICAgICAgICBsZXQgbW9kZWwgPSAoPGFueT50aGlzLmNvbXBvbmVudCkubW9kZWwgYXMgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWw7XHJcbiAgICAgICAgaWYgKG1vZGVsKSB7XHJcbiAgICAgICAgICAgIHdyaXRhYmxlVmFsdWUgPSB3cml0YWJsZSAmJiBtb2RlbC53cml0ZUFjY2VzcztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHdyaXRhYmxlVmFsdWU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXQgZGlzcGxheVZhbHVlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVUb1N0cmluZyh0aGlzLl92YWx1ZVNvdXJjZS52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBkaXNwbGF5VmFsdWUoaW5wdXRWYWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IG5ld1ZhbHVlID0gdGhpcy52YWx1ZUZyb21TdHJpbmcoaW5wdXRWYWx1ZSk7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFwcENvY2twaXRQYXJhbWV0ZXIuc2V0RGlzcGxheVZhbHVlICVvIGZvciAlb1wiLCB0aGlzLnZhbHVlLCBpbnB1dFZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvbnZlcnRzIHRoZSBwYXJhbWV0ZXIgdmFsdWUgdG8gYSBmb3JtYXR0ZWQgc3RyaW5nXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBfdmFsdWVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRQYXJhbWV0ZXJcclxuICAgICAqL1xyXG4gICAgdmFsdWVUb1N0cmluZyhfdmFsdWU6IGFueSk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHZhbHVlU3RyaW5nID0gXCJcIjtcclxuICAgICAgICAvLyBhdm9pZCBjb252ZXJ0aW5nIG51bGwgb3IgdW5kZWZpbmVkIHZhbHVlXHJcbiAgICAgICAgaWYgKHRoaXMuX3ZhbHVlU291cmNlLnZhbHVlICE9IG51bGwgJiYgdGhpcy5fdmFsdWVTb3VyY2UudmFsdWUgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHZhbHVlU3RyaW5nID0gdGhpcy5fdmFsdWVTb3VyY2UudmFsdWUudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgdmFsdWVTdHJpbmcgPSBOdW1lcmljSGVscGVyLmNvbnZlcnROdW1lcmljU3RyaW5nKHZhbHVlU3RyaW5nLCB0aGlzLmRhdGFUeXBlLm5hbWUpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5lbnVtVHlwZS5pc0RlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlU3RyaW5nID0gdGhpcy5lbnVtVHlwZS5nZXREaXNwbGF5VmFsdWUodGhpcy5fdmFsdWVTb3VyY2UudmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZVN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvbnZlcnRzIGEgcGFyYW1ldGVyIHZhbHVlIHN0cmluZyB0byBhIHZhbHVlIGFjY29yZGluZyB0byB0aGUgcGFyYW1ldGVycyBkYXRhIHR5cGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRWYWx1ZVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRQYXJhbWV0ZXJcclxuICAgICAqL1xyXG4gICAgdmFsdWVGcm9tU3RyaW5nKGlucHV0VmFsdWU6IHN0cmluZyk6IGFueSB7XHJcblxyXG4gICAgICAgIC8vIHNldCBhbiBlbXB0eSBzdHJpbmcgZm9yIGFuIHVuZGVmaW5lZCBpbnB1dCB2YWx1ZVxyXG4gICAgICAgIGxldCB2YWx1ZSA9IGlucHV0VmFsdWUgIT09IHVuZGVmaW5lZCAmJiBpbnB1dFZhbHVlICE9PSBudWxsID8gaW5wdXRWYWx1ZSA6IFwiXCI7XHJcblxyXG4gICAgICAgIC8vIHJlcGxhY2UgdGhlIGVudW0gc3RyaW5nIGJ5IHRoZSB2YWx1ZSBpZiB0aGVyZSBpcyBvbmUgZGVmaW5lZC5cclxuICAgICAgICBpZiAodGhpcy5lbnVtVHlwZS5pc0RlZmluZWQpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmVudW1UeXBlLmdldFZhbHVlKGlucHV0VmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBUaGUgY2xhc3MgaW1wbGVtZW50cyBhIGNvbXBvbmVudCBwYXJhbWV0ZXJcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlciBleHRlbmRzIE1hcHBDb2NrcGl0UGFyYW1ldGVyIHtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoY29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0gfCBudWxsLCBuYW1lOiBzdHJpbmcsIHJlZmVyZW5jZTogYW55KSB7XHJcbiAgICAgICAgc3VwZXIoY29tcG9uZW50LCBuYW1lLCByZWZlcmVuY2UpO1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlU291cmNlID0gUHJvcGVydHkuY3JlYXRlPGFueT4oXCJcIiwgdW5kZWZpbmVkLCAoZGF0YUxpbmspID0+IHRoaXMucmVxdWVzdFdyaXRlVmFsdWUoZGF0YUxpbmspKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcml0ZXMgdGhlIGN1cnJlbnQgcGFyYW1ldGVyIHZhbHVlIHRvIHRhcmdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICB3cml0ZShyZWZsZWN0ZWRXcml0ZVJlc3BvbnNlRGVsZWdhdGU6ICgocmVzdWx0RGF0YTogYW55KSA9PiB2b2lkKSB8IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICAvLyBjb25uZWN0IHRoZSB3cml0ZSByZXNwb25zZSBkZWxlZ2F0ZVxyXG4gICAgICAgIHRoaXMucmVmbGVjdGVkV3JpdGVSZXNwb25zZURlbGVnYXRlID0gcmVmbGVjdGVkV3JpdGVSZXNwb25zZURlbGVnYXRlO1xyXG5cclxuICAgICAgICAvLyBleGVjdXRlIHdyaXRpbmcgdGhlIHBhcmFtZXRlciB2YWx1ZVxyXG4gICAgICAgIHRoaXMudmFsdWVTb3VyY2Uud3JpdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdyaXRlcyB0aGUgZGF0YSBsaW5rcyB2YWx1ZSB0byB0YXJnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0eTxhbnk+fSBkYXRhTGlua1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgcmVxdWVzdFdyaXRlVmFsdWUoZGF0YUxpbms6IFByb3BlcnR5PGFueT4pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnQ7XHJcbiAgICAgICAgICAgIGlmIChjb21wb25lbnQgJiYgKDxhbnk+Y29tcG9uZW50KS5tb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1vZGVsID0gKDxhbnk+Y29tcG9uZW50KS5tb2RlbCBhcyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbDtcclxuICAgICAgICAgICAgICAgIGF3YWl0IG1vZGVsLndyaXRlQ29tcG9uZW50UGFyYW1ldGVyKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgZGF0YUxpbmsud3JpdGVSZXF1ZXN0RXhlY3V0ZWQobnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBkYXRhTGluay53cml0ZVJlcXVlc3RSZWplY3RlZChlcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYXRlcyB0aGUgb2JzZXJ2YXRpb24gb2YgcGFyYW1ldGVyIHZhbHVlIGNoYW5nZXNcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IHdhdGNoYWJsZVBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBvYnNlcnZlUGFyYW1ldGVyVmFsdWVDaGFuZ2VzKG9ic2VydmVyOiBJT2JzZXJ2ZXIsIG9ic2VydmFibGVQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKTogYW55IHtcclxuICAgICAgICBpZiAob2JzZXJ2YWJsZVBhcmFtZXRlcnMubGVuZ3RoID4gMCAmJiBvYnNlcnZhYmxlUGFyYW1ldGVyc1swXSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBwYXJhbWV0ZXJzIG1vZGVsIGZyb20gdGhlIHBhcmVudCBjb21wb25lbnRcclxuICAgICAgICAgICAgbGV0IG1vZGVsID0gTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIuZ2V0TW9kZWwob2JzZXJ2YWJsZVBhcmFtZXRlcnNbMF0pO1xyXG4gICAgICAgICAgICBpZiAobW9kZWwgJiYgbW9kZWwub2JzZXJ2ZURhdGFNb2RlbEl0ZW1zKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpbnZva2UgdGhlIG9ic2VydmF0aW9uIG9uIHRoZSBtb2RlbFxyXG4gICAgICAgICAgICAgICAgbW9kZWwub2JzZXJ2ZURhdGFNb2RlbEl0ZW1zKG9ic2VydmVyLCBvYnNlcnZhYmxlUGFyYW1ldGVycyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBY3RpdmF0ZXMgbW9kZWwgaXRlbXMgcmVnaXN0ZXJlZCBmb3Igb2JzZXJ2YXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0geyp9IG9ic2VydmVyXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IG9ic2VydmFibGVQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYWN0aXZhdGVDb21wb25lbnRNb2RlbEl0ZW1zKG9ic2VydmVyOiBhbnksIG9ic2VydmFibGVQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKTogYW55IHtcclxuICAgICAgICAvL1RPRE86IGltcGxlbWVudCBtb2RlbCBpdGVtIGFjdGl2YXRpb24gaGFuZGxpbmdcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVbm9ic2VydmVzIGFsbCBvYnNlcnZhYmxlcyBhc3NvY2lhdGVkIHdpdGggdGhlIG9ic2VydmVyXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsqfSBvYnNlcnZlclxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBvYnNlcnZlZFBhcmFtZXRlcnNcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3N1c3BlbmQ9dHJ1ZV0gc3VzcGVuZHMgdGhlIG9ic2VydmF0aW9uIGlmIHRydWUgb3RoZXJ3aXNlIHJlbW92ZXMgdGhlIHdob2xlIHN1YnNjcmlwdGlvblxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyB1bm9ic2VydmVDb21wb25lbnRNb2RlbEl0ZW1zKG9ic2VydmVyOiBhbnksIG9ic2VydmVkUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSwgc3VzcGVuZDogYm9vbGVhbiA9IHRydWUpIHtcclxuICAgICAgICBpZiAob2JzZXJ2ZWRQYXJhbWV0ZXJzLmxlbmd0aCA+IDAgJiYgb2JzZXJ2ZWRQYXJhbWV0ZXJzWzBdICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBsZXQgbW9kZWwgPSBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlci5nZXRNb2RlbChvYnNlcnZlZFBhcmFtZXRlcnNbMF0pO1xyXG4gICAgICAgICAgICBpZiAobW9kZWwgJiYgbW9kZWwudW5vYnNlcnZlQ29tcG9uZW50TW9kZWxJdGVtcykge1xyXG4gICAgICAgICAgICAgICAgLy8gaW52b2tlIHRoZSB1bm9ic2VydmF0aW9uIG9uIHRoZSBtb2RlbFxyXG4gICAgICAgICAgICAgICAgbW9kZWwudW5vYnNlcnZlQ29tcG9uZW50TW9kZWxJdGVtcyhvYnNlcnZlciwgb2JzZXJ2ZWRQYXJhbWV0ZXJzLCBzdXNwZW5kKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVhY3RpdmF0ZXMgbW9kZWwgaXRlbXMgcmVnaXN0ZXJlZCBmb3Igb2JzZXJ2YXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0geyp9IG9ic2VydmVyXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IG9ic2VydmVkUGFyYW1ldGVyc1xyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbc3VzcGVuZD10cnVlXVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBkZWFjdGl2YXRlQ29tcG9uZW50TW9kZWxJdGVtcyhvYnNlcnZlcjogYW55LCBvYnNlcnZlZFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10sIHN1c3BlbmQ6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICAgICAgLy9UT0RPOiBpbXBsZW1lbnQgbW9kZWwgaXRlbSBkZWFjdGl2YXRpb24gaGFuZGxpbmdcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBwYXJhbWV0ZXJzIG1vZGVsXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gb2JzZXJ2YWJsZVBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0TW9kZWwoY29tcG9uZW50UGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcikge1xyXG4gICAgICAgIGlmICghY29tcG9uZW50UGFyYW1ldGVyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJjb21wb25lbnRQYXJhbWV0ZXIgdW5kZWZpbmVkICFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghY29tcG9uZW50UGFyYW1ldGVyLmNvbXBvbmVudCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiY29tcG9uZW50UGFyYW1ldGVyLmNvbXBvbmVudCB1bmRlZmluZWQgIVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICg8YW55PmNvbXBvbmVudFBhcmFtZXRlci5jb21wb25lbnQpLm1vZGVsIGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWZpbmVzIGNsYXNzIHVzZWQgZm9yIHN0YXRlIGljb25zXHJcbiAqXHJcbiAqIEBjbGFzcyBNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyIHtcclxuXHJcbiAgICAvLyBIb2xkcyBuYW1lIG9mIHdhdGNoYWJsZSBzdGF0ZSBwYXJhbWV0ZXJcclxuICAgIHByaXZhdGUgX25hbWU6IHN0cmluZztcclxuICAgIC8vIEhvbGRzIHdhdGNoYWJsZSBzdGF0ZSBleHByZXNzaW9uIGNsYXNzXHJcbiAgICBwdWJsaWMgc3RhdGVFeHByZXNzaW9uID0gbmV3IFdhdGNoYWJsZVN0YXRlRXhwcmVzc2lvbigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgZXhwcmVzc2lvbjogc3RyaW5nLCB3YXRjaGFibGVNYXBwaW5nOiBBcnJheTxbc3RyaW5nLCBzdHJpbmddPiwgaWNvbikge1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuc3RhdGVFeHByZXNzaW9uID0gbmV3IFdhdGNoYWJsZVN0YXRlRXhwcmVzc2lvbihuYW1lLCBleHByZXNzaW9uLCB3YXRjaGFibGVNYXBwaW5nLCBpY29uKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyBhIG1ldGhvZCBwYXJhbWV0ZXJcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyXHJcbiAqIEBleHRlbmRzIHtNYXBwQ29ja3BpdFBhcmFtZXRlcn1cclxuICovXHJcbmNsYXNzIE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyIGV4dGVuZHMgTWFwcENvY2twaXRQYXJhbWV0ZXIge1xyXG5cclxuICAgIC8vIEhvbGRzIGluZm9ybWF0aW9uIGFib3V0IHRoZSBmaWx0ZXIgbWVjaGFuaXNtXHJcbiAgICBwcml2YXRlIF9maWx0ZXI6IFBhcmFtZXRlckZpbHRlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbSB8IG51bGwsIG5hbWU6IHN0cmluZywgcmVmZXJlbmNlOiBhbnkpIHtcclxuICAgICAgICBzdXBlcihjb21wb25lbnQsIG5hbWUsIHJlZmVyZW5jZSk7XHJcbiAgICAgICAgdGhpcy5fZmlsdGVyID0gbmV3IFBhcmFtZXRlckZpbHRlcigpXHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGZpbHRlcihmaWx0ZXI6IFBhcmFtZXRlckZpbHRlcikge1xyXG4gICAgICAgIHRoaXMuX2ZpbHRlciA9IGZpbHRlcjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZmlsdGVyKCk6IFBhcmFtZXRlckZpbHRlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlcjtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIERlZmluZXMgdGhlIGNsYXMgZm9yIHF1aWNrY29tbWFuZHNcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0UXVpY2tDb21tYW5kUGFyYW1ldGVyXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdFF1aWNrQ29tbWFuZFBhcmFtZXRlciB7XHJcblxyXG4gICAgLy9Ib2xkcyBuYW1lIG9mIG1ldGhvZCBwYXJhbWV0ZXJcclxuICAgIHByaXZhdGUgX25hbWU6IHN0cmluZztcclxuICAgIC8vSG9sZHMgdG9vbHRpcCBpbmZvcm1hdGlvblxyXG4gICAgcHJpdmF0ZSBfdG9vbHRpcDogc3RyaW5nO1xyXG4gICAgLy9Ib2xkcyBuYW1lIG9mIGltYWdlIHVzZWRcclxuICAgIHByaXZhdGUgX2ltYWdlTmFtZTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgdG9vbHRpcDogc3RyaW5nLCBpbWFnZU5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuX3Rvb2x0aXAgPSB0b29sdGlwO1xyXG4gICAgICAgIHRoaXMuX2ltYWdlTmFtZSA9IGltYWdlTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHRvb2x0aXAoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdG9vbHRpcDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGltYWdlTmFtZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW1hZ2VOYW1lO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogZGVmaW5lcyB0aGUgcGFyYW1ldGVyIGRhdGEgdHlwZVxyXG4gKlxyXG4gKiBAY2xhc3MgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJEYXRhVHlwZVxyXG4gKi9cclxuY2xhc3MgTWFwcENvY2twaXRQYXJhbWV0ZXJEYXRhVHlwZSB7XHJcbiAgICBwcml2YXRlIF9kYXRhVHlwZUlkID0gXCJ1bmRlZmluZWRcIjtcclxuICAgIHByaXZhdGUgX2RhdGFUeXBlTmFtZSA9IFwidW5kZWZpbmVkXCI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZGF0YVR5cGVJZDogc3RyaW5nID0gXCJ1bmRlZmluZWRcIiwgZGF0YVR5cGVOYW1lOiBzdHJpbmcgPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YVR5cGVJZCA9IGRhdGFUeXBlSWQ7XHJcbiAgICAgICAgdGhpcy5fZGF0YVR5cGVOYW1lID0gZGF0YVR5cGVOYW1lO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlkKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMsIHRoaXMuX2RhdGFUeXBlSWRcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVR5cGVOYW1lXHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIGEgc2luZ2xlIGVudW0gdmFsdWUgd2l0aCB2YWx1ZSBhbmQgc3RyaW5nXHJcbiAqXHJcbiAqIEBjbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1WYWx1ZVxyXG4gKi9cclxuY2xhc3MgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtVmFsdWUgaW1wbGVtZW50cyBJVmFsdWVMaXN0SXRlbSB7XHJcbiAgICBfZGlzcGxheVZhbHVlOiBzdHJpbmcgPSBcInVuZGVmaW5lZFwiO1xyXG4gICAgX3ZhbHVlOiBhbnkgPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1WYWx1ZS5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkaXNwbGF5VGV4dFxyXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVZhbHVlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGRpc3BsYXlUZXh0OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9kaXNwbGF5VmFsdWUgPSBkaXNwbGF5VGV4dDtcclxuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyB0aGUgdmFsdWUgb2YgdGhlIGVudW1cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVZhbHVlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdmFsdWUoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIHRoZSBzdHJpbmcgb2YgdGhlIGVudW0gdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtVmFsdWVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBkaXNwbGF5VmFsdWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGlzcGxheVZhbHVlO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgYSBwYXJhbWV0ZXIgZW51bSBob2xkaW5nIGEgY29sbGVjdGlvbiBvZiBlbnVtIGl0ZW1zXHJcbiAqXHJcbiAqIEBjbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1cclxuICovXHJcbmNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bSB7XHJcblxyXG4gICAgcHJpdmF0ZSBfYnJvd3NlTmFtZTogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICBfZW51bVZhbHVlc1JlZmVyZW5jZTogYW55O1xyXG5cclxuICAgIHByaXZhdGUgX2VudW1WYWx1ZXMhOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1WYWx1ZVtdO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihlbnVtVmFsdWVzUmVmZXJlbmNlOiBhbnkgPSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5fZW51bVZhbHVlc1JlZmVyZW5jZSA9IGVudW1WYWx1ZXNSZWZlcmVuY2U7XHJcbiAgICAgICAgaWYgKHRoaXMuX2VudW1WYWx1ZXNSZWZlcmVuY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5fYnJvd3NlTmFtZSA9IHRoaXMuX2VudW1WYWx1ZXNSZWZlcmVuY2UuYnJvd3NlTmFtZTtcclxuICAgICAgICAgICAgdGhpcy5fZW51bVZhbHVlcyA9IHRoaXMuX2VudW1WYWx1ZXNSZWZlcmVuY2UuZW51bVZhbHVlcy5tYXAoKGVudW1WYWx1ZVJlZikgPT4geyByZXR1cm4gbmV3IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVZhbHVlKGVudW1WYWx1ZVJlZi5kaXNwbGF5TmFtZS50ZXh0LCBlbnVtVmFsdWVSZWYudmFsdWUpOyB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIHRoZSBicm93c2UgbmFtZSBvZiB0aGUgZW51bVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBicm93c2VOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VudW1WYWx1ZXNSZWZlcmVuY2UuYnJvd3NlTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIGNvbGxlY3Rpb24gb2YgZW51bSBpdGVtc1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVZhbHVlW119XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdmFsdWVzKCk6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVZhbHVlW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lbnVtVmFsdWVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZGV0ZXJtaW5lcyBpZiB0aGUgZW51bSBpcyBkZWZpbmVkIGFuZCBjb250YWlucyB2YWx1ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGlzRGVmaW5lZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZW51bVZhbHVlcyAmJiB0aGlzLl9lbnVtVmFsdWVzLmxlbmd0aCA+IDA7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyBhIHN0cmluZyBtYXRjaGluZyB0aGUgc3BlY2lmaWVkIGVudW0gdmFsdWUsIG90aGVyd2lzZSByZXR1cm4gdmFsdWUgc3RyaW5nIGFzIGRlZmF1bHQuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtXHJcbiAgICAgKi9cclxuICAgIGdldERpc3BsYXlWYWx1ZShlbnVtVmFsdWU6IGFueSk6IHN0cmluZyB7XHJcbiAgICAgICAgLy8gZ2V0IGFuIGVudW0gaXRlbSBtYXRjaGluZyB0aGUgcmVxdWVzdGVkIHZhbHVlXHJcbiAgICAgICAgbGV0IG1hdGNoaW5nRW51bUl0ZW0gPSB0aGlzLmZpbmRNYXRjaGluZ0VudW1JdGVtQnlWYWx1ZShlbnVtVmFsdWUpO1xyXG5cclxuICAgICAgICAvLyB1cGRhdGUgdGhlIHZhbHVlIHN0cmluZyB0byB0aGUgbWF0Y2hpbmcgb25lIG9yIHVzZSB0aGUgZGVmYXVsdCBzdHJpbmdcclxuICAgICAgICBsZXQgZW51bVZhbHVlU3RyaW5nID0gbWF0Y2hpbmdFbnVtSXRlbSA/IG1hdGNoaW5nRW51bUl0ZW0uZGlzcGxheVZhbHVlIDogZW51bVZhbHVlLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgIHJldHVybiBlbnVtVmFsdWVTdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbnB1dFZhbHVlXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1cclxuICAgICAqL1xyXG4gICAgZ2V0VmFsdWUoZW51bURpc3BsYXlWYWx1ZTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICBsZXQgZW51bVZhbHVlID0gZW51bURpc3BsYXlWYWx1ZTtcclxuICAgICAgICAvLyBnZXQgYW4gZW51bSBpdGVtIG1hdGNoaW5nIHRoZSByZXF1ZXN0ZWQgc3RyaW5nXHJcbiAgICAgICAgbGV0IG1hdGNoaW5nRW51bUl0ZW0gPSB0aGlzLmZpbmRNYXRjaGluZ0VudW1JdGVtQnlTdHJpbmcoZW51bURpc3BsYXlWYWx1ZSk7XHJcbiAgICAgICAgaWYgKG1hdGNoaW5nRW51bUl0ZW0pIHtcclxuICAgICAgICAgICAgZW51bVZhbHVlID0gbWF0Y2hpbmdFbnVtSXRlbS52YWx1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtLmdldFZhbHVlOiBjb3VsZCBub3QgZmluZCBtYXRjaGluZyBlbnVtIHZhbHVlIGZvciAlb1wiLCBlbnVtRGlzcGxheVZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBlbnVtVmFsdWU7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGZpbmQgYW4gZW51bSBpdGVtIHdpdGggbWF0Y2hpbmcgdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBlbnVtVmFsdWVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZmluZE1hdGNoaW5nRW51bUl0ZW1CeVZhbHVlKGVudW1WYWx1ZTogYW55KSB7XHJcbiAgICAgICAgbGV0IG1hdGNoaW5nRW51bUl0ZW0gPSB0aGlzLl9lbnVtVmFsdWVzLmZpbHRlcigoZW51bUl0ZW0pID0+IHsgcmV0dXJuIGVudW1JdGVtLnZhbHVlID09IGVudW1WYWx1ZTsgfSk7XHJcbiAgICAgICAgcmV0dXJuIG1hdGNoaW5nRW51bUl0ZW0ubGVuZ3RoID09PSAxID8gbWF0Y2hpbmdFbnVtSXRlbVswXSA6IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGZpbmQgYW4gZW51bSBpdGVtIHdpdGggbWF0Y2hpbmcgc3RyaW5nXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGVudW1EaXNwbGF5VmFsdWVcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVxyXG4gICAgICovXHJcbiAgICBmaW5kTWF0Y2hpbmdFbnVtSXRlbUJ5U3RyaW5nKGVudW1EaXNwbGF5VmFsdWU6IHN0cmluZyk6IGFueSB7XHJcbiAgICAgICAgbGV0IG1hdGNoaW5nRW51bUl0ZW0gPSB0aGlzLl9lbnVtVmFsdWVzLmZpbHRlcigoZW51bUl0ZW0pID0+IHsgcmV0dXJuIGVudW1JdGVtLmRpc3BsYXlWYWx1ZSA9PT0gZW51bURpc3BsYXlWYWx1ZTsgfSk7XHJcbiAgICAgICAgcmV0dXJuIG1hdGNoaW5nRW51bUl0ZW0ubGVuZ3RoID09PSAxID8gbWF0Y2hpbmdFbnVtSXRlbVswXSA6IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gICAgTWFwcENvY2twaXRDb21wb25lbnQsIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLCBNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyLCBNYXBwQ29ja3BpdFF1aWNrQ29tbWFuZFBhcmFtZXRlciwgTWFwcENvY2twaXRQYXJhbWV0ZXJEYXRhVHlwZSwgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtLCBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1WYWx1ZSwgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QsIE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyLCBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW1cclxufTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==