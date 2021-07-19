import * as React from 'react';
import { Component } from "react"
import CanvasJSReact from '../libs/canvasjs.stock.react';
let CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

export class SimpleStockChart extends Component
    <{title: string, dataPoints: any, startData: number}, {}> {
    
render() {
    console.log(this.state)
    const options = {
        title: {
            text: this.props.title,
        },
        charts: [{
            data: [{
                type: "line",
                dataPoints: this.props.dataPoints,
            }]
        }],
        navigator: {
            slider: {
                minimum: new Date(this.props.startData - 86400),  //86400 seconds is 24h so we start with showing a day
                maximum: new Date(this.props.startData)
            }
        }
    };
    const containerProps = {
        width: "80%",
        height: "450px",
        margin: "auto"
    };
    return (
        <div>
            <CanvasJSStockChart
                options={options}
                containerProps = {containerProps}
            />
        </div>
    );
}
}
