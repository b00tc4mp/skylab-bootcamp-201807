import React from 'react'
import PropTypes from 'prop-types'
import SearchForm from './SearchForm'
import logic from '../logic'
import ImageDisplayer from "./ImageDisplayer"
import {Container, Row, Col} from 'reactstrap';
import SearchFormFilterListWithCount from "./SearchFormFilterListWithCount"
import ErrorPanel from './ErrorPanel'
import ImageSearchBase from "./ImageSearchBase"

const FILTER_LIMIT = 10
const OBJECT_LIMIT = 100


class FavouritesPage extends ImageSearchBase {

  state = {
    data: [],
    makerData: null,
    periodData: null,
    materialData: null,
    errorMessage: "",
    isProcessing:false,
  }

  componentDidMount() {
    const favs = logic.getUserFavorites();
    if (favs && favs.length > 0) this.loadFavorites(favs)
    else this.handleError("You don't seem to have any favourites at the moment.  You can go to the search page to add some!")
  }

  loadFavorites = favs => {
    if (this.processing) return;
    this.processing = true;

    this.originalData  = []
    this.imageMap.clear()
    favs.forEach(fav => this.imageMap.set(fav.objectNumber,fav.imageurl))
    const objectNumbers = favs.map(element=> element.objectNumber)
    console.log("favs",favs,"objectNumbers",objectNumbers)
    this.setState({
      data: [],
      materialData: [],
      periodData: [],
      makerData: [],
      errorMessage:"",
    })
    this.getDetailsFromArtObjects(objectNumbers)
      .then(res => {
        console.log("results from getDetailsFromArtObjects",res)
        this.buildDataAfterNewSearch(res)
        this.processing = false;
      })
      .catch(this.handleError)

  }


  render() {
    const {isProcessing,errorMessage,warningMessage, data} = this.state

    return (<Container  className="mt-5"><
        Row><h2>Favorites</h2></Row>
        { errorMessage && <Row><ErrorPanel color="danger" message={errorMessage}/></Row>}
        { isProcessing && <Row><ErrorPanel color="info" message="Processing request..."/></Row>}
        <Row> {(data.length > 0) && <ImageDisplayer data={data}/>}</Row>
      </Container>


    )
  }


}

export default FavouritesPage