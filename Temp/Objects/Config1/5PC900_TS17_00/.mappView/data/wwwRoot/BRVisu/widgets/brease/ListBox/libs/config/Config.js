define(['brease/enum/Enum'],
    function (Enum) {

        'use strict';

        /**
        * @class widgets.brease.ListBox.config.Config
        * @extends core.javascript.Object
        * @override widgets.brease.ListBox
        */

        /**
        * @cfg {UInteger} selectedIndex=0
        * @iatStudioExposed
        * @iatCategory Data
        * @bindable
        * Index of the selected item. The first item has index=0
        */

        /**
        * @cfg {String} selectedValue=''
        * @iatStudioExposed
        * @iatCategory Data
        * @bindable
        * Value of the selected item
        */

        /**
        * @cfg {Integer} itemHeight=40
        * @iatStudioExposed
        * @iatCategory Appearance
        * Height of every item in the List
        */

        /**
        * @cfg {brease.enum.ImagePosition} imageAlign='left'
        * @iatStudioExposed
        * @iatCategory Appearance
        * Position of images relative to text  
        */

        /**
        * @cfg {DirectoryPath} imagePath=''
        * @iatStudioExposed
        * @iatCategory Appearance
        * Path to the images location (e.g. 'Media/images/').
        * Names of the images must be given like the index in the dataProvider (e.g. 0.png, 1.png, 2.png)
        */

        /**
        * @cfg {Boolean} ellipsis=false
        * @iatStudioExposed
        * @iatCategory Behavior
        * If true, overflow of text is symbolized with an ellipsis. This option has no effect, if wordWrap = true.
        */

        /**
        * @cfg {Boolean} wordWrap=false
        * @iatStudioExposed
        * @iatCategory Behavior
        * If true, text will wrap when necessary.
        */

        /**
        * @cfg {Boolean} multiLine=false
        * @iatStudioExposed
        * @iatCategory Behavior
        * If true, more than one line is possible. Text will wrap when necessary (wordWrap=true) or at line breaks (\n).
        * If false, text will never wrap to the next line. The text continues on the same line.
        */

        /**
        * @cfg {Boolean} fitHeight2Items=false
        * @iatStudioExposed
        * @iatCategory Behavior
        * If true, the height will fit to the necessary height if the height  oft the list is bigger
        * If false, the list uses the configured height
        */

        /**
        * @cfg {ItemCollection} dataProvider=[]
        * @iatStudioExposed
        * @bindable
        * @iatCategory Data
        * ItemCollection see Datatype
        *    
        */

        /**
        * @cfg {brease.enum.DropDownDisplaySettings} displaySettings='default'
        * @iatStudioExposed
        * @iatCategory Appearance
        * Defines which elements are displayed on the widget
        */

        /**
         * @cfg {Integer} tabIndex=0
         * @iatStudioExposed
         * @iatCategory Behavior 
         * sets if a widget should have autofocus enabled (0), the order of the focus (>0),
         * or if autofocus should be disabled (-1)
         */

        return {
            selectedIndex: 0,
            selectedValue: '',
            itemHeight: 40,
            imageAlign: Enum.ImageAlign.left,
            imagePath: '',
            ellipsis: false,
            wordWrap: false,
            multiLine: false,
            fitHeight2Items: false,
            dataProvider: [],
            displaySettings: Enum.DropDownDisplaySettings.default,
            tabIndex: 0
        };

    });
