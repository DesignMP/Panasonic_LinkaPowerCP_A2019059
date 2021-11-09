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
define(["require", "exports", "../../../framework/events", "../signal/eventSignalDataChangedArgs", "../calculatorProvider/calculationDataPoints", "../../../common/dateTimeHelper", "../../../common/seriesHelper", "../point", "../calculatorProvider/calculationDataInfo", "./seriesType", "../../../common/persistence/settings", "../signal/signal", "./settingIds", "./eventSerieDataChangedArgs", "../../signalManagerDataModel/signalCategory"], function (require, exports, events_1, eventSignalDataChangedArgs_1, calculationDataPoints_1, dateTimeHelper_1, seriesHelper_1, point_1, calculationDataInfo_1, seriesType_1, settings_1, signal_1, settingIds_1, eventSerieDataChangedArgs_1, signalCategory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventSeriesDataChanged = /** @class */ (function (_super) {
        __extends(EventSeriesDataChanged, _super);
        function EventSeriesDataChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventSeriesDataChanged;
    }(events_1.TypedEvent));
    ;
    var BaseSeries = /** @class */ (function () {
        /**
         * Creates an instance of BaseSeries
         * @param {ISignal} signal
         * @param {string} name
         * @param {string} color
         * @param {CursorType} cursorType
         * @param {ISeriesProvider} serieProvider
         * @param {string} [uniqueId=""]
         * @memberof BaseSeries
         */
        function BaseSeries(signal, name, color, serieProvider, uniqueId) {
            var _this = this;
            this.type = seriesType_1.SeriesType.timeSeries;
            this.eventDataChanged = new EventSeriesDataChanged();
            this._onSignalDataChanged = function (sender, eventArgs) { _this.onSignalDataChanged(sender, eventArgs); };
            this._rawPoints = [];
            this._isCalculated = false;
            this._startTriggerTime = 0;
            this.calculationDataInfo = undefined;
            this.isAutoUpdated = false;
            this._data = [];
            // holds the timestamps
            this._timestamps = [];
            this._errorInfo = new Array();
            this._seriesProvider = serieProvider;
            this._name = name;
            this._color = color;
            this.signal = signal;
            this.signal.eventDataChanged.attach(this._onSignalDataChanged);
            this._description = "";
            // Set given unique id
            this._id = uniqueId;
            this.persistID = serieProvider.getSeriesPersistingId(this._id);
        }
        Object.defineProperty(BaseSeries.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "errorInfo", {
            get: function () {
                return this._errorInfo;
            },
            set: function (value) {
                this._errorInfo = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "originalName", {
            get: function () {
                return this.signal.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "description", {
            get: function () {
                return this._description;
            },
            set: function (value) {
                this._description = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Create a signal with the given persisted signalData
         *
         * @protected
         * @param {*} signalData
         * @returns {ISignal}
         * @memberof BaseSeries
         */
        BaseSeries.createSignal = function (signalData) {
            var signal = new signal_1.Signal("", new Array());
            if (signalData != undefined) {
                signal.setSettings(signalData);
            }
            return signal;
        };
        /**
         * Returns the icon representation of this series (serie type, auto upload, series color, ... is included)
         *
         * @returns {string}
         * @memberof BaseSeries
         */
        BaseSeries.prototype.getIcon = function () {
            return this._seriesProvider.getIcon(this);
        };
        /**
         * Returns a specific icon for this series (e.g. only a single overlay)
         *
         * @param {string} svgName (e.g. "autoUpdatedOverlay" or "exclamationOverlay")
         * @returns {string}
         * @memberof BaseSeries
         */
        BaseSeries.prototype.getSpecificIcon = function (svgName) {
            return this._seriesProvider.getSpecificIcon(svgName);
        };
        /**
         * Retruns an error text for this series if some error infos are available
         *
         * @returns {string}
         * @memberof BaseSeries
         */
        BaseSeries.prototype.getErrorText = function () {
            var formatedText = "";
            if (this.errorInfo != undefined) {
                if (this.errorInfo.length > 0) {
                    formatedText = "";
                    this.errorInfo.forEach(function (error) {
                        formatedText += error + "\r\n";
                    });
                }
            }
            return formatedText;
        };
        /**
         * Returns the persisting data of the BaseSeries
         *
         * @returns {ISettings}
         * @memberof BaseSeries
         */
        BaseSeries.prototype.getSettings = function () {
            var settings = new settings_1.Settings("BaseSeries");
            var calculationDataInfoSettings = undefined;
            var signalDataSettings = undefined;
            var transferables;
            if (this.calculationDataInfo == undefined) {
                signalDataSettings = this.signal.getSettings();
                transferables = [signalDataSettings.data.rawPointsX.buffer, signalDataSettings.data.rawPointsY.buffer];
            }
            else {
                calculationDataInfoSettings = this.calculationDataInfo.getSettings();
            }
            settings.setValue(settingIds_1.SettingIds.SeriesId, this.id);
            settings.setValue(settingIds_1.SettingIds.SeriesName, this.name);
            settings.setValue(settingIds_1.SettingIds.SeriesColor, this.color);
            settings.setValue(settingIds_1.SettingIds.SeriesSignalData, signalDataSettings);
            settings.setValue(settingIds_1.SettingIds.SeriesCalculationData, calculationDataInfoSettings);
            settings.setValue("transferables", transferables);
            return settings;
        };
        /**
         * Disposes the BaseSeries
         *
         * @memberof BaseSeries
         */
        BaseSeries.prototype.dispose = function () {
            this.signal.eventDataChanged.detach(this._onSignalDataChanged);
        };
        /**
         * Updates the timestamps baseon the available series
         *
         * @private
         * @memberof BaseSeries
         */
        BaseSeries.prototype.updateTimestamps = function () {
        };
        Object.defineProperty(BaseSeries.prototype, "iconDefinition", {
            /**
             * Get serie icon definition
             *
             * @readonly
             * @type {string}
             * @memberof baseSeries
             */
            get: function () {
                var iconDefinition = "<div class='e-doc' style='position: relative;height:16px;width:30px;margin:auto;float:left;margin-left:6px;margin-top:2px'>";
                // add series icon (with overlays)
                iconDefinition += this.getIcon();
                iconDefinition += "</div>";
                return iconDefinition;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Updates the data of an existing serie
         *
         * @param {Array<IPoint>} rawPoints
         * @memberof baseSeries
         */
        BaseSeries.prototype.updatePoints = function (rawPoints) {
            this.rawPoints = rawPoints;
            this.getRange();
            this.simplifySignal(rawPoints);
            this.signal.rawPoints = rawPoints;
        };
        BaseSeries.prototype.simplifySignal = function (rawPoints) { };
        ;
        /**
         * Updates input data (DataPoints list) for calculated series
         *
         * @param {Array<CalculationDataPoints>} inputData
         * @memberof baseSeries
         */
        BaseSeries.prototype.updateInputData = function (inputData) {
            if (this.calculationDataInfo != undefined) {
                for (var i = 0; i < inputData.length; i++) {
                    if (inputData[i] instanceof calculationDataPoints_1.CalculationDataPoints) {
                        this.calculationDataInfo.inputData[i] = inputData[i];
                    }
                }
            }
        };
        /**
         * Updates input data values (input string; e.g. signalname, 5, ...) for calculated series
         *
         * @private
         * @param {Array<SignalManagerCalculationInputData>} inputChilds
         * @memberof BaseSeries
         */
        BaseSeries.prototype.updateInputDataValues = function (inputChilds) {
            if (this.calculationDataInfo != undefined) {
                var values = new Array();
                var inputDataIds = new Array();
                for (var i = 0; i < inputChilds.length; i++) {
                    values.push(inputChilds[i].getRawValue());
                    inputDataIds.push(inputChilds[i].calculationData.id);
                }
                this.calculationDataInfo.inputDataIds = inputDataIds;
                this.calculationDataInfo.inputDataValues = values;
            }
        };
        /**
         * Updates the input series for calculated series
         *
         * @private
         * @param {Array<SignalManagerCalculationInputData>} inputChilds
         * @memberof BaseSeries
         */
        BaseSeries.prototype.updateInputSeriesIds = function (inputChilds) {
            if (this.calculationDataInfo != undefined) {
                this.calculationDataInfo.inputSeriesIds = [];
                for (var i = 0; i < inputChilds.length; i++) {
                    var serie = inputChilds[i].serie;
                    if (serie != undefined) {
                        this.calculationDataInfo.inputSeriesIds.push(serie.id);
                    }
                }
            }
        };
        /**
         * Updates the calculation informations for this series
         *
         * @param {Array<TCalculationData>} inputData
         * @param {string} type
         * @param {Array<SignalManagerCalculationInputData>} inputChilds
         * @memberof BaseSeries
         */
        BaseSeries.prototype.updateCalculationDataInfo = function (inputData, type, inputChilds, seriesProvider) {
            if (this.calculationDataInfo == undefined) {
                this.calculationDataInfo = new calculationDataInfo_1.CalculationDataInfo(seriesProvider.getUniqueCalculationId());
            }
            this.calculationDataInfo.type = type;
            this.updateInputData(inputData);
            this.updateInputDataValues(inputChilds);
            this.updateInputSeriesIds(inputChilds);
        };
        /**
         * Gets the range limits from a serie
         *
         * @protected
         * @memberof baseSeries
         */
        BaseSeries.prototype.getRange = function () {
            this.maxX = this.getMaxX();
            this.minX = this.getMinX();
            this.maxY = this.getMaxY();
            this.minY = this.getMinY();
        };
        /**
         *
         *
         * @returns {(number | undefined)}
         * @memberof baseSeries
         */
        BaseSeries.prototype.getMaxX = function () {
            return 0;
        };
        /**
         *
         *
         * @protected
         * @returns {(number | undefined)}
         * @memberof baseSeries
         */
        BaseSeries.prototype.getMinX = function () {
            return 0;
        };
        /**
         * Get max Y value from a serie
         *
         * @protected
         * @returns {(number | undefined)}
         * @memberof baseSeries
         */
        BaseSeries.prototype.getMaxY = function () {
            var maxY;
            if (this.rawPoints.length > 0) {
                for (var i = 0; i < this.rawPoints.length; i++) {
                    if (maxY == undefined || this.rawPoints[i].y > maxY) {
                        maxY = this.rawPoints[i].y;
                    }
                }
            }
            return maxY;
        };
        /**
         * Get min Y value from a serie
         *
         * @protected
         * @returns {(number | undefined)}
         * @memberof baseSeries
         */
        BaseSeries.prototype.getMinY = function () {
            var minY;
            if (this.rawPoints.length > 0) {
                for (var i = 0; i < this.rawPoints.length; i++) {
                    if (minY == undefined || this.rawPoints[i].y < minY) {
                        minY = this.rawPoints[i].y;
                    }
                }
            }
            return minY;
        };
        Object.defineProperty(BaseSeries.prototype, "rawPoints", {
            /**
             * Get rawPoints
             *
             * @type {Array<IPoint>}
             * @memberof baseSeries
             */
            get: function () {
                return this._rawPoints;
            },
            /**
             * Set rawPoints
             *
             * @memberof baseSeries
             */
            set: function (points) {
                this._rawPoints = points;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "timestamps", {
            /**
             * gets the timestamps available in the series
             *
             * @readonly
             * @type {Array<number>}
             * @memberof baseSeries
             */
            get: function () {
                return this._timestamps;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * determines the index of the timestamp within the available timestamps
         *
         * @param {number} timestamp
         * @param {number[]} timestamps
         * @param {BinSearchMode} LOWER
         * @returns
         * @memberof baseSeries
         */
        BaseSeries.prototype.getTimestampIndex = function (timestamp, binSearchMode) {
            if (binSearchMode === void 0) { binSearchMode = seriesHelper_1.BinSearchMode.NEAREST; }
            // get the available timestamps
            var timestamps = this.timestamps;
            // get the index of the timestamp 
            var timestampIndex = seriesHelper_1.SeriesHelper.indexOfNearest(timestamp, timestamps, binSearchMode);
            return timestampIndex >= 0 && timestampIndex < timestamps.length ? timestampIndex : -1;
        };
        /**
         * Gets the series point nearest to the timestamp
         *
         * @returns {IPoint}
         * @memberof baseSeries
         */
        BaseSeries.prototype.pointFromTimestamp = function (timestamp) {
            var nearestTimestampIndex = this.getTimestampIndex(timestamp);
            return nearestTimestampIndex >= 0 ? this.rawPoints[nearestTimestampIndex] : new point_1.Point(0, 0);
        };
        /**
         * Gets the series point previous to the timestamp
         *
         * @returns {IPoint}
         * @memberof baseSeries
         */
        BaseSeries.prototype.previousPointFromTimestamp = function (timestamp) {
            // get the lowerbound timestamp index ( if the timestamp is not matching exactly)
            var nearestTimestampIndex = this.getTimestampIndex(timestamp, seriesHelper_1.BinSearchMode.LOWERBOUND);
            return nearestTimestampIndex >= 0 ? this.rawPoints[nearestTimestampIndex] : new point_1.Point(0, 0);
        };
        /**
         * Checks if the timestamp is within the available range
         *
         * @param {number} timestamp
         * @returns {boolean}
         * @memberof BaseSeries
         */
        BaseSeries.prototype.timestampIsInRange = function (timestamp) {
            return seriesHelper_1.SeriesHelper.isInRange(timestamp, this.timestamps);
        };
        Object.defineProperty(BaseSeries.prototype, "isCalculated", {
            /**
             * Get if serie is calculated
             *
             * @type {boolean}
             * @memberof baseSeries
             */
            get: function () {
                return this._isCalculated;
            },
            /**
             * Set if serie is calculated
             *
             * @memberof baseSeries
             */
            set: function (value) {
                this._isCalculated = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "name", {
            /**
             * Get serie name
             *
             * @type {string}
             * @memberof baseSeries
             */
            get: function () {
                return this._name;
            },
            /**
             * Set serie name
             *
             * @memberof baseSeries
             */
            set: function (value) {
                var oldName = this._name;
                this._name = value;
                this.onDataChanged(eventSerieDataChangedArgs_1.SerieAction.rename, this._name, oldName);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "id", {
            /**
             * Get unique serie id
             *
             * @readonly
             * @type {string}
             * @memberof baseSeries
             */
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "color", {
            /**
             * Get serie color
             *
             * @type {string}
             * @memberof baseSeries
             */
            get: function () {
                return this._color;
            },
            /**
             * Set serie color
             *
             * @memberof baseSeries
             */
            set: function (value) {
                var oldColor = this._color;
                this._color = value;
                this.onDataChanged(eventSerieDataChangedArgs_1.SerieAction.colorChanged, this._color, oldColor);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "rawPointsValid", {
            /**
             * Get if rawPoints are valid
             *
             * @readonly
             * @type {boolean}
             * @memberof baseSeries
             */
            get: function () {
                return this.signal.rawPointsValid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "startTriggerTime", {
            /**
             * Get startTriggerTime
             *
             * @type {number}
             * @memberof baseSeries
             */
            get: function () {
                return this._startTriggerTime;
            },
            /**
             * Set startTriggerTime
             *
             * @memberof baseSeries
             */
            set: function (value) {
                var oldStartTriggerTime = this._startTriggerTime;
                this._startTriggerTime = value;
                this.onDataChanged(eventSerieDataChangedArgs_1.SerieAction.startTriggerTimeChanged, oldStartTriggerTime);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "additionalInfo", {
            /**
             * Get start trigger formated time (shown next to serie name)
             *
             * @readonly
             * @type {string}
             * @memberof baseSeries
             */
            get: function () {
                if (this._startTriggerTime != 0) {
                    return dateTimeHelper_1.DateTimeHelper.getDateTime(this._startTriggerTime);
                }
                return ""; // No start trigger info available
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "parent", {
            /**
             * Get parent of serie
             *
             * @type {(ISerieGroup | undefined)}
             * @memberof baseSeries
             */
            get: function () {
                return this._parent;
            },
            /**
             * Set parent of serie
             *
             * @memberof baseSeries
             */
            set: function (value) {
                this._parent = value;
                if (this._parent != undefined) {
                    if (this._parent.parent instanceof signalCategory_1.SignalCategory) {
                        if (this._parent.parent.id == signalCategory_1.SignalCategory.CategoryIdRecent) {
                            // Set serie to autoUpdated if in recent category
                            this.isAutoUpdated = true;
                        }
                    }
                    this.startTriggerTime = this._parent.startTriggerTime;
                }
                else {
                    this.startTriggerTime = 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Resets the name to the original name from the signal
         *
         * @memberof baseSeries
         */
        BaseSeries.prototype.resetName = function () {
            this.name = this.originalName;
        };
        /**
         * Clones this serie
         *
         * @returns
         * @memberof baseSeries
         */
        BaseSeries.prototype.clone = function () {
            var settings = this.getSettings();
            settings.setValue(settingIds_1.SettingIds.SeriesId, this._seriesProvider.getUniqueId());
            return this._seriesProvider.createSerie(settings);
        };
        /**
         * Handles the serie data changed event (e.g. serie color, serie datapoints, rename changed)
         *
         * @private
         * @param {*} sender
         * @param {*} eventArgs
         * @memberof baseSeries
         */
        BaseSeries.prototype.onSignalDataChanged = function (sender, eventArgs) {
            switch (eventArgs.action) {
                case eventSignalDataChangedArgs_1.SignalAction.dataPointsChanged: {
                    this.updateTimestamps();
                    this.onDataChanged(eventSerieDataChangedArgs_1.SerieAction.dataPointsChanged, eventArgs.data);
                    break;
                }
                case eventSignalDataChangedArgs_1.SignalAction.startTriggerTimeChanged: {
                    this.onDataChanged(eventSerieDataChangedArgs_1.SerieAction.startTriggerTimeChanged, eventArgs.data);
                    break;
                }
            }
        };
        BaseSeries.prototype.onDataChanged = function (action, data, oldData) {
            if (oldData === void 0) { oldData = undefined; }
            var eventArgs = new eventSerieDataChangedArgs_1.EventSerieDataChangedArgs(action, data, oldData);
            this.eventDataChanged.raise(this, eventArgs);
            if (action == eventSerieDataChangedArgs_1.SerieAction.dataPointsChanged) {
                this.onSerieDataChanged(data);
            }
        };
        /**
         * Called whenever the seris data has changed
         *
         * @private
         * @param {IPoint[]} data
         * @memberof BaseSeries
         */
        BaseSeries.prototype.onSerieDataChanged = function (data) {
            //TODO: eventually call simplification ????
        };
        return BaseSeries;
    }());
    exports.BaseSeries = BaseSeries;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZVNlcmllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9zZXJpZXMvYmFzZVNlcmllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBd0JBO1FBQXFDLDBDQUFrRDtRQUF2Rjs7UUFBeUYsQ0FBQztRQUFELDZCQUFDO0lBQUQsQ0FBQyxBQUExRixDQUFxQyxtQkFBVSxHQUEyQztJQUFBLENBQUM7SUFFM0Y7UUE2REk7Ozs7Ozs7OztXQVNHO1FBQ0gsb0JBQXNCLE1BQWUsRUFBRSxJQUFZLEVBQUUsS0FBYSxFQUFFLGFBQThCLEVBQUUsUUFBZ0I7WUFBcEgsaUJBV0M7WUFoRkQsU0FBSSxHQUFHLHVCQUFVLENBQUMsVUFBVSxDQUFDO1lBQzdCLHFCQUFnQixHQUEyQixJQUFJLHNCQUFzQixFQUFFLENBQUM7WUFJaEUseUJBQW9CLEdBQUcsVUFBQyxNQUFNLEVBQUUsU0FBUyxJQUFPLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUE7WUFHMUYsZUFBVSxHQUFrQixFQUFFLENBQUM7WUFNakMsa0JBQWEsR0FBWSxLQUFLLENBQUM7WUFFL0Isc0JBQWlCLEdBQVcsQ0FBQyxDQUFDO1lBRXRDLHdCQUFtQixHQUFrQyxTQUFTLENBQUM7WUFFL0Qsa0JBQWEsR0FBWSxLQUFLLENBQUM7WUFDckIsVUFBSyxHQUFrQixFQUFFLENBQUM7WUFjaEMsdUJBQXVCO1lBQ2IsZ0JBQVcsR0FBWSxFQUFFLENBQUM7WUFFaEMsZUFBVSxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7WUFnQ3JDLElBQUksQ0FBQyxlQUFlLEdBQUcsYUFBYSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksQ0FB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QUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDN0MsSUFBRyxNQUFNLElBQUksdUNBQVcsQ0FBQyxpQkFBaUIsRUFBQztnQkFDdkMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2pDO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNPLHVDQUFrQixHQUE1QixVQUE4QixJQUFjO1lBQ3hDLDJDQUEyQztRQUMvQyxDQUFDO1FBQ0wsaUJBQUM7SUFBRCxDQUFDLEFBbnBCRCxJQW1wQkM7SUFucEJZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVNpZ25hbCB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3NpZ25hbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2VyaWVHcm91cCB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3NlcmllR3JvdXBJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNlcmllc1Byb3ZpZGVyIH0gZnJvbSBcIi4uL3Nlcmllc1Byb3ZpZGVyL3Nlcmllc1Byb3ZpZGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9zZXR0aW5nc0ludGVyZmFjZVwiO1xyXG5cclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcblxyXG5pbXBvcnQgeyBTaWduYWxBY3Rpb24sIEV2ZW50U2lnbmFsRGF0YUNoYW5nZWRBcmdzIH0gZnJvbSBcIi4uL3NpZ25hbC9ldmVudFNpZ25hbERhdGFDaGFuZ2VkQXJnc1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFQb2ludHMgfSBmcm9tIFwiLi4vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0aW9uRGF0YVBvaW50c1wiO1xyXG5pbXBvcnQgeyBEYXRlVGltZUhlbHBlciB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZGF0ZVRpbWVIZWxwZXJcIjtcclxuaW1wb3J0IHsgU2VyaWVzSGVscGVyLCBCaW5TZWFyY2hNb2RlIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9zZXJpZXNIZWxwZXJcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vcG9pbnRcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhSW5mbyB9IGZyb20gXCIuLi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRpb25EYXRhSW5mb1wiO1xyXG5pbXBvcnQgeyBTZXJpZXNUeXBlIH0gZnJvbSBcIi4vc2VyaWVzVHlwZVwiO1xyXG5pbXBvcnQgeyBUQ2FsY3VsYXRpb25EYXRhIH0gZnJvbSBcIi4uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFcIjtcclxuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL3NldHRpbmdzXCI7XHJcbmltcG9ydCB7IFNpZ25hbCB9IGZyb20gXCIuLi9zaWduYWwvc2lnbmFsXCI7XHJcbmltcG9ydCB7IFNldHRpbmdJZHMgfSBmcm9tIFwiLi9zZXR0aW5nSWRzXCI7XHJcblxyXG5pbXBvcnQgeyBTZXJpZUFjdGlvbiwgRXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJncyB9IGZyb20gXCIuL2V2ZW50U2VyaWVEYXRhQ2hhbmdlZEFyZ3NcIjtcclxuaW1wb3J0IHsgU2lnbmFsQ2F0ZWdvcnkgfSBmcm9tIFwiLi4vLi4vc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxDYXRlZ29yeVwiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEgfSBmcm9tIFwiLi4vLi4vc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGFcIjtcclxuXHJcbmNsYXNzIEV2ZW50U2VyaWVzRGF0YUNoYW5nZWQgZXh0ZW5kcyBUeXBlZEV2ZW50IDxCYXNlU2VyaWVzLCBFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzPnsgfTtcclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlU2VyaWVze1xyXG5cclxuICAgIHR5cGUgPSBTZXJpZXNUeXBlLnRpbWVTZXJpZXM7XHJcbiAgICBldmVudERhdGFDaGFuZ2VkOiBFdmVudFNlcmllc0RhdGFDaGFuZ2VkID0gbmV3IEV2ZW50U2VyaWVzRGF0YUNoYW5nZWQoKTtcclxuICAgIHBlcnNpc3RJRDogc3RyaW5nO1xyXG5cclxuXHJcbiAgICBwcml2YXRlIF9vblNpZ25hbERhdGFDaGFuZ2VkID0gKHNlbmRlciwgZXZlbnRBcmdzKSA9PiB7IHRoaXMub25TaWduYWxEYXRhQ2hhbmdlZChzZW5kZXIsIGV2ZW50QXJncyl9XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCBzaWduYWw6IElTaWduYWw7XHJcbiAgICBwcm90ZWN0ZWQgX3Jhd1BvaW50czogQXJyYXk8SVBvaW50PiA9IFtdO1xyXG4gICAgcHJvdGVjdGVkIF9uYW1lOiBzdHJpbmc7XHJcbiAgICBwcm90ZWN0ZWQgX2NvbG9yOiBzdHJpbmc7XHJcbiAgICBwcm90ZWN0ZWQgX2Rlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgICBwcm90ZWN0ZWQgX2lkOiBzdHJpbmc7XHJcblxyXG4gICAgcHJpdmF0ZSBfaXNDYWxjdWxhdGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9wYXJlbnQ6IElTZXJpZUdyb3VwIHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfc3RhcnRUcmlnZ2VyVGltZTogbnVtYmVyID0gMDtcclxuICAgIFxyXG4gICAgY2FsY3VsYXRpb25EYXRhSW5mbzogQ2FsY3VsYXRpb25EYXRhSW5mb3x1bmRlZmluZWQgPSB1bmRlZmluZWQ7IFxyXG4gICAgXHJcbiAgICBpc0F1dG9VcGRhdGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcm90ZWN0ZWQgX2RhdGE6IEFycmF5PElQb2ludD4gPSBbXTtcclxuICAgIG1heFggOiBudW1iZXJ8dW5kZWZpbmVkO1xyXG4gICAgbWluWCA6IG51bWJlcnx1bmRlZmluZWQ7XHJcbiAgICBtYXhZIDogbnVtYmVyfHVuZGVmaW5lZDtcclxuICAgIG1pblkgOiBudW1iZXJ8dW5kZWZpbmVkO1xyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGRhdGEoKTpBcnJheTxJUG9pbnQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgZGF0YSh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAgICAgLy8gaG9sZHMgdGhlIHRpbWVzdGFtcHNcclxuICAgICAgICBwcm90ZWN0ZWQgX3RpbWVzdGFtcHM6bnVtYmVyW10gPSBbXTtcclxuXHJcbiAgICBwcml2YXRlIF9lcnJvckluZm8gPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgcHVibGljIGdldCBlcnJvckluZm8oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Vycm9ySW5mbztcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgZXJyb3JJbmZvKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fZXJyb3JJbmZvID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBvcmlnaW5hbE5hbWUoKTpzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNpZ25hbC5uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZGVzY3JpcHRpb24oKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGVzY3JpcHRpb247XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IGRlc2NyaXB0aW9uKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9kZXNjcmlwdGlvbiA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfc2VyaWVzUHJvdmlkZXI6IElTZXJpZXNQcm92aWRlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQmFzZVNlcmllc1xyXG4gICAgICogQHBhcmFtIHtJU2lnbmFsfSBzaWduYWxcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29sb3JcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yVHlwZX0gY3Vyc29yVHlwZVxyXG4gICAgICogQHBhcmFtIHtJU2VyaWVzUHJvdmlkZXJ9IHNlcmllUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbdW5pcXVlSWQ9XCJcIl1cclxuICAgICAqIEBtZW1iZXJvZiBCYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihzaWduYWw6IElTaWduYWwsIG5hbWU6IHN0cmluZywgY29sb3I6IHN0cmluZywgc2VyaWVQcm92aWRlcjogSVNlcmllc1Byb3ZpZGVyLCB1bmlxdWVJZDogc3RyaW5nKXtcclxuICAgICAgICB0aGlzLl9zZXJpZXNQcm92aWRlciA9IHNlcmllUHJvdmlkZXI7XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5fY29sb3IgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLnNpZ25hbCA9IHNpZ25hbDtcclxuICAgICAgICB0aGlzLnNpZ25hbC5ldmVudERhdGFDaGFuZ2VkLmF0dGFjaCh0aGlzLl9vblNpZ25hbERhdGFDaGFuZ2VkKTtcclxuICAgICAgICB0aGlzLl9kZXNjcmlwdGlvbiA9IFwiXCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gU2V0IGdpdmVuIHVuaXF1ZSBpZFxyXG4gICAgICAgIHRoaXMuX2lkID0gdW5pcXVlSWQ7ICBcclxuICAgICAgICB0aGlzLnBlcnNpc3RJRCA9IHNlcmllUHJvdmlkZXIuZ2V0U2VyaWVzUGVyc2lzdGluZ0lkKHRoaXMuX2lkKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgc2lnbmFsIHdpdGggdGhlIGdpdmVuIHBlcnNpc3RlZCBzaWduYWxEYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHsqfSBzaWduYWxEYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7SVNpZ25hbH1cclxuICAgICAqIEBtZW1iZXJvZiBCYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBzdGF0aWMgY3JlYXRlU2lnbmFsKHNpZ25hbERhdGE6IGFueSk6IElTaWduYWx7XHJcbiAgICAgICAgbGV0IHNpZ25hbDogSVNpZ25hbCA9IG5ldyBTaWduYWwoXCJcIiwgbmV3IEFycmF5PElQb2ludD4oKSk7XHJcbiAgICAgICAgaWYoc2lnbmFsRGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBzaWduYWwuc2V0U2V0dGluZ3Moc2lnbmFsRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzaWduYWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpY29uIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgc2VyaWVzIChzZXJpZSB0eXBlLCBhdXRvIHVwbG9hZCwgc2VyaWVzIGNvbG9yLCAuLi4gaXMgaW5jbHVkZWQpXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBCYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIGdldEljb24oKTogc3RyaW5ne1xyXG4gICAgICAgcmV0dXJuIHRoaXMuX3Nlcmllc1Byb3ZpZGVyLmdldEljb24odGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgc3BlY2lmaWMgaWNvbiBmb3IgdGhpcyBzZXJpZXMgKGUuZy4gb25seSBhIHNpbmdsZSBvdmVybGF5KVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdmdOYW1lIChlLmcuIFwiYXV0b1VwZGF0ZWRPdmVybGF5XCIgb3IgXCJleGNsYW1hdGlvbk92ZXJsYXlcIilcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBnZXRTcGVjaWZpY0ljb24oc3ZnTmFtZTogc3RyaW5nKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJpZXNQcm92aWRlci5nZXRTcGVjaWZpY0ljb24oc3ZnTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRydW5zIGFuIGVycm9yIHRleHQgZm9yIHRoaXMgc2VyaWVzIGlmIHNvbWUgZXJyb3IgaW5mb3MgYXJlIGF2YWlsYWJsZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBnZXRFcnJvclRleHQoKTogc3RyaW5ne1xyXG4gICAgICAgIGxldCBmb3JtYXRlZFRleHQgPSBcIlwiO1xyXG4gICAgICAgIGlmKHRoaXMuZXJyb3JJbmZvICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZXJyb3JJbmZvLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0ZWRUZXh0ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JJbmZvLmZvckVhY2goZXJyb3IgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0ZWRUZXh0ICs9IGVycm9yICsgXCJcXHJcXG5cIjtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZm9ybWF0ZWRUZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgcGVyc2lzdGluZyBkYXRhIG9mIHRoZSBCYXNlU2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0lTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBCYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIGdldFNldHRpbmdzKCk6IElTZXR0aW5nc3tcclxuICAgICAgICBsZXQgc2V0dGluZ3MgPSBuZXcgU2V0dGluZ3MoXCJCYXNlU2VyaWVzXCIpO1xyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbkRhdGFJbmZvU2V0dGluZ3M6IElTZXR0aW5nc3x1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgbGV0IHNpZ25hbERhdGFTZXR0aW5nczogSVNldHRpbmdzfHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICBsZXQgdHJhbnNmZXJhYmxlcztcclxuXHJcbiAgICAgICAgaWYodGhpcy5jYWxjdWxhdGlvbkRhdGFJbmZvID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHNpZ25hbERhdGFTZXR0aW5ncyA9IHRoaXMuc2lnbmFsLmdldFNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgIHRyYW5zZmVyYWJsZXMgPSBbc2lnbmFsRGF0YVNldHRpbmdzLmRhdGEucmF3UG9pbnRzWC5idWZmZXIsIHNpZ25hbERhdGFTZXR0aW5ncy5kYXRhLnJhd1BvaW50c1kuYnVmZmVyXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgY2FsY3VsYXRpb25EYXRhSW5mb1NldHRpbmdzID0gdGhpcy5jYWxjdWxhdGlvbkRhdGFJbmZvLmdldFNldHRpbmdzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVzSWQsIHRoaXMuaWQpO1xyXG4gICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVzTmFtZSwgdGhpcy5uYW1lKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLlNlcmllc0NvbG9yLCB0aGlzLmNvbG9yKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLlNlcmllc1NpZ25hbERhdGEsIHNpZ25hbERhdGFTZXR0aW5ncyk7XHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5TZXJpZXNDYWxjdWxhdGlvbkRhdGEsIGNhbGN1bGF0aW9uRGF0YUluZm9TZXR0aW5ncyk7XHJcblxyXG4gICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFwidHJhbnNmZXJhYmxlc1wiLCB0cmFuc2ZlcmFibGVzKTtcclxuICAgICAgICByZXR1cm4gc2V0dGluZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwb3NlcyB0aGUgQmFzZVNlcmllc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICB0aGlzLnNpZ25hbC5ldmVudERhdGFDaGFuZ2VkLmRldGFjaCh0aGlzLl9vblNpZ25hbERhdGFDaGFuZ2VkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHRpbWVzdGFtcHMgYmFzZW9uIHRoZSBhdmFpbGFibGUgc2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBCYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCB1cGRhdGVUaW1lc3RhbXBzKCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHNlcmllIGljb24gZGVmaW5pdGlvblxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgaWNvbkRlZmluaXRpb24oKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgaWNvbkRlZmluaXRpb24gPSBgPGRpdiBjbGFzcz0nZS1kb2MnIHN0eWxlPSdwb3NpdGlvbjogcmVsYXRpdmU7aGVpZ2h0OjE2cHg7d2lkdGg6MzBweDttYXJnaW46YXV0bztmbG9hdDpsZWZ0O21hcmdpbi1sZWZ0OjZweDttYXJnaW4tdG9wOjJweCc+YDtcclxuICAgICAgICAvLyBhZGQgc2VyaWVzIGljb24gKHdpdGggb3ZlcmxheXMpXHJcbiAgICAgICAgaWNvbkRlZmluaXRpb24gKz0gdGhpcy5nZXRJY29uKCk7XHJcbiAgICAgICAgaWNvbkRlZmluaXRpb24gKz0gYDwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIHJldHVybiBpY29uRGVmaW5pdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGRhdGEgb2YgYW4gZXhpc3Rpbmcgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQb2ludD59IHJhd1BvaW50c1xyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVwZGF0ZVBvaW50cyhyYXdQb2ludHM6IEFycmF5PElQb2ludD4pe1xyXG4gICAgICAgIHRoaXMucmF3UG9pbnRzID0gcmF3UG9pbnRzO1xyXG4gICAgICAgIHRoaXMuZ2V0UmFuZ2UoKTtcclxuICAgICAgICB0aGlzLnNpbXBsaWZ5U2lnbmFsKHJhd1BvaW50cyk7XHJcbiAgICAgICAgdGhpcy5zaWduYWwucmF3UG9pbnRzID0gcmF3UG9pbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaW1wbGlmeVNpZ25hbChyYXdQb2ludHM6IEFycmF5PElQb2ludD4pe307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIGlucHV0IGRhdGEgKERhdGFQb2ludHMgbGlzdCkgZm9yIGNhbGN1bGF0ZWQgc2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+fSBpbnB1dERhdGFcclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlSW5wdXREYXRhKGlucHV0RGF0YTogQXJyYXk8VENhbGN1bGF0aW9uRGF0YT4pe1xyXG4gICAgICAgIGlmKHRoaXMuY2FsY3VsYXRpb25EYXRhSW5mbyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgaW5wdXREYXRhLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKGlucHV0RGF0YVtpXSBpbnN0YW5jZW9mIENhbGN1bGF0aW9uRGF0YVBvaW50cyl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGlvbkRhdGFJbmZvLmlucHV0RGF0YVtpXSA9IGlucHV0RGF0YVtpXSBhcyBDYWxjdWxhdGlvbkRhdGFQb2ludHM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIGlucHV0IGRhdGEgdmFsdWVzIChpbnB1dCBzdHJpbmc7IGUuZy4gc2lnbmFsbmFtZSwgNSwgLi4uKSBmb3IgY2FsY3VsYXRlZCBzZXJpZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGE+fSBpbnB1dENoaWxkc1xyXG4gICAgICogQG1lbWJlcm9mIEJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVJbnB1dERhdGFWYWx1ZXMoaW5wdXRDaGlsZHM6IEFycmF5PFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YT4pe1xyXG4gICAgICAgIGlmKHRoaXMuY2FsY3VsYXRpb25EYXRhSW5mbyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgdmFsdWVzID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuICAgICAgICAgICAgbGV0IGlucHV0RGF0YUlkcyA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBpbnB1dENoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaChpbnB1dENoaWxkc1tpXS5nZXRSYXdWYWx1ZSgpKTtcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YUlkcy5wdXNoKGlucHV0Q2hpbGRzW2ldLmNhbGN1bGF0aW9uRGF0YS5pZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGlvbkRhdGFJbmZvLmlucHV0RGF0YUlkcyA9IGlucHV0RGF0YUlkcztcclxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGlvbkRhdGFJbmZvLmlucHV0RGF0YVZhbHVlcyA9IHZhbHVlcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBpbnB1dCBzZXJpZXMgZm9yIGNhbGN1bGF0ZWQgc2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhPn0gaW5wdXRDaGlsZHNcclxuICAgICAqIEBtZW1iZXJvZiBCYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlSW5wdXRTZXJpZXNJZHMoaW5wdXRDaGlsZHM6IEFycmF5PFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YT4pe1xyXG4gICAgICAgIGlmKHRoaXMuY2FsY3VsYXRpb25EYXRhSW5mbyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0aW9uRGF0YUluZm8uaW5wdXRTZXJpZXNJZHMgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dENoaWxkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlcmllID0gaW5wdXRDaGlsZHNbaV0uc2VyaWU7XHJcbiAgICAgICAgICAgICAgICBpZihzZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRpb25EYXRhSW5mby5pbnB1dFNlcmllc0lkcy5wdXNoKHNlcmllLmlkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGNhbGN1bGF0aW9uIGluZm9ybWF0aW9ucyBmb3IgdGhpcyBzZXJpZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PFRDYWxjdWxhdGlvbkRhdGE+fSBpbnB1dERhdGFcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YT59IGlucHV0Q2hpbGRzXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlQ2FsY3VsYXRpb25EYXRhSW5mbyAoaW5wdXREYXRhOiBBcnJheTxUQ2FsY3VsYXRpb25EYXRhPiwgdHlwZTogc3RyaW5nLCBpbnB1dENoaWxkczogQXJyYXk8U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhPiwgc2VyaWVzUHJvdmlkZXIgOiBJU2VyaWVzUHJvdmlkZXIpIHtcclxuICAgICAgICBpZih0aGlzLmNhbGN1bGF0aW9uRGF0YUluZm8gPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGlvbkRhdGFJbmZvID0gbmV3IENhbGN1bGF0aW9uRGF0YUluZm8oc2VyaWVzUHJvdmlkZXIuZ2V0VW5pcXVlQ2FsY3VsYXRpb25JZCgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdGlvbkRhdGFJbmZvLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXREYXRhKGlucHV0RGF0YSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dERhdGFWYWx1ZXMoaW5wdXRDaGlsZHMpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXRTZXJpZXNJZHMoaW5wdXRDaGlsZHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgcmFuZ2UgbGltaXRzIGZyb20gYSBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRSYW5nZSgpe1xyXG4gICAgICAgIHRoaXMubWF4WCA9IHRoaXMuZ2V0TWF4WCgpO1xyXG4gICAgICAgIHRoaXMubWluWCA9IHRoaXMuZ2V0TWluWCgpO1xyXG4gICAgICAgIHRoaXMubWF4WSA9IHRoaXMuZ2V0TWF4WSgpO1xyXG4gICAgICAgIHRoaXMubWluWSA9IHRoaXMuZ2V0TWluWSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlciB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0TWF4WCgpOiBudW1iZXIgfCB1bmRlZmluZWR7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zIHsobnVtYmVyIHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRNaW5YKCk6IG51bWJlciB8IHVuZGVmaW5lZHtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBtYXggWSB2YWx1ZSBmcm9tIGEgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlciB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0TWF4WSgpOiBudW1iZXIgfCB1bmRlZmluZWR7XHJcbiAgICAgICAgbGV0IG1heFk7XHJcbiAgICAgICAgaWYgKHRoaXMucmF3UG9pbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMucmF3UG9pbnRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKG1heFkgPT0gdW5kZWZpbmVkIHx8IHRoaXMucmF3UG9pbnRzW2ldLnkgPiBtYXhZICl7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4WSA9IHRoaXMucmF3UG9pbnRzW2ldLnlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWF4WTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBtaW4gWSB2YWx1ZSBmcm9tIGEgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlciB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0TWluWSgpOiBudW1iZXIgfCB1bmRlZmluZWR7XHJcbiAgICAgICAgbGV0IG1pblk7XHJcbiAgICAgICAgaWYgKHRoaXMucmF3UG9pbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMucmF3UG9pbnRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKG1pblkgPT0gdW5kZWZpbmVkIHx8IHRoaXMucmF3UG9pbnRzW2ldLnkgPCBtaW5ZICl7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluWSA9IHRoaXMucmF3UG9pbnRzW2ldLnlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWluWTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCByYXdQb2ludHNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IHJhd1BvaW50cyhwb2ludHM6IEFycmF5PElQb2ludD4pe1xyXG4gICAgICAgIHRoaXMuX3Jhd1BvaW50cyA9IHBvaW50cztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgcmF3UG9pbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge0FycmF5PElQb2ludD59XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJhd1BvaW50cygpOiAgQXJyYXk8SVBvaW50PntcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmF3UG9pbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIHRoZSB0aW1lc3RhbXBzIGF2YWlsYWJsZSBpbiB0aGUgc2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7QXJyYXk8bnVtYmVyPn1cclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdGltZXN0YW1wcygpIDogQXJyYXk8bnVtYmVyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RpbWVzdGFtcHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkZXRlcm1pbmVzIHRoZSBpbmRleCBvZiB0aGUgdGltZXN0YW1wIHdpdGhpbiB0aGUgYXZhaWxhYmxlIHRpbWVzdGFtcHNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZXN0YW1wXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcltdfSB0aW1lc3RhbXBzXHJcbiAgICAgKiBAcGFyYW0ge0JpblNlYXJjaE1vZGV9IExPV0VSXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgZ2V0VGltZXN0YW1wSW5kZXgodGltZXN0YW1wOiBudW1iZXIsYmluU2VhcmNoTW9kZTpCaW5TZWFyY2hNb2RlID0gQmluU2VhcmNoTW9kZS5ORUFSRVNUKSB7XHJcbiAgICAgICBcclxuICAgICAgICAvLyBnZXQgdGhlIGF2YWlsYWJsZSB0aW1lc3RhbXBzXHJcbiAgICAgICAgbGV0IHRpbWVzdGFtcHMgPSB0aGlzLnRpbWVzdGFtcHM7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBpbmRleCBvZiB0aGUgdGltZXN0YW1wIFxyXG4gICAgICAgIGxldCB0aW1lc3RhbXBJbmRleCA9IFNlcmllc0hlbHBlci5pbmRleE9mTmVhcmVzdCh0aW1lc3RhbXAsdGltZXN0YW1wcyxiaW5TZWFyY2hNb2RlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuICB0aW1lc3RhbXBJbmRleCA+PSAwICYmIHRpbWVzdGFtcEluZGV4IDwgdGltZXN0YW1wcy5sZW5ndGggPyB0aW1lc3RhbXBJbmRleCA6IC0xO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgc2VyaWVzIHBvaW50IG5lYXJlc3QgdG8gdGhlIHRpbWVzdGFtcFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtJUG9pbnR9XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcG9pbnRGcm9tVGltZXN0YW1wKHRpbWVzdGFtcDpudW1iZXIpIDogSVBvaW50e1xyXG4gICAgICAgIGxldCBuZWFyZXN0VGltZXN0YW1wSW5kZXggPSB0aGlzLmdldFRpbWVzdGFtcEluZGV4KHRpbWVzdGFtcCk7XHJcbiAgICAgICAgcmV0dXJuICBuZWFyZXN0VGltZXN0YW1wSW5kZXggPj0gMCA/ICB0aGlzLnJhd1BvaW50c1tuZWFyZXN0VGltZXN0YW1wSW5kZXhdIDogbmV3IFBvaW50KDAsMCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgc2VyaWVzIHBvaW50IHByZXZpb3VzIHRvIHRoZSB0aW1lc3RhbXBcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7SVBvaW50fVxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHByZXZpb3VzUG9pbnRGcm9tVGltZXN0YW1wKHRpbWVzdGFtcDogbnVtYmVyKTogSVBvaW50IHtcclxuICAgICAgICAvLyBnZXQgdGhlIGxvd2VyYm91bmQgdGltZXN0YW1wIGluZGV4ICggaWYgdGhlIHRpbWVzdGFtcCBpcyBub3QgbWF0Y2hpbmcgZXhhY3RseSlcclxuICAgICAgICBsZXQgbmVhcmVzdFRpbWVzdGFtcEluZGV4ID0gdGhpcy5nZXRUaW1lc3RhbXBJbmRleCh0aW1lc3RhbXAsQmluU2VhcmNoTW9kZS5MT1dFUkJPVU5EKTtcclxuICAgICAgICByZXR1cm4gbmVhcmVzdFRpbWVzdGFtcEluZGV4ID49IDAgPyB0aGlzLnJhd1BvaW50c1tuZWFyZXN0VGltZXN0YW1wSW5kZXhdIDogbmV3IFBvaW50KDAsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRoZSB0aW1lc3RhbXAgaXMgd2l0aGluIHRoZSBhdmFpbGFibGUgcmFuZ2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZXN0YW1wXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBCYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0aW1lc3RhbXBJc0luUmFuZ2UodGltZXN0YW1wOm51bWJlcikgOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiAgU2VyaWVzSGVscGVyLmlzSW5SYW5nZSh0aW1lc3RhbXAsdGhpcy50aW1lc3RhbXBzKTtcclxuICAgIH1cclxuICAgICAgXHJcbiAgICAvKipcclxuICAgICAqIFNldCBpZiBzZXJpZSBpcyBjYWxjdWxhdGVkXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBpc0NhbGN1bGF0ZWQodmFsdWU6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuX2lzQ2FsY3VsYXRlZCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGlmIHNlcmllIGlzIGNhbGN1bGF0ZWRcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgaXNDYWxjdWxhdGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICByZXR1cm4gdGhpcy5faXNDYWxjdWxhdGVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHNlcmllIG5hbWVcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IG5hbWUodmFsdWU6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IG9sZE5hbWUgPSAgdGhpcy5fbmFtZTtcclxuICAgICAgICB0aGlzLl9uYW1lID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5vbkRhdGFDaGFuZ2VkKFNlcmllQWN0aW9uLnJlbmFtZSwgdGhpcy5fbmFtZSwgb2xkTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgc2VyaWUgbmFtZVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHVuaXF1ZSBzZXJpZSBpZFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgaWQoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBzZXJpZSBjb2xvclxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgY29sb3IodmFsdWU6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IG9sZENvbG9yID0gdGhpcy5fY29sb3I7XHJcbiAgICAgICAgdGhpcy5fY29sb3IgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLm9uRGF0YUNoYW5nZWQoU2VyaWVBY3Rpb24uY29sb3JDaGFuZ2VkLCB0aGlzLl9jb2xvciwgb2xkQ29sb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHNlcmllIGNvbG9yXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgY29sb3IoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBpZiByYXdQb2ludHMgYXJlIHZhbGlkXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmF3UG9pbnRzVmFsaWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5zaWduYWwucmF3UG9pbnRzVmFsaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgc3RhcnRUcmlnZ2VyVGltZVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHN0YXJ0VHJpZ2dlclRpbWUoKTogbnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGFydFRyaWdnZXJUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHN0YXJ0VHJpZ2dlclRpbWVcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IHN0YXJ0VHJpZ2dlclRpbWUodmFsdWU6IG51bWJlcil7XHJcbiAgICAgICAgbGV0IG9sZFN0YXJ0VHJpZ2dlclRpbWUgPSB0aGlzLl9zdGFydFRyaWdnZXJUaW1lO1xyXG4gICAgICAgIHRoaXMuX3N0YXJ0VHJpZ2dlclRpbWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLm9uRGF0YUNoYW5nZWQoU2VyaWVBY3Rpb24uc3RhcnRUcmlnZ2VyVGltZUNoYW5nZWQsIG9sZFN0YXJ0VHJpZ2dlclRpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHN0YXJ0IHRyaWdnZXIgZm9ybWF0ZWQgdGltZSAoc2hvd24gbmV4dCB0byBzZXJpZSBuYW1lKVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgYWRkaXRpb25hbEluZm8oKTogc3RyaW5ne1xyXG4gICAgICAgIGlmKHRoaXMuX3N0YXJ0VHJpZ2dlclRpbWUgIT0gMCl7XHJcbiAgICAgICAgICAgIHJldHVybiBEYXRlVGltZUhlbHBlci5nZXREYXRlVGltZSh0aGlzLl9zdGFydFRyaWdnZXJUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7IC8vIE5vIHN0YXJ0IHRyaWdnZXIgaW5mbyBhdmFpbGFibGVcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBwYXJlbnQgb2Ygc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7KElTZXJpZUdyb3VwIHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcGFyZW50KCk6IElTZXJpZUdyb3VwIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHBhcmVudCBvZiBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgcGFyZW50KHZhbHVlOiBJU2VyaWVHcm91cCB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuX3BhcmVudCA9IHZhbHVlO1xyXG4gICAgICAgIGlmKHRoaXMuX3BhcmVudCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgIGlmKHRoaXMuX3BhcmVudC5wYXJlbnQgaW5zdGFuY2VvZiBTaWduYWxDYXRlZ29yeSl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9wYXJlbnQucGFyZW50LmlkID09IFNpZ25hbENhdGVnb3J5LkNhdGVnb3J5SWRSZWNlbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCBzZXJpZSB0byBhdXRvVXBkYXRlZCBpZiBpbiByZWNlbnQgY2F0ZWdvcnlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQXV0b1VwZGF0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUcmlnZ2VyVGltZSA9IHRoaXMuX3BhcmVudC5zdGFydFRyaWdnZXJUaW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0VHJpZ2dlclRpbWUgPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2V0cyB0aGUgbmFtZSB0byB0aGUgb3JpZ2luYWwgbmFtZSBmcm9tIHRoZSBzaWduYWxcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVzZXROYW1lKCl7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5vcmlnaW5hbE5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbG9uZXMgdGhpcyBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xvbmUoKTogQmFzZVNlcmllc3tcclxuICAgICAgICBsZXQgc2V0dGluZ3MgPSB0aGlzLmdldFNldHRpbmdzKCk7XHJcbiAgICAgICAgKHNldHRpbmdzIGFzIFNldHRpbmdzKS5zZXRWYWx1ZShTZXR0aW5nSWRzLlNlcmllc0lkLCB0aGlzLl9zZXJpZXNQcm92aWRlci5nZXRVbmlxdWVJZCgpKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VyaWVzUHJvdmlkZXIuY3JlYXRlU2VyaWUoc2V0dGluZ3MpITtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgdGhlIHNlcmllIGRhdGEgY2hhbmdlZCBldmVudCAoZS5nLiBzZXJpZSBjb2xvciwgc2VyaWUgZGF0YXBvaW50cywgcmVuYW1lIGNoYW5nZWQpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0geyp9IGV2ZW50QXJnc1xyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblNpZ25hbERhdGFDaGFuZ2VkKHNlbmRlcjogSVNpZ25hbCwgZXZlbnRBcmdzOiBFdmVudFNpZ25hbERhdGFDaGFuZ2VkQXJncyl7XHJcbiAgICAgICAgc3dpdGNoIChldmVudEFyZ3MuYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGNhc2UgU2lnbmFsQWN0aW9uLmRhdGFQb2ludHNDaGFuZ2VkOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRpbWVzdGFtcHMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25EYXRhQ2hhbmdlZChTZXJpZUFjdGlvbi5kYXRhUG9pbnRzQ2hhbmdlZCwgZXZlbnRBcmdzLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBTaWduYWxBY3Rpb24uc3RhcnRUcmlnZ2VyVGltZUNoYW5nZWQ6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkRhdGFDaGFuZ2VkKFNlcmllQWN0aW9uLnN0YXJ0VHJpZ2dlclRpbWVDaGFuZ2VkLCBldmVudEFyZ3MuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uRGF0YUNoYW5nZWQoYWN0aW9uOiBTZXJpZUFjdGlvbiwgZGF0YTogYW55LCBvbGREYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcclxuICAgICAgICBsZXQgZXZlbnRBcmdzID0gbmV3IEV2ZW50U2VyaWVEYXRhQ2hhbmdlZEFyZ3MoYWN0aW9uLCBkYXRhLCBvbGREYXRhKTtcclxuICAgICAgICB0aGlzLmV2ZW50RGF0YUNoYW5nZWQucmFpc2UodGhpcywgZXZlbnRBcmdzKTtcclxuICAgICAgICBpZihhY3Rpb24gPT0gU2VyaWVBY3Rpb24uZGF0YVBvaW50c0NoYW5nZWQpe1xyXG4gICAgICAgICAgICB0aGlzLm9uU2VyaWVEYXRhQ2hhbmdlZChkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgd2hlbmV2ZXIgdGhlIHNlcmlzIGRhdGEgaGFzIGNoYW5nZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJUG9pbnRbXX0gZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIEJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG9uU2VyaWVEYXRhQ2hhbmdlZCggZGF0YTogSVBvaW50W10pIHtcclxuICAgICAgICAvL1RPRE86IGV2ZW50dWFsbHkgY2FsbCBzaW1wbGlmaWNhdGlvbiA/Pz8/XHJcbiAgICB9XHJcbn0iXX0=