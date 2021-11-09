define([
    'brease/enum/Enum'
], function (Enum) {

    'use strict';

    /**
     * @class widgets.brease.ImageList.config.Config
     * @extends core.javascript.Object
     * @override widgets.brease.ImageList
     */

    /**
     * @cfg {brease.enum.SizeMode} sizeMode='contain'
     * @iatStudioExposed
     * @iatCategory Behavior
     * Size of image relative to widget size
     */

    /**
     * @cfg {DirectoryPath} imagePrefix=''
     * @iatStudioExposed
     * @iatCategory Appearance
     * Prefix for the image path.
     */

    /**
     * @cfg {GraphicCollection} imageList (required)
     * @iatStudioExposed
     * @iatCategory Appearance
     * list of image file names
     */

    /**
     * @cfg {Integer} selectedIndex=0
     * @bindable
     * @iatStudioExposed
     * @iatCategory Data
     * Selected Index of Image to display
     */

    /**
     * @cfg {brease.enum.BackgroundPosition} imageAlign='center center'
     * @iatStudioExposed
     * @iatCategory Appearance
     * Alignment of the Image
     * xpos ypos
     * The xpos value indicates the horizontal position and the ypos value indicates the vertical position.
     */

    /**
     * @cfg {Boolean} useSVGStyling=true
     * @iatStudioExposed
     * @iatCategory Appearance
     * Define if the image stylings (i.e imageColor) are applied - only valid when SVG Images are used.
     */

    return {
        sizeMode: Enum.SizeMode.CONTAIN,
        imagePrefix: '',
        imageList: [],
        selectedIndex: 0,
        imageAlign: 'center center',
        useSVGStyling: true
    };

});
