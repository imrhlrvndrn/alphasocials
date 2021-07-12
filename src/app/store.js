import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../features/post/post.slice';
import userReducer from '../features/user/user.slice';
import modalReducer from '../features/modal/modal.slice';
import themeReducer from '../features/theme/theme.slice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        posts: postReducer,
        modal: modalReducer,
        theme: themeReducer,
    },
});
