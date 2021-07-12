import { axios } from '../../config';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadPosts = createAsyncThunk('posts/loadPosts', async (_, { rejectWithValue }) => {
    // const data = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10').then((res) =>
    //     res.json()
    // );
    // return data;
    try {
        const response = await axios.get('/posts?type=USER');
        console.log('Data from API request =>', response);
        return response;
    } catch (error) {
        console.error(error.response);
        return rejectWithValue(error.response.data);
        // return error.response.data;
    }
});

export const createNewPost = createAsyncThunk('posts/createNewPost', async ({ content }) => {
    const response = await axios.post('/posts', { content });
    return response;
});

export const modifyPost = createAsyncThunk('posts/modifyPost', async ({ postId, content }) => {
    const response = await axios.put(`/posts/${postId}`, { content });
    return response;
});

export const deletePost = createAsyncThunk('posts/deletePost', async ({ postId }) => {
    const response = await axios.delete(`/posts/${postId}`);
    return response;
});
