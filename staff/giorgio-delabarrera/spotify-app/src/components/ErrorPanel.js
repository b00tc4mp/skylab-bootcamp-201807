import React from 'react'
import './ErrorPanel.css'

const ErrorPanel = ({messages}) => {
  return (
    <section className="ErrorPanel">
      <ul className="ErrorPanel__list">
      {messages.map((message, index) => {
        return (
          <li key={index}>{message}</li>
        )
      })}
      </ul>
    </section>
  )
}

export default ErrorPanel