window.name = 'Anna'

let a = {
		salute: () => console.log(this.name),
		salute2: function() {
			console.log(this.name)
		}
    }


a.salute()
a.salute2()


// VM13806:5 Anna
// VM13806:5 Alice