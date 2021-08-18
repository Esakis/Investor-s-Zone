import * as React from 'react';
import { connect } from 'react-redux';
import CurrencyPanel from './CurrencyPanel';


let panel = (<div id="Panel">
                <CurrencyPanel />
            </div>)

const Home = () => (
    <div>
        <nav className="currencyPanelNavbar">
         
        </nav>
    </div>
);

export default connect()(Home);