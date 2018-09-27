import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem, Badge} from 'reactstrap';
import "./SearchFormFilterListWithCount.css"
// import classNames from 'classnames/bind';


class SearchFormFilterListWithCount extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    onSelectFilter: PropTypes.func.isRequired,
    onClearFilter: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  }

  state = {
    currentFilterText: "",
    selected:false
  }

  onClear = () => {
    this.setState({currentFilterText:"" ,
      selected:false})
    this.props.onClearFilter();
  }


  onItemClick = (listItemText) => {

    if (!this.state.selected && listItemText !== "") {
      this.setState({currentFilterText: listItemText,selected:true})
      this.props.onSelectFilter(listItemText);
    }
  }


  render() {
    const {selected,currentFilterText} = this.state;

    const {data, title} = this.props;

    const listItems = this.props.data.map((element, index) => {
      const {text, count} = element
      return <ListGroupItem key={text + index.toString()}  className="justify-content-between " onClick={(e) => {
          e.preventDefault();
          this.onItemClick(text)
      }} tag="a" href="#">{text} {count &&  <Badge color="info">{count}</Badge>}</ListGroupItem>
    })


    return <section>
      <h4 className="searchFormFilterList-title">{title}</h4>
      <ListGroup>
        {(data.length > 0 && !selected) && listItems}
        {selected  && <ListGroupItem key={currentFilterText }  onClick={(e) => {
          e.preventDefault();
          this.onClear();
        }} className="justify-content-between  disabled"  tag="a" href="#">{currentFilterText} { <Badge color="warning" onClick={e=> {e.preventDefault();this.onClear()}}>clear</Badge>}</ListGroupItem>}
        {(data.length === 0) && <span>No results. Perhaps clear the other filters...</span>}
        </ListGroup>
          </section>

        }


        }

        export default SearchFormFilterListWithCount