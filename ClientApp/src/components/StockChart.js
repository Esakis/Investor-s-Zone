"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleStockChart = void 0;
var React = require("react");
var react_1 = require("react");
var canvasjs_stock_react_1 = require("../libs/canvasjs.stock.react");
var CanvasJSStockChart = canvasjs_stock_react_1.default.CanvasJSStockChart;
var SimpleStockChart = /** @class */ (function (_super) {
    __extends(SimpleStockChart, _super);
    function SimpleStockChart(props, state) {
        var _this = _super.call(this, props) || this;
        //  console.log("CHART PROPS", props);
        _this.state = {
            title: _this.props.title,
            dataPoints: _this.props.dataPoints,
            startData: _this.props.startData,
            endData: _this.props.endData
        };
        return _this;
    }
    //TODO: fix
    SimpleStockChart.prototype.render = function () {
        //   console.log("CHART STATE", this.state)
        var options = {
            title: {
                text: this.state.title,
            },
            charts: [{
                    data: [{
                            type: "line",
                            dataPoints: this.state.dataPoints,
                        }]
                }],
            navigator: {
                slider: {
                    minimum: new Date(this.state.endData),
                    maximum: new Date(this.state.startData)
                }
            }
        };
        var containerProps = {
            backGround: "yellow",
            width: "80%",
            height: "450px",
            margin: "auto"
        };
        return (React.createElement("div", null,
            React.createElement(CanvasJSStockChart, { options: options, containerProps: containerProps })));
    };
    return SimpleStockChart;
}(react_1.Component));
exports.SimpleStockChart = SimpleStockChart;
//# sourceMappingURL=StockChart.js.map