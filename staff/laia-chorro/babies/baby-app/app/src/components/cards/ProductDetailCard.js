import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Avatar from '@material-ui/core/Avatar'

import GoogleMapsContainer from '../maps/GoogleMapsContainer'

import ReactStars from 'react-stars'
import Slider from "react-slick"

import { Link } from 'react-router-dom'

import './ProductDetailCard.css'

const styles = {
  card: {
    maxWidth: 1000,
  },
  content: {
    height: 186,
    width: 250,
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

function ProductDetailCard(props) {
  
    const {
            classes,
            addFavourite, 
            removeFavourite, 
            idProd, 
            isFav,
            category,
            createdAt,
            description,
            latitude,
            longitude,
            numFavs,
            numViews,
            photos,
            price,
            state,
            title,
            updatedAt,
            userName,
            userAvgScore,
            userProducts,
            userReviews,
            userPhoto,
            userId,
            goToChat

        } = props

  const onFavourites = event => {
    event.preventDefault()

    addFavourite(idProd)
  }

  const onNotFavourites = event => {
    event.preventDefault()

    removeFavourite(idProd)
  }

  const onGoToChat = event => {
      event.preventDefault()

      goToChat(idProd)
  }

  return (
        <Card className="product-detail-card" data-prod={idProd}>
                <div className="product-detail-flex">
                    <CardContent>
                        <Link className="product-detail-flex product-detail-user" to={`/user/${userId}`}>
                            {userPhoto?
                                <Avatar style={{display: 'inline-block', marginRight: '5px'}} alt="profile photo" style={{ height: '48px', width: '48px', margin: '10px auto' }} src={userPhoto} className="photo" /> : 
                                <i className="material-icons md-48">face</i>
                            }
                            <div className="product-detail-name">
                                <Typography variant="headline" component="h1">{userName}</Typography>
                                <Typography variant="subheading" color="textSecondary">{`${userProducts} products`}</Typography>
                            </div>
                                
                        </Link>
                    </CardContent>
               
                    <CardContent>
                        <ReactStars
                            count={5}
                            size={24}
                            edit={false}
                            value={userAvgScore}
                            color2={'#ffd700'} />
                            <Typography style={{textAlign: 'center'}} variant="subheading" color="textSecondary">{`${userReviews} reviews`}</Typography>
                    </CardContent>
                    <CardContent className="product-detail-chat">
                        <button onClick={onGoToChat} className="nav-btn nav-btn-upload">{'Chat'}</button>
                    </CardContent>
                </div>
                <div className="product-detail-carousel">
                    <Slider arrows={true} dots={true} infinite={true} speed={500} slidesToShow={1} slidesToScroll={1}>
                        {photos.map((photo, index) => (<img key={index} height={'506px'} src={photo} />)) }
                    </Slider>
                </div>
                <div className="product-detail-flex">
                    <CardContent>
                        <Typography style={{fontSize: '40px'}} variant="headline" component="h1">{`${price}€`}</Typography>
                        <Typography style={{fontSize: '30px'}} variant="subheading" component="h2">{title}</Typography>
                    </CardContent>
                    <CardContent>
                        <Typography style={{display: 'inline-block', fontSize: '14px'}} variant="subheading" color="textSecondary">{isFav ? 'Remove from Favourites': 'Add to Favourites'}</Typography>
                        <IconButton aria-label="Add to favorites">
                            {isFav ?  <FavoriteIcon onClick={onNotFavourites} className={classes.isFavourite} /> : 
                                <FavoriteBorderIcon onClick={onFavourites} className={classes.isFavourite} />}
                        </IconButton>
                    </CardContent>                  
                </div>
                <Divider style={{ margin: '10px 20px' }}/>
                <CardContent>
                    <Typography component="p">{description}</Typography>
                </CardContent>
                <Divider style={{ margin: '10px 20px' }}/>
                <div className="product-detail-flex">
                    <CardContent>
                        <Typography variant="subheading" color="textSecondary">{new Date(createdAt).toLocaleDateString('en-GB')}</Typography>
                    </CardContent>
                    <CardContent>
                        <VisibilityOutlinedIcon style={{color: 'rgba(0, 0, 0, 0.54)'}}/><Typography style={{display: 'inline-block', marginRight: '5px'}} variant="subheading" color="textSecondary">{numViews}</Typography>
                        <FavoriteBorderIcon style={{color: 'rgba(0, 0, 0, 0.54)'}}/><Typography style={{display: 'inline-block'}} variant="subheading" color="textSecondary">{numFavs}</Typography>
                    </CardContent>                   
                </div>  
                <Divider style={{ margin: '10px 20px' }}/>
                <CardContent>
                    <div className="public-user-map">
                        <GoogleMapsContainer lat={latitude} lng={longitude}/>
                    </div>
                </CardContent>
        </Card>
  );
}

ProductDetailCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductDetailCard);