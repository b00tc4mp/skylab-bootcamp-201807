import React from 'react'



function ResultList(props){
    return <ul>
        {/* {props.results.map(result => <li key={result.id}><a href="#/" onClick={() => {props.onItemClick(result.id)}}>{result.text}</a></li>)} */}
        {/* {props.results.map(({id,text}) => <li key={id}><a href="#/" onClick={() => {props.onItemClick(id)}}>{text}</a></li>)} */}
        {props.results.map(result => <li key={result.id}><a href="#/" onClick={() => {props.onItemClick(result.id)}}>{result.text}</a></li>)}
    </ul>
}

export default ResultList