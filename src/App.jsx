import { useDispatch, useSelector } from 'react-redux';
import { useEffect, Fragment } from 'react';
import { selectModal } from './features/modal/modal.slice';
import { verifyToken } from './features/user/user.requests';
import { Route, Routes, Navigate } from 'react-router-dom';

// styles
import './styles/global.scss';

// components
import { HomeLayout } from './layouts';
import { PrivateRoute } from './components/PrivateRoute';
import { Feed, SearchPage, ProfilePage, AuthPage } from './pages';

function App() {
    const dispatch = useDispatch();
    const modal = useSelector(selectModal);

    useEffect(() => {
        dispatch(verifyToken());
    }, []);

    return (
        <Fragment>
            <Routes>
                <PrivateRoute exact path='/' element={<Navigate to='/feed' replace={true} />} />
                <PrivateRoute
                    exact
                    path='/feed'
                    element={
                        <HomeLayout>
                            <Feed />
                        </HomeLayout>
                    }
                />
                <PrivateRoute
                    exact
                    path='/bookmarks'
                    element={
                        <HomeLayout>
                            <h1>Users' bookmarks list</h1>
                        </HomeLayout>
                    }
                />
                <Route
                    exact
                    path='/search'
                    element={
                        <HomeLayout>
                            <SearchPage />
                        </HomeLayout>
                    }
                />
                <PrivateRoute
                    exact
                    path='/profile'
                    element={
                        <HomeLayout>
                            <ProfilePage />
                        </HomeLayout>
                    }
                />
                <Route exact path='/auth' element={<AuthPage />} />
            </Routes>
            {modal.isActive && <modal.modal />}
        </Fragment>
    );
}

export default App;
