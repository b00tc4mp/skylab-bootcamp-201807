// expects an error in register function
(function (){
    var user = 'Paquito';
    var password = '12345';
    var message;
    
    try{
        userPass.register(user, password);
    } catch (error){
        message = error.message;
    }

    console.log(message === "Error en el registro");
})();