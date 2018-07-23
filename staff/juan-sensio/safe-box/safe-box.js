var safeBox;

(function(){
    var mySecret;
    var myPassword;

    safeBox = {

        /**
         * Keep the secret safe
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
         * Updates the password
         * 
         * @param {string} password The password
         * @param {string} newPassword The new password
         * 
         * @throws {Error} If password is wrong
         * @throws {Error} If new password is wrong
         */
        updatePassword: function(password, newPassword) {
            checkPassword(password,'wrong password');
            checkPassword(newPassword,'wrong new password');
            if(password !== myPassword) 
                throw new Error('wrong password');
            if(password === myPassword)
                myPassword = newPassword;
        },
        /**
         * Retrieves the secret
         * 
         * @param {string} password The password
         * 
         * @throws {Error} If password is wrong
         */
        retrieve: function(password) {
            checkPassword(password,'wrong password');
            if(password !== myPassword) 
                throw new Error('wrong password');
            return mySecret;
        }
    };

})();

/**
 * Check if the password is a correct string
 * 
 * @param {string} password The password
 * 
 * @throws {Error} If password is wrong
 */
function checkPassword(password, msg) {
    if(typeof password !== 'string' || password === undefined || password === '') 
        throw new Error(msg);
}