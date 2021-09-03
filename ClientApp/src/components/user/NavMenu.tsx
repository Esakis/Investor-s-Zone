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
                <div>

                    <ul className="ui simple dropdown item inverted basic button" >
                        <li className="nav-item">
                            <Link to="/forum" className="nav-link active" ><Icon name="comment alternate outline" />Forum</Link>
                        </li>
                    </ul>
                </div>
                <div className="container-fluid">
                 
                    <div className="ui compact menu">
                        <div className="ui simple dropdown item inverted basic button">{props.email}
                            <i className="user outline">Me</i>
                            
                            <div className="menu">
                                <NavLink to="/profile" className="nav-link active grey" ><Icon name="bell outline" />   Profile</NavLink>
                                <NavLink to={"/api/account/" + props.email} className="nav-link active grey"><Icon name="edit outline" />   Edit </NavLink>
                                <NavLink to={"/api/account/topup/" + props.email} className="nav-link active grey" ><Icon name="upload" />  Top Up </NavLink>
                                <NavLink to={"/api/account/exchange/" + props.email} className="nav-link active grey" ><Icon name="money bill alternate outline" />   Exchange</NavLink>
                                <NavLink exact to="/" onClick={logout} className="nav-link active grey" ><Icon name="power off" />   Logout</NavLink>
                            
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

               
            <Menu.Item as={NavLink} to="/">
                    <Icon name="balance scale" />Investor's Zone
                </Menu.Item>
                <Menu.Item >
                    <Clock />
                </Menu.Item>
                
                <div>
                    {menu}
                </div>

            </div>
        </nav>
    );
}


export default NavMenu;

