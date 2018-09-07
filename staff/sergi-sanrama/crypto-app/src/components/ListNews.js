import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody, Row, Col} from 'reactstrap';

class ListNews extends Component{
    render(){
        const { news } = this.props
        return (
            <Row>
                <CardDeck>
                    {news.map(data => <Col sm='3'>      
                        <Card key={news.idNew}>
                                <CardImg top width="100%" src={data.imageurl} alt="New image" />
                                <CardBody >
                                <CardTitle>{data.title}</CardTitle>
                                <CardSubtitle>{data.source}</CardSubtitle>
                                <CardText>{data.body}</CardText>
                                <Link to={data.url}><Button className="cardButton">Source: {data.source}</Button></Link>
                            </CardBody>
                            </Card>
                        </Col>
                    )}    
                </CardDeck>
            </Row>
        )

    }
}

export default ListNews