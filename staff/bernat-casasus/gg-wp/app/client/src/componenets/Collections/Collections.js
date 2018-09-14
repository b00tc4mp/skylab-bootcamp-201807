import React, { Component } from 'react';
import {
    Card, Button, CardHeader, CardFooter, CardBody,
    Form, FormGroup, Label, Input, Container, Row, Col, Table
} from 'reactstrap';
import { withRouter } from 'react-router-dom'
import './Collections.css'
import { Feedback } from "../index";

import { connect } from 'react-redux';
import { collection } from '../../redux/actions/collectionAtions';

class Collections extends Component {

    componentDidMount() {
        this.props.collection('set')
    }

    handleViewProfile = (summonerName) => {
        this.props.history.push(`/summoner/${summonerName}`)
    }

    handleDeleteUser = (summonerId) => {
        this.props.collection('rm', summonerId)
    }

    render() {

        const { props: { collectionData, collectionError, collectionFeedBack } } = this
        return (
            <div className="collections-container">
                <Container>
                    {collectionError && <Feedback message={collectionError} color="info"/>}
                    {collectionFeedBack && <Feedback message={collectionFeedBack} color="success" />}
                    {collectionData && <Row>
                        {
                            collectionData.map((summoner) => {

                                return (
                                    <Col xs="12" sm="12" md="6" lg="4">
                                        <Card id="user-profil-preview">
                                            <CardBody>
                                                <div class="card-header">
                                                    <img className="preview-profile-icon" src={`${summoner.profileIcon}`} width="35px" alt="league-img" /> {summoner.name} - {summoner.leagueName ? `${summoner.leagueName}` : 'Unranked'}
                                                </div>
                                                {summoner.tier ? <img className="preview-league-img" src={`/images/${summoner.tier}.png`} width="130px" alt="league-img" /> : <img className="preview-league-img" src={`/images/provisional.png`} width="130px" alt="league-img" />}
                                                <Table id="card-conmtainer" striped responsive>
                                                    <thead>
                                                        <tr>
                                                            <th>Level</th>
                                                            <th>Tier</th>
                                                            <th>Rank</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>{summoner.summonerLevel}</td>
                                                            <td>{summoner.tier}</td>
                                                            <td>{summoner.rank}</td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                                <div className="preview-profile-btn-container">
                                                    <Button id="view-profile-btn" onClick={() => this.handleViewProfile(summoner.name)}>View Profile</Button> <Button id="delete-user" onClick={() => this.handleDeleteUser(summoner.id)}>Unfollow</Button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                )

                            })
                        }
                    </Row>}
                    {collectionData.length === 0 && <Row>
                        <Col></Col>
                        <Col xs="12" sm="12" md="8" lg="4">
                            <div id="no-results-container">
                            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                                <p>If it is taking too long, it is provably because you don not have any summonor on your collection!</p>
                            </div>
                        </Col>
                        <Col></Col>

                    </Row>}
                </Container>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        collectionData: state.collection.collectionData,
        collectionFeedBack: state.collection.collectionFeedBack,
        collectionError: state.collection.collectionError,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        collection: (action, id) => dispatch(collection(action, id)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Collections));