import React, {Component} from 'react'
import Chessboard from 'chessboardjsx'
import Chess from "chess.js";

class ChessBoard extends Component {

  state = {
    position: "start"
  }

  onDrop = ({sourceSquare, targetSquare, piece}) => {
    const result = this.game.move({from: sourceSquare, to: targetSquare, promotion: "q"})
    if (result) {
      this.setState({position: this.game.fen()})
      this.props.onUpdatePosition(this.game.fen())
    }
 
}

componentDidMount()
{
  this.game = new Chess();

}


render()
{
  return <div>>
    <Chessboard onDrop={this.onDrop} position={this.state.position}/>
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
