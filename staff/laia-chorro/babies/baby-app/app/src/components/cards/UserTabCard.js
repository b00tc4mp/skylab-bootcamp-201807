import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar'

import ReactStars from 'react-stars'
import './UserTabCard.css'

const styles = theme => ({
  root: {
    borderBottom: "1px solid #e8e8e8",
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'space-between',
    borderBottomLeftRadius: '.45rem',
    borderBottomRightRadius: '.45rem',
    marginBottom: '20px',    
  },
  tabsRoot: {
    borderBottom: '1px solid #e8e8e8',
  },
  tabsIndicator: {
    backgroundColor: '#0097A7',
  },
  tabRoot: {
    textTransform: 'initial',
    height: 76,
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,
    fontSize: '14px',
    '&:hover': {
      color: '#0097A7',
      opacity: 1,
    },
    '&$tabSelected': {
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#0097A7',
      outline: 'none',
    },
  },
  tabSelected: {},
});

class UserTabCard extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => this.setState({ value }, ()=> this.props.onSelectTab(this.state.value))

  render() {

    const { classes, userName, userAvgScore, userPhoto } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>

        <div className="public-user-flex public-user-thumbnail">
            {userPhoto?
                <Avatar style={{display: 'inline-block', marginRight: '5px'}} alt="profile photo" style={{ height: '48px', width: '48px', margin: '10px auto' }} src={userPhoto} className="photo" /> : 
                <i className="material-icons md-48">face</i>
            }
            <div className="public-user-name">
                <Typography variant="headline" component="h1">{userName}</Typography>
                <ReactStars
                            count={5}
                            size={24}
                            edit={false}
                            value={userAvgScore}
                            color2={'#ffd700'} />
            </div>
                
        </div>

        <Tabs
          centered
          value={value}
          onChange={this.handleChange}
          classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
        >
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Products"
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Sells"
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Reviews"
          />
        </Tabs>
      </div>
    );
  }
}

UserTabCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserTabCard);