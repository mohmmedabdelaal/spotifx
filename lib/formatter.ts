import formatDuration from "format-duration";

export const formatTime = (timeInSeconds = 0) => {
    return formatDuration(timeInSeconds * 1000);
};

export const formatDate = (date) => {
    let d = date;
    d = new Date()
    return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};
