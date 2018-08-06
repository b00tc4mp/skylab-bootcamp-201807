
// Generate an ordered list of numbers
function generate_array_num(){
    var my_array = [];
    for (var i = 0; i < 90; i++){
    my_array.push(i+1); 
    }
    return my_array;
}
var result_array_num = generate_array_num();
console.log(result_array_num);


// Mix the order of an array
function shuffle_array(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
    console.log(array);
}


// Take the normal array and put into the shuffle function (can contain the limit of the array)
function randomize(temp_random){
    shuffle_array(temp_random);
    return temp_random;
}

var test_result = randomize(generate_array_num());
console.log(test_result);


// Constructor of the bingo card
function generate_bingo_card(){
    var bingo_card = test_result;
    var result_card = bingo_card.slice(0,15);
    return result_card;
}

var my_bingo_card = generate_bingo_card();
console.log(my_bingo_card);


