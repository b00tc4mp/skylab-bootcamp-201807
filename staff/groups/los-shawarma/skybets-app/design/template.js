const logic = {


    //Call to api
    _callKiwiApi(fromIata, toIata, returnFrom = "29/03/2019", returnTo = "02/04/2019", directFlights = 0, partner = "picky", priceFrom = 1) {
        return fetch(`https://api.skypicker.com/flights?flyFrom=${fromIata}&to=${toIata}&returnFrom=${returnFrom}&returnTo=${returnTo}&directFlights=${directFlights}&partner=${partner}&price_from=${priceFrom}`)
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error('request error, status ' + res.error.status);

                return res;
            });
    },

    getIataFrom() {
        fetch('https://api.skypicker.com/locations?type=dump&locale=en-US&location_types=airport&limit=10')
            .then(res => res.json())
            .then(res => {
               Array.from(document.getElementsByClassName('airports')).forEach(
                    function (element) {
                        return res.locations.map(airport => {
                            var option = document.createElement("option")
                            option.value = airport.id
                            option.text = `${airport.name} (${airport.id})`
                            element.appendChild(option)
                        })
                    }
                )
            })
    },

    getFlights(e) {
        e.preventDefault()
        var fromIata = document.getElementsByClassName('airports')[0].value
        var toIata = document.getElementsByClassName('airports')[1].value

        return this._callKiwiApi(fromIata, toIata)
            .then(res => {
                document.getElementById('flightPriceFrom').innerText = "Price: " + res.data[0].conversion.EUR + '€';
                document.getElementById('routeFrom').innerText = 'From: ' + res.data[0].routes[0][0] + ' - ' + res.data[0].routes[0][1];
                document.getElementById('routeTo').innerText = 'To: ' + res.data[0].routes[1][0] + ' - ' + res.data[0].routes[1][1];
                document.getElementById('flightAirlines').src = `https://images.kiwi.com/airlines/64/${res.data[0].airlines[0]}.png`
                console.log(res.data[0])
            })
    },






    // printRoute() {
    //     this._callKiwiApi()
    //         .then(res => {
    //             // document.getElementById('currencyKiwi').innerText = res.currency;
    //             // document.getElementById('destination').innerText = res.data[0].cityTo;
    //             console.log(res.data[0].routes[0])

    //         })


    // }






};

logic.getIataFrom()


// logic.printRoute();