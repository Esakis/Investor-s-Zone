import * as react from "react";
import { SyntheticEvent, useEffect, useState } from "react";
import React = require("react");
import { Redirect } from "react-router-dom";
import './NavMenu.css';
import { Menu, Button, Icon, Header, Grid, Divider, DropdownMenu, Form } from 'semantic-ui-react';

const Exchange = (props: { email: string }) => {


     const [dataPLN, setDataPLN] = useState('');
     const [dataEUR, setDataEUR] = useState('');
     const [dataUSD, setDataUSD] = useState('');
     const [email, setEmail] = useState('');
     const [pln, setPLN] = useState('');
     const [eur, setEUR] = useState('');
    // const [usd, setUSD] = useState('');
    
     const [redirect, setRedirect] = useState(false);
 

    useEffect(() => {
        (
            async () => {
                const response = await fetch('https://internetowykantor.pl/cms/currency_money/?last-update=${Date.now()-1}' , {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                    credentials: "include",

                });
                const content = await response.json();
                setDataEUR(content.EUR);
                //setDataUSD(content.usd);
                console.log(dataEUR)
            }
        )();

    });



    const submitExchange = async (e: SyntheticEvent) => {

        e.preventDefault();

        await fetch('https://localhost:44349/api/account/exchange/' + props.email, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({
                email,
                pln,
                eur
                //usd
              
                
               

            })
        });

        setRedirect(true);
    }

    if (redirect) {
        return <Redirect to={"/api/account/" + props.email} />;
    }

 


  
    return (



            <div className="ui raised very padded text container segment">
                <div className="ui bottom  labeled input">
                    <h3>Your Account Balance:</h3>
                    <button className="money bill alternate outline icon "> {dataPLN} PLN
                    </button>
                    <button className="money bill alternate outline icon"> {dataEUR} EUR
                    </button>


                </div>

                <Form onSubmit={submitExchange} unstackable>
                    <Header as="h3">Top up your account </Header>
                    <Form.Group widths={2}>
                        <Form.Input label='Email' placeholder={props.email} required
                            onChange={e => setEmail(e.target.value)} />
                      
                        <Form.Input label='Ammount' placeholder='' required
                            onChange={e => setPLN(e.target.value)} />
                        <label>Exchange : {pln} * 4 </label>
                        <label>on : {eur}  </label>
                    </Form.Group>
                    <i className="money"></i>
                    <Form.Checkbox label='I agree to the Terms and Conditions' />
                    <Button type='submit'>Submit</Button>
            </Form>
            </div>




)
};
export default Exchange;