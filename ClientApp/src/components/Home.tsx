import * as React from 'react';
import { connect } from 'react-redux';
import CurrencyPanel from './CurrencyPanel';
import { Menu, Button, Icon, Header, Grid, Segment, Container, Image, Dimmer } from 'semantic-ui-react';
import { Component } from 'react';


import { Link } from "react-router-dom";
import { CurrencyPage } from './CurrencyPage';
import './componentsCss/NavMenu.css';




const Home = () => {

    return (


        <div className="ui  fluid rounded image">
            <img src="https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80 " />
            <div style={{ position: 'absolute', bottom: 0, width: '100%', height: 'auto' }}>

                <div className="ui hover bottom dimmer">
                    <div className="content">
                        <h2 className="ui inverted header">Invester Zone</h2>
                        <div className="ui button">View</div>

                    </div>
                </div>
            </div>
        </div>




    )

};
export default () => (

    <Home />
);