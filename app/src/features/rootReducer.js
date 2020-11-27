import {combineReducers} from '@reduxjs/toolkit';
import {connectRouter} from 'connected-react-router'
import editorReducer from "../features/editor/editorSlice";

const rootReducer = function (history)
{
    return combineReducers({
        router: connectRouter(history),
        editor: editorReducer
    });
};

export default rootReducer;
