"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
require("./NavMenu.css");
require("../componentsCss/NavMenu.css");
var react_redux_1 = require("react-redux");
var CurrencyPanel_1 = require("../CurrencyPanel");
var Exchange = function (props) {
    return (React.createElement("div", null,
        React.createElement("nav", null,
            React.createElement(CurrencyPanel_1.default, null))));
};
exports.default = react_redux_1.connect()(Exchange);
//# sourceMappingURL=Exchange.js.map