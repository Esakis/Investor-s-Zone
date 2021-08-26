import * as react from "react";
import { SyntheticEvent, useEffect, useState } from "react";
import React = require("react");
import { Redirect } from "react-router-dom";
import { Button, Form, Grid, Header, Image, Message, Segment, Icon } from 'semantic-ui-react';
import bg from "../public/bg.jpg";






const Register = () => {
    const [email, setEmail] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [nationality, setNationality] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // const[dateOfBirth,setDateOfBirth]=useState('');
    // const[role,setRole]=useState('');
    //
    const [redirect, setRedirect] = useState(false);
    const submit = async (e: SyntheticEvent) => {

        e.preventDefault();

        await fetch('https://localhost:44349/api/account/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({
                email,
                password,
                confirmPassword

            })
        });

        // const content = await response.json();
        // console.log(content);

        setRedirect(true);
    }

    if (redirect) {
        return <Redirect to="/login" />;
    }

    return (
        <div className='ui fluid image'>
            <img src="https://images.unsplash.com/photo-1585914641050-fa9883c4e21c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=748&q=80"/>
        <Grid class='image'  textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Message
                    attached
                    header='Welcome to our site!'
                    content='Fill out the form below to sign-up for a new account'
                />
                <Form onSubmit={submit} size='large'>
                    <Segment stacked>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='Email'
                            required
                            onChange={e => setEmail(e.target.value)} />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            required
                            onChange={e => setPassword(e.target.value)}
                        />


                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            required
                            onChange={e => setConfirmPassword(e.target.value)}
                        />



                        <Button color='teal' fluid size='large' type="submit">
                            Register
                        </Button>
                    </Segment>
                </Form>
                <Message attached='bottom' warning>
                    <Icon name='help' />
                    Already signed up?&nbsp;<a href='/login'>Login here</a>&nbsp;instead.
                </Message>

            </Grid.Column>
            </Grid>
            </div>


    )
}
export default Register;