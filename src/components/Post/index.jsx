import moment from 'moment';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../features/theme/themeSlice';

// components
import { Stats } from '../Stats';
import { postStatistics } from '../../constants';
import { OptionIcon } from '../../react_icons/OptionIcon';

export const Post = ({ children }) => {
    const theme = useSelector(selectTheme);

    return (
        <div className='p-8 rounded-md' style={{ color: theme.color }}>
            {children}
        </div>
    );
};

export const PostHeader = ({ data = {} }) => {
    const {
        avatar,
        full_name = 'Rahul Ravindran',
        date = new Date('Fri Jul 02 2021 19:06:23'),
    } = data;

    return (
        <div className='mb-4 flex items-center'>
            <img
                className='icon-50 rounded-full object-cover'
                src='https://avatars.githubusercontent.com/u/43089715?v=4'
                alt='bearded man'
            />
            <div className='flex-grow'>
                <h1 className='text-md font-weight-md'>{full_name}</h1>
                <p className='text-xs'>{moment(date).fromNow()}</p>
            </div>
            <OptionIcon />
        </div>
    );
};

export const PostContent = ({
    content = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis incidunt iusto delectus consectetur. Totam asperiores veniam consequuntur blanditiis itaque minus enim officiis, odio ullam ab accusamus eum. Corporis, eum modi!',
}) => {
    return <div>{content}</div>;
};

export const PostStatistics = () => {
    const theme = useSelector(selectTheme);

    return (
        <div
            className='flex items-center mt-8 pt-8'
            style={{ borderTop: `2px solid ${theme.dark_background}` }}>
            {postStatistics.map(({ _id, name, Icon }) => (
                <Stats key={_id}>
                    <Icon />
                    <p className='ml-2 text-xs'>36 {name}</p>
                </Stats>
            ))}
        </div>
    );
};
