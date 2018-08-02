import React from 'react'
import close from '../images/close.svg'
import '../sass/productpanel.css'

function Productpanel(props) {

        return <section >

        {props.ingredient.map(({name, calories, totalFat, cholesterol, totalCarbohydrate, sugars, protein, 
saturatedFat, servingUnit, sodium, potassium, dietaryFiber, photo}) => {

                return <section className="product__panel">
                                <img src={photo}/>
                                <a className="icon__close" href="" onClick={(event) => {event.preventDefault(); props.close()}}>        <img src={close}/>
                                </a>
                                <h2>{name}</h2>
                                <div className="div__background--gray">
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
                                </div>
                        </section>
        })} 
        </section>
}

export default Productpanel