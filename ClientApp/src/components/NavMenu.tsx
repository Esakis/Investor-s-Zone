import React from "react";
import './NavMenu.css';
import { Link } from "react-router-dom";
import { useState } from 'react';



const NavMenu = (props: { email: string, setEmail: (email: string) => void }) => {


    const logout = async () => {

            await fetch('https://localhost:44349/api/account/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                credentials: "include",

            });
            props.setEmail('');

        }

    const user = async () => {

        await fetch('https://localhost:44349/api/account/{id}', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            credentials: "include",

        });
        

    }



   
    let menu;

    if (props.email === '') {

        menu = (

            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                    <Link to="/login" className="nav-link active" >Login</Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link active" href="#" >Register</Link>
                </li>
            </ul>
        )

    }
    else {
        menu = (

            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                    <Link to="/edit" className="nav-link active" onClick={user}>{props.email}</Link>
                </li>
                
                <li className="nav-item">
                <Link to="/" className="nav-link active" onClick={ logout }>Logout</Link>
                </li>            
            </ul>
        )

    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Strefa Inwestora</Link>

                <div >
                    {menu}
                </div>

            </div>
        </nav>
    );
}





export default NavMenu;

