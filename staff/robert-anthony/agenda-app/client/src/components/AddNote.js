import React, {Component} from 'react'
import logic from '../logic'
import {withRouter} from 'react-router-dom'


class UpdateNote extends Component {
    state = {
        text: '',
        surname: '',
        address: '',
        succeeded: false,
        error: ''
    }

    onTextChanged = e => this.setState({ text: e.target.value })

    onAddContact = e => {
        e.preventDefault()
        const { text} = this.state
        const date =  this.props.currentDate;
        const note = {text,date}

        logic.addNote(this.props.username,note,this.props.token)
            .then(({ message }) => {
              this.setState({ error: message })
              this.props.history.push("/notes")

            })
            .catch((err) => {
                this.setState({err})
            })
    }



    render() {
        const {state:{error}} = this


        return <main>

             <div className="screen">
               <h2>{this.props.currentDate}</h2>

               <form onSubmit={this.onAddContact}>
                    <input type="text" name="notetext" placeholder="Note text..." autoFocus onChange={this.onTextChanged} />
                    <button type="submit">Add Note</button>
                </form>
                 {error && <h3>{error}</h3>}
             </div>
        </main>
    }
}

export default withRouter(UpdateNote)

