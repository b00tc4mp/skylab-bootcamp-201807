// demo 1

// what happens if... ?

for (var i = 0; i < 3; i++) { 
	setTimeout(function() { console.log(i) }, 1000);
} 

// how does it work in es6?

for (let i = 0; i < 3; i++) { 
	setTimeout(function() { console.log(i) }, 1000);
}

// how can it be solved in es5?

for (var i = 0; i < 3; i++) { 
    (function(i) {
        setTimeout(function() { console.log(i) }, 1000);
    })(i);
}

for (var i = 0; i < 3; i++) { 
    setTimeout((function(i) { return function() { console.log(i) } })(i), 1000);
}

// demo 2

// what happens if... ?

{
	var a = 1
	
	setTimeout(function() { console.log(a) }, 1000)
}

{
	var a = 2
	
	setTimeout(function() { console.log(a) }, 1000)
}

{
	var a = 3
	
	setTimeout(function() { console.log(a) }, 1000)
}

// how does it work in es6?

{
	let a = 1
	
	setTimeout(function() { console.log(a) }, 1000)
}

{
	let a = 2
	
	setTimeout(function() { console.log(a) }, 1000)
}

{
	let a = 3
	
	setTimeout(function() { console.log(a) }, 1000)
}

// how about with const in this case?

{
	const a = 1
	
	setTimeout(function() { console.log(a) }, 1000)
}

{
	const a = 2
	
	setTimeout(function() { console.log(a) }, 1000)
}

{
	const a = 3
	
	setTimeout(function() { console.log(a) }, 1000)
}

// how can it be solved in es5?

(function() {
	var a = 1
	
	setTimeout(function() { console.log(a) }, 1000)
})();

(function() {
	var a = 2
	
	setTimeout(function() { console.log(a) }, 1000)
})();

(function(){
	var a = 3
	
	setTimeout(function() { console.log(a) }, 1000)
})();