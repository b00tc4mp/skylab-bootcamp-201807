import React, { Component } from 'react'
import ReviewCard from '../cards/ReviewCard'
import logic from '../../logic'
import Avatar from '@material-ui/core/Avatar'
import ReactStars from 'react-stars'
import './Reviews.css'

class Reviews extends Component {
    state = {
        reviews: logic.getUserField('reviews') || [],
        feedbacks: logic.getUserField('feedbacks') || [],
        description: null,
        starsRating: 0

    }
    
    componentDidMount(){
        this.setState({
            reviews: logic.getUserField('reviews'),
            feedbacks: logic.getUserField('feedbacks')
        })
    }

    keepDescription = e => this.setState({description: e.target.value})

    ratingChanged = newRating => this.setState({starsRating: newRating})


    render() {
        const { state: { reviews, feedbacks } } = this
        
        return (
            <div className="mylist-products-container">
                
                    {feedbacks && ( <h1 className="mylist-products-heading">Some people is waiting for your feedback</h1> )}
                       {feedbacks && feedbacks.map((feedback, index) => {
                           return(
                           <div key={index} data-feedback={feedback.id}>
                            
                                <form onSubmit={this.submitUpload} className="upload-form">
                                    <div className="upload-container feedback-container">
                                        <h2 className="upload-title">Rate your purchase</h2>


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
                                                    color2={'#ffd700'} />
                                            </div>
                                        </div>
                                        
                                        <div className="form-group">
                                            <label className="">Review</label>
                                            <textarea onChange={this.keepDescription} className="form-control" rows="5" placeholder="Rate your purchase" maxLength="650"></textarea>
                                        </div>
                                    </div>
                                    <button type="submit" className="upload-product-btn">Upload product</button>
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
            </div>

        )
    }
}

export default Reviews