import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { currencyList } from "../constants/ConstantLocalValues";
import { Button, Icon, Header, Grid, Form, Segment, Divider, Message } from 'semantic-ui-react';

type tableCurrencyRow = {
    currency: string,
    average_rate: string,
    selling_rate: string,
    buying_rate: string,
}

type Notification = {
    type: 'success' | 'error';
    message: string;
} | null;

type Balance = {
    pln: string;
    eur: string;
} | null;

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
    txLoading: boolean,
    notification: Notification,
    balance: Balance,
    balanceLoading: boolean,
}

class CurrencyPanel extends Component<CurrencyPanelProps, CurrencyPanelState> {

    private currenciesListener: ((e: Event) => void) | null = null;
    private notifTimer: ReturnType<typeof setTimeout> | null = null;

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
            txLoading: false,
            notification: null,
            balance: null,
            balanceLoading: false,
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

        if (this.props.email) this.fetchBalance();
    }

    componentWillUnmount() {
        if (this.currenciesListener)
            window.removeEventListener('currenciesDataUpdated', this.currenciesListener);
        if (this.notifTimer) clearTimeout(this.notifTimer);
    }

    componentDidUpdate(prevProps: CurrencyPanelProps) {
        if (prevProps.email !== this.props.email && this.props.email) {
            this.setState({ selectEmail: this.props.email });
            this.fetchBalance();
        }
    }

    private fetchBalance() {
        const email = this.props.email;
        if (!email) return;
        this.setState({ balanceLoading: true });
        fetch(`https://localhost:44349/api/account/topup/${email}`, {
            credentials: 'include',
        })
            .then(r => r.json())
            .then(data => this.setState({
                balance: { pln: parseFloat(data.pln ?? 0).toFixed(2), eur: parseFloat(data.eur ?? 0).toFixed(2) },
                balanceLoading: false,
            }))
            .catch(() => this.setState({ balanceLoading: false }));
    }

    private showNotif(type: 'success' | 'error', message: string) {
        if (this.notifTimer) clearTimeout(this.notifTimer);
        this.setState({ notification: { type, message } });
        this.notifTimer = setTimeout(() => this.setState({ notification: null }), 5000);
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
        if (rate > 0)
            this.setState({ currentExchangeValue: (parseFloat(value) / rate).toFixed(4) });
    }

    private setCurrencyPLN(value: string) {
        this.setState({ selectedCurrencyValuePLN: value });
    }

    private setCalculateValuePLN(value: string) {
        this.setState({ selectCalculateValuePLN: value });
        const rate = parseFloat(this.state.selectedCurrencyValuePLN);
        if (rate > 0)
            this.setState({ currentExchangeValuePLN: (parseFloat(value) * rate).toFixed(2) });
    }

    private async putExchangeValue(e: React.FormEvent) {
        e.preventDefault();
        this.setState({ txLoading: true });
        const { selectCalculateValue, currentExchangeValue, selectPassword } = this.state;
        const email = this.state.selectEmail || this.props.email;
        const formData = {
            email,
            password: selectPassword,
            pln: parseFloat(selectCalculateValue) || 0,
            eur: parseFloat(currentExchangeValue) || 0,
        };
        try {
            const response = await fetch(`https://localhost:44349/api/account/exchange/${email}`, {
                method: 'PUT',
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                this.showNotif('success', `✓ Transakcja zakończona! Kupiono ${currentExchangeValue} EUR za ${selectCalculateValue} PLN.`);
                this.fetchBalance();
            } else {
                const err = await response.json().catch(() => ({}));
                this.showNotif('error', `✗ Błąd: ${err.message ?? err.title ?? 'Transakcja nie powiodła się.'}`);
            }
        } catch (_e) {
            this.showNotif('error', '✗ Brak połączenia z serwerem backendu.');
        }
        this.setState({ txLoading: false });
    }

    private async putExchangeValuePLN(e: React.FormEvent) {
        e.preventDefault();
        this.setState({ txLoading: true });
        const { selectCalculateValuePLN, currentExchangeValuePLN, selectPassword } = this.state;
        const email = this.state.selectEmail || this.props.email;
        const formData = {
            email,
            password: selectPassword,
            pln: parseFloat(currentExchangeValuePLN) || 0,
            eur: parseFloat(selectCalculateValuePLN) || 0,
        };
        try {
            const response = await fetch(`https://localhost:44349/api/account/exchangePLN/${email}`, {
                method: 'PUT',
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                this.showNotif('success', `✓ Transakcja zakończona! Sprzedano ${selectCalculateValuePLN} waluty, otrzymano ${currentExchangeValuePLN} PLN.`);
                this.fetchBalance();
            } else {
                const err = await response.json().catch(() => ({}));
                this.showNotif('error', `✗ Błąd: ${err.message ?? err.title ?? 'Transakcja nie powiodła się.'}`);
            }
        } catch (_e) {
            this.showNotif('error', '✗ Brak połączenia z serwerem backendu.');
        }
        this.setState({ txLoading: false });
    }

    render() {
        const { hideExchangeForm, email: propEmail } = this.props;
        const { rows, isLoading, currentExchangeValue, currentExchangeValuePLN,
            txLoading, notification, balance, balanceLoading } = this.state;

        if (isLoading) {
            return (
                <div className="loading-box">
                    <Icon name="circle notch" loading /> Pobieranie kursów NBP…
                </div>
            );
        }

        if (rows.length === 0) {
            return (
                <div className="loading-box">
                    <Icon name="warning sign" /> Brak danych. Sprawdź połączenie z internetem.
                </div>
            );
        }

        const ratesTable = (
            <table className="rates-table">
                <thead>
                    <tr>
                        <th>Waluta</th>
                        <th>Kurs średni</th>
                        <th>Sprzedaż</th>
                        <th>Kupno</th>
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

        if (hideExchangeForm) return ratesTable;

        return (
            <Segment inverted color='grey'>

                {/* === Stan konta === */}
                {propEmail && (
                    <div className="balance-bar">
                        <span className="balance-bar__label">
                            <Icon name="credit card" /> Stan konta
                        </span>
                        {balanceLoading ? (
                            <span className="balance-bar__item"><Icon name="circle notch" loading /> ładowanie…</span>
                        ) : balance ? (
                            <>
                                <span className="balance-bar__item balance-bar__item--pln">
                                    PLN: <strong>{balance.pln}</strong>
                                </span>
                                <span className="balance-bar__item balance-bar__item--eur">
                                    EUR: <strong>{balance.eur}</strong>
                                </span>
                            </>
                        ) : (
                            <span className="balance-bar__item balance-bar__item--na">
                                <Icon name="warning sign" /> niedostępny (backend offline)
                            </span>
                        )}
                    </div>
                )}

                {/* === Powiadomienie o transakcji === */}
                {notification && (
                    <Message
                        positive={notification.type === 'success'}
                        negative={notification.type === 'error'}
                        onDismiss={() => this.setState({ notification: null })}
                    >
                        <Message.Header>
                            {notification.type === 'success' ? 'Transakcja udana' : 'Błąd transakcji'}
                        </Message.Header>
                        <p>{notification.message}</p>
                    </Message>
                )}

                <Grid columns={2} stackable textAlign='center'>
                    <Divider />
                    <Grid.Row verticalAlign='middle'>

                        {/* ---- Formularze wymiany ---- */}
                        <Grid.Column>
                            <Grid.Row verticalAlign='middle'>
                                <Form onSubmit={this.putExchangeValue.bind(this)} unstackable>
                                    <Header as="h3">PLN → Waluta</Header>

                                    {!propEmail && (
                                        <Form.Group widths={1}>
                                            <Form.Input
                                                type="email" label="Email" placeholder="email" required
                                                onChange={e => this.setState({ selectEmail: e.target.value })}
                                            />
                                        </Form.Group>
                                    )}

                                    <Form.Group widths={1}>
                                        <Form.Input
                                            label="Hasło" placeholder="hasło" type="password" required
                                            onChange={e => this.setState({ selectPassword: e.target.value })}
                                        />
                                    </Form.Group>

                                    <Form.Group widths={2}>
                                        <Form.Input
                                            label="Kwota PLN" type="number" min="0.01" step="0.01" required
                                            onChange={e => this.setCalculateValue(e.target.value)}
                                        />
                                        <Form.Field>
                                            <label>Waluta (kurs sprzedaży)</label>
                                            <select className="form-select" defaultValue=""
                                                onChange={e => this.setCurrency(e.target.value)}>
                                                <option value="" disabled>Wybierz walutę</option>
                                                {rows.map(row => (
                                                    <option key={row.currency} value={row.selling_rate}>
                                                        {row.currency} — {row.selling_rate}
                                                    </option>
                                                ))}
                                            </select>
                                        </Form.Field>
                                    </Form.Group>

                                    {currentExchangeValue && (
                                        <div className="exchange-preview">
                                            Otrzymasz: <strong>{currentExchangeValue}</strong> walut
                                        </div>
                                    )}

                                    <Button type="submit" inverted color="teal" loading={txLoading}
                                        icon labelPosition="left" disabled={txLoading}>
                                        <Icon name="shopping cart" />
                                        Kup walutę
                                    </Button>
                                </Form>
                            </Grid.Row>

                            <Grid.Row verticalAlign='middle' style={{ marginTop: '32px' }}>
                                <Form onSubmit={this.putExchangeValuePLN.bind(this)} unstackable>
                                    <Header as="h3">Waluta → PLN</Header>

                                    {!propEmail && (
                                        <Form.Group widths={1}>
                                            <Form.Input
                                                type="email" label="Email" placeholder="email" required
                                                onChange={e => this.setState({ selectEmail: e.target.value })}
                                            />
                                        </Form.Group>
                                    )}

                                    <Form.Group widths={1}>
                                        <Form.Input
                                            label="Hasło" placeholder="hasło" type="password" required
                                            onChange={e => this.setState({ selectPassword: e.target.value })}
                                        />
                                    </Form.Group>

                                    <Form.Group widths={2}>
                                        <Form.Input
                                            label="Kwota waluty" type="number" min="0.01" step="0.01" required
                                            onChange={e => this.setCalculateValuePLN(e.target.value)}
                                        />
                                        <Form.Field>
                                            <label>Waluta (kurs kupna)</label>
                                            <select className="form-select" defaultValue=""
                                                onChange={e => this.setCurrencyPLN(e.target.value)}>
                                                <option value="" disabled>Wybierz walutę</option>
                                                {rows.map(row => (
                                                    <option key={row.currency} value={row.buying_rate}>
                                                        {row.currency} — {row.buying_rate}
                                                    </option>
                                                ))}
                                            </select>
                                        </Form.Field>
                                    </Form.Group>

                                    {currentExchangeValuePLN && (
                                        <div className="exchange-preview">
                                            Otrzymasz: <strong>{currentExchangeValuePLN} PLN</strong>
                                        </div>
                                    )}

                                    <Button type="submit" inverted color="teal" loading={txLoading}
                                        icon labelPosition="left" disabled={txLoading}>
                                        <Icon name="shopping cart" />
                                        Sprzedaj walutę
                                    </Button>
                                </Form>
                            </Grid.Row>
                        </Grid.Column>

                        {/* ---- Tabela kursów ---- */}
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
