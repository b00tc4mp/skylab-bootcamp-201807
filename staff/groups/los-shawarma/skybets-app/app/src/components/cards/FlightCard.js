import React, {Component} from 'react'


class FlightCard extends Component {

    render() {

        return(
            <section>
               <div>
                    <span>Date</span><span></span>
                    <span>Time</span><span></span>
                    <span>IATA</span><span></span>

                </div>
                <div>
                    <span>Date</span><span></span>
                    <span>Time</span><span></span>
                    <span>IATA</span><span></span>
                    
                </div>
                <div>
                    <span>Price</span><span>{this.props.flightsProp.price}</span>
                    <span>Link</span><span>{this.props.flightsProp.link}</span>
                </div>
            </section>
        )
    }

}

export default FlightCard