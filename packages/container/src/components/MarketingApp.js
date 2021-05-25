import React, { useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { mount } from 'marketing/MarketingApp'

export default () => {
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
      onNavigate: onNavigate.bind(this)
    })

    history.listen(onParentNavigate)
  }, [])

  return <div ref={ref} />
}
