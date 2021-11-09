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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "../../../framework/state", "./cursorState", "../../../common/persistence/settings", "./settingIds", "./cursorType", "../../../framework/reflection/decorators/metaClassPropertyDecorator"], function (require, exports, state_1, cursorState_1, settings_1, settingIds_1, cursorType_1, Reflection) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * holds cursor state objects
     * @singleton
     * @export
     * @class CursorStates
     */
    var CursorStates = /** @class */ (function (_super) {
        __extends(CursorStates, _super);
        /**
         * Creates an instance of CursorStates.
         * @memberof CursorStates
         */
        function CursorStates() {
            var _this = _super.call(this) || this;
            _this._type = "CursorStates"; // type of this class(normally the classname)
            // Set the persisting id where the CursorStates will be saved
            _this.id = "CursorStates"; // unique id of the instance
            // Create default cursor States
            var cursorState1 = new cursorState_1.CursorState(cursorType_1.CursorType.timeDomain);
            var cursorState2 = new cursorState_1.CursorState(cursorType_1.CursorType.timeDomain);
            var FFTcursorState1 = new cursorState_1.CursorState(cursorType_1.CursorType.frequencyDomain);
            var FFTcursorState2 = new cursorState_1.CursorState(cursorType_1.CursorType.frequencyDomain);
            _this._timeCursorStates = [cursorState1, cursorState2];
            _this._fftCursorStates = [FFTcursorState1, FFTcursorState2];
            _this._cursorStates = _this._timeCursorStates.concat(_this._fftCursorStates);
            // Select cursor 1 by default
            cursorState1.selected = true;
            _this.lastCursorTypeSelected = cursorType_1.CursorType.timeDomain;
            return _this;
        }
        /**
         * Disposes the object
         *
         * @memberof CursorStates
         */
        CursorStates.prototype.dispose = function () {
        };
        /**
         * Returns the current settings of this cursorStates object
         *
         * @returns {ISettings}
         * @memberof CursorStates
         */
        CursorStates.prototype.getSettings = function () {
            var settings = new settings_1.Settings(this._type), timePositions = Array(), timeActiveStates = Array(), fftPositions = Array(), fftActiveStates = Array();
            this._timeCursorStates.forEach(function (cursor) {
                timePositions.push(cursor.position);
                timeActiveStates.push(cursor.active);
            });
            this._fftCursorStates.forEach(function (cursor) {
                fftPositions.push(cursor.position);
                fftActiveStates.push(cursor.active);
            });
            //Persist position and active state
            settings.setValue(settingIds_1.SettingIds.TimeCursorPositions, timePositions);
            settings.setValue(settingIds_1.SettingIds.FftCursorPositions, fftPositions);
            settings.setValue(settingIds_1.SettingIds.TimeCursorActiveState, timeActiveStates);
            settings.setValue(settingIds_1.SettingIds.FftCursorActiveState, fftActiveStates);
            return settings;
        };
        /**
         * Sets the given settings to this cursorStates object
         *
         * @param {ISettings} settings
         * @memberof CursorStates
         */
        CursorStates.prototype.setSettings = function (settings) {
            var settingsObj = settings_1.Settings.create(settings), timePositions = settingsObj.getValue(settingIds_1.SettingIds.TimeCursorPositions), fftPositions = settingsObj.getValue(settingIds_1.SettingIds.FftCursorPositions), timeActiveStates = settingsObj.getValue(settingIds_1.SettingIds.TimeCursorActiveState), fftActiveStates = settingsObj.getValue(settingIds_1.SettingIds.FftCursorActiveState);
            for (var i = 0; i < timePositions.length; i++) {
                this._timeCursorStates[i].position = timePositions[i];
                this._timeCursorStates[i].active = timeActiveStates[i];
            }
            for (var i = 0; i < fftPositions.length; i++) {
                this._fftCursorStates[i].position = fftPositions[i];
                this._fftCursorStates[i].active = fftActiveStates[i];
            }
            this._cursorStates = this._timeCursorStates.concat(this._fftCursorStates);
        };
        /**
         * Returns a list of all available cursor states
         *
         * @returns {Array<ICursorState>}
         * @memberof CursorStates
         */
        CursorStates.prototype.getStates = function () {
            return this._cursorStates;
        };
        /**
         * Returns a list of all available time cursor states
         *
         * @returns {Array<ICursorState>}
         * @memberof CursorStates
         */
        CursorStates.prototype.getTimeStates = function () {
            return this._timeCursorStates;
        };
        /**
         * Returns a list of all available time cursor states
         *
         * @returns {Array<ICursorState>}
         * @memberof CursorStates
         */
        CursorStates.prototype.getFrequencyStates = function () {
            return this._fftCursorStates;
        };
        /**
         * Sets the active flag for the given index
         *
         * @param {number} cursorIndex
         * @param {boolean} active
         * @memberof CursorStates
         */
        CursorStates.prototype.setActive = function (cursorIndex, active) {
            if (this.getLastCursorTypeSelected() == cursorType_1.CursorType.timeDomain) {
                this._timeCursorStates[cursorIndex].active = active;
            }
            else if (this.getLastCursorTypeSelected() == cursorType_1.CursorType.frequencyDomain) {
                this._fftCursorStates[cursorIndex].active = active;
            }
        };
        /**
         * Returns the active flag for the given index
         *
         * @param {number} cursorIndex
         * @returns {boolean}
         * @memberof CursorStates
         */
        CursorStates.prototype.getActive = function (cursorIndex) {
            if (this.getLastCursorTypeSelected() == cursorType_1.CursorType.timeDomain) {
                return this._timeCursorStates[cursorIndex].active;
            }
            else if (this.getLastCursorTypeSelected() == cursorType_1.CursorType.frequencyDomain) {
                return this._fftCursorStates[cursorIndex].active;
            }
            return false;
        };
        /**
         * Reset cursor states
         *
         * @param {CursorType} type
         * @memberof CursorStates
         */
        CursorStates.prototype.resetCursorStates = function (type) {
            if (type === cursorType_1.CursorType.timeDomain) {
                this.resetTimeCursorStates();
            }
            else if (type === cursorType_1.CursorType.frequencyDomain) {
                this.resetFqCursorStates();
            }
        };
        /**
         * Reset time cursor states
         *
         * @private
         * @memberof CursorStates
         */
        CursorStates.prototype.resetTimeCursorStates = function () {
            this._timeCursorStates.forEach(function (state) {
                state.active = false;
                state.hovered = false;
                state.position = undefined;
            });
        };
        /**
         * Reset fq cursor states
         *
         * @private
         * @memberof CursorStates
         */
        CursorStates.prototype.resetFqCursorStates = function () {
            this._fftCursorStates.forEach(function (state) {
                state.active = false;
                state.hovered = false;
                state.position = undefined;
            });
        };
        /**
         * Sets the type of cursor that has been selected
         *
         * @param {CursorType} type
         * @memberof CursorStates
         */
        CursorStates.prototype.setLastCursorTypeSelected = function (type) {
            this.lastCursorTypeSelected = type;
        };
        /**
         * Gets the type of cursor that has been selected
         *
         * @returns {CursorType}
         * @memberof CursorStates
         */
        CursorStates.prototype.getLastCursorTypeSelected = function () {
            return this.lastCursorTypeSelected;
        };
        /**
         * Set hovered flag for the cursor with the given index, and remove hovered flag from all other cursors
         * if hovered = false and cursorIndex = -1, hovered will be set to false at all cursors
         *
         * @param {number} cursorIndex
         * @param {boolean} hovered
         * @memberof CursorStates
         */
        CursorStates.prototype.setHovered = function (cursorIndex, cursorType, hovered) {
            if (cursorIndex >= 0 && cursorIndex < this._cursorStates.length) {
                if (cursorType == cursorType_1.CursorType.timeDomain) {
                    this._timeCursorStates[cursorIndex].hovered = hovered;
                }
                else if (cursorType == cursorType_1.CursorType.frequencyDomain) {
                    this._fftCursorStates[cursorIndex].hovered = hovered;
                }
                if (hovered == true) {
                    // set all other cursors to hovered false
                    this.setOtherCursorsToFalse(cursorIndex, cursorType, 'hovered');
                }
            }
            else if (cursorIndex == -1 && hovered == false) {
                // Set all cursor hovered flags to false
                this._cursorStates.forEach(function (cursorState) {
                    cursorState.hovered = false;
                });
            }
        };
        /**
         * Returns the hovered flag for the given index
         *
         * @param {number} cursorIndex
         * @returns {boolean}
         * @memberof CursorStates
         */
        CursorStates.prototype.getHovered = function (cursorIndex) {
            return this._cursorStates[cursorIndex].hovered;
        };
        /**
         * Returns the index of a current hovered cursor or -1 if no hovered cursor is available
         *
         * @returns {number}
         * @memberof CursorStates
         */
        CursorStates.prototype.getHoveredCursorIndex = function () {
            var hoveredCursorIndex = -1;
            for (var index = 0; index < this._timeCursorStates.length; index++) {
                if (this._timeCursorStates[index].hovered == true) {
                    hoveredCursorIndex = index;
                }
            }
            for (var index = 0; index < this._fftCursorStates.length; index++) {
                if (this._fftCursorStates[index].hovered == true) {
                    hoveredCursorIndex = index;
                }
            }
            return hoveredCursorIndex;
        };
        /**
         * Sets the position of the cursor with the given index
         *
         * @param {number} cursorIndex
         * @param {number} position
         * @memberof CursorStates
         */
        CursorStates.prototype.setPosition = function (cursorIndex, position) {
            if (this.getLastCursorTypeSelected() == cursorType_1.CursorType.timeDomain) {
                this._timeCursorStates[cursorIndex].position = position;
            }
            else if (this.getLastCursorTypeSelected() == cursorType_1.CursorType.frequencyDomain) {
                this._fftCursorStates[cursorIndex].position = position;
            }
        };
        /**
         * Returns the position of the cursor with the given index
         *
         * @param {number} cursorIndex
         * @returns {(number|undefined)}
         * @memberof CursorStates
         */
        CursorStates.prototype.getPosition = function (cursorIndex, cursorType) {
            if (cursorType == cursorType_1.CursorType.timeDomain) {
                return this._timeCursorStates[cursorIndex].position;
            }
            else {
                return this._fftCursorStates[cursorIndex].position;
            }
        };
        /**
         * Returns the index of the current selected cursor or -1 if no selected cursor is available
         *
         * @returns {number}
         * @memberof CursorStates
         */
        CursorStates.prototype.getSelectedCursorIndex = function () {
            var selectedCursorIndex = -1;
            for (var i = 0; i < this._timeCursorStates.length; i++) {
                if (this._timeCursorStates[i].selected == true) {
                    selectedCursorIndex = i;
                }
            }
            for (var i = 0; i < this._fftCursorStates.length; i++) {
                if (this._fftCursorStates[i].selected == true) {
                    selectedCursorIndex = i;
                }
            }
            return selectedCursorIndex;
        };
        /**
         * Sets selected flag of the cursor with the given index(if true all other cursors will be set to deselected)
         *
         * @param {number} cursorIndex
         * @param {boolean} selected
         * @memberof CursorStates
         */
        CursorStates.prototype.setSelected = function (cursorIndex, selected) {
            if (this.getLastCursorTypeSelected() == cursorType_1.CursorType.frequencyDomain) {
                this._fftCursorStates[cursorIndex].selected = selected;
            }
            else if (this.getLastCursorTypeSelected() == cursorType_1.CursorType.timeDomain) {
                this._timeCursorStates[cursorIndex].selected = selected;
            }
            if (selected == true) {
                // set all other cursors to selected false
                this.setOtherCursorsToFalse(cursorIndex, this.getLastCursorTypeSelected(), 'selected');
            }
        };
        /**
         * Set the specified property to false for all the cursorStates except one
         *
         * @private
         * @param {number} cursorIndex
         * @param {CursorType} cursorType
         * @param {string} property
         * @memberof CursorStates
         */
        CursorStates.prototype.setOtherCursorsToFalse = function (cursorIndex, cursorType, property) {
            for (var i = 0; i < this._timeCursorStates.length; i++) {
                if (cursorType == cursorType_1.CursorType.timeDomain) {
                    this._fftCursorStates[i][property] = false;
                }
                else if (i != cursorIndex) {
                    this._fftCursorStates[i][property] = false;
                }
            }
            for (var i = 0; i < this._fftCursorStates.length; i++) {
                if (cursorType == cursorType_1.CursorType.frequencyDomain) {
                    this._timeCursorStates[i][property] = false;
                }
                else if (i != cursorIndex) {
                    this._timeCursorStates[i][property] = false;
                }
            }
        };
        CursorStates = __decorate([
            Reflection.metaClassProperty(Reflection.MetaClassProperties.persistable, true),
            Reflection.metaClassProperty(Reflection.MetaClassProperties.className, "CursorStates")
        ], CursorStates);
        return CursorStates;
    }(state_1.State));
    exports.CursorStates = CursorStates;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29yU3RhdGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NvbW1vbi9zdGF0ZXMvY3Vyc29yU3RhdGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFVQTs7Ozs7T0FLRztJQUdIO1FBQWtDLGdDQUFLO1FBbUJuQzs7O1dBR0c7UUFDSDtZQUFBLFlBQ0ksaUJBQU8sU0FlVjtZQTFCTyxXQUFLLEdBQVcsY0FBYyxDQUFDLENBQUMsNkNBQTZDO1lBRXJGLDZEQUE2RDtZQUN0RCxRQUFFLEdBQVcsY0FBYyxDQUFDLENBQUMsNEJBQTRCO1lBVTVELCtCQUErQjtZQUMvQixJQUFJLFlBQVksR0FBZ0IsSUFBSSx5QkFBVyxDQUFDLHVCQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdkUsSUFBSSxZQUFZLEdBQWdCLElBQUkseUJBQVcsQ0FBQyx1QkFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3ZFLElBQUksZUFBZSxHQUFnQixJQUFJLHlCQUFXLENBQUMsdUJBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUMvRSxJQUFJLGVBQWUsR0FBZ0IsSUFBSSx5QkFBVyxDQUFDLHVCQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7WUFFL0UsS0FBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQ3RELEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLGVBQWUsRUFBRSxlQUFlLENBQUMsQ0FBQztZQUMzRCxLQUFJLENBQUMsYUFBYSxHQUFHLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFMUUsNkJBQTZCO1lBQzdCLFlBQVksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQzdCLEtBQUksQ0FBQyxzQkFBc0IsR0FBRyx1QkFBVSxDQUFDLFVBQVUs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LEVBQUMsY0FBYyxDQUFDO1dBQ3pFLFlBQVksQ0E4WXhCO1FBQUQsbUJBQUM7S0FBQSxBQTlZRCxDQUFrQyxhQUFLLEdBOFl0QztJQTlZWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YXRlIH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9zdGF0ZVwiO1xyXG5pbXBvcnQgeyBDdXJzb3JTdGF0ZSB9IGZyb20gXCIuL2N1cnNvclN0YXRlXCI7XHJcbmltcG9ydCB7IElDdXJzb3JTdGF0ZSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2N1cnNvclN0YXRlSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9zZXR0aW5nc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGVyc2lzdGVuY2Uvc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgU2V0dGluZ0lkcyB9IGZyb20gXCIuL3NldHRpbmdJZHNcIjtcclxuaW1wb3J0IHsgQ3Vyc29yVHlwZSB9IGZyb20gXCIuL2N1cnNvclR5cGVcIjtcclxuaW1wb3J0ICogYXMgUmVmbGVjdGlvbiAgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9yZWZsZWN0aW9uL2RlY29yYXRvcnMvbWV0YUNsYXNzUHJvcGVydHlEZWNvcmF0b3JcIjtcclxuaW1wb3J0IHsgSVBlcnNpc3RlbmN5T2JqZWN0IH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3BlcnNpc3RlbmN5T2JqZWN0SW50ZXJmYWNlXCI7XHJcblxyXG4vKipcclxuICogaG9sZHMgY3Vyc29yIHN0YXRlIG9iamVjdHNcclxuICogQHNpbmdsZXRvblxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBDdXJzb3JTdGF0ZXNcclxuICovXHJcbkBSZWZsZWN0aW9uLm1ldGFDbGFzc1Byb3BlcnR5KFJlZmxlY3Rpb24uTWV0YUNsYXNzUHJvcGVydGllcy5wZXJzaXN0YWJsZSx0cnVlKSAgICAgIFxyXG5AUmVmbGVjdGlvbi5tZXRhQ2xhc3NQcm9wZXJ0eShSZWZsZWN0aW9uLk1ldGFDbGFzc1Byb3BlcnRpZXMuY2xhc3NOYW1lLFwiQ3Vyc29yU3RhdGVzXCIpXHJcbmV4cG9ydCBjbGFzcyBDdXJzb3JTdGF0ZXMgZXh0ZW5kcyBTdGF0ZSBpbXBsZW1lbnRzIElQZXJzaXN0ZW5jeU9iamVjdCB7XHJcblxyXG4gICAgLy8gaG9sZHMgdGltZSBjdXJzb3JzXHJcbiAgICBwcml2YXRlIF90aW1lQ3Vyc29yU3RhdGVzOiBBcnJheTxDdXJzb3JTdGF0ZT47XHJcblxyXG4gICAgLy9ob2xkcyBmZnQgY3Vyc29yc1xyXG4gICAgcHJpdmF0ZSBfZmZ0Q3Vyc29yU3RhdGVzOiBBcnJheTxDdXJzb3JTdGF0ZT47XHJcblxyXG4gICAgLy8gaG9sZHMgdGhlIGN1cnNvciBzdGF0ZXMgaW4gYW4gYXJyYXkgZm9yIGNvbnZlbmllbmNlIGFjY2Vzc1xyXG4gICAgcHJpdmF0ZSBfY3Vyc29yU3RhdGVzOiBBcnJheTxDdXJzb3JTdGF0ZT47XHJcblxyXG4gICAgcHJvdGVjdGVkIGxhc3RDdXJzb3JUeXBlU2VsZWN0ZWQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfdHlwZTogc3RyaW5nID0gXCJDdXJzb3JTdGF0ZXNcIjsgLy8gdHlwZSBvZiB0aGlzIGNsYXNzKG5vcm1hbGx5IHRoZSBjbGFzc25hbWUpXHJcblxyXG4gICAgLy8gU2V0IHRoZSBwZXJzaXN0aW5nIGlkIHdoZXJlIHRoZSBDdXJzb3JTdGF0ZXMgd2lsbCBiZSBzYXZlZFxyXG4gICAgcHVibGljIGlkOiBzdHJpbmcgPSBcIkN1cnNvclN0YXRlc1wiOyAvLyB1bmlxdWUgaWQgb2YgdGhlIGluc3RhbmNlXHJcbiAgICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ3Vyc29yU3RhdGVzLlxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclN0YXRlc1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgZGVmYXVsdCBjdXJzb3IgU3RhdGVzXHJcbiAgICAgICAgbGV0IGN1cnNvclN0YXRlMTogQ3Vyc29yU3RhdGUgPSBuZXcgQ3Vyc29yU3RhdGUoQ3Vyc29yVHlwZS50aW1lRG9tYWluKTtcclxuICAgICAgICBsZXQgY3Vyc29yU3RhdGUyOiBDdXJzb3JTdGF0ZSA9IG5ldyBDdXJzb3JTdGF0ZShDdXJzb3JUeXBlLnRpbWVEb21haW4pO1xyXG4gICAgICAgIGxldCBGRlRjdXJzb3JTdGF0ZTE6IEN1cnNvclN0YXRlID0gbmV3IEN1cnNvclN0YXRlKEN1cnNvclR5cGUuZnJlcXVlbmN5RG9tYWluKTtcclxuICAgICAgICBsZXQgRkZUY3Vyc29yU3RhdGUyOiBDdXJzb3JTdGF0ZSA9IG5ldyBDdXJzb3JTdGF0ZShDdXJzb3JUeXBlLmZyZXF1ZW5jeURvbWFpbik7XHJcblxyXG4gICAgICAgIHRoaXMuX3RpbWVDdXJzb3JTdGF0ZXMgPSBbY3Vyc29yU3RhdGUxLCBjdXJzb3JTdGF0ZTJdO1xyXG4gICAgICAgIHRoaXMuX2ZmdEN1cnNvclN0YXRlcyA9IFtGRlRjdXJzb3JTdGF0ZTEsIEZGVGN1cnNvclN0YXRlMl07XHJcbiAgICAgICAgdGhpcy5fY3Vyc29yU3RhdGVzID0gdGhpcy5fdGltZUN1cnNvclN0YXRlcy5jb25jYXQodGhpcy5fZmZ0Q3Vyc29yU3RhdGVzKTtcclxuXHJcbiAgICAgICAgLy8gU2VsZWN0IGN1cnNvciAxIGJ5IGRlZmF1bHRcclxuICAgICAgICBjdXJzb3JTdGF0ZTEuc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubGFzdEN1cnNvclR5cGVTZWxlY3RlZCA9IEN1cnNvclR5cGUudGltZURvbWFpbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2VzIHRoZSBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU3RhdGVzXHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY3VycmVudCBzZXR0aW5ncyBvZiB0aGlzIGN1cnNvclN0YXRlcyBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7SVNldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclN0YXRlc1xyXG4gICAgICovXHJcbiAgICBnZXRTZXR0aW5ncygpOiBJU2V0dGluZ3Mge1xyXG4gICAgICAgIGxldCBzZXR0aW5ncyA9IG5ldyBTZXR0aW5ncyh0aGlzLl90eXBlKSxcclxuICAgICAgICAgICAgdGltZVBvc2l0aW9ucyA9IEFycmF5KCksXHJcbiAgICAgICAgICAgIHRpbWVBY3RpdmVTdGF0ZXMgPSBBcnJheSgpLFxyXG4gICAgICAgICAgICBmZnRQb3NpdGlvbnMgPSBBcnJheSgpLFxyXG4gICAgICAgICAgICBmZnRBY3RpdmVTdGF0ZXMgPSBBcnJheSgpO1xyXG5cclxuICAgICAgICB0aGlzLl90aW1lQ3Vyc29yU3RhdGVzLmZvckVhY2goKGN1cnNvcikgPT4ge1xyXG4gICAgICAgICAgICB0aW1lUG9zaXRpb25zLnB1c2goY3Vyc29yLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgdGltZUFjdGl2ZVN0YXRlcy5wdXNoKGN1cnNvci5hY3RpdmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2ZmdEN1cnNvclN0YXRlcy5mb3JFYWNoKChjdXJzb3IpID0+IHtcclxuICAgICAgICAgICAgZmZ0UG9zaXRpb25zLnB1c2goY3Vyc29yLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgZmZ0QWN0aXZlU3RhdGVzLnB1c2goY3Vyc29yLmFjdGl2ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vUGVyc2lzdCBwb3NpdGlvbiBhbmQgYWN0aXZlIHN0YXRlXHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5UaW1lQ3Vyc29yUG9zaXRpb25zLCB0aW1lUG9zaXRpb25zKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLkZmdEN1cnNvclBvc2l0aW9ucywgZmZ0UG9zaXRpb25zKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLlRpbWVDdXJzb3JBY3RpdmVTdGF0ZSwgdGltZUFjdGl2ZVN0YXRlcyk7XHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5GZnRDdXJzb3JBY3RpdmVTdGF0ZSwgZmZ0QWN0aXZlU3RhdGVzKTtcclxuICAgICAgICByZXR1cm4gc2V0dGluZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBnaXZlbiBzZXR0aW5ncyB0byB0aGlzIGN1cnNvclN0YXRlcyBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lTZXR0aW5nc30gc2V0dGluZ3NcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTdGF0ZXNcclxuICAgICAqL1xyXG4gICAgc2V0U2V0dGluZ3Moc2V0dGluZ3M6IElTZXR0aW5ncykge1xyXG4gICAgICAgIGxldCBzZXR0aW5nc09iaiA9IFNldHRpbmdzLmNyZWF0ZShzZXR0aW5ncyksXHJcbiAgICAgICAgICAgIHRpbWVQb3NpdGlvbnMgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLlRpbWVDdXJzb3JQb3NpdGlvbnMpLFxyXG4gICAgICAgICAgICBmZnRQb3NpdGlvbnMgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLkZmdEN1cnNvclBvc2l0aW9ucyksXHJcbiAgICAgICAgICAgIHRpbWVBY3RpdmVTdGF0ZXMgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLlRpbWVDdXJzb3JBY3RpdmVTdGF0ZSksXHJcbiAgICAgICAgICAgIGZmdEFjdGl2ZVN0YXRlcyA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuRmZ0Q3Vyc29yQWN0aXZlU3RhdGUpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRpbWVQb3NpdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5fdGltZUN1cnNvclN0YXRlc1tpXS5wb3NpdGlvbiA9IHRpbWVQb3NpdGlvbnNbaV07XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVDdXJzb3JTdGF0ZXNbaV0uYWN0aXZlID0gdGltZUFjdGl2ZVN0YXRlc1tpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmZnRQb3NpdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5fZmZ0Q3Vyc29yU3RhdGVzW2ldLnBvc2l0aW9uID0gZmZ0UG9zaXRpb25zW2ldO1xyXG4gICAgICAgICAgICB0aGlzLl9mZnRDdXJzb3JTdGF0ZXNbaV0uYWN0aXZlID0gZmZ0QWN0aXZlU3RhdGVzW2ldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY3Vyc29yU3RhdGVzID0gdGhpcy5fdGltZUN1cnNvclN0YXRlcy5jb25jYXQodGhpcy5fZmZ0Q3Vyc29yU3RhdGVzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBsaXN0IG9mIGFsbCBhdmFpbGFibGUgY3Vyc29yIHN0YXRlc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJQ3Vyc29yU3RhdGU+fVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclN0YXRlc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0U3RhdGVzKCk6IEFycmF5PElDdXJzb3JTdGF0ZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJzb3JTdGF0ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBhbGwgYXZhaWxhYmxlIHRpbWUgY3Vyc29yIHN0YXRlc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJQ3Vyc29yU3RhdGU+fVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclN0YXRlc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0VGltZVN0YXRlcygpOiBBcnJheTxJQ3Vyc29yU3RhdGU+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGltZUN1cnNvclN0YXRlcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBsaXN0IG9mIGFsbCBhdmFpbGFibGUgdGltZSBjdXJzb3Igc3RhdGVzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5PElDdXJzb3JTdGF0ZT59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU3RhdGVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRGcmVxdWVuY3lTdGF0ZXMoKTogQXJyYXk8SUN1cnNvclN0YXRlPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZmdEN1cnNvclN0YXRlcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGFjdGl2ZSBmbGFnIGZvciB0aGUgZ2l2ZW4gaW5kZXhcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3Vyc29ySW5kZXhcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gYWN0aXZlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU3RhdGVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRBY3RpdmUoY3Vyc29ySW5kZXg6IG51bWJlciwgYWN0aXZlOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0TGFzdEN1cnNvclR5cGVTZWxlY3RlZCgpID09IEN1cnNvclR5cGUudGltZURvbWFpbikge1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lQ3Vyc29yU3RhdGVzW2N1cnNvckluZGV4XS5hY3RpdmUgPSBhY3RpdmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZ2V0TGFzdEN1cnNvclR5cGVTZWxlY3RlZCgpID09IEN1cnNvclR5cGUuZnJlcXVlbmN5RG9tYWluKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZmdEN1cnNvclN0YXRlc1tjdXJzb3JJbmRleF0uYWN0aXZlID0gYWN0aXZlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGFjdGl2ZSBmbGFnIGZvciB0aGUgZ2l2ZW4gaW5kZXhcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3Vyc29ySW5kZXhcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclN0YXRlc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0QWN0aXZlKGN1cnNvckluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5nZXRMYXN0Q3Vyc29yVHlwZVNlbGVjdGVkKCkgPT0gQ3Vyc29yVHlwZS50aW1lRG9tYWluKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90aW1lQ3Vyc29yU3RhdGVzW2N1cnNvckluZGV4XS5hY3RpdmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZ2V0TGFzdEN1cnNvclR5cGVTZWxlY3RlZCgpID09IEN1cnNvclR5cGUuZnJlcXVlbmN5RG9tYWluKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9mZnRDdXJzb3JTdGF0ZXNbY3Vyc29ySW5kZXhdLmFjdGl2ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzZXQgY3Vyc29yIHN0YXRlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yVHlwZX0gdHlwZVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclN0YXRlc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVzZXRDdXJzb3JTdGF0ZXModHlwZTogQ3Vyc29yVHlwZSkge1xyXG4gICAgICAgIGlmICh0eXBlID09PSBDdXJzb3JUeXBlLnRpbWVEb21haW4pIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldFRpbWVDdXJzb3JTdGF0ZXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gQ3Vyc29yVHlwZS5mcmVxdWVuY3lEb21haW4pIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldEZxQ3Vyc29yU3RhdGVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzZXQgdGltZSBjdXJzb3Igc3RhdGVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTdGF0ZXNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZXNldFRpbWVDdXJzb3JTdGF0ZXMoKSB7XHJcbiAgICAgICAgdGhpcy5fdGltZUN1cnNvclN0YXRlcy5mb3JFYWNoKChzdGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICBzdGF0ZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3RhdGUuaG92ZXJlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzdGF0ZS5wb3NpdGlvbiA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzZXQgZnEgY3Vyc29yIHN0YXRlc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU3RhdGVzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVzZXRGcUN1cnNvclN0YXRlcygpIHtcclxuICAgICAgICB0aGlzLl9mZnRDdXJzb3JTdGF0ZXMuZm9yRWFjaCgoc3RhdGUpID0+IHtcclxuICAgICAgICAgICAgc3RhdGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHN0YXRlLmhvdmVyZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3RhdGUucG9zaXRpb24gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHR5cGUgb2YgY3Vyc29yIHRoYXQgaGFzIGJlZW4gc2VsZWN0ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclR5cGV9IHR5cGVcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTdGF0ZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldExhc3RDdXJzb3JUeXBlU2VsZWN0ZWQodHlwZTogQ3Vyc29yVHlwZSkge1xyXG4gICAgICAgIHRoaXMubGFzdEN1cnNvclR5cGVTZWxlY3RlZCA9IHR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSB0eXBlIG9mIGN1cnNvciB0aGF0IGhhcyBiZWVuIHNlbGVjdGVkXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0N1cnNvclR5cGV9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU3RhdGVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRMYXN0Q3Vyc29yVHlwZVNlbGVjdGVkKCk6IEN1cnNvclR5cGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxhc3RDdXJzb3JUeXBlU2VsZWN0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgaG92ZXJlZCBmbGFnIGZvciB0aGUgY3Vyc29yIHdpdGggdGhlIGdpdmVuIGluZGV4LCBhbmQgcmVtb3ZlIGhvdmVyZWQgZmxhZyBmcm9tIGFsbCBvdGhlciBjdXJzb3JzXHJcbiAgICAgKiBpZiBob3ZlcmVkID0gZmFsc2UgYW5kIGN1cnNvckluZGV4ID0gLTEsIGhvdmVyZWQgd2lsbCBiZSBzZXQgdG8gZmFsc2UgYXQgYWxsIGN1cnNvcnNcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1cnNvckluZGV4XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGhvdmVyZWRcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTdGF0ZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldEhvdmVyZWQoY3Vyc29ySW5kZXg6IG51bWJlciwgY3Vyc29yVHlwZTogQ3Vyc29yVHlwZSB8IHVuZGVmaW5lZCwgaG92ZXJlZDogYm9vbGVhbikge1xyXG4gICAgICAgIGlmIChjdXJzb3JJbmRleCA+PSAwICYmIGN1cnNvckluZGV4IDwgdGhpcy5fY3Vyc29yU3RhdGVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBpZiAoY3Vyc29yVHlwZSA9PSBDdXJzb3JUeXBlLnRpbWVEb21haW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RpbWVDdXJzb3JTdGF0ZXNbY3Vyc29ySW5kZXhdLmhvdmVyZWQgPSBob3ZlcmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGN1cnNvclR5cGUgPT0gQ3Vyc29yVHlwZS5mcmVxdWVuY3lEb21haW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZmdEN1cnNvclN0YXRlc1tjdXJzb3JJbmRleF0uaG92ZXJlZCA9IGhvdmVyZWQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChob3ZlcmVkID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIC8vIHNldCBhbGwgb3RoZXIgY3Vyc29ycyB0byBob3ZlcmVkIGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldE90aGVyQ3Vyc29yc1RvRmFsc2UoY3Vyc29ySW5kZXgsIGN1cnNvclR5cGUhLCAnaG92ZXJlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGN1cnNvckluZGV4ID09IC0xICYmIGhvdmVyZWQgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgLy8gU2V0IGFsbCBjdXJzb3IgaG92ZXJlZCBmbGFncyB0byBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLl9jdXJzb3JTdGF0ZXMuZm9yRWFjaChjdXJzb3JTdGF0ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JTdGF0ZS5ob3ZlcmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGhvdmVyZWQgZmxhZyBmb3IgdGhlIGdpdmVuIGluZGV4XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1cnNvckluZGV4XHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTdGF0ZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEhvdmVyZWQoY3Vyc29ySW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJzb3JTdGF0ZXNbY3Vyc29ySW5kZXhdLmhvdmVyZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpbmRleCBvZiBhIGN1cnJlbnQgaG92ZXJlZCBjdXJzb3Igb3IgLTEgaWYgbm8gaG92ZXJlZCBjdXJzb3IgaXMgYXZhaWxhYmxlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTdGF0ZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEhvdmVyZWRDdXJzb3JJbmRleCgpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBob3ZlcmVkQ3Vyc29ySW5kZXggPSAtMTtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5fdGltZUN1cnNvclN0YXRlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3RpbWVDdXJzb3JTdGF0ZXNbaW5kZXhdLmhvdmVyZWQgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgaG92ZXJlZEN1cnNvckluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLl9mZnRDdXJzb3JTdGF0ZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9mZnRDdXJzb3JTdGF0ZXNbaW5kZXhdLmhvdmVyZWQgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgaG92ZXJlZEN1cnNvckluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGhvdmVyZWRDdXJzb3JJbmRleDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHBvc2l0aW9uIG9mIHRoZSBjdXJzb3Igd2l0aCB0aGUgZ2l2ZW4gaW5kZXhcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3Vyc29ySW5kZXhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwb3NpdGlvblxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclN0YXRlc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0UG9zaXRpb24oY3Vyc29ySW5kZXg6IG51bWJlciwgcG9zaXRpb246IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmdldExhc3RDdXJzb3JUeXBlU2VsZWN0ZWQoKSA9PSBDdXJzb3JUeXBlLnRpbWVEb21haW4pIHtcclxuICAgICAgICAgICAgdGhpcy5fdGltZUN1cnNvclN0YXRlc1tjdXJzb3JJbmRleF0ucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5nZXRMYXN0Q3Vyc29yVHlwZVNlbGVjdGVkKCkgPT0gQ3Vyc29yVHlwZS5mcmVxdWVuY3lEb21haW4pIHtcclxuICAgICAgICAgICAgdGhpcy5fZmZ0Q3Vyc29yU3RhdGVzW2N1cnNvckluZGV4XS5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHBvc2l0aW9uIG9mIHRoZSBjdXJzb3Igd2l0aCB0aGUgZ2l2ZW4gaW5kZXhcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3Vyc29ySW5kZXhcclxuICAgICAqIEByZXR1cm5zIHsobnVtYmVyfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU3RhdGVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRQb3NpdGlvbihjdXJzb3JJbmRleDogbnVtYmVyLCBjdXJzb3JUeXBlOiBDdXJzb3JUeXBlKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBpZiAoY3Vyc29yVHlwZSA9PSBDdXJzb3JUeXBlLnRpbWVEb21haW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RpbWVDdXJzb3JTdGF0ZXNbY3Vyc29ySW5kZXhdLnBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZmdEN1cnNvclN0YXRlc1tjdXJzb3JJbmRleF0ucG9zaXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGN1cnJlbnQgc2VsZWN0ZWQgY3Vyc29yIG9yIC0xIGlmIG5vIHNlbGVjdGVkIGN1cnNvciBpcyBhdmFpbGFibGVcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclN0YXRlc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0U2VsZWN0ZWRDdXJzb3JJbmRleCgpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBzZWxlY3RlZEN1cnNvckluZGV4ID0gLTE7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fdGltZUN1cnNvclN0YXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fdGltZUN1cnNvclN0YXRlc1tpXS5zZWxlY3RlZCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEN1cnNvckluZGV4ID0gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2ZmdEN1cnNvclN0YXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fZmZ0Q3Vyc29yU3RhdGVzW2ldLnNlbGVjdGVkID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ3Vyc29ySW5kZXggPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZWxlY3RlZEN1cnNvckluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyBzZWxlY3RlZCBmbGFnIG9mIHRoZSBjdXJzb3Igd2l0aCB0aGUgZ2l2ZW4gaW5kZXgoaWYgdHJ1ZSBhbGwgb3RoZXIgY3Vyc29ycyB3aWxsIGJlIHNldCB0byBkZXNlbGVjdGVkKVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JJbmRleFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBzZWxlY3RlZFxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclN0YXRlc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U2VsZWN0ZWQoY3Vyc29ySW5kZXg6IG51bWJlciwgc2VsZWN0ZWQ6IGJvb2xlYW4pIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0TGFzdEN1cnNvclR5cGVTZWxlY3RlZCgpID09IEN1cnNvclR5cGUuZnJlcXVlbmN5RG9tYWluKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZmdEN1cnNvclN0YXRlc1tjdXJzb3JJbmRleF0uc2VsZWN0ZWQgPSBzZWxlY3RlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5nZXRMYXN0Q3Vyc29yVHlwZVNlbGVjdGVkKCkgPT0gQ3Vyc29yVHlwZS50aW1lRG9tYWluKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVDdXJzb3JTdGF0ZXNbY3Vyc29ySW5kZXhdLnNlbGVjdGVkID0gc2VsZWN0ZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2VsZWN0ZWQgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAvLyBzZXQgYWxsIG90aGVyIGN1cnNvcnMgdG8gc2VsZWN0ZWQgZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5zZXRPdGhlckN1cnNvcnNUb0ZhbHNlKGN1cnNvckluZGV4LCB0aGlzLmdldExhc3RDdXJzb3JUeXBlU2VsZWN0ZWQoKSwgJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBzcGVjaWZpZWQgcHJvcGVydHkgdG8gZmFsc2UgZm9yIGFsbCB0aGUgY3Vyc29yU3RhdGVzIGV4Y2VwdCBvbmVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1cnNvckluZGV4XHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclR5cGV9IGN1cnNvclR5cGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclN0YXRlc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldE90aGVyQ3Vyc29yc1RvRmFsc2UoY3Vyc29ySW5kZXg6IG51bWJlciwgY3Vyc29yVHlwZTogQ3Vyc29yVHlwZSwgcHJvcGVydHk6IHN0cmluZykge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fdGltZUN1cnNvclN0YXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoY3Vyc29yVHlwZSA9PSBDdXJzb3JUeXBlLnRpbWVEb21haW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZmdEN1cnNvclN0YXRlc1tpXVtwcm9wZXJ0eV0gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChpICE9IGN1cnNvckluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9mZnRDdXJzb3JTdGF0ZXNbaV1bcHJvcGVydHldID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fZmZ0Q3Vyc29yU3RhdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChjdXJzb3JUeXBlID09IEN1cnNvclR5cGUuZnJlcXVlbmN5RG9tYWluKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90aW1lQ3Vyc29yU3RhdGVzW2ldW3Byb3BlcnR5XSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGkgIT0gY3Vyc29ySW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RpbWVDdXJzb3JTdGF0ZXNbaV1bcHJvcGVydHldID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==