var safeBox;

(function() {
    var myPassword = '123',
        mySecret = 'mySecret';

    safeBox = {
        /**
         * Keeps the secret safe
         * 
         * @param {string} password The access password
         * @param {string} secret The secret to keep safe
         * 
         * @throws {Error} If password is wrong
         */
        keep: function(password, secret) {
            myPassword = password;
            mySecret = secret;
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
            if (password === myPassword) {
                return mySecret;
            } else {
                throw new Error('wrong password');
            }
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
            if (password === myPassword) {
                if (!newPassword || typeof newPassword !== 'string') {
                    throw new Error('wrong new password');
                }
                myPassword = newPassword;
            } else {
                throw new Error('wrong password');
            }
        }
    };
})()

