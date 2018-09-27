require('dotenv').config()


require('isomorphic-fetch')
const { expect } = require('chai')
const logic = require('./logic')
// const jwt = require('jsonwebtoken')


describe('index', () => {

    true && describe('calculateTotalPortfolioCost', () =>{
        const transactions = [
            {
                name: 'BTC',
                value: 20,
                quantity: 5
            },
            {
                name: 'ETH',
                value: 5,
                quantity: 2
            },
            {
                name: 'BTC',
                value: 15,
                quantity: 2
            },
            {
                name: 'ETH',
                value: 7,
                quantity: 5
            },
            {
                name: 'XRP',
                value: 20,
                quantity: 2
            }
        ];

        it(' calculate correctly total cost portfolio', () => 
            logic.calculatePortfolioInvestment(transactions)
                .then(result => {
                    
                    expect(result).to.exist
                })
    )})

    

    

})


