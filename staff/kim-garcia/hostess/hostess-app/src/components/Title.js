import React from 'react'

const Title = props => {


    return (
        <div className="header">
            <header>
                <title className="header__title"> &bull; {props.title} &bull; </title>
                {
                    props.details && (
                        <details>
                            <summary>{props.summary}</summary>
                        </details>
                        <p className="header__description">{props.description}</p>
                    )
                }
            </header>
        </div>
    )
}

export default Title