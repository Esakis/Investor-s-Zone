import React, { useEffect, useState } from "react";
import NavMenu from "./components/NavMenu";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Home from "./components/Home";
import Register from "./components/Register";
import './custom.css'
import {BrowserRouter, Route} from "react-router-dom";
import {Connection} from "./utilities/Connection";
import {SimpleStockChart} from "./components/StockChart"
import { CurrencyPage } from "./components/CurrencyPage";

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
        //
        let connection = Connection.getInstance();
    });


    return (
    <div >
            <BrowserRouter>
                <NavMenu />
        
                <main className="form-signin">
                    
     
                <Route path="/" component= {Home} />
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register} />
                <Route path="/logout" component={Logout} />
                    
                <Route path="/currency/:currency" component={CurrencyPage} />
                
            
        </main>
        </BrowserRouter>
    </div>

);
}
export default App;