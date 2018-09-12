import React, {Component} from 'react'
import {Container, Col, Row} from 'reactstrap'

class Main extends Component {

  state = {
    error: "",
  }


  render() {


    return <Container>
      <Row>

        <Col className="main__mainText" xs="12" md="8">
        <div className="main__mainTextHolder"> <p><img className="main__mainImage1" src="images/ajedrez-de-lewis.jpg"/>Chess is a two-player strategy board game played on a chessboard, a checkered gameboard with 64 squares
            arranged in an 8×8 grid. The game is played by millions of people worldwide. Chess is believed to have
            originated in India sometime before the 7th century. The game was derived from the Indian game chaturanga,
            which is also the likely ancestor of the Eastern strategy games xiangqi, janggi, and shogi. Chess reached
            Europe by the 9th century, due to the Umayyad conquest of Hispania. The pieces assumed their current powers
            in Spain in the late 15th century; the rules were standardized in the 19th century.</p>

          <p>Play does not involve hidden information. Each player begins with 16 pieces: one king, one queen, two
            rooks, two knights, two bishops, and eight pawns. Each of the six piece types moves differently, with the
            most powerful being the queen and the least powerful the pawn. The objective is to checkmate the opponent's
            king by placing it under an inescapable threat of capture. To this end, a player's pieces are used to attack
            and capture the opponent's pieces, while supporting each other. During the game, play typically involves
            making exchanges of one piece for an opponent's similar piece, but also finding and engineering
            opportunities to trade one piece for two, or to get a better position. In addition to checkmate, the game
            can be won by voluntary resignation, and there are also several ways a game can end in a draw (from
            wikipedia.org/wiki/Chess)
          </p>
        </div>
        </Col> <Col xs="0" md="6">
      </Col>
      </Row>
    </Container>


  }

}

export default Main