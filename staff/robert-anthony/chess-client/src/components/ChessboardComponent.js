import React, {Component} from 'react'
import Chessboard from 'chessboardjsx'
import Chess from "chess.js";
import PropTypes from 'prop-types'

class ChessboardComponent extends Component {


  static propTypes = {
    onGameMove: PropTypes.func,
    fen: PropTypes.string,
    nickname: PropTypes.string,
    opponent: PropTypes.string,
    isWhite:PropTypes.string,
  }

  chessboardjsxCalcWidth = ({screenWidth,screenHeight}) => {
   return screenWidth/2
  }

  onDrop = ({sourceSquare, targetSquare, piece}) => {
    const move = {from: sourceSquare, to: targetSquare, promotion: "q"}
    this.props.onGameMove(move)

  }

  componentDidMount() {
    this.game = new Chess();
  }


  render() {
    const {props: {fen,isWhite,nickname,opponent}} = this

    return <div>
      <h1> {nickname} vs {opponent}</h1>

      <Chessboard orientation={isWhite ? 'white' : 'black'} onDrop={this.onDrop} calcWidth={this.chessboardjsxCalcWidth} position={fen}/>
    </div>
  }


}

export default ChessboardComponent

const boardsContainer = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  flexWrap: "wrap",
  width: "100px",
  marginTop: 30,
  marginBottom: 50
};
