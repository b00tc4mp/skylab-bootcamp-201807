import React, { Component } from 'react'
import logic from '../../logic'
import ChatCard from '../cards/ChatCard'
//import SimplePreviewCard from '../cards/SimplePreviewCard'
import Alert from 'react-s-alert'
import './Mychats.css'
import socketIOClient from 'socket.io-client'
import { Launcher } from 'react-chat-window'
import logo from '../../assets/block.svg'


class Mychats extends Component {
    state = {
        //loaded: false,
        messageList: null,
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

    setSocketListeners = (userId) => {
        this.socket = socketIOClient(process.env.REACT_APP_SOCKET_API) // connect with server

        if (this.socket) {
            // TODO: make it socketIo-nonDependant
            this.socket.on(`chat message for ${userId}`, () =>  {
                this.isEmptyChats()} ) 
        }
    }


    parseToObjectMessages = (messages) => {
        const userId = logic._userId

        return messages.map(message => {
            return {
                author: message.user === userId ? 'me' : 'them',
                type: 'text',
                data: { text: message.text }
            }
        })
    }

    //keepMessage = e => this.setState({message: e.target.value})

    // to sockets
    //addToMessages = data => this.setState({messageList: [...this.state.messageList, data]})

    componentDidMount() {
        const userId = logic._userId

        this.setSocketListeners(userId)
        this.isEmptyChats(this.props.productId)
    }

    isEmptyChats = productId => {
        logic.listChatsByUserId()
            .then(chats => {
                if(chats && chats.length) {
                    this.updateChats(productId)
                }
                else if(this.props.productId) {
                   this.createVeryFirstChat()
                }
            })
    }

    // messageList: chat.messageList, chatId: chat.id, chats: [ chat ]
    updateChats = productId => {
        return logic.listChatsByUserId()
            .then(chats => {
                if (!productId) productId = chats[0].product._id

                this.setState({chats, productId})

                return productId
            })
            .then(productId => logic.listChatByProductAndUserId(productId) )
            .catch(() => logic.addChat(this.state.productId))
            .then(chat => {
                const chatId = chat.id || chat.chat
                return logic.getChatById(chatId)
            }).then(chat => this.setState({messageList: this.parseToObjectMessages(chat.messages), chatId: chat.id}) )
            .catch(({ message }) => Alert.error(message, { position: 'bottom-right', effect: 'slide', timeout: 3000 }))
    }


    createVeryFirstChat = () => {
        logic.addChat(this.props.productId)
            .then(chat => {
                const chatId = chat.chat

                return logic.getChatById(chatId)
            }).then(chat => this.setState({messageList: this.parseToObjectMessages(chat.messages), chatId: chat.id, chats: [ chat ]}) )
            .catch(({ message }) => Alert.error(message, { position: 'bottom-right', effect: 'slide', timeout: 3000 }))
    }


    addMessageToChat(chatId, text) {
        logic.getChatById(chatId)
            .then(chat => {
                const userId = logic._userId
                const receiver = chat.users.find(item => item !== userId)
                return logic.addMessageToChat(chatId, text, receiver)
            })
            .then(() => logic.getChatById(chatId))
            .then(chat => this.setState({messageList: this.parseToObjectMessages(chat.messages)}))
            .catch(({ message }) => Alert.error(message, { position: 'bottom-right', effect: 'slide', timeout: 3000 }))
    }

    
    //onProductDetail = () => {return }
    
    _onMessageWasSent(message) {
        this.setState({ messageList: [...this.state.messageList, message] }, () => 
            this.addMessageToChat(this.state.chatId, message.data.text)
            )      
    }

    /*
    sendMessage = e => {
        e.preventDefault();
        const data = {}
        data.text = this.state.message

        this.setState({messageList: [...this.state.messageList, data]})

        this.addMessageToChat(this.state.chatId, data.text)
    }
    */
    
    /*_sendMessage(text) {
        if (text.length > 0) {
            this.setState({
                messageList: [...this.state.messageList, {
                    author: 'me',
                    type: 'text',
                    data: { text }
                }]
            })
        }
    }*/

    onGoToChatById = chatId => {
        logic.getChatById(chatId)
            .then(chat => this.setState({messageList: this.parseToObjectMessages(chat.messages)}))
            .catch(({ message }) => Alert.error(message, { position: 'bottom-right', effect: 'slide', timeout: 3000 }))
    }

    render() {
        const { messageList, chats, productId } = this.state

        return(
            <div className="mychats-container">
                <div className="mychats-user-container">
                    <ul>
                        {chats && chats.map((chat, index) => {
                            return (
                                <li key={index}>
                                    <ChatCard 
                                        chatId={chat.id}
                                        cratedAt = {chat.created_at}
                                        title={chat.product.title}
                                        photo={chat.product.photos[0]}
                                        prodOwner={`${chat.product.price} €`}
                                        onGoToChat={this.onGoToChatById}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="mychats-chat-container">
                    <div className="mychats-messageList-container">
                        {//messageList && 
                             (<div>
                                <Launcher
                                  agentProfile={{
                                    teamName: 'BabyBoom-chat',
                                    //imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                                  }}
                                  onMessageWasSent={this._onMessageWasSent.bind(this)}
                                  messageList={messageList}
                                  showEmoji={false}
                                />
                              </div>)
                        }
                        {/*messageList && messageList.map((message, index) => {
                            return (
                                <div key={index}>{message.text}</div>
                            )
                        })*/}
                    </div>
                    {/*<form onSubmit={this.sendMessage}>
                        <input value={this.state.message} onChange={this.keepMessage} type="text" placeholder="Message"/>
                        <button type="submit" >Send</button>
                    </form>*/}
                </div>
                <div className="mychats-product-preview">
                    {/*productId && chats && chats[0] && chats[0].products && 
                        <SimplePreviewCard  
                            photo={chats[0].products.photos[0]}
                            price={chats[0].products.price}
                            title={chats[0].products.title}
                            idProd={productId}
                            description={chats[0].products.description}
                            getProductDetail={this.onProductDetail}          
                    />*/}
                </div>
            </div>
        )
    }
}

export default Mychats