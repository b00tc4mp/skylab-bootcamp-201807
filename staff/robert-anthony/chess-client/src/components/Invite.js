import React, {Component} from 'react'
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

    return   <div className="invite__mainContainer" >

        <Container>

          <Row> <Col className="invite__explainText" xs="12" md="6">
            Users you can invite

            <form className="invite__searchForm">
              <input autoFocus className="invite__searchInput" placeholder="Enter a search term" value={userSearchTerm}
                     onChange={this.onKeepUserSearchTermAndDoSearch} type="text"/>
            </form>
          </Col>
            <Col className="invite__explainText invite__explainText-explain" xs="12" md="6">
              Users you have invited
            </Col>
          </Row>
          <Row>

            <Col xs="12" md="6">
              <div className="userList">

                <ListGroup>
                  {usersNotPlayingWith.length ? usersNotPlayingWith.map(user => {
                   return user !== nickname ? <ListGroupItem   className="userList__invitedUsers" tag="a" href="#" key={user + Math.random()}
                                                                 onClick={e => this.onUserClick(e, user)}> {`${user}`}</ListGroupItem>: null
                  }) : <ListGroupItem   className="userList__searchedUsers" >No match</ListGroupItem>}
                </ListGroup>
              </div>
            </Col>
            <Col xs="12" md="6">
              <div className="userList">

                <ListGroup >
                  {usersInvited.length ? usersInvited.map(user => {
                    return <ListGroupItem  key={user + Math.random()}> {`${user}`}</ListGroupItem>
                  }) : <li>You have no invited users</li>}
                </ListGroup>
              </div>
            </Col>
          </Row>
        </Container>
      </div>



  }

}

export default Invite