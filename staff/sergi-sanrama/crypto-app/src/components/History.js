import React, { Component } from 'react'
import { Table } from 'reactstrap'
import moment from 'moment'
import './styles/History.css'

const History = (props) => {

    // removeCoin = (coinId) => {
    //     const {email, token} = this.props
    //     logic.removeCoin(email, coinId, token)
    //         .then(() => {
    //             this.setState({
    //                 coinId: ''  
    //             })
    //             this.listCoins()
    //         })
    //         .catch(({ message }) => swal(message))
    // }

    // editCoin = (name, quantity, value, date, coinId) => {
    //     this.setState({
    //         name,
    //         quantity,
    //         value,
    //         date: moment(date).format('YYYY-MM-DD'),
    //         coinId 
    //     })
    // }

       return (
       <div className='container col-sm-6 history-table text-center'>
           <Table size="sm" hover dark responsive striped>
            <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
            {props.transactions.map(trans => {
                let negative = '', positive = ''
                if(Number(trans.quantity) < 0) {negative = 'negative' }
                if(Number(trans.quantity) > 0) {positive = 'positive' }
                return(  
                    <tr>
                        <td>{trans.name}</td>
                        <td className={`${negative} ${positive}`}>{trans.quantity}</td>
                        <td>{trans.value}</td>
                        <td>
                            {moment(trans.date).format('YYYY-MM-DD')} 
                            &nbsp;&nbsp;<a href='' onClick={(e) => {e.preventDefault();this.editCoin(trans.name, trans.quantity, trans.value, trans.date, trans.coinId)}}><img src='images/icons/icon_edit.png' alt="Edit-button" /></a>&nbsp;&nbsp;
                            <a href='' onClick={(e) =>  {e.preventDefault();this.removeCoin(trans.coinId)}} ><img src='images/icons/icon_remove.png' alt="Remove-button" /></a>
                        </td>
                    </tr>
                )
            })}
                </tbody>
            </Table>
        </div>
       )
}


export default History