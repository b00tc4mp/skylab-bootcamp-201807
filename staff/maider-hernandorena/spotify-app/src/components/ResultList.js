import React from 'react'


function ResultList(props) {
    return <ul>
        {props.results.map( ({id, text}) => <li key={id}><a href="#/" onClick={() => props.clickItem(id)}>{text}</a></li>)}
    </ul>
}


export default ResultList