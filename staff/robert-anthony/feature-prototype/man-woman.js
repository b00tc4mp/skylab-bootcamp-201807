// método prototipo


function Parent() {
  this.name = "doug";

}

function Child() {

}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

let c = new Child();

console.log(c instanceof Child); // true
console.log(c instanceof Parent); // true
console.log(c.__proto__.constructor); // [Function: Child]



// método Object.create()

let parent_obj =  {
  "name":"doug",

};


let child_obj = Object.create(parent_obj);

console.log(child_obj instanceof Child); // false
console.log(child_obj instanceof Parent); // false
console.log(child_obj.__proto__.constructor); // [Function: Object]

child_obj.__proto__.constructor = Child;
console.log(child_obj instanceof Child); // false
console.log(child_obj instanceof Parent); // false


/*
No entiendo pro qué se tiene que poner la función constructor en `prototype.constructor` cuando haces una vinculación entre objetos para tener un relación prototipal, pero acepto que se tiene que hacer (ve https://stackoverflow.com/questions/8453887/why-is-it-necessary-to-set-the-prototype-constructor).*/
