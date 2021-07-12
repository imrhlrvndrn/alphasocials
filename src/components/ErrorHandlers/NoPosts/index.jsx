import { useSelector } from 'react-redux';
import { selectTheme } from '../../../features/theme/theme.slice';

export const NoPosts = ({ errorMessage }) => {
    const theme = useSelector(selectTheme);

    return (
        <div
            className='rounded-md p-8 mt-8'
            style={{ backgroundColor: theme.light_background, color: theme.color }}>
            <h1 className='text-xl opac-6 font-weight-md text-align-center'>{errorMessage}</h1>
            <div className='flex items-center justify-center mt-8'>
                <button style={{ color: theme.color }}>Create new post</button>
                <button
                    style={{ color: theme.constants.dark }}
                    className='bg-primary rounded-md px-4 ml-8 flex items-center'>
                    Make new friends
                </button>
            </div>
        </div>
    );
};
