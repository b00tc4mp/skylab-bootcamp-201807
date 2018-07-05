//c2) Ahora, el usuario debería poder introducir como parámetro dos códigos a la vez y devolver los dos códigos 
//encriptados (Los dos códigos se deberían encriptar en la misma función)

function codeScript(code,code2){
	//FirstCode
	var numberString = code.toString();
	var firstNumber = numberString.charAt(0);
	var otherNumbers = numberString.slice(1,code.length);
	var completeCode = otherNumbers+""+firstNumber;
	coding = completeCode;
	console.log(completeCode);

	//Second Code
	var numberString2 = code2.toString();
	var firstNumber2 = numberString2.charAt(0);
	var otherNumbers2 = numberString2.slice(1,code2.length);
	var completeCode2 = otherNumbers2+""+firstNumber2;
	coding2 = completeCode2;
	console.log(completeCode2);
}
var coding = 1234;
var coding2 = 5678;
codeScript(coding, coding2);


//Manera Gerard
function coder(code1,code2){
    function changePositions(codeToChange){
        codeToChange = codeToChange.toString().split('')

        var newCode = codeToChange.slice(1,codeToChange.length)
        newCode.push(codeToChange[0])
        
        return newCode
    }
    var theResultOf1 = changePositions(code1)
    var theResultOf2 = changePositions(code2)
    console.log('The first function => ' + theResultOf1)
    console.log('The second function => ' + theResultOf2)

}

coder(2412, 1213)