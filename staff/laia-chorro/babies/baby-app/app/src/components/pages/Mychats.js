import React, { Component } from 'react'
import './Mychats.css'

class Mychats extends Component {
    state = {
        messages: ['hola', 'Què tal?'],
        message: ''
    }

    keepMessage = e => this.setState({message: e.target.value})

    // to sockets
    addToMessages = data => this.setState({messages: [...this.state.messages, data]})

    sendMessage = e => {
        e.preventDefault();
        /*this.socket.emit('SEND_MESSAGE', {
            author: this.state.username,
            message: this.state.message
        })
        this.setState({message: ''});*/

        const data = this.state.message

        this.setState({messages: [...this.state.messages, data]})

        

    }

    render() {
        const { messages } = this.state

        return(
            <div className="mychats-container">
                <div className="mychats-user-container">
                    <ul>
                        <li>Chat 1</li>
                        <li>Chat 2</li>
                        <li>Chat 3</li>
                    </ul>
                </div>
                <div className="mychats-chat-container">
                    <div className="mychats-messages-container">
                        {this.state.messages.map((message, index) => {
                            return (
                                <div key={index}>{message}</div>
                            )
                        })}
                    </div>
                    <form onSubmit={this.sendMessage}>
                        <input value={this.state.message} onChange={this.keepMessage} type="text" placeholder="Message"/>
                        <button type="submit" >Send</button>
                    </form>
                </div>
                <div>
                    Product
                </div>
            </div>
        )
    }
}

export default Mychats