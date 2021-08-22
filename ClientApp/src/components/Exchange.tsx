import * as react from "react";
import { SyntheticEvent, useEffect, useState } from "react";
import React = require("react");
import { Redirect } from "react-router-dom";
import './NavMenu.css';


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


        <div id="Main">

            <div id="EditAccount">
                <h5>Account balance:</h5><br />
                <h4 >   {dataPLN} PLN</h4>
                <h4 >   {dataEUR} EUR</h4>
                
    
            </div>






            <div id="TopUp">
                <h5>Top up account</h5>
                <form onSubmit={submitExchange}>
                    <div id="Data2">
                        <input type="text" className="form-control" id="floatingInput" placeholder={props.email} required
                            onChange={e => setEmail(e.target.value)} />
                        <label>Email</label>
                    </div>
                    <div id="Data2">
                        <input type="number" className="form-control" id="floatingInput" placeholder="" required
                            onChange={e => setPLN(e.target.value)} />
                        <label>Exchange : {pln} * 4 </label>
                        <label>on : {eur}  </label>
                        <br />
                    </div>

                    <div id="Data2">

                        <button type="submit"
                            className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Top up
                            </button>
                    </div>

                </form>
            </div>

            </div>
)
}
export default Exchange;