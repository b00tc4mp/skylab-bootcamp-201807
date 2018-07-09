var useCapture = false; // what if true?

document.getElementsByClassName('box')[0].addEventListener('click', function(event) { 
    console.log('click on red'); 
}, useCapture);

document.getElementsByClassName('box--blue')[0].addEventListener('click', function(event) { 
    event.stopPropagation();

    console.log('click on blue'); 
}, useCapture);

document.getElementsByClassName('box--yellow')[0].addEventListener('click', function(event) {
    event.stopPropagation();
    
    console.log('click on yellow');
}, useCapture);