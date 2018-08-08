import * as React from 'react'
import './App.css';


interface User {
    index:number,
    name:string,
    gender:string,
    id:number,
    age:number,
    guid:number
}

class App extends React.Component {

    state = {
        users: [],
        user: null
    }

    handleClick = (id) => {
        fetch(`/users/${id}`)
            .then(res => res.json())
            .then(user => user[0])
            .then(user => this.setState({user}))
    }

    componentDidMount() {
        fetch('/users')
            .then(res => res.json())
            .then(users => {
                this.setState({users})
            })
            .catch(console.error)
    }

    makeDetails = (user:User) => {return <ul><li key={user.index+user.name}>{user.name}</li>
        <li key={user.index+user.gender}>{user.gender}</li>
        <li key={user.index + user.guid}>{user.guid}</li></ul>}


    makeList = () => {
      return  this.state.users.map((user) =>  <li key={user.index.toString()}><a href="#" onClick={() => this.handleClick(user.index)}>{user.name}</a></li>)
    };


    render() {
        return (
            <div className="App">
                <h1>Users</h1>
                {(this.state.users.length > 0) && this.makeList()}
                {this.state.user !== null && <div>{this.makeDetails(this.state.user)}</div>}
            </div>
        );
    }
}

export default App;