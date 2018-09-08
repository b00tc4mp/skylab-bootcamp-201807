import React, { Component } from 'react'
import './App.css'
import logic from './logic'
import Login from './components/pages/Login'
import Home from './components/pages/Home'
import Register from './components/pages/Register'
//import Update from './components/pages/Update'
import Nav from './components/sections/Nav'
import Myzone from './components/Myzone'
import { Route, withRouter, Redirect } from 'react-router-dom'


class App extends Component {

	state = {
		loggedIn: logic.loggedIn,
		errorMsg: null,
		showFeedback: false,
        idFavs: []
	}

	hideFeedback = () => this.setState({errorMsg: null, showFeedback: false})

	onRegister = (email, password) => {
		this.hideFeedback()
		logic.register(email, password)
		.then(() => {
			this.setState({showFeedback: true})
			this.props.history.push('/register')
		})
		.catch(({message}) => this.setState({errorMsg: message}))
	}

	onLogin = (email, password) => {
		this.hideFeedback()
		logic.login(email, password)
			.then(() => {
				//this.setState({loggedIn: true, showFeedback: true})
				this.setState({loggedIn: true})
				this.props.history.push('/mylist')
			})
			.catch(({message}) => {
				this.setState({errorMsg: message})
			})
	}

	onLogout = () => {
		logic.logout()

		this.setState({loggedIn: false, idFavs: []})
		this.props.history.push('/')
	}

	onProductUpload = (title, cathegory, price, description, photo, longitude, latitude) => {
		logic.uploadProduct(title, cathegory, price, description, photo, longitude, latitude)
			.then(() => logic.getPrivateUser() )
			.then(() => this.props.history.push('/mylist'))
			.catch(({ message }) => this.setState({ error: message }))
			/*.then(() => this.setState({ succeeded: true }))
			.catch(({ message }) => this.setState({ error: message }))*/
	}

	getIdFavs = () => {
        const favs = logic.getUserField('favs')

        if (logic.loggedIn && favs && favs.length) {
            const idFavs = favs.map(fav => fav.id);
            this.setState({ idFavs })
        }
    }

	onAddFavourite = (idProduct) => {
		if (!this.state.loggedIn) return this.props.history.push('/login')

		return Promise.resolve()
			.then(() => logic.addProductToFavourites(idProduct))
			.then(() => logic.getPrivateUser() )
			.then(() => this.getIdFavs() )
			.catch(res => {
			})
			//.catch(({ message }) => this.setState({ errorMsg: message }))
	}

	onRemoveFavourite = (idProduct) => {
		return Promise.resolve()
			.then(() => logic.removeProductFromFavourites(idProduct))
			.then(() => logic.getPrivateUser() )
			.then(() => this.getIdFavs() )
			.catch(res => {
			})
			//.catch(({ message }) => this.setState({ errorMsg: message }))
	}

  /*onUpdate = (password, newUsername, newPassword) => {
    this.hideFeedback()
    logic.updateUser(password, newUsername, newPassword)
    .then(() => {
      this.setState({showFeedback: true})
      this.props.history.push('/update')
    })
    .catch(({message}) => this.setState({errorMsg: message}))
  }*/


	render() {
		const { loggedIn, errorMsg, showFeedback, idFavs } =  this.state
		const { onRegister, onLogin, onLogout, onProductUpload, hideFeedback, getIdFavs, onAddFavourite, onRemoveFavourite } = this

		return (
			<div className="App">
				<Nav loggedIn={loggedIn} />

				<Route path="/" exact render={() => <Home onAddFavourite={onAddFavourite} onRemoveFavourite={onRemoveFavourite} idFavs={idFavs} getIdFavs={getIdFavs}/>} />
				<Route path="/login" exact render={() => <Login onLogin={onLogin} errorMsg={errorMsg} showFeedback={showFeedback} hideFeedback={hideFeedback}/>} />
				<Route path="/register" exact render={() => <Register onRegister={onRegister} errorMsg={errorMsg} showFeedback={showFeedback} hideFeedback={hideFeedback}/>} />
				<Route path="/(profile|mylist|favourites|reviews|prod/upload)" exact render={() => 
					loggedIn ? 
						<Myzone onLogout={onLogout} onProductUpload={onProductUpload} onRemoveFavourite={onRemoveFavourite} idFavs={idFavs} /> : 
						<Redirect to="/login" />
				} />

				{/*<Route path="/update" exact render={() => loggedIn ? <Update onUpdateProp={onUpdate} email={logic.userUsername} errorMsg={errorMsg} showFeedback={showFeedback} hideFeedback={hideFeedback}/> : <Redirect to="/login" />} />*/}

			</div>
		)
	}
}

export default withRouter(App)
