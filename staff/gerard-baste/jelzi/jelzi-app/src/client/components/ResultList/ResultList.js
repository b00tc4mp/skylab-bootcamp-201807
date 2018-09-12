import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Col, Row } from 'reactstrap';
import './ResultList.css'
import {Link} from 'react-router-dom'

// import UserError from '../ErrorPanel/UserError'

import swal from 'sweetalert2'
import UserError from '../ErrorPanel/UserError';

let timerInterval
  export default class ResultList extends React.Component{
    
    renderError = () => {
      UserError(this.props.recipesErrorQuery)

      return
    }

    render() {
      return (
        <div>
            <Row>
              {!this.props.recipesError ? 
              this.props.recipesResults.map(item => {
                let recipeId = item.uri.replace('http://www.edamam.com/ontologies/edamam.owl#recipe_','')
                return (
                  <Col sm='3'>
                    <Card className="recipeCard" id={recipeId}>
                      <CardImg top width="100%" src={item.image} alt="Card image cap" />
                      <CardBody className="displayRecipes" >
                        <CardTitle>{item.label}</CardTitle>
                        <Link to={`/recipe/${recipeId}`}><Button className="cardButton">Recipe Info</Button></Link>
                      </CardBody>
                    </Card>
                    </Col>
                )
                })
                : this.renderError()
              }
            </Row>
            </div>
      );
    };
}

 
//<div><p>Recipes not found with {this.props.query}</p></div>