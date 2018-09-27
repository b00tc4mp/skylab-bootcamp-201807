import React from 'react'
import { connect } from 'react-redux';
import { NoResults } from '../../index'
import './WinsAndLosses.css'
import { Doughnut } from 'react-chartjs-2';
import {
    Card,
    CardHeader,
    CardBody
} from 'reactstrap';
const WinsAndLosses = (props) => {
    const { summonerData } = props
    return (
        <Card id="user-winrate">
            <CardHeader><i className="fas fa-dot-circle fa-lg"></i> Wins and Losses</CardHeader>
            <CardBody>
                {(summonerData.wins && summonerData.losses) ?
                    <Doughnut
                        data={{
                            labels: [`Wins: ${summonerData.wins}`, `Losses ${summonerData.losses}`],
                            datasets: [{
                                label: "Winrate",
                                backgroundColor: ['rgb(61, 149, 229)', 'rgb(238, 90, 82)'],
                                borderColor: 'rgb(255, 255, 255)',
                                data: [`${summonerData.wins}`, `${summonerData.losses}`],
                            }]
                        }
                        }
                        height={155}
                        width={200}
                    /> :
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

export default connect(mapStateToProps)(WinsAndLosses)