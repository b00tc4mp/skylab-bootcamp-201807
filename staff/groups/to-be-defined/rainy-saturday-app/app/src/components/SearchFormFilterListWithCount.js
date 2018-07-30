import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem, Badge} from 'reactstrap';
import "./SearchFormFilterList.css"
import classNames from 'classnames/bind';


class SearchFormFilterListWithCount extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    onSelectFilter: PropTypes.func.isRequired,
    onClearFilter: PropTypes.func.isRequired,
    currentlySelected: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
  }


  onItemClick = (title, index) => {

    if (!this.props.currentlySelected) this.props.onSelectFilter(title, index);
  }


  render() {
    const selected = this.props.currentlySelected;
    const {data, title} = this.props;

    return <section>
      <h4>{title}</h4>
      <ListGroup>
        {(data.length > 0) && this.props.data.map((element, index) => {
          const {text, count} = element
          return <ListGroupItem key={text + index.toString()}
                                className={"justify-content-between " + (selected ? "disabled" : "")} onClick={(e) => {
            e.preventDefault();
            this.onItemClick(text, index)
          }} tag="a" href="#">{text} {count && !selected && <Badge color="info">{count}</Badge>}{selected &&
          <Badge color="warning" onClick={this.props.onClearFilter}>clear</Badge>}</ListGroupItem>
        })}
        {(data.length === 0) && <span>No results. Perhaps clear the other filters...</span>}
      </ListGroup>
    </section>

  }


}

export default SearchFormFilterListWithCount