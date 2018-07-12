// test 1

var names = ['John', 'Anna', 'Max'];

var fulls = map(names, function(name) {
    return name + ' Doe';
});

console.log(fulls.length === 3);
console.log(fulls[0] === 'John Doe');
console.log(fulls[1] === 'Anna Doe');
console.log(fulls[2] === 'Max Doe');

// test 2

var numbers = [1, 2, 3];

var squares = map(numbers, function(number) {
    return number * number;
});

console.log(squares.length === 3);
console.log(squares[0] === 1);
console.log(squares[1] === 4);
console.log(squares[2] === 9);

// test 3

var cart = [
    { product: 't-shirt', price: 10 },
    { product: 'shoes', price: 30 },
    { product: 'shorts', price: 20 }
];

var prices = map(cart, function(product) {
    return product.price;
});

console.log(prices.length === 3);
console.log(prices[0] === 10);
console.log(prices[1] === 30);
console.log(prices[2] === 20);