import {combineReducers} from '@reduxjs/toolkit';
import {connectRouter} from 'connected-react-router'
import draftjsEditorStateReducer from "./draft-js/editorStateSlice";
import prosemiValueReducer from "./prosemirror/valueSlice";

const rootReducer = function (history)
{
    return combineReducers({
        router: connectRouter(history),
        draftjs_editorstate_reducer: draftjsEditorStateReducer,
        prosemi_value_reducer: prosemiValueReducer
    });
};

export default rootReducer;
