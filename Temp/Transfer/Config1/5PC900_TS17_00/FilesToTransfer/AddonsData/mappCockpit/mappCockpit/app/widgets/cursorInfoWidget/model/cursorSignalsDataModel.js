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
define(["require", "exports", "../../../framework/events", "../../../models/common/series/eventSerieDataChangedArgs", "../../../models/common/point", "../../../models/common/series/seriesType", "./ytCursorSignal", "./xyCursorSignal", "./fftCursorSignal", "./componentDefaultDefinition", "./settingIds", "../../../common/persistence/settings", "../../common/states/cursorType"], function (require, exports, events_1, eventSerieDataChangedArgs_1, point_1, seriesType_1, ytCursorSignal_1, xyCursorSignal_1, fftCursorSignal_1, componentDefaultDefinition_1, settingIds_1, settings_1, cursorType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventModelChanged = /** @class */ (function (_super) {
        __extends(EventModelChanged, _super);
        function EventModelChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventModelChanged;
    }(events_1.TypedEvent));
    ;
    var CursorSignalsDataModel = /** @class */ (function () {
        function CursorSignalsDataModel() {
            var _this = this;
            this._isPersistEnabled = false;
            this.eventModelChanged = new EventModelChanged();
            this._cursorSignals = new Array();
            this._serieDataChangedHandler = function (sender, args) { return _this.onSerieDataChanged(sender, args); };
        }
        CursorSignalsDataModel.prototype.initialize = function () {
            this.component.loadComponentSettings();
            //When widget is initialized data can be persisted
            this._isPersistEnabled = true;
        };
        CursorSignalsDataModel.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
        };
        CursorSignalsDataModel.prototype.dispose = function () {
        };
        /**
         * Returns the list with the cursor signals for the cursor info widget
         *
         * @returns {Array<CursorSignal>}
         * @memberof CursorSignalsDataModel
         */
        CursorSignalsDataModel.prototype.getCursorSignals = function () {
            return this._cursorSignals;
        };
        /**
         *  Returns the CursorSignal which links to the given serie
         *
         * @param {BaseSeries} serie
         * @returns {(CursorSignal|undefined)}
         * @memberof CursorSignalsDataModel
         */
        CursorSignalsDataModel.prototype.getCursorSignal = function (serie) {
            for (var i = 0; i < this._cursorSignals.length; i++) {
                if (this._cursorSignals[i].serie.id === serie.id) {
                    // serie already in list
                    return this._cursorSignals[i];
                }
            }
            return undefined;
        };
        /**
         * Returns the index of the cursorSignal in the datamodel else -1 if not found
         *
         * @param {CursorSignal} cursorSignal
         * @returns {number}
         * @memberof CursorSignalsDataModel
         */
        CursorSignalsDataModel.prototype.getIndex = function (cursorSignal) {
            return this._cursorSignals.indexOf(cursorSignal);
        };
        CursorSignalsDataModel.prototype.getComponentSettings = function (onlyModified) {
            var cursorSignalsData = new Array();
            for (var i = 0; i < this._cursorSignals.length; i++) {
                cursorSignalsData.push(this._cursorSignals[i].getSettings());
            }
            this.component.setSetting("cursorSignalsData", cursorSignalsData);
            return this.component.getComponentSettings(onlyModified);
        };
        CursorSignalsDataModel.prototype.setComponentSettings = function (componentSettings) {
            if (componentSettings != undefined) {
                this.component.setComponentSettings(componentSettings);
                var cursorSignalsData = this.component.getSetting("cursorSignalsData");
                if (cursorSignalsData != undefined) {
                    //We add the series from bottom to top. In the cursorInfoWidget, the last serie we insert is always placed on top.
                    for (var i = cursorSignalsData.length - 1; i > -1; i--) {
                        var cursorSignalData = cursorSignalsData[i];
                        var settings = settings_1.Settings.create(cursorSignalData);
                        var series = new Array();
                        var serie = this.getSerieFromProvider(settings.getValue(settingIds_1.SettingIds.SerieId));
                        if (serie != undefined) {
                            series.push(serie);
                        }
                        this.addSeries(series, settings.getValue(settingIds_1.SettingIds.ExpandState), settings.getValue(settingIds_1.SettingIds.CursorInfo));
                    }
                }
                this.onModelChanged();
            }
        };
        CursorSignalsDataModel.prototype.getSerieFromProvider = function (id) {
            var seriesProvider = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.SeriesProviderId);
            if (seriesProvider != undefined) {
                return seriesProvider.get(id);
            }
            return undefined;
        };
        CursorSignalsDataModel.prototype.addSeries = function (series, expandState, cursorInfo) {
            var cursorSignals = new Array();
            for (var i = 0; i < series.length; i++) {
                if (series[i].type === seriesType_1.SeriesType.timeSeries) {
                    cursorSignals.push(new ytCursorSignal_1.YTCursorSignal(series[i], expandState, cursorInfo));
                }
                else if (series[i].type === seriesType_1.SeriesType.xySeries) {
                    cursorSignals.push(new xyCursorSignal_1.XYCursorSignal(series[i], expandState, cursorInfo));
                }
                else if (series[i].type === seriesType_1.SeriesType.fftSeries) {
                    cursorSignals.push(new fftCursorSignal_1.FFTCursorSignal(series[i], expandState, cursorInfo));
                }
            }
            this.addSignal(cursorSignals);
        };
        /**
         * Adds the given signal to the signal list
         *
         * @param {Array<CursorSignal>} cursorSignal
         * @returns
         * @memberof CursorSignalsDataModel
         */
        CursorSignalsDataModel.prototype.addSignal = function (cursorSignal) {
            for (var i = 0; i < cursorSignal.length; i++) {
                var index = this._cursorSignals.indexOf(cursorSignal[i]);
                if (index > -1) {
                    // cusorSignal already in list
                    return;
                }
                //Check if serie is not in the list
                if (this.getCursorSignal(cursorSignal[i].serie) == undefined) {
                    cursorSignal[i].serie.eventDataChanged.attach(this._serieDataChangedHandler);
                    this._cursorSignals.splice(0, 0, cursorSignal[i]);
                    this.onModelChanged();
                }
            }
        };
        /**
         * Removes the given signal from the signal list
         *
         * @param {CursorSignal} cursorSignal
         * @memberof CursorSignalsDataModel
         */
        CursorSignalsDataModel.prototype.removeSerie = function (cursorSignal) {
            var index = this._cursorSignals.indexOf(cursorSignal);
            if (index > -1) {
                this._cursorSignals.splice(index, 1);
                cursorSignal.serie.eventDataChanged.detach(this._serieDataChangedHandler);
                this.onModelChanged();
            }
        };
        /**
             * Updates the cursor informations for the given signal to the defined cursorIndex 1 and 2
             *
             * @private
             * @param {CursorSignal} cursorSignal
             * @param {(number|undefined)} cursorTimestamp1
             * @param {(number|undefined)} cursorTimestamp2
             * @returns
             * @memberof CursorSignalsDataModel
             */
        CursorSignalsDataModel.prototype.updateCursorValues = function (cursorSignal, cursorTimestamp1, cursorTimestamp2) {
            if (!cursorSignal.serie.rawPointsValid) {
                return;
            }
            var cursorPoint1;
            var cursorPoint2;
            if (cursorTimestamp1 != undefined) {
                cursorPoint1 = this.getCursorSignalPoint(cursorSignal, cursorTimestamp1);
            }
            if (cursorTimestamp2 != undefined) {
                cursorPoint2 = this.getCursorSignalPoint(cursorSignal, cursorTimestamp2);
            }
            cursorSignal.updateValues(cursorPoint1, cursorPoint2, cursorTimestamp1, cursorTimestamp2);
        };
        /**
         * gets a cursor signal point from the given curor signal and timestamp
         *
         * @private
         * @param {CursorSignal} cursorSignal
         * @param {number} cursorTimestamp
         * @returns
         * @memberof CursorSignalsDataModel
         */
        CursorSignalsDataModel.prototype.getCursorSignalPoint = function (cursorSignal, cursorTimestamp) {
            var cursorPoint = point_1.Point.Empty();
            // get the nearest signal point for valid timestamps
            if (cursorTimestamp != undefined && cursorSignal.serie.timestampIsInRange(cursorTimestamp)) {
                cursorPoint = cursorSignal.serie.previousPointFromTimestamp(cursorTimestamp);
            }
            return cursorPoint;
        };
        /**
         * Clears all the cursor value informations of this signal
         *
         * @param {CursorSignal} cursorSignal
         * @memberof CursorSignalsDataModel
         */
        CursorSignalsDataModel.prototype.clearCursorValues = function (cursorSignal) {
            cursorSignal.clearValues();
        };
        /**
         * updates the cursor info values corresponding to the given cursor state values
         *
         * @param {CursorStates} modifiedState
         * @memberof CursorSignalsDataModel
         */
        CursorSignalsDataModel.prototype.updateInfoCursorsWithNewCursorStateValues = function (currentCursorStates) {
            var _this = this;
            this._currentCursorStates = currentCursorStates;
            this.getCursorSignals().forEach(function (cursorSignal) {
                if (cursorSignal.serie.rawPointsValid) {
                    var cursorType = cursorType_1.CursorTypeHelper.getCursorTypeForSeries(cursorSignal.serie);
                    _this.updateCursorValues(cursorSignal, _this._currentCursorStates.getPosition(0, cursorType), _this._currentCursorStates.getPosition(1, cursorType));
                }
                else {
                    _this.clearCursorValues(cursorSignal);
                }
            });
        };
        CursorSignalsDataModel.prototype.onSerieDataChanged = function (sender, args) {
            var _a, _b;
            if (args.action == eventSerieDataChangedArgs_1.SerieAction.rename || args.action == eventSerieDataChangedArgs_1.SerieAction.dataPointsChanged
                || args.action == eventSerieDataChangedArgs_1.SerieAction.startTriggerTimeChanged || args.action == eventSerieDataChangedArgs_1.SerieAction.colorChanged) {
                // if the datapoints have changed, then the cursor values must be updated
                if (args.action == eventSerieDataChangedArgs_1.SerieAction.dataPointsChanged) {
                    var cursorSignal = this.getCursorSignal(sender);
                    if (cursorSignal != undefined) {
                        var cursorType = cursorType_1.CursorTypeHelper.getCursorTypeForSeries(cursorSignal.serie);
                        this.updateCursorValues(cursorSignal, (_a = this._currentCursorStates) === null || _a === void 0 ? void 0 : _a.getPosition(0, cursorType), (_b = this._currentCursorStates) === null || _b === void 0 ? void 0 : _b.getPosition(1, cursorType));
                    }
                }
                this.onModelChanged();
            }
        };
        CursorSignalsDataModel.prototype.onModelChanged = function () {
            this.eventModelChanged.raise(this, null);
            this.saveSettings();
        };
        /**
         * Save settings in cursor dataModel
         *
         * @memberof CursorSignalsDataModel
         */
        CursorSignalsDataModel.prototype.saveSettings = function () {
            if (this._isPersistEnabled) {
                this.component.saveComponentSettings();
            }
        };
        return CursorSignalsDataModel;
    }());
    exports.CursorSignalsDataModel = CursorSignalsDataModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29yU2lnbmFsc0RhdGFNb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jdXJzb3JJbmZvV2lkZ2V0L21vZGVsL2N1cnNvclNpZ25hbHNEYXRhTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQXVCQTtRQUFnQyxxQ0FBd0M7UUFBeEU7O1FBQTBFLENBQUM7UUFBRCx3QkFBQztJQUFELENBQUMsQUFBM0UsQ0FBZ0MsbUJBQVUsR0FBaUM7SUFBQSxDQUFDO0lBRTVFO1FBY0k7WUFBQSxpQkFFQztZQVpPLHNCQUFpQixHQUFZLEtBQUssQ0FBQztZQUUzQyxzQkFBaUIsR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUM7WUFFcEMsbUJBQWMsR0FBd0IsSUFBSyxLQUFLLEVBQWdCLENBQUM7WUFJakUsNkJBQXdCLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQztRQUl2RixDQUFDO1FBRUQsMkNBQVUsR0FBVjtZQUNJLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUN2QyxrREFBa0Q7WUFDbEQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztRQUNsQyxDQUFDO1FBRUQsb0RBQW1CLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLHVEQUEwQixFQUFFLENBQUMsQ0FBQztRQUMxRSxDQUFDO1FBRUQsd0NBQU8sR0FBUDtRQUNBLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLGlEQUFnQixHQUF2QjtZQUNJLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUMvQixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksZ0RBQWUsR0FBdEIsVUFBdUIsS0FBaUI7WUFDcEMs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SSxDQUFDLG9CQUFvQiwwQ0FBRSxXQUFXLENBQUMsQ0FBQyxFQUFFLFVBQVUsU0FBRyxJQUFJLENBQUMsb0JBQW9CLDBDQUFFLFdBQVcsQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUM7cUJBQ3ZKO2lCQUNKO2dCQUNELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUN6QjtRQUNMLENBQUM7UUFFTywrQ0FBYyxHQUF0QjtZQUNJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixDQUFDO1FBRUQ7Ozs7V0FJRztRQUNJLDZDQUFZLEdBQW5CO1lBQ0ksSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLEVBQUUsQ0FBQzthQUMxQztRQUNMLENBQUM7UUFDTCw2QkFBQztJQUFELENBQUMsQUExUUQsSUEwUUM7SUExUVksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jb21tb24vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2ludGVyZmFjZXMvY29tcG9uZW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTZXJpZXNQcm92aWRlciB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY29tbW9uL3Nlcmllc1Byb3ZpZGVyL3Nlcmllc1Byb3ZpZGVySW50ZXJmYWNlXCI7XHJcblxyXG5pbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY29tbW9uL3Nlcmllcy9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IFNlcmllQWN0aW9uLCBFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jb21tb24vc2VyaWVzL2V2ZW50U2VyaWVEYXRhQ2hhbmdlZEFyZ3NcIjtcclxuaW1wb3J0IHsgQ3Vyc29yU2lnbmFsIH0gZnJvbSBcIi4vY3Vyc29yU2lnbmFsXCI7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jb21tb24vcG9pbnRcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY29tbW9uL3Nlcmllcy9zZXJpZXNUeXBlXCI7XHJcbmltcG9ydCB7IFlUQ3Vyc29yU2lnbmFsIH0gZnJvbSBcIi4veXRDdXJzb3JTaWduYWxcIjtcclxuaW1wb3J0IHsgWFlDdXJzb3JTaWduYWwgfSBmcm9tIFwiLi94eUN1cnNvclNpZ25hbFwiO1xyXG5pbXBvcnQgeyBGRlRDdXJzb3JTaWduYWwgfSBmcm9tIFwiLi9mZnRDdXJzb3JTaWduYWxcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50QmFzZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRCYXNlXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uIH0gZnJvbSBcIi4vY29tcG9uZW50RGVmYXVsdERlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQ3Vyc29ySW5mb1Zpc2liaWxpdHkgfSBmcm9tIFwiLi9jdXJzb3JJbmZvVmlzaWJpbGl0eVwiO1xyXG5pbXBvcnQgeyBJU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvc2V0dGluZ3NJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2V0dGluZ0lkcyB9IGZyb20gXCIuL3NldHRpbmdJZHNcIjtcclxuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL3NldHRpbmdzXCI7XHJcbmltcG9ydCB7IEN1cnNvclR5cGVIZWxwZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3N0YXRlcy9jdXJzb3JUeXBlXCI7XHJcbmltcG9ydCB7IEN1cnNvclN0YXRlcyB9IGZyb20gXCIuLi8uLi9jb21tb24vc3RhdGVzL2N1cnNvclN0YXRlc1wiO1xyXG5cclxuY2xhc3MgRXZlbnRNb2RlbENoYW5nZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PEN1cnNvclNpZ25hbHNEYXRhTW9kZWwsIG51bGw+eyB9O1xyXG5cclxuZXhwb3J0IGNsYXNzIEN1cnNvclNpZ25hbHNEYXRhTW9kZWwgaW1wbGVtZW50cyBJQ29tcG9uZW50e1xyXG4gICAgXHJcbiAgICBwdWJsaWMgY29tcG9uZW50ITogQ29tcG9uZW50QmFzZTtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfaXNQZXJzaXN0RW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGV2ZW50TW9kZWxDaGFuZ2VkID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkKCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfY3Vyc29yU2lnbmFsczogQXJyYXk8Q3Vyc29yU2lnbmFsPiA9IG5ldyAgQXJyYXk8Q3Vyc29yU2lnbmFsPigpO1xyXG5cclxuICAgIHByaXZhdGUgX2N1cnJlbnRDdXJzb3JTdGF0ZXM6IEN1cnNvclN0YXRlc3x1bmRlZmluZWQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfc2VyaWVEYXRhQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpPT50aGlzLm9uU2VyaWVEYXRhQ2hhbmdlZChzZW5kZXIsYXJncyk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZSgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmxvYWRDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgICAgIC8vV2hlbiB3aWRnZXQgaXMgaW5pdGlhbGl6ZWQgZGF0YSBjYW4gYmUgcGVyc2lzdGVkXHJcbiAgICAgICAgdGhpcy5faXNQZXJzaXN0RW5hYmxlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXREZWZhdWx0RGVmaW5pdGlvbihuZXcgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcG9zZSgpe1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbGlzdCB3aXRoIHRoZSBjdXJzb3Igc2lnbmFscyBmb3IgdGhlIGN1cnNvciBpbmZvIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxDdXJzb3JTaWduYWw+fVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclNpZ25hbHNEYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEN1cnNvclNpZ25hbHMoKTogQXJyYXk8Q3Vyc29yU2lnbmFsPntcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3Vyc29yU2lnbmFscztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICBSZXR1cm5zIHRoZSBDdXJzb3JTaWduYWwgd2hpY2ggbGlua3MgdG8gdGhlIGdpdmVuIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAgICogQHJldHVybnMgeyhDdXJzb3JTaWduYWx8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTaWduYWxzRGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRDdXJzb3JTaWduYWwoc2VyaWU6IEJhc2VTZXJpZXMpOiBDdXJzb3JTaWduYWx8dW5kZWZpbmVke1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgdGhpcy5fY3Vyc29yU2lnbmFscy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2N1cnNvclNpZ25hbHNbaV0uc2VyaWUuaWQgPT09IHNlcmllLmlkKXtcclxuICAgICAgICAgICAgICAgIC8vIHNlcmllIGFscmVhZHkgaW4gbGlzdFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnNvclNpZ25hbHNbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgY3Vyc29yU2lnbmFsIGluIHRoZSBkYXRhbW9kZWwgZWxzZSAtMSBpZiBub3QgZm91bmRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclNpZ25hbH0gY3Vyc29yU2lnbmFsXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclNpZ25hbHNEYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEluZGV4KGN1cnNvclNpZ25hbDogQ3Vyc29yU2lnbmFsKTogbnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJzb3JTaWduYWxzLmluZGV4T2YoY3Vyc29yU2lnbmFsKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q29tcG9uZW50U2V0dGluZ3Mob25seU1vZGlmaWVkOiBib29sZWFuKTogQ29tcG9uZW50U2V0dGluZ3N7XHJcbiAgICAgICAgbGV0IGN1cnNvclNpZ25hbHNEYXRhID0gbmV3IEFycmF5PElTZXR0aW5ncz4oKTtcclxuICAgICAgICBmb3IobGV0IGkgPTA7IGkgPCB0aGlzLl9jdXJzb3JTaWduYWxzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgY3Vyc29yU2lnbmFsc0RhdGEucHVzaCh0aGlzLl9jdXJzb3JTaWduYWxzW2ldLmdldFNldHRpbmdzKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXRTZXR0aW5nKFwiY3Vyc29yU2lnbmFsc0RhdGFcIiwgY3Vyc29yU2lnbmFsc0RhdGEpO1xyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudFNldHRpbmdzKG9ubHlNb2RpZmllZCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0Q29tcG9uZW50U2V0dGluZ3MoY29tcG9uZW50U2V0dGluZ3M6IENvbXBvbmVudFNldHRpbmdzKSB7XHJcbiAgICAgICAgaWYoY29tcG9uZW50U2V0dGluZ3MgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0Q29tcG9uZW50U2V0dGluZ3MoY29tcG9uZW50U2V0dGluZ3MpO1xyXG4gICAgICAgICAgICBsZXQgY3Vyc29yU2lnbmFsc0RhdGE6IEFycmF5PElTZXR0aW5ncz4gPSB0aGlzLmNvbXBvbmVudC5nZXRTZXR0aW5nKFwiY3Vyc29yU2lnbmFsc0RhdGFcIik7XHJcblxyXG4gICAgICAgICAgICBpZihjdXJzb3JTaWduYWxzRGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgLy9XZSBhZGQgdGhlIHNlcmllcyBmcm9tIGJvdHRvbSB0byB0b3AuIEluIHRoZSBjdXJzb3JJbmZvV2lkZ2V0LCB0aGUgbGFzdCBzZXJpZSB3ZSBpbnNlcnQgaXMgYWx3YXlzIHBsYWNlZCBvbiB0b3AuXHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSBjdXJzb3JTaWduYWxzRGF0YS5sZW5ndGggLTE7IGkgPiAtMTsgaS0tKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY3Vyc29yU2lnbmFsRGF0YTogSVNldHRpbmdzID0gY3Vyc29yU2lnbmFsc0RhdGFbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNldHRpbmdzID0gU2V0dGluZ3MuY3JlYXRlKGN1cnNvclNpZ25hbERhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzZXJpZXMgPSBuZXcgQXJyYXk8QmFzZVNlcmllcz4oKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2VyaWUgPSB0aGlzLmdldFNlcmllRnJvbVByb3ZpZGVyKHNldHRpbmdzLmdldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVJZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcmllcy5wdXNoKHNlcmllKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTZXJpZXMoc2VyaWVzLCBzZXR0aW5ncy5nZXRWYWx1ZShTZXR0aW5nSWRzLkV4cGFuZFN0YXRlKSwgc2V0dGluZ3MuZ2V0VmFsdWUoU2V0dGluZ0lkcy5DdXJzb3JJbmZvKSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKCk7ICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRTZXJpZUZyb21Qcm92aWRlcihpZDogc3RyaW5nKTogQmFzZVNlcmllc3x1bmRlZmluZWR7XHJcbiAgICAgICAgbGV0IHNlcmllc1Byb3ZpZGVyID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KCBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5TZXJpZXNQcm92aWRlcklkKSBhcyBJU2VyaWVzUHJvdmlkZXI7XHJcbiAgICAgICAgaWYoc2VyaWVzUHJvdmlkZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHNlcmllc1Byb3ZpZGVyLmdldChpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRTZXJpZXMoc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPiwgZXhwYW5kU3RhdGU6IGJvb2xlYW4sIGN1cnNvckluZm86IEFycmF5PEN1cnNvckluZm9WaXNpYmlsaXR5Pil7XHJcbiAgICAgICAgbGV0IGN1cnNvclNpZ25hbHMgPSBuZXcgQXJyYXk8Q3Vyc29yU2lnbmFsPigpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VyaWVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYgKHNlcmllc1tpXS50eXBlID09PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMpIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvclNpZ25hbHMucHVzaChuZXcgWVRDdXJzb3JTaWduYWwoc2VyaWVzW2ldLCBleHBhbmRTdGF0ZSwgY3Vyc29ySW5mbykpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlcmllc1tpXS50eXBlID09PSBTZXJpZXNUeXBlLnh5U2VyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JTaWduYWxzLnB1c2gobmV3IFhZQ3Vyc29yU2lnbmFsKHNlcmllc1tpXSwgZXhwYW5kU3RhdGUsIGN1cnNvckluZm8pKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzZXJpZXNbaV0udHlwZSA9PT0gU2VyaWVzVHlwZS5mZnRTZXJpZXMpIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvclNpZ25hbHMucHVzaChuZXcgRkZUQ3Vyc29yU2lnbmFsKHNlcmllc1tpXSwgZXhwYW5kU3RhdGUsIGN1cnNvckluZm8pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkZFNpZ25hbChjdXJzb3JTaWduYWxzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgdGhlIGdpdmVuIHNpZ25hbCB0byB0aGUgc2lnbmFsIGxpc3RcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEN1cnNvclNpZ25hbD59IGN1cnNvclNpZ25hbFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTaWduYWxzRGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRTaWduYWwoY3Vyc29yU2lnbmFsOiBBcnJheTxDdXJzb3JTaWduYWw+KXtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN1cnNvclNpZ25hbC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuX2N1cnNvclNpZ25hbHMuaW5kZXhPZihjdXJzb3JTaWduYWxbaV0pO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgLy8gY3Vzb3JTaWduYWwgYWxyZWFkeSBpbiBsaXN0XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9DaGVjayBpZiBzZXJpZSBpcyBub3QgaW4gdGhlIGxpc3RcclxuICAgICAgICAgICAgaWYodGhpcy5nZXRDdXJzb3JTaWduYWwoY3Vyc29yU2lnbmFsW2ldLnNlcmllKSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yU2lnbmFsW2ldLnNlcmllLmV2ZW50RGF0YUNoYW5nZWQuYXR0YWNoKHRoaXMuX3NlcmllRGF0YUNoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnNvclNpZ25hbHMuc3BsaWNlKDAsIDAsIGN1cnNvclNpZ25hbFtpXSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKCk7ICBcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIHRoZSBnaXZlbiBzaWduYWwgZnJvbSB0aGUgc2lnbmFsIGxpc3RcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclNpZ25hbH0gY3Vyc29yU2lnbmFsXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlU2VyaWUoY3Vyc29yU2lnbmFsOiBDdXJzb3JTaWduYWwpe1xyXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuX2N1cnNvclNpZ25hbHMuaW5kZXhPZihjdXJzb3JTaWduYWwpO1xyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnNvclNpZ25hbHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgY3Vyc29yU2lnbmFsLnNlcmllLmV2ZW50RGF0YUNoYW5nZWQuZGV0YWNoKHRoaXMuX3NlcmllRGF0YUNoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCgpOyAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBjdXJzb3IgaW5mb3JtYXRpb25zIGZvciB0aGUgZ2l2ZW4gc2lnbmFsIHRvIHRoZSBkZWZpbmVkIGN1cnNvckluZGV4IDEgYW5kIDJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JTaWduYWx9IGN1cnNvclNpZ25hbFxyXG4gICAgICogQHBhcmFtIHsobnVtYmVyfHVuZGVmaW5lZCl9IGN1cnNvclRpbWVzdGFtcDFcclxuICAgICAqIEBwYXJhbSB7KG51bWJlcnx1bmRlZmluZWQpfSBjdXJzb3JUaW1lc3RhbXAyXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclNpZ25hbHNEYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVDdXJzb3JWYWx1ZXMoY3Vyc29yU2lnbmFsOkN1cnNvclNpZ25hbCwgY3Vyc29yVGltZXN0YW1wMTogbnVtYmVyfHVuZGVmaW5lZCwgY3Vyc29yVGltZXN0YW1wMjogbnVtYmVyfHVuZGVmaW5lZCl7XHJcbiAgICAgICAgaWYgKCFjdXJzb3JTaWduYWwuc2VyaWUucmF3UG9pbnRzVmFsaWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY3Vyc29yUG9pbnQxOiBJUG9pbnR8dW5kZWZpbmVkO1xyXG4gICAgICAgIGxldCBjdXJzb3JQb2ludDI6IElQb2ludHx1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYoY3Vyc29yVGltZXN0YW1wMSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjdXJzb3JQb2ludDEgPSB0aGlzLmdldEN1cnNvclNpZ25hbFBvaW50KGN1cnNvclNpZ25hbCwgY3Vyc29yVGltZXN0YW1wMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGN1cnNvclRpbWVzdGFtcDIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgY3Vyc29yUG9pbnQyID0gdGhpcy5nZXRDdXJzb3JTaWduYWxQb2ludChjdXJzb3JTaWduYWwsIGN1cnNvclRpbWVzdGFtcDIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdXJzb3JTaWduYWwudXBkYXRlVmFsdWVzKGN1cnNvclBvaW50MSwgY3Vyc29yUG9pbnQyLCBjdXJzb3JUaW1lc3RhbXAxLCBjdXJzb3JUaW1lc3RhbXAyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgYSBjdXJzb3Igc2lnbmFsIHBvaW50IGZyb20gdGhlIGdpdmVuIGN1cm9yIHNpZ25hbCBhbmQgdGltZXN0YW1wXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yU2lnbmFsfSBjdXJzb3JTaWduYWxcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JUaW1lc3RhbXBcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEN1cnNvclNpZ25hbFBvaW50KGN1cnNvclNpZ25hbDogQ3Vyc29yU2lnbmFsLCBjdXJzb3JUaW1lc3RhbXA6IG51bWJlcik6SVBvaW50IHtcclxuICAgICAgICBsZXQgY3Vyc29yUG9pbnQ6SVBvaW50ID0gUG9pbnQuRW1wdHkoKTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBuZWFyZXN0IHNpZ25hbCBwb2ludCBmb3IgdmFsaWQgdGltZXN0YW1wc1xyXG4gICAgICAgIGlmIChjdXJzb3JUaW1lc3RhbXAgIT0gdW5kZWZpbmVkICYmIGN1cnNvclNpZ25hbC5zZXJpZS50aW1lc3RhbXBJc0luUmFuZ2UoY3Vyc29yVGltZXN0YW1wKSkge1xyXG4gICAgICAgICAgICBjdXJzb3JQb2ludCA9ICBjdXJzb3JTaWduYWwuc2VyaWUucHJldmlvdXNQb2ludEZyb21UaW1lc3RhbXAoY3Vyc29yVGltZXN0YW1wKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjdXJzb3JQb2ludDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsZWFycyBhbGwgdGhlIGN1cnNvciB2YWx1ZSBpbmZvcm1hdGlvbnMgb2YgdGhpcyBzaWduYWxcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclNpZ25hbH0gY3Vyc29yU2lnbmFsXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xlYXJDdXJzb3JWYWx1ZXMoY3Vyc29yU2lnbmFsOiBDdXJzb3JTaWduYWwpe1xyXG4gICAgICAgIGN1cnNvclNpZ25hbC5jbGVhclZhbHVlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlcyB0aGUgY3Vyc29yIGluZm8gdmFsdWVzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGdpdmVuIGN1cnNvciBzdGF0ZSB2YWx1ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclN0YXRlc30gbW9kaWZpZWRTdGF0ZVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclNpZ25hbHNEYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVwZGF0ZUluZm9DdXJzb3JzV2l0aE5ld0N1cnNvclN0YXRlVmFsdWVzKGN1cnJlbnRDdXJzb3JTdGF0ZXM6IEN1cnNvclN0YXRlcyl7XHJcbiAgICAgICAgdGhpcy5fY3VycmVudEN1cnNvclN0YXRlcyA9IGN1cnJlbnRDdXJzb3JTdGF0ZXM7XHJcbiAgICAgICAgdGhpcy5nZXRDdXJzb3JTaWduYWxzKCkuZm9yRWFjaCgoY3Vyc29yU2lnbmFsOiBDdXJzb3JTaWduYWwpPT57XHJcbiAgICAgICAgICAgIGlmKGN1cnNvclNpZ25hbC5zZXJpZS5yYXdQb2ludHNWYWxpZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3Vyc29yVHlwZSA9IEN1cnNvclR5cGVIZWxwZXIuZ2V0Q3Vyc29yVHlwZUZvclNlcmllcyhjdXJzb3JTaWduYWwuc2VyaWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDdXJzb3JWYWx1ZXMoY3Vyc29yU2lnbmFsLCB0aGlzLl9jdXJyZW50Q3Vyc29yU3RhdGVzIS5nZXRQb3NpdGlvbigwLCBjdXJzb3JUeXBlKSwgdGhpcy5fY3VycmVudEN1cnNvclN0YXRlcyEuZ2V0UG9zaXRpb24oMSwgY3Vyc29yVHlwZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQ3Vyc29yVmFsdWVzKGN1cnNvclNpZ25hbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBvblNlcmllRGF0YUNoYW5nZWQoc2VuZGVyOiBCYXNlU2VyaWVzLCBhcmdzOiBFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzKXtcclxuICAgICAgICBpZihhcmdzLmFjdGlvbiA9PSBTZXJpZUFjdGlvbi5yZW5hbWUgfHwgYXJncy5hY3Rpb24gPT0gU2VyaWVBY3Rpb24uZGF0YVBvaW50c0NoYW5nZWQgXHJcbiAgICAgICAgICAgIHx8IGFyZ3MuYWN0aW9uID09IFNlcmllQWN0aW9uLnN0YXJ0VHJpZ2dlclRpbWVDaGFuZ2VkIHx8IGFyZ3MuYWN0aW9uID09IFNlcmllQWN0aW9uLmNvbG9yQ2hhbmdlZCl7XHJcbiAgICAgICAgICAgIC8vIGlmIHRoZSBkYXRhcG9pbnRzIGhhdmUgY2hhbmdlZCwgdGhlbiB0aGUgY3Vyc29yIHZhbHVlcyBtdXN0IGJlIHVwZGF0ZWRcclxuICAgICAgICAgICAgaWYoYXJncy5hY3Rpb24gPT0gU2VyaWVBY3Rpb24uZGF0YVBvaW50c0NoYW5nZWQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1cnNvclNpZ25hbCA9IHRoaXMuZ2V0Q3Vyc29yU2lnbmFsKHNlbmRlcik7XHJcbiAgICAgICAgICAgICAgICBpZihjdXJzb3JTaWduYWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY3Vyc29yVHlwZSA9IEN1cnNvclR5cGVIZWxwZXIuZ2V0Q3Vyc29yVHlwZUZvclNlcmllcyhjdXJzb3JTaWduYWwuc2VyaWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ3Vyc29yVmFsdWVzKGN1cnNvclNpZ25hbCwgdGhpcy5fY3VycmVudEN1cnNvclN0YXRlcz8uZ2V0UG9zaXRpb24oMCwgY3Vyc29yVHlwZSksIHRoaXMuX2N1cnJlbnRDdXJzb3JTdGF0ZXM/LmdldFBvc2l0aW9uKDEsIGN1cnNvclR5cGUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSAgIFxyXG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKCk7ICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbk1vZGVsQ2hhbmdlZCgpe1xyXG4gICAgICAgIHRoaXMuZXZlbnRNb2RlbENoYW5nZWQucmFpc2UodGhpcywgbnVsbCk7XHJcbiAgICAgICAgdGhpcy5zYXZlU2V0dGluZ3MoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNhdmUgc2V0dGluZ3MgaW4gY3Vyc29yIGRhdGFNb2RlbFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTaWduYWxzRGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzYXZlU2V0dGluZ3MoKXtcclxuICAgICAgICBpZiAodGhpcy5faXNQZXJzaXN0RW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5zYXZlQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=