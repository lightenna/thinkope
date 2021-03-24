import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './components/App';
import AppAsEmbed from "./components/AppAsEmbed";
import {store, history} from './store/configureStore';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import {ConnectedRouter} from 'connected-react-router';

const thinkhope_CLASSNAME = 'thinkhope';

// find and attach to target DOM elements
const dom_target_elements = Array.from(document.getElementsByClassName(thinkhope_CLASSNAME));
dom_target_elements.forEach((elem, i) => {
    // look for data- attributes on DOM element
    const mode = elem.getAttribute('data-mode') || 'app';
    const params = {
        mode: mode,
    }
    switch (mode) {
        case 'app':
        default:
            break;
        case 'embed':
            const repo_url = elem.getAttribute('data-repo-url') || '';
            const repo_subpath = elem.getAttribute('data-repo-subpath') || '';
            const subpath_without_slashes = repo_subpath.replace(/^\/|\/$/g, '');
            params.url = `${repo_url}/${subpath_without_slashes}`;
            break;
    }
    //
    const app = (mode === 'app' ? <App {...params} /> : <AppAsEmbed {...params} />);
    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    { app }
                </ConnectedRouter>
            </Provider>
        </React.StrictMode>,
        elem);
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
