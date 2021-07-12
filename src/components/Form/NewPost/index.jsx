import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewPost } from '../../../features/post/post.requests';
import { selectTheme } from '../../../features/theme/theme.slice';
import { selectUser } from '../../../features/user/user.slice';

// components
import { SendIcon } from '../../../react_icons/SendIcon';
import { InputGroup } from '../../InputGroup';
import { formSubmit } from '../utils';

export const NewPost = () => {
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);
    const loggedUser = useSelector(selectUser);
    const [postContent, setPostContent] = useState('');

    const addNewPost = (event) => {
        event.preventDefault();
        formSubmit({
            event,
            dispatch,
            action: createNewPost,
            actionArgs: { content: postContent },
        });
        setPostContent('');
    };

    return (
        <div
            className='rounded-md p-6 post-form'
            style={{
                backgroundColor: theme.light_background,
                boxShadow: theme.constants.shadow,
            }}>
            <h1 className='mb-4'>Post something</h1>
            <form
                onSubmit={addNewPost}
                className='flex pt-4 items-center'
                style={{
                    borderTop: `2px solid ${theme.dark_background}`,
                }}>
                <img
                    className='icon-50 rounded-full object-cover'
                    src='https://avatars.githubusercontent.com/u/43089715?v=4'
                    alt='bearded man'
                />
                <InputGroup
                    variant='textarea'
                    options={{
                        type: 'text',
                        name: 'post_input',
                        value: postContent,
                        onChange: (event) => setPostContent((prevState) => event.target.value),
                        label: false,
                        autoComplete: 'off',
                        placeholder: `What's up, ${loggedUser?.full_name}?`,
                    }}
                    className='m-0 flex-grow hmax'
                />
                <button
                    type='submit'
                    style={{ backgroundColor: theme.color, color: theme.light_background }}
                    className={`flex justify-center items-center px-8 py-4 rounded-md ml-4`}>
                    <span className='mr-4 text-xs'>Post</span>
                    <SendIcon color={theme.light_background} size={18} />{' '}
                </button>
            </form>
        </div>
    );
};
