import React from 'react';
import asyncComponent from '../hoc/asyncComponent'

const AsyncCurrencyPanel = asyncComponent(() => {
    return import('../CurrencyPanel');
});


const AsyncCurrencyPanelElement = () => {
    return (
        <div>
            <h1>Here goes an async loaded button component</h1>
            <AsyncCurrencyPanel />
        </div>
    );
};

export default AsyncCurrencyPanelElement;