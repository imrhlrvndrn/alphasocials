import { useSelector } from 'react-redux';
import { selectTheme } from '../../features/theme/theme.slice';

export const PostLayout = ({ children }) => {
    const theme = useSelector(selectTheme);

    return (
        <div
            className='rounded-md my-8'
            style={{
                backgroundColor: theme.light_background,
                boxShadow: theme.constants.shadow,
            }}>
            {children}
        </div>
    );
};
