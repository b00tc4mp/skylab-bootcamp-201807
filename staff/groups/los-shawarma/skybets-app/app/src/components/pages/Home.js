import React from 'react'
import Nav from '../sections/Nav'
import SearchFlights from '../cards/SearchFlights';


// parseDate = (date) => {
//     const year = date.getFullYear()
//     const month = date.getMonth() + 1
//     const day = date.getDate()

//     return `${day}/${month}/${year}`
// }




const Home = () => {

    return(
        <main>
            <h1>Home Page</h1>
            <SearchFlights />            
        </main>
    )
}

export default Home