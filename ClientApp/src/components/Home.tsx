import * as React from 'react';
import { connect } from 'react-redux';
import CurrencyPanel from './CurrencyPanel';
import { Menu, Button, Icon, Header, Grid,Segment,Container } from 'semantic-ui-react';

import { Link } from "react-router-dom";


export default function Home() {
    return (

        <Segment  textAlign="center" vertical >
            <Container text>
                <Header as="h1" inverted>
                    Investor's Zone


                </Header>
                <Header as="h2" inverted content="Welcome to OInvester's Zone" />
                <Button as={Link} to='/blog' size="huge" inverted></Button>
                Buissnes zone

            </Container>
        </Segment>
    )
}