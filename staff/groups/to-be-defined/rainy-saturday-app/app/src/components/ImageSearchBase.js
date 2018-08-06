
import { Component } from 'react'
import logic from '../logic'

const FILTER_LIMIT = 10

class ImageSearchBase extends Component {



  originalData = []
  /*originalMakerData = []
  originalMaterialData = []
  originalPeriodData = []*/
  imageMap = new Map();
  _processing = false
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
    this._materialFilterText = val
  }
  set makerFilterText(val) {

    this._makerFilterText = val
  }
  set periodFilterText(val) {

    this._periodFilterText = val
  }

  get processing() {
    return this._processing
  }

  set processing(val) {
    this._processing = val
    this.setState({ isProcessing: val })
  }


  handleError = (error) => {
    this.processing = false;
    const msg = error || "There was a server error. Please try again"
    this.setState({ errorMessage: msg })
  }





  sortCountAndCondenseFilterData = data => {
    const arr = [];

    data.forEach(element => {
      const obj = arr.find(element1 => {
        return (element1.text === element)
      })
      if (obj) obj.count++
      else arr.push({ text: element, count: 1 })
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
      element.imageurl = this.imageMap.get(element.objectNumber);
    })

    period = this.sortCountAndCondenseFilterData(period)
    material = this.sortCountAndCondenseFilterData(material)
    maker = this.sortCountAndCondenseFilterData(maker)
    this.originalData = localData
  /*  this.originalMakerData = maker
    this.originalMaterialData = material
    this.originalPeriodData = period*/

    this.setState({
      data: localData,
      periodData: period,
      materialData: material,
      makerData: maker,
    })
  }

  doFilteredSearch = () => {
    let materialData = [], periodData = [], makerData = []
    let data = this.originalData

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
    this.setState({ data, periodData, makerData, materialData })
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



}

export default ImageSearchBase