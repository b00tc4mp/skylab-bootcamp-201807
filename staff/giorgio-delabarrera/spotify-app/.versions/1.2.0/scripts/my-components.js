// my custom components

function SearchPanel() {
    Component.call(this, 'form');

    var input = document.createElement('input');
    input.type = 'search';
    input.placeholder = 'Input a text...';

    var button = document.createElement('button');
    button.type = 'submit';
    button.innerHTML = 'Search';

    this.element.appendChild(input);
    this.element.appendChild(button);

    var _callback;

    this.element.addEventListener('submit', function (event) {
        event.preventDefault();

        var query = input.value;

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
    this.element.innerHTML = '';

    results.forEach(function (result) {
        var li = document.createElement('li');
        var a = document.createElement('a');

        a.href = '#/' + result.id;
        a.innerHTML = result.text;
        a.onclick = function () {
            if (this._callback) this._callback(result.id, result.text);
        }.bind(this);

        this.element.appendChild(li);

        li.appendChild(a);
    }, this);
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
function DetailPanel(title, info, image, preview) {
    Panel.call(this, title, 'section');

    var p = document.createElement('p');
    p.innerText = info;

    this.element.appendChild(p);

    var img = document.createElement('img');
    img.src = image;

    // img.width = '512';
    // img.height = '512';
    // img.classList.add('test');

    this.element.appendChild(img);

    if (preview) {
        var audio = document.createElement('audio');
        audio.controls = true
        
        var source = document.createElement('source');
        source.src = preview;
        source.type = 'audio/mpeg';

        audio.appendChild(source);

        this.element.appendChild(audio);
    }
}

DetailPanel.prototype = Object.create(Panel.prototype);
DetailPanel.prototype.constructor = DetailPanel;

DetailPanel.prototype.getAudio = function() {
    return this.element.querySelector('audio');
}






Component.prototype.empty = function() {
    this.element.innerHTML = '';
}

/**
 * 
 */
function SiteNav() {
    Component.call(this, 'nav');

    this.blockName = 'site-nav';

    this.element.classList.add(this.blockName);

    this.element.innerHTML = ' \
        <ul class="site-nav__list"> \
            <li class="site-nav__list-item"> \
                <a href="index.html" class="site-nav__link"> \
                    <i class="site-nav__link-icon fas fa-home fa-lg"></i> \
                    <span class="site-nav__link-text">Home</span> \
                </a> \
            </li> \
        </ul> \
    ';
}

SiteNav.prototype = Object.create(Component.prototype);
SiteNav.prototype.constructor = SiteNav;

/**
 * 
 */
function RecentlyPlayed() {
    Component.call(this, 'section');

    this.blockName = 'recently-played';

    this.element.classList.add(this.blockName);

    // title

    var title = document.createElement('h2');
    title.classList.add(this.blockName + '__title');
    title.innerText = 'Recently played';

    this.element.appendChild(title);

    // list
    
    var list = document.createElement('ul');
    list.classList.add(this.blockName + '__list');

    this.element.appendChild(list);
}

RecentlyPlayed.prototype = Object.create(Component.prototype);
RecentlyPlayed.prototype.constructor = RecentlyPlayed;

RecentlyPlayed.prototype.addItem = function(item) {     // => { id, title, artist }
    
    var li = document.createElement('li');
    li.classList.add(this.blockName + '__list-item');
    
    var a = document.createElement('a');
    a.href = '#';
    a.innerText = item.title + ' - ' + item.artist;

    li.appendChild(a);

    this.element.insertBefore(li, this.element.firstChild);
}

/**
 * 
 */
function Search() {
    Component.call(this, 'section');

    this.blockName = 'search';
    
    this.element.classList.add(this.blockName);

    var form = document.createElement('form');

    var label = document.createElement('label');
    label.classList.add(this.blockName + '__label');
    label.innerText = 'Search artists';

    form.appendChild(label);

    var input = document.createElement('input');
    input.classList.add(this.blockName + '__input');
    input.type = 'text';
    input.placeholder = 'Input...'

    form.appendChild(input);    

    this.element.appendChild(form);

    this._onSearch = function() {};

    form.addEventListener('submit', function(event) {

        event.preventDefault();

        var query = input.value;

        if (query && this._onSearch) this._onSearch(query);
    }.bind(this));
}

Search.prototype = Object.create(Component.prototype);
Search.prototype.constructor = Search;

Search.prototype.onSearch = function(callback) {
    this._onSearch = callback;
}

/**
 * 
 */
function ArtistList() {
    Component.call(this, 'section');

    this.blockName = 'artist-list';

    this.element.classList.add(this.blockName);
}

ArtistList.prototype = Object.create(Component.prototype);
ArtistList.prototype.constructor = ArtistList;

ArtistList.prototype.updateResults = function(artistsListItem) {

    this.empty();

    artistsListItem.forEach(function(artistListItem) {
        this.element.appendChild(artistListItem.element);
    }, this);
}

/**
 * 
 */
function ArtistListItem(props) {

    Component.call(this, 'div');

    this.blockName = 'artist-list-item';

    this.element.classList.add(this.blockName);

    // image

    var imgAnchor = document.createElement('a');
    imgAnchor.href = '#/' + props.id;

    var img = document.createElement('img');
    img.classList.add(this.blockName + '__image');
    img.src = props.imageSource;
    img.alt = props.title;

    imgAnchor.appendChild(img);

    this.element.appendChild(imgAnchor);

    // title

    var h3 = document.createElement('h3');
    h3.classList.add(this.blockName + '__title');
    
    var titleAnchor = document.createElement('a');
    titleAnchor.href = '#/' + props.id;
    titleAnchor.innerText = props.title;

    h3.appendChild(titleAnchor);

    this.element.appendChild(h3);

    // onClick
    
    this._onClick = function() {};

    var handleClick = function(event) {

        event.preventDefault();

        if (this._onClick) this._onClick(props.id);

    }.bind(this);

    imgAnchor.addEventListener('click', handleClick);
    titleAnchor.addEventListener('click', handleClick);
}

ArtistListItem.prototype = Object.create(Component.prototype);
ArtistListItem.prototype.constructor = ArtistListItem;

ArtistListItem.prototype.onClick = function(callback) {
    this._onClick = callback;
}