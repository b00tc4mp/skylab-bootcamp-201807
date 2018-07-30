import React, {Component} from 'react'
import PropTypes from 'prop-types'
import SearchForm from './SearchForm'
import logic from '../logic'
import ImageDisplayer from "./ImageDisplayer"
import {Container, Row, Col, FormText, Button, Form, Input, Label, FormGroup} from 'reactstrap';
import SearchFormFilterList from "./SearchFormFilterList"


const FILTER_LIMIT = 10
const OBJECT_LIMIT = 40


let makerFilter = ""
let periodFilter = ""
let materialFilter = "";


class SearchPage extends Component {

  state = {
    searchTerm: "",
    hasData: false,
    data: [],
    makerData: null,
    periodData: null,
    materialData: null,
    showFilters: false,

  }

  handleError = (error) => {
    //TODO
  }

  doNewSearch = searchTerm => {
    makerFilter = periodFilter = materialFilter = "";
    this.setState({
      searchTerm: searchTerm,
      hasData: false,
      data: [],
      materialData: [],
      periodData: [],
      makerData: [],
      showFilters: false,
      makerSelected: false,
      periodSelected: false,
      materialSelected: false,

    })
    this.doSearch(searchTerm);
  }

  doSearch = searchTerm => {

    logic.getMuseumImagesForSearchTerm(searchTerm)
      .then(results => {
        results = results.slice(0, OBJECT_LIMIT)
        this.getDetailsFromArtObjects(results.map(element => element.objectNumber))
          .then(()=> {
            const makerData = makerFilter ? this.state.makerData : this.sortAndCondenseFilterData(results.map(element => element.maker));

            this.setState({
              makerData: makerData,
              /*   periodData: periodData,
                 materialData: materialData,*/
              hasData: results.length > 0,
              data: results,
              showFilters: true,
            })
          })

      })

      .catch(this.handleError)
  }

  sortAndCondenseFilterData = data => {
    const arr = [];

    data.forEach(element => {
      const obj = arr.find(element1 => {
        return (element1.text === element)
      })
      if (obj) obj.count++
      else arr.push({text: element, count: 1})
    })
    return arr.sort((element1, element2) => element2.count - element1.count).map(element => element.text).slice(0, FILTER_LIMIT);
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
      .then(res => this.buildFilterDatas(res))
      .catch(this.handleError)
  }

  buildFilterDatas = data => {
    let period = [], material = []

    data.forEach(element => {
      material = material.concat(element.materials);
      period.push(element.period)
    })

    period = this.sortAndCondenseFilterData(period)
    material = this.sortAndCondenseFilterData(material)

    const periodData = periodFilter ? this.state.periodData : period;
    const materialData = materialFilter ? this.state.materialData : material;
    this.setState({
      periodData,
      materialData
    })
  }


  doFilteredSearch = () => {
    let {searchTerm} = this.state;

    const makerTerm = makerFilter ? `&principalMaker=${makerFilter.replace(/ /g, "%20")}` : "";
    const periodTerm = periodFilter ? `&f.dating.period=${periodFilter}` : "";
    const materialTerm = materialFilter ? `&material=${materialFilter.replace(/ /g, "%20")}` : "";

    this.doSearch(searchTerm + makerTerm + periodTerm + materialTerm);

  }


  setMakerFilter = (filter, id) => {
    const data = this.state.makerData.slice(id, id + 1);
    this.setState({makerData: data, makerSelected: true})
    makerFilter = filter;

    this.doFilteredSearch()
  }
  setPeriodFilter = (filter, id) => {
    const data = this.state.periodData.slice(id, id + 1);
    this.setState({periodData: data, periodSelected: true})
    periodFilter = filter;
    this.doFilteredSearch()
  }

  setMaterialFilter = (filter, id) => {
    const data = this.state.materialData.slice(id, id + 1);
    this.setState({materialSelected: true, materialData: data})
    materialFilter = filter
    this.doFilteredSearch()
  }


  clearMakerFilter = (doSearch = true) => {
    this.setState({makerSelected: false, makerData: []});
    makerFilter = ""
    if (doSearch) this.doFilteredSearch()
  }

  clearPeriodFilter = (doSearch = true) => {
    this.setState({periodSelected: false, periodData: []});
    periodFilter = ""
    if (doSearch) this.doFilteredSearch()
  }

  clearMaterialFilter = (doSearch = true) => {
    this.setState({materialSelected: false, materialData: []})
    materialFilter = ""
    if (doSearch) this.doFilteredSearch()
  }


  render() {
    const {hasData, showFilters, data, makerData, makerSelected, periodData, periodSelected, materialData, materialSelected} = this.state

    return (<Container><
        Row><h2>SearchPage</h2></Row>
        <Row> <SearchForm onSearch={this.doNewSearch}/></Row>
        {showFilters && <Row>
          <Col className="col-sm-4"><SearchFormFilterList title="Filter by Maker"
                                                          currentlySelected={makerSelected}
                                                          onClearFilter={this.clearMakerFilter}
                                                          onSelectFilter={this.setMakerFilter}
                                                          data={makerData}/></Col>
          <Col className="col-sm-4"><SearchFormFilterList title="Filter by Period"
                                                          currentlySelected={periodSelected}
                                                          onClearFilter={this.clearPeriodFilter}
                                                          onSelectFilter={this.setPeriodFilter}
                                                          data={periodData}/></Col>
          <Col className="col-sm-4"><SearchFormFilterList title="Filter by Material"
                                                          currentlySelected={materialSelected}
                                                          onClearFilter={this.clearMaterialFilter}
                                                          onSelectFilter={this.setMaterialFilter}
                                                          data={materialData}/></Col>
        </Row>}
        <Row> {hasData && <ImageDisplayer data={data}/>}</Row>
      </Container>


    )
  }


}

export default SearchPage