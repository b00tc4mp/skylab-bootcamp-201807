import React, { Component } from 'react'
import logic from '../../logic'
import ChatCard from '../cards/ChatCard'
import SimplePreviewCard from '../cards/SimplePreviewCard'
import Alert from 'react-s-alert'
import './Mychats.css'

class Mychats extends Component {
    state = {
        messages: [],
        message: '',
        chatId: '',
        chats: [],
        productId: null,
        prodTitle: null,
        prodPhoto: null,
        prodOwner: null,
        prodPrice: 0,
        prodDescription: null
    }

    keepMessage = e => this.setState({message: e.target.value})

    // to sockets
    addToMessages = data => this.setState({messages: [...this.state.messages, data]})

    componentDidMount() {
        /*logic.getChatById('5b99370de2a09c27448ac4be')
            .then(res => {
                this.setState({messages: res.messages})
                debugger;
            })*/


        let productId = '5b994d419f25b20e139acf36'

        /*logic.listChatsByUserId()
            .then(chats => {
                debugger;
                this.setState({chats})
                if (!productId) productId = chats[0].product
                return productId
            })*/
        return this.getInfoFromMyChats(productId)
            .then(() => logic.listChatByProductAndUserId(productId))
            .catch(() => logic.addChat(productId) )
            .then(chat => {
                const chatId = chat._id || chat.chat
                return logic.getChatById(chatId)
            }).then(chat => {
                this.setState({messages: chat.messages, chatId: chat._id})
            })
            .catch(({ message }) => Alert.error(message, { position: 'bottom-right', effect: 'slide', timeout: 3000 }))
    }

    sendMessage = e => {
        e.preventDefault();
        /*this.socket.emit('SEND_MESSAGE', {
            author: this.state.username,
            message: this.state.message
        })
        this.setState({message: ''});*/

        const data = {}
        data.text = this.state.message

        this.setState({messages: [...this.state.messages, data]})

        this.addMessageToChat(this.state.chatId, data.text)
    }

    getInfoFromMyChats = productId => {
        return logic.listChatsByUserId()
            .then(chats => {
                this.setState({chats})

                if (!productId) productId = chats[0].product

                return productId
            })
            .then(productId => logic.getProductDetailById(productId))
            .then(product => {
                this.setState({prodTitle: product.title, 
                    prodPhoto: product.photos[0], 
                    prodOwner: product.user_name,
                    prodPrice: product.price,
                    prodDescription: product.descrition,
                    productId: product.id
                })})
            //.then(() => logic.getPublicUser(this.state.chats.user))
            .catch(({ message }) => Alert.error(message, { position: 'bottom-right', effect: 'slide', timeout: 3000 }))
    }

    addMessageToChat(chatId, text) {
        logic.addMessageToChat(chatId, text)
            .then(() => logic.getChatById(chatId))
            .then(res => this.setState({messages: res.messages}))
            .catch(({ message }) => Alert.error(message, { position: 'bottom-right', effect: 'slide', timeout: 3000 }))
    }

    onGoToChatById = () => {
        const { chatId } = this.setState

        logic.getChatById(chatId)
            .then(res => this.setState({messages: res.messages}))
            .catch(({ message }) => Alert.error(message, { position: 'bottom-right', effect: 'slide', timeout: 3000 }))
    }

    onProductDetail = () => {return }

    render() {
        const { messages, chats, prodTitle, prodPhoto, prodOwner, prodPrice, prodDescription, productId } = this.state

        return(
            <div className="mychats-container">
                <div className="mychats-user-container">
                    <ul>
                        {chats && chats.map((chat, index) => {
                            return (
                                <li key={index}>
                                    <ChatCard 
                                        title={prodTitle}
                                        photo={prodPhoto}
                                        prodOwner={prodOwner}
                                        onGoToChat={this.onGoToChatById}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="mychats-chat-container">
                    <div className="mychats-messages-container">
                        {messages && messages.map((message, index) => {
                            return (
                                <div key={index}>{message.text}</div>
                            )
                        })}
                    </div>
                    <form onSubmit={this.sendMessage}>
                        <input value={this.state.message} onChange={this.keepMessage} type="text" placeholder="Message"/>
                        <button type="submit" >Send</button>
                    </form>
                </div>
                <div className="mychats-product-preview">
                    <SimplePreviewCard 
                        photo={prodPhoto}
                        price={prodPrice}
                        title={prodTitle}
                        idProd={productId}
                        description={prodDescription}
                        getProductDetail={this.onProductDetail}          
                    />
                </div>
            </div>
        )
    }
}

export default Mychats