import React from 'react'
import {
    Form, InputGroup, Input, InputGroupAddon, Button, UncontrolledCollapse, CardBody, Card
} from 'reactstrap';
import {logic} from '../../logic'
import './Menus.css'
import {Link} from 'react-router-dom'


export default class Menus extends React.Component {
   state = {
    title: "",
    menus: [],
    dishes: [],
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

    
    deleteMenu = (_id) => {
        const { email, token } = this.props;
        logic.removeMenu(email, _id, token)
        .then(()=>{
            //sweetalert
            this.getList()
            
        })
    }

    keepTitle = event => this.setState({title: event.target.value})

    render() {
        return  <div id="menusPanel">
   
      <Form onSubmit={this.onSubmit}> 
        <InputGroup id="createMenuInput">
          <Input value={this.state.title} onChange={this.keepTitle} placeholder="Create your menu" autoFocus="true" autoComplete="off" required />
          <InputGroupAddon addonType="append"><Button id="searchButton">Create Menu</Button></InputGroupAddon>
        </InputGroup>
        </Form>
        <ul>
        <div id="menusFlex">

            {this.state.menus.map(({title, _id, dishes}) => {
                debugger
                const titleMenu = title.replace(/ /g, "")

                return (
                    <div id="listRecipes">           
                        <a href="#" id={titleMenu}><p id="listMenus" id={_id}>{title}</p></a>
                        <Button id="iconTrash" onClick={(e) => { e.preventDefault(); this.deleteMenu(_id)}}><i class="far fa-trash-alt"></i></Button>
                        <UncontrolledCollapse toggler={titleMenu}>
                            {dishes.length !== 0 && dishes.map(({titleDish, _id, recipeId}) => {
                                return <div>
                                            <Card>
                                                <CardBody id={recipeId}>
                                                <Link to={`/recipe/${recipeId}`}><Button > {titleDish} </Button></Link>
                                                </CardBody>
                                            </Card>
                                        </div>
                            })}
                        </UncontrolledCollapse>
                    </div>
                ) 
            })}
        </div>
        </ul> 
      </div>
    }







}