import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import logic from '../logic'
import './contacts.css'


class Contacts extends Component{

    state = {
        contacts : [],
        name:"",
        surname:"",
        phone:"",
        contactmail:"",
        address:"",
        id:"",
        filterCharacter: ""
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

    handleFilter = ( char) => {
        //e.preventDefault()
        this.setState({
            filterCharacter : char
        })
    }

    render(){
         
    return  <div>
                <div className="headernav">
                    <ul>
                        <li><a href="/#/notes">Go to Notes</a></li>
                   </ul>
                </div>
                <div className="paper">   
                        <div className="sidebarleft">
                            <nav >
                                <button className="tabbutton" onClick={() => this.handleFilter("a")}>A</button>
                                <button className="tabbutton" onClick={() => this.handleFilter("b")}>B</button>
                                <button className="tabbutton" onClick={() => this.handleFilter("c")}>C</button>
                                <button className="tabbutton" onClick={() => this.handleFilter("d")}>D</button>
                                <button className="tabbutton" onClick={() => this.handleFilter("e")}>E</button>
                                <button className="tabbutton" onClick={() => this.handleFilter("f")}>F</button>
                                <button className="tabbutton" onClick={() => this.handleFilter("g")}>G</button>
                                <button className="tabbutton" onClick={() => this.handleFilter("h")}>H</button>
                                <button className="tabbutton" onClick={() => this.handleFilter("i")}>I</button>
                                <button className="tabbutton" onClick={() => this.handleFilter("j")}>J</button>
                                <button className="tabbutton" onClick={() => this.handleFilter("k")}>K</button>
                                <button className="tabbutton" onClick={() => this.handleFilter("l")}>L</button>
                                <button className="tabbutton" onClick={() => this.handleFilter("m")}>M</button>
                                <button className="tabbutton" onClick={() => this.handleFilter("n")}>N</button>
                                <button className="tabbutton" onClick={() => this.handleFilter("o")}>O</button>
                                <button className="tabbutton" onClick={() => this.handleFilter("p")}>P</button>
                                <button className="tabbutton" onClick={() => this.handleFilter("q")}>Q</button>
                                <button className="tabbutton" onClick={() => this.handleFilter("r")}>R</button>
                                <button className="tabbutton" onClick={() => this.handleFilter("s")}>S</button>
                                <button className="tabbutton" onClick={() => this.handleFilter("t")}>T</button>
                                <button className="tabbutton" onClick={() => this.handleFilter("u")}>U</button>
                                <button className="tabbutton" onClick={() => this.handleFilter("v")}>V</button>
                                <button className="tabbutton" onClick={() => this.handleFilter("w")}>W</button>
                                <button className="tabbutton" onClick={() => this.handleFilter("x")}>X</button>
                                <button className="tabbutton" onClick={() => this.handleFilter("y")}>Y</button>
                                <button className="tabbutton" onClick={() => this.handleFilter("z")}>Z</button>
                            </nav>
                        </div>
                    
                        <div className="content">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Surname</th>
                                        <th>Phone</th>
                                        <th>Contact Email</th>
                                        <th>Address</th>
                                        <th>Operations</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {this.state.contacts.map(contact => {
                                    if ((contact.name).indexOf(this.state.filterCharacter) === 0 || (contact.name).indexOf((this.state.filterCharacter).toUpperCase()) === 0)
                                    {return <tr key={contact.id}>
                                                    <td>{contact.name}</td>
                                                    <td>{contact.surname}</td>
                                                    <td>{contact.phone}</td>
                                                    <td>{contact.contactmail}</td>
                                                    <td>{contact.address}</td>
                                                    <td>
                                                        <a href="" onClick={(e) =>  {e.preventDefault();this.deleteContact(contact.id)}} >	&#10006;</a>
                                                        &nbsp;
                                                        <a href="" onClick={(e) => this.editContact(e, contact)}>&#128394;</a> 
                                                    </td>
                                            </tr>}
                                            })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="sidebarright">
                            <form onSubmit={this.handleSubmit}>
                                <input type="text" name="name" placeholder="name" value={this.state.name} onChange={this.handleChange}/><br/>
                                <input type="text" name="surname" placeholder="surname" value={this.state.surname} onChange={this.handleChange}/><br/>
                                <input type="tel" name="phone" placeholder="phone" value={this.state.phone} onChange={this.handleChange}/><br/>
                                <input type="email" name="contactmail" placeholder="contactmail" value={this.state.contactmail} onChange={this.handleChange}/><br/>
                                <input type="text" name="address" placeholder="address" value={this.state.address} onChange={this.handleChange}/><br/>
                                <button type="submit">SUBMIT</button>
                            </form>
                        </div>
                </div>
           </div>
            
    }

}

export default withRouter(Contacts)

