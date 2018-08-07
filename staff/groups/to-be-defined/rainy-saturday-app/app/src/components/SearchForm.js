import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Container, Row, FormText,Button,Form, Input, FormGroup} from 'reactstrap';
import "./SearchForm.css"

class SearchForm extends Component {

  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
  }

  state = {searchTerm: ""}

  handleSearchTermChange = event => this.setState({searchTerm: event.target.value})

  onDoSearch = evt => {
    evt.preventDefault()
    const searchTerm = this.state.searchTerm
    this.props.onSearch(searchTerm);
  }



  render() {
   
    return <Container>
    <Row>
      <Form onSubmit={this.onDoSearch}>
        <FormGroup className="buttonSituation">
         {/* <Label for="com.rainysaturday.SearchForm.searchTermInput">Enter Search Term</Label>*/}
          <Input disabled={this.props.disabled} value={this.state.searchTerm} autoFocus type="text" name="searchTermInput" onChange={this.handleSearchTermChange}
                 id="rainysaturday-searchTermInput" placeholder="Enter artist, Genre, Type of work, keyword..." required />
          <FormText color="muted">
           You may enter any search term that occurs to you: "Rembrandt", "sky", "print" or a combination, e.g. "Rembrandt sky print"
          </FormText></FormGroup>
        <Button type="submit" className="formSubmitButton">Submit</Button>
      </Form>
    </Row>
    </Container>


  }
}

export default SearchForm