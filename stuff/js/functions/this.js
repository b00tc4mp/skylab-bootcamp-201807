var o = { name: 'osvald' };

function func() {
	console.log(this);

	return function() { console.log(this); };
}

func(); // window

o.fun = func;

console.log(o.fun === func); // true

o.fun()();
// o
// window

var p = { name: 'peter' };

p.boo = o.fun();
// o

p.boo();
// p


// VM9594:4 Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
// VM9594:13 true
// VM9594:4 {name: "osvald", fun: ƒ}
// VM9594:6 Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
// VM9594:4 {name: "osvald", fun: ƒ}
// VM9594:6 {name: "peter", boo: ƒ}