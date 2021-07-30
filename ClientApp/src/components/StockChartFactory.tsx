import * as React from 'react';
import axios, {AxiosResponse} from "axios"
import {SimpleStockChart} from "./StockChart";
import {currencies, timeFrames, valueTypes} from "../constants/ConstantLocalValues"
import {PureComponent} from "react";
import {responseList} from "../constants/ConstantLocalValues";

type props = {
    currency: string,
    container: HTMLElement,
}

// export class StockChartFactory extends Component {
//     private data: any;
//     private chart: SimpleStockChart;
//     private currentCurrency: string;
//     private currentValueType: string;
//     private container: HTMLElement;
//     // for now there is only currency to be picked and 
//     constructor({ currency, container }: props) {
//         super({ currency, container });
//         // console.log("currency tests", responseList, responseList["USD"])
//         this.container = container;
//         let valuesType = 'avg' //temporary solution
//         this.changeChart(currency, valuesType)
//     }

export class StockChartFactory extends PureComponent {
    private data: any;
    private chart: SimpleStockChart;
    private currentCurrency: string;
    private currentValueType: string;
    private container: HTMLElement | null;
    // for now there is only currency to be picked and 

    private getData() {
        return responseList[currency];
        
        // let data = {};

        // console.log(typeof response)
        // let data = response.text();
        // console.log(typeof response)
        // return data
        //
        // console.log(data)
        // return response.text().then(function(text) {
        //     return text ? JSON.parse(text) : {}
        // })
            // .then((response) => response.json())
            // .then((data) => {
            //     return data[0];
            // });
        // const retrieveData = () => {
        //     promise.then((retrievedData) => {
        //         return retrievedData
        //     });
        // };
        //
        // retrieveData();
    }
    
    public changeChart(currency: string, typeOfValues: string) {
        if(currency.toUpperCase() in currencies && typeOfValues in valueTypes) {
            this.currentCurrency = currency;
            this.currentValueType = typeOfValues;
            this.data = this.getData(currency, typeOfValues);
            // console.log(this.data);
            this.chart = this.createChart(this.data);
            console.log(this.chart)
        } else {
            console.log("Requested currency", currency,"and / or value type", typeOfValues, "does not exist / is incorrect")
        }
    }
    public createChart(data: any) {  //answer from api
        console.log("data retrieved", data)

        let dataPoints = this.getDataPoints(data);
        console.log(     this.currentCurrency + " Stock Chart",
           dataPoints,
            dataPoints[dataPoints.length-1].x)
        let chart = new SimpleStockChart({
            title: this.currentCurrency + " Stock Chart",
            dataPoints: dataPoints,
            startData: dataPoints[dataPoints.length-1].x
        });
        return chart;
    }
    
    private getDataPoints(data: any) {
        let filtered: any = [];
        for(let element of data){
            filtered.push({x: element.window_closed, y: element.avg})
        }
        console.log("datapoints", filtered)
        return filtered;
    }
    render() {
        this.currentCurrency = "EUR"
        // console.log("currency tests", responseList, responseList["USD"])
        this.container = document.getElementById('chartContainer');
        let valuesType = 'avg' //temporary solution
        this.changeChart(this.currentCurrency, valuesType)
        return this.chart
    }
}