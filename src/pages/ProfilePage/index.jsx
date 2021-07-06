import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../features/theme/themeSlice';

// components
import { PostLayout } from '../../layouts/PostLayout';
import { PostStatistics, PostHeader, PostContent, Post } from '../../components/Post';

export const ProfilePage = () => {
    const theme = useSelector(selectTheme);

    return (
        <Fragment>
            <div className='flex items-start' style={{ color: theme.color }}>
                <img
                    style={{ width: '180px', height: '180px' }}
                    className='rounded-full object-cover mr-16'
                    src='https://avatars.githubusercontent.com/u/43089715?v=4'
                    alt='rahul ravindran'
                />
                <div>
                    <div className='flex items-center'>
                        <div className='mr-8'>
                            <h1 className='text-lg font-bold'>Rahul Ravindran</h1>
                            <p className='text-xs'>@imrhlrvndrn</p>
                        </div>
                        <button
                            className='px-8 rounded-md'
                            style={{ backgroundColor: theme.light_background, color: theme.color }}>
                            Following
                        </button>
                    </div>
                    <PostStatistics />
                </div>
            </div>
            <div className='mt-16'>
                <PostLayout>
                    <Post>
                        <PostHeader />
                        <PostContent />
                        <PostStatistics />
                    </Post>
                </PostLayout>
                <PostLayout>
                    <Post>
                        <PostHeader />
                        <PostContent />
                        <PostStatistics />
                    </Post>
                </PostLayout>
                <PostLayout>
                    <Post>
                        <PostHeader />
                        <PostContent />
                        <PostStatistics />
                    </Post>
                </PostLayout>
            </div>
        </Fragment>
    );
};
