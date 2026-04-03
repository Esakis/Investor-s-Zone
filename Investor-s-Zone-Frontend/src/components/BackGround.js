"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var BackGround = function (props) {
    var URL = 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80';
    return (React.createElement(react_1.Fragment, null,
        React.createElement("div", { style: {
                backgroundImage: "url(" + URL + ")",
                backgroundRepeat: 'no-repeat',
                backgroundSize: "cover",
                minHeight: '100%',
            } }, props.children)));
};
exports.default = react_router_dom_1.withRouter(BackGround);
//# sourceMappingURL=BackGround.js.map