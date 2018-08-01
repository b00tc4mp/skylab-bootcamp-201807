import React, {Component} from 'react'
import SearchFlights from '../cards/SearchFlights';
import logic from '../../logic'

class Home extends Component {

    state = {
        selectedFrom : null,
        selectedTo : null,
        dateFrom : null,
        dateTo : null
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
    }
    

    
    render() {

        return(
            <main>
                <h1>Home Page</h1>
                <SearchFlights getDataInputsProp={ this.getDataInputs } />            
            </main>
        )
    }
    
        
    

}



export default Home