import * as react from "react";
import { SyntheticEvent, useEffect, useState } from "react";
import React = require("react");
import { Redirect } from "react-router-dom";
import { Menu, Button, Icon, Header, Grid, Divider, DropdownMenu, Form,Image} from 'semantic-ui-react';

import BackGround from './BackGround';

const TopUp = (props: { email: string }) => {


     const [dataemail, setDataemail] = useState('');
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
                const response = await fetch('https://localhost:44349/api/account/topup/' + props.email, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                    credentials: "include",

                });
                const content = await response.json();
                setDataemail(content.email);
                setDataPLN(content.pln);
                setDataEUR(content.eur);
                //setDataUSD(content.usd);
                console.log(eur)
            }
        )();

    });



    const submitTopUp = async (e: SyntheticEvent) => {

        e.preventDefault();

        await fetch('https://localhost:44349/api/account/topup/' + props.email, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({
                email,
                pln
             //   eur
                //usd
              
                
               

            })
        });

        setRedirect(true);
    }

    if (redirect) {
        return <Redirect to={"/api/account/" + props.email} />;
    }

 


  
    return (
        
       
       
        <div className="ui two column centered grid">
            <div className="ui stacked segment">
            <div className="column">
                
            <Form onSubmit={submitTopUp} unstackable>
                <Header as="h3">Top up your account </Header>
                <Form.Group widths={2}>
                    <Form.Input 
                   
                        placeholder={ props.email }
                        required
                        onChange={e => setEmail(e.target.value)} />

                    <Form.Input labelPosition='right' type='text'  placeholder={pln} required value={pln}
                        onChange={e => setPLN(e.target.value)} />
                </Form.Group>
                <Form.Checkbox label='I agree to the Terms and Conditions' />
                    <Button color='teal' type='submit'>Submit</Button>
            </Form>
            </div>

            <div className="column teal">
                <div className="ui segment">

                    <div className="ui message ">

                        <div className="header">
                            Account Balance
                        </div>
                        <p>{dataPLN} PLN</p>
                        <p>{dataEUR} EUR</p>
                    </div>
                </div>
            </div>
            </div >
            </div >
       


            


        
        



    )
    




           
}
export default TopUp;