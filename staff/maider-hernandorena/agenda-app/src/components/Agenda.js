import React, { Component } from 'react'
import logic from '../logic'

class Agenda extends Component {


    render() {

        return <main>
            <div>
                <div className="search">
                    <form>
                        <input type="search" placeholder="type here..."/>
                        <button type="submit">Search</button>
                    </form>
                </div>
            </div>
        </main>
    }
}

export default Agenda