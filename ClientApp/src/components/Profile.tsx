import { Link, NavLink } from "react-router-dom";
import { Menu, Button, Icon, Header, Grid, Dropdown } from 'semantic-ui-react';
import React = require("react");

const Profile = (props: { email: string, setEmail: (email: string) => void }) => {
    const logout = async () => {

        await fetch('https://localhost:44349/api/account/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            credentials: "include",

        });
        props.setEmail('');


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
                        src='https://images.unsplash.com/photo-1522556189639-b150ed9c4330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80' />

                </div>
            </div>
            <h4>Jon Smith</h4>
        </div>
        <div className="gallery">


            <Menu.Item>
                <Button as="a" to={"/api/account/" + props.email} basic>{props.email} </Button>
            </Menu.Item>

            <Menu.Item>
                <Button as="a" to={"/api/account/topup/" + props.email} > Top Up </Button>
            </Menu.Item>


            <Menu.Item>
                <Button as="a" to={"/api/account/exchange/" + props.email}>Exchange</Button>
            </Menu.Item>


            <Menu.Item>
                <Button as="a" exact={true} path={'/'} basic onClick={logout}>Logout</Button>
            </Menu.Item>


        </div>



    </div>

}


export default Profile;

