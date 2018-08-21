import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import logic from '../logic'

class Contacts extends Component{

    state = {
        contacts : [],
        name:"",
        surname:"",
        phone:"",
        contactmail:"",
        address:"",
        id:"",
        filterContact:""
    }


    componentDidMount(){
        this.listContacts()
        // const {usermail,token} = this.props
        // logic.listContact(usermail,token)
        //     .then((contact) => {
        //         this.setState({
        //             contact
        //         })
        //     })
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
                    name:"",
                    surname:"",
                    phone:"",
                    contactmail:"",
                    address:"",
                    id:""
                }))
                .then(() => this.listContacts())
        } else {
            logic.addContact(usermail,name,surname,phone,contactmail,address,token)
                .then(() => this.setState({
                    name:"",
                    surname:"",
                    phone:"",
                    contactmail:"",
                    address:"",
                    id:""
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
                    id:""
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

    handleLogout = (e) => {
        e.preventDefault()
        this.props.handleLogout(e)
    }

    render(){
        return <div class="container-contact">
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="navbar-start">
                <a href="/#/Notes" class="button is-primary">Notes</a>
                </div>
                <div class="navbar-end">
                    <a href="" onClick={this.handleLogout} class="button is-dark">Logout</a>
                </div>
            </nav>
            <div class="container-menu">
                <div class="container-search">
                    <h1 class="is-size-2">Search contacts</h1>
                    <input type="text" class="input" name="filterContact" placeholder="Filter contact" value={this.state.filterContact} onChange={this.handleChange}/>
                </div>
                <div class="container-add">
                <h1 class="is-size-2">Add Contact</h1>
                    <form onSubmit={this.handleSubmit}>
                        <input class="input" type="text" name="name" placeholder="name" value={this.state.name} onChange={this.handleChange}/>
                        <input class="input" type="text" name="surname" placeholder="surname" value={this.state.surname} onChange={this.handleChange}/>
                        <input class="input" type="tel" name="phone" placeholder="phone" value={this.state.phone} onChange={this.handleChange}/>
                        <input class="input" type="email" name="contactmail" placeholder="contactmail" value={this.state.contactmail} onChange={this.handleChange}/>
                        <input class="input" type="text" name="address" placeholder="address" value={this.state.address} onChange={this.handleChange}/>
                        <button type="submit" class="button is-light">SUBMIT</button>
                    </form>
                </div>
            </div>
            <div class="container-list">
            <h1 class="is-size-2">Contacts</h1>
            <ul>
                {
                    this.state.contacts.map(contact => {
                        // if(contact.name[0].toLowerCase().includes(this.state.filterContact.toLowerCase())){
                            if(contact.name[0].toLowerCase().includes(this.state.filterContact.toLowerCase())){
                            
                            return <li key={contact.id}> {
                                `name:${contact.name},
                                surname:${contact.surname},
                                phone:${contact.phone},
                                contactmail:${contact.contactmail},
                                address:${contact.address}`} 
                                <a href="" class="icon has-text-danger" onClick={(e) =>  {
                                e.preventDefault();this.deleteContact(contact.id)}} >X
                                </a> <a href="" onClick={
                                (e) => this.editContact(e,contact)}>EDIT ME 
                                </a> </li>
                            }else if(!this.state.filterContact){
                            return <li key={contact.id}> {
                                `name:${contact.name},
                                surname:${contact.surname},
                                phone:${contact.phone},
                                contactmail:${contact.contactmail},
                                address:${contact.address}`} 
                                <a href=""  class="icon has-text-danger" onClick={(e) =>  {
                                e.preventDefault();this.deleteContact(contact.id)}} >X
                                </a> <a href="" onClick={
                                (e) => this.editContact(e,contact)}>EDIT ME 
                                </a> </li>
                        }
                    }
                )}
            </ul>
            </div>
        </div>
    }

}

export default withRouter(Contacts)

