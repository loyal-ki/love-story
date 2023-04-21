export type AsyncActionListener<T> = {
    onStart?: () => void;
    onComplete?: (data?: T) => void;
    onError?: (error: unknown) => void;
};
