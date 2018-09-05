import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Col, Row } from 'reactstrap';
import './ResultList.css'
import {Link} from 'react-router-dom'
import {Doughnut} from 'react-chartjs-2';
  export default class ResultList extends React.Component{ 

    render() {
      return (
            <Row>
              {this.props.recipesResults.map(item => {
                let recipeId = item.uri.replace('http://www.edamam.com/ontologies/edamam.owl#recipe_','')
                return(
                  <Col sm='3'>
                    <Card className="recipeCard" id={recipeId}>
                      <CardImg top width="100%" src={item.image} alt="Card image cap" />
                      <CardBody>
                        <CardTitle>{item.label}</CardTitle>
                        <CardText>Servings: {item.yield}</CardText>
                        <Link to={`/recipe/${recipeId}`}><Button className="cardButton">Recipe Info</Button></Link>
                      </CardBody>
                    </Card>
                    </Col>
                )
              })}
            </Row>
      );
    };
}
