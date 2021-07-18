import * as React from 'react';
import { connect } from 'react-redux';
import { SimpleStockChart } from './StockChart'
import {StockChartFactory} from "./StockChartFactory";

const Home = () => (
  <div>
    <h1>Strefa Inwestora</h1>
    <p>Witamy na naszej stronie poswieconej inwestowaniu</p>
    <ul>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    </ul>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
    <ul>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    </ul>
      <div id="chartContainer">
          
      </div>
      
      <StockChartFactory/>
    </div>
);

export default connect()(Home);
