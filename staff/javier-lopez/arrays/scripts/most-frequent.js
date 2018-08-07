        function mostFrequent(array) {
                // returns and array with the most frequent elements
                var counting = 0;
                var numbers = [];
                for(var i = 0; i < array.length; i++){           
                        for(var x = 0; x < array.length; x++){   
                                if(array[i] === array[x]){
                                        counting++;
                                }
                        }
                        if(numbers.indexOf(array[i]) == -1 && counting > 1){
                                numbers.push(array[i]);
                                counting = 0;
                        }
                }
                return numbers;        
        }