import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../modules/authReducer";

const store = configureStore({
    reducer: {
        auth : authReducer,
    }
})

export default store;