import React from 'react'
import { connect } from 'react-redux';
import { NoResults } from '../../index'
import './BasicInformation.css'
import {
    Card, 
    CardHeader, 
    CardBody,
    Table
} from 'reactstrap';
const BasicInformation = (props) => {
    const { summonerData } = props
    return (
        <Card id="user-data">
            <CardHeader><i className="fas fa-address-card fa-lg"></i> Basic Information</CardHeader>
            {summonerData.summonerLevel ? <CardBody>
                {summonerData.tier ?
                    <img id="league-img" src={`/images/${summonerData.tier}.png`} width="130px" alt="league-img" />
                    :
                    <img id="league-img" src='/images/provisional.png' width="130px" alt="league-img" />
                }
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
                            {summonerData.summonerLevel ? <td>{summonerData.summonerLevel}</td> : <td>No Level</td>}
                            {summonerData.tier ? <td>{summonerData.tier}</td> : <td>No Tier</td>}
                            {summonerData.rank ? <td>{summonerData.rank}</td> : <td>No Rank</td>}
                        </tr>
                    </tbody>
                </Table>
            </CardBody>
                :
                <CardBody><NoResults /></CardBody>
            }
        </Card>
    )
}

const mapStateToProps = (state) => {
    return {
        summonerData: state.summoner.summonerData,
    }
}

export default connect(mapStateToProps)(BasicInformation)