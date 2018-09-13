import React, {Component} from 'react'
import {ListGroup, ListGroupItem} from 'reactstrap'
import PropTypes from 'prop-types'; // ES6


class OpenGames extends Component {

  static propTypes = {
    onUserClick: PropTypes.func,
    games: PropTypes.array,
    nickname: PropTypes.string,
    currentGameViewed: PropTypes.object,
    userList:PropTypes.array,
  }

  state = {
    error: "",
  }

  onUserClick = (e, game) => {
    e.preventDefault()
    this.props.onUserClick(game)
  }


  render() {
    let {props: {games, nickname, currentGameViewed}} = this
    let userList
    if (games.length) {
      games = games.filter(game => !(game.state === 'invited' && game.initiator === nickname))
      userList = games.map(game => {
        let isCurrent = false
        if (currentGameViewed && (currentGameViewed.id === game.id)) isCurrent = true
        return <ListGroupItem key={game + Math.random()} tag="a" href="#"
                              onClick={e => this.onUserClick(e, game)}>{`${game.opponent}`}&nbsp;&nbsp;{(game.state === 'invited') &&
        <i className="far fa-lg fa-envelope"></i>}&nbsp;{(game.toPlay === nickname) &&
        <i className='fas fa-chess-pawn fa-lg'></i>}&nbsp;{isCurrent && <i className='far fa-eye fa-lg'></i>} </ListGroupItem>
      })
    }
    return   <div className="userList opengames_userList">
          <ListGroup>
            {(games.length !== 0) ? userList : <li><span>You have invited people to play but you are not playing any games with anyone at the moment</span></li>}
          </ListGroup>
        </div>




  }

}

export default OpenGames