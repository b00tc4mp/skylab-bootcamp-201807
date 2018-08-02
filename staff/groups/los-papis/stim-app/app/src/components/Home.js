import React, { Component } from "react";
import { Container, Row, Col, CardColumns } from "reactstrap";
import NavBar from "./NavBar";
import GameCard from "./Card";
import logic from "../logic";
import "../styles/style-navbar.css"

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
      return <GameCard data={e} key={e.appid}/>
    })}
    </CardColumns>
    )
  }
  

}

export default Home;
