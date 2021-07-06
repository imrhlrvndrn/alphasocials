// components
import { HomeIcon } from '../react_icons/HomeIcon';
import { LikeIcon } from '../react_icons/LikeIcon';
import { SearchIcon } from '../react_icons/SearchIcon';
import { FriendsIcon } from '../react_icons/FriendsIcon';
import { ProfileIcon } from '../react_icons/ProfileIcon';
import { CommentIcon } from '../react_icons/CommentIcon';
import { BookmarkIcon } from '../react_icons/BookmarkIcon';
import { BookmarksIcon } from '../react_icons/BookmarksIcon';

export const sidebarItems = [
    {
        _id: '1',
        name: 'Feed',
        Icon: HomeIcon,
        isActive: true,
        link: '/feed',
    },
    {
        _id: '2',
        name: 'Search',
        Icon: SearchIcon,
        isActive: false,
        link: '/search',
    },
    {
        _id: '3',
        name: 'Bookmarks',
        Icon: BookmarksIcon,
        isActive: false,
        link: '/bookmarks',
    },
    {
        _id: '4',
        name: 'Profile',
        Icon: ProfileIcon,
        isActive: false,
        link: '/profile',
    },
];

export const postStatistics = [
    {
        _id: '1',
        name: 'comments',
        Icon: CommentIcon,
    },
    {
        _id: '2',
        name: 'likes',
        Icon: LikeIcon,
    },
    {
        _id: '3',
        name: 'bookmarks',
        Icon: BookmarkIcon,
    },
];
