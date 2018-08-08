var safeBox = {


};

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
})()




