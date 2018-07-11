var safeBox = {
    /**
     * Keeps the secret safe
     * 
     * @param {string} password The access password
     * @param {string} secret The secret to keep safe
     * 
     * @throws {Error} If password is wrong
     */
    keep: function(password, secret) {
        // TODO
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
        // TODO
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
    }
};

(function (){

    var savedPassword="123";
    var savedSecret="my secret";

//Keep
    function keep(password,secret){
        if(password === savedPassword){
            savedSecret = secret;
        }
    }
//Retrieve
    function retrieve(password){

        if(typeof password === 'string' && !isNaN(password) && password.length > 0 ){
            return savedSecret;
        }else{
            throw new Error('wrong password');
        }

    }
//UpdatePassword
    function updatePassword(password,newPassword){
        if(password === savedPassword){
            savedPassword = newPassword;
        }
    }

    safeBox.keep = keep;
    safeBox.retrieve = retrieve;
    safeBox.updatePassword = updatePassword;
})();