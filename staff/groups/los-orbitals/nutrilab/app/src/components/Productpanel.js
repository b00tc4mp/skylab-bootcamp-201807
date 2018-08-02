import React, {Component} from 'react'
import close from '../images/close.svg'
import '../sass/productpanel.css'
import logic from '../logic/index'
import heart from '../images/fav-line.svg'
import heartfull from '../images/fav-color.svg'

class Productpanel extends Component{

        state = { favorite: logic.isFavorite(this.props.ingredient[0].name)}

        onToggleFavorite = () => {
                logic.toggleFoodFavorite(this.props.ingredient[0].name)
                    .then(() => this.refreshFavorite(this.props))
                    .catch(({ message }) => this.setState({ error: message }))
        }

        refreshFavorite(props) { 
                this.setState({ favorite: logic.isFavorite(props.ingredient[0].name) }) 
        }

        componentWillReceiveProps(newProps) {
                this.refreshFavorite(newProps)
        }

        render () {

                return <section className="product__panel">
                                <img src={photo}/>
                                <a className="icon__close" href="" onClick={(event) => {event.preventDefault(); props.close()}}><img src={close}/>
                                </a>
                                <h2>{name}</h2>
                                <div className="div__background--gray">
                return <section >

                {this.props.ingredient.map(({name, calories, totalFat, cholesterol, totalCarbohydrate, sugars, protein, 
saturatedFat, servingUnit, sodium, potassium, dietaryFiber, photo}) => {
                return <section>
                                <a href="" onClick={(event) => {event.preventDefault(); this.props.close()}}><img src={close}/></a>
                                <img src={photo}/>
                                <a href="" onClick={(event) => {event.preventDefault(); this.onToggleFavorite()}}>{this.state.favorite ? <img src={heartfull}/> : <img src={heart}/>}</a>
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
                        </section>
        })} 
        </section>
        }    
}

export default Productpanel