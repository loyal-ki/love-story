export function isValidUrl(url = '') {
    const regex = /^https?:\/\//i;
    return regex.test(url);
}
