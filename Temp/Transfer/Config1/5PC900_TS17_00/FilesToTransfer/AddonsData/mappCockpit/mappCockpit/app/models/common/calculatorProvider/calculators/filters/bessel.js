define(["require", "exports", "./bilinearTransformation", "./stateSpaceCalculator"], function (require, exports, bilinearTransformation_1, stateSpaceCalculator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Bessel = /** @class */ (function () {
        function Bessel(order, cutoffFrequencyHz, Ts) {
            /* Frequency scaling factors for bessel filter */
            this.KB2 = 1.272;
            this.KB3 = 1.405;
            this.KB4 = 1.514;
            this.KB5 = 1.622;
            /*Coefficients of a normalised Bessel filter*/
            this.B21 = 1.732050807588;
            this.B31 = 2.432880798339;
            this.B32 = 2.466212074330;
            this.B41 = 3.123939936920;
            this.B42 = 4.391550328368;
            this.B43 = 3.201085872943;
            this.B51 = 3.810701205349;
            this.B52 = 6.776673715676;
            this.B53 = 6.886367652423;
            this.B54 = 3.936283427035;
            this.Num = [];
            this.Den = [];
            // initialize the numerator and denumerator for the bessel filter
            this.initNumDen(order, cutoffFrequencyHz);
            // convert the parameters into the discrete time system "world"
            var bilinearTransformation = new bilinearTransformation_1.BilinearTransformation(order, Ts, this.Num, this.Den);
            // create and init the state space object
            this.stateSpaceCalculator = new stateSpaceCalculator_1.StateSpaceCalculator(order, bilinearTransformation.bz, bilinearTransformation.az, this.Num[0], this.Den[0]);
        }
        Object.defineProperty(Bessel, "filterOrderMax", {
            /**
             * Returns the highest supported filterorder.
             *
             * @readonly
             * @static
             * @type {number}
             * @memberof Bessel
             */
            get: function () {
                return this._filterOrderMax;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Bessel, "filterOrderMin", {
            /**
             * Returns the lowest supported filterorder.
             *
             * @readonly
             * @static
             * @type {number}
             * @memberof Bessel
             */
            get: function () {
                return this._filterOrderMin;
            },
            enumerable: true,
            configurable: true
        });
        Bessel.prototype.initNumDen = function (order, cutoffFrequencyHz) {
            /* tslint:disable:max-func-body-length */ // disabled due to switch case
            var wc = 2 * Math.PI * cutoffFrequencyHz;
            switch (order) {
                case 1:
                    this.Num[0] = wc;
                    this.Num[1] = 0;
                    this.Num[2] = 0;
                    this.Num[3] = 0;
                    this.Num[4] = 0;
                    this.Num[5] = 0;
                    this.Den[0] = wc;
                    this.Den[1] = 1;
                    this.Den[2] = 0;
                    this.Den[3] = 0;
                    this.Den[4] = 0;
                    this.Den[5] = 0;
                    break;
                case 2:
                    wc = wc * this.KB2;
                    this.Num[0] = Math.pow(wc, 2);
                    this.Num[1] = 0;
                    this.Num[2] = 0;
                    this.Num[3] = 0;
                    this.Num[4] = 0;
                    this.Num[5] = 0;
                    this.Den[0] = Math.pow(wc, 2);
                    this.Den[1] = this.B21 * wc;
                    this.Den[2] = 1;
                    this.Den[3] = 0;
                    this.Den[4] = 0;
                    this.Den[5] = 0;
                    break;
                case 3:
                    wc = wc * this.KB3;
                    this.Num[0] = Math.pow(wc, 3);
                    this.Num[1] = 0;
                    this.Num[2] = 0;
                    this.Num[3] = 0;
                    this.Num[4] = 0;
                    this.Num[5] = 0;
                    this.Den[0] = Math.pow(wc, 3);
                    this.Den[1] = this.B32 * Math.pow(wc, 2);
                    this.Den[2] = this.B31 * wc;
                    this.Den[3] = 1;
                    this.Den[4] = 0;
                    this.Den[5] = 0;
                    break;
                case 4:
                    wc = wc * this.KB4;
                    this.Num[0] = Math.pow(wc, 4);
                    this.Num[1] = 0;
                    this.Num[2] = 0;
                    this.Num[3] = 0;
                    this.Num[4] = 0;
                    this.Num[5] = 0;
                    this.Den[0] = Math.pow(wc, 4);
                    this.Den[1] = this.B43 * Math.pow(wc, 3);
                    this.Den[2] = this.B42 * Math.pow(wc, 2);
                    this.Den[3] = this.B41 * wc;
                    this.Den[4] = 1;
                    this.Den[5] = 0;
                    break;
                case 5:
                    wc = wc * this.KB5;
                    this.Num[0] = Math.pow(wc, 5);
                    this.Num[1] = 0;
                    this.Num[2] = 0;
                    this.Num[3] = 0;
                    this.Num[4] = 0;
                    this.Num[5] = 0;
                    this.Den[0] = Math.pow(wc, 5);
                    this.Den[1] = this.B54 * Math.pow(wc, 4);
                    this.Den[2] = this.B53 * Math.pow(wc, 3);
                    this.Den[3] = this.B52 * Math.pow(wc, 2);
                    this.Den[4] = this.B51 * wc;
                    this.Den[5] = 1;
                    break;
            }
            /* tslint:enable:max-func-body-length */
        };
        Bessel.prototype.filter = function (inputSignal) {
            return this.stateSpaceCalculator.ClcOutputVector(inputSignal);
        };
        Bessel._filterOrderMin = 1;
        Bessel._filterOrderMax = 5;
        return Bessel;
    }());
    exports.Bessel = Bessel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVzc2VsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdG9ycy9maWx0ZXJzL2Jlc3NlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFHQTtRQW9ESSxnQkFBWSxLQUFZLEVBQUUsaUJBQXdCLEVBQUUsRUFBUztZQXZCN0QsaURBQWlEO1lBQ3pDLFFBQUcsR0FBVyxLQUFLLENBQUM7WUFDcEIsUUFBRyxHQUFXLEtBQUssQ0FBQztZQUNwQixRQUFHLEdBQVcsS0FBSyxDQUFDO1lBQ3BCLFFBQUcsR0FBVyxLQUFLLENBQUM7WUFFNUIsOENBQThDO1lBQ3RDLFFBQUcsR0FBVyxjQUFjLENBQUM7WUFDN0IsUUFBRyxHQUFXLGNBQWMsQ0FBQztZQUM3QixRQUFHLEdBQVcsY0FBYyxDQUFDO1lBQzdCLFFBQUcsR0FBVyxjQUFjLENBQUM7WUFDN0IsUUFBRyxHQUFXLGNBQWMsQ0FBQztZQUM3QixRQUFHLEdBQVcsY0FBYyxDQUFDO1lBQzdCLFFBQUcsR0FBVyxjQUFjLENBQUM7WUFDN0IsUUFBRyxHQUFXLGNBQWMsQ0FBQztZQUM3QixRQUFHLEdBQVcsY0FBYyxDQUFDO1lBQzdCLFFBQUcsR0FBVyxjQUFjLENBQUM7WUFFN0IsUUFBRyxHQUFjLEVBQUUsQ0FBQztZQUNwQixRQUFHLEdBQWMsRUFBRSxDQUFDO1lBS3hCLGlFQUFpRTtZQUNqRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBQzFDLCtEQUErRDtZQUMvRCxJQUFJLHNCQUFzQixHQUE0QixJQUFJLCtDQUFzQixDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFaEgseUNBQXlDO1lBQ3pDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLDJDQUFvQixDQUFDLEtBQUssRUFBRSxzQkFBc0IsQ0FBQyxFQUFFLEVBQUUsc0JBQXNCLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hKLENBQUM7UUEvQ0Qsc0JBQWtCLHdCQUFjO1lBUmhDOzs7Ozs7O2VBT0c7aUJBQ0g7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO1lBQ2hDLENBQUM7OztXQUFBO1FBVUQsc0JBQWtCLHdCQUFjO1lBUmhDOzs7Ozs7O2VBT0c7aUJBQ0g7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO1lBQ2hDLENBQUM7OztXQUFBO1FBbUNPLDJCQUFVLEdBQWxCLFVBQW1CLEtBQWMsRUFBRSxpQkFBMEI7WUFDekQseUNBQXlDLENBQUMsOEJBQThCO1lBQ3hFLElBQUksRUFBRSxHQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLGlCQUFpQixDQUFDO1lBQ2xELFFBQVEsS0FBSyxFQUNiO2dCQUNBLEtBQUssQ0FBQztvQkFDRixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixNQUFNO2dCQUNWLEtBQUssQ0FBQztvQkFDRixFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7b0JBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztvQkFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hCLE1BQU07Z0JBQ1YsS0FBSyxDQUFDO29CQUNGLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7b0JBQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hCLE1BQU07Z0JBQ1YsS0FBSyxDQUFDO29CQUNGLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztvQkFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixNQUFNO2dCQUNWLEtBQUssQ0FBQztvQkFDRixFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7b0JBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4QyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztvQkFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hCLE1BQU07YUFDVDtZQUNELHdDQUF3QztRQUM1QyxDQUFDO1FBRUQsdUJBQU0sR0FBTixVQUFPLFdBQXNCO1lBQ3pCLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNsRSxDQUFDO1FBakp1QixzQkFBZSxHQUFXLENBQUMsQ0FBQztRQUM1QixzQkFBZSxHQUFXLENBQUMsQ0FBQztRQWlKeEQsYUFBQztLQUFBLEFBcEpELElBb0pDO0lBcEpZLHdCQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmlsaW5lYXJUcmFuc2Zvcm1hdGlvbiB9IGZyb20gXCIuL2JpbGluZWFyVHJhbnNmb3JtYXRpb25cIjtcclxuaW1wb3J0IHsgU3RhdGVTcGFjZUNhbGN1bGF0b3IgfSBmcm9tIFwiLi9zdGF0ZVNwYWNlQ2FsY3VsYXRvclwiO1xyXG4gICBcclxuZXhwb3J0IGNsYXNzIEJlc3NlbCBpbXBsZW1lbnRzIElMb3dQYXNzRmlsdGVye1xyXG4gICAgXHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBfZmlsdGVyT3JkZXJNaW46IG51bWJlciA9IDE7XHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBfZmlsdGVyT3JkZXJNYXg6IG51bWJlciA9IDU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBoaWdoZXN0IHN1cHBvcnRlZCBmaWx0ZXJvcmRlci5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgQmVzc2VsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGZpbHRlck9yZGVyTWF4KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlck9yZGVyTWF4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbG93ZXN0IHN1cHBvcnRlZCBmaWx0ZXJvcmRlci5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgQmVzc2VsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGZpbHRlck9yZGVyTWluKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlck9yZGVyTWluO1xyXG4gICAgfVxyXG5cclxuICAgIC8qIEZyZXF1ZW5jeSBzY2FsaW5nIGZhY3RvcnMgZm9yIGJlc3NlbCBmaWx0ZXIgKi9cclxuICAgIHByaXZhdGUgS0IyIDpudW1iZXIgPSAxLjI3MjtcclxuICAgIHByaXZhdGUgS0IzIDpudW1iZXIgPSAxLjQwNTtcclxuICAgIHByaXZhdGUgS0I0IDpudW1iZXIgPSAxLjUxNDtcclxuICAgIHByaXZhdGUgS0I1IDpudW1iZXIgPSAxLjYyMjtcclxuXHJcbiAgICAvKkNvZWZmaWNpZW50cyBvZiBhIG5vcm1hbGlzZWQgQmVzc2VsIGZpbHRlciovXHJcbiAgICBwcml2YXRlIEIyMSA6bnVtYmVyID0gMS43MzIwNTA4MDc1ODg7XHJcbiAgICBwcml2YXRlIEIzMSA6bnVtYmVyID0gMi40MzI4ODA3OTgzMzk7XHJcbiAgICBwcml2YXRlIEIzMiA6bnVtYmVyID0gMi40NjYyMTIwNzQzMzA7XHJcbiAgICBwcml2YXRlIEI0MSA6bnVtYmVyID0gMy4xMjM5Mzk5MzY5MjA7XHJcbiAgICBwcml2YXRlIEI0MiA6bnVtYmVyID0gNC4zOTE1NTAzMjgzNjg7XHJcbiAgICBwcml2YXRlIEI0MyA6bnVtYmVyID0gMy4yMDEwODU4NzI5NDM7XHJcbiAgICBwcml2YXRlIEI1MSA6bnVtYmVyID0gMy44MTA3MDEyMDUzNDk7XHJcbiAgICBwcml2YXRlIEI1MiA6bnVtYmVyID0gNi43NzY2NzM3MTU2NzY7XHJcbiAgICBwcml2YXRlIEI1MyA6bnVtYmVyID0gNi44ODYzNjc2NTI0MjM7XHJcbiAgICBwcml2YXRlIEI1NCA6bnVtYmVyID0gMy45MzYyODM0MjcwMzU7XHJcbiAgIFxyXG4gICAgcHJpdmF0ZSBOdW0gOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBEZW4gOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIHN0YXRlU3BhY2VDYWxjdWxhdG9yIDogU3RhdGVTcGFjZUNhbGN1bGF0b3I7XHJcbiAgICAgICAgXHJcbiAgICBjb25zdHJ1Y3RvcihvcmRlcjpudW1iZXIsIGN1dG9mZkZyZXF1ZW5jeUh6Om51bWJlciwgVHM6bnVtYmVyKXtcclxuICAgICAgICAvLyBpbml0aWFsaXplIHRoZSBudW1lcmF0b3IgYW5kIGRlbnVtZXJhdG9yIGZvciB0aGUgYmVzc2VsIGZpbHRlclxyXG4gICAgICAgIHRoaXMuaW5pdE51bURlbihvcmRlciwgY3V0b2ZmRnJlcXVlbmN5SHopO1xyXG4gICAgICAgIC8vIGNvbnZlcnQgdGhlIHBhcmFtZXRlcnMgaW50byB0aGUgZGlzY3JldGUgdGltZSBzeXN0ZW0gXCJ3b3JsZFwiXHJcbiAgICAgICAgdmFyIGJpbGluZWFyVHJhbnNmb3JtYXRpb24gOiBCaWxpbmVhclRyYW5zZm9ybWF0aW9uID0gbmV3IEJpbGluZWFyVHJhbnNmb3JtYXRpb24ob3JkZXIsIFRzLCB0aGlzLk51bSwgdGhpcy5EZW4pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGNyZWF0ZSBhbmQgaW5pdCB0aGUgc3RhdGUgc3BhY2Ugb2JqZWN0XHJcbiAgICAgICAgdGhpcy5zdGF0ZVNwYWNlQ2FsY3VsYXRvciA9IG5ldyBTdGF0ZVNwYWNlQ2FsY3VsYXRvcihvcmRlciwgYmlsaW5lYXJUcmFuc2Zvcm1hdGlvbi5ieiwgYmlsaW5lYXJUcmFuc2Zvcm1hdGlvbi5heiwgdGhpcy5OdW1bMF0sIHRoaXMuRGVuWzBdKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBpbml0TnVtRGVuKG9yZGVyIDogbnVtYmVyLCBjdXRvZmZGcmVxdWVuY3lIeiA6IG51bWJlcikgLypNVEZpbHRlckxvd1Bhc3NfQmVzc2VsKi8ge1xyXG4gICAgICAgIC8qIHRzbGludDpkaXNhYmxlOm1heC1mdW5jLWJvZHktbGVuZ3RoICovIC8vIGRpc2FibGVkIGR1ZSB0byBzd2l0Y2ggY2FzZVxyXG4gICAgICAgIHZhciB3YyA6IG51bWJlciA9IDIgKiBNYXRoLlBJICogY3V0b2ZmRnJlcXVlbmN5SHo7IFxyXG4gICAgICAgIHN3aXRjaCAob3JkZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgdGhpcy5OdW1bMF0gPSB3YztcclxuICAgICAgICAgICAgdGhpcy5OdW1bMV0gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLk51bVsyXSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuTnVtWzNdID0gMDtcclxuICAgICAgICAgICAgdGhpcy5OdW1bNF0gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLk51bVs1XSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuRGVuWzBdID0gd2M7XHJcbiAgICAgICAgICAgIHRoaXMuRGVuWzFdID0gMTtcclxuICAgICAgICAgICAgdGhpcy5EZW5bMl0gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLkRlblszXSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuRGVuWzRdID0gMDtcclxuICAgICAgICAgICAgdGhpcy5EZW5bNV0gPSAwO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgIHdjID0gd2MgKiB0aGlzLktCMjtcclxuICAgICAgICAgICAgdGhpcy5OdW1bMF0gPSBNYXRoLnBvdyh3YywyKTtcclxuICAgICAgICAgICAgdGhpcy5OdW1bMV0gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLk51bVsyXSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuTnVtWzNdID0gMDtcclxuICAgICAgICAgICAgdGhpcy5OdW1bNF0gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLk51bVs1XSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuRGVuWzBdID0gTWF0aC5wb3cod2MsMik7XHJcbiAgICAgICAgICAgIHRoaXMuRGVuWzFdID0gdGhpcy5CMjEgKiB3YztcclxuICAgICAgICAgICAgdGhpcy5EZW5bMl0gPSAxO1xyXG4gICAgICAgICAgICB0aGlzLkRlblszXSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuRGVuWzRdID0gMDtcclxuICAgICAgICAgICAgdGhpcy5EZW5bNV0gPSAwO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgIHdjID0gd2MgKiB0aGlzLktCMztcclxuICAgICAgICAgICAgdGhpcy5OdW1bMF0gPSBNYXRoLnBvdyh3YywzKTtcclxuICAgICAgICAgICAgdGhpcy5OdW1bMV0gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLk51bVsyXSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuTnVtWzNdID0gMDtcclxuICAgICAgICAgICAgdGhpcy5OdW1bNF0gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLk51bVs1XSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuRGVuWzBdID0gTWF0aC5wb3cod2MsMyk7XHJcbiAgICAgICAgICAgIHRoaXMuRGVuWzFdID0gdGhpcy5CMzIgKiBNYXRoLnBvdyh3YywyKTtcclxuICAgICAgICAgICAgdGhpcy5EZW5bMl0gPSB0aGlzLkIzMSAqIHdjO1xyXG4gICAgICAgICAgICB0aGlzLkRlblszXSA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuRGVuWzRdID0gMDtcclxuICAgICAgICAgICAgdGhpcy5EZW5bNV0gPSAwO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgIHdjID0gd2MgKiB0aGlzLktCNDtcclxuICAgICAgICAgICAgdGhpcy5OdW1bMF0gPSBNYXRoLnBvdyh3Yyw0KTtcclxuICAgICAgICAgICAgdGhpcy5OdW1bMV0gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLk51bVsyXSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuTnVtWzNdID0gMDtcclxuICAgICAgICAgICAgdGhpcy5OdW1bNF0gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLk51bVs1XSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuRGVuWzBdID0gTWF0aC5wb3cod2MsNCk7XHJcbiAgICAgICAgICAgIHRoaXMuRGVuWzFdID0gdGhpcy5CNDMgKiBNYXRoLnBvdyh3YywzKTtcclxuICAgICAgICAgICAgdGhpcy5EZW5bMl0gPSB0aGlzLkI0MiAqIE1hdGgucG93KHdjLDIpO1xyXG4gICAgICAgICAgICB0aGlzLkRlblszXSA9IHRoaXMuQjQxICogd2M7XHJcbiAgICAgICAgICAgIHRoaXMuRGVuWzRdID0gMTtcclxuICAgICAgICAgICAgdGhpcy5EZW5bNV0gPSAwO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgIHdjID0gd2MgKiB0aGlzLktCNTtcclxuICAgICAgICAgICAgdGhpcy5OdW1bMF0gPSBNYXRoLnBvdyh3Yyw1KTtcclxuICAgICAgICAgICAgdGhpcy5OdW1bMV0gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLk51bVsyXSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuTnVtWzNdID0gMDtcclxuICAgICAgICAgICAgdGhpcy5OdW1bNF0gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLk51bVs1XSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuRGVuWzBdID0gTWF0aC5wb3cod2MsNSk7XHJcbiAgICAgICAgICAgIHRoaXMuRGVuWzFdID0gdGhpcy5CNTQgKiBNYXRoLnBvdyh3Yyw0KTtcclxuICAgICAgICAgICAgdGhpcy5EZW5bMl0gPSB0aGlzLkI1MyAqIE1hdGgucG93KHdjLDMpO1xyXG4gICAgICAgICAgICB0aGlzLkRlblszXSA9IHRoaXMuQjUyICogTWF0aC5wb3cod2MsMik7XHJcbiAgICAgICAgICAgIHRoaXMuRGVuWzRdID0gdGhpcy5CNTEgKiB3YztcclxuICAgICAgICAgICAgdGhpcy5EZW5bNV0gPSAxO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgLyogdHNsaW50OmVuYWJsZTptYXgtZnVuYy1ib2R5LWxlbmd0aCAqL1xyXG4gICAgfVxyXG5cclxuICAgIGZpbHRlcihpbnB1dFNpZ25hbCA6IG51bWJlcltdKSA6IG51bWJlcltde1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlU3BhY2VDYWxjdWxhdG9yLkNsY091dHB1dFZlY3RvcihpbnB1dFNpZ25hbCk7XHJcbiAgICB9XHJcbn0iXX0=