import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';
import { selectLoginStatus } from '../../features/user/user.slice';

export const PrivateRoute = ({ path, ...props }) => {
    const loginStatus = useSelector(selectLoginStatus);

    return loginStatus ? (
        <Route path={path} {...props} />
    ) : (
        <Navigate to='/auth' replace={true} state={{ from: path }} />
    );
};
