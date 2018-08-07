// secret is not a property

assert('secret is not a property', safeBox.secret === undefined); // true

// password is not a property

assert('password is not a property', safeBox.password === undefined); // true

// keep succeeds on correct password

(function () {
    var message;

    try {
        safeBox.keep('123', 'my secret');
    } catch (error) {
        message = error.message;
    }

    assert('keep succeeds on correct password', message === undefined);
})();

// keep fails on wrong password

(function () {
    var message;

    try {
        safeBox.keep('456', 'my secret');
    } catch (error) {
        message = error.message;
    }

    assert('keep fails on wrong password', message === 'wrong password');
})();

// keep fails on wrong password

(function () {
    var message;

    try {
        safeBox.keep('', 'my secret');
    } catch (error) {
        message = error.message;
    }

    assert('keep fails on wrong password', message === 'wrong password');
})();

// keep fails on wrong password

(function () {
    var message;

    try {
        safeBox.keep(undefined, 'my secret');
    } catch (error) {
        message = error.message;
    }

    assert('keep fails on wrong password', message === 'wrong password');
})();

// retrieve succeed on correct password

(function () {
    var secret = safeBox.retrieve('123');

    assert('retrieve succeed on correct password', secret === 'my secret');
})();

// retrieve fails on wrong password

(function () {
    var message;

    try {
        safeBox.retrieve('456');
    } catch (error) {
        message = error.message;
    }

    assert('retrieve fails on wrong password', message === 'wrong password');
})();

// retrieve fails on wrong password

(function () {
    var message;

    try {
        safeBox.retrieve();
    } catch (error) {
        message = error.message;
    }

    assert('retrieve fails on wrong password', message === 'wrong password');
})();

// retrieve fails on wrong password

(function () {
    var message;

    try {
        safeBox.retrieve('');
    } catch (error) {
        message = error.message;
    }

    assert('retrieve fails on wrong password', message === 'wrong password');
})();

// retrieve fails on wrong password

(function () {
    var message;

    try {
        safeBox.retrieve(123);
    } catch (error) {
        message = error.message;
    }

    assert('retrieve fails on wrong password', message === 'wrong password');
})();

// retrieve fails on wrong password

(function () {
    var message;

    try {
        safeBox.retrieve(true);
    } catch (error) {
        message = error.message;
    }

    assert('retrieve fails on wrong password', message === 'wrong password');
})();

// update succeeds on correct password

(function () {
    safeBox.updatePassword('123', '456');

    var secret = safeBox.retrieve('456');

    assert('update fails on wrong password', secret === 'my secret');
})();

// update fails on wrong password

(function () {
    var message;

    try {
        safeBox.updatePassword('789', '456');
    } catch (error) {
        message = error.message;
    }

    assert('update fails on wrong password', message === 'wrong password');
})();

// update fails on wrong password

(function () {
    var message;

    try {
        safeBox.updatePassword('', '456');
    } catch (error) {
        message = error.message;
    }

    assert('update fails on wrong password', message === 'wrong password');
})();

// update fails on wrong password

(function () {
    var message;

    try {
        safeBox.updatePassword(undefined, '456');
    } catch (error) {
        message = error.message;
    }

    assert('update fails on wrong password', message === 'wrong password');
})();

// update fails on wrong password

(function () {
    var message;

    try {
        safeBox.updatePassword(789, '456');
    } catch (error) {
        message = error.message;
    }

    assert('update fails on wrong password', message === 'wrong password');
})();

// update fails on wrong password

(function () {
    var message;

    try {
        safeBox.updatePassword(true, '456');
    } catch (error) {
        message = error.message;
    }

    assert('update fails on wrong password', message === 'wrong password');
})();

// update fails on wrong new password

(function () {
    var message;

    try {
        safeBox.updatePassword('456', '');
    } catch (error) {
        message = error.message;
    }

    assert('update fails on wrong new password', message === 'wrong new password');
})();

// update fails on wrong new password

(function () {
    var message;

    try {
        safeBox.updatePassword('456');
    } catch (error) {
        message = error.message;
    }

    assert('update fails on wrong new password', message === 'wrong new password');
})();

// update fails on wrong new password

(function () {
    var message;

    try {
        safeBox.updatePassword('456', true);
    } catch (error) {
        message = error.message;
    }

    assert('update fails on wrong new password', message === 'wrong new password');
})();

// update fails on wrong new password

(function () {
    var message;

    try {
        safeBox.updatePassword('456', 123);
    } catch (error) {
        message = error.message;
    }

    assert('update fails on wrong new password', message === 'wrong new password');
})();
