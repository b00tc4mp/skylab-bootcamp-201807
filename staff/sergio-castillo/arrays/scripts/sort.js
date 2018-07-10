function sort(array, reverse) {
    // TODO return array sorted alphabetically / numerically (use of Array.prototype.sort is forbidden)
    for (var i=1;i<array.length;i++){
        var char=[];
        if(reverse===true){
            if(array[i-1]>array[i]){
                char=array.shift();
                array=char.push();
                char.shift();
            }
        }else{

        }
    }
}