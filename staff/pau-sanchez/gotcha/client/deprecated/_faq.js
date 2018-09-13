import React, {Component} from 'react'
import Navbar from '../components/Navbar'
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class Faq extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className=''>
                    
                <ListGroup flush>
                    <ListGroupItem>
                        <h4>What is Gotcha?</h4>
                        <p>Lore ipsum</p>
                    </ListGroupItem>
                    <ListGroupItem>
                        <h4>What is a Notebook?</h4>
                        <p>Lore ipsum</p>
                    </ListGroupItem>
                    <ListGroupItem>
                        <h4>How can I create a Notebook?</h4>
                        <p>Lore ipsum</p>
                    </ListGroupItem>
                    <ListGroupItem>
                        <h4>What is a Note?</h4>
                        <p>Lore ipsum</p>
                    </ListGroupItem>
                    <ListGroupItem>
                        <h4>How can I create a Note?</h4>
                        <p>Lore ipsum</p>
                    </ListGroupItem>
                    <ListGroupItem>
                        <h4>How to delete a Notebook and a Note?</h4>
                        <p>Lore ipsum</p>
                    </ListGroupItem>
                    <ListGroupItem>
                        <h4>How can to update/modify a Notebook and a Note?</h4>
                        <p>Lore ipsum</p>
                    </ListGroupItem>
                    <ListGroupItem>
                        <h4>How can I share a Notebook and a Note?</h4>
                        <p>Lore ipsum</p>
                    </ListGroupItem>
                </ListGroup>
                 </div>
            </div>
        )
    }
}