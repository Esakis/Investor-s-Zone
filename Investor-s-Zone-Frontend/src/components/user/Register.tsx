import { SyntheticEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button, Form, Grid, Message, Segment, Icon } from 'semantic-ui-react';






const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState('');
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:5122/api/account/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                body: JSON.stringify({
                    email,
                    password,
                    confirmPassword,
                    nationality: 'Poland',
                    dateOfBirth: new Date().toISOString(),
                    roleId: 1
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                let errorMessage = 'Registration failed';
                
                if (errorData.errors) {
                    const firstError = Object.values(errorData.errors)[0];
                    if (Array.isArray(firstError)) {
                        errorMessage = String(firstError[0]);
                    } else {
                        errorMessage = String(firstError);
                    }
                } else if (errorData.error) {
                    errorMessage = String(errorData.error);
                }
                
                setError(errorMessage);
                return;
            }

            setRedirect(true);
        } catch (err) {
            setError('Registration failed: ' + (err as Error).message);
        }
    }

    if (redirect) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="ui inverted vertical segment  ">

            <div className="ui page grid landpage-image">
                <div className="column">

 
       
                    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                        <Grid.Column style={{ maxWidth: 450 }}>
                <Message
                    color='grey'
                    header='Welcome to our site!'
                    content='Fill out the form below to sign-up for a new account'
                />
                {error && (
                    <Message negative>
                        <Message.Header>Error</Message.Header>
                        <p>{error}</p>
                    </Message>
                )}
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
                            placeholder='Confirm Password'
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