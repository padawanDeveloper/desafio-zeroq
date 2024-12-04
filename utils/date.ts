export function minutesToHHMMSS(minutes: number) {
    let date = new Date(0);
    date.setMinutes(minutes);

    const hours = date.getUTCHours();
    const mins = date.getUTCMinutes();
    const secs = date.getUTCSeconds();

    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
        mins
    ).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

    return formattedTime;
}
