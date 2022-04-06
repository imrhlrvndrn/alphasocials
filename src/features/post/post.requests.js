import { axios } from '../../config';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadPosts = createAsyncThunk('posts/loadPosts', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('/posts?type=USER');
        console.log('Data from API request =>', response);
        return response.data;
    } catch (error) {
        console.error(error.response);
        return rejectWithValue(error.response.data);
    }
});

export const createNewPost = createAsyncThunk(
    'posts/createNewPost',
    async ({ content }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/posts', { content });
            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const modifyPost = createAsyncThunk(
    'posts/modifyPost',
    async ({ postId, content }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/posts/${postId}`, { content });
            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async ({ postId }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`/posts/${postId}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const userLikedPost = createAsyncThunk(
    'posts/userLikedPost',
    async ({ postId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`/posts/${postId}/like`);
            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const userCommented = createAsyncThunk(
    'posts/userLikedPost',
    async ({ postId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`/posts/${postId}/like`);
            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const userBookmarkedPost = createAsyncThunk(
    'posts/userLikedPost',
    async ({ postId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`/posts/${postId}/like`);
            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);



