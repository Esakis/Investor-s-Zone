"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
require("./componentsCss/NavMenu.css");
var Home = function () {
    return (React.createElement("div", { className: "ui  fluid rounded image" },
        React.createElement("img", { src: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80 " }),
        React.createElement("div", { style: { position: 'absolute', bottom: 0, width: '100%', height: 'auto' } },
            React.createElement("div", { className: "ui hover bottom dimmer" },
                React.createElement("div", { className: "content" },
                    React.createElement("h2", { className: "ui inverted header" }, "Invester Zone"),
                    React.createElement("div", { className: "ui button" }, "View"))))));
};
exports.default = (function () { return (React.createElement(Home, null)); });
//# sourceMappingURL=Home.js.map