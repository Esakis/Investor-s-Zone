import * as React from 'react';
import { Component } from "react"
import CanvasJSReact from '../libs/canvasjs.stock.react';

let CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;


type chartProps = { title: string, dataPoints: any, startData: number, endData: number }
type chartState = { title: string, dataPoints: any, startData: number, endData: number }

export class SimpleStockChart extends Component
    <chartProps, chartState> {
    constructor(props: chartProps, state: chartState) {
        super(props);

      //  console.log("CHART PROPS", props);
        this.state = {
            title: this.props.title,
            dataPoints: this.props.dataPoints,
            startData: this.props.startData,
            endData: this.props.endData
        }
    }
    //TODO: fix
    render() {
     //   console.log("CHART STATE", this.state)
        const options = {
            title: {
                text: this.state.title,
            },
            charts: [{
                data: [{
                    type: "line",
                    dataPoints: this.state.dataPoints,
                }]
            }],
            navigator: {
                slider: {
                    minimum: new Date(this.state.endData),
                    maximum: new Date(this.state.startData)
                }
            }
        };
        const containerProps = {
            backGround:"yellow",
            width: "80%",
            height: "450px",
            margin: "auto"
        };
        return (
            <div>
                <CanvasJSStockChart
                    options={options}
                    containerProps={containerProps}
                />
            </div>
        );
    }
}