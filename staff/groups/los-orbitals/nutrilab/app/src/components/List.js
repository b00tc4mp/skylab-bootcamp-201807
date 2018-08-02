import React from 'react'
import Feedback from './Feedback'
import '../sass/list.css'

function List(props) {

    return <section>
                {props.feedback && <Feedback message={props.feedback}/>}
                {props.ingredients.map(({name, photo}) => {
                    return  <div className="list">
                                <div className="list__warp">
                                    <div className="list__item">
                                        <a href="#/" onClick={(event) => {event.preventDefault(); props.onItemClick(name)}}>
                                            <img src={photo} className="list__img" />
                                        </a> 
                                    </div>
                                    <div>
                                        <p key={name}>
                                            <a href="#/" onClick={(event) => {event.preventDefault(); props.onItemClick(name)}}>{name}</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                })}
            </section>
}

export default List


