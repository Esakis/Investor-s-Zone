import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { currencyList } from "../constants/ConstantLocalValues";
import { Button, Icon, Header, Grid, Form, Segment, Divider } from 'semantic-ui-react';


//tabelka

type currencyPanelProps = {
    data: []
}

type tableCurrencyRow = {
    currency: string,
    average_rate: string,
    selling_rate: string,
    buying_rate: string,
}




class CurrencyPanel extends Component<any, any> {
    constructor(props: currencyPanelProps) {
        super(props);



        this.state = {
            rows: [],
            valueInput: null,
            currentExchangeValue: "",
            selectedCurrencyValue: "",
            email: "",
            password: "",
            eur: 0,
            selectEmail: "",
            selectPassword: "",
            selectCalculateValue: "",
            selectCalculateValuePLN: "",
            currentExchangeValuePLN: "",
            selectedCurrencyValuePLN: "",
            pln: 0,
           

        }
    }




    componentDidMount() {
        this.setEventListeners();
        fetch('https://api.nbp.pl/api/exchangerates/tables/C/?format=json')
            .then(r => r.json())
            .then(data => {
                dispatchEvent(new CustomEvent('currenciesDataUpdated', { detail: { data } }));
                this.setTable(data);
            })
            .catch(() => { /* NBP not available */ });
    }

    private setTable(data: any) {
        // NBP Table C format: [{rates: [{code, bid, ask}, ...]}]
        const nbpRates: any[] = Array.isArray(data) ? (data[0]?.rates ?? []) : [];
        const rateMap: Record<string, any> = {};
        for (const r of nbpRates) {
            rateMap[r.code] = r;
        }
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
        this.setState({ rows });
    }

    private setEventListeners() {
        // @ts-ignore
        window.addEventListener("currenciesDataUpdated", (event: CustomEvent) => {
            // console.log("detail", event.detail, "rates", event.detail.data)
            this.setTable(event.detail.data)
        });
    }

   


    private setEmail(value: string) {
        this.setState({ selectEmail: value });
        console.log(this.state);
    }
    private setPassword(value: string) {
        this.setState({ selectPassword: value });
        console.log(this.state);
    }

    private setCurrency(value: string) {
        this.setState({ selectedCurrencyValue: value });
        console.log(this.state);
    }
    private setCalculateValue(value: string) {
        this.setState({ selectCalculateValue: value });
        let calculatedValue: number = parseFloat(value) / parseFloat(this.state.selectedCurrencyValue);
        this.setState({ currentExchangeValue: calculatedValue.toFixed(2) });
        console.log(calculatedValue);
    }


    private setCurrencyPLN(value: string) {
        this.setState({ selectedCurrencyValuePLN: value });
        console.log(this.state);
    }
    private setCalculateValuePLN(value: string) {
        this.setState({ selectCalculateValuePLN: value });
        let calculatedValuePLN: number = parseFloat(value) * parseFloat(this.state.selectedCurrencyValue);
        this.setState({ currentExchangeValuePLN: calculatedValuePLN.toFixed(2) });
    }


    //---------------------------------------------------------------------------


    private putExchangeValue(e: React.FormEvent) {
        e.preventDefault();
        const formData = {
            email: this.state.selectEmail,
            password: this.state.selectPassword,
            pln: parseFloat(this.state.selectCalculateValue),
            eur: parseFloat(this.state.currentExchangeValue),
        };
        fetch('https://localhost:44349/api/account/exchange/' + this.state.selectEmail, {
            method: 'PUT',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' },
        }).catch(() => { /* backend not available */ });
    }

    //---------------------------------------------------------------------------

    private putExchangeValuePLN(e: React.FormEvent) {
        e.preventDefault();
        const formData = {
            email: this.state.selectEmail,
            password: this.state.selectPassword,
            pln: parseFloat(this.state.currentExchangeValuePLN),
            eur: parseFloat(this.state.selectCalculateValuePLN),
        };
        fetch('https://localhost:44349/api/account/exchangePLN/' + this.state.selectEmail, {
            method: 'PUT',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' },
        }).catch(() => { /* backend not available */ });
    }
    

    //---------------------------------------------------------------------------

    render() {



        if (this.state.rows.length < 1)
            return null;
        else {
           


                return (
                    <Segment inverted color='grey'>
                        <Grid columns={2} stackable textAlign='center'>
                            <Divider></Divider>

                            <Grid.Row verticalAlign='middle'>
                                <Grid.Column >
                                    <Grid.Row verticalAlign='middle'>
                                        <Form onSubmit={this.putExchangeValue.bind(this)} unstackable>
                                            <Header as="h3"> Exchange PLN on Currency  </Header>
                                            <div className="ui bottom  labeled input">
                                            </div>


                                            <Form.Group widths={1}>
                                                <Form.Input
                                                    type="email"
                                                    onChange={e => this.setEmail(e.target.value)}
                                                    name='Email'
                                                    placeholder='email'
                                                    id="email" required />

                                                <Form.Input
                                                    placeholder='Password'
                                                    type='password'
                                                    onChange={e => this.setPassword(e.target.value)} />

                                            </Form.Group>
                                            <Form.Group widths={1}>
                                                <Form.Input type="number" onChange={e => this.setCalculateValue(e.target.value)} name='Ammount' id="valueLabel" required />


                                                <select id="currencySelector" className="form-select" onChange={e => this.setCurrency(e.target.value)} aria-label="Default select example" >
                                                    <option selected>Currency</option>
                                                    {this.state.rows.map((row: tableCurrencyRow) => (
                                                        <option value={row.selling_rate}>{row.currency} {row.selling_rate}</option>
                                                    ))}
                                                </select>
                                            </Form.Group>

                                            <Button type="submit" inverted color='teal' icon labelPosition='left' >
                                                <Icon name='shopping cart' />

                                                {this.state.currentExchangeValue}

                                            </Button>
                                        </Form>
                                    </Grid.Row>






                                    <Grid.Row verticalAlign='middle'>
                                        <p>  </p>
                                        <Form onSubmit={this.putExchangeValuePLN.bind(this)} unstackable>

                                            <Header as="h3">Exchange Currency on PLN </Header>
                                            <div className="ui bottom  labeled input">
                                            </div>


                                            <Form.Group widths={1}>
                                                <Form.Input
                                                    type="email"
                                                    onChange={e => this.setEmail(e.target.value)}
                                                    name='Email'
                                                    placeholder='email'
                                                    id="email" required />

                                                <Form.Input
                                                    placeholder='Password'
                                                    type='password'
                                                    onChange={e => this.setPassword(e.target.value)} />

                                            </Form.Group>
                                            <Form.Group widths={1}>
                                                <Form.Input type="number" onChange={e => this.setCalculateValuePLN(e.target.value)} name='Ammount' id="valueLabel" required />


                                                <select id="currencySelector" className="form-select" onChange={e => this.setCurrencyPLN(e.target.value)} aria-label="Default select example" >
                                                    <option selected>Currency</option>
                                                    {this.state.rows.map((row: tableCurrencyRow) => (
                                                        <option value={row.buying_rate}>{row.currency} {row.buying_rate}</option>
                                                    ))}
                                                </select>

                                            </Form.Group>

                                            <Button type="submit" inverted color='teal' icon labelPosition='left' >
                                                <Icon name='shopping cart' />

                                                {this.state.currentExchangeValuePLN}

                                            </Button>
                                        </Form>

                                    </Grid.Row>
                                </Grid.Column>





                                <Grid.Column>
                                    <table>
                                        <thead>
                                            <th>Currency</th>
                                            <th>Average rate</th>
                                            <th>Selling rate</th>
                                            <th>Buying rate</th>
                                        </thead>
                                        <tbody>
                                            {this.state.rows.map((row: tableCurrencyRow) => (

                                                <tr key={row.currency}>
                                                    <td><Link to={`/currency/${row.currency}`}>{row.currency}</Link></td>
                                                    <td>{row.average_rate}</td>
                                                    <td>{row.selling_rate}</td>
                                                    <td>{row.buying_rate}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>



                )
            }
        }
    }



export default CurrencyPanel;