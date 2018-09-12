import React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  Input,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  FormText
} from "reactstrap";
import "./Search.css";
import ResultList from "../ResultList/ResultList";
import { logic } from "../../logic";

export default class Search extends React.Component {
  state = { query: "" };

  keepQuery = event => {
    this.setState({ query: event.target.value });
  };

  onSearch = event => {
    event.preventDefault();
    const {
      state: { query }
    } = this;
    this.props.onSearch(query);
  };

  render() {
    return (
      <div id="searchPanel">
        <Form onSubmit={this.onSearch}>
          <InputGroup>
            <Input
              id="searchInput"
              onChange={this.keepQuery}
              placeholder="Search a recipe..."
              autoFocus="true"
              autoComplete="off"
              required
            />

            <InputGroupAddon addonType="append">
              <Button id="searchButton">Search</Button>
            </InputGroupAddon>
          </InputGroup>
          {!this.props.isLoggedIn ? (
            <FormText className="textInformation" color="muted">
              If you want filter by allergens and add recipes to menu, please go
              to Register.
            </FormText>
          ) : (
            ""
          )}
        </Form>
      </div>
    );
  }
}
