var clickablePanel = document.getElementById('clickable-panel');

clickablePanel.addEventListener('click', function(event) {
    var classes = this.classList;

    if (classes.contains('panel--active')) {
        classes.remove('panel--active');

        classes.add('panel--inactive');
    } else {
        classes.remove('panel--inactive');

        classes.add('panel--active');
    }
});