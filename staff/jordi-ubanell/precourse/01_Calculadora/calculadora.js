


function calculator(n1, n2) {

	    function checkParams(n1, n2) {
        if (typeof n1 === 'number' && typeof n2 === 'undefined') {
            console.log (squareRoot(n1))
        } else if (typeof n1 === 'number' && typeof n2 === 'number') {
            console.log(sum());
            console.log(rest());
            console.log(mult());
            console.log(div());
        } else if (typeof n1 === 'string' && typeof n2 === 'string') {
            console.log("Only numbers, please!")
        } else if (typeof n1 === 'undefined' && typeof n2 === 'undefined') {
            console.log("No data, insert numbers!")
        } else if (typeof n1 === 'string' && typeof n2 === 'undefined') {
            console.log("Insert numbers!")
        } else if (typeof n1 === 'number' && typeof n2 === 'string') {
            console.log("Insert numbers!")
        } else if (n1 === 0 && n2 === 0) {
            console.log("Multiplícate por cero!")
        } else {
            console.log("What else?")
        }
    }
	checkParams(n1, n2);
    
	function squareRoot() {
    return Math.sqrt(n1);
    }

	function sum() {
        return n1 + n2;
    }

    function rest() {
        return n1 - n2;
    }

    function mult() {
        return n1 * n2;
    }

    function div() {
        if (n1 == 0 && n2 === 0) {
            return "Multiplícate por cero!";
        } else {
            return n1 / n2;
        }
    }
}

calculator(9);