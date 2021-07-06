import { Fragment } from 'react';
import { UserWidget } from '../../components/UserWidget';

export const SearchPage = () => {
    return (
        <Fragment>
            <input
                className='w-full px-4 py-8 rounded-md'
                type='text'
                name='search'
                id='search'
                autoComplete='off'
                placeholder='Search users by name or username'
            />
            <div>
                <UserWidget />
                <UserWidget />
                <UserWidget />
                <UserWidget />
                <UserWidget />
                <UserWidget />
                <UserWidget />
                <UserWidget />
                <UserWidget />
                <UserWidget />
            </div>
        </Fragment>
    );
};
