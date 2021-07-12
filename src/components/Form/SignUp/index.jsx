import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from '../../../hooks/useDebounce';
import { selectTheme } from '../../../features/theme/theme.slice';
import { signUpUser, verifyUsername } from '../../../features/user/user.requests';
import { formSubmit, isValidPass, matchPass, passwordRegex, validatePassword } from '../utils';
import {
    selectError,
    selectIsValidUsername,
    selectLoginStatus,
} from '../../../features/user/user.slice';

// components
import { InputGroup } from '../../InputGroup';
import { VisibilityIcon } from '../../../react_icons/VisibilityIcon';
import { InVisibilityIcon } from '../../../react_icons/InVisibilityIcon';

export const SignUpForm = ({ location, setAuthState }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useSelector(selectTheme);
    const userError = useSelector(selectError);
    const loginStatus = useSelector(selectLoginStatus);
    const isValidUsername = useSelector(selectIsValidUsername);
    const [authParams, setAuthParams] = useState({
        full_name: '',
        username: '',
        password: '',
        confirm_password: '',
        email: '',
    });
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const debouncedUsername = useDebounce(authParams.username, 1000);

    const validateSignUpForm = () =>
        validatePassword({
            regex: passwordRegex,
            compareWith: authParams.password,
            compareTo: authParams.confirm_password,
        }) && isValidUsername;

    const updateInputValue = (event) =>
        setAuthParams((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));

    useEffect(() => {
        if (loginStatus) navigate(location?.state?.from || '/');
    }, [loginStatus]);

    useEffect(() => {
        if (debouncedUsername.length > 0) dispatch(verifyUsername({ username: debouncedUsername }));
    }, [debouncedUsername]);

    console.log(
        `${authParams.username} is ${isValidUsername ? 'valid ' : 'not a valid '}username`,
        { formValidation: validateSignUpForm(), formValidationNegation: !validateSignUpForm() }
    );
    return (
        <form
            onSubmit={(event) =>
                formSubmit({
                    event,
                    dispatch,
                    action: signUpUser,
                    actionArgs: {
                        email: authParams.email,
                        username: authParams.username,
                        password: authParams.password,
                        full_name: authParams.full_name,
                    },
                })
            }
            className='wmax-600 w-full p-8 rounded-md'
            style={{ backgroundColor: theme.light_background, color: theme.color }}>
            <h1 className='text-xl text-align-center mb-12'>Join our network</h1>
            <div className='flex justify-between'>
                <InputGroup
                    options={{
                        name: 'full_name',
                        placeholder: 'John Doe',
                        onChange: updateInputValue,
                        value: authParams.full_name,
                    }}
                />
                <span className='mx-4'></span>
                <InputGroup
                    options={{
                        name: 'email',
                        type: 'email',
                        placeholder: 'johndoe@gmail.com',
                        onChange: updateInputValue,
                        value: authParams.email,
                    }}
                />
            </div>
            <InputGroup
                options={{
                    name: 'username',
                    type: 'text',
                    placeholder: 'johndoe',
                    onChange: updateInputValue,
                    value: authParams.username,
                    auto_complete: 'off',
                    rule: {
                        is_satisfied: userError === null,
                        message: userError,
                        satisfied_message: `Username ${authParams.username} is available`,
                    },
                }}
            />
            <div className='flex justify-between'>
                <InputGroup
                    options={{
                        name: 'password',
                        placeholder: 'passphrase',
                        type: passwordVisibility ? 'text' : 'password',
                        onClick: () => setPasswordVisibility((prevState) => !prevState),
                        icon: passwordVisibility ? (
                            <InVisibilityIcon color={theme.color} />
                        ) : (
                            <VisibilityIcon color={theme.color} />
                        ),
                        onChange: updateInputValue,
                        value: authParams.password,
                        rule: {
                            is_satisfied: isValidPass(passwordRegex, authParams.password),
                            message:
                                'Passphrase must be minimum 8 chars long. Contain alphanumeric chars and atleast one symbol',
                            satisfied_message:
                                'Passphrase must be minimum 8 chars long. Contain alphanumeric chars and atleast one symbol',
                        },
                    }}
                />
                <span className='mx-4'></span>
                <InputGroup
                    options={{
                        name: 'confirm_password',
                        placeholder: 're-enter passphrase',
                        type: passwordVisibility ? 'text' : 'password',
                        onClick: () => setPasswordVisibility((prevState) => !prevState),
                        icon: passwordVisibility ? (
                            <InVisibilityIcon color={theme.color} />
                        ) : (
                            <VisibilityIcon color={theme.color} />
                        ),
                        onChange: updateInputValue,
                        value: authParams.confirm_password,
                        rule: {
                            is_satisfied: matchPass(
                                authParams.password,
                                authParams.confirm_password
                            ),
                            message: 'Passwords should match',
                            satisfied_message: 'Passwords match',
                        },
                        read_only: !authParams.password.length,
                    }}
                />
            </div>
            <button
                disabled={!validateSignUpForm()}
                type='submit'
                style={{
                    cursor: !validateSignUpForm() && 'not-allowed',
                }}
                className={`${
                    !validateSignUpForm() && 'opac-6'
                } capitalize font-bold p-4 rounded-md bg-primary w-full h-auto mt-4 cursor-pointer`}>
                Sign in
            </button>
            <span
                onClick={() => setAuthState('signin')}
                className='w-full inline-block mt-2 text-align-center text-xs cursor-pointer'>
                Already have an account? SignIn
            </span>
        </form>
    );
};
