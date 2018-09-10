import React, {Component} from 'react'
import Navbar from '../components/Navbar'
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class About extends Component {

    onLogout = e => {
        e.preventDefault()
        this.setState({ userId: '', token: '' })
        sessionStorage.clear()
      }

    render() {
        return (
            <div>
                <Navbar />
                <div className=''>
                <ListGroup flush>
                    <ListGroupItem>
                        <h4>About Gotcha</h4>
                        <p>Lore ipsum</p>
                    </ListGroupItem>
                </ListGroup>    
                </div>
            </div>
        )
    }
}
                