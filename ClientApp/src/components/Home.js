"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
require("./componentsCss/NavMenu.css");
var react_redux_1 = require("react-redux");
var CurrencyPanel_1 = require("./CurrencyPanel");
require("./user/NavMenu.css");
var semantic_ui_react_1 = require("semantic-ui-react");
require("./componentsCss/CurrencyPage.css");
var Home = function () {
    var _a = React.useState(false), open = _a[0], setOpen = _a[1];
    return (React.createElement("div", { className: "ui page grid landpage-image" },
        React.createElement("div", { className: "column" },
            React.createElement("h1", { className: "ui title-header" }),
            React.createElement("div", { className: "centered grid slogan" },
                React.createElement("div", { className: "column" },
                    React.createElement(semantic_ui_react_1.Grid, { textAlign: 'center', style: { height: '100vh' }, verticalAlign: 'middle' },
                        React.createElement(semantic_ui_react_1.Grid.Column, { style: { maxWidth: 450 } },
                            React.createElement(semantic_ui_react_1.Header, null, "We\uFFFDre better than the rest"),
                            React.createElement(semantic_ui_react_1.Modal, { centered: false, open: open, onClose: function () { return setOpen(false); }, onOpen: function () { return setOpen(true); }, trigger: React.createElement(semantic_ui_react_1.Button, null, "Welcome") },
                                React.createElement(semantic_ui_react_1.Modal.Header, null, "Welcome to Investor's Zone "),
                                React.createElement(semantic_ui_react_1.Modal.Content, null,
                                    React.createElement(semantic_ui_react_1.Modal.Description, null,
                                        React.createElement(CurrencyPanel_1.default, null))),
                                React.createElement(semantic_ui_react_1.Modal.Actions, null,
                                    React.createElement(semantic_ui_react_1.Button, { onClick: function () { return setOpen(false); } }, "OK"))))))))));
};
exports.default = react_redux_1.connect()(Home);
//# sourceMappingURL=Home.js.map