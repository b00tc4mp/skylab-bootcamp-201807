import React, { Component } from 'react'
import ReviewCard from '../cards/ReviewCard'
import logic from '../../logic'
import Avatar from '@material-ui/core/Avatar'
import ReactStars from 'react-stars'
import Alert from 'react-s-alert'
import Loader from 'react-loader'
import './Reviews.css'

class Reviews extends Component {
    state = {
        reviews: logic.getUserField('reviews') || [],
        feedbacks: logic.getUserField('feedbacks') || [],
        description: null,
        starsRating: 0,
        loaded: true
    }
    
    componentDidMount(){
        logic.getPrivateUser()
            .then(() => this.setState({
                reviews: logic.getUserField('reviews'),
                feedbacks: logic.getUserField('feedbacks')
            }))
    }

    keepDescription = e => this.setState({description: e.target.value})

    ratingChanged = newRating => this.setState({starsRating: newRating})

    submitReview = e => {
        e.preventDefault()

        this.setState({ loaded: false })

        const { starsRating, description, feedbacks } = this.state

        const feedback = feedbacks.find( item  => item.id === e.target.dataset.feedback )

        const idProd = feedback.id
        const userTo = feedback.user
        let score = starsRating || 1

        logic.addReview(userTo, score, idProd, description)
            .then(() => logic.getPrivateUser() )
            .then(()  => this.setState({feedbacks: logic.getUserField('feedbacks')}))
            .then(() => Alert.success('Thank you for your review!', { position: 'top-right', timeout: 3000 }))
            .catch(({ message }) => Alert.error(message, { position: 'bottom-right', effect: 'slide', timeout: 3000 }))
            .finally(() => this.setState({ loaded: true }))
    }


    render() {
        const { state: { reviews, feedbacks } } = this
        
        return (
            <div className="mylist-products-container">
                <Loader loaded={this.state.loaded}>
                
                    {feedbacks && !!feedbacks.length && ( <h1 className="mylist-products-heading">Some people are waiting for your feedback</h1> )}
                       {feedbacks && feedbacks.map((feedback, index) => {
                           return(
                           <div key={index} data-feedback={feedback.id}>
                            
                                <form onSubmit={this.submitReview} className="upload-form" data-feedback={feedback.id}>
                                    <div className="upload-container feedback-container">
                                        <div className="product-detail-flex">
                                            <div className="product-detail-flex product-detail-user">
                                                    {feedback.photos[0]?
                                                        <Avatar style={{display: 'inline-block', marginRight: '5px'}} alt="profile photo" style={{ height: '48px', width: '48px', margin: '10px auto' }} src={feedback.photos[0]} /> : 
                                                        <i className="material-icons md-48">face</i>
                                                    }
                                                    <div className="feedback-detail-name">
                                                        <h1>{feedback.title}</h1>
                                                    </div>
                                            </div>
                                        
                                            <div className="feedback-stars">
                                                <ReactStars
                                                    count={5}
                                                    size={24}
                                                    value={this.state.starsRating}
                                                    onChange={this.ratingChanged}
                                                    half={false}
                                                    color2={'#ffd700'} />
                                            </div>
                                        </div>
                                        
                                        <div className="form-group">
                                            <label className="">Review</label>
                                            <textarea onChange={this.keepDescription} className="form-control" rows="5" placeholder="Rate your purchase" maxLength="650"></textarea>
                                        </div>
                                        <button type="submit" className="feedback-product-btn">Rate your purchase</button>
                                    </div>
                                </form>
                           </div>)
                           })} 
                    <section className="flex-container">
                        <h1 className="mylist-products-heading">Your reviews</h1>
                        {reviews && reviews.map((review, index) => {
                            return(<div key={index} data-review={review.id}>
                            <ReviewCard
                                createdAt={review.created_at}
                                description={review.description}
                                idProd={review.productId}
                                score={review.score}
                                userFrom={review.userId_from}
                                />
                            </div>)
                            })}
                    </section>
                </Loader>
            </div>

        )
    }
}

export default Reviews