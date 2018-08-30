import React, {Component} from 'react'
import classNames from 'classnames'
import ChessboardComponent from "./ChessboardComponent"
import {Container, Row, Col} from 'reactstrap';
import {ListGroup, ListGroupItem} from 'reactstrap'


class Games extends Component {

  state = {
    error: "",
  }

  onUserClick = (e, user) => {
    e.preventDefault()
    this.props.onRequestGame(user)
  }


  render() {
    let {props: {onGameMove, currentGames, nickname}} = this
    let userList, chessBoardList
    let users = []
    if (currentGames.length) {
      users = currentGames.filter(game => {
        if (game.state === "invited") return game.opponent
      })

      userList = users.map(user => {
        return <ListGroupItem tag="a" href="#" onClick={e => this.onUserClick(e, user)}> {`${user}`}</ListGroupItem>
      })

      chessBoardList = currentGames.map(game => {
        return <ListGroupItem key={game.opponent + Math.random()}><ChessboardComponent
          onGameMove={(move) => onGameMove(move, game.id, game.opponent)} fen={game.fen}/></ListGroupItem>
      })


    }
    return <main>
      <div className="screen">
        <nav>
        </nav>
        <h1>You are playing as {nickname}</h1>
        <Container>
          <Row>
            <Col xs="12" md="4">

              <div className="main__userlist">
                <ListGroup>
                  {users.length ? userList : <li>no users available</li>}
                </ListGroup>
              </div>
            </Col>
            <Col xs="12" md="4">

              <div className="main__chessboardarea">
                {currentGames.length && <ListGroup>
                  {currentGames.length && currentGames.map(game => {
                    return <ListGroupItem><ChessboardComponent
                      onGameMove={(move) => onGameMove(move, game.id, game.opponent)} fen={game.fen}/></ListGroupItem>
                  })
                  }
                </ListGroup>}

              </div>
            </Col>

          </Row>
        </Container>
      </div>
    </main>


  }

}

export default Games