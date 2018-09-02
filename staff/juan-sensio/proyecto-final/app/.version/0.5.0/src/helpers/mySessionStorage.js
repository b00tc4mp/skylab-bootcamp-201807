const sessionStorage = {
    _data: {},

    setItem(key, value) {
        this._data[key] = value
    },

    getItem(key) {
        return this._data[key]
    },

    clear() {
        this._data = {}
    }
}


if (typeof module !== 'undefined')
    module.exports = sessionStorage;
