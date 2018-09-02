import React, {Component} from 'react'
import classNames from 'classnames'
import {Container, Row, Col} from 'reactstrap';
import {ListGroup, ListGroupItem} from 'reactstrap'
import PropTypes from 'prop-types'; // ES6


class Invite extends Component {

  static propTypes = {
    onUserClick: PropTypes.func,
    currentGames: PropTypes.array,
    nickname: PropTypes.string,
    allUsers: PropTypes.array,
    onUserSearchByString: PropTypes.func

  }

  state = {
    error: "",
    usersNotPlayingWith: [],
    usersInvited:[],
    userSearchTerm: ''
  }

  onUserClick = (e, user) => {
    e.preventDefault()
    this.props.onUserClick(user)
  }

  static getDerivedStateFromProps(props, state) {
    const {currentGames, allUsers} = props
    const usersPlayingWith = currentGames.map(game => game.opponent)
    const usersInvited = currentGames.filter(game => {
      return game.state === 'invited'
    }).map(game => game.opponent)
    const usersNotPlayingWith = allUsers.filter(user => usersPlayingWith.indexOf(user) === -1)
    return {usersNotPlayingWith,usersInvited}
  }

  onKeepUserSearchTermAndDoSearch = e => {
    const {props: {onUserSearchByString}} = this
    const term = e.target.value
    this.setState({userSearchTerm: term})
    onUserSearchByString(term)

  }

  render() {
    let {props: {nickname}, state: {usersInvited,userSearchTerm, usersNotPlayingWith}} = this
    let userList

    return <main>
      <div className="screen">

        <Container>
          <Row>
            <Col xs="12" md="4">
              <form>
                <input autoFocus placeholder="Enter a search term" value={userSearchTerm}
                       onChange={this.onKeepUserSearchTermAndDoSearch} type="text"/>
              </form>
            </Col>
          </Row>
          <Row> <Col xs="12" md="6">
            Users you can invite
          </Col>
            <Col xs="12" md="6">
              Users you have invited
            </Col>
          </Row>
          <Row>

            <Col xs="12" md="6">
              <div className="main__userlist">

                <ListGroup>
                  {usersNotPlayingWith.length ? usersNotPlayingWith.map(user => {
                    if (user !== nickname) return <ListGroupItem tag="a" href="#" key={user + Math.random()}
                                                                 onClick={e => this.onUserClick(e, user)}> {`${user}`}</ListGroupItem>
                  }) : <li>Please search for users</li>}
                </ListGroup>
              </div>
            </Col>
            <Col xs="12" md="6">
              <div className="main__userlist">

                <ListGroup>
                  {usersInvited.length ? usersInvited.map(user => {
                    return <ListGroupItem  key={user + Math.random()}> {`${user}`}</ListGroupItem>
                  }) : <li>You have no invited users</li>}
                </ListGroup>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </main>


  }

}

export default Invite