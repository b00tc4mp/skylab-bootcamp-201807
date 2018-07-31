import React, {Component} from 'react'
import WithCallbacks from '../materialUI/WithCallbacks'
import DatePickers from '../materialUI/DatePickers'

class SearchFlights extends Component {

    state = {
        inputFrom : null,
        inputTo : null,
        dateFrom : null,
        dateTo : null
    }

    render() {
        return (
            <section>
                <form>
                    <label>From</label>
                    <WithCallbacks/>
                    <label>To</label>
                    <WithCallbacks/>
                    <label>Departure date</label>
                    <DatePickers/>
                    <label>Return date</label>
                    <DatePickers/>    
                </form>
            </section>
        )
    }

}

export default SearchFlights