/**
 * [千位分隔符]
 * @param  {[type]} num [number]
 * @return {[type]}     [number]
 */
const milliFormat = (num) => {
    return num && num.toString()
        .replace(/(^|\s)\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * [随机数]
 * @return {[type]}     [number]
 */
const random = () => {
    return Math.floor(Math.random() * 1000000);
}

export default {
    milliFormat,
    random
}
