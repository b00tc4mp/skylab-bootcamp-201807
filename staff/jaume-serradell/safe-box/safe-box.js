var safeBox;

(function(){    

    /* declare vars */
    var myPassword = '123';
    var mySecret = 'my secret';

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
            /* checks if password and myPassport are the same and rewrite mySecret, otherwise, it throw an error */
            if(myPassword === password){
                mySecret = secret;
            } else {
                throw new Error ("wrong password");
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
            /* checks if password and myPassport are the same and return mySecret, otherwise, it throw an error */
            if(myPassword === password){
                return mySecret;
            } else {
                throw new Error ("wrong password");
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
            /* checks if password and myPassword are the same. If newPassword is empty or is not an string, throws an error, if not rewrite myPassword to newPassword. If password and myPassword are not the same, throw an error */
            if (password === myPassword) {
                if (newPassword === '' || typeof newPassword !== 'string' ) {
                    throw new Error('wrong new password');
                } 
                myPassword = newPassword;
                
            } else {
                throw new Error('wrong password');
            }
        }
    };
})();