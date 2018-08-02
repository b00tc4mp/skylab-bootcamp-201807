import React from 'react'
import Feedback from './Feedback'

function ResultList(props) { // { results: [...{id, text}...], onItemClick: () => { ... } }
    return <section>
        <ul>
            {props.results.map(({ id, text }) => <li key={id}><a href="" onClick={
                event => {
                    event.preventDefault()

                    props.onItemClick(id)
                }
            }>{text}</a></li>)}
        </ul>

        {props.error && <Feedback message={props.error} />}
    </section>
}

export default ResultList