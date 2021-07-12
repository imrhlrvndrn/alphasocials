import { useSelector } from 'react-redux';
import { selectTheme } from '../../features/theme/theme.slice';
import { useLocation } from 'react-router-dom';

// components
import { SignInForm } from '../../components/Form/SignIn';
import { SignUpForm } from '../../components/Form/SignUp';
import { useState } from 'react';

export const AuthPage = () => {
    const location = useLocation();
    const theme = useSelector(selectTheme);
    const [authState, setAuthState] = useState('signin');

    const renderForm = () => {
        return authState === 'signin' ? (
            <SignInForm location={location} setAuthState={setAuthState} />
        ) : authState === 'signup' ? (
            <SignUpForm location={location} setAuthState={setAuthState} />
        ) : null;
    };

    return (
        <div
            className='min-h-screen w-full flex items-center justify-center'
            style={{ backgroundColor: theme.dark_background }}>
            {renderForm()}
        </div>
    );
};
