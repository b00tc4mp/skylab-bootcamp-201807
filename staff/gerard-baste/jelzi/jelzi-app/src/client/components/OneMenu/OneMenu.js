import React from "react";
import {
  Form,
  InputGroup,
  Row,
  Input,
  InputGroupAddon,
  Button,
  UncontrolledCollapse,
  CardBody,
  Card,
  Col,
  CardImg,
  CardTitle,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { logic } from "../../logic";
import "./OneMenu.css";
import { Link } from "react-router-dom";
import swal from "sweetalert2";

export default class OneMenu extends React.Component {
  state = {
    selectText: "Select your meals",
    breakfastId: [],
    midBreakfastId: [],
    lunchId: [],
    afternoonId: [],
    dinnerId: [],
    breakfastRecipes: [],
    midBreakfastRecipes: [],
    lunchRecipes: [],
    afternoonRecipes: [],
    dinnerRecipes: []
  };

  componentDidMount() {
    this.listDishes();
  }

  listDishes() {
    this.setState(
      {
        breakfastRecipes: [],
        breakfastId: [],
        midBreakfastRecipes: [],
        midBreakfastId: [],
        lunchRecipes: [],
        lunchId: [],
        afternoonRecipes: [],
        afternoonId: [],
        dinnerRecipes: [],
        dinnerId: []
      },
      () => {
        logic
          .listDishes(this.props.email, this.props.menuId, this.props.token)
          .then(recipes => {
            recipes.length !== 0 &&
              recipes.map(({ titleDish, recipeId }) => {
                if (titleDish == "Breakfast") {
                  this.setState({
                    breakfastId: this.state.breakfastId.concat([recipeId])
                  });
                } else if (titleDish == "Mid Breakfast") {
                  this.setState({
                    midBreakfastId: this.state.midBreakfastId.concat([recipeId])
                  });
                } else if (titleDish == "Lunch") {
                  this.setState({
                    lunchId: this.state.lunchId.concat([recipeId])
                  });
                } else if (titleDish == "Afternoon Snack") {
                  this.setState({
                    afternoonId: this.state.afternoonId.concat([recipeId])
                  });
                } else if (titleDish === "Dinner") {
                  this.setState({
                    dinnerId: this.state.dinnerId.concat([recipeId])
                  });
                }
              });
          });
      }
    );
  }

  deleteRecipe(recipeId, titleDish) {
    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        swal("Deleted!", "Your Recipe has been deleted.", "success");

        return logic
          .removeDish(
            this.props.email,
            this.props.menuId,
            recipeId,
            this.props.token
          )
          .then(() => {
            if (titleDish == "Breakfast") {
              let prevIds = this.state.breakfastId;
              prevIds.splice(prevIds.indexOf(recipeId), 1);

              this.setState(
                {
                  breakfastId: prevIds
                },
                () => {
                  this.listBrekfastRecipeById();
                }
              );
            } else if (titleDish == "Mid Breakfast") {
              let prevIds = this.state.midBreakfastId;
              prevIds.splice(prevIds.indexOf(recipeId), 1);

              this.setState(
                {
                  midBreakfastId: prevIds
                },
                () => {
                  this.listMidBrekfastRecipeById();
                }
              );
            } else if (titleDish == "Lunch") {
              let prevIds = this.state.lunchId;
              prevIds.splice(prevIds.indexOf(recipeId), 1);

              this.setState(
                {
                  lunchId: prevIds
                },
                () => {
                  this.listLunchRecipeById();
                }
              );
            } else if (titleDish == "Afternoon Snack") {
              let prevIds = this.state.afternoonId;
              prevIds.splice(prevIds.indexOf(recipeId), 1);

              this.setState(
                {
                  afternoonId: prevIds
                },
                () => {
                  this.listAfternoonRecipeById();
                }
              );
            } else if (titleDish === "Dinner") {
              let prevIds = this.state.dinnerId;
              prevIds.splice(prevIds.indexOf(recipeId), 1);

              this.setState(
                {
                  dinnerId: prevIds
                },
                () => {
                  this.listDinnerRecipeById();
                }
              );
            }
          });
      }
    });
  }

  listBrekfastRecipeById() {
    const breakfast = this.state.breakfastId;

    if (breakfast) {
      const breakfastPromises = breakfast.map(recipeId =>
        logic.basicSearchRecipeById(recipeId).then(recipe => {
          return {
            recipeId,
            recipeLabel: recipe[0].label,
            recipeImage: recipe[0].image
          };
        })
      );

      Promise.all(breakfastPromises).then(breakfastRecipesState => {
        this.setState({
          breakfastRecipes: breakfastRecipesState,
          midBreakfastRecipes: [],
          lunchRecipes: [],
          afternoonRecipes: [],
          dinnerRecipes: [],
          selectText: "Breakfast"
        });
      });
    } else {
      this.setState({ selectText: "Breakfast" });
    }
  }

  listMidBrekfastRecipeById() {
    const midBreakfast = this.state.midBreakfastId;

    if (midBreakfast) {
      const midBreakfastPromises = midBreakfast.map(recipeId =>
        logic.basicSearchRecipeById(recipeId).then(recipe => {
          return {
            recipeId,
            recipeLabel: recipe[0].label,
            recipeImage: recipe[0].image
          };
        })
      );

      Promise.all(midBreakfastPromises).then(midBreakfastRecipesState => {
        this.setState({
          midBreakfastRecipes: midBreakfastRecipesState,
          breakfastRecipes: [],
          lunchRecipes: [],
          afternoonRecipes: [],
          dinnerRecipes: [],
          selectText: "Mid Breakfast"
        });
      });
    } else {
      this.setState({ selectText: "Mid Breakfast" });
    }
  }

  listLunchRecipeById() {
    const lunch = this.state.lunchId;

    if (lunch) {
      const lunchPromises = lunch.map(recipeId =>
        logic.basicSearchRecipeById(recipeId).then(recipe => {
          return {
            recipeId,
            recipeLabel: recipe[0].label,
            recipeImage: recipe[0].image
          };
        })
      );

      Promise.all(lunchPromises).then(lunchRecipesState => {
        this.setState({
          lunchRecipes: lunchRecipesState,
          breakfastRecipes: [],
          midBreakfastRecipes: [],
          afternoonRecipes: [],
          dinnerRecipes: [],
          selectText: "Lunch"
        });
      });
    } else {
      this.setState({ selectText: "Lunch" });
    }
  }

  listAfternoonRecipeById() {
    const afternoon = this.state.afternoonId;

    if (afternoon) {
      const afternoonPromises = afternoon.map(recipeId =>
        logic.basicSearchRecipeById(recipeId).then(recipe => {
          return {
            recipeId,
            recipeLabel: recipe[0].label,
            recipeImage: recipe[0].image
          };
        })
      );

      Promise.all(afternoonPromises).then(afternoonRecipesState => {
        this.setState({
          afternoonRecipes: afternoonRecipesState,
          breakfastRecipes: [],
          midBreakfastRecipes: [],
          lunchRecipes: [],
          dinnerRecipes: [],
          selectText: "Afternoon Snack"
        });
      });
    } else {
      this.setState({ selectText: "Afternoon Snack" });
    }
  }

  listDinnerRecipeById() {
    const dinner = this.state.dinnerId;

    if (dinner) {
      const dinnerPromises = dinner.map(recipeId =>
        logic.basicSearchRecipeById(recipeId).then(recipe => {
          return {
            recipeId,
            recipeLabel: recipe[0].label,
            recipeImage: recipe[0].image
          };
        })
      );

      Promise.all(dinnerPromises).then(dinnerRecipesState => {
        this.setState({
          dinnerRecipes: dinnerRecipesState,
          breakfastRecipes: [],
          midBreakfastRecipes: [],
          lunchRecipes: [],
          afternoonRecipes: [],
          selectText: "Dinner"
        });
      });
    } else {
      this.setState({ selectText: "Dinner" });
    }
  }

  render() {
    return (
      <div id="allMenusList">
        <div className="heroMenu" />

        <UncontrolledDropdown
          id="dropdownRecipesMenu"
          style={{ textlign: "center" }}
        >
          <DropdownToggle caret>{this.state.selectText}</DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => this.listBrekfastRecipeById()}>
              Breakfast
            </DropdownItem>
            <DropdownItem onClick={() => this.listMidBrekfastRecipeById()}>
              Mid Breakfast
            </DropdownItem>
            <DropdownItem onClick={() => this.listLunchRecipeById()}>
              Lunch
            </DropdownItem>
            <DropdownItem onClick={() => this.listAfternoonRecipeById()}>
              Afternoon Snack
            </DropdownItem>
            <DropdownItem onClick={() => this.listDinnerRecipeById()}>
              Dinner
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>

        <div id="allMenusRecipes">
          <Row>
            {this.state.selectText === "Breakfast" &&
              (this.state.breakfastRecipes.length !== 0 ? (
                this.state.breakfastRecipes.map(
                  ({ recipeId, recipeImage, recipeLabel }) => {
                    return (
                      <div>
                        <Col>
                          <Card
                            className="recipeCard"
                            id={recipeId}
                            style={{ width: "300px" }}
                          >
                            <CardImg
                              top
                              width="100%"
                              src={recipeImage}
                              alt="Card image cap"
                            />
                            <CardBody className="displayRecipes">
                              <CardTitle>{recipeLabel}</CardTitle>
                              <Link to={`/recipe/${recipeId}`}>
                                <Button className="cardButton mt-2 mr-2">
                                  Recipe Info
                                </Button>
                              </Link>
                              <Button
                                className="mt-2 ml-5"
                                id="btnDanger"
                                onClick={() =>
                                  this.deleteRecipe(recipeId, "Breakfast")
                                }
                              >
                                Delete
                              </Button>
                            </CardBody>
                          </Card>
                        </Col>
                      </div>
                    );
                  }
                )
              ) : (
                <p className="recipeError">
                  Recipes for {this.state.selectText} not found
                </p>
              ))}
          </Row>
        </div>

        <div id="allMenusRecipes">
          <Row>
            {this.state.selectText === "Mid Breakfast" &&
              (this.state.midBreakfastRecipes.length !== 0 ? (
                this.state.midBreakfastRecipes.map(
                  ({ recipeId, recipeImage, recipeLabel }) => {
                    return (
                      <div>
                        <Col>
                          <Card
                            className="recipeCard"
                            id={recipeId}
                            style={{ width: "300px" }}
                          >
                            <CardImg
                              top
                              width="100%"
                              src={recipeImage}
                              alt="Card image cap"
                            />
                            <CardBody className="displayRecipes">
                              <CardTitle>{recipeLabel}</CardTitle>
                              <Link to={`/recipe/${recipeId}`}>
                                <Button className="cardButton mt-2 mr-2">
                                  Recipe Info
                                </Button>
                              </Link>
                              <Button
                                className="mt-2 ml-5"
                                id="btnDanger"
                                onClick={() =>
                                  this.deleteRecipe(recipeId, "Mid Breakfast")
                                }
                              >
                                Delete
                              </Button>
                            </CardBody>
                          </Card>
                        </Col>
                      </div>
                    );
                  }
                )
              ) : (
                <p className="recipeError">
                  Recipes for {this.state.selectText} not found
                </p>
              ))}
          </Row>
        </div>

        <div id="allMenusRecipes">
          <Row>
            {this.state.selectText === "Lunch" &&
              (this.state.lunchRecipes.length !== 0 ? (
                this.state.lunchRecipes.map(
                  ({ recipeId, recipeImage, recipeLabel }) => {
                    return (
                      <div>
                        <Col>
                          <Card
                            className="recipeCard"
                            id={recipeId}
                            style={{ width: "300px" }}
                          >
                            <CardImg
                              top
                              width="100%"
                              src={recipeImage}
                              alt="Card image cap"
                            />
                            <CardBody className="displayRecipes">
                              <CardTitle>{recipeLabel}</CardTitle>
                              <Link to={`/recipe/${recipeId}`}>
                                <Button className="cardButton mt-2 mr-2">
                                  Recipe Info
                                </Button>
                              </Link>
                              <Button
                                className="mt-2 ml-5"
                                id="btnDanger"
                                onClick={() =>
                                  this.deleteRecipe(recipeId, "Lunch")
                                }
                              >
                                Delete
                              </Button>
                            </CardBody>
                          </Card>
                        </Col>
                      </div>
                    );
                  }
                )
              ) : (
                <p className="recipeError">
                  Recipes for {this.state.selectText} not found
                </p>
              ))}
          </Row>
        </div>

        <div id="allMenusRecipes">
          <Row>
            {this.state.selectText === "Afternoon Snack" &&
              (this.state.afternoonRecipes.length !== 0 ? (
                this.state.afternoonRecipes.map(
                  ({ recipeId, recipeImage, recipeLabel }) => {
                    return (
                      <div>
                        <Col>
                          <Card
                            className="recipeCard"
                            id={recipeId}
                            style={{ width: "300px" }}
                          >
                            <CardImg
                              top
                              width="100%"
                              src={recipeImage}
                              alt="Card image cap"
                            />
                            <CardBody className="displayRecipes">
                              <CardTitle>{recipeLabel}</CardTitle>
                              <Link to={`/recipe/${recipeId}`}>
                                <Button className="cardButton mt-2 mr-2">
                                  Recipe Info
                                </Button>
                              </Link>
                              <Button
                                className="mt-2 ml-5"
                                id="btnDanger"
                                onClick={() =>
                                  this.deleteRecipe(recipeId, "Afternoon Snack")
                                }
                              >
                                Delete
                              </Button>
                            </CardBody>
                          </Card>
                        </Col>
                      </div>
                    );
                  }
                )
              ) : (
                <p className="recipeError">
                  Recipes for {this.state.selectText} not found
                </p>
              ))}
          </Row>
        </div>

        <div id="allMenusRecipes">
          <Row>
            {this.state.selectText === "Dinner" &&
              (this.state.dinnerRecipes.length !== 0 ? (
                this.state.dinnerRecipes.map(
                  ({ recipeId, recipeImage, recipeLabel }) => {
                    return (
                      <div>
                        <Col>
                          <Card
                            className="recipeCard"
                            id={recipeId}
                            style={{ width: "300px" }}
                          >
                            <CardImg
                              top
                              width="100%"
                              src={recipeImage}
                              alt="Card image cap"
                            />
                            <CardBody className="displayRecipes">
                              <CardTitle>{recipeLabel}</CardTitle>
                              <Link to={`/recipe/${recipeId}`}>
                                <Button className="cardButton mt-2 mr-2">
                                  Recipe Info
                                </Button>
                              </Link>
                              <Button
                                className="mt-2 ml-5"
                                id="btnDanger"
                                onClick={() =>
                                  this.deleteRecipe(recipeId, "Dinner")
                                }
                              >
                                Delete
                              </Button>
                            </CardBody>
                          </Card>
                        </Col>
                      </div>
                    );
                  }
                )
              ) : (
                <p className="recipeError">
                  Recipes for {this.state.selectText} not found
                </p>
              ))}
          </Row>
        </div>
      </div>
    );
  }
}
