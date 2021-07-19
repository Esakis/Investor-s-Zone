import * as React from 'react';
import { connect } from 'react-redux';
import { SimpleStockChart } from './StockChart'
import {StockChartFactory} from "./StockChartFactory";


const Home = () => (
    <div>
        <h1>Strefa Inwestora</h1>
        <p>Witamy w naszej aplikacji poswieconej inwestowaniu</p>
        <ul>
  
    </ul>
    </div>
);

export default connect()(Home);
