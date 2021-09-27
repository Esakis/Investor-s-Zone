import * as React from 'react';
import { SyntheticEvent, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Menu, Button, Icon, Header, Grid, Divider, DropdownMenu, Form } from 'semantic-ui-react';
import "./NavMenu.css";
import '../componentsCss/NavMenu.css';
import { connect } from 'react-redux';
import { Connection } from "../../utilities/Connection";
import { Component } from "react";
import CurrencyPanel from "../CurrencyPanel";

const Exchange = (props: { email: string }) => {


    
   

    return (



            <div>
            <nav >


                <CurrencyPanel />
               
                </nav>
            </div>
        );
    }
export default connect()(Exchange);