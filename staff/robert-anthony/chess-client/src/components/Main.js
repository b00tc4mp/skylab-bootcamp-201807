import React, {Component} from 'react'
import classNames from 'classnames'
import ChessboardComponent from "./ChessboardComponent"
import {ListGroup, ListGroupItem} from 'reactstrap'

class Main extends Component {

  state = {
    error: "",
  }

  onUserClick = (e, user) => {
    e.preventDefault()
    this.props.onRequestGame(user)
  }




  render() {
    let {props: { users, nickname}} = this
    let userList
    if (users.length) {
      users = users.filter(user => user !== nickname)

      userList = users.map(user => {
        return <ListGroupItem  tag="a" href="#"  onClick={e => this.onUserClick(e, user)}> {`${user}`}</ListGroupItem>
      })
    }
    return <main>
      <div className="screen">
        <nav>
        </nav>
        <h1>You are playing as {nickname}</h1>
        <div className="main__gamearea">
          <div className="main__userlist">
            <ListGroup>
              {users.length ? userList : <li>no users available</li>}
            </ListGroup>
          </div>


        </div>
      </div>
    </main>



  }

}

export default Main