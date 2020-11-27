import {combineReducers} from '@reduxjs/toolkit';
import {connectRouter} from 'connected-react-router'
import editorReducer from "./editor/editorStateSlice";

const rootReducer = function (history)
{
    return combineReducers({
        router: connectRouter(history),
        editored: editorReducer,
    });
};

export default rootReducer;
