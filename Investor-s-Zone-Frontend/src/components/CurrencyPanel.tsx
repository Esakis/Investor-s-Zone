import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { currencyList } from "../constants/ConstantLocalValues";
import { Button, Icon, Header, Grid, Form, Segment, Divider } from 'semantic-ui-react';

type tableCurrencyRow = {
    currency: string,
    average_rate: string,
    selling_rate: string,
    buying_rate: string,
}

type CurrencyPanelProps = {
    email?: string,
    hideExchangeForm?: boolean,
}

type CurrencyPanelState = {
    rows: tableCurrencyRow[],
    isLoading: boolean,
    selectEmail: string,
    selectPassword: string,
    selectedCurrencyValue: string,
    selectedCurrencyValuePLN: string,
    selectCalculateValue: string,
    selectCalculateValuePLN: string,
    currentExchangeValue: string,
    currentExchangeValuePLN: string,
}

class CurrencyPanel extends Component<CurrencyPanelProps, CurrencyPanelState> {

    private currenciesListener: ((e: Event) => void) | null = null;

    constructor(props: CurrencyPanelProps) {
        super(props);
        this.state = {
            rows: [],
            isLoading: true,
            selectEmail: props.email ?? '',
            selectPassword: '',
            selectedCurrencyValue: '',
            selectedCurrencyValuePLN: '',
            selectCalculateValue: '',
            selectCalculateValuePLN: '',
            currentExchangeValue: '',
            currentExchangeValuePLN: '',
        };
    }

    componentDidMount() {
        this.currenciesListener = (e: Event) => {
            this.setTable((e as CustomEvent).detail.data);
        };
        window.addEventListener('currenciesDataUpdated', this.currenciesListener);

        fetch('https://api.nbp.pl/api/exchangerates/tables/C/?format=json')
            .then(r => r.json())
            .then(data => {
                dispatchEvent(new CustomEvent('currenciesDataUpdated', { detail: { data } }));
                this.setTable(data);
            })
            .catch(() => this.setState({ isLoading: false }));
    }

    componentWillUnmount() {
        if (this.currenciesListener) {
            window.removeEventListener('currenciesDataUpdated', this.currenciesListener);
        }
    }

    componentDidUpdate(prevProps: CurrencyPanelProps) {
        if (prevProps.email !== this.props.email && this.props.email) {
            this.setState({ selectEmail: this.props.email });
        }
    }

    private setTable(data: any) {
        const nbpRates: any[] = Array.isArray(data) ? (data[0]?.rates ?? []) : [];
        const rateMap: Record<string, any> = {};
        for (const r of nbpRates) rateMap[r.code] = r;

        const rows: tableCurrencyRow[] = [];
        for (const currency of currencyList) {
            const r = rateMap[currency];
            if (r) {
                rows.push({
                    currency,
                    average_rate: ((r.bid + r.ask) / 2).toFixed(4),
                    selling_rate: r.ask.toFixed(4),
                    buying_rate: r.bid.toFixed(4),
                });
            }
        }
        this.setState({ rows, isLoading: false });
    }

    private setCurrency(value: string) {
        this.setState({ selectedCurrencyValue: value });
    }

    private setCalculateValue(value: string) {
        this.setState({ selectCalculateValue: value });
        const rate = parseFloat(this.state.selectedCurrencyValue);
        if (rate > 0) {
            this.setState({ currentExchangeValue: (parseFloat(value) / rate).toFixed(2) });
        }
    }

    private setCurrencyPLN(value: string) {
        this.setState({ selectedCurrencyValuePLN: value });
    }

    private setCalculateValuePLN(value: string) {
        this.setState({ selectCalculateValuePLN: value });
        const rate = parseFloat(this.state.selectedCurrencyValuePLN); // bugfix: was selectedCurrencyValue
        if (rate > 0) {
            this.setState({ currentExchangeValuePLN: (parseFloat(value) * rate).toFixed(2) });
        }
    }

    private putExchangeValue(e: React.FormEvent) {
        e.preventDefault();
        const formData = {
            email: this.state.selectEmail || this.props.email,
            password: this.state.selectPassword,
            pln: parseFloat(this.state.selectCalculateValue),
            eur: parseFloat(this.state.currentExchangeValue),
        };
        fetch('https://localhost:44349/api/account/exchange/' + formData.email, {
            method: 'PUT',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' },
        }).catch(() => { /* backend not available */ });
    }

    private putExchangeValuePLN(e: React.FormEvent) {
        e.preventDefault();
        const formData = {
            email: this.state.selectEmail || this.props.email,
            password: this.state.selectPassword,
            pln: parseFloat(this.state.currentExchangeValuePLN),
            eur: parseFloat(this.state.selectCalculateValuePLN),
        };
        fetch('https://localhost:44349/api/account/exchangePLN/' + formData.email, {
            method: 'PUT',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' },
        }).catch(() => { /* backend not available */ });
    }

    render() {
        const { hideExchangeForm, email: propEmail } = this.props;
        const { rows, isLoading, currentExchangeValue, currentExchangeValuePLN } = this.state;

        if (isLoading) {
            return (
                <div className="loading-box">
                    <Icon name="circle notch" loading />
                    Pobieranie kursów NBP…
                </div>
            );
        }

        if (rows.length === 0) {
            return (
                <div className="loading-box">
                    <Icon name="warning sign" /> Brak danych. Sprawdź połączenie.
                </div>
            );
        }

        const ratesTable = (
            <table className="rates-table">
                <thead>
                    <tr>
                        <th>Waluta</th>
                        <th>Kurs średni</th>
                        <th>Kurs sprzedaży</th>
                        <th>Kurs kupna</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.currency}>
                            <td><Link to={`/currency/${row.currency}`}>{row.currency}</Link></td>
                            <td>{row.average_rate}</td>
                            <td>{row.selling_rate}</td>
                            <td>{row.buying_rate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );

        if (hideExchangeForm) {
            return ratesTable;
        }

        return (
            <Segment inverted color='grey'>
                <Grid columns={2} stackable textAlign='center'>
                    <Divider />
                    <Grid.Row verticalAlign='middle'>

                        {/* ---- Exchange forms ---- */}
                        <Grid.Column>
                            <Grid.Row verticalAlign='middle'>
                                <Form onSubmit={this.putExchangeValue.bind(this)} unstackable>
                                    <Header as="h3">PLN → Waluta</Header>

                                    {!propEmail && (
                                        <Form.Group widths={1}>
                                            <Form.Input
                                                type="email"
                                                label="Email"
                                                placeholder="email"
                                                required
                                                onChange={e => this.setState({ selectEmail: e.target.value })}
                                            />
                                        </Form.Group>
                                    )}

                                    <Form.Group widths={1}>
                                        <Form.Input
                                            label="Hasło"
                                            placeholder="hasło"
                                            type="password"
                                            required
                                            onChange={e => this.setState({ selectPassword: e.target.value })}
                                        />
                                    </Form.Group>

                                    <Form.Group widths={2}>
                                        <Form.Input
                                            label="Kwota PLN"
                                            type="number"
                                            min="0.01"
                                            step="0.01"
                                            required
                                            onChange={e => this.setCalculateValue(e.target.value)}
                                        />
                                        <Form.Field>
                                            <label>Waluta</label>
                                            <select
                                                className="form-select"
                                                defaultValue=""
                                                onChange={e => this.setCurrency(e.target.value)}
                                            >
                                                <option value="" disabled>Wybierz walutę</option>
                                                {rows.map(row => (
                                                    <option key={row.currency} value={row.selling_rate}>
                                                        {row.currency} — {row.selling_rate}
                                                    </option>
                                                ))}
                                            </select>
                                        </Form.Field>
                                    </Form.Group>

                                    <Button type="submit" inverted color="teal" icon labelPosition="left">
                                        <Icon name="shopping cart" />
                                        {currentExchangeValue ? `Otrzymasz: ${currentExchangeValue}` : 'Kup'}
                                    </Button>
                                </Form>
                            </Grid.Row>

                            <Grid.Row verticalAlign='middle' style={{ marginTop: '28px' }}>
                                <Form onSubmit={this.putExchangeValuePLN.bind(this)} unstackable>
                                    <Header as="h3">Waluta → PLN</Header>

                                    {!propEmail && (
                                        <Form.Group widths={1}>
                                            <Form.Input
                                                type="email"
                                                label="Email"
                                                placeholder="email"
                                                required
                                                onChange={e => this.setState({ selectEmail: e.target.value })}
                                            />
                                        </Form.Group>
                                    )}

                                    <Form.Group widths={1}>
                                        <Form.Input
                                            label="Hasło"
                                            placeholder="hasło"
                                            type="password"
                                            required
                                            onChange={e => this.setState({ selectPassword: e.target.value })}
                                        />
                                    </Form.Group>

                                    <Form.Group widths={2}>
                                        <Form.Input
                                            label="Kwota waluty"
                                            type="number"
                                            min="0.01"
                                            step="0.01"
                                            required
                                            onChange={e => this.setCalculateValuePLN(e.target.value)}
                                        />
                                        <Form.Field>
                                            <label>Waluta</label>
                                            <select
                                                className="form-select"
                                                defaultValue=""
                                                onChange={e => this.setCurrencyPLN(e.target.value)}
                                            >
                                                <option value="" disabled>Wybierz walutę</option>
                                                {rows.map(row => (
                                                    <option key={row.currency} value={row.buying_rate}>
                                                        {row.currency} — {row.buying_rate}
                                                    </option>
                                                ))}
                                            </select>
                                        </Form.Field>
                                    </Form.Group>

                                    <Button type="submit" inverted color="teal" icon labelPosition="left">
                                        <Icon name="shopping cart" />
                                        {currentExchangeValuePLN ? `Otrzymasz: ${currentExchangeValuePLN} PLN` : 'Sprzedaj'}
                                    </Button>
                                </Form>
                            </Grid.Row>
                        </Grid.Column>

                        {/* ---- Rates table ---- */}
                        <Grid.Column>
                            {ratesTable}
                        </Grid.Column>

                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}

export default CurrencyPanel;
