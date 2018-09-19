import React, { Component } from 'react'
import logic from '../logic/logic'
import ListNews from './ListNews'
import swal from 'sweetalert';
import './styles/News.css'
import Footer from '../components/Footer'
import { Form, FormGroup, Label, Input } from 'reactstrap';


class News extends Component {
    state = {
        news: [],
        site: 'coindesk'
    }

    componentDidMount(){
        this.getCryptoNewsWithSite()
        this.interval = setInterval(() => this.getCryptoNewsWithSite(), 120 * 1000);
    }

    handleChange = (e) => {
        const { value } = e.target
        this.setState({
            site: value
        }, () => {
           this.getCryptoNewsWithSite() 
        })
    }

    getCryptoNewsWithSite = () => {
        let { site } = this.state

        site = site.trim()

        if(site.length) {
            logic.getCryptoNews(site)
                .then(news => {
                    this.setState({
                        news
                    })
                })
                .catch(({ message }) => swal(`Error: ${message}`))
        }
    }

    render(){

        return <div className='container_news'>
         
            <div>   
             <Form onSubmit={this.handleSubmit}>
                <FormGroup row>
                <Label for="select"></Label>
                    <Input className="select__news mr-sm-2 dropdown-dark" value={this.state.site} onChange={this.handleChange} type="select" name="select" >
                        <option value="bitcoin.com">Bitcoin.com</option> 
                        <option value="bitcoinmagazine">Bitcoin Magazine</option> 
                        <option value="blokt">Blokt</option> 
                        <option value="ccn">CCN</option> 
                        <option value="coindesk">CoinDesk</option>
                        <option value="coinjoker">CoinJoker</option> 
                        <option value="cointelegraph">CoinTelegraph</option> 
                        <option value="coinnounce">Coinnounce</option> 
                        <option value="cryptoglobe">CryptoGlobe</option> 
                        <option value="cryptoinsider">CryptoInsider</option> 
                        <option value="cryptopotato">Crypto Potato</option> 
                        <option value="cryptonewsreview">CryptoNewsReview</option> 
                        <option value="ethnews.com">ETHNews</option> 
                        <option value="financemagnates">Finance Magnates</option> 
                        <option value="newsbtc">NewsBTC</option> 
                        <option value="trustnodes">TrustNodes</option> 
                    </Input>
                </FormGroup>
             </Form>

            <ListNews news={this.state.news} />
            <Footer />
         </div>
        </div>
    }
}


export default News