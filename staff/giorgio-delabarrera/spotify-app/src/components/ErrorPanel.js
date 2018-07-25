import React from 'react'
import './ErrorPanel.css'

const ErrorPanel = ({message}) => {
  return (
    <section className="ErrorPanel">
      {message}
    </section>
  )
}

export default ErrorPanel