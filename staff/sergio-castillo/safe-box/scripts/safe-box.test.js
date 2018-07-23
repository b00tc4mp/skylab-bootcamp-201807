// keep and retrieve succeed on correct password

(function () {
    safeBox.keep('123', 'my secret');
    
    console.log(safeBox.secret === undefined); // true
    console.log(safeBox.password === undefined); // true

    var secret = safeBox.retrieve('123');

    console.log(secret === 'my secret'); // true
})();

// retrieve fails on wrong password

(function () {
    var message;

    try {
        safeBox.retrieve('456');
    } catch (error) {
        message = error.message;
    }

    console.log(message === 'wrong password');
})();

// retrieve fails on wrong password

(function () {
    var message;

    try {
        safeBox.retrieve();
    } catch (error) {
        message = error.message;
    }

    console.log(message === 'wrong password');
})();

// retrieve fails on wrong password

(function () {
    var message;

    try {
        safeBox.retrieve('');
    } catch (error) {
        message = error.message;
    }

    console.log(message === 'wrong password');
})();

// retrieve fails on wrong password

(function () {
    var message;

    try {
        safeBox.retrieve(123);
    } catch (error) {
        message = error.message;
    }

    console.log(message === 'wrong password');
})();

// retrieve fails on wrong password

(function () {
    var message;

    try {
        safeBox.retrieve(true);
    } catch (error) {
        message = error.message;
    }

    console.log(message === 'wrong password');
})();

// update succeeds on correct password

(function () {
    safeBox.updatePassword('123', '456');

    var secret = safeBox.retrieve('456');

    console.log(secret === 'my secret');
})();

// update fails on wrong password

(function () {
    var message;

    try {
        safeBox.updatePassword('789', '456');
    } catch (error) {
        message = error.message;
    }

    console.log(message === 'wrong password');
})();

// update fails on wrong password

(function () {
    var message;

    try {
        safeBox.updatePassword('', '456');
    } catch (error) {
        message = error.message;
    }

    console.log(message === 'wrong password');
})();

// update fails on wrong password

(function () {
    var message;

    try {
        safeBox.updatePassword(undefined, '456');
    } catch (error) {
        message = error.message;
    }

    console.log(message === 'wrong password');
})();

// update fails on wrong password

(function () {
    var message;

    try {
        safeBox.updatePassword(789, '456');
    } catch (error) {
        message = error.message;
    }

    console.log(message === 'wrong password');
})();

// update fails on wrong password

(function () {
    var message;

    try {
        safeBox.updatePassword(true, '456');
    } catch (error) {
        message = error.message;
    }

    console.log(message === 'wrong password');
})();

// update fails on wrong new password

(function () {
    var message;

    try {
        safeBox.updatePassword('456', '');
    } catch (error) {
        message = error.message;
    }

    console.log(message === 'wrong new password');
})();

// update fails on wrong new password

(function () {
    var message;

    try {
        safeBox.updatePassword('456');
    } catch (error) {
        message = error.message;
    }

    console.log(message === 'wrong new password');
})();

// update fails on wrong new password

(function () {
    var message;

    try {
        safeBox.updatePassword('456', true);
    } catch (error) {
        message = error.message;
    }

    console.log(message === 'wrong new password');
})();

// update fails on wrong new password

(function () {
    var message;

    try {
        safeBox.updatePassword('456', 123);
    } catch (error) {
        message = error.message;
    }

    console.log(message === 'wrong new password');
})();
