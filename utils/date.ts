export function minutesToHHMMSS(minutes: number) {
    return new Date(minutes * 60 * 1000).toISOString().substring(11, 19);
}
