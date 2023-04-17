export type IDefaultMessageType = {msg: {_class: string}; user: string; msgType: string};

export enum AppErrorCode {
    BackendSendProxyResponseUndefined = 1000,
    BackendMessageStatusFalse = 1001,
    BackendProxyResponseUndefined = 1002,
    BackendUploadImageCdnUrlEmpty = 1003,
    BackendLoadSecretDocumentsEmpty = 1004,
    BackendRespondsNilData = 1005,
    BackendRespondsEmptyData = 1006,
    BackendSendMessageResponseUndefined = 10007,
    BackendResponseMsgUndefined = 1008,
}
