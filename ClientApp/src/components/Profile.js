"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var CurrencyPanel_1 = require("./CurrencyPanel");
var React = require("react");
require("./componentsCss/CurrencyPage.css");
var panel = (React.createElement("div", { id: "Panel" },
    React.createElement(CurrencyPanel_1.default, null)));
var Profile = function () {
    return (React.createElement("div", { className: "ui inverted vertical segment  " },
        React.createElement("div", { className: "ui page grid landpage-image" },
            React.createElement("div", { className: "ui container " },
                React.createElement("br", null),
                React.createElement("div", { className: "ui secondary menu" },
                    React.createElement("div", { className: "header item grey" }),
                    React.createElement("a", { className: "active item" },
                        React.createElement(react_router_dom_1.Link, { to: "/currencyPanel", className: "nav-link active" }, "Tip of the Day"),
                        React.createElement("div", { className: "ui basic modal" },
                            React.createElement("div", { className: "ui icon header grey" },
                                React.createElement("i", { className: "archive icon" }),
                                "Tip of the Day"),
                            React.createElement("div", { className: "content" },
                                React.createElement("p", null, "Today better keep your money in the pocket!!!")),
                            React.createElement("div", { className: "actions" },
                                React.createElement("div", { className: "ui red basic cancel inverted button" },
                                    React.createElement("i", { className: "remove icon" }),
                                    "No"),
                                React.createElement("div", { className: "ui green ok inverted button" },
                                    React.createElement("i", { className: "checkmark icon" }),
                                    "Yes")))),
                    React.createElement("a", { className: "item" },
                        React.createElement(react_router_dom_1.Link, { to: { pathname: "https://businessinsider.com.pl/gielda" }, target: "_blank" }, "Gielda")),
                    React.createElement("a", { className: "item" },
                        React.createElement("button", { className: "ui basic button grey " },
                            React.createElement("i", { className: "icon user" }),
                            "Add Friend")),
                    React.createElement("img", { className: "ui small circular image float right", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc2YzpaKUyKmBzE0wPNThI8X-jtSCHaB-zng&usqp=CAU" })),
                React.createElement("br", null),
                React.createElement("div", { className: "ui grid" },
                    React.createElement("div", { className: "four wide column" },
                        React.createElement("div", { className: "ui secondary vertical pointing fluid menu" }),
                        "Forum")),
                React.createElement("div", { className: "twelve wide column" },
                    React.createElement("div", { className: "ui form" },
                        React.createElement("div", { className: "field" },
                            React.createElement("input", { type: "text", name: "first-name", placeholder: "First name" })),
                        React.createElement("div", { className: "field" },
                            React.createElement("textarea", { placeholder: "Some example text..." }))),
                    React.createElement("br", null),
                    React.createElement("button", { className: "ui button inverted blue right " }, "Send"),
                    React.createElement("div", { className: "ui icon input inverted left" },
                        React.createElement("input", { type: "text", placeholder: "Search..." }),
                        React.createElement("i", { className: "search link icon" })))))));
};
exports.default = Profile;
//# sourceMappingURL=Profile.js.map