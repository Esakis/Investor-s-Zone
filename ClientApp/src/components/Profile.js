"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CurrencyPanel_1 = require("./CurrencyPanel");
var React = require("react");
var semantic_ui_react_1 = require("semantic-ui-react");
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
                        React.createElement("button", { className: "ui basic button inverted" },
                            React.createElement(semantic_ui_react_1.Popup, { trigger: React.createElement(semantic_ui_react_1.Icon, { circular: true, name: 'question' }), content: 'Today, Keep your money in the pocket!', size: 'huge' }),
                            "Tip Of The Day")),
                    React.createElement("a", { className: "active item" },
                        React.createElement("button", { className: "ui basic button inverted" },
                            React.createElement("i", { className: "newspaper outline icon" }),
                            React.createElement("a", { href: "https://businessinsider.com.pl/gielda", target: "_blank" }, "WGI"))),
                    React.createElement("a", { className: "active item" },
                        React.createElement("button", { className: "ui basic button inverted" },
                            React.createElement("i", { className: "newspaper outline icon" }),
                            React.createElement("a", { href: "https://www.wsj.com/market-data/stocks", target: "_blank" }, "WSJ"))),
                    React.createElement("a", { className: "item" },
                        React.createElement("button", { className: "ui basic inverted button  " },
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
                    React.createElement("button", { className: "ui button inverted blue right " }, "Post"),
                    React.createElement("div", { className: "ui icon input inverted right floated" },
                        React.createElement("input", { type: "text", placeholder: "Search..." }),
                        React.createElement("i", { className: "search link icon" })))))));
};
exports.default = Profile;
//# sourceMappingURL=Profile.js.map