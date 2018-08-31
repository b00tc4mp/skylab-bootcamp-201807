import React, {Component} from 'react'
import classNames from 'classnames'
import {Container, Row, Col} from 'reactstrap';
import {ListGroup, ListGroupItem} from 'reactstrap'
import GamesOpen from "./GamesOpen"
import ChessboardGroup from "./ChessboardGroup"
import GamesInvited from "./GamesInvited"
import PropTypes from 'prop-types'


class Games extends Component {


  static propTypes = {
    onGameMove: PropTypes.func,
    currentGames: PropTypes.array,
    nickname: PropTypes.string,
    onRespondToGameRequest:PropTypes.func,
}

  state = {
    currentlyPlayingWith : JSON.parse(sessionStorage.getItem('currentlyPlayingWith')) || [],
    error: '',
  }

  onOpenGamesUserClick = (user) => {
   console.log("open games user click",user)
  }
  onInvitedGamesUserClick = (user) => {
    console.log("invited games user click",user)
  }


  onRespondToGameRequest = (destination, gameID, answer) => {
    const {props:{onRespondToGameRequest}} = this
    if (answer) {
      console.log(`%c accepted game request from ${destination}`, 'background: darkcyan; color: white');
      const currentlyPlayingWith = this.state.currentlyPlayingWith
      currentlyPlayingWith.push(destination)
      sessionStorage.setItem('currentlyPlayingWith', JSON.stringify(currentlyPlayingWith))
    }
    onRespondToGameRequest(destination,gameID,answer)
  }

  render() {
    let {props: {onGameMove, currentGames, nickname}} = this


    return <main>
      <div className="screen">
        <nav>
        </nav>
        <h1>You are playing as {nickname}</h1>
        <Container>
          <Row>
            <Col xs="12" md="3">
              {currentGames.length && <GamesOpen onUserClick={this.onOpenGamesUserClick} games={currentGames.filter(game => game.state === 'playing')} nickname={nickname}/>}
            </Col>
            <Col xs="12" md="6">
              {currentGames.length && <ChessboardGroup onGameMove={onGameMove} currentGames={ currentGames.filter(game => (this.state.currentlyPlayingWith.findIndex(user => user === game.opponent) !== -1) && (game.state === 'playing'))} nickname={nickname} />}
            </Col>
            <Col xs="12" md="3">
              {currentGames.length && <GamesInvited onRespondToGameRequest={this.onRespondToGameRequest} nickname={nickname} games={currentGames.filter(game => game.state === 'invited')}/>}
            </Col>
          </Row>
        </Container>
      </div>
    </main>


  }

}

export default Games