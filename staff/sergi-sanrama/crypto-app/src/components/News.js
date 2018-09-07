import React, { Component } from 'react'
import logic from '../logic/logic'
import ListNews from './ListNews'
import swal from 'sweetalert';
class News extends Component {
    state = {
        news: [],
        site: 'cointelegraph'
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
                .catch(({ message }) => swal(`Error`))
        }
    }

    render(){

        return <div>
         <div>News:</div>
            <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                Choose a website:
                <select value={this.state.site} onChange={this.handleChange}>
                    <option value="cointelegraph">Cointelegraph</option>
                    <option value="coindesk">Coindesk</option>
                </select>
                </label>
               
            </form>

         <ListNews news={this.state.news} />
         </div>
        </div>
    }
}


export default News