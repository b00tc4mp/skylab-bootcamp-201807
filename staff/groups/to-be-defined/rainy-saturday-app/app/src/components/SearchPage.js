import React, {Component} from 'react'
import PropTypes from 'prop-types'
import SearchForm from './SearchForm'
import logic from '../logic'
import ImageDisplayer from "./ImageDisplayer"

class SearchPage extends Component {

  state = {hasImages: false,images:[]}

  doSearch = searchTerm => {
    this.setState({hasImages: false,images:[]})
    logic.getMuseumImagesForSearchTerm(searchTerm)
      .then(results => {
        this.setState({hasImages: true,images:results})
        console.log(results)
      })
      .catch(console.error)
  }


  render() {

    const {hasImages,images} = this.state

    return (<div><h2>SearchPage</h2>
        <SearchForm onSearch={this.doSearch}/>
        {hasImages && <ImageDisplayer data={images}/>}
      </div>
    )
  }


}

export default SearchPage