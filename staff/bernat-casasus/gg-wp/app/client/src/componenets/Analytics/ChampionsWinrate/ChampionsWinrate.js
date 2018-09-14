import React from 'react'
import { connect } from 'react-redux';
import { NoResults } from '../../index'
import './ChampionsWinrate.css'
import { Bar } from 'react-chartjs-2';
import {
    Card, 
    CardHeader, 
    CardBody,
} from 'reactstrap';
const ChampionsWinrate = (props) => {
    const { summonerData } = props
    return (
        <Card id="user-champion-analytics">
        <CardHeader><i className="fas fa-chart-bar fa-lg"></i> Champions Winrate</CardHeader>
        <CardBody>
            {summonerData.championsStats ? <Bar
                data={{
                    labels: summonerData.championLabels,
                    datasets: [{
                        backgroundColor: 'rgb(238, 90, 82)',
                        borderColor: 'rgb(238, 90, 82)',
                        label: 'Times Played',
                        data: summonerData.championTimesPlayed,
                    },
                    {
                        label: 'Winrate',
                        backgroundColor: 'rgb(31, 142, 205)',
                        borderColor: 'rgb(31, 142, 205)',
                        data: summonerData.championWinrate,
                    }
                    ]
                }
                }
            />
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

export default connect(mapStateToProps)(ChampionsWinrate)