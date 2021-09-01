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
var NavMenu_1 = require("./components/user/NavMenu");
var Login_1 = require("./components/user/Login");
var Home_1 = require("./components/Home");
var Register_1 = require("./components/user/Register");
var Profile_1 = require("./components/Profile");
var EditUser_1 = require("./components/user/EditUser");
var TopUp_1 = require("./components/user/TopUp");
var Exchange_1 = require("./components/user/Exchange");
var ForumMain_1 = require("./components/forum/ForumMain");
var CurrencyPage_1 = require("./components/CurrencyPage");
var Layout_1 = require("./components/Layout");
var react_router_dom_1 = require("react-router-dom");
var react_bootstrap_1 = require("react-bootstrap");
function App() {
    var _this = this;
    var _a = react_1.useState(""), email = _a[0], setEmail = _a[1];
    react_1.useEffect(function () {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var response, content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('https://localhost:44349/api/account', {
                            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                            credentials: "include",
                        })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        content = _a.sent();
                        setEmail(content.email);
                        return [2 /*return*/];
                }
            });
        }); })();
        // let connection = Connection.getInstance();
    });
    return (React.createElement(Layout_1.default, null,
        React.createElement(react_router_dom_1.BrowserRouter, null,
            React.createElement(NavMenu_1.default, { email: email, setEmail: setEmail }),
            React.createElement(react_bootstrap_1.Modal, null),
            React.createElement("main", { className: "form-signin" },
                React.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: Home_1.default }),
                React.createElement(react_router_dom_1.Route, { exact: true, path: "/profile", component: Profile_1.default }),
                React.createElement(react_router_dom_1.Route, { path: "/forum", component: ForumMain_1.default }),
                React.createElement(react_router_dom_1.Route, { path: "/api/account/" + email, component: function () { return React.createElement(EditUser_1.default, { email: email }); } }),
                React.createElement(react_router_dom_1.Route, { path: "/api/account/topup/" + email, component: function () { return React.createElement(TopUp_1.default, { email: email }); } }),
                React.createElement(react_router_dom_1.Route, { path: "/login", component: function () { return React.createElement(Login_1.default, { setEmail: setEmail }); } }),
                React.createElement(react_router_dom_1.Route, { path: "/register", component: Register_1.default }),
                React.createElement(react_router_dom_1.Route, { path: "/api/account/exchange/" + email, component: function () { return React.createElement(Exchange_1.default, { email: email }); } }),
                React.createElement(react_router_dom_1.Route, { path: "/currency/:currency", component: CurrencyPage_1.CurrencyPage })))));
}
exports.default = App;
//# sourceMappingURL=App.js.map