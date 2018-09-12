import React, { Component } from 'react'
import GoogleMapsContainer from '../maps/GoogleMapsContainer'
import SimplePreviewCard from '../cards/SimplePreviewCard'
import UserTabCard from '../cards/UserTabCard'
import './PublicUser.css'
import { withRouter } from 'react-router-dom'
import Alert from 'react-s-alert';
import logic from '../../logic'

class PublicUser extends Component {
    state = {
        user: null,
        tabSelected: 0,
    }

    componentDidMount () {
        const { idUser } = this.props.match.params

        return Promise.resolve()
            .then(() => logic.getPublicUser(idUser))
            .then(user => this.setState({ user }) )
            .catch(({ message }) => Alert.error(message, { position: 'bottom-right', effect: 'slide', timeout: 3000 }) )
    }

    onSelectTab = tabSelected => this.setState({ tabSelected })


    render() {

        const { state: { user, tabSelected }, props: { onProductDetail } } = this

        return(
            <main>
            {user ?
                <div className="public-user-container">
                    <div className="public-user-map">
                        <GoogleMapsContainer lat={user.location[1]} lng={user.location[0]}/>
                    </div>
                    <UserTabCard 
                        userName={user.public_name}
                        userAvgScore={user.avg_score}
                        userPhoto={user.photo}
                        onSelectTab={this.onSelectTab}
                        />
                    {tabSelected < 2 && user.products.map((prod, index) => {
                        if ((tabSelected === 0 && prod.state === 'pending') || 
                            (tabSelected === 1 && prod.state === 'sold'))
                            return (<SimplePreviewCard 
                                key={index}
                                state={prod.state} 
                                photo={prod.photos[0]}
                                price={prod.price}
                                title={prod.title}
                                idProd={prod.id}
                                description={prod.description}  
                                getProductDetail={onProductDetail}          
                            /> )
                        return
                    })}
                    {tabSelected === 2 && 
                        <div>Reviews</div>
                    }
                </div> :

                <div className="publicUser-empty">
                    <h1>Something went wrong, we couldn't find this user</h1>
                </div>
            }
        </main>
        )
    }
}

export default  withRouter(PublicUser)