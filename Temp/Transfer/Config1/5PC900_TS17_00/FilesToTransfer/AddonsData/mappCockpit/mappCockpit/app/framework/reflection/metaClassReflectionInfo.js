define(["require", "exports", "./metaClassProperties"], function (require, exports, metaClassProperties_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Provides setting and retrieving descriptive and informational capabilities of reflected types and atributes for classes.
     *
     * @export
     * @class MetaClassReflectionInfo
     */
    var MetaClassReflectionInfo = /** @class */ (function () {
        function MetaClassReflectionInfo() {
        }
        /**
         * Specifies one or more class properties.
         *
         * @static
         * @param {string} classType
         * @param {{}} newClassProperties
         * @memberof MetaClassReflectionData
         */
        MetaClassReflectionInfo.registerProperty = function (classType, propertyName, propertyValue) {
            // Registering a class name qualifies for beeing a valid meta info owner !
            var metaClassInfo = propertyName === metaClassProperties_1.MetaClassProperties.className ? this.createMetaClassInfo(classType) : this.getMetaClassInfo(classType);
            if (metaClassInfo && classType instanceof Function) {
                // set the meta property and value.
                metaClassInfo[propertyName] = propertyValue;
            }
        };
        /**
         * Creates a meta info property for a given class
         *
         * @private
         * @static
         * @param {Function} classType
         * @returns {(object | undefined)}
         * @memberof MetaClassReflectionInfo
         */
        MetaClassReflectionInfo.createMetaClassInfo = function (classType) {
            // the meta property owner needs to be a constructor method
            if ((classType instanceof Function) && classType !== undefined && classType.prototype !== undefined) {
                // create the meta info property
                classType.prototype.__$$classMetaInfo = {};
            }
            return classType.prototype.__$$classMetaInfo;
        };
        /**
         * Retrieves the class meta info for a given class
         *
         * @private
         * @param {TConstructor} classType
         * @returns {(object |undefined)}
         * @memberof MetaClassReflectionInfo
         */
        MetaClassReflectionInfo.getMetaClassInfo = function (classType) {
            var classMetaInfo = undefined;
            // the meta property owner needs to be a constructor method
            if ((classType instanceof Function) && classType !== undefined && classType.prototype !== undefined) {
                // get the meta properties from the class type
                classMetaInfo = classType.prototype.__$$classMetaInfo;
            }
            return classMetaInfo;
        };
        /**
         * Determines if the class has the specified property.
         *
         * @static
         * @param {string} className
         * @param {string} propertyName
         * @returns {boolean}
         * @memberof MetaClassReflectionInfo
         */
        MetaClassReflectionInfo.classHasMetaProperty = function (classType, propertyName) {
            var classHasProperty = false;
            // get meta data for the requested class.
            var metaClassInfo = this.getMetaClassInfo(classType);
            if (metaClassInfo) {
                // check for existing property 
                classHasProperty = metaClassInfo.hasOwnProperty(propertyName);
            }
            return classHasProperty;
        };
        /**
         * Reads the value of the specified propety
         *
         * @static
         * @param {string} className
         * @param {string} propertyName
         * @returns {*}
         * @memberof MetaClassReflectionInfo
         */
        MetaClassReflectionInfo.getClassMetaPropertyValue = function (classType, propertyName) {
            var propertyValue = undefined;
            // get meta data for the requested class.
            var metaClassInfo = this.getMetaClassInfo(classType);
            if (metaClassInfo && this.classHasMetaProperty(classType, propertyName)) {
                // get the property value
                propertyValue = metaClassInfo[propertyName];
            }
            return propertyValue;
        };
        return MetaClassReflectionInfo;
    }());
    exports.MetaClassReflectionInfo = MetaClassReflectionInfo;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YUNsYXNzUmVmbGVjdGlvbkluZm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2ZyYW1ld29yay9yZWZsZWN0aW9uL21ldGFDbGFzc1JlZmxlY3Rpb25JbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUlBOzs7OztPQUtHO0lBQ0g7UUFBQTtRQXdIQSxDQUFDO1FBdEhHOzs7Ozs7O1dBT0c7UUFDVyx3Q0FBZ0IsR0FBOUIsVUFBK0IsU0FBdUIsRUFBRSxZQUFvQixFQUFFLGFBQWtCO1lBRTVGLDBFQUEwRTtZQUMxRSxJQUFJLGFBQWEsR0FBRyxZQUFZLEtBQUsseUNBQW1CLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUU3SSxJQUFJLGFBQWEsSUFBSSxTQUFTLFlBQVksUUFBUSxFQUFFO2dCQUVoRCxtQ0FBbUM7Z0JBQ25DLGFBQWEsQ0FBQyxZQUFZLENBQUMsR0FBRyxhQUFhLENBQUM7YUFDL0M7UUFFTCxDQUFDO1FBR0Q7Ozs7Ozs7O1dBUUc7UUFDWSwyQ0FBbUIsR0FBbEMsVUFBbUMsU0FBbUI7WUFFbEQsMkRBQTJEO1lBQzNELElBQUksQ0FBQyxTQUFTLFlBQVksUUFBUSxDQUFDLElBQUksU0FBUyxLQUFLLFNBQVMsSUFBSSxTQUFTLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtnQkFFakcsZ0NBQWdDO2dCQUNoQyxTQUFTLENBQUMsU0FBUyxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQzthQUU5QztZQUVELE9BQU8sU0FBUyxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQztRQUVqRCxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNpQix3Q0FBZ0IsR0FBL0IsVUFBZ0MsU0FBbUI7WUFFaEQsSUFBSSxhQUFhLEdBQW9CLFNBQVMsQ0FBQztZQUUvQywyREFBMkQ7WUFDM0QsSUFBSSxDQUFDLFNBQVMsWUFBWSxRQUFRLENBQUMsSUFBSSxTQUFTLEtBQUssU0FBUyxJQUFJLFNBQVMsQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO2dCQUVqRyw4Q0FBOEM7Z0JBQzlDLGFBQWEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDO2FBQ3pEO1lBRUQsT0FBTyxhQUFhLENBQUM7UUFDekIsQ0FBQztRQUVMOzs7Ozs7OztXQVFHO1FBQ1csNENBQW9CLEdBQWxDLFVBQW1DLFNBQXVCLEVBQUUsWUFBb0I7WUFFNUUsSUFBSSxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7WUFFN0IseUNBQXlDO1lBQ3pDLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUVyRCxJQUFJLGFBQWEsRUFBRTtnQkFDZiwrQkFBK0I7Z0JBQy9CLGdCQUFnQixHQUFHLGFBQWEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDakU7WUFDRCxPQUFPLGdCQUFnQixDQUFDO1FBQzVCLENBQUM7UUFHRDs7Ozs7Ozs7V0FRRztRQUNXLGlEQUF5QixHQUF2QyxVQUF3QyxTQUF1QixFQUFFLFlBQW9CO1lBRWpGLElBQUksYUFBYSxHQUFHLFNBQVMsQ0FBQztZQUU5Qix5Q0FBeUM7WUFDekMsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRXJELElBQUksYUFBYSxJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLEVBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQ3BFLHlCQUF5QjtnQkFDekIsYUFBYSxHQUFHLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUMvQztZQUVELE9BQU8sYUFBYSxDQUFDO1FBQ3pCLENBQUM7UUFLTCw4QkFBQztJQUFELENBQUMsQUF4SEQsSUF3SEM7SUF4SFksMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVENvbnN0cnVjdG9yIH0gZnJvbSBcIi4uL2NvbXBvbmVudEh1Yi9jb21tb24vY29tbW9uVHlwZXNcIjtcclxuaW1wb3J0IHsgTWV0YUNsYXNzUHJvcGVydGllcyB9IGZyb20gXCIuL21ldGFDbGFzc1Byb3BlcnRpZXNcIjtcclxuXHJcblxyXG4vKipcclxuICogUHJvdmlkZXMgc2V0dGluZyBhbmQgcmV0cmlldmluZyBkZXNjcmlwdGl2ZSBhbmQgaW5mb3JtYXRpb25hbCBjYXBhYmlsaXRpZXMgb2YgcmVmbGVjdGVkIHR5cGVzIGFuZCBhdHJpYnV0ZXMgZm9yIGNsYXNzZXMuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIE1ldGFDbGFzc1JlZmxlY3Rpb25JbmZvXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWV0YUNsYXNzUmVmbGVjdGlvbkluZm8ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3BlY2lmaWVzIG9uZSBvciBtb3JlIGNsYXNzIHByb3BlcnRpZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzVHlwZVxyXG4gICAgICogQHBhcmFtIHt7fX0gbmV3Q2xhc3NQcm9wZXJ0aWVzXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0YUNsYXNzUmVmbGVjdGlvbkRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByZWdpc3RlclByb3BlcnR5KGNsYXNzVHlwZTogVENvbnN0cnVjdG9yLCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgcHJvcGVydHlWYWx1ZTogYW55KSB7XHJcblxyXG4gICAgICAgIC8vIFJlZ2lzdGVyaW5nIGEgY2xhc3MgbmFtZSBxdWFsaWZpZXMgZm9yIGJlZWluZyBhIHZhbGlkIG1ldGEgaW5mbyBvd25lciAhXHJcbiAgICAgICAgbGV0IG1ldGFDbGFzc0luZm8gPSBwcm9wZXJ0eU5hbWUgPT09IE1ldGFDbGFzc1Byb3BlcnRpZXMuY2xhc3NOYW1lID8gIHRoaXMuY3JlYXRlTWV0YUNsYXNzSW5mbyhjbGFzc1R5cGUpIDogdGhpcy5nZXRNZXRhQ2xhc3NJbmZvKGNsYXNzVHlwZSk7XHJcblxyXG4gICAgICAgIGlmIChtZXRhQ2xhc3NJbmZvICYmIGNsYXNzVHlwZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gc2V0IHRoZSBtZXRhIHByb3BlcnR5IGFuZCB2YWx1ZS5cclxuICAgICAgICAgICAgbWV0YUNsYXNzSW5mb1twcm9wZXJ0eU5hbWVdID0gcHJvcGVydHlWYWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBtZXRhIGluZm8gcHJvcGVydHkgZm9yIGEgZ2l2ZW4gY2xhc3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2xhc3NUeXBlXHJcbiAgICAgKiBAcmV0dXJucyB7KG9iamVjdCB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0YUNsYXNzUmVmbGVjdGlvbkluZm9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY3JlYXRlTWV0YUNsYXNzSW5mbyhjbGFzc1R5cGU6IEZ1bmN0aW9uKTogb2JqZWN0IHwgdW5kZWZpbmVkIHtcclxuXHJcbiAgICAgICAgLy8gdGhlIG1ldGEgcHJvcGVydHkgb3duZXIgbmVlZHMgdG8gYmUgYSBjb25zdHJ1Y3RvciBtZXRob2RcclxuICAgICAgICBpZiAoKGNsYXNzVHlwZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSAmJiBjbGFzc1R5cGUgIT09IHVuZGVmaW5lZCAmJiBjbGFzc1R5cGUucHJvdG90eXBlICE9PSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgbWV0YSBpbmZvIHByb3BlcnR5XHJcbiAgICAgICAgICAgIGNsYXNzVHlwZS5wcm90b3R5cGUuX18kJGNsYXNzTWV0YUluZm8gPSB7fTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY2xhc3NUeXBlLnByb3RvdHlwZS5fXyQkY2xhc3NNZXRhSW5mbztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgdGhlIGNsYXNzIG1ldGEgaW5mbyBmb3IgYSBnaXZlbiBjbGFzc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1RDb25zdHJ1Y3Rvcn0gY2xhc3NUeXBlXHJcbiAgICAgKiBAcmV0dXJucyB7KG9iamVjdCB8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBNZXRhQ2xhc3NSZWZsZWN0aW9uSW5mb1xyXG4gICAgICovXHJcbiAgICAgICAgIHByaXZhdGUgc3RhdGljIGdldE1ldGFDbGFzc0luZm8oY2xhc3NUeXBlOiBGdW5jdGlvbik6IG9iamVjdCB8IHVuZGVmaW5lZCB7XHJcblxyXG4gICAgICAgICAgICBsZXQgY2xhc3NNZXRhSW5mbzpvYmplY3R8dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgLy8gdGhlIG1ldGEgcHJvcGVydHkgb3duZXIgbmVlZHMgdG8gYmUgYSBjb25zdHJ1Y3RvciBtZXRob2RcclxuICAgICAgICAgICAgaWYgKChjbGFzc1R5cGUgaW5zdGFuY2VvZiBGdW5jdGlvbikgJiYgY2xhc3NUeXBlICE9PSB1bmRlZmluZWQgJiYgY2xhc3NUeXBlLnByb3RvdHlwZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgbWV0YSBwcm9wZXJ0aWVzIGZyb20gdGhlIGNsYXNzIHR5cGVcclxuICAgICAgICAgICAgICAgIGNsYXNzTWV0YUluZm8gPSBjbGFzc1R5cGUucHJvdG90eXBlLl9fJCRjbGFzc01ldGFJbmZvO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY2xhc3NNZXRhSW5mbztcclxuICAgICAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBjbGFzcyBoYXMgdGhlIHNwZWNpZmllZCBwcm9wZXJ0eS5cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHlOYW1lXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBNZXRhQ2xhc3NSZWZsZWN0aW9uSW5mb1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzSGFzTWV0YVByb3BlcnR5KGNsYXNzVHlwZTogVENvbnN0cnVjdG9yLCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cclxuICAgICAgICBsZXQgY2xhc3NIYXNQcm9wZXJ0eSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBnZXQgbWV0YSBkYXRhIGZvciB0aGUgcmVxdWVzdGVkIGNsYXNzLlxyXG4gICAgICAgIGxldCBtZXRhQ2xhc3NJbmZvID0gdGhpcy5nZXRNZXRhQ2xhc3NJbmZvKGNsYXNzVHlwZSk7XHJcblxyXG4gICAgICAgIGlmIChtZXRhQ2xhc3NJbmZvKSB7XHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGZvciBleGlzdGluZyBwcm9wZXJ0eSBcclxuICAgICAgICAgICAgY2xhc3NIYXNQcm9wZXJ0eSA9IG1ldGFDbGFzc0luZm8uaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNsYXNzSGFzUHJvcGVydHk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgdGhlIHZhbHVlIG9mIHRoZSBzcGVjaWZpZWQgcHJvcGV0eVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eU5hbWVcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGFDbGFzc1JlZmxlY3Rpb25JbmZvXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q2xhc3NNZXRhUHJvcGVydHlWYWx1ZShjbGFzc1R5cGU6IFRDb25zdHJ1Y3RvciwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBhbnkgfCB1bmRlZmluZWQge1xyXG5cclxuICAgICAgICBsZXQgcHJvcGVydHlWYWx1ZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICBcclxuICAgICAgICAvLyBnZXQgbWV0YSBkYXRhIGZvciB0aGUgcmVxdWVzdGVkIGNsYXNzLlxyXG4gICAgICAgIGxldCBtZXRhQ2xhc3NJbmZvID0gdGhpcy5nZXRNZXRhQ2xhc3NJbmZvKGNsYXNzVHlwZSk7XHJcblxyXG4gICAgICAgIGlmIChtZXRhQ2xhc3NJbmZvICYmIHRoaXMuY2xhc3NIYXNNZXRhUHJvcGVydHkoY2xhc3NUeXBlLHByb3BlcnR5TmFtZSkpIHtcclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBwcm9wZXJ0eSB2YWx1ZVxyXG4gICAgICAgICAgICBwcm9wZXJ0eVZhbHVlID0gbWV0YUNsYXNzSW5mb1twcm9wZXJ0eU5hbWVdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHByb3BlcnR5VmFsdWU7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG59Il19