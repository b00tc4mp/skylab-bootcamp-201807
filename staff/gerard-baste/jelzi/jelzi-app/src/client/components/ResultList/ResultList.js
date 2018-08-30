import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Col, Row } from 'reactstrap';
import './ResultList.css'
  export default class ResultList extends React.Component{ 



    render() {
  return (
    <Row>
    <Col sm='3'>
      <Card className="recipeCard">
        <CardImg top width="100%" src="https://www.edamam.com/web-img/ad4/ad417d143b1af41793ee577775323b5c.jpg" alt="Card image cap" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button className="cardButton">Recipe Info</Button>
        </CardBody>
      </Card>
      </Col>
      <Col sm='3'>
      <Card className="recipeCard">
        <CardImg top width="100%" src="https://www.edamam.com/web-img/940/9402b53a030584c94c628d3124e0b00d.jpg" alt="Card image cap" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button className="cardButton">Recipe Info</Button>
        </CardBody>
      </Card>
      </Col>
      <Col sm='3'>
      <Card className="recipeCard">
        <CardImg top width="100%" src="https://www.edamam.com/web-img/41f/41f87527213a178c296d9f51b009df26.jpg" alt="Card image cap" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button className="cardButton">Recipe Info</Button>
        </CardBody>
      </Card>
      </Col>
      <Col sm='3'>
      <Card className="recipeCard">
        <CardImg top width="100%" src="https://www.edamam.com/web-img/dee/deeee31dde25ce2a366746246eb79639.jpg" alt="Card image cap" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button className="cardButton">Recipe Info</Button>
        </CardBody>
      </Card>
      </Col>
      <Col sm='3'>
      <Card className="recipeCard">
        <CardImg top width="100%" src="https://www.edamam.com/web-img/0f7/0f7cb6fc5134dda07255599d93bddeda.jpg" alt="Card image cap" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button className="cardButton">Recipe Info</Button>
        </CardBody>
      </Card>
      </Col>
    </Row>
  );
};
  }
