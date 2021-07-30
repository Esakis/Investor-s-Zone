import React, {Component, useState, useEffect} from 'react';
import {Connection} from "../utilities/Connection";
import {Link} from "react-router-dom";
import asyncComponent from "./hoc/asyncComponent";
import {currencyList} from "../constants/ConstantLocalValues";
import ReactDOM from 'react-dom'

type currencyPanelProps = {
    data: []
}

type currencyPanelState = {
    response: []
}

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
            rows: []
        }
    }
    
    componentDidMount() {
        this.setEventListeners();
        let array: any[] = [];
        const promise = async () => {
            let response = await fetch(`https://serene-sierra-46576.herokuapp.com/https://internetowykantor.pl/cms/currency_money/?last-update=${Date.now()-1}`, {
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
        for(let currency of currencyList) {
            if(rates[currency]) {
                let {average_rate, selling_rate, buying_rate} = rates[currency];
                // console.log("row data:", currency, average_rate, selling_rate, buying_rate)
                rows.push({currency, average_rate, selling_rate, buying_rate})
                this.setState({rows: rows})
            }
        }
        // console.log("RATES AFTER LOOP", this.state.rows)
    }
    
    private setEventListeners() {
        // @ts-ignore
        window.addEventListener("currenciesDataUpdated", (event: CustomEvent) => {
            // console.log("detail", event.detail, "rates", event.detail.data)
            this.setTable(event.detail.data)
        });
    }
        
    render() {
        if(this.state.rows.length < 1)
            return null;
        else {
            // console.log("ROWS BEFORE RENDER", this.state.rows)
            return (
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
                            <td><Link to={{pathname: `/currency/${row.currency}`, currency: row.currency}}>{row.currency}</Link></td>
                            <td>{row.average_rate}</td>
                            <td>{row.selling_rate}</td>
                            <td>{row.buying_rate}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )
        }
    }
}



export default CurrencyPanel;