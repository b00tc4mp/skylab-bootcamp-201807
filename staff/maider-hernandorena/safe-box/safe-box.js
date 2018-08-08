var safeBox;

(function(){

    var myPassword = '123';
    var mySecret;
    /**
     * Keeps the secret safe
     * 
     * @param {string} password The access password
     * @param {string} secret The secret to keep safe
     * 
     * @throws {Error} If password is wrong
     */

    safeBox = {

        keep: function(password, secret) {
           
            if (password !== myPassword || typeof myPassword !== 'string') {
                throw new Error('wrong password');
            } else {
                mySecret = secret;
            }

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
            if (myPassword === password) {
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
        updatePassword: function(password, newPassword) {
            // TODO
            if (myPassword === password) {
                if (typeof newPassword !== 'string' || !newPassword.length ) {
                    throw new Error('wrong new password');
                } 
                myPassword = newPassword;
                
            } else {
                throw new Error('wrong password');
            }
        }
    };

})();