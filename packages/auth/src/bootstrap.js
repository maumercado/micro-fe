import React from 'react'
import ReactDOM from 'react-dom'
import { createMemoryHistory, createBrowserHistory } from 'history'
import App from './App'

const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath]
  })

  if (onNavigate && typeof onNavigate === 'function') {
    history.listen(onNavigate)
  }

  ReactDOM.render(
    <App onSignIn={onSignIn} history={history} />,
    el
  )

  return {
    onParentNavigate ({ pathname: nextPathName }) {
      const { pathname } = history.location

      if (pathname !== nextPathName) {
        history.push(nextPathName)
      }
    }
  }
}

// Are we in development and in isolation
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_auth-dev-root')
  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() })
  }
}

export { mount }
