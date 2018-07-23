import React from 'react'

function ResultList(props){ // props es id + text
    //le pasamos las cosas a trabes d un prop q se llamara results
    //pintemos los textos, haremos un componente de tipo funcion q pinte el listado de todo el array

    return <ul>
        {props.results.map(result => 
<li key={result.id}><a href="#/" onClick={()=> props.onItemClick(result.id)}>{result.text}</a></li>)}
        
        </ul>            
    
       
        }

export default ResultList





//Basico para poder trabajar: 
// import React from 'react'

// function ResultList(props){


// }

// export default ResultList