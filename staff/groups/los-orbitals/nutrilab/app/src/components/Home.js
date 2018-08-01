import React, {Component} from 'react'
import Search from './Search'
import logic from '../logic'
import List from './List'
import Productpanel from './Productpanel'

class Home extends Component{

    state = {
        ingredients:[],
        ingredientInfo:''
    }

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
                search:true
            })
        })

        .catch(() => {
        console.log('hola, soy un error del listado')
          })

    }

    onItemClick = (query) => {
        logic.ingredientInfo(query)
        .then(foods => {
            this.setState({ingredientInfo: foods.foods[0].food_name})
        })
        .catch(() => console.log('hola, soy un error de la ficha'))
    }

    render () {

        return <section>
                <Search onSearch = {this.onSearch} />
                <List ingredients = {this.state.ingredients} onItemClick = {this.onItemClick}/>
                <Productpanel ingredient = {this.state.ingredientInfo}/>
            </section>
        }
}


export default Home