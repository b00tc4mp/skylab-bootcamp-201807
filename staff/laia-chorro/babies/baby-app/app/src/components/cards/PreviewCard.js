import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
//import ShareIcon from '@material-ui/icons/Share'
import TurnedInIcon from '@material-ui/icons/TurnedIn'
import WorkIcon from '@material-ui/icons/Work'
import Typography from '@material-ui/core/Typography'

const styles = {
  card: {
    width: 250,
    height: 450
  },
  content: {
    height: 186,
    width: 250,
    overflow: 'hidden',
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'cover',
  },
  state: {
    position: 'absolute',
    right: '15px',
    top: '15px',
    color: '#0097A7'
  },
  isFavourite: {
    color: '#4DD0E1'
  }
};

function PreviewCard(props) {
  const { classes, state, photo, price, title, description, addFavourite, 
          removeFavourite, idProd, isFav, getProductDetail } = props

  const onFavourites = event => {
    event.preventDefault()

    addFavourite(idProd)
  }

  const onNotFavourites = event => {
    event.preventDefault()

    removeFavourite(idProd)
  }

  const onProductDetail = event => {
    event.preventDefault()

    getProductDetail(idProd)
  }

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={onProductDetail}>
        {state === 'sold' &&  <WorkIcon  className={classes.state}/>}
        {state === 'reserved' &&  <TurnedInIcon  className={classes.state}/>}
        <CardMedia
          component="img"
          className={classes.media}
          height="200"
          image={photo}
          title={title}
        />
        <CardContent className={classes.content}>
        <Typography gutterBottom variant="headline" component="h1">
            {`${price}€`}
          </Typography>
          <Typography gutterBottom variant="title" component="h2">
            {title}
          </Typography>
          <Typography component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <IconButton aria-label="Add to favorites">
            {isFav ?  <FavoriteIcon onClick={onNotFavourites} className={classes.isFavourite} /> : 
            <FavoriteBorderIcon onClick={onFavourites} className={classes.isFavourite} />}
          </IconButton>
          {/*<IconButton aria-label="Share">
            <ShareIcon />
  </IconButton>*/}
      </CardActions>
    </Card>
  );
}

PreviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PreviewCard);
