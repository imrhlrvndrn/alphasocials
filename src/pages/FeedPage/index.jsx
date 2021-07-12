import { useEffect } from 'react';
import { me } from '../../features/user/user.requests';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../features/user/user.slice';

// components
import { FeedPosts } from '../../components/FeedPosts';
import { NewPost } from '../../components/Form/NewPost';

export const Feed = () => {
    const dispatch = useDispatch();
    const loggedUser = useSelector(selectUser);

    useEffect(() => {
        dispatch(me({ select: ['full_name'] }));
    }, []);

    return (
        <div>
            <h1 className='text-xl mb-8'>Welcome back, {loggedUser?.full_name}</h1>
            <NewPost />

            <FeedPosts />
        </div>
    );
};
