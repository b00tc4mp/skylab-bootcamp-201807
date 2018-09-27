var safeBox;

(function () {
    var _password = '123';
    var _secret;

    function checkPassword(password) {
        if (password !== _password) throw Error('wrong password');
    }

    safeBox = {
        /**
         * Keeps the secret safe
         * 
         * @param {string} password The access password
         * @param {*} secret The secret to keep safe
         * 
         * @throws {Error} If password is wrong
         */
        keep: function (password, secret) {
            checkPassword(password);

            _secret = secret;
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
        retrieve: function (password) {
            checkPassword(password);

            return _secret;
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
            checkPassword(password);

            if (typeof newPassword !== 'string' || !newPassword.length) throw Error('wrong new password');

            _password = newPassword;
        }
    };
})();