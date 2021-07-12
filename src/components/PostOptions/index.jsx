import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../features/modal/modal.slice';
import { deletePost } from '../../features/post/post.requests';
import { selectTheme } from '../../features/theme/theme.slice';

// components
import { EditPost } from '../Modals';

export const PostOptions = ({ post }) => {
    const { _id } = post;
    const userId = Cookies.get('userId');
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);

    console.log('Post details in Options => ', { userId, post });

    return (
        <div
            className='text-xs rounded-md wmax'
            style={{
                backgroundColor: theme.dark_background,
                color: theme.color,
                position: 'absolute',
                top: '100%',
                right: '0%',
                zIndex: '10',
            }}
        >
            {post.user._id === userId && (
                <>
                    <span
                        onClick={() => dispatch(deletePost({ postId: _id }))}
                        className='block w-full flex py-4 px-8 cursor-pointer bg-transparent'
                    >
                        Delete
                    </span>
                    <span
                        onClick={() => dispatch(openModal({ modal: EditPost, state: { ...post } }))}
                        className='block w-full flex py-4 px-8 cursor-pointer bg-transparent'
                    >
                        Edit
                    </span>
                </>
            )}
            <span className='block w-full flex py-4 px-8 cursor-pointer bg-transparent'>
                Report
            </span>
        </div>
    );
};
