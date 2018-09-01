import React, {Component} from 'react'
import classNames from 'classnames'
import {Container, Row, Col} from 'reactstrap';
import {ListGroup, ListGroupItem} from 'reactstrap'
import PropTypes from 'prop-types'; // ES6


class Invite extends Component {

  static propTypes = {
    onUserClick:PropTypes.func,
    currentGames:PropTypes.array,
    nickname:PropTypes.string,
    allUsers:PropTypes.array,
  }

  state = {
    error: "",
    usersNotPlayingWith: []
  }

  onUserClick = (e, user) => {
    e.preventDefault()
    this.props.onUserClick(user)
  }

  static getDerivedStateFromProps(props, state) {
    const {currentGames,allUsers} = props
    const usersPlayingWith = currentGames.map(game => game.opponent)
    const usersNotPlayingWith = allUsers.filter(user => usersPlayingWith.indexOf(user) === -1)
    return {usersNotPlayingWith}
  }

  render() {
    let {props: {nickname},state:{usersNotPlayingWith}} = this
    let userList
    if (usersNotPlayingWith.length) {


      userList = usersNotPlayingWith.map(user => {
      if (user !== nickname)  return <ListGroupItem tag="a" href="#" key={user + Math.random()} onClick={e => this.onUserClick(e, user)}> {`${user}`}</ListGroupItem>
      })
    }
    return <main>
      <div className="screen">


        <div className="main__userlist">
          <ListGroup>
            {usersNotPlayingWith.length ? userList : <li>There is no-one to invite at the moment</li>}
          </ListGroup>
        </div>

      </div>
    </main>


  }

}

export default Invite