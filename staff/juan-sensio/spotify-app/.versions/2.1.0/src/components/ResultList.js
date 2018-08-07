import React from 'react';

function ResultList({items, onClick}) {
    return (
        <ul>
            {items.map(({id, name}) => <li key={id}><a href={`#${id}`} onClick={() => onClick(id)}>{name}</a></li>)}
        </ul>
    )
}

export default ResultList