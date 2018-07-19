// my custom components

function SearchPanel() {
    Component.call(this, 'form');
    
    var $form = $(this.element);
    $($form).append('<input type="search" placeholder="Input a text..." />');
    $($form).append('<button type="submit">Search</button>');

    var _callback;

    $form.submit(function(){
        event.preventDefault();
        var query = $("input").val();
        if (query && _callback) _callback(query);
    }.bind(this));

    this.onSearch = function (callback) {
        _callback = callback;
    };
}

SearchPanel.prototype = Object.create(Component.prototype);
SearchPanel.prototype.constructor = SearchPanel;

function ResultsList() {
    Component.call(this, 'ul');
}

ResultsList.prototype = Object.create(Component.prototype);
ResultsList.prototype.constructor = ResultsList;

ResultsList.prototype.updateResults = function (results) { // => { id, text }
    //this.element.innerHTML = "";

    $.each(results,function (index, value) {
        
        var $li = $('<li>');
        var $a = $('<a href="#/'+value.id+'>'+value.text+'</a>');

        $a.click(function () {
            if (this._callback) this._callback(value.id, value.text);
        }.bind(this));

        $li.append($a);
        this.$form.append($li);
    }.bind(this));
};

ResultsList.prototype.onItemClick = function (callback) {
    this._callback = callback;
};

/**
 * 
 * @param {string} title The item title
 * @param {string} info The information about an item
 * @param {string} image The image of the item
 */
function DetailPanel(title, info, preview, image) {
    Panel.call(this, title, 'section');

    var p = document.createElement('p');
    p.innerText = info;

    var iframe = document.createElement('iframe');
    iframe.src = preview;


    var img = document.createElement('img');
    img.src = image;

    this.element.appendChild(img);
    this.element.appendChild(iframe);
    this.element.appendChild(p);
}

DetailPanel.prototype = Object.create(Panel.prototype);
DetailPanel.prototype.constructor = DetailPanel;