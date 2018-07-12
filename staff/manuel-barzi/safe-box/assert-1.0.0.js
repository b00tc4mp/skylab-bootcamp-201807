/**
 * Asserts a condition (is true)
 * 
 * @param {string} message The description of the assertion
 * @param {boolean} condition The condition to checked during assertion
 */
function assert(message, condition) {
    if (condition) console.log(message, condition);
    else console.warn(message, condition);
}