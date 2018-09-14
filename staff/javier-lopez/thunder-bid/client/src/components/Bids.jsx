import React, { Component } from "react"
import { Link } from 'react-router-dom'

class Bid extends Component {
    render() {
        return <div className="col-3 mt-3">
            <div className="card">
                {this.props.product.closed ? <p className="card-text" style={{ textAlign: 'center', margin: '10px', padding: '5px', borderRadius: '2px', color: 'white', backgroundColor: '#ECECEC' }}>Product closed</p> : <p style={{ textAlign: 'center', margin: '10px', padding: '5px', borderRadius: '2px', color: 'white', backgroundColor: '#66BB6A' }}>{this.props.product.finalDate.slice(0, 10)} at {this.props.product.finalDate.slice(11, 19)}H</p>}
                <div className='card-img-top mt-4' style={{ backgroundImage: `url(${this.props.product.image})`, height: '100px', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}></div>
                <div className="card-body">
                    <h5 className="card-title text-center">{this.props.product.title}</h5>
                    {this.props.product && this.props.product.bids[this.props.product.bids.map(e => e.user).lastIndexOf(this.props.idUser)] === this.props.product.bids[this.props.product.bids.length-1] ?
                     this.props.product.closed ? <div>Won</div> : <div>Wining</div>
                    :<div>Losing</div>}
                    <p className="badge badge-pill badge-light" style={{ border: '1px solid #999', padding: '10px', padding: '10px 11px', lineHeight: '18px', borderRadius: '7px'}}> Your bid: <span className="badge badge-light" style={{padding: '6px', lineHeight: '10px', fontSize: '13px', marginLeft: '5px'}}>{this.props.product && this.props.product.bids[this.props.product.bids.map(e => e.user).lastIndexOf(this.props.idUser)].price} €</span></p>                   
                    <br />
                    <div className='row'>
                        <div className='col-3'>
                            <Link to={`/product/${this.props.product._id}`}><button className="btn btn-info">See more</button></Link>
                        </div>                   
                    </div>
                </div>
            </div>
            <br />
        </div>
    }
}

export default Bid