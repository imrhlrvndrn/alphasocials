import { createSlice } from '@reduxjs/toolkit';
import { createNewPost, deletePost, loadPosts, modifyPost } from './post.requests';

const initialState = {
    posts: [],
    error: null,
    status: 'idle',
    edit_mode: {
        is_active: false,
        post: null,
    },
};

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        modifyPost: () => {},
    },
    extraReducers: {
        [loadPosts.pending]: (state) => {
            state.error = null;
            state.status = 'loading';
        },
        [loadPosts.fulfilled]: (state, action) => {
            console.log('API response => ', action);

            if (action.payload.data.success) {
                state.error = null;
                state.status = 'fullfilled';
                state.posts = action.payload.data.data.posts;
            }
        },
        [loadPosts.rejected]: (state, action) => {
            console.log('error action from loadPosts => ', action);
            state.posts = [];
            state.status = 'error';
            state.error = action.payload.message;
            // state.error = action.payload.message;
        },
        [createNewPost.pending]: (state) => {
            state.status = 'loading';
        },
        [createNewPost.fulfilled]: (state, action) => {
            console.log('createNewPost API response => ', action);
            if (action.payload.data.success) {
                state.error = null;
                state.status = 'fullfilled';
                state.posts.push(action.payload.data.data.post);
            }
        },
        [createNewPost.rejected]: (state, action) => {
            state.status = 'error';
            state.error = action.error.message;
        },
        [modifyPost.pending]: (state) => {
            state.status = 'loading';
        },
        [modifyPost.fulfilled]: (state, action) => {
            console.log('modifyPost API response => ', action);
            if (action.payload.data.success) {
                state.error = null;
                state.status = 'fullfilled';
                state.posts = state.posts.map((post) =>
                    post._id === action.payload.data.data.post._id
                        ? { ...post, content: action.payload.data.data.post.content }
                        : post
                );
            }
        },
        [modifyPost.rejected]: (state, action) => {
            state.status = 'error';
            state.error = action.message;
        },
        [deletePost.pending]: (state) => {
            state.status = 'loading';
        },
        [deletePost.fulfilled]: (state, action) => {
            console.log('deletePost API response => ', action);
            if (action.payload.data.success) {
                state.error = null;
                state.status = 'fullfilled';
                state.posts.pop(action.payload.data.data.post._id);
            }
        },
        [deletePost.rejected]: (state, action) => {
            state.status = 'error';
            state.error = action.message;
        },
    },
});

export const selectPosts = (state) => state.posts.posts;
export const selectPostError = (state) => state.posts.error;
export const selectPostEditMode = (state) => state.posts.edit_mode;
export const selectPostStatus = (state) => state.posts.status;

export default postSlice.reducer;
