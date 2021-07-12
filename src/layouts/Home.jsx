import { useSelector } from 'react-redux';
import { selectTheme } from '../features/theme/theme.slice';

// components
import { Sidebar } from '../components/Sidebar';

export const HomeLayout = ({ children }) => {
    const theme = useSelector(selectTheme);

    return (
        <div className='flex' style={{ backgroundColor: theme.dark_background }}>
            <Sidebar />
            <div
                className='p-8 flex-grow min-h-screen overflow-y-auto'
                style={{ color: theme.color }}>
                <div className='mt-0'>{children}</div>
            </div>
        </div>
    );
};
