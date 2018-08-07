import React from 'react'

function SiteNav(props) {
  
  // const { routes } = props

  return (
    <nav className="site-nav">
      <ul className="site-nav__list">

        {/* { routes.map((route, index) => {
          return (
            <li className="site-nav__list-item" key={index}>
              <a href="#/" className="site-nav__link" onClick={route.onClick}>
                <i className="site-nav__link-icon { route.classNameIcon }"></i>
                  <span className="site-nav__link-text">{route.name}</span>
              </a>
            </li>
          )
        }) } */}

        <li className="site-nav__list-item">
          <a href="#/" className="site-nav__link">
            <i className="site-nav__link-icon fas fa-home fa-lg"></i>
              <span className="site-nav__link-text">Home</span>
          </a>
        </li>

      </ul>
    </nav>
  )
}

export default SiteNav