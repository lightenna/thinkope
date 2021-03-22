import {createSlice} from '@reduxjs/toolkit';
import {EditorState, convertToRaw} from 'draft-js';

export const getEmptyState = () => {
    const editorState = EditorState.createEmpty();
    const contentState = editorState.getCurrentContent();
    return convertToRaw(contentState);
};

export const editorStateSlice = createSlice({
    name: 'editorState',
    // initialState used by editors before content loaded
    initialState: {
        jlob: getEmptyState(),
    },
    reducers: {
        update: (state, action) => {
            return {
                ...state,
                jlob: action.payload,
            };
        },
    },
});

export const {update} = editorStateSlice.actions;

export const selectEditor = state => state.editor.editorState;

export default editorStateSlice.reducer;