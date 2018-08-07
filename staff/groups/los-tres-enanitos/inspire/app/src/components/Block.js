import React from 'react'

const Block = props => {
  return (
    <div className="block">
      <span className="block__title">{props.title}</span>
      <p className="block__description">{props.description}</p>
    </div>
  )
}

export default Block