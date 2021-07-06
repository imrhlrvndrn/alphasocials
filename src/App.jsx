import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// styles
import './styles/global.scss';

// components
import { HomeLayout } from './layouts';
import { Feed, SearchPage, ProfilePage } from './pages';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Navigate to='/feed' replace={true} />} />
                <Route
                    exact
                    path='/feed'
                    element={
                        <HomeLayout>
                            <Feed />
                        </HomeLayout>
                    }
                />
                <Route
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
                <Route
                    exact
                    path='/profile'
                    element={
                        <HomeLayout>
                            <ProfilePage />
                        </HomeLayout>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
