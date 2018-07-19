var solucion = null;

var logic = {
    token: 'BQD6BtNzJP2UZoThEKsixCYszymQQ4-pSLRD_xag9uH84KcjpvliXCf_A3DDc82TRgtfXwrC-OB7CHTaoMR5UgIn340wh0CFbnZYKOAxjCG-Z_OowdHNU3kGAtGPQJvPWwhD_vYBU2iZXOfeMwJMIHIOImc5ERlW_7sqbntiQVQ2Jz8-',
    
    _callApi: function (path) {
        return new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest();

            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        var res = JSON.parse(request.responseText);

                        resolve(res);
                    } else reject(Error('request error, status ' + request.status));
                }
            };

            var url = 'https://api.spotify.com/v1' + path;

            request.open('get', url);

            request.setRequestHeader('Authorization', 'Bearer ' + this.token);


            request.send();
        }.bind(this));

    },

    

    callme: function (path) {
            
            
            var result = false;
            $.ajax({
            url: 'https://api.spotify.com/v1/search?type=artist&query=' + path,
            method: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer BQCjLUZ1tEwVwjRhtsre86vB_fUJFCjRTiKL5z8l7SAujjUc3_zDhwywy8yP3CIM6HU154_4W0Xvgr-MZiWBPHy0Nxu5hszRaoFraH6qaOmxtV0mR7HcfRv5-Xh2Ou2nDaoLT5zn_vEecntt6qFXWUKPahirEbGldrON_3xQ2BoqpNWR');
            },
            succes: (function (responseText){ 
                result = responseText;
                }),
            error: (function (error) {console.log(error)}),
            
        
        //.then(alert(data))
        //.then(function(data){console.log(data.artists)})
        //.catch(function(error){console.log(error)})
        
    })
        return result;
    },

    resultsAjax: function (){
        
        var request = $.ajax({
            method: "GET",
            beforeSend: function (xhr) {
                          xhr.setRequestHeader('Authorization', 'Bearer BQDiwy9s1HuoILhD-jayodk_FJEdpPVTG57s76gLuFit9SFXu1P6B9e1UVUCjatv9yEP5hLB6SrvMUYSTcsHBce1kD9JJ4xeakJTFJywQdvs0Qs8h7UII5bh1N1sRSMZH5jYWpIk_YtOwROtvt_O5zTX2y3csbYk3n7ek26r9lhQfMYe');
                      },
            url: `https://api.spotify.com/v1/search?type=artist&query=acdc`
          }).done(function(data) {
           console.log(data)
            //console.log(data);
          }).then(function (a){
              return a;
          })
          //res = request;
          //debugger;
          //alert("hi"+res1);
          //return request;
         
    },

    callmebaby : function(){
        console.log (this.resultsAjax())
    },

       
    /*$.ajax({
            type: 'GET',
            url: 'https://api.spotify.com/v1/search?type=artist&query=' + path,
            success: function(orders){
                console.log(orders)
            }
        })*/

    /*
    _callAjax: function (path) {
        var url = "https://api.spotify.com/v1/search?type=artist&query=" + path;
        return $.ajax(url)
        .then (function (res) {console.log(res)}) 
        .catch(function (error) {console.log(error)});
        
    },
    */
    
    
    searchArtists: function (query) {
        return this._callApi('/search?type=artist&query=' + query)
            .then(function(res) {
                //console.log(res.artists.items)
                return res.artists.items;
            //.then(console.log(res.artists.items))    
            });
    },

    retrieveAlbumsByArtistId(id) {
        return this._callApi('/artists/' + id + '/albums')
            .then(function(res) {
                return res.items;
            });
    },

    retrieveTracksByAlbumId(albumId) {
        return this._callApi('/albums/' + albumId + '/tracks')
            .then(function(res) {
                return res.items;
            });
    },

    retrieveTrackById(trackId) {
        return this._callApi('/tracks/' + trackId  + '/')
            .then(function(res) {
                return res.items;
            });
    },

    playTrackById(id){
        return ('<iframe src="https://open.spotify.com/embed?uri=spotify:track:'+ id+'" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>')
    }
};


//"7vTCGXUv3XOKScExgMtmel"