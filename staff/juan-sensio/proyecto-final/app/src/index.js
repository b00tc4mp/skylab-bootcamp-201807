import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import store from "./redux/store"

import './index.css'

import App from './App'

import registerServiceWorker from './registerServiceWorker'

render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById('root')
)

registerServiceWorker()
