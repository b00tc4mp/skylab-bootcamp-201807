import React from "react"
import { render } from "react-dom"
import Autocomplete from "react-autocomplete"
import { List, CellMeasurer, CellMeasurerCache } from "react-virtualized"
import airportsArray from '../../Resources/airport'

const airports = airportsArray.map((airport, index) => ({
  name: airport.label,
  id: index,
}));

class SearchAutocomplete extends React.Component {
  constructor() {
    super();

    this.cellHeightCache = new CellMeasurerCache({
      defaultHeight: 42,
      fixedWidth: true
    });

    this.state = {
      searchingFor: "",
      selection: "",
      data: airports
    };

  }

  onSelect = item => this.setState({ selection: item });

  renderItem = item => {
    return <div>{item.name}</div>;
  };

  renderMenu = (items, searchingFor, autocompleteStyle) => {
    this.cellHeightCache.clearAll();

    const rowRenderer = ({ key, index, parent, style }) => {
      const Item = items[index];
      const onMouseDown = e => {
        if (e.button === 0) {
          Item.props.onClick(e);
        }
      };

      return (
        <CellMeasurer
          cache={this.cellHeightCache}
          key={key}
          parent={parent}
          rowIndex={index}
        >
          {React.cloneElement(Item, {
            style: {
              ...style,
              height: "auto",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              borderBottom: "1px solid grey",
              padding: "5px",
              boxSizing: "border-box"
            },
            key: key,
            onMouseEnter: null,
            onMouseDown: onMouseDown
          })}
        </CellMeasurer>
      );
    };

    return (
      <List
        rowHeight={this.cellHeightCache.rowHeight}
        height={207}
        rowCount={items.length}
        rowRenderer={rowRenderer}
        width={autocompleteStyle.minWidth || 0}
        style={{
          position: "absolute",
          backgroundColor: "white",
          border: "1px solid black",
          height: "auto",
          maxHeight: "207px",
          overflowY: "scroll",
          display: items.length ? "block" : "none"
        }}
      />
    );
  };

  render() {
    const searchTerm = this.state.searchingFor;

    let data = searchTerm
      ? this.state.data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      : [];

    return (
      <div>
        <p>Type into the input to search through the randomly generated strings</p>
        <Autocomplete
          renderItem={this.renderItem}
          items={data}
          getItemValue={item => item.name}
          value={this.state.searchingFor}
          onChange={(e, value) => this.setState({ searchingFor: value })}
          onSelect={this.onSelect}
          renderMenu={this.renderMenu}
        />
        <p>selection: {this.state.selection}</p>
      </div>
    );
  }
}

export default SearchAutocomplete

