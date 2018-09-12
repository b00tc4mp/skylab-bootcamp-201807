import React from "react";
import { Search, ResultList } from "../../index.js";
import { Container, Row, Col } from "reactstrap";
import "./Home.css";
import { logic } from "../../logic";
import Slider from "react-slick";
import MDSpinner from "react-md-spinner";

export default class Home extends React.Component {
  state = {
    recipes: [],
    recipesError: false,
    recipesErrorQuery: "",
    query: "",
    loading: false
  };

  onSearch = query => {
    this.setState({ loading: true });
    if (!this.isLoggedIn()) {
      logic.basicSearch(query).then(recipes => {
        if (recipes.length === 0) {
          this.setState({
            loading: false,
            recipesError: true,
            recipesErrorQuery: `Recipes not found with ${query}`
          });
        } else {
          this.setState({
            loading: false,
            recipesError: false,
            recipes
          });
        }
      });
    } else {
      const email = sessionStorage.getItem("email");
      const token = sessionStorage.getItem("token");

      logic.searchRecipeAllergens(query, email, token).then(recipes => {
        if (!recipes.length) {
          this.setState({
            loading: false,
            recipesError: true,
            recipesErrorQuery: `Recipes not found with ${query}`
          });
        } else {
          this.setState({
            loading: false,
            recipesError: false,
            recipes
          });
        }
      });
    }
  };

  isLoggedIn = () => {
    return !!sessionStorage.getItem("email");
  };

  render() {
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 8000,
      autoplaySpeed: 3000
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
          <Row>
            <Col />
            <Col sm="6">
              <Search onSearch={this.onSearch} isLoggedIn={this.isLoggedIn()} />
              {this.state.loading ? <MDSpinner className="loading" /> : ""}
            </Col>
            <section className="container-name">
              <ResultList
                recipesResults={this.state.recipes}
                recipesError={this.state.recipesError}
                recipesErrorQuery={this.state.recipesErrorQuery}
              />
            </section>
          </Row>
        </Container>
      </div>
    );
  }
}
