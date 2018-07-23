var safeUser;


(function () {
    var adminUser = 'admin';
    var adminPassword = '12345';
    var mensaje = '';
    safeUser = {

        login: function (user, password) {

            if (user === adminUser && password === adminPassword) {
                return "Login successful";
            }

            return 'Wrong credentials';
        },

        changePassword: function (user, password, newPassword) {

            if (user === adminUser && password === adminPassword) {
                if (typeof newPassword === 'string') {
                    console.log(typeof newPassword);
                    adminPassword = newPassword;
                } else {
                return 'Wrong new password';
                }
            }else{
                return 'Wrong credentials';

            }
          return 'New password changed';  
        },


        message: function (user, password, newMessage) {

            if (adminUser === user && adminPassword === password) {
                if (typeof newMessage === 'string') {
                    console.log(typeof newMessage);
                    mensaje = newMessage;
                    
                } else {
                    return 'Wrong new message';
                }
                
            }else{
                return 'Wrong Credentials';
            }
            return "New message changed";
        }
    };
})();