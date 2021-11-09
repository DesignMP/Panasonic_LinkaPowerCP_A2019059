define([
    'widgets/brease/ToggleButton/ToggleButton',
    'brease/enum/Enum',
    'brease/core/Utils',
    'brease/events/BreaseEvent',
    'widgets/brease/common/libs/wfUtils/UtilsImage'
], function (
    SuperClass, Enum, Utils, BreaseEvent, UtilsImage
) {

    'use strict';

    /**
     * @class widgets.brease.ToggleSwitch
     * #Description
     * Switch, which toggles between two values
     * @extends widgets.brease.ToggleButton
     * @iatMeta studio:license
     * licensed
     * @iatMeta category:Category
     * Buttons
     * @iatMeta description:short
     * Schiebeschalter
     * @iatMeta description:de
     * Schaltet einen Wert zwischen true und false über Touch-Gesten des Benutzers
     * @iatMeta description:en
     * Toggles a value between true and false with touch gestures by the user
     */

    var defaultSettings = {
            height: 30,
            width: 100
        },

        WidgetClass = SuperClass.extend(function ToggleSwitch() {
            SuperClass.apply(this, arguments);
        }, defaultSettings),

        p = WidgetClass.prototype;

    /**
     * @property {Object} values
     * Possible values for property "value".  
     * @property {Boolean} values.checked=true
     * @property {Boolean} values.unchecked=false
     * @static
     * @readonly
     */
    WidgetClass.values = {
        checked: true,
        unchecked: false
    };

    p.init = function () {        
        if (this.settings.omitClass !== true) {
            this.addInitialClass('breaseToggleSwitch');
        }
        this.slider = $('<div/>').addClass('breaseToggleSwitch_toggle');

        this.el.empty().append(this.slider);

        this._setWidth = this.setWidth;
        this._setHeight = this.setHeight;
        this.calculatedHeight = this.settings.height;
        this.calculatedWidth = this.settings.width;

        _appendWrapper(this);
        _appendText(this);
        this.setClasses();

        SuperClass.prototype.init.call(this);

        this.adjustInitSize();

        if (brease.config.editMode === true) {
            var widget = this;
            require(['widgets/brease/ToggleSwitch/libs/EditorHandles'], function (EditorHandles) {
                var editorHandles = new EditorHandles(widget);
                widget.getHandles = function () {
                    return editorHandles.getHandles();
                };
                // workaround
                widget.designer.getSelectionDecoratables = function () {
                    return editorHandles.getSelectionDecoratables();
                };
            });
        }
    };

    p.setWidth = function (w) {
        SuperClass.prototype._setWidth.call(this, w);
        this.calculatedWidth = this._getCalculatedWidgetWidth();
        this.adjustSize();
    };

    p.setHeight = function (h) {
        SuperClass.prototype._setHeight.call(this, h);
        this.calculatedHeight = this._getCalculatedWidgetHeight();
        this.adjustSize();
    };

    /**
     * @method setText
     * @iatStudioExposed
     * Sets the visible text. This method can remove an optional textkey.
     * @param {String} text
     * @param {Boolean} [keepKey=false] Set true, if textkey should not be removed
     */
    p.setText = function (text, keepKey) {
        this.settings.text = text;

        if (keepKey !== true) {
            this.removeTextKey();
        }

        if (brease.config.editMode !== true) {
            if (brease.language.isKey(this.settings.text) === true) {
                this.setTextKey(brease.language.parseKey(this.settings.text), false);
                this.langChangeHandler();
                return;
            }
        }

        if (this.textEl !== undefined) {
            _textUpdate(this);
            this._calculateWidgetSize();
            this.adjustSize();
        }
    };

    /**
     * @method getText
     * Returns the visible text.
     * @return {String}
     */
    p.getText = function () {
        return this.settings.text;
    };

    /**
     * @method setMouseDownText
     * @iatStudioExposed
     * Sets the visible text for checked state. This method can remove an optional textkey.
     * @param {String} text
     * @param {Boolean} [keepKey=false] Set true, if textkey should not be removed
     */
    p.setMouseDownText = function (text, keepKey) {
        this.settings.mouseDownText = text;

        if (keepKey !== true) {
            this.removeMouseDownTextKey();
        }

        if (brease.config.editMode !== true) {
            if (brease.language.isKey(this.settings.mouseDownText) === true) {
                this.setMouseDownTextKey(brease.language.parseKey(this.settings.mouseDownText), false);
                this.langChangeHandler();
                return;
            }
        }

        if (this.textEl !== undefined) {
            _textUpdate(this);
            this._calculateWidgetSize(true);
            this.adjustSize();
        }
    };

    /**
     * @method getMouseDownText
     * Returns the visible text for checked state.
     * @return {String}
     */
    p.getMouseDownText = function () {
        return this.settings.mouseDownText;
    };

    /**
     * @method setImageAlign
     * Sets the value for image align.
     * @param {brease.enum.ImageAlign} imageAlign
     */
    p.setImageAlign = function (imageAlign) {
        this.settings.imageAlign = imageAlign;
        this.setClasses();
        if (this.textEl && (this.settings.imageAlign === Enum.ImageAlign.left || this.settings.imageAlign === Enum.ImageAlign.top)) {
            this.wrapperBefore.prepend(this.imgEl);
            this.wrapperBefore.prepend(this.svgEl);
            this.wrapperAfter.prepend(this.checkedImgEl);
            this.wrapperAfter.prepend(this.checkedSvgEl);
        } else {
            this.wrapperBefore.append(this.imgEl);
            this.wrapperBefore.append(this.svgEl);
            this.wrapperAfter.append(this.checkedImgEl);
            this.wrapperAfter.append(this.checkedSvgEl);
        }
    };

    /**
     * @method setImage
     * @iatStudioExposed
     * Sets an image.
     * @param {ImagePath} image
     */
    p.setImage = function (image) {
        var widget = this;

        if (image !== undefined && image !== '') {
            this.settings.image = image;
            if (UtilsImage.isStylable(image) && widget.settings.useSVGStyling) {
                widget.imgEl.hide();
                UtilsImage.getInlineSvg(image).then(function (svgElement) {
                    widget.svgEl.replaceWith(svgElement);
                    widget.svgEl = svgElement;
                    widget.svgEl.show();
                });
            } else {
                widget.imgEl.attr('src', image).show();
                widget.svgEl.hide();
            }
        } else {
            widget.settings.image = undefined;
            widget.imgEl.hide();
            widget.svgEl.hide();
        }

    };

    p.setStyle = function (style) {
        SuperClass.prototype.setStyle.call(this, style);
        this._calculateWidgetSize();
        this.adjustSize();
    };

    /**
     * @method setMouseDownImage
     * @iatStudioExposed
     * Sets the image when mouse down
     * @param {ImagePath} mouseDownImage
     */
    p.setMouseDownImage = function (mouseDownImage) {
        var widget = this;

        if (mouseDownImage !== undefined && mouseDownImage !== '') {
            this.settings.mouseDownImage = mouseDownImage;
            if (UtilsImage.isStylable(mouseDownImage) && widget.settings.useSVGStyling) {
                widget.checkedImgEl.hide();
                UtilsImage.getInlineSvg(mouseDownImage).then(function (svgElement) {
                    widget.checkedSvgEl.replaceWith(svgElement);
                    widget.checkedSvgEl = svgElement;
                    widget.checkedSvgEl.show();
                });
            } else {
                widget.checkedImgEl.attr('src', mouseDownImage).show();
                widget.checkedSvgEl.hide();
            }
        } else {
            widget.settings.mouseDownImage = undefined;
            widget.checkedImgEl.hide();
            widget.checkedSvgEl.hide();
        }
    };

    p.toggle = function (status, omitSubmit) {
        var sendChange = false;

        status = toggleStatus.call(this, status);

        if (status === WidgetClass.values.checked) {
            if (this.settings.value === WidgetClass.values.unchecked) {
                sendChange = true;
            }
            this.settings.value = WidgetClass.values.checked;
        } else {
            if (this.settings.value === WidgetClass.values.checked) {
                sendChange = true;
            }
            this.settings.value = WidgetClass.values.unchecked;
        }
        _setToggleStatusStyle(this, this.settings.value);

        if (sendChange === true && omitSubmit !== true) {
            /**
             * @event ValueChanged
             * @iatStudioExposed
             * Fired when the status of the widget is changed by user interaction
             * @param {Integer} newValue
             * @param {Boolean} newValueBool
             * @param {Integer} newValueInteger
             */
            var ev = this.createEvent('ValueChanged', {
                newValue: this.getValue(),
                newValueBool: this.getValueBool(),
                newValueInteger: this.getValueInteger()
            });
            ev.dispatch();
            this.submitChange();
        }
        this.dispatchEvent(new CustomEvent(BreaseEvent.CHANGE, { bubbles: true,
            cancelable: true,
            detail: { checked: this.isChecked()
            }
        }));

        var padding = parseInt(this.el.css('padding-right'), 10) + parseInt(this.el.css('padding-left'), 10),
            border = parseInt(this.el.css('border-right-width'), 10) + parseInt(this.el.css('border-left-width'), 10);

        if (this.settings.value === SuperClass.values.checked) {
            this.slider.css('margin-left', this.calculatedWidth - this.sliderWidth - padding - border);
        } else {
            this.slider.css('margin-left', 0);
        }

        this._calculateWidgetSize(false);
        this.adjustSize();
    };

    p._downHandler = function (e) {
        SuperClass.prototype._downHandler.apply(this, arguments);
        if (this.isActive) {
            this.currentTargetClicked = e.currentTarget;
        }
    };

    p._upHandler = function (e) {
        SuperClass.prototype._upHandler.apply(this, arguments);
        if (this.isDisabled || brease.config.editMode || Utils.getPointerId(e) !== this.pointerId) {
            return;
        }
        if (this.currentTargetClicked === e.currentTarget) {
            _setToggleStatusStyle(this, !this.settings.value);
        }
    };

    p.setClasses = function () {
        var imgClass;
        if ((this.imgEl !== undefined || this.checkedImgEl !== undefined) && this.textEl !== undefined && this.settings.text !== '') {

            switch (this.settings.imageAlign) {
                case Enum.ImageAlign.left:
                    imgClass = 'image-left';
                    break;

                case Enum.ImageAlign.right:
                    imgClass = 'image-right';
                    break;

                case Enum.ImageAlign.top:
                    imgClass = 'image-top';
                    break;

                case Enum.ImageAlign.bottom:
                    imgClass = 'image-bottom';
                    break;

            }
            this.elem.classList.remove('image-left', 'image-right', 'image-top', 'image-bottom');
            this.elem.classList.add(imgClass);
        } else {
            this.elem.classList.remove('image-left', 'image-right', 'image-top', 'image-bottom');
        }
    };

    p.adjustInitSize = function () {
        this._calculateWidgetSize();
        if (this.settings.height === 'auto' || this.settings.width === 'auto') {
            this.adjustSize();
        } else {
            this.adjustWrapper();
        }
    };

    p.adjustSize = function () {
        //Reset margin for slider
        this.slider.css('margin-left', 0);
        this.elem.style.width = parseInt(this.calculatedWidth, 10) + 'px';
        this.elem.style.height = parseInt(this.calculatedHeight, 10) + 'px';
        this.adjustSlider();
        this.adjustWrapper();
    };

    p.adjustPosition = function () {
        this.elem.style.top = parseInt(this.settings.top, 10) + 'px';
        this.elem.style.left = parseInt(this.settings.left, 10) + 'px';
    };

    p.adjustWrapper = function () {
        var padding = parseInt(this.el.css('padding-left'), 10),
            border = parseInt(this.el.css('border-left-width'), 10);
        if (this.wrapperBefore !== undefined && this.wrapperAfter !== undefined) {
            this.wrapperBefore.css('width', parseInt(this.calculatedWidth, 10) - this.sliderWidth - 3 * padding - 2 * border)
                .css('left', this.sliderWidth + padding + 'px');
            this.wrapperAfter.css('width', parseInt(this.calculatedWidth, 10) - this.sliderWidth - 3 * padding - 2 * border)
                .css('left', -parseInt(this.calculatedWidth, 10) + this.sliderWidth + 2 * padding + 2 * border + 'px');
        }
    };

    p.adjustSlider = function () {
        var padding = parseInt(this.el.css('padding-right'), 10) + parseInt(this.el.css('padding-left'), 10),
            border = parseInt(this.el.css('border-right-width'), 10) + parseInt(this.el.css('border-left-width'), 10);
        if (this.settings.value === SuperClass.values.checked) {
            this.slider.css('margin-left', parseInt(this.calculatedWidth, 10) - this.sliderWidth - padding - border);
        } else {
            this.slider.css('margin-left', 0);
        }
    };

    p._calculateWidgetSize = function () {
        this.sliderWidth = this._getSliderWidth();
        this.calculatedHeight = this._getCalculatedWidgetHeight();
        this.calculatedWidth = this._getCalculatedWidgetWidth();
    };

    p._getCalculatedWidgetHeight = function () {
        if (this.settings.height === 'auto') {
            var cssProperties = window.getComputedStyle(this.elem),
                padding = parseInt(cssProperties.getPropertyValue('padding-top'), 10) + parseInt(cssProperties.getPropertyValue('padding-bottom'), 10),
                border = parseInt(cssProperties.getPropertyValue('border-top-width'), 10) + parseInt(cssProperties.getPropertyValue('border-bottom-width'), 10),
                imageHeight = parseInt(this.imgEl.css('height'), 10),
                textHeight = this._getTextHeight(),
                calculatedHeight = textHeight < imageHeight ? imageHeight : textHeight;

            calculatedHeight = calculatedHeight + padding + border;

            if (this.settings.minHeight !== undefined) {
                calculatedHeight = calculatedHeight < this.settings.minHeight ?  this.settings.minHeight : calculatedHeight;
            }

            if (this.settings.maxHeight !== undefined) {
                calculatedHeight = calculatedHeight > this.settings.maxHeight ? this.settings.maxHeight : calculatedHeight;
            }
        } else {
            calculatedHeight = this.settings.height;
        }
        return calculatedHeight;
    };

    p._getCalculatedWidgetWidth = function () {
        if (this.settings.width === 'auto') {
            var cssProperties = window.getComputedStyle(this.elem),
                padding = parseInt(cssProperties.getPropertyValue('padding-right'), 10) + parseInt(cssProperties.getPropertyValue('padding-left'), 10),
                border = parseInt(cssProperties.getPropertyValue('border-right-width'), 10) + parseInt(cssProperties.getPropertyValue('border-left-width'), 10),
                imageWidth = this._getImageWidth(),
                textWidth = this._getTextWidth(),
                calculatedWidth = imageWidth + textWidth + this.sliderWidth + padding + border;

            if (this.settings.minWidth !== undefined) {
                calculatedWidth = calculatedWidth < this.settings.minWidth  ?  this.settings.minWidth : calculatedWidth;
            }

            if (this.settings.maxWidth !== undefined) {
                calculatedWidth = calculatedWidth > this.settings.maxWidth  ?  this.settings.maxWidth : calculatedWidth;
            }
        } else {
            calculatedWidth = this.settings.width;
        }
        return calculatedWidth;
    };

    p._getTextHeight = function () {
        var textHeight = 0,
            textEl = $('<span/>'),
            text,
            cssProperties;

        if (!this.settings.value) {
            cssProperties = window.getComputedStyle(this.textEl[0]);
            text = this.settings.text;
        } else {
            cssProperties = window.getComputedStyle(this.checkedTextEl[0]);
            text = this.settings.mouseDownText;
        }

        textEl.css({
            'font-family': cssProperties.getPropertyValue('font-family'),
            'font-size': cssProperties.getPropertyValue('font-size'),
            'font-weight': cssProperties.getPropertyValue('font-weight'),
            'font-style': cssProperties.getPropertyValue('font-style'),
            'height': 'auto',
            'width': 'auto',
            'position': 'absolute',
            'white-space': 'nowrap'
        });
        textEl.text(text);

        this.el.append(textEl);
        textHeight = Math.ceil(textEl[0].clientHeight);
        textEl.remove();

        return textHeight;
    };

    p._getTextWidth = function () {
        var textWidth = 0,
            textEl = $('<span/>'),
            text,
            cssProperties;

        if (!this.settings.value) {
            cssProperties = window.getComputedStyle(this.textEl[0]);
            text = this.settings.text;
        } else {
            cssProperties = window.getComputedStyle(this.checkedTextEl[0]);
            text = this.settings.mouseDownText;
        }

        textEl.css({
            'font-family': cssProperties.getPropertyValue('font-family'),
            'font-size': cssProperties.getPropertyValue('font-size'),
            'font-weight': cssProperties.getPropertyValue('font-weight'),
            'font-style': cssProperties.getPropertyValue('font-style'),
            'height': 'auto',
            'width': 'auto',
            'position': 'absolute',
            'white-space': 'nowrap'
        });
        textEl.text(text);

        this.el.append(textEl);
        textWidth = Math.ceil(textEl[0].clientWidth) + 3;
        textEl.remove();

        return textWidth;
    };

    p._getSliderWidth = function () {
        var sliderWidth = 0;
        if (this.settings.sliderWidth) {
            sliderWidth = this.settings.sliderWidth;
        } else {
            sliderWidth = parseInt(this.slider.outerWidth(), 10);
        }

        return sliderWidth;
    };

    p._getImageWidth = function () {
        var imageWidth = 0;

        if (this.settings.image) {
            if (this.settings.imageWidth) {
                imageWidth = parseInt(this.settings.imageWidth, 10);
            } else {
                imageWidth = parseInt(this.imgEl.css('width'), 10);
            }
        }
        return imageWidth;
    };

    /*PRIVATE
     **FUNCTIONS*/

    function _appendWrapper(widget) {

        widget.wrapperBefore = $('<div/>').addClass('wrapper');
        widget.wrapperAfter = $('<div/>').addClass('wrapper');

        widget.imgEl = $('<img/>').hide();
        widget.checkedImgEl = $('<img/>').hide();
        widget.svgEl = $('<svg/>').hide();
        widget.checkedSvgEl = $('<svg/>').hide();

        if (UtilsImage.isStylable(widget.settings.image) && widget.settings.useSVGStyling) {
            UtilsImage.getInlineSvg(widget.settings.image).then(function (svgElement) {
                widget.svgEl.replaceWith(svgElement);
                widget.svgEl = svgElement;
                widget.svgEl.show();
            });
        } else if (widget.settings.image !== undefined && widget.settings.image !== '') {
            widget.imgEl.attr('src', widget.settings.image).show();
        }

        if (UtilsImage.isStylable(widget.settings.mouseDownImage) && widget.settings.useSVGStyling) {
            UtilsImage.getInlineSvg(widget.settings.mouseDownImage).then(function (svgElement) {
                widget.checkedSvgEl.replaceWith(svgElement);
                widget.checkedSvgEl = svgElement;
                widget.checkedSvgEl.show();
            });
        } else if (widget.settings.mouseDownImage !== undefined && widget.settings.mouseDownImage !== '') {
            widget.checkedImgEl.attr('src', widget.settings.mouseDownImage).show();
        }

        widget.wrapperBefore.prepend(widget.imgEl);
        widget.wrapperBefore.prepend(widget.svgEl);
        widget.wrapperAfter.prepend(widget.checkedImgEl);
        widget.wrapperAfter.prepend(widget.checkedSvgEl);

        widget.slider.append(widget.wrapperBefore);
        widget.slider.append(widget.wrapperAfter);

    }

    function _appendText(widget) {

        widget.textEl = $('<span/>').addClass('before');
        widget.checkedTextEl = $('<span/>').addClass('after');

        widget.wrapperBefore.append(widget.textEl);
        widget.wrapperAfter.append(widget.checkedTextEl);

        _textUpdate(widget);
    }

    function _textUpdate(widget) {
        widget.textEl.text(widget.settings.text);
        widget.checkedTextEl.text(widget.settings.mouseDownText);
    }

    function _setToggleStatusStyle(widget, value) {
        if (value) {
            widget.elem.classList.add('checked');
        } else {
            widget.elem.classList.remove('checked');
        }
    }

    function toggleStatus(status) {
        if (status === undefined) {
            status = (this.settings.value === WidgetClass.values.unchecked) ? WidgetClass.values.checked : WidgetClass.values.unchecked;
        }
        return status;
    }

    return WidgetClass;

});
