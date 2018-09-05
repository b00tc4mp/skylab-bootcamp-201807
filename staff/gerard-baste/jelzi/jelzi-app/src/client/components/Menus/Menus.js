import React from 'react'
import {
    Form, InputGroup, Input, InputGroupAddon, Button
} from 'reactstrap';
import {logic} from '../../logic'


export default class Menus extends React.Component {
   state = {
    title: "",
    menus: [],
   }

   getList(){
    const { email, token } = this.props;
    logic.listMenus(email, token)
    .then(menus=>{
        this.setState({menus})
    })
   }

   componentDidMount(){
   this.getList()
   }

    onSubmit = (event)=>{
        event.preventDefault();
        
        const { email, token } = this.props;
        logic.addMenu(email, this.state.title, token)
        .then(()=>{
            //sweetalert
            this.getList()
            
        })
    }

    keepTitle = event => this.setState({title: event.target.value})

    render() {
        return  <div id="menusPanel">
   
      <Form onSubmit={this.onSubmit}> 
        <InputGroup>
          <Input id="searchInput" value={this.state.title} onChange={this.keepTitle} placeholder="Create your menu" autoFocus="true" autoComplete="off" />
          <InputGroupAddon addonType="append"><Button id="searchButton">Create Menu</Button></InputGroupAddon>
        </InputGroup>
        </Form>
        <ul>
            {this.state.menus.map(({title})=>{
                return <li>{title}</li>
            })}
        </ul>
      </div>
    }







}