import React, {Component} from 'react'
import ChessboardComponent from "./ChessboardComponent"
import { Button } from 'reactstrap';
import PropTypes from 'prop-types'


class InvitationDialog extends Component {

  static propTypes = {
    onRespondToGameRequest:PropTypes.func,
    opponent:PropTypes.string,
    gameID:PropTypes.string,
  }


  onUserClick = (e,answer) => {
    e.preventDefault()
    this.props.onRespondToGameRequest(this.props.opponent,this.props.gameID,answer)
  }


  render() {

    return <div className="dialog__userInvitationDialog">
      <p>You received an invitation from ${this.props.opponent}</p>
      <Button onClick={e=>this.onUserClick(e,true)}  color="info">Accept</Button>
      <Button onClick={e=>this.onUserClick(e,false)}  color="secondary">Reject</Button>

    </div>


  }

}

export default InvitationDialog