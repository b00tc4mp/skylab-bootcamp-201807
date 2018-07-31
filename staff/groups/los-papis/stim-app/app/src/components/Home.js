import React, { Component } from "react";
import { Container, Row, Col, CardColumns } from "reactstrap";
import NavBar from "./NavBar";
import _Card from "./Card";
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
    <CardColumns className="mt-4">
   {this.state.data.map((e) => {
      return <_Card data={e} key={e.appid}/>
    })}
    </CardColumns>
    )
  }
  

}

export default Home;
