import * as React from 'react';
import { SimpleStockChart } from './StockChart'
import CurrencyPanel from "./CurrencyPanel";
import {Component} from "react";
import {Connection} from "../utilities/Connection";
import {valueTypes} from "../constants/ConstantLocalValues";
import { useHistory, useParams } from 'react-router-dom'


const baseCurrencyCredentialsStartValues: {currency: string, timePeriod: string, typeOfData: string} = {
    currency: 'EUR', timePeriod: '1day', typeOfData: 'avg'
}

type currencyPageProps = {
    location: {
        currency: string,
    }
    // timePeriod: string,
    // typeOfValues: string
}

type currencyPageState = {
    responseData: any,
    title: string,
    currency: string,
    dataPoints: [],
    startData: number,
    stockChartData: stockDataTypes,
    chartDataReady: boolean,
    chart: any
}

type stockDataTypes = {
    title: string,
    dataPoints: any[],
    startData: number,
    endData: number
}

export class CurrencyPage extends Component<currencyPageProps, currencyPageState> {
    private baseCurrencyCredentials: {currency: string, timePeriod: string, typeOfData: string} = baseCurrencyCredentialsStartValues;
    private connection: Connection = Connection.getInstance();
    
    constructor(props: currencyPageProps, state: currencyPageState) {
        super(props);
        // const { routeCurrency } = useParams()

        console.log("brobps", props, "and params"); //routeCurrency
        this.state = {
            stockChartData: undefined,
            currency: props.location.currency,
            title: props.location.currency + "/PLN",
            dataPoints: [],
            startData: Date.now(),
            responseData: [],
            chartDataReady: false,
            chart: undefined
        }
    }

    componentDidMount() {
        this.setEventListeners();
        this.getCurrencyChartData(this.state.currency);
    }

    private setEventListeners() {
        // @ts-ignore
        window.addEventListener("stockChartDataDataUpdated", (event: CustomEvent) => {
            console.log("stockChartDataDataUpdated detail", event.detail)
        });
    }
    
    
    private getChartDataPoints(data: any) {
        let filtered: any = [];
        for(let element of data){
            filtered.push({x: parseInt(element.window_closed), y: parseInt(element[this.baseCurrencyCredentials.typeOfData])})
        }
        return filtered;
    }

    private getCurrencyChartData(currency: string = this.baseCurrencyCredentials.currency,
                                timePeriod: string = this.baseCurrencyCredentials.timePeriod,
                                typeOfValues: string = this.baseCurrencyCredentials.typeOfData) {  //get data on request / on interval refresh
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
            console.log("DATA FETCH SUCCESFULL AAAAAAAAAAAAAAAAAAAAAA")
            this.setState({responseData: data, dataPoints: this.getChartDataPoints(data)});
            console.log("CHART DATA POINT IN CURRENCY PAGE", this.state);
            this.connection.setCurrencyFetchData(currency, timePeriod, typeOfValues)
            this.updateDataChart();
        })
    }
    
    private updateDataChart() {
        let stockChartData = {
            title: this.state.title, 
            dataPoints: this.state.dataPoints,
            startData: this.state.dataPoints[0].x, 
            endData: this.state.dataPoints[this.state.dataPoints.length-1].x
        };
        this.setState({chart: new SimpleStockChart(stockChartData, {})})
        this.setState({stockChartData: stockChartData, chartDataReady: true})
        console.log("state CHARRT DATA ", this.state.stockChartData, this.state.chartDataReady)
    }

    render() {
        console.log("stockchartData", this.state.stockChartData)
        // let renderedChart = this.state.chartDataReady ? this.state.chart : null;
        // console.log("renderedChart", renderedChart)
        return (
            <div>
                <div className="currencyChart">
                    
                    {this.state.chartDataReady == true && <SimpleStockChart 
                        title={this.state.stockChartData.title} 
                        dataPoints={this.state.stockChartData.dataPoints} 
                        startData={this.state.stockChartData.startData} 
                        endData={this.state.stockChartData.endData}/>}
                    
                    {/*{renderedChart !== null && renderedChart.map((chart: any) => (*/}
                    {/*        {chart}*/}
                    {/*    )*/}
                    {/*)}*/}
                    
                </div>
                <nav className="currencyPanelNavbar">
                    <CurrencyPanel/>
                </nav>
            </div>
        );
    }
}
