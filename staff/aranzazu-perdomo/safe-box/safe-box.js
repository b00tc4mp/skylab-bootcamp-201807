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
        
        return function(){

        }


        
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


(function(){
    var masterpassword="123";
    var mastersecret="";
    function keep(password,secret){
        
        if(masterpassword === password){
              mastersecret= secret;
         }else throw new Error ("wrong password");
      
        }
    safeBox.keep=keep;

    function retrieve (password){
            if(masterpassword=== password){
                retunr mastersecret;
            }else (!mastersecret=== password){
                if(typeof password === "string" || password.length ) throw new Error ("wrong password");
            }

    }

   
})();

//version alejandro 

var safeBox = {


};

(function(){
    var masterPassword = '123';
    var masterSecret = '';

    //con la keep buscamos la secret
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
})()

//version maider

var safeBox;

(function(){    

    /* declare vars */
    var myPassword = '123';
    var mySecret = 'my secret';

    safeBox = {
    
    /**
         * Keeps the secret safe
         * 
         * @param {string} password The access password
         * @param {string} secret The secret to keep safe
         * 
         * @throws {Error} If password is wrong
         */
        keep: function(password, secret) {
            /* checks if password and myPassport are the same and rewrite mySecret, otherwise, it throw an error */
            if(myPassword === password){
                mySecret = secret;
            } else {
                throw new Error ("wrong password");
            }
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
            /* checks if password and myPassport are the same and return mySecret, otherwise, it throw an error */
            if(myPassword === password){
                return mySecret;
            } else {
                throw new Error ("wrong password");
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
            /* checks if password and myPassword are the same. If newPassword is empty or is not an string, throws an error, if not rewrite myPassword to newPassword. If password and myPassword are not the same, throw an error */
            if (password === myPassword) {
                if (newPassword === '' || typeof newPassword !== 'string' ) {
                    throw new Error('wrong new password');
                } 
                myPassword = newPassword;
                
            } else {
                throw new Error('wrong password');
            }
        }
    };
})();
