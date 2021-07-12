export const LikeIcon = ({ color = 'currentColor', size = 24, liked = false }) => {
    return (
        <svg
            stroke={color}
            fill={color}
            strokeWidth={liked ? 0 : 4}
            version='1'
            viewBox='0 0 48 48'
            enableBackground='new 0 0 48 48'
            height={size}
            width={size}
            xmlns='http://www.w3.org/2000/svg'>
            <path
                fill={liked ? '#F44336' : 'none'}
                d='M34,9c-4.2,0-7.9,2.1-10,5.4C21.9,11.1,18.2,9,14,9C7.4,9,2,14.4,2,21c0,11.9,22,24,22,24s22-12,22-24 C46,14.4,40.6,9,34,9z'></path>
        </svg>
    );
};
