import { SyntheticEvent, useEffect, useState } from "react";
import React = require("react");
import { Redirect } from "react-router-dom";
import { Button, Form, Grid, Header, Image, Message, Segment, Icon } from 'semantic-ui-react';






const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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


        setRedirect(true);
    }

    if (redirect) {
        return <Redirect to="/login" />;
    }

    return (
        <div className="ui inverted vertical segment  ">

            <div className="ui page grid landpage-image">
                <div className="column">

 
       
                    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                        <Grid.Column style={{ maxWidth: 450 }}>
                <Message
                    as='h4' color='grey' textAlign='center'
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



                        <Button color='grey' fluid size='large' type="submit">
                            Register
                        </Button>
                    </Segment>
                </Form>
                <Message warning>
                    <Icon name='help' />
                    Already signed up?&nbsp;<a href='/login'>Login here</a>&nbsp;instead.
                </Message>

            </Grid.Column>
                    </Grid>
            </div>
            </div>
        </div>
         

    )
}
export default Register;