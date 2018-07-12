var safeBox = {
    
        /**
     * Keeps the secret safe
     * 
     * @param {string} password The access password
     * @param {string} secret The secret to keep safe
     * 
     * @throws {Error} If password is wrong
     */

    keep: function keep (password, secret) {
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
    updatePassword(password, newPassword) {
        // TODO
    }
};



(function (){
    var masterpassword="123";
    var mysecret="my secret";


    function keep(password, secret){
        if (typeof(password)!== 'string') {throw Error('wrong password')}
        mysecret=secret;
        masterpassword=password;
    }
   
    function retrieve(password){
        if (masterpassword === password) { 
            return mysecret;
        }else {
            throw new Error('wrong password');
        }
    }
    
    function updatePassword(password, newpassword){
        if (typeof(newpassword)!=='string' || !newpassword.length){ throw Error('wrong new password')}
        if (masterpassword!== password){ throw Error('wrong password')}
        if (masterpassword===password){
            masterpassword= newpassword;    
        } 
    }


    safeBox.keep=keep;
    safeBox.retrieve = retrieve;
    safeBox.updatePassword= updatePassword;

}());