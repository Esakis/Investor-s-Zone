import React, { Component, useState, useEffect, SyntheticEvent } from 'react';
import { Link } from "react-router-dom";
import { currencyList } from "../constants/ConstantLocalValues";
import { Menu, Button, Icon, Header, Grid, Form, Segment, Divider } from 'semantic-ui-react';
import { Redirect } from "react-router-dom";


//tabelka

type currencyPanelProps = {
    data: []
}

type currencyPanelState = {
    response: []
}

//const [ammount, setAmmount] = useState('');

type tableCurrencyRow = {
    currency: string,
    average_rate: string,
    selling_rate: string,
    buying_rate: string,
}




class CurrencyPanel extends Component<any, any> {
    constructor(props: currencyPanelProps, state: currencyPanelState) {
        super(props);



        this.state = {
            rows: [],
            valueInput: HTMLElement,
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
        let array: any[] = [];
        const promise = async () => {
            let response = await fetch(`https://serene-sierra-46576.herokuapp.com/https://internetowykantor.pl/cms/currency_money/?last-update=${Date.now() - 1}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            return response.json()
        }

        promise().then(data => {
            dispatchEvent(new CustomEvent("currenciesDataUpdated", {
                detail: {
                    data: data
                }
            }));

            this.setState({
                response: array
            })
            // console.log('DATA FROM GET CURRENCY DISPLAY', data)
            this.setTable(data);
        })
    }

    private setTable(dataObject) {
        // console.log("TABLE DATA rates", dataObject.rates, dataObject["rates"])
        let rates = dataObject.rates;
        let rows = [];
        for (let currency of currencyList) {
            if (rates[currency]) {
                let { average_rate, selling_rate, buying_rate } = rates[currency];
                // console.log("row data:", currency, average_rate, selling_rate, buying_rate)
                rows.push({ currency, average_rate, selling_rate, buying_rate })
                this.setState({ rows: rows })
            }
        }
        console.log("RATES AFTER LOOP", this.state.rows)
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


    private putExchangeValue() {
        const formData =

        {
            email: this.state.selectEmail,
            password: this.state.selectPassword,
            pln: parseFloat(this.state.selectCalculateValue),
            eur: parseFloat(this.state.currentExchangeValue),
        }
        console.log(formData);


        const promise = async () => {
            const response = await fetch('https://localhost:44349/api/account/exchange/' + this.state.selectEmail, {
                method: 'PUT',
                mode: 'cors',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            return response.json()
        }
        console.log(formData);
        promise().then(data => { console.log(data) });

    }

    //---------------------------------------------------------------------------


    private putExchangeValuePLN() {
        const formData =

        {
            email: this.state.selectEmail,
            password: this.state.selectPassword,
            pln: parseFloat(this.state.currentExchangeValuePLN),
            eur: parseFloat(this.state.selectCalculateValuePLN),
        }
        console.log(formData);


        const promise = async () => {
            const response = await fetch('https://localhost:44349/api/account/exchangePLN/' + this.state.selectEmail, {
                method: 'PUT',
                mode: 'cors',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            return response.json()
        }
        console.log(formData);
        promise().then(data => { console.log(data) });
        
    }
    

    //---------------------------------------------------------------------------

    render() {



        if (this.state.rows.length < 1)
            return null;
        else {
           


                return (
                    <Segment placeholder inverted color='grey'>
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
                                                    <td><Link to={{ pathname: `/currency/${row.currency}`, currency: row.currency }}>{row.currency}</Link></td>
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