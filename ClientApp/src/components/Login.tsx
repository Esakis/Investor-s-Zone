import React, { SyntheticEvent, useState } from "react";
import { Redirect } from "react-router-dom";


const Login = (props: { setEmail: (email: string) => void }) => {
    const [email, setEmail] = useState('');
   
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async(e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch('https://localhost:44349/api/account/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            credentials: "include", 
            body: JSON.stringify({
                email,
                password,
                
               
            })
        });

        

            const content = await response.json();
            setRedirect(true);
            props.setEmail(content.email);
            

    }

    if (redirect) {
        return <Redirect to="/" />;
    }

    

    return(
        
            <form onSubmit={submit}>

            <h3 className="h3 mb-3 fw-normal">Login:</h3>
                <div id="FormLogin">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required
                    onChange={e => setEmail(e.target.value)}
                    />

                    <label htmlFor="floatingInput">Email address</label>
                </div>
               <div id="FormLogin">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required
                           onChange={e => setPassword(e.target.value)}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
            <button  id="FormLogin" type="submit">Sign in</button>


            </form>
        
    );
};
export default Login;