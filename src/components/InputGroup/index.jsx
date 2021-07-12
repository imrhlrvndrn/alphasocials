import { useSelector } from 'react-redux';
import { selectTheme } from '../../features/theme/theme.slice';

export const InputGroup = ({ variant = 'input', options, className = 'mb-6 w-full' }) => {
    const {
        name = 'input',
        icon = null,
        type = 'text',
        onClick,
        onChange,
        value = '',
        label = true,
        required = true,
        rule = {
            message: '',
            satisfied_message: '',
            is_satisfied: false,
        },
        read_only = false,
        auto_complete = 'on',
        placeholder = `${name.split('_').join(' ')}`,
    } = options;
    const theme = useSelector(selectTheme);

    const renderVariant = (variant) => {
        return variant === 'textarea' ? (
            <textarea
                maxLength={undefined}
                style={{ color: theme.color, border: 'none' }}
                required={required}
                placeholder={placeholder}
                className={`${
                    read_only && 'cursor-not-allowed'
                } p-4 h-auto m-0 bg-transparent flex-grow w-full`}
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                readOnly={read_only}
                autoComplete={auto_complete}
            ></textarea>
        ) : variant === 'input' ? (
            <input
                style={{ color: theme.color }}
                required={required}
                placeholder={placeholder}
                className={`${
                    read_only && 'cursor-not-allowed'
                } p-4 h-auto m-0 bg-transparent flex-grow w-full`}
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                readOnly={read_only}
                autoComplete={auto_complete}
            />
        ) : (
            <p>Invalid variant</p>
        );
    };

    return (
        <div className={className}>
            {label && (
                <label htmlFor={name} className='text-xs capitalize'>
                    {name.split('_').join(' ')}
                </label>
            )}
            <div
                className={`flex items-center mt-2 rounded-md ${icon ? 'pr-4' : ''}`}
                style={{ backgroundColor: theme.dark_background, color: theme.color }}
            >
                {renderVariant(variant)}
                {icon && (
                    <button
                        type='button'
                        className='cursor-pointer flex items-center'
                        onClick={() => {
                            onClick();
                            console.log('InputGroup button is pressed');
                        }}
                    >
                        {icon}
                    </button>
                )}
            </div>
            {rule?.message && value.length > 0 && (
                <span style={{ color: rule?.is_satisfied ? 'green' : 'red' }} className='text-xs'>
                    {rule.is_satisfied ? rule.satisfied_message || rule.message : rule.message}
                </span>
            )}
        </div>
    );
};
