import React, { Component } from 'react'
import './Mychats.css'

class Mychats extends Component {
    state = {
        messagesFrom: ['hola', 'Què tal?'],
        messagesTo: ['']
    }

    keepMsgFrom = e => {
        return this.setState({messagesFrom: this.state.messagesFrom.push(e.target.value)})

    }

    render() {
        const { messagesFrom, messagesTo } = this.state

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
                        { (messagesFrom || messagesTo) && messagesFrom.map((msg, index) => {
                            debugger;
                                return (<p key={index}>{msg}</p>)
                            })
                        }
                    </div>
                    <input onChange={this.keepMsgFrom} type="text"/>
                </div>
                <div>
                    Product
                </div>
            </div>
        )
    }
}

export default Mychats