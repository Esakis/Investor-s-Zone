
import React, { SyntheticEvent, useState } from "react";
import { Redirect } from "react-router-dom";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';






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
        <Grid class='img' textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    Register account
                </Header>
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

            </Grid.Column>
        </Grid>


    )
}
export default Register;