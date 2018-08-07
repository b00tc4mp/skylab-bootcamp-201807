import React from 'react'

import './List.css'

function List({ items, onClick }) {
    return (
        <ul className="list">
            {items.map(({ id, name }) => <li onClick={() => onClick(id)} className="list__item" key={id}><a href={`#${id}`} >{name}</a></li>)}
        </ul>
    )
}

export default List