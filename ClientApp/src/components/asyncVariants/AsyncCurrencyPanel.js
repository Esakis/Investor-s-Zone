"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var asyncComponent_1 = require("../hoc/asyncComponent");
var AsyncCurrencyPanel = asyncComponent_1.default(function () {
    return Promise.resolve().then(function () { return require('../CurrencyPanel'); });
});
var AsyncCurrencyPanelElement = function () {
    return (React.createElement("div", null,
        React.createElement("h1", null, "Here goes an async loaded button component"),
        React.createElement(AsyncCurrencyPanel, null)));
};
exports.default = AsyncCurrencyPanelElement;
//# sourceMappingURL=AsyncCurrencyPanel.js.map