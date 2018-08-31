import React, {Component} from 'react'
import classNames from 'classnames'
import {Container, Row, Col} from 'reactstrap';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import OpenGames from "./OpenGames"
import ChessboardGroup from "./ChessboardGroup"
import GamesInvited from "./GamesInvited"
import PropTypes from 'prop-types'


class Games extends Component {

    static propTypes = {
      onGameMove: PropTypes.func,
      currentGames: PropTypes.array,
      nickname: PropTypes.string,
      onRespondToGameRequest: PropTypes.func,
    }

    state = {
      currentGameViewed: JSON.parse(sessionStorage.getItem('currentGameViewed')) || null,
      error: '',
      inviter: '',
      invitedGameID: '',
      modal: false,
    }


    onRespondToGameRequest = (destination, gameID, answer) => {
      const {props: {onRespondToGameRequest}} = this
      this.setState({modal: false, inviter: '', invitedGameID: ''})

      onRespondToGameRequest(destination, gameID, answer)
    }

    onOpenGamesUserClick = (game) => {

      if (game.state === "invited") {
        this.setState({modal: true, inviter: game.opponent, invitedGameID: game.id})
      } else {
        sessionStorage.setItem('currentGameViewed',JSON.stringify(game))
        this.setState({currentGameViewed: game})
      }
    }


  render() {
    let {props: {onGameMove, currentGames, nickname}, state: {currentGameViewed, inviter, invitedGameID}} = this


    return <main>
      <div>
        <nav>
        </nav>
        <h1>You are playing as {nickname}</h1>
        <Container>
          <Row>
            <Col xs="12" md="3">
              {currentGames.length && <OpenGames onUserClick={this.onOpenGamesUserClick}
                                                 games={currentGames.filter(game => game.state !== 'terminated')}
                                                 nickname={nickname}
                                                 currentGameViewed={currentGameViewed}/>

              }
            </Col>
            <Col xs="12" md="9">
              {currentGames.length && <ChessboardGroup onGameMove={onGameMove}
                                                       currentGame={currentGameViewed}
                                                       nickname={nickname}/>}
            </Col>

          </Row>
        </Container>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Invitation</ModalHeader>
          <ModalBody>
            ${inviter} has invited you to a game.
          </ModalBody>
          <ModalFooter>
            <Button color="primary"
                    onClick={() => this.onRespondToGameRequest(inviter, invitedGameID, true)}>Accept</Button>
            <Button color="secondary"
                    onClick={() => this.onRespondToGameRequest(inviter, invitedGameID, false)}> Reject </Button>
          </ModalFooter>
        </Modal>


      </div>
    </main>


  }

}

export default Games