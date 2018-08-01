import React, { Component } from 'react'
import AsyncSelect from 'react-select/lib/Async'
import airports from '../../Resources/airport'


const filterAirports = (inputValue) =>
    airports.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()) 
)

const loadOptions = (inputValue, callback) => {
  setTimeout(() => {
    callback(filterAirports(inputValue));
  }, 300)
}

class AutocompleteAsync extends Component {
    state = {
        inputValue: null,
    }

    handleInputChange = (newValue) => {
        const inputValue = newValue.replace(/\W/g, '')
        this.setState({ inputValue })

        return inputValue
    }

    handleChange = ({label}) => this.props.onSelectedOption(label)

    render() {
      return (
        <div>
            <AsyncSelect
            cacheOptions
            loadOptions={loadOptions}
            defaultOptions
            onInputChange={this.handleInputChange}
            onChange={this.handleChange}
          />
        </div>
      )
    }
  }

  export default AutocompleteAsync