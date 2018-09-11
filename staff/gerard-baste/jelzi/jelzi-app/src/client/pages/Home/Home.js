import React from 'react'
import { Search, ResultList } from '../../index.js'
import { Container, Row, Col } from 'reactstrap';
import './Home.css'
import {logic} from '../../logic'
import Slider from "react-slick";




export default class Home extends React.Component {

  state = {
   recipes: [],
   recipesError: false,
   recipesErrorQuery:'',
   query: ''
}



onSearch = query =>{
  if (!this.isLoggedIn()){
    this.setState({query})
logic.basicSearch(query)
.then(recipes => {
  if (recipes.length === 0){
    this.setState({recipesError: true, recipesErrorQuery: `Recipes not found with ${this.props.query}`})
  } else {
  this.setState({
    recipesError: false,
    recipes 
  })
}
})
  } else {
    const email = sessionStorage.getItem('email')
    const token = sessionStorage.getItem('token')
    this.setState({query})
    logic.searchRecipeAllergens(query, email, token)
  .then(recipes => {
    if (recipes.length === 0){
      this.setState({recipesError: true, recipesErrorQuery: `Recipes not found with ${this.state.query}`})
    } else {
    this.setState({
      recipesError: false,
      recipes 
    })
  }
})
  }
}


isLoggedIn = () => {
  return !!sessionStorage.getItem('email')
}
  


  render() {

    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed:  8000,
      autoplaySpeed: 3000,
  };
    return (
        <div id="home-cont">
      <Slider {...settings}>
                <div>
                    <img alt="" className="carousel image01" />
                </div>
                <div>
                    <img alt="" className="carousel image02" />
                </div>
                <div>
                    <img alt="" className="carousel image03" />
                </div>
      </Slider>
      <Container>
        <Row><Col></Col>
          <Col sm='6'><Search onSearch={this.onSearch}/></Col>
          <section className="container-name">
      <ResultList recipesResults={this.state.recipes} query={this.state.query} recipesError={this.state.recipesError} recipesErrorQuery={this.state.recipesErrorQuery}/>
      </section>
        </Row>
      </Container>
      </div>
    );
  }
}

