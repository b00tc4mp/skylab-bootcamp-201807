import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import puntsverds from './deixalleries'
import { withRouter } from 'react-router-dom'
import Navbar from './NavBar.js'

import './styles/PuntVerd.css'

const AnyReactComponent = ({ icon }) => {
    return <img src={icon} alt='' style={{ width: '30px', height: '30px' }} />
}
class PuntVerd extends Component {
    static defaultProps = {
        center: {
            lat: 41.398478,
            lng: 2.199981
        },
        zoom: 15
    }


    render() {
        return (
            <div className="puntverd" >
                <h1 className='puntverd__title'>Green Spot</h1>
                <h4 className='puntverd__words'>Map of GreenSpots of Catalonia</h4>
                <div className='puntverd__map'>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyBUyonJznX8TMaJ0HbpikgKbm5j2g5G_mk' }}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                    >
                        {puntsverds.map(elem => {
                            return <AnyReactComponent
                                lat={elem.lat}
                                lng={elem.lng}
                                icon='./puntverd.png'
                                data={elem.info}
                            />
                        })}
                    </GoogleMapReact>
                </div>
                <Navbar />
            </div>

        )
    }
}

export default withRouter(PuntVerd)