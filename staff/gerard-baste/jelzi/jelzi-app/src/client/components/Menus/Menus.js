import React from "react";
import {
  Form,
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  UncontrolledCollapse,
  CardBody,
  Card
} from "reactstrap";
import { logic } from "../../logic";
import "./Menus.css";
import { Link } from "react-router-dom";
import UserSuccesful from "../SuccedPanel/UserSuccesful";
import swal from "sweetalert2";

export default class Menus extends React.Component {
  state = {
    title: "",
    menus: [],
    dishes: [],
    breakfast: [],
    midBreakfast: [],
    launch: [],
    afternoon: [],
    dinner: []
  };

  getList() {
    const { email, token } = this.props;
    logic
      .listMenus(email, token)
      .then(menus => {
        debugger;
        this.setState({ menus });
      })
      .then(() => {
        this.otherList();
      });
  }

  otherList() {
    this.state.menus.map(({ title, _id, dishes }) => {
      dishes.length !== 0 &&
        dishes.map(({ titleDish, _id, recipeId }) => {
          if (titleDish === "Breakfast") {
            this.setState({ breakfast: recipeId });
          } else if (titleDish === "Mid Breakfast") {
            this.setState({ midBreakfast: recipeId });
          } else if (titleDish === "Launch") {
            this.setState({ launch: recipeId });
          } else if (titleDish === "Afternoon Snack") {
            this.setState({ afternoon: recipeId });
          } else {
            this.setState({ dinner: recipeId });
          }
        });
    });
  }

  componentDidMount() {
    this.getList();
  }

  onSubmit = event => {
    event.preventDefault();
    const { email, token } = this.props;
    logic.addMenu(email, this.state.title, token).then(() => {
      UserSuccesful("Menu created");
      this.getList();
    });
  };

  deleteMenu = _id => {
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
        swal("Deleted!", "Your Menu has been deleted.", "success");
        const { email, token } = this.props;
        return logic.removeMenu(email, _id, token).then(() => {
          this.getList();
        });
      }
    });
  };

  keepTitle = event => this.setState({ title: event.target.value });

  render() {
    return (
      <div id="menusPanel">
        <Form onSubmit={this.onSubmit}>
          <InputGroup id="createMenuInput">
            <Input
              value={this.state.title}
              onChange={this.keepTitle}
              placeholder="Create your menu"
              autoFocus="true"
              autoComplete="off"
              required
            />
            <InputGroupAddon addonType="append">
              <Button id="searchButton">Create Menu</Button>
            </InputGroupAddon>
          </InputGroup>
        </Form>
        <ul>
          <div id="menusFlex">
            {this.state.menus.map(({ title, _id, dishes }) => {
              const titleMenu = title.replace(/ /g, "");

              return (
                <div id="listRecipes">
                  <Link id="linkDecoration" to={`/menu/${_id}`}>
                    <a id={titleMenu}>
                      <p className="listMenus" id={_id}>
                        {title}
                      </p>
                    </a>
                  </Link>
                  <Button
                    id="iconTrash"
                    onClick={e => {
                      e.preventDefault();
                      this.deleteMenu(_id);
                    }}
                  >
                    <i class="far fa-trash-alt" />
                  </Button>
                </div>
              );
            })}
          </div>
        </ul>
      </div>
    );
  }
}
