import {createSlice} from '@reduxjs/toolkit';
import {EditorState, convertToRaw} from 'draft-js';

const getEmptyState = () => {
    const editorState = EditorState.createEmpty();
    const contentState = editorState.getCurrentContent();
    return convertToRaw(contentState);
};

export const editorStateSlice = createSlice({
    name: 'editor',
    initialState: {
        jlob: getEmptyState(),
    },
    reducers: {
        update: (state, action) => {
            console.log('redux action: ', action.type, action.payload);
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