import React, { Component } from 'react'
import ScrollUpButton from 'react-scroll-up-button'
import { Card, CardImg, CardTitle, CardText, CardDeck, CardSubtitle, CardBody, Row, Col, CardLink} from 'reactstrap'

class ListNews extends Component{
    render(){
        const { news } = this.props
        return (<div>
            <Row>
                <Col>
                <CardDeck>
                    {news.map(data => <Col sm='2' md='4' lg='3'>      
                        <Card key={news.idNew}>
                                <CardImg top width='100%' src={data.imageurl} alt='New image' />
                                <CardBody className='card-body'>
                                    <CardTitle>{data.title}</CardTitle>
                                    <CardSubtitle>{data.source}</CardSubtitle>
                                    <CardText>{data.body}</CardText>
                                    <CardLink href={data.url} target='_blank'>Go to {data.source}</CardLink>
                                </CardBody>
                        </Card>
                        </Col>)}    
                </CardDeck>
                </Col>
            </Row>
            <ScrollUpButton />
            </div>
        )

    }
}

export default ListNews