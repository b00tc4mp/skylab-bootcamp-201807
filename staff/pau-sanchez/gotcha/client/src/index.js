import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.render(<HashRouter>
    <App />
  </HashRouter>, document.getElementById('root'));
registerServiceWorker();
