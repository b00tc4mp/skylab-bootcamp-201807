import React from 'react'
import '../sass/list.css'

function List(props) {

    return <section>
                {props.ingredients.map(({name, photo}) => {
                    return  <div className="list">
                                <div className="list__warp">
                                        <a className="list__warp__item" href="#/" onClick={(event) => {event.preventDefault(); props.onItemClick(name)}}>
                                            <img src={photo} className="list__warp__item__img" />
                                        </a> 
                                        <p className="list__warp__text" key={name}>
                                            <a className="list__warp__text__link" href="#/" onClick={(event) => {event.preventDefault(); props.onItemClick(name)}}>{name}</a>
                                        </p>
                                </div>
                            </div>
                })}
            </section>
}

export default List


