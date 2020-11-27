import {createSlice} from '@reduxjs/toolkit';
import {EditorState, convertToRaw} from 'draft-js';

const getDefaultState = () => {
    const editorState = EditorState.createEmpty();
    const contentState = editorState.getCurrentContent();
    return convertToRaw(contentState);
};

export const editorStateSlice = createSlice({
    name: 'editor',
    initialState: {
        // @todo load actual data
        jlob: getDefaultState(),
    },
    reducers: {
        update: (state, action) => {
            const {payload} = action;
            // console.log('redux action: ', type, payload);
            return {
                ...state,
                jlob: payload,
            };
        },
    },
});

export const {update} = editorStateSlice.actions;

export const selectEditor = state => state.editor.editorState;

export default editorStateSlice.reducer;