import { useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { me } from '../../features/user/user.requests';
import { selectUser } from '../../features/user/user.slice';

// components
import { FeedPosts } from '../../components/FeedPosts';
import { NewPost } from '../../components/Form/NewPost';
import { setPostState } from '../../features/post/post.slice';

export const Feed = () => {
    const dispatch = useDispatch();
    const loggedUser = useSelector(selectUser);

    useEffect(() => {
        dispatch(me({}))
            .then(unwrapResult)
            .then((result) => {
                console.log('results => ', result);
                dispatch(
                    setPostState({
                        liked_posts: result.data.data.user.likes,
                        pinned_post: result.data.data.user.pinned_post,
                        bookmarked_posts: result.data.data.user.bookmarks,
                    })
                );
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <h1 className='text-xl mb-8'>Welcome back, {loggedUser?.full_name}</h1>
            <NewPost />

            <FeedPosts />
        </div>
    );
};
