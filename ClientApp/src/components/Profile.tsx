import { Link, NavLink, Route } from "react-router-dom";
import CurrencyPanel from './CurrencyPanel';
import React = require("react");
import { SyntheticEvent, useEffect, useState } from "react";

import { Menu, Button, Icon, Header, Grid, Divider, DropdownMenu, Form,Image,Popup } from 'semantic-ui-react';
import Segment from "semantic-ui-react/src/elements/Segment";

import './componentsCss/CurrencyPage.css';

let panel = (<div id="Panel">
    <CurrencyPanel />
</div>)


const Profile = () => {


    return (
       
        <div className="ui inverted vertical segment  ">

            <div className="ui page grid landpage-image">
                <div className="ui container " >

                    <br />
                    <div className="ui secondary menu">
                        <div className="header item grey"></div>

                        <a className="active item">
                            <button className="ui basic button inverted">
                                <Popup
                                    trigger={<Icon circular name='question' />}
                                    content='Today, Keep your money in the pocket!'
                                    size='huge'

                                />

                                Tip Of The Day
                            </button>
                        </a>

                        <a className="active item">
                            <button className="ui basic button inverted">
                                <i className="newspaper outline icon"></i>

                                <a href="https://businessinsider.com.pl/gielda" target="_blank">WGI</a>
                            </button>
                        </a>

                        <a className="active item">
                            <button className="ui basic button inverted">
                                <i className="newspaper outline icon"></i>


                                <a href="https://www.wsj.com/market-data/stocks" target="_blank">WSJ</a>
                            </button>
                        </a>


                        <a className="item" >

                            <button className="ui basic inverted button  ">
                                <i className="icon user"></i>
                                Add Friend
                            </button>
                        </a>


                        <img className="ui small circular image float right" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc2YzpaKUyKmBzE0wPNThI8X-jtSCHaB-zng&usqp=CAU" />

                    </div>

                    <br />
                    <div className="ui grid">
                        <div className="four wide column">
                            <div className="ui secondary vertical pointing fluid menu" />
                            Forum
                        </div>
                    </div>
                    <div className="twelve wide column">
                        <div className="ui form">
                            <div className="field">
                                <input type="text" name="first-name" placeholder="First name" />
                            </div>
                            <div className="field">
                                <textarea placeholder="Some example text..."></textarea>
                            </div>
                        </div>
                        <br />
                        <button className="ui button inverted blue right ">
                            Post
                        </button>


                        <div className="ui icon input inverted right floated">
                            <input type="text" placeholder="Search..." />
                            <i className="search link icon"></i>
                        </div>

                    </div>
                </div>

            </div>

        </div>

    )

};

export default Profile;

