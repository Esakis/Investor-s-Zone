﻿import axios from "axios";
import {TimeInterval} from "rxjs";

export class Connection {
    private static instance: Connection;
    public currencyData;
    public currentStockChartData;
    private currencyCredentials: {currency: string, timePeriod: string, typeOfData: string} = currencyCredentialsStartValues;
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
    
    // private setEventListeners() {
    //   
    // }
    
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
            console.log('DATA FROM GET CURRENCY DISPLAY', data)
            return data;
        })
    }
    
    public getCurrencyChartData(currency: string = this.currencyCredentials.currency, 
                                timePeriod: string = this.currencyCredentials.timePeriod,
                                typeOfValues: string = this.currencyCredentials.typeOfData) {  //get data on request / on interval refresh
        console.log('currency', currency, "timePeriod", timePeriod, "typeOfValues", typeOfValues)
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

            dispatchEvent(new CustomEvent("stockDataUpdated", {
                detail: {
                    data: data
                }
            }));
            this.currencyCredentials.currency = currency;
            this.currencyCredentials.timePeriod = timePeriod;
            this.currencyCredentials.typeOfData = typeOfValues;
        })
    }
    
    private setDataIntervals() {
        this.chartUpdateInterval = window.setInterval(() => {
            this.getCurrencyChartData()
        }, 10000);

        this.currenciesUpdateInterval = window.setInterval(() => {
            this.getCurrencyDisplay();
        }, 10000)
    }
}

const currencyCredentialsStartValues: {currency: string, timePeriod: string, typeOfData: string} = {
    currency: 'EUR', timePeriod: '1day', typeOfData: 'avg'
}