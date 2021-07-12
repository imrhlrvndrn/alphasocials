import { withModalOverlay } from '../../../hoc/withModal';

export const TestModal = () => {
    console.log('Rendered TestModal');

    return <div className='bg-primary text-black'>hello I'm a test modal</div>;
};

const Modal = withModalOverlay(TestModal);
export { Modal };
