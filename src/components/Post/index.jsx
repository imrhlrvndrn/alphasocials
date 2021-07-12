import moment from 'moment';
import gfm from 'remark-gfm';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import { postStatistics } from '../../constants';
import { selectTheme } from '../../features/theme/theme.slice';

// components
import { Stats } from '../Stats';
import { PostOptions } from '../PostOptions';
import { OptionIcon } from '../../react_icons/OptionIcon';

export const Post = ({ children }) => {
    const theme = useSelector(selectTheme);

    return (
        <div className='p-8 rounded-md' style={{ color: theme.color }}>
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
        _id,
        user: { avatar = {}, full_name = '' },
        content = '',
        createdAt,
    } = data;

    return (
        <div className='mb-4 flex items-center justify-between'>
            <div className='flex items-center wmax'>
                <img
                    className='icon-50 rounded-full object-cover'
                    src='https://avatars.githubusercontent.com/u/43089715?v=4'
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

export const PostContent = ({
    postId,
    content = '',
}) => {
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

export const PostStatistics = ({ stats = { likes: 0, comments: 0, bookmarks: 0 } }) => {
    const theme = useSelector(selectTheme);

    return (
        <div
            className='flex items-center mt-8 pt-8'
            style={{ borderTop: `2px solid ${theme.dark_background}` }}
        >
            {postStatistics.map(({ _id, name, Icon }) => (
                <Stats key={_id}>
                    <Icon />
                    <p className='ml-4 text-s'>{stats[name]}</p>
                </Stats>
            ))}
        </div>
    );
};
