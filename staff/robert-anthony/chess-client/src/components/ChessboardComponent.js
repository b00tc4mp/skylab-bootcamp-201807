import React, {Component} from 'react'
import Chessboard from 'chessboardjsx'
import Chess from "chess.js";
import PropTypes from 'prop-types'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col} from 'reactstrap';

class ChessboardComponent extends Component {

  state = {
    modal: false,
    endOfGameText: '',
    haveAcknowledgedGameOver:false,
  }


  static propTypes = {
    onGameMove: PropTypes.func,
    nickname: PropTypes.string,
    isWhite: PropTypes.bool,
    currentGame: PropTypes.object,
    onError: PropTypes.func,
    onAcknowledgeGameOver: PropTypes.func,
  }

  onAcknowledgeGameOver = () => {
    const {props: {nickname, currentGame, onAcknowledgeGameOver}} = this
    this.setState({modal: false,haveAcknowledged:true})
    onAcknowledgeGameOver(nickname, currentGame.id)
  }


  static getDerivedStateFromProps(props, state) {
    const {currentGame, nickname} = props
    const {haveAcknowledged} = state
    let endOfGameText = ''
    let modal = false
    if (currentGame && currentGame.winner && !haveAcknowledged) {
      switch (true) {
        case currentGame.inCheckmate:
          endOfGameText = `Game has ended: ${currentGame.opponent} has won and ${nickname} has been checkmated`
          break;
        case currentGame.inDraw:
          endOfGameText = `Game has ended: game is in a draw`
          break;
        case currentGame.inThreefoldRepetition:
          endOfGameText = `Game has ended: game is in threefold repetition`
          break;
        case currentGame.insufficientMaterial:
          endOfGameText = `Game has ended: game has insufficient material`
          break;
        case currentGame.inStalemate:
          endOfGameText = `Game has ended: game is in stalemate`
          break;
      }
      modal = true
    }
    return {endOfGameText, modal}
  }

  chessboardjsxCalcWidth = ({screenWidth, screenHeight}) => {
    return screenWidth / 2 < screenHeight / 1.5 ? screenWidth / 2 : screenHeight / 1.5
  }

  onDrop = ({sourceSquare, targetSquare, piece}) => {
    const move = {from: sourceSquare, to: targetSquare, promotion: "q"}
    this.props.onGameMove(move)
  }

  componentDidMount() {
    this.game = new Chess();
  }


  render() {
    const {props: {currentGame,  nickname, isWhite},state:{endOfGameText}} = this


    return <Container>
      <Row>
        <Col xs="12" md="9">

          <div className="chessBoardGroup__chessBoardArea">
            {currentGame && <Chessboard orientation={isWhite ? 'white' : 'black'} onDrop={this.onDrop}
                                        lightSquareStyle={{backgroundColor: 'rgba(180, 180, 180,0.85)' }}
                                        darkSquareStyle={{backgroundColor: 'rgba(120, 120, 120,0.85)' }}

                                        calcWidth={this.chessboardjsxCalcWidth} position={currentGame.fen}/>}
          </div>
        </Col>
        <Col xs="12" md="3">
          {currentGame && <h1> {nickname} vs {currentGame.opponent}</h1>}
          {currentGame && !endOfGameText && <h3>{currentGame.toPlay} to play</h3>}

        </Col>
      </Row>
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Game has ended!</ModalHeader>
        <ModalBody>
          {endOfGameText}
        </ModalBody>
        <ModalFooter>
          <Button color="primary"
                  onClick={this.onAcknowledgeGameOver}>OK</Button>

        </ModalFooter>
      </Modal>

    </Container>

  }


}

export default ChessboardComponent
