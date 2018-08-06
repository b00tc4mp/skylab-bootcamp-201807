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
    }
};
(function(){
    var password="123";
    var secret;

    function keep(pass, secr){
        if (pass===password){
            secret=secr;
        }

    }
    function retrieve(pass){
        if (pass!==password){
            throw new Error ('wrong password');
        }else{
            return secret;
        }
        
    }
    function updatePassword(pass, newpass){
        if (password===pass){
            if (typeof newpass==="string" && newpass.length>0){
                password=newpass;
            }else{
                throw new Error ('wrong new password');  
            } 
        }else{
            throw new Error ('wrong password');
        }
       
    }
    function _keep (pass,secr){
        keep(pass,secr);
    }

     function _retrieve(pass){
        return retrieve(pass);
     }

    function _updatePassword(pass,newpass){
        updatePassword(pass,newpass);
    }


    safeBox.keep = _keep;
    safeBox.retrieve = _retrieve;
    safeBox.updatePassword = _updatePassword;

})();
