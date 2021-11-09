define(["require", "exports", "./mappCockpitComponent", "./mappCockpitComponentMetaData", "../diagnostics/mappCockpitCommonInfoProvider", "../../widgets/methodParameterListWidget/parameterFilter"], function (require, exports, mappCockpitComponent_1, mappCockpitComponentMetaData_1, mappCockpitCommonInfoProvider_1, parameterFilter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * provides descriptive information for a parameter
     *
     * @class MappCockpitComponentParameterInfo
     */
    var MappCockpitComponentParameterInfo = /** @class */ (function () {
        function MappCockpitComponentParameterInfo() {
        }
        /**
         * Retrieves watchableParameters
         *
         * @static
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @param {Array<string>} dataToRetrieve
         * @returns {MappCockpitComponentParameter[]}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveWatchableParameters = function (componentParameters, dataToRetrieve) {
            var metaConfig = dataToRetrieve[0];
            var metaStructure = dataToRetrieve[1];
            var metaName = dataToRetrieve[2];
            // get the watchables meta infos
            if ((componentParameters[0] == undefined) || componentParameters[0].component.metaData[metaConfig] == undefined) {
                return new Array();
            }
            var metaInfo = componentParameters[0].component.metaData[metaConfig][metaStructure];
            // retrieve the watchables definitions
            var parameters = MappCockpitComponentParameterInfo.retrieveParametersFromMetaInfo([metaName], metaInfo, componentParameters);
            return parameters;
        };
        /**
         * Create watchable state parameters according to metaInfo
         *
         * @static
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @param {Array<string>} dataToRetrieve
         * @returns {MappCockpitStateParameter[]}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveWatchableStates = function (componentParameters, dataToRetrieve) {
            var metaConfig = dataToRetrieve[0];
            var metaStructure = dataToRetrieve[1];
            var metaName = dataToRetrieve[2];
            // get the watchables meta infos
            if ((componentParameters[0] == undefined) || componentParameters[0].component.metaData[metaConfig] == undefined) {
                return new Array();
            }
            var metaInfo = componentParameters[0].component.metaData[metaConfig][metaStructure];
            var stateParameters = MappCockpitComponentParameterInfo.retrieveWatchableStatesFromMetaInfo([metaName], metaInfo, componentParameters);
            return stateParameters;
        };
        /**
         * retrieves the message parameters from the component parameters
         *
         * @private
         * @param {Array<MappCockpitComponentParameter>} componentParameters
         * @returns {Array<MappCockpitComponentParameter>}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveMessageParameters = function (componentParameters) {
            var messageSeverityParameter = componentParameters.filter(function (parameter) { return parameter.browseName === "intArraySeverity"; })[0];
            if (messageSeverityParameter == undefined) {
                messageSeverityParameter = componentParameters.filter(function (parameter) { return parameter.browseName === "strArraySeverity"; })[0];
            }
            var messageDescriptionParameter = componentParameters.filter(function (parameter) { return parameter.browseName === "strArrayDescription"; })[0];
            var messageEventIdParameter = componentParameters.filter(function (parameter) { return parameter.browseName === "strArrayEventID"; })[0];
            var messageTimeStampParameter = componentParameters.filter(function (parameter) { return parameter.browseName === "strArrayTime"; })[0];
            return [messageSeverityParameter, messageDescriptionParameter, messageEventIdParameter, messageTimeStampParameter];
        };
        /**
         * retrieves the trace configuration timing parameters from the parameter set
         *
         * @static
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {MappCockpitComponentParameter[]}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveTraceConfigurationTimingParameters = function (componentParameters) {
            // retrieve the trace configuration timing parameters
            var timingParameters = new Array();
            for (var i = 0; i < componentParameters.length; i++) {
                if (MappCockpitComponentParameterInfo.isTimingParameter(componentParameters[i])) {
                    timingParameters.push(componentParameters[i]);
                }
            }
            // Update the values to the real values from CurrentTrcConfig Property (BUGFIX for missing StartTriggers at startup)
            var currentTrcConfigProperties = componentParameters.filter(function (element) { return element.browseName == "CurrentTrcConfig"; });
            if (currentTrcConfigProperties.length == 1) {
                if (currentTrcConfigProperties[0].value != undefined) {
                    this.updateTimingParameters(timingParameters, currentTrcConfigProperties[0].value);
                }
            }
            return timingParameters;
        };
        /**
         * Updates the values of the timing parameters with the values from a json string (currentTraceConfigJsonString)
         * BUGFIX for missing StartTriggers at startup
         *
         * @private
         * @static
         * @param {MappCockpitComponentParameter[]} timingParameters
         * @param {string} currentTraceConfigJsonString
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.updateTimingParameters = function (timingParameters, currentTraceConfigJsonString) {
            if (currentTraceConfigJsonString != "") {
                var currentTraceConfig = JSON.parse(currentTraceConfigJsonString);
                // Update all timing parameters
                try {
                    if (currentTraceConfig.Timing != undefined) {
                        this.setValueOfProperty(timingParameters, "Timing_TotalRecordingTime", currentTraceConfig.Timing.TotalRecordingTime);
                        this.setValueOfProperty(timingParameters, "Timing_TriggerOffsetTime", currentTraceConfig.Timing.TriggerOffsetTime);
                        this.setValueOfProperty(timingParameters, "Timing_AcoposSampleTime", currentTraceConfig.Timing.ACOPOSSampleTime);
                        this.setValueOfProperty(timingParameters, "Timing_PlcTaskClass", currentTraceConfig.Timing.PVTaskClass);
                        this.setValueOfProperty(timingParameters, "Timing_PlcSampleTime", currentTraceConfig.Timing.PlcSampleTime);
                    }
                }
                catch (error) {
                    console.error("Updating of some trace configuration timing informations not possible!");
                }
            }
        };
        MappCockpitComponentParameterInfo.isTimingParameter = function (parameter) {
            // Timing parameters begin with "Timing_" in the properties name
            var prefix = "Timing_";
            if (parameter.browseName.substr(0, prefix.length) == prefix) {
                return true;
            }
            return false;
        };
        /**
         * retrieves the trace configuration trigger parameters from the parameter set
         *
         * @static
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {MappCockpitComponentParameter[]}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveTraceConfigurationTriggerParameters = function (componentParameters) {
            // retrieve the trace configuration trigger parameters
            var triggerParameters = new Array();
            for (var i = 0; i < componentParameters.length; i++) {
                if (MappCockpitComponentParameterInfo.isTriggerParameter(componentParameters[i])) {
                    triggerParameters.push(componentParameters[i]);
                }
            }
            // Update the values to the real values from CurrentTrcConfig Property (BUGFIX for missing StartTriggers at startup)
            var currentTrcConfigProperties = componentParameters.filter(function (element) { return element.browseName == "CurrentTrcConfig"; });
            if (currentTrcConfigProperties.length == 1) {
                if (currentTrcConfigProperties[0].value != undefined) {
                    this.updateTriggerParameters(triggerParameters, currentTrcConfigProperties[0].value);
                }
            }
            return triggerParameters;
        };
        /**
         * Updates the values of the trigger parameters with the values from a json string (currentTraceConfigJsonString)
         * BUGFIX for missing StartTriggers at startup
         *
         * @private
         * @static
         * @param {MappCockpitComponentParameter[]} triggerParameters
         * @param {string} currentTraceConfigJsonString
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.updateTriggerParameters = function (triggerParameters, currentTraceConfigJsonString) {
            if (currentTraceConfigJsonString != "") {
                var currentTraceConfig = JSON.parse(currentTraceConfigJsonString);
                // Update all supported triggers
                for (var i = 0; i < 2; i++) {
                    this.updateSingleTrigger(triggerParameters, i, currentTraceConfig);
                }
            }
        };
        /**
         * Updates the values of a trigger with the given index with the values from a json string (currentTraceConfigJsonString)
         * BUGFIX for missing StartTriggers at startup
         *
         * @private
         * @static
         * @param {MappCockpitComponentParameter[]} triggerParameters
         * @param {number} triggerIndex
         * @param {*} currentTraceConfig
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.updateSingleTrigger = function (triggerParameters, triggerIndex, currentTraceConfig) {
            try {
                var triggerID_1 = (triggerIndex + 1);
                var startTriggerPrefixBrowseName = "StartTrigger" + triggerID_1 + "_";
                var currentTriggerCfg = currentTraceConfig.Triggers.filter(function (element) { return element.ID == triggerID_1; })[0];
                if (currentTriggerCfg != undefined) {
                    this.setValueOfProperty(triggerParameters, startTriggerPrefixBrowseName + "Condition", currentTriggerCfg.Event);
                    this.setValueOfProperty(triggerParameters, startTriggerPrefixBrowseName + "DataPoint", currentTriggerCfg.DataPoint);
                    this.setValueOfProperty(triggerParameters, startTriggerPrefixBrowseName + "Threshold", currentTriggerCfg.Threshold);
                    this.setValueOfProperty(triggerParameters, startTriggerPrefixBrowseName + "Window", currentTriggerCfg.Window);
                }
                else {
                    // Set Trigger to default if not available in current trace config
                    this.setValueOfProperty(triggerParameters, startTriggerPrefixBrowseName + "Condition", "20");
                    this.setValueOfProperty(triggerParameters, startTriggerPrefixBrowseName + "DataPoint", "");
                    this.setValueOfProperty(triggerParameters, startTriggerPrefixBrowseName + "Threshold", "0");
                    this.setValueOfProperty(triggerParameters, startTriggerPrefixBrowseName + "Window", "0");
                }
            }
            catch (error) {
                console.error("Updating of some trace configuration trigger informations not possible!");
            }
        };
        MappCockpitComponentParameterInfo.setValueOfProperty = function (properties, propertyName, value) {
            var property = properties.filter(function (element) { return element.browseName == propertyName; })[0];
            if (property != undefined) {
                property.value = value;
            }
        };
        MappCockpitComponentParameterInfo.isTriggerParameter = function (parameter) {
            // Trigger parameters begin with "StartTrigger" in the properties name
            var prefix = "StartTrigger";
            if (parameter.browseName.substr(0, prefix.length) == prefix) {
                return true;
            }
            return false;
        };
        /**
         * retrieves the trace configuration datapoints from the parameter set
         *
         * @static
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {MappCockpitComponentParameter[]}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveTraceConfigurationDatapoints = function (componentParameters) {
            // retrieve the trace configuration datapoints
            var datapoints = new Array();
            for (var i = 0; i < componentParameters.length; i++) {
                if (MappCockpitComponentParameterInfo.isDataPoint(componentParameters[i])) {
                    datapoints.push(componentParameters[i]);
                }
            }
            // Update the values to the real values from CurrentTrcConfig Property (BUGFIX for missing StartTriggers at startup)
            var currentTrcConfigProperties = componentParameters.filter(function (element) { return element.browseName == "CurrentTrcConfig"; });
            if (currentTrcConfigProperties.length == 1) {
                if (currentTrcConfigProperties[0].value != undefined) {
                    this.updateDataPointParameters(datapoints, currentTrcConfigProperties[0].value);
                }
            }
            return datapoints;
        };
        /**
         * Updates the values of the datapoint parameters with the values from a json string (currentTraceConfigJsonString)
         * BUGFIX for missing StartTriggers at startup
         *
         * @private
         * @static
         * @param {MappCockpitComponentParameter[]} dataPointParameters
         * @param {string} currentTraceConfigJsonString
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.updateDataPointParameters = function (dataPointParameters, currentTraceConfigJsonString) {
            if (currentTraceConfigJsonString != "") {
                var currentTraceConfig = JSON.parse(currentTraceConfigJsonString);
                // Update all datapoints
                try {
                    if (currentTraceConfig.DataPoints != undefined) {
                        var _loop_1 = function (index) {
                            var dataPointID = (index + 1);
                            var currentDataPoint = currentTraceConfig.DataPoints.filter(function (element) { return element.ID == dataPointID; })[0];
                            if (currentDataPoint != undefined) {
                                dataPointParameters[index].value = currentDataPoint.Name;
                            }
                            else {
                                dataPointParameters[index].value = "";
                            }
                        };
                        for (var index = 0; index < dataPointParameters.length; index++) {
                            _loop_1(index);
                        }
                    }
                }
                catch (error) {
                    console.error("Updating of some trace configuration datapoint informations not possible!");
                }
            }
        };
        MappCockpitComponentParameterInfo.isDataPoint = function (parameter) {
            // Datapoint parameters begin with "DataPoint" in the properties name
            var prefix = "DataPoint";
            if (parameter.browseName.substr(0, prefix.length) == prefix) {
                return true;
            }
            return false;
        };
        /**
         * retrieves the trace control parameters from the parameter set
         *
         * @static
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {MappCockpitComponentParameter[]}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveTraceControlParameters = function (componentParameters) {
            // retrieve the trace configuration datapoints
            var datapoints = new Array();
            for (var i = 0; i < componentParameters.length; i++) {
                if (MappCockpitComponentParameterInfo.isTraceControlParameter(componentParameters[i])) {
                    datapoints.push(componentParameters[i]);
                }
            }
            return datapoints;
        };
        MappCockpitComponentParameterInfo.isTraceControlParameter = function (parameter) {
            if (parameter.browseName == "TraceStatus") {
                return true;
            }
            return false;
        };
        /**
        * retrieves the configuration parameters from the parameter set
        *
        * @static
        * @param {MappCockpitComponentParameter[]} componentParameters
        * @returns {MappCockpitComponentParameter[]}
        * @memberof MappCockpitComponentParameterInfo
        */
        MappCockpitComponentParameterInfo.retrieveConfigurationParameters = function (componentParameters) {
            // get the configuration meta infos
            var configurationMetaInfo;
            if ((componentParameters[0] != undefined) && componentParameters[0].component.metaData.MetaConfigConfigProps != undefined) {
                configurationMetaInfo = componentParameters[0].component.metaData.MetaConfigConfigProps.ConfigurationStructure;
            }
            else {
                return new Array();
            }
            // retrieve the configuration definitions
            var configurationParameters = MappCockpitComponentParameterInfo.retrieveParametersFromMetaInfo(["Parameter", "Group"], configurationMetaInfo, componentParameters);
            return configurationParameters;
        };
        /**
         * retrives parameters declared in the meta info
         *
         * @private
         * @static
         * @param {string[]} requesteItemTypes
         * @param {*} parameterMetaInfo
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveParametersFromMetaInfo = function (requesteItemTypes, parameterMetaInfo, componentParameters) {
            // get requested meta items
            var metaParameterItems = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(parameterMetaInfo, requesteItemTypes);
            // create dictionary of available parameters
            var parameterSet = {};
            componentParameters.forEach(function (parameter) { parameterSet[parameter.browseName] = parameter; });
            // create dictionary of meta parameters
            var metaParameters = {};
            metaParameterItems.forEach(function (metaParameter) { metaParameters[metaParameter.Ref] = metaParameter; });
            // retrieve the parameters with matching name in the meta info
            var matchingParameters = componentParameters.filter(function (componentParameter) { return metaParameters[componentParameter.browseName] !== undefined; });
            // read and assign units
            MappCockpitComponentParameterInfo.updateParameter(matchingParameters, metaParameters);
            // notify invalid or unknown references
            var unknownParameterRefs = metaParameterItems.filter(function (metaParameter) { return metaParameter.Ref !== undefined && parameterSet[metaParameter.Ref] === undefined; });
            if (unknownParameterRefs.length > 0) {
                console.error("MappCockpitComponentParameterInfo.retrieveParametersFromMetaInfo : meta info references unknown parameters %o %o", unknownParameterRefs, parameterSet);
            }
            return matchingParameters;
        };
        /**
         * Retrieves watchable states declared in the metaInfo
         *
         * @static
         * @param {string[]} requesteItemTypes
         * @param {*} parameterMetaInfo
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {MappCockpitStateParameter[]}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveWatchableStatesFromMetaInfo = function (requesteItemTypes, parameterMetaInfo, componentParameters) {
            var stateParameters = new Array();
            // get requested meta items
            var metaParameterItems = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(parameterMetaInfo, requesteItemTypes);
            // create dictionary of available parameters
            var parameterSet = {};
            componentParameters.forEach(function (parameter) { parameterSet[parameter.browseName] = parameter; });
            // create watchable states
            metaParameterItems.forEach(function (metaParameter) {
                stateParameters.push(new mappCockpitComponent_1.MappCockpitStateParameter(metaParameter.Ref, metaParameter.IconExpression, metaParameter.WatchableVariablesMapping, metaParameter.Icon));
            });
            return stateParameters;
        };
        MappCockpitComponentParameterInfo.readParameters = function (parameterMetaInfo, parameter) {
            // get requested meta items
            var metaParameterItems = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(parameterMetaInfo, parameter);
            // create dictionary of meta parameters
            var metaParameters = {};
            metaParameterItems.forEach(function (metaParameter) { metaParameters[metaParameter.Ref] = metaParameter; });
            return metaParameters;
        };
        MappCockpitComponentParameterInfo.readMessageParameters = function (parameterMetaInfo) {
            var metaParameters = {};
            metaParameters["intArraySeverity"] = { Ref: "intArraySeverity" };
            metaParameters["strArrayDescription"] = { Ref: "strArrayDescription" };
            metaParameters["strArrayEventID"] = { Ref: "strArrayEventID" };
            metaParameters["strArrayTime"] = { Ref: "strArrayTime" };
            return metaParameters;
        };
        /**
         * reads engineering units from the meta info and assigns it to the parameters
         *
         * @private
         * @static
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @param {{}} metaParameters
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.updateParameter = function (componentParameters, metaParameters) {
            componentParameters.forEach(function (componentParameter) {
                MappCockpitComponentParameterInfo.updateParameterEngineeringUnit(metaParameters, componentParameter);
                MappCockpitComponentParameterInfo.updateParameterDisplayName(metaParameters, componentParameter);
            });
        };
        /**
         * Updates the parameters display name
         *
         * @static
         * @param {{}} metaParameters
         * @param {MappCockpitComponentParameter} componentParameter
         * @returns {*}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.updateParameterDisplayName = function (metaParameters, componentParameter) {
            if (metaParameters[componentParameter.browseName].DisplayName) {
                componentParameter.displayName = metaParameters[componentParameter.browseName].DisplayName;
            }
        };
        /**
         * Updates the parameters engineering units
         *
         * @private
         * @static
         * @param {{}} metaParameters
         * @param {MappCockpitComponentParameter} componentParameter
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.updateParameterEngineeringUnit = function (metaParameters, componentParameter) {
            if (metaParameters[componentParameter.browseName].EU) {
                componentParameter.engineeringUnit = metaParameters[componentParameter.browseName].EU;
            }
        };
        /**
         * reads enum values if available and assigns it to the parameter
         *
         * @static
         * @param {MappCockpitComponentParameter} parameter
         * @returns {*} true if the parameter uses an enum for its value
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.readParameterEnums = function (componentParameters) {
            // get available enum parameter defs 
            var enumParameterTypeDefinitions = mappCockpitCommonInfoProvider_1.MappCockpitCommonInfoProvider.getInstance().readEnumParameterDefinitions(componentParameters, componentParameters[0].component.metaData);
            // find matching parameter
            var matchingParameters = componentParameters.filter(function (componentParameter) { return enumParameterTypeDefinitions[componentParameter.browseName]; });
            // set the enum definitions for the matching parameters
            matchingParameters.forEach(function (matchingParameter) {
                // set the enum definition
                matchingParameter.enumType = enumParameterTypeDefinitions[matchingParameter.browseName];
                console.log("MappCockpitComponentParameterInfo - set enum info %o for %o", matchingParameter.enumType, matchingParameter.component.browseName + "." + matchingParameter.browseName);
            });
        };
        return MappCockpitComponentParameterInfo;
    }());
    exports.MappCockpitComponentParameterInfo = MappCockpitComponentParameterInfo;
    /**
     * provides descriptive information for a method
     *
     * @class MappCockpitComponentMethodInfoInfo
     */
    var MappCockpitComponentMethodInfo = /** @class */ (function () {
        function MappCockpitComponentMethodInfo() {
        }
        /**
         * initializes the method input parameters
         *
         * @static
         * @param {MappCockpitComponentMethod} method
         * @returns {*}
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.updateMethodInputParameters = function (method) {
            // skip if the method has no parameters to initialize.
            if (method.inputParameters.length === 0)
                return;
            // get the meta data
            var methodMetaInfo = MappCockpitComponentMethodInfo.getMethodMetaInfo(method);
            if (methodMetaInfo) {
                // find and initialize method parameter default values
                method.inputParameters.forEach(function (methodInputParameter) {
                    MappCockpitComponentMethodInfo.updateMethodInputParameterDefaults(method, methodInputParameter, methodMetaInfo);
                });
            }
        };
        /**
         * updates respectively initializes the method input parameters with defaults
         *
         * @private
         * @static
         * @param {MappCockpitComponentMethod} method
         * @param {MappCockpitMethodParameter} methodInputParameter
         * @param {*} methodMetaInfo
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.updateMethodInputParameterDefaults = function (method, methodInputParameter, methodMetaInfo) {
            var methodParameterMetaInfo = MappCockpitComponentMethodInfo.getMethodParameterMetaInfo(methodMetaInfo, methodInputParameter);
            if (methodParameterMetaInfo) {
                // assign default value if defined ...
                MappCockpitComponentMethodInfo.updateMethodInputParameterDefaultValue(methodParameterMetaInfo, methodInputParameter, method);
                // assign engineering unit if defined.
                MappCockpitComponentMethodInfo.updateMethodParameterEngineeringUnit(methodParameterMetaInfo, methodInputParameter);
                // assign display name
                MappCockpitComponentMethodInfo.updateMethodParameterDisplayName(methodParameterMetaInfo, methodInputParameter);
                //assign filter if defined
                MappCockpitComponentMethodInfo.updateMethodParameterFilter(methodParameterMetaInfo, methodInputParameter);
            }
            else {
                console.error("MappCockpitComponentMethodInfo.initializeInputParameterDefaultValues : No meta info defined for for method parameter %o", method.browseName + "." + methodInputParameter.name);
            }
        };
        /**
         * Update filter information to method parameter
         *
         * @private
         * @static
         * @param {*} methodParameterMetaInfo
         * @param {MappCockpitMethodParameter} methodInputParameter
         * @returns {*}
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.updateMethodParameterFilter = function (methodParameterMetaInfo, methodInputParameter) {
            var parameterHasFilter = methodParameterMetaInfo.Parameter.hasOwnProperty("Filter");
            if (parameterHasFilter) {
                methodInputParameter.filter = new parameterFilter_1.ParameterFilter(methodParameterMetaInfo.Parameter.Filter.ParameterRef, methodParameterMetaInfo.Parameter.Filter.ParameterValues);
            }
        };
        /**
         * Updates the display from meta info
         *
         * @static
         * @param {*} methodParameterMetaInfo
         * @param {MappCockpitMethodParameter} methodInputParameter
         * @returns {*}
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.updateMethodParameterDisplayName = function (methodParameterMetaInfo, methodInputParameter) {
            if (methodParameterMetaInfo.Parameter.DisplayName) {
                methodInputParameter.displayName = methodParameterMetaInfo.Parameter.DisplayName;
            }
        };
        /**
         * Updates the engineering unit
         *
         * @private
         * @static
         * @param {*} methodParameterMetaInfo
         * @param {MappCockpitMethodParameter} methodInputParameter
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.updateMethodParameterEngineeringUnit = function (methodParameterMetaInfo, methodInputParameter) {
            if (methodParameterMetaInfo.Parameter.EU) {
                methodInputParameter.engineeringUnit = methodParameterMetaInfo.Parameter.EU;
            }
        };
        /**
         * Updates the default value
         *
         * @private
         * @static
         * @param {*} methodParameterMetaInfo
         * @param {MappCockpitMethodParameter} methodInputParameter
         * @param {MappCockpitComponentMethod} method
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.updateMethodInputParameterDefaultValue = function (methodParameterMetaInfo, methodInputParameter, method) {
            var parameterHasDefaultValue = methodParameterMetaInfo.Parameter.hasOwnProperty("DefaultValue");
            if (parameterHasDefaultValue) {
                methodInputParameter.value = methodParameterMetaInfo.Parameter.DefaultValue;
            }
            else {
                // method parameters must have default values defined
                console.error("MappCockpitComponentMethodInfo.initializeInputParameterDefaultValues : No default value defined for method parameter %o", method.browseName + "." + methodInputParameter.name);
            }
        };
        /**
         * gets the meta info for a method parameter
         *
         * @private
         * @static
         * @param {*} methodMetaInfo
         * @param {MappCockpitMethodParameter} methodInputParameter
         * @returns
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.getMethodParameterMetaInfo = function (methodMetaInfo, methodInputParameter) {
            var methodParameterMetaInfos = methodMetaInfo.Parameters.filter(function (methodMetaItemParameterItem) { return methodMetaItemParameterItem.Parameter.Ref === methodInputParameter.name; });
            var methodParameterMetaInfo = methodParameterMetaInfos.length === 1 ? methodParameterMetaInfos[0] : undefined;
            return methodParameterMetaInfo;
        };
        /**
         * gets the meta info for the requested method
         *
         * @private
         * @static
         * @param {MappCockpitComponentMethod} method
         * @returns
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.getMethodMetaInfo = function (method) {
            var methodMetaInfo = undefined;
            var componentMetaData = method.component.metaData;
            if (componentMetaData == undefined) {
                return methodMetaInfo;
            }
            // get the method info from meta data
            var methodMetaItems = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(componentMetaData.MetaConfigCommands.CommandsStructure, ["Command"]);
            // get the meta info for the requested method
            var methodMetaInfos = methodMetaItems.filter(function (methodMetaItem) { return methodMetaItem.Ref === method.browseName; });
            methodMetaInfo = methodMetaInfos.length === 1 ? methodMetaInfos[0] : undefined;
            return methodMetaInfo;
        };
        /**
         * gets the method parameters contained in the meta data
         *
         * @private
         * @static
         * @param {*} methodMetaItem
         * @param {MappCockpitMethodParameter} methodInputParameter
         * @returns
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.getMatchingMethodParameters = function (methodMetaItem, methodInputParameter) {
            return methodMetaItem.Parameters.filter(function (methodMetaItemParameterItem) {
                var isMatchingMethodParameter = methodMetaItemParameterItem.Parameter.Ref === methodInputParameter.name
                    && methodMetaItemParameterItem.Parameter.DefaultValue
                    && methodMetaItemParameterItem.Parameter.DefaultValue !== "";
                return isMatchingMethodParameter;
            });
        };
        /**
         * Retrieves the executable methods from the component method set
         *
         * @static
         * @param {MappCockpitComponentMethod[]} componentMethods
         * @param {Array<string>} dataToRetrieve
         * @returns {MappCockpitComponentMethod[]}
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.retrieveExecutableMethods = function (componentMethods, dataToRetrieve) {
            var _this = this;
            var metaConfig = dataToRetrieve[0];
            var metaStructure = dataToRetrieve[1];
            var metaName = dataToRetrieve[2];
            var executableMethods = Array();
            if ((componentMethods[0] == undefined) ||
                componentMethods[0].component.metaData == undefined ||
                componentMethods[0].component.metaData[metaConfig] == undefined) {
                return executableMethods;
            }
            // get the commands meta infos
            var methodsMetaInfo = componentMethods[0].component.metaData[metaConfig][metaStructure];
            // retrieve the method definitions
            var metaMethods = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(methodsMetaInfo, [metaName]);
            // create dictionary of available methods
            var methodSet = {};
            var metaMethodSet = {};
            componentMethods.forEach(function (method) { methodSet[method.browseName] = method; });
            metaMethods.forEach(function (metaMethod) { metaMethodSet[metaMethod.Ref] = metaMethod; });
            // retrieve the methods with matching name in the meta info
            executableMethods = metaMethods.filter(function (metaMethod) { return methodSet[metaMethod.Ref] !== undefined; }).map(function (metaMethod) { return methodSet[metaMethod.Ref]; });
            // assign the display name
            executableMethods.forEach(function (method) { _this.updateMethodDisplayName(method, metaMethodSet[method.browseName]); });
            // notify invalid or unknown methods
            var unknownMethods = metaMethods.filter(function (metaMethod) { return methodSet[metaMethod.Ref] === undefined; });
            if (unknownMethods.length > 0) {
                console.error("MappCockpitComponentMethodInfo.retrieveExecutableMethods : meta info references unknown methods %o", unknownMethods);
            }
            return executableMethods;
        };
        /**
         * Retrieves quick commands methods from metaInfo
         *
         * @static
         * @param {MappCockpitComponentMethod[]} componentMethods
         * @param {Array<string>} dataToRetrieve
         * @returns {MappCockpitQuickCommandParameter[]}
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.retrieveQuickCommands = function (componentMethods, dataToRetrieve) {
            var metaConfig = dataToRetrieve[0];
            var metaStructure = dataToRetrieve[1];
            var metaName = dataToRetrieve[2];
            var quickCommands = Array();
            if ((componentMethods[0] == undefined) ||
                componentMethods[0].component.metaData == undefined ||
                componentMethods[0].component.metaData[metaConfig] == undefined) {
                return quickCommands;
            }
            // get the commands meta infos
            var methodsMetaInfo = componentMethods[0].component.metaData[metaConfig][metaStructure];
            // retrieve the method definitions
            var metaMethods = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(methodsMetaInfo, [metaName]);
            // create dictionary of available methods
            var methodSet = {};
            componentMethods.forEach(function (method) { methodSet[method.browseName] = method; });
            metaMethods.forEach(function (metaMethod) {
                quickCommands.push(new mappCockpitComponent_1.MappCockpitQuickCommandParameter(metaMethod.Ref, metaMethod.Tooltip, metaMethod.ImageName));
            });
            // notify invalid or unknown methods
            var unknownMethods = quickCommands.filter(function (quickCommand) { return methodSet[quickCommand.name] === undefined; });
            if (unknownMethods.length > 0) {
                console.error("MappCockpitComponentMethodInfo.retrieveQuickCommands : meta info references unknown methods %o", unknownMethods);
            }
            return quickCommands;
        };
        MappCockpitComponentMethodInfo.readMethods = function (metaInfo, property, method) {
            var metaConfig = property[0];
            var metaConfigStructure = property[1];
            // get the commands meta infos
            if (metaInfo[metaConfig] == undefined)
                return {};
            var methodsMetaInfo = metaInfo[metaConfig][metaConfigStructure];
            // retrieve the method definitions
            var metaMethods = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(methodsMetaInfo, method);
            // create dictionary of available methods
            var metaMethodSet = {};
            metaMethods.forEach(function (metaMethod) { metaMethodSet[metaMethod.Ref] = metaMethod; });
            return metaMethodSet;
        };
        /**
         * Updates a methods display name
         *
         * @static
         * @param {MappCockpitComponentMethod} method
         * @param {*} arg1
         * @returns {*}
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.updateMethodDisplayName = function (method, metaMethodInfo) {
            if (metaMethodInfo && metaMethodInfo.DisplayName) {
                method.displayName = metaMethodInfo.DisplayName;
            }
        };
        /**
         * reads and updates method parameter enums
         *
         * @static
         * @param {MappCockpitComponentMethod} method
         * @returns {*}
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.readMethodParameterEnums = function (method, metaData) {
            var methodParameters = method.inputParameters;
            // get available enum method parameter defs 
            var metaMethodParameterEnumTypeDefinitions = mappCockpitCommonInfoProvider_1.MappCockpitCommonInfoProvider.getInstance().readMetaEnumMethodParameterDefinitions(method, metaData);
            // find matching parameter
            var matchingMethodParameters = methodParameters.filter(function (methodParameter) { return metaMethodParameterEnumTypeDefinitions[methodParameter.name]; });
            // set the enum definitions for the matching parameters
            matchingMethodParameters.forEach(function (matchingMethodParameter) {
                // set the enum definition
                matchingMethodParameter.enumType = metaMethodParameterEnumTypeDefinitions[matchingMethodParameter.name];
                console.log("MappCockpitComponentMethodInfo - set enum info %o for %o", matchingMethodParameter.enumType, method.browseName + "." + matchingMethodParameter.name);
            });
        };
        return MappCockpitComponentMethodInfo;
    }());
    exports.MappCockpitComponentMethodInfo = MappCockpitComponentMethodInfo;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRDb21wb25lbnRSZWZsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50UmVmbGVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFLQTs7OztPQUlHO0lBRUg7UUFBQTtRQTZmQSxDQUFDO1FBM2ZHOzs7Ozs7OztXQVFHO1FBQ0ksNkRBQTJCLEdBQWxDLFVBQW1DLG1CQUFvRCxFQUFFLGNBQTZCO1lBQ2xILElBQUksVUFBVSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLGFBQWEsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEMsSUFBSSxRQUFRLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRWpDLGdDQUFnQztZQUNoQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDLElBQWlDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVUsQ0FBQyxRQUFTLENBQUMsVUFBVSxDQUFDLElBQUksU0FBUyxFQUFFO2dCQUM1SSxPQUFPLElBQUksS0FBSyxFQUFpQyxDQUFDO2FBQ3JEO1lBQ0QsSUFBSSxRQUFRLEdBQWdDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVUsQ0FBQyxRQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDbkgsc0NBQXNDO1lBQ3RDLElBQUksVUFBVSxHQUFHLGlDQUFpQyxDQUFDLDhCQUE4QixDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixDQUFDLENBQUM7WUFDN0gsT0FBTyxVQUFVLENBQUM7UUFDdEIsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0kseURBQXVCLEdBQTlCLFVBQStCLG1CQUFvRCxFQUFFLGNBQTZCO1lBQzlHLElB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QUU5Qyw0Q0FBNEM7WUFDNUMsSUFBSSxzQ0FBc0MsR0FBRyw2REFBNkIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxzQ0FBc0MsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFFbEosMEJBQTBCO1lBQzFCLElBQUksd0JBQXdCLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLFVBQUMsZUFBZSxJQUFPLE9BQU8sc0NBQXNDLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckosdURBQXVEO1lBQ3ZELHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxVQUFDLHVCQUF1QjtnQkFDckQsMEJBQTBCO2dCQUMxQix1QkFBdUIsQ0FBQyxRQUFRLEdBQUcsc0NBQXNDLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3hHLE9BQU8sQ0FBQyxHQUFHLENBQUMsMERBQTBELEVBQUUsdUJBQXVCLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RLLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVMLHFDQUFDO0lBQUQsQ0FBQyxBQWpWRCxJQWlWQztJQUUyQyx3RUFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCwgTWFwcENvY2twaXRDb21wb25lbnQsIE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyLCBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlciwgTWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlciwgTWFwcENvY2twaXRRdWlja0NvbW1hbmRQYXJhbWV0ZXIgfSBmcm9tIFwiLi9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGFEYXRhIH0gZnJvbSBcIi4vbWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YVwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlciB9IGZyb20gXCIuLi9kaWFnbm9zdGljcy9tYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlclwiO1xyXG5pbXBvcnQgeyBQYXJhbWV0ZXJGaWx0ZXIgfSBmcm9tIFwiLi4vLi4vd2lkZ2V0cy9tZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0L3BhcmFtZXRlckZpbHRlclwiO1xyXG5cclxuLyoqXHJcbiAqIHByb3ZpZGVzIGRlc2NyaXB0aXZlIGluZm9ybWF0aW9uIGZvciBhIHBhcmFtZXRlclxyXG4gKlxyXG4gKiBAY2xhc3MgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvXHJcbiAqL1xyXG5cclxuY2xhc3MgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcyB3YXRjaGFibGVQYXJhbWV0ZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBjb21wb25lbnRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IGRhdGFUb1JldHJpZXZlXHJcbiAgICAgKiBAcmV0dXJucyB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJldHJpZXZlV2F0Y2hhYmxlUGFyYW1ldGVycyhjb21wb25lbnRQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdLCBkYXRhVG9SZXRyaWV2ZTogQXJyYXk8c3RyaW5nPik6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10ge1xyXG4gICAgICAgIGxldCBtZXRhQ29uZmlnID0gZGF0YVRvUmV0cmlldmVbMF07XHJcbiAgICAgICAgbGV0IG1ldGFTdHJ1Y3R1cmUgPSBkYXRhVG9SZXRyaWV2ZVsxXTtcclxuICAgICAgICBsZXQgbWV0YU5hbWUgPSBkYXRhVG9SZXRyaWV2ZVsyXTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSB3YXRjaGFibGVzIG1ldGEgaW5mb3NcclxuICAgICAgICBpZiAoKGNvbXBvbmVudFBhcmFtZXRlcnNbMF0gPT0gdW5kZWZpbmVkKSB8fCAoPGFueT4oPE1hcHBDb2NrcGl0Q29tcG9uZW50PmNvbXBvbmVudFBhcmFtZXRlcnNbMF0uY29tcG9uZW50KS5tZXRhRGF0YSlbbWV0YUNvbmZpZ10gPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBtZXRhSW5mbyA9ICg8YW55Pig8TWFwcENvY2twaXRDb21wb25lbnQ+Y29tcG9uZW50UGFyYW1ldGVyc1swXS5jb21wb25lbnQpLm1ldGFEYXRhKVttZXRhQ29uZmlnXVttZXRhU3RydWN0dXJlXTtcclxuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgd2F0Y2hhYmxlcyBkZWZpbml0aW9uc1xyXG4gICAgICAgIGxldCBwYXJhbWV0ZXJzID0gTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLnJldHJpZXZlUGFyYW1ldGVyc0Zyb21NZXRhSW5mbyhbbWV0YU5hbWVdLCBtZXRhSW5mbywgY29tcG9uZW50UGFyYW1ldGVycyk7XHJcbiAgICAgICAgcmV0dXJuIHBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgd2F0Y2hhYmxlIHN0YXRlIHBhcmFtZXRlcnMgYWNjb3JkaW5nIHRvIG1ldGFJbmZvXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBjb21wb25lbnRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IGRhdGFUb1JldHJpZXZlXHJcbiAgICAgKiBAcmV0dXJucyB7TWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlcltdfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mb1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmV0cmlldmVXYXRjaGFibGVTdGF0ZXMoY29tcG9uZW50UGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSwgZGF0YVRvUmV0cmlldmU6IEFycmF5PHN0cmluZz4pOiBNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyW10ge1xyXG4gICAgICAgIGxldCBtZXRhQ29uZmlnID0gZGF0YVRvUmV0cmlldmVbMF07XHJcbiAgICAgICAgbGV0IG1ldGFTdHJ1Y3R1cmUgPSBkYXRhVG9SZXRyaWV2ZVsxXTtcclxuICAgICAgICBsZXQgbWV0YU5hbWUgPSBkYXRhVG9SZXRyaWV2ZVsyXTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSB3YXRjaGFibGVzIG1ldGEgaW5mb3NcclxuICAgICAgICBpZiAoKGNvbXBvbmVudFBhcmFtZXRlcnNbMF0gPT0gdW5kZWZpbmVkKSB8fCAoPGFueT4oPE1hcHBDb2NrcGl0Q29tcG9uZW50PmNvbXBvbmVudFBhcmFtZXRlcnNbMF0uY29tcG9uZW50KS5tZXRhRGF0YSlbbWV0YUNvbmZpZ10gPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXk8TWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlcj4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1ldGFJbmZvID0gKDxhbnk+KDxNYXBwQ29ja3BpdENvbXBvbmVudD5jb21wb25lbnRQYXJhbWV0ZXJzWzBdLmNvbXBvbmVudCkubWV0YURhdGEpW21ldGFDb25maWddW21ldGFTdHJ1Y3R1cmVdO1xyXG5cclxuICAgICAgICBsZXQgc3RhdGVQYXJhbWV0ZXJzID0gTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLnJldHJpZXZlV2F0Y2hhYmxlU3RhdGVzRnJvbU1ldGFJbmZvKFttZXRhTmFtZV0sIG1ldGFJbmZvLCBjb21wb25lbnRQYXJhbWV0ZXJzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHN0YXRlUGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXRyaWV2ZXMgdGhlIG1lc3NhZ2UgcGFyYW1ldGVycyBmcm9tIHRoZSBjb21wb25lbnQgcGFyYW1ldGVyc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPn0gY29tcG9uZW50UGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMge0FycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJldHJpZXZlTWVzc2FnZVBhcmFtZXRlcnMoY29tcG9uZW50UGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+KTogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSB7XHJcblxyXG4gICAgICAgIGxldCBtZXNzYWdlU2V2ZXJpdHlQYXJhbWV0ZXIgPSBjb21wb25lbnRQYXJhbWV0ZXJzLmZpbHRlcihwYXJhbWV0ZXIgPT4geyByZXR1cm4gcGFyYW1ldGVyLmJyb3dzZU5hbWUgPT09IFwiaW50QXJyYXlTZXZlcml0eVwiOyB9KVswXTtcclxuICAgICAgICBpZiAobWVzc2FnZVNldmVyaXR5UGFyYW1ldGVyID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBtZXNzYWdlU2V2ZXJpdHlQYXJhbWV0ZXIgPSBjb21wb25lbnRQYXJhbWV0ZXJzLmZpbHRlcihwYXJhbWV0ZXIgPT4geyByZXR1cm4gcGFyYW1ldGVyLmJyb3dzZU5hbWUgPT09IFwic3RyQXJyYXlTZXZlcml0eVwiOyB9KVswXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtZXNzYWdlRGVzY3JpcHRpb25QYXJhbWV0ZXIgPSBjb21wb25lbnRQYXJhbWV0ZXJzLmZpbHRlcihwYXJhbWV0ZXIgPT4geyByZXR1cm4gcGFyYW1ldGVyLmJyb3dzZU5hbWUgPT09IFwic3RyQXJyYXlEZXNjcmlwdGlvblwiOyB9KVswXTtcclxuICAgICAgICBsZXQgbWVzc2FnZUV2ZW50SWRQYXJhbWV0ZXIgPSBjb21wb25lbnRQYXJhbWV0ZXJzLmZpbHRlcihwYXJhbWV0ZXIgPT4geyByZXR1cm4gcGFyYW1ldGVyLmJyb3dzZU5hbWUgPT09IFwic3RyQXJyYXlFdmVudElEXCI7IH0pWzBdO1xyXG4gICAgICAgIGxldCBtZXNzYWdlVGltZVN0YW1wUGFyYW1ldGVyID0gY29tcG9uZW50UGFyYW1ldGVycy5maWx0ZXIocGFyYW1ldGVyID0+IHsgcmV0dXJuIHBhcmFtZXRlci5icm93c2VOYW1lID09PSBcInN0ckFycmF5VGltZVwiOyB9KVswXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFttZXNzYWdlU2V2ZXJpdHlQYXJhbWV0ZXIsIG1lc3NhZ2VEZXNjcmlwdGlvblBhcmFtZXRlciwgbWVzc2FnZUV2ZW50SWRQYXJhbWV0ZXIsIG1lc3NhZ2VUaW1lU3RhbXBQYXJhbWV0ZXJdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV0cmlldmVzIHRoZSB0cmFjZSBjb25maWd1cmF0aW9uIHRpbWluZyBwYXJhbWV0ZXJzIGZyb20gdGhlIHBhcmFtZXRlciBzZXRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGNvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mb1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmV0cmlldmVUcmFjZUNvbmZpZ3VyYXRpb25UaW1pbmdQYXJhbWV0ZXJzKGNvbXBvbmVudFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdIHtcclxuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgdHJhY2UgY29uZmlndXJhdGlvbiB0aW1pbmcgcGFyYW1ldGVyc1xyXG4gICAgICAgIGxldCB0aW1pbmdQYXJhbWV0ZXJzID0gbmV3IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPigpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29tcG9uZW50UGFyYW1ldGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLmlzVGltaW5nUGFyYW1ldGVyKGNvbXBvbmVudFBhcmFtZXRlcnNbaV0pKSB7XHJcbiAgICAgICAgICAgICAgICB0aW1pbmdQYXJhbWV0ZXJzLnB1c2goY29tcG9uZW50UGFyYW1ldGVyc1tpXSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHRoZSB2YWx1ZXMgdG8gdGhlIHJlYWwgdmFsdWVzIGZyb20gQ3VycmVudFRyY0NvbmZpZyBQcm9wZXJ0eSAoQlVHRklYIGZvciBtaXNzaW5nIFN0YXJ0VHJpZ2dlcnMgYXQgc3RhcnR1cClcclxuICAgICAgICBsZXQgY3VycmVudFRyY0NvbmZpZ1Byb3BlcnRpZXMgPSBjb21wb25lbnRQYXJhbWV0ZXJzLmZpbHRlcigoZWxlbWVudCkgPT4geyByZXR1cm4gZWxlbWVudC5icm93c2VOYW1lID09IFwiQ3VycmVudFRyY0NvbmZpZ1wiIH0pO1xyXG4gICAgICAgIGlmIChjdXJyZW50VHJjQ29uZmlnUHJvcGVydGllcy5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudFRyY0NvbmZpZ1Byb3BlcnRpZXNbMF0udmFsdWUgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRpbWluZ1BhcmFtZXRlcnModGltaW5nUGFyYW1ldGVycywgY3VycmVudFRyY0NvbmZpZ1Byb3BlcnRpZXNbMF0udmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aW1pbmdQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgdmFsdWVzIG9mIHRoZSB0aW1pbmcgcGFyYW1ldGVycyB3aXRoIHRoZSB2YWx1ZXMgZnJvbSBhIGpzb24gc3RyaW5nIChjdXJyZW50VHJhY2VDb25maWdKc29uU3RyaW5nKSBcclxuICAgICAqIEJVR0ZJWCBmb3IgbWlzc2luZyBTdGFydFRyaWdnZXJzIGF0IHN0YXJ0dXBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSB0aW1pbmdQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY3VycmVudFRyYWNlQ29uZmlnSnNvblN0cmluZ1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mb1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyB1cGRhdGVUaW1pbmdQYXJhbWV0ZXJzKHRpbWluZ1BhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10sIGN1cnJlbnRUcmFjZUNvbmZpZ0pzb25TdHJpbmc6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChjdXJyZW50VHJhY2VDb25maWdKc29uU3RyaW5nICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRUcmFjZUNvbmZpZyA9IEpTT04ucGFyc2UoY3VycmVudFRyYWNlQ29uZmlnSnNvblN0cmluZyk7XHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBhbGwgdGltaW5nIHBhcmFtZXRlcnNcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VHJhY2VDb25maWcuVGltaW5nICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVPZlByb3BlcnR5KHRpbWluZ1BhcmFtZXRlcnMsIFwiVGltaW5nX1RvdGFsUmVjb3JkaW5nVGltZVwiLCBjdXJyZW50VHJhY2VDb25maWcuVGltaW5nLlRvdGFsUmVjb3JkaW5nVGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZU9mUHJvcGVydHkodGltaW5nUGFyYW1ldGVycywgXCJUaW1pbmdfVHJpZ2dlck9mZnNldFRpbWVcIiwgY3VycmVudFRyYWNlQ29uZmlnLlRpbWluZy5UcmlnZ2VyT2Zmc2V0VGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZU9mUHJvcGVydHkodGltaW5nUGFyYW1ldGVycywgXCJUaW1pbmdfQWNvcG9zU2FtcGxlVGltZVwiLCBjdXJyZW50VHJhY2VDb25maWcuVGltaW5nLkFDT1BPU1NhbXBsZVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVPZlByb3BlcnR5KHRpbWluZ1BhcmFtZXRlcnMsIFwiVGltaW5nX1BsY1Rhc2tDbGFzc1wiLCBjdXJyZW50VHJhY2VDb25maWcuVGltaW5nLlBWVGFza0NsYXNzKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlT2ZQcm9wZXJ0eSh0aW1pbmdQYXJhbWV0ZXJzLCBcIlRpbWluZ19QbGNTYW1wbGVUaW1lXCIsIGN1cnJlbnRUcmFjZUNvbmZpZy5UaW1pbmcuUGxjU2FtcGxlVGltZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVXBkYXRpbmcgb2Ygc29tZSB0cmFjZSBjb25maWd1cmF0aW9uIHRpbWluZyBpbmZvcm1hdGlvbnMgbm90IHBvc3NpYmxlIVwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGlzVGltaW5nUGFyYW1ldGVyKHBhcmFtZXRlcjogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIpOiBib29sZWFuIHtcclxuICAgICAgICAvLyBUaW1pbmcgcGFyYW1ldGVycyBiZWdpbiB3aXRoIFwiVGltaW5nX1wiIGluIHRoZSBwcm9wZXJ0aWVzIG5hbWVcclxuICAgICAgICBsZXQgcHJlZml4ID0gXCJUaW1pbmdfXCI7XHJcbiAgICAgICAgaWYgKHBhcmFtZXRlci5icm93c2VOYW1lLnN1YnN0cigwLCBwcmVmaXgubGVuZ3RoKSA9PSBwcmVmaXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHJpZXZlcyB0aGUgdHJhY2UgY29uZmlndXJhdGlvbiB0cmlnZ2VyIHBhcmFtZXRlcnMgZnJvbSB0aGUgcGFyYW1ldGVyIHNldFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gY29tcG9uZW50UGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZXRyaWV2ZVRyYWNlQ29uZmlndXJhdGlvblRyaWdnZXJQYXJhbWV0ZXJzKGNvbXBvbmVudFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdIHtcclxuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgdHJhY2UgY29uZmlndXJhdGlvbiB0cmlnZ2VyIHBhcmFtZXRlcnNcclxuICAgICAgICBsZXQgdHJpZ2dlclBhcmFtZXRlcnMgPSBuZXcgQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+KCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb21wb25lbnRQYXJhbWV0ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8uaXNUcmlnZ2VyUGFyYW1ldGVyKGNvbXBvbmVudFBhcmFtZXRlcnNbaV0pKSB7XHJcbiAgICAgICAgICAgICAgICB0cmlnZ2VyUGFyYW1ldGVycy5wdXNoKGNvbXBvbmVudFBhcmFtZXRlcnNbaV0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgdmFsdWVzIHRvIHRoZSByZWFsIHZhbHVlcyBmcm9tIEN1cnJlbnRUcmNDb25maWcgUHJvcGVydHkgKEJVR0ZJWCBmb3IgbWlzc2luZyBTdGFydFRyaWdnZXJzIGF0IHN0YXJ0dXApXHJcbiAgICAgICAgbGV0IGN1cnJlbnRUcmNDb25maWdQcm9wZXJ0aWVzID0gY29tcG9uZW50UGFyYW1ldGVycy5maWx0ZXIoKGVsZW1lbnQpID0+IHsgcmV0dXJuIGVsZW1lbnQuYnJvd3NlTmFtZSA9PSBcIkN1cnJlbnRUcmNDb25maWdcIiB9KTtcclxuICAgICAgICBpZiAoY3VycmVudFRyY0NvbmZpZ1Byb3BlcnRpZXMubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRUcmNDb25maWdQcm9wZXJ0aWVzWzBdLnZhbHVlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUcmlnZ2VyUGFyYW1ldGVycyh0cmlnZ2VyUGFyYW1ldGVycywgY3VycmVudFRyY0NvbmZpZ1Byb3BlcnRpZXNbMF0udmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cmlnZ2VyUGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHZhbHVlcyBvZiB0aGUgdHJpZ2dlciBwYXJhbWV0ZXJzIHdpdGggdGhlIHZhbHVlcyBmcm9tIGEganNvbiBzdHJpbmcgKGN1cnJlbnRUcmFjZUNvbmZpZ0pzb25TdHJpbmcpIFxyXG4gICAgICogQlVHRklYIGZvciBtaXNzaW5nIFN0YXJ0VHJpZ2dlcnMgYXQgc3RhcnR1cFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IHRyaWdnZXJQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY3VycmVudFRyYWNlQ29uZmlnSnNvblN0cmluZ1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mb1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyB1cGRhdGVUcmlnZ2VyUGFyYW1ldGVycyh0cmlnZ2VyUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSwgY3VycmVudFRyYWNlQ29uZmlnSnNvblN0cmluZzogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRUcmFjZUNvbmZpZ0pzb25TdHJpbmcgIT0gXCJcIikge1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFRyYWNlQ29uZmlnID0gSlNPTi5wYXJzZShjdXJyZW50VHJhY2VDb25maWdKc29uU3RyaW5nKTtcclxuICAgICAgICAgICAgLy8gVXBkYXRlIGFsbCBzdXBwb3J0ZWQgdHJpZ2dlcnNcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2luZ2xlVHJpZ2dlcih0cmlnZ2VyUGFyYW1ldGVycywgaSwgY3VycmVudFRyYWNlQ29uZmlnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHZhbHVlcyBvZiBhIHRyaWdnZXIgd2l0aCB0aGUgZ2l2ZW4gaW5kZXggd2l0aCB0aGUgdmFsdWVzIGZyb20gYSBqc29uIHN0cmluZyAoY3VycmVudFRyYWNlQ29uZmlnSnNvblN0cmluZykgXHJcbiAgICAgKiBCVUdGSVggZm9yIG1pc3NpbmcgU3RhcnRUcmlnZ2VycyBhdCBzdGFydHVwXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gdHJpZ2dlclBhcmFtZXRlcnNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0cmlnZ2VySW5kZXhcclxuICAgICAqIEBwYXJhbSB7Kn0gY3VycmVudFRyYWNlQ29uZmlnXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHVwZGF0ZVNpbmdsZVRyaWdnZXIodHJpZ2dlclBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10sIHRyaWdnZXJJbmRleDogbnVtYmVyLCBjdXJyZW50VHJhY2VDb25maWcpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgdHJpZ2dlcklEID0gKHRyaWdnZXJJbmRleCArIDEpO1xyXG4gICAgICAgICAgICBsZXQgc3RhcnRUcmlnZ2VyUHJlZml4QnJvd3NlTmFtZSA9IFwiU3RhcnRUcmlnZ2VyXCIgKyB0cmlnZ2VySUQgKyBcIl9cIjtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRUcmlnZ2VyQ2ZnID0gY3VycmVudFRyYWNlQ29uZmlnLlRyaWdnZXJzLmZpbHRlcigoZWxlbWVudCkgPT4geyByZXR1cm4gZWxlbWVudC5JRCA9PSB0cmlnZ2VySUQgfSlbMF07XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50VHJpZ2dlckNmZyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVPZlByb3BlcnR5KHRyaWdnZXJQYXJhbWV0ZXJzLCBzdGFydFRyaWdnZXJQcmVmaXhCcm93c2VOYW1lICsgXCJDb25kaXRpb25cIiwgY3VycmVudFRyaWdnZXJDZmcuRXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZU9mUHJvcGVydHkodHJpZ2dlclBhcmFtZXRlcnMsIHN0YXJ0VHJpZ2dlclByZWZpeEJyb3dzZU5hbWUgKyBcIkRhdGFQb2ludFwiLCBjdXJyZW50VHJpZ2dlckNmZy5EYXRhUG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZU9mUHJvcGVydHkodHJpZ2dlclBhcmFtZXRlcnMsIHN0YXJ0VHJpZ2dlclByZWZpeEJyb3dzZU5hbWUgKyBcIlRocmVzaG9sZFwiLCBjdXJyZW50VHJpZ2dlckNmZy5UaHJlc2hvbGQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZU9mUHJvcGVydHkodHJpZ2dlclBhcmFtZXRlcnMsIHN0YXJ0VHJpZ2dlclByZWZpeEJyb3dzZU5hbWUgKyBcIldpbmRvd1wiLCBjdXJyZW50VHJpZ2dlckNmZy5XaW5kb3cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gU2V0IFRyaWdnZXIgdG8gZGVmYXVsdCBpZiBub3QgYXZhaWxhYmxlIGluIGN1cnJlbnQgdHJhY2UgY29uZmlnXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlT2ZQcm9wZXJ0eSh0cmlnZ2VyUGFyYW1ldGVycywgc3RhcnRUcmlnZ2VyUHJlZml4QnJvd3NlTmFtZSArIFwiQ29uZGl0aW9uXCIsIFwiMjBcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlT2ZQcm9wZXJ0eSh0cmlnZ2VyUGFyYW1ldGVycywgc3RhcnRUcmlnZ2VyUHJlZml4QnJvd3NlTmFtZSArIFwiRGF0YVBvaW50XCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZU9mUHJvcGVydHkodHJpZ2dlclBhcmFtZXRlcnMsIHN0YXJ0VHJpZ2dlclByZWZpeEJyb3dzZU5hbWUgKyBcIlRocmVzaG9sZFwiLCBcIjBcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlT2ZQcm9wZXJ0eSh0cmlnZ2VyUGFyYW1ldGVycywgc3RhcnRUcmlnZ2VyUHJlZml4QnJvd3NlTmFtZSArIFwiV2luZG93XCIsIFwiMFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlVwZGF0aW5nIG9mIHNvbWUgdHJhY2UgY29uZmlndXJhdGlvbiB0cmlnZ2VyIGluZm9ybWF0aW9ucyBub3QgcG9zc2libGUhXCIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHNldFZhbHVlT2ZQcm9wZXJ0eShwcm9wZXJ0aWVzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdLCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgdmFsdWUpIHtcclxuICAgICAgICBsZXQgcHJvcGVydHkgPSBwcm9wZXJ0aWVzLmZpbHRlcigoZWxlbWVudCkgPT4geyByZXR1cm4gZWxlbWVudC5icm93c2VOYW1lID09IHByb3BlcnR5TmFtZSB9KVswXTtcclxuICAgICAgICBpZiAocHJvcGVydHkgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHByb3BlcnR5LnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGlzVHJpZ2dlclBhcmFtZXRlcihwYXJhbWV0ZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgLy8gVHJpZ2dlciBwYXJhbWV0ZXJzIGJlZ2luIHdpdGggXCJTdGFydFRyaWdnZXJcIiBpbiB0aGUgcHJvcGVydGllcyBuYW1lXHJcbiAgICAgICAgbGV0IHByZWZpeCA9IFwiU3RhcnRUcmlnZ2VyXCI7XHJcbiAgICAgICAgaWYgKHBhcmFtZXRlci5icm93c2VOYW1lLnN1YnN0cigwLCBwcmVmaXgubGVuZ3RoKSA9PSBwcmVmaXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHJpZXZlcyB0aGUgdHJhY2UgY29uZmlndXJhdGlvbiBkYXRhcG9pbnRzIGZyb20gdGhlIHBhcmFtZXRlciBzZXRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGNvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mb1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmV0cmlldmVUcmFjZUNvbmZpZ3VyYXRpb25EYXRhcG9pbnRzKGNvbXBvbmVudFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdIHtcclxuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgdHJhY2UgY29uZmlndXJhdGlvbiBkYXRhcG9pbnRzXHJcbiAgICAgICAgbGV0IGRhdGFwb2ludHMgPSBuZXcgQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+KCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb21wb25lbnRQYXJhbWV0ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8uaXNEYXRhUG9pbnQoY29tcG9uZW50UGFyYW1ldGVyc1tpXSkpIHtcclxuICAgICAgICAgICAgICAgIGRhdGFwb2ludHMucHVzaChjb21wb25lbnRQYXJhbWV0ZXJzW2ldKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdGhlIHZhbHVlcyB0byB0aGUgcmVhbCB2YWx1ZXMgZnJvbSBDdXJyZW50VHJjQ29uZmlnIFByb3BlcnR5IChCVUdGSVggZm9yIG1pc3NpbmcgU3RhcnRUcmlnZ2VycyBhdCBzdGFydHVwKVxyXG4gICAgICAgIGxldCBjdXJyZW50VHJjQ29uZmlnUHJvcGVydGllcyA9IGNvbXBvbmVudFBhcmFtZXRlcnMuZmlsdGVyKChlbGVtZW50KSA9PiB7IHJldHVybiBlbGVtZW50LmJyb3dzZU5hbWUgPT0gXCJDdXJyZW50VHJjQ29uZmlnXCIgfSk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRUcmNDb25maWdQcm9wZXJ0aWVzLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50VHJjQ29uZmlnUHJvcGVydGllc1swXS52YWx1ZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRGF0YVBvaW50UGFyYW1ldGVycyhkYXRhcG9pbnRzLCBjdXJyZW50VHJjQ29uZmlnUHJvcGVydGllc1swXS52YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRhdGFwb2ludHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSB2YWx1ZXMgb2YgdGhlIGRhdGFwb2ludCBwYXJhbWV0ZXJzIHdpdGggdGhlIHZhbHVlcyBmcm9tIGEganNvbiBzdHJpbmcgKGN1cnJlbnRUcmFjZUNvbmZpZ0pzb25TdHJpbmcpIFxyXG4gICAgICogQlVHRklYIGZvciBtaXNzaW5nIFN0YXJ0VHJpZ2dlcnMgYXQgc3RhcnR1cFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGRhdGFQb2ludFBhcmFtZXRlcnNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjdXJyZW50VHJhY2VDb25maWdKc29uU3RyaW5nXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHVwZGF0ZURhdGFQb2ludFBhcmFtZXRlcnMoZGF0YVBvaW50UGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSwgY3VycmVudFRyYWNlQ29uZmlnSnNvblN0cmluZzogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRUcmFjZUNvbmZpZ0pzb25TdHJpbmcgIT0gXCJcIikge1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFRyYWNlQ29uZmlnID0gSlNPTi5wYXJzZShjdXJyZW50VHJhY2VDb25maWdKc29uU3RyaW5nKTtcclxuICAgICAgICAgICAgLy8gVXBkYXRlIGFsbCBkYXRhcG9pbnRzXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFRyYWNlQ29uZmlnLkRhdGFQb2ludHMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGRhdGFQb2ludFBhcmFtZXRlcnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhUG9pbnRJRCA9IChpbmRleCArIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudERhdGFQb2ludCA9IGN1cnJlbnRUcmFjZUNvbmZpZy5EYXRhUG9pbnRzLmZpbHRlcigoZWxlbWVudCkgPT4geyByZXR1cm4gZWxlbWVudC5JRCA9PSBkYXRhUG9pbnRJRCB9KVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnREYXRhUG9pbnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhUG9pbnRQYXJhbWV0ZXJzW2luZGV4XS52YWx1ZSA9IGN1cnJlbnREYXRhUG9pbnQuTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFQb2ludFBhcmFtZXRlcnNbaW5kZXhdLnZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVcGRhdGluZyBvZiBzb21lIHRyYWNlIGNvbmZpZ3VyYXRpb24gZGF0YXBvaW50IGluZm9ybWF0aW9ucyBub3QgcG9zc2libGUhXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNEYXRhUG9pbnQocGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8vIERhdGFwb2ludCBwYXJhbWV0ZXJzIGJlZ2luIHdpdGggXCJEYXRhUG9pbnRcIiBpbiB0aGUgcHJvcGVydGllcyBuYW1lXHJcbiAgICAgICAgbGV0IHByZWZpeCA9IFwiRGF0YVBvaW50XCI7XHJcbiAgICAgICAgaWYgKHBhcmFtZXRlci5icm93c2VOYW1lLnN1YnN0cigwLCBwcmVmaXgubGVuZ3RoKSA9PSBwcmVmaXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHJpZXZlcyB0aGUgdHJhY2UgY29udHJvbCBwYXJhbWV0ZXJzIGZyb20gdGhlIHBhcmFtZXRlciBzZXRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGNvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mb1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmV0cmlldmVUcmFjZUNvbnRyb2xQYXJhbWV0ZXJzKGNvbXBvbmVudFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdIHtcclxuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgdHJhY2UgY29uZmlndXJhdGlvbiBkYXRhcG9pbnRzXHJcbiAgICAgICAgbGV0IGRhdGFwb2ludHMgPSBuZXcgQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+KCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb21wb25lbnRQYXJhbWV0ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8uaXNUcmFjZUNvbnRyb2xQYXJhbWV0ZXIoY29tcG9uZW50UGFyYW1ldGVyc1tpXSkpIHtcclxuICAgICAgICAgICAgICAgIGRhdGFwb2ludHMucHVzaChjb21wb25lbnRQYXJhbWV0ZXJzW2ldKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkYXRhcG9pbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGlzVHJhY2VDb250cm9sUGFyYW1ldGVyKHBhcmFtZXRlcjogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAocGFyYW1ldGVyLmJyb3dzZU5hbWUgPT0gXCJUcmFjZVN0YXR1c1wiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIHJldHJpZXZlcyB0aGUgY29uZmlndXJhdGlvbiBwYXJhbWV0ZXJzIGZyb20gdGhlIHBhcmFtZXRlciBzZXRcclxuICAgICpcclxuICAgICogQHN0YXRpY1xyXG4gICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGNvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICogQHJldHVybnMge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119XHJcbiAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm9cclxuICAgICovXHJcbiAgICBzdGF0aWMgcmV0cmlldmVDb25maWd1cmF0aW9uUGFyYW1ldGVycyhjb21wb25lbnRQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKTogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSB7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBjb25maWd1cmF0aW9uIG1ldGEgaW5mb3NcclxuICAgICAgICBsZXQgY29uZmlndXJhdGlvbk1ldGFJbmZvO1xyXG4gICAgICAgIGlmICgoY29tcG9uZW50UGFyYW1ldGVyc1swXSAhPSB1bmRlZmluZWQpICYmICg8YW55Pig8TWFwcENvY2twaXRDb21wb25lbnQ+Y29tcG9uZW50UGFyYW1ldGVyc1swXS5jb21wb25lbnQpLm1ldGFEYXRhKS5NZXRhQ29uZmlnQ29uZmlnUHJvcHMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25NZXRhSW5mbyA9ICg8YW55Pig8TWFwcENvY2twaXRDb21wb25lbnQ+Y29tcG9uZW50UGFyYW1ldGVyc1swXS5jb21wb25lbnQpLm1ldGFEYXRhKS5NZXRhQ29uZmlnQ29uZmlnUHJvcHMuQ29uZmlndXJhdGlvblN0cnVjdHVyZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHJldHJpZXZlIHRoZSBjb25maWd1cmF0aW9uIGRlZmluaXRpb25zXHJcbiAgICAgICAgbGV0IGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzID0gTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLnJldHJpZXZlUGFyYW1ldGVyc0Zyb21NZXRhSW5mbyhbXCJQYXJhbWV0ZXJcIiwgXCJHcm91cFwiXSwgY29uZmlndXJhdGlvbk1ldGFJbmZvLCBjb21wb25lbnRQYXJhbWV0ZXJzKTtcclxuICAgICAgICByZXR1cm4gY29uZmlndXJhdGlvblBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXRyaXZlcyBwYXJhbWV0ZXJzIGRlY2xhcmVkIGluIHRoZSBtZXRhIGluZm9cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gcmVxdWVzdGVJdGVtVHlwZXNcclxuICAgICAqIEBwYXJhbSB7Kn0gcGFyYW1ldGVyTWV0YUluZm9cclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gY29tcG9uZW50UGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmV0cmlldmVQYXJhbWV0ZXJzRnJvbU1ldGFJbmZvKHJlcXVlc3RlSXRlbVR5cGVzOiBzdHJpbmdbXSwgcGFyYW1ldGVyTWV0YUluZm86IGFueSwgY29tcG9uZW50UGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSkge1xyXG5cclxuICAgICAgICAvLyBnZXQgcmVxdWVzdGVkIG1ldGEgaXRlbXNcclxuICAgICAgICBsZXQgbWV0YVBhcmFtZXRlckl0ZW1zID0gTWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YS5maWx0ZXJNZXRhSXRlbXMocGFyYW1ldGVyTWV0YUluZm8sIHJlcXVlc3RlSXRlbVR5cGVzKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIGRpY3Rpb25hcnkgb2YgYXZhaWxhYmxlIHBhcmFtZXRlcnNcclxuICAgICAgICBsZXQgcGFyYW1ldGVyU2V0ID0ge307XHJcbiAgICAgICAgY29tcG9uZW50UGFyYW1ldGVycy5mb3JFYWNoKChwYXJhbWV0ZXIpID0+IHsgcGFyYW1ldGVyU2V0W3BhcmFtZXRlci5icm93c2VOYW1lXSA9IHBhcmFtZXRlcjsgfSk7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBkaWN0aW9uYXJ5IG9mIG1ldGEgcGFyYW1ldGVyc1xyXG4gICAgICAgIGxldCBtZXRhUGFyYW1ldGVycyA9IHt9O1xyXG4gICAgICAgIG1ldGFQYXJhbWV0ZXJJdGVtcy5mb3JFYWNoKChtZXRhUGFyYW1ldGVyKSA9PiB7IG1ldGFQYXJhbWV0ZXJzW21ldGFQYXJhbWV0ZXIuUmVmXSA9IG1ldGFQYXJhbWV0ZXI7IH0pO1xyXG5cclxuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgcGFyYW1ldGVycyB3aXRoIG1hdGNoaW5nIG5hbWUgaW4gdGhlIG1ldGEgaW5mb1xyXG4gICAgICAgIGxldCBtYXRjaGluZ1BhcmFtZXRlcnMgPSBjb21wb25lbnRQYXJhbWV0ZXJzLmZpbHRlcigoY29tcG9uZW50UGFyYW1ldGVyKSA9PiB7IHJldHVybiBtZXRhUGFyYW1ldGVyc1tjb21wb25lbnRQYXJhbWV0ZXIuYnJvd3NlTmFtZV0gIT09IHVuZGVmaW5lZDsgfSk7XHJcblxyXG4gICAgICAgIC8vIHJlYWQgYW5kIGFzc2lnbiB1bml0c1xyXG4gICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby51cGRhdGVQYXJhbWV0ZXIobWF0Y2hpbmdQYXJhbWV0ZXJzLCBtZXRhUGFyYW1ldGVycyk7XHJcblxyXG4gICAgICAgIC8vIG5vdGlmeSBpbnZhbGlkIG9yIHVua25vd24gcmVmZXJlbmNlc1xyXG4gICAgICAgIGxldCB1bmtub3duUGFyYW1ldGVyUmVmcyA9IG1ldGFQYXJhbWV0ZXJJdGVtcy5maWx0ZXIoKG1ldGFQYXJhbWV0ZXIpID0+IHsgcmV0dXJuIG1ldGFQYXJhbWV0ZXIuUmVmICE9PSB1bmRlZmluZWQgJiYgcGFyYW1ldGVyU2V0W21ldGFQYXJhbWV0ZXIuUmVmXSA9PT0gdW5kZWZpbmVkOyB9KTtcclxuICAgICAgICBpZiAodW5rbm93blBhcmFtZXRlclJlZnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLnJldHJpZXZlUGFyYW1ldGVyc0Zyb21NZXRhSW5mbyA6IG1ldGEgaW5mbyByZWZlcmVuY2VzIHVua25vd24gcGFyYW1ldGVycyAlbyAlb1wiLCB1bmtub3duUGFyYW1ldGVyUmVmcywgcGFyYW1ldGVyU2V0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1hdGNoaW5nUGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcyB3YXRjaGFibGUgc3RhdGVzIGRlY2xhcmVkIGluIHRoZSBtZXRhSW5mb1xyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHJlcXVlc3RlSXRlbVR5cGVzXHJcbiAgICAgKiBAcGFyYW0geyp9IHBhcmFtZXRlck1ldGFJbmZvXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGNvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHtNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyW119XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZXRyaWV2ZVdhdGNoYWJsZVN0YXRlc0Zyb21NZXRhSW5mbyhyZXF1ZXN0ZUl0ZW1UeXBlczogc3RyaW5nW10sIHBhcmFtZXRlck1ldGFJbmZvOiBhbnksIGNvbXBvbmVudFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOiBNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyW10ge1xyXG4gICAgICAgIGxldCBzdGF0ZVBhcmFtZXRlcnMgPSBuZXcgQXJyYXk8TWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlcj4oKTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHJlcXVlc3RlZCBtZXRhIGl0ZW1zXHJcbiAgICAgICAgbGV0IG1ldGFQYXJhbWV0ZXJJdGVtcyA9IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0YURhdGEuZmlsdGVyTWV0YUl0ZW1zKHBhcmFtZXRlck1ldGFJbmZvLCByZXF1ZXN0ZUl0ZW1UeXBlcyk7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBkaWN0aW9uYXJ5IG9mIGF2YWlsYWJsZSBwYXJhbWV0ZXJzXHJcbiAgICAgICAgbGV0IHBhcmFtZXRlclNldCA9IHt9O1xyXG4gICAgICAgIGNvbXBvbmVudFBhcmFtZXRlcnMuZm9yRWFjaCgocGFyYW1ldGVyKSA9PiB7IHBhcmFtZXRlclNldFtwYXJhbWV0ZXIuYnJvd3NlTmFtZV0gPSBwYXJhbWV0ZXI7IH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGNyZWF0ZSB3YXRjaGFibGUgc3RhdGVzXHJcbiAgICAgICAgbWV0YVBhcmFtZXRlckl0ZW1zLmZvckVhY2goKG1ldGFQYXJhbWV0ZXIpID0+IHtcclxuICAgICAgICAgICAgc3RhdGVQYXJhbWV0ZXJzLnB1c2gobmV3IE1hcHBDb2NrcGl0U3RhdGVQYXJhbWV0ZXIobWV0YVBhcmFtZXRlci5SZWYsIG1ldGFQYXJhbWV0ZXIuSWNvbkV4cHJlc3Npb24sIG1ldGFQYXJhbWV0ZXIuV2F0Y2hhYmxlVmFyaWFibGVzTWFwcGluZyAsbWV0YVBhcmFtZXRlci5JY29uKSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHN0YXRlUGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcmVhZFBhcmFtZXRlcnMocGFyYW1ldGVyTWV0YUluZm86IGFueSwgcGFyYW1ldGVyOiBBcnJheTxzdHJpbmc+KTogb2JqZWN0IHtcclxuICAgICAgICAvLyBnZXQgcmVxdWVzdGVkIG1ldGEgaXRlbXNcclxuICAgICAgICBsZXQgbWV0YVBhcmFtZXRlckl0ZW1zID0gTWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YS5maWx0ZXJNZXRhSXRlbXMocGFyYW1ldGVyTWV0YUluZm8sIHBhcmFtZXRlcik7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBkaWN0aW9uYXJ5IG9mIG1ldGEgcGFyYW1ldGVyc1xyXG4gICAgICAgIGxldCBtZXRhUGFyYW1ldGVycyA9IHt9O1xyXG4gICAgICAgIG1ldGFQYXJhbWV0ZXJJdGVtcy5mb3JFYWNoKChtZXRhUGFyYW1ldGVyKSA9PiB7IG1ldGFQYXJhbWV0ZXJzW21ldGFQYXJhbWV0ZXIuUmVmXSA9IG1ldGFQYXJhbWV0ZXI7IH0pO1xyXG4gICAgICAgIHJldHVybiBtZXRhUGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcmVhZE1lc3NhZ2VQYXJhbWV0ZXJzKHBhcmFtZXRlck1ldGFJbmZvOiBhbnkpOiBvYmplY3Qge1xyXG5cclxuICAgICAgICBsZXQgbWV0YVBhcmFtZXRlcnMgPSB7fTtcclxuICAgICAgICBtZXRhUGFyYW1ldGVyc1tcImludEFycmF5U2V2ZXJpdHlcIl0gPSB7IFJlZjogXCJpbnRBcnJheVNldmVyaXR5XCIgfTtcclxuICAgICAgICBtZXRhUGFyYW1ldGVyc1tcInN0ckFycmF5RGVzY3JpcHRpb25cIl0gPSB7IFJlZjogXCJzdHJBcnJheURlc2NyaXB0aW9uXCIgfTtcclxuICAgICAgICBtZXRhUGFyYW1ldGVyc1tcInN0ckFycmF5RXZlbnRJRFwiXSA9IHsgUmVmOiBcInN0ckFycmF5RXZlbnRJRFwiIH07XHJcbiAgICAgICAgbWV0YVBhcmFtZXRlcnNbXCJzdHJBcnJheVRpbWVcIl0gPSB7IFJlZjogXCJzdHJBcnJheVRpbWVcIiB9O1xyXG4gICAgICAgIHJldHVybiBtZXRhUGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlYWRzIGVuZ2luZWVyaW5nIHVuaXRzIGZyb20gdGhlIG1ldGEgaW5mbyBhbmQgYXNzaWducyBpdCB0byB0aGUgcGFyYW1ldGVyc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGNvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICAqIEBwYXJhbSB7e319IG1ldGFQYXJhbWV0ZXJzXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyB1cGRhdGVQYXJhbWV0ZXIoY29tcG9uZW50UGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSwgbWV0YVBhcmFtZXRlcnM6IHt9KSB7XHJcbiAgICAgICAgY29tcG9uZW50UGFyYW1ldGVycy5mb3JFYWNoKChjb21wb25lbnRQYXJhbWV0ZXIpID0+IHtcclxuICAgICAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLnVwZGF0ZVBhcmFtZXRlckVuZ2luZWVyaW5nVW5pdChtZXRhUGFyYW1ldGVycywgY29tcG9uZW50UGFyYW1ldGVyKTtcclxuICAgICAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLnVwZGF0ZVBhcmFtZXRlckRpc3BsYXlOYW1lKG1ldGFQYXJhbWV0ZXJzLCBjb21wb25lbnRQYXJhbWV0ZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgcGFyYW1ldGVycyBkaXNwbGF5IG5hbWVcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3t9fSBtZXRhUGFyYW1ldGVyc1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcn0gY29tcG9uZW50UGFyYW1ldGVyXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHVwZGF0ZVBhcmFtZXRlckRpc3BsYXlOYW1lKG1ldGFQYXJhbWV0ZXJzOiB7fSwgY29tcG9uZW50UGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcik6IGFueSB7XHJcbiAgICAgICAgaWYgKG1ldGFQYXJhbWV0ZXJzW2NvbXBvbmVudFBhcmFtZXRlci5icm93c2VOYW1lXS5EaXNwbGF5TmFtZSkge1xyXG4gICAgICAgICAgICBjb21wb25lbnRQYXJhbWV0ZXIuZGlzcGxheU5hbWUgPSBtZXRhUGFyYW1ldGVyc1tjb21wb25lbnRQYXJhbWV0ZXIuYnJvd3NlTmFtZV0uRGlzcGxheU5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgcGFyYW1ldGVycyBlbmdpbmVlcmluZyB1bml0c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3t9fSBtZXRhUGFyYW1ldGVyc1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcn0gY29tcG9uZW50UGFyYW1ldGVyXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHVwZGF0ZVBhcmFtZXRlckVuZ2luZWVyaW5nVW5pdChtZXRhUGFyYW1ldGVyczoge30sIGNvbXBvbmVudFBhcmFtZXRlcjogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIpIHtcclxuICAgICAgICBpZiAobWV0YVBhcmFtZXRlcnNbY29tcG9uZW50UGFyYW1ldGVyLmJyb3dzZU5hbWVdLkVVKSB7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudFBhcmFtZXRlci5lbmdpbmVlcmluZ1VuaXQgPSBtZXRhUGFyYW1ldGVyc1tjb21wb25lbnRQYXJhbWV0ZXIuYnJvd3NlTmFtZV0uRVU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVhZHMgZW51bSB2YWx1ZXMgaWYgYXZhaWxhYmxlIGFuZCBhc3NpZ25zIGl0IHRvIHRoZSBwYXJhbWV0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyfSBwYXJhbWV0ZXJcclxuICAgICAqIEByZXR1cm5zIHsqfSB0cnVlIGlmIHRoZSBwYXJhbWV0ZXIgdXNlcyBhbiBlbnVtIGZvciBpdHMgdmFsdWVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJlYWRQYXJhbWV0ZXJFbnVtcyhjb21wb25lbnRQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKSB7XHJcblxyXG4gICAgICAgIC8vIGdldCBhdmFpbGFibGUgZW51bSBwYXJhbWV0ZXIgZGVmcyBcclxuICAgICAgICBsZXQgZW51bVBhcmFtZXRlclR5cGVEZWZpbml0aW9ucyA9IE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyLmdldEluc3RhbmNlKCkucmVhZEVudW1QYXJhbWV0ZXJEZWZpbml0aW9ucyhjb21wb25lbnRQYXJhbWV0ZXJzLCAoPE1hcHBDb2NrcGl0Q29tcG9uZW50PmNvbXBvbmVudFBhcmFtZXRlcnNbMF0uY29tcG9uZW50KS5tZXRhRGF0YSk7XHJcbiAgICAgICAgLy8gZmluZCBtYXRjaGluZyBwYXJhbWV0ZXJcclxuICAgICAgICBsZXQgbWF0Y2hpbmdQYXJhbWV0ZXJzID0gY29tcG9uZW50UGFyYW1ldGVycy5maWx0ZXIoKGNvbXBvbmVudFBhcmFtZXRlcikgPT4geyByZXR1cm4gZW51bVBhcmFtZXRlclR5cGVEZWZpbml0aW9uc1tjb21wb25lbnRQYXJhbWV0ZXIuYnJvd3NlTmFtZV0gfSk7XHJcbiAgICAgICAgLy8gc2V0IHRoZSBlbnVtIGRlZmluaXRpb25zIGZvciB0aGUgbWF0Y2hpbmcgcGFyYW1ldGVyc1xyXG4gICAgICAgIG1hdGNoaW5nUGFyYW1ldGVycy5mb3JFYWNoKChtYXRjaGluZ1BhcmFtZXRlcikgPT4ge1xyXG4gICAgICAgICAgICAvLyBzZXQgdGhlIGVudW0gZGVmaW5pdGlvblxyXG4gICAgICAgICAgICBtYXRjaGluZ1BhcmFtZXRlci5lbnVtVHlwZSA9IGVudW1QYXJhbWV0ZXJUeXBlRGVmaW5pdGlvbnNbbWF0Y2hpbmdQYXJhbWV0ZXIuYnJvd3NlTmFtZV07XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvIC0gc2V0IGVudW0gaW5mbyAlbyBmb3IgJW9cIiwgbWF0Y2hpbmdQYXJhbWV0ZXIuZW51bVR5cGUsICg8YW55Pm1hdGNoaW5nUGFyYW1ldGVyLmNvbXBvbmVudCkuYnJvd3NlTmFtZSArIFwiLlwiICsgbWF0Y2hpbmdQYXJhbWV0ZXIuYnJvd3NlTmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBwcm92aWRlcyBkZXNjcmlwdGl2ZSBpbmZvcm1hdGlvbiBmb3IgYSBtZXRob2RcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mb0luZm9cclxuICovXHJcbmNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mbyB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpbml0aWFsaXplcyB0aGUgbWV0aG9kIGlucHV0IHBhcmFtZXRlcnNcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kfSBtZXRob2RcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mb1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgdXBkYXRlTWV0aG9kSW5wdXRQYXJhbWV0ZXJzKG1ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QpOiBhbnkge1xyXG5cclxuICAgICAgICAvLyBza2lwIGlmIHRoZSBtZXRob2QgaGFzIG5vIHBhcmFtZXRlcnMgdG8gaW5pdGlhbGl6ZS5cclxuICAgICAgICBpZiAobWV0aG9kLmlucHV0UGFyYW1ldGVycy5sZW5ndGggPT09IDApIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBtZXRhIGRhdGFcclxuICAgICAgICBsZXQgbWV0aG9kTWV0YUluZm8gPSBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8uZ2V0TWV0aG9kTWV0YUluZm8obWV0aG9kKTtcclxuXHJcbiAgICAgICAgaWYgKG1ldGhvZE1ldGFJbmZvKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBmaW5kIGFuZCBpbml0aWFsaXplIG1ldGhvZCBwYXJhbWV0ZXIgZGVmYXVsdCB2YWx1ZXNcclxuICAgICAgICAgICAgbWV0aG9kLmlucHV0UGFyYW1ldGVycy5mb3JFYWNoKChtZXRob2RJbnB1dFBhcmFtZXRlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvLnVwZGF0ZU1ldGhvZElucHV0UGFyYW1ldGVyRGVmYXVsdHMobWV0aG9kLCBtZXRob2RJbnB1dFBhcmFtZXRlciwgbWV0aG9kTWV0YUluZm8pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlcyByZXNwZWN0aXZlbHkgaW5pdGlhbGl6ZXMgdGhlIG1ldGhvZCBpbnB1dCBwYXJhbWV0ZXJzIHdpdGggZGVmYXVsdHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZH0gbWV0aG9kXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyfSBtZXRob2RJbnB1dFBhcmFtZXRlclxyXG4gICAgICogQHBhcmFtIHsqfSBtZXRob2RNZXRhSW5mb1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mb1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyB1cGRhdGVNZXRob2RJbnB1dFBhcmFtZXRlckRlZmF1bHRzKG1ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QsIG1ldGhvZElucHV0UGFyYW1ldGVyOiBNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlciwgbWV0aG9kTWV0YUluZm86IGFueSwpIHtcclxuICAgICAgICBsZXQgbWV0aG9kUGFyYW1ldGVyTWV0YUluZm8gPSBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8uZ2V0TWV0aG9kUGFyYW1ldGVyTWV0YUluZm8obWV0aG9kTWV0YUluZm8sIG1ldGhvZElucHV0UGFyYW1ldGVyKTtcclxuICAgICAgICBpZiAobWV0aG9kUGFyYW1ldGVyTWV0YUluZm8pIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGFzc2lnbiBkZWZhdWx0IHZhbHVlIGlmIGRlZmluZWQgLi4uXHJcbiAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mby51cGRhdGVNZXRob2RJbnB1dFBhcmFtZXRlckRlZmF1bHRWYWx1ZShtZXRob2RQYXJhbWV0ZXJNZXRhSW5mbywgbWV0aG9kSW5wdXRQYXJhbWV0ZXIsIG1ldGhvZCk7XHJcblxyXG4gICAgICAgICAgICAvLyBhc3NpZ24gZW5naW5lZXJpbmcgdW5pdCBpZiBkZWZpbmVkLlxyXG4gICAgICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8udXBkYXRlTWV0aG9kUGFyYW1ldGVyRW5naW5lZXJpbmdVbml0KG1ldGhvZFBhcmFtZXRlck1ldGFJbmZvLCBtZXRob2RJbnB1dFBhcmFtZXRlcik7XHJcblxyXG4gICAgICAgICAgICAvLyBhc3NpZ24gZGlzcGxheSBuYW1lXHJcbiAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mby51cGRhdGVNZXRob2RQYXJhbWV0ZXJEaXNwbGF5TmFtZShtZXRob2RQYXJhbWV0ZXJNZXRhSW5mbywgbWV0aG9kSW5wdXRQYXJhbWV0ZXIpO1xyXG5cclxuICAgICAgICAgICAgLy9hc3NpZ24gZmlsdGVyIGlmIGRlZmluZWRcclxuICAgICAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvLnVwZGF0ZU1ldGhvZFBhcmFtZXRlckZpbHRlcihtZXRob2RQYXJhbWV0ZXJNZXRhSW5mbywgbWV0aG9kSW5wdXRQYXJhbWV0ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mby5pbml0aWFsaXplSW5wdXRQYXJhbWV0ZXJEZWZhdWx0VmFsdWVzIDogTm8gbWV0YSBpbmZvIGRlZmluZWQgZm9yIGZvciBtZXRob2QgcGFyYW1ldGVyICVvXCIsIG1ldGhvZC5icm93c2VOYW1lICsgXCIuXCIgKyBtZXRob2RJbnB1dFBhcmFtZXRlci5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGUgZmlsdGVyIGluZm9ybWF0aW9uIHRvIG1ldGhvZCBwYXJhbWV0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsqfSBtZXRob2RQYXJhbWV0ZXJNZXRhSW5mb1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcn0gbWV0aG9kSW5wdXRQYXJhbWV0ZXJcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mb1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyB1cGRhdGVNZXRob2RQYXJhbWV0ZXJGaWx0ZXIobWV0aG9kUGFyYW1ldGVyTWV0YUluZm86IGFueSwgbWV0aG9kSW5wdXRQYXJhbWV0ZXI6IE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyKTogYW55IHtcclxuICAgICAgICBsZXQgcGFyYW1ldGVySGFzRmlsdGVyID0gbWV0aG9kUGFyYW1ldGVyTWV0YUluZm8uUGFyYW1ldGVyLmhhc093blByb3BlcnR5KFwiRmlsdGVyXCIpO1xyXG4gICAgICAgIGlmIChwYXJhbWV0ZXJIYXNGaWx0ZXIpIHtcclxuICAgICAgICAgICAgbWV0aG9kSW5wdXRQYXJhbWV0ZXIuZmlsdGVyID0gbmV3IFBhcmFtZXRlckZpbHRlcihtZXRob2RQYXJhbWV0ZXJNZXRhSW5mby5QYXJhbWV0ZXIuRmlsdGVyLlBhcmFtZXRlclJlZiwgbWV0aG9kUGFyYW1ldGVyTWV0YUluZm8uUGFyYW1ldGVyLkZpbHRlci5QYXJhbWV0ZXJWYWx1ZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGRpc3BsYXkgZnJvbSBtZXRhIGluZm9cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0geyp9IG1ldGhvZFBhcmFtZXRlck1ldGFJbmZvXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyfSBtZXRob2RJbnB1dFBhcmFtZXRlclxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyB1cGRhdGVNZXRob2RQYXJhbWV0ZXJEaXNwbGF5TmFtZShtZXRob2RQYXJhbWV0ZXJNZXRhSW5mbzogYW55LCBtZXRob2RJbnB1dFBhcmFtZXRlcjogTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXIpOiBhbnkge1xyXG4gICAgICAgIGlmIChtZXRob2RQYXJhbWV0ZXJNZXRhSW5mby5QYXJhbWV0ZXIuRGlzcGxheU5hbWUpIHtcclxuICAgICAgICAgICAgbWV0aG9kSW5wdXRQYXJhbWV0ZXIuZGlzcGxheU5hbWUgPSBtZXRob2RQYXJhbWV0ZXJNZXRhSW5mby5QYXJhbWV0ZXIuRGlzcGxheU5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgZW5naW5lZXJpbmcgdW5pdFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0geyp9IG1ldGhvZFBhcmFtZXRlck1ldGFJbmZvXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyfSBtZXRob2RJbnB1dFBhcmFtZXRlclxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mb1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyB1cGRhdGVNZXRob2RQYXJhbWV0ZXJFbmdpbmVlcmluZ1VuaXQobWV0aG9kUGFyYW1ldGVyTWV0YUluZm86IGFueSwgbWV0aG9kSW5wdXRQYXJhbWV0ZXI6IE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyKSB7XHJcbiAgICAgICAgaWYgKG1ldGhvZFBhcmFtZXRlck1ldGFJbmZvLlBhcmFtZXRlci5FVSkge1xyXG4gICAgICAgICAgICBtZXRob2RJbnB1dFBhcmFtZXRlci5lbmdpbmVlcmluZ1VuaXQgPSBtZXRob2RQYXJhbWV0ZXJNZXRhSW5mby5QYXJhbWV0ZXIuRVU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgZGVmYXVsdCB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0geyp9IG1ldGhvZFBhcmFtZXRlck1ldGFJbmZvXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyfSBtZXRob2RJbnB1dFBhcmFtZXRlclxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZH0gbWV0aG9kXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHVwZGF0ZU1ldGhvZElucHV0UGFyYW1ldGVyRGVmYXVsdFZhbHVlKG1ldGhvZFBhcmFtZXRlck1ldGFJbmZvOiBhbnksIG1ldGhvZElucHV0UGFyYW1ldGVyOiBNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlciwgbWV0aG9kOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCkge1xyXG4gICAgICAgIGxldCBwYXJhbWV0ZXJIYXNEZWZhdWx0VmFsdWUgPSBtZXRob2RQYXJhbWV0ZXJNZXRhSW5mby5QYXJhbWV0ZXIuaGFzT3duUHJvcGVydHkoXCJEZWZhdWx0VmFsdWVcIik7XHJcbiAgICAgICAgaWYgKHBhcmFtZXRlckhhc0RlZmF1bHRWYWx1ZSkge1xyXG4gICAgICAgICAgICBtZXRob2RJbnB1dFBhcmFtZXRlci52YWx1ZSA9IG1ldGhvZFBhcmFtZXRlck1ldGFJbmZvLlBhcmFtZXRlci5EZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBtZXRob2QgcGFyYW1ldGVycyBtdXN0IGhhdmUgZGVmYXVsdCB2YWx1ZXMgZGVmaW5lZFxyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvLmluaXRpYWxpemVJbnB1dFBhcmFtZXRlckRlZmF1bHRWYWx1ZXMgOiBObyBkZWZhdWx0IHZhbHVlIGRlZmluZWQgZm9yIG1ldGhvZCBwYXJhbWV0ZXIgJW9cIiwgbWV0aG9kLmJyb3dzZU5hbWUgKyBcIi5cIiArIG1ldGhvZElucHV0UGFyYW1ldGVyLm5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIG1ldGEgaW5mbyBmb3IgYSBtZXRob2QgcGFyYW1ldGVyXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0geyp9IG1ldGhvZE1ldGFJbmZvXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyfSBtZXRob2RJbnB1dFBhcmFtZXRlclxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0TWV0aG9kUGFyYW1ldGVyTWV0YUluZm8obWV0aG9kTWV0YUluZm86IGFueSwgbWV0aG9kSW5wdXRQYXJhbWV0ZXI6IE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyKSB7XHJcbiAgICAgICAgbGV0IG1ldGhvZFBhcmFtZXRlck1ldGFJbmZvcyA9IG1ldGhvZE1ldGFJbmZvLlBhcmFtZXRlcnMuZmlsdGVyKChtZXRob2RNZXRhSXRlbVBhcmFtZXRlckl0ZW0pID0+IHsgcmV0dXJuIG1ldGhvZE1ldGFJdGVtUGFyYW1ldGVySXRlbS5QYXJhbWV0ZXIuUmVmID09PSBtZXRob2RJbnB1dFBhcmFtZXRlci5uYW1lOyB9KTtcclxuICAgICAgICBsZXQgbWV0aG9kUGFyYW1ldGVyTWV0YUluZm8gPSBtZXRob2RQYXJhbWV0ZXJNZXRhSW5mb3MubGVuZ3RoID09PSAxID8gbWV0aG9kUGFyYW1ldGVyTWV0YUluZm9zWzBdIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIHJldHVybiBtZXRob2RQYXJhbWV0ZXJNZXRhSW5mbztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIG1ldGEgaW5mbyBmb3IgdGhlIHJlcXVlc3RlZCBtZXRob2RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZH0gbWV0aG9kXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mb1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRNZXRob2RNZXRhSW5mbyhtZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKTogYW55IHtcclxuICAgICAgICBsZXQgbWV0aG9kTWV0YUluZm8gPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIGxldCBjb21wb25lbnRNZXRhRGF0YTogYW55ID0gKDxNYXBwQ29ja3BpdENvbXBvbmVudD5tZXRob2QuY29tcG9uZW50KS5tZXRhRGF0YTtcclxuICAgICAgICBpZiAoY29tcG9uZW50TWV0YURhdGEgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtZXRob2RNZXRhSW5mbztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBtZXRob2QgaW5mbyBmcm9tIG1ldGEgZGF0YVxyXG4gICAgICAgIGxldCBtZXRob2RNZXRhSXRlbXM6IGFueVtdID0gTWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YS5maWx0ZXJNZXRhSXRlbXMoY29tcG9uZW50TWV0YURhdGEuTWV0YUNvbmZpZ0NvbW1hbmRzLkNvbW1hbmRzU3RydWN0dXJlLCBbXCJDb21tYW5kXCJdKTtcclxuICAgICAgICAvLyBnZXQgdGhlIG1ldGEgaW5mbyBmb3IgdGhlIHJlcXVlc3RlZCBtZXRob2RcclxuICAgICAgICBsZXQgbWV0aG9kTWV0YUluZm9zID0gbWV0aG9kTWV0YUl0ZW1zLmZpbHRlcigobWV0aG9kTWV0YUl0ZW0pID0+IHsgcmV0dXJuIG1ldGhvZE1ldGFJdGVtLlJlZiA9PT0gbWV0aG9kLmJyb3dzZU5hbWU7IH0pO1xyXG4gICAgICAgIG1ldGhvZE1ldGFJbmZvID0gbWV0aG9kTWV0YUluZm9zLmxlbmd0aCA9PT0gMSA/IG1ldGhvZE1ldGFJbmZvc1swXSA6IHVuZGVmaW5lZDtcclxuICAgICAgICByZXR1cm4gbWV0aG9kTWV0YUluZm87XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIHRoZSBtZXRob2QgcGFyYW1ldGVycyBjb250YWluZWQgaW4gdGhlIG1ldGEgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0geyp9IG1ldGhvZE1ldGFJdGVtXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyfSBtZXRob2RJbnB1dFBhcmFtZXRlclxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0TWF0Y2hpbmdNZXRob2RQYXJhbWV0ZXJzKG1ldGhvZE1ldGFJdGVtOiBhbnksIG1ldGhvZElucHV0UGFyYW1ldGVyOiBNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcikge1xyXG4gICAgICAgIHJldHVybiBtZXRob2RNZXRhSXRlbS5QYXJhbWV0ZXJzLmZpbHRlcigobWV0aG9kTWV0YUl0ZW1QYXJhbWV0ZXJJdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpc01hdGNoaW5nTWV0aG9kUGFyYW1ldGVyID0gbWV0aG9kTWV0YUl0ZW1QYXJhbWV0ZXJJdGVtLlBhcmFtZXRlci5SZWYgPT09IG1ldGhvZElucHV0UGFyYW1ldGVyLm5hbWVcclxuICAgICAgICAgICAgICAgICYmIG1ldGhvZE1ldGFJdGVtUGFyYW1ldGVySXRlbS5QYXJhbWV0ZXIuRGVmYXVsdFZhbHVlXHJcbiAgICAgICAgICAgICAgICAmJiBtZXRob2RNZXRhSXRlbVBhcmFtZXRlckl0ZW0uUGFyYW1ldGVyLkRlZmF1bHRWYWx1ZSAhPT0gXCJcIjtcclxuICAgICAgICAgICAgcmV0dXJuIGlzTWF0Y2hpbmdNZXRob2RQYXJhbWV0ZXI7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgdGhlIGV4ZWN1dGFibGUgbWV0aG9kcyBmcm9tIHRoZSBjb21wb25lbnQgbWV0aG9kIHNldFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXX0gY29tcG9uZW50TWV0aG9kc1xyXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBkYXRhVG9SZXRyaWV2ZVxyXG4gICAgICogQHJldHVybnMge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW119XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZXRyaWV2ZUV4ZWN1dGFibGVNZXRob2RzKGNvbXBvbmVudE1ldGhvZHM6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10sIGRhdGFUb1JldHJpZXZlOiBBcnJheTxzdHJpbmc+KTogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXSB7XHJcbiAgICAgICAgbGV0IG1ldGFDb25maWcgPSBkYXRhVG9SZXRyaWV2ZVswXTtcclxuICAgICAgICBsZXQgbWV0YVN0cnVjdHVyZSA9IGRhdGFUb1JldHJpZXZlWzFdO1xyXG4gICAgICAgIGxldCBtZXRhTmFtZSA9IGRhdGFUb1JldHJpZXZlWzJdO1xyXG5cclxuICAgICAgICBsZXQgZXhlY3V0YWJsZU1ldGhvZHMgPSBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD4oKTtcclxuICAgICAgICBpZiAoKGNvbXBvbmVudE1ldGhvZHNbMF0gPT0gdW5kZWZpbmVkKSB8fFxyXG4gICAgICAgICAgICAoPGFueT4oPE1hcHBDb2NrcGl0Q29tcG9uZW50PmNvbXBvbmVudE1ldGhvZHNbMF0uY29tcG9uZW50KS5tZXRhRGF0YSkgPT0gdW5kZWZpbmVkIHx8XHJcbiAgICAgICAgICAgICg8YW55Pig8TWFwcENvY2twaXRDb21wb25lbnQ+Y29tcG9uZW50TWV0aG9kc1swXS5jb21wb25lbnQpLm1ldGFEYXRhKVttZXRhQ29uZmlnXSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGV4ZWN1dGFibGVNZXRob2RzO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgY29tbWFuZHMgbWV0YSBpbmZvc1xyXG4gICAgICAgIGxldCBtZXRob2RzTWV0YUluZm8gPSAoPGFueT4oPE1hcHBDb2NrcGl0Q29tcG9uZW50PmNvbXBvbmVudE1ldGhvZHNbMF0uY29tcG9uZW50KS5tZXRhRGF0YSlbbWV0YUNvbmZpZ11bbWV0YVN0cnVjdHVyZV07XHJcblxyXG4gICAgICAgIC8vIHJldHJpZXZlIHRoZSBtZXRob2QgZGVmaW5pdGlvbnNcclxuICAgICAgICBsZXQgbWV0YU1ldGhvZHMgPSBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGFEYXRhLmZpbHRlck1ldGFJdGVtcyhtZXRob2RzTWV0YUluZm8sIFttZXRhTmFtZV0pO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgZGljdGlvbmFyeSBvZiBhdmFpbGFibGUgbWV0aG9kc1xyXG4gICAgICAgIGxldCBtZXRob2RTZXQgPSB7fTtcclxuICAgICAgICBsZXQgbWV0YU1ldGhvZFNldCA9IHt9O1xyXG4gICAgICAgIGNvbXBvbmVudE1ldGhvZHMuZm9yRWFjaCgobWV0aG9kKSA9PiB7IG1ldGhvZFNldFttZXRob2QuYnJvd3NlTmFtZV0gPSBtZXRob2QgfSk7XHJcbiAgICAgICAgbWV0YU1ldGhvZHMuZm9yRWFjaCgobWV0YU1ldGhvZCkgPT4geyBtZXRhTWV0aG9kU2V0W21ldGFNZXRob2QuUmVmXSA9IG1ldGFNZXRob2QgfSk7XHJcbiAgICAgICAgLy8gcmV0cmlldmUgdGhlIG1ldGhvZHMgd2l0aCBtYXRjaGluZyBuYW1lIGluIHRoZSBtZXRhIGluZm9cclxuICAgICAgICBleGVjdXRhYmxlTWV0aG9kcyA9IG1ldGFNZXRob2RzLmZpbHRlcigobWV0YU1ldGhvZCkgPT4geyByZXR1cm4gbWV0aG9kU2V0W21ldGFNZXRob2QuUmVmXSAhPT0gdW5kZWZpbmVkIH0pLm1hcCgobWV0YU1ldGhvZCkgPT4geyByZXR1cm4gbWV0aG9kU2V0W21ldGFNZXRob2QuUmVmXSB9KTtcclxuXHJcbiAgICAgICAgLy8gYXNzaWduIHRoZSBkaXNwbGF5IG5hbWVcclxuICAgICAgICBleGVjdXRhYmxlTWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHsgdGhpcy51cGRhdGVNZXRob2REaXNwbGF5TmFtZShtZXRob2QsIG1ldGFNZXRob2RTZXRbbWV0aG9kLmJyb3dzZU5hbWVdKSB9KVxyXG5cclxuICAgICAgICAvLyBub3RpZnkgaW52YWxpZCBvciB1bmtub3duIG1ldGhvZHNcclxuICAgICAgICBsZXQgdW5rbm93bk1ldGhvZHMgPSBtZXRhTWV0aG9kcy5maWx0ZXIoKG1ldGFNZXRob2QpID0+IHsgcmV0dXJuIG1ldGhvZFNldFttZXRhTWV0aG9kLlJlZl0gPT09IHVuZGVmaW5lZCB9KTtcclxuICAgICAgICBpZiAodW5rbm93bk1ldGhvZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvLnJldHJpZXZlRXhlY3V0YWJsZU1ldGhvZHMgOiBtZXRhIGluZm8gcmVmZXJlbmNlcyB1bmtub3duIG1ldGhvZHMgJW9cIiwgdW5rbm93bk1ldGhvZHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZXhlY3V0YWJsZU1ldGhvZHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgcXVpY2sgY29tbWFuZHMgbWV0aG9kcyBmcm9tIG1ldGFJbmZvXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdfSBjb21wb25lbnRNZXRob2RzXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IGRhdGFUb1JldHJpZXZlXHJcbiAgICAgKiBAcmV0dXJucyB7TWFwcENvY2twaXRRdWlja0NvbW1hbmRQYXJhbWV0ZXJbXX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJldHJpZXZlUXVpY2tDb21tYW5kcyhjb21wb25lbnRNZXRob2RzOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdLCBkYXRhVG9SZXRyaWV2ZTogQXJyYXk8c3RyaW5nPik6IE1hcHBDb2NrcGl0UXVpY2tDb21tYW5kUGFyYW1ldGVyW10ge1xyXG4gICAgICAgIGxldCBtZXRhQ29uZmlnID0gZGF0YVRvUmV0cmlldmVbMF07XHJcbiAgICAgICAgbGV0IG1ldGFTdHJ1Y3R1cmUgPSBkYXRhVG9SZXRyaWV2ZVsxXTtcclxuICAgICAgICBsZXQgbWV0YU5hbWUgPSBkYXRhVG9SZXRyaWV2ZVsyXTtcclxuXHJcbiAgICAgICAgbGV0IHF1aWNrQ29tbWFuZHMgPSBBcnJheTxNYXBwQ29ja3BpdFF1aWNrQ29tbWFuZFBhcmFtZXRlcj4oKTtcclxuICAgICAgICBpZiAoKGNvbXBvbmVudE1ldGhvZHNbMF0gPT0gdW5kZWZpbmVkKSB8fFxyXG4gICAgICAgICAgICAoPGFueT4oPE1hcHBDb2NrcGl0Q29tcG9uZW50PmNvbXBvbmVudE1ldGhvZHNbMF0uY29tcG9uZW50KS5tZXRhRGF0YSkgPT0gdW5kZWZpbmVkIHx8XHJcbiAgICAgICAgICAgICg8YW55Pig8TWFwcENvY2twaXRDb21wb25lbnQ+Y29tcG9uZW50TWV0aG9kc1swXS5jb21wb25lbnQpLm1ldGFEYXRhKVttZXRhQ29uZmlnXSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHF1aWNrQ29tbWFuZHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIGNvbW1hbmRzIG1ldGEgaW5mb3NcclxuICAgICAgICBsZXQgbWV0aG9kc01ldGFJbmZvID0gKDxhbnk+KDxNYXBwQ29ja3BpdENvbXBvbmVudD5jb21wb25lbnRNZXRob2RzWzBdLmNvbXBvbmVudCkubWV0YURhdGEpW21ldGFDb25maWddW21ldGFTdHJ1Y3R1cmVdO1xyXG5cclxuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgbWV0aG9kIGRlZmluaXRpb25zXHJcbiAgICAgICAgbGV0IG1ldGFNZXRob2RzID0gTWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YS5maWx0ZXJNZXRhSXRlbXMobWV0aG9kc01ldGFJbmZvLCBbbWV0YU5hbWVdKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIGRpY3Rpb25hcnkgb2YgYXZhaWxhYmxlIG1ldGhvZHNcclxuICAgICAgICBsZXQgbWV0aG9kU2V0ID0ge307XHJcblxyXG4gICAgICAgIGNvbXBvbmVudE1ldGhvZHMuZm9yRWFjaCgobWV0aG9kKSA9PiB7IG1ldGhvZFNldFttZXRob2QuYnJvd3NlTmFtZV0gPSBtZXRob2QgfSk7XHJcbiAgICAgICAgbWV0YU1ldGhvZHMuZm9yRWFjaCgobWV0YU1ldGhvZCkgPT4geyBcclxuICAgICAgICAgICAgcXVpY2tDb21tYW5kcy5wdXNoKG5ldyBNYXBwQ29ja3BpdFF1aWNrQ29tbWFuZFBhcmFtZXRlcihtZXRhTWV0aG9kLlJlZiwgbWV0YU1ldGhvZC5Ub29sdGlwLCBtZXRhTWV0aG9kLkltYWdlTmFtZSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBub3RpZnkgaW52YWxpZCBvciB1bmtub3duIG1ldGhvZHNcclxuICAgICAgICBsZXQgdW5rbm93bk1ldGhvZHMgPSBxdWlja0NvbW1hbmRzLmZpbHRlcigocXVpY2tDb21tYW5kKSA9PiB7IHJldHVybiBtZXRob2RTZXRbcXVpY2tDb21tYW5kLm5hbWVdID09PSB1bmRlZmluZWQgfSk7XHJcbiAgICAgICAgaWYgKHVua25vd25NZXRob2RzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mby5yZXRyaWV2ZVF1aWNrQ29tbWFuZHMgOiBtZXRhIGluZm8gcmVmZXJlbmNlcyB1bmtub3duIG1ldGhvZHMgJW9cIiwgdW5rbm93bk1ldGhvZHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcXVpY2tDb21tYW5kcztcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcmVhZE1ldGhvZHMobWV0YUluZm86IGFueSwgcHJvcGVydHk6IEFycmF5PHN0cmluZz4sIG1ldGhvZDogQXJyYXk8c3RyaW5nPik6IG9iamVjdCB7XHJcblxyXG4gICAgICAgIGxldCBtZXRhQ29uZmlnID0gcHJvcGVydHlbMF07XHJcbiAgICAgICAgbGV0IG1ldGFDb25maWdTdHJ1Y3R1cmUgPSBwcm9wZXJ0eVsxXTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBjb21tYW5kcyBtZXRhIGluZm9zXHJcbiAgICAgICAgaWYgKG1ldGFJbmZvW21ldGFDb25maWddID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgICAgIGxldCBtZXRob2RzTWV0YUluZm8gPSBtZXRhSW5mb1ttZXRhQ29uZmlnXVttZXRhQ29uZmlnU3RydWN0dXJlXTtcclxuXHJcbiAgICAgICAgLy8gcmV0cmlldmUgdGhlIG1ldGhvZCBkZWZpbml0aW9uc1xyXG4gICAgICAgIGxldCBtZXRhTWV0aG9kcyA9IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0YURhdGEuZmlsdGVyTWV0YUl0ZW1zKG1ldGhvZHNNZXRhSW5mbywgbWV0aG9kKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIGRpY3Rpb25hcnkgb2YgYXZhaWxhYmxlIG1ldGhvZHNcclxuICAgICAgICBsZXQgbWV0YU1ldGhvZFNldCA9IHt9O1xyXG4gICAgICAgIG1ldGFNZXRob2RzLmZvckVhY2goKG1ldGFNZXRob2QpID0+IHsgbWV0YU1ldGhvZFNldFttZXRhTWV0aG9kLlJlZl0gPSBtZXRhTWV0aG9kIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gbWV0YU1ldGhvZFNldDtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIGEgbWV0aG9kcyBkaXNwbGF5IG5hbWVcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kfSBtZXRob2RcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnMVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyB1cGRhdGVNZXRob2REaXNwbGF5TmFtZShtZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLCBtZXRhTWV0aG9kSW5mbzogYW55KTogYW55IHtcclxuICAgICAgICBpZiAobWV0YU1ldGhvZEluZm8gJiYgbWV0YU1ldGhvZEluZm8uRGlzcGxheU5hbWUpIHtcclxuICAgICAgICAgICAgbWV0aG9kLmRpc3BsYXlOYW1lID0gbWV0YU1ldGhvZEluZm8uRGlzcGxheU5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVhZHMgYW5kIHVwZGF0ZXMgbWV0aG9kIHBhcmFtZXRlciBlbnVtc1xyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2R9IG1ldGhvZFxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZWFkTWV0aG9kUGFyYW1ldGVyRW51bXMobWV0aG9kOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCwgbWV0YURhdGE6IGFueSk6IGFueSB7XHJcblxyXG4gICAgICAgIGxldCBtZXRob2RQYXJhbWV0ZXJzID0gbWV0aG9kLmlucHV0UGFyYW1ldGVycztcclxuXHJcbiAgICAgICAgLy8gZ2V0IGF2YWlsYWJsZSBlbnVtIG1ldGhvZCBwYXJhbWV0ZXIgZGVmcyBcclxuICAgICAgICBsZXQgbWV0YU1ldGhvZFBhcmFtZXRlckVudW1UeXBlRGVmaW5pdGlvbnMgPSBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlci5nZXRJbnN0YW5jZSgpLnJlYWRNZXRhRW51bU1ldGhvZFBhcmFtZXRlckRlZmluaXRpb25zKG1ldGhvZCwgbWV0YURhdGEpO1xyXG5cclxuICAgICAgICAvLyBmaW5kIG1hdGNoaW5nIHBhcmFtZXRlclxyXG4gICAgICAgIGxldCBtYXRjaGluZ01ldGhvZFBhcmFtZXRlcnMgPSBtZXRob2RQYXJhbWV0ZXJzLmZpbHRlcigobWV0aG9kUGFyYW1ldGVyKSA9PiB7IHJldHVybiBtZXRhTWV0aG9kUGFyYW1ldGVyRW51bVR5cGVEZWZpbml0aW9uc1ttZXRob2RQYXJhbWV0ZXIubmFtZV0gfSk7XHJcbiAgICAgICAgLy8gc2V0IHRoZSBlbnVtIGRlZmluaXRpb25zIGZvciB0aGUgbWF0Y2hpbmcgcGFyYW1ldGVyc1xyXG4gICAgICAgIG1hdGNoaW5nTWV0aG9kUGFyYW1ldGVycy5mb3JFYWNoKChtYXRjaGluZ01ldGhvZFBhcmFtZXRlcikgPT4ge1xyXG4gICAgICAgICAgICAvLyBzZXQgdGhlIGVudW0gZGVmaW5pdGlvblxyXG4gICAgICAgICAgICBtYXRjaGluZ01ldGhvZFBhcmFtZXRlci5lbnVtVHlwZSA9IG1ldGFNZXRob2RQYXJhbWV0ZXJFbnVtVHlwZURlZmluaXRpb25zW21hdGNoaW5nTWV0aG9kUGFyYW1ldGVyLm5hbWVdO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mbyAtIHNldCBlbnVtIGluZm8gJW8gZm9yICVvXCIsIG1hdGNoaW5nTWV0aG9kUGFyYW1ldGVyLmVudW1UeXBlLCBtZXRob2QuYnJvd3NlTmFtZSArIFwiLlwiICsgbWF0Y2hpbmdNZXRob2RQYXJhbWV0ZXIubmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8sIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mbyB9Il19