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
require("./NavMenu.css");
var EditUser = function (props) {
    var _a = react_1.useState(''), dataemail = _a[0], setDataemail = _a[1];
    var _b = react_1.useState(''), datafirstname = _b[0], setDatafirstname = _b[1];
    var _c = react_1.useState(''), datalastname = _c[0], setDatalastname = _c[1];
    var _d = react_1.useState(''), datadateOfBirth = _d[0], setDatadateOfBirth = _d[1];
    var _e = react_1.useState(''), datanationality = _e[0], setDatanationality = _e[1];
    var _f = react_1.useState(''), dataPLN = _f[0], setDataPLN = _f[1];
    var _g = react_1.useState(''), dataEUR = _g[0], setDataEUR = _g[1];
    var _h = react_1.useState(''), email = _h[0], setEmail = _h[1];
    var _j = react_1.useState(''), firstname = _j[0], setFirstName = _j[1];
    var _k = react_1.useState(''), lastname = _k[0], setLastName = _k[1];
    var _l = react_1.useState(''), dateOfBirth = _l[0], setDateOfBirth = _l[1];
    var _m = react_1.useState(''), nationality = _m[0], setNationality = _m[1];
    var _o = react_1.useState(false), redirect = _o[0], setRedirect = _o[1];
    react_1.useEffect(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('https://localhost:44349/api/account/' + props.email, {
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                            credentials: "include",
                        })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        content = _a.sent();
                        console.log(content);
                        setDataemail(content.email);
                        setDatafirstname(content.firstName);
                        setDatalastname(content.lastName);
                        setDatadateOfBirth(content.dateOfBirth);
                        setDatanationality(content.nationality);
                        setDataPLN(content.pln);
                        setDataEUR(content.eur);
                        return [2 /*return*/];
                }
            });
        }); })();
    });
    var submit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    return [4 /*yield*/, fetch('https://localhost:44349/api/account/' + props.email, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                            body: JSON.stringify({
                                email: email,
                                firstname: firstname,
                                lastname: lastname,
                                dateOfBirth: dateOfBirth,
                                nationality: nationality
                            })
                        })];
                case 1:
                    _a.sent();
                    setRedirect(true);
                    return [2 /*return*/];
            }
        });
    }); };
    if (redirect) {
        return React.createElement(react_router_dom_1.Redirect, { to: "/" });
    }
    return (React.createElement("div", { id: "Main" },
        React.createElement("div", { id: "EditData" },
            React.createElement("h5", null, "Edit data"),
            React.createElement("form", { onSubmit: submit },
                React.createElement("div", { id: "Data2" },
                    React.createElement("input", { type: "hidden", name: "email", value: dataemail, onChange: function (e) { return setEmail(e.target.value); } })),
                React.createElement("div", { id: "Data1" },
                    React.createElement("input", { type: "text", className: "form-control", id: "floatingInput", placeholder: datafirstname, onChange: function (e) { return setFirstName(e.target.value); } }),
                    React.createElement("label", null, "First Name")),
                React.createElement("div", { id: "Data1" },
                    React.createElement("input", { type: "text", className: "form-control", id: "floatingInput", placeholder: datalastname, onChange: function (e) { return setLastName(e.target.value); } }),
                    React.createElement("label", null, "Last Name")),
                React.createElement("div", { id: "Data1" },
                    React.createElement("input", { type: "data", className: "form-control", id: "floatingInput", placeholder: datadateOfBirth, required: true, onChange: function (e) { return setDateOfBirth(e.target.value); } }),
                    React.createElement("label", null, "Date of Birth")),
                React.createElement("div", { id: "Data1" },
                    React.createElement("input", { type: "text", className: "form-control", id: "floatingInput", placeholder: datanationality, onChange: function (e) { return setNationality(e.target.value); } }),
                    React.createElement("label", null, "Nationality")),
                React.createElement("br", null),
                React.createElement("div", { id: "Data3", className: "d-flex justify-content-center" },
                    React.createElement("button", { type: "submit", className: "btn btn-success btn-block btn-lg gradient-custom-4 text-body" }, "Edit Data")))),
        React.createElement("div", { id: "EditAccount" },
            React.createElement("h5", null, "Account balance:"),
            React.createElement("br", null),
            React.createElement("h4", null,
                "   ",
                dataPLN,
                " PLN"),
            React.createElement("h4", null,
                "   ",
                dataEUR,
                " EUR"))));
};
exports.default = EditUser;
//# sourceMappingURL=EditUser.js.map