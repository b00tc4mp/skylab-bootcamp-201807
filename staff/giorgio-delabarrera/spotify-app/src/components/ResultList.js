import React from 'react'

function ResultList(props) { // { results: [...{id, text}...], onItemClick: () => { ... } }
    return <ul>
        {/* {
            props.results.map(function (result) {
                return <li key={result.id}><a href="#/" onClick={function() { props.onItemClick(result.id)}}>{result.text}</a></li>
            })
        } */}

        {/* {props.results.map(result => <li key={result.id}><a href="#/" onClick={() => props.onItemClick(result.id)}>{result.text}</a></li>)} */}

        {
            props.results.map(function ({ id, text }) {
                return <li key={id}><a href="#/" onClick={function() { props.onItemClick(id)}}>{text}</a></li>
            })
        }

        {/* {props.results.map(({ id, text }) => <li key={id}><a href="#/" onClick={() => props.onItemClick(id)}>{text}</a></li>)} */}
    </ul>
}

export default ResultList