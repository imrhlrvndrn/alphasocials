import Cookies from 'js-cookie';
import { axios } from '../../config';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const signInUser = createAsyncThunk(
    'users/signInUser',
    async (loginCredentials, { rejectWithValue }) => {
        try {
            const response = await axios.post('/auth/signin', { ...loginCredentials });
            return response;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const signUpUser = createAsyncThunk(
    'users/signUpUser',
    async ({ full_name, email, username, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/auth/signup', {
                full_name,
                email,
                username,
                password,
            });
            return response;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const signOutUser = createAsyncThunk('users/signOutUser', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.post('/auth/signout', {});
        return response.data;
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.response.data);
    }
});

export const verifyUsername = createAsyncThunk(
    'users/verifyUsername',
    async ({ username }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                '/users/verify-username/',
                { username },
                { rejectWithValue }
            );
            return response;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const me = createAsyncThunk(
    'users/me',
    async ({ select = [], populate = '' }, { rejectWithValue }) => {
        try {
            const userId = Cookies.get('userId');
            const response = await axios.post(`/users/${userId}`, { select, populate });
            console.log('Response before fulfilled => ', response);
            return response;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const verifyToken = createAsyncThunk('users/verifyToken', async () => {
    try {
        await axios.get('/verify');
    } catch (error) {
        console.error(error);
        axios.get('/auth/signout');
    }
});
