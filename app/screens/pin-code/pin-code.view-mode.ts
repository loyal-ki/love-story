import {useTheme} from '@app/context/theme';
import {useCountdown, useMemoizedCallback, useMount} from '@app/hooks';

const TIME_LOCK = 5 * 60;
const INTERVAL_MS = 1000;

export const useViewModel = () => {
    const [count, {startCountdown, stopCountdown, resetCountdown}] = useCountdown({
        countStart: TIME_LOCK,
        intervalMs: INTERVAL_MS,
    });

    const padLeftTimer = (string: string, pad: string | undefined, length: number) => {
        return (new Array(length + 1).join(pad) + string).slice(-length);
    };

    const minutes = Math.floor(count / 60);
    const seconds = count - minutes * 60;

    const resendTime = `${padLeftTimer(minutes.toString(), '0', 2)}:${padLeftTimer(
        seconds.toString(),
        '0',
        2
    )}`;

    const init = useMemoizedCallback(() => {
        startCountdown();
    }, [startCountdown]);

    const restartCountdown = useMemoizedCallback(() => {
        resetCountdown();
        startCountdown();
    }, [resetCountdown, startCountdown]);

    useMount(init);

    const {theme} = useTheme();

    return {
        resendTime,
        count,
        theme,
        restartCountdown,
    };
};
