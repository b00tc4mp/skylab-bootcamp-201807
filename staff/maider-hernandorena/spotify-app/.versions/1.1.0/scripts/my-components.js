'use strict';

// the search panel, search-bar, button and function
function SearchPanel() {
    Component.call(this, 'form');

    var $element = $(this.element);
    var $input = $('<input type="search" placeholder="Input a text...">');
    var $button = $('<button type="submit">Search</button>');

    $element.submit(function(event){
        event.preventDefault();
        var query = $input.val();
        if (query && _callback) _callback(query);
    }.bind(this));
    
    $element.append([$input, $button]);
    
    var _callback;
    this.onSearch = function (callback) {
        _callback = callback;
    };
}

SearchPanel.prototype = Object.create(Component.prototype);
SearchPanel.prototype.constructor = SearchPanel;


// create a result list that we would call later
function ResultsList() {
    Component.call(this, 'ul');
    this.$element = $(this.element);
}

ResultsList.prototype = Object.create(Component.prototype);
ResultsList.prototype.constructor = ResultsList;

// we would update the results and create a list
ResultsList.prototype.updateResults = function (results) { // => { id, text }
    this.clear();

    $.each(results, function(index, result) {

        var $li = $('<li>');
        var $a = $('<a href="#/' + result.id + '">' + result.text + '</a>');
        $a.click(function() {
            if (this._callback) this._callback(result.id, result.text);
        }.bind(this));
        
        $li.append($a);
        this.$element.append($li);
        

        //var li = document.createElement('li');
         //this.element.appendChild(li);

        /* var a = document.createElement('a');
        a.href = '#/' + result.id;
        a.innerHTML = result.text;
        a.onclick = function () {
            if (this._callback) this._callback(result.id, result.text);
        }.bind(this); */

    }.bind(this));
};

ResultsList.prototype.onItemClick = function (callback) {
    this._callback = callback;
};

// detail panel with different params
function DetailPanel(title, popularity, preview, spotifyUrl) {
    Panel.call(this, title, 'section');

    var p = document.createElement('p');
    p.innerText = popularity;
    this.element.appendChild(p);

    var iframe = document.createElement('iframe');
    iframe.src = preview;
    this.element.appendChild(iframe);

    var a1 = document.createElement('a');
    a1.href = spotifyUrl;
    a1.setAttribute('target', '_blank');
    a1.innerHTML = 'Complete song on Spotify';
    this.element.appendChild(a1);
}

DetailPanel.prototype = Object.create(Panel.prototype);
DetailPanel.prototype.constructor = DetailPanel;