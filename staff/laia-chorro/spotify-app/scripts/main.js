'use strict'

var search = new SearchPanel(),
    resultsArtists = new ResultsList(),
    resultsAlbums = new ResultsList(),
    resultsTracks = new ResultsList(),
    DEFAULT_IMAGE = 'https://i.pinimg.com/originals/37/2a/2d/372a2d5e8a32991bb19982271d0762fe.jpg';

//Create List of artists by query from the input search
search.onSearch(function (query) {
        $.when(logic.searchArtists(query))
        .then(function (artists) { updateResultsByIdAndName(resultsArtists, artists); })
        .catch(function (error) { alert('Sorry, we have temporary problem, try again later.'); });
});

//Create List of albums by artist
resultsArtists.onItemClick(function (id) {
    $.when(logic.retrieveAlbumsByArtistId(id))
    .then(function (albums) { updateResultsByIdAndName(resultsAlbums, albums); })
    .catch(function (error) { alert('Sorry, we have temporary problem, try again later.'); });
});

//Create List of tracks by albums
resultsAlbums.onItemClick(function (id) {
    // store the selected album id inside the albumsContainer, to show its image on the detailed info
    $albumsContainer.attr('active-id', id); 

    $.when(logic.retrieveTracksByAlbumId(id))
    .then(function (tracks) { updateResultsByIdAndName(resultsTracks, tracks); })
    .catch(function (error) { alert('Sorry, we have temporary problem, try again later.'); });
});


//List detail of track
resultsTracks.onItemClick(function (id) {
    var activeAlbumId = $('#albumsContainer').attr('active-id'),
        activeImg;

    $.when(logic.retrieveAlbumsById(activeAlbumId))
    .then(function(album) {
        activeImg = album.images[1].url;
        return logic.retrieveTrackById(id);
    })
    .then(function (track) {
        var detail = new DetailPanel(track.name, track.external_urls.spotify, activeImg ? activeImg : DEFAULT_IMAGE);

        $detailContainer.empty();
        $detailContainer.append($(detail.element));
    })
    .catch(function (error) { alert('Sorry, we have temporary problem, try again later.'); });
});

function updateResultsByIdAndName(resultList, results) {
    resultList.updateResults(results.map(function (result) {
        return {
            id: result.id,
            text: result.name
        };
    }));

    $($detailContainer).empty();
}

var $detailContainer = $('<div>'),
    $albumsContainer = $('<div>').attr('id', 'albumsContainer').append($(resultsAlbums.element));

$('body').append([$(search.element), 
    $(resultsArtists.element),
    $albumsContainer,
    $(resultsTracks.element),
    $($detailContainer)]
);

