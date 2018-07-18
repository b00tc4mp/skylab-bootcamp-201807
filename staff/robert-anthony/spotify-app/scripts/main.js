"use strict"

var log = console.log.bind(console);

var _audio = null;


function clearAudio() {
  if (_audio) {
    _audio.pause();
    _audio = null;
  }
}


function ClassedComponent(cssClass, tag) {
  Component.call(this, tag);
  this.$element.addClass(cssClass);
}

ClassedComponent.prototype = Object.create(Component.prototype);
ClassedComponent.prototype.constructor = ClassedComponent;


var mainContainer = new ClassedComponent("main-container");
$('body').append(mainContainer.element);


var searchPanel = new SearchPanel("Search for Artists", "search-panel", "section");
mainContainer.$element.append(searchPanel.element);
searchPanel.onSearch(doArtistSearch);


var resultsList = new ResultsList("detail-panel-artists");
mainContainer.$element.append(resultsList.element);
resultsList.onElementClick(showArtistAlbums);

var albumsDetail = new ResultsList("detail-panel-albums");
mainContainer.$element.append(albumsDetail.element);
albumsDetail.onElementClick(showAlbumTracks);


var tracksDetail = new TrackDetailPanel("detail-panel-tracks","detail-panel__link--selected");
mainContainer.$element.append(tracksDetail.element);
tracksDetail.onElementClick(showTrackInfo);


function doArtistSearch(query) {
  TweenMax.to(albumsDetail.element, 0.25, {autoAlpha: 0});
  TweenMax.to(tracksDetail.element, 0.25, {autoAlpha: 0});
  clearAudio();

  // var field = checkboxes.getField();
  logic.searchArtists(query).then(function (artists) {
    if (artists) {
      resultsList.setData(artists);
    }
  });
}


function showAlbumTracks(albumData) {
  clearAudio();
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
    }).catch(function(err) {
      console.log("There was a problem in retrieving the album's tracks",err);
  });
}

function showArtistAlbums(artistData) {
  TweenMax.to(tracksDetail.element, 0.25, {autoAlpha: 0});
  clearAudio();
  logic.retrieveAlbumsByArtistId(artistData.id).then(function (albums) {
    var albumList = albums.map(function (album) {
      return {name: album.name, id: album.id};
    });
    albumsDetail.setData(albumList);
    TweenMax.to(albumsDetail.element, 0.25, {autoAlpha: 1});
  });

}


function showTrackInfo(trackData) {
  logic.retrieveTrackById(trackData.id).then(function (trackData) {
    clearAudio();

    if (trackData && trackData.preview_url) {
      _audio = new Audio(trackData.preview_url);
      _audio.play();
    }
  });

}

logic.token = "BQDpnaofHTM05kO6K5mrXWeX36itnfWWfxExzgeTuPZQa8c4VbRzwbrUPl1PlHnXRlR5TEvhKs7yzmPQfr5dIfjf8WDuzE0TuwCwPj4Uqc0KYLgHNne9Pd3Cq602fMJjF80aKxI-rwBe";

