//

const fun = message => 'hola mundo'

fun('hola mundo')

//

const fun = (message, time) => { 
	console.log(message)
	console.log(time)
}

fun('hola mundo', new Date())

//

const fun = message => { 'hola mundo' } // does not return

const fun = message => { return 'hola mundo' } // return is required if needing 'hola mundo' as the result of invoking this function
