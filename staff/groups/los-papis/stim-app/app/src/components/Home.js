import React, { Component } from "react";
import { CardColumns } from "reactstrap";
import NewCard from "./Card";
import logic from "../logic";

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
    <CardColumns className="mt-4 p-2">
   {this.state.data.map((e) => {
      return <NewCard data={e} key={e.appid}/>
    })}
    </CardColumns>
    )
  }
  

}

export default Home;
