import * as React from 'react';
import { SyntheticEvent, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Menu, Button, Icon, Header, Grid, Divider, DropdownMenu, Form } from 'semantic-ui-react';
import "./NavMenu.css";
import '../componentsCss/NavMenu.css';
import { connect } from 'react-redux';
import { Connection } from "../../utilities/Connection";
import { Component } from "react";
import CurrencyPanel from "../CurrencyPanel";

const Exchange = (props: { email: string }) => {


    const [dataPLN, setDataPLN] = useState('');
    const [dataEUR, setDataEUR] = useState('');
    const [dataUSD, setDataUSD] = useState('');
    const [email, setEmail] = useState('');
    const [pln, setPLN] = useState('');
    const [eur, setEUR] = useState('');
    // const [usd, setUSD] = useState('');

    const [redirect, setRedirect] = useState(false);



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



            <div>
            <nav >


                <CurrencyPanel />
               
                </nav>
            </div>
        );
    }
export default connect()(Exchange);