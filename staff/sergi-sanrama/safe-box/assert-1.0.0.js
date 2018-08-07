/**
 * 
 * @param {string} message The description of the assertion
 * @param {boolean} condition The value to checked during assertion
 */

function assert(message, result){
    if (result) console.log(message, result);
    else console.warn(message, result);
}