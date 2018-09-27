import React from 'react'
import { NoResults } from '../../index'
import './BasicLeagueInformation.css'
import {
    Card,
    CardHeader,
    CardBody,
    Table,
    Button
} from 'reactstrap';
import { connect } from 'react-redux';
import { division } from '../../../redux/actions/divisionActions'

const BasicLeagueInformation = (props) => {
    const { leagueData,summonerData } = props
    return (
        <Card id="user-data">
            <CardHeader><i className="fas fa-address-card fa-lg"></i> League Information</CardHeader>
            <CardBody>
                {leagueData.tier ? <img id="league-img" src={`/images/${leagueData.tier}.png`} width="130px" alt="league-img" />
                    :
                    <img id="league-img" src='/images/provisional.png' width="130px" alt="league-img" />}
                <Table id="card-conmtainer" striped responsive>
                    <thead>
                        <tr>
                            <th>League Name</th>
                            <th>{`Tier ${'\u0026'} Rank`}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {leagueData.name ? <td>{leagueData.name}</td> : <td>No League</td>}
                            {leagueData.tier ? <td>{leagueData.tier} {summonerData.rank}</td> : <td>No tier</td>}
                        </tr>
                    </tbody>
                </Table>
                {leagueData.ranki.length ? <div id="social"><Button id="follow-button" active onClick={() => { props.division('ranki','I') } }>I</Button></div> : ""}
                {leagueData.rankii.length ? <div id="social"><Button id="follow-button" onClick={() => { props.division('rankii','II') }}>II</Button></div> : ""}
                {leagueData.rankiii.length ? <div id="social"><Button id="follow-button" onClick={() => { props.division('rankiii','III') }}>III</Button></div> : ""}
                {leagueData.rankiv.length ? <div id="social"><Button id="follow-button" onClick={() => { props.division('rankiv','IV') }}>IV</Button></div> : ""}
                {leagueData.rankv.length ? <div id="social"><Button id="follow-button" onClick={() => { props.division('rankv','V') }}>V</Button></div> : ""}
            </CardBody>


        </Card>
    )
}

const mapStateToProps = (state) => {
    return {
        leagueData: state.league.leagueData,
        summonerData: state.summoner.summonerData,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        division: (currentRank, currentRankNum) => dispatch(division(currentRank, currentRankNum)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BasicLeagueInformation)