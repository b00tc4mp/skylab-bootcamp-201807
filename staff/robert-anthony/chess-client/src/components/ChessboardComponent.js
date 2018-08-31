import React, {Component} from 'react'
import Chessboard from 'chessboardjsx'
import Chess from "chess.js";

class ChessboardComponent extends Component {



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
