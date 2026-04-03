import {  useEffect, useState } from "react";
import React = require("react");
import NavMenu from "./components/user/NavMenu";
import Login from "./components/user/Login";
import Home from "./components/Home";
import Register from "./components/user/Register";
import Profile from "./components/Profile";
import EditUser from "./components/user/EditUser";
import TopUp from "./components/user/TopUp";
import Exchange from "./components/user/Exchange";
import ForumMain from "./components/forum/ForumMain";
import { Connection } from "./utilities/Connection";
import { CurrencyPage } from "./components/CurrencyPage";
import Layout from "./components/Layout";
import { BrowserRouter, Route } from "react-router-dom";
import Clock from "./components/Clock";
import ModalExampleBasic  from "./components/Modal";
import { Modal } from "react-bootstrap";


function App() {

    const [email, setEmail] = useState("");
    
   


    useEffect(() => {
        (
            async () => {
                const response = await fetch('https://localhost:44349/api/account', {
                    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                    credentials: "include",

                });
                const content = await response.json();
                setEmail(content.email);
               

            }
        )();
       // let connection = Connection.getInstance();
    });

    return (
      <Layout>
        <BrowserRouter>
           
                <NavMenu email={email} setEmail={setEmail} />
                <Route exact path="/clock" component={Clock} />
              <Modal/>
                <main className="form-signin"   >
                    
                <Route exact path="/" component={Home} />
                <Route exact path="/profile" component={Profile} />
                    <Route path="/forum" component={ForumMain} />
                    <Route path={"/api/account/" + email} component={() => <EditUser email={email} />} />
                    <Route path={"/api/account/topup/" + email} component={() => <TopUp email={email} />} />
                    <Route path="/login" component={() => <Login setEmail={setEmail} />} />
                    <Route path="/register" component={Register} />
                    <Route path={"/api/account/exchange/" + email} component={() => <Exchange email={email} />} />
                    <Route path="/currency/:currency" component={CurrencyPage} />
                    
                </main>
          

            </BrowserRouter>
            </Layout>
           
    );
}
export default App;
