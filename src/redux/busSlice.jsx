import { createSlice } from "@reduxjs/toolkit";

const busSlice = createSlice({
    name: "bus",
    initialState: {
        bus: null,
    },
    reducers: {
        setBus: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('isLoggedIn', 'true');
        }
    }
})

export const { setBus} = busSlice.actions;
export default busSlice.reducer;