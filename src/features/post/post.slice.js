import { createSlice } from '@reduxjs/toolkit';
import { createNewPost, deletePost, loadPosts, modifyPost, userLikedPost } from './post.requests';

const initialState = {
    posts: [],
    error: null,
    status: 'idle',
    liked_posts: [],
    pinned_post: null,
    bookmarked_posts: [],
};

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        modifyPost: () => {},
        setPostState: (state, action) => {
            // ! console.log('setState => ', { action });
            Object.keys(action.payload).forEach((key) => {
                if (key in state) state[key] = action.payload[key];
            });
        },
    },
    extraReducers: {
        [loadPosts.pending]: (state) => {
            state.error = null;
            state.status = 'loading';
        },
        [loadPosts.fulfilled]: (state, action) => {
            console.log('loadPosts API response => ', action);

            if (action.payload.success) {
                state.error = null;
                state.status = 'fullfilled';
                state.posts = action.payload.data.posts;
            }
        },
        [loadPosts.rejected]: (state, action) => {
            console.log('error action from loadPosts => ', action);
            state.posts = [];
            state.status = 'error';
            state.error = action.paload.message;
        },
        [createNewPost.pending]: (state) => {
            state.error = null;
            state.status = 'loading';
        },
        [createNewPost.fulfilled]: (state, action) => {
            console.log('createNewPost API response => ', action);
            if (action.payload.success) {
                state.error = null;
                state.status = 'fullfilled';
                state.posts.push(action.payload.data.post);
            }
        },
        [createNewPost.rejected]: (state, action) => {
            state.status = 'error';
            state.error = action.payload.message;
        },
        [modifyPost.pending]: (state) => {
            state.status = 'loading';
        },
        [modifyPost.fulfilled]: (state, action) => {
            console.log('modifyPost API response => ', action);
            if (action.payload.success) {
                state.error = null;
                state.status = 'fullfilled';
                state.posts = state.posts.map((post) =>
                    post._id === action.payload.data.post._id
                        ? { ...post, content: action.payload.data.post.content }
                        : post
                );
            }
        },
        [modifyPost.rejected]: (state, action) => {
            state.status = 'error';
            state.error = action.payload.message;
        },
        [deletePost.pending]: (state) => {
            state.status = 'loading';
        },
        [deletePost.fulfilled]: (state, action) => {
            console.log('deletePost API response => ', action);
            if (action.payload.success) {
                state.error = null;
                state.status = 'fullfilled';
                state.posts.pop(action.payload.data.post._id);
            }
        },
        [deletePost.rejected]: (state, action) => {
            state.status = 'error';
            state.error = action.payload.message;
        },
        [userLikedPost.pending]: (state) => {
            state.status = 'loading';
        },
        [userLikedPost.fulfilled]: (state, action) => {
            console.log('userLikedPost API response => ', action);
            if (action.payload.success) {
                state.error = null;
                state.status = 'fullfilled';
                state.posts = state.posts.map((post) =>
                    post._id === action.payload.data.postId
                        ? {
                              ...post,
                              stats: {
                                  ...post.stats,
                                  likes: action.payload.data.stats.likes,
                              },
                          }
                        : post
                );
            }
        },
        [userLikedPost.rejected]: (state, action) => {
            state.status = 'error';
            state.error = action.payload.message;
        },
    },
});

export const { setPostState } = postSlice.actions;

export const selectPosts = (state) => state.posts.posts;
export const selectPostError = (state) => state.posts.error;
export const selectPostEditMode = (state) => state.posts.edit_mode;
export const selectPostStatus = (state) => state.posts.status;

export default postSlice.reducer;
