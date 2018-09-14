import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'
import DeleteIcon from '@material-ui/icons/Delete';
//import EditIcon from '@material-ui/icons/Edit';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import WorkIcon from '@material-ui/icons/Work';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import Typography from '@material-ui/core/Typography';
import Alert from 'react-s-alert'
import logic from '../../logic'

import UsersDialog from '../customElements/UsersDialog'



const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',    
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 120,
    height: 120,
  },
  views: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  viewIcon: {
    height: 24,
    width: 24,
    marginLeft: 20,
    color: 'rgba(0, 0, 0, 0.54)',
  },
  states: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    marginLeft: 30,
  },
  button: {
    color: '#0097A7',
  }
});


class PreEditCard extends React.Component {

    state = {
        openDialog: false,
        selectedUser: null//emails[1],
    }    

    onDelete = event => {
        event.preventDefault()

        this.props.onProductUpdateState(this.props.idProd, 'removed')
    }

    onReserved = event => {
        event.preventDefault()

        this.props.onProductUpdateState(this.props.idProd, 'reserved')
    }

    onSold = event => {
        event.preventDefault()
        this.setState({ openDialog: true,})
        this.props.onProductUpdateState(this.props.idProd, 'sold')
    }


    handleDialogClose = userId => this.setState({ selectedUser: userId, openDialog: false }, () => 
                this.allowUserSelectedToAddReview(userId, this.props.idProd)
            )

    allowUserSelectedToAddReview = (userId, prodId) => {
        return logic.allowProdReviewToUser(userId, prodId)
            .then(() => Alert.success('Thank you for selling with BabyBoom!', { position: 'top-right', timeout: 3000 }))
            .catch(({ message }) => Alert.error(message, { position: 'bottom-right', effect: 'slide', timeout: 3000 }))
    }

    onPending = event => {
        event.preventDefault()

        this.props.onProductUpdateState(this.props.idProd, 'pending')
    }

    onProductDetail = event => {
        event.preventDefault()

        this.props.getProductDetail(this.props.idProd)
      }


    render() {
        const { classes, state, photo, price, title, numViews, numFavs, idProd } = this.props
      
    
        return (
            <Card className={classes.card}>
                <CardActionArea className={classes.card} onClick={this.onProductDetail}>
                    <CardMedia
                        className={classes.cover}
                        image={photo}
                        title={title}
                    />
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography variant="headline"component="h1">{`${price}€`}</Typography>
                        </CardContent>
                    </div>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography variant="subheading" color="textSecondary">{title}</Typography>
                        </CardContent>
                    </div>
                </CardActionArea>
                <div className={classes.views}>
                    <VisibilityOutlinedIcon className={classes.viewIcon} /><Typography variant="subheading" color="textSecondary">{numViews}</Typography>
                    <FavoriteBorderIcon className={classes.viewIcon} /><Typography variant="subheading" color="textSecondary">{numFavs}</Typography>
                </div>
                <div className={classes.states}>
                    <IconButton className={classes.button} aria-label="Sold" color="primary">
                        {state === 'sold' ?  <WorkIcon  onClick={this.onPending}/> : <WorkOutlineIcon onClick={this.onSold} />}
                    </IconButton>
                    <IconButton className={classes.button} aria-label="Reserved" color="primary">
                        {state === 'reserved' ?  <TurnedInIcon onClick={this.onPending}/> : <TurnedInNotIcon onClick={this.onReserved} />}
                    </IconButton>
                    {/*<IconButton className={classes.button} aria-label="Edit" color="primary">
                        <EditIcon />
                    </IconButton>*/}

                    <UsersDialog
                        selectedValue={this.state.selectedUser}
                        open={this.state.openDialog}
                        onClose={this.handleDialogClose}
                        idprod={idProd}
                    />

                    <IconButton className={classes.button} aria-label="Delete" onClick={this.onDelete} color="primary">
                        <DeleteIcon />
                    </IconButton>
                </div>
            </Card>
        )
    }
}

PreEditCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PreEditCard);