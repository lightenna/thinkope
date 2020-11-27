import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './components/App';
import {store, history} from './store/configureStore';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import {ConnectedRouter} from 'connected-react-router';

import EditorView from "./features/editor/EditorView";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App/>
            </ConnectedRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('app')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
