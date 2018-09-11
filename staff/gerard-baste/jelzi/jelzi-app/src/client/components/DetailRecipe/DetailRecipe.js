import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { logic } from "../../logic";
import {
  Button,
  CustomInput,
  Input,
  Card,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label
} from "reactstrap";
import "./DetailRecipe.css";
import UserSuccesful from '../SuccedPanel/UserSuccesful'

class DetailRecipe extends Component {
  state = {
    recipe: "",
    showMenu: false,
    menus: [],
    sort: 1,
    title: ""
  };

  componentDidMount() {
    const { email } = this.props;
    if (email) {
      this.getList();
      return logic.basicSearchRecipeById(this.props.recipeId).then(recipe => {
        this.setState({ recipe });
      });
    } else {
        return logic.basicSearchRecipeById(this.props.recipeId).then(recipe => {
            this.setState({ recipe });
        });
    }
  }

  getList() {
    const { email, token } = this.props;
    logic.listMenus(email, token).then(menus => {
      const { email, token } = this.props;

      this.setState({ menus });
    });
  }

  addToMenu() {
    const { email } = this.props;
    if(email && this.state.menus.length !== 0){
    this.setState({ showMenu: true });
    } else if (email && this.state.menus.length === 0) {
        this.props.history.push("/menus")
    } else {
        this.props.history.push("/register")
    }
  }

  closeMenu() {
    this.setState({ showMenu: false });
    UserSuccesful('Recipe saved')
    const filteredMenu = this.state.menus.filter(({ checked }) => checked);
    const { email, token, recipeId } = this.props;
    const { title } = this.state;
    filteredMenu.map(({ _id }) => {
      logic.addDish(email, title, recipeId, 1, _id, token);
    });
  }

  checkMenu(id) {
    const newMenu = this.state.menus.map(menu => {
      if (menu._id === id) {
        return { ...menu, checked: !menu.checked };
      }

      return menu;
    });
    this.setState({ menus: newMenu });
  }

  handleClickItem = e => {
    const value = e.target.value;
    this.setState({ title: value });
  };

  render() {
    return (
      <div>
        <main>
          {this.state.recipe && (
            <div id="section">
              <h2 id="title">{this.state.recipe[0].label}</h2>
              <div id="recipeInformation">
                <div id="imageAndButton">
                  <img id="recipeImageOnly" src={this.state.recipe[0].image} />
                  <Button id="addToMenuButton" onClick={() => this.addToMenu()}>
                    Add to Menu
                  </Button>
                </div>
                <div id="nutrientInfo">
                  <h2>Ingredients</h2>
                  <h3>Servers {this.state.recipe[0].yield}</h3>
                  <ul id="listIngredients">
                    {this.state.recipe[0].ingredients.map(obj => {
                      return <li>{obj}</li>;
                    })}
                    <a href={this.state.recipe[0].url} target="_blank">
                      <Button id="readDirections">Read Directions</Button>
                    </a>
                  </ul>
                </div>
                <div>
                  <div>
                    <h2>Nutrition Information</h2>
                  </div>
                  <div id="circlesNutrition">
                    <div id="circles">
                      <p id="calories">Calories</p>
                      <div id="circle">
                        {parseInt(this.state.recipe[0].calories ? this.state.recipe[0].calories : 0)}
                      </div>
                    </div>
                    <div id="circles">
                      {this.state.recipe[0].carbs ? this.state.recipe[0].carbs.label : "No Carbs"}
                      <div id="circle">
                        {parseInt(this.state.recipe[0].carbs ? this.state.recipe[0].carbs.quantity : 0)}
                        {this.state.recipe[0].carbs ? this.state.recipe[0].carbs.unit : "g"}
                      </div>
                    </div>
                    <div id="circles">
                      {this.state.recipe[0].fat ? this.state.recipe[0].fat.label : "No Fat"}
                      <div id="circle">
                        {parseInt(this.state.recipe[0].fat ? this.state.recipe[0].fat.quantity : 0)}
                        {this.state.recipe[0].fat ? this.state.recipe[0].fat.unit : "g"}
                      </div>
                    </div>
                    <div id="circles">
                      {this.state.recipe[0].fasat ? this.state.recipe[0].fasat.label : "No Fasat"}
                      <div id="circle">
                        {parseInt(this.state.recipe[0].fasat ? this.state.recipe[0].fasat.quantity : 0)}
                        {this.state.recipe[0].fasat ? this.state.recipe[0].fasat.unit : "g"}
                      </div>
                    </div>
                    <div id="circles">
                      {this.state.recipe[0].fiber ? this.state.recipe[0].fiber.label : "No Fiber"}
                      <div id="circle">
                        {parseInt(this.state.recipe[0].fiber ? this.state.recipe[0].fiber.quantity : 0)}
                        {this.state.recipe[0].fiber ? this.state.recipe[0].fiber.unit : "g"}
                      </div>
                    </div>
                    <div id="circles">
                      {this.state.recipe[0].protein ? this.state.recipe[0].protein.label : "No Protein"}
                      <div id="circle">
                        {parseInt(this.state.recipe[0].protein ? this.state.recipe[0].protein.quantity : 0)}
                        {this.state.recipe[0].protein ? this.state.recipe[0].protein.unit : "g"}
                      </div>
                    </div>
                    <div id="circles">
                      {this.state.recipe[0].sugar ? this.state.recipe[0].sugar.label : "No Sugar"}
                      <div id="circle">
                        {parseInt(this.state.recipe[0].sugar ? this.state.recipe[0].sugar.quantity : 0)}
                        {this.state.recipe[0].sugar ? this.state.recipe[0].sugar.unit : "g"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {this.state.showMenu && (
            <div id="menuOpen">
              <ul>
                {this.state.menus.map(({ title, _id, checked }) => {
                  return (
                    <li key={_id}>
                      {title}
                      <Input type="radio" checked={checked} onClick={() => this.checkMenu(_id)} name={_id}/>{" "}
                      <label htmlFor={_id} />
                      <UncontrolledDropdown size="sm">
                        <DropdownToggle caret>Select Meal</DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem value="Breakfast"onClick={this.handleClickItem}>
                            Breakfast
                          </DropdownItem>
                          <DropdownItem value="Mid Breakfast" onClick={this.handleClickItem}>
                            Mid Breakfast
                          </DropdownItem>
                          <DropdownItem value="Lunch" onClick={this.handleClickItem}>
                            Lunch
                          </DropdownItem>
                          <DropdownItem value="Afternoon Snack" onClick={this.handleClickItem}>
                            Afternoon Snack
                          </DropdownItem>
                          <DropdownItem value="Dinner" onClick={this.handleClickItem}>
                            Dinner
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                  );
                })}
              </ul>
              <Button onClick={() => this.closeMenu()}>Save to recipe</Button>
            </div>
          )}
        </main>
      </div>
    );
  }
}
export default withRouter(DetailRecipe);
