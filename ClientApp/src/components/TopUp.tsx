import * as react from "react";
import { SyntheticEvent, useEffect, useState } from "react";
import React = require("react");
import { Redirect } from "react-router-dom";
import { Menu, Button, Icon, Header, Grid, Divider, DropdownMenu } from 'semantic-ui-react';


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


      <><div className="ui raised very padded text container segment">
            <div className="ui right labeled input">
                <h5>Your Account Balance:</h5>
                <button className="money bill alternate outline icon ui basic label"> {dataPLN} PLN</button>
                <button className="money bill alternate outline icon"> {dataEUR} EUR</button>


            </div>
        </div><div className="ui form center aligned container">
                <h1>Top up account</h1>
                <form onSubmit={submitTopUp}>

                    <div className="ui right labeled input">
                        <label htmlFor="email" className="ui  teallabel"></label>
                        <input type="text" placeholder={props.email} required
                            onChange={e => setEmail(e.target.value)} />
                        <div className="ui basic label">@</div>
                    </div>

                    <div className="ui right labeled input">
                        <label htmlFor="amount" className="ui label">$</label>
                        <input type="text" placeholder="Amount" placeholder="amount" required
                            onChange={e => setPLN(e.target.value)} />
                        <div className="ui basic label">{pln}.00</div>
                    </div>
                    <div className="ui teal buttons">
                        <div className="ui button">Save</div>
                    </div>
                </form>
            </div></>
       
            )
    






           
}
export default TopUp;