import React, {Component} from 'react'
import SearchCardFlights from '../cards/SearchCardFlights'
import logic from '../../logic'
//import FlightResults from '../cards/FlightResults'
import ResultsSlider from '../cards/ResultsSlider'
import FlightCard from '../cards/FlightCard'
import BetCard from '../cards/BetCard'

class Home extends Component {

    state = {
        /*selectedFrom : null,
        selectedTo : null,
        dateFrom : null,
        dateTo : null,*/
        flights: [],
        bets: [],
        currentFlight: null,
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
        .then(logic._callBetsApi)
        .then(bets => {
            const filteredBets = this.filterBetsData(bets);
            this.setState({bets: filteredBets})
        })
        .catch()
    }

    filterFlightsData = flights => {
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

    filterBetsData = bets => {
        const filteredBets = bets.map((bet, index) => ({
            competition: bet.competition, 
            date: bet.date, 
            time: bet.time, 
            teams: bet.team, 
            link: bet.url, 
            odds: bet.odds, 
            results: bet.results,
            id: index,
        }));

        return filteredBets
    }
    
    
    render() {

        const {flights, bets} = this.state

        return(
            <main>
                <h1>Home Page</h1>
                <SearchCardFlights getDataInputsProp={ this.getDataInputs } /> 
                {/*flights.length > 0 && <FlightResults flightsProp={flights}/>*/} 
                <ResultsSlider 
                    resultsProp={ flights } 
                    titleProps={ 'Flights' }
                    render={ currentFlight => <FlightCard flightsProp={currentFlight}/> }
                />
                <ResultsSlider 
                    resultsProp={ bets } 
                    titleProps={ 'Bets' }
                    render={ currentBet => <BetCard betsProp={currentBet}/> }
                /> 
            </main>
        )
    }

}



export default Home