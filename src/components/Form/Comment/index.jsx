import { useSelector } from 'react-redux';
import { selectTheme } from '../../../features/theme/themeSlice';

export const CommentForm = () => {
    const theme = useSelector(selectTheme);

    return (
        <div className='p-8' style={{ borderTop: `2px solid ${theme.dark_background}` }}>
            <form className='flex items-center'>
                <img
                    className='icon-40 rounded-full object-cover'
                    src='https://avatars.githubusercontent.com/u/43089715?v=4'
                    alt='bearded man'
                />
                <input
                    className='flex-grow m-0 px-4 py-6 mr-4 rounded-md text-xs'
                    type='text'
                    name='post-input'
                    id='post-input'
                    autoComplete='off'
                    style={{ backgroundColor: theme.dark_background, color: theme.color }}
                    placeholder={`Leave a comment`}
                />
                <button
                    type='submit'
                    style={{ backgroundColor: theme.dark_background, color: theme.color }}
                    className='px-8 py-4 h-auto text-xs rounded-md cursor-pointer'>
                    Comment
                </button>
            </form>
        </div>
    );
};
