import {createSlice} from '@reduxjs/toolkit';

export const getEmptyState = () => {
    return '';
};

export const valueSlice = createSlice({
    name: 'value',
    // initialState used by editors before content loaded
    initialState: {
        defaultValue: getEmptyState(),
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