import * as React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './user/NavMenu';
import BackGround from './BackGround';

export default class Layout extends React.PureComponent<{}, { children?: React.ReactNode }> {
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