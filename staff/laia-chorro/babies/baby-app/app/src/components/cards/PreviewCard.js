import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import WorkIcon from '@material-ui/icons/Work';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 280,
    height: 400
  },
  content: {
    height: 152
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'cover',
  },
  state: {
    position: 'absolute',
    right: '15px',
    top: '15px',
    color: 'blue'
  },
  isFavourite: {
    color: 'red'
  }
};

function ImgMediaCard(props) {
  const { classes, state, photo, price, title, description, addProductToFavourites, idProd, isFav } = props

  const onFavourites = event => {
    event.preventDefault()

    addProductToFavourites(idProd)
}

  return (
    <Card className={classes.card}>
      <CardActionArea >
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
            <FavoriteIcon onClick={onFavourites} className={isFav ? classes.isFavourite : null}/>
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
      </CardActions>
    </Card>
  );
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);
