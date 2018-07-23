
function TopContainer() {

    this.element = document.createElement('section');

    // header
    var header = document.createElement('header');
    header.id = 'sidebar';

    var logo = document.createElement('img');
    logo.id = 'logo';
    logo.src = 'assets/img/logo.png';
    logo.alt = 'SpotifyApp';

    header.appendChild(logo);

    this.element.appendChild(header);

    // main
    var main = document.createElement('main');

    this.element.appendChild(main);

    document.body.appendChild(this.element);
}

function Footer() {
    this.element = document.createElement('footer');
}


logic.token = 'BQDL0jDrwJ-JeYx6_sGUsi9MvgwYuFbZ4H5epnFie0a1AUqPEZxDNUsP3D3ypr_NfBWLe34i0UwwxCFoHeU';

var ERROR_MESSAGE = 'Sorry, we have temporary problem, try again later.';
var DEFAULT_ARTIST_IMG = 'assets/img/default-artist.png';

// layout

var topContainer = new TopContainer();
var footer = new Footer();

document.body.appendChild(topContainer.element);
document.body.appendChild(footer.element);

var header = topContainer.element.querySelector('header');
var main = topContainer.element.querySelector('main');

// components

var siteNav = new SiteNav();
var recentlyPlayed = new RecentlyPlayed();
var search = new Search();
var artistList = new ArtistList();

header.appendChild(siteNav.element);
header.appendChild(recentlyPlayed.element);

main.appendChild(search.element);
main.appendChild(artistList.element);

search.onSearch(function(query) {
    
    logic.searchArtists(query)
        .then(function (artists) {

            artistList.updateResults(artists.map(function(artist) {
                
                var props = {
                    id: artist.id,
                    title: artist.name,
                    imageSource: (artist.images && artist.images[1]) ? artist.images[1].url : DEFAULT_ARTIST_IMG
                };
                var artistListItem = new ArtistListItem(props);

                artistListItem.onClick(function(artistId) {
                    alert(artistId);
                });

                return artistListItem;
            }));
        })
        .catch(function (error) {
            alert(ERROR_MESSAGE);
        });
});








