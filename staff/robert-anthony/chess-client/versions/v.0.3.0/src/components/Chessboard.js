import React, {Component} from 'react'
import Chessboard from 'chessboardjsx'
import Chess from "chess.js";

class ChessBoard extends Component {


  shouldComponentUpdate(nextProps, nextState) {
      console.log("Chessboard: ",this.props.fen, nextProps.fen)
  }

  onDrop = ({sourceSquare, targetSquare, piece}) => {
    const move = {from: sourceSquare, to: targetSquare, promotion: "q"}
    this.props.onGameMove(move)

}

componentDidMount()
{
  this.game = new Chess();
}


render(){
const {props:{fen}} = this

  return <div>>
    <Chessboard onDrop={this.onDrop} position={fen}/>
  </div>
}


}

export default ChessBoard

const boardsContainer = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  flexWrap: "wrap",
  width: "300vw",
  marginTop: 30,
  marginBottom: 50
};
