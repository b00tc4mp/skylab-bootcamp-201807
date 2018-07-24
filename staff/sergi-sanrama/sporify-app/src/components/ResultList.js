import React from 'react'

function ResultList(props){
    return <ul>
                 {
            props.results.map(function ({ id, text }) {
                return <li key={id}><a href="#/" onClick={function() { props.onItemClick(id)}}>{text}</a></li>
            }) // Destructuring, nos quedamos solo con el ID del array que nos llega, luego ya lo utilizamos
        }
            </ul>
}//Aqui le pasamos el array, y lo convertimos en otro array, con solo dos datos, id y textos

export default ResultList

// onClick={() => console.log('Hau')}

// return <ul>
// {props.results.map( result => <li key={result.id}><a href="#/" onClick={() => console.log(result.id, result.text)}>{result.text}</a></li> )}
// </ul>

