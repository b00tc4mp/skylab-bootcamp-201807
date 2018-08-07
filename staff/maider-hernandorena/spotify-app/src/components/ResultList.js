import React from 'react'
import IfWrong from './IfWrong'
import './css/list.css'

function ResultList(props) {
    return  <section className="list">
                <ul className="list__items">
                    {props.results.map( ({id, text}) => <a className="list__items__link list__items__link-action" href="#/" onClick={() => props.clickItem(id)}><li className="list__items__link__each" key={id}>{text}</li></a>)}
                </ul>
                {props.error && <IfWrong message={props.error} />}
            </section>
}


export default ResultList