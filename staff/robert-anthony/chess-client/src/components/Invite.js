import React, {Component} from 'react'
import classNames from 'classnames'
import {Container, Row, Col} from 'reactstrap';
import {ListGroup, ListGroupItem} from 'reactstrap'
import PropTypes from 'prop-types'; // ES6


class Invite extends Component {

  static propTypes = {
    onUserClick:PropTypes.func,
    users:PropTypes.array,
    nickname:PropTypes.string,
  }

  state = {
    error: "",
  }

  onUserClick = (e, user) => {
    e.preventDefault()
    this.props.onUserClick(user)
  }


  render() {
    let {props: {users,nickname}} = this
    let userList
    if (users.length) {


      userList = users.map(user => {
        return <ListGroupItem tag="a" href="#" key={user + Math.random()} onClick={e => this.onUserClick(e, user)}> {`${user}`}</ListGroupItem>
      })
    }
    return <main>
      <div className="screen">


        <div className="main__userlist">
          <ListGroup>
            {users.length ? userList : <li>There is no-one to invite at the moment</li>}
          </ListGroup>
        </div>

      </div>
    </main>


  }

}

export default Invite