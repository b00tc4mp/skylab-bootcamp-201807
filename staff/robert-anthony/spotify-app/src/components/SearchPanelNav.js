import React, {Component} from "react";


class SearchPanelNav extends SearchPanel {

const ({navClass,h1Class,formClass,labelClass,inputClass,buttonClass,inputClass} = props.classes);

  render() {
    return <nav className={navClass}>
      <form className={formClass} onSubmit={this.onSearch}>
      <h1 className={h1Class}>{props.title}</h1>
        <label  className=labelClass>Search For Artist</label>
      <input className={inputClass} autoFocus={true} onChange={this.keepQuery} type="text"/>
      <button className={buttonClass} type="submit">Search</button>
    </form></nav>


  }





}


export default SearchPanelNav;
