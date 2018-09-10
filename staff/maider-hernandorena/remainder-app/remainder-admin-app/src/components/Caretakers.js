import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'

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

    removeCaretaker = dni => {
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
            <button className="caretakers__add" onClick={goToAddCaretaker}>Add Caretaker</button>
            <div className="caretakers__group">
                <h2 className="caretakers__group__title">Caretakers</h2>
                <div className="caretakers__group__all">
                    <ul className="caretakers__group__all__list">
                        {caretakers.map(caretaker => <li className="caretakers__group__all__list__item" key={caretaker.dni} onClick={() => caretakerData(caretaker.dni)}>
                            <a  href={`/#/caretaker/${caretaker.dni}`}><p><strong>{caretaker.name} {caretaker.surname}</strong>. {caretaker.dni}</p></a>
                            <button onClick={() => removeCaretaker(caretaker.dni)} href="">Delete Caretaker</button>
                        </li> )}
                    </ul>
                </div>
            </div>
        </main>
    }
}

export default withRouter(Caretakers)