import React from 'react'
//componento tonto porque no tiene estado interno, recive datos del padre i los pinta
function ResultList(props) { // props es id + text
        //le pasamos las cosas a trabes d un prop q se llamara results
        //pintemos los textos, haremos un componente de tipo funcion q pinte el listado de todo el array

        // { results: [...{id, text}...], onItemClick: () => { ... } }

        return <ul>
                {/* {props.results.map(result =>
                        <li key={result.id}><a href="#/" onClick={() => props.onItemClick(result.id)}>{result.text}</a></li>)} */}

                {
                        props.results.map(function({id, text}){
                                return <li key={id}><a href="#/" onClick={function() {
                                        props.onItemClick(id)
                                }}>{text}</a></li>
                        })
                }

        </ul>

}

export default ResultList





//Basico para poder trabajar: 
// import React from 'react'

// function ResultList(props){


// }

// export default ResultList