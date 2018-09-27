import React from 'react'
import {
    Card, 
    CardHeader, 
    CardBody,
    Row, 
    Col,

} from 'reactstrap';
import {
    BasicInformation,
    WinsAndLosses,
    GameImpact,
    ChampionsStats,
    ChampionsWinrate,
    MainRole
} from '../index'
import { connect } from 'react-redux';

const Summary = (props) => {
    const { summonerData } = props

    return (
        <div>
            {summonerData &&
                <Row id="user-matches">
                    <Col xs ="12" sm="12" md="8" lg="4">
                        <BasicInformation />
                        <WinsAndLosses />
                        <GameImpact />
                    </Col>
                    <Col xs ="12" sm="12" md="8" lg="8">
                        <ChampionsStats />
                        <ChampionsWinrate />
                        <MainRole />
                    </Col>
                </Row>
            }

            {!summonerData &&

                <Row id="user-matches">
                    <Col xs ="12" sm="12" md="8" lg="4">
                        <Card id="user-data" >
                            <CardHeader><i className="fas fa-address-card fa-lg"></i> Basic Information</CardHeader>
                            <CardBody>
                                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                            </CardBody>
                        </Card>
                        <Card id="user-winrate">
                            <CardHeader><i className="fas fa-dot-circle fa-lg"></i> Wins and Losses</CardHeader>
                            <CardBody>
                                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                            </CardBody>
                        </Card>
                        <Card id="user-game-style">
                            <CardHeader><i className="fas fa-list-ul fa-lg"></i> Game Impact</CardHeader>
                            <CardBody>
                                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs ="12" sm="12" md="8" lg="8">
                        <Card id="user-champion-stats">
                            <CardHeader><i className="fas fa-list-ul fa-lg"></i> Champions Stats</CardHeader>
                            <CardBody>
                                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                            </CardBody>
                        </Card>
                        <Card id="user-main-role">
                            <CardHeader><i className="fas fa-chart-line fa-lg"></i> Main Role</CardHeader>
                            <CardBody>
                                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                            </CardBody>
                        </Card>
                        <Card id="user-champion-analytics">
                            <CardHeader><i className="fas fa-chart-bar fa-lg"></i> Champions Winrate</CardHeader>
                            <CardBody>
                                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        summonerData: state.summoner.summonerData,
    }
}

export default connect(mapStateToProps)(Summary)