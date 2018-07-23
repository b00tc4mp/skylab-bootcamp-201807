import React from 'react'

function ResultList(props){
    return <ul>
                {props.results.map(result => <li key={result.id}><a href="#" onClick={() => console.log(result.id, result.text)}>{result.text} </a></li>)}
            </ul>
}

export default ResultList

// onClick={() => console.log('Hau')}

// return <ul>
// {props.results.map( result => <li key={result.id}><a href="#/" onClick={() => console.log(result.id, result.text)}>{result.text}</a></li> )}
// </ul>