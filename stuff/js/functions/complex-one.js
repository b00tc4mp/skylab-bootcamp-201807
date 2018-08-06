function fun() {
    return {
        b: [function () {
            return {
                a: [undefined, function () {
                    return function (i) {
                        var arr = [function () {
                            console.log('hello');
                        }];

                        return arr[i];
                    }
                }]
            }
        }]
    }
}

fun().b[0]().a[1]()(0)(); // hello
