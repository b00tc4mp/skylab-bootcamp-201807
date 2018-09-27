import React from 'react'
import {Doughnut, Pie, Polar, HorizontalBar} from 'react-chartjs-2'
import { Container, Col, Row } from 'reactstrap'




const Stats = (props) => {
    return (
        <Container>
            <Row>
                <Col xs="4">
                    <Pie
                    data={props.chartData}
                    width={400}
                    height={400}
                    options={{
                        title: {
                            display: true,
                            text: 'Portfolio Value - Pie',
                            fontSize: 15
                        },
                        legend:{
                            display: true,
                            position: 'bottom'
                        },}} />
                    </Col>
                    <Col xs="4" md={{ offset: 4 }}>
                        <Doughnut
                        data={props.chartData2}
                        width={400}
                        height={400}
                        options={{
                            title: {
                                display: true,
                                text: 'Portfolio Quantity - Doughnut',
                                fontSize: 15
                            },
                            legend:{
                                display: true,
                                position: 'bottom'
                            }
                        }}
                        />
                </Col>
            </Row>
            <Row>
                <Col xs="4">
                    <Polar
                    data={props.chartData}
                    width={400}
                    height={400}
                    options={{
                        title: {
                            display: true,
                            text: 'Portfolio Value - Polar ',
                            fontSize: 15
                        },
                        legend:{
                            display: true,
                            position: 'bottom'
                        },}} />
                    </Col>
                    <Col xs="4" md={{ offset: 4 }}>
                        <HorizontalBar
                        data={props.chartData2}
                        width={400}
                        height={400}
                        options={{
                            title: {
                                display: true,
                                text: 'Portfolio Quantity - HorizontalBar',
                                fontSize: 15
                            },
                            legend:{
                                display: true,
                                position: 'bottom'
                            }
                        }}
                        />
                </Col>
            </Row>
        </Container>
        
    
        

    

    )
}

export default Stats