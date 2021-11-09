define(["require", "exports", "../common/utilities/dataBox", "../common/utilities/objectx"], function (require, exports, dataBox_1, objectx_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implements a typed data link.
     *
     *
     *
     * @class Property
     * @template T
     */
    var Property = /** @class */ (function () {
        /**
         *Creates an instance of DataLink.
         *    @memberof Property
         */
        function Property(initialValue, valueReadRequest, valueWriteRequest, valueGetter) {
            if (valueGetter === void 0) { valueGetter = undefined; }
            // Holds the change notification callbacks    
            this._valueChangedCallbacks = [];
            // specifies a read response delegate called after a read has successfully been executed.
            this._readResponseDelegates = [];
            // specifies the read rejection delegates
            this._readRejectionResponseDelegates = [];
            // specifies a write response delegate called after a read has successfully been executed.
            this._writeResponseDelegate = undefined;
            // specifies a read response delegate called after a write request has  been rejected.
            this._writeResponseRejectionDelegate = undefined;
            // specifies the write rejection delegate
            this._writeRejectionResponseDelegate = undefined;
            // specifies the data link read request state
            this._readRequestState = PropertyRequestState.Ready;
            // specifies the data link read request state
            this._writeRequestState = PropertyRequestState.Ready;
            // holds observers
            this._observers = [];
            // holds accessors, meaning objects updating the property values
            this._accessors = [];
            this._valueReadRequestDelegate = valueReadRequest;
            this._valueWriteRequestDelegate = valueWriteRequest;
            this._value = initialValue;
            this._readRequestState = PropertyRequestState.Ready;
            this._writeRequestState = PropertyRequestState.Ready;
            this._valueGetter = valueGetter;
        }
        /**
         * Attaches an accessor instance.
         *
         * @param {object} accessorInstance
         * @memberof Property
         */
        Property.prototype.attachAccessor = function (accessorInstance) {
            this.addAccessor(accessorInstance);
        };
        /**
         * Adds an accessor
         *
         * @private
         * @param {object} caller
         * @memberof Property
         */
        Property.prototype.addAccessor = function (caller) {
            this.accessors.push(new PropertyClient(caller));
        };
        /**
         * Detaches the bound object as accessor
         *
         * @param {object} boundObject
         * @memberof Property
         */
        Property.prototype.detachAccessor = function (boundObject) {
            // remove the client object from the accessors list
            this.removeAccessor(boundObject);
        };
        /**
         * Removes an accessor instance
         *
         * @private
         * @param {object} boundObject
         * @memberof Property
         */
        Property.prototype.removeAccessor = function (boundObject) {
            this._accessors = this._accessors.filter(function (accessor) { return accessor.client != boundObject; });
        };
        /**
         * Attaches the caller as observer
         *
         * @param {object} caller
         * @memberof Property
         */
        Property.prototype.attachObserver = function (caller, propertyValueChangedDelegate, storeItemTypeConstructor) {
            if (storeItemTypeConstructor === void 0) { storeItemTypeConstructor = null; }
            // add the caller as observer
            this.addObserver(caller, propertyValueChangedDelegate);
            // get an initialization value.
            var initValue = this.getInitValue(storeItemTypeConstructor);
            // attach the change notification callback
            this.observePropertyValue(propertyValueChangedDelegate, storeItemTypeConstructor, initValue);
        };
        /**
         * Adds an observer instance
         *
         * @private
         * @param {object} caller
         * @param {T_PROPERTYCHANGED_HANDLER} propertyValueChangedDelegate
         * @memberof Property
         */
        Property.prototype.addObserver = function (caller, propertyValueChangedDelegate) {
            this.observers.push(new PropertyClient(caller, propertyValueChangedDelegate));
        };
        /**
         * Obseres the property value and calls the specified changed delegate after changes.
         *
         * @private
         * @param {T_PROPERTYCHANGED_HANDLER} propertyValueChangedDelegate
         * @memberof Property
         */
        Property.prototype.observePropertyValue = function (propertyValueChangedDelegate, storeItemTypeConstructor, initValue) {
            this.changed(propertyValueChangedDelegate, storeItemTypeConstructor, initValue);
        };
        /**
         * Detaches the bound object as accessor
         *
         * @param {object} boundObject
         * @memberof Property
         */
        Property.prototype.detachObserver = function (boundObject) {
            // get the observer client object
            var observerClient = this._observers.find(function (observer) { return observer.client === boundObject; });
            if (observerClient) {
                if (observerClient.valueChangedHandler) {
                    // remove the observers delegate from the changed notifications
                    this.removeValueChangedDelegate(observerClient.valueChangedHandler);
                    // remove the client object from the accessors list
                    this.removeObserver(observerClient);
                }
            }
        };
        /**
         * Removes an observer
         *
         * @private
         * @param {PropertyClient} observerClient
         * @memberof Property
         */
        Property.prototype.removeObserver = function (observerClient) {
            this._observers = this._observers.filter(function (observer) { return observer.client != observerClient.client; });
        };
        /**
         * Removes the specified value changed delagate
         *addval
         * @private
         * @param {PropertyClient} observerClient
         * @memberof Property
         */
        Property.prototype.removeValueChangedDelegate = function (valueChangedDelegate) {
            this._valueChangedCallbacks = this._valueChangedCallbacks.filter(function (vaueChangedHandler) { return vaueChangedHandler != valueChangedDelegate; });
        };
        /**
         * Returns true if the property is already observed by the specified instance
         *
         * @param {object} observer
         * @returns {boolean}
         * @memberof Property
         */
        Property.prototype.isObservedBy = function (observerInstance) {
            return this.observers.find(function (observer) { return observer.client === observerInstance; }) !== undefined;
        };
        /**
         * Returns true if the property is already registered to be accessed by the specified instance
         *
         * @param {object} accessor
         * @returns {boolean}
         * @memberof Property
         */
        Property.prototype.isAccessedBy = function (accessorInstance) {
            return this.accessors.find(function (accessor) { return accessor.client === accessorInstance; }) !== undefined;
        };
        Object.defineProperty(Property.prototype, "isAttached", {
            /**
             * Gets true if the property is attached, meaning accessed or observed.
             *
             * @readonly
             * @type {boolean}
             * @memberof Property
             */
            get: function () {
                return this.observers.length > 0 || this.accessors.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Property.prototype, "observers", {
            /**
             * Gets the properties observers
             *
             * @readonly
             * @type {Array<PropertyClient>}
             * @memberof Property
             */
            get: function () {
                return this._observers;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Property.prototype, "accessors", {
            /**
             * Gets the properties accessors
             *
             * @readonly
             * @type { Array<PropertyClient> }
             * @memberof Property
             */
            get: function () {
                return this._accessors;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Creates a new DataLink object with the specified type
         *
         * @static
         * @template T
         * @param {T} initialValue
         * @returns
         * @memberof Property
         */
        Property.create = function (initialValue, valueReadRequest, valueWriteRequest, valueGetter) {
            if (valueReadRequest === void 0) { valueReadRequest = undefined; }
            if (valueWriteRequest === void 0) { valueWriteRequest = undefined; }
            if (valueGetter === void 0) { valueGetter = undefined; }
            valueReadRequest = valueReadRequest ? valueReadRequest : Property.DEFAULT_READ_REQUEST_HANDLER;
            valueWriteRequest = valueWriteRequest ? valueWriteRequest : Property.DEFAULT_WRITE_REQUEST_HANDLER;
            valueGetter = valueGetter ? valueGetter : Property.DEFAULT_VALUE_GETTER;
            return new Property(initialValue, valueReadRequest, valueWriteRequest, valueGetter);
        };
        /**
         * Gets an init value for the property to be passed when attaching and updating the consumer the first time.
         *
         * @private
         * @param {(TStoreItemConstructor | null)} storeItemTypeConstructor
         * @returns
         * @memberof Property
         */
        Property.prototype.getInitValue = function (storeItemTypeConstructor) {
            // if there is a known type (storeItemConstructor) we use a copy of the existing instance as init value.
            return storeItemTypeConstructor ? Property.copyValue(this._value, storeItemTypeConstructor) : this._value;
        };
        Object.defineProperty(Property.prototype, "value", {
            /**
             * Gets the property object value.
             *
             * @type {T}
             * @memberof Property
             */
            get: function () {
                var value = this._value;
                // get the value via the value getter delegate, if defined. Otherwise use the original value.
                if (this._valueGetter) {
                    value = this._valueGetter(value);
                }
                return value;
            },
            /**
             * Sets the DataLink Objects value.
             *
             * @memberof Property
             */
            set: function (newValue) {
                var oldValue = this._value;
                this._value = newValue;
                this.onValueChanged(this._value, oldValue);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Updates the properties value.
         *
         * @param {*} newValue
         * @param {TStoreItemConstructor} propertyValueType
         * @memberof Property
         */
        Property.prototype.update = function (newValue, propertyValueType) {
            var oldValue = this._value;
            // update the value with a copy
            this._value = Property.copyValue(newValue, propertyValueType);
            // forward a value copy to the changed consumers ..
            var copiedValue = Property.copyValue(newValue, propertyValueType);
            // _value and the forwarded value need to be different instances (copies) to provide proper updating!
            this.onValueChanged(copiedValue, oldValue, propertyValueType);
        };
        /**
         * Called whenever the value has been set. Notifies listeners from a value change
         *
         * @param {T} _value
         * @returns {*}
         * @memberof Property
         */
        Property.prototype.onValueChanged = function (newValue, oldValue, propertyValueType) {
            if (propertyValueType === void 0) { propertyValueType = null; }
            // invoke the value changed callbacks
            this._valueChangedCallbacks.forEach(function (callback) { callback(newValue, oldValue); });
        };
        /**
         * Called whenever the property value has been changed
         *
         * @param {(newValue: T, oldValue: T) => void} onValueChangedCallBack
         * @param {(TStoreItemConstructor|null)} [propertyValueType=null] specefies the type of th property value.
         * @memberof Property
         */
        Property.prototype.changed = function (onValueChangedCallBack, propertyValueType, initValue) {
            if (propertyValueType === void 0) { propertyValueType = null; }
            if (initValue === void 0) { initValue = null; }
            if (!this._valueChangedCallbacks.includes(onValueChangedCallBack)) {
                // add the new handler
                this.addValueChangedDelegate(onValueChangedCallBack);
                // if there is already a value or init value available, we forward it to the new listener.
                var initialChangedValue = initValue ? initValue : this._value;
                if (initialChangedValue) {
                    this.onValueChanged(initialChangedValue, this._value, propertyValueType);
                }
            }
            else {
                console.error("Property change already observed by the same handler");
            }
        };
        /**
         * Adds the specified value changed delegate.
         *
         * @private
         * @param {T_PROPERTYCHANGED_HANDLER} onValueChangedDelegate
         * @memberof Property
         */
        Property.prototype.addValueChangedDelegate = function (onValueChangedDelegate) {
            this._valueChangedCallbacks.push(onValueChangedDelegate);
        };
        /**
         * Forces a refresh o the data links value
         *
         * @memberof Property
         */
        Property.prototype.read = function (readResponseDelegate, rejectionResponseDelegate) {
            // add a response delegate for every read caller. This makes sure, that more callers possibly from different components, receive the results as well !
            if (readResponseDelegate === void 0) { readResponseDelegate = undefined; }
            if (rejectionResponseDelegate === void 0) { rejectionResponseDelegate = undefined; }
            // add read request delegate 
            if (readResponseDelegate) {
                this._readResponseDelegates.push(readResponseDelegate);
            }
            // add read rejection delegate
            if (rejectionResponseDelegate) {
                this._readRejectionResponseDelegates.push(rejectionResponseDelegate);
            }
            // invoke the read request if not already running
            if (this._readRequestState === PropertyRequestState.Ready) {
                this.beginReadRequest();
            }
        };
        /**
         * Starts the request for reading a data links value. The method delgates the request to the callback if defined.
         *
         * @private
         * @memberof Property
         */
        Property.prototype.beginReadRequest = function () {
            this._readRequestState = PropertyRequestState.Pending;
            if (this._valueReadRequestDelegate) {
                this._valueReadRequestDelegate(this);
            }
        };
        /**
         * Called after a read request has been executed successfully
         *
         * @param {T} componentParameters
         * @memberof Property
         */
        Property.prototype.readRequestExecuted = function (readResult) {
            var _this = this;
            // update the data links value
            this.value = readResult;
            // recall response handler and pass the updated value
            this._readResponseDelegates.forEach(function (readResponseDelegate) {
                readResponseDelegate(_this.value);
            });
            // after processing the response calls, the current response list is obsolete!
            this.endReadRequest();
        };
        /**
         * Called after a read request has been rejetced
         *
         * @param {*} error
         * @memberof Property
         */
        Property.prototype.readRequestRejected = function (error) {
            // recall response handler and pass the updated value
            this._readRejectionResponseDelegates.forEach(function (readRejectionResponseDelegate) {
                readRejectionResponseDelegate(error);
            });
            this.endReadRequest();
        };
        /**
         * Terminates a read request
         *
         * @private
         * @memberof Property
         */
        Property.prototype.endReadRequest = function () {
            this._readResponseDelegates = [];
            this._readRequestState = PropertyRequestState.Ready;
        };
        /**
         * Forces a write of the data link value to the value provider
         *
         * @param {*} newValue
         * @param {(((writeResult:T)=>void)|undefined)} [writeResponseDelegate=undefined]
         * @memberof Property
         */
        Property.prototype.write = function (writeResponseDelegate, writeRejectionDelegate) {
            if (writeResponseDelegate === void 0) { writeResponseDelegate = undefined; }
            if (writeRejectionDelegate === void 0) { writeRejectionDelegate = undefined; }
            this._writeResponseDelegate = writeResponseDelegate;
            if (this._writeRequestState === PropertyRequestState.Ready) {
                this.beginWriteRequest();
            }
        };
        /**
         * Terminates the write request
         *
         * @private
         * @memberof Property
         */
        Property.prototype.endWriteRequest = function () {
            this._writeResponseDelegate = undefined;
            this._writeRequestState = PropertyRequestState.Ready;
        };
        /**
         * Starts the request for writing a data links value. The method delgates the request to the callback if defined.
         *
         * @param {*} newValue
         * @returns {*}
         * @memberof Property
         */
        Property.prototype.beginWriteRequest = function () {
            this._writeRequestState = PropertyRequestState.Pending;
            if (this._valueWriteRequestDelegate) {
                this._valueWriteRequestDelegate(this);
            }
        };
        /**
         * Called after a write request has been executed successfully
         *
         * @param {T} writeResult
         * @memberof Property
         */
        Property.prototype.writeRequestExecuted = function (writeResult) {
            // recall response handler and pass the updated value
            if (this._writeResponseDelegate) {
                this._writeResponseDelegate(writeResult);
            }
            // after processing the response calls, the current response list is obsolete!
            this.endWriteRequest();
        };
        /**
         * Called after a write request has been rejected
         *
         * @param {*} error
         * @memberof Property
         */
        Property.prototype.writeRequestRejected = function (error) {
            // recall response handler and pass the updated value
            if (this._writeResponseRejectionDelegate) {
                this._writeResponseRejectionDelegate(error);
            }
            this.endWriteRequest();
        };
        /**
         * Copies the item value to prohibit any indirect change of the original value.
         *
         * @private
         * @template STOREITEMTYPE
         * @param {STOREITEMTYPE} newValue
         * @param {*} storeItemTypeConstructor
         * @returns {STOREITEMTYPE}
         * @memberof Property
         */
        Property.copyValue = function (newValue, storeItemTypeConstructor) {
            // if the value is boxed (should be passed as refernce ) we just use the unboxed value. 
            // if a type is available we copy or create a new instance.
            // all other objects are just passed through without modification or copying.
            return newValue instanceof dataBox_1.DataBox ? newValue.Unbox() : storeItemTypeConstructor ? objectx_1.ObjectX.clone(storeItemTypeConstructor, newValue) : newValue;
        };
        // specifies a default handler for the read request
        Property.DEFAULT_READ_REQUEST_HANDLER = function () { console.error("Property: Read request can not be executed because the request handler is undefined!"); };
        // specifies a default handler for the read request
        Property.DEFAULT_WRITE_REQUEST_HANDLER = function () { console.error("Property: Write request can not be executed because the request handler is undefined!"); };
        // specefies the default value getter
        Property.DEFAULT_VALUE_GETTER = function (value) { return value; };
        return Property;
    }());
    exports.Property = Property;
    var PropertyRequestState;
    (function (PropertyRequestState) {
        PropertyRequestState[PropertyRequestState["Ready"] = 0] = "Ready";
        PropertyRequestState[PropertyRequestState["Pending"] = 1] = "Pending";
    })(PropertyRequestState || (PropertyRequestState = {}));
    var PropertyClient = /** @class */ (function () {
        function PropertyClient(client, changedHandler) {
            if (changedHandler === void 0) { changedHandler = null; }
            this._client = client;
            this._changedHandler = changedHandler;
        }
        Object.defineProperty(PropertyClient.prototype, "client", {
            get: function () {
                return this._client;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropertyClient.prototype, "valueChangedHandler", {
            get: function () {
                return this._changedHandler;
            },
            enumerable: true,
            configurable: true
        });
        return PropertyClient;
    }());
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL2ZyYW1ld29yay9wcm9wZXJ0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFNQTs7Ozs7OztPQU9HO0lBRUg7UUF1Q0k7OztXQUdHO1FBQ0gsa0JBQXNCLFlBQWUsRUFBRSxnQkFBbUQsRUFBRSxpQkFBb0QsRUFBRSxXQUFxRDtZQUFyRCw0QkFBQSxFQUFBLHVCQUFxRDtZQXRDdk0sOENBQThDO1lBQ3RDLDJCQUFzQixHQUFxQyxFQUFFLENBQUM7WUFZdEUseUZBQXlGO1lBQ2pGLDJCQUFzQixHQUErQixFQUFFLENBQUM7WUFDaEUseUNBQXlDO1lBQ2pDLG9DQUErQixHQUFpQyxFQUFFLENBQUM7WUFDM0UsMEZBQTBGO1lBQ2xGLDJCQUFzQixHQUF1QyxTQUFTLENBQUM7WUFDL0Usc0ZBQXNGO1lBQzlFLG9DQUErQixHQUEyQyxTQUFTLENBQUM7WUFDNUYseUNBQXlDO1lBQ2pDLG9DQUErQixHQUEyQyxTQUFTLENBQUM7WUFDNUYsNkNBQTZDO1lBQ3JDLHNCQUFpQixHQUF5QixvQkFBb0IsQ0FBQyxLQUFLLENBQUM7WUFDN0UsNkNBQTZDO1lBQ3JDLHVCQUFrQixHQUF5QixvQkFBb0IsQ0FBQyxLQUFLLENBQUM7WUFHOUUsa0JBQWtCO1lBQ1YsZUFBVSxHQUEyQixFQUFFLENBQUM7WUFDaEQsZ0VBQWdFO1lBQ3hELGVBQVUsR0FBMkIsRUFBRSxDQUFDO1lBTzVDLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxnQkFBZ0IsQ0FBQztZQUNsRCxJQUFJLENBQUMsMEJBQTBCLEdBQUcsaUJBQWlCLENBQUM7WUFDcEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUM7WUFDM0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLG9CQUFvQixDQUFDLEtBQUssQ0FBQztZQUNwRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxDQUFDO1lB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QUFDLENBQUMsQ0FBQyxpQkFBTyxDQUFDLEtBQUssQ0FBZ0Isd0JBQXdCLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUM5SyxDQUFDO1FBcGlCRCxtREFBbUQ7UUFDcEMscUNBQTRCLEdBQXdDLGNBQVEsT0FBTyxDQUFDLEtBQUssQ0FBQyxzRkFBc0YsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BNLG1EQUFtRDtRQUNwQyxzQ0FBNkIsR0FBd0MsY0FBUSxPQUFPLENBQUMsS0FBSyxDQUFDLHVGQUF1RixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdE0scUNBQXFDO1FBQ3RCLDZCQUFvQixHQUEwQixVQUFDLEtBQUssSUFBUSxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQWlpQi9GLGVBQUM7S0FBQSxBQWpqQkQsSUFpakJDO0lBampCWSw0QkFBUTtJQWlrQnJCLElBQUssb0JBR0o7SUFIRCxXQUFLLG9CQUFvQjtRQUNyQixpRUFBSyxDQUFBO1FBQ0wscUVBQU8sQ0FBQTtJQUNYLENBQUMsRUFISSxvQkFBb0IsS0FBcEIsb0JBQW9CLFFBR3hCO0lBS0Q7UUFLSSx3QkFBWSxNQUFNLEVBQUMsY0FBb0Q7WUFBcEQsK0JBQUEsRUFBQSxxQkFBb0Q7WUFFbkUsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDdEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxjQUFjLENBQUM7UUFFMUMsQ0FBQztRQUdELHNCQUFXLGtDQUFNO2lCQUFqQjtnQkFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUE7WUFDdkIsQ0FBQzs7O1dBQUE7UUFJRCxzQkFBVywrQ0FBbUI7aUJBQTlCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQTtZQUMvQixDQUFDOzs7V0FBQTtRQUlMLHFCQUFDO0lBQUQsQ0FBQyxBQXpCRCxJQXlCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGFCb3ggfSBmcm9tIFwiLi4vY29tbW9uL3V0aWxpdGllcy9kYXRhQm94XCI7XHJcbmltcG9ydCB7IE9iamVjdFggfSBmcm9tIFwiLi4vY29tbW9uL3V0aWxpdGllcy9vYmplY3R4XCI7XHJcbmltcG9ydCB7IFRTdG9yZUl0ZW1Db25zdHJ1Y3RvciB9IGZyb20gXCIuL3N0b3JlXCI7XHJcblxyXG50eXBlIFRfUFJPUEVSVFlDSEFOR0VEX0hBTkRMRVIgPSAgKG5ld1ZhbHVlOiBhbnksIG9sZFZhbHVlOiBhbnkpID0+IHZvaWQ7XHJcblxyXG4vKipcclxuICogSW1wbGVtZW50cyBhIHR5cGVkIGRhdGEgbGluay4gXHJcbiAqIFxyXG4gKiBcclxuICpcclxuICogQGNsYXNzIFByb3BlcnR5XHJcbiAqIEB0ZW1wbGF0ZSBUXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFByb3BlcnR5PFQ+IHtcclxuXHJcbiAgICAvLyBIb2xkcyB0aGUgdmFsdWVcclxuICAgIHByaXZhdGUgX3ZhbHVlITogVDtcclxuXHJcbiAgICAvLyBIb2xkcyB0aGUgY2hhbmdlIG5vdGlmaWNhdGlvbiBjYWxsYmFja3MgICAgXHJcbiAgICBwcml2YXRlIF92YWx1ZUNoYW5nZWRDYWxsYmFja3M6IEFycmF5PFRfUFJPUEVSVFlDSEFOR0VEX0hBTkRMRVI+ID0gW107XHJcbiAgICAvLyBob2xkcyBhIGNhbGxiYWNrIGhhbmRsZXIgZm9yIGEgZm9yY2VkIHJlYWQgb2YgdGhlIHZhbHVlXHJcbiAgICBwcml2YXRlIF92YWx1ZVJlYWRSZXF1ZXN0RGVsZWdhdGU6IChwcm9wZXJ0eTogUHJvcGVydHk8VD4pID0+IHZvaWQ7XHJcbiAgICAvLyBob2xkcyBhIGNhbGxiYWNrIGhhbmRsZXIgZm9yIGEgZm9yY2VkIHdyaXRlIHJlcXVlc3RcclxuICAgIHByaXZhdGUgX3ZhbHVlV3JpdGVSZXF1ZXN0RGVsZWdhdGU6ICgocHJvcGVydHk6IFByb3BlcnR5PFQ+KSA9PiB2b2lkKTtcclxuICAgIC8vIHNwZWNpZmllcyBhIGRlZmF1bHQgaGFuZGxlciBmb3IgdGhlIHJlYWQgcmVxdWVzdFxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgREVGQVVMVF9SRUFEX1JFUVVFU1RfSEFORExFUjogKChwcm9wZXJ0eTogUHJvcGVydHk8YW55PikgPT4gdm9pZCkgPSAoKSA9PiB7IGNvbnNvbGUuZXJyb3IoXCJQcm9wZXJ0eTogUmVhZCByZXF1ZXN0IGNhbiBub3QgYmUgZXhlY3V0ZWQgYmVjYXVzZSB0aGUgcmVxdWVzdCBoYW5kbGVyIGlzIHVuZGVmaW5lZCFcIik7IH07XHJcbiAgICAvLyBzcGVjaWZpZXMgYSBkZWZhdWx0IGhhbmRsZXIgZm9yIHRoZSByZWFkIHJlcXVlc3RcclxuICAgIHByaXZhdGUgc3RhdGljIERFRkFVTFRfV1JJVEVfUkVRVUVTVF9IQU5ETEVSOiAoKHByb3BlcnR5OiBQcm9wZXJ0eTxhbnk+KSA9PiB2b2lkKSA9ICgpID0+IHsgY29uc29sZS5lcnJvcihcIlByb3BlcnR5OiBXcml0ZSByZXF1ZXN0IGNhbiBub3QgYmUgZXhlY3V0ZWQgYmVjYXVzZSB0aGUgcmVxdWVzdCBoYW5kbGVyIGlzIHVuZGVmaW5lZCFcIik7IH07XHJcbiAgICAvLyBzcGVjZWZpZXMgdGhlIGRlZmF1bHQgdmFsdWUgZ2V0dGVyXHJcbiAgICBwcml2YXRlIHN0YXRpYyBERUZBVUxUX1ZBTFVFX0dFVFRFUjogKCh2YWx1ZTogYW55KSA9PiBhbnkpID0gKHZhbHVlKSA9PiB7ICByZXR1cm4gdmFsdWU7IH07XHJcbiAgIFxyXG4gICAgLy8gc3BlY2lmaWVzIGEgcmVhZCByZXNwb25zZSBkZWxlZ2F0ZSBjYWxsZWQgYWZ0ZXIgYSByZWFkIGhhcyBzdWNjZXNzZnVsbHkgYmVlbiBleGVjdXRlZC5cclxuICAgIHByaXZhdGUgX3JlYWRSZXNwb25zZURlbGVnYXRlczogSVByb3BlcnR5UmVhZFJlc3BvbnNlPFQ+W10gPSBbXTtcclxuICAgIC8vIHNwZWNpZmllcyB0aGUgcmVhZCByZWplY3Rpb24gZGVsZWdhdGVzXHJcbiAgICBwcml2YXRlIF9yZWFkUmVqZWN0aW9uUmVzcG9uc2VEZWxlZ2F0ZXM6IElQcm9wZXJ0eVJlamVjdGlvblJlc3BvbnNlW10gPSBbXTtcclxuICAgIC8vIHNwZWNpZmllcyBhIHdyaXRlIHJlc3BvbnNlIGRlbGVnYXRlIGNhbGxlZCBhZnRlciBhIHJlYWQgaGFzIHN1Y2Nlc3NmdWxseSBiZWVuIGV4ZWN1dGVkLlxyXG4gICAgcHJpdmF0ZSBfd3JpdGVSZXNwb25zZURlbGVnYXRlOiBJUHJvcGVydHlXcml0ZVJlc3BvbnNlIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgLy8gc3BlY2lmaWVzIGEgcmVhZCByZXNwb25zZSBkZWxlZ2F0ZSBjYWxsZWQgYWZ0ZXIgYSB3cml0ZSByZXF1ZXN0IGhhcyAgYmVlbiByZWplY3RlZC5cclxuICAgIHByaXZhdGUgX3dyaXRlUmVzcG9uc2VSZWplY3Rpb25EZWxlZ2F0ZTogSVByb3BlcnR5UmVqZWN0aW9uUmVzcG9uc2UgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAvLyBzcGVjaWZpZXMgdGhlIHdyaXRlIHJlamVjdGlvbiBkZWxlZ2F0ZVxyXG4gICAgcHJpdmF0ZSBfd3JpdGVSZWplY3Rpb25SZXNwb25zZURlbGVnYXRlOiBJUHJvcGVydHlSZWplY3Rpb25SZXNwb25zZSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgIC8vIHNwZWNpZmllcyB0aGUgZGF0YSBsaW5rIHJlYWQgcmVxdWVzdCBzdGF0ZVxyXG4gICAgcHJpdmF0ZSBfcmVhZFJlcXVlc3RTdGF0ZTogUHJvcGVydHlSZXF1ZXN0U3RhdGUgPSBQcm9wZXJ0eVJlcXVlc3RTdGF0ZS5SZWFkeTtcclxuICAgIC8vIHNwZWNpZmllcyB0aGUgZGF0YSBsaW5rIHJlYWQgcmVxdWVzdCBzdGF0ZVxyXG4gICAgcHJpdmF0ZSBfd3JpdGVSZXF1ZXN0U3RhdGU6IFByb3BlcnR5UmVxdWVzdFN0YXRlID0gUHJvcGVydHlSZXF1ZXN0U3RhdGUuUmVhZHk7XHJcbiAgICAvLyBob2xkcyB0aGUgdmFsdWUgZ2V0dGVyIGRlbGVnYXRlXHJcbiAgICBwcml2YXRlIF92YWx1ZUdldHRlcjogKCh2YWx1ZTogVCkgPT4gVCkgfCB1bmRlZmluZWQ7XHJcbiAgICAvLyBob2xkcyBvYnNlcnZlcnNcclxuICAgIHByaXZhdGUgX29ic2VydmVyczogQXJyYXk8UHJvcGVydHlDbGllbnQgPiA9IFtdO1xyXG4gICAgLy8gaG9sZHMgYWNjZXNzb3JzLCBtZWFuaW5nIG9iamVjdHMgdXBkYXRpbmcgdGhlIHByb3BlcnR5IHZhbHVlc1xyXG4gICAgcHJpdmF0ZSBfYWNjZXNzb3JzOiBBcnJheTxQcm9wZXJ0eUNsaWVudCA+ID0gW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKkNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgRGF0YUxpbmsuXHJcbiAgICAgKiAgICBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKGluaXRpYWxWYWx1ZTogVCwgdmFsdWVSZWFkUmVxdWVzdDogKChkYXRhTGluazogUHJvcGVydHk8VD4pID0+IHZvaWQpLCB2YWx1ZVdyaXRlUmVxdWVzdDogKChkYXRhTGluazogUHJvcGVydHk8VD4pID0+IHZvaWQpLCB2YWx1ZUdldHRlcjogKCh2YWx1ZTpUKSA9PiBUKSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlUmVhZFJlcXVlc3REZWxlZ2F0ZSA9IHZhbHVlUmVhZFJlcXVlc3Q7XHJcbiAgICAgICAgdGhpcy5fdmFsdWVXcml0ZVJlcXVlc3REZWxlZ2F0ZSA9IHZhbHVlV3JpdGVSZXF1ZXN0O1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gaW5pdGlhbFZhbHVlO1xyXG4gICAgICAgIHRoaXMuX3JlYWRSZXF1ZXN0U3RhdGUgPSBQcm9wZXJ0eVJlcXVlc3RTdGF0ZS5SZWFkeTtcclxuICAgICAgICB0aGlzLl93cml0ZVJlcXVlc3RTdGF0ZSA9IFByb3BlcnR5UmVxdWVzdFN0YXRlLlJlYWR5O1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlR2V0dGVyID0gdmFsdWVHZXR0ZXI7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaGVzIGFuIGFjY2Vzc29yIGluc3RhbmNlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBhY2Nlc3Nvckluc3RhbmNlXHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGF0dGFjaEFjY2Vzc29yKGFjY2Vzc29ySW5zdGFuY2U6IG9iamVjdCkge1xyXG4gICAgICAgIHRoaXMuYWRkQWNjZXNzb3IoYWNjZXNzb3JJbnN0YW5jZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGFuIGFjY2Vzc29yXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBjYWxsZXJcclxuICAgICAqIEBtZW1iZXJvZiBQcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZEFjY2Vzc29yKGNhbGxlcjogb2JqZWN0KSB7XHJcbiAgICAgICAgdGhpcy5hY2Nlc3NvcnMucHVzaChuZXcgUHJvcGVydHlDbGllbnQoY2FsbGVyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRhY2hlcyB0aGUgYm91bmQgb2JqZWN0IGFzIGFjY2Vzc29yXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGJvdW5kT2JqZWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRldGFjaEFjY2Vzc29yKGJvdW5kT2JqZWN0OiBvYmplY3QpIHtcclxuICAgICAgICAvLyByZW1vdmUgdGhlIGNsaWVudCBvYmplY3QgZnJvbSB0aGUgYWNjZXNzb3JzIGxpc3RcclxuICAgICAgICB0aGlzLnJlbW92ZUFjY2Vzc29yKGJvdW5kT2JqZWN0KTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhbiBhY2Nlc3NvciBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gYm91bmRPYmplY3RcclxuICAgICAqIEBtZW1iZXJvZiBQcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbW92ZUFjY2Vzc29yKGJvdW5kT2JqZWN0OiBvYmplY3QpIHtcclxuICAgICAgICB0aGlzLl9hY2Nlc3NvcnMgPSB0aGlzLl9hY2Nlc3NvcnMuZmlsdGVyKChhY2Nlc3NvcikgPT4geyByZXR1cm4gYWNjZXNzb3IuY2xpZW50ICE9IGJvdW5kT2JqZWN0OyB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaGVzIHRoZSBjYWxsZXIgYXMgb2JzZXJ2ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gY2FsbGVyXHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGF0dGFjaE9ic2VydmVyKGNhbGxlcjogb2JqZWN0LCAgcHJvcGVydHlWYWx1ZUNoYW5nZWREZWxlZ2F0ZTpUX1BST1BFUlRZQ0hBTkdFRF9IQU5ETEVSLHN0b3JlSXRlbVR5cGVDb25zdHJ1Y3RvcjogVFN0b3JlSXRlbUNvbnN0cnVjdG9yfG51bGwgPSBudWxsKSB7XHJcblxyXG4gICAgICAgIC8vIGFkZCB0aGUgY2FsbGVyIGFzIG9ic2VydmVyXHJcbiAgICAgICAgdGhpcy5hZGRPYnNlcnZlcihjYWxsZXIsIHByb3BlcnR5VmFsdWVDaGFuZ2VkRGVsZWdhdGUpO1xyXG5cclxuICAgICAgICAvLyBnZXQgYW4gaW5pdGlhbGl6YXRpb24gdmFsdWUuXHJcbiAgICAgICAgbGV0IGluaXRWYWx1ZSA9IHRoaXMuZ2V0SW5pdFZhbHVlKHN0b3JlSXRlbVR5cGVDb25zdHJ1Y3Rvcik7XHJcblxyXG4gICAgICAgIC8vIGF0dGFjaCB0aGUgY2hhbmdlIG5vdGlmaWNhdGlvbiBjYWxsYmFja1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZVByb3BlcnR5VmFsdWUocHJvcGVydHlWYWx1ZUNoYW5nZWREZWxlZ2F0ZSxzdG9yZUl0ZW1UeXBlQ29uc3RydWN0b3IsaW5pdFZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYW4gb2JzZXJ2ZXIgaW5zdGFuY2UgXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBjYWxsZXJcclxuICAgICAqIEBwYXJhbSB7VF9QUk9QRVJUWUNIQU5HRURfSEFORExFUn0gcHJvcGVydHlWYWx1ZUNoYW5nZWREZWxlZ2F0ZVxyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkT2JzZXJ2ZXIoY2FsbGVyOiBvYmplY3QsIHByb3BlcnR5VmFsdWVDaGFuZ2VkRGVsZWdhdGU6IFRfUFJPUEVSVFlDSEFOR0VEX0hBTkRMRVIpIHtcclxuICAgICAgICB0aGlzLm9ic2VydmVycy5wdXNoKG5ldyBQcm9wZXJ0eUNsaWVudChjYWxsZXIsIHByb3BlcnR5VmFsdWVDaGFuZ2VkRGVsZWdhdGUpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9ic2VyZXMgdGhlIHByb3BlcnR5IHZhbHVlIGFuZCBjYWxscyB0aGUgc3BlY2lmaWVkIGNoYW5nZWQgZGVsZWdhdGUgYWZ0ZXIgY2hhbmdlcy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtUX1BST1BFUlRZQ0hBTkdFRF9IQU5ETEVSfSBwcm9wZXJ0eVZhbHVlQ2hhbmdlZERlbGVnYXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvYnNlcnZlUHJvcGVydHlWYWx1ZShwcm9wZXJ0eVZhbHVlQ2hhbmdlZERlbGVnYXRlOiBUX1BST1BFUlRZQ0hBTkdFRF9IQU5ETEVSLHN0b3JlSXRlbVR5cGVDb25zdHJ1Y3RvcjogVFN0b3JlSXRlbUNvbnN0cnVjdG9yfG51bGwsaW5pdFZhbHVlOmFueXxudWxsKSB7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VkKHByb3BlcnR5VmFsdWVDaGFuZ2VkRGVsZWdhdGUsc3RvcmVJdGVtVHlwZUNvbnN0cnVjdG9yLGluaXRWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0YWNoZXMgdGhlIGJvdW5kIG9iamVjdCBhcyBhY2Nlc3NvclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBib3VuZE9iamVjdFxyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZXRhY2hPYnNlcnZlcihib3VuZE9iamVjdDogb2JqZWN0KSB7XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgb2JzZXJ2ZXIgY2xpZW50IG9iamVjdFxyXG4gICAgICAgIGNvbnN0IG9ic2VydmVyQ2xpZW50ID0gdGhpcy5fb2JzZXJ2ZXJzLmZpbmQoKG9ic2VydmVyKSA9PiB7IHJldHVybiBvYnNlcnZlci5jbGllbnQgPT09IGJvdW5kT2JqZWN0IH0pO1xyXG4gICAgICAgIGlmIChvYnNlcnZlckNsaWVudCkge1xyXG4gICAgICAgICAgICBpZiAob2JzZXJ2ZXJDbGllbnQudmFsdWVDaGFuZ2VkSGFuZGxlcikge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgb2JzZXJ2ZXJzIGRlbGVnYXRlIGZyb20gdGhlIGNoYW5nZWQgbm90aWZpY2F0aW9uc1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVWYWx1ZUNoYW5nZWREZWxlZ2F0ZShvYnNlcnZlckNsaWVudC52YWx1ZUNoYW5nZWRIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgdGhlIGNsaWVudCBvYmplY3QgZnJvbSB0aGUgYWNjZXNzb3JzIGxpc3RcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlT2JzZXJ2ZXIob2JzZXJ2ZXJDbGllbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYW4gb2JzZXJ2ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0eUNsaWVudH0gb2JzZXJ2ZXJDbGllbnRcclxuICAgICAqIEBtZW1iZXJvZiBQcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbW92ZU9ic2VydmVyKG9ic2VydmVyQ2xpZW50OiBQcm9wZXJ0eUNsaWVudCkge1xyXG4gICAgICAgIHRoaXMuX29ic2VydmVycyA9IHRoaXMuX29ic2VydmVycy5maWx0ZXIoKG9ic2VydmVyKSA9PiB7IHJldHVybiBvYnNlcnZlci5jbGllbnQgIT0gb2JzZXJ2ZXJDbGllbnQuY2xpZW50OyB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgdGhlIHNwZWNpZmllZCB2YWx1ZSBjaGFuZ2VkIGRlbGFnYXRlXHJcbiAgICAgKmFkZHZhbFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7UHJvcGVydHlDbGllbnR9IG9ic2VydmVyQ2xpZW50XHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZW1vdmVWYWx1ZUNoYW5nZWREZWxlZ2F0ZSh2YWx1ZUNoYW5nZWREZWxlZ2F0ZTogVF9QUk9QRVJUWUNIQU5HRURfSEFORExFUikge1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlQ2hhbmdlZENhbGxiYWNrcyA9IHRoaXMuX3ZhbHVlQ2hhbmdlZENhbGxiYWNrcy5maWx0ZXIoKHZhdWVDaGFuZ2VkSGFuZGxlcikgPT4geyByZXR1cm4gdmF1ZUNoYW5nZWRIYW5kbGVyICE9IHZhbHVlQ2hhbmdlZERlbGVnYXRlOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgcHJvcGVydHkgaXMgYWxyZWFkeSBvYnNlcnZlZCBieSB0aGUgc3BlY2lmaWVkIGluc3RhbmNlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9ic2VydmVyXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBQcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNPYnNlcnZlZEJ5KG9ic2VydmVySW5zdGFuY2U6IG9iamVjdCk6Ym9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub2JzZXJ2ZXJzLmZpbmQoKG9ic2VydmVyKT0+eyByZXR1cm4gb2JzZXJ2ZXIuY2xpZW50ID09PSBvYnNlcnZlckluc3RhbmNlfSkgIT09IHVuZGVmaW5lZCA7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBwcm9wZXJ0eSBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQgdG8gYmUgYWNjZXNzZWQgYnkgdGhlIHNwZWNpZmllZCBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBhY2Nlc3NvclxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzQWNjZXNzZWRCeShhY2Nlc3Nvckluc3RhbmNlOiBvYmplY3QpOmJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFjY2Vzc29ycy5maW5kKChhY2Nlc3Nvcik9PnsgcmV0dXJuIGFjY2Vzc29yLmNsaWVudCA9PT0gYWNjZXNzb3JJbnN0YW5jZX0pICE9PSB1bmRlZmluZWQgO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdHJ1ZSBpZiB0aGUgcHJvcGVydHkgaXMgYXR0YWNoZWQsIG1lYW5pbmcgYWNjZXNzZWQgb3Igb2JzZXJ2ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBQcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGlzQXR0YWNoZWQoKSA6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9ic2VydmVycy5sZW5ndGggPiAwIHx8IHRoaXMuYWNjZXNzb3JzLmxlbmd0aCA+IDA7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBwcm9wZXJ0aWVzIG9ic2VydmVyc1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge0FycmF5PFByb3BlcnR5Q2xpZW50Pn1cclxuICAgICAqIEBtZW1iZXJvZiBQcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldCBvYnNlcnZlcnMoKSA6IEFycmF5PFByb3BlcnR5Q2xpZW50PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX29ic2VydmVycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHByb3BlcnRpZXMgYWNjZXNzb3JzXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7IEFycmF5PFByb3BlcnR5Q2xpZW50PiB9XHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXQgYWNjZXNzb3JzKCkgOiAgQXJyYXk8UHJvcGVydHlDbGllbnQ+ICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjY2Vzc29ycztcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBEYXRhTGluayBvYmplY3Qgd2l0aCB0aGUgc3BlY2lmaWVkIHR5cGVcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAdGVtcGxhdGUgVFxyXG4gICAgICogQHBhcmFtIHtUfSBpbml0aWFsVmFsdWVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNyZWF0ZTxUPihpbml0aWFsVmFsdWU6IFQsIHZhbHVlUmVhZFJlcXVlc3Q6ICgoZGF0YUxpbms6IFByb3BlcnR5PFQ+KSA9PiB2b2lkKSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZCwgdmFsdWVXcml0ZVJlcXVlc3Q6ICgoZGF0YUxpbms6IFByb3BlcnR5PFQ+KSA9PiB2b2lkKSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZCwgdmFsdWVHZXR0ZXI6ICgodmFsdWU6VCkgPT4gVCkgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQpIHtcclxuXHJcblxyXG4gICAgICAgIHZhbHVlUmVhZFJlcXVlc3QgPSB2YWx1ZVJlYWRSZXF1ZXN0ID8gdmFsdWVSZWFkUmVxdWVzdCA6IFByb3BlcnR5LkRFRkFVTFRfUkVBRF9SRVFVRVNUX0hBTkRMRVI7XHJcbiAgICAgICAgdmFsdWVXcml0ZVJlcXVlc3QgPSB2YWx1ZVdyaXRlUmVxdWVzdCA/IHZhbHVlV3JpdGVSZXF1ZXN0IDogUHJvcGVydHkuREVGQVVMVF9XUklURV9SRVFVRVNUX0hBTkRMRVI7XHJcbiAgICAgICAgdmFsdWVHZXR0ZXIgPSB2YWx1ZUdldHRlciA/IHZhbHVlR2V0dGVyIDogUHJvcGVydHkuREVGQVVMVF9WQUxVRV9HRVRURVI7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvcGVydHkoaW5pdGlhbFZhbHVlLCB2YWx1ZVJlYWRSZXF1ZXN0LCB2YWx1ZVdyaXRlUmVxdWVzdCx2YWx1ZUdldHRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgYW4gaW5pdCB2YWx1ZSBmb3IgdGhlIHByb3BlcnR5IHRvIGJlIHBhc3NlZCB3aGVuIGF0dGFjaGluZyBhbmQgdXBkYXRpbmcgdGhlIGNvbnN1bWVyIHRoZSBmaXJzdCB0aW1lLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyhUU3RvcmVJdGVtQ29uc3RydWN0b3IgfCBudWxsKX0gc3RvcmVJdGVtVHlwZUNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgICBwcml2YXRlIGdldEluaXRWYWx1ZShzdG9yZUl0ZW1UeXBlQ29uc3RydWN0b3I6IFRTdG9yZUl0ZW1Db25zdHJ1Y3RvciB8IG51bGwpIHtcclxuXHJcbiAgICAgICAgLy8gaWYgdGhlcmUgaXMgYSBrbm93biB0eXBlIChzdG9yZUl0ZW1Db25zdHJ1Y3Rvcikgd2UgdXNlIGEgY29weSBvZiB0aGUgZXhpc3RpbmcgaW5zdGFuY2UgYXMgaW5pdCB2YWx1ZS5cclxuICAgICAgICByZXR1cm4gc3RvcmVJdGVtVHlwZUNvbnN0cnVjdG9yID8gUHJvcGVydHkuY29weVZhbHVlKHRoaXMuX3ZhbHVlLCBzdG9yZUl0ZW1UeXBlQ29uc3RydWN0b3IpIDogdGhpcy5fdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBEYXRhTGluayBPYmplY3RzIHZhbHVlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBQcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IHZhbHVlKG5ld1ZhbHVlOiBUKSB7XHJcblxyXG4gICAgICAgIGxldCBvbGRWYWx1ZSA9IHRoaXMuX3ZhbHVlO1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gbmV3VmFsdWU7XHJcblxyXG4gICAgICAgIHRoaXMub25WYWx1ZUNoYW5nZWQodGhpcy5fdmFsdWUsIG9sZFZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHByb3BlcnR5IG9iamVjdCB2YWx1ZS5cclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7VH1cclxuICAgICAqIEBtZW1iZXJvZiBQcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHZhbHVlKCk6IFQge1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuX3ZhbHVlO1xyXG4gICAgICAgIC8vIGdldCB0aGUgdmFsdWUgdmlhIHRoZSB2YWx1ZSBnZXR0ZXIgZGVsZWdhdGUsIGlmIGRlZmluZWQuIE90aGVyd2lzZSB1c2UgdGhlIG9yaWdpbmFsIHZhbHVlLlxyXG4gICAgICAgIGlmICh0aGlzLl92YWx1ZUdldHRlcikge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMuX3ZhbHVlR2V0dGVyKHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgcHJvcGVydGllcyB2YWx1ZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IG5ld1ZhbHVlXHJcbiAgICAgKiBAcGFyYW0ge1RTdG9yZUl0ZW1Db25zdHJ1Y3Rvcn0gcHJvcGVydHlWYWx1ZVR5cGVcclxuICAgICAqIEBtZW1iZXJvZiBQcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlKG5ld1ZhbHVlOiBhbnksIHByb3BlcnR5VmFsdWVUeXBlOiBUU3RvcmVJdGVtQ29uc3RydWN0b3IpIHtcclxuICAgICAgXHJcbiAgICAgICAgbGV0IG9sZFZhbHVlID0gdGhpcy5fdmFsdWU7XHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSB2YWx1ZSB3aXRoIGEgY29weVxyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gUHJvcGVydHkuY29weVZhbHVlKG5ld1ZhbHVlLHByb3BlcnR5VmFsdWVUeXBlKTtcclxuICAgICAgICAvLyBmb3J3YXJkIGEgdmFsdWUgY29weSB0byB0aGUgY2hhbmdlZCBjb25zdW1lcnMgLi5cclxuICAgICAgICBsZXQgY29waWVkVmFsdWUgPSBQcm9wZXJ0eS5jb3B5VmFsdWUobmV3VmFsdWUscHJvcGVydHlWYWx1ZVR5cGUpO1xyXG5cclxuICAgICAgICAvLyBfdmFsdWUgYW5kIHRoZSBmb3J3YXJkZWQgdmFsdWUgbmVlZCB0byBiZSBkaWZmZXJlbnQgaW5zdGFuY2VzIChjb3BpZXMpIHRvIHByb3ZpZGUgcHJvcGVyIHVwZGF0aW5nIVxyXG4gICAgICAgIHRoaXMub25WYWx1ZUNoYW5nZWQoY29waWVkVmFsdWUsIG9sZFZhbHVlLHByb3BlcnR5VmFsdWVUeXBlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCB3aGVuZXZlciB0aGUgdmFsdWUgaGFzIGJlZW4gc2V0LiBOb3RpZmllcyBsaXN0ZW5lcnMgZnJvbSBhIHZhbHVlIGNoYW5nZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7VH0gX3ZhbHVlXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBQcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uVmFsdWVDaGFuZ2VkKG5ld1ZhbHVlOiBULCBvbGRWYWx1ZTogVCxwcm9wZXJ0eVZhbHVlVHlwZTogVFN0b3JlSXRlbUNvbnN0cnVjdG9yfG51bGwgPSBudWxsKTogYW55IHtcclxuXHJcbiAgICAgICAgLy8gaW52b2tlIHRoZSB2YWx1ZSBjaGFuZ2VkIGNhbGxiYWNrc1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlQ2hhbmdlZENhbGxiYWNrcy5mb3JFYWNoKChjYWxsYmFjaykgPT4geyBjYWxsYmFjayhuZXdWYWx1ZSwgb2xkVmFsdWUpIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCB3aGVuZXZlciB0aGUgcHJvcGVydHkgdmFsdWUgaGFzIGJlZW4gY2hhbmdlZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7KG5ld1ZhbHVlOiBULCBvbGRWYWx1ZTogVCkgPT4gdm9pZH0gb25WYWx1ZUNoYW5nZWRDYWxsQmFja1xyXG4gICAgICogQHBhcmFtIHsoVFN0b3JlSXRlbUNvbnN0cnVjdG9yfG51bGwpfSBbcHJvcGVydHlWYWx1ZVR5cGU9bnVsbF0gc3BlY2VmaWVzIHRoZSB0eXBlIG9mIHRoIHByb3BlcnR5IHZhbHVlLlxyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIGNoYW5nZWQob25WYWx1ZUNoYW5nZWRDYWxsQmFjazogKG5ld1ZhbHVlOiBULCBvbGRWYWx1ZTogVCkgPT4gdm9pZCxwcm9wZXJ0eVZhbHVlVHlwZTogVFN0b3JlSXRlbUNvbnN0cnVjdG9yfG51bGw9bnVsbCxpbml0VmFsdWU6YW55fG51bGwgPSBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl92YWx1ZUNoYW5nZWRDYWxsYmFja3MuaW5jbHVkZXMob25WYWx1ZUNoYW5nZWRDYWxsQmFjaykpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgbmV3IGhhbmRsZXJcclxuICAgICAgICAgICAgdGhpcy5hZGRWYWx1ZUNoYW5nZWREZWxlZ2F0ZShvblZhbHVlQ2hhbmdlZENhbGxCYWNrKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIGFscmVhZHkgYSB2YWx1ZSBvciBpbml0IHZhbHVlIGF2YWlsYWJsZSwgd2UgZm9yd2FyZCBpdCB0byB0aGUgbmV3IGxpc3RlbmVyLlxyXG4gICAgICAgICAgICBsZXQgaW5pdGlhbENoYW5nZWRWYWx1ZSA9IGluaXRWYWx1ZSA/IGluaXRWYWx1ZSA6IHRoaXMuX3ZhbHVlO1xyXG4gICAgICAgICAgICBpZiAoaW5pdGlhbENoYW5nZWRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlZChpbml0aWFsQ2hhbmdlZFZhbHVlLHRoaXMuX3ZhbHVlLHByb3BlcnR5VmFsdWVUeXBlKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUHJvcGVydHkgY2hhbmdlIGFscmVhZHkgb2JzZXJ2ZWQgYnkgdGhlIHNhbWUgaGFuZGxlclwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHRoZSBzcGVjaWZpZWQgdmFsdWUgY2hhbmdlZCBkZWxlZ2F0ZS5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtUX1BST1BFUlRZQ0hBTkdFRF9IQU5ETEVSfSBvblZhbHVlQ2hhbmdlZERlbGVnYXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRWYWx1ZUNoYW5nZWREZWxlZ2F0ZShvblZhbHVlQ2hhbmdlZERlbGVnYXRlOiBUX1BST1BFUlRZQ0hBTkdFRF9IQU5ETEVSKSB7XHJcbiAgICAgICAgdGhpcy5fdmFsdWVDaGFuZ2VkQ2FsbGJhY2tzLnB1c2gob25WYWx1ZUNoYW5nZWREZWxlZ2F0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGb3JjZXMgYSByZWZyZXNoIG8gdGhlIGRhdGEgbGlua3MgdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcmVhZChyZWFkUmVzcG9uc2VEZWxlZ2F0ZTogSVByb3BlcnR5UmVhZFJlc3BvbnNlPFQ+IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkLCByZWplY3Rpb25SZXNwb25zZURlbGVnYXRlOiBJUHJvcGVydHlSZWplY3Rpb25SZXNwb25zZSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICAvLyBhZGQgYSByZXNwb25zZSBkZWxlZ2F0ZSBmb3IgZXZlcnkgcmVhZCBjYWxsZXIuIFRoaXMgbWFrZXMgc3VyZSwgdGhhdCBtb3JlIGNhbGxlcnMgcG9zc2libHkgZnJvbSBkaWZmZXJlbnQgY29tcG9uZW50cywgcmVjZWl2ZSB0aGUgcmVzdWx0cyBhcyB3ZWxsICFcclxuXHJcbiAgICAgICAgLy8gYWRkIHJlYWQgcmVxdWVzdCBkZWxlZ2F0ZSBcclxuICAgICAgICBpZiAocmVhZFJlc3BvbnNlRGVsZWdhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVhZFJlc3BvbnNlRGVsZWdhdGVzLnB1c2gocmVhZFJlc3BvbnNlRGVsZWdhdGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gYWRkIHJlYWQgcmVqZWN0aW9uIGRlbGVnYXRlXHJcbiAgICAgICAgaWYgKHJlamVjdGlvblJlc3BvbnNlRGVsZWdhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVhZFJlamVjdGlvblJlc3BvbnNlRGVsZWdhdGVzLnB1c2gocmVqZWN0aW9uUmVzcG9uc2VEZWxlZ2F0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBpbnZva2UgdGhlIHJlYWQgcmVxdWVzdCBpZiBub3QgYWxyZWFkeSBydW5uaW5nXHJcbiAgICAgICAgaWYgKHRoaXMuX3JlYWRSZXF1ZXN0U3RhdGUgPT09IFByb3BlcnR5UmVxdWVzdFN0YXRlLlJlYWR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5SZWFkUmVxdWVzdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydHMgdGhlIHJlcXVlc3QgZm9yIHJlYWRpbmcgYSBkYXRhIGxpbmtzIHZhbHVlLiBUaGUgbWV0aG9kIGRlbGdhdGVzIHRoZSByZXF1ZXN0IHRvIHRoZSBjYWxsYmFjayBpZiBkZWZpbmVkLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBiZWdpblJlYWRSZXF1ZXN0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3JlYWRSZXF1ZXN0U3RhdGUgPSBQcm9wZXJ0eVJlcXVlc3RTdGF0ZS5QZW5kaW5nO1xyXG4gICAgICAgIGlmICh0aGlzLl92YWx1ZVJlYWRSZXF1ZXN0RGVsZWdhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fdmFsdWVSZWFkUmVxdWVzdERlbGVnYXRlKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgYWZ0ZXIgYSByZWFkIHJlcXVlc3QgaGFzIGJlZW4gZXhlY3V0ZWQgc3VjY2Vzc2Z1bGx5XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtUfSBjb21wb25lbnRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcmVhZFJlcXVlc3RFeGVjdXRlZChyZWFkUmVzdWx0OiBUKTogdm9pZCB7XHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBkYXRhIGxpbmtzIHZhbHVlXHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHJlYWRSZXN1bHQ7XHJcblxyXG4gICAgICAgIC8vIHJlY2FsbCByZXNwb25zZSBoYW5kbGVyIGFuZCBwYXNzIHRoZSB1cGRhdGVkIHZhbHVlXHJcbiAgICAgICAgdGhpcy5fcmVhZFJlc3BvbnNlRGVsZWdhdGVzLmZvckVhY2goKHJlYWRSZXNwb25zZURlbGVnYXRlKSA9PiB7XHJcbiAgICAgICAgICAgIHJlYWRSZXNwb25zZURlbGVnYXRlKHRoaXMudmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBhZnRlciBwcm9jZXNzaW5nIHRoZSByZXNwb25zZSBjYWxscywgdGhlIGN1cnJlbnQgcmVzcG9uc2UgbGlzdCBpcyBvYnNvbGV0ZSFcclxuICAgICAgICB0aGlzLmVuZFJlYWRSZXF1ZXN0KCk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCBhZnRlciBhIHJlYWQgcmVxdWVzdCBoYXMgYmVlbiByZWpldGNlZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gZXJyb3JcclxuICAgICAqIEBtZW1iZXJvZiBQcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICByZWFkUmVxdWVzdFJlamVjdGVkKGVycm9yOiBhbnkpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgLy8gcmVjYWxsIHJlc3BvbnNlIGhhbmRsZXIgYW5kIHBhc3MgdGhlIHVwZGF0ZWQgdmFsdWVcclxuICAgICAgICB0aGlzLl9yZWFkUmVqZWN0aW9uUmVzcG9uc2VEZWxlZ2F0ZXMuZm9yRWFjaCgocmVhZFJlamVjdGlvblJlc3BvbnNlRGVsZWdhdGUpID0+IHtcclxuICAgICAgICAgICAgcmVhZFJlamVjdGlvblJlc3BvbnNlRGVsZWdhdGUoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmVuZFJlYWRSZXF1ZXN0KCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGVybWluYXRlcyBhIHJlYWQgcmVxdWVzdFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBlbmRSZWFkUmVxdWVzdCgpIHtcclxuICAgICAgICB0aGlzLl9yZWFkUmVzcG9uc2VEZWxlZ2F0ZXMgPSBbXTtcclxuICAgICAgICB0aGlzLl9yZWFkUmVxdWVzdFN0YXRlID0gUHJvcGVydHlSZXF1ZXN0U3RhdGUuUmVhZHk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRm9yY2VzIGEgd3JpdGUgb2YgdGhlIGRhdGEgbGluayB2YWx1ZSB0byB0aGUgdmFsdWUgcHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IG5ld1ZhbHVlXHJcbiAgICAgKiBAcGFyYW0geygoKHdyaXRlUmVzdWx0OlQpPT52b2lkKXx1bmRlZmluZWQpfSBbd3JpdGVSZXNwb25zZURlbGVnYXRlPXVuZGVmaW5lZF1cclxuICAgICAqIEBtZW1iZXJvZiBQcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICB3cml0ZSh3cml0ZVJlc3BvbnNlRGVsZWdhdGU6IElQcm9wZXJ0eVdyaXRlUmVzcG9uc2UgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQsIHdyaXRlUmVqZWN0aW9uRGVsZWdhdGU6IElQcm9wZXJ0eVJlamVjdGlvblJlc3BvbnNlIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5fd3JpdGVSZXNwb25zZURlbGVnYXRlID0gd3JpdGVSZXNwb25zZURlbGVnYXRlO1xyXG4gICAgICAgIGlmICh0aGlzLl93cml0ZVJlcXVlc3RTdGF0ZSA9PT0gUHJvcGVydHlSZXF1ZXN0U3RhdGUuUmVhZHkpIHtcclxuICAgICAgICAgICAgdGhpcy5iZWdpbldyaXRlUmVxdWVzdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUZXJtaW5hdGVzIHRoZSB3cml0ZSByZXF1ZXN0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBQcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGVuZFdyaXRlUmVxdWVzdCgpIHtcclxuICAgICAgICB0aGlzLl93cml0ZVJlc3BvbnNlRGVsZWdhdGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5fd3JpdGVSZXF1ZXN0U3RhdGUgPSBQcm9wZXJ0eVJlcXVlc3RTdGF0ZS5SZWFkeTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0YXJ0cyB0aGUgcmVxdWVzdCBmb3Igd3JpdGluZyBhIGRhdGEgbGlua3MgdmFsdWUuIFRoZSBtZXRob2QgZGVsZ2F0ZXMgdGhlIHJlcXVlc3QgdG8gdGhlIGNhbGxiYWNrIGlmIGRlZmluZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBuZXdWYWx1ZVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgYmVnaW5Xcml0ZVJlcXVlc3QoKTogYW55IHtcclxuICAgICAgICB0aGlzLl93cml0ZVJlcXVlc3RTdGF0ZSA9IFByb3BlcnR5UmVxdWVzdFN0YXRlLlBlbmRpbmc7XHJcbiAgICAgICAgaWYgKHRoaXMuX3ZhbHVlV3JpdGVSZXF1ZXN0RGVsZWdhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fdmFsdWVXcml0ZVJlcXVlc3REZWxlZ2F0ZSh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCBhZnRlciBhIHdyaXRlIHJlcXVlc3QgaGFzIGJlZW4gZXhlY3V0ZWQgc3VjY2Vzc2Z1bGx5XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtUfSB3cml0ZVJlc3VsdFxyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHdyaXRlUmVxdWVzdEV4ZWN1dGVkKHdyaXRlUmVzdWx0OiBhbnkpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgLy8gcmVjYWxsIHJlc3BvbnNlIGhhbmRsZXIgYW5kIHBhc3MgdGhlIHVwZGF0ZWQgdmFsdWVcclxuICAgICAgICBpZiAodGhpcy5fd3JpdGVSZXNwb25zZURlbGVnYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3dyaXRlUmVzcG9uc2VEZWxlZ2F0ZSh3cml0ZVJlc3VsdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBhZnRlciBwcm9jZXNzaW5nIHRoZSByZXNwb25zZSBjYWxscywgdGhlIGN1cnJlbnQgcmVzcG9uc2UgbGlzdCBpcyBvYnNvbGV0ZSFcclxuICAgICAgICB0aGlzLmVuZFdyaXRlUmVxdWVzdCgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCBhZnRlciBhIHdyaXRlIHJlcXVlc3QgaGFzIGJlZW4gcmVqZWN0ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGVycm9yXHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgd3JpdGVSZXF1ZXN0UmVqZWN0ZWQoZXJyb3I6IGFueSk6IHZvaWQge1xyXG5cclxuICAgICAgICAvLyByZWNhbGwgcmVzcG9uc2UgaGFuZGxlciBhbmQgcGFzcyB0aGUgdXBkYXRlZCB2YWx1ZVxyXG4gICAgICAgIGlmICh0aGlzLl93cml0ZVJlc3BvbnNlUmVqZWN0aW9uRGVsZWdhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fd3JpdGVSZXNwb25zZVJlamVjdGlvbkRlbGVnYXRlKGVycm9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZW5kV3JpdGVSZXF1ZXN0KCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29waWVzIHRoZSBpdGVtIHZhbHVlIHRvIHByb2hpYml0IGFueSBpbmRpcmVjdCBjaGFuZ2Ugb2YgdGhlIG9yaWdpbmFsIHZhbHVlLiBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHRlbXBsYXRlIFNUT1JFSVRFTVRZUEVcclxuICAgICAqIEBwYXJhbSB7U1RPUkVJVEVNVFlQRX0gbmV3VmFsdWVcclxuICAgICAqIEBwYXJhbSB7Kn0gc3RvcmVJdGVtVHlwZUNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcmV0dXJucyB7U1RPUkVJVEVNVFlQRX1cclxuICAgICAqIEBtZW1iZXJvZiBQcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNvcHlWYWx1ZTxTVE9SRUlURU1UWVBFPihuZXdWYWx1ZTogU1RPUkVJVEVNVFlQRSwgc3RvcmVJdGVtVHlwZUNvbnN0cnVjdG9yOiBhbnkpOiBTVE9SRUlURU1UWVBFIHtcclxuICAgICAgICAvLyBpZiB0aGUgdmFsdWUgaXMgYm94ZWQgKHNob3VsZCBiZSBwYXNzZWQgYXMgcmVmZXJuY2UgKSB3ZSBqdXN0IHVzZSB0aGUgdW5ib3hlZCB2YWx1ZS4gXHJcbiAgICAgICAgLy8gaWYgYSB0eXBlIGlzIGF2YWlsYWJsZSB3ZSBjb3B5IG9yIGNyZWF0ZSBhIG5ldyBpbnN0YW5jZS5cclxuICAgICAgICAvLyBhbGwgb3RoZXIgb2JqZWN0cyBhcmUganVzdCBwYXNzZWQgdGhyb3VnaCB3aXRob3V0IG1vZGlmaWNhdGlvbiBvciBjb3B5aW5nLlxyXG4gICAgICAgIHJldHVybiBuZXdWYWx1ZSBpbnN0YW5jZW9mIERhdGFCb3ggPyAoPERhdGFCb3g+bmV3VmFsdWUpLlVuYm94KCkgOiBzdG9yZUl0ZW1UeXBlQ29uc3RydWN0b3IgPyBPYmplY3RYLmNsb25lPFNUT1JFSVRFTVRZUEU+KHN0b3JlSXRlbVR5cGVDb25zdHJ1Y3RvciwgbmV3VmFsdWUpIDogbmV3VmFsdWU7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5pbnRlcmZhY2UgSVByb3BlcnR5UmVhZFJlc3BvbnNlPFQ+IHtcclxuICAgIChyZXN1bHREYXRhOiBUKTogdm9pZDtcclxufVxyXG5cclxuXHJcbmludGVyZmFjZSBJUHJvcGVydHlXcml0ZVJlc3BvbnNlIHtcclxuICAgIChyZXN1bHREYXRhOiBhbnkpOiB2b2lkO1xyXG59XHJcblxyXG5cclxuaW50ZXJmYWNlIElQcm9wZXJ0eVJlamVjdGlvblJlc3BvbnNlIHtcclxuICAgIChlcnJvcjogYW55KTogdm9pZDtcclxufVxyXG5cclxuZW51bSBQcm9wZXJ0eVJlcXVlc3RTdGF0ZSB7XHJcbiAgICBSZWFkeSxcclxuICAgIFBlbmRpbmcsXHJcbn1cclxuXHJcblxyXG5cclxuXHJcbmNsYXNzIFByb3BlcnR5Q2xpZW50e1xyXG5cclxuICAgIHByaXZhdGUgX2NsaWVudDpvYmplY3Q7XHJcbiAgICBwcml2YXRlIF9jaGFuZ2VkSGFuZGxlcjpUX1BST1BFUlRZQ0hBTkdFRF9IQU5ETEVSfG51bGw7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2xpZW50LGNoYW5nZWRIYW5kbGVyOlRfUFJPUEVSVFlDSEFOR0VEX0hBTkRMRVJ8bnVsbCA9IG51bGwpe1xyXG5cclxuICAgICAgICB0aGlzLl9jbGllbnQgPSBjbGllbnQ7XHJcbiAgICAgICAgdGhpcy5fY2hhbmdlZEhhbmRsZXIgPSBjaGFuZ2VkSGFuZGxlcjtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IGNsaWVudCgpIDogb2JqZWN0IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2xpZW50XHJcbiAgICB9XHJcblxyXG5cclxuICAgIFxyXG4gICAgcHVibGljIGdldCB2YWx1ZUNoYW5nZWRIYW5kbGVyKCkgOiBUX1BST1BFUlRZQ0hBTkdFRF9IQU5ETEVSfG51bGwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jaGFuZ2VkSGFuZGxlclxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuXHJcbn1cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==