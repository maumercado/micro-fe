import React, { useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { mount } from 'auth/AuthApp'

export default ({ onSignIn }) => {
  const ref = useRef(null)
  const history = useHistory()

  function onNavigate ({ pathname: nextPathName }) {
    const { pathname } = history.location
    if (pathname !== nextPathName) {
      history.push(nextPathName)
    }
  }

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: onNavigate.bind(this),
      onSignIn
    })

    history.listen(onParentNavigate)
  }, [])

  return <div ref={ref} />
}
