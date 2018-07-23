var spotifyApiClient = {
    _accessToken: '',

    _buildUri: function(parameters) {
        var uri = '';
        for (var key in parameters) {
          if (parameters.hasOwnProperty(key)) {
            var value = parameters[key];
            uri += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
          }
        }
        if (uri.length > 0) {
          uri = uri.substring(0, uri.length - 1);
        }
        return uri;
    },

    _requestAsync: function(method, url, options) {
        
        var options = options || {};

        return new Promise(function(resolve, reject) {
            
            var request = new XMLHttpRequest();

            request.open(method, url, true);

            if (options.hasOwnProperty('headers')) {
                var headers = options.headers;
                for (var key in headers) {
                    if (headers.hasOwnProperty(key)) {
                        var value = headers[key];
                        request.setRequestHeader(key, value);
                    }
                }
            }

            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    console.log(request);
                    if (request.status === 200) {
                        var res = JSON.parse(request.responseText);
                        resolve(res);
                    }
                    else {
                        reject(Error('request error, status ' + request.status));
                    }
                }
            };

            var uri = '';
            if (options.hasOwnProperty('body')) {
                uri = this._buildUri(options.body);
            }
            request.send(uri);

        }.bind(this));
    },

    getAccessToken: function(clientId, clientSecret) {

        var url = 'https://accounts.spotify.com/api/token';
        var options = {
            headers: { 
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: { 'grant_type': 'client_credentials' }
        };
        return this._requestAsync('POST', url, options)
            .then(function(result) {
                this._accessToken = result.access_token;
                return result;
            }.bind(this));
    },
};