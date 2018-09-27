import React from 'react'
import { connect } from 'react-redux';
import { NoResults } from '../../index'
import {
    Card,
    CardBody,
} from 'reactstrap';
const SummonerCard = (props) => {
    const { summonerData, isSummonerPending } = props
    return (
        <Card id="user-preview">
            {!isSummonerPending && <div>
                {summonerData.name ? <CardBody>
                    <img id="profile-icon" src={`${summonerData.profileIcon}`} width="40px" alt="league-img" />{summonerData.name} - {summonerData.leagueName ? `${summonerData.leagueName}` : 'Unranked'}
                </CardBody>
                    :
                    <CardBody><NoResults /></CardBody>
                }
            </div>}
            {isSummonerPending && <div>
                <CardBody>
                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                </CardBody>
            </div>}
        </Card>
    )
}

const mapStateToProps = (state) => {
    return {
        summonerData: state.summoner.summonerData,
        isSummonerPending: state.summoner.isSummonerPending,
    }
}

export default connect(mapStateToProps)(SummonerCard)