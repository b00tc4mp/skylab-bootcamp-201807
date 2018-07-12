var john = { name: 'John' }, peter = { name: 'Peter' };

function show(property) {
	console.log(property + ': ' + this[property]);
}

// demo 1

show.call(peter, 'name')
show.apply(john, ['name'])

// demo 2

john.show = show;
peter.show = show;

john.show('name')
peter.show('name')


// VM3439:4 name: Peter
// VM3439:4 name: John
// VM3439:4 name: John
// VM3439:4 name: Peter
