"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
require("./componentsCss/CurrencyPage.css");
var Profile = function () {
    return (React.createElement("div", { className: "ui inverted vertical segment  " },
        React.createElement("div", { className: "ui page grid landpage-image" },
            React.createElement("div", { className: "ui container " },
                React.createElement("br", null),
                React.createElement("div", { className: "ui secondary menu" },
                    React.createElement("div", { className: "header item" }, "Brand"),
                    React.createElement("a", { className: "active item" }, "Tip Of the day"),
                    React.createElement("a", { className: "item" }, "Blog"),
                    React.createElement("a", { className: "item" }, "Currency"),
                    React.createElement("div", { className: "right menu" },
                        React.createElement("div", { className: "item" },
                            React.createElement("div", { className: "ui icon input" },
                                React.createElement("input", { type: "text", placeholder: "Search..." }),
                                React.createElement("i", { className: "search link icon" }))),
                        React.createElement("img", { className: "ui small circular image", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc2YzpaKUyKmBzE0wPNThI8X-jtSCHaB-zng&usqp=CAU" }))),
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
                            React.createElement("textarea", { placeholder: "Some example text..." }))))))));
};
exports.default = Profile;
//# sourceMappingURL=Profile.js.map