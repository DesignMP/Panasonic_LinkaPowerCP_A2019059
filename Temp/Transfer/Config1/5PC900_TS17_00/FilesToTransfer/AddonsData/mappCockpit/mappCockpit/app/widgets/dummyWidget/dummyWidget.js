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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
define(["require", "exports", "./componentDefaultDefinition", "../common/treeGridWidgetBase"], function (require, exports, componentDefaultDefinition_1, treeGridWidgetBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the dummy widget
     *
     * @class DummyWidget
     * @extends {WidgetBase}
     */
    var DummyWidget = /** @class */ (function (_super) {
        __extends(DummyWidget, _super);
        function DummyWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // Event handlers
            _this._contentActivatedHandler = function (sender, args) { return _this.onLayoutContentActivated(sender, args); };
            return _this;
            /**
             * resizes the trace configuration widget
             *
             * @param {number} width
             * @param {number} height
             * @memberof TraceConfigurationWidget
             */
            /*resize(width: number, height: number){
                this._actualWidth = width;
                this._actualHeight = height;
                
                if(this._layoutWidget != undefined){
                    this._layoutWidget!.resize(width, height);
                }
            }*/
            /**
             * Creates the widget content and eventually subwidgets
             *
             * @param {string} layoutContainerId
             * @memberof DummyWidget
             */
            /*createLayout() {
                this.createDummyData();
            }
        
            resize(width: number, height: number){
        
                this._mainDiv[0].style.width = width.toString() + "px";
                this._mainDiv[0].style.height = height.toString() + "px";
            }
        
            private createDummyData() {
        
                this._mainDiv.append("Dummy widget");
                this._mainDiv[0].style.background = ColorHelper.getColor();
                this._mainDiv[0].style.overflow = "hidden";
            }*/
        }
        DummyWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
        };
        /**
         * Sets the widget content and eventually subwidgets
         *
         * @memberof DummyWidget
         */
        DummyWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            /*
            this._layoutWidget = this.component.getSubComponent(ComponentDefaultDefinition.mainWidgetId);
    
            this._layoutWidget!.initialize("");
            this._layoutWidget!.eventWidgetActivated.attach(this._contentActivatedHandler);
            this._layoutWidget.addToParentContainer(this.mainDiv);*/
        };
        /**
         * Disposes the dummy widget
         *
         * @returns {*}
         * @memberof DummyWidget
         */
        DummyWidget.prototype.dispose = function () {
            /* this._layoutWidget!.eventWidgetActivated.detach(this._contentActivatedHandler);
             this._layoutWidget!.dispose();*/
            _super.prototype.dispose.call(this);
        };
        DummyWidget.prototype.getDataSource = function () {
            var dataSource = new Array();
            var record1 = this.getRecord("45", "PLK[0]", "1", "ncMODULE 1", "CMD_Simulation = 1", "3998.043", "req");
            var record2 = this.getRecord("46", "PLK[0]", "1", "", "", "3998.052", "res");
            var record3 = this.getRecord("47", "PLK[0]", "1", "ncAXIS 1", "McAcpDrv = PAR_LIST_WRITE", "3998.044", "info");
            dataSource.push(record1);
            dataSource.push(record2);
            dataSource.push(record3);
            return dataSource;
        };
        DummyWidget.prototype.getRecord = function (index, interfaceName, node, ncObject, description, time, type) {
            if (type == "res") {
                return { resIndex: index, interface: interfaceName, node: node, ncObject: ncObject, res: description, resTime: time };
            }
            else {
                return { reqIndex: index, interface: interfaceName, node: node, ncObject: ncObject, req: description, reqTime: time };
            }
        };
        DummyWidget.prototype.createTreeGrid = function () {
            var dataSource = this.getDataSource();
            $(this.mainDiv).ejTreeGrid(__assign(__assign({}, this.getTreeGridColumnDefinition()), { dataSource: dataSource, editSettings: { allowDeleting: false } }));
        };
        DummyWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: "reqIndex", headerText: "Index", width: "100" },
                    { field: "interface", headerText: "Interface", width: "100" },
                    { field: "node", headerText: "Node", width: "100" },
                    { field: "ncObject", headerText: "NC Object", width: "100" },
                    { field: "req", headerText: "Request", width: "200" },
                    { field: "reqTime", headerText: "Time [s]", width: "100" },
                    { field: "resTime", headerText: "Time [s]", width: "100" },
                    { field: "res", headerText: "Response", width: "200" },
                    { field: "resIndex", headerText: "Index", width: "100" },
                ],
            };
        };
        /**
         * Raised after a layout content was activated
         *
         * @private
         * @param {*} sender
         * @param {*} args
         * @memberof DummyWidget
         */
        DummyWidget.prototype.onLayoutContentActivated = function (sender, args) {
            args.widget.activate();
            this.resize(this._actualWidth, this._actualHeight);
        };
        return DummyWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.DummyWidget = DummyWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVtbXlXaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvZHVtbXlXaWRnZXQvZHVtbXlXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBUUE7Ozs7O09BS0c7SUFDSDtRQUEwQiwrQkFBa0I7UUFBNUM7WUFBQSxxRUF1SUM7WUFySUcsaUJBQWlCO1lBQ1QsOEJBQXdCLEdBQUcsVUFBQyxNQUFNLEVBQUUsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBM0MsQ0FBMkMsQ0FBQzs7WUE4RmpHOzs7Ozs7ZUFNRztZQUNIOzs7Ozs7O2VBT0c7WUFFSDs7Ozs7ZUFLRztZQUNIOzs7Ozs7Ozs7Ozs7Ozs7ZUFlRztRQUNQLENBQUM7UUFsSUcseUNBQW1CLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLHVEQUEwQixFQUFFLENBQUMsQ0FBQztRQUMxRSxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILGlDQUFXLEdBQVg7WUFDSSxpQkFBTSxXQUFXLFdBQUUsQ0FBQztZQUNwQjs7Ozs7b0VBS3dEO1FBQzVELENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILDZCQUFPLEdBQVA7WUFDRzs2Q0FDaUM7WUFDaEMsaUJBQU0sT0FBTyxXQUFFLENBQUM7UUFDcEIsQ0FBQztRQUVPLG1DQUFhLEdBQXJCO1lBQ0ksSUFBSSxVQUFVLEdBQUcsSUFBSSxLQUFLLEVBQU8sQ0FBQztZQUNsQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDekcsSUFBSSxPQUFPLEdBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJ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RUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdkQsQ0FBQztRQXdDTCxrQkFBQztJQUFELENBQUMsQUF2SUQsQ0FBMEIsdUNBQWtCLEdBdUkzQztJQUVRLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLy9pbXBvcnQgeyBXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi93aWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IElEdW1teVdpZGdldCB9IGZyb20gXCIuL2ludGVyZmFjZXMvZHVtbXlXaWRnZXRJbnRlcmZhY2VcIjtcclxuLy9pbXBvcnQgeyBDb2xvckhlbHBlciB9IGZyb20gXCIuLi8uLi9jb21tb24vY29sb3JIZWxwZXJcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24gfSBmcm9tIFwiLi9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBMYXlvdXRXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi9sYXlvdXRXaWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IFRyZWVHcmlkV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vdHJlZUdyaWRXaWRnZXRCYXNlXCI7XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgZHVtbXkgd2lkZ2V0XHJcbiAqXHJcbiAqIEBjbGFzcyBEdW1teVdpZGdldFxyXG4gKiBAZXh0ZW5kcyB7V2lkZ2V0QmFzZX1cclxuICovXHJcbmNsYXNzIER1bW15V2lkZ2V0IGV4dGVuZHMgVHJlZUdyaWRXaWRnZXRCYXNlIGltcGxlbWVudHMgSUR1bW15V2lkZ2V0IHtcclxuXHJcbiAgICAvLyBFdmVudCBoYW5kbGVyc1xyXG4gICAgcHJpdmF0ZSBfY29udGVudEFjdGl2YXRlZEhhbmRsZXIgPSAoc2VuZGVyLCBhcmdzKSA9PiB0aGlzLm9uTGF5b3V0Q29udGVudEFjdGl2YXRlZChzZW5kZXIsIGFyZ3MpO1xyXG5cclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXREZWZhdWx0RGVmaW5pdGlvbihuZXcgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB3aWRnZXQgY29udGVudCBhbmQgZXZlbnR1YWxseSBzdWJ3aWRnZXRzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIER1bW15V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemVkKCkge1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemVkKCk7XHJcbiAgICAgICAgLypcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24ubWFpbldpZGdldElkKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5pbml0aWFsaXplKFwiXCIpO1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldCEuZXZlbnRXaWRnZXRBY3RpdmF0ZWQuYXR0YWNoKHRoaXMuX2NvbnRlbnRBY3RpdmF0ZWRIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQuYWRkVG9QYXJlbnRDb250YWluZXIodGhpcy5tYWluRGl2KTsqL1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZXMgdGhlIGR1bW15IHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIER1bW15V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgIC8qIHRoaXMuX2xheW91dFdpZGdldCEuZXZlbnRXaWRnZXRBY3RpdmF0ZWQuZGV0YWNoKHRoaXMuX2NvbnRlbnRBY3RpdmF0ZWRIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLmRpc3Bvc2UoKTsqL1xyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldERhdGFTb3VyY2UoKXtcclxuICAgICAgICBsZXQgZGF0YVNvdXJjZSA9IG5ldyBBcnJheTxhbnk+KCk7XHJcbiAgICAgICAgbGV0IHJlY29yZDEgPSB0aGlzLmdldFJlY29yZChcIjQ1XCIsIFwiUExLWzBdXCIsIFwiMVwiLCBcIm5jTU9EVUxFIDFcIiwgXCJDTURfU2ltdWxhdGlvbiA9IDFcIiwgXCIzOTk4LjA0M1wiLCBcInJlcVwiKTtcclxuICAgICAgICBsZXQgcmVjb3JkMj0gdGhpcy5nZXRSZWNvcmQoXCI0NlwiLCBcIlBMS1swXVwiLCBcIjFcIiwgXCJcIiwgXCJcIiwgXCIzOTk4LjA1MlwiLCBcInJlc1wiKTtcclxuICAgICAgICBsZXQgcmVjb3JkMz0gdGhpcy5nZXRSZWNvcmQoXCI0N1wiLCBcIlBMS1swXVwiLCBcIjFcIiwgXCJuY0FYSVMgMVwiLCBcIk1jQWNwRHJ2ID0gUEFSX0xJU1RfV1JJVEVcIiwgXCIzOTk4LjA0NFwiLCBcImluZm9cIik7XHJcbiAgICAgICAgZGF0YVNvdXJjZS5wdXNoKHJlY29yZDEpO1xyXG4gICAgICAgIGRhdGFTb3VyY2UucHVzaChyZWNvcmQyKTtcclxuICAgICAgICBkYXRhU291cmNlLnB1c2gocmVjb3JkMyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGRhdGFTb3VyY2U7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldFJlY29yZChpbmRleCwgaW50ZXJmYWNlTmFtZSwgbm9kZSwgbmNPYmplY3QsIGRlc2NyaXB0aW9uLCB0aW1lLCB0eXBlKXtcclxuXHJcbiAgICAgICAgaWYodHlwZSA9PSBcInJlc1wiKXtcclxuICAgICAgICAgICAgcmV0dXJuIHtyZXNJbmRleDogaW5kZXgsIGludGVyZmFjZTogaW50ZXJmYWNlTmFtZSwgbm9kZTogbm9kZSwgbmNPYmplY3Q6IG5jT2JqZWN0LCByZXM6IGRlc2NyaXB0aW9uLCByZXNUaW1lOiB0aW1lfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIHtyZXFJbmRleDogaW5kZXgsIGludGVyZmFjZTogaW50ZXJmYWNlTmFtZSwgbm9kZTogbm9kZSwgbmNPYmplY3Q6IG5jT2JqZWN0LCByZXE6IGRlc2NyaXB0aW9uLCByZXFUaW1lOiB0aW1lfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVRyZWVHcmlkKCkge1xyXG4gICAgICAgIHZhciBkYXRhU291cmNlID0gdGhpcy5nZXREYXRhU291cmNlKCk7XHJcblxyXG4gICAgICAgICQodGhpcy5tYWluRGl2KS5lalRyZWVHcmlkKHtcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2U6IGRhdGFTb3VyY2UsXHJcbiAgICAgICAgICAgIGVkaXRTZXR0aW5nczogeyBhbGxvd0RlbGV0aW5nIDogZmFsc2UgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpOiB7fXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb2x1bW5zOiBbXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcInJlcUluZGV4XCIsIGhlYWRlclRleHQ6IFwiSW5kZXhcIiwgd2lkdGg6IFwiMTAwXCJ9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJpbnRlcmZhY2VcIiwgaGVhZGVyVGV4dDogXCJJbnRlcmZhY2VcIiwgd2lkdGg6IFwiMTAwXCJ9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJub2RlXCIsIGhlYWRlclRleHQ6IFwiTm9kZVwiLCB3aWR0aDogXCIxMDBcIn0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcIm5jT2JqZWN0XCIsIGhlYWRlclRleHQ6IFwiTkMgT2JqZWN0XCIsIHdpZHRoOiBcIjEwMFwifSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwicmVxXCIsIGhlYWRlclRleHQ6IFwiUmVxdWVzdFwiLCB3aWR0aDogXCIyMDBcIn0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcInJlcVRpbWVcIiwgaGVhZGVyVGV4dDogXCJUaW1lIFtzXVwiLCB3aWR0aDogXCIxMDBcIn0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcInJlc1RpbWVcIiwgaGVhZGVyVGV4dDogXCJUaW1lIFtzXVwiLCB3aWR0aDogXCIxMDBcIn0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcInJlc1wiLCBoZWFkZXJUZXh0OiBcIlJlc3BvbnNlXCIsIHdpZHRoOiBcIjIwMFwifSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwicmVzSW5kZXhcIiwgaGVhZGVyVGV4dDogXCJJbmRleFwiLCB3aWR0aDogXCIxMDBcIn0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJhaXNlZCBhZnRlciBhIGxheW91dCBjb250ZW50IHdhcyBhY3RpdmF0ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIER1bW15V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25MYXlvdXRDb250ZW50QWN0aXZhdGVkKHNlbmRlciwgYXJncykge1xyXG4gICAgICAgIGFyZ3Mud2lkZ2V0LmFjdGl2YXRlKCk7XHJcbiAgICAgICAgdGhpcy5yZXNpemUodGhpcy5fYWN0dWFsV2lkdGgsIHRoaXMuX2FjdHVhbEhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFxyXG4gICAgICogcmVzaXplcyB0aGUgdHJhY2UgY29uZmlndXJhdGlvbiB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ3VyYXRpb25XaWRnZXRcclxuICAgICAqL1xyXG4gICAgLypyZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbFdpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5fYWN0dWFsSGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuX2xheW91dFdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9Ki9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIHdpZGdldCBjb250ZW50IGFuZCBldmVudHVhbGx5IHN1YndpZGdldHNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF5b3V0Q29udGFpbmVySWRcclxuICAgICAqIEBtZW1iZXJvZiBEdW1teVdpZGdldFxyXG4gICAgICovXHJcbiAgICAvKmNyZWF0ZUxheW91dCgpIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZUR1bW15RGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcblxyXG4gICAgICAgIHRoaXMuX21haW5EaXZbMF0uc3R5bGUud2lkdGggPSB3aWR0aC50b1N0cmluZygpICsgXCJweFwiO1xyXG4gICAgICAgIHRoaXMuX21haW5EaXZbMF0uc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0LnRvU3RyaW5nKCkgKyBcInB4XCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVEdW1teURhdGEoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX21haW5EaXYuYXBwZW5kKFwiRHVtbXkgd2lkZ2V0XCIpO1xyXG4gICAgICAgIHRoaXMuX21haW5EaXZbMF0uc3R5bGUuYmFja2dyb3VuZCA9IENvbG9ySGVscGVyLmdldENvbG9yKCk7XHJcbiAgICAgICAgdGhpcy5fbWFpbkRpdlswXS5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XHJcbiAgICB9Ki9cclxufVxyXG5cclxuZXhwb3J0IHsgRHVtbXlXaWRnZXQgfTsiXX0=