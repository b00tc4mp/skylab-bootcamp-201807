'use strict'

const root = document.getElementById('root')

// stateful, smart, container

class Calculator extends React.Component {
    // es6 pure

    // constructor() {
    //     super()

    //     this.state = {}

    //     this.updateA = this.updateA.bind(this)
    //     this.updateB = this.updateB.bind(this)
    // }

    // updateA(event) {
    //     const a = event.target.value

    //     this.setState({ a })
    // }

    // updateB(event) {
    //     const b = event.target.value

    //     this.setState({ b })
    // }

    // es.next (babel)

    state = {}

    updateA = function (event) {
        const a = event.target.value

        this.setState({ a })
    }.bind(this)

    updateB = event => {
        const b = event.target.value

        this.setState({ b })
    }

    onAdd = event => {
        event.preventDefault()

        const { a, b } = this.state

        const result = parseFloat(a) + parseFloat(b)

        this.setState({ result })
    }

    render() {
        return <main>
            <h1>calculator</h1>
            <form onSubmit={this.onAdd}>
                <input type="text" placeholder="operand A" onChange={this.updateA} />
                <input type="text" placeholder="operand B" onChange={this.updateB} />
                <button type="submit">Add</button>
            </form>
            {/* <h2>{this.state.result}</h2> */}
            <Result result={this.state.result} />
        </main>
    }
}

// stateless, dumb, presenter

function Result(props) {
    return <h2>{props.result}</h2>
}

ReactDOM.render(<div>
    <Calculator />
    <Calculator />
    <Calculator />
</div>, root)
