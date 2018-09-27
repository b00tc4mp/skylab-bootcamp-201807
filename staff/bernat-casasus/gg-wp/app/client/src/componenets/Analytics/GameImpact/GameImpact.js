import React from 'react'
import { connect } from 'react-redux';
import { NoResults } from '../../index'
import './GameImpact.css'
import {
    Card, 
    CardHeader, 
    CardBody,
    Table
} from 'reactstrap';
const GameImpact = (props) => {
    const { summonerData } = props
    return (
        <Card id="user-game-style">
            <CardHeader><i className="fas fa-list-ul fa-lg"></i> Game Impact</CardHeader>
            <CardBody>
                {summonerData.championsStats ? <Table striped responsive>
                    <thead>
                        <tr>
                            <th> </th>
                            <th>Name</th>
                            <th>FirstBloods</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            summonerData.championsStats.map((champion) => {
                                return (
                                    <tr>
                                        <td><img src={champion.championIcon} width="45px" alt="league-img" /></td>
                                        <td>{champion.name}</td>
                                        <td>{champion.totalFirstBloods}</td>
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

export default connect(mapStateToProps)(GameImpact)