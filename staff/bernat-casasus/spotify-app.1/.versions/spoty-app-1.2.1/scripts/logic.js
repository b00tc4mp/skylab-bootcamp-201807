var logic = {
    token: 'BQATbUO4imZQZwA9sjnIpea5hZGr6RlOtJ5cCDaHtzUarThdPGnQrdk3jaWDzJTxC5PrncuTF1qFt35N9Gwqw1gfSd2Yxuib9w9D1nF0ZYSnrTIobWsXYWfH_6ZNodKDRj8uZu6Y0-DrAyMin2yuyO2QwksqfbI8fdk',

    _callApi: async function (path) {
        const response = await fetch('https://api.spotify.com/v1' + path, {
                    headers: {
                        authorization: 'Bearer ' + this.token
                    }
                })
        const data = await response.json()
        return data;
    },

    searchArtists: async function (query) {
        // return this._callApi('/search?type=artist&query=' + query)
        //     .then(function(res) {
        //         return res.artists.items;
        //     });

            const filterArtist = await this._callApi('/search?type=artist&query=' + query);
            return filterArtist.artists.items;
    },

    retrieveAlbumsByArtistId: async function (id) {
        // return this._callApi('/artists/' + id + '/albums')
        //     .then(function(res) {
        //         return res.items;
        //     });

        const filterArtistsId = await this._callApi('/artists/' + id + '/albums');
        return filterArtistsId.items;
    },

    retrieveTracksByAlbumId: async function (id) {
        // return this._callApi('/albums/' + id + '/tracks')
        //     .then(function(res) {
        //         return res.items;
        //     });

        const filterAlbumId = await this._callApi('/albums/' + id + '/tracks');
        return filterAlbumId.items;
    },

    retrieveTrackById: async function (id) {
        // return this._callApi('/tracks/' + id)
        //     .then(function(res) {
        //         return res;
        //     });

        const filterTrackId = await this._callApi('/tracks/' + id);
        return filterTrackId;
    }
};