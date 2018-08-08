function sort(array, reverse) {
    // TODO return array sorted alphabetically / numerically (use of Array.prototype.sort is forbidden)

    reverse = reverse || false;

    var sorted = [];
    for (var i = 0; i < array.length; i++) {
        var element = array[i];
        var elementAdded = false;
        var sortedInLoop = sorted;
        sorted = [];
        for (var j = 0; j < sortedInLoop.length; j++) {
            var sortedElement = sortedInLoop[j];
            if (elementAdded === false) {
                if (reverse === false) {
                    if (new String(element).charCodeAt() < new String(sortedElement).charCodeAt()) {
                        sorted.push(element);
                        elementAdded = true;
                    }
                }
                else if (reverse === true) {
                    if (new String(element).charCodeAt() > new String(sortedElement).charCodeAt()) {
                        sorted.unshift(element);
                        elementAdded = true;
                    }
                }
            }
            if (reverse === false) {
                sorted.push(sortedElement);
            }
            else if (reverse === true) {
                sorted.unshift(sortedElement);
            }
        }
        if (elementAdded === false) {
            if (reverse === false) {
                sorted.push(element);
            }
            else if (reverse === true) {
                sorted.unshift(element);
            }
        }
    }
    return sorted;
}