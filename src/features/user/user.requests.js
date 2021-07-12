import Cookies from 'js-cookie';
import { axios } from '../../config';
import { useNavigate } from 'react-router-dom';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const signInUser = createAsyncThunk('users/signInUser', async (loginCredentials) => {
    const response = await axios.post('/auth/signin', { ...loginCredentials });
    return response;
});

export const signUpUser = createAsyncThunk(
    'users/signUpUser',
    async ({ full_name, email, username, password }) => {
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
        }
    }
);

export const signOutUser = createAsyncThunk('users/signOutUser', async () => {
    try {
        const response = await axios.post('/auth/signout', {});
        return response.data;
    } catch (error) {
        console.error(error);
    }
});

export const verifyUsername = createAsyncThunk('users/verifyUsername', async ({ username }) => {
    try {
        const response = await axios.post('/users/verify-username/', { username });
        return response;
    } catch (error) {
        console.error(error);
    }
});

export const me = createAsyncThunk('users/me', async ({ select, populate }) => {
    try {
        const userId = Cookies.get('userId');
        const response = await axios.post(`/users/${userId}`, { select, populate });
        console.log('Response before fulfilled => ', response);
        return response;
    } catch (error) {
        console.error(error);
    }
});

export const verifyToken = createAsyncThunk('users/verifyToken', async () => {
    try {
        await axios.get('/verify');
    } catch (error) {
        console.error(error);
        axios.get('/auth/signout');
    }
});
