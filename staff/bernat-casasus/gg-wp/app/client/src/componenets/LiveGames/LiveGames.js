import React, { Component } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Row,
  Col, Button
  , Modal, ModalHeader, ModalBody,ModalFooter,Jumbotron,UncontrolledCollapse
} from 'reactstrap';
import {Feedback} from '../../componenets/index'
import { connect } from 'react-redux';
import { liveGame } from '../../redux/actions/liveGameActions';
import { spectateGame } from '../../redux/actions/spectateGameActions';
import './LiveGames.css'

class LiveGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
    this.handleSpectate = this.handleSpectate.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidMount() {
    if (this.props.summonerData && this.props.summonerData.id) this.props.liveGame(this.props.summonerData.id)
  }

  handleSpectate(){
    this.props.spectateGame(this.props.summonerData.id)
  }

  _downloadTxtFile = (encryptionKey,gameId,platformId) => {
    var element = document.createElement("a");
    var file = new Blob([`@echo off
    setlocal enabledelayedexpansion
    set LOL_PATH=""
    
    IF EXIST "C:\\Riot Games\\League of Legends\\RADS" (
    set LOL_PATH="C:\\Riot Games\\League of Legends\\RADS"
    echo "Path found: %LOL_PATH%"
    goto runSpectate
    )
    
    set VALUE_NAME=LocalRootFolder
    
    FOR %%G IN ("HKCU\\SOFTWARE\\RIOT GAMES\\RADS","HKCU\\SOFTWARE\\Classes\\VirtualStore\\MACHINE\\SOFTWARE\\Wow6432Node\\RIOT GAMES\\RADS","HKCU\\SOFTWARE\\Classes\\VirtualStore\\MACHINE\\SOFTWARE\\RIOT GAMES\\RADS","HKLM\\Software\\Wow6432Node\\Riot Games\\RADS") DO (
    for /f "usebackq skip=2 tokens=3,4,5,6,7,8,9" %%i in (\`%systemroot%\\system32\\REG.EXE QUERY %%G /v "%VALUE_NAME%"\`) do  (
    set LOL_PATH=%%i %%j %%k %%l %%m %%n %%o
    echo "Path found: %LOL_PATH%"
    goto runSpectate
    )
    )
    
    set VALUE_NAME=Location
    FOR %%G IN ("HKLM\\SOFTWARE\\WOW6432Node\\Riot Games, Inc\\League of Legends") DO (
    for /f "usebackq skip=2 tokens=3,4,5,6,7,8,9" %%i in (\`%systemroot%\system32\REG.EXE QUERY %%G /v "%VALUE_NAME%"\`) do  (
    set LOL_PATH=%%i %%j %%k %%l %%m %%n %%o
    set LOL_PATH=%LOL_PATH%\RADS
    echo "Path found: %LOL_PATH%"
    goto runSpectate
    )
    )
    
    
    goto nofound
    
    :runSpectate
    cls
    for /f "tokens=* delims= " %%a in ("%LOL_PATH%") do set LOL_PATH=%%a
    for /l %%a in (1,1,100) do if "!LOL_PATH:~-1!"==" " set LOL_PATH=!LOL_PATH:~0,-1!
    cd /D %LOL_PATH%
    cd .\\solutions\\lol_game_client_sln\\releases\\
    FOR /f %%i in ('dir /a:d /b') do set RELEASE=%%i
    cd .\\%RELEASE%\\deploy
    
    if exist "League of Legends.exe" (
    echo "Replay is launching ..."
    @start "" "League of Legends.exe" "spectator spectator.euw1.lol.riotgames.com:80 ${encryptionKey} ${gameId} ${platformId} -UseRads
    goto exit
    )
    
    goto notfound
    
    :notfound
    cls
    echo League of Legends.exe not found.
    echo Please contact trebonius@worldofwargraphs.com
    pause
    goto exit
    
    :exit`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "GG-WP_SPECTATE_LOL_GAME.bat";
    element.click();
  }

  render() {
    let { props: { summonerData, liveGameData,spectateGameData, collectionError, summonerError } } = this
    return (
      <div>
        {summonerData && <div>
          {liveGameData && <div>
            {liveGameData[0] && <div>
              <Row>
              {/* {summonerError && <Feedback message={summonerError} />}
              {collectionError && <Feedback message={collectionError} color="info" />} */}
                <Col sm="12" md="12" lg="8">
                  <div className="preview-profile-btn-container">
                    <Button id="view-profile-btn" onClick={()=>{if (this.props.summonerData && this.props.summonerData.id) this.props.liveGame(this.props.summonerData.id)}}>
                    <i class="white fas fa-sync"></i> Refresh
              
                    </Button> 
                    <Button id="delete-user"onClick={()=>{this.toggle(); this.handleSpectate()}} >Spectate</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                      <ModalHeader toggle={this.toggle} id="modal-title">Spectate Game</ModalHeader>
                      {spectateGameData &&<ModalBody>
                          <div className="accordion" id="accordionExample">
                                <div className="card">
                                    <div className="card-header" id="headingOne">
                                        <h5 className="mb-0">
                                            <button className="btn btn-link" type="button" id="toggler-one" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                Windows users
                                            </button>
                                        </h5>
                                    </div>
                                    <UncontrolledCollapse toggler="#toggler-one">
                                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                        <div className="card-body">
                                        <h5>Open the Windows run prompt (Windows + R) and paste the text below into it.</h5>
                                        <Jumbotron>
                                            <p>{`"C:\\Riot Games\\League of Legends\\RADS\\solutions\\lol_game_client_sln\\releases\\0.0.1.237\\deploy\\League of Legends.exe" "spectator spectator.euw1.lol.riotgames.com:80 ${spectateGameData.observers.encryptionKey} ${spectateGameData.gameId} ${spectateGameData.platformId}" -UseRads`}</p>
                                        </Jumbotron>
                                        </div>
                                    </div>
                                    </UncontrolledCollapse>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="headingTwo">
                                        <h5 className="mb-0">
                                            <button className="btn btn-link collapsed" id="toggler-two" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                              MAC users
                                            </button>
                                        </h5>
                                    </div>
                                    <UncontrolledCollapse toggler="#toggler-two">
                                        <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                            <div className="card-body">
                                            <h5>After running [Terminal], copy and paste the message below..</h5>
                                            <Jumbotron>
                                              <p>{`cd /Applications/League\ of\ Legends.app/Contents/LoL/RADS/solutions/lol_game_client_sln/releases/ && cd $(ls -1vr -d */ | head -1) && cd deploy && chmod +x ./LeagueofLegends.app/Contents/MacOS/LeagueofLegends && riot_launched=true ./LeagueofLegends.app/Contents/MacOS/LeagueofLegends 8394 LoLLauncher "" "spectator spectator.euw1.lol.riotgames.com:80 ${spectateGameData.observers.encryptionKey} ${spectateGameData.gameId} ${spectateGameData.platformId}"`}</p>
                                              </Jumbotron>                                        
                                              </div>
                                        </div>
                                    </UncontrolledCollapse>
                                </div>

                            </div>

                                  <div>
                            </div>
                      </ModalBody>}
                      {spectateGameData &&<ModalFooter>
                      <div id="modal-footer">                        
                        <Button id="download-btn" onClick={()=>{this._downloadTxtFile(spectateGameData.observers.encryptionKey,spectateGameData.gameId,spectateGameData.platformId)}}>Open Game Stream (Windows users)</Button>
                      </div>
                    </ModalFooter>}
                    </Modal>
                  </div></Col>

              </Row>
              <Row id="user-matches">
                <Col sm="12" md="12" lg="8">
                  <Card id="user-champion-stats">
                    <CardHeader><div className="blue-team"></div> <p className="blue-team-text">Blue Team</p></CardHeader>
                    <CardBody>
                      <Table striped responsive>
                        <thead className="league-item">
                          <tr>
                            <th>Champion</th>
                            <th className="league-name">Spells</th>
                            <th>Name</th>
                            <th>Hot Streak</th>
                            <th>Victory</th>
                          </tr>
                        </thead>
                        <tbody className="league-item">
                          {
                            liveGameData.map((summoner) => {
                              if (summoner.teamId === 100) {
                                return (
                                  <tr>
                                    <td><img className="champion-icon" src={summoner.championIcon} width="24px" alt="league-img" /></td>
                                    <td className="league-name"><img className="spell-icon" src={summoner.spell1.icon} width="12px" alt="league-img" /><img className="spell-icon" src={summoner.spell2.icon} width="12px" alt="league-img" /></td>
                                    <td>{summoner.summonerName}</td>
                                    <td><img src={`/images/${summoner.rankedStats.tier}.png`} width="24px" alt="league-img" /></td>
                                    <td><div className="wins-graph">{summoner.rankedStats.wins}</div><div className="losses-graph">{summoner.rankedStats.losses}</div></td>
                                  </tr>
                                )
                                return
                              }

                            })
                          }
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row id="user-matches">
                <Col sm="12" md="12" lg="8">
                  <Card id="user-champion-stats">
                    <CardHeader><div className="red-team"></div> <p className="red-team-text">Red Team</p></CardHeader>
                    <CardBody>
                      <Table striped responsive>
                        <thead className="league-item">
                          <tr>
                            <th>Champion</th>
                            <th className="league-name">Spells</th>
                            <th>Name</th>
                            <th>Rank</th>
                            <th>Victory</th>
                          </tr>
                        </thead>
                        <tbody className="league-item">
                          {
                            liveGameData.map((summoner) => {
                              if (summoner.teamId === 200) {
                                return (
                                  <tr>
                                    <td><img src={summoner.championIcon} width="24px" alt="league-img" /></td>
                                    <td className="league-name"><img className="spell-icon" src={summoner.spell1.icon} width="12px" alt="league-img" /><img className="spell-icon" src={summoner.spell2.icon} width="12px" alt="league-img" /></td>
                                    <td>{summoner.summonerName}</td>
                                    <td><img src={`/images/${summoner.rankedStats.tier}.png`} width="24px" alt="league-img" /></td>
                                    <td><div className="wins-graph">{summoner.rankedStats.wins}</div><div className="losses-graph">{summoner.rankedStats.losses}</div></td>
                                  </tr>
                                )
                                return
                              }

                            })
                          }
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>}
            {!liveGameData[0] && <Row id="user-matches">
              <Col sm="8">
                <Card id="user-champion-stats">
                  <CardHeader><i className="fas fa-list-ul fa-lg"></i>Live Game</CardHeader>
                  <CardBody>
                    <div id="no-results-container">
                      <i className="fas fa-exclamation fa-3x"></i>
                      <p>The summoner is not in an active game.</p>
                      <p>Please try again later if the summoner is currently in game.</p>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>}

          </div>}

          {!liveGameData && <Row id="user-matches">
            <Col sm="8">
              <Card id="user-champion-stats">
                <CardHeader><i className="fas fa-list-ul fa-lg"></i>Live Game</CardHeader>
                <CardBody>
                  <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                </CardBody>
              </Card>
            </Col>
          </Row>}

        </div>}

        {!summonerData && <Row id="user-matches">
          <Col sm="8">
            <Card id="user-champion-stats">
              <CardHeader><i className="fas fa-list-ul fa-lg"></i>Division</CardHeader>
              <CardBody>
                <div id="no-results-container">
                  <i className="fas fa-exclamation fa-3x"></i>
                  <p>The summoner is not in an active game.</p>
                  <p>Please try again later if the summoner is currently in game.</p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    liveGameData: state.liveGame.liveGameData,
    summonerData: state.summoner.summonerData,
    spectateGameData: state.spectate.spectateGameData,
    summonerError: state.summoner.summonerError,
    isSpectateGamePending: state.spectate.isSpectateGamePending,
    spectateGameError: state.spectate.spectateGameError,
    collectionError: state.collection.collectionError,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    liveGame: summonerId => dispatch(liveGame(summonerId)),
    spectateGame: summonerId => dispatch(spectateGame(summonerId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveGames)