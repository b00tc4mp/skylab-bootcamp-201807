window.name = 'Anna'

function fun() {
	return {
		salute: () => console.log(this.name)
    }
}

fun().salute()

var o = { name: 'Alice', fun }

o.fun().salute()

// VM13806:5 Anna
// VM13806:5 Alice