<<<<<<< HEAD

//     /**
//      * Keeps the secret safe
//      * 
//      * @param {string} password The access password
//      * @param {string} secret The secret to keep safe
//      * 
//      * @throws {Error} If password is wrong
//      */
//     keep: function(password, secret) {
//         // TODO
        
//     }



//     /**
//      * Retrieves the secret
//      * 
//      * @param {string} password The access password
//      * 
//      * @returns {string} The secret
//      * 
//      * @throws {Error} If wrong password
//      */
//     retrieve: function(password) {
//         // TODO
        
//     },
    

//     /**
//      * Updates the access password
//      * 
//      * @param {string} password The current password
//      * @param {string} newPassword The new password
//      * 
//      * @throws {Error} If current and/or new password are wrong
//      */
//     updatePassword:function(password, newPassword) {
//         // TODO
//         if (password === true) {
//             password === pasword;
//         }
//     }
// };


var safeBox = {};

(function(){
    var password = '123';
    var secret = '';
    

        function keep(password, secret) {
            var myPassword = password;
            var mySecret = secret;
    }
    safeBox.keep = keep;


        function retrieve(password) {
        if (myPassword === password){
            return mySecret;
        } else {
            
            throw new Error('wrong password');
        }
    }
    safeBox.retrieve = retrieve;


        function updatePassword(password, newPassword) {
        if (password === myPassword) {
            myPassword = newPassword;
        }
    }
    safeBox.updatePassword = updatePassword;

})();
=======
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
    updatePassword(password, newPassword) {
        // TODO
    }
};
>>>>>>> feature/strings
