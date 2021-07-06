import { useSelector } from 'react-redux';
import { Sidebar } from '../components/Sidebar';
import { selectTheme } from '../features/theme/themeSlice';

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
