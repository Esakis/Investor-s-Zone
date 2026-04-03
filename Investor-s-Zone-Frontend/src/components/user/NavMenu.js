"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var semantic_ui_react_1 = require("semantic-ui-react");
var React = require("react");
var NavMenu = function (props) {
    var logout = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('https://localhost:44349/api/account/logout', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                        credentials: "include",
                    })];
                case 1:
                    _a.sent();
                    props.setEmail('');
                    return [2 /*return*/];
            }
        });
    }); };
    var menu;
    if (props.email === '') {
        menu = (React.createElement("ul", { className: "navbar-nav me-auto mb-2 mb-md-0" },
            React.createElement("li", { className: "nav-item" },
                React.createElement(semantic_ui_react_1.Menu.Item, null,
                    React.createElement(semantic_ui_react_1.Button, { as: 'a', to: "/login", basic: true, href: "/login" }, "Login"))),
            React.createElement("li", { className: "nav-item" },
                React.createElement(semantic_ui_react_1.Menu.Item, null,
                    React.createElement(semantic_ui_react_1.Button, { as: 'a', to: '/register', basic: true, href: "/register" }, "Sign up")))));
    }
    else {
        menu = (React.createElement("nav", { className: "navbar navbar-expand-md navbar-light bg-light mb-4" },
            React.createElement("div", null,
                React.createElement("ul", { className: "ui simple dropdown item inverted basic button" },
                    React.createElement("li", { className: "nav-item" },
                        React.createElement(react_router_dom_1.Link, { to: "/forum", className: "nav-link active" },
                            React.createElement(semantic_ui_react_1.Icon, { name: "comment alternate outline" }),
                            "Forum")))),
            React.createElement("div", { className: "container-fluid" },
                React.createElement("div", { className: "ui compact menu" },
                    React.createElement("div", { className: "ui simple dropdown item inverted basic button" },
                        props.email,
                        React.createElement("i", { className: "user outline" }, "Me"),
                        React.createElement("div", { className: "menu" },
                            React.createElement(react_router_dom_1.NavLink, { to: "/profile", className: "nav-link active grey" },
                                React.createElement(semantic_ui_react_1.Icon, { name: "bell outline" }),
                                "   Profile"),
                            React.createElement(react_router_dom_1.NavLink, { to: "/api/account/" + props.email, className: "nav-link active grey" },
                                React.createElement(semantic_ui_react_1.Icon, { name: "edit outline" }),
                                "   Edit "),
                            React.createElement(react_router_dom_1.NavLink, { to: "/api/account/topup/" + props.email, className: "nav-link active grey" },
                                React.createElement(semantic_ui_react_1.Icon, { name: "upload" }),
                                "  Top Up "),
                            React.createElement(react_router_dom_1.NavLink, { to: "/api/account/exchange/" + props.email, className: "nav-link active grey" },
                                React.createElement(semantic_ui_react_1.Icon, { name: "money bill alternate outline" }),
                                "   Exchange"),
                            React.createElement(react_router_dom_1.NavLink, { exact: true, to: "/", onClick: logout, className: "nav-link active grey" },
                                React.createElement(semantic_ui_react_1.Icon, { name: "power off" }),
                                "   Logout")))))));
    }
    return (React.createElement("nav", { className: "navbar navbar-expand-md navbar-light bg-light mb-4" },
        React.createElement("div", { className: "container-fluid" },
            React.createElement(semantic_ui_react_1.Menu.Item, { as: react_router_dom_1.NavLink, to: "/" },
                React.createElement(semantic_ui_react_1.Icon, { name: "balance scale" }),
                "Investor's Zone"),
            React.createElement("div", null, menu))));
};
exports.default = NavMenu;
//# sourceMappingURL=NavMenu.js.map