import React from 'react'
import { Search, ResultList } from '../../index.js'
import { Container, Row, Col } from 'reactstrap';
import './Home.css'
import {logic} from '../../logic'




export default class Home extends React.Component {

  state = {
   recipes: [],
   email: sessionStorage.getItem('email') || '',
   token: sessionStorage.getItem('token') || '',
}



onSearch = query =>{
  if (!this.isLoggedIn()){
logic.basicSearch(query)
.then(recipes => {
  this.setState({
    recipes 
  })
})
  } else {
    const {email, token} = this.state
    logic.searchRecipeAllergens(query, email, token)
  .then(recipes => {
  this.setState({
    recipes 
  })
})
  }
}
// .catch(() => this.setState({ searchError: ERROR_HOUSTON }))

isLoggedIn = () => {
  return !!this.state.email
}
  


  render() {
    return (
        <div id="home-cont">
      <Container>
        <Row><Col></Col>
          <Col sm='6'><Search onSearch={this.onSearch}/></Col>
          <section className="container-name">
      <ResultList recipesResults={this.state.recipes} />
      </section>
        </Row>
      </Container>
      </div>
    );
  }
}

