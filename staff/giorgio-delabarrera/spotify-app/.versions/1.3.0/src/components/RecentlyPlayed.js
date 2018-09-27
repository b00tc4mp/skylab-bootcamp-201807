import React from 'react'

function RecentlyPlayed(props) {
  return (
    <section className="recently-played">
      <h2 className="recently-played__title">Recently played</h2>
      <ul className="recently-played__list">
        <li className="recently-played__list-item">
          <a href="#/">Wonderwall - Oasis</a>
        </li>
        <li className="recently-played__list-item">
          <a href="#/">Yellow - Coldplay</a>
        </li>
        <li className="recently-played__list-item">
          <a href="#/">Patience - Guns and Roses</a>
        </li>
      </ul>
    </section>
  )
}

export default RecentlyPlayed