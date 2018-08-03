import React, { Component } from "react"
import { CardColumns } from "reactstrap"
import NewCard from "./Card"
import logic from "../logic"

class Home extends Component {

  state = {
    data: []
  }

  componentDidMount(){
    logic.mostPlayedGames()
    .then(res => Object.keys(res).map(i => res[i]))
    .then(res => this.setState({
      data: res
    }))
  }


  render(){
    return (
    <CardColumns className="p-2" style={{background: "linear-gradient(to right, #d3cce3, #e9e4f0)"}}>
   {this.state.data.map((e) => {
      return <NewCard data={e} key={e.appid}/>
    })}
    </CardColumns>
    )
  }
  

}

export default Home
