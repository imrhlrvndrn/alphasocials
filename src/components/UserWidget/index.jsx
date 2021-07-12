import { useSelector } from 'react-redux';
import { selectTheme } from '../../features/theme/theme.slice';

export const UserWidget = ({ full_name = 'Rahul Ravindran', username = 'imrhlrvndrn' }) => {
    const theme = useSelector(selectTheme);

    return (
        <div
            className='flex justify-between items-center p-8 rounded-md mb-4'
            style={{ backgroundColor: theme.light_background, color: theme.color }}>
            <div className='flex items-center'>
                <img
                    className='icon-50 rounded-full object-cover'
                    src='https://avatars.githubusercontent.com/u/43089715?v=4'
                    alt='bearded man'
                />
                <div>
                    <h1>{full_name}</h1>
                    <p className='text-xs'>@{username}</p>
                </div>
            </div>
            <button
                className='rounded-md bg-dark text-white px-6'
                style={{ backgroundColor: theme.dark_background, color: theme.color }}>
                Following
            </button>
        </div>
    );
};
