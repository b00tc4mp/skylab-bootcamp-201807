function operate(operation, a, b) {
    var res;

    switch(operation) {
        case 'add':
            res = a + b;
            break;
        case 'subtract':
            res = a - b;
            break;
        case 'multiply':
            res = a * b;
            break;
        case 'divide':
            res = a / b;
            break;
        default:
            throw new Error('unknown operation: ' + operation);
    }

    return res;
}

function humanSize(age) {
    // age: < 3: 'baby', 3 <= age < 12: child, 12 <= age < 18: teenager, 18 < age: adult
    switch (true) {
        case age >= 18:
            return 'adult';
        case age >= 12:
            return 'teenager';
        case age >= 3:
            return 'child';
        default:
            return 'baby';
    }
}