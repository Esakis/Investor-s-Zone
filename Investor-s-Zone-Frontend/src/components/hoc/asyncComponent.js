"use strict";
// https://medium.com/front-end-weekly/loading-components-asynchronously-in-react-app-with-an-hoc-61ca27c4fda7
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var React = require("react");
var asyncComponent = function (importComponent) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {
                component: null
            };
            return _this;
        }
        class_1.prototype.componentDidMount = function () {
            var _this = this;
            importComponent()
                .then(function (cmp) {
                _this.setState({ component: cmp.default });
            });
        };
        class_1.prototype.render = function () {
            var C = this.state.component;
            return C ? React.createElement(C, __assign({}, this.props)) : null;
        };
        return class_1;
    }(react_1.Component));
};
exports.default = asyncComponent;
//# sourceMappingURL=asyncComponent.js.map