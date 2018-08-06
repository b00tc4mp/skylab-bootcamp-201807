// my custom components

function SearchPanel() {
    Component.call(this, 'form');

    var $input = $('<input type="search" placeholder="Input a text....">' );
    /*$input.attr({
        //type: 'search';
        placeholder: 'Input text...'
    });*/
        //JS  
    //var input = document.createElement('input');
    //input.type = 'search';
    //input.placeholder = 'Input a text...';


    var $button= $('<button type="submit">Search</button>');
        //JS
    //var button = document.createElement('button');
    //button.type = 'submit';
    //button.innerHTML = 'Search';

    var $element= $(this.element);
    $element.append([$input, $button]);
    //$element.append($input)
    //$element.append($button)
    //JS
    //this.element.appendChild(input);
    //this.element.appendChild(button);

    var _callback;

    $element.submit(function(event){
        event.preventDefault();
        var query= $input.val();

        if (query && _callback) _callback(query);
    }.bind(this));
    //JS
    /*this.element.addEventListener('submit', function (event) {
        event.preventDefault();

        var query = input.value;

        if (query && _callback) _callback(query);
    }.bind(this));*/


    this.onSearch = function (callback) {
        _callback = callback;
    };
}

SearchPanel.prototype = Object.create(Component.prototype);
SearchPanel.prototype.constructor = SearchPanel;

function ResultsList() {
    Component.call(this, 'ul');

    this.$element=$(this.element)//
}

ResultsList.prototype = Object.create(Component.prototype);
ResultsList.prototype.constructor = ResultsList;

ResultsList.prototype.updateResults = function (results) { // => { id, text }
    this.clear();


    $.each(results, function(index, result){
    //results.forEach(function (result) {
        var $li=$('<li>');  //o var $li=$('<li></li>');
        var $a=$('<a href="#/' + result.id + '">' + reesult.text + '</a>');

        //JS
        /*var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#/' + result.id;
        a.innerHTML = result.text;*/

        $a.click(function(){
            if (this._callback) this._callback(result.id, result.text);
        });
        //JS
       /* a.onclick = function () {
            if (this._callback) this._callback(result.id, result.text);
        }.bind(this);*/

        $li.append($a);
        this.$element.append($li);
        //JS
        //this.element.appendChild(li);
        //li.appendChild(a);
    //});
    }.bind(), this);
};



//JS
/*ResultsList.prototype.clear = function() {
    this.element.innerHTML = '';
};*/

ResultsList.prototype.onItemClick = function (callback) {
    this._callback = callback;
};

/**
 * 
 * @param {string} title The track title
 * @param {string} image The image URL of the track
 * @param {string} file The file URL of the track
 * @param {string} url The URL of the track
 */
function TrackPlayer(title, image, file, url) {
    Panel.call(this, title, 'section');

    var $img=$('<img src="'+ image + '">');
    //JS
    //var img = document.createElement('img');
    //img.src = image;

    var $element= $(this.element);
    $element.append(img);
    //JS
    //this.element.appendChild(img);

    var $audio= $('<audio controls>');
    //JS
    //var audio = document.createElement('audio');
    //audio.controls = true;

    var $source = $('<source src="' + file+ '" type="audio/mpeg">');
    $element.append($audio);
    //JS
    //var source = document.createElement('source');
    //source.src = file;
    //source.type = 'audio/mpeg';
    //audio.appendChild(source);
    //this.element.appendChild(audio);

    var $a= $('<a href="' + url + '" target="_blank">Open in original player</a>');
    $element.append($a);
    //JS
    //var a = document.createElement('a');
    //a.href = url;
    //a.innerText = 'Open in original player';
    //a.target = '_blank';
    //this.element.appendChild(a);
}

TrackPlayer.prototype = Object.create(Panel.prototype);
TrackPlayer.prototype.constructor = TrackPlayer;

/**
 * 
 * @param {string} id The track id
 */
function SpotifyPlayer(id) {
    Component.call(this, 'section');

    $(this.element).append('<iframe src="https://open.spotify.com/embed?uri=spotify:track:'+ id +'" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>') ;
    //this.element.innerHTML = '<iframe src="https://open.spotify.com/embed?uri=spotify:track:'+ id +'" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>';
}

SpotifyPlayer.prototype = Object.create(Component.prototype);
SpotifyPlayer.prototype.constructor = SpotifyPlayer;