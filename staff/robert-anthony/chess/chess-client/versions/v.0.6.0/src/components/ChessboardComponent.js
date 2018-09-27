import React, {Component} from 'react'
import Chessboard from 'chessboardjsx'
import Chess from "chess.js";
import PropTypes from 'prop-types'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col} from 'reactstrap';

class ChessboardComponent extends Component {

  state = {
    modal: false,
    inCheckText:'',
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
    let inCheckText = ''
    if (currentGame && currentGame.winner && !haveAcknowledged) {
      const loser = currentGame.winner === currentGame.initiator ? currentGame.acceptor : currentGame.initiator
      switch (true) {
        case currentGame.inCheckmate:
          endOfGameText = `Game has ended: ${currentGame.winner} has won and ${loser} has been checkmated`
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
    if (currentGame && currentGame.inCheck ) inCheckText = `${currentGame.toPlay} `
    return {endOfGameText, inCheckText,modal}
  }

  chessboardjsxCalcWidth = ({screenWidth, screenHeight}) => {
    return screenWidth / 2 < screenHeight / 1.5 ? screenWidth / 2 : screenHeight / 1.55
  }

  onDrop = ({sourceSquare, targetSquare, piece}) => {
    const move = {from: sourceSquare, to: targetSquare, promotion: "q"}
    this.props.onGameMove(move)
  }

  componentDidMount() {
    this.game = new Chess();
  }


  render() {
    const {props: {currentGame,  nickname, isWhite},state:{inCheckText,endOfGameText}} = this


    return <Container>
      <Row>
        <Col xs="12" lg="8">

          <div className="chessBoardComponent__chessBoardArea">
            {currentGame && <Chessboard orientation={isWhite ? 'white' : 'black'} onDrop={this.onDrop}
                                        lightSquareStyle={{backgroundColor: 'rgba(180, 180, 180,0.85)' }}
                                        darkSquareStyle={{backgroundColor: 'rgba(120, 120, 120,0.85)' }}
                                        id={currentGame.id}
                                        calcWidth={this.chessboardjsxCalcWidth}
                                        position={currentGame.fen}/>}
          </div>
        </Col>
        <Col xs="0" lg="1">
        </Col>
        <Col className="chessBoardGroup__gameInfoArea" xs="12" lg="3">
         {currentGame && <h3 className="chessBoardGroup__players"><span><i className="fas fa-chess-knight"></i>&nbsp;White: </span>{currentGame.initiator} </h3>}
         {currentGame && <h3 className="chessBoardGroup__players"><span><i className="fas fa-chess-knight"></i>&nbsp;Black: </span>{currentGame.acceptor} </h3>}
          {currentGame && !endOfGameText && <h3  className="chessBoardGroup__toPlay"><i className="fas fa-spinner"></i>&nbsp;{currentGame.toPlay} <span>to play</span></h3>}
          {currentGame && !endOfGameText &&  inCheckText && <h3  className="chessBoardGroup__inCheck"><i
            className="fas fa-exclamation-triangle"></i>&nbsp;{inCheckText} <span>is in check</span></h3>}
          {currentGame && !endOfGameText && <h3  className="chessBoardGroup__pgn"><i className="fas fa-pen-nib"></i>&nbsp;Moves:&nbsp;{currentGame.pgn} </h3>}

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
