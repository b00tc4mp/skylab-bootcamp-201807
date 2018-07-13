//expects an error in register function

(function () {
    var user = 'Paquito';
    var password = '12345';
    var message;
    try {
        userPass.register(user, password);
    } catch (error) {
        message = error.message; 

    }

    console.log(message === "Error en el registro");
})();


//expects an error in register function

(function (){
    var user = '';
    var password = '12345';
    var message;
    try {
        userPass.register(user, password);
    } catch (error) {
        message = error.message; 

    }

    console.log(message === "Error en el registro"); //true


})();


//expects an error in register function

(function (){
    var user = 'abc';
    var password = '';
    var message;
    try {
        userPass.register(user, password);
    } catch (error) {
        message = error.message; 

    }

    console.log(message === "Error en el registro"); //true


})();

//expects an error in register function

(function (){
    var user = true;
    var password = '12345';
    var message;
    try {
        userPass.register(user, password);
    } catch (error) {
        message = error.message; 

    }

    console.log(message === "Error en el registro"); //true


})();


//expects an error in register function

(function (){
    var user = undefined;
    var password = '12345';
    var message;
    try {
        userPass.register(user, password);
    } catch (error) {
        message = error.message; 

    }

    console.log(message === "Error en el registro"); //true


})();

//expects good login

(function (){
    
    var user = 'pepe';
    var password = 12345;
    userPass.register(user, password);
    var message = userPass.login(user,password);
    console.log(message === "Login Okay"); //true


})();

// bad login

(function (){
    var user = 'pepe';
    var password = 12345;
    var message;
    userPass.register(user, password)
    try {
        userPass.login(user, 13445);
    } catch (error) {
        message = error.message; 

    }

    console.log(message === "Login failed"); //true


})();

(function (){
    var user = 'pepe';
    var password = 12345;
    var message;
    userPass.register(user, password)
    try {
        userPass.login('Umpa', 12345);
    } catch (error) {
        message = error.message; 

    }

    console.log(message === "Login failed"); //true

})();

(function (){
    var user = 'pepe';
    var password = 12345;
    var message;
    userPass.register(user, password)
    try {
        userPass.login('Umpa', 12345);
    } catch (error) {
        message = error.message; 
    }

    console.log(message === "Login failed"); //true

})();

(function (){
    var user = 'pepe';
    var password = 12345;
    var newPassword = 12345543;
    var message;
    userPass.register(user, password);
    userPass.login(user,password);

    console.log(userPass.updatePassword(user, password, newPassword) === "password updated sucessfully"); //true

})();