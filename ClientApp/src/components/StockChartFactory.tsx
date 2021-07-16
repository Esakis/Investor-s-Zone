import * as React from 'react';
import axios, {AxiosResponse} from "axios"
import {SimpleStockChart} from "./StockChart";
import {currencies, timeFrames, valueTypes} from "../constants/ConstantLocalValues"
import {Component} from "react";

type props = {
    currency: string,
    container: HTMLElement,
}

export class StockChartFactory extends Component<props, any> {
    private data: any;
    private chart: SimpleStockChart;
    private currentCurrency: string;
    private currentValueType: string;
    private container: HTMLElement;
    // for now there is only currency to be picked and 
    constructor({ currency, container }: props) {
        super({ currency, container });
        this.container = container;
        let valuesType = 'avg' //temporary solution
        this.changeChart(currency, valuesType)
    }
    private async getData(currency: string, typeOfValues: string) {
        try {
            let timestamp = Date.now();
            let url = `https://internetowykantor.pl/cms/currency_chart/${currency}/1year/${typeOfValues}/?t=${timestamp-5}`;
            console.log("url", url)
            const {data:response} = await axios.get(url)
            return response
        } catch(error) {
            console.log("Error:", error)
        }
    }
    
    public changeChart(currency: string, typeOfValues: string) {
        if(currency.toUpperCase() in currencies && typeOfValues in valueTypes) {
            this.currentCurrency = currency;
            this.currentValueType = typeOfValues;
            this.data = this.getData(currency, typeOfValues);
            console.log(this.data);
            this.chart = this.createChart(this.data);

        } else {
            console.log("Requested currency", currency,"and / or value type", typeOfValues, "does not exist / is incorrect")
        }
    }
    public createChart(data: any) {  //answer from api
        console.log("data retrieved", data)

        let dataPoints = this.getDataPoints(data);
        let chart = new SimpleStockChart({
            title: this.currentCurrency + " Stock Chart",
            dataPoints: dataPoints,
            startData: dataPoints[dataPoints.length].window_closed
        });
        return chart;
    }
    
    private getDataPoints(data: any) {
        let filtered: any = [];
        for(let element of data){
            filtered.push({x: element.window_closed, y: element.avg})
        }
        return filtered;
    }
    
    render() {
        return <div></div>
    }
}