// Import the components
import React, {Component} from 'react'
import Search from './Search'
import logic from '../logic'
import List from './List'
import Productpanel from './Productpanel'

// States are created and initialized
class Home extends Component{

    state = {
        ingredients:[],
        ingredientInfo:[],
        panelActive: false,
        listActive: false,
        showFeedback: false
    }

    // This function prepare the view after click to close the productPanel
    onClose = () => this.setState({panelActive: false, listActive: true })

    // This function take the input query from the user and make a list with the name and a photo of each result, (and save this data in status). 
    onSearch = (query) => {
        logic.searchIngredients(query)
            .then(({common}) => {
                if (common.length > 0) {
                this.setState({
                    ingredients: common.map((common) => {
                        return{
                            name: common.food_name, 
                            photo: common.photo.thumb
                        }
                    }),
                    listActive: true,
                    panelActive: false,
                    showFeedback: false
                }) }
                else this.setState({showFeedback: 'Sorry! No matches found', listActive: false, panelActive: false})
            })
            .catch(({message}) => this.setState({showFeedback: message}))
    }

    // This function make a search by the name of the product (because the API don't give 
    // a differecniated id) and also save some information in the stats to compose the product pannel.
    onItemClick = (query) => {
        logic.ingredientInfo(query)
            .then(({foods}) => {
                this.setState({
                    ingredientInfo: foods.map((foods) => {
                        return{
                            name: foods.food_name,
                            calories: foods.nf_calories,
                            totalFat: foods.nf_total_fat,
                            cholesterol: foods.nf_cholesterol,
                            totalCarbohydrate: foods.nf_total_carbohydrate,
                            sugars: foods.nf_sugars,
                            protein: foods.nf_protein,
                            saturatedFat: foods.nf_saturated_fat,
                            servingUnit: foods.serving_unit,
                            sodium: foods.nf_sodium,
                            potassium: foods.nf_potassium,
                            dietaryFiber: foods.nf_dietary_fiber,
                            photo: foods.photo.thumb
                        }
                    }), 
                    panelActive: true,
                    listActive: true
                })
            })
            .catch(({message}) => this.setState({showFeedback: message}))
    }

    // This render show and hide the different parts of the main part of the web (search and show data from the nutritionix.com api)
    render () {

        const { state: {showFeedback, listActive, panelActive, ingredients, ingredientInfo}, onSearch, onItemClick, onClose } = this
        return <section>
                    <Search onSearch={onSearch} feedback={showFeedback}/>
                    {listActive && <List ingredients={ingredients} onItemClick={onItemClick}/>}
                    {panelActive && <Productpanel ingredient={ingredientInfo} close={onClose} />}
                </section>
    }
}

export default Home