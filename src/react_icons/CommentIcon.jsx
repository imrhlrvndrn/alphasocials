export const CommentIcon = ({ color = 'currentColor', size = 24 }) => {
    return (
        <svg
            stroke={color}
            fill={color}
            strokeWidth='0'
            viewBox='0 0 24 24'
            height={size}
            width={size}
            xmlns='http://www.w3.org/2000/svg'>
            <path d='M20,2H4C2.897,2,2,2.897,2,4v18l5.333-4H20c1.103,0,2-0.897,2-2V4C22,2.897,21.103,2,20,2z M20,16H6.667L4,18V4h16V16z'></path>
        </svg>
    );
};
