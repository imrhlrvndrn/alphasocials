import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../features/modal/modal.slice';
import { selectTheme } from '../../features/theme/theme.slice';

export const Modal = ({ width = '400px', height = 'auto', children }) => {
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);

    return (
        <div
            style={{
                width: '100%',
                height: '100vh',
                position: 'fixed',
                top: '0',
                left: '0',
                zIndex: '900',
            }}
        >
            <div
                style={{
                    width: '100%',
                    height: '100vh',
                    zIndex: '9',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                }}
                onClick={() => dispatch(closeModal())}
            ></div>
            <div
                className='p-8 rounded-md absolute-center flex flex-col'
                style={{
                    zIndex: '10',
                    height,
                    width,
                    maxWidth: '80%',
                    minHeight: '400px',
                    minWidth: '400px',
                    backgroundColor: theme.dark_background,
                    color: theme.color,
                }}
            >
                {children}
            </div>
        </div>
    );
};

export const ModalHeader = ({ title = 'Modal Heading' }) => {
    return (
        <div className='w-full mb-4'>
            <h1 className='text-lg'>{title}</h1>
        </div>
    );
};

export const ModalContent = ({ children }) => {
    return <div className='flex-grow'>{children}</div>;
};

export const ModalFooter = ({ children }) => {
    return <Fragment>{children}</Fragment>;
};

export { EditPost } from './EditPost';
