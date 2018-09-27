import React from 'react'

// function ResultList(props) {

//     return (
//         <ul>
//             {props.results.map(result => <li key={result.id}>{result.text}</li>)}
//         </ul>
//     )
// }

function ResultList(props) {

    // handleClick = (event) => {
    //     event.preventDefault()
    //     const id = event.target.dataset.id
    //     this.props.onItemClick(id)
    // }

  return (
    <ul>
      {props.results.map(result => {
        return (
          <li key={result.id}>
            <a href={'#/' + result.id} onClick={() => props.onItemClick(result.id)}>
              {result.text}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export default ResultList