import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import ReactStars from 'react-stars'
import logic from '../../logic'
import Alert from 'react-s-alert'

const styles = {
  card: {
    width: 600,
  },
  link: {
    textDecoration: 'none !important',
    cursor: 'pointer',
  },
  stars: {
    width: 175
  }
}

class ReviewCard extends Component {

    state = {
        userPhoto: null, 
        userName: null,
        prodTitle: null,
        //loaded: false
    }

    componentDidMount(){
        //this.setState({ loaded: false })
        const productId = this.props.idProd
        return Promise.resolve()
            .then(() => logic.incrementProductViewsById(productId))
            .then(() => logic.getProductDetailById(productId))
            .then(product => this.setState({ userPhoto: product.user_photo, userName: product.user_name, prodTitle: product.title }) )
            .catch(({ message }) => Alert.error(message, { position: 'bottom-right', effect: 'slide', timeout: 3000 }) )
            //.finally(() => this.setState({ loaded: true }) )
    }


    render() {
        const { props: {classes, createdAt, description, idProd, score, userFrom}, state: {userPhoto, userName, prodTitle} } = this


        return(
            <Card className={classes.card}>
            <a className={classes.link}>
                <div className="product-detail-flex">
                    <CardContent className="product-detail-flex product-detail-user">
                        {/*<Link className="product-detail-flex product-detail-user" to={`/user/${userId}`}>*/}
                            {userPhoto?
                                <Avatar style={{display: 'inline-block', marginRight: '5px'}} alt="profile photo" style={{ height: '48px', width: '48px', margin: '10px auto' }} src={userPhoto} className="photo" /> : 
                                <i className="material-icons md-48">face</i>
                            }
                            <div className="product-detail-name">
                                <Typography variant="headline" component="h1">{userName}</Typography>
                                <Typography variant="subheading" color="textSecondary">{`Compró el producto: ${prodTitle}`}</Typography>
                            </div>
                                
                        {/*</Link>*/}
                    </CardContent>
                
                    <CardContent className={classes.stars}>
                        <ReactStars
                            count={5}
                            size={24}
                            edit={false}
                            value={score}
                            color2={'#ffd700'} />
                    </CardContent>
                    <CardContent>
                        <Typography style={{textAlign: 'center'}} variant="subheading" color="textSecondary">{new Date(createdAt).toLocaleDateString('en-GB')}</Typography>
                    </CardContent>
                </div>
                <CardContent>
                <Typography component="p">
                    {description} 
                </Typography>
                </CardContent>
            </a>
            </Card>
            )
        }
}

ReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReviewCard);
