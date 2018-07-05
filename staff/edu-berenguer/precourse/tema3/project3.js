//BINGO
function bingo(){
    var classification = new Array();
    var max;
    var min;
    var firstNumber;
    var secondNumber;
    var thirdNumber;
    var turns;
    var firstLine = new Array();
    var secondLine = new Array();
    var thirdLine = new Array();
    var bingoCard;
    var flag = false;
    var numbers = new Array();
    var totalPoints;
    var point;
    var points = new Array();

    function newGame(){

    	name = "";
    	while(name === ""){
    		name = prompt("¿Hola, cuál es tu nombre?");
    	}
        console.log("Hola!!! " + name + " , el sistema de puntos es el siguiente: ");
        console.log("A menos turnos, más puntos. A cada turno (es decir, cuando sale un número)");
        console.log("un punto menos. Y así sucesivamente.");
        max = 90;
        min = 1;
        firstNumber = 5;
        secondNumber = 10;
        thirdNumber = 15;
        turns = 0;
        bingoCard;
        flag = false;
        numbers = new Array();
        point = 0;
        totalPoints = 0;
        points = new Array();
        /*Creo un array para poder trabajar con el y así que no se vayan repetiendo 
        los numeros que van saliendo*/
        for(var i = 1; i < 91; i++){
            numbers.push(i);
        }
        showClassification()
        generateCard();
        showCard();
    }
    function createCard(){
        var numRandom = Math.floor(Math.random() * (max - min) + min);
        return numRandom;
    }
    function generateCard(){
        firstLine = new Array();
        secondLine = new Array();
        thirdLine = new Array();
        bingoCard = [
        {number: createCard(), matched: false},
        {number: createCard(), matched: false},
        {number: createCard(), matched: false},
        {number: createCard(), matched: false},
        {number: createCard(), matched: false},
        //next line
        {number: createCard(), matched: false},
        {number: createCard(), matched: false},
        {number: createCard(), matched: false},
        {number: createCard(), matched: false},
        {number: createCard(), matched: false},
        //next line
        {number: createCard(), matched: false},
        {number: createCard(), matched: false},
        {number: createCard(), matched: false},
        {number: createCard(), matched: false},
        {number: createCard(), matched: false}
        ];
    }

    function showCard(){
        console.log("---- TU CARTÓN ----");

        bingoCard.forEach(function(obj,i){
            if(i < firstNumber){
                firstLine.push(obj.number);
            }
            if(i > (firstNumber - 1) && i < secondNumber){
                secondLine.push(obj.number);
            }
             if(i > (secondNumber - 1) && i < thirdNumber){
                thirdLine.push(obj.number);
            }
            i++;
        });

        console.log(firstLine);
        console.log(secondLine);
        console.log(thirdLine);

        if(flag === true){
            checkCard();
        }else{
            newCard();
        }
        
    }

    function showClassification(){
        var i = 1;
        console.log("----- CLASIFICACIÓN -----");
          function compare(a,b){
            return b.Puntos - a.Puntos;
          }
          classification.sort(compare);
          classification.forEach(function(obj){
            console.log("Posición=>" + i + "º " + "Nombre=> " + obj.Nombre + " ;Puntos=> " + obj.Puntos);
        });
    }

    function pointSystem(turn){
    	/*Mi sistema de puntos se basa que dependiendo de los turnos que se ha necesitado, este valor 
    	será la posición de un array que va de la posición 0 (valor 1000 puntos) a la posicíon 1000(valor 0 puntos)
    	A menos turnos más puntuación*/
        for(var i = 1000; i > 0; i--){
            points.push(i);
        }
        for(var i =0; i < points.length; i++){
            totalPoints = points[turn];
        }
        return totalPoints;
    }
    
    function newCard(){
        var cardNew = "";
        while(cardNew !== "yes" && cardNew !== "no"){
            cardNew = prompt("¿Quieres este cartón? yes/no");
            if(cardNew === "yes"){
                flag = true;
                checkCard();
            }if(cardNew === "no"){
                generateCard();
                showCard();
                }
        }
    }

    function checkCard(){
        accTotal = 0;
        accFirstLine = 0;
        accSecondLine = 0;
        accThirdLine = 0;

        if(accSecondLine === 0){
            for(var i =0; i < secondLine.length; i++){
            if(secondLine[i] === "X"){
                accSecondLine++;
            }
            }
        }

        if(accFirstLine === 0){
            for(var i =0; i < firstLine.length; i++){
            if(firstLine[i] === "X"){
                accFirstLine++;
            }
            }
        }

        if(accThirdLine === 0){
            for(var i =0; i < thirdLine.length; i++){
            if(thirdLine[i] === "X"){
                accThirdLine++;
            }
            }
        }

        bingoCard.forEach(function(obj){
            if(obj.number === "X"){
                accTotal++;
            }
        });

        card();
    }

    function card(){
        
        if(accTotal === 15){
            console.log("¡¡¡BINGO!!! Has completado el cartón!!!");
            console.log("Has necesitado " + turns + " turnos"); 
            point = pointSystem(turns);
            classification.push({Nombre: name, Puntos: point});
            var another = confirm("¿Jugar de nuevo?");
            if(another === true){
                newGame();
            }if(another === false){
                showClassification();
                console.log("Juego finalizado");
            }

        }else if(accFirstLine === 5){
            console.log("¡¡Cantamos línea en la primera fila!!");
            accFirstLine = -1;
            var ans = confirm("Quieres un nuevo número o salir del juego");
            if(ans === true){
                newTurn();
            }
            if(ans === false){
                console.log("Juego finalizado");
            }
        }else if(accSecondLine === 5){
            console.log("¡¡Cantamos Línea en la segunda fila!!");
            accSecondLine = -1;
            var ans = confirm("Quieres un nuevo número o salir del juego");
            if(ans === true){
                newTurn();
            }
            if(ans === false){
                console.log("Juego finalizado");
            }
        }else if(accThirdLine === 5){
            console.log("¡¡Cantamos línea en la tercera fila!!");
            accThirdLine = -1;
            var ans = confirm("Quieres un nuevo número o salir del juego");
            if(ans === true){
                newTurn();
            }
            if(ans === false){
                console.log("Juego finalizado");
            }
        }else{
            var ans = confirm("Quieres un nuevo número o salir del juego");
            if(ans === true){
                newTurn();
            }
            if(ans === false){
                console.log("Juego finalizado");
                showClassification();
            }
        }
    }
    function newTurn(){
        turns++;
        firstLine.length = 0;
        secondLine.length = 0;
        thirdLine.length = 0;
        var newNumber;
        var check = "X";

        while(check === "X"){
            newNumber = Math.floor(Math.random() * (max - min) + min);
            var sum = newNumber - 1 ;
            check = numbers[sum];
        }

        var deleteNumber = numbers.indexOf(newNumber);
        numbers.splice(deleteNumber,1,"X");
        bingoCard.forEach(function(obj){
            if(obj.number === newNumber){
                obj.number = "X";
                obj.matched = true;
            }                   
        });
        
       
        console.log("--- El nuevo número es el: " + newNumber + " -----");
        
        console.log("--- Los números que quedan són: ---");
        console.log(numbers);
        showCard();
        }

        return newGame();
}
bingo();





