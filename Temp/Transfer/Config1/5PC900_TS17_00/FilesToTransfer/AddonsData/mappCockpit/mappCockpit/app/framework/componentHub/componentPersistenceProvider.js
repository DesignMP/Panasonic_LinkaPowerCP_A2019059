define(["require", "exports", "../reflection/metaClassProperties", "../reflection/metaClassReflectionInfo", "../../common/persistence/persistDataProvider"], function (require, exports, metaClassProperties_1, metaClassReflectionInfo_1, persistDataProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The class provides saving and loading instance persistence data.
     *
     * @export
     * @class ComponentPersistencyProvider
     */
    var ComponentPersistencyProvider = /** @class */ (function () {
        function ComponentPersistencyProvider() {
        }
        /**
         * Saves objects persistence data
         *
         * @static
         * @param {IPersistencyObject} persistableInstance
         * @memberof ComponentPersistencyProvider
         */
        ComponentPersistencyProvider.savePersistenceData = function (persistableInstance) {
            // Check if persistableInstance is persistable
            if (!this.isPersistencyObject(persistableInstance)) {
                this.showNoPersistencyObjectError(persistableInstance);
                return;
            }
            // Save persistence data for the given persistableInstance if id for persisting is set 
            if (persistableInstance.id != "") {
                persistDataProvider_1.PersistDataProvider.getInstance().setDataWithId(persistableInstance.id, persistableInstance.getSettings());
            }
            else {
                console.error("No id for persisting data available!");
                console.error(this);
            }
        };
        /**
        * Saves objects persistence data
        *
        * @static
        * @param {IPersistencyObject} persistableInstance
        * @memberof ComponentPersistencyProvider
        */
        ComponentPersistencyProvider.loadPersistenceData = function (persistableInstance) {
            // Check if persistableInstance is persistable
            if (!this.isPersistencyObject(persistableInstance)) {
                this.showNoPersistencyObjectError(persistableInstance);
                return;
            }
            // Load persistence data for the given persistableInstance
            var settingsData = persistDataProvider_1.PersistDataProvider.getInstance().getDataWithId(persistableInstance.id);
            if (settingsData != undefined) {
                persistableInstance.setSettings(settingsData);
            }
        };
        /**
         * Check if the object is a IPersistencyObject
         *
         * @private
         * @static
         * @param {*} object
         * @returns {boolean}
         * @memberof ComponentPersistencyProvider
         */
        ComponentPersistencyProvider.isPersistencyObject = function (object) {
            // getSetting and setSettings (from ISettingsObject interface) and also id (from IPersistencyObject interface) must be defined
            if (object.id != undefined && object.getSettings != undefined && object.setSettings != undefined) {
                return true;
            }
            return false;
        };
        /**
         * Shows a "no persistency object" error for the given object
         *
         * @private
         * @static
         * @param {*} object
         * @memberof ComponentPersistencyProvider
         */
        ComponentPersistencyProvider.showNoPersistencyObjectError = function (object) {
            console.error("The following object has no IPersistencyObject implementation!");
            console.error(object);
        };
        /**
         * Determines if the instance supports persistency
         *
         * @public
         * @static
         * @param {*} modifiedInstance
         * @returns {boolean}
         * @memberof ComponentPersistencyProvider
         */
        ComponentPersistencyProvider.instanceSupportsPersistency = function (modifiedInstance) {
            var instanceType = modifiedInstance.constructor;
            var isPersistable = metaClassReflectionInfo_1.MetaClassReflectionInfo.classHasMetaProperty(instanceType, metaClassProperties_1.MetaClassProperties.persistable) ? metaClassReflectionInfo_1.MetaClassReflectionInfo.getClassMetaPropertyValue(instanceType, metaClassProperties_1.MetaClassProperties.persistable) : false;
            return isPersistable;
        };
        return ComponentPersistencyProvider;
    }());
    exports.ComponentPersistencyProvider = ComponentPersistencyProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50UGVyc2lzdGVuY2VQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvZnJhbWV3b3JrL2NvbXBvbmVudEh1Yi9jb21wb25lbnRQZXJzaXN0ZW5jZVByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQU1BOzs7OztPQUtHO0lBQ0g7UUFBQTtRQTJGQSxDQUFDO1FBekZHOzs7Ozs7V0FNRztRQUNXLGdEQUFtQixHQUFqQyxVQUFrQyxtQkFBdUM7WUFDckUsOENBQThDO1lBQzlDLElBQUcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsbUJBQW1CLENBQUMsRUFBQztnQkFDOUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBQ3ZELE9BQU87YUFDVjtZQUVELHVGQUF1RjtZQUN2RixJQUFJLG1CQUFtQixDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUU7Z0JBQzlCLHlDQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLEVBQUUsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQzthQUM5RztpQkFDSTtnQkFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7Z0JBQ3RELE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdkI7UUFDTCxDQUFDO1FBRUQ7Ozs7OztVQU1FO1FBQ1ksZ0RBQW1CLEdBQWpDLFVBQWtDLG1CQUF1QztZQUNyRSw4Q0FBOEM7WUFDOUMsSUFBRyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFDO2dCQUM5QyxJQUFJLENBQUMsNEJBQTRCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztnQkFDdkQsT0FBTzthQUNWO1lBRUQsMERBQTBEO1lBQzFELElBQUksWUFBWSxHQUFHLHlDQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMzRixJQUFJLFlBQVksSUFBSSxTQUFTLEVBQUU7Z0JBQzNCLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNqRDtRQUNMLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNZLGdEQUFtQixHQUFsQyxVQUFtQyxNQUFXO1lBQzFDLDhIQUE4SDtZQUM5SCxJQUFHLE1BQU0sQ0FBQyxFQUFFLElBQUksU0FBUyxJQUFJLE1BQU0sQ0FBQyxXQUFXLElBQUksU0FBUyxJQUFJLE1BQU0sQ0FBQyxXQUFXLElBQUksU0FBUyxFQUFDO2dCQUM1RixPQUFPLElBQUksQ0FBQzthQUNmO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDWSx5REFBNEIsR0FBM0MsVUFBNEMsTUFBVztZQUNuRCxPQUFPLENBQUMsS0FBSyxDQUFDLGdFQUFnRSxDQUFDLENBQUM7WUFDaEYsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQixDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDVyx3REFBMkIsR0FBekMsVUFBMEMsZ0JBQXFCO1lBQzNELElBQU0sWUFBWSxHQUFHLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztZQUNsRCxJQUFNLGFBQWEsR0FBRyxpREFBdUIsQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLEVBQUUseUNBQW1CLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLGlEQUF1QixDQUFDLHlCQUF5QixDQUFDLFlBQVksRUFBRSx5Q0FBbUIsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQzdOLE9BQU8sYUFBYSxDQUFDO1FBQ3pCLENBQUM7UUFDTCxtQ0FBQztJQUFELENBQUMsQUEzRkQsSUEyRkM7SUEzRlksb0VBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWV0YUNsYXNzUHJvcGVydGllcyB9IGZyb20gXCIuLi9yZWZsZWN0aW9uL21ldGFDbGFzc1Byb3BlcnRpZXNcIjtcclxuaW1wb3J0IHsgTWV0YUNsYXNzUmVmbGVjdGlvbkluZm8gfSBmcm9tIFwiLi4vcmVmbGVjdGlvbi9tZXRhQ2xhc3NSZWZsZWN0aW9uSW5mb1wiO1xyXG5pbXBvcnQgeyBQZXJzaXN0RGF0YVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9wZXJzaXN0RGF0YVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IElQZXJzaXN0ZW5jeU9iamVjdCB9IGZyb20gXCIuLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9wZXJzaXN0ZW5jeU9iamVjdEludGVyZmFjZVwiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBUaGUgY2xhc3MgcHJvdmlkZXMgc2F2aW5nIGFuZCBsb2FkaW5nIGluc3RhbmNlIHBlcnNpc3RlbmNlIGRhdGEuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIENvbXBvbmVudFBlcnNpc3RlbmN5UHJvdmlkZXJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb21wb25lbnRQZXJzaXN0ZW5jeVByb3ZpZGVyIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNhdmVzIG9iamVjdHMgcGVyc2lzdGVuY2UgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7SVBlcnNpc3RlbmN5T2JqZWN0fSBwZXJzaXN0YWJsZUluc3RhbmNlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50UGVyc2lzdGVuY3lQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHNhdmVQZXJzaXN0ZW5jZURhdGEocGVyc2lzdGFibGVJbnN0YW5jZTogSVBlcnNpc3RlbmN5T2JqZWN0KSB7XHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgcGVyc2lzdGFibGVJbnN0YW5jZSBpcyBwZXJzaXN0YWJsZVxyXG4gICAgICAgIGlmKCF0aGlzLmlzUGVyc2lzdGVuY3lPYmplY3QocGVyc2lzdGFibGVJbnN0YW5jZSkpe1xyXG4gICAgICAgICAgICB0aGlzLnNob3dOb1BlcnNpc3RlbmN5T2JqZWN0RXJyb3IocGVyc2lzdGFibGVJbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNhdmUgcGVyc2lzdGVuY2UgZGF0YSBmb3IgdGhlIGdpdmVuIHBlcnNpc3RhYmxlSW5zdGFuY2UgaWYgaWQgZm9yIHBlcnNpc3RpbmcgaXMgc2V0IFxyXG4gICAgICAgIGlmIChwZXJzaXN0YWJsZUluc3RhbmNlLmlkICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgUGVyc2lzdERhdGFQcm92aWRlci5nZXRJbnN0YW5jZSgpLnNldERhdGFXaXRoSWQocGVyc2lzdGFibGVJbnN0YW5jZS5pZCwgcGVyc2lzdGFibGVJbnN0YW5jZS5nZXRTZXR0aW5ncygpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJObyBpZCBmb3IgcGVyc2lzdGluZyBkYXRhIGF2YWlsYWJsZSFcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBTYXZlcyBvYmplY3RzIHBlcnNpc3RlbmNlIGRhdGFcclxuICAgICpcclxuICAgICogQHN0YXRpY1xyXG4gICAgKiBAcGFyYW0ge0lQZXJzaXN0ZW5jeU9iamVjdH0gcGVyc2lzdGFibGVJbnN0YW5jZVxyXG4gICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50UGVyc2lzdGVuY3lQcm92aWRlclxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbG9hZFBlcnNpc3RlbmNlRGF0YShwZXJzaXN0YWJsZUluc3RhbmNlOiBJUGVyc2lzdGVuY3lPYmplY3QpIHtcclxuICAgICAgICAvLyBDaGVjayBpZiBwZXJzaXN0YWJsZUluc3RhbmNlIGlzIHBlcnNpc3RhYmxlXHJcbiAgICAgICAgaWYoIXRoaXMuaXNQZXJzaXN0ZW5jeU9iamVjdChwZXJzaXN0YWJsZUluc3RhbmNlKSl7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd05vUGVyc2lzdGVuY3lPYmplY3RFcnJvcihwZXJzaXN0YWJsZUluc3RhbmNlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBMb2FkIHBlcnNpc3RlbmNlIGRhdGEgZm9yIHRoZSBnaXZlbiBwZXJzaXN0YWJsZUluc3RhbmNlXHJcbiAgICAgICAgbGV0IHNldHRpbmdzRGF0YSA9IFBlcnNpc3REYXRhUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXREYXRhV2l0aElkKHBlcnNpc3RhYmxlSW5zdGFuY2UuaWQpO1xyXG4gICAgICAgIGlmIChzZXR0aW5nc0RhdGEgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHBlcnNpc3RhYmxlSW5zdGFuY2Uuc2V0U2V0dGluZ3Moc2V0dGluZ3NEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBpZiB0aGUgb2JqZWN0IGlzIGEgSVBlcnNpc3RlbmN5T2JqZWN0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7Kn0gb2JqZWN0XHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRQZXJzaXN0ZW5jeVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGlzUGVyc2lzdGVuY3lPYmplY3Qob2JqZWN0OiBhbnkpOiBib29sZWFue1xyXG4gICAgICAgIC8vIGdldFNldHRpbmcgYW5kIHNldFNldHRpbmdzIChmcm9tIElTZXR0aW5nc09iamVjdCBpbnRlcmZhY2UpIGFuZCBhbHNvIGlkIChmcm9tIElQZXJzaXN0ZW5jeU9iamVjdCBpbnRlcmZhY2UpIG11c3QgYmUgZGVmaW5lZFxyXG4gICAgICAgIGlmKG9iamVjdC5pZCAhPSB1bmRlZmluZWQgJiYgb2JqZWN0LmdldFNldHRpbmdzICE9IHVuZGVmaW5lZCAmJiBvYmplY3Quc2V0U2V0dGluZ3MgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNob3dzIGEgXCJubyBwZXJzaXN0ZW5jeSBvYmplY3RcIiBlcnJvciBmb3IgdGhlIGdpdmVuIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0geyp9IG9iamVjdFxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFBlcnNpc3RlbmN5UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2hvd05vUGVyc2lzdGVuY3lPYmplY3RFcnJvcihvYmplY3Q6IGFueSl7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlRoZSBmb2xsb3dpbmcgb2JqZWN0IGhhcyBubyBJUGVyc2lzdGVuY3lPYmplY3QgaW1wbGVtZW50YXRpb24hXCIpO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3Iob2JqZWN0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGVybWluZXMgaWYgdGhlIGluc3RhbmNlIHN1cHBvcnRzIHBlcnNpc3RlbmN5XHJcbiAgICAgKlxyXG4gICAgICogQHB1YmxpY1xyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsqfSBtb2RpZmllZEluc3RhbmNlXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRQZXJzaXN0ZW5jeVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgaW5zdGFuY2VTdXBwb3J0c1BlcnNpc3RlbmN5KG1vZGlmaWVkSW5zdGFuY2U6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IGluc3RhbmNlVHlwZSA9IG1vZGlmaWVkSW5zdGFuY2UuY29uc3RydWN0b3I7XHJcbiAgICAgICAgY29uc3QgaXNQZXJzaXN0YWJsZSA9IE1ldGFDbGFzc1JlZmxlY3Rpb25JbmZvLmNsYXNzSGFzTWV0YVByb3BlcnR5KGluc3RhbmNlVHlwZSwgTWV0YUNsYXNzUHJvcGVydGllcy5wZXJzaXN0YWJsZSkgPyBNZXRhQ2xhc3NSZWZsZWN0aW9uSW5mby5nZXRDbGFzc01ldGFQcm9wZXJ0eVZhbHVlKGluc3RhbmNlVHlwZSwgTWV0YUNsYXNzUHJvcGVydGllcy5wZXJzaXN0YWJsZSkgOiBmYWxzZTtcclxuICAgICAgICByZXR1cm4gaXNQZXJzaXN0YWJsZTtcclxuICAgIH1cclxufSJdfQ==