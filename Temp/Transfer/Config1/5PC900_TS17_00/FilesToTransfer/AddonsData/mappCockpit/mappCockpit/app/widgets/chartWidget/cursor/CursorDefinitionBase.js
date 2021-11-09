define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CursorDefinitionBase = /** @class */ (function () {
        function CursorDefinitionBase(cursorHandlerId, cursorIndex) {
            this.cursorHandlerContainerId = cursorHandlerId;
            this.cursorPositions = [];
            this.cursorColor = "var(--main-cursor1-color)";
            this.hoverColor = "var(--main-cursor1-hover-color)";
            this.selectedColor = "var(--main-cursor1-active-color)";
        }
        /**
         *set the colors for this cursor style
         *
         * @param {string} cursorColor
         * @param {string} hoverColor
         * @param {string} selectedColor
         * @memberof CursorStyleBase
         */
        CursorDefinitionBase.prototype.setColor = function (cursorColor, hoverColor, selectedColor) {
            this.cursorColor = cursorColor;
            this.hoverColor = hoverColor;
            this.selectedColor = selectedColor;
            this.removeCursors();
            this.drawCursor(this.leadCursorPosition, this.cursorPositions);
        };
        return CursorDefinitionBase;
    }());
    exports.CursorDefinitionBase = CursorDefinitionBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3Vyc29yRGVmaW5pdGlvbkJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY2hhcnRXaWRnZXQvY3Vyc29yL0N1cnNvckRlZmluaXRpb25CYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUdBO1FBV0ksOEJBQVksZUFBdUIsRUFBRSxXQUFtQjtZQUNwRCxJQUFJLENBQUMsd0JBQXdCLEdBQUcsZUFBZSxDQUFDO1lBQ2hELElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxXQUFXLEdBQUcsMkJBQTJCLENBQUM7WUFDL0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxpQ0FBaUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsYUFBYSxHQUFHLGtDQUFrQyxDQUFDO1FBQzVELENBQUM7UUFpQ0Q7Ozs7Ozs7V0FPRztRQUNJLHVDQUFRLEdBQWYsVUFBZ0IsV0FBbUIsRUFBRSxVQUFrQixFQUFFLGFBQXFCO1lBQzFFLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBQy9CLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1lBQzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1lBQ25DLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbkUsQ0FBQztRQUNMLDJCQUFDO0lBQUQsQ0FBQyxBQWpFRCxJQWlFQztJQWpFcUIsb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jb21tb24vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDdXJzb3JQb3NpdGlvbiB9IGZyb20gXCIuL0N1cnNvclBvc2l0aW9uSW5mb1wiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEN1cnNvckRlZmluaXRpb25CYXNlIHtcclxuICAgIHByb3RlY3RlZCBjdXJzb3JIYW5kbGVyQ29udGFpbmVySWQ6IHN0cmluZztcclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIGN1cnNvclBvc2l0aW9uczogQ3Vyc29yUG9zaXRpb25bXTtcclxuICAgIHByb3RlY3RlZCBsZWFkQ3Vyc29yUG9zaXRpb247XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCBjdXJzb3JDb2xvcjogc3RyaW5nO1xyXG4gICAgcHJvdGVjdGVkIGhvdmVyQ29sb3I6IHN0cmluZztcclxuICAgIHByb3RlY3RlZCBzZWxlY3RlZENvbG9yOiBzdHJpbmc7XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGN1cnNvckhhbmRsZXJJZDogc3RyaW5nLCBjdXJzb3JJbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5jdXJzb3JIYW5kbGVyQ29udGFpbmVySWQgPSBjdXJzb3JIYW5kbGVySWQ7XHJcbiAgICAgICAgdGhpcy5jdXJzb3JQb3NpdGlvbnMgPSBbXTtcclxuICAgICAgICB0aGlzLmN1cnNvckNvbG9yID0gXCJ2YXIoLS1tYWluLWN1cnNvcjEtY29sb3IpXCI7XHJcbiAgICAgICAgdGhpcy5ob3ZlckNvbG9yID0gXCJ2YXIoLS1tYWluLWN1cnNvcjEtaG92ZXItY29sb3IpXCI7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZENvbG9yID0gXCJ2YXIoLS1tYWluLWN1cnNvcjEtYWN0aXZlLWNvbG9yKVwiO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKnNldCB0aGUgY3Vyc29yIHBvc2l0aW9ucyBmb3IgdGhpcyBjdXJzb3Igc3R5bGVcclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yUG9zaXRpb259IGxlYWRDdXJzb3JQb3NpdGlvblxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JQb3NpdGlvbltdfSBjdXJzb3JQb3NpdGlvbnNcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTdHlsZUJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IGRyYXdDdXJzb3IobGVhZEN1cnNvclBvc2l0aW9uOiBDdXJzb3JQb3NpdGlvbiwgY3Vyc29yUG9zaXRpb25zOiBDdXJzb3JQb3NpdGlvbltdKTogdm9pZDtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKnJlbW92ZSBhbGwgY3Vyc29ycyBkcmF3biBieSB0aGlzIGN1cnNvciBzdHlsZVxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclN0eWxlQmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgcmVtb3ZlQ3Vyc29ycygpO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqZ2V0IHRoZSBjbG9zZXN0IGN1cnNvciBwb3NpdGlvbiBzZXQgZm9yIHRoaXMgY3Vyc29yIHN0eWxlXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0ge0lQb2ludH0gcG9pbnRcclxuICAgICAqIEByZXR1cm5zIHsoQ3Vyc29yUG9zaXRpb24gfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclN0eWxlQmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0Q2xvc2VzdEN1cnNvclBvc2l0aW9uVG9Qb2ludChwb2ludDogSVBvaW50KTogQ3Vyc29yUG9zaXRpb24gfCB1bmRlZmluZWQ7XHJcbiAgIFxyXG4gICAgLyoqXHJcbiAgICAgKnNldCB0aGUgY29sb3JzIGZvciB0aGlzIGN1cnNvciBzdHlsZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjdXJzb3JDb2xvclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGhvdmVyQ29sb3JcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RlZENvbG9yXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU3R5bGVCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRDb2xvcihjdXJzb3JDb2xvcjogc3RyaW5nLCBob3ZlckNvbG9yOiBzdHJpbmcsIHNlbGVjdGVkQ29sb3I6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuY3Vyc29yQ29sb3IgPSBjdXJzb3JDb2xvcjtcclxuICAgICAgICB0aGlzLmhvdmVyQ29sb3IgPSBob3ZlckNvbG9yO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDb2xvciA9IHNlbGVjdGVkQ29sb3I7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVDdXJzb3JzKCk7XHJcbiAgICAgICAgdGhpcy5kcmF3Q3Vyc29yKHRoaXMubGVhZEN1cnNvclBvc2l0aW9uLCB0aGlzLmN1cnNvclBvc2l0aW9ucyk7XHJcbiAgICB9XHJcbn1cclxuIl19