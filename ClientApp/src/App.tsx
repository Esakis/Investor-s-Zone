import React, { useEffect, useState } from "react";
import NavMenu from "./components/NavMenu";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Home from "./components/Home";
import Register from "./components/Register";
import './custom.css'
import {BrowserRouter, Route} from "react-router-dom";


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
                <NavMenu />
        
                <main className="form-signin">
                    
     
                <Route path="/" component= {Home} />
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register} />
                <Route path="/logout" component={Logout} />

<<<<<<< HEAD
           
            
        </main>
        </BrowserRouter>
    </div>
    
=======
export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} /> 
        <Route path='/counter' component={Counter} />
    </Layout>
>>>>>>> origin/Front
);
}
export default App;