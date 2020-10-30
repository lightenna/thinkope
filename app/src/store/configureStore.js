import {configureStore} from '@reduxjs/toolkit';
import {createBrowserHistory} from "history";
import rootReducer from '../reducers';

export const history = createBrowserHistory({
    basename: process.env.APP_BASEPATH || '/',
});

export const store = configureStore({
    reducer: rootReducer(history)
});
