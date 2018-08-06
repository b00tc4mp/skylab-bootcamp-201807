// 'use strict'

// function formatDate(date) {
//     return date.toLocaleDateString();
//   }

//   function Avatar(props) {
//     return (
//       <img
//         className="Avatar"
//         src={props.user.avatarUrl}
//         alt={props.user.name}
//       />
//     );
//   }

//   function UserInfo(props) {
//     return (
//       <div className="UserInfo">
//         <Avatar user={props.user} />
//         <div className="UserInfo-name">{props.user.name}</div>
//       </div>
//     );
//   }

//   function Comment(props) {
//     return (
//       <div className="Comment">
//         <UserInfo user={props.author} />
//         <div className="Comment-text">{props.text}</div>
//         <div className="Comment-date">
//           {formatDate(props.date)}
//         </div>
//       </div>
//     );
//   }

//   const comment = {
//     date: new Date(),
//     text: 'I hope you enjoy learning React!',
//     author: {
//       name: 'Hello Kitty',
//       avatarUrl: 'http://placekitten.com/g/64/64',
//     },
//   };


//   ReactDOM.render(
//     <Comment
//       date={comment.date}
//       text={comment.text}
//       author={comment.author}
//     />,
//     document.getElementById('root')
//   );


'use strict'








// const information = {
//     estopa: {
//         album1: {
//             albumName: 'Javi Cantero',
//             songs: {
//                 songName1: 'Vamos a jugar',
//                 songName2: 'Vamos a llorar',
//             },
//         },

//         album2: {
//             albumName: 'Pizzas Veganas',
//             songs: {
//                 songName1: 'Vamos a morir',
//                 songName2: 'Voy a suicidarme',
//             },
//         },
//     },

//     mocedades: {
//         album1: {
//             albumName: 'Mienteme',
//             songs: {
//                 songName1: 'Vamos a mentir',
//                 songName2: 'Vamos a cantar',
//             },
//         },
//     },
//     albumName: 'Besame',
//     songs: {
//         songName1: 'Vamos a Besar',
//         songName2: 'Vamos a implementarlo',
//     },
// }

// render() {
//     return 
//         <section onSubmit={this.onAdd}>
//             {/* <div>{props.namesAlbum1}</div>
//             <div>{props.namesAlbum2}</div> */}
//             <input type="text" placeholder="Your Name"/>
//             <button type="submit">Submit</button>
//         </section>
    
// }

// ReactDOM.render(
//     <Component
//         // namesAlbum1={[information.estopa.album1.albumName, information.estopa.album2.albumName]}
//         // namesAlbum2={information.mocedades.album1.albumName}
//     />,
//     document.getElementById('root')
// );


// class HelloWorld extends React.Component{
//     render(){
//       return <div>Hello world!</div>
//     }
//   }
  
//   ReactDOM.render(
//     <HelloWorld />,
//     document.getElementById('root')
//   );


//   class MyComponent extends React.Component{
//     render(){
//       return <div>MyComponent {this.props.name}</div>
//     }
//   }
  
//   ReactDOM.render(
//     <MyComponent name="Jupiter" />,
//     document.getElementById('root')
//   );

//   class MyComponent extends React.Component{
//     constructor(props){
//       super(props);
//       this.state = {message:'Jupiter'};
//       this.update = this.update.bind(this);
//     } 
    
//     update(){
//       this.setState({message:'Saturno'})
//     }
  
//     render(){
//       return <div>
//          <span>My Component {this.state.message}<br></br></span>
//         <button onClick={this.update}>click me</button>
//       </div>
//     }
//   }
  
//   MyComponent.defaultProps = {
//     val:0
//   };
  
// function Clock(props) {
//     return (
//       <div>
//         <h1>Hello, world!</h1>
//         <h2>It is {props.pate.toLocaleTimeString()}.</h2>
//       </div>
//     );
//   }
  
//   function tick() {
//     ReactDOM.render(
//       <Clock pate={new Date()} />,
//       document.getElementById('root')
//     );
//   }
  
//   setInterval(tick, 1000);

//   class Clock extends React.Component {
//     render() {
//       return (
//         <div>
//           <h1>Hello, world!</h1>
//           <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
//         </div>
//       );
//     }
//   }

//     function tick() {
//     ReactDOM.render(
//       <Clock date={new Date()} />,
//       document.getElementById('root')
//     );
//   }
  
//   setInterval(tick, 1000);

// class Clock extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {date: new Date()};
//     }
  
//     render() {
//       return (
//         <div>
//           <h1>Hello, world!</h1>
//           <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
//         </div>
//       );
//     }
//   }
  
//   ReactDOM.render(
//     <Clock />,
//     document.getElementById('root')
//   );

const ChildComponent = () => {
  return (
    <div>
      <p>I am the child</p>
    </div>
  );
};

class ParentComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>I am the parent</h1>
      <ChildComponent />
      </div>
    );
  }
};

ReactDOM.render(
     <ParentComponent />,
       document.getElementById('root')
   );


   const TypesOfFruit = () => {
    return (
      <div>
        <h2>Fruits:</h2>
        <ul>
          <li>Apples</li>
          <li>Blueberries</li>
          <li>Strawberries</li>
          <li>Bananas</li>
        </ul>
      </div>
    );
  };
  
  const Fruits = () => {
    return (
      <div>
        { /* change code below this line */ }
        <TypesOfFruit />
  
        { /* change code above this line */ }
      </div>
    );
  };
  
  class TypesOfFood extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <div>
          <h1>Types of Food:</h1>
          { /* change code below this line */ }
          <Fruits />
          { /* change code above this line */ }
        </div>
      );
    }
  };

  class TypesOfFood extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div id='challenge-node'>
          <h1>Types of Food:</h1>
          {/* change code below this line */}
          <Fruits />
          <Vegetables />
          {/* change code above this line */}
        </div>
      );
    }
  };
  
  // change code below this line
  
  ReactDOM.render(
       <TypesOfFood/>,
         document.getElementById('challenge-node')
     );

     const CurrentDate = (props) => {
      return (
        <div>
          { /* change code below this line */ }
          <p>The current date is: {props.date} </p>
          { /* change code above this line */ }
        </div>
      );
    };
    
    class Calendar extends React.Component {
      constructor(props) {
        super(props);
      }
      render() {
        return (
          <div>
            <h3>What date is it?</h3>
            { /* change code below this line */ }
            <CurrentDate date={Date()} />
            { /* change code above this line */ }
          </div>
        );
      }
    };

    const List= (props) => {
      { /* change code below this line */ }
      return <p>{props.tasks.join(', ')}</p>
      { /* change code above this line */ }
    };
    
    class ToDo extends React.Component {
      constructor(props) {
        super(props);
      }
      render() {
        return (
          <div>
            <h1>To Do Lists</h1>
            <h2>Today</h2>
            { /* change code below this line */ }
            <List tasks={["one", "two"]} />
            <h2>Tomorrow</h2>
            <List tasks={["one", "two", "three"]} />
            { /* change code above this line */ }
          </div>
        );
      }
    };

    const Items = (props) => {
      return <h1>Current Quantity of Items in Cart: {props.quantity}</h1>
    }
    
    Items.defaultProps = {
      quantity: 0
    }
    
    class ShoppingCart extends React.Component {
      constructor(props) {
        super(props);
      }
      render() {
        { /* change code below this line */ }
        return <Items quantity = {10} />
        { /* change code above this line */ }
      }
    };