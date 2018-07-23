import React, { Component } from 'react' // importamosreact. Compponent es una clase que es propiedad d React


class SearchPanel extends Component {    //la clase de searchpanel extiende de component. Tenemos que exportar a searchpanel
    // hay que tener claro el template, SIEMPRE habra un render() con un return en un class

    state = { query: '' } //ponemos una vacia para q n de error si no hay nada puesto en el search panel i le damos al search

    keepQuery = event => {  //arrow para no poner el bind(this). Esto es una funcion que hace bind a la instancia q se crea con este constructor.
        var query = event.target.value  // valor del input en react. predefinido
        this.setState({ query })  /**javascript 6. es diu destructiring segons lalex/ en 5 seria query: query*/
    }

    onSearch = event => {  //cuando damos enter y se dispara la busqueda a traves del formulario
        event.preventDefault() //*queremos q sea con js*/}
        this.props.onSearch(this.state.query) // el metodo que le pasan por props. Hemos puesto esto con props para hacerlo generico. En app.js esta el metodo onSearch que se acaba llamando al final 
    } //cuando se hace onSearch hay que disparar esa logica de busqueda


    render() {
        return <form onSubmit={this.onSearch}> {/*esto es del propio formulario, on submit = con enter*/}
            <input type="text" onChange={this.keepQuery} /> {/**cada vez que hay un camibo en el input se llama al keepQuery*/}
            <button type="submit">Search</button>
        </form>

    }

}

export default SearchPanel

