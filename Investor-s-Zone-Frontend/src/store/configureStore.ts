import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { ApplicationState, reducers } from './';

export default function configureStore(initialState?: ApplicationState) {
    const middleware = [thunk];

    const rootReducer = combineReducers({
        ...reducers
    });

    const composeEnhancers = 
        (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(...middleware))
    );
}
