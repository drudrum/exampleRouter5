import React, { Fragment } from 'react'
// import SessionsApp from './Sessions/page.jsx'
// import DurationsApp from './Durations/page.jsx'
import { useRoute } from 'react-router5'

export default function App(props) {
  const { route } = useRoute()
  return (
    <Fragment>
      {(route.name === 'sessions' || route.name === 'sessionModalForm') && <div>SESSIONS APP</div>}
      {(route.name === 'durations' || route.name === 'sessionModalForm') && <div>DUARTIONS APP</div>}
    </Fragment>
  )
}
