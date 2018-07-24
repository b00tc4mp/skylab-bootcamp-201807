'use strict'

const root = document.getElementById('root')

const title = React.createElement('h1', null, 'hello world')

const item1 = React.createElement('li', null, 'i am item 1')

const item2 = React.createElement('li', null, 'i am item 2')

const item3 = React.createElement('li', null, 'i am item 3')

const list = React.createElement('ul', null, item1, item2, item3)

const main = React.createElement('main', null, title, list)

ReactDOM.render(main, root)

