import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        userId: null,
    },
    reducers: {
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;

        },
        setUserId: (state,action) => {
            state.userId = action.payload;
        },
    }
})

export const {setIsAuthenticated, setUserId} = authSlice.actions;

export default authSlice.reducer;