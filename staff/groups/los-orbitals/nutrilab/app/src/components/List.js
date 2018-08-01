import React from 'react'

function List(props) {

    return <section>
             {props.ingredients.map(({name, photo}) => {
                return <ul>
                    <li><img src={photo} /><p key = {name}><a href="#/" onClick ={(event) => {event.preventDefault(); props.onItemClick(name)}}>{name}</a></p></li>
                </ul>
            })
            }
        </section>
}

export default List