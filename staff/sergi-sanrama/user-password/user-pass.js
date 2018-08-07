var userPass;


(function (){
    var _user = '';
    var _password = '';

    userPass = {    
        /**
         * Añade user/password a un BD ficticious
         */
        register: function (user, password){
        if (!user || !password){
            throw new Error ('Error en el registro, faltan datos');
        } 
        if (typeof user !=='string' || typeof password !== 'number'){
            throw new Error ('Error en el registro')
        }
        _user = user;
        _password = password;
        return 'Registro exitoso';

    
        
        /**
         * Co prueba que user/pw son correctos
         */
        login: function (user, password){
            
            
        },
        
        /**
         * Cambia la password
         */
        updatePassword: function (user, password, newPassword){
            
            
            
        }
        
        
    })();










}