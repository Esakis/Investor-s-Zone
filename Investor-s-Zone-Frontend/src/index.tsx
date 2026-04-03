import 'bootstrap/dist/css/bootstrap.css';
import { createRoot } from 'react-dom/client';

// semantic-ui-react v2 uses deprecated React 18 APIs (findDOMNode, defaultProps on function components).
// These are known upstream issues with no fix available. Suppress the warnings to avoid noise.
const originalError = console.error.bind(console);
console.error = (...args: any[]) => {
    if (typeof args[0] === 'string' && (
        args[0].includes('findDOMNode') ||
        args[0].includes('Support for defaultProps will be removed')
    )) return;
    originalError(...args);
};
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/configureStore';
import App from './App';
import 'semantic-ui-css/semantic.min.css';

const store = configureStore();

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');

const root = createRoot(container);

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
