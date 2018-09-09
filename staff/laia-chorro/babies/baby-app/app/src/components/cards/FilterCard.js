import 'rc-slider/assets/index.css';

import React, {Component} from 'react'
import Slider, { Range } from 'rc-slider';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flexBasis: 200,
    width: 200,
    margin: 20
  },
  card: {
    maxWidth: 300,
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  /*formControlLabel: {
    height: 20,
  },
  radio: {
    height: 20,
  }*/
});

const sliderStyle = { width: 200, margin: '30px 20px' };
const sliderSubHeadingStyle = { fontSize: '0.875rem', marginBottom: '0.1rem' };

const cathegories = [
    { value: 'all', label: 'All Cathegories', },
    { value: 'clothes', label: 'Clothes', },
    { value: 'books', label: 'Books', },
    { value: 'it', label: 'IT', },
    { value: 'car', label: 'Car', },
    { value: 'general', label: 'General', },
  ]



class FilterCard extends Component {

    state = {
        cath: 'all',
        minVal: 0,
        maxVal: 30000,
        dist: 400,
        period: 'any',
        long: -3.70379, 
        lat: 40.416775,
        filters: {}
    };

    onFiltersChange = (propName, prop, defaultVal) => {
        if (prop === defaultVal) {
            delete this.state.filters[propName]
            this.setState({ filters: {...this.state.filters} }, () => this.onGetProductsByFiltersChange())
        } else {
            this.setState({ filters: {...this.state.filters, [propName]: prop} }, () => this.onGetProductsByFiltersChange())
        } 
    }

    onCathegoryChange = prop => event => {
        const cath = event.target.value

        this.setState({ cath })
        this.onFiltersChange('cath', cath, 'all')
    }

    onPriceRangeChange = value => this.setState({ minVal: value[0], maxVal: value[1] })

    onPriceRangeAfterChange = value => {
        const minVal = value[0], maxVal = value[1]

        if (minVal === 0 && maxVal === 30000) {
            delete this.state.filters.minVal
            delete this.state.filters.maxVal
            this.setState({ filters: {...this.state.filters} }, () => this.onGetProductsByFiltersChange())
        } else {
            this.setState({ filters: { ...this.state.filters, minVal, maxVal } }, () => this.onGetProductsByFiltersChange())
        }
    }

    onDistChange = value => this.setState({ dist: value })

    onDistAfterChange = value => {
        //this.onFiltersChange('dist', value, 400)
        const dist = value
        const { long, lat } = this.state

        if (dist === 400) {
            delete this.state.filters.dist
            delete this.state.filters.long
            delete this.state.filters.lat
            this.setState({ filters: {...this.state.filters} }, () => this.onGetProductsByFiltersChange())
        } else {
            this.setState({ filters: { ...this.state.filters, dist, long, lat } }, () => this.onGetProductsByFiltersChange())
        }
    }

    onDateChange = event => {
        const period = event.target.value
        let date = period === 'any' ? period : this.getDateFromSelection(period)

        this.setState({ period })
        
        this.onFiltersChange('date', date, 'any')
    }

    getDateFromSelection = daysToExtract => {
        const today = new Date()
        const dateFrom = today.setDate(today.getDate() - parseInt(daysToExtract))

        return (new Date(dateFrom)).toISOString()
    }

    onGetProductsByFiltersChange = () => this.props.filterProducts(this.state.filters)


    render() {
        const { props: { classes }, state: { cath, minVal, maxVal, dist, period } } = this

       return(
           <div >
                <Card className={classes.card} >
                    <TextField
                        select
                        label="Cathegories"
                        className={classNames(classes.margin, classes.textField)}
                        value={cath}
                        onChange={this.onCathegoryChange('cath')}
                        >
                        {cathegories.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <div style={sliderStyle}>
                        <FormLabel component="legend">Distance</FormLabel>
                        <p style={sliderSubHeadingStyle}>{`${dist}+ Km`}</p>
                        <Slider onChange={this.onDistChange} onAfterChange={this.onDistAfterChange} defaultValue={400} max={400} />
                    </div>

                    <div style={sliderStyle}>
                        <FormLabel component="legend">Price</FormLabel>
                        <p style={sliderSubHeadingStyle}>{minVal === 0 && maxVal === 30000 ? 'Any price' : `${minVal}€ - ${maxVal}€`}</p>
                        <Range onChange={this.onPriceRangeChange} onAfterChange={this.onPriceRangeAfterChange} allowCross={false} defaultValue={[0, 30000]} min={0} max={30000} />
                    </div>

                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Date Range</FormLabel>
                        <RadioGroup
                            aria-label="Date Range"
                            name="Date Range"
                            className={classes.group}
                            value={period}
                            onChange={this.onDateChange}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="24 hours" />
                            <FormControlLabel value="7" control={<Radio />} label="7 days" />
                            <FormControlLabel value="30" control={<Radio />} label="30 days" />
                            <FormControlLabel value="any" control={<Radio />} label="Any day" />
                        </RadioGroup>
                    </FormControl>
                </Card>
           </div>
        )
    }

}


FilterCard.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(FilterCard);