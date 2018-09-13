import React, { Component } from 'react'
import ReviewCard from '../cards/ReviewCard'
import logic from '../../logic'
import './Reviews.css'

class Reviews extends Component {
    state = {
        reviews: logic.getUserField('reviews') || [],
    }
    
    componentDidMount(){
        this.setState({reviews: logic.getUserField('reviews')})
    }

    render() {
        const { state: {reviews} } = this
        
        return (
            <div className="mylist-products-container">
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