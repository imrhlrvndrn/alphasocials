export const BookmarkIcon = ({ color = 'currentColor', size = 24, bookmarked = false }) => {
    return (
        <svg
            stroke={color}
            fill={bookmarked ? color : 'none'}
            strokeWidth={bookmarked ? 0 : 1.2}
            viewBox='0 0 16 16'
            height={size}
            width={size}
            xmlns='http://www.w3.org/2000/svg'>
            <path
                fillRule='evenodd'
                d='M3 3a2 2 0 012-2h6a2 2 0 012 2v12l-5-3-5 3V3z'
                clipRule='evenodd'></path>
        </svg>
    );
};
