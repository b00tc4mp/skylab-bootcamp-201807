import React, { Component } from 'react'
import Utils from '../utils/validate-email'
import { withRouter } from 'react-router-dom'
import Headers from '../components/Header'

class HostessEditProfile extends Component {
    state = {
        name: '',
        birth: '',
        origin: '',
        gender: '',
        phone: '',
        languages: '',
        jobType: '',
        skills: '',
        height: 120,
        myself: '',
        error: ''

    }

    handleSubmit = (event) => {
        event.preventDefault()


    }



    render() {
        return (
            <div>
                <Headers hostess business onLogout={this.props.onLogout}/>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>NAME</label>
                        <input type="text"></input>

                        <button type="submit">UPDATE</button>
                    </form>
                </div>

           <div class="name">
                <input type="text" name="name" placeholder="My name is">
            </div>
            <div class="password">
                <input type="password" name="password" placeholder="Secret password">
            </div>
            <div class="date">
                <input type="date" name="date" placeholder="My birth date is">
            </div>
            <div class="born">
                <input type="text" name="born" placeholder="I come from">
            </div>




            </div>
        )
    }
}

export default withRouter(HostessEditProfile)