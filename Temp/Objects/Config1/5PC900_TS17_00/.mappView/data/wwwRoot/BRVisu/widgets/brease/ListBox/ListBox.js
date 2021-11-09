define(['brease/core/BaseWidget',
    'widgets/brease/ListBox/libs/FocusHandler',
    'widgets/brease/ListBox/libs/config/Config',
    'widgets/brease/ListBox/libs/config/InitState',
    'brease/decorators/LanguageDependency',
    'brease/decorators/VisibilityDependency',
    'widgets/brease/ListBox/libs/view/ListBoxView/ListBoxView',
    'widgets/brease/ListBox/libs/reducer/ListBoxActions',
    'widgets/brease/ListBox/libs/reducer/ListBoxReducer',
    'widgets/brease/common/libs/external/redux',
    'widgets/brease/common/libs/redux/utils/UtilsList',
    'widgets/brease/common/libs/redux/utils/UtilsImage',
    'widgets/brease/common/libs/redux/utils/UtilsText',
    'widgets/brease/common/libs/BindingSync',
    'brease/decorators/DragAndDropCapability'
], function (SuperClass, FocusHandler, Config, InitState, languageDependency, visibilityDependency, ListBoxView, ListBoxActions, ListBoxReducer, Redux, UtilsList, UtilsImage, UtilsText, BindindSync, dragAndDropCapability) {

    'use strict';

    /**
     * @class widgets.brease.ListBox
     *
     * @mixins widgets.brease.common.DragDropProperties.libs.DroppablePropertiesEvents
     *
     * #Description
     * ListBox
     * @extends brease.core.BaseWidget
     *
     * @iatMeta studio:visible
     * true
     * @iatMeta category:Category
     * Selector
     * @iatMeta description:short
     * Liste von Texten
     * @iatMeta description:de
     * Zeigt eine Liste, aus welcher der Benutzer Elemente auswählen kann
     * @iatMeta description:en
     * Displays a list from where the user can select items
     */

    var defaultSettings = Config,

        WidgetClass = SuperClass.extend(function ListBox() {
            SuperClass.apply(this, arguments);
        }, defaultSettings),

        p = WidgetClass.prototype;

    p.init = function () {

        //Initialize superclass
        SuperClass.prototype.init.apply(this, arguments);

        //Define order for binding properties
        BindindSync.setupPropertyOrder(this, [
            {
                name: 'selectedValue',
                waitFor: ['dataProvider']
            }, {
                name: 'selectedIndex',
                waitFor: ['dataProvider']
            }]);

        //Calculate init state
        var initState = InitState.calculateInitState(this.settings, this.isEnabled(), this.isVisible(), brease.config.editMode);

        //Create store
        this.store = Redux.createStore(ListBoxReducer, initState);

        //Update editor grid with the default values to match the par value id
        this.submitChangeToEditor();

        //Create View
        this.listBoxView = new ListBoxView(this.store, this.el, this);

        //Subscribe master view to the store
        this.store.subscribe(this.listBoxView.render.bind(this.listBoxView));

        this.offlineAttributes = new Set();
        this.focusHandler = new FocusHandler(this);

        if (brease.config.isKeyboardOperationEnabled()) {
            // update focus after a render of the view
            this.listBoxView.addEventListener('ViewRendered', this.focusHandler.onRender.bind(this.focusHandler));
        }
    };

    p._handleFocusKeyDown = function (e) {
        SuperClass.prototype._handleFocusKeyDown.apply(this, arguments);
        this.focusHandler.handleFocusKeyDown(e.key);
    };

    p.getItemContainer = function () {
        return this.elem.querySelector('.ListView.Container');
    };

    p.getSelectedItem = function () {
        return this.elem.querySelector('.ItemView.itemSelected');
    };

    p.getAllItems = function () {
        return this.elem.querySelectorAll('.ItemView');
    };

    p.getScroller = function () {
        return this.listBoxView.listView.scroller;
    };

    p.valueChangeFromUI = function () {
        //Send value for the index if the value has changed
        this.submitChange();
    };

    p.langChangeHandler = function () {
        var action = ListBoxActions.changeLanguage();
        this.store.dispatch(action);
    };

    p._setWidth = function (w) {
        SuperClass.prototype._setWidth.apply(this, arguments);
        var action = ListBoxActions.changeWidth(w);
        this.store.dispatch(action);
    };

    p._setHeight = function (h) {
        SuperClass.prototype._setHeight.apply(this, arguments);
        var action = ListBoxActions.changeHeight(h);
        this.store.dispatch(action);
    };

    /**
     * @method setDataProvider
     * Sets dataProvider
     * @iatStudioExposed
     * @param {ItemCollection} provider
     */
    p.setDataProvider = function (provider) {
        this.settings.dataProvider = provider;
        if (provider === null) {
            _setOffline.call(this, 'dataProvider');
            return;
        }
        _setOnline.call(this, 'dataProvider');
        //Parse JSON to object
        var dataProviderObject = UtilsList.parseJSONtoObject(provider);
        //Generate the text elements
        var textElements = UtilsText.getTextsFromItems(dataProviderObject);
        var actionText = ListBoxActions.updateText(textElements);
        //Generate the image elements
        var imageList = UtilsImage.createImageList(dataProviderObject);
        var actionImage = ListBoxActions.updateImageList(imageList);
        //Generate the item list
        var itemList = UtilsList.getItemsFromItems(dataProviderObject);
        var actionItem = ListBoxActions.updateItemList(itemList);
        //Dispatch the actions
        this.store.dispatch(actionText);
        this.store.dispatch(actionImage);
        this.store.dispatch(actionItem);
        //Update new value to PLC
        this.submitChange();
    };

    /**
     * @method getDataProvider 
     * Returns dataProvider.
     * @return {ItemCollection}
     */
    p.getDataProvider = function () {
        return this.settings.dataProvider;
    };

    /**
     * @method setSelectedValue
     * Sets selectedValue
     * @iatStudioExposed
     * @param {String} value
     */
    p.setSelectedValue = function (value) {
        this.settings.selectedValue = value;
        if (value === null) {
            _setOffline.call(this, 'selectedValue');
            return;
        }
        _setOnline.call(this, 'selectedValue');
        var action = ListBoxActions.updateSelectedValue(value);
        this.store.dispatch(action);
        this.submitChange();
    };

    /**
     * @method getSelectedValue
     * @iatStudioExposed
     * Returns selectedValue.
     * @return {String}
     */
    p.getSelectedValue = function () {
        if (this.settings.selectedValue === null) {
            return this.settings.selectedValue;
        }
        var state = this.store.getState();
        return state.items.selectedValue;
    };

    /**
     * @method setSelectedIndex
     * @iatStudioExposed
     * Sets selectedIndex
     * @param {Integer} index
     */
    p.setSelectedIndex = function (index) {
        this.settings.selectedIndex = index;
        if (index === null) {
            _setOffline.call(this, 'selectedIndex');
            return;
        }
        _setOnline.call(this, 'selectedIndex');
        var action = ListBoxActions.updateSelectedItem(index);
        this.store.dispatch(action);
        this.submitChange();
    };

    /**
     * @method getSelectedIndex
     * @iatStudioExposed
     * Returns selectedIndex.
     * @return {Integer}
     */
    p.getSelectedIndex = function () {
        if (this.settings.selectedIndex === null) {
            return this.settings.selectedIndex;
        }
        var state = this.store.getState();
        return state.items.selectedIndex;
    };

    /**
     * @method setMultiLine
     * Sets multiLine
     * @param {Boolean} multiLine
     */
    p.setMultiLine = function (multiLine) {
        this.settings.multiLine = multiLine;
        var action = ListBoxActions.updateTextSettings({ multiLine: multiLine });
        this.store.dispatch(action);
    };

    /**
     * @method getMultiLine 
     * Returns multiLine.
     * @return {Boolean}
     */
    p.getMultiLine = function () {
        return this.settings.multiLine;
    };

    /**
     * @method setEllipsis
     * Sets ellipsis
     * @param {Boolean} ellipsis
     */
    p.setEllipsis = function (ellipsis) {
        this.settings.ellipsis = ellipsis;
        var action = ListBoxActions.updateTextSettings({ ellipsis: ellipsis });
        this.store.dispatch(action);
    };

    /**
     * @method getEllipsis 
     * Returns ellipsis.
     * @return {Boolean}
     */
    p.getEllipsis = function () {
        return this.settings.ellipsis;
    };

    /**
     * @method setWordWrap
     * Sets wordWrap
     * @param {Boolean} wordWrap
     */
    p.setWordWrap = function (wordWrap) {
        this.settings.wordWrap = wordWrap;
        var action = ListBoxActions.updateTextSettings({ wordWrap: wordWrap });
        this.store.dispatch(action);
    };

    /**
     * @method getWordWrap 
     * Returns wordWrap.
     * @return {Boolean}
     */
    p.getWordWrap = function () {
        return this.settings.wordWrap;
    };
    
    /**
     * @method setFitHeight2Items
     * Sets fitHeight2Items
     * @param {Boolean} fitHeight2Items
     */
    p.setFitHeight2Items = function (fitHeight2Items) {
        this.settings.fitHeight2Items = fitHeight2Items;
        var action = ListBoxActions.updateListSettings({ fitHeight2Items: fitHeight2Items });
        this.store.dispatch(action);
    };

    /**
     * @method getFitHeight2Items 
     * Returns fitHeight2Items.
     * @return {Boolean}
     */
    p.getFitHeight2Items = function () {
        return this.settings.fitHeight2Items;
    };

    /**
     * @method setItemHeight
     * Sets itemHeight
     * @param {Integer} itemHeight
     */
    p.setItemHeight = function (itemHeight) {
        this.settings.itemHeight = itemHeight;
        var action = ListBoxActions.updateItemSettings({ itemHeight: itemHeight });
        this.store.dispatch(action);
    };

    /**
     * @method getItemHeight 
     * Returns itemHeight.
     * @return {Integer}
     */
    p.getItemHeight = function () {
        return this.settings.itemHeight;
    };

    /**
     * @method setImageAlign
     * Sets imageAlign
     * @param {brease.enum.ImageAlign} imageAlign
     */
    p.setImageAlign = function (imageAlign) {
        this.settings.imageAlign = imageAlign;
        var action = ListBoxActions.updateItemSettings({ imageAlign: imageAlign });
        this.store.dispatch(action);
    };

    /**
     * @method getImageAlign 
     * Returns imageAlign.
     * @return {brease.enum.ImageAlign}
     */
    p.getImageAlign = function () {
        return this.settings.imageAlign;
    };

    /**
     * @method setImagePath
     * Sets imagePath
     * @param {DirectoryPath} imagePath
     */
    p.setImagePath = function (imagePath) {
        this.settings.imagePath = imagePath;
        var action = ListBoxActions.updateImagePath(imagePath);
        this.store.dispatch(action);
    };

    /**
     * @method getImagePath 
     * Returns imagePath.
     * @return {DirectoryPath}
     */
    p.getImagePath = function () {
        return this.settings.imagePath;
    };

    /**
     * @method setDisplaySettings
     * Sets displaySettings
     * @param {brease.enum.DropDownDisplaySettings} displaySettings
     */
    p.setDisplaySettings = function (displaySettings) {
        this.settings.displaySettings = displaySettings;
        var action = ListBoxActions.updateListSettings(UtilsList.getShowValues(this.settings.displaySettings));
        this.store.dispatch(action);
    };

    /**
     * @method getDisplaySettings 
     * Returns displaySettings
     * @return {brease.enum.DropDownDisplaySettings}
     */
    p.getDisplaySettings = function () {
        return this.settings.displaySettings;
    };
    
    p._clickHandler = function (e) {
        SuperClass.prototype._clickHandler.call(this, e, { origin: this.elem.id });
    };

    p.updateVisibility = function () {
        SuperClass.prototype.updateVisibility.apply(this, arguments);
        if (this.store !== undefined) {
            var action = ListBoxActions.changeVisible(this.isVisible());
            this.store.dispatch(action);
        }
    };

    p._enableHandler = function () {
        if (!this.isOffline()) {
            SuperClass.prototype._enableHandler.apply(this, arguments);
            var action = ListBoxActions.changeEnable(this.isEnabled());
            this.store.dispatch(action);
        } else if (this.isEnabled()) {
            this.disable();
        }
    };

    p.isOffline = function () {
        return this.offlineAttributes.size > 0;
    };

    p.dispose = function () {
        this.listBoxView.dispose();
        this.focusHandler.dispose();
        SuperClass.prototype.dispose.apply(this, arguments);
    };

    p.suspend = function () {
        if (this.store !== undefined) {
            //Set the status to innactive
            var action = ListBoxActions.changeActive(false);
            this.store.dispatch(action);
        }
        SuperClass.prototype.suspend.apply(this, arguments);
    };

    p.wake = function () {
        if (this.store !== undefined) {
            //Set the status to active
            var action = ListBoxActions.changeActive(true);
            this.store.dispatch(action);
        }
        SuperClass.prototype.wake.apply(this, arguments);
    };

    p.submitChange = function () {
        this.submitChangeToEditor();
        var state = this.store.getState();
        if (!UtilsList.isEqualIntBool(this.settings.selectedIndex, state.items.selectedIndex) || this.settings.selectedValue !== state.items.selectedValue) {
            this.settings.selectedIndex = state.items.selectedIndex;
            this.settings.selectedValue = state.items.selectedValue;
            this.sendValueChange({
                selectedIndex: state.items.selectedIndex,
                selectedValue: state.items.selectedValue
            });
            /**
             * @event SelectedIndexChanged
             * @iatStudioExposed
             * Fired when index changes.
             * @param {Integer} selectedIndex
             * @param {String} selectedValue 
             */
            var ev = this.createEvent('SelectedIndexChanged', {
                selectedIndex: this.getSelectedIndex(),
                selectedValue: this.getSelectedValue()
            });
            ev.dispatch();
        }
    };

    p.submitChangeToEditor = function () {
        if (brease.config.editMode) {
            var state = this.store.getState();
            if (this.settings.selectedIndex !== state.items.selectedIndex || this.settings.selectedValue !== state.items.selectedValue) {
                iatd.model.setWidgetsProperties([
                    {
                        'WidgetId': this.elem.id,
                        'Properties': { 'selectedIndex': state.items.selectedIndex, 'selectedValue': state.items.selectedValue }
                    }
                ], 1234567890);
            }
        }
    };

    /* Set attribute to offline. If any attribute is offline the list will be disabled and offline status is displayed.
     * @param {String} attribute 
     */
    function _setOffline(attribute) {
        if (!this.isOffline()) {
            this.store.dispatch(ListBoxActions.setListOffline());
            this.disable();
        }
        this.offlineAttributes.add(attribute);
    }

    /* Set attribute to online. If any attribute is offline the list will be disabled and offline status is displayed.
     * @param {String} attribute 
     */
    function _setOnline(attribute) {
        if (this.offlineAttributes.delete(attribute) && !this.isOffline()) {
            this.setEnable(this.settings.enable);
            this.store.dispatch(ListBoxActions.setListOnline()); 
        }
    }

    return dragAndDropCapability.decorate(visibilityDependency.decorate(languageDependency.decorate(WidgetClass, true), false), false);

});
