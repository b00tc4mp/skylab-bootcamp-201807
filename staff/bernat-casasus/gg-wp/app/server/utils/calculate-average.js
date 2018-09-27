'use strict'

module.exports = values => {
    let totalSum = 0

    for (let i = 0; i < values.length; i++) {
        totalSum += parseInt(values[i], 10)
    }

    return parseInt((totalSum / values.length).toFixed(0),10)
}