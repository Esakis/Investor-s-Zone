import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import configureStore from './store/configureStore';

it('renders without crashing', () => {
    const store = configureStore();
    const div = document.createElement('div');
    const root = createRoot(div);

    root.render(
        <Provider store={store}>
            <MemoryRouter>
                <App />
            </MemoryRouter>
        </Provider>
    );

    root.unmount();
});
