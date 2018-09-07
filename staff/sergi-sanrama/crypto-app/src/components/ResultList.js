import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import logic from '../logic/logic'

class ResultList extends Component {
    state = {
        coins: []
    }

    componentDidMount(){
        this.getList()
    }
    getList(){
        logic.getCoins()
            .then(coins => {
               return this.setState({ coins })
            })
            
    }


    render() {
        return <div>
            
            <div className='result-list-container'>
                <div className='result-list__title'></div>
                    {/* map */}
                    <div className='list-container'>
                        <div className='rank'></div>
                        <div className='name'></div>
                        <div className='symbol'></div>  
                        <div className='price_usd'></div>
                        <div className='price_btc'></div>
                        <div className='market-cap'></div>
                        <div className='total supply'></div>
                        <div className='percernt_change_1h'></div>
                        <div className='percernt_change_24h'></div>
                        <div className='percernt_change_7d'></div>
                    </div>
            
            </div>
        </div>
      }
}

export default ResultList