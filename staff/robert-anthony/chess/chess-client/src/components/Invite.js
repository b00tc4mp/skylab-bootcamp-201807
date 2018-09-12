import React, {Component} from 'react'
import {Container, Row,Input, Col, InputGroupText, ListGroup, InputGroupAddon, InputGroup, ListGroupItem} from 'reactstrap'
import PropTypes from 'prop-types';


class Invite extends Component {

  static propTypes = {
    onUserClick: PropTypes.func,
    currentGames: PropTypes.array,
    nickname: PropTypes.string,
    allUsers: PropTypes.array,
    onUserSearchByString: PropTypes.func

  }

  state = {
    usersNotPlayingWith: [],
    usersInvited: [],
    userSearchTerm: '',

  }

  onUserClick = (e, user) => {
    e.preventDefault()
    this.props.onUserClick(user)
  }

  static getDerivedStateFromProps(props, state) {
    const {currentGames, allUsers} = props
    const usersPlayingWith = currentGames.map(game => game.opponent)
    const usersInvited = currentGames.filter(game => {
      return game.state === 'invited' && game.acceptor !== props.nickname
    }).map(game => game.opponent)
    const usersNotPlayingWith = allUsers.filter(user => usersPlayingWith.indexOf(user) === -1)
    return {usersNotPlayingWith, usersInvited}
  }

  onKeepUserSearchTermAndDoSearch = e => {
    const {props: {onUserSearchByString}} = this
    const term = e.target.value
    this.setState({userSearchTerm: term})
    onUserSearchByString(term)

  }

  render() {
    let {props: {nickname}, state: {usersInvited, userSearchTerm, usersNotPlayingWith}} = this

    return    <Container>

        <Row className="mb-2">
        <Col className="invite__explainText" xs="12" md="6">
          <form className="invite__searchForm">

            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Search for users</InputGroupText>
              </InputGroupAddon>
              <Input autoFocus className="invite__searchInput" placeholder="Enter a search term" value={userSearchTerm}
                     onChange={this.onKeepUserSearchTermAndDoSearch} type="text"/>

            </InputGroup>

          </form>

        </Col>
          <Col xs="12" md="6">
            <div className="userList">
              {usersNotPlayingWith.length !==0 &&  <ListGroup className="userList__invitedUsersListGroup">
                {usersNotPlayingWith.length && usersNotPlayingWith.map(user => {
                  return user !== nickname ?
                    <ListGroupItem className="userList__invitedUsersListGroupItem" tag="a" href="#" key={user + Math.random()}
                                   onClick={e => this.onUserClick(e, user)}><span
                      className="userList__invitedUser-explainText"><i className="fas fa-envelope-open fa-lg"></i>

&nbsp;Invite:&nbsp;</span> {`${user}`}
                    </ListGroupItem> : null
                })}
              </ListGroup>}
              {usersInvited.length && <ListGroup className="userList__searchedUsersListGroup">
                {usersInvited.length && usersInvited.map(user => {
                  return <ListGroupItem key={user + Math.random()}> <span
                    className="userList__searchedUser-explainText"><i className="fas fa-user-check fa-lg"></i>&nbsp;

 Invited:&nbsp;</span> {`${user}`}</ListGroupItem>
                }) }
              </ListGroup>}

            </div>
          </Col>
        </Row>

      </Container>




  }

}

export default Invite