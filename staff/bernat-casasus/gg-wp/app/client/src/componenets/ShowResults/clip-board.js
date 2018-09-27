import React from 'react';
import { Doughnut, Line, Bar, Radar, Polar, Pie } from 'react-chartjs-2';
import './ShowResults.css'
import {
    Card, CardHeader, CardBody,
    Container, Row, Col,
    Table, TabContent, TabPane, Nav, NavItem, NavLink, CardTitle, CardText, Button
} from 'reactstrap';
import classnames from 'classnames';
import logic from '../../logic'
import { NoResults, Feedback } from '../index'
export default class ShowResults extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            championLabels: null,
            championTimesPlayed: null,
            championWinrate: null,
            error: null,
            summary: null
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    componentDidMount() {
        logic.getSummonerSumaryBySummonerName(this.props.summonerName)
            .then(res => {
                if (res && res.championsStats) {

                    const championLabels = res.championsStats.map((champion) => {
                        return champion.name
                    })

                    const championTimesPlayed = res.championsStats.map((champion) => {
                        return champion.timesPlayed
                    })

                    const championWinrate = res.championsStats.map((champion) => {
                        return parseInt(champion.wins / champion.timesPlayed * 100)
                    })

                    this.setState({ championLabels, championTimesPlayed, championWinrate })
                }
                this.setState({ summary: res })
            })
            .catch(({ message }) => {

                this.setState({ error: message, summary: {} })

                setTimeout(() => {
                    this.setState({ error: null })
                }, 8000)
            })

    }
    render() {
        const { state: { championLabels, championTimesPlayed, championWinrate, summary, error } } = this
        return (
            <div className="results-container">
                <Container>
                    {error && <Feedback message={error} />}
                    {summary && <Row>
                        <Col sm="4">
                            <Card id="user-preview">

                                {summary.name ? <CardBody>
                                    <img id="profile-icon" src={`${summary.profileIcon}`} width="40px" alt="league-img" />{summary.name} - {summary.leagueName ? `${summary.leagueName}` : 'Unranked'}
                                </CardBody>
                                    :
                                    <CardBody><NoResults /></CardBody>
                                }
                            </Card>
                        </Col>
                    </Row>}
                    <Row>
                        <Col>
                            <Nav tabs id="summary-nav-bar">
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '1' })}
                                        onClick={() => { this.toggle('1'); }}
                                        id={this.state.activeTab === '1' ? "summary-nav-item-1-active" : "summary-nav-item-1"}
                                    >
                                        Summary
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '2' })}
                                        onClick={() => { this.toggle('2'); }}
                                        id={this.state.activeTab === '2' ? "summary-nav-item-2-active" : "summary-nav-item-2"}
                                    >
                                        League
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '3' })}
                                        onClick={() => { this.toggle('3'); }} id="summary-nav-item-3"
                                        id={this.state.activeTab === '3' ? "summary-nav-item-3-active" : "summary-nav-item-3"}
                                    >
                                        Live Game
                                    </NavLink>
                                </NavItem>

                            </Nav>


                        </Col>

                    </Row>
                    {summary &&
                        <Row id="user-matches">
                            <Col sm="4">
                                <Card id="user-data">
                                    <CardHeader><i className="fas fa-address-card fa-lg"></i> Basic Information</CardHeader>
                                    {summary.summonerLevel ? <CardBody>
                                        {summary.tier ?
                                            <img id="league-img" src={`/images/${summary.tier}.png`} width="130px" alt="league-img" />
                                            :
                                            <img id="league-img" src='/images/provisional.png' width="130px" alt="league-img" />
                                        }
                                        <Table id="card-conmtainer" striped>
                                            <thead>
                                                <tr>
                                                    <th>Level</th>
                                                    {/* <th>League</th> */}
                                                    <th>Tier</th>
                                                    <th>Rank</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    {summary.summonerLevel ? <th scope="row">{summary.summonerLevel}</th> : <td>No Level</td>}
                                                    {/* {summary.leagueName ? <td>{summary.leagueName}</td> : <td>No League</td>} */}
                                                    {summary.tier ? <td>{summary.tier}</td> : <td>No Tier</td>}
                                                    {summary.rank ? <td>{summary.rank}</td> : <td>No Rank</td>}
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </CardBody>
                                        :
                                        <CardBody><NoResults /></CardBody>
                                    }
                                </Card>
                                <Card id="user-winrate">
                                    <CardHeader><i className="fas fa-dot-circle fa-lg"></i> Wins and Losses</CardHeader>
                                    <CardBody>
                                        {(summary.wins && summary.losses) ?
                                            <Doughnut
                                                data={{
                                                    labels: [`Wins: ${summary.wins}`, `Losses ${summary.losses}`],
                                                    datasets: [{
                                                        label: "Winrate",
                                                        backgroundColor: ['rgb(61, 149, 229)', 'rgb(238, 90, 82)'],
                                                        borderColor: 'rgb(255, 255, 255)',
                                                        data: [`${summary.wins}`, `${summary.losses}`],
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
                                <Card id="user-game-style">
                                    <CardHeader><i className="fas fa-list-ul fa-lg"></i> Agressive or Passive</CardHeader>
                                    <CardBody>
                                        {summary.championsStats ? <Table striped>
                                            <thead>
                                                <tr>

                                                    <th> </th>
                                                    <th>Name</th>
                                                    <th>FirstBloods</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    summary.championsStats.map((champion) => {
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
                            </Col>
                            <Col sm="8">
                                <Card id="user-champion-stats">
                                    <CardHeader><i className="fas fa-list-ul fa-lg"></i> Champions Stats</CardHeader>
                                    <CardBody>
                                        {summary.championsStats ? <Table striped>
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
                                                    summary.championsStats.map((champion) => {
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
                                <Card id="user-champion-analytics">
                                    <CardHeader><i className="fas fa-chart-bar fa-lg"></i> Champions Played and Winrate</CardHeader>
                                    <CardBody>
                                        {summary.championsStats ? <Bar
                                            data={{
                                                labels: championLabels,
                                                datasets: [{
                                                    backgroundColor: 'rgb(238, 90, 82)',
                                                    borderColor: 'rgb(238, 90, 82)',
                                                    label: 'Times Played',
                                                    data: championTimesPlayed,
                                                },
                                                {
                                                    label: 'Winrate',
                                                    backgroundColor: 'rgb(31, 142, 205)',
                                                    borderColor: 'rgb(31, 142, 205)',
                                                    data: championWinrate,
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
                                <Card id="user-main-role">
                                    <CardHeader><i className="fas fa-chart-line fa-lg"></i> Main Role</CardHeader>
                                    <CardBody>
                                        {/* {summary.lanesStats ? <Polar
                                            data={{
                                                labels: [`Top Lane`, `Jungle`, `Mid Lane`, `Bottom Lane`],
                                                datasets: [{
                                                    label: 'Roles Played',
                                                    backgroundColor: 'rgb(61, 149, 229)',
                                                    borderColor: 'rgb(255, 255, 255)',
                                                    data: [`${summary.lanesStats.TOP}`, `${summary.lanesStats.JUNGLE}`, `${summary.lanesStats.MID}`, `${summary.lanesStats.BOTTOM}`],
                                                }]
                                            }
                                            }
                                        />
                                            :
                                            <NoResults />
                                        } */}
                                        {summary.lanesStats ? <Polar
                                            data={{
                                                labels: [`Top Lane`, `Jungle`, `Mid Lane`, `Bottom Lane`],
                                                datasets: [{
                                                    label: 'Roles Played',
                                                    backgroundColor: ['rgb(61, 149, 229)', 'rgb(255, 200, 12)', 'rgb(161, 255, 69)', 'rgb(255, 199, 229)'],
                                                    borderColor: 'rgb(255, 255, 255)',
                                                    data: [`${summary.lanesStats.TOP}`, `${summary.lanesStats.JUNGLE}`, `${summary.lanesStats.MID}`, `${summary.lanesStats.BOTTOM}`],
                                                }]
                                            }
                                            }
                                        />
                                            :
                                            <NoResults />
                                        }
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    }

                    {!summary &&

                        <Row id="user-matches">
                            <Col sm="4">
                                <Card>
                                    <CardHeader>Summoner Name</CardHeader>
                                    <CardBody>
                                        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardHeader>Wins and Losses</CardHeader>
                                    <CardBody>
                                        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardHeader>Agressive or Passive</CardHeader>
                                    <CardBody>
                                        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col sm="8">
                                <Card>
                                    <CardHeader>Champions Stats</CardHeader>
                                    <CardBody>
                                        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardHeader>Main Role</CardHeader>
                                    <CardBody>
                                        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardHeader>Champions Played and Winrate</CardHeader>
                                    <CardBody>
                                        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    }
                </Container>
            </div>
        );
    }
}