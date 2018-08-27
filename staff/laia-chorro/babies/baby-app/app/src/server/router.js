import { renderToString } from 'react-dom/server'
import React from 'react'
import { matchPath, StaticRouter } from 'react-router-dom'
import routes from './routes'
import renderHtml from './renderHtml'
import App from '../components/App'


/*
  1) Just get shared App rendering to string on server then taking over on client.
  2) Pass data to <App /> on server. Show diff. Add data to window then pick it up on the client too.
  3) Instead of static data move to dynamic data (github gists)
  4) add in routing.
*/

const router = (req, res, next) => {

    const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}
debugger;
    const promise = activeRoute.fetchInitialData
      ? activeRoute.fetchInitialData(req.path)
      : Promise.resolve()
  
    promise.then((data) => {
      const context = { data }
  
      const html = renderToString(
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      )

      //res.send(renderHtml(html, data)).catch(next)
      //res.status(200).send(renderHtml(html, data)).catch(next)

      res.send(renderHtml(html, data)).catch(next)
    })
    .catch(({message}) => console.log('error in router: ' + message))
}

export default router