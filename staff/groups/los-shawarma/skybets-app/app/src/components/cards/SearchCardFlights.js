import React, {Component} from 'react'
import AutocompleteAsync from '../materialUI/AutocompleteAsync'
import DatePicker from 'material-ui-pickers/DatePicker'
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils'
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'
import SearchAutocomplete from '../materialUI/SearchAutocomplete'

class SearchCardFlights extends Component {

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

    handleOnclick = () => {
        this.props.onSearchFlightsProp(
            this.state.selectedFrom, 
            this.state.selectedTo, 
            this.state.dateFrom, 
            this.state.dateTo
        )
    }
    
    render() {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div>
                <div className="card-body">
                    <div><label>From</label></div>
                    <AutocompleteAsync onSelectedOption={this.onSelectedFrom}/>
                    <div><label>To</label></div>
                    <AutocompleteAsync onSelectedOption={this.onSelectedTo}/>
                    {/*<SearchAutocomplete onSelectedOption={this.onSelectedTo}/>*/}
                    <div><label>Departure date</label></div>
                    <DatePicker value={this.state.dateFrom} onChange={this.onDateFrom} />
                    <div><label>Return date</label></div>
                    <DatePicker value={this.state.dateTo} onChange={this.onDateTo} />
                    <div>
                        <button onClick={this.handleOnclick}>Search</button>  
                    </div> 
                </div>
            </div>
            </MuiPickersUtilsProvider>
        )
    }

}

export default SearchCardFlights