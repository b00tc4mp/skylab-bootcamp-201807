var safeBox;

(function(){

    var myPassword = '123';
    //var mySecret = 'my secret';
    //var mySecret = '';
    /**
     * Keeps the secret safe
     * 
     * @param {string} password The access password
     * @param {string} secret The secret to keep safe
     * 
     * @throws {Error} If password is wrong
     */

    safeBox = {

        keep: function(password, secret) {
            myPassword = password;
            mySecret = secret;
            /* if(typeof myPassword !== 'string') {
                throw new Error(myPassword + ' is not the correct answer');
            } else {
                mySecret = secret;
            } */

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
            if (myPassword === password) {
                return mySecret;
            } else {
                throw new Error('wrong password');
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
            // TODO
            if (myPassword === password) {
                if (!newPassword || typeof newPassword !== 'string' ) {
                    throw new Error('wrong new password');
                } 
                myPassword = newPassword;
            } else {
                throw new Error('wrong password');
            }
        }
        /*updatePassword:function(password,newPassword){
            if(myPassword === password){
                myPassword = newPassword;
            }else{
                if(!newPassword || typeof newPassword != 'string') {
                    throw new error("wrong new password");
                }else{
                    throw new Error("wrong password");
                }
            }

    
    }*/
    };

})();
/*
var safeBox = {};

(function(){
    var masterPassword = '123';
    var masterSecret = '';
    function keep(password,secret){
            if(masterPassword === password){
                masterSecret = secret;
            }
            else throw new Error ("wrong password")
    }

    function get (password){
        if(masterPassword === password){
            return masterSecret;
        }
        else throw new Error ("wrong password")
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

//typeof password === "undefined"

    function _keep (password,secret){
        keep(password,secret);
    }

     function _get(password){
        return get(password);
     }

    function _update(password,newPassword){
        update(password,newPassword);
    }


    safeBox.keep = _keep;
    safeBox.retrieve = _get;
    safeBox.updatePassword = _update;
})();*/