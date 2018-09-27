import React, { Component } from 'react'
import './League.css'
import { connect } from 'react-redux';
import { league } from '../../redux/actions/leagueActions';
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Table,
    Button

} from 'reactstrap';
import {
    BasicLeagueInformation,
    DivisionPlayerList,
    NoResults,
} from '../index'
class League extends Component {

    componentDidMount() {
        if (this.props.summonerData && this.props.summonerData.leagueId) this.props.league(this.props.summonerData.leagueId)
    }

    render() {
        const { props: { leagueData, summonerData } } = this
        return (
            <div>
                {summonerData && <div>
                    {summonerData.leagueId && <div>
                        {leagueData && <Row id="user-matches">
                            <Col xs ="12" sm="12" md="8" lg="4">
                                <BasicLeagueInformation />
                            </Col>
                            <Col xs ="12" sm="12" md="8" lg="8">
                                <DivisionPlayerList />
                            </Col>
                        </Row>}
                        {!leagueData && <Row id="user-matches">
                            <Col xs ="12" sm="12" md="8" lg="4">
                                <Card id="user-data">
                                    <CardHeader><i className="fas fa-address-card fa-lg"></i> League Information</CardHeader>
                                    <CardBody>
                                        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xs ="12" sm="12" md="8" lg="8">
                                <Card id="user-champion-stats">
                                    <CardHeader><i className="fas fa-list-ul fa-lg"></i>Division</CardHeader>
                                    <CardBody>
                                        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>}

                    </div>}
                    {!summonerData.leagueId && <div>

                        {!leagueData && <Row id="user-matches">
                            <Col xs ="12" sm="12" md="8" lg="4">
                                <Card id="user-data">
                                    <CardHeader><i className="fas fa-address-card fa-lg"></i> League Information</CardHeader>
                                    <CardBody><NoResults /></CardBody>
                                </Card>
                            </Col>
                            <Col xs ="12" sm="12" md="8" lg="8">
                                <Card id="user-champion-stats">
                                    <CardHeader><i className="fas fa-list-ul fa-lg"></i>Division</CardHeader>
                                    <CardBody><NoResults /></CardBody>
                                </Card>
                            </Col>
                        </Row>}

                    </div>}

                </div>}

                {!summonerData && <Row id="user-matches">
                    <Col xs ="12" sm="12" md="8" lg="4">
                        <Card id="user-data">
                            <CardHeader><i className="fas fa-address-card fa-lg"></i> League Information</CardHeader>
                            <CardBody><NoResults /></CardBody>
                        </Card>
                    </Col>
                    <Col xs ="12" sm="12" md="8" lg="8">
                        <Card id="user-champion-stats">
                            <CardHeader><i className="fas fa-list-ul fa-lg"></i>Division</CardHeader>
                            <CardBody><NoResults /></CardBody>
                        </Card>
                    </Col>
                </Row>}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        leagueData: state.league.leagueData,
        leagueError: state.league.leagueError,
        summonerData: state.summoner.summonerData,
        summonerError: state.summoner.summonerError,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        league: (leagueId) => dispatch(league(leagueId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(League)
