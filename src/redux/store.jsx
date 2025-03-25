import { combineReducers, configureStore } from "@reduxjs/toolkit";
import alertsSlice from "./alertsSlice";
import userSlice from "./userSlice";
import searchSlice from "./searchSlice";
import busSlice from "./busSlice";

const rootReducer = combineReducers({
    alerts: alertsSlice,
    users: userSlice,
    search: searchSlice,
    bus: busSlice,


});

const store = configureStore({
    reducer: rootReducer,
})

export default store;