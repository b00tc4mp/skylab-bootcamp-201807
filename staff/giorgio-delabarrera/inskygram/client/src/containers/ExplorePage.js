import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import Header from '../components/Header';
import GridPost from '../components/GridPost';

class ExplorePage extends Component {

  state = {
    user: null,
    posts: [],
  }

  componentDidMount() {
    const { loggedInUsername, token } = this.props

    logic.retrieveUser(loggedInUsername, undefined, token)
      .then(user => this.setState({ user }))
      .then(() => logic.listExplorePosts(token, loggedInUsername))
      .then(newPosts => {
        const posts = [...this.state.posts, ...newPosts]
        this.setState({ posts })
      })
      .catch(err => console.log(err))
  }

  // handleSearchSubmit = query => {
  //   this.props.history.push('/search/photos/' + query)
  // }

  goToHome = (event) => {
    event.preventDefault()
    if (this.props.location.pathname !== '/')
      this.props.history.push('/')
  }

  // goToLogin = (event) => {
  //   event.preventDefault()
  //   if (this.props.location.pathname !== '/login')
  //     this.props.history.push('/login')
  // }

  // goToRegister = (event) => {
  //   event.preventDefault()
  //   this.props.history.push('/join')
  // }

  goToNewPost = event => {
    event.preventDefault()
    if (this.props.location.pathname !== '/p/new')
      this.props.history.push('/p/new')
  }

  goToExplore = event => {
    event.preventDefault()

    // if (this.props.location.pathname !== `/profile/${logic.userId}`)
    //   this.props.history.push(`/profile/${logic.userId}`)
    this.props.history.push('/explore')
  }

  goToProfile = event => {
    event.preventDefault()

    this.props.history.push(`/giodelabarrera`)

    // if (this.props.location.pathname !== `/profile/${logic.userId}`)
    //   this.props.history.push(`/profile/${logic.userId}`)
  }

  // handleLogout = (event) => {
  //   event.preventDefault()
  //   this.props.history.push('/logout')
  // }

  render() {
    const { user } = this.state
    return (
      <div>
        <div className="header-wrapper">
          <Header onNewPostClick={this.props.onNewPostClick} />
        </div>
        <div className="main-wrapper">
          <main>
            <h5 className="has-text-gray">Explore</h5>
            <section className="is-one-thirds grid-gap-30">
              {
                this.state.posts && this.state.posts.map((post) =>
                  (
                    <GridPost
                      key={post._id}
                      post={post}
                      onPostDetailClick={this.props.onPostDetailClick}
                    />
                  )
                )
              }
            </section>
          </main>
        </div>
      </div>
    )
  }
}

export default withRouter(ExplorePage)