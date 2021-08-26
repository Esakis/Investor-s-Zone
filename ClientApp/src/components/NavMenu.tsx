
import { Link,NavLink } from "react-router-dom";
import {Menu, Button, Icon, Header, Grid, Divider, DropdownMenu } from 'semantic-ui-react';
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
                        <Button  as='a' to="/login" basic href="/login">Login</Button>
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

            <nav className="navbar navbar-expand-md navbar-light bg-light mb-4">
                <div className="container-fluid">

                    <div className="ui compact menu">
                        <div className="ui simple dropdown item green basic button" >
                            My profile
                            <i className="dropdown icon"></i>
                            <div className="menu">
                                
                                <NavLink to={"/api/account/" + props.email} className="item edit icon" >Edit Profile</NavLink>
                                <NavLink to={"/api/account/topup/" + props.email} className="item" >Top Up Your Account</NavLink>
                                <NavLink to={"/api/account/exchange/" + props.email} className="item" >Exchange</NavLink>
                                <NavLink exact to="/" onClick={logout} className="item" >Logout</NavLink>
                                <NavLink to='/profile' className="item" >Forum</NavLink>
                                
                            
                            </div>
                        </div>
                    </div>


                
            </div>
        </nav>
            
           
          
            

        
          
    )
        

    }

    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light mb-4">
            <div className="container-fluid">

                <Link color='teal' to='/Home'  >Inwestor's Zone</Link>
             
                
                <div>
                    {menu}
                </div>

            </div>
        </nav>
    );
}


export default NavMenu;

