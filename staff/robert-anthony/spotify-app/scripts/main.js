"use strict"

var log = console.log.bind(console);

var _audio = null;


function clearAudio() {
  if (_audio) {
    _audio.pause();
    _audio = null;
  }
}





var mainContainer = new ClassedComponent("mainContainer");
document.body.appendChild(mainContainer.element);


var searchPanel = new SearchPanel("Search for Artists", "searchPanel", "section");
mainContainer.element.appendChild(searchPanel.element);
searchPanel.onSearch(doArtistSearch);


var resultsList = new ResultsList("resultsList");
mainContainer.element.appendChild(resultsList.element);
resultsList.onElementClick(showArtistAlbums);

var albumsDetail = new ResultsList("albumsDetail");
mainContainer.element.appendChild(albumsDetail.element);
albumsDetail.onElementClick(showAlbumTracks);


var tracksDetail = new TrackDetailPanel("tracksDetail");
mainContainer.element.appendChild(tracksDetail.element);
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
  console.log(albumData);
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

logic.token = "BQB7RV6HZCj0ur4FdKL4YVBjLKRvwypn1Gfcp5p6Yn680ujVhdEoE9ddhXRyxmCKHq3pkm_4_3WflEvJnjTE4W-N_oKZKetl71RMR-mjvZJo3yCqwaIKsxm73BTAIlPSiCReqzmck_xy";

