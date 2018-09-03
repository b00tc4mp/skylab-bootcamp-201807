import React, {Component} from 'react'
import classNames from 'classnames'
import {Container, Row, Col} from 'reactstrap';
import {ListGroup, ListGroupItem} from 'reactstrap'
import PropTypes from 'prop-types';
import InvitationDialog from "./InvitationDialog" // ES6


class GamesInvited extends Component {

  static propTypes = {
    onRespondToGameRequest: PropTypes.func,
    games: PropTypes.array,
    nickname: PropTypes.string,
    // opponent:PropType.string,
  }

  state = {
    error: "",
  }


  render() {
    let {props: {games, nickname}} = this
    let userList
    if (games.length) {


      userList = games.map(game => {
        return <ListGroupItem key={game.opponent + Math.random()}><InvitationDialog opponent={game.opponent}
                                                                                    gameID={game.id}
                                                                                    onRespondToGameRequest={this.props.onRespondToGameRequest}/></ListGroupItem>
      })
    }
    return <div className="screen">


      <div className="userList gamesinvited_userList"><ListGroup>
        {games.length ? userList : <li>You have no invitations at the moment</li>}
      </ListGroup>
      </div>

    </div>

  }

}

export default GamesInvited