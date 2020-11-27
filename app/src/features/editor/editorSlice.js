import { createSlice } from '@reduxjs/toolkit';
import { EditorState } from 'draft-js';

export const editorSlice = createSlice({
    name: 'editor',
    initialState: {
        // @todo load actual data
        editorState: EditorState.createEmpty(),
    },
    reducers: {
        update: (state, action) => {
            const { type, payload } = action;
            console.log('redux action: ', type, payload.getCurrentContent().getPlainText());
            return {
                ...state,
                editorState: payload,
            };
        },
    },
});

export const { update } = editorSlice.actions;

export const selectEditor = state => state.editor.editorState;

export default editorSlice.reducer;