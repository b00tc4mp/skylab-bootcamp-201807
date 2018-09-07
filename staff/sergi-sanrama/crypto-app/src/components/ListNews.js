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
                <Col sm='3'>
                        {news.map(data => <div key={news.idNew}>
                            <Card>
                                <CardImg top width="100%" src={data.imageurl} alt="New image" />
                                <CardBody>
                                <CardTitle>{data.title}</CardTitle>
                                <CardSubtitle>{data.source}</CardSubtitle>
                                <CardText>{data.body}</CardText>
                                <Link to={data.url}><Button className="cardButton">View original new in {data.source}</Button></Link>
                            </CardBody>
                            </Card>
                            </div>)}
                    </Col>
                </CardDeck>
            </Row>
        )

    }
}

export default ListNews