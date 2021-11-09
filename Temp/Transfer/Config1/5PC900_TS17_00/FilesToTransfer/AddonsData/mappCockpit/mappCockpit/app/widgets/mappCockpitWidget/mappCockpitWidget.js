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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "../common/widgetBase", "../tabWidget/interfaces/tabWidgetInterface", "../common/viewTypeProvider", "../../framework/property", "../common/busyInformation", "../common/alertDialog", "../../common/persistence/persistDataController", "../../common/persistence/persistDataProvider", "./componentDefaultDefinition"], function (require, exports, widgetBase_1, tabWidgetInterface_1, viewTypeProvider_1, property_1, busyInformation_1, alertDialog_1, persistDataController_1, persistDataProvider_1, componentDefaultDefinition_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MappCockpitWidget = /** @class */ (function (_super) {
        __extends(MappCockpitWidget, _super);
        function MappCockpitWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._sideBarWidgetActivatedHandler = function (sender, args) { return _this.onContentActivated(sender, args); };
            _this._componentOverviewOpenViewHandler = function (sender, args) { return _this.onComponentOverviewWidgetOpenView(sender, args); };
            _this._traceOverviewOpenViewHandler = function (sender, args) { return _this.onTraceOverviewWidgetOpenView(sender, args); };
            _this._mainModelConnectionChangedHandler = function (sender, connected) { return _this.connectionChanged(sender, connected); };
            return _this;
        }
        /**
         * Creates the widget content and eventually subwidgets
         *
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.initialized = function () {
            var _this = this;
            _super.prototype.initialized.call(this);
            // create the start page
            this.createStartPageWidget();
            // connect the main data model
            this.dataModel = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.MappCockpitDataModelId);
            if (this.dataModel != undefined) {
                var mainDataModel = this.dataModel;
                var mainMappCockpitModel = mainDataModel.dataSource;
                // wait for successfull connection
                mainMappCockpitModel.eventModelConnectionChanged.attach(this._mainModelConnectionChangedHandler);
                // connect the main model
                mainMappCockpitModel.connect();
                this._mainNavigationWidget.selectTab("StartView", "Startpage", viewTypeProvider_1.ViewType.Overview);
                var persistDataController_2 = new persistDataController_1.PersistDataController(persistDataProvider_1.PersistDataProvider.getInstance());
                // Load data from storage for startup
                (function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, persistDataController_2.connect()];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, persistDataController_2.load()];
                            case 2:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); })();
            }
            else {
                console.error("mappCockpit datamodel not available!");
            }
        };
        MappCockpitWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        /**
         * Dispose this widget
         *
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.dispose = function () {
            if (this._mainNavigationWidget != undefined) {
                this._mainNavigationWidget.sideBarWidget.eventWidgetActivated.detach(this._sideBarWidgetActivatedHandler);
                this._mainNavigationWidget.dataModel.dispose();
                this._mainNavigationWidget.dispose();
            }
            if (this._traceOverviewWidget != undefined) {
                this._traceOverviewWidget.eventOpenView.detach(this._traceOverviewOpenViewHandler);
            }
            if (this._componentOverviewWidget != undefined) {
                this._componentOverviewWidget.eventOpenView.detach(this._componentOverviewOpenViewHandler);
            }
            var mainDataModel = this.dataModel;
            if (mainDataModel != undefined) {
                var mainMappCockpitModel = mainDataModel.dataSource;
                if (mainMappCockpitModel != undefined) {
                    mainMappCockpitModel.eventModelConnectionChanged.detach(this._mainModelConnectionChangedHandler);
                }
            }
            _super.prototype.dispose.call(this);
        };
        /**
         *
         *
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.createLayout = function () {
            this._mainNavigationWidget = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.MainNavigationWidgetId);
            if (this._mainNavigationWidget != undefined) {
                this._mainNavigationWidget.initialize();
                // add widget to the parent container
                this._mainNavigationWidget.addToParentContainer(this.mainDiv);
                this._mainNavigationWidget.dataModel = this.dataModel;
                this._mainNavigationWidget.sideBarWidget.eventWidgetActivated.attach(this._sideBarWidgetActivatedHandler);
            }
            this.resize(window.innerWidth, window.innerHeight);
            // Init AlertBox
            new alertDialog_1.AlertDialog();
        };
        /**
         *
         *
         * @param {number} width
         * @param {number} height
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.resize = function (width, height) {
            this._actualWidth = width;
            this._actualHeight = height;
            if (this._mainNavigationWidget != undefined) {
                this._mainNavigationWidget.resize(width, height);
            }
        };
        /**
         * Load the style informations for the widget
         *
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.loadStyles = function () {
            _super.prototype.addStyle.call(this, "widgets/mappCockpitWidget/style/css/commonStyleVariables.css");
            _super.prototype.addStyle.call(this, "widgets/mappCockpitWidget/style/css/commonStyle.css");
            _super.prototype.addStyle.call(this, "widgets/mappCockpitWidget/style/css/defaultScrollbarStyle.css");
            _super.prototype.addStyle.call(this, "widgets/mappCockpitWidget/style/css/commonToolbarStyle.css");
            _super.prototype.addStyle.call(this, "widgets/mappCockpitWidget/style/css/alertBoxStyle.css");
            _super.prototype.addStyle.call(this, "widgets/mappCockpitWidget/style/css/dragDropStyle.css");
        };
        /**
         *
         *
         * @private
         * @param {*} sender
         * @param {*} args
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.onContentActivated = function (sender, args) {
            args.widget.activate();
        };
        MappCockpitWidget.prototype.connectionChanged = function (sender, connected) {
            if (connected) {
                this.onMainModelConnected(sender);
            }
            else {
                this.onMainModelDisconnected();
            }
        };
        /**
         * Called after the main model has been connected
         *
         * @private
         * @param {MappCockpitComponentDataModel} mainMappCockpitModel
         * @returns
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.onMainModelConnected = function (mainMappCockpitModel) {
            console.log("MappCockpitWidget.onMainModelConnected()");
            try {
                this.changeUserToAnonymous();
                var loginWidget = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.LoginWidgetId);
                if (loginWidget != undefined) {
                    loginWidget.loginInterface = { commandChangeUser: mainMappCockpitModel.commandChangeUser };
                    this._mainNavigationWidget.sideBarWidget.addWidget(loginWidget, "loginWidget", viewTypeProvider_1.ViewType.User, viewTypeProvider_1.ViewTypeProvider.getInstance().getIconByViewType(viewTypeProvider_1.ViewType.User));
                }
                this.createContentWidgets();
            }
            catch (error) {
                console.error(error);
            }
            this._mainNavigationWidget.selectTab("StartView", "Startpage", viewTypeProvider_1.ViewType.Overview);
        };
        /**
         * Called after the main model has been disconnected
         *
         * @private
         * @returns {*}
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.onMainModelDisconnected = function () {
            console.log("MappCockpitWidget.onMainModelDisconnected()");
            this.setBusyInformation(new busyInformation_1.BusyInformation("Connection to server is lost!<br/>&nbsp;Refresh page to reconnect.", busyInformation_1.ImageId.disconnectedImage));
            this.setBusy(true);
        };
        /**
         * Creates the content widgets
         *
         * @private
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.createContentWidgets = function () {
            this.createComponentOverviewWidget();
            this.createTraceOverviewWidget();
            this.createToolsOverviewWidget();
            this.createDummyWidget();
        };
        /**
         * Add the start page widget
         *
         * @private
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.createStartPageWidget = function () {
            var startPageWidget = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.StartPageWidgetId);
            if (startPageWidget != undefined) {
                this._mainNavigationWidget.addSideBarTab("StartView", "widgets/mappCockpitWidget/style/images/Areas/StartPageArea.svg");
                this._mainNavigationWidget.addWidget(startPageWidget, "Startpage", viewTypeProvider_1.ViewType.Overview, { parent: "StartView", widgetPosition: tabWidgetInterface_1.TabWidgetWidgetPositons.left });
            }
        };
        MappCockpitWidget.prototype.createDummyWidget = function () {
            var dummyWidget = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.DummyWidgetId);
            if (dummyWidget != undefined) {
                this._mainNavigationWidget.addSideBarTab("DummyView", "widgets/mappCockpitWidget/style/images/Areas/ToolsArea.svg");
                this._mainNavigationWidget.addWidget(dummyWidget, "DummyWidget", viewTypeProvider_1.ViewType.Overview, { parent: "DummyView", widgetPosition: tabWidgetInterface_1.TabWidgetWidgetPositons.left });
            }
        };
        /**
         * Add the tools overview widget
         *
         * @private
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.createToolsOverviewWidget = function () {
            var _this = this;
            var toolsOverviewWidget = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.ToolsOverviewWidgetId);
            if (toolsOverviewWidget != undefined) {
                this._mainNavigationWidget.addSideBarTab("ToolsView", "widgets/mappCockpitWidget/style/images/Areas/ToolsArea.svg");
                // read the available components
                if (this.dataModel.dataSource.components != undefined &&
                    this.dataModel.dataSource.components.length > 0) {
                    if (toolsOverviewWidget != undefined) {
                        this.createToolsOverviewContent(this.dataModel.dataSource.components, toolsOverviewWidget);
                    }
                }
                else {
                    this.dataModel.dataSource.componentsSource.read(function (components) {
                        if (toolsOverviewWidget != undefined) {
                            _this.createToolsOverviewContent(components, toolsOverviewWidget);
                        }
                    });
                }
            }
        };
        /**
         * Creates the content of the tools widget
         *
         * @private
         * @param {MappCockpitComponent[]} components
         * @param {Widgets.IComponentOverviewWidget} toolsOverviewWidget
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.createToolsOverviewContent = function (components, toolsOverviewWidget) {
            // create and initialize components link
            var componentsLink = property_1.Property.create([]);
            componentsLink.value = components;
            toolsOverviewWidget.components = componentsLink;
            // add overview widget
            this._mainNavigationWidget.addWidget(toolsOverviewWidget, "ToolsOverview", viewTypeProvider_1.ViewType.Overview, { parent: "ToolsView", widgetPosition: tabWidgetInterface_1.TabWidgetWidgetPositons.left });
        };
        /**
         * Add the component overview widget
         *
         * @private
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.createComponentOverviewWidget = function () {
            var _this = this;
            this._componentOverviewWidget = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.ComponentOverviewWidgetId);
            if (this._componentOverviewWidget != undefined) {
                this._mainNavigationWidget.addSideBarTab("ComponentsView", "widgets/mappCockpitWidget/style/images/Areas/ComponentArea.svg");
                // read the available user components
                this.dataModel.dataSource.userComponentsSource.read(function (userComponents) {
                    _this.createComponentOverviewContent(userComponents);
                });
            }
        };
        /**
         * Creates the content of the overview widget
         *
         * @private
         * @param {MappCockpitComponent[]} userComponents
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.createComponentOverviewContent = function (userComponents) {
            // create and initialize components link
            var componentsLink = property_1.Property.create([]);
            componentsLink.value = userComponents;
            if (this._componentOverviewWidget != undefined) {
                this._componentOverviewWidget.components = componentsLink;
                // add overview widget
                this._mainNavigationWidget.addWidget(this._componentOverviewWidget, "ComponentOverview", viewTypeProvider_1.ViewType.Overview, { parent: "ComponentsView", widgetPosition: tabWidgetInterface_1.TabWidgetWidgetPositons.left });
                this._componentOverviewWidget.eventOpenView.attach(this._componentOverviewOpenViewHandler);
            }
        };
        /**
         *
         *
         * @private
         * @param {*} sender
         * @param {EventOpenViewArgs} args
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.onComponentOverviewWidgetOpenView = function (sender, args) {
            this._mainNavigationWidget.addView("ComponentsView", args.component, args.viewType, true);
        };
        /**
         * Changes the user to anonymous
         *
         * @private
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.changeUserToAnonymous = function () {
            var mainDataModel = this.dataModel;
            var userInfo = { username: "Anonymous", password: "" };
            mainDataModel.dataSource.commandChangeUser.execute(userInfo, function (userRoles) {
                console.log("%o Logged in with roles: %o", userInfo.username, userRoles);
            }, function (error) {
                console.error("Could not log in: %o %o", userInfo.username, error);
            });
        };
        /**
         * creates the traceview widget
         *
         * @private
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.createTraceOverviewWidget = function () {
            var _this = this;
            this._traceOverviewWidget = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.TraceOverviewWidgetId);
            if (this._traceOverviewWidget != undefined) {
                this._mainNavigationWidget.addSideBarTab("TraceView", "widgets/mappCockpitWidget/style/images/Areas/TraceArea.svg");
                // initialize the trace provider
                this.dataModel.dataSource.traceProvider.initialize().then(function () {
                    var traceComponents = _this.dataModel.dataSource.traceProvider.traceComponents;
                    var traceComponentsLink = property_1.Property.create([]);
                    traceComponentsLink.value = traceComponents;
                    if (_this._traceOverviewWidget != undefined) {
                        _this._traceOverviewWidget.components = traceComponentsLink;
                        _this._mainNavigationWidget.addWidget(_this._traceOverviewWidget, "TraceOverview", viewTypeProvider_1.ViewType.Overview, { parent: "TraceView", widgetPosition: tabWidgetInterface_1.TabWidgetWidgetPositons.left });
                        _this._traceOverviewWidget.eventOpenView.attach(_this._traceOverviewOpenViewHandler);
                    }
                });
            }
        };
        /**
         *
         *
         * @private
         * @param {*} sender
         * @param {EventOpenViewArgs} args
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.onTraceOverviewWidgetOpenView = function (sender, args) {
            this._mainNavigationWidget.addView("TraceView", args.component, args.viewType, true);
        };
        return MappCockpitWidget;
    }(widgetBase_1.WidgetBase));
    exports.MappCockpitWidget = MappCockpitWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRXaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvbWFwcENvY2twaXRXaWRnZXQvbWFwcENvY2twaXRXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQW9CQTtRQUFnQyxxQ0FBVTtRQUExQztZQUFBLHFFQTBYQztZQXBYVyxvQ0FBOEIsR0FBRyxVQUFDLE1BQU0sRUFBQyxJQUFJLElBQUcsT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxFQUFwQyxDQUFvQyxDQUFDO1lBQ3JGLHVDQUFpQyxHQUFHLFVBQUMsTUFBTSxFQUFFLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQXBELENBQW9ELENBQUE7WUFDMUcsbUNBQTZCLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLDZCQUE2QixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBL0MsQ0FBK0MsQ0FBQztZQUVqRyx3Q0FBa0MsR0FBRyxVQUFDLE1BQU0sRUFBQyxTQUFTLElBQUssT0FBQSxLQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxFQUF6QyxDQUF5QyxDQUFDOztRQWdYakgsQ0FBQztRQTlXRzs7OztXQUlHO1FBQ0gsdUNBQVcsR0FBWDtZQUFBLGlCQStCQztZQTlCRyxpQkFBTSxXQUFXLFdBQUUsQ0FBQztZQUVwQix3QkFBd0I7WUFDeEIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFFN0IsOEJBQThCO1lBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsdURBQTBCLENBQUMsc0JBQXNCLENB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b0IsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO3FCQUN0RjtnQkFDTCxDQUFDLENBQUMsQ0FBQzthQUNOO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSyx5REFBNkIsR0FBckMsVUFBc0MsTUFBTSxFQUFFLElBQXVCO1lBQ2pFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUN4RixDQUFDO1FBQ0wsd0JBQUM7SUFBRCxDQUFDLEFBMVhELENBQWdDLHVCQUFVLEdBMFh6QztJQUVRLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3dpZGdldEJhc2VcIjtcclxuXHJcbmltcG9ydCAqIGFzIERhdGFNb2RlbHMgZnJvbSAnLi4vLi4vbW9kZWxzL2RhdGFNb2RlbHMnO1xyXG5pbXBvcnQgeyBJTWFwcENvY2twaXRXaWRnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL21hcHBDb2NrcGl0V2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRhYldpZGdldFdpZGdldFBvc2l0b25zIH0gZnJvbSBcIi4uL3RhYldpZGdldC9pbnRlcmZhY2VzL3RhYldpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBFdmVudE9wZW5WaWV3QXJncyB9IGZyb20gXCIuLi9jb21tb24vZXZlbnRPcGVuVmlld0FyZ3NcIjtcclxuaW1wb3J0IHsgVmlld1R5cGUsIFZpZXdUeXBlUHJvdmlkZXIgfSBmcm9tIFwiLi4vY29tbW9uL3ZpZXdUeXBlUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgUHJvcGVydHkgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3Byb3BlcnR5XCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRUcmFjZUNvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvbWFwcENvY2twaXRUcmFjZUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvb25saW5lL2NvbXBvbmVudHNEYXRhTW9kZWxcIjtcclxuaW1wb3J0IHsgQnVzeUluZm9ybWF0aW9uLCBJbWFnZUlkIH0gZnJvbSBcIi4uL2NvbW1vbi9idXN5SW5mb3JtYXRpb25cIjtcclxuaW1wb3J0IHsgQWxlcnREaWFsb2cgfSBmcm9tIFwiLi4vY29tbW9uL2FsZXJ0RGlhbG9nXCI7XHJcbmltcG9ydCB7IFBlcnNpc3REYXRhQ29udHJvbGxlciB9IGZyb20gXCIuLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvcGVyc2lzdERhdGFDb250cm9sbGVyXCI7XHJcbmltcG9ydCB7IFBlcnNpc3REYXRhUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL3BlcnNpc3REYXRhUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgSUxvZ2luV2lkZ2V0LCBJQ29tcG9uZW50T3ZlcnZpZXdXaWRnZXQsIElNYWluTmF2aWdhdGlvbldpZGdldCwgSVRyYWNlT3ZlcnZpZXdXaWRnZXQsIElUb29sc092ZXJ2aWV3V2lkZ2V0IH0gZnJvbSBcIi4uLy4uL3dpZGdldHMvd2lkZ2V0c1wiO1xyXG5pbXBvcnQgeyBJV2lkZ2V0IH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3dpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiB9IGZyb20gXCIuL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXCI7XHJcblxyXG5cclxuY2xhc3MgTWFwcENvY2twaXRXaWRnZXQgZXh0ZW5kcyBXaWRnZXRCYXNlIGltcGxlbWVudHMgSU1hcHBDb2NrcGl0V2lkZ2V0e1xyXG5cclxuICAgIHByaXZhdGUgX21haW5OYXZpZ2F0aW9uV2lkZ2V0ISA6IElNYWluTmF2aWdhdGlvbldpZGdldDtcclxuICAgIHByaXZhdGUgX3RyYWNlT3ZlcnZpZXdXaWRnZXQ6IElUcmFjZU92ZXJ2aWV3V2lkZ2V0fHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX2NvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0OiBJQ29tcG9uZW50T3ZlcnZpZXdXaWRnZXR8dW5kZWZpbmVkO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF9zaWRlQmFyV2lkZ2V0QWN0aXZhdGVkSGFuZGxlciA9IChzZW5kZXIsYXJncyk9PnRoaXMub25Db250ZW50QWN0aXZhdGVkKHNlbmRlcixhcmdzKTtcclxuICAgIHByaXZhdGUgX2NvbXBvbmVudE92ZXJ2aWV3T3BlblZpZXdIYW5kbGVyID0gKHNlbmRlciwgYXJncykgPT4gdGhpcy5vbkNvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0T3BlblZpZXcoc2VuZGVyLCBhcmdzKVxyXG4gICAgcHJpdmF0ZSBfdHJhY2VPdmVydmlld09wZW5WaWV3SGFuZGxlciA9IChzZW5kZXIsYXJncykgPT4gdGhpcy5vblRyYWNlT3ZlcnZpZXdXaWRnZXRPcGVuVmlldyhzZW5kZXIsYXJncyk7XHJcbiAgICBcclxuICAgIHByaXZhdGUgX21haW5Nb2RlbENvbm5lY3Rpb25DaGFuZ2VkSGFuZGxlciA9IChzZW5kZXIsY29ubmVjdGVkKSA9PiB0aGlzLmNvbm5lY3Rpb25DaGFuZ2VkKHNlbmRlciwgY29ubmVjdGVkKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIHdpZGdldCBjb250ZW50IGFuZCBldmVudHVhbGx5IHN1YndpZGdldHNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRXaWRnZXRcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZWQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZWQoKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBjcmVhdGUgdGhlIHN0YXJ0IHBhZ2VcclxuICAgICAgICB0aGlzLmNyZWF0ZVN0YXJ0UGFnZVdpZGdldCgpO1xyXG5cclxuICAgICAgICAvLyBjb25uZWN0IHRoZSBtYWluIGRhdGEgbW9kZWxcclxuICAgICAgICB0aGlzLmRhdGFNb2RlbCA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5NYXBwQ29ja3BpdERhdGFNb2RlbElkKSBhcyBEYXRhTW9kZWxzLklNYXBwQ29ja3BpdERhdGFNb2RlbDtcclxuICAgICAgICBpZih0aGlzLmRhdGFNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgbWFpbkRhdGFNb2RlbCA9IHRoaXMuZGF0YU1vZGVsO1xyXG4gICAgICAgICAgICBsZXQgbWFpbk1hcHBDb2NrcGl0TW9kZWwgPSBtYWluRGF0YU1vZGVsLmRhdGFTb3VyY2U7XHJcblxyXG4gICAgICAgICAgICAvLyB3YWl0IGZvciBzdWNjZXNzZnVsbCBjb25uZWN0aW9uXHJcbiAgICAgICAgICAgIG1haW5NYXBwQ29ja3BpdE1vZGVsLmV2ZW50TW9kZWxDb25uZWN0aW9uQ2hhbmdlZC5hdHRhY2godGhpcy5fbWFpbk1vZGVsQ29ubmVjdGlvbkNoYW5nZWRIYW5kbGVyKVxyXG5cclxuICAgICAgICAgICAgLy8gY29ubmVjdCB0aGUgbWFpbiBtb2RlbFxyXG4gICAgICAgICAgICBtYWluTWFwcENvY2twaXRNb2RlbC5jb25uZWN0KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5zZWxlY3RUYWIoXCJTdGFydFZpZXdcIixcIlN0YXJ0cGFnZVwiLCBWaWV3VHlwZS5PdmVydmlldyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcGVyc2lzdERhdGFDb250cm9sbGVyID0gbmV3IFBlcnNpc3REYXRhQ29udHJvbGxlcihQZXJzaXN0RGF0YVByb3ZpZGVyLmdldEluc3RhbmNlKCkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gTG9hZCBkYXRhIGZyb20gc3RvcmFnZSBmb3Igc3RhcnR1cFxyXG4gICAgICAgICAgICAoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgcGVyc2lzdERhdGFDb250cm9sbGVyLmNvbm5lY3QoKTsgXHJcbiAgICAgICAgICAgICAgICBhd2FpdCBwZXJzaXN0RGF0YUNvbnRyb2xsZXIubG9hZCgpO1xyXG4gICAgICAgICAgICB9KSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwibWFwcENvY2twaXQgZGF0YW1vZGVsIG5vdCBhdmFpbGFibGUhXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0RGVmYXVsdERlZmluaXRpb24obmV3IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uKCkpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwb3NlIHRoaXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKSB7ICAgICAgICBcclxuICAgICAgICBpZih0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5zaWRlQmFyV2lkZ2V0LmV2ZW50V2lkZ2V0QWN0aXZhdGVkLmRldGFjaCh0aGlzLl9zaWRlQmFyV2lkZ2V0QWN0aXZhdGVkSGFuZGxlcik7XHJcbiAgICAgICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmRhdGFNb2RlbC5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmRpc3Bvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5fdHJhY2VPdmVydmlld1dpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl90cmFjZU92ZXJ2aWV3V2lkZ2V0LmV2ZW50T3BlblZpZXcuZGV0YWNoKHRoaXMuX3RyYWNlT3ZlcnZpZXdPcGVuVmlld0hhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLl9jb21wb25lbnRPdmVydmlld1dpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRPdmVydmlld1dpZGdldC5ldmVudE9wZW5WaWV3LmRldGFjaCh0aGlzLl9jb21wb25lbnRPdmVydmlld09wZW5WaWV3SGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbWFpbkRhdGFNb2RlbCA9ICg8RGF0YU1vZGVscy5JTWFwcENvY2twaXREYXRhTW9kZWw+dGhpcy5kYXRhTW9kZWwpO1xyXG4gICAgICAgIGlmKG1haW5EYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IG1haW5NYXBwQ29ja3BpdE1vZGVsID0gbWFpbkRhdGFNb2RlbC5kYXRhU291cmNlO1xyXG4gICAgICAgICAgICBpZihtYWluTWFwcENvY2twaXRNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgbWFpbk1hcHBDb2NrcGl0TW9kZWwuZXZlbnRNb2RlbENvbm5lY3Rpb25DaGFuZ2VkLmRldGFjaCh0aGlzLl9tYWluTW9kZWxDb25uZWN0aW9uQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZUxheW91dCgpIHtcclxuICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldCA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5NYWluTmF2aWdhdGlvbldpZGdldElkKSBhcyBJTWFpbk5hdmlnYXRpb25XaWRnZXQ7XHJcbiAgICAgICAgaWYodGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQuaW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgICAgICAvLyBhZGQgd2lkZ2V0IHRvIHRoZSBwYXJlbnQgY29udGFpbmVyXHJcbiAgICAgICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmFkZFRvUGFyZW50Q29udGFpbmVyKHRoaXMubWFpbkRpdik7XHJcbiAgICAgICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmRhdGFNb2RlbCA9ICg8RGF0YU1vZGVscy5JTWFwcENvY2twaXREYXRhTW9kZWw+dGhpcy5kYXRhTW9kZWwpO1xyXG4gICAgICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5zaWRlQmFyV2lkZ2V0LmV2ZW50V2lkZ2V0QWN0aXZhdGVkLmF0dGFjaCh0aGlzLl9zaWRlQmFyV2lkZ2V0QWN0aXZhdGVkSGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVzaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xyXG5cclxuICAgICAgICAvLyBJbml0IEFsZXJ0Qm94XHJcbiAgICAgICAgbmV3IEFsZXJ0RGlhbG9nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5fYWN0dWFsV2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLl9hY3R1YWxIZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgaWYodGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQhLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkIHRoZSBzdHlsZSBpbmZvcm1hdGlvbnMgZm9yIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRXaWRnZXRcclxuICAgICAqL1xyXG4gICAgbG9hZFN0eWxlcygpe1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9tYXBwQ29ja3BpdFdpZGdldC9zdHlsZS9jc3MvY29tbW9uU3R5bGVWYXJpYWJsZXMuY3NzXCIpO1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9tYXBwQ29ja3BpdFdpZGdldC9zdHlsZS9jc3MvY29tbW9uU3R5bGUuY3NzXCIpO1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9tYXBwQ29ja3BpdFdpZGdldC9zdHlsZS9jc3MvZGVmYXVsdFNjcm9sbGJhclN0eWxlLmNzc1wiKTtcclxuICAgICAgICBzdXBlci5hZGRTdHlsZShcIndpZGdldHMvbWFwcENvY2twaXRXaWRnZXQvc3R5bGUvY3NzL2NvbW1vblRvb2xiYXJTdHlsZS5jc3NcIik7XHJcbiAgICAgICAgc3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL21hcHBDb2NrcGl0V2lkZ2V0L3N0eWxlL2Nzcy9hbGVydEJveFN0eWxlLmNzc1wiKTtcclxuICAgICAgICBzdXBlci5hZGRTdHlsZShcIndpZGdldHMvbWFwcENvY2twaXRXaWRnZXQvc3R5bGUvY3NzL2RyYWdEcm9wU3R5bGUuY3NzXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25Db250ZW50QWN0aXZhdGVkKHNlbmRlciwgYXJncykge1xyXG4gICAgICAgIGFyZ3Mud2lkZ2V0LmFjdGl2YXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb25uZWN0aW9uQ2hhbmdlZChzZW5kZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsLCBjb25uZWN0ZWQ6IGJvb2xlYW4pe1xyXG4gICAgICAgIGlmIChjb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5vbk1haW5Nb2RlbENvbm5lY3RlZChzZW5kZXIpOyAgICAgXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMub25NYWluTW9kZWxEaXNjb25uZWN0ZWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgYWZ0ZXIgdGhlIG1haW4gbW9kZWwgaGFzIGJlZW4gY29ubmVjdGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWx9IG1haW5NYXBwQ29ja3BpdE1vZGVsXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25NYWluTW9kZWxDb25uZWN0ZWQobWFpbk1hcHBDb2NrcGl0TW9kZWw6IE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNYXBwQ29ja3BpdFdpZGdldC5vbk1haW5Nb2RlbENvbm5lY3RlZCgpXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVXNlclRvQW5vbnltb3VzKCk7XHJcbiAgICAgICAgICAgIGxldCBsb2dpbldpZGdldCA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5Mb2dpbldpZGdldElkKSBhcyBJTG9naW5XaWRnZXQ7XHJcbiAgICAgICAgICAgIGlmKGxvZ2luV2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBsb2dpbldpZGdldC5sb2dpbkludGVyZmFjZSA9IHsgY29tbWFuZENoYW5nZVVzZXI6IG1haW5NYXBwQ29ja3BpdE1vZGVsLmNvbW1hbmRDaGFuZ2VVc2VyIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5zaWRlQmFyV2lkZ2V0LmFkZFdpZGdldChsb2dpbldpZGdldCwgXCJsb2dpbldpZGdldFwiLCBWaWV3VHlwZS5Vc2VyLCBWaWV3VHlwZVByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0SWNvbkJ5Vmlld1R5cGUoVmlld1R5cGUuVXNlcikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQ29udGVudFdpZGdldHMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5zZWxlY3RUYWIoXCJTdGFydFZpZXdcIiwgXCJTdGFydHBhZ2VcIiwgVmlld1R5cGUuT3ZlcnZpZXcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIGFmdGVyIHRoZSBtYWluIG1vZGVsIGhhcyBiZWVuIGRpc2Nvbm5lY3RlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uTWFpbk1vZGVsRGlzY29ubmVjdGVkKCk6IGFueSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNYXBwQ29ja3BpdFdpZGdldC5vbk1haW5Nb2RlbERpc2Nvbm5lY3RlZCgpXCIpO1xyXG4gICAgICAgIHRoaXMuc2V0QnVzeUluZm9ybWF0aW9uKG5ldyBCdXN5SW5mb3JtYXRpb24oXCJDb25uZWN0aW9uIHRvIHNlcnZlciBpcyBsb3N0ITxici8+Jm5ic3A7UmVmcmVzaCBwYWdlIHRvIHJlY29ubmVjdC5cIiwgSW1hZ2VJZC5kaXNjb25uZWN0ZWRJbWFnZSkpO1xyXG4gICAgICAgIHRoaXMuc2V0QnVzeSh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGNvbnRlbnQgd2lkZ2V0c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVDb250ZW50V2lkZ2V0cygpIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZUNvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0KCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVUcmFjZU92ZXJ2aWV3V2lkZ2V0KCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVUb29sc092ZXJ2aWV3V2lkZ2V0KCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVEdW1teVdpZGdldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIHRoZSBzdGFydCBwYWdlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVTdGFydFBhZ2VXaWRnZXQoKXtcclxuICAgICAgICBsZXQgc3RhcnRQYWdlV2lkZ2V0ID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLlN0YXJ0UGFnZVdpZGdldElkKSBhcyBJV2lkZ2V0O1xyXG4gICAgICAgIGlmKHN0YXJ0UGFnZVdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5hZGRTaWRlQmFyVGFiKFwiU3RhcnRWaWV3XCIsIFwid2lkZ2V0cy9tYXBwQ29ja3BpdFdpZGdldC9zdHlsZS9pbWFnZXMvQXJlYXMvU3RhcnRQYWdlQXJlYS5zdmdcIik7XHJcbiAgICAgICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmFkZFdpZGdldChzdGFydFBhZ2VXaWRnZXQsIFwiU3RhcnRwYWdlXCIsIFZpZXdUeXBlLk92ZXJ2aWV3LCB7cGFyZW50OiBcIlN0YXJ0Vmlld1wiLCB3aWRnZXRQb3NpdGlvbjogVGFiV2lkZ2V0V2lkZ2V0UG9zaXRvbnMubGVmdH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZUR1bW15V2lkZ2V0KCl7XHJcbiAgICAgICAgbGV0IGR1bW15V2lkZ2V0ID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLkR1bW15V2lkZ2V0SWQpIGFzIElXaWRnZXQ7XHJcbiAgICAgICAgaWYoZHVtbXlXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQuYWRkU2lkZUJhclRhYihcIkR1bW15Vmlld1wiLCBcIndpZGdldHMvbWFwcENvY2twaXRXaWRnZXQvc3R5bGUvaW1hZ2VzL0FyZWFzL1Rvb2xzQXJlYS5zdmdcIik7XHJcbiAgICAgICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmFkZFdpZGdldChkdW1teVdpZGdldCwgXCJEdW1teVdpZGdldFwiLCBWaWV3VHlwZS5PdmVydmlldywge3BhcmVudDogXCJEdW1teVZpZXdcIiwgd2lkZ2V0UG9zaXRpb246IFRhYldpZGdldFdpZGdldFBvc2l0b25zLmxlZnR9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgdGhlIHRvb2xzIG92ZXJ2aWV3IHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVUb29sc092ZXJ2aWV3V2lkZ2V0KCl7XHJcbiAgICAgICAgbGV0IHRvb2xzT3ZlcnZpZXdXaWRnZXQgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uVG9vbHNPdmVydmlld1dpZGdldElkKSBhcyBJVG9vbHNPdmVydmlld1dpZGdldDtcclxuICAgICAgICBpZih0b29sc092ZXJ2aWV3V2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmFkZFNpZGVCYXJUYWIoXCJUb29sc1ZpZXdcIiwgXCJ3aWRnZXRzL21hcHBDb2NrcGl0V2lkZ2V0L3N0eWxlL2ltYWdlcy9BcmVhcy9Ub29sc0FyZWEuc3ZnXCIpO1xyXG4gICAgICAgICAgICAvLyByZWFkIHRoZSBhdmFpbGFibGUgY29tcG9uZW50c1xyXG4gICAgICAgICAgICBpZigoPERhdGFNb2RlbHMuSU1hcHBDb2NrcGl0RGF0YU1vZGVsPnRoaXMuZGF0YU1vZGVsKS5kYXRhU291cmNlLmNvbXBvbmVudHMgIT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgICAgICAgICAoPERhdGFNb2RlbHMuSU1hcHBDb2NrcGl0RGF0YU1vZGVsPnRoaXMuZGF0YU1vZGVsKS5kYXRhU291cmNlLmNvbXBvbmVudHMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodG9vbHNPdmVydmlld1dpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVRvb2xzT3ZlcnZpZXdDb250ZW50KCg8RGF0YU1vZGVscy5JTWFwcENvY2twaXREYXRhTW9kZWw+dGhpcy5kYXRhTW9kZWwpLmRhdGFTb3VyY2UuY29tcG9uZW50cywgdG9vbHNPdmVydmlld1dpZGdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAoPERhdGFNb2RlbHMuSU1hcHBDb2NrcGl0RGF0YU1vZGVsPnRoaXMuZGF0YU1vZGVsKS5kYXRhU291cmNlLmNvbXBvbmVudHNTb3VyY2UucmVhZCgoY29tcG9uZW50cyk9PntcclxuICAgICAgICAgICAgICAgICAgICBpZih0b29sc092ZXJ2aWV3V2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlVG9vbHNPdmVydmlld0NvbnRlbnQoY29tcG9uZW50cywgdG9vbHNPdmVydmlld1dpZGdldCk7ICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGNvbnRlbnQgb2YgdGhlIHRvb2xzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50W119IGNvbXBvbmVudHNcclxuICAgICAqIEBwYXJhbSB7V2lkZ2V0cy5JQ29tcG9uZW50T3ZlcnZpZXdXaWRnZXR9IHRvb2xzT3ZlcnZpZXdXaWRnZXRcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZVRvb2xzT3ZlcnZpZXdDb250ZW50KGNvbXBvbmVudHM6IE1hcHBDb2NrcGl0Q29tcG9uZW50W10sIHRvb2xzT3ZlcnZpZXdXaWRnZXQ6IElUb29sc092ZXJ2aWV3V2lkZ2V0KSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY3JlYXRlIGFuZCBpbml0aWFsaXplIGNvbXBvbmVudHMgbGlua1xyXG4gICAgICAgIGxldCBjb21wb25lbnRzTGluazogUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnQ+PiA9IFByb3BlcnR5LmNyZWF0ZTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudD4+KFtdKTtcclxuICAgICAgICBjb21wb25lbnRzTGluay52YWx1ZSA9IGNvbXBvbmVudHM7XHJcbiAgICAgICAgdG9vbHNPdmVydmlld1dpZGdldC5jb21wb25lbnRzID0gY29tcG9uZW50c0xpbms7XHJcblxyXG4gICAgICAgIC8vIGFkZCBvdmVydmlldyB3aWRnZXRcclxuICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5hZGRXaWRnZXQodG9vbHNPdmVydmlld1dpZGdldCwgXCJUb29sc092ZXJ2aWV3XCIsIFZpZXdUeXBlLk92ZXJ2aWV3LCB7cGFyZW50OiBcIlRvb2xzVmlld1wiLCB3aWRnZXRQb3NpdGlvbjogVGFiV2lkZ2V0V2lkZ2V0UG9zaXRvbnMubGVmdH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIHRoZSBjb21wb25lbnQgb3ZlcnZpZXcgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZUNvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0KCkge1xyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0ID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLkNvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0SWQpIGFzIElDb21wb25lbnRPdmVydmlld1dpZGdldDtcclxuICAgICAgICBpZih0aGlzLl9jb21wb25lbnRPdmVydmlld1dpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5hZGRTaWRlQmFyVGFiKFwiQ29tcG9uZW50c1ZpZXdcIiwgXCJ3aWRnZXRzL21hcHBDb2NrcGl0V2lkZ2V0L3N0eWxlL2ltYWdlcy9BcmVhcy9Db21wb25lbnRBcmVhLnN2Z1wiKTtcclxuICAgICAgICAgICAgLy8gcmVhZCB0aGUgYXZhaWxhYmxlIHVzZXIgY29tcG9uZW50c1xyXG4gICAgICAgICAgICAoPERhdGFNb2RlbHMuSU1hcHBDb2NrcGl0RGF0YU1vZGVsPnRoaXMuZGF0YU1vZGVsKS5kYXRhU291cmNlLnVzZXJDb21wb25lbnRzU291cmNlLnJlYWQoKHVzZXJDb21wb25lbnRzKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVDb21wb25lbnRPdmVydmlld0NvbnRlbnQodXNlckNvbXBvbmVudHMpOyAgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBjb250ZW50IG9mIHRoZSBvdmVydmlldyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFtdfSB1c2VyQ29tcG9uZW50c1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlQ29tcG9uZW50T3ZlcnZpZXdDb250ZW50KHVzZXJDb21wb25lbnRzOiBNYXBwQ29ja3BpdENvbXBvbmVudFtdKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY3JlYXRlIGFuZCBpbml0aWFsaXplIGNvbXBvbmVudHMgbGlua1xyXG4gICAgICAgIGxldCBjb21wb25lbnRzTGluazogUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnQ+PiA9IFByb3BlcnR5LmNyZWF0ZTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudD4+KFtdKTtcclxuICAgICAgICBjb21wb25lbnRzTGluay52YWx1ZSA9IHVzZXJDb21wb25lbnRzO1xyXG4gICAgICAgIGlmKCB0aGlzLl9jb21wb25lbnRPdmVydmlld1dpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRPdmVydmlld1dpZGdldC5jb21wb25lbnRzID0gY29tcG9uZW50c0xpbms7XHJcblxyXG4gICAgICAgICAgICAvLyBhZGQgb3ZlcnZpZXcgd2lkZ2V0XHJcbiAgICAgICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmFkZFdpZGdldCh0aGlzLl9jb21wb25lbnRPdmVydmlld1dpZGdldCwgXCJDb21wb25lbnRPdmVydmlld1wiLCBWaWV3VHlwZS5PdmVydmlldywgeyBwYXJlbnQ6IFwiQ29tcG9uZW50c1ZpZXdcIiwgd2lkZ2V0UG9zaXRpb246IFRhYldpZGdldFdpZGdldFBvc2l0b25zLmxlZnQgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0LmV2ZW50T3BlblZpZXcuYXR0YWNoKHRoaXMuX2NvbXBvbmVudE92ZXJ2aWV3T3BlblZpZXdIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtFdmVudE9wZW5WaWV3QXJnc30gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25Db21wb25lbnRPdmVydmlld1dpZGdldE9wZW5WaWV3KHNlbmRlciwgYXJnczogRXZlbnRPcGVuVmlld0FyZ3Mpe1xyXG5cclxuICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5hZGRWaWV3KFwiQ29tcG9uZW50c1ZpZXdcIiAsIGFyZ3MuY29tcG9uZW50LCBhcmdzLnZpZXdUeXBlLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoYW5nZXMgdGhlIHVzZXIgdG8gYW5vbnltb3VzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNoYW5nZVVzZXJUb0Fub255bW91cygpIHtcclxuICAgICAgICBsZXQgbWFpbkRhdGFNb2RlbCA9ICg8RGF0YU1vZGVscy5JTWFwcENvY2twaXREYXRhTW9kZWw+dGhpcy5kYXRhTW9kZWwpO1xyXG4gICAgICAgIGxldCB1c2VySW5mbyA9IHsgdXNlcm5hbWU6IFwiQW5vbnltb3VzXCIsIHBhc3N3b3JkOiBcIlwiIH07XHJcbiAgICAgICAgbWFpbkRhdGFNb2RlbC5kYXRhU291cmNlLmNvbW1hbmRDaGFuZ2VVc2VyLmV4ZWN1dGUodXNlckluZm8sICh1c2VyUm9sZXMpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCIlbyBMb2dnZWQgaW4gd2l0aCByb2xlczogJW9cIix1c2VySW5mby51c2VybmFtZSwgdXNlclJvbGVzKTtcclxuICAgICAgICB9LChlcnJvcik9PntcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNvdWxkIG5vdCBsb2cgaW46ICVvICVvXCIsIHVzZXJJbmZvLnVzZXJuYW1lLCBlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGVzIHRoZSB0cmFjZXZpZXcgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZVRyYWNlT3ZlcnZpZXdXaWRnZXQoKSB7XHJcbiAgICAgICAgdGhpcy5fdHJhY2VPdmVydmlld1dpZGdldCA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5UcmFjZU92ZXJ2aWV3V2lkZ2V0SWQpIGFzIElUcmFjZU92ZXJ2aWV3V2lkZ2V0O1xyXG4gICAgICAgIGlmKHRoaXMuX3RyYWNlT3ZlcnZpZXdXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQuYWRkU2lkZUJhclRhYihcIlRyYWNlVmlld1wiLCBcIndpZGdldHMvbWFwcENvY2twaXRXaWRnZXQvc3R5bGUvaW1hZ2VzL0FyZWFzL1RyYWNlQXJlYS5zdmdcIik7XHJcbiAgICAgICAgICAgIC8vIGluaXRpYWxpemUgdGhlIHRyYWNlIHByb3ZpZGVyXHJcbiAgICAgICAgICAgICg8RGF0YU1vZGVscy5JTWFwcENvY2twaXREYXRhTW9kZWw+dGhpcy5kYXRhTW9kZWwpLmRhdGFTb3VyY2UudHJhY2VQcm92aWRlci5pbml0aWFsaXplKCkudGhlbigoKT0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IHRyYWNlQ29tcG9uZW50cyA9ICg8RGF0YU1vZGVscy5JTWFwcENvY2twaXREYXRhTW9kZWw+dGhpcy5kYXRhTW9kZWwpLmRhdGFTb3VyY2UudHJhY2VQcm92aWRlci50cmFjZUNvbXBvbmVudHM7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGxldCB0cmFjZUNvbXBvbmVudHNMaW5rOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50Pj4gPSBQcm9wZXJ0eS5jcmVhdGU8QXJyYXk8TWFwcENvY2twaXRUcmFjZUNvbXBvbmVudD4+KFtdKTtcclxuICAgICAgICAgICAgICAgIHRyYWNlQ29tcG9uZW50c0xpbmsudmFsdWUgPSB0cmFjZUNvbXBvbmVudHM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLl90cmFjZU92ZXJ2aWV3V2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdHJhY2VPdmVydmlld1dpZGdldC5jb21wb25lbnRzID0gdHJhY2VDb21wb25lbnRzTGluaztcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5hZGRXaWRnZXQodGhpcy5fdHJhY2VPdmVydmlld1dpZGdldCwgXCJUcmFjZU92ZXJ2aWV3XCIsIFZpZXdUeXBlLk92ZXJ2aWV3LCB7IHBhcmVudDogXCJUcmFjZVZpZXdcIiwgd2lkZ2V0UG9zaXRpb246IFRhYldpZGdldFdpZGdldFBvc2l0b25zLmxlZnQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdHJhY2VPdmVydmlld1dpZGdldC5ldmVudE9wZW5WaWV3LmF0dGFjaCh0aGlzLl90cmFjZU92ZXJ2aWV3T3BlblZpZXdIYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7RXZlbnRPcGVuVmlld0FyZ3N9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uVHJhY2VPdmVydmlld1dpZGdldE9wZW5WaWV3KHNlbmRlciwgYXJnczogRXZlbnRPcGVuVmlld0FyZ3Mpe1xyXG4gICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmFkZFZpZXcoXCJUcmFjZVZpZXdcIiwgYXJncy5jb21wb25lbnQsIGFyZ3Mudmlld1R5cGUsIHRydWUpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IE1hcHBDb2NrcGl0V2lkZ2V0IH07Il19