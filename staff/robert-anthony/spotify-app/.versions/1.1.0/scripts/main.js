"use strict"

var log = console.log.bind(console);

var _audio = null;


function clearAudio() {
  console.log("pausing audio?",_audio)

  if (_audio) {
    _audio.pause();
    _audio = null;
  }
}

function clearLinks() {
  $('tracksDetail .detail-panel__link--selected').removeClass('.detail-panel__link--selected');

}




var mainContainer = new ClassedComponent("main-container");
$('body').append(mainContainer.element);


var searchPanel = new SearchPanel("Search for Artists", "search-panel", "section");
$(mainContainer.element).append(searchPanel.element);
searchPanel.onSearch(doArtistSearch);


var resultsList = new ResultsList("detail-panel-artists");
$(mainContainer.element).append(resultsList.element);
resultsList.onElementClick(showArtistAlbums);

var albumsDetail = new ResultsList("detail-panel-albums");
$(mainContainer.element).append(albumsDetail.element);
albumsDetail.onElementClick(showAlbumTracks);


var tracksDetail = new TrackDetailPanel("detail-panel-tracks","detail-panel__link--selected");
$(mainContainer.element).append(tracksDetail.element);
tracksDetail.onElementClick(showTrackInfo);


function doArtistSearch(query) {
  clearAudio();
  clearLinks();
  TweenMax.to(albumsDetail.element, 0.25, {autoAlpha: 0});
  TweenMax.to(tracksDetail.element, 0.25, {autoAlpha: 0});

  // var field = checkboxes.getField();
  index.searchArtists(query).then(function (artists) {
    if (artists) {
      resultsList.setData(artists);
    }
  });
}


function showAlbumTracks(albumData) {
  clearAudio();
  clearLinks();
  var albumRetrieved;
  TweenMax.to(tracksDetail.element, 0.25, {autoAlpha: 0});
  index.retrieveAlbumById(albumData.id)
    .then(function (album) {
      albumRetrieved = album;
    })
    .then(function () {
      return index.retrieveTracksByAlbumId(albumData.id)
    })
    .then(function (tracks) {
      var trackList = tracks.map(function (track) {
        return {name: track.name, id: track.id};
      });
      tracksDetail.setData(albumRetrieved.name, trackList, albumRetrieved.images[1].url);
      TweenMax.to(tracksDetail.element, 0.25, {autoAlpha: 1});
    }).catch(function(err) {
      console.log("There was a problem in retrieving the album's tracks",err);
  });
}

function showArtistAlbums(artistData) {
  clearAudio();
  clearLinks();
  TweenMax.to(tracksDetail.element, 0.25, {autoAlpha: 0});
  index.retrieveAlbumsByArtistId(artistData.id).then(function (albums) {
    var albumList = albums.map(function (album) {
      return {name: album.name, id: album.id};
    });
    albumsDetail.setData(albumList);
    TweenMax.to(albumsDetail.element, 0.25, {autoAlpha: 1});
  });

}


function showTrackInfo(trackData) {
  clearAudio();
  clearLinks();
  index.retrieveTrackById(trackData.id).then(function (trackData) {

    if (trackData && trackData.preview_url) {
      _audio = new Audio(trackData.preview_url);
      _audio.play();
    }
  });

}

index.token = "BQCHPUpfXWwmb5M_LTk9kBS2sh8Q361Auv5KUP97WIrEQ2aDfr42TqrIcEy7t56EpI0QJxVrCEnjwuT1m02mme9JFddko-jE0iOVFigFL9nyH2UA4E8a6OTdB1ejW2uxB1O1DaKg_Iac";

