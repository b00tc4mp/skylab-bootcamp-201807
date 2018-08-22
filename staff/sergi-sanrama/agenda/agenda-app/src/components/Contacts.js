import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import logic from '../logic'
import '../styles/contacts.css'


class Contacts extends Component{

    state = {
        contacts : [],
        name:'',
        surname:'',
        phone:'',
        contactmail:'',
        address:'',
        id:''
    }


    componentDidMount(){
        this.listContacts()
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {usermail,token} = this.props
        const {name,surname,phone,contactmail,address,id} = this.state
        if(id){
            logic.updateContact(usermail,id,name,surname,phone,contactmail,address,token)
                .then(() => this.setState({
                    name:'',
                    surname:'',
                    phone:'',
                    contactmail:'',
                    address:'',
                    id:''
                }))
                .then(() => this.listContacts())
        } else {
            logic.addContact(usermail,name,surname,phone,contactmail,address,token)
                .then(() => this.setState({
                    name:'',
                    surname:'',
                    phone:'',
                    contactmail:'',
                    address:'',
                    id:''
                }))
                .then(() => this.listContacts())
        }
        
    }

    listContacts = () => {
        const {usermail,token} = this.props
        logic.listContact(usermail,token)
            .then(({contacts}) => {
                this.setState({
                    contacts
                })
            })
    }

    deleteContact = (id) => {
        const {usermail,token} = this.props
        logic.deleteContact(usermail,id,token)
            .then(() => {
                this.setState({
                    id:''
                })
                this.listContacts()
            })
    }

    editContact = (e,contact) => {
        e.preventDefault()
        const {name,surname,phone,contactmail,address,id} = contact
        this.setState({
            name,
            surname,
            phone,
            contactmail,
            address,
            id
        })
    }

    onGoToNotes = event => {
        event.preventDefault()

        this.props.onGoToNotes()
    }



    render(){
        return <div>
            <h1>CONTACTS</h1>
            <header>ADD A NEW CONTACT</header>
            <form id='form' onSubmit={this.handleSubmit}>
                <input type='text' name='name' placeholder='Name' value={this.state.name} onChange={this.handleChange}/>
                <input type='text' name='surname' placeholder='Surname' value={this.state.surname} onChange={this.handleChange}/>
                <input type='tel' name='phone' placeholder='Phone' value={this.state.phone} onChange={this.handleChange}/>
                <input type='email' name='contactmail' placeholder='Email' value={this.state.contactmail} onChange={this.handleChange}/>
                <input type='text' name='address' placeholder='Address' value={this.state.address} onChange={this.handleChange}/>
                <button id='submit' type='submit'>SUBMIT</button>
                
            </form>
            <ul id='list'>
                {this.state.contacts.map(contact => <li key={contact.id}> {`name: ${contact.name} / surname: ${contact.surname} / phone: ${contact.phone} / contactmail: ${contact.contactmail} / address: ${contact.address}`} <button type='button' onClick={(e) =>  {e.preventDefault();this.deleteContact(contact.id)}} >X</button> <button type='button' onClick={(e) => this.editContact(e,contact)}>EDIT</button> </li>)}
            </ul>
            <div className='buttonDown'>
                <button className='block' type='submit' href='' onClick={this.onGoToNotes}> Notes, please.</button>
            </div>        
        </div>
    }
}

export default withRouter(Contacts)

