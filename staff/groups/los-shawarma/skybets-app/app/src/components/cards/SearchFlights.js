import React, {Component} from 'react'
import AutocompleteAsync from '../materialUI/AutocompleteAsync'
import DatePickers from '../materialUI/DatePickers'

class SearchFlights extends Component {

    state = {
        selectedFrom : null,
        selectedTo : null,
        dateFrom : null,
        dateTo : null
    }

    onSelectedFrom = option => this.setState({selectedFrom: option})
    onSelectedTo = option => this.setState({selectedTo: option})

    render() {
        return (
            <section>
                <label>From</label>
                <AutocompleteAsync onSelectedOption={this.onSelectedFrom}/>
                <label>To</label>
                <AutocompleteAsync onSelectedOption={this.onSelectedTo}/>
                <label>Departure date</label>
                <DatePickers/>
                <label>Return date</label>
                <DatePickers/>    
            </section>
        )
    }

}

export default SearchFlights