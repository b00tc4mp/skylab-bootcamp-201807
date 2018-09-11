import React from 'react'
import {
    Form, InputGroup, Input, InputGroupAddon, Button, UncontrolledCollapse, CardBody, Card, Col, CardImg, CardTitle, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import {logic} from '../../logic'
import './OneMenu.css'
import {Link} from 'react-router-dom'


export default class OneMenu extends React.Component {

   state = {
    selectText: 'Select your...',
    breakfastId: [],
    midBreakfastId: [],
    lunchId: [],
    afternoonId: [],
    dinnerId: [],
    breakfastRecipes: [],
    midBreakfastRecipes: [],
    lunchRecipes: [],
    afternoonRecipes: [],
    dinnerRecipes: [],
   }

   listDishes(){
       this.setState({breakfastRecipes: [], breakfastId: [], midBreakfastRecipes: [], lunchRecipes: [], afternoonRecipes: [], dinnerRecipes: [] }, () => {
        return logic.listDishes(this.props.email, this.props.menuId, this.props.token)
            .then(recipes => {
                recipes.length !== 0 && recipes.map(({titleDish, recipeId}) => {
                    if(titleDish == "Breakfast") {
                        this.setState({breakfastId: this.state.breakfastId.concat([recipeId])})
                    } else if (titleDish == "Mid Breakfast"){
                        this.setState({midBreakfastId: this.state.midBreakfastId.concat([recipeId])})
                    } else if (titleDish == "Lunch"){
                        this.setState({lunchId: this.state.lunchId.concat([recipeId])})
                    } else if (titleDish == "Afternoon Snack"){
                        this.setState({afternoonId: this.state.afternoonId.concat([recipeId])})
                    } else if(titleDish === 'Dinner') {
                        this.setState({dinnerId: this.state.dinnerId.concat([recipeId])})
                    }
                })
            })
    })
}

componentDidMount(){
    this.listDishes()
}

deleteRecipe(recipeId){
    return logic.removeDish(this.props.email, this.props.menuId, recipeId, this.props.token)
    .then(() => {
        this.listDishes()
    })
}

listBrekfastRecipeById(){
    const breakfast = this.state.breakfastId

    if(breakfast) {
    
        const breakfastPromises = breakfast.map(recipeId =>
            logic.basicSearchRecipeById(recipeId)
            .then(recipe => {
                return {recipeId, recipeLabel: recipe[0].label, recipeImage: recipe[0].image}
            })
        )

        Promise.all(breakfastPromises)
            .then(breakfastRecipesState => {
                this.setState({breakfastRecipes: breakfastRecipesState, midBreakfastRecipes: [],
                        lunchRecipes: [], afternoonRecipes: [], dinnerRecipes: [], selectText: 'Breakfast' })
            })
    }
    else {
        this.setState({ selectText: 'Breakfast' })
    }
}

    listMidBrekfastRecipeById(){ 
        const midBreakfast = this.state.midBreakfastId
        midBreakfast.map(recipeId => {
            logic.basicSearchRecipeById(recipeId)
            .then(recipe => {
                const midBreakfastRecipesState = this.state.midBreakfastRecipes
                midBreakfastRecipesState.push({recipeId, recipeLabel: recipe[0].label, recipeImage: recipe[0].image})
                return midBreakfastRecipesState
            })
                .then(midBreakfastRecipesState => {
                    this.setState({midBreakfastRecipes: midBreakfastRecipesState})
                })
        })
    }

    listLunchRecipeById(){ 
        const lunch = this.state.lunchId
        lunch.map(recipeId => {
            logic.basicSearchRecipeById(recipeId)
            .then(recipe => {
                const lunchRecipesState = this.state.lunchRecipes
                lunchRecipesState.push({recipeId, recipeLabel: recipe[0].label, recipeImage: recipe[0].image})
                return lunchRecipesState
            })
                .then(lunchRecipesState => {
                    
                    this.setState({lunchRecipes: lunchRecipesState})
                })
        })
    }

    listAfternoonRecipeById(){ 
        const afternoon = this.state.afternoonId
        afternoon.map(recipeId => {
            logic.basicSearchRecipeById(recipeId)
            .then(recipe => {
                const afternoonRecipesState = this.state.afternoonRecipes
                afternoonRecipesState.push({recipeId, recipeLabel: recipe[0].label, recipeImage: recipe[0].image})
                return afternoonRecipesState
            })
                .then(afternoonRecipesState => {
                    
                    this.setState({afternoonRecipes: afternoonRecipesState})
                })
        })
    }

    listDinnerRecipeById(){
        const dinner = this.state.dinnerId
        this.setState({ selectText: 'Dinner'}, () => {
            dinner.map(recipeId => {
                logic.basicSearchRecipeById(recipeId)
                .then(recipe => {
                    const dinnerRecipesState = this.state.dinnerRecipes
                    dinnerRecipesState.push({recipeId, recipeLabel: recipe[0].label, recipeImage: recipe[0].image})
                    return dinnerRecipesState
                })
                .then(dinnerRecipesState => { 
                    this.setState({dinnerRecipes: dinnerRecipesState, breakfastRecipes: [], midBreakfastRecipes: [],
                        lunchRecipes: [], afternoonRecipes: [] })
                })
            })
        })
    }
    
    render() {
        return  <div id="allMenusList">
        
        <UncontrolledDropdown>
      <DropdownToggle caret>
        {this.state.selectText}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={() => this.listBrekfastRecipeById()}>Breakfast</DropdownItem>
        <DropdownItem onClick={() => this.listMidBrekfastRecipeById()}>Mid Breakfast</DropdownItem>
        <DropdownItem onClick={() => this.listLunchRecipeById()}>Lunch</DropdownItem>
        <DropdownItem onClick={() => this.listAfternoonRecipeById()}>Afternoon Snack</DropdownItem>
        <DropdownItem onClick={() => this.listDinnerRecipeById()}>Dinner</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>

    <div id="breakfastMenu">

      {this.state.selectText === 'Breakfast' && (this.state.breakfastRecipes.length !== 0 ? this.state.breakfastRecipes.map(({recipeId, recipeImage, recipeLabel}) => {              
        return <div>
                <Col sm='7'>
                    <Card className="recipeCard" id={recipeId}>
                        <CardImg top width="100%" src={recipeImage} alt="Card image cap" />
                            <CardBody className="displayRecipes" >
                                <CardTitle>{recipeLabel}</CardTitle>
                                <Link to={`/recipe/${recipeId}`}><Button className="cardButton mt-2 mr-2">Recipe Info</Button></Link>
                                <Button className="mt-2" onClick={() => this.deleteRecipe(recipeId)}>Delete</Button>
                            </CardBody>
                    </Card>
                </Col>
             </div>
        })
        : <p>Recipes for {this.state.selectText} not found !!!</p>
      )}
    </div>

      {this.state.midBreakfastRecipes.length !== 0 && this.state.midBreakfastRecipes.map(({recipeId, recipeImage, recipeLabel}) => {
                                
        return <div>
                <Col sm='3'>
                    <Card className="recipeCard" id={recipeId}>
                        <CardImg top width="100%" src={recipeImage} alt="Card image cap" />
                            <CardBody className="displayRecipes" >
                                <CardTitle>{recipeLabel}</CardTitle>
                                <Link to={`/recipe/${recipeId}`}><Button className="cardButton">Recipe Info</Button></Link>
                                <Button onClick={() => this.deleteRecipe(recipeId)}>Delete</Button>
                            </CardBody>
                    </Card>
                </Col>
             </div>
      })}

      {this.state.lunchRecipes.length !== 0 && this.state.lunchRecipes.map(({recipeId, recipeImage, recipeLabel}) => {
                                
        return <div>
                <Col sm='3'>
                    <Card className="recipeCard" id={recipeId}>
                        <CardImg top width="100%" src={recipeImage} alt="Card image cap" />
                            <CardBody className="displayRecipes" >
                                <CardTitle>{recipeLabel}</CardTitle>
                                <Link to={`/recipe/${recipeId}`}><Button className="cardButton">Recipe Info</Button></Link>
                                <Button onClick={() => this.deleteRecipe(recipeId)}>Delete</Button>
                            </CardBody>
                    </Card>
                </Col>
             </div>
      })}

      {this.state.afternoonRecipes.length !== 0 && this.state.afternoonRecipes.map(({recipeId, recipeImage, recipeLabel}) => {
                                
        return <div>
                <Col sm='3'>
                    <Card className="recipeCard" id={recipeId}>
                        <CardImg top width="100%" src={recipeImage} alt="Card image cap" />
                            <CardBody className="displayRecipes" >
                                <CardTitle>{recipeLabel}</CardTitle>
                                <Link to={`/recipe/${recipeId}`}><Button className="cardButton">Recipe Info</Button></Link>
                                <Button onClick={() => this.deleteRecipe(recipeId)}>Delete</Button>
                            </CardBody>
                    </Card>
                </Col>
             </div>
      })}

      {this.state.selectText === 'Dinner' && (this.state.dinnerRecipes.length !== 0 ? this.state.dinnerRecipes.map(({recipeId, recipeImage, recipeLabel}) => {
                                
        return <div>
                <Col sm='3'>
                    <Card className="recipeCard" id={recipeId}>
                        <CardImg top width="100%" src={recipeImage} alt="Card image cap" />
                            <CardBody className="displayRecipes" >
                                <CardTitle>{recipeLabel}</CardTitle>
                                <Link to={`/recipe/${recipeId}`}><Button className="cardButton">Recipe Info</Button></Link>
                                <Button onClick={() => this.deleteRecipe(recipeId)}>Delete</Button>
                            </CardBody>
                    </Card>
                </Col>
             </div>
        })
        : <p>Recipes for {this.state.selectText} not found</p>
      )}

    </div>
    }
}