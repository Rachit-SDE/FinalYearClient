import { createSlice } from '@reduxjs/toolkit'


const alertsSlice = createSlice({
    name: 'alerts',
    initialState: {
        loading: false,
    },
    reducers: {
        ShowLoading: (state) => {
            state.loading = true;
        },
        HideLoading: (state) => {
            state.loading = false;
        },
    },

});

export const { ShowLoading, HideLoading } = alertsSlice.actions;
export default alertsSlice.reducer;