import React, {Component} from 'react'
import PropTypes from 'prop-types'
import SearchForm from './SearchForm'
import logic from '../logic'
import ImageDisplayer from "./ImageDisplayer"
import {Container, Row, Col, FormText, Button, Form, Input, Label, FormGroup} from 'reactstrap';
import SearchFormFilterListWithCount from "./SearchFormFilterListWithCount"


const FILTER_LIMIT = 10
const OBJECT_LIMIT = 30


let makerFilterIndex = null
let periodFilterIndex = null
let materialFilterIndex = null
let makerFilterText = ""
let periodFilterText = ""
let materialFilterText = ""
let originalData = null
let originalPeriodData = null
let originalMakerData = null
let originalMaterialData = null
let imageMap = new Map();


class SearchPage extends Component {

  state = {
    searchTerm: "",
    data: [],
    makerData: null,
    periodData: null,
    materialData: null,
    showFilters: false,
    makerSelected: false,
    periodSelected: false,
    materialSelected: false,
  }

  handleError = (error) => {
    //TODO
    console.error(error)
  }


  doNewSearch = searchTerm => {
    makerFilterIndex = periodFilterIndex = materialFilterIndex = null
    originalData = originalPeriodData = originalMaterialData = originalMakerData = null
    imageMap.clear()
    this.setState({
      searchTerm: searchTerm,
      data: [],
      materialData: [],
      periodData: [],
      makerData: [],
      showFilters: false,
      makerSelected: false,
      periodSelected: false,
      materialSelected: false,
    })

    logic.getMuseumImagesForSearchTerm(searchTerm)
      .then(results => {

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
      console.log("retrieving image",element.objectNumber,imageMap.get(element.objectNumber))
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
      showFilters: true,
    })


  }

  doFilteredSearch = () => {
    let material = [], period = [], maker = []

    let data = originalData

    if (materialFilterIndex !== null) data = data.filter(element => element.materials.includes(materialFilterText));
    if (periodFilterIndex !== null) data = data.filter(element => element.period === periodFilterText);
    if (makerFilterIndex !== null) data = data.filter(element => element.maker === makerFilterText);

    data.forEach(element => {
      material = material.concat(element.materials);
      period.push(element.period)
      maker.push(element.maker)
    })
    material = this.sortCountAndCondenseFilterData(material)
    period = this.sortCountAndCondenseFilterData(period)
    maker = this.sortCountAndCondenseFilterData(maker)
    material = materialFilterIndex !== null ? originalMaterialData.slice(materialFilterIndex, materialFilterIndex + 1) : material;
    maker = makerFilterIndex !== null ? originalMakerData.slice(makerFilterIndex, makerFilterIndex + 1) : maker;
    period = periodFilterIndex !== null ? originalPeriodData.slice(periodFilterIndex, periodFilterIndex + 1) : period;
    this.setState({data: data, periodData: period, makerData: maker, materialData: material})
  }

  /*  doFilteredSearch = () => {
      let {searchTerm} = this.state;

      searchTerm = logic.getFilteredSearchTerm(searchTerm, {
        [logic.MUSEUM_MAKER_FILTER]: makerFilterIndex,
        [logic.MUSEUM_PERIOD_FILTER]: periodFilterIndex,
        [logic.MUSEUM_MATERIAL_FILTER]: materialFilterIndex
      })
      this.doSearch(searchTerm);
    }*/
  /*
        doFilteredSearch = () => {
          let {searchTerm} = this.state;

          const makerTerm = makerFilterIndex ? `&principalMaker=${makerFilterIndex.replace(/ /g, "%20")}` : "";
          const periodTerm = periodFilterIndex ? `&f.dating.period=${periodFilterIndex}` : "";
          const materialTerm = materialFilterIndex ? `&material=${materialFilterIndex.replace(/ /g, "%20")}` : "";

          this.doSearch(searchTerm + makerTerm + periodTerm + materialTerm);

        }*/


  setMakerFilter = (filter, index) => {
    this.setState({makerSelected: true})
    makerFilterIndex = index;
    makerFilterText = filter
    this.doFilteredSearch()
  }
  setPeriodFilter = (filter, index) => {
    this.setState({periodSelected: true})
    periodFilterIndex = index
    periodFilterText = filter
    this.doFilteredSearch()
  }

  setMaterialFilter = (filter, index) => {
    this.setState({materialSelected: true})
    materialFilterIndex = index
    materialFilterText = filter
    this.doFilteredSearch()
  }


  clearMakerFilter = () => {
    this.setState({makerSelected: false, makerData: []});
    makerFilterIndex = null
    makerFilterText = ""
    this.doFilteredSearch()
  }

  clearPeriodFilter = () => {
    this.setState({periodSelected: false, periodData: []});
    periodFilterIndex = null
    periodFilterText = ""
    this.doFilteredSearch()
  }

  clearMaterialFilter = () => {
    this.setState({materialSelected: false, materialData: []})
    materialFilterIndex = null
    materialFilterText = ""
    this.doFilteredSearch()
  }


  render() {
    const {showFilters, data, makerData, makerSelected, periodData, periodSelected, materialData, materialSelected} = this.state

    return (<Container><
        Row><h2>SearchPage</h2></Row>
        <Row> <SearchForm onSearch={this.doNewSearch}/></Row>
        {showFilters && <Row>
          <Col className="col-sm-4"><SearchFormFilterListWithCount title="Filter by Maker"
                                                                   currentlySelected={makerSelected}
                                                                   onClearFilter={this.clearMakerFilter}
                                                                   onSelectFilter={this.setMakerFilter}
                                                                   data={makerData}/></Col>
          <Col className="col-sm-4"><SearchFormFilterListWithCount title="Filter by Period"
                                                                   currentlySelected={periodSelected}
                                                                   onClearFilter={this.clearPeriodFilter}
                                                                   onSelectFilter={this.setPeriodFilter}
                                                                   data={periodData}/></Col>
          <Col className="col-sm-4"><SearchFormFilterListWithCount title="Filter by Material"
                                                                   currentlySelected={materialSelected}
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