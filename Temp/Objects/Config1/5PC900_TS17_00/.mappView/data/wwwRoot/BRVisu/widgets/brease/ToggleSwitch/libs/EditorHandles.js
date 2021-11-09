define([
    'brease/core/Class'
], function (
    SuperClass
) {

    'use strict';

    var ModuleClass = SuperClass.extend(function EditorHandles(widget) {
            SuperClass.call(this);

            this.widget = widget;
            this.oldSettings = {
                top: this.widget.settings.top,
                left: this.widget.settings.left,
                width: this.widget.calculatedWidth,
                height: this.widget.calculatedHeight
            };

        }, null),

        p = ModuleClass.prototype;

    p.getHandles = function () {

        var self = this;
        return {
            moveHandles: undefined, /* use default*/
            pointHandles: undefined,
            resizeHandles: [{

                start: function () {
                    _retainSettings(self);
                },

                update: function (newBox, direction) {
                    self.widget.settings.top = newBox.top;
                    self.widget.settings.left = newBox.left;
                    self.widget.calculatedWidth = newBox.width;
                    self.widget.calculatedHeight = newBox.height;
                    self.widget.adjustSize();
                    self.widget.adjustPosition();
                },

                finish: function () {
                    return _compareSettings(self);
                },

                handle: function () {
                    return self.widget.elem;
                }
            }]
        };
    };

    p.getSelectionDecoratables = function () {
        return [this.widget.elem];
    };

    function _retainSettings(self) {
        self.oldSettings.top = self.widget.settings.top;
        self.oldSettings.left = self.widget.settings.left;
        self.oldSettings.width = self.widget.calculatedWidth;
        self.oldSettings.height = self.widget.calculatedHeight;
    }

    function _compareSettings(self) {

        var returnValue = {};

        if (self.widget.settings.top !== self.oldSettings.top) {
            returnValue.top = self.widget.settings.top;
        }
        if (self.widget.settings.left !== self.oldSettings.left) {
            returnValue.left = self.widget.settings.left;
        }
        if ((self.widget.calculatedWidth !== self.oldSettings.width) || (self.widget.calculatedHeight !== self.oldSettings.height)) {
            returnValue.height = self.widget.calculatedHeight;
            returnValue.width = self.widget.calculatedWidth;
        }

        return returnValue;
    }

    return ModuleClass;

});
