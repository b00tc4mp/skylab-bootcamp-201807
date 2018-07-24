'use strict'

const root = document.getElementById('root')

ReactDOM.render(<main>
    <h1>hello world</h1>
    <ul>
        <li>i am item 1</li>
        <li>i am item 2</li>
        <li>i am item 3</li>
        </ul>
    </main>, root)


// by means of babel, this jsx code:

{/* <main>
    <h1>hello world</h1>
    <ul>
        <li>i am item 1</li>
        <li>i am item 2</li>
        <li>i am item 3</li>
    </ul>
</main> */}

// transpiles to:

// React.createElement(
//     "main",
//     null,
//     React.createElement(
//       "h1",
//       null,
//       "hello world"
//     ),
//     React.createElement(
//       "ul",
//       null,
//       React.createElement(
//         "li",
//         null,
//         "i am item 1"
//       ),
//       React.createElement(
//         "li",
//         null,
//         "i am item 2"
//       ),
//       React.createElement(
//         "li",
//         null,
//         "i am item 3"
//       )
//     )
//   )
