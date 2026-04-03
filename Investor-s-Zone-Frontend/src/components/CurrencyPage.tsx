import { SimpleStockChart } from './StockChart'
import CurrencyPanel from "./CurrencyPanel";
import { Component } from "react";
import { Connection } from "../utilities/Connection";
import { useParams } from 'react-router-dom';

//wyswietlanie wykresow

const baseCurrencyCredentialsStartValues: { currency: string, timePeriod: string, typeOfData: string } = {
    currency: 'EUR', timePeriod: '1year', typeOfData: 'avg'
}

type currencyPageProps = {
    currency: string,
}

type currencyPageState = {
    responseData: any,
    title: string,
    currency: string,
    dataPoints: any[],
    startData: number,
    stockChartData: stockDataTypes,
    chartDataReady: boolean,
    chart?: any
}

type stockDataTypes = {
    title: string,
    dataPoints: any[],
    startData: number,
    endData: number
}

export class CurrencyPage extends Component<currencyPageProps, currencyPageState> {
    private baseCurrencyCredentials: { currency: string, timePeriod: string, typeOfData: string } = baseCurrencyCredentialsStartValues;
    private connection: Connection = Connection.getInstance();

    constructor(props: currencyPageProps) {
        super(props);
        this.state = {
            stockChartData: undefined as any,
            currency: props.currency,
            title: props.currency + "/PLN",
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

    // componentDidUpdate(prevProps: Readonly<currencyPageProps>, prevState: Readonly<currencyPageState>, snapshot?: any) {
    //     this.getCurrencyChartData(this.state.currency);
    // }

    private setEventListeners() {
        // @ts-ignore
        window.addEventListener("stockChartDataDataUpdated", (event: CustomEvent) => {
         //   console.log("stockChartDataDataUpdated detail", event.detail)
        });
    }


    private getChartDataPoints(data: any) {
        if (!data?.rates) return [];
        return data.rates.map((r: any) => ({
            x: new Date(r.effectiveDate),
            y: r.mid,
        }));
    }

    private timePeriodToCount(timePeriod: string): number {
        const map: Record<string, number> = {
            '1day': 3, '1week': 7, '1month': 22,
            '3months': 65, '6months': 130, '1year': 252,
        };
        return map[timePeriod] ?? 252;
    }

    private getCurrencyChartData(
        currency: string = this.baseCurrencyCredentials.currency,
        timePeriod: string = this.baseCurrencyCredentials.timePeriod,
        typeOfValues: string = this.baseCurrencyCredentials.typeOfData
    ) {
        const count = this.timePeriodToCount(timePeriod);
        const url = `https://api.nbp.pl/api/exchangerates/rates/a/${currency.toLowerCase()}/last/${count}/?format=json`;

        fetch(url)
            .then(r => r.json())
            .then(data => {
                const dataPoints = this.getChartDataPoints(data);
                this.setState({ responseData: data, dataPoints });
                this.connection.setCurrencyFetchData(currency, timePeriod, typeOfValues);
                if (dataPoints.length > 0) this.updateDataChart();
            })
            .catch(() => { /* NBP not available */ });
    }

    private updateDataChart() {
        let stockChartData = {
            title: this.state.title,
            dataPoints: this.state.dataPoints,
            startData: this.state.dataPoints[0].x,
            endData: this.state.dataPoints[this.state.dataPoints.length - 1].x
        };
        this.setState({ stockChartData: stockChartData, chartDataReady: true })
       // console.log("state CHARRT DATA ", this.state.stockChartData, this.state.chartDataReady)
    }

    render() {
     //   console.log("stockchartData", this.state.stockChartData)
        // let renderedChart = this.state.chartDataReady ? this.state.chart : null;
        // console.log("renderedChart", renderedChart)
        return (
           
            <div style={{ width: '70%', height: '70%', backgroundColor:"lightgrey"}}>
                
                    <div className=" currencyChart ui segment right  floated ">

                    {this.state.chartDataReady === true && <SimpleStockChart
                        title={this.state.stockChartData.title}
                        dataPoints={this.state.stockChartData.dataPoints}
                        startData={this.state.stockChartData.startData}
                        endData={this.state.stockChartData.endData} />}


                </div>
                <nav className="currencyPanelNavbar ">
                    <CurrencyPanel />
                </nav>
                </div>
         
           
        );
    }
}

export function CurrencyPageWrapper() {
    const { currency } = useParams();
    return <CurrencyPageInner currency={currency || 'EUR'} />;
}

const CurrencyPageInner = CurrencyPage;