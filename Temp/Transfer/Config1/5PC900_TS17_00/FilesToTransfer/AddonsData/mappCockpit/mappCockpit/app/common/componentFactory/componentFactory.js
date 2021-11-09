define(["require", "exports", "../../widgets/cursorInfoWidget/model/cursorSignalsDataModel", "../../models/common/seriesProvider/seriesProvider", "../../widgets/widgets", "../../models/dataModels", "../componentBase/componentBase", "../../widgets/common/imageProvider", "../../widgets/common/commonLayoutProvider", "../../widgets/common/seriesIconProvider", "../textProvider/textProvider"], function (require, exports, cursorSignalsDataModel_1, seriesProvider_1, Widgets, DataModels, componentBase_1, imageProvider_1, commonLayoutProvider_1, seriesIconProvider_1, textProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ComponentFactory = /** @class */ (function () {
        function ComponentFactory() {
            this._componentInstances = new Map();
        }
        ComponentFactory.getInstance = function () {
            if (this._instance == undefined) {
                this._instance = new ComponentFactory();
            }
            return this._instance;
        };
        ComponentFactory.prototype.create = function (componentDefinition, context) {
            if (context === void 0) { context = undefined; }
            /* tslint:disable:max-func-body-length */ // disabled due to switch case
            var instance = undefined;
            var doInitialization = false;
            switch (componentDefinition.type) {
                case "e":
                    console.error(componentDefinition);
                    break;
                /////////////////
                // Create widgets
                case "MappCockpitWidget":
                    instance = Widgets.MappCockpitWidget.create();
                    break;
                case "WatchablesWidget":
                    instance = Widgets.WatchablesWidget.create();
                    break;
                case "MethodsWidget":
                    instance = Widgets.MethodsWidget.create();
                    break;
                case "ConfigManagerWidget":
                    instance = Widgets.ConfigManagerWidget.create();
                    break;
                case "SignalManagerWidget":
                    instance = Widgets.SignalManagerWidget.create();
                    break;
                case "ChartManagerWidget":
                    instance = Widgets.ChartManagerWidget.create();
                    break;
                case "TraceViewWidget":
                    instance = Widgets.TraceViewWidget.create();
                    break;
                case "ChartViewWidget":
                    instance = Widgets.ChartViewWidget.create();
                    break;
                case "MessagesWidget":
                    instance = Widgets.MessagesWidget.create();
                    break;
                case "SplitterWidget":
                    instance = Widgets.SplitterWidget.create();
                    break;
                case "ComponentViewWidget":
                    instance = Widgets.ComponentViewWidget.create();
                    break;
                case "MethodListWidget":
                    instance = Widgets.MethodListWidget.create();
                    break;
                case "MethodParameterListWidget":
                    instance = Widgets.MethodParameterListWidget.create();
                    break;
                case "SideBarWidget":
                    instance = Widgets.SideBarWidget.create();
                    break;
                case "TabWidget":
                    instance = Widgets.TabWidget.create();
                    break;
                case "StartPageWidget":
                    instance = Widgets.StartPageWidget.create();
                    break;
                case "ComponentOverviewWidget":
                    instance = Widgets.ComponentOverviewWidget.create();
                    break;
                case "TraceOverviewWidget":
                    instance = Widgets.TraceOverviewWidget.create();
                    break;
                case "TraceConfigurationViewWidget":
                    instance = Widgets.TraceConfigurationViewWidget.create();
                    break;
                case "TraceControlWidget":
                    instance = Widgets.TraceControlWidget.create();
                    break;
                case "TraceConfigurationWidget":
                    instance = Widgets.TraceConfigurationWidget.create();
                    break;
                case "TraceConfigTimingWidget":
                    instance = Widgets.TraceConfigTimingWidget.create();
                    break;
                case "TraceConfigTriggerWidget":
                    instance = Widgets.TraceConfigTriggerWidget.create();
                    break;
                case "TraceConfigDatapointsWidget":
                    instance = Widgets.TraceConfigDatapointsWidget.create();
                    break;
                case "MainNavigationWidget":
                    instance = Widgets.MainNavigationWidget.create();
                    break;
                case "LoginWidget":
                    instance = Widgets.LoginWidget.create();
                    break;
                case "CursorInfoWidget":
                    instance = Widgets.CursorInfoWidget.create();
                    break;
                case "ToolsOverviewWidget":
                    instance = Widgets.ToolsOverviewWidget.create();
                    break;
                case "ChartViewToolbar":
                    instance = Widgets.ChartViewToolbar.create();
                    break;
                case "ChartBase":
                    // Implement creation of chartBase(widget) in the component factory(type must be set by defaultSettingsId => fft, xy, yt, ...)
                    //instance = Widgets.ChartBaseWidget.create();
                    break;
                case "DummyWidget":
                    instance = Widgets.DummyWidget.create();
                    break;
                ////////////////////
                // Create datamodels
                case "MappCockpitDataModel":
                    instance = DataModels.MappCockpitDataModel.create();
                    doInitialization = true;
                    break;
                case "TabWidgetDataModel":
                    instance = DataModels.TabWidgetDataModel.create();
                    doInitialization = true;
                    break;
                case "ConfigManagerDataModel":
                    instance = DataModels.ConfigManagerDataModel.create();
                    doInitialization = true;
                    break;
                case "SignalManagerDataModel":
                    instance = DataModels.SignalManagerDataModel.create();
                    doInitialization = true;
                    break;
                case "CursorSignalsDataModel":
                    instance = new cursorSignalsDataModel_1.CursorSignalsDataModel();
                    doInitialization = true;
                    break;
                ////////////////////
                // Create providers
                case "SeriesProvider":
                case "TextProvider":
                case "ChartManagerDataModel":
                    if (this._componentInstances.has(componentDefinition.id)) {
                        instance = this._componentInstances.get(componentDefinition.id);
                    }
                    else {
                        if (componentDefinition.type == "SeriesProvider") {
                            instance = seriesProvider_1.SeriesProvider.getInstance();
                        }
                        else if (componentDefinition.type == "TextProvider") {
                            instance = new textProvider_1.TextProvider();
                        }
                        else if (componentDefinition.type == "ChartManagerDataModel") {
                            instance = DataModels.ChartManagerDataModel.create();
                        }
                        else {
                            console.error("Type not defined!");
                            return undefined;
                        }
                        this.createComponentAndInitializeInstance(componentDefinition, context, instance);
                    }
                    return instance;
                    break;
                case "SeriesIconProvider":
                    instance = seriesIconProvider_1.SeriesIconProvider.getInstance();
                    doInitialization = true;
                    break;
                case "ImageProvider":
                    instance = imageProvider_1.ImageProvider.getInstance();
                    break;
                case "CommonLayoutProvider":
                    instance = commonLayoutProvider_1.CommonLayoutProvider.getInstance();
                    doInitialization = true;
                    break;
                default:
                    console.error("Unkown type used for instance factory: " + componentDefinition.type);
                    break;
            }
            if (instance != undefined) {
                this.createComponent(instance, componentDefinition, context);
                if (doInitialization == true) {
                    // Does the initialization of the instance(datamodel,...) => widgets will be initialized later at the add of a widget to a splitter widget
                    instance.initialize();
                }
            }
            return instance;
            /* tslint:enable:max-func-body-length */
        };
        /**
         * Create component and initialize instance
         *
         * @private
         * @param {ComponentDefinition} componentDefinition
         * @param {(ComponentContext|undefined)} [context=undefined]
         * @param {IComponent} instance
         * @memberof ComponentFactory
         */
        ComponentFactory.prototype.createComponentAndInitializeInstance = function (componentDefinition, context, instance) {
            if (context === void 0) { context = undefined; }
            this._componentInstances.set(componentDefinition.id, instance);
            this.createComponent(instance, componentDefinition, context);
            instance.initialize();
        };
        /**
         * Dispose component
         *
         * @param {string} id
         * @memberof ComponentFactory
         */
        ComponentFactory.prototype.disposeComponent = function (id) {
            if (this._componentInstances.has(id)) {
                var instance = this._componentInstances.get(id);
                if (instance != undefined) {
                    instance.dispose();
                    this._componentInstances.delete(id);
                }
            }
        };
        /**
         * Creates an initializes the component object for the given instance(widget, datamodel, provider, ...)
         *
         * @private
         * @param {IComponent} instance
         * @param {ComponentDefinition} componentDefinition
         * @param {ComponentContext|undefined} context
         * @memberof ComponentFactory
         */
        ComponentFactory.prototype.createComponent = function (instance, componentDefinition, context) {
            instance.component = new componentBase_1.ComponentBase(this, instance);
            instance.component.initialize();
            if (context != undefined) {
                instance.component.context = context;
            }
            instance.component.setDefinition(componentDefinition);
        };
        return ComponentFactory;
    }());
    exports.ComponentFactory = ComponentFactory;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL2NvbXBvbmVudEZhY3RvcnkvY29tcG9uZW50RmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFlQTtRQUFBO1lBRVksd0JBQW1CLEdBQUcsSUFBSSxHQUFHLEVBQXNCLENBQUM7UUFrUGhFLENBQUM7UUE5T2lCLDRCQUFXLEdBQXpCO1lBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFJLFNBQVMsRUFBQztnQkFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7YUFDM0M7WUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQztRQUVNLGlDQUFNLEdBQWIsVUFBYyxtQkFBd0MsRUFBRSxPQUErQztZQUEvQyx3QkFBQSxFQUFBLG1CQUErQztZQUNuRyx5Q0FBeUMsQ0FBQyw4QkFBOEI7WUFDeEUsSUFBSSxRQUFRLEdBQXlCLFNBQVMsQ0FBQztZQUMvQyxJQUFJLGdCQUFnQixHQUFHLEtBQUssQ0FBQztZQUM3QixRQUFPLG1CQUFtQixDQUFDLElBQUksRUFBQztnQkFDNUIsS0FBSyxHQUFHO29CQUNKLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztvQkFDbkMsTUFBTTtnQkFDVixpQkFBaUI7Z0JBQ2pCLGlCQUFpQjtnQkFDakIsS0FBSyxtQkFBbUI7b0JBQ3BCLFFBQVEsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQzlDLE1BQU07Z0JBQ1YsS0FBSyxrQkFBa0I7b0JBQ25CLFFBQVEsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQzdDLE1BQU07Z0JBQ1YsS0FBSyxlQUFlO29CQUNoQixRQUFRLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FB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QUFnQixHQUF2QixVQUF3QixFQUFVO1lBQzlCLElBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDakMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDaEQsSUFBRyxRQUFRLElBQUksU0FBUyxFQUFDO29CQUNyQixRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ25CLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ3ZDO2FBQ0o7UUFDTCxDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSywwQ0FBZSxHQUF2QixVQUF3QixRQUFvQixFQUFFLG1CQUF3QyxFQUFFLE9BQW1DO1lBQ3ZILFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSw2QkFBYSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN2RCxRQUFRLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2hDLElBQUcsT0FBTyxJQUFJLFNBQVMsRUFBQztnQkFDcEIsUUFBUSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2FBQ3hDO1lBQ0QsUUFBUSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUMxRCxDQUFDO1FBQ0wsdUJBQUM7SUFBRCxDQUFDLEFBcFBELElBb1BDO0lBcFBZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDb21wb25lbnRGYWN0b3J5IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9jb21wb25lbnRGYWN0b3J5SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tIFwiLi4vY29tcG9uZW50QmFzZS9pbnRlcmZhY2VzL2NvbXBvbmVudEludGVyZmFjZVwiO1xyXG5cclxuaW1wb3J0IHsgQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbCB9IGZyb20gXCIuLi8uLi93aWRnZXRzL2N1cnNvckluZm9XaWRnZXQvbW9kZWwvY3Vyc29yU2lnbmFsc0RhdGFNb2RlbFwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZpbml0aW9uIH0gZnJvbSBcIi4vY29tcG9uZW50RGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBTZXJpZXNQcm92aWRlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3Nlcmllc1Byb3ZpZGVyL3Nlcmllc1Byb3ZpZGVyXCI7XHJcbmltcG9ydCAqIGFzIFdpZGdldHMgZnJvbSBcIi4uLy4uL3dpZGdldHMvd2lkZ2V0c1wiO1xyXG5pbXBvcnQgKiBhcyBEYXRhTW9kZWxzIGZyb20gXCIuLi8uLi9tb2RlbHMvZGF0YU1vZGVsc1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRCYXNlIH0gZnJvbSBcIi4uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50QmFzZVwiO1xyXG5pbXBvcnQgeyBJbWFnZVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL3dpZGdldHMvY29tbW9uL2ltYWdlUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgQ29tbW9uTGF5b3V0UHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vd2lkZ2V0cy9jb21tb24vY29tbW9uTGF5b3V0UHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgU2VyaWVzSWNvblByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL3dpZGdldHMvY29tbW9uL3Nlcmllc0ljb25Qcm92aWRlclwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRDb250ZXh0IH0gZnJvbSBcIi4uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50Q29udGV4dFwiO1xyXG5pbXBvcnQgeyBUZXh0UHJvdmlkZXIgfSBmcm9tIFwiLi4vdGV4dFByb3ZpZGVyL3RleHRQcm92aWRlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbXBvbmVudEZhY3RvcnkgaW1wbGVtZW50cyBJQ29tcG9uZW50RmFjdG9yeXtcclxuXHJcbiAgICBwcml2YXRlIF9jb21wb25lbnRJbnN0YW5jZXMgPSBuZXcgTWFwPHN0cmluZywgSUNvbXBvbmVudD4oKTtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IElDb21wb25lbnRGYWN0b3J5O1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogSUNvbXBvbmVudEZhY3Rvcnl7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2UgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgQ29tcG9uZW50RmFjdG9yeSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZShjb21wb25lbnREZWZpbml0aW9uOiBDb21wb25lbnREZWZpbml0aW9uLCBjb250ZXh0OiBDb21wb25lbnRDb250ZXh0fHVuZGVmaW5lZCA9IHVuZGVmaW5lZCk6IElDb21wb25lbnR8dW5kZWZpbmVke1xyXG4gICAgICAgIC8qIHRzbGludDpkaXNhYmxlOm1heC1mdW5jLWJvZHktbGVuZ3RoICovIC8vIGRpc2FibGVkIGR1ZSB0byBzd2l0Y2ggY2FzZVxyXG4gICAgICAgIGxldCBpbnN0YW5jZTogSUNvbXBvbmVudHx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgbGV0IGRvSW5pdGlhbGl6YXRpb24gPSBmYWxzZTtcclxuICAgICAgICBzd2l0Y2goY29tcG9uZW50RGVmaW5pdGlvbi50eXBlKXtcclxuICAgICAgICAgICAgY2FzZSBcImVcIjpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoY29tcG9uZW50RGVmaW5pdGlvbik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIHdpZGdldHNcclxuICAgICAgICAgICAgY2FzZSBcIk1hcHBDb2NrcGl0V2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuTWFwcENvY2twaXRXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIldhdGNoYWJsZXNXaWRnZXRcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gV2lkZ2V0cy5XYXRjaGFibGVzV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJNZXRob2RzV2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuTWV0aG9kc1dpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiQ29uZmlnTWFuYWdlcldpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLkNvbmZpZ01hbmFnZXJXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlNpZ25hbE1hbmFnZXJXaWRnZXRcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gV2lkZ2V0cy5TaWduYWxNYW5hZ2VyV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJDaGFydE1hbmFnZXJXaWRnZXRcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gV2lkZ2V0cy5DaGFydE1hbmFnZXJXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlRyYWNlVmlld1dpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLlRyYWNlVmlld1dpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiQ2hhcnRWaWV3V2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuQ2hhcnRWaWV3V2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJNZXNzYWdlc1dpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLk1lc3NhZ2VzV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJTcGxpdHRlcldpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLlNwbGl0dGVyV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJDb21wb25lbnRWaWV3V2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuQ29tcG9uZW50Vmlld1dpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiTWV0aG9kTGlzdFdpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLk1ldGhvZExpc3RXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIk1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXRcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gV2lkZ2V0cy5NZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJTaWRlQmFyV2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuU2lkZUJhcldpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiVGFiV2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuVGFiV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJTdGFydFBhZ2VXaWRnZXRcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gV2lkZ2V0cy5TdGFydFBhZ2VXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkNvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuQ29tcG9uZW50T3ZlcnZpZXdXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlRyYWNlT3ZlcnZpZXdXaWRnZXRcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gV2lkZ2V0cy5UcmFjZU92ZXJ2aWV3V2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJUcmFjZUNvbmZpZ3VyYXRpb25WaWV3V2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiVHJhY2VDb250cm9sV2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuVHJhY2VDb250cm9sV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJUcmFjZUNvbmZpZ3VyYXRpb25XaWRnZXRcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gV2lkZ2V0cy5UcmFjZUNvbmZpZ3VyYXRpb25XaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlRyYWNlQ29uZmlnVGltaW5nV2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuVHJhY2VDb25maWdUaW1pbmdXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLlRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJNYWluTmF2aWdhdGlvbldpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLk1haW5OYXZpZ2F0aW9uV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJMb2dpbldpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLkxvZ2luV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJDdXJzb3JJbmZvV2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuQ3Vyc29ySW5mb1dpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiVG9vbHNPdmVydmlld1dpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLlRvb2xzT3ZlcnZpZXdXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkNoYXJ0Vmlld1Rvb2xiYXJcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gV2lkZ2V0cy5DaGFydFZpZXdUb29sYmFyLmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJDaGFydEJhc2VcIjpcclxuICAgICAgICAgICAgICAgIC8vIEltcGxlbWVudCBjcmVhdGlvbiBvZiBjaGFydEJhc2Uod2lkZ2V0KSBpbiB0aGUgY29tcG9uZW50IGZhY3RvcnkodHlwZSBtdXN0IGJlIHNldCBieSBkZWZhdWx0U2V0dGluZ3NJZCA9PiBmZnQsIHh5LCB5dCwgLi4uKVxyXG4gICAgICAgICAgICAgICAgLy9pbnN0YW5jZSA9IFdpZGdldHMuQ2hhcnRCYXNlV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJEdW1teVdpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLkR1bW15V2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICAvLyBDcmVhdGUgZGF0YW1vZGVsc1xyXG4gICAgICAgICAgICBjYXNlIFwiTWFwcENvY2twaXREYXRhTW9kZWxcIjogXHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IERhdGFNb2RlbHMuTWFwcENvY2twaXREYXRhTW9kZWwuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBkb0luaXRpYWxpemF0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiVGFiV2lkZ2V0RGF0YU1vZGVsXCI6IFxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBEYXRhTW9kZWxzLlRhYldpZGdldERhdGFNb2RlbC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGRvSW5pdGlhbGl6YXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJDb25maWdNYW5hZ2VyRGF0YU1vZGVsXCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IERhdGFNb2RlbHMuQ29uZmlnTWFuYWdlckRhdGFNb2RlbC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGRvSW5pdGlhbGl6YXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJTaWduYWxNYW5hZ2VyRGF0YU1vZGVsXCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IERhdGFNb2RlbHMuU2lnbmFsTWFuYWdlckRhdGFNb2RlbC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGRvSW5pdGlhbGl6YXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYXNlIFwiQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBuZXcgQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbCgpO1xyXG4gICAgICAgICAgICAgICAgZG9Jbml0aWFsaXphdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBwcm92aWRlcnNcclxuICAgICAgICAgICAgY2FzZSBcIlNlcmllc1Byb3ZpZGVyXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJUZXh0UHJvdmlkZXJcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkNoYXJ0TWFuYWdlckRhdGFNb2RlbFwiOlxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5fY29tcG9uZW50SW5zdGFuY2VzLmhhcyhjb21wb25lbnREZWZpbml0aW9uLmlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlID0gdGhpcy5fY29tcG9uZW50SW5zdGFuY2VzLmdldChjb21wb25lbnREZWZpbml0aW9uLmlkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY29tcG9uZW50RGVmaW5pdGlvbi50eXBlID09IFwiU2VyaWVzUHJvdmlkZXJcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlID0gU2VyaWVzUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihjb21wb25lbnREZWZpbml0aW9uLnR5cGUgPT0gXCJUZXh0UHJvdmlkZXJcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlID0gbmV3IFRleHRQcm92aWRlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKGNvbXBvbmVudERlZmluaXRpb24udHlwZSA9PSBcIkNoYXJ0TWFuYWdlckRhdGFNb2RlbFwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBEYXRhTW9kZWxzLkNoYXJ0TWFuYWdlckRhdGFNb2RlbC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlR5cGUgbm90IGRlZmluZWQhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbXBvbmVudEFuZEluaXRpYWxpemVJbnN0YW5jZShjb21wb25lbnREZWZpbml0aW9uLCBjb250ZXh0LCBpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlNlcmllc0ljb25Qcm92aWRlclwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBTZXJpZXNJY29uUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAgICAgICAgIGRvSW5pdGlhbGl6YXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJJbWFnZVByb3ZpZGVyXCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IEltYWdlUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiQ29tbW9uTGF5b3V0UHJvdmlkZXJcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gQ29tbW9uTGF5b3V0UHJvdmlkZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAgICAgICAgIGRvSW5pdGlhbGl6YXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlVua293biB0eXBlIHVzZWQgZm9yIGluc3RhbmNlIGZhY3Rvcnk6IFwiICsgY29tcG9uZW50RGVmaW5pdGlvbi50eXBlKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpbnN0YW5jZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbXBvbmVudChpbnN0YW5jZSwgY29tcG9uZW50RGVmaW5pdGlvbiwgY29udGV4dCk7XHJcbiAgICAgICAgICAgIGlmKGRvSW5pdGlhbGl6YXRpb24gPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAvLyBEb2VzIHRoZSBpbml0aWFsaXphdGlvbiBvZiB0aGUgaW5zdGFuY2UoZGF0YW1vZGVsLC4uLikgPT4gd2lkZ2V0cyB3aWxsIGJlIGluaXRpYWxpemVkIGxhdGVyIGF0IHRoZSBhZGQgb2YgYSB3aWRnZXQgdG8gYSBzcGxpdHRlciB3aWRnZXRcclxuICAgICAgICAgICAgICAgICg8YW55Pmluc3RhbmNlKS5pbml0aWFsaXplKCk7ICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5zdGFuY2U7XHJcbiAgICAgICAgLyogdHNsaW50OmVuYWJsZTptYXgtZnVuYy1ib2R5LWxlbmd0aCAqL1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGNvbXBvbmVudCBhbmQgaW5pdGlhbGl6ZSBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudERlZmluaXRpb259IGNvbXBvbmVudERlZmluaXRpb25cclxuICAgICAqIEBwYXJhbSB7KENvbXBvbmVudENvbnRleHR8dW5kZWZpbmVkKX0gW2NvbnRleHQ9dW5kZWZpbmVkXVxyXG4gICAgICogQHBhcmFtIHtJQ29tcG9uZW50fSBpbnN0YW5jZVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEZhY3RvcnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVDb21wb25lbnRBbmRJbml0aWFsaXplSW5zdGFuY2UoY29tcG9uZW50RGVmaW5pdGlvbjogQ29tcG9uZW50RGVmaW5pdGlvbiwgY29udGV4dDogQ29tcG9uZW50Q29udGV4dHx1bmRlZmluZWQgPSB1bmRlZmluZWQsIGluc3RhbmNlOiBJQ29tcG9uZW50KXtcclxuICAgICAgICB0aGlzLl9jb21wb25lbnRJbnN0YW5jZXMuc2V0KGNvbXBvbmVudERlZmluaXRpb24uaWQsIGluc3RhbmNlKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUNvbXBvbmVudChpbnN0YW5jZSwgY29tcG9uZW50RGVmaW5pdGlvbiwgY29udGV4dCk7XHJcbiAgICAgICAgKDxhbnk+aW5zdGFuY2UpLmluaXRpYWxpemUoKTsgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZSBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRGYWN0b3J5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXNwb3NlQ29tcG9uZW50KGlkOiBzdHJpbmcpe1xyXG4gICAgICAgIGlmKHRoaXMuX2NvbXBvbmVudEluc3RhbmNlcy5oYXMoaWQpKSB7XHJcbiAgICAgICAgICAgIGxldCBpbnN0YW5jZSA9IHRoaXMuX2NvbXBvbmVudEluc3RhbmNlcy5nZXQoaWQpO1xyXG4gICAgICAgICAgICBpZihpbnN0YW5jZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50SW5zdGFuY2VzLmRlbGV0ZShpZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluaXRpYWxpemVzIHRoZSBjb21wb25lbnQgb2JqZWN0IGZvciB0aGUgZ2l2ZW4gaW5zdGFuY2Uod2lkZ2V0LCBkYXRhbW9kZWwsIHByb3ZpZGVyLCAuLi4pXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SUNvbXBvbmVudH0gaW5zdGFuY2VcclxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50RGVmaW5pdGlvbn0gY29tcG9uZW50RGVmaW5pdGlvblxyXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRDb250ZXh0fHVuZGVmaW5lZH0gY29udGV4dFxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEZhY3RvcnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVDb21wb25lbnQoaW5zdGFuY2U6IElDb21wb25lbnQsIGNvbXBvbmVudERlZmluaXRpb246IENvbXBvbmVudERlZmluaXRpb24sIGNvbnRleHQ6IENvbXBvbmVudENvbnRleHR8dW5kZWZpbmVkKXtcclxuICAgICAgICBpbnN0YW5jZS5jb21wb25lbnQgPSBuZXcgQ29tcG9uZW50QmFzZSh0aGlzLCBpbnN0YW5jZSk7XHJcbiAgICAgICAgaW5zdGFuY2UuY29tcG9uZW50LmluaXRpYWxpemUoKTtcclxuICAgICAgICBpZihjb250ZXh0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLmNvbXBvbmVudC5jb250ZXh0ID0gY29udGV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5zdGFuY2UuY29tcG9uZW50LnNldERlZmluaXRpb24oY29tcG9uZW50RGVmaW5pdGlvbik7XHJcbiAgICB9XHJcbn0iXX0=