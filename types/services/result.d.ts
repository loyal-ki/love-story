type IResultSealed<T> = {
    data?: T;
    error?: Error;
    message?: string;
};
