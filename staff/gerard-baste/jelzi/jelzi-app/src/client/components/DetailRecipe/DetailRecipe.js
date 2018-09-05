import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { logic } from '../../logic'
import { Button, CustomInput, Input } from 'reactstrap';


class DetailRecipe extends Component {
    state = {
        recipe: "",
        showMenu: false,
        menus: [],
        order: 1
    }
    componentDidMount() {
        this.getList()
       return logic.basicSearchRecipeById(this.props.recipeId)
            .then(recipe => {
                this.setState({ recipe })
            })
    }

    getList(){
        const { email, token } = this.props;
        logic.listMenus(email, token)
        .then(menus=>{
            debugger
            const { email, token } = this.props;
            // logic.listDishes(email, menus._id, token)
            this.setState({menus})
        })
       }

        addToMenu(){
            this.setState({showMenu: true})
        }

        closeMenu(){
            
            this.setState({showMenu: false})
            const filteredMenu = this.state.menus.filter(({checked})=>checked)
            const { email, token, recipeId } = this.props;
            filteredMenu.map(({_id}) =>{
                logic.addDish(email, 'test', recipeId, 1, _id, token)
            })
        }

        checkMenu(id){
            const newMenu = this.state.menus.map(menu =>{
                if(menu._id === id){
                    return {...menu, checked: !menu.checked}
                }
    
                return menu
            })
            this.setState({menus: newMenu})
        }


    render() {
        return <div>
            <main>{this.state.recipe &&
                <h2>Information of {this.state.recipe[0].label}</h2>
            }
            <Button onClick={()=>this.addToMenu()}>Add to Menu</Button>
            {this.state.showMenu &&
            <div>
            <ul>
            {this.state.menus.map(({title, _id, checked})=>{
                return <li key={_id}>{title}<Input type="checkbox" checked={checked} onClick={()=>this.checkMenu(_id)} name={_id} />{' '}
                <label htmlFor={_id}></label>
                </li>
            })}    
            </ul>
            <Button onClick={()=>this.closeMenu()}>Save to recipe</Button>
            </div>
            }

            </main>
        </div>
    }
}
export default withRouter(DetailRecipe)