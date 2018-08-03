import React from 'react'
import SearchForm from './SearchForm'
import logic from '../logic'
import ImageDisplayer from "./ImageDisplayer"
import {Container, Row, Col} from 'reactstrap';
import SearchFormFilterListWithCount from "./SearchFormFilterListWithCount"
import ErrorPanel from './ErrorPanel'
import ImageSearchBase from "./ImageSearchBase"
import './SearchPage.css'

const OBJECT_LIMIT = 100

class SearchPage extends ImageSearchBase {

  state = {
    searchTerm: "",
    data: [],
    makerData: null,
    periodData: null,
    materialData: null,
    errorMessage: "",
    badSearchMessage:"",
    isProcessing:false,
  }


  doNewSearch = searchTerm => {
    if (this.processing) return;

    this.processing = true;
    this.originalData =  this.originalPeriodData =  this.originalMaterialData =  this.originalMakerData = []
    this.materialFilterText = ""
    this.periodFilterText = ""
    this.makerFilterText = ""
    this.imageMap.clear()
    this.setState({
      searchTerm,
      data: [],
      materialData: [],
      periodData: [],
      makerData: [],
      badSearchMessage:"",
      errorMessage:"",
    })

    logic.getMuseumImagesForSearchTerm(searchTerm)
      .then(results => {
        if (results.length === 0) {
          this.processing = false;
          this.setState({badSearchMessage:"Your search returned no results.  Please try again"})
          return;
        }

        results = results.slice(0, OBJECT_LIMIT)
        results.forEach(result => {
          this.imageMap.set(result.objectNumber,result.imageurl);
        })
       const mapped = results.map(element => element.objectNumber)

        return this.getDetailsFromArtObjects(mapped)
          .then(res => {
            this.buildDataAfterNewSearch(res)
            this.processing = false;
          })
      })
      .catch(this.handleError)
  }


  render() {
    const {isProcessing,badSearchMessage,errorMessage, data, makerData, periodData, materialData} = this.state

    return (<Container  className="mt-5">
    <Row><h2 className="page-mainTitle">Search</h2></Row>
        <Row> <SearchForm disabled={isProcessing} onSearch={this.doNewSearch}/></Row>
        { badSearchMessage && <Row><ErrorPanel color="warning" message={badSearchMessage}/></Row>}
        { errorMessage && <Row><ErrorPanel color="danger" message={errorMessage}/></Row>}
        { isProcessing && <Row><ErrorPanel color="info" message="Processing request..."/></Row>}

        { (data.length > 0) && <Row>
          <Col className="col-sm-4"><SearchFormFilterListWithCount title="Filter by Maker"
                                                                   onClearFilter={this.clearMakerFilter}
                                                                   onSelectFilter={this.setMakerFilter}
                                                                   data={makerData}/></Col>
          <Col className="col-sm-4"><SearchFormFilterListWithCount title="Filter by Century"
                                                                   onClearFilter={this.clearPeriodFilter}
                                                                   onSelectFilter={this.setPeriodFilter}
                                                                   data={periodData}/></Col>
          <Col className="col-sm-4"><SearchFormFilterListWithCount title="Filter by Material"
                                                                   onClearFilter={this.clearMaterialFilter}
                                                                   onSelectFilter={this.setMaterialFilter}
                                                                   data={materialData}/></Col>
        </Row>}
        <Row> {(data.length > 0) && <ImageDisplayer data={data}/>}</Row>
      </Container>


    )
  }


}

export default SearchPage