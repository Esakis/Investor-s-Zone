import * as react from "react";
import { SyntheticEvent, useEffect, useState } from "react";
import React = require("react");
import { Redirect } from "react-router-dom";
import NavMenu from "./components/NavMenu";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Profile from "./components/Profile";
import EditUser from "./components/EditUser";
import TopUp from "./components/TopUp";
import Exchange from "./components/Exchange";
import { Connection } from "./utilities/Connection";
import { CurrencyPage } from "./components/CurrencyPage";
import { Menu, Button, Header, Grid, Form, Segment, Message } from 'semantic-ui-react';
import Layout from "./components/Layout";

import { BrowserRouter, Route, Router, Switch } from "react-router-dom";


function App() {

    const [email, setEmail] = useState("");
    
   


    useEffect(() => {
        (
            async () => {
                const response = await fetch('https://localhost:44349/api1/account', {
                    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                    credentials: "include",

                });
                const content = await response.json();
                setEmail(content.email);
               

            }
        )();
        let connection = Connection.getInstance();
    });

    return (
        <div >
            <BrowserRouter>
                <NavMenu email={email} setEmail={setEmail} />

                <main className="form-signin">
                    <Route path="/" component={Home} />
                    <Route path={"/api/account/" + email} component={() => <EditUser email={email} />} />
                    <Route path={"/api/account/topup/" + email} component={() => <TopUp email={email} />} />
                    <Route path="/login" component={() => <Login setEmail={setEmail} />} />
                    <Route path="/register" component={Register} />
                    <Route path={"/api/account/exchange/" + email} component={() => <Exchange email={email} />} />
                    <Route path="/currency/:currency" component={CurrencyPage} />
                    
                </main>
            </BrowserRouter>
        </div>
    );
}
export default App;
