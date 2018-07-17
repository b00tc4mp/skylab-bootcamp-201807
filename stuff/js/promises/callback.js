function imFeelingLucky(callback) {
    setTimeout(function () {
        var time = Date.now();

        if (time % 2 === 0) callback(undefined, 'i am lucky');
        else callback('i am unlucky');
    }, 1000);
}

imFeelingLucky(function(error, message) {
    if (error) console.error(error);
    else console.log(message);
});