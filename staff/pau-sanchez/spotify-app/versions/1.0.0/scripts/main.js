// my presentation logic

// optional, reduce the size of the restaurants loaded in memory
// restaurants.splice(100);

var search = new SearchPanel();
/*
search.onSearch(function (query) {
    
    logic.searchArtists(query, function (error, artists) {
        console.log("hi");
        if (error) alert('Sorry, we have temporary problem, try again later.');
        else 
             results.updateResults(artists.map(function (artist) {
                    return {
                        //id: artist.id,
                        text: artist.name
                    };
                }));
   });


    detailContainer.clear();
});
*/

search.onSearch(function (query) {
    
    logic.searchArtists(query)
        .then (function (artists) {
            results.updateResults(artists.map(function (artist) {
                    return {
                        id: artist.id,
                        text: artist.name,
                        class: "artist"
                    };
                }));
   });


    detailContainer.clear();
});

var results = new ResultsList();

//var DEFAULT_IMAGE = 'https://i.pinimg.com/originals/37/2a/2d/372a2d5e8a32991bb19982271d0762fe.jpg';

//


results.onItemClick(function (id,text,classe) {
    
    debugger;
    if ( classe === "artist") {

        logic.retrieveAlbumsByArtistId(id)
         .then (function (albums){
            results.updateResults(albums.map(function (album) {
                return {
                    id: album.id,
                    text: album.name,
                    class: "album"
                };
         }))
            
        })

    }else if (classe === "album"){

        logic.retrieveTracksByAlbumId(id)
        .then (function (tracks){
           results.updateResults(tracks.map(function (track) {
               return {
                   id: track.id,
                   text: track.name,
                   class: "track"
               };
        }))
           
       })    
    }else if (classe === "track"){
        
        
            
            var detail = new DetailIframe(id);

            detailContainer.clear();
            detailContainer.appendChild(detail.element);
        
    };
            
        
        
    
    
    

    
    });
/*
    results.onItemClick(function (id) {
        logic.retrieveAlbumsByArtistId(id, function (artist) {
            
                var detail = new DetailPanel(artist.name);
    
                detailContainer.clear();
                detailContainer.appendChild(detail.element);
            })
        });
*/   


var detailContainer = document.createElement('div');

detailContainer.clear = function () {
    this.innerHTML = '';
};

document.body.appendChild(search.element);
document.body.appendChild(results.element);
document.body.appendChild(detailContainer);
