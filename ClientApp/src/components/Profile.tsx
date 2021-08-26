import { Link, NavLink } from "react-router-dom";

import React = require("react");
import { SyntheticEvent, useEffect, useState } from "react";

import { Menu, Button, Icon, Header, Grid, Divider, DropdownMenu, Form,Image } from 'semantic-ui-react';
import Segment from "semantic-ui-react/src/elements/Segment";

import './componentsCss/CurrencyPage.css';

let panel = (<div id="Panel">
    <CurrencyPanel />
</div>)

const Profile= () =>{
    return (
        <div className="ui inverted vertical segment  ">

            <div className="ui page grid landpage-image">
            <div className="ui container " >
        
            <br/>
                <div className="ui secondary menu">
                    <div className="header item"></div>
                    <a className="active item">
                        Tip Of the day 
                    </a>
                    <a className="item">
                       Blog
                        </a>
                        <a className="item currencyPanelNavbar" >
                            
                           Currency 
                        </a>
                
                    <div className="right menu">
                        <div className="item">
                            <div className="ui icon input">
                                <input type="text" placeholder="Search..."/>
                                    <i className="search link icon"></i>
        </div>
                            </div>
                    <img className="ui small circular image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc2YzpaKUyKmBzE0wPNThI8X-jtSCHaB-zng&usqp=CAU"/>
                        </div>
                    </div>
                  
                    <br/>
                        <div className="ui grid">
                            <div className="four wide column">
                                <div className="ui secondary vertical pointing fluid menu"/>
                                    Forum
                                </div>
                            </div>
                            <div className="twelve wide column">
                                <div className="ui form">
                                    <div className="field">
                                        <input type="text" name="first-name" placeholder="First name"/>
        </div>
                                        <div className="field">
                                            <textarea placeholder="Some example text..."></textarea>
                                        </div>
                                    </div>
                                </div>
                </div>
            </div>

        </div>

    
         
          )
       
};

export default Profile;

