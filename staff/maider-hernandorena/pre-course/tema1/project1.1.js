function calculator(n1, n2){
	function check(){
		if (typeof n1 !== "number" && typeof n2 !== "number"){
			return "Error, los números no son correctos"
		} else if (typeof n1 === "undefined") {
			return sqrt()
		} else if (typeof n2 === "undefined"){
			return sqrt2()
		} else {
			return ["La suma es " + sum() + ", la resta es " + subs() + ", la multiplicación es " + mult() + " y la división es " + div()]
		}
	}
	function sum(){
		return n1+n2
	}
	function subs(){
		return n1-n2
	}
	function mult(){
		return n1*n2
	}
	function div(){
		return n1/n2
	}
	function sqrt(){
		return Math.sqrt(n2)
	}
	function sqrt2(){
		return Math.sqrt(n1)
	}
	
	return check()
}

console.log (calculator (2,4));
console.log (calculator (9));
console.log (calculator ());
console.log (calculator (0,0));
console.log (calculator(0,4));
console.log (calculator("hola"));