import React from 'react'
import { Table } from 'reactstrap'
import logic from '../logic/logic'
import moment from 'moment'
import swal from 'sweetalert'
import './styles/History.css'

const History = props => {
    
    const removeCoin = coinId => {
        const email = sessionStorage.getItem('email')
        const token = sessionStorage.getItem('token')

        logic.removeCoin(email, coinId, token)
            .then(() => {
                props.listCoins()
            })
            .catch(({ message }) => swal(message))
    }

    const editCoin = (name, quantity, value, date, coinId) => {
        props.editCoin(name, quantity, value, date, coinId)
    }

        return (
            <div className='container history-table text-center'>
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
                                    &nbsp;&nbsp;<a href='' onClick={(e) => {e.preventDefault(); editCoin(trans.name, trans.quantity, trans.value, trans.date, trans.coinId)}}><img src='images/icons/icon_edit2.png' alt="Edit-button" /></a>&nbsp;&nbsp;
                                    <a href='' onClick={(e) =>  {e.preventDefault(); removeCoin(trans.coinId)}} ><img src='images/icons/icon_delete2.png' alt="Remove-button" /></a>
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