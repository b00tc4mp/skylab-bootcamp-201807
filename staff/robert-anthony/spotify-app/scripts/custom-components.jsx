"use strict"
// my custom components
/*
*
*
*
* */


/**/

class App extends ReactComponent {
   constructor() {
     super(props)
     const testObj = {name:"Doug",id:1}
     this.list = [testObj,testObj,testObj]
   }

   render() {

    return <ResultsList cssClass="someClass" data={this.list} handleClick={this.handleClick}/>

   }


  handleClick(event) {
    console.log(event.target);
  }

}

class ListElement extends ReactComponent {
  constructor() {
    super(props);
  }

  render() {
    return (<li onClick={() => this.props.handleClick)} name={this.props.name}
               id={this.props.id}>{this.props.name}</li>);
  }
}



class ResultsList extends React.Component {
  constructor() {
    super(props);
  }


  render() {
    const elementClasses = this.props.cssClass + " list-group";

    const listElements = this.props.data.map((element) => {
      return (<ListElement handleClick={this.props.handleClick} name={element.name} id={element.id}/>)
    });

    return (<ul className={elementClasses}>
      {listElements}
    </ul>);

  }

}

ReactDOM.render(App,  document.querySelector('#appContainer'));

