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
define(["require", "exports", "./widgetBase", "./treeGridColumnDefinition"], function (require, exports, widgetBase_1, treeGridColumnDefinition_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TreeGridWidgetBase = /** @class */ (function (_super) {
        __extends(TreeGridWidgetBase, _super);
        function TreeGridWidgetBase() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._columnIndexForDynamicSize = -1; // -1 for no dynamic size behavior
            _this._minColumnWidthForDynamicColumn = 10;
            _this._hideColumnHeader = false;
            _this._hideHeaderFilterBar = false;
            _this._previousScrollSettings = { "vertical": 0, "horizontal": 0 };
            _this.refreshEnabled = true;
            return _this;
        }
        TreeGridWidgetBase.prototype.initialize = function () {
            this.initializeLocales();
            // Initialize the widget
            _super.prototype.initialize.call(this);
        };
        /**
         * Dispose the tree grid data
         *
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            var treeGridObject = this.getTreeGridObject();
            if (treeGridObject != undefined) {
                treeGridObject.destroy();
            }
        };
        /**
         * Sets a dynamic column
         * This column will be resized if the window/widget were resized
         *
         * @param {number} columnIndex
         * @param {number} minColumnWidthForDynamicColumn
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.setDynamicColumn = function (columnIndex, minColumnWidthForDynamicColumn) {
            this._columnIndexForDynamicSize = columnIndex;
            this._minColumnWidthForDynamicColumn = minColumnWidthForDynamicColumn;
        };
        /**
         * Loads the styles for the tree grid widget base
         *
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.loadStyles = function () {
            this.addStyle("widgets/common/style/css/treeGridStyle.css");
            this.addStyle("widgets/common/style/css/treeGridScrollBarStyle.css");
            this.addStyle("widgets/common/style/css/treeGridIconStyle.css");
            this.addStyle("widgets/common/style/css/treeGridToolbarButtonStyle.css");
            this.addStyle("widgets/common/style/css/widgetHeaderFooterStyle.css");
        };
        TreeGridWidgetBase.prototype.setCellEdit = function (value) {
            var treeGridObject = this.getTreeGridObject();
            treeGridObject.model.isEdit = value;
        };
        /**
         * Sets the flag that the column header of the tree grid should be hidden
         *
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.setColumnHeaderHidden = function () {
            this._hideColumnHeader = true;
        };
        /**
         * Sets the flag that the header filterbar of the tree grid should be hidden
         *
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.setHeaderFilterBarHidden = function () {
            this._hideHeaderFilterBar = true;
        };
        /** resizes the tree grid widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.resize = function (width, height) {
            this._actualWidth = width;
            this._actualHeight = height;
            var newWidth = "";
            var newHeight = "";
            if (width != 0) {
                newWidth = width + "px";
            }
            if (height != 0) {
                newHeight = this.getNewHeight(height);
            }
            var treeGridObj = this.getTreeGridObject(), sizeSettings = {
                height: newHeight, width: newWidth,
            };
            if (treeGridObj) {
                // Save cell if currently in edit mode before start resizing the treegrid, otherwise errors would occur
                treeGridObj.saveCell();
                treeGridObj.option("sizeSettings", sizeSettings, true); // force the setting to resize the treegrid correct
            }
            if (this._columnIndexForDynamicSize != -1) {
                this.fillSpaceWithDynamicColumn(width);
            }
            //When treeGrid is resized, syncf scrollbar can be added or removed
            this.updatescrollbarsObservation();
        };
        /**
         * Get new height of treegrid
         *
         * @param {number} height
         * @returns {string}
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.getNewHeight = function (height) {
            var newHeight = height - this._headerHeight - this._footerHeight + "px";
            if (this._footerHeight != 0) {
                var nonContentHeight = this.getNonTreeGridContentHeight();
                if (parseFloat(newHeight) < nonContentHeight) {
                    if (this.footerDiv != undefined) {
                        this.footerDiv.hidden = true;
                    }
                    newHeight = height - this._headerHeight + "px";
                }
                else {
                    if (this.footerDiv != undefined) {
                        this.footerDiv.hidden = false;
                    }
                }
            }
            return newHeight;
        };
        /**
         * Get height of treegrid without content (toolbar + header)
         *
         * @returns {number}
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.getNonTreeGridContentHeight = function () {
            var toolbar = $(this.mainDiv).find('.e-treegridtoolbar');
            var header = $(this.mainDiv).find('.e-gridheader');
            var toolbarHeight = parseFloat(toolbar.css('height'));
            var headerHeight = parseFloat(header.css('height'));
            toolbarHeight = toolbarHeight == NaN ? 0 : toolbarHeight;
            headerHeight = headerHeight == NaN ? 0 : headerHeight;
            //1 is added if it is not a Gantt chart (syncfusion internal weird stuff)
            return toolbarHeight + headerHeight + 1;
        };
        TreeGridWidgetBase.prototype.setModel = function (model, force) {
            if (force === void 0) { force = false; }
            var treeGridObj = this.getTreeGridObject();
            treeGridObj.setModel({ "dataSource": model }, force);
            if (this._columnIndexForDynamicSize != -1) {
                // To avoid empty space after last column because of removing the scrollbar if less data is available
                this.fillSpaceWithDynamicColumn(this.width);
            }
        };
        /**
         * Resize dynamic column
         * If changed column was dynamic column the size of the last column will be adapted
         *
         * @param {*} columnIndex	columnIndex of changed column
         * @param {*} treeGridModel
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.resizeDynamicColumn = function (columnIndex, treeGridModel) {
            var treeGridWidth = parseInt(treeGridModel.sizeSettings.width, 10); // parseInt to remove "px"
            if (columnIndex != this._columnIndexForDynamicSize && columnIndex < this._columnIndexForDynamicSize) {
                this.fillSpaceWithDynamicColumn(treeGridWidth);
            }
            else {
                // Dynamic column size was changed => update last "visible" column to fill space
                var lastVisibleColumnIndex = this.getLastVisibleColumnIndex(treeGridModel);
                this.fillSpaceWithColumn(lastVisibleColumnIndex, treeGridWidth);
            }
        };
        /**
         * Returns the settings of this component
         *
         * @param {boolean} onlyModified
         * @returns {ComponentSettings}
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.getComponentSettings = function (onlyModified) {
            // Add treegrid persisting data
            this.component.setSetting(TreeGridWidgetBase.ColumnsSettingId, this.getColumnSettings());
            this.component.setSetting(TreeGridWidgetBase.ScrollbarsSettingsId, this.getScrollBarSettings());
            return _super.prototype.getComponentSettings.call(this, onlyModified);
        };
        /**
         * Sets the given settings to this component
         *2
         * @param {ComponentSettings} componentSettings
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.setComponentSettings = function (componentSettings) {
            if (componentSettings != undefined) {
                _super.prototype.setComponentSettings.call(this, componentSettings);
                this.setColumnSettings(this.component.getSetting(TreeGridWidgetBase.ColumnsSettingId));
                this.setScrollBarSettings(this.component.getSetting(TreeGridWidgetBase.ScrollbarsSettingsId));
                // Hide tableheader/filter row after setting new column sizes if needed
                if (this.hideSomeTableHeaderParts() == true) {
                    // After setting the treegrid column sizes, the header parts will be shown => hide header parts if not needed
                    this.hideTableHeader();
                }
            }
        };
        /**
         * Returns the column settings
         *
         * @private
         * @returns {Array<TreeGridColumnDefinition>}
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.getColumnSettings = function () {
            var columnData = new Array();
            var treeGridObject = this.getTreeGridObject();
            if (treeGridObject != undefined) {
                var columnSettings = treeGridObject.option("columns");
                if (columnSettings != undefined) {
                    for (var i = 0; i < columnSettings.length; i++) {
                        columnData.push(new treeGridColumnDefinition_1.TreeGridColumnDefinition(columnSettings[i].field, columnSettings[i].width, columnSettings[i].visible));
                    }
                }
            }
            return columnData;
        };
        /**
         * Sets the given columns settings
         *
         * @param {Array<TreeGridColumnDefinition>} columnData
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.setColumnSettings = function (columnData) {
            var treeGridObject = this.getTreeGridObject();
            if (treeGridObject != undefined) {
                if (columnData != undefined) {
                    var columnSettings = treeGridObject.option("columns");
                    if (columnSettings != undefined) {
                        var _loop_1 = function (i) {
                            var columnSetting = columnSettings.find(function (colSetting) { return colSetting.field == columnData[i].id; });
                            if (columnSetting != undefined) {
                                columnSetting.visible = columnData[i].isVisible;
                                columnSetting.width = columnData[i].width;
                            }
                            else {
                                console.error("columnSettings not available for index: " + i);
                            }
                        };
                        for (var i = 0; i < columnData.length; i++) {
                            _loop_1(i);
                        }
                    }
                    treeGridObject.option("columns", columnSettings, true);
                }
                // Hide tableheader/filter row after setting new column sizes if needed
                if (this.hideSomeTableHeaderParts() == true) {
                    // After setting the treegrid column sizes, the header parts will be shown => hide header parts if not needed
                    this.hideTableHeader();
                }
            }
        };
        TreeGridWidgetBase.prototype.getScrollBarSettings = function () {
            var treeGridObject = this.getTreeGridObject();
            var settings = {
                "vertical": treeGridObject.getScrollTopOffset(),
                "horizontal": treeGridObject.getScrollLeftOffset()
            };
            return settings;
        };
        TreeGridWidgetBase.prototype.setScrollBarSettings = function (data) {
            if (data == undefined) {
                return;
            }
            var treeGridObject = this.getTreeGridObject();
            treeGridObject.scrollOffset(data.horizontal, data.vertical);
        };
        /**
         * Returns the index of the last visible column
         *
         * @private
         * @param {*} treeGridModel
         * @returns
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.getLastVisibleColumnIndex = function (treeGridModel) {
            for (var i = treeGridModel.columns.length - 1; i >= 0; i--) {
                if (treeGridModel.columns[i].visible == true) {
                    return i;
                }
            }
            return -1;
        };
        /**
         * creates the tree grid
         *
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.createLayout = function () {
            this.createColumnTemplates();
            this.createTreeGrid();
            if (this.hideSomeTableHeaderParts() == true) {
                // Hide some header parts of treegrid
                this.hideTableHeader();
            }
        };
        /**
         * Returns the ej tree grid object
         *
         * @returns {ej.TreeGrid}
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.getTreeGridObject = function () {
            return $(this.mainDiv).data("ejTreeGrid");
        };
        /**
         * Returns the tree record for the given element
         *
         * @protected
         * @param {*} element
         * @returns {any}
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.getTreeRecord = function (element) {
            var treegridObj = this.getTreeGridObject();
            var tr = element.closest("tr");
            if (tr != undefined) {
                var index = tr.rowIndex;
                if (treegridObj.model.currentViewData != undefined) {
                    return treegridObj.model.currentViewData[index];
                }
            }
            return undefined;
        };
        /**
         * Set the focus to the current tree grid
         *
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.focus = function () {
            // TODO: No public focus method available for tree grid, but needed for forcing the focus to the tree grid if draggable is used in a tree grid
            // (in case of draggable tree grid will not be focused because not the treegrid row will be selected on a click, but the directly div will by selected => svg or other div)
            this.getTreeGridObject()._focusTreeGridElement();
        };
        /**
         * Initializes locale resources
         *
         * @private
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.initializeLocales = function () {
            // get the locales for the treegrid
            var loc = ej.TreeGrid.Locale;
            // show an empty string if no records are available
            loc.default.emptyRecord = "";
        };
        TreeGridWidgetBase.prototype.fillSpaceWithDynamicColumn = function (treegridWidth) {
            if (this._columnIndexForDynamicSize == -1) {
                return;
            }
            this.fillSpaceWithColumn(this._columnIndexForDynamicSize, treegridWidth);
        };
        TreeGridWidgetBase.prototype.fillSpaceWithColumn = function (fillSpaceColumnIndex, treegridWidth) {
            var treeObj = this.getTreeGridObject();
            if (!treeObj) {
                return;
            }
            var columns = treeObj.option("columns");
            if (!columns) {
                return;
            }
            var newColumnWidth = this.getNewColumnWidth(treegridWidth, columns, fillSpaceColumnIndex);
            if (newColumnWidth > this._minColumnWidthForDynamicColumn) {
                columns[fillSpaceColumnIndex].width = newColumnWidth - 3; //-3 to avoid scrollbar
                columns[fillSpaceColumnIndex].width -= this.getScrollBarWidth(); // remove scrollbar size
                treeObj.option("columns", columns, true);
                if (this.hideSomeTableHeaderParts() == true) {
                    // After setting the treegrid co6lumn sizes, the header parts will be shown => hide header parts if not needed
                    this.hideTableHeader();
                }
            }
        };
        TreeGridWidgetBase.prototype.setColumnWidth = function (index, width) {
            var treeObj = this.getTreeGridObject();
            if (!treeObj) {
                return;
            }
            var columns = treeObj.option("columns");
            if (!columns) {
                return;
            }
            columns[index].width = width;
            treeObj.option("columns", columns, true);
            this.fillSpaceWithColumn(this._columnIndexForDynamicSize, this._actualWidth);
        };
        /**
         * Returns true if some parts of the table header should be hidden(e.g. column header, filterbar, ...)
         *
         * @private
         * @returns {boolean}
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.hideSomeTableHeaderParts = function () {
            if (this._hideColumnHeader == true) {
                return true;
            }
            if (this._hideHeaderFilterBar == true) {
                return true;
            }
            return false;
        };
        TreeGridWidgetBase.prototype.getScrollBarWidth = function () {
            var viewDiv = $(this.mainDiv).find('.e-gridcontent');
            for (var childIndex = 0; childIndex < viewDiv[0].children.length; childIndex++) {
                var child = viewDiv[0].children[childIndex];
                if (child.classList.contains("e-vscrollbar") == true) {
                    return child.clientWidth;
                }
            }
            return 0;
        };
        TreeGridWidgetBase.prototype.getNewColumnWidth = function (treegridWidth, columns, fillSpaceColumnIndex) {
            var newColumnWidth = treegridWidth;
            for (var columnIndex = 0; columnIndex < columns.length; columnIndex++) {
                if (columnIndex != fillSpaceColumnIndex) {
                    if (columns[columnIndex] != undefined && columns[columnIndex].visible == true) {
                        newColumnWidth -= columns[columnIndex].width;
                    }
                }
            }
            return newColumnWidth;
        };
        /**
         * Hides the table header parts which are currently defined to be hidden(e.g. _hideColumnHeader, _hideHeaderFilterBar, ...)
         *
         * @private
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.hideTableHeader = function () {
            var $treeGridHeader = $(this.mainDiv).find(".e-gridheader");
            var tableHeader = $treeGridHeader[0].children[0].children[0];
            if (tableHeader != undefined) {
                var columnHeader = tableHeader.rows[0];
                var filterBar = tableHeader.rows[1];
                if (columnHeader != undefined) {
                    if (this._hideColumnHeader == true) {
                        // hide column header
                        columnHeader.style.display = "none";
                    }
                }
                if (filterBar != undefined) {
                    if (this._hideHeaderFilterBar == true) {
                        // hide filterbar
                        filterBar.style.display = "none";
                    }
                }
            }
        };
        /**
         * Called when a button in the toolbar is clicked
         *
         * @protected
         * @param {*} args
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.toolbarClick = function (args) {
            var treeGridObj = this.getTreeGridObject();
            //Cancel edit cell when toolbar button is clicked
            if (treeGridObj != undefined && treeGridObj.model.isEdit == true) {
                treeGridObj.cancelEditCell();
            }
            if (this._toolbar.isExpandCollapseSelected(args) == true) {
                // Disables refresh caused by syncfusion calls
                this.enableTreeGridRefresh(false);
                this._toolbar.toolbarClick(args, this);
                this.enableTreeGridRefresh(true);
                this.refresh();
            }
            else {
                this._toolbar.toolbarClick(args, this);
            }
        };
        /**
         * Save tree grid settings
         *
         * @protected
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.saveTreeGridSettings = function () {
            if (this.component.getPersistency()) {
                this.updatescrollbarsObservation();
                this.saveSettings();
            }
        };
        /**
         * Updates scrollbar observation for both scrollbars
         *
         * @protected
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.updatescrollbarsObservation = function () {
            var verticalScrollbar = this.getVerticalScrollbar();
            var horizontalScrollbar = this.getHorizontalScrollbar();
            this.updateScrollbarObservation(verticalScrollbar, this._verticalScrollbarObserver);
            this.updateScrollbarObservation(horizontalScrollbar, this._horizontalScrollbarObserver);
        };
        /**
         * Observe scrollbar, unobserve scrollbar or don't do anything.
         *
         * @private
         * @param {(HTMLElement | undefined)} element
         * @param {(MutationObserver | undefined)} observer
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.updateScrollbarObservation = function (element, observer) {
            if (element !== undefined && observer === undefined) {
                this.observeScrollbar(element, observer);
            }
            else if (element === undefined) {
                this.unobserveScrollbar(observer);
            }
        };
        /**
         * Get element of vertical scrollbar
         *
         * @private
         * @returns {(HTMLElement | undefined)}
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.getVerticalScrollbar = function () {
            var scrollbarElement = $(this.mainDiv).find('.e-vscrollbar');
            if (scrollbarElement.length > 0) {
                return scrollbarElement.find('.e-vhandle')[0];
            }
            return undefined;
        };
        /**
         * Get element of horizontal scrollbar
         *
         * @private
         * @returns {(HTMLElement | undefined)}
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.getHorizontalScrollbar = function () {
            var scrollbarElement = $(this.mainDiv).find('.e-hscrollbar');
            if (scrollbarElement.length > 0) {
                return scrollbarElement.find('.e-hhandle')[0];
            }
            return undefined;
        };
        /**
         * Observe scrollbar for changes
         *
         * @private
         * @param {HTMLElement} target
         * @param {(MutationObserver | undefined)} observer
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.observeScrollbar = function (target, observer) {
            var widget = this;
            observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutationRecord) {
                    var scrollSettings = widget.getComponentSettings(true).data.scrollbars;
                    if (scrollSettings.horizontal != widget._previousScrollSettings.horizontal || scrollSettings.vertical != widget._previousScrollSettings.vertical) {
                        widget._previousScrollSettings = scrollSettings;
                        widget.saveSettings();
                    }
                });
            });
            observer.observe(target, { attributes: true });
        };
        /**
         * Unobserve scrollbar
         *
         * @private
         * @param {(MutationObserver | undefined)} observer
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.unobserveScrollbar = function (observer) {
            if (observer !== undefined) {
                observer.disconnect();
                observer = undefined;
            }
        };
        /**
         * Sets flags that enables/disables refresh of treegrid
         *
         * @param {boolean} value
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.enableTreeGridRefresh = function (value) {
            this.refreshEnabled = value;
        };
        TreeGridWidgetBase.prototype.refresh = function () { };
        ;
        /**
         * Creates the column templates for the tree grid and adds them to the widget container
         *
         * @protected
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.createColumnTemplates = function () {
        };
        TreeGridWidgetBase.ColumnsSettingId = "columns";
        TreeGridWidgetBase.ScrollbarsSettingsId = "scrollbars";
        return TreeGridWidgetBase;
    }(widgetBase_1.WidgetBase));
    exports.TreeGridWidgetBase = TreeGridWidgetBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZUdyaWRXaWRnZXRCYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NvbW1vbi90cmVlR3JpZFdpZGdldEJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQU1BO1FBQTBDLHNDQUFVO1FBQXBEO1lBQUEscUVBZ3FCQztZQTNwQlEsZ0NBQTBCLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQ0FBa0M7WUFDbkUscUNBQStCLEdBQUcsRUFBRSxDQUFDO1lBQ3JDLHVCQUFpQixHQUFHLEtBQUssQ0FBQztZQUMxQiwwQkFBb0IsR0FBRyxLQUFLLENBQUM7WUFJN0IsNkJBQXVCLEdBQW9CLEVBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxFQUFDLENBQUM7WUFPMUUsb0JBQWMsR0FBWSxJQUFJLENBQUM7O1FBNm9CMUMsQ0FBQztRQTNvQkEsdUNBQVUsR0FBVjtZQUNDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBRXpCLHdCQUF3QjtZQUN4QixpQkFBTSxVQUFVLFdBQUUsQ0FBQztRQUNwQixDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILG9DQUFPLEdBQVA7WUFDQyxpQkFBTSxPQUFPLFdBQUUsQ0FBQztZQUVoQixJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUM5QyxJQUFHLGNBQWMsSUFBSSxTQUFTLEVBQUM7Z0JBQzlCLGNBQWMsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUN6QjtRQUNGLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0gsNkNBQWdCLEdBQWhCLFVBQWlCLFdBQW1CLEVBQUUsOEJBQXNDO1lBQzNFLElBQUksQ0FBQywwQkFBMEIsR0FBRyxXQUFXLENBQUM7WUFDOUMsSUFBSSxDQUFDLCtCQUErQixHQUFHLDhCQUE4QixDQUFDO1FBQ3ZFLENBQUM7UUFFRDs7OztXQUlNO1FBQ0gsdUNB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QixHQUFHLFNBQVMsQ0FBQztRQUM3Qix1Q0FBb0IsR0FBRyxZQUFZLENBQUM7UUFpcEI1RCx5QkFBQztLQUFBLEFBaHFCRCxDQUEwQyx1QkFBVSxHQWdxQm5EO0lBRU8sZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV2lkZ2V0QmFzZSB9IGZyb20gXCIuL3dpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgVHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uIH0gZnJvbSBcIi4vdHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IElTY3JvbGxTZXR0aW5ncyB9IGZyb20gXCIuL2ludGVyZmFjZXMvc2Nyb2xsU2V0dGluZ3NJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHJlZUdyaWRUb29sYmFyQmFzZSB9IGZyb20gXCIuL3RyZWVHcmlkVG9vbGJhckJhc2VcIjtcclxuXHJcbmFic3RyYWN0IGNsYXNzIFRyZWVHcmlkV2lkZ2V0QmFzZSBleHRlbmRzIFdpZGdldEJhc2V7XHJcblxyXG5cdHByb3RlY3RlZCBfYWN0dWFsV2lkdGg7XHJcblx0cHJvdGVjdGVkIF9hY3R1YWxIZWlnaHQ7XHJcblxyXG5cdHByaXZhdGUgX2NvbHVtbkluZGV4Rm9yRHluYW1pY1NpemUgPSAtMTsgLy8gLTEgZm9yIG5vIGR5bmFtaWMgc2l6ZSBiZWhhdmlvclxyXG5cdHByaXZhdGUgX21pbkNvbHVtbldpZHRoRm9yRHluYW1pY0NvbHVtbiA9IDEwO1xyXG5cdHByaXZhdGUgX2hpZGVDb2x1bW5IZWFkZXIgPSBmYWxzZTtcclxuXHRwcml2YXRlIF9oaWRlSGVhZGVyRmlsdGVyQmFyID0gZmFsc2U7XHJcblxyXG5cdHByaXZhdGUgX3ZlcnRpY2FsU2Nyb2xsYmFyT2JzZXJ2ZXI7XHJcblx0cHJpdmF0ZSBfaG9yaXpvbnRhbFNjcm9sbGJhck9ic2VydmVyO1xyXG5cdHByaXZhdGUgX3ByZXZpb3VzU2Nyb2xsU2V0dGluZ3M6IElTY3JvbGxTZXR0aW5ncyA9IHtcInZlcnRpY2FsXCI6IDAsIFwiaG9yaXpvbnRhbFwiOiAwfTtcclxuXHJcblx0cHVibGljIHN0YXRpYyByZWFkb25seSBDb2x1bW5zU2V0dGluZ0lkID0gXCJjb2x1bW5zXCI7XHJcblx0cHVibGljIHN0YXRpYyByZWFkb25seSBTY3JvbGxiYXJzU2V0dGluZ3NJZCA9IFwic2Nyb2xsYmFyc1wiO1xyXG5cclxuXHRwcm90ZWN0ZWQgX3Rvb2xiYXIhOiBUcmVlR3JpZFRvb2xiYXJCYXNlO1xyXG5cclxuXHRwcm90ZWN0ZWQgcmVmcmVzaEVuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuXHRpbml0aWFsaXplKCkge1xyXG5cdFx0dGhpcy5pbml0aWFsaXplTG9jYWxlcygpO1xyXG5cdFx0XHJcblx0XHQvLyBJbml0aWFsaXplIHRoZSB3aWRnZXRcclxuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcdFx0XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEaXNwb3NlIHRoZSB0cmVlIGdyaWQgZGF0YVxyXG5cdCAqXHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdGRpc3Bvc2UoKXtcclxuXHRcdHN1cGVyLmRpc3Bvc2UoKTtcclxuXHJcblx0XHRsZXQgdHJlZUdyaWRPYmplY3QgPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcblx0XHRpZih0cmVlR3JpZE9iamVjdCAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHR0cmVlR3JpZE9iamVjdC5kZXN0cm95KCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIGEgZHluYW1pYyBjb2x1bW5cclxuXHQgKiBUaGlzIGNvbHVtbiB3aWxsIGJlIHJlc2l6ZWQgaWYgdGhlIHdpbmRvdy93aWRnZXQgd2VyZSByZXNpemVkXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gY29sdW1uSW5kZXhcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gbWluQ29sdW1uV2lkdGhGb3JEeW5hbWljQ29sdW1uXHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdHNldER5bmFtaWNDb2x1bW4oY29sdW1uSW5kZXg6IG51bWJlciwgbWluQ29sdW1uV2lkdGhGb3JEeW5hbWljQ29sdW1uOiBudW1iZXIpe1xyXG5cdFx0dGhpcy5fY29sdW1uSW5kZXhGb3JEeW5hbWljU2l6ZSA9IGNvbHVtbkluZGV4O1xyXG5cdFx0dGhpcy5fbWluQ29sdW1uV2lkdGhGb3JEeW5hbWljQ29sdW1uID0gbWluQ29sdW1uV2lkdGhGb3JEeW5hbWljQ29sdW1uO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgc3R5bGVzIGZvciB0aGUgdHJlZSBncmlkIHdpZGdldCBiYXNlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBsb2FkU3R5bGVzKCl7XHJcblx0XHR0aGlzLmFkZFN0eWxlKFwid2lkZ2V0cy9jb21tb24vc3R5bGUvY3NzL3RyZWVHcmlkU3R5bGUuY3NzXCIpO1xyXG5cdFx0dGhpcy5hZGRTdHlsZShcIndpZGdldHMvY29tbW9uL3N0eWxlL2Nzcy90cmVlR3JpZFNjcm9sbEJhclN0eWxlLmNzc1wiKTtcclxuXHRcdHRoaXMuYWRkU3R5bGUoXCJ3aWRnZXRzL2NvbW1vbi9zdHlsZS9jc3MvdHJlZUdyaWRJY29uU3R5bGUuY3NzXCIpO1xyXG5cdFx0dGhpcy5hZGRTdHlsZShcIndpZGdldHMvY29tbW9uL3N0eWxlL2Nzcy90cmVlR3JpZFRvb2xiYXJCdXR0b25TdHlsZS5jc3NcIik7XHJcblx0XHR0aGlzLmFkZFN0eWxlKFwid2lkZ2V0cy9jb21tb24vc3R5bGUvY3NzL3dpZGdldEhlYWRlckZvb3RlclN0eWxlLmNzc1wiKTtcclxuXHR9XHJcblxyXG5cdHNldENlbGxFZGl0KHZhbHVlOiBib29sZWFuKXtcclxuXHRcdHZhciB0cmVlR3JpZE9iamVjdCA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuXHRcdCg8YW55PnRyZWVHcmlkT2JqZWN0Lm1vZGVsKS5pc0VkaXQgPSB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGZsYWcgdGhhdCB0aGUgY29sdW1uIGhlYWRlciBvZiB0aGUgdHJlZSBncmlkIHNob3VsZCBiZSBoaWRkZW5cclxuXHQgKlxyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRzZXRDb2x1bW5IZWFkZXJIaWRkZW4oKXtcclxuXHRcdHRoaXMuX2hpZGVDb2x1bW5IZWFkZXIgPSB0cnVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZmxhZyB0aGF0IHRoZSBoZWFkZXIgZmlsdGVyYmFyIG9mIHRoZSB0cmVlIGdyaWQgc2hvdWxkIGJlIGhpZGRlblxyXG5cdCAqXHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdHNldEhlYWRlckZpbHRlckJhckhpZGRlbigpe1xyXG5cdFx0dGhpcy5faGlkZUhlYWRlckZpbHRlckJhciA9IHRydWU7XHJcblx0fVxyXG5cclxuXHQvKiogcmVzaXplcyB0aGUgdHJlZSBncmlkIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpe1xyXG5cdFx0dGhpcy5fYWN0dWFsV2lkdGggPSB3aWR0aDtcclxuXHRcdHRoaXMuX2FjdHVhbEhlaWdodCA9IGhlaWdodDtcclxuXHJcblx0XHR2YXIgbmV3V2lkdGggOiBzdHJpbmcgPSBcIlwiO1xyXG5cdFx0dmFyIG5ld0hlaWdodCA6IHN0cmluZyA9IFwiXCI7XHJcblx0XHRpZih3aWR0aCAhPSAwKXtcclxuXHRcdFx0bmV3V2lkdGggPSB3aWR0aCArIFwicHhcIjtcclxuXHRcdH1cclxuXHRcdGlmKGhlaWdodCAhPSAwKXtcclxuXHRcdFx0bmV3SGVpZ2h0ID0gdGhpcy5nZXROZXdIZWlnaHQoaGVpZ2h0KTtcclxuXHRcdH1cclxuXHRcdFx0XHJcblx0XHR2YXIgdHJlZUdyaWRPYmogPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCksXHJcblx0XHRcdHNpemVTZXR0aW5ncyA9IHtcclxuXHRcdFx0XHRoZWlnaHQ6IG5ld0hlaWdodCwgd2lkdGg6IG5ld1dpZHRoLCAvLyAxMDAlIHdvdWxkIGJlIHdyb25nID0+IHNldCBlbXB0eSBzdHJpbmcgdG8gcmVzaXplIHRoZSB0cmVlZ3JpZCBjb3JyZWN0XHJcblx0XHR9O1xyXG5cdFx0aWYgKHRyZWVHcmlkT2JqKXtcclxuXHRcdFx0Ly8gU2F2ZSBjZWxsIGlmIGN1cnJlbnRseSBpbiBlZGl0IG1vZGUgYmVmb3JlIHN0YXJ0IHJlc2l6aW5nIHRoZSB0cmVlZ3JpZCwgb3RoZXJ3aXNlIGVycm9ycyB3b3VsZCBvY2N1clxyXG5cdFx0XHR0cmVlR3JpZE9iai5zYXZlQ2VsbCgpOyBcclxuXHRcdFx0dHJlZUdyaWRPYmoub3B0aW9uKFwic2l6ZVNldHRpbmdzXCIsIHNpemVTZXR0aW5ncywgdHJ1ZSk7IC8vIGZvcmNlIHRoZSBzZXR0aW5nIHRvIHJlc2l6ZSB0aGUgdHJlZWdyaWQgY29ycmVjdFxyXG5cdFx0fVxyXG5cdFx0aWYodGhpcy5fY29sdW1uSW5kZXhGb3JEeW5hbWljU2l6ZSAhPSAtMSl7XHJcblx0XHRcdHRoaXMuZmlsbFNwYWNlV2l0aER5bmFtaWNDb2x1bW4od2lkdGgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vV2hlbiB0cmVlR3JpZCBpcyByZXNpemVkLCBzeW5jZiBzY3JvbGxiYXIgY2FuIGJlIGFkZGVkIG9yIHJlbW92ZWRcclxuXHRcdHRoaXMudXBkYXRlc2Nyb2xsYmFyc09ic2VydmF0aW9uKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXQgbmV3IGhlaWdodCBvZiB0cmVlZ3JpZFxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9XHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdGdldE5ld0hlaWdodChoZWlnaHQ6IG51bWJlcik6IHN0cmluZyB7XHJcblx0XHRsZXQgbmV3SGVpZ2h0ID0gaGVpZ2h0IC0gdGhpcy5faGVhZGVySGVpZ2h0IC0gdGhpcy5fZm9vdGVySGVpZ2h0ICsgXCJweFwiO1xyXG5cdFx0aWYgKHRoaXMuX2Zvb3RlckhlaWdodCAhPSAwKSB7XHJcblx0XHRcdGxldCBub25Db250ZW50SGVpZ2h0ID0gdGhpcy5nZXROb25UcmVlR3JpZENvbnRlbnRIZWlnaHQoKTtcclxuXHRcdFx0aWYgKHBhcnNlRmxvYXQobmV3SGVpZ2h0KSA8IG5vbkNvbnRlbnRIZWlnaHQpIHtcclxuXHRcdFx0XHRpZih0aGlzLmZvb3RlckRpdiAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRcdFx0dGhpcy5mb290ZXJEaXYuaGlkZGVuID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bmV3SGVpZ2h0ID0gaGVpZ2h0IC0gdGhpcy5faGVhZGVySGVpZ2h0ICtcInB4XCI7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0aWYodGhpcy5mb290ZXJEaXYgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0XHRcdHRoaXMuZm9vdGVyRGl2LmhpZGRlbiA9IGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG5ld0hlaWdodDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldCBoZWlnaHQgb2YgdHJlZWdyaWQgd2l0aG91dCBjb250ZW50ICh0b29sYmFyICsgaGVhZGVyKVxyXG5cdCAqXHJcblx0ICogQHJldHVybnMge251bWJlcn1cclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcblx0Z2V0Tm9uVHJlZUdyaWRDb250ZW50SGVpZ2h0KCk6IG51bWJlciB7XHJcblx0XHRsZXQgdG9vbGJhciA9ICQodGhpcy5tYWluRGl2KS5maW5kKCcuZS10cmVlZ3JpZHRvb2xiYXInKTtcclxuXHRcdGxldCBoZWFkZXIgPSAkKHRoaXMubWFpbkRpdikuZmluZCgnLmUtZ3JpZGhlYWRlcicpO1xyXG5cdFx0bGV0IHRvb2xiYXJIZWlnaHQgPSBwYXJzZUZsb2F0KHRvb2xiYXIuY3NzKCdoZWlnaHQnKSk7XHJcblx0XHRsZXQgaGVhZGVySGVpZ2h0ID0gcGFyc2VGbG9hdChoZWFkZXIuY3NzKCdoZWlnaHQnKSk7XHJcblx0XHR0b29sYmFySGVpZ2h0ID0gdG9vbGJhckhlaWdodCA9PSBOYU4gPyAwIDogdG9vbGJhckhlaWdodDtcclxuXHRcdGhlYWRlckhlaWdodCA9IGhlYWRlckhlaWdodCA9PSBOYU4gPyAwIDogaGVhZGVySGVpZ2h0O1xyXG5cdFx0XHJcblx0XHQvLzEgaXMgYWRkZWQgaWYgaXQgaXMgbm90IGEgR2FudHQgY2hhcnQgKHN5bmNmdXNpb24gaW50ZXJuYWwgd2VpcmQgc3R1ZmYpXHJcblx0XHRyZXR1cm4gdG9vbGJhckhlaWdodCArIGhlYWRlckhlaWdodCArIDE7XHJcblx0fVxyXG5cclxuXHRzZXRNb2RlbChtb2RlbDogYW55LCBmb3JjZTogYm9vbGVhbiA9IGZhbHNlKXtcclxuXHRcdHZhciB0cmVlR3JpZE9iaiA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuXHRcdHRyZWVHcmlkT2JqLnNldE1vZGVsKHtcImRhdGFTb3VyY2VcIiA6IG1vZGVsfSwgZm9yY2UpO1xyXG5cdFx0XHJcblx0XHRpZih0aGlzLl9jb2x1bW5JbmRleEZvckR5bmFtaWNTaXplICE9IC0xKXtcclxuXHRcdFx0Ly8gVG8gYXZvaWQgZW1wdHkgc3BhY2UgYWZ0ZXIgbGFzdCBjb2x1bW4gYmVjYXVzZSBvZiByZW1vdmluZyB0aGUgc2Nyb2xsYmFyIGlmIGxlc3MgZGF0YSBpcyBhdmFpbGFibGVcclxuXHRcdFx0dGhpcy5maWxsU3BhY2VXaXRoRHluYW1pY0NvbHVtbih0aGlzLndpZHRoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlc2l6ZSBkeW5hbWljIGNvbHVtblxyXG5cdCAqIElmIGNoYW5nZWQgY29sdW1uIHdhcyBkeW5hbWljIGNvbHVtbiB0aGUgc2l6ZSBvZiB0aGUgbGFzdCBjb2x1bW4gd2lsbCBiZSBhZGFwdGVkXHJcblx0ICpcclxuXHQgKiBAcGFyYW0geyp9IGNvbHVtbkluZGV4XHRjb2x1bW5JbmRleCBvZiBjaGFuZ2VkIGNvbHVtblxyXG5cdCAqIEBwYXJhbSB7Kn0gdHJlZUdyaWRNb2RlbFxyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRyZXNpemVEeW5hbWljQ29sdW1uKGNvbHVtbkluZGV4LCB0cmVlR3JpZE1vZGVsKXtcclxuXHRcdGxldCB0cmVlR3JpZFdpZHRoID0gcGFyc2VJbnQodHJlZUdyaWRNb2RlbC5zaXplU2V0dGluZ3Mud2lkdGgsIDEwKTsgLy8gcGFyc2VJbnQgdG8gcmVtb3ZlIFwicHhcIlxyXG5cdFx0aWYoY29sdW1uSW5kZXggIT0gdGhpcy5fY29sdW1uSW5kZXhGb3JEeW5hbWljU2l6ZSAmJiBjb2x1bW5JbmRleCA8IHRoaXMuX2NvbHVtbkluZGV4Rm9yRHluYW1pY1NpemUpe1xyXG5cdFx0XHR0aGlzLmZpbGxTcGFjZVdpdGhEeW5hbWljQ29sdW1uKHRyZWVHcmlkV2lkdGgpOyBcclxuXHRcdH1cclxuXHRcdGVsc2V7XHJcblx0XHRcdC8vIER5bmFtaWMgY29sdW1uIHNpemUgd2FzIGNoYW5nZWQgPT4gdXBkYXRlIGxhc3QgXCJ2aXNpYmxlXCIgY29sdW1uIHRvIGZpbGwgc3BhY2VcclxuXHRcdFx0bGV0IGxhc3RWaXNpYmxlQ29sdW1uSW5kZXggPSB0aGlzLmdldExhc3RWaXNpYmxlQ29sdW1uSW5kZXgodHJlZUdyaWRNb2RlbCk7XHJcblx0XHRcdHRoaXMuZmlsbFNwYWNlV2l0aENvbHVtbihsYXN0VmlzaWJsZUNvbHVtbkluZGV4LCB0cmVlR3JpZFdpZHRoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIHNldHRpbmdzIG9mIHRoaXMgY29tcG9uZW50XHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IG9ubHlNb2RpZmllZFxyXG5cdCAqIEByZXR1cm5zIHtDb21wb25lbnRTZXR0aW5nc31cclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcblx0cHVibGljIGdldENvbXBvbmVudFNldHRpbmdzKG9ubHlNb2RpZmllZDogYm9vbGVhbik6IENvbXBvbmVudFNldHRpbmdze1xyXG5cdFx0Ly8gQWRkIHRyZWVncmlkIHBlcnNpc3RpbmcgZGF0YVxyXG5cdFx0dGhpcy5jb21wb25lbnQuc2V0U2V0dGluZyhUcmVlR3JpZFdpZGdldEJhc2UuQ29sdW1uc1NldHRpbmdJZCwgdGhpcy5nZXRDb2x1bW5TZXR0aW5ncygpKTtcclxuXHRcdHRoaXMuY29tcG9uZW50LnNldFNldHRpbmcoVHJlZUdyaWRXaWRnZXRCYXNlLlNjcm9sbGJhcnNTZXR0aW5nc0lkLCB0aGlzLmdldFNjcm9sbEJhclNldHRpbmdzKCkpO1xyXG5cdFx0cmV0dXJuIHN1cGVyLmdldENvbXBvbmVudFNldHRpbmdzKG9ubHlNb2RpZmllZCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBnaXZlbiBzZXR0aW5ncyB0byB0aGlzIGNvbXBvbmVudFxyXG5cdCAqMlxyXG5cdCAqIEBwYXJhbSB7Q29tcG9uZW50U2V0dGluZ3N9IGNvbXBvbmVudFNldHRpbmdzXHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzZXRDb21wb25lbnRTZXR0aW5ncyhjb21wb25lbnRTZXR0aW5nczogQ29tcG9uZW50U2V0dGluZ3MpIHtcclxuXHRcdGlmKGNvbXBvbmVudFNldHRpbmdzICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdHN1cGVyLnNldENvbXBvbmVudFNldHRpbmdzKGNvbXBvbmVudFNldHRpbmdzKTtcdFx0XHJcblx0XHRcdHRoaXMuc2V0Q29sdW1uU2V0dGluZ3ModGhpcy5jb21wb25lbnQuZ2V0U2V0dGluZyhUcmVlR3JpZFdpZGdldEJhc2UuQ29sdW1uc1NldHRpbmdJZCkpO1xyXG5cdFx0XHR0aGlzLnNldFNjcm9sbEJhclNldHRpbmdzKHRoaXMuY29tcG9uZW50LmdldFNldHRpbmcoVHJlZUdyaWRXaWRnZXRCYXNlLlNjcm9sbGJhcnNTZXR0aW5nc0lkKSk7XHJcblx0XHRcdC8vIEhpZGUgdGFibGVoZWFkZXIvZmlsdGVyIHJvdyBhZnRlciBzZXR0aW5nIG5ldyBjb2x1bW4gc2l6ZXMgaWYgbmVlZGVkXHJcblx0XHRcdGlmKHRoaXMuaGlkZVNvbWVUYWJsZUhlYWRlclBhcnRzKCkgPT0gdHJ1ZSl7XHJcblx0XHRcdFx0Ly8gQWZ0ZXIgc2V0dGluZyB0aGUgdHJlZWdyaWQgY29sdW1uIHNpemVzLCB0aGUgaGVhZGVyIHBhcnRzIHdpbGwgYmUgc2hvd24gPT4gaGlkZSBoZWFkZXIgcGFydHMgaWYgbm90IG5lZWRlZFxyXG5cdFx0XHRcdHRoaXMuaGlkZVRhYmxlSGVhZGVyKCk7IFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBjb2x1bW4gc2V0dGluZ3NcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHJldHVybnMge0FycmF5PFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbj59XHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZ2V0Q29sdW1uU2V0dGluZ3MoKTogQXJyYXk8VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uPntcclxuXHRcdGxldCBjb2x1bW5EYXRhID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHRcdGxldCB0cmVlR3JpZE9iamVjdCA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuXHRcdGlmKHRyZWVHcmlkT2JqZWN0ICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdGxldCBjb2x1bW5TZXR0aW5ncyA9IHRyZWVHcmlkT2JqZWN0Lm9wdGlvbihcImNvbHVtbnNcIik7IFxyXG5cdFx0XHRpZihjb2x1bW5TZXR0aW5ncyAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBjb2x1bW5TZXR0aW5ncy5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdFx0XHRjb2x1bW5EYXRhLnB1c2gobmV3IFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbihjb2x1bW5TZXR0aW5nc1tpXS5maWVsZCwgY29sdW1uU2V0dGluZ3NbaV0ud2lkdGgsIGNvbHVtblNldHRpbmdzW2ldLnZpc2libGUpKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBjb2x1bW5EYXRhO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZ2l2ZW4gY29sdW1ucyBzZXR0aW5ncyBcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7QXJyYXk8VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uPn0gY29sdW1uRGF0YVxyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRwdWJsaWMgc2V0Q29sdW1uU2V0dGluZ3MoY29sdW1uRGF0YTogQXJyYXk8VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uPikge1xyXG5cdFx0bGV0IHRyZWVHcmlkT2JqZWN0ID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG5cdFx0aWYodHJlZUdyaWRPYmplY3QgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0aWYoY29sdW1uRGF0YSAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRcdGxldCBjb2x1bW5TZXR0aW5nczogQXJyYXk8YW55PiA9IHRyZWVHcmlkT2JqZWN0Lm9wdGlvbihcImNvbHVtbnNcIik7XHJcblx0XHRcdFx0aWYoY29sdW1uU2V0dGluZ3MgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBjb2x1bW5EYXRhLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0XHRcdFx0bGV0IGNvbHVtblNldHRpbmcgPSBjb2x1bW5TZXR0aW5ncy5maW5kKGNvbFNldHRpbmcgPT4gY29sU2V0dGluZy5maWVsZCA9PSBjb2x1bW5EYXRhW2ldLmlkKTtcclxuXHRcdFx0XHRcdFx0aWYoY29sdW1uU2V0dGluZyAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRcdFx0XHRcdGNvbHVtblNldHRpbmcudmlzaWJsZSA9IGNvbHVtbkRhdGFbaV0uaXNWaXNpYmxlO1xyXG5cdFx0XHRcdFx0XHRcdGNvbHVtblNldHRpbmcud2lkdGggPSBjb2x1bW5EYXRhW2ldLndpZHRoO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGVsc2V7XHJcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcihcImNvbHVtblNldHRpbmdzIG5vdCBhdmFpbGFibGUgZm9yIGluZGV4OiBcIiArIGkpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRyZWVHcmlkT2JqZWN0Lm9wdGlvbihcImNvbHVtbnNcIiwgY29sdW1uU2V0dGluZ3MsIHRydWUpOyBcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gSGlkZSB0YWJsZWhlYWRlci9maWx0ZXIgcm93IGFmdGVyIHNldHRpbmcgbmV3IGNvbHVtbiBzaXplcyBpZiBuZWVkZWRcclxuXHRcdFx0aWYodGhpcy5oaWRlU29tZVRhYmxlSGVhZGVyUGFydHMoKSA9PSB0cnVlKXtcclxuXHRcdFx0XHQvLyBBZnRlciBzZXR0aW5nIHRoZSB0cmVlZ3JpZCBjb2x1bW4gc2l6ZXMsIHRoZSBoZWFkZXIgcGFydHMgd2lsbCBiZSBzaG93biA9PiBoaWRlIGhlYWRlciBwYXJ0cyBpZiBub3QgbmVlZGVkXHJcblx0XHRcdFx0dGhpcy5oaWRlVGFibGVIZWFkZXIoKTsgXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2V0U2Nyb2xsQmFyU2V0dGluZ3MoKTogSVNjcm9sbFNldHRpbmdzIHtcclxuXHRcdGxldCB0cmVlR3JpZE9iamVjdCA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuXHRcdGxldCBzZXR0aW5nczogSVNjcm9sbFNldHRpbmdzID0ge1xyXG5cdFx0XHRcInZlcnRpY2FsXCI6IHRyZWVHcmlkT2JqZWN0LmdldFNjcm9sbFRvcE9mZnNldCgpLFxyXG5cdFx0XHRcImhvcml6b250YWxcIjogdHJlZUdyaWRPYmplY3QuZ2V0U2Nyb2xsTGVmdE9mZnNldCgpXHJcblx0XHR9O1xyXG5cclxuXHRcdHJldHVybiBzZXR0aW5ncztcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXRTY3JvbGxCYXJTZXR0aW5ncyhkYXRhOiBJU2Nyb2xsU2V0dGluZ3MgfCB1bmRlZmluZWQpe1xyXG5cdFx0aWYoZGF0YSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcblx0XHR9XHJcblx0XHRsZXQgdHJlZUdyaWRPYmplY3QgPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcblx0XHR0cmVlR3JpZE9iamVjdC5zY3JvbGxPZmZzZXQoZGF0YS5ob3Jpem9udGFsLCBkYXRhLnZlcnRpY2FsKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBsYXN0IHZpc2libGUgY29sdW1uXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Kn0gdHJlZUdyaWRNb2RlbFxyXG5cdCAqIEByZXR1cm5zXHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZ2V0TGFzdFZpc2libGVDb2x1bW5JbmRleCh0cmVlR3JpZE1vZGVsKXtcclxuXHRcdGZvcihsZXQgaSA9IHRyZWVHcmlkTW9kZWwuY29sdW1ucy5sZW5ndGgtMTsgaSA+PSAwOyBpLS0pe1xyXG5cdFx0XHRpZih0cmVlR3JpZE1vZGVsLmNvbHVtbnNbaV0udmlzaWJsZSA9PSB0cnVlKXtcclxuXHRcdFx0XHRyZXR1cm4gaTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIC0xO1xyXG5cdH1cclxuXHJcbiAgICAvKipcclxuXHQgKiBjcmVhdGVzIHRoZSB0cmVlIGdyaWRcclxuXHQgKlxyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuICAgIGNyZWF0ZUxheW91dCgpIHtcclxuXHRcdFxyXG5cdFx0dGhpcy5jcmVhdGVDb2x1bW5UZW1wbGF0ZXMoKTtcclxuXHJcblx0XHR0aGlzLmNyZWF0ZVRyZWVHcmlkKCk7XHJcblx0XHJcblx0XHRpZih0aGlzLmhpZGVTb21lVGFibGVIZWFkZXJQYXJ0cygpID09IHRydWUpe1xyXG5cdFx0XHQvLyBIaWRlIHNvbWUgaGVhZGVyIHBhcnRzIG9mIHRyZWVncmlkXHJcblx0XHRcdHRoaXMuaGlkZVRhYmxlSGVhZGVyKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIGVqIHRyZWUgZ3JpZCBvYmplY3RcclxuXHQgKlxyXG5cdCAqIEByZXR1cm5zIHtlai5UcmVlR3JpZH1cclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcblx0cHJvdGVjdGVkIGdldFRyZWVHcmlkT2JqZWN0KCk6IGVqLlRyZWVHcmlke1xyXG5cdFx0cmV0dXJuICQodGhpcy5tYWluRGl2KS5kYXRhKFwiZWpUcmVlR3JpZFwiKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIHRyZWUgcmVjb3JkIGZvciB0aGUgZ2l2ZW4gZWxlbWVudFxyXG5cdCAqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqIEBwYXJhbSB7Kn0gZWxlbWVudFxyXG5cdCAqIEByZXR1cm5zIHthbnl9XHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdHByb3RlY3RlZCBnZXRUcmVlUmVjb3JkKGVsZW1lbnQpOiBhbnl7XHJcbiAgICAgICAgbGV0IHRyZWVncmlkT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG4gICAgICAgIGxldCB0ciA9IGVsZW1lbnQuY2xvc2VzdChcInRyXCIpOyAgXHJcbiAgICAgICAgaWYodHIgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0bGV0IGluZGV4ID0gdHIucm93SW5kZXg7XHJcblx0XHRcdGlmKCg8YW55PnRyZWVncmlkT2JqLm1vZGVsKS5jdXJyZW50Vmlld0RhdGEgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0XHRyZXR1cm4gKDxhbnk+dHJlZWdyaWRPYmoubW9kZWwpLmN1cnJlbnRWaWV3RGF0YVtpbmRleF07XHJcblx0XHRcdH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0IHRoZSBmb2N1cyB0byB0aGUgY3VycmVudCB0cmVlIGdyaWRcclxuXHQgKlxyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRmb2N1cygpe1xyXG5cdFx0Ly8gVE9ETzogTm8gcHVibGljIGZvY3VzIG1ldGhvZCBhdmFpbGFibGUgZm9yIHRyZWUgZ3JpZCwgYnV0IG5lZWRlZCBmb3IgZm9yY2luZyB0aGUgZm9jdXMgdG8gdGhlIHRyZWUgZ3JpZCBpZiBkcmFnZ2FibGUgaXMgdXNlZCBpbiBhIHRyZWUgZ3JpZFxyXG5cdFx0Ly8gKGluIGNhc2Ugb2YgZHJhZ2dhYmxlIHRyZWUgZ3JpZCB3aWxsIG5vdCBiZSBmb2N1c2VkIGJlY2F1c2Ugbm90IHRoZSB0cmVlZ3JpZCByb3cgd2lsbCBiZSBzZWxlY3RlZCBvbiBhIGNsaWNrLCBidXQgdGhlIGRpcmVjdGx5IGRpdiB3aWxsIGJ5IHNlbGVjdGVkID0+IHN2ZyBvciBvdGhlciBkaXYpXHJcblx0XHQoPGFueT50aGlzLmdldFRyZWVHcmlkT2JqZWN0KCkpLl9mb2N1c1RyZWVHcmlkRWxlbWVudCgpO1xyXG5cdH1cclxuXHRcclxuXHJcblx0LyoqXHJcblx0ICogSW5pdGlhbGl6ZXMgbG9jYWxlIHJlc291cmNlc1xyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBpbml0aWFsaXplTG9jYWxlcygpIHtcclxuXHRcdC8vIGdldCB0aGUgbG9jYWxlcyBmb3IgdGhlIHRyZWVncmlkXHJcblx0XHRsZXQgbG9jID0gZWouVHJlZUdyaWQuTG9jYWxlO1xyXG5cclxuXHRcdC8vIHNob3cgYW4gZW1wdHkgc3RyaW5nIGlmIG5vIHJlY29yZHMgYXJlIGF2YWlsYWJsZVxyXG5cdFx0bG9jLmRlZmF1bHQuZW1wdHlSZWNvcmQgPSBcIlwiO1xyXG5cdH1cclxuXHRcclxuXHRwcml2YXRlIGZpbGxTcGFjZVdpdGhEeW5hbWljQ29sdW1uKHRyZWVncmlkV2lkdGg6IG51bWJlcil7XHJcblx0XHRpZih0aGlzLl9jb2x1bW5JbmRleEZvckR5bmFtaWNTaXplID09IC0xKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5maWxsU3BhY2VXaXRoQ29sdW1uKHRoaXMuX2NvbHVtbkluZGV4Rm9yRHluYW1pY1NpemUsIHRyZWVncmlkV2lkdGgpXHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGZpbGxTcGFjZVdpdGhDb2x1bW4oZmlsbFNwYWNlQ29sdW1uSW5kZXg6IG51bWJlciwgdHJlZWdyaWRXaWR0aDogbnVtYmVyKXtcclxuXHRcdHZhciB0cmVlT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG5cdFx0aWYoIXRyZWVPYmope1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGNvbHVtbnMgPSB0cmVlT2JqLm9wdGlvbihcImNvbHVtbnNcIik7IFxyXG5cdFx0aWYoIWNvbHVtbnMpe1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IG5ld0NvbHVtbldpZHRoID0gdGhpcy5nZXROZXdDb2x1bW5XaWR0aCh0cmVlZ3JpZFdpZHRoLCBjb2x1bW5zLCBmaWxsU3BhY2VDb2x1bW5JbmRleCk7XHJcbiAgICAgICAgaWYobmV3Q29sdW1uV2lkdGggPiB0aGlzLl9taW5Db2x1bW5XaWR0aEZvckR5bmFtaWNDb2x1bW4pe1xyXG4gICAgICAgICAgICBjb2x1bW5zW2ZpbGxTcGFjZUNvbHVtbkluZGV4XS53aWR0aCA9IG5ld0NvbHVtbldpZHRoLTM7IC8vLTMgdG8gYXZvaWQgc2Nyb2xsYmFyXHJcblx0XHRcdGNvbHVtbnNbZmlsbFNwYWNlQ29sdW1uSW5kZXhdLndpZHRoIC09IHRoaXMuZ2V0U2Nyb2xsQmFyV2lkdGgoKTsgICAvLyByZW1vdmUgc2Nyb2xsYmFyIHNpemVcclxuXHRcdFx0dHJlZU9iai5vcHRpb24oXCJjb2x1bW5zXCIsIGNvbHVtbnMsIHRydWUpOyBcclxuXHRcdFx0XHJcblx0XHRcdGlmKHRoaXMuaGlkZVNvbWVUYWJsZUhlYWRlclBhcnRzKCkgPT0gdHJ1ZSl7XHJcblx0XHRcdFx0Ly8gQWZ0ZXIgc2V0dGluZyB0aGUgdHJlZWdyaWQgY282bHVtbiBzaXplcywgdGhlIGhlYWRlciBwYXJ0cyB3aWxsIGJlIHNob3duID0+IGhpZGUgaGVhZGVyIHBhcnRzIGlmIG5vdCBuZWVkZWRcclxuXHRcdFx0XHR0aGlzLmhpZGVUYWJsZUhlYWRlcigpOyBcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHVibGljIHNldENvbHVtbldpZHRoKGluZGV4OiBudW1iZXIsIHdpZHRoOiBudW1iZXIpe1xyXG5cdFx0dmFyIHRyZWVPYmogPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcblx0XHRpZighdHJlZU9iail7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgY29sdW1ucyA9IHRyZWVPYmoub3B0aW9uKFwiY29sdW1uc1wiKTsgXHJcblx0XHRpZighY29sdW1ucyl7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0Y29sdW1uc1tpbmRleF0ud2lkdGggPSB3aWR0aDtcclxuXHRcdHRyZWVPYmoub3B0aW9uKFwiY29sdW1uc1wiLCBjb2x1bW5zLCB0cnVlKTsgXHJcblxyXG5cdFx0dGhpcy5maWxsU3BhY2VXaXRoQ29sdW1uKHRoaXMuX2NvbHVtbkluZGV4Rm9yRHluYW1pY1NpemUsIHRoaXMuX2FjdHVhbFdpZHRoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdHJ1ZSBpZiBzb21lIHBhcnRzIG9mIHRoZSB0YWJsZSBoZWFkZXIgc2hvdWxkIGJlIGhpZGRlbihlLmcuIGNvbHVtbiBoZWFkZXIsIGZpbHRlcmJhciwgLi4uKVxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBoaWRlU29tZVRhYmxlSGVhZGVyUGFydHMoKTogYm9vbGVhbntcclxuXHRcdGlmKHRoaXMuX2hpZGVDb2x1bW5IZWFkZXIgPT0gdHJ1ZSl7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0aWYodGhpcy5faGlkZUhlYWRlckZpbHRlckJhciA9PSB0cnVlKXtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdldFNjcm9sbEJhcldpZHRoKCk6IG51bWJlcntcclxuXHRcdHZhciB2aWV3RGl2ID0gJCh0aGlzLm1haW5EaXYpLmZpbmQoJy5lLWdyaWRjb250ZW50Jyk7XHJcblx0XHRmb3IobGV0IGNoaWxkSW5kZXg9MDsgY2hpbGRJbmRleCA8IHZpZXdEaXZbMF0uY2hpbGRyZW4ubGVuZ3RoOyBjaGlsZEluZGV4Kyspe1xyXG5cdFx0XHRsZXQgY2hpbGQgPSB2aWV3RGl2WzBdLmNoaWxkcmVuW2NoaWxkSW5kZXhdO1xyXG5cdFx0XHRpZihjaGlsZC5jbGFzc0xpc3QuY29udGFpbnMoXCJlLXZzY3JvbGxiYXJcIikgPT0gdHJ1ZSl7XHJcblx0XHRcdFx0cmV0dXJuIGNoaWxkLmNsaWVudFdpZHRoO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gMDtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2V0TmV3Q29sdW1uV2lkdGgodHJlZWdyaWRXaWR0aCwgY29sdW1ucywgZmlsbFNwYWNlQ29sdW1uSW5kZXgpOiBudW1iZXJ7XHJcblx0XHRsZXQgbmV3Q29sdW1uV2lkdGggPSB0cmVlZ3JpZFdpZHRoO1xyXG5cdFx0Zm9yKGxldCBjb2x1bW5JbmRleD0wOyBjb2x1bW5JbmRleCA8IGNvbHVtbnMubGVuZ3RoOyBjb2x1bW5JbmRleCsrKXtcclxuICAgICAgICAgICAgaWYoY29sdW1uSW5kZXggIT0gZmlsbFNwYWNlQ29sdW1uSW5kZXgpe1xyXG5cdFx0XHRcdGlmKGNvbHVtbnNbY29sdW1uSW5kZXhdICE9IHVuZGVmaW5lZCAmJiBjb2x1bW5zW2NvbHVtbkluZGV4XS52aXNpYmxlID09IHRydWUpe1xyXG5cdFx0XHRcdFx0bmV3Q29sdW1uV2lkdGggLT0gY29sdW1uc1tjb2x1bW5JbmRleF0ud2lkdGg7XHJcblx0XHRcdFx0fVxyXG4gICAgICAgICAgICB9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gbmV3Q29sdW1uV2lkdGg7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEhpZGVzIHRoZSB0YWJsZSBoZWFkZXIgcGFydHMgd2hpY2ggYXJlIGN1cnJlbnRseSBkZWZpbmVkIHRvIGJlIGhpZGRlbihlLmcuIF9oaWRlQ29sdW1uSGVhZGVyLCBfaGlkZUhlYWRlckZpbHRlckJhciwgLi4uKVxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBoaWRlVGFibGVIZWFkZXIoKXtcclxuXHRcdGxldCAkdHJlZUdyaWRIZWFkZXIgPSAkKHRoaXMubWFpbkRpdikuZmluZChcIi5lLWdyaWRoZWFkZXJcIilcclxuXHRcdGxldCB0YWJsZUhlYWRlciA9ICR0cmVlR3JpZEhlYWRlclswXS5jaGlsZHJlblswXS5jaGlsZHJlblswXTtcclxuXHRcdGlmKHRhYmxlSGVhZGVyICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdGxldCBjb2x1bW5IZWFkZXIgPSAoPGFueT50YWJsZUhlYWRlcikucm93c1swXTtcclxuXHRcdFx0bGV0IGZpbHRlckJhciA9ICg8YW55PnRhYmxlSGVhZGVyKS5yb3dzWzFdO1xyXG5cdFx0XHRpZihjb2x1bW5IZWFkZXIgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0XHRpZih0aGlzLl9oaWRlQ29sdW1uSGVhZGVyID09IHRydWUpe1xyXG5cdFx0XHRcdFx0Ly8gaGlkZSBjb2x1bW4gaGVhZGVyXHJcblx0XHRcdFx0XHRjb2x1bW5IZWFkZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRpZihmaWx0ZXJCYXIgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0XHRpZih0aGlzLl9oaWRlSGVhZGVyRmlsdGVyQmFyID09IHRydWUpe1xyXG5cdFx0XHRcdFx0Ly8gaGlkZSBmaWx0ZXJiYXJcclxuXHRcdFx0XHRcdGZpbHRlckJhci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDYWxsZWQgd2hlbiBhIGJ1dHRvbiBpbiB0aGUgdG9vbGJhciBpcyBjbGlja2VkXHJcblx0ICpcclxuXHQgKiBAcHJvdGVjdGVkXHJcblx0ICogQHBhcmFtIHsqfSBhcmdzXHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdHByb3RlY3RlZCB0b29sYmFyQ2xpY2soYXJncykge1xyXG5cdFx0bGV0IHRyZWVHcmlkT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG5cdFx0Ly9DYW5jZWwgZWRpdCBjZWxsIHdoZW4gdG9vbGJhciBidXR0b24gaXMgY2xpY2tlZFxyXG5cdFx0aWYgKHRyZWVHcmlkT2JqICE9IHVuZGVmaW5lZCAmJiB0cmVlR3JpZE9iai5tb2RlbC5pc0VkaXQgPT0gdHJ1ZSkge1xyXG5cdFx0XHR0cmVlR3JpZE9iai5jYW5jZWxFZGl0Q2VsbCgpOyBcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYgKHRoaXMuX3Rvb2xiYXIuaXNFeHBhbmRDb2xsYXBzZVNlbGVjdGVkKGFyZ3MpID09IHRydWUpIHtcclxuXHRcdFx0Ly8gRGlzYWJsZXMgcmVmcmVzaCBjYXVzZWQgYnkgc3luY2Z1c2lvbiBjYWxsc1xyXG5cdFx0XHR0aGlzLmVuYWJsZVRyZWVHcmlkUmVmcmVzaChmYWxzZSk7XHJcblx0XHRcdHRoaXMuX3Rvb2xiYXIhLnRvb2xiYXJDbGljayhhcmdzLCB0aGlzKTtcclxuXHRcdFx0dGhpcy5lbmFibGVUcmVlR3JpZFJlZnJlc2godHJ1ZSk7XHJcblx0XHRcdFxyXG5cdFx0XHR0aGlzLnJlZnJlc2goKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLl90b29sYmFyIS50b29sYmFyQ2xpY2soYXJncywgdGhpcyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTYXZlIHRyZWUgZ3JpZCBzZXR0aW5nc1xyXG5cdCAqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRwcm90ZWN0ZWQgc2F2ZVRyZWVHcmlkU2V0dGluZ3MoKSB7XHJcblx0XHRpZiAodGhpcy5jb21wb25lbnQuZ2V0UGVyc2lzdGVuY3koKSkge1xyXG5cdFx0XHR0aGlzLnVwZGF0ZXNjcm9sbGJhcnNPYnNlcnZhdGlvbigpO1xyXG5cdFx0XHR0aGlzLnNhdmVTZXR0aW5ncygpO1xyXG5cdFx0fVxyXG4gICAgfVxyXG5cclxuXHQvKipcclxuXHQgKiBVcGRhdGVzIHNjcm9sbGJhciBvYnNlcnZhdGlvbiBmb3IgYm90aCBzY3JvbGxiYXJzXHJcblx0ICpcclxuIFx0ICogQHByb3RlY3RlZFxyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRwcml2YXRlIHVwZGF0ZXNjcm9sbGJhcnNPYnNlcnZhdGlvbigpe1xyXG5cdFx0dmFyIHZlcnRpY2FsU2Nyb2xsYmFyID0gdGhpcy5nZXRWZXJ0aWNhbFNjcm9sbGJhcigpO1xyXG5cdFx0dmFyIGhvcml6b250YWxTY3JvbGxiYXIgPSB0aGlzLmdldEhvcml6b250YWxTY3JvbGxiYXIoKTtcclxuXHJcblx0XHR0aGlzLnVwZGF0ZVNjcm9sbGJhck9ic2VydmF0aW9uKHZlcnRpY2FsU2Nyb2xsYmFyLCB0aGlzLl92ZXJ0aWNhbFNjcm9sbGJhck9ic2VydmVyKTtcclxuXHRcdHRoaXMudXBkYXRlU2Nyb2xsYmFyT2JzZXJ2YXRpb24oaG9yaXpvbnRhbFNjcm9sbGJhciwgdGhpcy5faG9yaXpvbnRhbFNjcm9sbGJhck9ic2VydmVyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE9ic2VydmUgc2Nyb2xsYmFyLCB1bm9ic2VydmUgc2Nyb2xsYmFyIG9yIGRvbid0IGRvIGFueXRoaW5nLlxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0geyhIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCl9IGVsZW1lbnRcclxuXHQgKiBAcGFyYW0geyhNdXRhdGlvbk9ic2VydmVyIHwgdW5kZWZpbmVkKX0gb2JzZXJ2ZXJcclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcblx0cHJpdmF0ZSB1cGRhdGVTY3JvbGxiYXJPYnNlcnZhdGlvbihlbGVtZW50OiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCwgb2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXIgfCB1bmRlZmluZWQpIHtcclxuXHRcdGlmIChlbGVtZW50ICE9PSB1bmRlZmluZWQgJiYgb2JzZXJ2ZXIgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR0aGlzLm9ic2VydmVTY3JvbGxiYXIoZWxlbWVudCwgb2JzZXJ2ZXIpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAoZWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHRoaXMudW5vYnNlcnZlU2Nyb2xsYmFyKG9ic2VydmVyKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldCBlbGVtZW50IG9mIHZlcnRpY2FsIHNjcm9sbGJhclxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcmV0dXJucyB7KEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkKX1cclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBnZXRWZXJ0aWNhbFNjcm9sbGJhcigpOiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCB7XHJcblx0XHR2YXIgc2Nyb2xsYmFyRWxlbWVudCA9ICQodGhpcy5tYWluRGl2KS5maW5kKCcuZS12c2Nyb2xsYmFyJyk7XHJcblx0XHRpZiAoc2Nyb2xsYmFyRWxlbWVudC5sZW5ndGggPiAwKSB7XHJcblx0XHRcdHJldHVybiBzY3JvbGxiYXJFbGVtZW50LmZpbmQoJy5lLXZoYW5kbGUnKVswXTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB1bmRlZmluZWQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXQgZWxlbWVudCBvZiBob3Jpem9udGFsIHNjcm9sbGJhclxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcmV0dXJucyB7KEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkKX1cclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBnZXRIb3Jpem9udGFsU2Nyb2xsYmFyKCk6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkIHtcclxuXHRcdHZhciBzY3JvbGxiYXJFbGVtZW50ID0gJCh0aGlzLm1haW5EaXYpLmZpbmQoJy5lLWhzY3JvbGxiYXInKTtcclxuXHRcdGlmIChzY3JvbGxiYXJFbGVtZW50Lmxlbmd0aCA+IDApIHtcclxuXHRcdFx0cmV0dXJuIHNjcm9sbGJhckVsZW1lbnQuZmluZCgnLmUtaGhhbmRsZScpWzBdO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE9ic2VydmUgc2Nyb2xsYmFyIGZvciBjaGFuZ2VzXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRhcmdldFxyXG5cdCAqIEBwYXJhbSB7KE11dGF0aW9uT2JzZXJ2ZXIgfCB1bmRlZmluZWQpfSBvYnNlcnZlclxyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRwcml2YXRlIG9ic2VydmVTY3JvbGxiYXIodGFyZ2V0OiBIVE1MRWxlbWVudCwgb2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXIgfCB1bmRlZmluZWQgKSB7XHJcblx0XHR2YXIgd2lkZ2V0ID0gdGhpcztcclxuXHRcdG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24obXV0YXRpb25zKSB7XHJcbiAgICAgICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKG11dGF0aW9uUmVjb3JkKSB7XHJcblx0XHRcdFx0bGV0IHNjcm9sbFNldHRpbmdzOiBJU2Nyb2xsU2V0dGluZ3MgPSB3aWRnZXQuZ2V0Q29tcG9uZW50U2V0dGluZ3ModHJ1ZSkuZGF0YS5zY3JvbGxiYXJzO1xyXG5cdFx0XHRcdGlmIChzY3JvbGxTZXR0aW5ncy5ob3Jpem9udGFsICE9IHdpZGdldC5fcHJldmlvdXNTY3JvbGxTZXR0aW5ncy5ob3Jpem9udGFsIHx8IHNjcm9sbFNldHRpbmdzLnZlcnRpY2FsICE9IHdpZGdldC5fcHJldmlvdXNTY3JvbGxTZXR0aW5ncy52ZXJ0aWNhbCkge1xyXG5cdFx0XHRcdFx0d2lkZ2V0Ll9wcmV2aW91c1Njcm9sbFNldHRpbmdzID0gc2Nyb2xsU2V0dGluZ3M7XHJcblx0XHRcdFx0XHR3aWRnZXQuc2F2ZVNldHRpbmdzKCk7XHJcblx0XHRcdFx0fVxyXG4gICAgICAgICAgICB9KTsgICAgXHJcblx0XHR9KTtcclxuXHRcclxuXHRcdG9ic2VydmVyLm9ic2VydmUodGFyZ2V0LCB7IGF0dHJpYnV0ZXMgOiB0cnVlfSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBVbm9ic2VydmUgc2Nyb2xsYmFyXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7KE11dGF0aW9uT2JzZXJ2ZXIgfCB1bmRlZmluZWQpfSBvYnNlcnZlclxyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRwcml2YXRlIHVub2JzZXJ2ZVNjcm9sbGJhcihvYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlciB8IHVuZGVmaW5lZCkge1xyXG5cdFx0aWYgKG9ic2VydmVyICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0b2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG5cdFx0XHRvYnNlcnZlciA9IHVuZGVmaW5lZDtcclxuXHRcdH1cclxuXHR9XHJcblx0LyoqXHJcblx0ICogU2V0cyBmbGFncyB0aGF0IGVuYWJsZXMvZGlzYWJsZXMgcmVmcmVzaCBvZiB0cmVlZ3JpZFxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtib29sZWFufSB2YWx1ZVxyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRwdWJsaWMgZW5hYmxlVHJlZUdyaWRSZWZyZXNoKHZhbHVlOiBib29sZWFuKSB7XHJcblx0XHR0aGlzLnJlZnJlc2hFbmFibGVkID0gdmFsdWU7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgcmVmcmVzaCgpIHt9O1xyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIGNvbHVtbiB0ZW1wbGF0ZXMgZm9yIHRoZSB0cmVlIGdyaWQgYW5kIGFkZHMgdGhlbSB0byB0aGUgd2lkZ2V0IGNvbnRhaW5lclxyXG5cdCAqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRwcm90ZWN0ZWQgY3JlYXRlQ29sdW1uVGVtcGxhdGVzKCl7XHJcblxyXG5cdH1cclxuXHRcclxuXHRwcm90ZWN0ZWQgYWJzdHJhY3QgY3JlYXRlVHJlZUdyaWQoKTtcclxufVxyXG5cclxuZXhwb3J0IHtUcmVlR3JpZFdpZGdldEJhc2V9OyJdfQ==