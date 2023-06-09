import {UserModel} from '@models/users';

export namespace MessageType {
    export type Any = Custom | File | Image | Text | Unsupported;

    export type DerivedMessage =
        | DerivedCustom
        | DerivedFile
        | DerivedImage
        | DerivedText
        | DerivedUnsupported;
    export type DerivedAny = DateHeader | DerivedMessage;

    export type PartialAny = PartialCustom | PartialFile | PartialImage | PartialText;

    interface Base {
        author: UserModel;
        createdAt?: number;
        id: number;
        metadata?: Record<string, any>;
        roomId?: string;
        status?: 'delivered' | 'error' | 'seen' | 'sending' | 'sent';
        type: 'custom' | 'file' | 'image' | 'text' | 'unsupported';
        updatedAt?: number;
    }

    export interface DerivedMessageProps extends Base {
        nextMessageInGroup: boolean;
        offset: number;
        showName: boolean;
        showStatus: boolean;
    }

    export interface DerivedCustom extends DerivedMessageProps, Custom {
        type: Custom['type'];
    }

    export interface DerivedFile extends DerivedMessageProps, File {
        type: File['type'];
    }

    export interface DerivedImage extends DerivedMessageProps, Image {
        type: Image['type'];
    }

    export interface DerivedText extends DerivedMessageProps, Text {
        type: Text['type'];
    }

    export interface DerivedUnsupported extends DerivedMessageProps, Unsupported {
        type: Unsupported['type'];
    }

    export interface PartialCustom extends Base {
        metadata?: Record<string, any>;
        type: 'custom';
    }

    export interface Custom extends Base, PartialCustom {
        type: 'custom';
    }

    export interface PartialFile {
        metadata?: Record<string, any>;
        mimeType?: string;
        name: string;
        size: number;
        type: 'file';
        uri: string;
    }

    export interface File extends Base, PartialFile {
        type: 'file';
    }

    export interface PartialImage {
        height?: number;
        metadata?: Record<string, any>;
        name: string;
        size: number;
        type: 'image';
        uri: string;
        width?: number;
    }

    export interface Image extends Base, PartialImage {
        type: 'image';
    }

    export interface PartialText {
        metadata?: Record<string, any>;
        previewData?: PreviewData;
        text: string;
        type: 'text';
    }

    export interface Text extends Base, PartialText {
        type: 'text';
    }

    export interface Unsupported extends Base {
        type: 'unsupported';
    }

    export interface DateHeader {
        id: string;
        text: string;
        type: 'dateHeader';
    }
}
