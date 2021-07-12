import { signInUser, signUpUser, verifyUsername, signOutUser, me } from './user.requests';
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
    is_logged_in: !!Cookies.get('userId'),
    user: null,
    error: null,
    status: 'idle',
    is_valid_username: false,
};

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        modifyUser: (state, action) => {
            state.user = action.payload.user;
        },
    },
    extraReducers: {
        [signInUser.pending]: (state) => {
            state.status = 'loading';
        },
        [signInUser.fulfilled]: (state, action) => {
            console.log('SignIn API response => ', action);
            if (action.payload.data.success) {
                state.error = null;
                state.status = 'fullfilled';
                state.is_logged_in = true;
                state.user = action.payload.data.data.user;
            }
        },
        [signInUser.rejected]: (state, action) => {
            state.status = 'error';
            state.is_logged_in = false;
            state.error = action.error.message;
        },
        [signUpUser.pending]: (state) => {
            state.error = null;
            state.status = 'loading';
        },
        [signUpUser.fulfilled]: (state, action) => {
            console.log('SignUp API response => ', action);
            if (action.payload.data.success) {
                state.error = null;
                state.is_logged_in = true;
                state.status = 'fullfilled';
                state.user = action.payload.data.data.user;
            }
        },
        [signUpUser.rejected]: (state, action) => {
            state.status = 'error';
            state.error = action.payload.error.response.message;
        },
        [signUpUser.pending]: (state) => {
            state.error = null;
            state.status = 'loading';
        },
        [signUpUser.fulfilled]: (state, action) => {
            if (action.payload.data.success) {
                state.error = null;
                state.is_logged_in = true;
                state.status = 'fullfilled';
                state.user = action.payload.data.data.user;
            }
        },
        [signUpUser.rejected]: (state, action) => {
            state.status = 'error';
            state.error = action.payload.error.response.message;
        },
        [me.pending]: (state) => {
            state.error = null;
            state.status = 'loading';
        },
        [me.fulfilled]: (state, action) => {
            console.log('Me API response => ', action);
            if (action.payload.data.success) {
                state.error = null;
                state.is_logged_in = true;
                state.status = 'fullfilled';
                state.user = action.payload.data.data.user;
            }
        },
        [me.rejected]: (state, action) => {
            state.status = 'error';
            state.error = action.payload.error.response.message;
        },
        [verifyUsername.pending]: (state) => {
            state.status = 'loading';
            state.is_valid_username = false;
        },
        [verifyUsername.fulfilled]: (state, action) => {
            console.log('verifyUsername API response => ', action);
            if (action.payload.data.statusCode === 209) {
                state.status = 'error';
                state.is_valid_username = false;
                state.error = action.payload.data.message;
            } else {
                state.error = null;
                state.status = 'fulfilled';
                state.is_valid_username = true;
            }
        },
        [verifyUsername.rejected]: (state, action) => {
            state.status = 'error';
            state.is_valid_username = false;
            state.error = action.payload.error.response.message;
        },
    },
});

export const selectUser = (state) => state.user.user;
export const selectError = (state) => state.user.error;
export const selectStatus = (state) => state.user.status;
export const selectLoginStatus = (state) => state.user.is_logged_in;
export const selectIsValidUsername = (state) => state.user.is_valid_username;

export default userSlice.reducer;
