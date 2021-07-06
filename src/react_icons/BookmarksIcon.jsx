export const BookmarksIcon = ({ color = 'currentColor', size = 24 }) => {
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
                d='M7 13l5 3V4a2 2 0 00-2-2H4a2 2 0 00-2 2v12l5-3zm-4 1.234l4-2.4 4 2.4V4a1 1 0 00-1-1H4a1 1 0 00-1 1v10.234z'
                clipRule='evenodd'></path>
            <path d='M14 14l-1-.6V2a1 1 0 00-1-1H4.268A2 2 0 016 0h6a2 2 0 012 2v12z'></path>
        </svg>
    );
};
