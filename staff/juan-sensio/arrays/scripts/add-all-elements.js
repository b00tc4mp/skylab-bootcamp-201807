function addAllElements(arr) {
    var sum=0;
    for(var i=0; i<arr.length; i++)
        sum+=arr[i];
    return sum;
}

function _addAllElements(arr) {
    return arr.reduce(function(a,b){return a+b;});
}