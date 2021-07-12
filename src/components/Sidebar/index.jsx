import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sidebarItems } from '../../constants';
import {
    selectTheme,
    enableDarkMode,
    disableDarkMode,
    selectThemeStatus,
} from '../../features/theme/theme.slice';

// styles
import './nav.scss';

export const Sidebar = () => {
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);
    const themeStatus = useSelector(selectThemeStatus);

    return (
        <nav
            className='flex flex-col min-h-screen h-auto py-8 flex-shrink-0'
            style={{ backgroundColor: theme.light_background, color: theme.color }}>
            {sidebarItems.map(({ _id, name, link, Icon, isActive }) => (
                <NavLink
                    activeClassName='font-bold'
                    activeStyle={{ borderLeft: '4px solid blue' }}
                    key={_id}
                    to={link}
                    style={{ color: theme.color }}
                    className='flex text-align-left p-8 h-auto text-sm w-full'>
                    <Icon color={theme.constants.icon} />
                    <p className='ml-4'>{name}</p>
                </NavLink>
            ))}
            <button
                className='cursor-pointer py-4 h-auto'
                style={{ backgroundColor: theme.dark_background, color: theme.color }}
                onClick={() =>
                    dispatch(themeStatus === 'light' ? enableDarkMode() : disableDarkMode())
                }>
                {themeStatus === 'light' ? 'Enable dark mode' : 'Disable dark mode'}
            </button>
        </nav>
    );
};
