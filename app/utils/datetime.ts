export function isSameYear(a: Date, b: Date = new Date()): boolean {
    return a.getFullYear() === b.getFullYear();
}

export function isSameMonth(a: Date, b: Date = new Date()): boolean {
    return a.getMonth() === b.getMonth() && isSameYear(a, b);
}

export function isSameDate(a: Date, b: Date = new Date()): boolean {
    return a.getDate() === b.getDate() && isSameMonth(a, b) && isSameYear(a, b);
}

export function isToday(date: Date) {
    const now = new Date();

    return isSameDate(date, now);
}

export function isYesterday(date: Date): boolean {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    return isSameDate(date, yesterday);
}

export function toMilliseconds({
    days,
    hours,
    minutes,
    seconds,
}: {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
}) {
    const totalHours = (days || 0) * 24 + (hours || 0);
    const totalMinutes = totalHours * 60 + (minutes || 0);
    const totalSeconds = totalMinutes * 60 + (seconds || 0);
    return totalSeconds * 1000;
}
