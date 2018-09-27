import React from 'react';
import './ShowResults.css'
import {
    Card,
    CardBody,
    Container,
    Row,
    Col,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import {
    Feedback,
    SummonerCard,
    Summary,
    League,
    LiveGames
} from '../index'
import classnames from 'classnames';
import { connect } from 'react-redux';
import { summoner } from '../../redux/actions/showResultsActions';
import { collection } from '../../redux/actions/collectionAtions';
import logic from '../../logic'
class ShowResults extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            summary: true,
            league: false,
            liveGame: false,
        };

        this.showSummary = this.showSummary.bind(this);
        this.showLeague = this.showLeague.bind(this);
        this.showLiveGame = this.showLiveGame.bind(this);
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    componentDidMount() {
        this.props.summoner(this.props.summonerName)
    }

    componentWillReceiveProps(props) {
        if (this.props.summonerName !== props.summonerName) {
            this.props.summoner(props.summonerName)
        }

    }

    showSummary() {
        this.setState({ summary: true, league: false, liveGame: false })
    }

    showLeague() {
        this.setState({ summary: false, league: true, liveGame: false })
    }

    showLiveGame() {
        this.setState({ summary: false, league: false, liveGame: true })
    }
    render() {
        const { state: { summary, league, liveGame }, showSummary, showLeague, showLiveGame } = this
        let { props: { summonerData, summonerError,collectionError,collectionFeedBack, leagueError, isSummonerPending } } = this
        return (
            <div className="results-container">
                <Container>
                {summonerError && <Feedback message={summonerError} />}
                {collectionError && <Feedback message={collectionError} color="info" />}
                {collectionFeedBack && <Feedback message={collectionFeedBack} color="success" />}
                    {summonerData && <Row>
                        <Col xs="12" sm="12" md="8" lg="4">
                            <SummonerCard />
                        </Col>
                    </Row>}
                    {!summonerData && <Row>
                        <Col xs="12" sm="12" md="8" lg="4">
                            <Card id="user-preview">
                                <CardBody>
                                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>}
                    <Row>
                        <Col>
                            <Nav tabs id="summary-nav-bar">
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '1' })}
                                        onClick={() => { this.toggle('1'); showSummary() }}
                                        id={this.state.activeTab === '1' ? "summary-nav-item-1-active" : "summary-nav-item-1"}
                                    >
                                        Summary
                                    </NavLink>
                                </NavItem>
                                <NavItem onClick={() => { showLeague(); }}>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '2' })}
                                        onClick={() => { this.toggle('2'); showLeague(); }}
                                        id={this.state.activeTab === '2' ? "summary-nav-item-2-active" : "summary-nav-item-2"}
                                    >
                                        League
                                </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '3' })}
                                        onClick={() => { this.toggle('3'); showLiveGame() }} id="summary-nav-item-3"
                                        id={this.state.activeTab === '3' ? "summary-nav-item-3-active" : "summary-nav-item-3"}
                                    >
                                        Live Game
                                </NavLink>
                                </NavItem>
                                {summonerData && <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '4' })}
                                        onClick={() => { 
                                            // if(summonerData.favorite === true)this.props.collection('rm', summonerData.id.toString())
                                            this.props.collection('add', summonerData.id.toString()) 
                                            // this.props.collection('add', summonerData.id.toString()) 
                                        }
                                    } id="summary-nav-item-4"
                                        id={"summary-nav-item-4-active"}
                                    >
                                       <i class="fas fa-plus-square"></i> Add to Collection
                                </NavLink>
                                </NavItem>}

                            </Nav>
                        </Col>
                    </Row>
                    {summary && <Summary />}
                    {league && <League />}
                    {liveGame && <LiveGames />}
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log('mapShowResults', state)
    return {
        summonerData: state.summoner.summonerData,
        summonerError: state.summoner.summonerError,
        isSummonerPending: state.summoner.isSummonerPending,
        collectionData: state.collection.collectionData,
        collectionError: state.collection.collectionError,
        collectionFeedBack: state.collection.collectionFeedBack
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        summoner: summonerName => dispatch(summoner(summonerName)),
        collection: (action, id) => dispatch(collection(action, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowResults)