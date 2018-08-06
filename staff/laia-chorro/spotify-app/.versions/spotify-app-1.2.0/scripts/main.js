'use strict'

var search = new SearchNavBar(),
    resultsArtists = new ResultsList('artists-container', 'Artists'),
    resultsAlbums = new ResultsList('albums-container', 'Albums'),
    resultsTracks = new ResultsList('tracks-container', 'Tracks'),
    ERROR_MSG = 'Sorry, we have temporary problem, try again later.';

//Create List of artists by query from the input search
search.onSearch(function (query) {
    $resultsContainer.empty().append($(resultsArtists.element));

    $.when(logic.searchArtists(query))
    .then(function (artists) { updateResultsByIdAndName(resultsArtists, artists); })
    .catch(function (error) { console.error(ERROR_MSG, error); });
});

//Create List of albums by artist
resultsArtists.onItemClick(function (id, text) {
    var $h1 = $('<h1>').text(text),
        $a = $('<a>').append($h1).attr({'href': '#/' + id, 'data-id': id});
    $resultsContainer.empty().append([$a, $(resultsAlbums.element)]);

    $.when(logic.retrieveAlbumsByArtistId(id))
    .then(function (albums) { updateResultsByIdAndName(resultsAlbums, albums); })
    .catch(function (error) { console.error(ERROR_MSG, error); });
});


//Create List of tracks by albums
resultsAlbums.onItemClick(function (id, text) {
    var $h1 = $('<h1>').text(text),
        $a = $('<a>').append($h1).attr({'href': '#/' + id, 'data-id': id});
    $resultsContainer.empty().append([$a, $(resultsTracks.element)]);

    $.when(logic.retrieveTracksByAlbumId(id))
    .then(function (tracks) { updateResultsByIdAndName(resultsTracks, tracks); })
    .catch(function (error) { console.error(ERROR_MSG, error); }); 
});

//List detail of track
resultsTracks.onItemClick(function (id, text, activeListItem) {
    $resultsContainer.append($detailContainer);
    activateTrackWhenClick(activeListItem);

    $.when(logic.retrieveTrackById(id))
    .then(function (track) {
        var detail = new EmbedPanel(track.name, track.id);
        $detailContainer.html($(detail.element));
    })
    .catch(function (error) { console.error(ERROR_MSG, error); });
});

function updateResultsByIdAndName(resultList, results) {
    resultList.updateResults(results.map(function (result) {
        return {
            id: result.id,
            text: result.name,
            img: result.images && result.images[1]? result.images[1].url : false,
        };
    }));
}

function activateTrackWhenClick(activeListItem) {
    $('.tracks-container li').removeClass('active');
    $(activeListItem[0]).addClass('active');
}

var $resultsContainer = $('<div>').attr('id', 'results-container').addClass('results-container'),
    $detailContainer = $('<div>').addClass('detail-container');

$('body').append([$(search.element), $resultsContainer]);

