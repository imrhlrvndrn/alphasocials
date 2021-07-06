import { useSelector } from 'react-redux';
import { selectTheme } from '../../features/theme/themeSlice';
import { PostLayout } from '../../layouts/PostLayout';
import { CommentForm } from '../../components/Form';
import { Post, PostHeader, PostContent, PostStatistics } from '../../components/Post';
import { SendIcon } from '../../react_icons/SendIcon';

export const Feed = () => {
    const theme = useSelector(selectTheme);

    return (
        <div>
            <h1 className='text-xl mb-8'>Welcome back, Rahul</h1>
            <div
                className='rounded-md p-6 post-form'
                style={{
                    backgroundColor: theme.light_background,
                    boxShadow: theme.constants.shadow,
                }}>
                <h1 className='mb-4'>Post something</h1>
                <form
                    className='flex pt-4 items-center'
                    style={{
                        borderTop: `2px solid ${theme.dark_background}`,
                    }}>
                    <img
                        className='icon-50 rounded-full object-cover'
                        src='https://avatars.githubusercontent.com/u/43089715?v=4'
                        alt='bearded man'
                    />
                    <input
                        className='flex-grow m-0 mr-4 rounded-md px-4 py-7'
                        type='text'
                        style={{ backgroundColor: theme.dark_background, color: theme.color }}
                        name='post-input'
                        id='post-input'
                        autoComplete='off'
                        placeholder={`What's up, Rahul?`}
                    />
                    <button
                        type='submit'
                        style={{ backgroundColor: theme.color, color: theme.light_background }}
                        className='flex justify-center items-center px-8 py-4 rounded-md'>
                        <span className='mr-4 text-xs'>Post</span>
                        <SendIcon color={theme.light_background} size={18} />{' '}
                    </button>
                </form>
            </div>

            <PostLayout>
                <Post>
                    <PostHeader />
                    <PostContent />
                    <PostStatistics />
                </Post>
                <CommentForm />
            </PostLayout>

            <PostLayout>
                <Post>
                    <PostHeader />
                    <PostContent />
                    <PostStatistics />
                </Post>
            </PostLayout>
        </div>
    );
};
