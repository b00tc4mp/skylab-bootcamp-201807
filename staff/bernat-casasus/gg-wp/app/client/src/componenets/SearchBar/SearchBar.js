import React from 'react';
import './SearchBar.css'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
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
 } from 'reactstrap';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.handlerSearch = this.handlerSearch.bind(this)
    this.state = {
      dropdownOpen: false,
      splitButtonOpen: false,
      searchQuery: ''
    };
  }

  keepSearchQuery = e => this.setState({searchQuery: e.target.value})

  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  toggleSplit() {
    this.setState({
      splitButtonOpen: !this.state.splitButtonOpen
    });
  }

  handlerSearch(e){
    e.preventDefault();
    this.setState({searchQuery:''})
    this.props.history.push(`/summoner/${this.state.searchQuery}`)
  }

  render() {
    const {state:{ searchQuery, dropdownOpen }, props: { isSearchBarActive }, toggleDropDown, keepSearchQuery} = this
    return (
      <div id={isSearchBarActive ?  "searchPanel-mini": "searchPanel" }>
      <Form onSubmit={this.handlerSearch}>
        <InputGroup>
          <Input id={isSearchBarActive  ? "searchInput-mini":"searchInput"} placeholder="write a Summoner name.." autoFocus="true" autoComplete="off" value={searchQuery} onChange={keepSearchQuery}/>

          <InputGroupButtonDropdown addonType="append" isOpen={dropdownOpen} toggle={toggleDropDown}>
            <DropdownToggle caret id={isSearchBarActive ?  "selectRegion-mini": "selectRegion" }>
              EUW
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Select Region</DropdownItem>
              <DropdownItem>Europe West</DropdownItem>
            </DropdownMenu>
          </InputGroupButtonDropdown>
          <InputGroupAddon addonType="append"><Button id={isSearchBarActive ?  "searchButton-mini": "searchButton" }>.GG</Button></InputGroupAddon>
        </InputGroup>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSearchBarActive: state.searchBar.isSearchBarActive,
  }
}

export default withRouter(connect(mapStateToProps)(SearchBar));