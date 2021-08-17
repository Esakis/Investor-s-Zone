import React, { useEffect, useState } from "react";
import NavMenu from "./components/NavMenu";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import './custom.css'
import { BrowserRouter, Route } from "react-router-dom";
import EditUser from "./components/EditUser";
import TopUp from "./components/TopUp";



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

    });


    return (
        <div >
            <BrowserRouter>
                <NavMenu email={email} setEmail={setEmail}/>

                <main className="form-signin">
                    <Route path="/" component={Home} />
                    <Route path={"/api/account/" + email} component={() => <EditUser email={email} />} />
                    <Route path={"/api/account/topup/" + email} component={() => <TopUp email={email} />} />
                    <Route path="/login" component={() => <Login setEmail={setEmail} />} />
                    <Route path="/register" component={Register} />
                </main>
            </BrowserRouter>
        </div>
    );
}
export default App;
