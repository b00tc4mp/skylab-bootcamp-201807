import React, {Component} from 'react'
import { withRouter, Link } from 'react-router-dom'
import {logic} from '../logic'
import Navbar from '../components/Navbar'
import {FormGroup, Input, Button, Label, Col, Row, ListGroup, ListGroupItem} from 'reactstrap'

class Notebooks extends Component {
    
    state = {
        notebooks: [],
        edit: '',
        newnotebooktitle: ''
    }
        
    componentDidMount() {
        this.getNotebooks()
    }

    getNotebooks = () => {
        const sessionuserid = sessionStorage.getItem('userId')
        const token = sessionStorage.getItem('token')
        logic.listNotebooks(sessionuserid, token)
        .then(res => {
            this.setState({notebooks:res})
        })
    }

    deleteNotebooks = (e, _id, user) => {
        e.preventDefault()
        const sessionuserid = sessionStorage.getItem('userId')
        const token = sessionStorage.getItem('token')
        return Promise.resolve()
            .then(()=> logic.removeNotebooksNotes(user, sessionuserid, _id, token) )
            .then(() => logic.removeNotebook(user, sessionuserid, _id, token))
            .then(()=> this.getNotebooks())
            
    }
    updateNotebookTitle = (_id, userId) => {
        const sessionuserid = sessionStorage.getItem('userId')
        const token = sessionStorage.getItem('token')
        const {newnotebooktitle} = this.state
        return Promise.resolve()
            .then( () => {
                logic.updateNotebook(userId, sessionuserid, _id, newnotebooktitle, token)
            })
            .then(() => this.setState({ edit: ''}))
            .then(() => this.setState({ newnotebooktitle: ''}))
            .then(()=> this.getNotebooks())
    }

    changeTitle = e => this.setState({ newnotebooktitle: e.target.value })
            

            


  

   

    
 



    render() {
        const {notebooks} = this.state
        return (
            <div>
                <Navbar />
                
                {notebooks.map(({ notebooktitle, user, videothumbnail, videotitle, _id }) => {

                    return  <div>

                            <ListGroup>
                                <ListGroupItem>
                                <Row>
                                <Col sm={1}></Col>    
                                <Col sm={3}>
                                    <div>
                                        <img src={videothumbnail} height='150' width='200' alt='thumbnail'/>
                                    </div>
                                </Col>
                                <Col sm={1}></Col> 
                                <Col sm={5}>
                                    
                                    <FormGroup row>
                                        <Label sm={2}>Video</Label>
                                        <Col sm={8}>
                                        <Input type="textarea" value={videotitle} disabled/>
                                        </Col>
                                    </FormGroup>
                                    {
                                        (this.state.edit === _id)
                                        ? <div>
                                            <FormGroup row>
                                                <Label sm={2}>Notebook</Label>
                                                <Col sm={8}>
                                                    <Input type="text" name="notebooktitle" defaultValue={notebooktitle} onChange={this.changeTitle} required/>
                                                </Col>
                                            </FormGroup>

                                        </div>
                                        :<div>
                                            <FormGroup row>
                                                <Label sm={2}>Notebook</Label>
                                                <Col sm={8}>
                                                    <Input type="text" name="notebooktitle" defaultValue={notebooktitle} disabled/>
                                                </Col>
                                            </FormGroup>
                                        </div>
                                    }
                                    
                                    <div className='optionnotebooks'>
                                    {
                                        (this.state.edit === _id && this.state.newnotebooktitle !== '')
                                        ? <Button className='mr-1' onClick={() => this.updateNotebookTitle(_id, user)}>Save Changes&#128394;</Button> 
                                        : <Button className='mr-1' onClick={() => this.setState({ edit: _id})}>EDIT TITLE &#128394;</Button>
                                    }    
                                    <Link to={`/player/${_id}/${user}`}>
                                            <Button className='mr-1' type='button'>&#9654;</Button>
                                        </Link>
                                        <Button className='mr-1' onClick={ e => this.deleteNotebooks(e, _id, user)}>DELETE &#10799;</Button>
                                    </div>
                                
                                </Col>
                                
                                </Row> 
                                </ListGroupItem>
                            </ListGroup>
                        </div> 
                                
                })}

            </div>
)}}

export default withRouter(Notebooks)

