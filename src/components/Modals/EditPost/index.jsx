import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from '../../../features/theme/theme.slice';
import { closeModal, selectModal } from '../../../features/modal/modal.slice';

// components
import { InputGroup } from '../../InputGroup';
import { Modal, ModalContent, ModalFooter, ModalHeader } from '..';
import { modifyPost } from '../../../features/post/post.requests';

export const EditPost = () => {
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);
    const modal = useSelector(selectModal);
    const [postContent, setPostContent] = useState(modal.state.content);

    return (
        <Modal width='50%' height='70%'>
            <ModalHeader title='Edit post' />
            <ModalContent>
                <form>
                    <InputGroup
                        variant='textarea'
                        options={{
                            label: false,
                            name: 'content',
                            value: postContent,
                            placeholder: 'Update post',
                            onChange: (event) => setPostContent(() => event.target.value),
                        }}
                    />
                </form>
            </ModalContent>
            <ModalFooter>
                <div className='flex justify-end'>
                    <button
                        onClick={() => dispatch(closeModal())}
                        className='px-4 rounded-md text-sm'
                        style={{ color: 'red' }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            dispatch(
                                modifyPost({
                                    postId: modal.state._id,
                                    content: postContent,
                                })
                            );
                            dispatch(closeModal());
                        }}
                        className='bg-primary px-4 rounded-md ml-4 text-black text-s'
                    >
                        Update post
                    </button>
                </div>
            </ModalFooter>
        </Modal>
    );
};
