var safeBox = {
    /**
     * Keeps the secret safe
     * 
     * @param {string} password The access password
     * @param {string} secret The secret to keep safe
     * 
     * @throws {Error} If password is wrong
     */
    keep: function (password, secret) {
      
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
    retrieve: function (password) {
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
    updatePassword: function (password, newPassword) {
        // TODO
    }
};



(function(){
    var masterPassword = '123';
    var masterSecret = '';
    function keep(password,secret){
            if(masterPassword === password){
                masterSecret = secret;
            }
            else throw new Error ("wrong password");
    }

    function retrieve (password){
        if(masterPassword === password){
            return masterSecret;
        }
        else throw new Error ("wrong password");
    }

    function update(password,newPassword){
        if (masterPassword === password) {
            if (!newPassword || typeof newPassword !== 'string' ) {
                throw new Error('wrong new password');
            } 
            masterPassword = newPassword;
            
        } else {
            throw new Error('wrong password');
        }
    } 

// //typeof password === "undefined"

//     function _keep (password,secret){
//         keep(password,secret);
//     }

//      function _get(password){
//         return get(password);
//      }

//     function _update(password,newPassword){
//         update(password,newPassword);
//     }


        safeBox.keep = keep;
        safeBox.retrieve = retrieve;
        safeBox.updatePassword = update;
 })();