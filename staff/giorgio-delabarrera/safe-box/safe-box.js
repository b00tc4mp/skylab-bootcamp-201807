
var safeBox = (function() {

    var keys = {
        password: '',
        secret: ''
    };

    var isValidString = function(value) {
        return (typeof value === 'string' && value.length) ? true : false;
    }

    var WRONG_PASSWORD = 'wrong password';
    var WRONG_NEW_PASSWORD = 'wrong new password';

    return {
        /**
         * Keeps the secret safe
         * 
         * @param {string} password The access password
         * @param {string} secret The secret to keep safe
         * 
         * @throws {Error} If password is wrong
         */
        keep: function(password, secret) {

            if (isValidString(password) === false) throw new Error(WRONG_PASSWORD);
            if (isValidString(secret) === false) throw new Error(WRONG_PASSWORD);

            keys.password = password;
            keys.secret = secret;
        },

        /**
         * Retrieves the secret
         * 
         * @param {string} password The access password
         * 
         * @returns {string} The secret
         * 
         * @throws {Error} If wrong password
         */
        retrieve: function(password) {

            if (isValidString(password) === false) throw new Error(WRONG_PASSWORD);
            if (keys.password !== password) throw new Error(WRONG_PASSWORD);
            
            return keys.secret;
        },

        /**
         * Updates the access password
         * 
         * @param {string} password The current password
         * @param {string} newPassword The new password
         * 
         * @throws {Error} If current and/or new password are wrong
         */
        updatePassword(password, newPassword) {

            if (isValidString(password) === false) throw new Error(WRONG_PASSWORD);
            if (isValidString(newPassword) === false) throw new Error(WRONG_NEW_PASSWORD);
            if (keys.password !== password) throw new Error(WRONG_PASSWORD);
            
            keys.password = newPassword;
        },
    };

})();