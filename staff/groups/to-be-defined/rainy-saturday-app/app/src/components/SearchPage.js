import React, {Component} from 'react'
import PropTypes from 'prop-types'
import SearchForm from './SearchForm'
import logic from '../logic'
import ImageDisplayer from "./ImageDisplayer"
import {Container, Row, Col, FormText, Button, Form, Input, Label, FormGroup} from 'reactstrap';
import SearchFormFilterListWithCount from "./SearchFormFilterListWithCount"
import ErrorPanel from './ErrorPanel'

const FILTER_LIMIT = 10
const OBJECT_LIMIT = 100




let originalData = []
let originalPeriodData = []
let originalMakerData = []
let originalMaterialData = []
let imageMap = new Map();



class SearchPage extends Component {

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

  _processing = false;
  _makerFilterText = ""
  _periodFilterText = ""
  _materialFilterText = ""

  get materialFilterText() {
    return this._materialFilterText
  }
  get makerFilterText() {
    return this._makerFilterText
  }
  get periodFilterText() {
    return this._periodFilterText
  }


  set materialFilterText(val) {
    console.log("set materialFilterText",val)
     this._materialFilterText = val
  }
  set makerFilterText(val) {
    console.log("set makerFilterText",val)

    this._makerFilterText= val
  }
  set periodFilterText(val) {
    console.log("set periodFilterText",val)

    this._periodFilterText= val
  }

  get processing() {
    return this._processing
  }

  set processing(val) {
    this._processing = val
    this.setState({isProcessing:val})
  }


  handleError = (error) => {
  this.processing = false;
    this.setState({errorMessage:"There was a server error. Please try again"})
  }


  doNewSearch = searchTerm => {
    if (this.processing) return;

    this.processing = true;
    originalData = originalPeriodData = originalMaterialData = originalMakerData = []
    this.materialFilterText = ""
    this.periodFilterText = ""
    this.makerFilterText = ""
    imageMap.clear()
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
          this.setState({badSearchMessage:"Your search returned no results.  Please try again"})
          return;
        }

        results = results.slice(0, OBJECT_LIMIT)
        results.forEach(result => {
          imageMap.set(result.objectNumber,result.imageurl);
        })
        return results.map(element => element.objectNumber)
      })
      .then(res => {
        return this.getDetailsFromArtObjects(res)
      })
      .then(res => {
        this.buildDataAfterNewSearch(res)
        this.processing = false;
      })
      .catch(this.handleError)
  }

  sortCountAndCondenseFilterData = data => {
    const arr = [];

    data.forEach(element => {
      const obj = arr.find(element1 => {
        return (element1.text === element)
      })
      if (obj) obj.count++
      else arr.push({text: element, count: 1})
    })

    return arr.sort((element1, element2) => element2.count - element1.count).slice(0, FILTER_LIMIT);
  }

  getDetailsFromArtObjects = (objectNumbers) => {
    const promises = []

    objectNumbers.forEach(objectNumber => {
      promises.push(logic.getMuseumDetailsForObjectNumber(objectNumber)
        .then(res => {
            return res
          }
        ))
    })
    return Promise.all(promises)

  }

  buildDataAfterNewSearch = (arrayOfObjectsData) => {
    let period = [], material = [], maker = [], localData = []

    arrayOfObjectsData.forEach(element => {
      if (element) {
        localData.push(element)
        material = material.concat(element.materials);
        period.push(element.period)
        maker.push(element.maker)
      }
    })
    localData.forEach(element => {
      element.imageurl = imageMap.get(element.objectNumber);
    })

    period = this.sortCountAndCondenseFilterData(period)
    material = this.sortCountAndCondenseFilterData(material)
    maker = this.sortCountAndCondenseFilterData(maker)
    originalData = localData
    originalMakerData = maker
    originalMaterialData = material
    originalPeriodData = period

    this.setState({
      data: localData,
      periodData: period,
      materialData: material,
      makerData: maker,
    })


  }

  doFilteredSearch = () => {
    let materialData = [], periodData = [], makerData = []

    let data = originalData

    if (this.materialFilterText !== "") data = data.filter(element => element.materials.includes(this.materialFilterText));
    if (this.periodFilterText !== "") data = data.filter(element => element.period === this.periodFilterText);
    if (this.makerFilterText !== "") data = data.filter(element => element.maker === this.makerFilterText);

    data.forEach(element => {
      materialData = materialData.concat(element.materials);
      periodData.push(element.period)
      makerData.push(element.maker)
    })
    materialData = this.sortCountAndCondenseFilterData(materialData)
    periodData = this.sortCountAndCondenseFilterData(periodData)
    makerData = this.sortCountAndCondenseFilterData(makerData)
    if (data.length === 0) debugger
    this.setState({data, periodData, makerData, materialData})
  }


  setMakerFilter = (filter) => {
    this.makerFilterText = filter
    this.doFilteredSearch()
  }
  setPeriodFilter = (filter) => {
    this.periodFilterText = filter
    this.doFilteredSearch()
  }

  setMaterialFilter = (filter) => {
    console.log("setting material filter")
    this.materialFilterText = filter
    this.doFilteredSearch()
  }


  clearMakerFilter = () => {

    this.makerFilterText = ""
    this.doFilteredSearch()
  }

  clearPeriodFilter = () => {
    this.periodFilterText = ""
    this.doFilteredSearch()
  }

  clearMaterialFilter = () => {
    this.materialFilterText = ""
    this.doFilteredSearch()
  }


  render() {
    const {isProcessing,badSearchMessage,errorMessage, data, makerData, makerSelected, periodData, periodSelected, materialData, materialSelected,searchTerm} = this.state

    return (<Container><
        Row><h2>Search</h2></Row>
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