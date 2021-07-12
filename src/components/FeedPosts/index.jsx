import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPosts } from '../../features/post/post.requests';
import { selectPostError, selectPosts, selectPostStatus } from '../../features/post/post.slice';

// components
import { PostLayout } from '../../layouts/PostLayout';
import { NoPosts } from '../ErrorHandlers/NoPosts';
import { CommentForm } from '../Form';
import { Post, PostHeader, PostContent, PostStatistics } from '../Post';

export const FeedPosts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectPosts);

    const postError = useSelector(selectPostError);
    const postStatus = useSelector(selectPostStatus);

    useEffect(() => {
        dispatch(loadPosts());
    }, []);

    useEffect(() => {}, [posts]);

    console.log('Feedpage posts => ', posts);

    if (postStatus === 'loading')
        return <p className='mt-8 text-align-center text-lg'>Loading posts</p>;

    if (postError) return <NoPosts errorMessage={postError} />;

    return (
        <>
            {posts?.length > 0 &&
                posts?.map((post) => (
                    <PostLayout key={post._id}>
                        <Post>
                            <PostHeader data={post} />
                            <PostContent postId={post._id} content={post.content} />
                            <PostStatistics stats={post.stats} />
                        </Post>
                        <CommentForm />
                    </PostLayout>
                ))}
        </>
    );
};
