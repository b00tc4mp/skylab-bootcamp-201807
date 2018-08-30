import React from 'react'
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
 import './Search.css'



export default class Search extends React.Component{ 



render() {
    return  <div id="searchPanel">
   
      <Form > 
        <InputGroup>
          <Input id="searchInput" placeholder="Search a recipe..." autoFocus="true" autoComplete="off"  />
          <InputGroupAddon addonType="append"><Button id="searchButton">Search</Button></InputGroupAddon>
        </InputGroup>
        </Form>
      </div>
}
    }
