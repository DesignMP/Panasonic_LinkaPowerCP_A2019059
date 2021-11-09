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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
define(["require", "exports", "./treeGridWidgetBase"], function (require, exports, treeGridWidgetBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OverviewTreeGridWidgetBase = /** @class */ (function (_super) {
        __extends(OverviewTreeGridWidgetBase, _super);
        function OverviewTreeGridWidgetBase() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Defines the height of the header
         *
         * @returns {number}
         * @memberof OverviewTreeGridWidgetBase
         */
        OverviewTreeGridWidgetBase.prototype.defineHeaderHeight = function () {
            return 30;
        };
        OverviewTreeGridWidgetBase.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            _super.prototype.setHeaderContent.call(this, this.getHeaderText());
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 1, 100);
        };
        /**
         * creates the tree grid for the items overview
         *
         * @protected
         * @memberof OverviewTreeGridWidgetBase
         */
        OverviewTreeGridWidgetBase.prototype.createTreeGrid = function () {
            var _this = this;
            $(this.mainDiv).ejTreeGrid(__assign(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), this.getTreeGridColumnSorting()), { recordDoubleClick: function (args) { return _this.doubleClick(args); }, queryCellInfo: function (args) {
                    if (args.column.field == "commandButtons") {
                        _this.addCommandButtons(args);
                    }
                } }));
        };
        /**
         * Loads the styles for the overview treegrid widget base
         *
         * @memberof OverviewTreeGridWidgetBase
         */
        OverviewTreeGridWidgetBase.prototype.loadStyles = function () {
            _super.prototype.loadStyles.call(this);
            this.addStyle("widgets/common/style/css/overviewCommandButtonStyle.css");
        };
        OverviewTreeGridWidgetBase.prototype.addCommandButtons = function (args) {
            args.cellElement.innerHTML = "";
            var cellRowIndex = args.data.index;
            var commandIds = this.getCommandIdsFromItem(args.data.item);
            // Add divs for the buttons
            for (var index = 0; index < commandIds.length; index++) {
                var commandId = commandIds[index];
                var uniqueId = this.getUniqueButtonId(commandId, cellRowIndex);
                args.cellElement.innerHTML += "<div id='" + uniqueId + "' ></div>   ";
            }
            ;
            // Create ejButtons within the divs (after all divs were inserted in the innerHTML, otherwise problems occur)
            for (var index = 0; index < commandIds.length; index++) {
                var commandId = commandIds[index];
                var uniqueId = this.getUniqueButtonId(commandId, cellRowIndex);
                this.createButton(uniqueId, commandId, args.data.item);
            }
            ;
        };
        OverviewTreeGridWidgetBase.prototype.createButton = function (uniqueId, commandId, item) {
            var _this = this;
            var buttonObj = $(this.mainDiv).find("#" + uniqueId);
            buttonObj.ejButton({
                text: this.getNameForCommandId(commandId),
                contentType: ej.ContentType.TextAndImage,
                cssClass: "overviewCommandButton",
                prefixIcon: "e-icon",
                click: function (clickArgs) { return _this.click(item, commandId); },
            });
            var imagePath = this.getIconForCommandId(commandId);
            var buttonElement = buttonObj[0];
            buttonElement.style.backgroundPositionX = "3px";
            buttonElement.style.backgroundPositionY = "2px";
            buttonElement.style.backgroundImage = "url('" + imagePath + "')";
            buttonElement.style.backgroundRepeat = "no-repeat";
            buttonElement.style.backgroundSize = "16px 16px";
        };
        OverviewTreeGridWidgetBase.prototype.getUniqueButtonId = function (commandId, cellRowIndex) {
            return "overviewCommandButton" + commandId + cellRowIndex;
        };
        OverviewTreeGridWidgetBase.prototype.getTreeGridColumnResizeSupport = function () {
            var _this = this;
            return {
                allowColumnResize: true,
                columnResizeSettings: { columnResizeMode: ej.TreeGrid.ColumnResizeMode.FixedColumns },
                columnResized: function (args) { return _super.prototype.resizeDynamicColumn.call(_this, args.columnIndex, args.model); },
            };
        };
        OverviewTreeGridWidgetBase.prototype.getTreeGridColumnSorting = function () {
            return {
                allowSorting: false,
            };
        };
        return OverviewTreeGridWidgetBase;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.OverviewTreeGridWidgetBase = OverviewTreeGridWidgetBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tbW9uL292ZXJ2aWV3VHJlZUdyaWRXaWRnZXRCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVBO1FBQWtELDhDQUFrQjtRQUFwRTs7UUEwSEEsQ0FBQztRQXhIRzs7Ozs7V0FLRztRQUNILHVEQUFrQixHQUFsQjtZQUNJLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQztRQUVELGdEQUFXLEdBQVg7WUFDSSxpQkFBTSxXQUFXLFdBQUUsQ0FBQztZQUVwQixpQkFBTSxnQkFBZ0IsWUFBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztZQUU3Qyw4QkFBOEI7WUFDOUIsaUJBQU0sZ0JBQWdCLFlBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNPLG1EQUFjLEdBQXhCO1lBQUEsaUJBYUM7WUFaRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUseUNBQ25CLElBQUksQ0FBQywyQkFBMkIsRUFBRSxHQUNsQyxJQUFJLENBQUMsOEJBQThCLEVBQUUsR0FDckMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLEtBRWxDLGlCQUFpQixFQUFFLFVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBdEIsQ0FBc0IsRUFDbkQsYUFBYSxFQUFFLFVBQUMsSUFBSTtvQkFDaEIsSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxnQkFBZ0IsRUFBQzt3QkFDckMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUNoQztnQkFDTCxDQUFDLElBQ0gsQ0FBQztRQUNQLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gs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LEdBQXRDO1lBQUEsaUJBTUk7WUFMRyxPQUFPO2dCQUNILGlCQUFpQixFQUFFLElBQUk7Z0JBQ3ZCLG9CQUFvQixFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUU7Z0JBQ3JGLGFBQWEsRUFBRSxVQUFDLElBQUksSUFBSyxPQUFBLGlCQUFNLG1CQUFtQixhQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUF2RCxDQUF1RDthQUNuRixDQUFDO1FBQ04sQ0FBQztRQUVTLDZEQUF3QixHQUFsQztZQUNJLE9BQU87Z0JBQ0gsWUFBWSxFQUFFLEtBQUs7YUFDdEIsQ0FBQztRQUNOLENBQUM7UUFhTCxpQ0FBQztJQUFELENBQUMsQUExSEQsQ0FBa0QsdUNBQWtCLEdBMEhuRTtJQUVPLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyZWVHcmlkV2lkZ2V0QmFzZSB9IGZyb20gXCIuL3RyZWVHcmlkV2lkZ2V0QmFzZVwiO1xyXG5cclxuYWJzdHJhY3QgY2xhc3MgT3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2UgZXh0ZW5kcyBUcmVlR3JpZFdpZGdldEJhc2V7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHRoZSBoZWlnaHQgb2YgdGhlIGhlYWRlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgT3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgZGVmaW5lSGVhZGVySGVpZ2h0KCk6IG51bWJlcntcclxuICAgICAgICByZXR1cm4gMzA7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZWQoKXtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplZCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHN1cGVyLnNldEhlYWRlckNvbnRlbnQodGhpcy5nZXRIZWFkZXJUZXh0KCkpO1xyXG5cclxuICAgICAgICAvLyBTZXQgZHluYW1pYyBjb2x1bW4gc2V0dGluZ3NcclxuICAgICAgICBzdXBlci5zZXREeW5hbWljQ29sdW1uKDEsIDEwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGVzIHRoZSB0cmVlIGdyaWQgZm9yIHRoZSBpdGVtcyBvdmVydmlld1xyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBtZW1iZXJvZiBPdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlVHJlZUdyaWQoKSB7IFxyXG4gICAgICAgICQodGhpcy5tYWluRGl2KS5lalRyZWVHcmlkKHtcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKSxcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENvbHVtblJlc2l6ZVN1cHBvcnQoKSxcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENvbHVtblNvcnRpbmcoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJlY29yZERvdWJsZUNsaWNrOiAoYXJncykgPT4gdGhpcy5kb3VibGVDbGljayhhcmdzKSxcclxuICAgICAgICAgICAgcXVlcnlDZWxsSW5mbzogKGFyZ3MpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGFyZ3MuY29sdW1uLmZpZWxkID09IFwiY29tbWFuZEJ1dHRvbnNcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDb21tYW5kQnV0dG9ucyhhcmdzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIHRoZSBzdHlsZXMgZm9yIHRoZSBvdmVydmlldyB0cmVlZ3JpZCB3aWRnZXQgYmFzZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBPdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBsb2FkU3R5bGVzKCl7XHJcbiAgICAgICAgc3VwZXIubG9hZFN0eWxlcygpO1xyXG4gICAgICAgIHRoaXMuYWRkU3R5bGUoXCJ3aWRnZXRzL2NvbW1vbi9zdHlsZS9jc3Mvb3ZlcnZpZXdDb21tYW5kQnV0dG9uU3R5bGUuY3NzXCIpO1xyXG4gICAgfVxyXG5cclxuXHRwcml2YXRlIGFkZENvbW1hbmRCdXR0b25zKGFyZ3Mpe1xyXG4gICAgICAgIGFyZ3MuY2VsbEVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgXHJcbiAgICAgICAgdmFyIGNlbGxSb3dJbmRleCA9IGFyZ3MuZGF0YS5pbmRleDtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgY29tbWFuZElkcyA9IHRoaXMuZ2V0Q29tbWFuZElkc0Zyb21JdGVtKGFyZ3MuZGF0YS5pdGVtKTtcclxuICAgICAgICAvLyBBZGQgZGl2cyBmb3IgdGhlIGJ1dHRvbnNcclxuICAgICAgICBmb3IobGV0IGluZGV4PTA7IGluZGV4IDwgY29tbWFuZElkcy5sZW5ndGg7IGluZGV4Kyspe1xyXG4gICAgICAgICAgICBsZXQgY29tbWFuZElkID0gY29tbWFuZElkc1tpbmRleF07XHJcbiAgICAgICAgICAgIGxldCB1bmlxdWVJZCA9IHRoaXMuZ2V0VW5pcXVlQnV0dG9uSWQoY29tbWFuZElkLCBjZWxsUm93SW5kZXgpO1xyXG4gICAgICAgICAgICBhcmdzLmNlbGxFbGVtZW50LmlubmVySFRNTCArPSBcIjxkaXYgaWQ9J1wiICsgdW5pcXVlSWQgKyBcIicgPjwvZGl2PiAgIFwiO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBlakJ1dHRvbnMgd2l0aGluIHRoZSBkaXZzIChhZnRlciBhbGwgZGl2cyB3ZXJlIGluc2VydGVkIGluIHRoZSBpbm5lckhUTUwsIG90aGVyd2lzZSBwcm9ibGVtcyBvY2N1cilcclxuICAgICAgICBmb3IobGV0IGluZGV4PTA7IGluZGV4IDwgY29tbWFuZElkcy5sZW5ndGg7IGluZGV4Kyspe1xyXG4gICAgICAgICAgICBsZXQgY29tbWFuZElkID0gY29tbWFuZElkc1tpbmRleF07XHJcbiAgICAgICAgICAgIGxldCB1bmlxdWVJZCA9IHRoaXMuZ2V0VW5pcXVlQnV0dG9uSWQoY29tbWFuZElkLCBjZWxsUm93SW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUJ1dHRvbih1bmlxdWVJZCwgY29tbWFuZElkLCBhcmdzLmRhdGEuaXRlbSlcclxuICAgICAgICB9O1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBjcmVhdGVCdXR0b24odW5pcXVlSWQsIGNvbW1hbmRJZDogc3RyaW5nLCBpdGVtKXtcclxuICAgICAgICBsZXQgYnV0dG9uT2JqID0gJCh0aGlzLm1haW5EaXYpLmZpbmQoXCIjXCIgKyB1bmlxdWVJZCk7XHJcbiAgICAgICAgYnV0dG9uT2JqLmVqQnV0dG9uKHtcclxuICAgICAgICAgICAgdGV4dDogdGhpcy5nZXROYW1lRm9yQ29tbWFuZElkKGNvbW1hbmRJZCksXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBlai5Db250ZW50VHlwZS5UZXh0QW5kSW1hZ2UsXHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiBcIm92ZXJ2aWV3Q29tbWFuZEJ1dHRvblwiLFxyXG4gICAgICAgICAgICBwcmVmaXhJY29uOiBcImUtaWNvblwiICwvL1NwZWNpZmllcyB0aGUgcHJpbWFyeSBpY29uIGZvciBCdXR0b25cclxuICAgICAgICAgICAgY2xpY2s6IChjbGlja0FyZ3MpID0+IHRoaXMuY2xpY2soaXRlbSwgY29tbWFuZElkKSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGltYWdlUGF0aCA9IHRoaXMuZ2V0SWNvbkZvckNvbW1hbmRJZChjb21tYW5kSWQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBidXR0b25FbGVtZW50ID0gYnV0dG9uT2JqWzBdO1xyXG4gICAgICAgIGJ1dHRvbkVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uWCA9IFwiM3B4XCI7XHJcbiAgICAgICAgYnV0dG9uRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb25ZID0gXCIycHhcIjtcclxuICAgICAgICBidXR0b25FbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCdcIiArIGltYWdlUGF0aCArXCInKVwiO1xyXG4gICAgICAgIGJ1dHRvbkVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFJlcGVhdCA9IFwibm8tcmVwZWF0XCI7XHJcbiAgICAgICAgYnV0dG9uRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9IFwiMTZweCAxNnB4XCI7XHJcblx0fVxyXG5cdFx0XHJcblx0cHJpdmF0ZSBnZXRVbmlxdWVCdXR0b25JZChjb21tYW5kSWQ6IHN0cmluZywgY2VsbFJvd0luZGV4KTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBcIm92ZXJ2aWV3Q29tbWFuZEJ1dHRvblwiICsgY29tbWFuZElkICsgY2VsbFJvd0luZGV4O1xyXG5cdH1cclxuXHRcclxuXHRwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpOiB7fXtcclxuICAgICAgICByZXR1cm4geyAgICAgICAgXHJcbiAgICAgICAgICAgIGFsbG93Q29sdW1uUmVzaXplOiB0cnVlLFxyXG4gICAgICAgICAgICBjb2x1bW5SZXNpemVTZXR0aW5nczogeyBjb2x1bW5SZXNpemVNb2RlOiBlai5UcmVlR3JpZC5Db2x1bW5SZXNpemVNb2RlLkZpeGVkQ29sdW1ucyB9LFxyXG4gICAgICAgICAgICBjb2x1bW5SZXNpemVkOiAoYXJncykgPT4gc3VwZXIucmVzaXplRHluYW1pY0NvbHVtbihhcmdzLmNvbHVtbkluZGV4LCBhcmdzLm1vZGVsKSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBnZXRUcmVlR3JpZENvbHVtblNvcnRpbmcoKToge317XHJcbiAgICAgICAgcmV0dXJuIHsgICAgICAgIFxyXG4gICAgICAgICAgICBhbGxvd1NvcnRpbmc6IGZhbHNlLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG5cdHByb3RlY3RlZCBhYnN0cmFjdCBnZXRIZWFkZXJUZXh0KCk6IHN0cmluZztcclxuXHJcblx0cHJvdGVjdGVkIGFic3RyYWN0IGdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpOiB7fTtcclxuXHJcblx0cHJvdGVjdGVkIGFic3RyYWN0IGdldE5hbWVGb3JDb21tYW5kSWQoY29tbWFuZElkOiBzdHJpbmcpOiBzdHJpbmc7XHJcblx0cHJvdGVjdGVkIGFic3RyYWN0IGdldEljb25Gb3JDb21tYW5kSWQoY29tbWFuZElkOiBzdHJpbmcpOiBzdHJpbmc7XHJcblxyXG5cdHByb3RlY3RlZCBhYnN0cmFjdCBnZXRDb21tYW5kSWRzRnJvbUl0ZW0oaXRlbSk6IEFycmF5PHN0cmluZz47XHJcblx0XHJcblx0cHJvdGVjdGVkIGFic3RyYWN0IGNsaWNrKGl0ZW0sIGNvbW1hbmRJZCk7XHJcblx0cHJvdGVjdGVkIGFic3RyYWN0IGRvdWJsZUNsaWNrKGFyZ3MpO1xyXG59XHJcblxyXG5leHBvcnQge092ZXJ2aWV3VHJlZUdyaWRXaWRnZXRCYXNlfTsiXX0=