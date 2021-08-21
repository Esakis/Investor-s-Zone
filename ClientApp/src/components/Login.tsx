import React, { SyntheticEvent, useState } from "react";
import { Redirect } from "react-router-dom";
import { Menu, Button, Header, Grid, Form, Segment, Message } from 'semantic-ui-react';

import { Link } from "react-router-dom";

const Login = (props: { setEmail: (email: string) => void }) => {
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch('https://localhost:44349/api/account/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            credentials: "include",
            body: JSON.stringify({
                email,
                password,


            })
        });



        const content = await response.json();
        setRedirect(true);
        props.setEmail(content.email);


    }

    if (redirect) {
        return <Redirect to="/" />;
    }



    return (

        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}  >
                <Header as='h2' color='teal' textAlign='center'>
                    Log-in to your account
                </Header>
                <Form onSubmit={submit} size='large'>
                    <Segment stacked>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address'
                            required
                            onChange={e => setEmail(e.target.value)} />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            quired
                            onChange={e => setPassword(e.target.value)} />



                        <Button color='teal' fluid size='large'>
                            Login
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    New to us? <Link to="/register" href="#" >Register</Link>
                </Message>
            </Grid.Column>
        </Grid>



    );
};
export default Login;
