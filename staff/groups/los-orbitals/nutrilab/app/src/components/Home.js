import React, {Component} from 'react'
import Search from './Search'
import logic from '../logic'
import List from './List'
import Productpanel from './Productpanel'


class Home extends Component{

    state = {
        ingredients:[],
        ingredientInfo:[],
        panelActive: false,
        listActive: false,
        showFeedback: false
    }

    onClose = () => this.setState({panelActive: false, listActive: true })

    onSearch = (query) => {

        logic.searchIngredients(query)
        .then(({common}) => {
            this.setState({
                ingredients: common.map((common) => {
                    return{
                        name: common.food_name, 
                        photo: common.photo.thumb
                    }
             
                }),
                listActive: true
            }) 
        })

        .catch(({message}) => {
            this.setState({showFeedback: message})
          })

    }

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
        .catch(({message}) => {
            this.setState({showFeedback: message})
          })
    }

    render () {

        return <section>
                <Search onSearch = {this.onSearch} feedback={this.state.showFeedback}/>
                {this.state.listActive && <List ingredients = {this.state.ingredients} onItemClick = {this.onItemClick} feedback={this.state.showFeedback}/> }
                {this.state.panelActive && <Productpanel ingredient = {this.state.ingredientInfo} close = {this.onClose} />}
            </section>
        }
}


export default Home