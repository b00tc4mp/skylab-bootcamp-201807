import React, {Component} from 'react'
import SearchCardFlights from '../cards/SearchCardFlights'
import logic from '../../logic'
//import FlightResults from '../cards/FlightResults'
import ResultsSlider from '../cards/ResultsSlider'
import FlightCard from '../cards/FlightCard'

class Home extends Component {

    state = {
        /*selectedFrom : null,
        selectedTo : null,
        dateFrom : null,
        dateTo : null,*/
        flights: []
    }
    
    parseIata = iata => iata.substring(0, 3)

    parseDate = (when) => {
        const date = new Date(Date.parse(when));
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }

    getDataInputs = (selectedFrom, selectedTo,  dateFrom, dateTo) => {
        /*this.setState({
            selectedFrom,
            selectedTo,
            dateFrom,
            dateTo
        })*/

        const fromIata = this.parseIata(selectedFrom)
        const toIata = this.parseIata(selectedTo)
        const inputDateFrom = this.parseDate(dateFrom)
        const inputDateTo = this.parseDate(dateTo)

        logic._callKiwiApi(fromIata, toIata, inputDateFrom, inputDateTo)
        .then(flights => {
            const filteredFlights = this.filterFlightsData(flights);
            this.setState({flights: filteredFlights})
        })
        .catch()
    }

    filterFlightsData = (flights) => {
        const filteredFlights = flights.map((flight, index) => ({
            price: flight.conversion.EUR,
            dateFrom: flight.route[0].aTimeUTC,
            dateTo: flight.route[1].aTimeUTC,
            cityFrom: flight.route[0].cityFrom,
            cityTo: flight.route[0].cityTo,
            flyFrom: flight.route[0].flyFrom,
            flyTo: flight.route[0].flyTo,
            link: flight.deep_link,
            id: index,
          }));

        return filteredFlights
    }
    
    
    render() {

        const {flights} = this.state

        return(
            <main>
                <h1>Home Page</h1>
                <SearchCardFlights getDataInputsProp={ this.getDataInputs } /> 
                {/*flights.length > 0 && <FlightResults flightsProp={flights}/>*/} 
                <ResultsSlider 
                    resultsProp={flights} 
                    titleProps={'Flights'}
                    render={ currentFlight => <FlightCard flightsProp={currentFlight}/> }
                />        
            </main>
        )
    }

}



export default Home