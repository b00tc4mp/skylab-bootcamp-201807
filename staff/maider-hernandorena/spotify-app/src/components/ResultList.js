import React from 'react'
import IfWrong from './IfWrong'
import './css/list.css'

function ResultList(props) {
    return  <section className="list">
                <ul className="list__items">
                    {props.results.map( ({id, text}) => <li className="list__items__each" key={id}><a className="list__items__each__link" href="#/" onClick={() => props.clickItem(id)}>{text}</a></li>)}
                </ul>
                {props.error && <IfWrong message={props.error} />}
            </section>
}


export default ResultList