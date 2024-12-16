const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const formatDate = (dateInput=Date.now()) => {
    const date = new Date(dateInput);

    const month = date.getMonth();
    let day = date.getDate();
    day = day<10 ? '0'+day : day;
    const year = date.getFullYear();

    return `${day} ${months[month]}, ${year}`;
}

export const formatTime = (timeInput=Date.now()) => {
    const time = new Date(timeInput);
    let hour = time.getHours();

    const ampm = hour > 11 ? 'pm' : 'am';

    hour = hour > 12 ? hour - 12 : hour;
    hour = hour < 10 ? '0'+hour : hour;

    let minute = time.getMinutes();
    minute = minute < 10 ? '0'+minute : minute;

    return `${hour}:${minute} ${ampm}`;
}

export default formatDate;