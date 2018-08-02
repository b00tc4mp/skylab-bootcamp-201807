import React, {Component} from 'react'
import close from '../images/close.svg'
import logic from '../logic/index'
import heart from '../images/heart.svg'
import heartfull from '../images/heartfull.svg'

class Productpanel extends Component{

        state = {
                favorite: logic.isFavorite (this.props.ingredient[0].name)
        }

        onToggleFavorite = () => {
                logic.toggleFoodFavorite(this.props.ingredient[0].name)
                    .then(() => this.refreshFavorite(this.props))
                    .catch(({ message }) => this.setState({ error: message }))
        }

        refreshFavorite() {
                this.setState({ favorite: logic.isFavorite(this.props.ingredient[0].name) }) 
        } 

        render () {
                return <section >

        {this.props.ingredient.map(({name, calories, totalFat, cholesterol, totalCarbohydrate, sugars, protein, 
saturatedFat, servingUnit, sodium, potassium, dietaryFiber, photo}) => {
                return <section>
                        <div>
                                <a href="" onClick={(event) => {event.preventDefault(); this.props.close()}}>
                                        <img src={close}/>
                                </a>
                                <p>Name: {name}</p>
                                <p>Calories: {calories}</p>
                                <p>Total Fat: {totalFat}</p>
                                <p>Cholesterol: {cholesterol}</p>
                                <p>Total Carbohydrates: {totalCarbohydrate}</p>
                                <p>Sugars: {sugars}</p>
                                <p>Protein: {protein}</p>
                                <p>Saturated Fat: {saturatedFat}</p>
                                <p>Serving Unit: {servingUnit}</p>
                                <p>Sodium: {sodium}</p>
                                <p>Potassium: {potassium}</p>
                                <p>Dietary Fiber: {dietaryFiber}</p>
                                <img src={photo}/>
                        </div>
                        <div>
                                {this.state.favorite && <a href="" onClick={(event) => {event.preventDefault(); this.onToggleFavorite()}}> <img src={heartfull} /></a>}
                                {!this.state.favorite && <a href="" onClick={(event) => {event.preventDefault(); this.onToggleFavorite()}}> <img src={heart} /></a>}
                        </div>
                                
                        </section>
        })} 
        </section>
        }
        
}

export default Productpanel