import React from 'react'

function List(props) {

    return <section>
            <ul> {props.ingredients.map(({name}) => {
                return <li key = {name}>
                <a href="#/" onClick ={ () => {props.onItemClick(name)}}>{name}</a>
                </li>
            })
            }
             </ul>
        </section>
}

export default List