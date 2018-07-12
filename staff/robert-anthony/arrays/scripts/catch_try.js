function add(expectedNumber1, expectedNumber2) {
  try {
    if (typeof expectedNumber1 !== "number") {
      throw new Error("1 not a number");
    }
    if (typeof expectedNumber2 !== "number") {
      throw new Error("2 not a number");
    }
    return expectedNumber1 + expectedNumber2;
  }
  catch (e) {
    console.log("catch");
  } finally {
    console.log("finally");
  }
}

console.log(add(1, 2));

console.log(add("1", 2));

var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


/**
 *
 * @param name
 * @param surname
 * @param age
 * @param id
 * @param email
 * @returns {{name: *, surname: *, age: *, id: *, email: *}}
 */
function createUser(name, surname, age, id, email) {
  var errors = [];
  if (typeof name !==  'string' || name.length === 0) errors.push(name + ' is not a valid name');
  if (typeof surname !==  'string' || name.length === 0) errors.push(surname + ' is not a valid surname');
  if (!Number.isInteger(age) || age < 0) errors.push(age + ' is not a valid age');
  if (!Number.isInteger(id) || id < 0) errors.push(id + ' is not a valid id');
  if (!EMAIL_REGEX.test(email)) errors.push(email + ' is not a valid email');

  if (errors.length) throw Error(errors.join());

  return {
    name: name,
    surname: surname,
    age: age,
    id: id,
    email: email
  }
}

// valid data

var user = createUser('John',"Jones",23,42,"user@useit.com");

console.log(user);
