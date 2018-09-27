import React from 'react'
import { connect } from 'react-redux';
import { NoResults } from '../../index'
import './ChampionsStats.css'
import {
    Card,
    CardHeader,
    CardBody,
    Table
} from 'reactstrap';
const ChampionsStats = (props) => {
    const { summonerData } = props
    return (
        <Card id="user-champion-stats">
            <CardHeader><i className="fas fa-list-ul fa-lg"></i> Champions Stats</CardHeader>
            <CardBody>
                {summonerData.championsStats ? <Table striped responsive>
                    <thead>
                        <tr>
                            <th> </th>
                            <th>Name</th>
                            <th>KDA</th>
                            <th>Gold Avg.</th>
                            <th>CS Avg.</th>
                            <th>Times Played</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            summonerData.championsStats.map((champion) => {
                                return (
                                    <tr>

                                        <td><img src={champion.championIcon} width="45px" alt="league-img" /></td>
                                        <td>{champion.name}</td>
                                        <td>{champion.kda}</td>
                                        <td>{champion.goldAvg}</td>
                                        <td>{champion.minionsKilledAvg}</td>
                                        <td>{champion.timesPlayed}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                    :
                    <NoResults />
                }
            </CardBody>
        </Card>
    )
}

const mapStateToProps = (state) => {
    return {
        summonerData: state.summoner.summonerData,
    }
}

export default connect(mapStateToProps)(ChampionsStats)