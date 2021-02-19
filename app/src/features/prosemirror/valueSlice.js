import {createSlice} from '@reduxjs/toolkit';

export const valueSlice = createSlice({
    name: 'value',
    // initialState used by editors before content loaded
    initialState: {
        defaultValue: '',
    },
    reducers: {
        update: (state, action) => {
            return {
                ...state,
                value: action.payload,
            };
        },
    },
});

export const {update} = valueSlice.actions;

export default valueSlice.reducer;