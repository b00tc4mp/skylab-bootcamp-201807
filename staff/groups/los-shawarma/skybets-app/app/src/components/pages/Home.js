import React, {Component} from 'react'
import SearchFlights from '../cards/SearchFlights'
import logic from '../../logic'
import FlightResults from '../cards/FlightResults'

class Home extends Component {

    state = {
        selectedFrom : null,
        selectedTo : null,
        dateFrom : null,
        dateTo : null,
        flights: []
    }
    
    parseIata = iata => iata.substring(0, 3)

    parseDate = (when) => {
        const date = new Date(Date.parse(when));
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }


    
       
    
    getDataInputs = (selectedFrom, selectedTo,  dateFrom, dateTo) => {
        this.setState({
            selectedFrom,
            selectedTo,
            dateFrom,
            dateTo
        })

        const fromIata = this.parseIata(selectedFrom)
        const toIata = this.parseIata(selectedTo)
        const inputDateFrom = this.parseDate(dateFrom)
        const inputDateTo = this.parseDate(dateTo)

        logic._callKiwiApi(fromIata, toIata, inputDateFrom, inputDateTo)
        .then(flights => {
            var flights = this.filterFlightsData(flights);
            this.setState({flights: flights})
        })
        .catch()
    }

    filterFlightsData = (flights) => {

        const filteredFlights = []
        flights.forEach(flight => {
            const flightFrom = flight.route[0]
            const flightTo = flight.route[1]
            const filteredFlight= {
                price: flight.conversion.EUR,
                dateFrom: flightFrom.aTimeUTC,
                dateTo: flightTo.aTimeUTC,
                cityFrom: flightFrom.cityFrom,
                cityTo: flightFrom.cityTo,
                flyFrom: flightFrom.flyFrom,
                flyTo: flightFrom.flyTo,
                link: flight.deep_link
            }
            filteredFlights.push(filteredFlight);
        })

        return filteredFlights
    }
    

    
    render() {

        const {flights} = this.state

        return(
            <main>
                <h1>Home Page</h1>
                <SearchFlights getDataInputsProp={ this.getDataInputs } /> 
                {flights.length > 0 && <FlightResults flightsProp={flights}/>}         
            </main>
        )
    }
    
        
    

}



export default Home