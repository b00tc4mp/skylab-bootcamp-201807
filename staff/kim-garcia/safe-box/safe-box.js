var safeBox = {


};


(function(){
    var masterpassword="123";
    var mastersecret="";

    function keep(password,secret){
        if (typeof password !== "string" ) {throw Error ("wrong password")}

        if(masterpassword === password){
            mastersecret = secret;

        } 
        
        
    }

    function retrieve(password){

        
        if(masterpassword === password){
            return mastersecret;
        } else {
            throw Error ("wrong password");
        }


    }

    function updatePassword(password, newPassword){
        if(typeof newPassword !== "string")

        if(masterpassword === password){
            masterpassword = newPassword;

        } else {
            throw Error ("wrong new password")
        }


    }
    safeBox.keep=keep;
    safeBox.retrieve=retrieve;
    safeBox.updatePassword=updatePassword;
})();

