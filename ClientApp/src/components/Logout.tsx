import React, { SyntheticEvent, useState } from "react";
import { RouteComponentProps, withRouter, Redirect } from "react-router-dom";


const Logout = () => {
  
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await fetch('https://localhost:44349/api/account/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            credentials: "include",
            body: JSON.stringify({
              

            })
        });
        setRedirect(true);
    }

    if (redirect) {
        return <Redirect to="/" />;
    }



    return (

        <form onSubmit={submit}>

            <h1 className="h3 mb-3 fw-normal">Strefa Inwestora</h1>
           
            <button className="w-100 btn btn-lg btn-primary" type="submit">Logout</button>


        </form>

    );
};
export default Logout;
