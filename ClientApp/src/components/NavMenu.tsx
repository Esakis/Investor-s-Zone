
import { Link,NavLink } from "react-router-dom";
import {Menu, Button, Icon, Header, Grid, Divider,Dropdown } from 'semantic-ui-react';
import React = require("react");





const NavMenu = (props: { email: string, setEmail: (email: string) => void }) => {

    
    const logout = async () => {

            await fetch('https://localhost:44349/api/account/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                credentials: "include",

            });
            props.setEmail('');
   
        }

  
    let menu;

    if (props.email === '') {

        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                    <Menu.Item>
                        <Button as='a' to="/login" basic href="/login">Login</Button>
                    </Menu.Item>
                </li>
             <li className="nav-item">
                    <Menu.Item>
                      
                        <Button as='a'  to='/register' basic  href="/register">Sign up</Button>
                    </Menu.Item>
                </li>

           
           
            </ul>
        )

    }
    else {
        

        menu = (

            
           
          
            

            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <ul className="navbar-nav me-auto mb-2 mb-md-0">

                    <li className="nav-item">
                        <Link to={"/api/account/" + props.email} className="nav-link active" >{props.email}</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/api/account/topup/" + props.email} className="nav-link active" > Top Up </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/api/account/exchange/" + props.email} className="nav-link active" > Exchange </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/" className="nav-link active" onClick={logout}>Logout</Link>
                    </li>
                </ul>
            </ul>

          
    )
        

    }

    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light mb-4">
            <div className="container-fluid">

                <Header as="a" color='teal' basic exact={true} path={'/'} >Inwestor's Zone</Header>

                <div>
                    {menu}
                </div>

            </div>
        </nav>
    );
}


export default NavMenu;

