// add all elements
    //with For
        function addAllElements(array){
            //TODO : implemet using a standar loop (for or while, as you wish).
            var result = 0;
            for(var i = 0; i < array.length; i++){
                result+=array[i];
            }
            return result;
        }
        console.log(addAllElements([1,2,3,4,5]) === 15); //true
        console.log(addAllElements([1,2,3,4,5,6]) === 21); //true
        console.log(addAllElements([1,2,3]) === 6); //true


    //with While 
        function addAllElementsWhile(array){
            //TODO : implemet using a standar loop (for or while, as you wish).
            var result = 0;
            var i = 0;
            while(i<array.length){
                result+=array[i];
                i++;
            }     
            return result;
        }
        console.log(addAllElementsWhile([1,2,3,4,5]) === 15); //true
        console.log(addAllElementsWhile([1,2,3,4,5,6]) === 21); //true
        console.log(addAllElementsWhile([1,2,3]) === 6); //true
