

const NBP_TABLE_C = 'https://api.nbp.pl/api/exchangerates/tables/C/?format=json';

function timePeriodToCount(timePeriod: string): number {
    const map: Record<string, number> = {
        '1day': 3,
        '1week': 7,
        '1month': 22,
        '3months': 65,
        '6months': 130,
        '1year': 252,
    };
    return map[timePeriod] ?? 252;
}

export class Connection {
    private static instance: Connection;
    public currencyData: any;
    public currentStockChartData: any;
    public currencyCredentials: { currency: string, timePeriod: string, typeOfData: string } = currencyCredentialsStartValues;
    currenciesUpdateInterval: number | undefined;

    constructor() {
        this.getCurrencyDisplay();
        this.setDataIntervals();
    }

    public static getInstance(): Connection {
        if (!Connection.instance) {
            Connection.instance = new Connection();
        }
        return Connection.instance;
    }

    public getCurrencyDisplay() {
        fetch(NBP_TABLE_C)
            .then(r => r.json())
            .then(data => {
                this.currencyData = data;
                dispatchEvent(new CustomEvent('currenciesDataUpdated', { detail: { data } }));
            })
            .catch(() => { /* NBP not available */ });
    }

    public getCurrencyChartData(
        currency: string = this.currencyCredentials.currency,
        timePeriod: string = this.currencyCredentials.timePeriod,
        _typeOfValues: string = this.currencyCredentials.typeOfData
    ) {
        const count = timePeriodToCount(timePeriod);
        const url = `https://api.nbp.pl/api/exchangerates/rates/a/${currency.toLowerCase()}/last/${count}/?format=json`;

        fetch(url)
            .then(r => r.json())
            .then(data => {
                this.currentStockChartData = data;
                const dataPoints = this.getChartDataPoints(data);
                if (dataPoints.length === 0) return;

                dispatchEvent(new CustomEvent('stockChartDataUpdated', {
                    detail: {
                        title: currency + '/PLN',
                        dataPoints,
                        startData: dataPoints[0].x,
                        endData: dataPoints[dataPoints.length - 1].x,
                    }
                }));

                this.currencyCredentials.currency = currency;
                this.currencyCredentials.timePeriod = timePeriod;
            })
            .catch(() => { /* NBP not available */ });
    }

    private setDataIntervals() {
        this.currenciesUpdateInterval = window.setInterval(() => {
            this.getCurrencyDisplay();
        }, 60_000);
    }

    private getChartDataPoints(data: any) {
        if (!data?.rates) return [];
        return data.rates.map((r: any) => ({
            x: new Date(r.effectiveDate),
            y: r.mid,
        }));
    }

    public setCurrencyFetchData(
        currency: string = this.currencyCredentials.currency,
        timePeriod: string = this.currencyCredentials.timePeriod,
        typeOfData: string = this.currencyCredentials.typeOfData
    ) {
        this.currencyCredentials.currency = currency || this.currencyCredentials.currency;
        this.currencyCredentials.timePeriod = timePeriod || this.currencyCredentials.timePeriod;
        this.currencyCredentials.typeOfData = typeOfData || this.currencyCredentials.typeOfData;
    }
}

const currencyCredentialsStartValues: { currency: string, timePeriod: string, typeOfData: string } = {
    currency: 'EUR', timePeriod: '1year', typeOfData: 'avg'
};
