import React from 'react'
import './DivisionPlayerList.css'
import {
    Card,
    CardHeader,
    CardBody,
    Table
} from 'reactstrap';
import { connect } from 'react-redux';
import { NoResults } from '../../index'

const DivisionPlayerList = (props) => {
    const { leagueData, currentDivision, summonerData } = props
    return (
        <Card id="user-champion-stats">
            <CardHeader><i className="fas fa-list-ul fa-lg"></i>Division {currentDivision.currentRankNum}</CardHeader>
            <CardBody>
                <Table striped responsive>
                    <thead className="league-item">
                        <tr>
                            <th> </th>
                            <th className="league-name">Name</th>
                            <th>Veteran</th>
                            <th>Hot Streak</th>
                            <th>Victory</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody className="league-item">
                        {
                            leagueData[props.currentDivision.currentRank].map((summoner) => {
                                if (summonerData.name === summoner.playerOrTeamName) {
                                    return (
                                        <tr className="featured-summoner">
                                            <td><img src={`/images/${leagueData.tier}.png`} width="45px" alt="league-img" /></td>
                                            <td className="league-name">{summoner.playerOrTeamName}</td>
                                            <td><i class={`${summoner.veteran ? 'dark' : ''} fas fa-trophy`}></i></td>
                                            <td><i class={`${summoner.hotStreak ? 'dark' : ''} fas fa-fire`}></i></td>
                                            <td><div className="wins-graph">{summoner.wins}</div><div className="losses-graph">{summoner.losses}</div></td>
                                            <td>{summoner.leaguePoints}</td>
                                        </tr>
                                    )
                                }
                                return (
                                    <tr>
                                        <td><img src={`/images/${leagueData.tier}.png`} width="45px" alt="league-img" /></td>
                                        <td className="league-name">{summoner.playerOrTeamName}</td>
                                        <td><i class={`${summoner.veteran ? 'dark' : ''} fas fa-trophy`}></i></td>
                                        <td><i class={`${summoner.hotStreak ? 'dark' : ''} fas fa-fire`}></i></td>
                                        <td><div className="wins-graph">{summoner.wins}</div><div className="losses-graph">{summoner.losses}</div></td>
                                        <td>{summoner.leaguePoints}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    )
}

const mapStateToProps = (state) => {
    return {
        leagueData: state.league.leagueData,
        currentDivision: state.league.currentDivision,
        summonerData: state.summoner.summonerData,
    }
}

export default connect(mapStateToProps)(DivisionPlayerList)