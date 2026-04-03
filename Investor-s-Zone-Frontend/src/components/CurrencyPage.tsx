import { SimpleStockChart } from './StockChart';
import { Component } from "react";
import { Connection } from "../utilities/Connection";
import { useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

type currencyPageProps = { currency: string }

type currencyPageState = {
    responseData: any,
    title: string,
    dataPoints: any[],
    stockChartData: stockDataTypes,
    chartDataReady: boolean,
    selectedPeriod: string,
    isLoading: boolean,
}

type stockDataTypes = {
    title: string,
    dataPoints: any[],
    startData: Date,
    endData: Date,
}

const PERIODS = [
    { label: '1T',  value: '1week' },
    { label: '1M',  value: '1month' },
    { label: '3M',  value: '3months' },
    { label: '6M',  value: '6months' },
    { label: '1R',  value: '1year' },
];

const PERIOD_MAP: Record<string, number> = {
    '1week': 7, '1month': 22, '3months': 65, '6months': 130, '1year': 252,
};

export class CurrencyPage extends Component<currencyPageProps, currencyPageState> {
    private connection: Connection = Connection.getInstance();

    constructor(props: currencyPageProps) {
        super(props);
        this.state = {
            stockChartData: undefined as any,
            title: props.currency + " / PLN",
            dataPoints: [],
            responseData: [],
            chartDataReady: false,
            selectedPeriod: '1year',
            isLoading: true,
        };
    }

    componentDidMount() {
        this.fetchChart(this.props.currency, this.state.selectedPeriod);
    }

    componentDidUpdate(prevProps: currencyPageProps) {
        if (prevProps.currency !== this.props.currency) {
            this.setState({ chartDataReady: false, isLoading: true, title: this.props.currency + " / PLN" });
            this.fetchChart(this.props.currency, this.state.selectedPeriod);
        }
    }

    private fetchChart(currency: string, period: string) {
        const count = PERIOD_MAP[period] ?? 252;
        const url = `https://api.nbp.pl/api/exchangerates/rates/a/${currency.toLowerCase()}/last/${count}/?format=json`;

        this.setState({ isLoading: true });
        fetch(url)
            .then(r => r.json())
            .then(data => {
                if (!data?.rates) { this.setState({ isLoading: false }); return; }
                const dataPoints = data.rates.map((r: any) => ({
                    x: new Date(r.effectiveDate),
                    y: r.mid,
                }));
                this.connection.setCurrencyFetchData(currency, period, 'avg');
                this.setState({
                    responseData: data,
                    dataPoints,
                    stockChartData: {
                        title: currency + " / PLN",
                        dataPoints,
                        startData: dataPoints[0].x,
                        endData: dataPoints[dataPoints.length - 1].x,
                    },
                    chartDataReady: dataPoints.length > 0,
                    isLoading: false,
                });
            })
            .catch(() => this.setState({ isLoading: false }));
    }

    private handlePeriod(period: string) {
        this.setState({ selectedPeriod: period, chartDataReady: false });
        this.fetchChart(this.props.currency, period);
    }

    render() {
        const { currency } = this.props;
        const { chartDataReady, stockChartData, selectedPeriod, isLoading } = this.state;

        return (
            <div className="chart-page">
                <div className="chart-card">
                    <div className="chart-card__header">
                        <div>
                            <h2 className="chart-card__title">
                                <Icon name="chart line" />{currency} / PLN
                            </h2>
                            <p className="chart-card__sub">Źródło: Narodowy Bank Polski (NBP) — Tabela A, kurs średni</p>
                        </div>
                    </div>

                    <div className="period-bar">
                        {PERIODS.map(p => (
                            <button
                                key={p.value}
                                className={`period-btn${selectedPeriod === p.value ? ' active' : ''}`}
                                onClick={() => this.handlePeriod(p.value)}
                            >
                                {p.label}
                            </button>
                        ))}
                    </div>

                    {isLoading && (
                        <div className="loading-box">
                            <Icon name="circle notch" loading />
                            Ładowanie danych…
                        </div>
                    )}

                    {!isLoading && chartDataReady && (
                        <SimpleStockChart
                            title={stockChartData.title}
                            dataPoints={stockChartData.dataPoints}
                            startData={stockChartData.startData as any}
                            endData={stockChartData.endData as any}
                        />
                    )}

                    {!isLoading && !chartDataReady && (
                        <div className="loading-box">
                            <Icon name="warning sign" /> Brak danych dla tej waluty.
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export function CurrencyPageWrapper() {
    const { currency } = useParams();
    return <CurrencyPage currency={currency || 'EUR'} />;
}
