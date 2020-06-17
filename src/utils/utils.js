export const getMonth = date => {
    const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthList[date.getMonth()];
};

export const getDay = date => {
    const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return dayList[date.getDay()];
};

export const importAll = req => {
    let icons = {};
    req.keys().map((item, index) => {
        return icons[item.replace('./', '')] = req(item);
    });
    return icons;
};