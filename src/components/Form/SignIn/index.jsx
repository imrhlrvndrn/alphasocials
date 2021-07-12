import { useEffect, useState } from 'react';
import { formSubmit } from '../utils';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from '../../../features/theme/theme.slice';

// components
import { InputGroup } from '../../InputGroup';
import { VisibilityIcon } from '../../../react_icons/VisibilityIcon';
import { InVisibilityIcon } from '../../../react_icons/InVisibilityIcon';
import { selectLoginStatus } from '../../../features/user/user.slice';
import { signInUser } from '../../../features/user/user.requests';
import Cookies from 'js-cookie';

export const SignInForm = ({ location, setAuthState }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useSelector(selectTheme);
    const loginStatus = useSelector(selectLoginStatus);
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [authParams, setAuthParams] = useState({
        username: '',
        password: '',
    });

    const updateInputValue = (event) =>
        setAuthParams((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));

    const signIn = (event) =>
        formSubmit({
            event,
            dispatch,
            action: signInUser,
            actionArgs: { username: authParams.username, password: authParams.password },
        });

    useEffect(() => {
        if (loginStatus) navigate(location?.state?.from || '/');
    }, [loginStatus]);

    return (
        <form
            onSubmit={signIn}
            className='wmax-600 w-full p-8 rounded-md'
            style={{ backgroundColor: theme.light_background, color: theme.color }}>
            <h1 className='text-xl text-align-center mb-12'>Welcome back</h1>
            <InputGroup
                options={{
                    value: authParams.username,
                    name: 'username',
                    type: 'username',
                    placeholder: 'johndoe',
                    onChange: updateInputValue,
                }}
            />
            <InputGroup
                options={{
                    value: authParams.password,
                    name: 'password',
                    placeholder: 'Passphrase',
                    onChange: updateInputValue,
                    type: passwordVisibility ? 'text' : 'password',
                    onClick: () => setPasswordVisibility((prevState) => !prevState),
                    icon: passwordVisibility ? (
                        <InVisibilityIcon color={theme.color} />
                    ) : (
                        <VisibilityIcon color={theme.color} />
                    ),
                }}
            />
            <span className='flex wmax ml-auto text-xs cursor-pointer'>Forgot password?</span>
            <button
                disabled={false}
                type='submit'
                className='capitalize font-bold p-4 rounded-md bg-primary w-full h-auto mt-4 cursor-pointer'>
                Sign in
            </button>
            <span
                onClick={() => setAuthState('signup')}
                className='w-full inline-block mt-2 text-align-center text-xs cursor-pointer'>
                Don't have an account? Signup
            </span>
        </form>
    );
};
