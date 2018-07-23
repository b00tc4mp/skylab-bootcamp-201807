this.onmessage = function(e) {
    setTimeout(function() { 
        this.postMessage(e.data);
    }, 2000);
}