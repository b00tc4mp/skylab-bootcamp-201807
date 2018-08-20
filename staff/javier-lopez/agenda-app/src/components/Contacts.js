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
        id:""
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



    render(){
        return <div>
            <h1>CONTACTS</h1>
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="name" placeholder="name" value={this.state.name} onChange={this.handleChange}/>
                <input type="text" name="surname" placeholder="surname" value={this.state.surname} onChange={this.handleChange}/>
                <input type="tel" name="phone" placeholder="phone" value={this.state.phone} onChange={this.handleChange}/>
                <input type="email" name="contactmail" placeholder="contactmail" value={this.state.contactmail} onChange={this.handleChange}/>
                <input type="text" name="address" placeholder="address" value={this.state.address} onChange={this.handleChange}/>
                <button type="submit">SUBMIT</button>
            </form>
            <ul>
                {this.state.contacts.map(contact => <li key={contact.id}> {`name:${contact.name},surname:${contact.surname},phone:${contact.phone},contactmail:${contact.contactmail},address:${contact.address}`} <a href="" onClick={(e) =>  {e.preventDefault();this.deleteContact(contact.id)}} >X</a> <a href="" onClick={(e) => this.editContact(e,contact)}>EDIT ME </a> </li>)}
            </ul>
        </div>
    }

}

export default withRouter(Contacts)

