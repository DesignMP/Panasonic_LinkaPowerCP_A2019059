define(["require", "exports", "../userInteractionController", "../../ChartBase"], function (require, exports, userInteractionController_1, ChartBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CursorDragStrategy = /** @class */ (function () {
        function CursorDragStrategy(userInteractionController, index) {
            this.dragIsActive = false;
            this.activeCursorIndex = -1;
            this.userInteractionController = userInteractionController;
        }
        CursorDragStrategy.prototype.onMouseHover = function (chart, args, mousePoint) {
            this.userInteractionController.executeCommand(new userInteractionController_1.EventExecuteChartCommandArgs(this, userInteractionController_1.ChartCommandType.checkCursorHovering, chart, { mousePoint: mousePoint }));
        };
        CursorDragStrategy.prototype.onClick = function (chart, chartObjectTypeUnderMouse) {
            this.dragIsActive = false;
        };
        CursorDragStrategy.prototype.onDrag = function (chart, args) {
            //set the index of the cursor that is currently beeing dragged
            if (args.objectUnderMouse.args.cursorIndex != undefined && this.dragIsActive == false) {
                this.activeCursorIndex = args.objectUnderMouse.args.cursorIndex;
            }
            this.userInteractionController.executeCommand(new userInteractionController_1.EventExecuteChartCommandArgs(this, userInteractionController_1.ChartCommandType.dragCursor, chart, {
                cursorIndex: this.activeCursorIndex,
                movementX: args.mousePointChart.x,
                movementY: args.mousePointChart.y,
            }));
            this.dragIsActive = true;
        };
        CursorDragStrategy.prototype.onDragEnd = function (chart) {
            this.userInteractionController.executeCommand(new userInteractionController_1.EventExecuteChartCommandArgs(this, userInteractionController_1.ChartCommandType.endCursorDrag, chart, {}));
            this.dragIsActive = false;
            this.userInteractionController.executeCommand(new userInteractionController_1.EventExecuteChartCommandArgs(this, userInteractionController_1.ChartCommandType.resetDragPosition, null, {}));
        };
        CursorDragStrategy.prototype.onMouseDown = function (chart, chartObjectUnderMouse) {
            if (chartObjectUnderMouse.chartObjectType == ChartBase_1.ChartObjectType.cursor) {
                this.dragIsActive = true;
                this.activeCursorIndex = chartObjectUnderMouse.args.cursorIndex;
            }
            return chartObjectUnderMouse;
        };
        return CursorDragStrategy;
    }());
    exports.CursorDragStrategy = CursorDragStrategy;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29yRHJhZ1N0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0V2lkZ2V0L3VzZXJJbnRlcmFjdGlvbi9zdHJhdGVnaWVzL2N1cnNvckRyYWdTdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFNQTtRQU1JLDRCQUFZLHlCQUFxRCxFQUFFLEtBQWE7WUFIaEYsaUJBQVksR0FBRyxLQUFLLENBQUM7WUFDckIsc0JBQWlCLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFHbkIsSUFBSSxDQUFDLHlCQUF5QixHQUFHLHlCQUF5QixDQUFDO1FBQy9ELENBQUM7UUFFRCx5Q0FBWSxHQUFaLFVBQWEsS0FBa0IsRUFBRSxJQUFJLEVBQUUsVUFBVTtZQUM3QyxJQUFJLENBQUMseUJBQXlCLENBQUMsY0FBYyxDQUFDLElBQUksd0RBQTRCLENBQUMsSUFBSSxFQUFFLDRDQUFnQixDQUFDLG1CQUFtQixFQUFFLEtBQUssRUFBRSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDbEssQ0FBQztRQUVELG9DQUFPLEdBQVAsVUFBUSxLQUFrQixFQUFFLHlCQUFpRDtZQUN6RSxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUM5QixDQUFDO1FBRUQsbUNBQU0sR0FBTixVQUFPLEtBQWtCLEVBQUUsSUFBSTtZQUMzQiw4REFBOEQ7WUFDOUQsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxLQUFLLEVBQUU7Z0JBQ25GLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQzthQUNuRTtZQUVELElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxjQUFjLENBQ3pDLElBQUksd0RBQTRCLENBQUMsSUFBSSxFQUNqQyw0Q0FBZ0IsQ0FBQyxVQUFVLEVBQzNCLEtBQUssRUFDTDtnQkFDSSxXQUFXLEVBQUUsSUFBSSxDQUFDLGlCQUFpQjtnQkFDbkMsU0FBUyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDakMsU0FBUyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUNwQyxDQUNKLENBQ0osQ0FBQTtZQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBRzdCLENBQUM7UUFFRCxzQ0FBUyxHQUFULFVBQVUsS0FBa0I7WUFDeEIsSUFBSSxDQUFDLHlCQUF5QixDQUFDLGNBQWMsQ0FBQyxJQUFJLHdEQUE0QixDQUFDLElBQUksRUFBRSw0Q0FBZ0IsQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDaEksSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFFMUIsSUFBSSxDQUFDLHlCQUF5QixDQUFDLGNBQWMsQ0FBQyxJQUFJLHdEQUE0QixDQUFDLElBQUksRUFBRSw0Q0FBZ0IsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN4SSxDQUFDO1FBRUQsd0NBQVcsR0FBWCxVQUFZLEtBQWtCLEVBQUUscUJBQTZDO1lBQ3pFLElBQUkscUJBQXFCLENBQUMsZUFBZSxJQUFJLDJCQUFlLENBQUMsTUFBTSxFQUFFO2dCQUNqRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztnQkFDekIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLHFCQUFxQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7YUFDbkU7WUFFRCxPQUFPLHFCQUFxQixDQUFDO1FBQ2pDLENBQUM7UUFDTCx5QkFBQztJQUFELENBQUMsQUF2REQsSUF1REM7SUFHUSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ2hhcnRJbnRlcmFjdGlvblN0cmF0ZWd5IH0gZnJvbSBcIi4vY2hhclN0cmF0ZWd5SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENoYXJ0Q29tbWFuZFR5cGUsIEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3MgfSBmcm9tIFwiLi4vdXNlckludGVyYWN0aW9uQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgeyBJVXNlckludGVyYWN0aW9uQ29udHJvbGxlciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2NvbnRyb2xsZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVRyYWNlQ2hhcnQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy90cmFjZUNoYXJ0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENoYXJ0T2JqZWN0VHlwZSwgQ2hhcnRPYmplY3RJbmZvcm1hdGlvbiB9IGZyb20gXCIuLi8uLi9DaGFydEJhc2VcIjtcclxuXHJcbmNsYXNzIEN1cnNvckRyYWdTdHJhdGVneSBpbXBsZW1lbnRzIElDaGFydEludGVyYWN0aW9uU3RyYXRlZ3kge1xyXG4gICAgcHJpdmF0ZSB1c2VySW50ZXJhY3Rpb25Db250cm9sbGVyOiBJVXNlckludGVyYWN0aW9uQ29udHJvbGxlcjtcclxuXHJcbiAgICBkcmFnSXNBY3RpdmUgPSBmYWxzZTtcclxuICAgIGFjdGl2ZUN1cnNvckluZGV4ID0gLTE7XHJcblxyXG4gICAgY29uc3RydWN0b3IodXNlckludGVyYWN0aW9uQ29udHJvbGxlcjogSVVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIsIGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIgPSB1c2VySW50ZXJhY3Rpb25Db250cm9sbGVyO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTW91c2VIb3ZlcihjaGFydDogSVRyYWNlQ2hhcnQsIGFyZ3MsIG1vdXNlUG9pbnQpIHtcclxuICAgICAgICB0aGlzLnVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIuZXhlY3V0ZUNvbW1hbmQobmV3IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3ModGhpcywgQ2hhcnRDb21tYW5kVHlwZS5jaGVja0N1cnNvckhvdmVyaW5nLCBjaGFydCwgeyBtb3VzZVBvaW50OiBtb3VzZVBvaW50IH0pKVxyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2soY2hhcnQ6IElUcmFjZUNoYXJ0LCBjaGFydE9iamVjdFR5cGVVbmRlck1vdXNlOiBDaGFydE9iamVjdEluZm9ybWF0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5kcmFnSXNBY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRyYWcoY2hhcnQ6IElUcmFjZUNoYXJ0LCBhcmdzKSB7XHJcbiAgICAgICAgLy9zZXQgdGhlIGluZGV4IG9mIHRoZSBjdXJzb3IgdGhhdCBpcyBjdXJyZW50bHkgYmVlaW5nIGRyYWdnZWRcclxuICAgICAgICBpZiAoYXJncy5vYmplY3RVbmRlck1vdXNlLmFyZ3MuY3Vyc29ySW5kZXggIT0gdW5kZWZpbmVkICYmIHRoaXMuZHJhZ0lzQWN0aXZlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlQ3Vyc29ySW5kZXggPSBhcmdzLm9iamVjdFVuZGVyTW91c2UuYXJncy5jdXJzb3JJbmRleDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudXNlckludGVyYWN0aW9uQ29udHJvbGxlci5leGVjdXRlQ29tbWFuZChcclxuICAgICAgICAgICAgbmV3IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3ModGhpcyxcclxuICAgICAgICAgICAgICAgIENoYXJ0Q29tbWFuZFR5cGUuZHJhZ0N1cnNvcixcclxuICAgICAgICAgICAgICAgIGNoYXJ0LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvckluZGV4OiB0aGlzLmFjdGl2ZUN1cnNvckluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVtZW50WDogYXJncy5tb3VzZVBvaW50Q2hhcnQueCxcclxuICAgICAgICAgICAgICAgICAgICBtb3ZlbWVudFk6IGFyZ3MubW91c2VQb2ludENoYXJ0LnksXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApXHJcbiAgICAgICAgdGhpcy5kcmFnSXNBY3RpdmUgPSB0cnVlO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25EcmFnRW5kKGNoYXJ0OiBJVHJhY2VDaGFydCkge1xyXG4gICAgICAgIHRoaXMudXNlckludGVyYWN0aW9uQ29udHJvbGxlci5leGVjdXRlQ29tbWFuZChuZXcgRXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kQXJncyh0aGlzLCBDaGFydENvbW1hbmRUeXBlLmVuZEN1cnNvckRyYWcsIGNoYXJ0LCB7fSkpXHJcbiAgICAgICAgdGhpcy5kcmFnSXNBY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy51c2VySW50ZXJhY3Rpb25Db250cm9sbGVyLmV4ZWN1dGVDb21tYW5kKG5ldyBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzKHRoaXMsIENoYXJ0Q29tbWFuZFR5cGUucmVzZXREcmFnUG9zaXRpb24sIG51bGwsIHt9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Nb3VzZURvd24oY2hhcnQ6IElUcmFjZUNoYXJ0LCBjaGFydE9iamVjdFVuZGVyTW91c2U6IENoYXJ0T2JqZWN0SW5mb3JtYXRpb24pOiBDaGFydE9iamVjdEluZm9ybWF0aW9uIHtcclxuICAgICAgICBpZiAoY2hhcnRPYmplY3RVbmRlck1vdXNlLmNoYXJ0T2JqZWN0VHlwZSA9PSBDaGFydE9iamVjdFR5cGUuY3Vyc29yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhZ0lzQWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVDdXJzb3JJbmRleCA9IGNoYXJ0T2JqZWN0VW5kZXJNb3VzZS5hcmdzLmN1cnNvckluZGV4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNoYXJ0T2JqZWN0VW5kZXJNb3VzZTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IEN1cnNvckRyYWdTdHJhdGVneSB9Il19