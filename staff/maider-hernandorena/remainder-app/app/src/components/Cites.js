import React, { Component } from 'react'
import logic from '../logic'

class Cites extends Component {

    state = { 
        cites: [],
        date: '',
        error: '',
    }

    componentWillMount() {
        this.listCites()
    }

    keepDay = e => this.setState({ date: e.target.value, error: '' })

    listCites = () => {
        const { date } = this.state

        const day = new Date(date)

        logic.listCites(day)
            .then(cites => {
                this.setState({ cites, error: '' })
            })
            .then(() => this.state.cites)
    }

    render() {
        const { state: { cites }, keepDay, listCites } = this

        return <main>
            <div>
                <form onSubmit={listCites}>
                    <input type="date" onChange={keepDay} />
                    <button type="submit">Choose Day</button>
                </form>
                <div>
                    <p>Name || Date</p>
                </div>
                <div>
                    <ul>
                        {cites.map(cite => <li key={cite.name}>
                            <p>{cite.name}, {cite.date}</p>
                        </li> )}
                    </ul>
                </div>
            </div>
        </main>
    }
}

export default Cites