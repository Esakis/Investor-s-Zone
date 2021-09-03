import React, { Component, useState, useEffect, SyntheticEvent } from 'react';
import { Connection } from "../utilities/Connection";
import { Link } from "react-router-dom";
import asyncComponent from "./hoc/asyncComponent";
import { currencyList } from "../constants/ConstantLocalValues";
import { Redirect } from "react-router-dom";
import { Menu, Button, Icon, Header, Grid,Form ,Segment, Divider} from 'semantic-ui-react';
import { data } from 'jquery';


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
                selectedCurrencyValue: "1",
                email: "",
                password:""
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
        private calculateValue(value: string) {
            console.log("changin");
            let calculatedValue: number = parseFloat(value) * parseFloat(this.state.selectedCurrencyValue);
            this.setState({ currentExchangeValue: calculatedValue.toFixed(2) });
        }

        private setCurrency(value: string) {
            this.setState({ selectedCurrencyValue: value });
        }
        private setEmail(value: string) {
            this.setState({ selectcemail: value });
        }
        private setPassword(value: string) {
            this.setState({ selectcemail: value });
        }



     //   private money = async (e: SyntheticEvent) => {

     //       e.preventDefault();

       //     const promise = async () => {
      //          const response = await fetch('https://localhost:44349/api/account/exchange/', {
      //              method: 'PUT',
      //              mode: 'cors',
      //              headers: {
      //                  'Content-Type': 'application/json'
      //              },
       //         });
//
       //         return response.json();
       //     }
      //  }




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
                                    <Form unstackable>
                                        <Header as="h3"> Exchange </Header>
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
                                                onChange={e => this.setPassword(e.target.value)} required />

                                        </Form.Group>
                                        <Form.Group widths={1}>
                                            <Form.Input type="number" onChange={e => this.calculateValue(e.target.value)} name='Ammount' placeholder='' id="valueLabel" required />


                                            <select id="currencySelector" className="form-select" onChange={e => this.setCurrency(e.target.value)} aria-label="Default select example" >
                                                <option selected>Currency</option>
                                                {this.state.rows.map((row: tableCurrencyRow) => (
                                                    <option value={row.average_rate}>{row.currency} {row.average_rate}</option>
                                                ))}
                                            </select>

                                        </Form.Group>
                                        <Form.Group >
                                            <Button inverted color='teal' icon labelPosition='left' >
                                                <Icon name='shopping cart' />
                                                {this.state.currentExchangeValue}

                                            </Button>




                                        </Form.Group>
                                        <i className="money"></i>





                                    </Form>

                                    <Form.Checkbox label='I agree to the Terms and Conditions' />
                                    <Button type='submit'>Submit</Button>


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