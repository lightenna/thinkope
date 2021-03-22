import React from 'react';
import {render} from '@testing-library/react';
import {Provider} from 'react-redux';
import {history, store} from '../store/configureStore';
import App from './App';
import {ConnectedRouter} from "connected-react-router";
import AppAsEmbed from "./AppAsEmbed";

test('renders app without error', () => {
    const {getByText} = render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App/>
            </ConnectedRouter>
        </Provider>
    );
    expect(getByText(/Far out/i)).toBeInTheDocument();
});

test('renders app as embed without error', () => {
    const url = 'https://github.com/lightenna'
    const {getByText} = render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <AppAsEmbed url={url} />
            </ConnectedRouter>
        </Provider>
    );
    expect(getByText(/Far out/i)).toBeInTheDocument();
});
