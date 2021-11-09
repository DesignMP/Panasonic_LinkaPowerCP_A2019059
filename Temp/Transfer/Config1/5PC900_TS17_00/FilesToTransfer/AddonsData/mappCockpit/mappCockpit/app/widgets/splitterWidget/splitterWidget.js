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
define(["require", "exports", "../common/layoutWidgetBase", "./layoutPane", "../common/viewTypeProvider", "../common/uniqueIdGenerator", "./splitterPaneDefinition", "./splitterDefinition", "../../common/componentFactory/componentDefinition", "../common/widgetBase", "../common/paneProperties"], function (require, exports, layoutWidgetBase_1, layoutPane_1, viewTypeProvider_1, uniqueIdGenerator_1, splitterPaneDefinition_1, splitterDefinition_1, componentDefinition_1, widgetBase_1, paneProperties_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SplitterWidget = /** @class */ (function (_super) {
        __extends(SplitterWidget, _super);
        function SplitterWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._orientation = ej.Orientation.Horizontal;
            _this._isResponsive = true;
            _this._defaultSplitterSize = 9; // TODO get actual splitter size 
            return _this;
        }
        /**
         * Initialize the splitter widget
         *
         * @param {number} [headerHeight=0]
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.initialize = function () {
            this._actualWidth = 1000;
            this._actualHeight = 400;
            this.layoutPanes = new Array();
            _super.prototype.initialize.call(this);
        };
        /**
         * Sets the orientation of the splitters in the widget (vertical or horizontal)
         *
         * @param {string} orientation
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.setOrientation = function (orientation) {
            if (orientation == splitterDefinition_1.SplitterDefinition.orientationVertical) {
                this._orientation = ej.Orientation.Vertical;
            }
            else if (orientation == splitterDefinition_1.SplitterDefinition.orientationHorizontal) {
                this._orientation = ej.Orientation.Horizontal;
            }
        };
        /**
         * Returns the orientation of the splitters in the widget (vertical or horizontal)
         *
         * @returns {string}
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.getOrientation = function () {
            if (this._orientation == ej.Orientation.Vertical) {
                return splitterDefinition_1.SplitterDefinition.orientationVertical;
            }
            else if (this._orientation == ej.Orientation.Horizontal) {
                return splitterDefinition_1.SplitterDefinition.orientationHorizontal;
            }
            return "";
        };
        SplitterWidget.prototype.getResponsive = function () {
            return this._isResponsive;
        };
        SplitterWidget.prototype.setResponsive = function (isResponsive) {
            this._isResponsive = isResponsive;
            this._actualHeight = 400;
        };
        /**
         * Creates the splitter widget
         *
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.createLayout = function () {
            var _this = this;
            $(this.mainDiv).ejSplitter({
                isResponsive: true,
                orientation: ej.Orientation.Horizontal,
                allowKeyboardNavigation: false,
                // Set a default size => Needed for inactive splitter windows to avoid AddItem problems
                width: "400px",
                height: "400px",
                resize: function (args) {
                    _this.onSplitterResize(args);
                },
                create: function (args) {
                    _this.mainDiv.style.padding = "0px";
                }
            });
        };
        /**
         * Sets the actual layout panes definitions to the ejsplitter
         *
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.recalculateLayout = function () {
            var splitter = this.getSplitter();
            // Set orientation before get properties to the correct paneSizes(height/width)
            splitter.option("orientation", this._orientation);
            var properties = this.getProperties(splitter);
            var keys = Object.keys(this.layoutPanes);
            if (properties.length != keys.length) {
                throw (new Error("properties.length != this.layoutPanes.length"));
            }
            this.updatePropertiesInformationsWithLayoutPanesData(properties);
            this.setProperties(splitter, properties);
            if (this._isResponsive == false) {
                // create default first pane, which will be needed for drag&drop of new widgets to the splitter widget
                var splitter_1 = this.getSplitter();
                var newItem = splitter_1.addItem("<div id='" + this.getLastPaneId() + "' style='overflow:hidden; width:100%; height:100%'></div>", { paneSize: 400, expandable: false, collapsible: false }, 0);
            }
        };
        /**
         * resizes the splitter widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.resize = function (width, height) {
            if (this._isResponsive) {
                this._actualHeight = height;
            }
            this._actualWidth = width;
            this.resizeSplitter(this._actualWidth, this._actualHeight - this._headerHeight);
            this.resizeSplitterPaneContents(this._actualWidth, this._actualHeight - this._headerHeight);
        };
        /**
         * Loads the styles for the splitter widget
         *
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.loadStyles = function () {
            // TODO: get div from _layoutContainerId
            //super.addStyleToContentId("#" + this._layoutContainerId, "widgets/splitterWidget/style/css/splitterStyle.css");
            //super.addStyleToContentId("#" + this._layoutContainerId, "widgets/common/style/css/widgetHeaderFooterStyle.css");
        };
        /**
         * Activates all the widget in the different splitter panes
         *
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.activate = function () {
            this._widgets.forEach(function (widget) {
                if (widget != undefined) {
                    widget.activate();
                }
            });
        };
        /**
         * Deactivates all the widget in the different splitter panes
         *
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.deactivate = function () {
            this._widgets.forEach(function (widget) {
                if (widget != undefined) {
                    widget.deactivate();
                }
            });
        };
        /**
         * Disposes the widget
         *
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.dispose = function () {
            this.component.disablePersisting();
            _super.prototype.dispose.call(this);
            this._widgets.forEach(function (widget) {
                if (widget != undefined) {
                    widget.dispose();
                }
            });
        };
        SplitterWidget.prototype.getComponentSettings = function (onlyModified) {
            this.component.setSetting(splitterDefinition_1.SplitterDefinition.splitterDefinitionId, this.getSplitterDefinition());
            return _super.prototype.getComponentSettings.call(this, onlyModified);
        };
        SplitterWidget.prototype.setComponentSettings = function (data) {
            if (data != undefined) {
                _super.prototype.setComponentSettings.call(this, data);
                var splitterDefinition = this.component.getSetting(splitterDefinition_1.SplitterDefinition.splitterDefinitionId);
                if (splitterDefinition != undefined) {
                    this.setSplitterDefinition(splitterDefinition);
                }
            }
        };
        SplitterWidget.prototype.getSplitterDefinition = function () {
            var splitterDefinition = new splitterDefinition_1.SplitterDefinition(this.getOrientation(), this.getResponsive());
            splitterDefinition.paneDefinitions = this.getSplitterPaneDefinitions();
            return splitterDefinition;
        };
        SplitterWidget.prototype.setSplitterDefinition = function (splitterDefinition) {
            var splitterOrientation = splitterDefinition.orientation;
            var splitterResponsive = splitterDefinition.responsive;
            var paneDefinitions = splitterDefinition.paneDefinitions;
            if (paneDefinitions == undefined) {
                return;
            }
            // Set splitter panes
            this.setSplitterPaneDefinitions(paneDefinitions);
            // Set orientation of splitter panes
            this.setOrientation(splitterOrientation);
            // Set responsive of splitter
            this.setResponsive(splitterResponsive);
            this.recalculateLayout();
        };
        SplitterWidget.prototype.getSplitterPaneDefinitions = function () {
            var _this = this;
            var paneDefinitions = new Array();
            this._widgets.forEach(function (widget, key) {
                if (widget != undefined) {
                    var componentDefinition = new componentDefinition_1.ComponentDefinition("", "", "");
                    componentDefinition.set(widget.component.getDefinition());
                    var paneSettings = undefined;
                    var layoutPane = _this.getLayoutPane(key);
                    if (layoutPane != undefined) {
                        paneSettings = layoutPane.getSettings();
                    }
                    else {
                        console.error("LayoutPane not defined!");
                    }
                    paneDefinitions.push(new splitterPaneDefinition_1.SplitterPaneDefinition(componentDefinition, paneSettings));
                }
            });
            return paneDefinitions;
        };
        SplitterWidget.prototype.getLayoutPane = function (key) {
            var layoutPane;
            layoutPane = this.layoutPanes.filter(function (element) { return element.name == key; });
            return layoutPane[0];
        };
        SplitterWidget.prototype.setSplitterPaneDefinitions = function (paneDefinitions) {
            // Create splitter panes and add widgets
            for (var i_1 = 0; i_1 < paneDefinitions.length; i_1++) {
                if (paneDefinitions[i_1] != undefined) {
                    var componentDefinition = paneDefinitions[i_1].componentDefinition;
                    if (this.component.componentFactory != undefined) {
                        var component = this.component.addSubComponent(componentDefinition.type, componentDefinition.id, componentDefinition.defaultSettingsDataId, this.component.context);
                        if (component != undefined) {
                            // check if instance is a widget
                            if (component instanceof widgetBase_1.WidgetBase) {
                                var widget = component;
                                var splitterStoringDataId = componentDefinition.defaultSettingsDataId;
                                if (splitterStoringDataId != "") {
                                    widget.setDefaultComponentSettingsDataId(splitterStoringDataId);
                                }
                                this.addWidget(widget, componentDefinition.id, viewTypeProvider_1.ViewType.Default, new paneProperties_1.PaneProperties());
                            }
                        }
                        else {
                            if (componentDefinition.type != "ChartBase") { // "ChartBase" currently not implemented => TODO: create charts with componentfactory
                                console.warn("Component with component type '" + componentDefinition.type + "' could not be created!");
                            }
                        }
                    }
                    else {
                        console.error("ComponentFactory not available!");
                    }
                }
            }
            // Set splitter pane sizes
            var i = 0;
            for (var key in this.layoutPanes) {
                var layoutPane = this.layoutPanes[key];
                if (paneDefinitions[i].paneData != undefined) {
                    layoutPane.setSettings(paneDefinitions[i].paneData); // TODO: paneData
                }
                i++;
            }
        };
        /**
         * Get pane definitions from chartSplitter component
         *
         * @returns {Array<SplitterPaneDefinition>}
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.getChartViewSplitterPaneDefinitions = function () {
            var settings = this.component.getComponentSettings();
            var paneDefinitions = new Array();
            if (settings.data != undefined) {
                if (settings.data.splitterDefinition != undefined) {
                    paneDefinitions = settings.data.splitterDefinition.paneDefinitions;
                }
            }
            return paneDefinitions;
        };
        /**
         * Adds a widget to the splitter => a new pane will be added for the widget to the splitter
         *
         * @param {IWidget} widget
         * @param {string} name
         * @param {ViewType} viewType
         * @param {PaneProperties} paneProperties
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.addWidget = function (widget, name, viewType, paneProperties) {
            _super.prototype.addWidget.call(this, widget, name, viewType);
            var splitter = this.getSplitter();
            var properties = this.getProperties(splitter);
            var oldPaneSizes = this.getPaneSizes(properties);
            if (!this._isResponsive && paneProperties.paneSize != -1) {
                this._actualHeight += paneProperties.paneSize + this._defaultSplitterSize;
                this.resizeSplitter(this._actualWidth, this._actualHeight - this._headerHeight);
            }
            var paneId = this.getPaneDivId(name);
            var indexOfNewPane = splitter.model.properties.length;
            this.addPane(splitter, paneId, indexOfNewPane, paneProperties);
            widget.initialize();
            // add widget to the parent container
            widget.addToParentContainerId(paneId);
            this.updateLayoutPanesAfterAddingNewPane(properties, oldPaneSizes, widget, viewType);
            if (!this._isResponsive) {
                this.setProperties(splitter, properties);
                this.resizeSplitterPaneContents(this._actualWidth, this._actualHeight - this._headerHeight);
            }
        };
        /**
         * adds this widget to the given container
         *
         * @param {(HTMLDivElement|undefined)} parentContainer
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.addToParentContainer = function (parentContainer) {
            // Adds some additional needed styles for this splitter to the parent container
            this.addStyleToContentId(parentContainer, "widgets/splitterWidget/style/css/splitterStyle.css");
            this.addStyleToContentId(parentContainer, "widgets/common/style/css/widgetHeaderFooterStyle.css");
            _super.prototype.addToParentContainer.call(this, parentContainer);
        };
        /**
         * Removes a widget(pane) from the splitter
         *
         * @param {IWidget} widget
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.removeWidget = function (widget) {
            var paneIndex = this.getPaneIndex(widget);
            var splitter = this.getSplitter();
            // get all actual paneSizes 
            var properties = this.getProperties(splitter);
            var sizeToRemove = properties[paneIndex].paneSize;
            var paneSizes = this.getPaneSizes(properties);
            paneSizes.splice(paneIndex, 1);
            splitter.removeItem(paneIndex);
            this.adjustChartsDivContainerSize(sizeToRemove);
            var newSplitterHeight = this.adjustSplitterSize(splitter, sizeToRemove);
            for (var i = 0; i < properties.length; i++) {
                properties[i].paneSize = paneSizes[i];
            }
            this.layoutPanes.splice(paneIndex, 1);
            this.removeWidgetFromList(widget);
            this._actualHeight = newSplitterHeight;
            this.setProperties(splitter, properties);
        };
        /**
         * Moves a widget(splitter pane) from the source index to the target index
         * (internal: target index will be decreased by 1 if source index is before target index)
         *
         * @param {number} sourcePaneIndex
         * @param {number} targetPaneIndex
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.moveWidget = function (widget, targetPaneIndex) {
            // adds the widget divs to the documents temp
            widget.addToDocumentsTemp();
            var sourcePaneIndex = this.getPaneIndex(widget);
            var splitter = this.getSplitter();
            var layoutPane = this.layoutPanes[sourcePaneIndex];
            targetPaneIndex = this.updataTargetPaneIndex(sourcePaneIndex, targetPaneIndex);
            var originalPaneProperies = this.getPaneProperties(layoutPane);
            var properties = this.getProperties(splitter);
            this.updatePropertiesList(properties, sourcePaneIndex, targetPaneIndex);
            this.removePane(splitter, sourcePaneIndex);
            var paneId = this.getPaneDivId(widget.widgetName);
            this.addPane(splitter, paneId, targetPaneIndex, originalPaneProperies);
            this.updateLayoutPanesListAfterMoving(layoutPane, sourcePaneIndex, targetPaneIndex);
            this.resizeSplitter(this._actualWidth, this._actualHeight - this._headerHeight);
            // adds the widget divs to the new added splitter pane
            widget.addToParentContainerId(paneId);
            widget.flaggedForResize = true;
            this.resizeSplitterPaneContents(this._actualWidth, this._actualHeight - this._headerHeight);
        };
        /**
         * Returns the paneProperties of the given layoutPane
         *
         * @private
         * @param {ILayoutPane} layoutPane
         * @returns {PaneProperties}
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.getPaneProperties = function (layoutPane) {
            var paneProperties = new paneProperties_1.PaneProperties();
            paneProperties.collapsible = layoutPane.collapsible;
            paneProperties.expandable = layoutPane.expandable;
            paneProperties.minSize = layoutPane.minimumSize;
            paneProperties.resizable = layoutPane.resizable;
            return paneProperties;
        };
        /**
         * Resize a widget to a new size and adapt the other widgets in this layoutWidget(splitter)
         *
         * @param {IWidget} widget
         * @param {number} newSize
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.resizeWidget = function (widget, newSize) {
            var paneIndex = this.getPaneIndex(widget);
            var splitter = this.getSplitter();
            var properties = this.getProperties(splitter);
            // set new pane sizes
            var currentPaneSize = properties[paneIndex].paneSize;
            var paneDiffSize = currentPaneSize - newSize;
            var sizeOfOtherPane = -1;
            var indexOfOtherPane = -1;
            if (paneIndex + 1 >= this.layoutPanes.length) {
                // Last pane size changed => update the size of the pane before
                sizeOfOtherPane = properties[paneIndex - 1].paneSize + paneDiffSize;
                indexOfOtherPane = paneIndex - 1;
            }
            else {
                // Update the following pane size
                sizeOfOtherPane = properties[paneIndex + 1].paneSize + paneDiffSize;
                indexOfOtherPane = paneIndex + 1;
            }
            if (sizeOfOtherPane < 0) {
                // Avoid resizing the following pane(or the pane before) to a size smaller then 0
                var oldValue = Math.abs(sizeOfOtherPane);
                sizeOfOtherPane = 50;
                newSize = newSize - oldValue - 50;
            }
            this.layoutPanes[indexOfOtherPane].size = sizeOfOtherPane;
            properties[indexOfOtherPane].paneSize = sizeOfOtherPane;
            this.layoutPanes[paneIndex].size = newSize;
            properties[paneIndex].paneSize = newSize;
            // Updates the splitters
            this.setPanePropertiesToSplitter(splitter, properties);
            // updates the contents in the splitters
            this.resizeSplitterPaneContents(this._actualWidth, this._actualHeight);
        };
        /**
         * Returns the ejSplitter data object
         *
         * @private
         * @returns
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.getSplitter = function () {
            return $(this.mainDiv).data("ejSplitter");
        };
        /**
         * Returns the sizes of all panes together, incl. the dynamic pane
         *
         * @private
         * @returns {number}
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.sumOfDefinedLayoutPaneSizes = function () {
            var sum = 0;
            for (var key in this.layoutPanes) {
                var layoutPane = this.layoutPanes[key];
                if (layoutPane != undefined) {
                    sum += layoutPane.size;
                }
            }
            return sum;
        };
        /**
         * Returns the sizes of all panes together, without the size of the dynamic pane but including the splitter size(e.g. 9px)
         *
         * @private
         * @returns {number}
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.sumOfDefinedPaneSizes = function () {
            var sum = 0;
            var index = 0;
            for (var key in this.layoutPanes) {
                var layoutPane = this.layoutPanes[key];
                if (layoutPane == undefined) {
                    continue;
                }
                else {
                    if (layoutPane.fillSpace == false) {
                        sum += layoutPane.size;
                    }
                    if (index > 0) {
                        var splitterSize = this._defaultSplitterSize;
                        sum += splitterSize; // Add size of splitter
                    }
                }
                index++;
            }
            return sum;
        };
        /**
         * if the pane sizes are too big for the current window size, the panes would be decreased in size
         *
         * @private
         * @param {number} size
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.adoptLayoutPanesToFitCurrentSize = function (size) {
            var sumOfPanesWitoutDynamic = this.sumOfDefinedPaneSizes();
            var neededSize = sumOfPanesWitoutDynamic - size;
            if (neededSize > 0) {
                // TODO: get last not dynamic pane
                var lastPane = this.layoutPanes[this.layoutPanes.length - 1];
                lastPane.size = lastPane.size - neededSize;
            }
        };
        /**
         * Adds a new pane at the given index with the given size
         *
         * @private
         * @param {ej.Splitter} splitter
         * @param {string} paneId
         * @param {number} indexOfNewPane
         * @param {PaneProperties} paneProperties
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.addPane = function (splitter, paneId, indexOfNewPane, paneProperties) {
            var newItem;
            if (!this._isResponsive && paneProperties.paneSize != -1) {
                if (indexOfNewPane == 0) {
                    indexOfNewPane++;
                }
                newItem = splitter.removeItem(indexOfNewPane - 1);
                newItem = splitter.addItem("<div id='" + paneId + "' style='overflow:hidden'></div>", { paneSize: paneProperties.paneSize, expandable: paneProperties.expandable, collapsible: paneProperties.collapsible, minSize: paneProperties.minSize }, indexOfNewPane - 1);
                //Check splitter size: Increase height of splitter if it is not big enough to insert a new chart
                if (!this.hasPaneMinSize(splitter)) {
                    this.resizeSplitter(this._actualWidth, this._actualHeight + 1);
                }
                newItem = splitter.addItem("<div id='" + this.getLastPaneId() + "' style='overflow:hidden; width:100%; height:100%'></div>", { paneSize: 400, expandable: false, collapsible: false }, indexOfNewPane);
            }
            else {
                newItem = splitter.addItem("<div id='" + paneId + "' style='overflow:hidden'></div>", { paneSize: paneProperties.paneSize, expandable: paneProperties.expandable, collapsible: paneProperties.collapsible, minSize: paneProperties.minSize }, indexOfNewPane);
            }
            if (newItem.toString() == "") {
                console.error("ERROR: splitter.addItem");
            }
            else {
                newItem[0].style.overflow = "hidden";
            }
        };
        /**
         * Returns the div id of the last pane
         *
         * @returns {string}
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.getLastPaneId = function () {
            return this.mainDivId + "_lastPane";
        };
        /**
         * Returns the div id of a pane for the given widgetname
         *
         * @private
         * @param {string} name
         * @returns {string}
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.getPaneDivId = function (name) {
            return this.mainDivId + "pane_" + name.replace(" ", "");
        };
        /**
         *  Removes the pane with the given index from the splitter
         *
         * @private
         * @param {*} splitter
         * @param {number} paneIndex
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.removePane = function (splitter, paneIndex) {
            splitter.removeItem(paneIndex);
        };
        SplitterWidget.prototype.updateLayoutPanesAfterAddingNewPane = function (properties, oldPaneSizes, widget, viewType) {
            if (this._isResponsive) {
                this.updataLayoutPanesAfterAddingNewPaneResponsive(properties, widget);
            }
            else {
                oldPaneSizes[oldPaneSizes.length - 1] = undefined;
                for (var i = 0; i < properties.length - 1; i++) {
                    var name_1 = "";
                    if (oldPaneSizes[i] != undefined) {
                        properties[i].paneSize = oldPaneSizes[i];
                        name_1 = this.layoutPanes[i].name;
                    }
                    if (name_1 === "") {
                        name_1 = widget.widgetName + "_" + viewType.toString();
                        name_1 = uniqueIdGenerator_1.UniqueIdGenerator.getInstance().getUniqueIdFromString(name_1);
                    }
                    var paneWidget = widget;
                    if (this.layoutPanes[i] != undefined) {
                        paneWidget = this.layoutPanes[i].widget;
                    }
                    this.layoutPanes[i] = new layoutPane_1.LayoutPane(name_1, properties[i].paneSize, paneWidget, false, true, properties[i].expandable, properties[i].collapsible, properties[i].minSize);
                }
            }
        };
        SplitterWidget.prototype.updataLayoutPanesAfterAddingNewPaneResponsive = function (properties, widget) {
            var _loop_1 = function (i) {
                var name_2 = "";
                var j = 0;
                this_1._widgets.forEach(function (value, key) {
                    if (j == i) {
                        name_2 = key;
                    }
                    j++;
                });
                var paneWidget = widget;
                if (this_1.layoutPanes[i] != undefined) {
                    paneWidget = this_1.layoutPanes[i].widget;
                }
                this_1.layoutPanes[i] = new layoutPane_1.LayoutPane(name_2, properties[i].paneSize, paneWidget, false, true, properties[i].expandable, properties[i].collapsible, properties[i].minSize);
            };
            var this_1 = this;
            for (var i = 0; i < properties.length; i++) {
                _loop_1(i);
            }
        };
        /**
         * Updates the properties with the informations from the layoutPane definitions;
         * Size of dynamic pane will be calculated by using the actual widget size
         *
         * @private
         * @param {*} properties
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.updatePropertiesInformationsWithLayoutPanesData = function (properties) {
            var index = 0;
            for (var key in this.layoutPanes) {
                var layoutPane = this.layoutPanes[key];
                if (layoutPane == undefined) {
                    continue;
                }
                else {
                    if (layoutPane.fillSpace == false) {
                        properties[index].paneSize = layoutPane.size;
                    }
                    else {
                        var size = this._actualWidth;
                        if (this._orientation == ej.Orientation.Vertical) {
                            size = this._actualHeight;
                        }
                        properties[index].paneSize = size - this.sumOfDefinedLayoutPaneSizes();
                    }
                    properties[index].expandable = layoutPane.expandable;
                    properties[index].collapsible = layoutPane.collapsible;
                    properties[index].resizable = layoutPane.resizable;
                    properties[index].minSize = layoutPane.minimumSize;
                }
                index++;
            }
        };
        /**
         * resize the splitter and update the splitter panesizes
         *
         * @private
         * @param {number} width
         * @param {number} height
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.resizeSplitter = function (width, height) {
            var splitter = this.getSplitter();
            splitter.option("width", width, true);
            splitter.option("height", height, true);
            var properties = this.getProperties(splitter);
            this.updatePaneProperties(properties, width, height);
            this.setPanePropertiesToSplitter(splitter, properties);
        };
        /**
         * Return true if splitter has enough size to insert all necessary charts.
         *
         * @private
         * @param {ej.Splitter} splitter
         * @returns {boolean}
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.hasPaneMinSize = function (splitter) {
            var minHeight = 0;
            var sumOfPaneHeights = minHeight;
            if (splitter.model.properties && splitter.model.properties.length > 0) {
                //Min height of splitter => lastPaneSize + bar size (409) + minSize of all charts + the bar height between charts(9)
                minHeight = 409 + (splitter.model.properties.length - 1) * 9;
                sumOfPaneHeights = (splitter.model.properties.length - 1) * 9;
                splitter.model.properties.forEach(function (pane) {
                    minHeight += pane.minSize;
                    sumOfPaneHeights += pane.paneSize;
                });
            }
            if (sumOfPaneHeights >= minHeight) {
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * Updates the panesize in the properties for the new height/width
         *
         * @private
         * @param {*} properties
         * @param {*} width
         * @param {*} height
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.updatePaneProperties = function (properties, width, height) {
            // Set all know pane sizes
            this.setKnownPaneSizes(properties);
            // Set all dynamic pane sizes
            this.setDynamicPaneSizes(properties, width, height);
        };
        SplitterWidget.prototype.setKnownPaneSizes = function (properties) {
            var index = 0;
            for (var key in this.layoutPanes) {
                var layoutPane = this.layoutPanes[key];
                if (layoutPane == undefined) {
                    continue;
                }
                else {
                    if (layoutPane.fillSpace == false) {
                        properties[index].paneSize = layoutPane.size;
                    }
                }
                index++;
            }
        };
        SplitterWidget.prototype.setDynamicPaneSizes = function (properties, width, height) {
            var index = 0;
            for (var key in this.layoutPanes) {
                var layoutPane = this.layoutPanes[key];
                if (layoutPane == undefined) {
                    continue;
                }
                else {
                    if (layoutPane.fillSpace == true) {
                        if (this._orientation == ej.Orientation.Vertical) {
                            properties[index].paneSize = height - this.sumOfDefinedPaneSizes();
                        }
                        else {
                            properties[index].paneSize = width - this.sumOfDefinedPaneSizes();
                        }
                    }
                }
                index++;
            }
        };
        /**
         * Sets the given properties(panesizes, ...) to the ejsplitter
         * if the last panesize is under 1px a correction of the panesize will be done; occures sometimes in case of browser zoom
         *
         * @private
         * @param {*} splitter
         * @param {*} properties
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.setPanePropertiesToSplitter = function (splitter, properties) {
            this.setProperties(splitter, properties);
            if (splitter.panes.length > 0) {
                var lastPane = splitter.panes[splitter.panes.length - 1];
                if (lastPane != undefined) {
                    var lastPaneSizeString = lastPane.style.width;
                    if (this._orientation == ej.Orientation.Vertical) {
                        lastPaneSizeString = lastPane.style.height;
                    }
                    var lastPaneSize = parseFloat(lastPaneSizeString);
                    if (lastPaneSize <= 0.9999 && properties[properties.length - 1].paneSize > 0) {
                        // Size of last splitter pane was not set correct => to less space!
                        // if browser zoom is used the sizes will be defined with decimalplaces;
                        // the ejSplitter sets the size of the last pane to 0 if it is a little bit to tall (e.g. "0.1px") => pane will not be shown
                        // Set last pane a little bit smaller
                        properties[properties.length - 1].paneSize--;
                        this.setProperties(splitter, properties);
                    }
                }
            }
        };
        /**
         * Sets the splitter pane content sizes (widget sizes)
         *
         * @private
         * @param {number} width
         * @param {number} height
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.resizeSplitterPaneContents = function (width, height) {
            // Set the sizes of the splitter panecontents
            var index = 0;
            for (var i = 0; i < this.layoutPanes.length; i++) {
                var widget = this._widgets.get(this.layoutPanes[i].name);
                if (widget != undefined) {
                    var widgetWidth = width;
                    var widgetHeight = height;
                    if (this._orientation == ej.Orientation.Vertical) {
                        if (this.layoutPanes[index].fillSpace == true) {
                            widgetHeight = height - this.sumOfDefinedPaneSizes();
                            if (widgetHeight < 0) { // No place for dynamic pane, maybe also other panes have to be adopted
                                this.adoptLayoutPanesToFitCurrentSize(height);
                                widgetHeight = 0;
                            }
                        }
                        else {
                            widgetHeight = this.layoutPanes[index].size;
                        }
                    }
                    else {
                        if (this.layoutPanes[index].fillSpace == true) {
                            widgetWidth = width - this.sumOfDefinedPaneSizes();
                            if (widgetWidth < 0) { // No place for dynamic pane, maybe also other panes have to be adopted
                                this.adoptLayoutPanesToFitCurrentSize(width);
                                widgetWidth = 0;
                            }
                        }
                        else {
                            widgetWidth = this.layoutPanes[index].size;
                        }
                    }
                    widget.resize(widgetWidth, widgetHeight);
                }
                index++;
            }
            //Persist data every time a splitter is resized
            this.saveSettings();
        };
        /**
         * Updates the layout panes
         *
         * @private
         * @param {*} splitbarIndex
         * @param {*} prevPaneSize
         * @param {*} nextPaneSize
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.updateLayoutPanesOnSplitterResize = function (splitbarIndex, prevPaneSize, nextPaneSize) {
            var splitter = this.getSplitter();
            var properties = this.getProperties(splitter);
            if (!this._isResponsive) {
                if (this.layoutPanes[splitbarIndex + 1] != undefined) {
                    properties[splitbarIndex + 1].paneSize = this.layoutPanes[splitbarIndex + 1].size;
                }
            }
            else {
                this.layoutPanes[splitbarIndex + 1].size = nextPaneSize;
            }
            this.setProperties(splitter, properties);
            var oldSize = this.layoutPanes[splitbarIndex].size;
            this.layoutPanes[splitbarIndex].size = prevPaneSize;
            if (!this._isResponsive) {
                this._actualHeight += (prevPaneSize - oldSize);
                this.resizeSplitter(this._actualWidth, this._actualHeight - this._headerHeight);
            }
        };
        /**
         * corrects the target index if source index is before target index
         *
         * @private
         * @param {number} sourcePaneIndex
         * @param {number} targetPaneIndex
         * @returns {number}
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.updataTargetPaneIndex = function (sourcePaneIndex, targetPaneIndex) {
            if (sourcePaneIndex < targetPaneIndex) {
                // moved element is in list before target position and was removed before, so index must be decreased to get correct insert position
                targetPaneIndex--;
            }
            return targetPaneIndex;
        };
        /**
         * Returns the properties from the ejSplitter
         *
         * @private
         * @param {*} splitter
         * @returns
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.getProperties = function (splitter) {
            return splitter.option("properties");
        };
        /**
         * Sets the properties of the ejSplitter
         *
         * @private
         * @param {*} splitter
         * @param {*} properties
         * @returns
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.setProperties = function (splitter, properties) {
            splitter.option("properties", properties, true); // force the setting to resize the chart splitters
        };
        /**
         * Updates the properties => moves the property informations from source to target index
         *
         * @private
         * @param {*} properties
         * @param {number} sourcePaneIndex
         * @param {number} targetPaneIndex
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.updatePropertiesList = function (properties, sourcePaneIndex, targetPaneIndex) {
            var paneProperties = properties[sourcePaneIndex];
            properties.splice(sourcePaneIndex, 1);
            properties.splice(targetPaneIndex, 0, paneProperties);
        };
        /**
         * Updates the layout panes list after moving
         *
         * @private
         * @param {*} layoutPane
         * @param {*} sourcePaneIndex
         * @param {*} targetPaneIndex
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.updateLayoutPanesListAfterMoving = function (layoutPane, sourcePaneIndex, targetPaneIndex) {
            this.layoutPanes.splice(sourcePaneIndex, 1);
            this.layoutPanes.splice(targetPaneIndex, 0, layoutPane);
        };
        /**
         * Returns the pane index of the given widget
         *
         * @private
         * @param {*} widget
         * @returns {number}
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.getPaneIndex = function (widget) {
            var paneIndex = -1;
            for (var i = 0; i < this.layoutPanes.length; i++) {
                if (this.layoutPanes[i].widget == widget) {
                    paneIndex = i;
                }
            }
            return paneIndex;
        };
        /**
         * Removes the widget from the widgets list of this layout widget
         *
         * @private
         * @param {*} widget
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.removeWidgetFromList = function (widget) {
            var _this = this;
            this._widgets.forEach(function (widgetTemp, key) {
                if (widgetTemp == widget) {
                    _this._widgets.delete(key);
                }
            });
        };
        /**
         * Adjust charts div container => remove chart size
         *
         * @private
         * @param {*} sizeToRemove
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.adjustChartsDivContainerSize = function (sizeToRemove) {
            this.mainDiv.style.height = (this.mainDiv.offsetHeight - sizeToRemove - 400 + this._defaultSplitterSize) + "px"; // Remove pane size + splitter size(9px)
        };
        /**
         *  Adjust ejSplitter size
         *
         * @private
         * @param {*} splitter
         * @param {*} sizeToRemove
         * @returns {number} Returns the new splitter size after removing
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.adjustSplitterSize = function (splitter, sizeToRemove) {
            var actualSplitterHeight = splitter.option("height");
            var newSplitterHeight = parseInt(actualSplitterHeight, 10); // parseInt to remove "px"
            newSplitterHeight -= sizeToRemove + this._defaultSplitterSize; // Remove pane size + splitter size(9px)
            splitter.option("height", newSplitterHeight, true); // TODO: not only height, also width 
            return newSplitterHeight;
        };
        /**
         * Notifies that splitter has resized
         *
         * @private
         */
        SplitterWidget.prototype.onSplitterResize = function (args) {
            this.updateLayoutPanesOnSplitterResize(args.splitbarIndex, args.prevPane.size, args.nextPane.size);
            this.resizeSplitterPaneContents(this._actualWidth, this._actualHeight - this._headerHeight);
        };
        /**
         * Returns a list with only the sizes of the panes
         *
         * @private
         * @param {*} properties
         * @returns
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.getPaneSizes = function (properties) {
            var paneSizes = new Array();
            properties.forEach(function (property) {
                paneSizes.push(property.paneSize);
            });
            return paneSizes;
        };
        return SplitterWidget;
    }(layoutWidgetBase_1.LayoutWidgetBase));
    exports.SplitterWidget = SplitterWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXR0ZXJXaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvc3BsaXR0ZXJXaWRnZXQvc3BsaXR0ZXJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQWdCQTtRQUE2QixrQ0FBZ0I7UUFBN0M7WUFBQSxxRUFtbENDO1lBamxDVyxrQkFBWSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDO1lBRXpDLG1CQUFhLEdBQVksSUFBSSxDQUFDO1lBRTlCLDBCQUFvQixHQUFXLENBQUMsQ0FBQyxDQUFDLGlDQUFpQzs7UUE2a0MvRSxDQUFDO1FBMWtDRzs7Ozs7V0FLRztRQUNILG1DQUFVLEdBQVY7WUFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQztZQUV6QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7WUFFL0IsaUJBQU0sVUFBVSxXQUFFLENBQUM7UUFDdkIsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsdUNBQWMsR0FBZCxVQUFlLFdBQW1CO1lBQzlCLElBQUcsV0FBVyxJQUFJLHVDQUFrQixDQUFDLG1CQUFtQixFQUFDO2dCQUNyRCxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO2FBQy9DO2lCQUNJLElBQUcsV0FBVyxJQUFJLHVDQUFrQixDQUFDLHFCQUFxQixFQUFDO2dCQUM1RCxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDO2FBQ2pEO1FBQ0wsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsdUNBQWMsR0FBZDtZQUNJLElBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBQztnQkFDNUMsT0FBTyx1Q0FB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QUFRLENBQUMsQ0FBQztZQUNyRCxJQUFJLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLDBCQUEwQjtZQUN0RixpQkFBaUIsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsd0NBQXdDO1lBQ3ZHLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMscUNBQXFDO1lBQ3pGLE9BQU8saUJBQWlCLENBQUM7UUFDN0IsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSyx5Q0FBZ0IsR0FBeEIsVUFBeUIsSUFBSTtZQUN6QixJQUFJLENBQUMsaUNBQWlDLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25HLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhLEdBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQzdGLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0sscUNBQVksR0FBcEIsVUFBcUIsVUFBVTtZQUMzQixJQUFJLFNBQVMsR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO1lBQ3BDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQSxRQUFRO2dCQUN2QixTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0QyxDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFDTCxxQkFBQztJQUFELENBQUMsQUFubENELENBQTZCLG1DQUFnQixHQW1sQzVDO0lBRU8sd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMYXlvdXRXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi9sYXlvdXRXaWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IElXaWRnZXQgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvd2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IExheW91dFBhbmUgfSBmcm9tIFwiLi9sYXlvdXRQYW5lXCI7XHJcbmltcG9ydCB7IFZpZXdUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi92aWV3VHlwZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFVuaXF1ZUlkR2VuZXJhdG9yIH0gZnJvbSBcIi4uL2NvbW1vbi91bmlxdWVJZEdlbmVyYXRvclwiO1xyXG5cclxuaW1wb3J0IHsgU3BsaXR0ZXJQYW5lRGVmaW5pdGlvbiB9IGZyb20gXCIuL3NwbGl0dGVyUGFuZURlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgU3BsaXR0ZXJEZWZpbml0aW9uIH0gZnJvbSBcIi4vc3BsaXR0ZXJEZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudERlZmluaXRpb24gfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEZhY3RvcnkvY29tcG9uZW50RGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi93aWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IElTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9zZXR0aW5nc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJTGF5b3V0UGFuZSB9IGZyb20gXCIuL2ludGVyZmFjZXMvbGF5b3V0UGFuZUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQYW5lUHJvcGVydGllcyB9IGZyb20gXCIuLi9jb21tb24vcGFuZVByb3BlcnRpZXNcIjtcclxuaW1wb3J0IHsgSVNwbGl0dGVyV2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9zcGxpdHRlcldpZGdldEludGVyZmFjZVwiO1xyXG5cclxuY2xhc3MgU3BsaXR0ZXJXaWRnZXQgZXh0ZW5kcyBMYXlvdXRXaWRnZXRCYXNlIGltcGxlbWVudHMgSVNwbGl0dGVyV2lkZ2V0e1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF9vcmllbnRhdGlvbiA9IGVqLk9yaWVudGF0aW9uLkhvcml6b250YWw7XHJcblxyXG4gICAgcHJpdmF0ZSBfaXNSZXNwb25zaXZlOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBwcml2YXRlIF9kZWZhdWx0U3BsaXR0ZXJTaXplOiBudW1iZXIgPSA5OyAvLyBUT0RPIGdldCBhY3R1YWwgc3BsaXR0ZXIgc2l6ZSBcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplIHRoZSBzcGxpdHRlciB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2hlYWRlckhlaWdodD0wXVxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemUoKSB7XHJcbiAgICAgICAgdGhpcy5fYWN0dWFsV2lkdGggPSAxMDAwO1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbEhlaWdodCA9IDQwMDtcclxuXHJcbiAgICAgICAgdGhpcy5sYXlvdXRQYW5lcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgXHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgb3JpZW50YXRpb24gb2YgdGhlIHNwbGl0dGVycyBpbiB0aGUgd2lkZ2V0ICh2ZXJ0aWNhbCBvciBob3Jpem9udGFsKVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcmllbnRhdGlvblxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHNldE9yaWVudGF0aW9uKG9yaWVudGF0aW9uOiBzdHJpbmcpe1xyXG4gICAgICAgIGlmKG9yaWVudGF0aW9uID09IFNwbGl0dGVyRGVmaW5pdGlvbi5vcmllbnRhdGlvblZlcnRpY2FsKXtcclxuICAgICAgICAgICAgdGhpcy5fb3JpZW50YXRpb24gPSBlai5PcmllbnRhdGlvbi5WZXJ0aWNhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihvcmllbnRhdGlvbiA9PSBTcGxpdHRlckRlZmluaXRpb24ub3JpZW50YXRpb25Ib3Jpem9udGFsKXtcclxuICAgICAgICAgICAgdGhpcy5fb3JpZW50YXRpb24gPSBlai5PcmllbnRhdGlvbi5Ib3Jpem9udGFsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIG9yaWVudGF0aW9uIG9mIHRoZSBzcGxpdHRlcnMgaW4gdGhlIHdpZGdldCAodmVydGljYWwgb3IgaG9yaXpvbnRhbClcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGdldE9yaWVudGF0aW9uKCk6IHN0cmluZ3tcclxuICAgICAgICBpZih0aGlzLl9vcmllbnRhdGlvbiA9PSBlai5PcmllbnRhdGlvbi5WZXJ0aWNhbCl7XHJcbiAgICAgICAgICAgIHJldHVybiBTcGxpdHRlckRlZmluaXRpb24ub3JpZW50YXRpb25WZXJ0aWNhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLl9vcmllbnRhdGlvbiA9PSBlai5PcmllbnRhdGlvbi5Ib3Jpem9udGFsKXtcclxuICAgICAgICAgICAgcmV0dXJuIFNwbGl0dGVyRGVmaW5pdGlvbi5vcmllbnRhdGlvbkhvcml6b250YWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFJlc3BvbnNpdmUoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNSZXNwb25zaXZlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFJlc3BvbnNpdmUoaXNSZXNwb25zaXZlOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLl9pc1Jlc3BvbnNpdmUgPSBpc1Jlc3BvbnNpdmU7XHJcbiAgICAgICAgdGhpcy5fYWN0dWFsSGVpZ2h0ID0gNDAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgc3BsaXR0ZXIgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZUxheW91dCgpIHtcclxuICAgICAgICAkKHRoaXMubWFpbkRpdikuZWpTcGxpdHRlcih7XHJcbiAgICAgICAgICAgIGlzUmVzcG9uc2l2ZTogdHJ1ZSxcclxuICAgICAgICAgICAgb3JpZW50YXRpb246IGVqLk9yaWVudGF0aW9uLkhvcml6b250YWwsIC8vIEluaXRpYWwgb25seSBIb3Jpem9udGFsIGlzIHdvcmtpbmcgPT4gbGF0ZXIgc3dpdGNoIHRvIHZlcnRpY2FsIGluIHJlY2FsY3VsYXRlIGxheW91dCBpcyBwb3NzaWJsZVxyXG4gICAgICAgICAgICBhbGxvd0tleWJvYXJkTmF2aWdhdGlvbjogZmFsc2UsXHJcbiAgICAgICAgICAgIC8vIFNldCBhIGRlZmF1bHQgc2l6ZSA9PiBOZWVkZWQgZm9yIGluYWN0aXZlIHNwbGl0dGVyIHdpbmRvd3MgdG8gYXZvaWQgQWRkSXRlbSBwcm9ibGVtc1xyXG4gICAgICAgICAgICB3aWR0aDogXCI0MDBweFwiLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IFwiNDAwcHhcIixcclxuICAgICAgICAgICAgcmVzaXplOiAoYXJncykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblNwbGl0dGVyUmVzaXplKGFyZ3MpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjcmVhdGU6IChhcmdzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5EaXYuc3R5bGUucGFkZGluZyA9IFwiMHB4XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGFjdHVhbCBsYXlvdXQgcGFuZXMgZGVmaW5pdGlvbnMgdG8gdGhlIGVqc3BsaXR0ZXJcclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHJlY2FsY3VsYXRlTGF5b3V0KCl7XHJcbiAgICAgICAgdmFyIHNwbGl0dGVyID0gdGhpcy5nZXRTcGxpdHRlcigpO1xyXG4gICAgICAgIC8vIFNldCBvcmllbnRhdGlvbiBiZWZvcmUgZ2V0IHByb3BlcnRpZXMgdG8gdGhlIGNvcnJlY3QgcGFuZVNpemVzKGhlaWdodC93aWR0aClcclxuICAgICAgICBzcGxpdHRlci5vcHRpb24oXCJvcmllbnRhdGlvblwiLCB0aGlzLl9vcmllbnRhdGlvbik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHByb3BlcnRpZXMgPSB0aGlzLmdldFByb3BlcnRpZXMoc3BsaXR0ZXIpO1xyXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXModGhpcy5sYXlvdXRQYW5lcyk7XHJcbiAgICAgICAgaWYocHJvcGVydGllcy5sZW5ndGggIT0ga2V5cy5sZW5ndGgpe1xyXG4gICAgICAgICAgICB0aHJvdyhuZXcgRXJyb3IoXCJwcm9wZXJ0aWVzLmxlbmd0aCAhPSB0aGlzLmxheW91dFBhbmVzLmxlbmd0aFwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlUHJvcGVydGllc0luZm9ybWF0aW9uc1dpdGhMYXlvdXRQYW5lc0RhdGEocHJvcGVydGllcyk7XHJcbiAgICAgICAgdGhpcy5zZXRQcm9wZXJ0aWVzKHNwbGl0dGVyLCBwcm9wZXJ0aWVzKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5faXNSZXNwb25zaXZlID09IGZhbHNlKXtcclxuICAgICAgICAgICAgLy8gY3JlYXRlIGRlZmF1bHQgZmlyc3QgcGFuZSwgd2hpY2ggd2lsbCBiZSBuZWVkZWQgZm9yIGRyYWcmZHJvcCBvZiBuZXcgd2lkZ2V0cyB0byB0aGUgc3BsaXR0ZXIgd2lkZ2V0XHJcbiAgICAgICAgICAgIGxldCBzcGxpdHRlciA9IHRoaXMuZ2V0U3BsaXR0ZXIoKTtcclxuICAgICAgICAgICAgbGV0IG5ld0l0ZW0gPSBzcGxpdHRlci5hZGRJdGVtKFwiPGRpdiBpZD0nXCIgKyB0aGlzLmdldExhc3RQYW5lSWQoKSArIFwiJyBzdHlsZT0nb3ZlcmZsb3c6aGlkZGVuOyB3aWR0aDoxMDAlOyBoZWlnaHQ6MTAwJSc+PC9kaXY+XCIsIHsgcGFuZVNpemU6IDQwMCwgZXhwYW5kYWJsZTogZmFsc2UsIGNvbGxhcHNpYmxlOiBmYWxzZX0sIDApOyBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXNpemVzIHRoZSBzcGxpdHRlciB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHsgICBcclxuICAgICAgICBpZih0aGlzLl9pc1Jlc3BvbnNpdmUpe1xyXG4gICAgICAgICAgICB0aGlzLl9hY3R1YWxIZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2FjdHVhbFdpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5yZXNpemVTcGxpdHRlcih0aGlzLl9hY3R1YWxXaWR0aCwgdGhpcy5fYWN0dWFsSGVpZ2h0LXRoaXMuX2hlYWRlckhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5yZXNpemVTcGxpdHRlclBhbmVDb250ZW50cyh0aGlzLl9hY3R1YWxXaWR0aCwgdGhpcy5fYWN0dWFsSGVpZ2h0LXRoaXMuX2hlYWRlckhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgc3R5bGVzIGZvciB0aGUgc3BsaXR0ZXIgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGxvYWRTdHlsZXMoKXtcclxuICAgICAgICAvLyBUT0RPOiBnZXQgZGl2IGZyb20gX2xheW91dENvbnRhaW5lcklkXHJcbiAgICAgICAgLy9zdXBlci5hZGRTdHlsZVRvQ29udGVudElkKFwiI1wiICsgdGhpcy5fbGF5b3V0Q29udGFpbmVySWQsIFwid2lkZ2V0cy9zcGxpdHRlcldpZGdldC9zdHlsZS9jc3Mvc3BsaXR0ZXJTdHlsZS5jc3NcIik7XHJcbiAgICAgICAgLy9zdXBlci5hZGRTdHlsZVRvQ29udGVudElkKFwiI1wiICsgdGhpcy5fbGF5b3V0Q29udGFpbmVySWQsIFwid2lkZ2V0cy9jb21tb24vc3R5bGUvY3NzL3dpZGdldEhlYWRlckZvb3RlclN0eWxlLmNzc1wiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFjdGl2YXRlcyBhbGwgdGhlIHdpZGdldCBpbiB0aGUgZGlmZmVyZW50IHNwbGl0dGVyIHBhbmVzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGFjdGl2YXRlKCl7XHJcbiAgICAgICAgdGhpcy5fd2lkZ2V0cy5mb3JFYWNoKCh3aWRnZXQpID0+IHtcclxuICAgICAgICAgICAgaWYod2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB3aWRnZXQuYWN0aXZhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVhY3RpdmF0ZXMgYWxsIHRoZSB3aWRnZXQgaW4gdGhlIGRpZmZlcmVudCBzcGxpdHRlciBwYW5lc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBkZWFjdGl2YXRlKCl7XHJcbiAgICAgICAgdGhpcy5fd2lkZ2V0cy5mb3JFYWNoKCh3aWRnZXQpID0+IHtcclxuICAgICAgICAgICAgaWYod2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB3aWRnZXQuZGVhY3RpdmF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZXMgdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3dpZGdldHMuZm9yRWFjaCgod2lkZ2V0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgd2lkZ2V0LmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q29tcG9uZW50U2V0dGluZ3Mob25seU1vZGlmaWVkOiBib29sZWFuKTogQ29tcG9uZW50U2V0dGluZ3Mge1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldFNldHRpbmcoU3BsaXR0ZXJEZWZpbml0aW9uLnNwbGl0dGVyRGVmaW5pdGlvbklkLCB0aGlzLmdldFNwbGl0dGVyRGVmaW5pdGlvbigpKTtcclxuICAgICAgICByZXR1cm4gc3VwZXIuZ2V0Q29tcG9uZW50U2V0dGluZ3Mob25seU1vZGlmaWVkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0Q29tcG9uZW50U2V0dGluZ3MoZGF0YTogQ29tcG9uZW50U2V0dGluZ3MpIHtcclxuICAgICAgICBpZiAoZGF0YSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgc3VwZXIuc2V0Q29tcG9uZW50U2V0dGluZ3MoZGF0YSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgc3BsaXR0ZXJEZWZpbml0aW9uID0gdGhpcy5jb21wb25lbnQuZ2V0U2V0dGluZyhTcGxpdHRlckRlZmluaXRpb24uc3BsaXR0ZXJEZWZpbml0aW9uSWQpO1xyXG4gICAgICAgICAgICBpZihzcGxpdHRlckRlZmluaXRpb24gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3BsaXR0ZXJEZWZpbml0aW9uKHNwbGl0dGVyRGVmaW5pdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRTcGxpdHRlckRlZmluaXRpb24oKTogU3BsaXR0ZXJEZWZpbml0aW9ue1xyXG4gICAgICAgIGxldCBzcGxpdHRlckRlZmluaXRpb24gPSBuZXcgU3BsaXR0ZXJEZWZpbml0aW9uKHRoaXMuZ2V0T3JpZW50YXRpb24oKSwgdGhpcy5nZXRSZXNwb25zaXZlKCkpO1xyXG4gICAgICAgIHNwbGl0dGVyRGVmaW5pdGlvbi5wYW5lRGVmaW5pdGlvbnMgPSB0aGlzLmdldFNwbGl0dGVyUGFuZURlZmluaXRpb25zKCk7XHJcbiAgICAgICAgcmV0dXJuIHNwbGl0dGVyRGVmaW5pdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFNwbGl0dGVyRGVmaW5pdGlvbihzcGxpdHRlckRlZmluaXRpb246IFNwbGl0dGVyRGVmaW5pdGlvbil7XHJcbiAgICAgICAgbGV0IHNwbGl0dGVyT3JpZW50YXRpb24gPSBzcGxpdHRlckRlZmluaXRpb24ub3JpZW50YXRpb247XHJcbiAgICAgICAgbGV0IHNwbGl0dGVyUmVzcG9uc2l2ZSA9IHNwbGl0dGVyRGVmaW5pdGlvbi5yZXNwb25zaXZlO1xyXG4gICAgICAgIGxldCBwYW5lRGVmaW5pdGlvbnMgPSBzcGxpdHRlckRlZmluaXRpb24ucGFuZURlZmluaXRpb25zO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHBhbmVEZWZpbml0aW9ucyA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFNldCBzcGxpdHRlciBwYW5lc1xyXG4gICAgICAgIHRoaXMuc2V0U3BsaXR0ZXJQYW5lRGVmaW5pdGlvbnMocGFuZURlZmluaXRpb25zKTtcclxuIFxyXG4gICAgICAgIC8vIFNldCBvcmllbnRhdGlvbiBvZiBzcGxpdHRlciBwYW5lc1xyXG4gICAgICAgIHRoaXMuc2V0T3JpZW50YXRpb24oc3BsaXR0ZXJPcmllbnRhdGlvbik7XHJcblxyXG4gICAgICAgIC8vIFNldCByZXNwb25zaXZlIG9mIHNwbGl0dGVyXHJcbiAgICAgICAgdGhpcy5zZXRSZXNwb25zaXZlKHNwbGl0dGVyUmVzcG9uc2l2ZSk7XHJcblxyXG4gICAgICAgIHRoaXMucmVjYWxjdWxhdGVMYXlvdXQoKTsgICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIGdldFNwbGl0dGVyUGFuZURlZmluaXRpb25zKCk6IEFycmF5PFNwbGl0dGVyUGFuZURlZmluaXRpb24+e1xyXG4gICAgICAgIGxldCBwYW5lRGVmaW5pdGlvbnMgPSBuZXcgQXJyYXk8U3BsaXR0ZXJQYW5lRGVmaW5pdGlvbj4oKTtcclxuICAgICAgICB0aGlzLl93aWRnZXRzLmZvckVhY2goKHdpZGdldCwga2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbXBvbmVudERlZmluaXRpb24gPSBuZXcgQ29tcG9uZW50RGVmaW5pdGlvbihcIlwiLFwiXCIsXCJcIik7XHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnREZWZpbml0aW9uLnNldCh3aWRnZXQuY29tcG9uZW50LmdldERlZmluaXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGFuZVNldHRpbmdzOiBJU2V0dGluZ3N8dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxheW91dFBhbmUgPSB0aGlzLmdldExheW91dFBhbmUoa2V5KTtcclxuICAgICAgICAgICAgICAgIGlmKGxheW91dFBhbmUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBwYW5lU2V0dGluZ3MgPSBsYXlvdXRQYW5lLmdldFNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJMYXlvdXRQYW5lIG5vdCBkZWZpbmVkIVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHBhbmVEZWZpbml0aW9ucy5wdXNoKG5ldyBTcGxpdHRlclBhbmVEZWZpbml0aW9uKGNvbXBvbmVudERlZmluaXRpb24sIHBhbmVTZXR0aW5ncykpOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBwYW5lRGVmaW5pdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRMYXlvdXRQYW5lKGtleTogc3RyaW5nKTogSUxheW91dFBhbmV7XHJcbiAgICAgICAgbGV0IGxheW91dFBhbmU7XHJcbiAgICAgICAgbGF5b3V0UGFuZSA9IHRoaXMubGF5b3V0UGFuZXMuZmlsdGVyKGVsZW1lbnQgPT4geyByZXR1cm4gZWxlbWVudC5uYW1lID09IGtleX0pXHJcbiAgICAgICAgcmV0dXJuIGxheW91dFBhbmVbMF07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRTcGxpdHRlclBhbmVEZWZpbml0aW9ucyhwYW5lRGVmaW5pdGlvbnM6IEFycmF5PFNwbGl0dGVyUGFuZURlZmluaXRpb24+KXtcclxuICAgICAgICAvLyBDcmVhdGUgc3BsaXR0ZXIgcGFuZXMgYW5kIGFkZCB3aWRnZXRzXHJcbiAgICAgICAgZm9yKCBsZXQgaSA9IDA7IGkgPCBwYW5lRGVmaW5pdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYocGFuZURlZmluaXRpb25zW2ldICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29tcG9uZW50RGVmaW5pdGlvbiA9IHBhbmVEZWZpbml0aW9uc1tpXS5jb21wb25lbnREZWZpbml0aW9uO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5jb21wb25lbnQuY29tcG9uZW50RmFjdG9yeSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudC5hZGRTdWJDb21wb25lbnQoY29tcG9uZW50RGVmaW5pdGlvbi50eXBlLCBjb21wb25lbnREZWZpbml0aW9uLmlkLCBjb21wb25lbnREZWZpbml0aW9uLmRlZmF1bHRTZXR0aW5nc0RhdGFJZCwgdGhpcy5jb21wb25lbnQuY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY29tcG9uZW50ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIGluc3RhbmNlIGlzIGEgd2lkZ2V0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNvbXBvbmVudCBpbnN0YW5jZW9mIFdpZGdldEJhc2UpeyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3aWRnZXQgPSBjb21wb25lbnQgIGFzIElXaWRnZXQ7ICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzcGxpdHRlclN0b3JpbmdEYXRhSWQgPSBjb21wb25lbnREZWZpbml0aW9uLmRlZmF1bHRTZXR0aW5nc0RhdGFJZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNwbGl0dGVyU3RvcmluZ0RhdGFJZCAhPSBcIlwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuc2V0RGVmYXVsdENvbXBvbmVudFNldHRpbmdzRGF0YUlkKHNwbGl0dGVyU3RvcmluZ0RhdGFJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRXaWRnZXQod2lkZ2V0LCBjb21wb25lbnREZWZpbml0aW9uLmlkLCBWaWV3VHlwZS5EZWZhdWx0LCBuZXcgUGFuZVByb3BlcnRpZXMoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY29tcG9uZW50RGVmaW5pdGlvbi50eXBlICE9IFwiQ2hhcnRCYXNlXCIpeyAvLyBcIkNoYXJ0QmFzZVwiIGN1cnJlbnRseSBub3QgaW1wbGVtZW50ZWQgPT4gVE9ETzogY3JlYXRlIGNoYXJ0cyB3aXRoIGNvbXBvbmVudGZhY3RvcnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkNvbXBvbmVudCB3aXRoIGNvbXBvbmVudCB0eXBlICdcIiArIGNvbXBvbmVudERlZmluaXRpb24udHlwZSArIFwiJyBjb3VsZCBub3QgYmUgY3JlYXRlZCFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb21wb25lbnRGYWN0b3J5IG5vdCBhdmFpbGFibGUhXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTZXQgc3BsaXR0ZXIgcGFuZSBzaXplc1xyXG4gICAgICAgIGxldCBpID0gMDtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5sYXlvdXRQYW5lcykge1xyXG4gICAgICAgICAgICBsZXQgbGF5b3V0UGFuZSA9IHRoaXMubGF5b3V0UGFuZXNba2V5XTtcclxuICAgICAgICAgICAgaWYocGFuZURlZmluaXRpb25zW2ldLnBhbmVEYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBsYXlvdXRQYW5lLnNldFNldHRpbmdzKHBhbmVEZWZpbml0aW9uc1tpXS5wYW5lRGF0YSk7IC8vIFRPRE86IHBhbmVEYXRhXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBwYW5lIGRlZmluaXRpb25zIGZyb20gY2hhcnRTcGxpdHRlciBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8U3BsaXR0ZXJQYW5lRGVmaW5pdGlvbj59XHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldENoYXJ0Vmlld1NwbGl0dGVyUGFuZURlZmluaXRpb25zKCk6IEFycmF5PFNwbGl0dGVyUGFuZURlZmluaXRpb24+e1xyXG4gICAgICAgIGxldCBzZXR0aW5ncyA9IHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgbGV0IHBhbmVEZWZpbml0aW9ucyA9IG5ldyBBcnJheTxTcGxpdHRlclBhbmVEZWZpbml0aW9uPigpO1xyXG4gICAgICAgIGlmIChzZXR0aW5ncy5kYXRhICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MuZGF0YS5zcGxpdHRlckRlZmluaXRpb24gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBwYW5lRGVmaW5pdGlvbnMgPSBzZXR0aW5ncy5kYXRhLnNwbGl0dGVyRGVmaW5pdGlvbi5wYW5lRGVmaW5pdGlvbnM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBwYW5lRGVmaW5pdGlvbnM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIHdpZGdldCB0byB0aGUgc3BsaXR0ZXIgPT4gYSBuZXcgcGFuZSB3aWxsIGJlIGFkZGVkIGZvciB0aGUgd2lkZ2V0IHRvIHRoZSBzcGxpdHRlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVdpZGdldH0gd2lkZ2V0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQHBhcmFtIHtWaWV3VHlwZX0gdmlld1R5cGVcclxuICAgICAqIEBwYXJhbSB7UGFuZVByb3BlcnRpZXN9IHBhbmVQcm9wZXJ0aWVzXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgYWRkV2lkZ2V0KHdpZGdldDogSVdpZGdldCwgbmFtZTogc3RyaW5nLCB2aWV3VHlwZTogVmlld1R5cGUsIHBhbmVQcm9wZXJ0aWVzOiBQYW5lUHJvcGVydGllcyl7IFxyXG4gICAgICAgIHN1cGVyLmFkZFdpZGdldCh3aWRnZXQsIG5hbWUsIHZpZXdUeXBlKTtcclxuXHJcbiAgICAgICAgbGV0IHNwbGl0dGVyID0gdGhpcy5nZXRTcGxpdHRlcigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBwcm9wZXJ0aWVzID0gdGhpcy5nZXRQcm9wZXJ0aWVzKHNwbGl0dGVyKTsgXHJcbiAgICAgICAgbGV0IG9sZFBhbmVTaXplcyA9IHRoaXMuZ2V0UGFuZVNpemVzKHByb3BlcnRpZXMpO1xyXG5cclxuICAgICAgICBpZighdGhpcy5faXNSZXNwb25zaXZlICYmIHBhbmVQcm9wZXJ0aWVzLnBhbmVTaXplICE9IC0xKXtcclxuICAgICAgICAgICAgdGhpcy5fYWN0dWFsSGVpZ2h0ICs9IHBhbmVQcm9wZXJ0aWVzLnBhbmVTaXplICsgdGhpcy5fZGVmYXVsdFNwbGl0dGVyU2l6ZTtcclxuICAgICAgICAgICAgdGhpcy5yZXNpemVTcGxpdHRlcih0aGlzLl9hY3R1YWxXaWR0aCwgdGhpcy5fYWN0dWFsSGVpZ2h0IC0gdGhpcy5faGVhZGVySGVpZ2h0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwYW5lSWQgPSB0aGlzLmdldFBhbmVEaXZJZChuYW1lKTtcclxuICAgICAgICB2YXIgaW5kZXhPZk5ld1BhbmUgPSBzcGxpdHRlci5tb2RlbC5wcm9wZXJ0aWVzIS5sZW5ndGg7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkUGFuZShzcGxpdHRlciwgcGFuZUlkLCBpbmRleE9mTmV3UGFuZSwgcGFuZVByb3BlcnRpZXMpO1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICB3aWRnZXQuaW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgIC8vIGFkZCB3aWRnZXQgdG8gdGhlIHBhcmVudCBjb250YWluZXJcclxuICAgICAgICB3aWRnZXQuYWRkVG9QYXJlbnRDb250YWluZXJJZChwYW5lSWQpO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZUxheW91dFBhbmVzQWZ0ZXJBZGRpbmdOZXdQYW5lKHByb3BlcnRpZXMsIG9sZFBhbmVTaXplcywgd2lkZ2V0LCB2aWV3VHlwZSk7XHJcblxyXG4gICAgICAgIGlmKCF0aGlzLl9pc1Jlc3BvbnNpdmUpe1xyXG4gICAgICAgICAgICB0aGlzLnNldFByb3BlcnRpZXMoc3BsaXR0ZXIsIHByb3BlcnRpZXMpO1xyXG4gICAgICAgICAgICB0aGlzLnJlc2l6ZVNwbGl0dGVyUGFuZUNvbnRlbnRzKHRoaXMuX2FjdHVhbFdpZHRoLCB0aGlzLl9hY3R1YWxIZWlnaHQtdGhpcy5faGVhZGVySGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhZGRzIHRoaXMgd2lkZ2V0IHRvIHRoZSBnaXZlbiBjb250YWluZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyhIVE1MRGl2RWxlbWVudHx1bmRlZmluZWQpfSBwYXJlbnRDb250YWluZXJcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBhZGRUb1BhcmVudENvbnRhaW5lcihwYXJlbnRDb250YWluZXI6IEhUTUxEaXZFbGVtZW50fHVuZGVmaW5lZCl7XHJcbiAgICAgICAgLy8gQWRkcyBzb21lIGFkZGl0aW9uYWwgbmVlZGVkIHN0eWxlcyBmb3IgdGhpcyBzcGxpdHRlciB0byB0aGUgcGFyZW50IGNvbnRhaW5lclxyXG4gICAgICAgIHRoaXMuYWRkU3R5bGVUb0NvbnRlbnRJZChwYXJlbnRDb250YWluZXIsIFwid2lkZ2V0cy9zcGxpdHRlcldpZGdldC9zdHlsZS9jc3Mvc3BsaXR0ZXJTdHlsZS5jc3NcIik7XHJcbiAgICAgICAgdGhpcy5hZGRTdHlsZVRvQ29udGVudElkKHBhcmVudENvbnRhaW5lciwgXCJ3aWRnZXRzL2NvbW1vbi9zdHlsZS9jc3Mvd2lkZ2V0SGVhZGVyRm9vdGVyU3R5bGUuY3NzXCIpO1xyXG5cclxuICAgICAgICBzdXBlci5hZGRUb1BhcmVudENvbnRhaW5lcihwYXJlbnRDb250YWluZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhIHdpZGdldChwYW5lKSBmcm9tIHRoZSBzcGxpdHRlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVdpZGdldH0gd2lkZ2V0XHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlV2lkZ2V0KHdpZGdldDogSVdpZGdldCl7XHJcbiAgICAgICAgbGV0IHBhbmVJbmRleCA9IHRoaXMuZ2V0UGFuZUluZGV4KHdpZGdldCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHNwbGl0dGVyID0gdGhpcy5nZXRTcGxpdHRlcigpO1xyXG4gICAgICAgIC8vIGdldCBhbGwgYWN0dWFsIHBhbmVTaXplcyBcclxuICAgICAgICB2YXIgcHJvcGVydGllcyA9IHRoaXMuZ2V0UHJvcGVydGllcyhzcGxpdHRlcik7ICBcclxuICAgICAgICB2YXIgc2l6ZVRvUmVtb3ZlID0gcHJvcGVydGllc1twYW5lSW5kZXhdLnBhbmVTaXplO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBwYW5lU2l6ZXMgPSB0aGlzLmdldFBhbmVTaXplcyhwcm9wZXJ0aWVzKTtcclxuICAgICAgICBwYW5lU2l6ZXMuc3BsaWNlKHBhbmVJbmRleCwgMSk7XHJcbiAgICAgICAgc3BsaXR0ZXIucmVtb3ZlSXRlbShwYW5lSW5kZXgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuYWRqdXN0Q2hhcnRzRGl2Q29udGFpbmVyU2l6ZShzaXplVG9SZW1vdmUpO1xyXG4gICAgICAgIGxldCBuZXdTcGxpdHRlckhlaWdodCA9IHRoaXMuYWRqdXN0U3BsaXR0ZXJTaXplKHNwbGl0dGVyLCBzaXplVG9SZW1vdmUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgcHJvcGVydGllc1tpXS5wYW5lU2l6ZSA9IHBhbmVTaXplc1tpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5sYXlvdXRQYW5lcy5zcGxpY2UocGFuZUluZGV4LDEpO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlV2lkZ2V0RnJvbUxpc3Qod2lkZ2V0KTtcclxuIFxyXG4gICAgICAgIHRoaXMuX2FjdHVhbEhlaWdodCA9IG5ld1NwbGl0dGVySGVpZ2h0O1xyXG5cclxuICAgICAgICB0aGlzLnNldFByb3BlcnRpZXMoc3BsaXR0ZXIsIHByb3BlcnRpZXMpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIE1vdmVzIGEgd2lkZ2V0KHNwbGl0dGVyIHBhbmUpIGZyb20gdGhlIHNvdXJjZSBpbmRleCB0byB0aGUgdGFyZ2V0IGluZGV4XHJcbiAgICAgKiAoaW50ZXJuYWw6IHRhcmdldCBpbmRleCB3aWxsIGJlIGRlY3JlYXNlZCBieSAxIGlmIHNvdXJjZSBpbmRleCBpcyBiZWZvcmUgdGFyZ2V0IGluZGV4KVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzb3VyY2VQYW5lSW5kZXhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0YXJnZXRQYW5lSW5kZXhcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBtb3ZlV2lkZ2V0KHdpZGdldDogSVdpZGdldCwgdGFyZ2V0UGFuZUluZGV4OiBudW1iZXIpe1xyXG4gICAgICAgIC8vIGFkZHMgdGhlIHdpZGdldCBkaXZzIHRvIHRoZSBkb2N1bWVudHMgdGVtcFxyXG4gICAgICAgIHdpZGdldC5hZGRUb0RvY3VtZW50c1RlbXAoKTtcclxuXHJcbiAgICAgICAgbGV0IHNvdXJjZVBhbmVJbmRleCA9IHRoaXMuZ2V0UGFuZUluZGV4KHdpZGdldCk7XHJcbiAgICAgICAgbGV0IHNwbGl0dGVyID0gdGhpcy5nZXRTcGxpdHRlcigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBsYXlvdXRQYW5lID0gdGhpcy5sYXlvdXRQYW5lc1tzb3VyY2VQYW5lSW5kZXhdO1xyXG4gICAgICAgIHRhcmdldFBhbmVJbmRleCA9IHRoaXMudXBkYXRhVGFyZ2V0UGFuZUluZGV4KHNvdXJjZVBhbmVJbmRleCwgdGFyZ2V0UGFuZUluZGV4KTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgb3JpZ2luYWxQYW5lUHJvcGVyaWVzID0gdGhpcy5nZXRQYW5lUHJvcGVydGllcyhsYXlvdXRQYW5lKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgcHJvcGVydGllcyA9IHRoaXMuZ2V0UHJvcGVydGllcyhzcGxpdHRlcik7XHJcbiAgICAgICAgdGhpcy51cGRhdGVQcm9wZXJ0aWVzTGlzdChwcm9wZXJ0aWVzLCBzb3VyY2VQYW5lSW5kZXgsIHRhcmdldFBhbmVJbmRleClcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnJlbW92ZVBhbmUoc3BsaXR0ZXIsIHNvdXJjZVBhbmVJbmRleCk7XHJcblxyXG4gICAgICAgIGxldCBwYW5lSWQgPSB0aGlzLmdldFBhbmVEaXZJZCh3aWRnZXQud2lkZ2V0TmFtZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5hZGRQYW5lKHNwbGl0dGVyLCBwYW5lSWQsIHRhcmdldFBhbmVJbmRleCwgb3JpZ2luYWxQYW5lUHJvcGVyaWVzKTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVMYXlvdXRQYW5lc0xpc3RBZnRlck1vdmluZyhsYXlvdXRQYW5lLCBzb3VyY2VQYW5lSW5kZXgsIHRhcmdldFBhbmVJbmRleCk7XHJcblxyXG4gICAgICAgIHRoaXMucmVzaXplU3BsaXR0ZXIodGhpcy5fYWN0dWFsV2lkdGgsIHRoaXMuX2FjdHVhbEhlaWdodC10aGlzLl9oZWFkZXJIZWlnaHQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGFkZHMgdGhlIHdpZGdldCBkaXZzIHRvIHRoZSBuZXcgYWRkZWQgc3BsaXR0ZXIgcGFuZVxyXG4gICAgICAgIHdpZGdldC5hZGRUb1BhcmVudENvbnRhaW5lcklkKHBhbmVJZCk7XHJcbiAgICAgICAgd2lkZ2V0LmZsYWdnZWRGb3JSZXNpemUgPSB0cnVlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucmVzaXplU3BsaXR0ZXJQYW5lQ29udGVudHModGhpcy5fYWN0dWFsV2lkdGgsdGhpcy5fYWN0dWFsSGVpZ2h0LXRoaXMuX2hlYWRlckhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBwYW5lUHJvcGVydGllcyBvZiB0aGUgZ2l2ZW4gbGF5b3V0UGFuZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lMYXlvdXRQYW5lfSBsYXlvdXRQYW5lXHJcbiAgICAgKiBAcmV0dXJucyB7UGFuZVByb3BlcnRpZXN9XHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRQYW5lUHJvcGVydGllcyhsYXlvdXRQYW5lOiBJTGF5b3V0UGFuZSk6IFBhbmVQcm9wZXJ0aWVze1xyXG4gICAgICAgIGxldCBwYW5lUHJvcGVydGllcyA9IG5ldyBQYW5lUHJvcGVydGllcygpO1xyXG4gICAgICAgIHBhbmVQcm9wZXJ0aWVzLmNvbGxhcHNpYmxlID0gbGF5b3V0UGFuZS5jb2xsYXBzaWJsZTtcclxuICAgICAgICBwYW5lUHJvcGVydGllcy5leHBhbmRhYmxlID0gbGF5b3V0UGFuZS5leHBhbmRhYmxlO1xyXG4gICAgICAgIHBhbmVQcm9wZXJ0aWVzLm1pblNpemUgPSBsYXlvdXRQYW5lLm1pbmltdW1TaXplO1xyXG4gICAgICAgIHBhbmVQcm9wZXJ0aWVzLnJlc2l6YWJsZSA9IGxheW91dFBhbmUucmVzaXphYmxlO1xyXG4gICAgICAgIHJldHVybiBwYW5lUHJvcGVydGllcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2l6ZSBhIHdpZGdldCB0byBhIG5ldyBzaXplIGFuZCBhZGFwdCB0aGUgb3RoZXIgd2lkZ2V0cyBpbiB0aGlzIGxheW91dFdpZGdldChzcGxpdHRlcilcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lXaWRnZXR9IHdpZGdldFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG5ld1NpemVcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICByZXNpemVXaWRnZXQod2lkZ2V0OiBJV2lkZ2V0LCBuZXdTaXplOiBudW1iZXIpe1xyXG4gICAgICAgIGxldCBwYW5lSW5kZXggPSB0aGlzLmdldFBhbmVJbmRleCh3aWRnZXQpO1xyXG4gICAgICAgIHZhciBzcGxpdHRlciA9IHRoaXMuZ2V0U3BsaXR0ZXIoKTtcclxuXHJcbiAgICAgICAgbGV0IHByb3BlcnRpZXMgPSB0aGlzLmdldFByb3BlcnRpZXMoc3BsaXR0ZXIpIFxyXG4gICAgICAgIC8vIHNldCBuZXcgcGFuZSBzaXplc1xyXG4gICAgICAgIGxldCBjdXJyZW50UGFuZVNpemUgPSBwcm9wZXJ0aWVzW3BhbmVJbmRleF0ucGFuZVNpemU7XHJcbiAgICAgICAgbGV0IHBhbmVEaWZmU2l6ZSA9IGN1cnJlbnRQYW5lU2l6ZS1uZXdTaXplO1xyXG5cclxuICAgICAgICBsZXQgc2l6ZU9mT3RoZXJQYW5lID0gLTE7XHJcbiAgICAgICAgbGV0IGluZGV4T2ZPdGhlclBhbmUgPSAtMTtcclxuICAgICAgICBpZihwYW5lSW5kZXggKzEgPj0gdGhpcy5sYXlvdXRQYW5lcy5sZW5ndGgpe1xyXG4gICAgICAgICAgICAvLyBMYXN0IHBhbmUgc2l6ZSBjaGFuZ2VkID0+IHVwZGF0ZSB0aGUgc2l6ZSBvZiB0aGUgcGFuZSBiZWZvcmVcclxuICAgICAgICAgICAgc2l6ZU9mT3RoZXJQYW5lID0gcHJvcGVydGllc1twYW5lSW5kZXgtMV0ucGFuZVNpemUrcGFuZURpZmZTaXplO1xyXG4gICAgICAgICAgICBpbmRleE9mT3RoZXJQYW5lID0gcGFuZUluZGV4LTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgZm9sbG93aW5nIHBhbmUgc2l6ZVxyXG4gICAgICAgICAgICBzaXplT2ZPdGhlclBhbmUgPSBwcm9wZXJ0aWVzW3BhbmVJbmRleCsxXS5wYW5lU2l6ZStwYW5lRGlmZlNpemU7XHJcbiAgICAgICAgICAgIGluZGV4T2ZPdGhlclBhbmUgPSBwYW5lSW5kZXgrMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoc2l6ZU9mT3RoZXJQYW5lIDwgMCl7XHJcbiAgICAgICAgICAgIC8vIEF2b2lkIHJlc2l6aW5nIHRoZSBmb2xsb3dpbmcgcGFuZShvciB0aGUgcGFuZSBiZWZvcmUpIHRvIGEgc2l6ZSBzbWFsbGVyIHRoZW4gMFxyXG4gICAgICAgICAgICBsZXQgb2xkVmFsdWUgPSBNYXRoLmFicyhzaXplT2ZPdGhlclBhbmUpO1xyXG4gICAgICAgICAgICBzaXplT2ZPdGhlclBhbmUgPSA1MDsgICBcclxuICAgICAgICAgICAgbmV3U2l6ZSA9IG5ld1NpemUgLSBvbGRWYWx1ZSAtIDUwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxheW91dFBhbmVzW2luZGV4T2ZPdGhlclBhbmVdLnNpemUgPSBzaXplT2ZPdGhlclBhbmU7XHJcbiAgICAgICAgcHJvcGVydGllc1tpbmRleE9mT3RoZXJQYW5lXS5wYW5lU2l6ZSA9IHNpemVPZk90aGVyUGFuZTtcclxuXHJcbiAgICAgICAgdGhpcy5sYXlvdXRQYW5lc1twYW5lSW5kZXhdLnNpemUgPSBuZXdTaXplO1xyXG4gICAgICAgIHByb3BlcnRpZXNbcGFuZUluZGV4XS5wYW5lU2l6ZSA9IG5ld1NpemU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gVXBkYXRlcyB0aGUgc3BsaXR0ZXJzXHJcbiAgICAgICAgdGhpcy5zZXRQYW5lUHJvcGVydGllc1RvU3BsaXR0ZXIoc3BsaXR0ZXIsIHByb3BlcnRpZXMpO1xyXG5cclxuICAgICAgICAvLyB1cGRhdGVzIHRoZSBjb250ZW50cyBpbiB0aGUgc3BsaXR0ZXJzXHJcbiAgICAgICAgdGhpcy5yZXNpemVTcGxpdHRlclBhbmVDb250ZW50cyh0aGlzLl9hY3R1YWxXaWR0aCwgdGhpcy5fYWN0dWFsSGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGVqU3BsaXR0ZXIgZGF0YSBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFNwbGl0dGVyKCk6IGFueXtcclxuICAgICAgICByZXR1cm4gJCh0aGlzLm1haW5EaXYpLmRhdGEoXCJlalNwbGl0dGVyXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgc2l6ZXMgb2YgYWxsIHBhbmVzIHRvZ2V0aGVyLCBpbmNsLiB0aGUgZHluYW1pYyBwYW5lXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdW1PZkRlZmluZWRMYXlvdXRQYW5lU2l6ZXMoKTogbnVtYmVye1xyXG4gICAgICAgIGxldCBzdW06IG51bWJlciA9IDA7XHJcbiAgICAgICAgZm9yKGxldCBrZXkgaW4gdGhpcy5sYXlvdXRQYW5lcykge1xyXG4gICAgICAgICAgICBsZXQgbGF5b3V0UGFuZSA9ICB0aGlzLmxheW91dFBhbmVzW2tleV07XHJcbiAgICAgICAgICAgIGlmKGxheW91dFBhbmUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHN1bSArPSBsYXlvdXRQYW5lLnNpemU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN1bTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHNpemVzIG9mIGFsbCBwYW5lcyB0b2dldGhlciwgd2l0aG91dCB0aGUgc2l6ZSBvZiB0aGUgZHluYW1pYyBwYW5lIGJ1dCBpbmNsdWRpbmcgdGhlIHNwbGl0dGVyIHNpemUoZS5nLiA5cHgpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdW1PZkRlZmluZWRQYW5lU2l6ZXMoKTogbnVtYmVye1xyXG4gICAgICAgIGxldCBzdW06IG51bWJlciA9IDA7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICBmb3IobGV0IGtleSBpbiB0aGlzLmxheW91dFBhbmVzKSB7XHJcbiAgICAgICAgICAgIGxldCBsYXlvdXRQYW5lID0gIHRoaXMubGF5b3V0UGFuZXNba2V5XTtcclxuICAgICAgICAgICAgaWYobGF5b3V0UGFuZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKGxheW91dFBhbmUuZmlsbFNwYWNlID09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICBzdW0gKz0gbGF5b3V0UGFuZS5zaXplO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoaW5kZXg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNwbGl0dGVyU2l6ZSA9IHRoaXMuX2RlZmF1bHRTcGxpdHRlclNpemU7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VtICs9IHNwbGl0dGVyU2l6ZTsgLy8gQWRkIHNpemUgb2Ygc3BsaXR0ZXJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3VtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaWYgdGhlIHBhbmUgc2l6ZXMgYXJlIHRvbyBiaWcgZm9yIHRoZSBjdXJyZW50IHdpbmRvdyBzaXplLCB0aGUgcGFuZXMgd291bGQgYmUgZGVjcmVhc2VkIGluIHNpemVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNpemVcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkb3B0TGF5b3V0UGFuZXNUb0ZpdEN1cnJlbnRTaXplKHNpemU6IG51bWJlcil7XHJcbiAgICAgICAgbGV0IHN1bU9mUGFuZXNXaXRvdXREeW5hbWljID0gdGhpcy5zdW1PZkRlZmluZWRQYW5lU2l6ZXMoKTtcclxuICAgICAgICBsZXQgbmVlZGVkU2l6ZSA9IHN1bU9mUGFuZXNXaXRvdXREeW5hbWljIC0gc2l6ZTtcclxuICAgICAgICBpZihuZWVkZWRTaXplID4gMCl7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IGdldCBsYXN0IG5vdCBkeW5hbWljIHBhbmVcclxuICAgICAgICAgICAgbGV0IGxhc3RQYW5lID0gdGhpcy5sYXlvdXRQYW5lc1t0aGlzLmxheW91dFBhbmVzLmxlbmd0aC0xXTtcclxuICAgICAgICAgICAgbGFzdFBhbmUuc2l6ZSA9IGxhc3RQYW5lLnNpemUtIG5lZWRlZFNpemU7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbmV3IHBhbmUgYXQgdGhlIGdpdmVuIGluZGV4IHdpdGggdGhlIGdpdmVuIHNpemUgXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7ZWouU3BsaXR0ZXJ9IHNwbGl0dGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFuZUlkXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhPZk5ld1BhbmVcclxuICAgICAqIEBwYXJhbSB7UGFuZVByb3BlcnRpZXN9IHBhbmVQcm9wZXJ0aWVzXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRQYW5lKHNwbGl0dGVyOiBlai5TcGxpdHRlciwgcGFuZUlkOiBzdHJpbmcsIGluZGV4T2ZOZXdQYW5lOiBudW1iZXIsIHBhbmVQcm9wZXJ0aWVzOiBQYW5lUHJvcGVydGllcyl7XHJcbiAgICAgICAgbGV0IG5ld0l0ZW07XHJcbiAgICAgICAgaWYoIXRoaXMuX2lzUmVzcG9uc2l2ZSAmJiBwYW5lUHJvcGVydGllcy5wYW5lU2l6ZSAhPSAtMSl7XHJcbiAgICAgICAgICAgIGlmKGluZGV4T2ZOZXdQYW5lID09IDApe1xyXG4gICAgICAgICAgICAgICAgaW5kZXhPZk5ld1BhbmUrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdJdGVtPSBzcGxpdHRlci5yZW1vdmVJdGVtKGluZGV4T2ZOZXdQYW5lLTEpO1xyXG5cclxuICAgICAgICAgICAgbmV3SXRlbT0gc3BsaXR0ZXIuYWRkSXRlbShcIjxkaXYgaWQ9J1wiICsgcGFuZUlkICsgXCInIHN0eWxlPSdvdmVyZmxvdzpoaWRkZW4nPjwvZGl2PlwiLCB7IHBhbmVTaXplOiBwYW5lUHJvcGVydGllcy5wYW5lU2l6ZSwgZXhwYW5kYWJsZTogcGFuZVByb3BlcnRpZXMuZXhwYW5kYWJsZSwgY29sbGFwc2libGU6IHBhbmVQcm9wZXJ0aWVzLmNvbGxhcHNpYmxlLCBtaW5TaXplOiBwYW5lUHJvcGVydGllcy5taW5TaXplfSwgaW5kZXhPZk5ld1BhbmUtMSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL0NoZWNrIHNwbGl0dGVyIHNpemU6IEluY3JlYXNlIGhlaWdodCBvZiBzcGxpdHRlciBpZiBpdCBpcyBub3QgYmlnIGVub3VnaCB0byBpbnNlcnQgYSBuZXcgY2hhcnRcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmhhc1BhbmVNaW5TaXplKHNwbGl0dGVyKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNpemVTcGxpdHRlcih0aGlzLl9hY3R1YWxXaWR0aCwgdGhpcy5fYWN0dWFsSGVpZ2h0ICsgMSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG5ld0l0ZW09IHNwbGl0dGVyLmFkZEl0ZW0oXCI8ZGl2IGlkPSdcIiArIHRoaXMuZ2V0TGFzdFBhbmVJZCgpICsgXCInIHN0eWxlPSdvdmVyZmxvdzpoaWRkZW47IHdpZHRoOjEwMCU7IGhlaWdodDoxMDAlJz48L2Rpdj5cIiwgeyBwYW5lU2l6ZTogNDAwLCBleHBhbmRhYmxlOiBmYWxzZSwgY29sbGFwc2libGU6IGZhbHNlfSwgaW5kZXhPZk5ld1BhbmUpOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgbmV3SXRlbSA9IHNwbGl0dGVyLmFkZEl0ZW0oXCI8ZGl2IGlkPSdcIiArIHBhbmVJZCArIFwiJyBzdHlsZT0nb3ZlcmZsb3c6aGlkZGVuJz48L2Rpdj5cIiwgeyBwYW5lU2l6ZTogcGFuZVByb3BlcnRpZXMucGFuZVNpemUsIGV4cGFuZGFibGU6IHBhbmVQcm9wZXJ0aWVzLmV4cGFuZGFibGUsIGNvbGxhcHNpYmxlOiBwYW5lUHJvcGVydGllcy5jb2xsYXBzaWJsZSwgbWluU2l6ZTogcGFuZVByb3BlcnRpZXMubWluU2l6ZX0sIGluZGV4T2ZOZXdQYW5lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKG5ld0l0ZW0udG9TdHJpbmcoKSA9PSBcIlwiKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVSUk9SOiBzcGxpdHRlci5hZGRJdGVtXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBuZXdJdGVtWzBdLnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkaXYgaWQgb2YgdGhlIGxhc3QgcGFuZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldExhc3RQYW5lSWQoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1haW5EaXZJZCArIFwiX2xhc3RQYW5lXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkaXYgaWQgb2YgYSBwYW5lIGZvciB0aGUgZ2l2ZW4gd2lkZ2V0bmFtZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFBhbmVEaXZJZChuYW1lOiBzdHJpbmcpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5tYWluRGl2SWQgKyBcInBhbmVfXCIgKyBuYW1lLnJlcGxhY2UoXCIgXCIsIFwiXCIpO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgLyoqXHJcbiAgICAgKiAgUmVtb3ZlcyB0aGUgcGFuZSB3aXRoIHRoZSBnaXZlbiBpbmRleCBmcm9tIHRoZSBzcGxpdHRlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNwbGl0dGVyXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcGFuZUluZGV4XHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZW1vdmVQYW5lKHNwbGl0dGVyLCBwYW5lSW5kZXg6IG51bWJlcil7XHJcbiAgICAgICAgc3BsaXR0ZXIucmVtb3ZlSXRlbShwYW5lSW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlTGF5b3V0UGFuZXNBZnRlckFkZGluZ05ld1BhbmUocHJvcGVydGllcywgb2xkUGFuZVNpemVzLCB3aWRnZXQ6IElXaWRnZXQsIHZpZXdUeXBlKXtcclxuICAgICAgICBpZih0aGlzLl9pc1Jlc3BvbnNpdmUpe1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0YUxheW91dFBhbmVzQWZ0ZXJBZGRpbmdOZXdQYW5lUmVzcG9uc2l2ZShwcm9wZXJ0aWVzLCB3aWRnZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNleyAgXHJcbiAgICAgICAgICAgIG9sZFBhbmVTaXplc1tvbGRQYW5lU2l6ZXMubGVuZ3RoLTFdID0gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgZm9yKGxldCBpID0wOyBpIDwgcHJvcGVydGllcy5sZW5ndGgtMTsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBuYW1lID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGlmKG9sZFBhbmVTaXplc1tpXSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXNbaV0ucGFuZVNpemUgPSBvbGRQYW5lU2l6ZXNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZSA9IHRoaXMubGF5b3V0UGFuZXNbaV0ubmFtZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYobmFtZSA9PT0gXCJcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZSA9IHdpZGdldC53aWRnZXROYW1lICsgXCJfXCIrIHZpZXdUeXBlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZSA9IFVuaXF1ZUlkR2VuZXJhdG9yLmdldEluc3RhbmNlKCkuZ2V0VW5pcXVlSWRGcm9tU3RyaW5nKG5hbWUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgcGFuZVdpZGdldCA9IHdpZGdldDtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMubGF5b3V0UGFuZXNbaV0gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBwYW5lV2lkZ2V0ID0gdGhpcy5sYXlvdXRQYW5lc1tpXS53aWRnZXQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheW91dFBhbmVzW2ldICA9ICBuZXcgTGF5b3V0UGFuZShuYW1lLCBwcm9wZXJ0aWVzW2ldLnBhbmVTaXplLCBwYW5lV2lkZ2V0LCBmYWxzZSwgdHJ1ZSwgcHJvcGVydGllc1tpXS5leHBhbmRhYmxlLCBwcm9wZXJ0aWVzW2ldLmNvbGxhcHNpYmxlLCBwcm9wZXJ0aWVzW2ldLm1pblNpemUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRhTGF5b3V0UGFuZXNBZnRlckFkZGluZ05ld1BhbmVSZXNwb25zaXZlKHByb3BlcnRpZXMsIHdpZGdldCkge1xyXG4gICAgICAgIGZvcihsZXQgaSA9MDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgbmFtZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIGxldCBqID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fd2lkZ2V0cy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihqID09IGkpe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSBrZXk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBqKys7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbGV0IHBhbmVXaWRnZXQgPSB3aWRnZXQ7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubGF5b3V0UGFuZXNbaV0gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHBhbmVXaWRnZXQgPSB0aGlzLmxheW91dFBhbmVzW2ldLndpZGdldDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxheW91dFBhbmVzW2ldID0gbmV3IExheW91dFBhbmUobmFtZSwgcHJvcGVydGllc1tpXS5wYW5lU2l6ZSwgcGFuZVdpZGdldCwgZmFsc2UsIHRydWUsIHByb3BlcnRpZXNbaV0uZXhwYW5kYWJsZSwgcHJvcGVydGllc1tpXS5jb2xsYXBzaWJsZSwgcHJvcGVydGllc1tpXS5taW5TaXplKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHByb3BlcnRpZXMgd2l0aCB0aGUgaW5mb3JtYXRpb25zIGZyb20gdGhlIGxheW91dFBhbmUgZGVmaW5pdGlvbnM7XHJcbiAgICAgKiBTaXplIG9mIGR5bmFtaWMgcGFuZSB3aWxsIGJlIGNhbGN1bGF0ZWQgYnkgdXNpbmcgdGhlIGFjdHVhbCB3aWRnZXQgc2l6ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHByb3BlcnRpZXNcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVByb3BlcnRpZXNJbmZvcm1hdGlvbnNXaXRoTGF5b3V0UGFuZXNEYXRhKHByb3BlcnRpZXMpeyAgIFxyXG4gICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgZm9yKGxldCBrZXkgaW4gdGhpcy5sYXlvdXRQYW5lcykge1xyXG4gICAgICAgICAgICBsZXQgbGF5b3V0UGFuZSA9ICB0aGlzLmxheW91dFBhbmVzW2tleV07XHJcbiAgICAgICAgICAgIGlmKGxheW91dFBhbmUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihsYXlvdXRQYW5lLmZpbGxTcGFjZSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllc1tpbmRleF0ucGFuZVNpemUgPSBsYXlvdXRQYW5lLnNpemU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzaXplID0gdGhpcy5fYWN0dWFsV2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5fb3JpZW50YXRpb24gPT0gZWouT3JpZW50YXRpb24uVmVydGljYWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplID0gdGhpcy5fYWN0dWFsSGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW2luZGV4XS5wYW5lU2l6ZSA9IHNpemUgLSB0aGlzLnN1bU9mRGVmaW5lZExheW91dFBhbmVTaXplcygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcHJvcGVydGllc1tpbmRleF0uZXhwYW5kYWJsZSA9IGxheW91dFBhbmUuZXhwYW5kYWJsZTtcclxuICAgICAgICAgICAgICAgIHByb3BlcnRpZXNbaW5kZXhdLmNvbGxhcHNpYmxlID0gbGF5b3V0UGFuZS5jb2xsYXBzaWJsZTtcclxuICAgICAgICAgICAgICAgIHByb3BlcnRpZXNbaW5kZXhdLnJlc2l6YWJsZSA9IGxheW91dFBhbmUucmVzaXphYmxlO1xyXG4gICAgICAgICAgICAgICAgcHJvcGVydGllc1tpbmRleF0ubWluU2l6ZSA9IGxheW91dFBhbmUubWluaW11bVNpemU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAgXHJcbiAgICAvKipcclxuICAgICAqIHJlc2l6ZSB0aGUgc3BsaXR0ZXIgYW5kIHVwZGF0ZSB0aGUgc3BsaXR0ZXIgcGFuZXNpemVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVzaXplU3BsaXR0ZXIod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpe1xyXG4gICAgICAgIHZhciBzcGxpdHRlciA9IHRoaXMuZ2V0U3BsaXR0ZXIoKTtcclxuXHJcbiAgICAgICAgc3BsaXR0ZXIub3B0aW9uKFwid2lkdGhcIiwgd2lkdGgsIHRydWUpO1xyXG4gICAgICAgIHNwbGl0dGVyLm9wdGlvbihcImhlaWdodFwiLCBoZWlnaHQsIHRydWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBwcm9wZXJ0aWVzID0gdGhpcy5nZXRQcm9wZXJ0aWVzKHNwbGl0dGVyKTsgXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy51cGRhdGVQYW5lUHJvcGVydGllcyhwcm9wZXJ0aWVzLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2V0UGFuZVByb3BlcnRpZXNUb1NwbGl0dGVyKHNwbGl0dGVyLCBwcm9wZXJ0aWVzKTtcclxuICAgIH0gIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIHRydWUgaWYgc3BsaXR0ZXIgaGFzIGVub3VnaCBzaXplIHRvIGluc2VydCBhbGwgbmVjZXNzYXJ5IGNoYXJ0cy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtlai5TcGxpdHRlcn0gc3BsaXR0ZXJcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaGFzUGFuZU1pblNpemUoc3BsaXR0ZXI6IGVqLlNwbGl0dGVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IG1pbkhlaWdodCA9IDA7XHJcbiAgICAgICAgbGV0IHN1bU9mUGFuZUhlaWdodHMgPSBtaW5IZWlnaHQ7XHJcblxyXG4gICAgICAgIGlmIChzcGxpdHRlci5tb2RlbC5wcm9wZXJ0aWVzICYmIHNwbGl0dGVyLm1vZGVsLnByb3BlcnRpZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAvL01pbiBoZWlnaHQgb2Ygc3BsaXR0ZXIgPT4gbGFzdFBhbmVTaXplICsgYmFyIHNpemUgKDQwOSkgKyBtaW5TaXplIG9mIGFsbCBjaGFydHMgKyB0aGUgYmFyIGhlaWdodCBiZXR3ZWVuIGNoYXJ0cyg5KVxyXG4gICAgICAgICAgICBtaW5IZWlnaHQgPSA0MDkgKyAoc3BsaXR0ZXIubW9kZWwucHJvcGVydGllcy5sZW5ndGggLSAxKSAqIDk7XHJcbiAgICAgICAgICAgIHN1bU9mUGFuZUhlaWdodHMgPSAoc3BsaXR0ZXIubW9kZWwucHJvcGVydGllcy5sZW5ndGggLSAxKSAqIDk7XHJcblxyXG4gICAgICAgICAgICBzcGxpdHRlci5tb2RlbC5wcm9wZXJ0aWVzLmZvckVhY2gocGFuZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBtaW5IZWlnaHQgKz0gcGFuZS5taW5TaXplO1xyXG4gICAgICAgICAgICAgICAgc3VtT2ZQYW5lSGVpZ2h0cyArPSBwYW5lLnBhbmVTaXplO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHN1bU9mUGFuZUhlaWdodHMgPj0gbWluSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHBhbmVzaXplIGluIHRoZSBwcm9wZXJ0aWVzIGZvciB0aGUgbmV3IGhlaWdodC93aWR0aFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHByb3BlcnRpZXNcclxuICAgICAqIEBwYXJhbSB7Kn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7Kn0gaGVpZ2h0XHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVQYW5lUHJvcGVydGllcyhwcm9wZXJ0aWVzLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gU2V0IGFsbCBrbm93IHBhbmUgc2l6ZXNcclxuICAgICAgICB0aGlzLnNldEtub3duUGFuZVNpemVzKHByb3BlcnRpZXMpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gU2V0IGFsbCBkeW5hbWljIHBhbmUgc2l6ZXNcclxuICAgICAgICB0aGlzLnNldER5bmFtaWNQYW5lU2l6ZXMocHJvcGVydGllcywgd2lkdGgsIGhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRLbm93blBhbmVTaXplcyhwcm9wZXJ0aWVzKXtcclxuICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgIGZvcihsZXQga2V5IGluIHRoaXMubGF5b3V0UGFuZXMpIHtcclxuICAgICAgICAgICAgbGV0IGxheW91dFBhbmUgPSAgdGhpcy5sYXlvdXRQYW5lc1trZXldO1xyXG4gICAgICAgICAgICBpZihsYXlvdXRQYW5lID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgaWYobGF5b3V0UGFuZS5maWxsU3BhY2UgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXNbaW5kZXhdLnBhbmVTaXplID0gbGF5b3V0UGFuZS5zaXplO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0RHluYW1pY1BhbmVTaXplcyhwcm9wZXJ0aWVzLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICBmb3IobGV0IGtleSBpbiB0aGlzLmxheW91dFBhbmVzKSB7XHJcbiAgICAgICAgICAgIGxldCBsYXlvdXRQYW5lID0gIHRoaXMubGF5b3V0UGFuZXNba2V5XTtcclxuICAgICAgICAgICAgaWYobGF5b3V0UGFuZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKGxheW91dFBhbmUuZmlsbFNwYWNlID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuX29yaWVudGF0aW9uID09IGVqLk9yaWVudGF0aW9uLlZlcnRpY2FsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllc1tpbmRleF0ucGFuZVNpemUgPSBoZWlnaHQgLSB0aGlzLnN1bU9mRGVmaW5lZFBhbmVTaXplcygpOyBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllc1tpbmRleF0ucGFuZVNpemUgPSB3aWR0aCAtIHRoaXMuc3VtT2ZEZWZpbmVkUGFuZVNpemVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGdpdmVuIHByb3BlcnRpZXMocGFuZXNpemVzLCAuLi4pIHRvIHRoZSBlanNwbGl0dGVyXHJcbiAgICAgKiBpZiB0aGUgbGFzdCBwYW5lc2l6ZSBpcyB1bmRlciAxcHggYSBjb3JyZWN0aW9uIG9mIHRoZSBwYW5lc2l6ZSB3aWxsIGJlIGRvbmU7IG9jY3VyZXMgc29tZXRpbWVzIGluIGNhc2Ugb2YgYnJvd3NlciB6b29tXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc3BsaXR0ZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gcHJvcGVydGllc1xyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0UGFuZVByb3BlcnRpZXNUb1NwbGl0dGVyKHNwbGl0dGVyLCBwcm9wZXJ0aWVzKXtcclxuICAgICAgICB0aGlzLnNldFByb3BlcnRpZXMoc3BsaXR0ZXIsIHByb3BlcnRpZXMpO1xyXG4gICAgICAgIGlmKCg8YW55PnNwbGl0dGVyKS5wYW5lcy5sZW5ndGggPiAwKSB7IFxyXG4gICAgICAgICAgICBsZXQgbGFzdFBhbmUgPSAoPGFueT5zcGxpdHRlcikucGFuZXNbKDxhbnk+c3BsaXR0ZXIpLnBhbmVzLmxlbmd0aC0xXTtcclxuICAgICAgICAgICAgaWYobGFzdFBhbmUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGxldCBsYXN0UGFuZVNpemVTdHJpbmcgPSBsYXN0UGFuZS5zdHlsZS53aWR0aDtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX29yaWVudGF0aW9uID09IGVqLk9yaWVudGF0aW9uLlZlcnRpY2FsKXtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0UGFuZVNpemVTdHJpbmcgPSBsYXN0UGFuZS5zdHlsZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgbGFzdFBhbmVTaXplID0gcGFyc2VGbG9hdChsYXN0UGFuZVNpemVTdHJpbmcpO1xyXG4gICAgICAgICAgICAgICAgaWYobGFzdFBhbmVTaXplIDw9IDAuOTk5OSAmJiBwcm9wZXJ0aWVzW3Byb3BlcnRpZXMubGVuZ3RoLTFdLnBhbmVTaXplID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2l6ZSBvZiBsYXN0IHNwbGl0dGVyIHBhbmUgd2FzIG5vdCBzZXQgY29ycmVjdCA9PiB0byBsZXNzIHNwYWNlIVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGJyb3dzZXIgem9vbSBpcyB1c2VkIHRoZSBzaXplcyB3aWxsIGJlIGRlZmluZWQgd2l0aCBkZWNpbWFscGxhY2VzO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSBlalNwbGl0dGVyIHNldHMgdGhlIHNpemUgb2YgdGhlIGxhc3QgcGFuZSB0byAwIGlmIGl0IGlzIGEgbGl0dGxlIGJpdCB0byB0YWxsIChlLmcuIFwiMC4xcHhcIikgPT4gcGFuZSB3aWxsIG5vdCBiZSBzaG93blxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCBsYXN0IHBhbmUgYSBsaXR0bGUgYml0IHNtYWxsZXJcclxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW3Byb3BlcnRpZXMubGVuZ3RoLTFdLnBhbmVTaXplLS07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQcm9wZXJ0aWVzKHNwbGl0dGVyLCBwcm9wZXJ0aWVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHNwbGl0dGVyIHBhbmUgY29udGVudCBzaXplcyAod2lkZ2V0IHNpemVzKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlc2l6ZVNwbGl0dGVyUGFuZUNvbnRlbnRzKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXtcclxuICAgICAgICAvLyBTZXQgdGhlIHNpemVzIG9mIHRoZSBzcGxpdHRlciBwYW5lY29udGVudHNcclxuICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmxheW91dFBhbmVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHdpZGdldCA9IHRoaXMuX3dpZGdldHMuZ2V0KHRoaXMubGF5b3V0UGFuZXNbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgIGlmKHdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHdpZGdldFdpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2lkZ2V0SGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX29yaWVudGF0aW9uID09IGVqLk9yaWVudGF0aW9uLlZlcnRpY2FsKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmxheW91dFBhbmVzW2luZGV4XS5maWxsU3BhY2UgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldEhlaWdodCA9IGhlaWdodCAtIHRoaXMuc3VtT2ZEZWZpbmVkUGFuZVNpemVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHdpZGdldEhlaWdodCA8IDApeyAvLyBObyBwbGFjZSBmb3IgZHluYW1pYyBwYW5lLCBtYXliZSBhbHNvIG90aGVyIHBhbmVzIGhhdmUgdG8gYmUgYWRvcHRlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZG9wdExheW91dFBhbmVzVG9GaXRDdXJyZW50U2l6ZShoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0SGVpZ2h0ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXRIZWlnaHQgPSB0aGlzLmxheW91dFBhbmVzW2luZGV4XS5zaXplO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMubGF5b3V0UGFuZXNbaW5kZXhdLmZpbGxTcGFjZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0V2lkdGggPSB3aWR0aCAtIHRoaXMuc3VtT2ZEZWZpbmVkUGFuZVNpemVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHdpZGdldFdpZHRoIDwgMCl7IC8vIE5vIHBsYWNlIGZvciBkeW5hbWljIHBhbmUsIG1heWJlIGFsc28gb3RoZXIgcGFuZXMgaGF2ZSB0byBiZSBhZG9wdGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkb3B0TGF5b3V0UGFuZXNUb0ZpdEN1cnJlbnRTaXplKHdpZHRoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldFdpZHRoID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXRXaWR0aCA9IHRoaXMubGF5b3V0UGFuZXNbaW5kZXhdLnNpemU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgd2lkZ2V0LnJlc2l6ZSh3aWRnZXRXaWR0aCwgd2lkZ2V0SGVpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vUGVyc2lzdCBkYXRhIGV2ZXJ5IHRpbWUgYSBzcGxpdHRlciBpcyByZXNpemVkXHJcbiAgICAgICAgdGhpcy5zYXZlU2V0dGluZ3MoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGxheW91dCBwYW5lcyBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzcGxpdGJhckluZGV4XHJcbiAgICAgKiBAcGFyYW0geyp9IHByZXZQYW5lU2l6ZVxyXG4gICAgICogQHBhcmFtIHsqfSBuZXh0UGFuZVNpemVcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUxheW91dFBhbmVzT25TcGxpdHRlclJlc2l6ZShzcGxpdGJhckluZGV4LCBwcmV2UGFuZVNpemUsIG5leHRQYW5lU2l6ZSl7XHJcbiAgICAgICAgbGV0IHNwbGl0dGVyID0gdGhpcy5nZXRTcGxpdHRlcigpO1xyXG4gICAgICAgIGxldCBwcm9wZXJ0aWVzID0gdGhpcy5nZXRQcm9wZXJ0aWVzKHNwbGl0dGVyKTtcclxuXHJcbiAgICAgICAgaWYoIXRoaXMuX2lzUmVzcG9uc2l2ZSl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubGF5b3V0UGFuZXNbc3BsaXRiYXJJbmRleCArIDFdICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW3NwbGl0YmFySW5kZXggKyAxXS5wYW5lU2l6ZSA9IHRoaXMubGF5b3V0UGFuZXNbc3BsaXRiYXJJbmRleCArIDFdLnNpemU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5sYXlvdXRQYW5lc1tzcGxpdGJhckluZGV4KzFdLnNpemUgPSBuZXh0UGFuZVNpemU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0UHJvcGVydGllcyhzcGxpdHRlciwgcHJvcGVydGllcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IG9sZFNpemUgPSB0aGlzLmxheW91dFBhbmVzW3NwbGl0YmFySW5kZXhdLnNpemVcclxuICAgICAgICB0aGlzLmxheW91dFBhbmVzW3NwbGl0YmFySW5kZXhdLnNpemUgPSBwcmV2UGFuZVNpemU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoIXRoaXMuX2lzUmVzcG9uc2l2ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuX2FjdHVhbEhlaWdodCArPSAocHJldlBhbmVTaXplIC0gb2xkU2l6ZSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVzaXplU3BsaXR0ZXIodGhpcy5fYWN0dWFsV2lkdGgsIHRoaXMuX2FjdHVhbEhlaWdodC10aGlzLl9oZWFkZXJIZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvcnJlY3RzIHRoZSB0YXJnZXQgaW5kZXggaWYgc291cmNlIGluZGV4IGlzIGJlZm9yZSB0YXJnZXQgaW5kZXhcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNvdXJjZVBhbmVJbmRleFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRhcmdldFBhbmVJbmRleFxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0YVRhcmdldFBhbmVJbmRleChzb3VyY2VQYW5lSW5kZXg6IG51bWJlciwgdGFyZ2V0UGFuZUluZGV4OiBudW1iZXIpOiBudW1iZXJ7XHJcbiAgICAgICAgaWYoc291cmNlUGFuZUluZGV4IDwgdGFyZ2V0UGFuZUluZGV4KXtcclxuICAgICAgICAgICAgLy8gbW92ZWQgZWxlbWVudCBpcyBpbiBsaXN0IGJlZm9yZSB0YXJnZXQgcG9zaXRpb24gYW5kIHdhcyByZW1vdmVkIGJlZm9yZSwgc28gaW5kZXggbXVzdCBiZSBkZWNyZWFzZWQgdG8gZ2V0IGNvcnJlY3QgaW5zZXJ0IHBvc2l0aW9uXHJcbiAgICAgICAgICAgIHRhcmdldFBhbmVJbmRleC0tO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGFyZ2V0UGFuZUluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgcHJvcGVydGllcyBmcm9tIHRoZSBlalNwbGl0dGVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc3BsaXR0ZXJcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRQcm9wZXJ0aWVzKHNwbGl0dGVyKXtcclxuICAgICAgICByZXR1cm4gc3BsaXR0ZXIub3B0aW9uKFwicHJvcGVydGllc1wiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHByb3BlcnRpZXMgb2YgdGhlIGVqU3BsaXR0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzcGxpdHRlclxyXG4gICAgICogQHBhcmFtIHsqfSBwcm9wZXJ0aWVzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0UHJvcGVydGllcyhzcGxpdHRlciwgcHJvcGVydGllcyl7XHJcbiAgICAgICAgc3BsaXR0ZXIub3B0aW9uKFwicHJvcGVydGllc1wiLCBwcm9wZXJ0aWVzLCB0cnVlKTsgLy8gZm9yY2UgdGhlIHNldHRpbmcgdG8gcmVzaXplIHRoZSBjaGFydCBzcGxpdHRlcnNcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBwcm9wZXJ0aWVzID0+IG1vdmVzIHRoZSBwcm9wZXJ0eSBpbmZvcm1hdGlvbnMgZnJvbSBzb3VyY2UgdG8gdGFyZ2V0IGluZGV4XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gcHJvcGVydGllc1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNvdXJjZVBhbmVJbmRleFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRhcmdldFBhbmVJbmRleFxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlUHJvcGVydGllc0xpc3QocHJvcGVydGllcywgc291cmNlUGFuZUluZGV4OiBudW1iZXIsIHRhcmdldFBhbmVJbmRleDogbnVtYmVyKXtcclxuICAgICAgICBsZXQgcGFuZVByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzW3NvdXJjZVBhbmVJbmRleF07XHJcbiAgICAgICAgcHJvcGVydGllcy5zcGxpY2Uoc291cmNlUGFuZUluZGV4LCAxKTtcclxuICAgICAgICBwcm9wZXJ0aWVzLnNwbGljZSh0YXJnZXRQYW5lSW5kZXgsIDAsIHBhbmVQcm9wZXJ0aWVzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGxheW91dCBwYW5lcyBsaXN0IGFmdGVyIG1vdmluZ1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGxheW91dFBhbmVcclxuICAgICAqIEBwYXJhbSB7Kn0gc291cmNlUGFuZUluZGV4XHJcbiAgICAgKiBAcGFyYW0geyp9IHRhcmdldFBhbmVJbmRleFxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlTGF5b3V0UGFuZXNMaXN0QWZ0ZXJNb3ZpbmcobGF5b3V0UGFuZSwgc291cmNlUGFuZUluZGV4LCB0YXJnZXRQYW5lSW5kZXgpe1xyXG4gICAgICAgIHRoaXMubGF5b3V0UGFuZXMuc3BsaWNlKHNvdXJjZVBhbmVJbmRleCwgMSk7XHJcbiAgICAgICAgdGhpcy5sYXlvdXRQYW5lcy5zcGxpY2UodGFyZ2V0UGFuZUluZGV4LCAwLCBsYXlvdXRQYW5lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHBhbmUgaW5kZXggb2YgdGhlIGdpdmVuIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHdpZGdldFxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFBhbmVJbmRleCh3aWRnZXQpOiBudW1iZXJ7XHJcbiAgICAgICAgbGV0IHBhbmVJbmRleCA9IC0xO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sYXlvdXRQYW5lcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubGF5b3V0UGFuZXNbaV0ud2lkZ2V0ID09IHdpZGdldCl7XHJcbiAgICAgICAgICAgICAgICBwYW5lSW5kZXggPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwYW5lSW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIHRoZSB3aWRnZXQgZnJvbSB0aGUgd2lkZ2V0cyBsaXN0IG9mIHRoaXMgbGF5b3V0IHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHdpZGdldFxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVtb3ZlV2lkZ2V0RnJvbUxpc3Qod2lkZ2V0KXtcclxuICAgICAgICB0aGlzLl93aWRnZXRzLmZvckVhY2goKHdpZGdldFRlbXAsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICBpZih3aWRnZXRUZW1wID09IHdpZGdldCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl93aWRnZXRzLmRlbGV0ZShrZXkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkanVzdCBjaGFydHMgZGl2IGNvbnRhaW5lciA9PiByZW1vdmUgY2hhcnQgc2l6ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNpemVUb1JlbW92ZVxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRqdXN0Q2hhcnRzRGl2Q29udGFpbmVyU2l6ZShzaXplVG9SZW1vdmUpe1xyXG4gICAgICAgIHRoaXMubWFpbkRpdi5zdHlsZS5oZWlnaHQhID0gKHRoaXMubWFpbkRpdi5vZmZzZXRIZWlnaHQhIC0gc2l6ZVRvUmVtb3ZlIC0gNDAwICsgdGhpcy5fZGVmYXVsdFNwbGl0dGVyU2l6ZSkgKyBcInB4XCI7IC8vIFJlbW92ZSBwYW5lIHNpemUgKyBzcGxpdHRlciBzaXplKDlweClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICBBZGp1c3QgZWpTcGxpdHRlciBzaXplXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc3BsaXR0ZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gc2l6ZVRvUmVtb3ZlXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBuZXcgc3BsaXR0ZXIgc2l6ZSBhZnRlciByZW1vdmluZ1xyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRqdXN0U3BsaXR0ZXJTaXplKHNwbGl0dGVyLCBzaXplVG9SZW1vdmUpOiBudW1iZXJ7XHJcbiAgICAgICAgbGV0IGFjdHVhbFNwbGl0dGVySGVpZ2h0ID0gc3BsaXR0ZXIub3B0aW9uKFwiaGVpZ2h0XCIpO1xyXG4gICAgICAgIGxldCBuZXdTcGxpdHRlckhlaWdodCA9IHBhcnNlSW50KGFjdHVhbFNwbGl0dGVySGVpZ2h0LCAxMCk7IC8vIHBhcnNlSW50IHRvIHJlbW92ZSBcInB4XCJcclxuICAgICAgICBuZXdTcGxpdHRlckhlaWdodCAtPSBzaXplVG9SZW1vdmUgKyB0aGlzLl9kZWZhdWx0U3BsaXR0ZXJTaXplOyAvLyBSZW1vdmUgcGFuZSBzaXplICsgc3BsaXR0ZXIgc2l6ZSg5cHgpXHJcbiAgICAgICAgc3BsaXR0ZXIub3B0aW9uKFwiaGVpZ2h0XCIsIG5ld1NwbGl0dGVySGVpZ2h0LCB0cnVlKTsgLy8gVE9ETzogbm90IG9ubHkgaGVpZ2h0LCBhbHNvIHdpZHRoIFxyXG4gICAgICAgIHJldHVybiBuZXdTcGxpdHRlckhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE5vdGlmaWVzIHRoYXQgc3BsaXR0ZXIgaGFzIHJlc2l6ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uU3BsaXR0ZXJSZXNpemUoYXJncykge1xyXG4gICAgICAgIHRoaXMudXBkYXRlTGF5b3V0UGFuZXNPblNwbGl0dGVyUmVzaXplKGFyZ3Muc3BsaXRiYXJJbmRleCwgYXJncy5wcmV2UGFuZS5zaXplLCBhcmdzLm5leHRQYW5lLnNpemUpO1xyXG4gICAgICAgIHRoaXMucmVzaXplU3BsaXR0ZXJQYW5lQ29udGVudHModGhpcy5fYWN0dWFsV2lkdGgsIHRoaXMuX2FjdHVhbEhlaWdodC10aGlzLl9oZWFkZXJIZWlnaHQpXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGxpc3Qgd2l0aCBvbmx5IHRoZSBzaXplcyBvZiB0aGUgcGFuZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBwcm9wZXJ0aWVzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0UGFuZVNpemVzKHByb3BlcnRpZXMpOiBBcnJheTxzdHJpbmc+IHtcclxuICAgICAgICB2YXIgcGFuZVNpemVzID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuICAgICAgICBwcm9wZXJ0aWVzLmZvckVhY2gocHJvcGVydHkgPT4ge1xyXG4gICAgICAgICAgICBwYW5lU2l6ZXMucHVzaChwcm9wZXJ0eS5wYW5lU2l6ZSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHBhbmVTaXplcztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtTcGxpdHRlcldpZGdldH07Il19