"use strict"

var log = console.log.bind(console);



function clearLinks() {
  $('tracksDetail .detail-panel__link--selected').removeClass('.detail-panel__link--selected');

}






var searchPanel = new SearchPanel("Search for Artists", "search-panel", "section");
$('body').append(searchPanel.element);
searchPanel.onSearch(doArtistSearch);

var mainContainer = new MainContainer("main-container");
$('body').append(mainContainer.element);

var resultsList = new ResultsList("detail-panel-artists","Artists");
//$(mainContainer.element).append(resultsList.element);
mainContainer.addInto(resultsList.element,"artistResults");
resultsList.onElementClick(showArtistAlbums);

var albumsDetail = new ResultsList("detail-panel-albums","Albums");
// $(mainContainer.element).append(albumsDetail.element);
mainContainer.addInto(albumsDetail.element,"albumResults");

albumsDetail.onElementClick(showAlbumTracks);


var tracksDetail = new TrackDetailPanel("detail-panel-tracks", "detail-panel__link--selected");
// $(mainContainer.element).append(tracksDetail.element);
mainContainer.addInto(tracksDetail.element,"trackResults");

tracksDetail.onElementClick(showTrackInfo);
var audioComponent = new AudioComponent('audio-component');
tracksDetail.$element.append(audioComponent);


function doArtistSearch(query) {
  audioComponent.clear();
clearLinks();
  TweenMax.to(albumsDetail.element, 0.25, {autoAlpha: 0});
  TweenMax.to(tracksDetail.element, 0.25, {autoAlpha: 0});

  // var field = checkboxes.getField();
  logic.searchArtists(query).then(function (artists) {
    if (artists) {
      resultsList.setData(artists);
    }
  });
}


function showAlbumTracks(albumData) {
  audioComponent.clear();
  clearLinks();
  var albumRetrieved;
  TweenMax.to(tracksDetail.element, 0.25, {autoAlpha: 0});
  logic.retrieveAlbumById(albumData.id)
    .then(function (album) {
      albumRetrieved = album;
    })
    .then(function () {
      return logic.retrieveTracksByAlbumId(albumData.id)
    })
    .then(function (tracks) {
      var trackList = tracks.map(function (track) {
        return {name: track.name, id: track.id};
      });
      tracksDetail.setData(albumRetrieved.name, trackList, albumRetrieved.images[1].url);
      TweenMax.to(tracksDetail.element, 0.25, {autoAlpha: 1});
    }).catch(function (err) {
    console.log("There was a problem in retrieving the album's tracks", err);
  });
}

function showArtistAlbums(artistData) {
  audioComponent.clear();
  clearLinks();
  TweenMax.to(tracksDetail.element, 0.25, {autoAlpha: 0});
  logic.retrieveAlbumsByArtistId(artistData.id).then(function (albums) {
    var albumList = albums.map(function (album) {
      return {name: album.name, id: album.id};
    });
    albumsDetail.setData(albumList);
    TweenMax.to(albumsDetail.element, 0.25, {autoAlpha: 1});
  });

}


function showTrackInfo(trackData) {
  audioComponent.clear();
  clearLinks();
  logic.retrieveTrackById(trackData.id).then(function (trackData) {
    if (trackData && trackData.preview_url ) {
     audioComponent.setSourceAndPlay(trackData.preview_url);
    }
  });

}

logic.token = "BQDslmGcR4Zh809nzNkrkxbmXt-Aqx1zQHVk4Y2xnWoArHJv84HBBVuvIcQOwg-st04zdGISIYYON6E8lIwkXwmwTtlpNY-lZsKlBKfCwyQ_Dogxpvo6trFU7YsGyQt9fnM_WshUfK1Z";

