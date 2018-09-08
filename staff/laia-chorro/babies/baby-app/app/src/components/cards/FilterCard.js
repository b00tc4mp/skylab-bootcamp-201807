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
  root: {
    /*display: 'flex',
    flexWrap: 'wrap',*/
  },
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
    { value: 'All Cathegories', label: 'All Cathegories', },
    { value: 'Clothes', label: 'Clothes', },
    { value: 'Books', label: 'Books', },
    { value: 'IT', label: 'IT', },
    { value: 'Car', label: 'Car', },
  ];


class FilterCard extends Component {

    state = {
        cathegoryRange: '',
        minVal: 0,
        maxVal: 30000,
        dist: 400,
        dateValue: '24 hours',
        
    };
    
    onCathegoryChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    onPriceRangeChange = value => {
        this.setState({ minVal: value[0], maxVal: value[1] });
    };

    onDistChange = value => {
        this.setState({ dist: value });
    };
    
    onDateChange = event => {
        this.setState({ dateValue: event.target.value });
    };
  

    render() {
        const { props: {classes}, state: {cathegoryRange, minVal, maxVal, dist, dateValue} } = this;

       return(
           <div className={classes.root} >
                <Card className={classes.card} >
                    <TextField
                        select
                        label="Cathegories"
                        className={classNames(classes.margin, classes.textField)}
                        value={cathegoryRange}
                        onChange={this.onCathegoryChange('cathegoryRange')}
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
                        <Slider onChange={this.onDistChange} defaultValue={400} max={400} />
                    </div>

                    <div style={sliderStyle}>
                        <FormLabel component="legend">Price</FormLabel>
                        <p style={sliderSubHeadingStyle}>{minVal === 0 && maxVal === 30000 ? 'Any price' : `${minVal}€ - ${maxVal}€`}</p>
                        <Range onChange={this.onPriceRangeChange} allowCross={false} defaultValue={[0, 30000]} min={0} max={30000} />
                    </div>

                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Date Range</FormLabel>
                        <RadioGroup
                            aria-label="Date Range"
                            name="Date Range"
                            className={classes.group}
                            value={dateValue}
                            onChange={this.onDateChange}
                        >
                            <FormControlLabel value="24 hours" control={<Radio />} label="24 hours" />
                            <FormControlLabel value="male" control={<Radio />} label="7 days" />
                            <FormControlLabel value="other" control={<Radio />} label="30 days" />
                            <FormControlLabel value='hola' control={<Radio />} label="Any day" />
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