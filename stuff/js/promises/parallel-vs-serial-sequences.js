// resolving all at once in sequence (parallel sequence)

var p = Promise.resolve()

var a = [1, 2, 3]

a.forEach(n => p.then(() =>
    new Promise((resolve, reject) =>
        setTimeout(() => {
            console.log(n)
            resolve()
        }, 1000)
    ))
)

// output (all at the same time in sequence)
// 1
// 2
// 3

// resolving one each in sequence (serial sequence)

var p = Promise.resolve()

var a = [1, 2, 3]

a.forEach(n => p = p.then(() =>
    new Promise((resolve, reject) =>
        setTimeout(() => {
            console.log(n)
            resolve()
        }, 1000)
    ))
)

// output (each one at a time in sequence)
// 1
// 2
// 3