import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import '../styles/css/caretakers.css'

class Caretakers extends Component {

    state = { 
        caretakers: [],
        error: '',
        dni: '',
        password: '',
        name: '',
        surname: '',
        age: '',
        gender: '',
        phone: ''
    }

    componentDidMount() {
        this.listCaretakers()

        this.unlisten = this.props.history.listen(() => this.listCaretakers())
    }

    componentWillUnmount() {
        this.unlisten()
    }

    listCaretakers = () => {
        logic.listCaretakers()
            .then(caretakers => this.setState({ caretakers, error: '' }))
            .catch(({ message }) => this.setState({ error: message }))
    }

    removeCaretaker = (e, dni) => {
        e.preventDefault()
        const { id, token } = this.props
        dni = parseInt(dni)
        
        logic.removeCaretaker(dni, id, token)
            .then(() => true)
            .then(() => this.listCaretakers())
    }

    goToAddCaretaker = e => {
        e.preventDefault()
        this.props.goToAddCaretaker()
    }

    caretakerData = dni => {
        this.props.caretakerData(dni)
    }

    render() {
        const { state: { caretakers }, removeCaretaker, goToAddCaretaker, caretakerData } = this

        return <main className="caretakers">
            <div className="caretakers__group">
                <div className="caretakers__group__add">
                    <button className="caretakers__group__add__button" onClick={goToAddCaretaker}>Add Caretaker</button>
                </div>
                <h2 className="caretakers__group__title">Caretakers</h2>
                <div className="caretakers__group__all">
                    <ul className="caretakers__group__all__list">
                        {caretakers.map(caretaker => <li className="caretakers__group__all__list__item" key={caretaker.dni} onClick={() => caretakerData(caretaker.dni)}>
                            <a className="patients__group__all__list__item__link" href={`/#/caretaker/${caretaker.dni}`}><p className="patients__group__all__list__item__link__text"><strong>{caretaker.name} {caretaker.surname}</strong>. {caretaker.dni}</p></a>
                            <a className="caretakers__group__all__list__item__delete" href=""  onClick={(e) => removeCaretaker(e, caretaker.dni)}>Delete Caretaker</a>
                        </li> )}
                    </ul>
                </div>
            </div>
        </main>
    }
}

export default withRouter(Caretakers)