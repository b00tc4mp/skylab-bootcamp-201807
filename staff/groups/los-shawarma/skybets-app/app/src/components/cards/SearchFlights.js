import React, {Component} from 'react'
import AutocompleteAsync from '../materialUI/AutocompleteAsync'
import DatePicker from 'material-ui-pickers/DatePicker';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

class SearchFlights extends Component {

    state = {
        selectedFrom : null,
        selectedTo : null,
        dateFrom : new Date(),
        dateTo : new Date()
    }

    onSelectedFrom = option => this.setState({ selectedFrom: option })
    onSelectedTo = option => this.setState({ selectedTo: option })

    onDateFrom = date => this.setState({ dateFrom: date })
    onDateTo = date => this.setState({ dateTo: date })

    render() {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <section>
                <label>From</label>
                <AutocompleteAsync onSelectedOption={this.onSelectedFrom}/>
                <label>To</label>
                <AutocompleteAsync onSelectedOption={this.onSelectedTo}/>
                <label>Departure date</label>
                <DatePicker value={this.state.dateFrom} onChange={this.onDateFrom} />
                <label>Return date</label>
                <DatePicker value={this.state.dateTo} onChange={this.onDateTo} />
                <button>Search</button>  
            </section>
            </MuiPickersUtilsProvider>
        )
    }

}

export default SearchFlights