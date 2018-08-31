import React, {Component} from 'react'
import classNames from 'classnames'
import {Container, Row, Col} from 'reactstrap';
import {ListGroup, ListGroupItem} from 'reactstrap'
import PropTypes from 'prop-types'; // ES6


class GamesOpen extends Component {

  static propTypes = {
    onUserClick:PropTypes.func,
    games:PropTypes.array,
    nickname:PropTypes.string,
   // opponent:PropType.string,
  }

  state = {
    error: "",
  }

  onUserClick = (e, user) => {
    e.preventDefault()
    this.props.onUserClick(user)
  }


  render() {
    let {props: {games,nickname}} = this
    let userList
    if (games.length) {


      userList = games.map(game => {
        return <ListGroupItem key={game.id} tag="a" href="#" onClick={e => this.onUserClick(e, game)}> {`${game.opponent}`}</ListGroupItem>
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

export default GamesOpen