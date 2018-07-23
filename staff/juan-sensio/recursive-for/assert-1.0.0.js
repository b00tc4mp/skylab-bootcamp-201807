/**
 * Assert condition (is true)
 * @param {string} message Description of the assert
 * @param {boolean} condition Condition checked
 * @author staff
 * @version 1.0.0
 */
function assert(message, condition) {
    if (condition) console.log(message, condition);
    else console.warn(message, condition);
}