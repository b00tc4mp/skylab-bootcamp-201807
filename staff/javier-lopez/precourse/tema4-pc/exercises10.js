//c) Simple Scripting program. Crea un programa que transforme un número de 4 dígitos en otro diferente con las
//posiciones de los dígitos cambiadas, creandio un nuevo código

function codeScript(code){
	var numberString = code.toString();
	var firstNumber = numberString.charAt(0);
	var otherNumbers = numberString.slice(1,code.length);
	var completeCode = otherNumbers+""+firstNumber;
	coding = completeCode;
	console.log(completeCode);
}
var coding =1234;
codeScript(coding);

//Codigo para usar una vez ejecutado el anterior.
function codeScript(code){
	var numberString = code.toString();
	var firstNumber = numberString.charAt(0);
	var otherNumbers = numberString.slice(1,code.length);
	var completeCode = otherNumbers+""+firstNumber;
	coding = completeCode;
	console.log(completeCode);
}
var coding;
codeScript(coding);




//Manera Gerard
function coder(code1){
    function changePositions(codeToChange){
        codeToChange = codeToChange.toString().split('')

        var newCode = codeToChange.slice(1,codeToChange.length)
        newCode.push(codeToChange[0])
        
        return newCode
    }
    var theResultOf1 = changePositions(code1)
    console.log('The first function => ' + theResultOf1)
}

coder(2412)