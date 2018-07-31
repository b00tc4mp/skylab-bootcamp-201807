
const logic = {

    unsplashAccessKey: null,

    _callUnsplashApi(path) {
        return fetch('https://api.unsplash.com' + path, {
            headers: {
                authorization: 'Client-ID ' + this.unsplashAccessKey
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.errors) throw Error('request error ' + res.errors.join(', '));

                return res;
            });
    },

    // unsplash

    searchPhotos(query, page = 1) {
        return this._callUnsplashApi(`/search/photos?query=${query}&page=${page}`)
            .then(res => res)
    },

    retrievePhotoById(id) {
        return this._callUnsplashApi('/photos/' + id)
            .then(res => res)
    },

    retrieveRelatedPhotosByPhotoTags(tags) {
        return this.searchPhotos(tags.join(' '))
            .then(res => res)
    },

    retrievePopularPhotos(page = 1) {
        return this._callUnsplashApi(`/photos?order_by=popular&page=${page}`)
            .then(res => res)
    }

    // retrieveAlbumsByArtistId(id) {
    //     return this._callSpotifyApi('/artists/' + id + '/albums')
    //         .then(res => res.items)
    // },

    // retrieveTrackById(id) {
    //     return this._callSpotifyApi('/tracks/' + id)
    // }
};

//export default logic;
if (typeof module !== 'undefined') module.exports = logic;