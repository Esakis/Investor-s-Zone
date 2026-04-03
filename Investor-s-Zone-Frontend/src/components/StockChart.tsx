import { Component } from "react"
import CanvasJSReact from '../libs/canvasjs.stock.react.jsx';

let CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;


type chartProps = { title: string, dataPoints: any, startData: number, endData: number }

export class SimpleStockChart extends Component<chartProps> {
    render() {
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
                    minimum: new Date(this.props.endData),
                    maximum: new Date(this.props.startData)
                }
            }
        };
        const containerProps = {
            background: "yellow",
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