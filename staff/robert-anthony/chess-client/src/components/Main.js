import React, {Component} from 'react'

class Main extends Component {


  render() {
    const {props: {users}} = this
  let listo

    if (users.length) listo = users.map(user => <li key={user.email}>{`${user.email}` }</li>)

    return <main>
      <div className="screen">
        <nav>
        </nav>
        <ul>
          {users.length ? listo : <li>no users available</li>}
        </ul>
      </div>
    </main>


  }

}

export default Main