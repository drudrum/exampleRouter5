import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { RouterProvider } from 'react-router5'
import createRouter from 'router5'
import loggerPlugin from 'router5-plugin-logger'
import browserPlugin from 'router5-plugin-browser'
import { clientEndpoint } from './constants.js'

const routes = [
  { name: 'sessions', path: `${clientEndpoint}/sessions` },
  { name: 'durations', path: `${clientEndpoint}/durations?:route&:fastFile` }
]
const router = createRouter(routes, {
  defaultRoute: 'durations'
})
router.usePlugin(loggerPlugin)
router.usePlugin(browserPlugin())
router.start()

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
