import React from 'react'

function List(props) {

    return <section>
                {props.ingredients.map(({name, photo}) => {
                    return <ul>
                                <li><a href="#/" onClick={(event) => {event.preventDefault(); props.onItemClick(name)}}>
                                        <img src={photo} />
                                    </a> 
                                    <p key={name}>
                                        <a href="#/" onClick={(event) => {event.preventDefault(); props.onItemClick(name)}}>{name}</a>
                                    </p>
                                </li>
                            </ul>
                })}
            </section>
}

export default List