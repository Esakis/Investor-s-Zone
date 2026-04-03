import * as React from 'react';
import { Container } from 'react-bootstrap';

export default class Layout extends React.PureComponent<{ children?: React.ReactNode }> {
    public render() {
        return (
            <React.Fragment>
               
                <Container>
                    {this.props.children}
                    </Container>
                   
            </React.Fragment>
        );
    }
}