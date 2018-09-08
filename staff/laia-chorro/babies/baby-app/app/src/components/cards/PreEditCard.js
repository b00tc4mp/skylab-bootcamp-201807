import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import WorkIcon from '@material-ui/icons/Work';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import Typography from '@material-ui/core/Typography';

//child_friendly
// business_center
// local_grocery_store
// local_mall
// business

const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    /*alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,*/
    
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
    height: 38,
    width: 38,
  },
  viewButton: {
    marginLeft: 20,
  },
  states: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    marginLeft: 30,
  }
});



function PreEditCard(props) {

    const { classes, theme, state, photo, price, title, numViews, numFavs, idProd, onProductUpdateState } = props;

    const onDelete = event => {
        event.preventDefault()

        onProductUpdateState(idProd, 'removed')
    }

    const onReserved = event => {
        event.preventDefault()

        onProductUpdateState(idProd, 'reserved')
    }

    const onSold = event => {
        event.preventDefault()

        onProductUpdateState(idProd, 'sold')
    }

    const onPending = event => {
        event.preventDefault()

        onProductUpdateState(idProd, 'pending')
    }


    return (
        <Card className={classes.card}>
            <CardActionArea className={classes.card}>
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
                <IconButton className={classes.viewButton} aria-label="num views">
                    <VisibilityIcon className={classes.viewIcon} /><Typography variant="subheading" color="textSecondary">{numViews}</Typography>
                </IconButton>
                <IconButton className={classes.viewButton} aria-label="num favs">
                    <FavoriteIcon className={classes.viewIcon} /><Typography variant="subheading" color="textSecondary">{numFavs}</Typography>
                </IconButton>
            </div>
            <div className={classes.states}>
                <IconButton className={classes.button} aria-label="Sold" color="primary">
                    {state === 'sold' ?  <WorkIcon  onClick={onPending}/> : <WorkOutlineIcon onClick={onSold} />}
                </IconButton>
                <IconButton className={classes.button} aria-label="Reserved" color="primary">
                    {state === 'reserved' ?  <TurnedInIcon onClick={onPending}/> : <TurnedInNotIcon onClick={onReserved} />}
                </IconButton>
                <IconButton className={classes.button} aria-label="Edit" color="primary">
                    <EditIcon />
                </IconButton>
                <IconButton className={classes.button} aria-label="Delete" onClick={onDelete} color="primary">
                    <DeleteIcon />
                </IconButton>
            </div>
        </Card>
    );
}

PreEditCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PreEditCard);