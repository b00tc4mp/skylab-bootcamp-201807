import React, {Component} from 'react'
import { Media } from 'reactstrap'

class UserProfile extends Component{
    render(){
        return <Media>
        <Media left href="#">
          <Media object data-src="http://www.subinet.es/wp-content/uploads/2010/03/batman-for-facebook.jpg" alt="Generic placeholder image" />
        </Media>
        <Media body>
          <Media heading>
            Media heading
          </Media>
          Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
        </Media>
      </Media>
    }
}

export default UserProfile