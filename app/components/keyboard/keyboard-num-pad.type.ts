import React from 'react';

import {BackspaceKeyContent, EmptyKeyContent} from './key-content';

export enum KeyNumPadTypes {
    Digit = 'Digit',
    Backspace = 'Backspace',
    Empty = 'Empty',
}

export interface IKeyNumPad {
    key: string;
    render: Element | React.ReactNode | React.ReactNode[];
    type: KeyNumPadTypes;
    value?: number | undefined | null;
}

export const EmptyKey: IKeyNumPad = {
    key: KeyNumPadTypes.Empty,
    type: KeyNumPadTypes.Empty,
    render: EmptyKeyContent,
};

export const BackspaceKey: IKeyNumPad = {
    key: KeyNumPadTypes.Backspace,
    type: KeyNumPadTypes.Backspace,
    render: BackspaceKeyContent,
};
