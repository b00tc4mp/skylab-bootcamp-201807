import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import TurnedInIcon from '@material-ui/icons/TurnedIn'
import WorkIcon from '@material-ui/icons/Work'
import Typography from '@material-ui/core/Typography'

const styles = {
  card: {
    width: 200,
    height: 350
  },
  link: {
    textDecoration: 'none !important',
    cursor: 'pointer',
  },
  content: {
    height: 186,
    width: 200
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
    color: '#4DD0E1'
  }
};

function SimplePreviewCard(props) {

  const { getProductDetail } = props

  const onProductDetail = event => {
    event.preventDefault()

    getProductDetail(idProd)
  }

  const { classes, state, photo, price, title, description, idProd } = props

  return (
    <Card className={classes.card}>
      <a className={classes.link} onClick={onProductDetail}>
        {state === 'sold' &&  <WorkIcon  className={classes.state}/>}
        {state === 'reserved' &&  <TurnedInIcon  className={classes.state}/>}
        <CardMedia
          component="img"
          className={classes.media}
          height="170"
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
      </a>
    </Card>
  );
}

SimplePreviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimplePreviewCard);
