import * as React from 'react';
import './componentsCss/NavMenu.css';
import Clock from './Clock';
import { connect } from 'react-redux';
import CurrencyPanel from "./CurrencyPanel";
import AsyncCurrencyPanelElement from "./asyncVariants/AsyncCurrencyPanel";
import { SimpleStockChart } from './StockChart'
import "./user/NavMenu.css";
import { Button, Grid, Modal, Header, Popup } from 'semantic-ui-react';
import './componentsCss/CurrencyPage.css';



const Home = () => {
    const [open, setOpen] = React.useState(false)
 
    const style = {
        borderRadius: 0,
        opacity: 0.7,
        padding: '2em',
        backGround: 'teal',

    }
    return (
           
      
      

        <div className="ui page grid landpage-image">
            <div className="column">
                <h1 className="ui title-header"></h1>
                <div className="centered grid slogan">
                    <div className="column">
                        <Header>
                            <Popup
                                trigger={<Button icon='eye'> <Clock /></Button>}
                                content='There is never bad time for good investment! '
                                style={style}
                                inverted
                            /></Header>
                        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                            <Grid.Column style={{ maxWidth: 450 }}>
                                <Header>We�re better than the rest</Header>

                                <Modal

                                    centered={false}
                                    open={open}
                                    onClose={() => setOpen(false)}
                                    onOpen={() => setOpen(true)}
                                    trigger={<Button>Welcome</Button>}
                                >
                                    <Modal.Header>Welcome to Investor's Zone </Modal.Header>
                                    <Modal.Content>
                                        <Modal.Description>
                                            <CurrencyPanel />

                                        </Modal.Description>
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button onClick={() => setOpen(false)}>OK</Button>
                                    </Modal.Actions>
                                </Modal>
                            </Grid.Column>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>



    )
                      
};
export default connect()(Home);