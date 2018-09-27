import React, { Component } from 'react'
import logic from '../logic'
import '../styles/css/cites.css'

class Cites extends Component {

    state = { 
        cites: [],
        date: new Date(),
        error: '',
    }

    componentWillMount() {
        this.listCites()
    }

    onSubmit = e => {
        e.preventDefault()
        this.listCites()
    }

    keepDay = e => this.setState({ date: e.target.value, error: '' })

    listCites = () => {
        const { date } = this.state
        const day = new Date(date)

        logic.listCites(day)
            .then(cites => this.setState({ cites, error: '' }))
            .then(() => this.state.cites)
    }

    render() {
        const { state: { date, cites }, keepDay, onSubmit } = this

        return <main className="cites">
                    <form className="cites__form" onSubmit={onSubmit}>
                        <input className="cites__form__input" type="date" value={date} onChange={keepDay} />
                        <button className="cites__form__button" type="submit">Choose Day</button>
                    </form>
                    <div className="cites__all">
                        <h2 className="cites__all__title">Cites</h2>
                        <ul className="cites__all__list">
                            {cites.map(cite => <li className="cites__all__list__item" key={cite.date}>
                                <p>{cite.name}, {new Date(cite.date).toLocaleString()}</p>
                            </li> )}
                        </ul>
                    </div>
                </main>
    }
}

export default Cites