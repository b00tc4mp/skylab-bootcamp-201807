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
//Variables declaration and initialization.
    var savedPassword="123";
    var savedSecret="my secret";

    function controlWords(word){
        if(typeof word !== 'string' || isNaN(word) || !word.length || word === undefined) return true;
        return false;
    }
//Keep
    function keep(password,secret){
        if(controlWords(password)) throw new Error('wrong password');
        if(password !== savedPassword) throw new Error('wrong password');
        if(password === savedPassword) savedSecret = secret;  
    }
//Retrieve
    function retrieve(password){

        if(controlWords(password)) throw new Error('wrong password');
        if(password !== savedPassword) throw new Error('wrong password');
        if(password === savedPassword) return savedSecret;
    }
//UpdatePassword
    function updatePassword(password,newPassword){
        if(controlWords(password )) throw new Error('wrong password');
        if(controlWords(newPassword)) throw new Error('wrong new password');
        if(password !== savedPassword) throw new Error('wrong password');
        if(password === savedPassword) savedPassword = newPassword;
    }
//Link to object properties.
    safeBox.keep = keep;
    safeBox.retrieve = retrieve;
    safeBox.updatePassword = updatePassword;
})();

