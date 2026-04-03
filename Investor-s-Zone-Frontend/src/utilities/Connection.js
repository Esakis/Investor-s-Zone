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
exports.Connection = void 0;
var Connection = /** @class */ (function () {
    function Connection() {
        this.currencyCredentials = currencyCredentialsStartValues;
        // this.setEventListeners();
        this.getCurrencyChartData();
        this.setDataIntervals();
    }
    Connection.getInstance = function () {
        if (!Connection.instance) {
            Connection.instance = new Connection();
        }
        return Connection.instance;
    };
    Connection.prototype.getCurrencyDisplay = function () {
        var _this = this;
        var promise = function () { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("https://serene-sierra-46576.herokuapp.com/https://internetowykantor.pl/cms/currency_money/?last-update=" + (Date.now() - 1), {
                            method: 'GET',
                            mode: 'cors',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.json()];
                }
            });
        }); };
        promise().then(function (data) {
            _this.currencyData = data;
            dispatchEvent(new CustomEvent("currenciesDataUpdated", {
                detail: {
                    data: data
                }
            }));
            // console.log('DATA FROM GET CURRENCY DISPLAY', data)
            return data;
        });
    };
    // // FUNC ABOVE MOVED TO CURRENCY TABLE COMPONENT
    Connection.prototype.getCurrencyChartData = function (currency, timePeriod, typeOfValues) {
        var _this = this;
        if (currency === void 0) { currency = this.currencyCredentials.currency; }
        if (timePeriod === void 0) { timePeriod = this.currencyCredentials.timePeriod; }
        if (typeOfValues === void 0) { typeOfValues = this.currencyCredentials.typeOfData; }
        // console.log('currency', currency, "timePeriod", timePeriod, "typeOfValues", typeOfValues)
        var timestamp = Date.now();
        var url = "https://serene-sierra-46576.herokuapp.com/https://internetowykantor.pl/cms/currency_chart/" + currency + "/" + timePeriod + "/" + typeOfValues + "/?t=" + (timestamp - 1);
        // console.log("url", url)
        var promise = function () { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(url, {
                            method: 'GET',
                            mode: 'cors',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.json()];
                }
            });
        }); };
        promise().then(function (data) {
            _this.currentStockChartData = data;
            // console.log('DATA FROM GET CHART DATA', data)
            var dataPoints = _this.getChartDataPoints(data);
            dispatchEvent(new CustomEvent("stockChartDataUpdated", {
                detail: {
                    title: _this.currencyCredentials.currency + "/PLN",
                    dataPoints: dataPoints,
                    startData: dataPoints[0].x,
                    endData: dataPoints[dataPoints.length - 1].x,
                }
            }));
            _this.currencyCredentials.currency = currency;
            _this.currencyCredentials.timePeriod = timePeriod;
            _this.currencyCredentials.typeOfData = typeOfValues;
        });
    };
    Connection.prototype.setDataIntervals = function () {
        var _this = this;
        this.chartUpdateInterval = window.setInterval(function () {
            _this.getCurrencyChartData();
        }, 10000);
        this.currenciesUpdateInterval = window.setInterval(function () {
            _this.getCurrencyDisplay();
        }, 5000);
    };
    Connection.prototype.getChartDataPoints = function (data) {
        var filtered = [];
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var element = data_1[_i];
            filtered.push({ x: element.window_closed, y: element[this.currencyCredentials.typeOfData] });
        }
        // console.log("datapoints", filtered)
        return filtered;
    };
    Connection.prototype.setCurrencyFetchData = function (currency, timePeriod, typeOfData) {
        if (currency === void 0) { currency = this.currencyCredentials.currency; }
        if (timePeriod === void 0) { timePeriod = this.currencyCredentials.timePeriod; }
        if (typeOfData === void 0) { typeOfData = this.currencyCredentials.typeOfData; }
        this.currencyCredentials.currency = currency || this.currencyCredentials.currency;
        this.currencyCredentials.timePeriod = timePeriod || this.currencyCredentials.timePeriod;
        this.currencyCredentials.typeOfData = typeOfData || this.currencyCredentials.timePeriod;
    };
    return Connection;
}());
exports.Connection = Connection;
var currencyCredentialsStartValues = {
    currency: 'EUR', timePeriod: '1day', typeOfData: 'avg'
};
//# sourceMappingURL=Connection.js.map