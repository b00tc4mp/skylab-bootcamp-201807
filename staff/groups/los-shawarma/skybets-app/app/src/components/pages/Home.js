import React, {Component} from 'react'
import SearchCardFlights from '../cards/SearchCardFlights'
import logic from '../../logic'
//import FlightResults from '../cards/FlightResults'
import ResultsSlider from '../cards/ResultsSlider'
import FlightCard from '../cards/FlightCard'
import BetCard from '../cards/BetCard'
import BetPriceCard from '../cards/BetPriceCard';
import FavCard from '../cards/FavCard';

class Home extends Component {

    state = {
        /*selectedFrom : null,
        selectedTo : null,
        dateFrom : null,
        dateTo : null,*/
        flights: [],
        bets: [],
        currentPrice: null,
        currentOdds: null,
        currentBet: null,
        currentFlight: null

    }

    keepCurrentPrice = ({ price: currentPrice }) => {

        this.setState({ currentPrice })
    }

    keepCurrentOdds = ({ odds: currentOdds }) => this.setState({ currentOdds })
    keepCurrentFlight = currentFlight => {
        
        this.setState({ currentFlight })
    }
    
    
    keepCurrentBet = currentBet => this.setState({ currentBet })
    
    parseIata = iata => iata.substring(0, 3)

    parseDate = (when) => {
        const date = new Date(Date.parse(when));
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }



    parseDateFromEpoch = (timestamp) => {
        const date = new Date(timestamp*1000)

        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()

        return `${day}/${month}/${year}`
    }

    onSearchFlights = (selectedFrom, selectedTo,  dateFrom, dateTo) => {
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
             //this.setState({currentPrice: filteredFlights[0].price})
             this.setState({currentFlight: filteredFlights[0]})

         })
         .then(logic._callBetsApi)
         .then(bets => {
             const filteredBets = this.filterBetsData(bets);
             this.setState({bets: filteredBets})
             this.setState({currentBet: filteredBets[0]})
         })
         .catch()
    }

    filterFlightsData = (flights) => {
        const filteredFlights = flights.map((flight, index) => ({
            price: flight.conversion.EUR,
            dateFrom: this.parseDateFromEpoch(flight.route[0].aTimeUTC),
            dateTo: this.parseDateFromEpoch(flight.route[1].aTimeUTC),
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

       const {flights, bets, currentPrice, currentOdds, currentBet, currentFlight} = this.state
        
       return(
            <div className="card-deck mx-4">
                <div className="card">
                    <SearchCardFlights onSearchFlightsProp={ this.onSearchFlights } /> 
                </div>
                <div className="card">
                    <ResultsSlider 
                      resultsProp={ flights } 
                      titleProps={ 'Flights' }
                      onPageChangedProp={ this.keepCurrentFlight }
                      render={ currentFlight => <FlightCard flightsProp={currentFlight}/> }
                    />
                </div>
                <div className="card">
                     <ResultsSlider 
                        resultsProp={ bets } 
                        titleProps={ 'Bets' }
                        //onPageChangedProp={ this.keepCurrentOdds }
                        onPageChangedProp={ this.keepCurrentBet }
                        render={ currentBet => <BetCard betsProp={currentBet}/> }
                    />
                </div>
                <div className="card">
                    <BetPriceCard currentPriceProp={currentPrice} currentOddsProp={currentOdds}/>  
                </div>
                <div>
                    {(currentFlight && currentBet) && <FavCard 
                        currentPriceProp={currentPrice} 
                        currentOddsProp={currentOdds}
                        currentFlightProp={currentFlight}
                        currentBetProp={currentBet}
                     />}
                 </div>
            </div>

        )
    }

}



export default Home