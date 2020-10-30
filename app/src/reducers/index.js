import {combineReducers} from '@reduxjs/toolkit';
import {connectRouter} from 'connected-react-router'
import counterReducer from "../features/counter/counterSlice";

const rootReducer = history => combineReducers({
    router: connectRouter(history),
    counter: counterReducer,
});

export default rootReducer;
