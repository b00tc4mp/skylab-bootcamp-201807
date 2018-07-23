var userPass;

(function () {

    var _user;
    var _pass;
    userPass = {
        /** 
         * Añade user/password a una BD ficticia
         */
        register: function (user, password) {
            if (!user || !password) {
                throw new Error('Error en el registro');
            }
            if (typeof user !== 'string' || typeof password !== 'number') {
                throw new Error('Error en el registro');
            }
            _user = user;
            _pass = password;

            return 'Registro exitoso';
        },

        /**
         * Comprueba user/password correctos
         */
        login: function (user, password) {
            if (user === _user && password === _pass) {
                return 'Login Okay'
            }
                throw new Error ('Login failed')
        },

        /**
         * cambia la password de User
         */
        updatePassword: function (user, password, newPassword) {
            if(typeof newPassword !== "number" || typeof user !== "string" || typeof password !== "number"){
                throw new Error("wrong credentials");
            }
            if(user !== _user || password !== _pass){
                throw new Error("wrong credentials");
            }
            _pass = newPassword;
            return "password updated sucessfully";

        }
    };
})();