"use strict";

logic.token = 'BQCcwlIejpMYuBcW2r6w4xsS1a16emCHxT430nZueHFJSPlvDo9fKPnQ4SM33SqOILZR0fjk83UtkekMC5v6H_DUIgGq1SVw_vejYBq015BHa_9ZrW7JaJ-uihcust-3TGYPv0nEreywIObHdA';

var $container = $('<div class=container-fluid">');
$('body').append($container);

var searchbar = new Searchbar();
$container.append(searchbar.$element);

searchbar.onSearch(function (query) {
    logic.searchArtists(query)
        .then(function (artists) {
            updateArtistList(artists);
        })
        .catch(function (error) {
            alert(error.message);
        });
});

function updateArtistList(artists) {
    artistList.showList(artists.map(function(artist){
        var name = artist.name;
        var img;
        if(artist.images.length > 0)
            img = artist.images[1].url;
        var id = artist.id;
        return {name, img, id};
    }), onArtistClick);
}

function onArtistClick(artist) {
    console.log(artist);
}

var artistList = new ArtistList();
$container.append(artistList.$element);

var artistPanel = new ArtistPanel();
$container.append(artistPanel.$element);