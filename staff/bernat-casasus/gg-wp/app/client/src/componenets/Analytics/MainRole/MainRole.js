import React from 'react'
import { connect } from 'react-redux';
import { NoResults } from '../../index'
import './MainRole.css'
import { Polar } from 'react-chartjs-2';
import {
    Card,
    CardHeader,
    CardBody,
} from 'reactstrap';
const MainRole = (props) => {
    const { summonerData } = props
    return (
        <Card id="user-main-role">
            <CardHeader><i className="fas fa-chart-line fa-lg"></i> Main Role</CardHeader>
            <CardBody>
                {/* {summonerData.lanesStats ? <Polar
                data={{
                    labels: [`Top Lane`, `Jungle`, `Mid Lane`, `Bottom Lane`],
                    datasets: [{
                        label: 'Roles Played',
                        backgroundColor: 'rgb(61, 149, 229)',
                        borderColor: 'rgb(255, 255, 255)',
                        data: [`${summonerData.lanesStats.TOP}`, `${summonerData.lanesStats.JUNGLE}`, `${summonerData.lanesStats.MID}`, `${summonerData.lanesStats.BOTTOM}`],
                    }]
                }
                }
            />
                :
                <NoResults />
            } */}
                {summonerData.lanesStats ? <Polar
                    data={{
                        labels: [`Top Lane`, `Jungle`, `Mid Lane`, `Bottom Lane`],
                        datasets: [{
                            label: 'Roles Played',
                            backgroundColor: ['rgb(61, 149, 229,0.5)', 'rgb(255, 200, 12,0.5)', 'rgb(238, 90, 82,0.5)', 'rgb(4, 211, 112,0.5)'],
                            borderColor: 'rgb(255, 255, 255)',
                            data: [`${summonerData.lanesStats.TOP}`, `${summonerData.lanesStats.JUNGLE}`, `${summonerData.lanesStats.MID}`, `${summonerData.lanesStats.BOTTOM}`],
                        }]
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

export default connect(mapStateToProps)(MainRole)