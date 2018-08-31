import React, {Component} from 'react'
import classNames from 'classnames'
import {Container, Row, Col} from 'reactstrap';
import {ListGroup, ListGroupItem} from 'reactstrap'
import PropTypes from 'prop-types'; // ES6


class OpenGames extends Component {

  static propTypes = {
    onUserClick:PropTypes.func,
    games:PropTypes.array,
    nickname:PropTypes.string,
    currentGameViewed:PropTypes.object,
   // opponent:PropType.string,
  }

  state = {
    error: "",
  }

  onUserClick = (e, game) => {
    e.preventDefault()
    this.props.onUserClick(game)
  }


  render() {
    let {props: {games,nickname,currentGameViewed}} = this
    let userList
    if (games.length) {


      userList = games.map(game => {
        let isCurrent = false
        if (currentGameViewed && (currentGameViewed.id === game.id)) isCurrent = true
        console.log(currentGameViewed,isCurrent)
        return <ListGroupItem key={game + Math.random()} tag="a" href="#" onClick={e => this.onUserClick(e, game)}>{`${game.opponent}`}{(game.state === 'invited') && <i className='far fa-envelope'></i> }{isCurrent && <i className='fas fa-chess'></i> } </ListGroupItem>
      })
    }
    return <main>
      <div className="screen">


              <div className="main__userlist">
                <ListGroup>
                  {games.length ? userList : <li>You are not playing any games with anyone at the moment</li>}
                </ListGroup>
              </div>

      </div>
    </main>


  }

}

export default OpenGames