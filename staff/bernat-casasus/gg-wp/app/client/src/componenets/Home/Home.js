import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './Home.css'
import { SearchBar } from "../index";
import { connect } from 'react-redux';
import { toggleSearchBar } from '../../redux/actions/searchBarAction';
class Home extends React.Component {

    state = {
        logos: ['logo-aurelionsol','logo-aatrox','logo-cho','logo-bardo','logo-project-vayne','logo-poro','logo-cassiopea','logo-gragas','logo-ninja']
    }
    componentDidMount(){
        this.props.toggleSearchBar(false)
    }
    componentWillUnmount(){
        this.props.toggleSearchBar(true)
    }

    render() {
        
        return (
            <div className="main">
                <Container className="main">
                    <Row id="welcomeImg">
                        <Col></Col>
                        <Col><img id="search-img" src={`/images/${this.state.logos[`${Math.floor(Math.random() * (this.state.logos.length))}`]}.png`} alt="searchImage" /></Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col xs ="12" sm="12" md="12" lg="8"><SearchBar/></Col>
                        <Col></Col>
                    </Row>
                    <Row id="info-row">
                        <Col></Col>
                        <Col sm="12">
                            <div className="card" id="card-style">
                                <h6 className="card-header">First time user?</h6>
                                <div className="card-body" id="welcomeInfo">
                                    <Container>
                                        <Row>
                                            <Col className ="info-container">
                                          
                                                <h5 className="card-title">Analize your enemies</h5>
                                                <p className="card-text">Check your game stats.</p>
                                                <a href="/#"><img src="/images/info_1.png" alt="viewYourStats" /></a>
                                          
                                                </Col>
                                            <Col className ="info-container">
                                                <h5 className="card-title">Match details</h5>
                                                <p className="card-text">Find out the best players.</p>
                                                <a href="/#"><img src="/images/info_2.png" alt="viewYourStats" /></a>
                                            </Col>
                                            <Col className ="info-container">
                                                <h5 className="card-title">View all your maches</h5>
                                                <p className="card-text">Review why you win or lose.</p>
                                                <a href="/#"><img src="/images/info_3.png" alt="viewYourStats" /></a>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                            </div>

                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleSearchBar: (state) => dispatch(toggleSearchBar(state)),
    }
}
export default connect(null, mapDispatchToProps)(Home)