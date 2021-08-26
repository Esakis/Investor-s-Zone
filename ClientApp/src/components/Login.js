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
var react_1 = require("react");
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var semantic_ui_react_1 = require("semantic-ui-react");
var react_router_dom_2 = require("react-router-dom");
require("./componentsCss/CurrencyPage.css");
var Login = function (props) {
    var _a = react_1.useState(''), email = _a[0], setEmail = _a[1];
    var _b = react_1.useState(''), password = _b[0], setPassword = _b[1];
    var _c = react_1.useState(false), redirect = _c[0], setRedirect = _c[1];
    var submit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var response, content;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    return [4 /*yield*/, fetch('https://localhost:44349/api/account/login', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                            credentials: "include",
                            body: JSON.stringify({
                                email: email,
                                password: password,
                            })
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    content = _a.sent();
                    setRedirect(true);
                    props.setEmail(content.email);
                    return [2 /*return*/];
            }
        });
    }); };
    if (redirect) {
        return React.createElement(react_router_dom_1.Redirect, { to: "/Profile" });
    }
    return (React.createElement("div", { className: "ui inverted vertical segment " },
        React.createElement("div", { className: "ui page grid landpage-image" },
            React.createElement("div", { className: "column" },
                React.createElement("h1", { className: "ui title-header" }),
                React.createElement("div", { className: "centered grid slogan" },
                    React.createElement("div", { className: "column" },
                        React.createElement(semantic_ui_react_1.Grid, { textAlign: 'center', style: { height: '100vh' }, verticalAlign: 'middle' },
                            React.createElement(semantic_ui_react_1.Grid.Column, { style: { maxWidth: 450 } },
                                React.createElement(semantic_ui_react_1.Header, { as: 'h2', color: 'teal', textAlign: 'center' }, "Log-in to your account"),
                                React.createElement(semantic_ui_react_1.Form, { onSubmit: submit, size: 'large' },
                                    React.createElement(semantic_ui_react_1.Segment, { stacked: true },
                                        React.createElement(semantic_ui_react_1.Form.Input, { fluid: true, icon: 'user', iconPosition: 'left', placeholder: 'E-mail address', required: true, onChange: function (e) { return setEmail(e.target.value); } }),
                                        React.createElement(semantic_ui_react_1.Form.Input, { fluid: true, icon: 'lock', iconPosition: 'left', placeholder: 'Password', type: 'password', quired: true, onChange: function (e) { return setPassword(e.target.value); } }),
                                        React.createElement(semantic_ui_react_1.Button, { color: 'teal', fluid: true, size: 'large' }, "Login"))),
                                React.createElement(semantic_ui_react_1.Message, null,
                                    "New to us? ",
                                    React.createElement(react_router_dom_2.Link, { to: "/register", href: "register" }, "Register"))))))))));
};
exports.default = Login;
//# sourceMappingURL=Login.js.map