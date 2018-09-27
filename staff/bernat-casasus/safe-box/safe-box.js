var safeBox = {};

(function (){
//Variables declaration and initialization.
    var savedPassword="123";
    var savedSecret="my secret";
    var WARING_WRONG_PASS = 'wrong password';
    var WARING_WRONG_NEW_PASS = 'wrong new password';
    /**
     * Checks if there are ilegal words.
     * 
     * @param {string} word The word we want to check
     * @returns {boolean} True if every thing is lega and False if isn't.
     */
//controlWords
    function controlWords(word){
        return (typeof word !== 'string' || !word.length) ? true : false;
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
        if(controlWords(password)) throw new Error(WARING_WRONG_PASS);
        if(password !== savedPassword) throw new Error(WARING_WRONG_PASS);
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

        if(controlWords(password)) throw new Error(WARING_WRONG_PASS);
        if(password !== savedPassword) throw new Error(WARING_WRONG_PASS);
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
        if(controlWords(password )) throw new Error(WARING_WRONG_PASS);
        if(controlWords(newPassword)) throw new Error(WARING_WRONG_NEW_PASS);
        if(password !== savedPassword) throw new Error(WARING_WRONG_PASS);
        if(password === savedPassword) savedPassword = newPassword;
    }
//Link to object properties.
    safeBox.keep = keep;
    safeBox.retrieve = retrieve;
    safeBox.updatePassword = updatePassword;
})();