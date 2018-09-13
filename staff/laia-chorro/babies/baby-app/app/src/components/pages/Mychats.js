import React, { Component } from 'react'
import logic from '../../logic'
import ChatCard from '../cards/ChatCard'
import SimplePreviewCard from '../cards/SimplePreviewCard'
import Alert from 'react-s-alert'
import './Mychats.css'
import socketIOClient from 'socket.io-client'

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

    socket = null

    setSocketListeners = (userId, token) => {
        this.socket = socketIOClient(process.env.REACT_APP_SOCKET_API) // connect with server

        if (this.socket) {
            // TODO: make it socketIo-nonDependant
            this.socket.on(`chat message for ${userId}`, () =>  this.isEmptyChats() )
        }
    }

    keepMessage = e => this.setState({message: e.target.value})

    // to sockets
    addToMessages = data => this.setState({messages: [...this.state.messages, data]})

    componentDidMount() {
        // this.updateChats()
        this.isEmptyChats()
    }

    updateChats = () => {
        return this.getInfoFromMyChats(this.props.productId)
            .then(_ => logic.listChatByProductAndUserId(this.state.productId) )
            .catch(() => logic.addChat(this.state.productId))
            .then(chat => {
                const chatId = chat._id || chat.chat
                return logic.getChatById(chatId)
            }).then(chat => this.setState({messages: chat.messages, chatId: chat._id}) )
            .catch(({ message }) => Alert.error(message, { position: 'bottom-right', effect: 'slide', timeout: 3000 }))
    }

    createVeryFirstChat = () => {
        logic.addChat(this.props.productId)
            .then(chat => {
                debugger;
                const chatId = chat.chat

                return logic.getChatById(chatId)
            }).then(chat => this.setState({messages: chat.messages, chatId: chat._id, chats: [ chat ]}) )
            .catch(({ message }) => Alert.error(message, { position: 'bottom-right', effect: 'slide', timeout: 3000 }))
    }

    sendMessage = e => {
        e.preventDefault();
        const data = {}
        data.text = this.state.message

        this.setState({messages: [...this.state.messages, data]})

        this.addMessageToChat(this.state.chatId, data.text, this.state.productId)
    }

    isEmptyChats = () => {
        logic.listChatsByUserId()
            .then(chats => {
                if(chats && chats.length) {
                    this.updateChats()
                }
                else if(this.props.productId) {
                   this.createVeryFirstChat()
                }
            })
    }

    getInfoFromMyChats = productId => {
        return logic.listChatsByUserId()
            .then(chats => {
                if (!chats || !chats.length) throw new Error()

                this.setState({chats})

                if (!productId) productId = chats[0].product

                return productId
            })
            .catch(() => this.setState({chats: []}) )
            .then(productId => logic.getProductDetailById(productId))
            .then(product => {
                this.setState({prodTitle: product.title, 
                    prodPhoto: product.photos[0], 
                    prodOwner: product.user_name,
                    prodPrice: product.price,
                    prodDescription: product.descrition,
                    productId: product.id
                })})
            //.catch(({ message }) => Alert.error(message, { position: 'bottom-right', effect: 'slide', timeout: 3000 }))
    }

    addMessageToChat(chatId, text, receiver) {
        logic.addMessageToChat(chatId, text, receiver)
            .then(() => logic.getChatById(chatId))
            .then(res => this.setState({messages: res.messages}))
            .catch(({ message }) => Alert.error(message, { position: 'bottom-right', effect: 'slide', timeout: 3000 }))
    }

    onGoToChatById = () => {
        const { chatId } = this.state

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
                            debugger;
                            return (
                                <li key={index}>
                                    <ChatCard 
                                        title={chat.product.title}
                                        photo={chat.product.photos[0]}
                                        prodOwner={'Pepito'}
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
                    {productId && <SimplePreviewCard 
                        photo={prodPhoto}
                        price={prodPrice}
                        title={prodTitle}
                        idProd={productId}
                        description={prodDescription}
                        getProductDetail={this.onProductDetail}          
                    />}
                </div>
            </div>
        )
    }
}

export default Mychats