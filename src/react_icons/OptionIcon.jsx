export const OptionIcon = ({ color = 'currentColor', size = 24 }) => {
    return (
        <svg
            stroke={color}
            fill={color}
            strokeWidth='0'
            viewBox='0 0 16 16'
            height={size}
            width={size}
            xmlns='http://www.w3.org/2000/svg'>
            <path
                fillRule='evenodd'
                d='M3 9.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z'
                clipRule='evenodd'></path>
        </svg>
    );
};
