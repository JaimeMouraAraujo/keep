module.exports = () => {
    const helper = {};

    helper.isEmpty = obj => {
        return obj
            && Object.keys(obj).length === 0
            && Object.getPrototypeOf(obj) === Object.prototype;
    }

    return helper;
}

