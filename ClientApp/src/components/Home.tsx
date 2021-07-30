import * as React from 'react';
import { connect } from 'react-redux';
import { SimpleStockChart } from './StockChart'
import {StockChartFactory} from "./StockChartFactory";
import CurrencyPanel from "./CurrencyPanel";
import AsyncCurrencyPanelElement from "./asyncVariants/AsyncCurrencyPanel";
import './componentsCss/NavMenu.css'

const Home = () => (
    <div>
        <h1>Strefa Inwestora</h1>
        <p>Witamy w naszej aplikacji poswieconej inwestowaniu</p>
        <ul>
  
    </ul>
        <nav className="currencyPanelNavbar">
            <CurrencyPanel/>
        </nav>
    </div>
);

export default connect()(Home);
