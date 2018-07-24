import React from 'react'

function ResultList(props) {

 /* let lis = [];
    props.data.forEach((element,i) => {
      lis.push(<li key={{i}}  name={element.text} data-id={element.id} /> );
  });
   return (lis);
*/
  // {props.results.map((result) => <li  key={result.id}><a href="#/" onClick={_=>props.onItemClick(result.id)}>{result.text}</a></li>)}

  return <ul>
    {props.results.map(({id,text}) => <li  key={id}><a href="#/" onClick={_=>props.onItemClick(id)}>{text}</a></li>)}
  </ul>




}

export default ResultList;