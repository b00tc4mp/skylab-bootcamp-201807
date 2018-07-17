var imFeelingLucky = new Promise(function (resolve, reject) {
    setTimeout(function () {
        var time = Date.now();

        if (time % 2 === 0) resolve('i am lucky');
        else reject('i am unlucky');
    }, 1000);
});

imFeelingLucky
    .then(function (message) {
        console.log(message);
    })
    .catch(function (error) {
        console.error(error);
    });