var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Creates an object containing user data
 * 
 * @param {string} name The name of the user
 * @param {string} surname The surname of the user
 * @param {number} age The age of the user
 * @param {string} id The id of the user
 * @param {string} email The email of user
 * 
 * @returns {Object} The user data
 * 
 * @throws {Error} If one or more of the fields is not a valid string
 */
function createUser(name, surname, age, id, email) {
    var errors = [];

    if (typeof name !== 'string' || !name.length) errors.push(name + ' is not a valid name');
    if (typeof surname !== 'string' || !surname.length) errors.push(surname + ' is not a valid surname');
    // if (typeof age !== 'number' || isNaN(age) ||  age - parseInt(age)) errors.push(age + ' is not a valid age');
    if (!Number.isInteger(age) || age < 0) errors.push(age + ' is not a valid age');
    if (typeof id !== 'string' || !id.length) errors.push(id + ' is not a valid id');
    if (!EMAIL_REGEXP.test(email.toLowerCase())) errors.push(email + ' is not a valid email');

    if (errors.length) throw Error(errors.join(', '))

    return {
        name: name,
        surname: surname,
        age: age,
        id: id,
        email: email
    };
}

// valid data

(function () {
    var user = createUser('John', 'Doe', 34, '123456789G', 'jd@mail.com');

    console.log(user.name === 'John' && user.surname === 'Doe' && user.age === 34 && user.id === '123456789G' && user.email === 'jd@mail.com');
})();

// invalid name

(function () {
    var message;

    try  {
        createUser('', 'Doe', 34, '123456789G', 'jd@mail.com');
    } catch(error) {
        message = error.message
    } 

    console.log(message === ' is not a valid name');
})();

// invalid name and email

(function () {
    var message;

    try  {
        createUser('', 'Doe', 34, '123456789G', 'jd@mail.com_');
    } catch(error) {
        message = error.message
    } 

    console.log(message === ' is not a valid name, jd@mail.com_ is not a valid email');
})();