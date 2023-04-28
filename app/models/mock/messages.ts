import {MessageType} from '../message/message';

import {user1, user2} from './users';

export const messageList: MessageType.DerivedAny[] = [
    {
        type: 'text',
        author: user1,
        id: 1,
        text: 'Hello 1',
        status: 'seen',
        showStatus: true,
        nextMessageInGroup: false,
        offset: 0,
        showName: false,
    },
    {
        type: 'image',
        author: user2,
        id: 2,
        name: '',
        size: 0,
        uri: 'https://wallpaperaccess.com/full/300077.jpg',
        showStatus: true,
        nextMessageInGroup: false,
        offset: 0,
        showName: false,
    },
    {
        type: 'text',
        author: user1,
        id: 3,
        text: 'Hello 3',
        showStatus: false,
        nextMessageInGroup: false,
        offset: 0,
        showName: false,
    },
    {
        type: 'text',
        author: user1,
        id: 4,
        text: 'Hello 4',
        showStatus: false,
        nextMessageInGroup: false,
        offset: 0,
        showName: false,
    },
    {
        type: 'text',
        author: user2,
        id: 5,
        text: 'Hello 5',
        showStatus: false,
        nextMessageInGroup: false,
        offset: 0,
        showName: false,
    },
];
