"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
function Edit() {
    var _a = react_1.useState(''), name = _a[0], setName = _a[1];
    var _b = react_1.useState(''), email = _b[0], setEmail = _b[1];
    var _c = react_1.useState(''), firstname = _c[0], setFirstName = _c[1];
    var _d = react_1.useState(''), lastname = _d[0], setLastName = _d[1];
    var _e = react_1.useState(''), nationality = _e[0], setNationality = _e[1];
    var _f = react_1.useState(''), password = _f[0], setPassword = _f[1];
    var _g = react_1.useState(''), confirmPassword = _g[0], setConfirmPassword = _g[1];
    // const[dateOfBirth,setDateOfBirth]=useState('');
    // const[role,setRole]=useState('');
    var _h = react_1.useState(null), userId = _h[0], setUserId = _h[1];
    var api = 'https://localhost:44349/api/account/{id}';
    react_1.useEffect(function () {
        console.log('efect');
    }, []);
    return (React.createElement("div", { className: "App" },
        React.createElement("h1", null, " Update user details "),
        React.createElement("input", { className: "card-text", type: "text", name: "name", value: name, onChange: function (e) { setName(e.target.value); } }),
        React.createElement("br", null),
        " ",
        React.createElement("br", null),
        React.createElement("input", { className: "card-text", type: "text", name: "email", value: email, onChange: function (e) { setEmail(e.target.value); } }),
        React.createElement("br", null),
        " ",
        React.createElement("br", null),
        React.createElement("input", { type: "text", name: "firstname", value: firstname, onChange: function (e) { setFirstName(e.target.value); } }),
        React.createElement("br", null),
        " ",
        React.createElement("br", null),
        React.createElement("input", { type: "text", name: "lastname", value: lastname, onChange: function (e) { setLastName(e.target.value); } }),
        React.createElement("br", null),
        " ",
        React.createElement("br", null),
        React.createElement("input", { type: "text", name: "nationality", value: nationality, onChange: function (e) { setNationality(e.target.value); } }),
        React.createElement("br", null),
        " ",
        React.createElement("br", null),
        React.createElement("input", { type: "text", name: "password", value: password, onChange: function (e) { setPassword(e.target.value); } }),
        React.createElement("br", null),
        " ",
        React.createElement("br", null),
        React.createElement("input", { type: "text", name: "confirmPassword", value: confirmPassword, onChange: function (e) { setConfirmPassword(e.target.value); } }),
        React.createElement("br", null),
        " ",
        React.createElement("br", null),
        React.createElement("button", { type: "submit", className: "btn btn-primary mb-2 pxy-4" }, "Save")));
}
exports.default = Edit;
//# sourceMappingURL=Edit.js.map