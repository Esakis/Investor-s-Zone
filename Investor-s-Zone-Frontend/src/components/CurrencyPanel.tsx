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
    [key: string]: string;
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
    selectedFromCurrency: string,
    selectedToCurrency: string,
    selectedFromCurrencyPLN: string,
    selectedToCurrencyPLN: string,
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
            selectedFromCurrency: '',
            selectedToCurrency: '',
            selectedFromCurrencyPLN: '',
            selectedToCurrencyPLN: '',
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
        
        // Debug current path
        console.log('Current pathname:', window.location.pathname);
        
        // Use exchange endpoint for exchange page, topup endpoint for other pages
        const isExchangePage = window.location.pathname.includes('exchange');
        const endpoint = isExchangePage 
            ? `https://localhost:44349/api/account/exchange/${email}`
            : `https://localhost:44349/api/account/topup/${email}`;
            
        console.log('Using endpoint:', endpoint, 'isExchangePage:', isExchangePage);
            
        fetch(endpoint, {
            credentials: 'include',
        })
            .then(r => r.json())
            .then(data => {
                console.log('=== FULL RAW DATA ===');
                console.log(JSON.stringify(data, null, 2));
                console.log('EUR value check:', data.eur, data.EUR);
                console.log('=== END RAW DATA ===');
                
                const balance: Balance = {
                    pln: parseFloat(data.pln ?? 0).toFixed(2),
                };
                
                // Add all currencies - use camelCase from backend
                currencyList.forEach(currency => {
                    const camelCaseKey = currency.toLowerCase();
                    balance[currency] = parseFloat(data[camelCaseKey] ?? 0).toFixed(2);
                });
                
                console.log('Processed balance:', balance);
                
                this.setState({
                    balance,
                    balanceLoading: false,
                });
            })
            .catch(error => {
                console.error('Error fetching balance:', error);
                this.setState({ balanceLoading: false });
            });
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

    private setFromCurrency(currency: string) {
        this.setState({ selectedFromCurrency: currency });
    }

    private setToCurrency(currency: string) {
        this.setState({ selectedToCurrency: currency });
    }

    private setFromCurrencyPLN(currency: string) {
        this.setState({ selectedFromCurrencyPLN: currency });
    }

    private setToCurrencyPLN(currency: string) {
        this.setState({ selectedToCurrencyPLN: currency });
    }

    private setCurrency(value: string) {
        this.setState({ selectedCurrencyValue: value });
    }

    private setCalculateValue(value: string) {
        this.setState({ selectCalculateValue: value });
        const rate = parseFloat(this.state.selectedCurrencyValue);
        if (rate > 0 && value)
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
        const { selectCalculateValue, currentExchangeValue, selectPassword, selectedToCurrency } = this.state;
        const email = this.state.selectEmail || this.props.email;
        
        // Debug logging
        console.log('=== PUT Exchange Debug ===');
        console.log('selectCalculateValue:', selectCalculateValue);
        console.log('currentExchangeValue:', currentExchangeValue);
        console.log('selectedToCurrency:', selectedToCurrency);
        console.log('selectPassword:', selectPassword);
        console.log('email:', email);
        
        // Build exchange data dynamically
        const formData: any = {
            email,
            password: selectPassword,
        };
        
        // Set PLN amount (from input)
        formData.pln = parseFloat(selectCalculateValue) || 0;
        
        // Set target currency amount
        if (selectedToCurrency) {
            formData[selectedToCurrency.toLowerCase()] = parseFloat(currentExchangeValue) || 0;
            console.log('Setting', selectedToCurrency.toLowerCase(), 'to:', formData[selectedToCurrency.toLowerCase()]);
        } else {
            formData.eur = parseFloat(currentExchangeValue) || 0;
            console.log('Setting eur to:', formData.eur);
        }
        
        console.log('Final formData:', formData);
        
        try {
            const response = await fetch(`https://localhost:44349/api/account/exchange/${email}`, {
                method: 'PUT',
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                const targetCurrency = selectedToCurrency || 'EUR';
                this.showNotif('success', `✓ Transakcja zakończona! Kupiono ${currentExchangeValue} ${targetCurrency} za ${selectCalculateValue} PLN.`);
                setTimeout(() => this.fetchBalance(), 500); // Opóźnienie 0.5s
            } else {
                const err = await response.json().catch(() => ({}));
                this.showNotif('error', `✗ Błąd: ${err.message ?? err.title ?? 'Transakcja nie powiodła się.'}`);
            }
        } catch (_e) {
            this.showNotif('error', '✗ Brak połączenia z serwerem backendu.');
        } finally {
            this.setState({ txLoading: false });
        }
    }

    private async putExchangeValuePLN(e: React.FormEvent) {
        e.preventDefault();
        this.setState({ txLoading: true });
        const { selectCalculateValuePLN, currentExchangeValuePLN, selectPassword, selectedFromCurrencyPLN, selectedToCurrencyPLN } = this.state;
        const email = this.state.selectEmail || this.props.email;
        
        // Build exchange data dynamically
        const formData: any = {
            email,
            password: selectPassword,
        };
        
        // Set PLN amount (to receive)
        formData.pln = parseFloat(currentExchangeValuePLN) || 0;
        
        // Set source currency amount (to sell)
        const sourceCurrency = selectedFromCurrencyPLN || 'EUR';
        formData[sourceCurrency.toLowerCase()] = parseFloat(selectCalculateValuePLN) || 0;
        
        try {
            const response = await fetch(`https://localhost:44349/api/account/exchangePLN/${email}`, {
                method: 'PUT',
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                this.showNotif('success', `✓ Transakcja zakończona! Sprzedano ${selectCalculateValuePLN} ${sourceCurrency}, otrzymano ${currentExchangeValuePLN} PLN.`);
                setTimeout(() => this.fetchBalance(), 500); // Opóźnienie 0.5s
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
                            (() => {
                                console.log('Rendering balance:', balance);
                                const currenciesWithBalance = currencyList.filter(currency => {
                                    const amount = parseFloat(balance[currency] || '0');
                                    return amount > 0;
                                });
                                console.log('Currencies with balance:', currenciesWithBalance);
                                
                                return (
                                    <>
                                        <span className="balance-bar__item balance-bar__item--pln">
                                            PLN: <strong>{balance.pln}</strong>
                                        </span>
                                        {currenciesWithBalance
                                            .slice(0, 8)
                                            .map(currency => (
                                                <span key={currency} className="balance-bar__item">
                                                    {currency}: <strong>{balance[currency] || '0.00'}</strong>
                                                </span>
                                            ))}
                                        {currenciesWithBalance.length > 8 && (
                                            <span className="balance-bar__item balance-bar__item--more">
                                                +{currenciesWithBalance.length - 8} więcej
                                            </span>
                                        )}
                                    </>
                                );
                            })()
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
                                            <label>Waluta docelowa (kurs sprzedaży)</label>
                                            <select className="form-select" defaultValue=""
                                                onChange={e => {
                                                    const value = e.target.value;
                                                    const [currency, rate] = value.split('|');
                                                    this.setState({ 
                                                        selectedToCurrency: currency,
                                                        selectedCurrencyValue: rate 
                                                    });
                                                    const amount = this.state.selectCalculateValue;
                                                    if (rate && amount) {
                                                        this.setState({ 
                                                            currentExchangeValue: (parseFloat(amount) / parseFloat(rate)).toFixed(4) 
                                                        });
                                                    }
                                                }}>
                                                <option value="" disabled>Wybierz walutę</option>
                                                {rows.map(row => (
                                                    <option key={row.currency} value={`${row.currency}|${row.selling_rate}`}>
                                                        {row.currency} — {row.selling_rate}
                                                    </option>
                                                ))}
                                            </select>
                                        </Form.Field>
                                    </Form.Group>

                                    {currentExchangeValue && this.state.selectedToCurrency && (
                                        <div className="exchange-preview">
                                            Otrzymasz: <strong>{currentExchangeValue}</strong> {this.state.selectedToCurrency}
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
                                            onChange={e => {
                                                const value = e.target.value;
                                                this.setState({ selectCalculateValuePLN: value });
                                                const rate = parseFloat(this.state.selectedCurrencyValuePLN);
                                                if (rate > 0 && value) {
                                                    this.setState({ 
                                                        currentExchangeValuePLN: (parseFloat(value) * rate).toFixed(2) 
                                                    });
                                                }
                                            }}
                                        />
                                        <Form.Field>
                                            <label>Waluta źródłowa (kurs kupna)</label>
                                            <select className="form-select" defaultValue=""
                                                onChange={e => {
                                                    const value = e.target.value;
                                                    const [currency, rate] = value.split('|');
                                                    this.setState({ 
                                                        selectedFromCurrencyPLN: currency,
                                                        selectedCurrencyValuePLN: rate 
                                                    });
                                                    const amount = this.state.selectCalculateValuePLN;
                                                    if (rate && amount) {
                                                        this.setState({ 
                                                            currentExchangeValuePLN: (parseFloat(amount) * parseFloat(rate)).toFixed(2) 
                                                        });
                                                    }
                                                }}>
                                                <option value="" disabled>Wybierz walutę</option>
                                                {rows.map(row => (
                                                    <option key={row.currency} value={`${row.currency}|${row.buying_rate}`}>
                                                        {row.currency} — {row.buying_rate}
                                                    </option>
                                                ))}
                                            </select>
                                        </Form.Field>
                                    </Form.Group>

                                    {currentExchangeValuePLN && this.state.selectedFromCurrencyPLN && (
                                        <div className="exchange-preview">
                                            Otrzymasz: <strong>{currentExchangeValuePLN} PLN</strong> za {this.state.selectCalculateValuePLN} {this.state.selectedFromCurrencyPLN}
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
