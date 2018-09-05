import React, {Component} from 'react'
import { Redirect, withRouter } from 'react-router-dom'

class Landing extends Component {
    
    state = {
        url: ''
    }


    landingurl = e => this.setState({ url: e.target.value })

    gotoLandingEditor = () => {
        sessionStorage.setItem('landingUrl', this.state.url)
        this.props.history.push('/editorlanding')
    }
    
    render() {

        const {url} = this.state

        return (
            <div>
                <h1>LANDING</h1>
                <input type="text" onChange={this.landingurl}/>
                <button onClick={this.gotoLandingEditor}>GO</button>
                
            </div>
        )
    }
}

export default withRouter(Landing)