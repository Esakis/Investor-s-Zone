import * as React from 'react';
import Login from "./Login";
import Home from "./Home";
import Logout from "./Logout";
import Register from "./Register";
import './componentsCss/NavMenu.css';
import {Link} from "react-router-dom";



const NavMenu = () => {



    let menu;






    menu = (

        <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
                <Link to="/login" className="nav-link active" >Login</Link>
            </li>
            <li className="nav-item">
                <Link to="/register" className="nav-link active" href="#" >Register</Link>
            </li>


            <li className="nav-item">
                <Link to="/logout" className="nav-link active" href="#">Logout</Link>
            </li>
        </ul>

    )



    return(
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link  to="/" className="navbar-brand">Strefa Inwestora</Link>

                <div >
                    {menu}
                </div>

            </div>
        </nav>
    );
}





export default NavMenu;