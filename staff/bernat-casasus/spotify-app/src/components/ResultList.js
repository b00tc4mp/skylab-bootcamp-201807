import React from 'react'

function ResultList(props){
    return <ul>
        {props.results.map(result => <li key={result.id}>{result.text}</li>)}
    </ul>
}

export default ResultList