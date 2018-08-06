// test 1

var numbers = [1, 2, 3, 4, 5];

var sum = reduce(numbers, function(accum, number) {
    return accum + number;
}, 0);

console.log(sum === 15);

// test 2

var words = ['hello', 'world', 'hola', 'mundo', 'hallo', 'welt', 'ciao', 'mondo'];

var numberOfWordsWithL = reduce(words, function(accum, word) {
    if (word.indexOf('l') > -1) accum++;

    return accum;
}, 0);

console.log(numberOfWordsWithL === 5);

// test 3

var cart = [
    { product: 't-shirt', price: 10 },
    { product: 'shoes', price: 30 },
    { product: 'shorts', price: 20 }
];

var total = reduce(cart, function(accum, product) {
    return accum + product.price;
}, 0);

console.log(total === 60);
