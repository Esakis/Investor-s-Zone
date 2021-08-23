import { Link, NavLink } from "react-router-dom";
import { Menu, Button, Icon, Header, Grid, Dropdown } from 'semantic-ui-react';
import React = require("react");
import { SyntheticEvent, useEffect, useState } from "react";
import { Connection } from "../utilities/Connection";

const Profile = () => {
    const [email, setEmail] = useState("");




    useEffect(() => {
        (
            async () => {
                const response = await fetch('https://localhost:44349/api1/account', {
                    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                    credentials: "include",

                });
                const content = await response.json();
                setEmail(content.email);


            }
        )();
        let connection = Connection.getInstance();
    });



    }

    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
        <div style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "18px 0px",
            borderBottom: "1px solid green"

            ,
        }}>
            <div>
                <div>
                    <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                        src='' />

                </div>
            </div>
            <h4>Jon Smith</h4>
        </div>
        <div className="gallery">


           
          




    </div>

}


export default Profile;

