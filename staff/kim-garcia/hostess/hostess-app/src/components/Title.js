import React from 'react'

const Title = props => {
    return (
        <div className="header">
            <header>
                <title className="header__title">{props.title}</title>
                <p className="header__description">{props.description}</p>
            </header>
        </div>
    )
}

export default Title