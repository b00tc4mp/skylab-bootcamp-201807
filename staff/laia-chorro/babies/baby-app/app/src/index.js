import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';

render((
    <BrowserRouter>
        <App data={window.__PRELOADED_STATE__}/>
    </BrowserRouter>), 
    document.getElementById('root')
);
