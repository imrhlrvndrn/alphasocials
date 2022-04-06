import moment from 'moment';
import gfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { postStatistics } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectPosts } from '../../features/post/post.slice';
import { selectTheme } from '../../features/theme/theme.slice';
import { modifyUser, selectUser } from '../../features/user/user.slice';
import { userBookmarkedPost, userLikedPost } from '../../features/post/post.requests';

// components
import { Stats } from '../Stats';
import { PostOptions } from '../PostOptions';
import { OptionIcon } from '../../react_icons/OptionIcon';
import { BookmarkIcon } from '../../react_icons/BookmarkIcon';

export const Post = ({ children, postId }) => {
    const theme = useSelector(selectTheme);
    const posts = useSelector(selectPosts);
    const post = posts[posts.findIndex((post) => post._id === postId)];

    useEffect(() => {
        return () => console.log('Post component unmounted and re-rendered');
    }, [post]);

    return (
        <div className='p-8' style={{ color: theme.color }}>
            {children}
        </div>
    );
};

export const PostHeader = ({ data = {} }) => {
    const theme = useSelector(selectTheme);
    const [showOptions, setShowOptions] = useState(false);

    const toggleOptions = () => {
        setShowOptions((prevState) => !prevState);
    };

    const {
        user: { avatar = { url: '' }, full_name = '' },
        createdAt,
    } = data;

    return (
        <div className='mb-4 flex items-center justify-between'>
            <div className='flex items-center wmax'>
                <img
                    className='icon-50 rounded-full object-cover'
                    src={`${avatar?.url || 'https://avatars.githubusercontent.com/u/43089715?v=4'}`}
                    alt='bearded man'
                />
                <div className='flex-grow'>
                    <h1 className='text-md font-weight-md'>{full_name}</h1>
                    <p className='text-xs opac-6'>{moment(createdAt).fromNow()}</p>
                </div>
            </div>
            <button onClick={toggleOptions} className='bg-transparent relative cursor-pointer'>
                <OptionIcon color={theme.color} />
                {showOptions && <PostOptions post={data} />}
            </button>
        </div>
    );
};

export const PostContent = ({ postId, content = '' }) => {
    const theme = useSelector(selectTheme);
    const navigate = useNavigate();

    return (
        <>
            <ReactMarkdown
                linkTarget='_blank'
                remarkPlugins={[gfm]}
                children={content}
                components={{
                    h1: ({ children, ...props }) => (
                        <h1 className='text-xl' {...props}>
                            {children}
                        </h1>
                    ),
                    h2: ({ children, ...props }) => (
                        <h2 className='text-lg' {...props}>
                            {children}
                        </h2>
                    ),
                    h3: ({ children, ...props }) => (
                        <h3 className='text-md' {...props}>
                            {children}
                        </h3>
                    ),
                    a: ({ node, children, ...props }) => (
                        <a
                            style={{ textDecoration: 'underline' }}
                            className='text-primary'
                            {...props}
                        >
                            {children}
                        </a>
                    ),
                }}
                style={{ color: theme.color }}
            />
            {/* <div onClick={() => navigate(`/post/${postId}`)} className='cursor-pointer'>
                {content}
            </div> */}
        </>
    );
};

export const PostStatistics = ({ stats = { likes: 0, comments: 0, bookmarks: 0 }, postId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const theme = useSelector(selectTheme);

    const dispatchAction = ({ postId = undefined, stat = 'comments' }) => {
        if (stat === 'comments') return navigate(`/post/${postId}`);
        if (stat === 'likes')
            return dispatch(userLikedPost({ postId }))
                .then(unwrapResult)
                .then((promiseResult) => {
                    console.log('liked post data from API => ', promiseResult);
                    if (promiseResult.success) {
                        dispatch(
                            modifyUser({
                                user: {
                                    likes: [...user.likes, promiseResult.data.likedPost],
                                },
                            })
                        );
                    }
                });
        if (stat === 'bookmarks')
            return dispatch(userBookmarkedPost({ postId }))
                .then(unwrapResult)
                .then((promiseResult) => {
                    if (promiseResult.success) {
                        dispatch(
                            modifyUser({
                                user: {
                                    bookmarks: [
                                        ...user.bookmarks,
                                        promiseResult.data.bookmarkedPost,
                                    ],
                                },
                            })
                        );
                    }
                });
    };

    const isLiked = (stat) =>
        stat === 'likes' && user?.likes?.filter(({ post }) => post === postId).length > 0;

    const isBookmarked = (stat) =>
        stat === 'bookmarks' && user?.bookmarks?.filter(({ post }) => post === postId).length > 0;

    const renderStats = () => {
        return postStatistics.map(({ _id, name, Icon }) => (
            <Stats key={_id}>
                <button
                    className='bg-transparent cursor-pointer'
                    onClick={() => dispatchAction({ postId, stat: name })}
                >
                    <Icon
                        color={theme.color}
                        isActive={isLiked(name) || isBookmarked(name) ? true : false}
                    />
                </button>
                <p className='ml-4 text-s'>{stats[name]}</p>
            </Stats>
        ));
    };

    return (
        <div
            className='flex items-center mt-8 pt-8'
            style={{ borderTop: `2px solid ${theme.dark_background}` }}
        >
            {renderStats()}
            <button
                className='bg-transparent cursor-pointer'
                // onClick={() => dispatchAction({ postId, stat: name })}
            >
                <BookmarkIcon color={theme.color} isActive={isBookmarked() ? true : false} />
            </button>
        </div>
    );
};
