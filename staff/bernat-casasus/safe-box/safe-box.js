var safeBox = {
    keep: function(password, secret) {
        // TODO
    },
    retrieve: function(password) {
        // TODO
    },
    updatePassword: function(password, newPassword) {
        // TODO
    }
};

(function (){
//Variables declaration and initialization.
    var savedPassword="123";
    var savedSecret="my secret";
    /**
     * Checks if there are ilegal words.
     * 
     * @param {string} word The word we want to check
     * @returns {boolean} True if every thing is lega and False if isn't.
     */
//controlWords
    function controlWords(word){
        return (typeof word !== 'string' || isNaN(word) || !word.length || word === undefined) ? true : false;
    }
    /**
     * Keeps the secret safe
     * 
     * @param {string} password The access password
     * @param {string} secret The secret to keep safe
     * 
     * @throws {Error} If password is wrong
     */
//Keep
    function keep(password,secret){
        if(controlWords(password)) throw new Error('wrong password');
        if(password !== savedPassword) throw new Error('wrong password');
        if(password === savedPassword) savedSecret = secret;  
    }
    /**
     * Retrieves the secret
     * 
     * @param {string} password The access password
     * 
     * @returns {string} The secret
     * 
     * @throws {Error} If wrong password
     */
//Retrieve
    function retrieve(password){

        if(controlWords(password)) throw new Error('wrong password');
        if(password !== savedPassword) throw new Error('wrong password');
        if(password === savedPassword) return savedSecret;
    }
    /**
     * Updates the access password
     * 
     * @param {string} password The current password
     * @param {string} newPassword The new password
     * 
     * @throws {Error} If current and/or new password are wrong
     */
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