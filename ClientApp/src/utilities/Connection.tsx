import axios from "axios";
import {TimeInterval} from "rxjs";

export class Connection {
    private static instance: Connection;
    public currencyData;
    public currentStockChartData;
    public currencyCredentials: {currency: string, timePeriod: string, typeOfData: string} = currencyCredentialsStartValues;
    private chartUpdateInterval: number;
    private currenciesUpdateInterval: number;
    
    
    constructor() {
        // this.setEventListeners();
        this.getCurrencyChartData();
        this.setDataIntervals();
    }

    public static getInstance(): Connection {
        if (!Connection.instance) {
            Connection.instance = new Connection();
        }

        return Connection.instance;
    }
    
      public getCurrencyDisplay() {  //using proxy to bypass server-side no-cors
        const promise = async () => {
            let response = await fetch(`https://serene-sierra-46576.herokuapp.com/https://internetowykantor.pl/cms/currency_money/?last-update=${Date.now()-1}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            
            return response.json()
        }
        
        promise().then(data => {
            this.currencyData = data;
            dispatchEvent(new CustomEvent("currenciesDataUpdated", {
                detail: {
                    data: data
                }
            }));
        
            // console.log('DATA FROM GET CURRENCY DISPLAY', data)
            return data;
        })
    }

    // // FUNC ABOVE MOVED TO CURRENCY TABLE COMPONENT

    public getCurrencyChartData(currency: string = this.currencyCredentials.currency, 
                                timePeriod: string = this.currencyCredentials.timePeriod,
                                typeOfValues: string = this.currencyCredentials.typeOfData) {  //get data on request / on interval refresh
        // console.log('currency', currency, "timePeriod", timePeriod, "typeOfValues", typeOfValues)
        let timestamp = Date.now();
        let url = `https://serene-sierra-46576.herokuapp.com/https://internetowykantor.pl/cms/currency_chart/${currency}/${timePeriod}/${typeOfValues}/?t=${timestamp-1}`;
        console.log("url", url)
        const promise = async () => {
            const response = await fetch(url,{
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            
            return response.json();
        } 
        
        promise().then(data => {
            this.currentStockChartData = data;
            console.log('DATA FROM GET CHART DATA', data)
            
            let dataPoints = this.getChartDataPoints(data);

            dispatchEvent(new CustomEvent("stockChartDataUpdated", {
                detail: {
                    title: this.currencyCredentials.currency + "/PLN",
                    dataPoints: dataPoints,
                    startData: dataPoints[0].x,
                    endData: dataPoints[dataPoints.length-1].x,
                }
            }));
            this.currencyCredentials.currency = currency;
            this.currencyCredentials.timePeriod = timePeriod;
            this.currencyCredentials.typeOfData = typeOfValues;
        })
    }
    
    private setDataIntervals() {
        this.chartUpdateInterval = window.setInterval(() => {
            this.getCurrencyChartData();
        }, 10000);

        this.currenciesUpdateInterval = window.setInterval(() => {
            this.getCurrencyDisplay();
        }, 5000)
    }

    private getChartDataPoints(data: any) {
        let filtered: any = [];
        for(let element of data){
            filtered.push({x: element.window_closed, y: element[this.currencyCredentials.typeOfData]})
        }
        console.log("datapoints", filtered)
        return filtered;
    }
    
    public setCurrencyFetchData(currency: string = this.currencyCredentials.currency,
                                timePeriod: string = this.currencyCredentials.timePeriod,
                                typeOfData: string = this.currencyCredentials.typeOfData) {
        this.currencyCredentials.currency = currency;
            this.currencyCredentials.timePeriod = timePeriod;
            this.currencyCredentials.typeOfData = typeOfData;
    }
}

const currencyCredentialsStartValues: {currency: string, timePeriod: string, typeOfData: string} = {
    currency: 'EUR', timePeriod: '1day', typeOfData: 'avg'
}