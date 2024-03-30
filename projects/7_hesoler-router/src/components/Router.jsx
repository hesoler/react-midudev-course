import { Children, useEffect, useState } from 'react'
import { EVENTS } from '../utils/consts'
import { match } from 'path-to-regexp'
import PropTypes from 'prop-types'
import { getCurrentPath } from '../utils/getCurrentPath'

export function Router ({
  children,
  routes = [],
  defaultComponent: DefaultComponent = () => <h1>404</h1>
}) {
  const [currentPath, setCurrentPath] = useState(getCurrentPath())

  useEffect(() => {
    const onLocationChange = () => setCurrentPath(getCurrentPath())
    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENTS.POPSTATE, onLocationChange) // botón Atrás en el navegador

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  let routeParams = {}

  // add routes from children <Route />
  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type
    const isRoute = name === 'Route'

    return isRoute ? props : null
  })

  const routeToUse = routes.concat(routesFromChildren).filter(Boolean)

  const Page = routeToUse.find(({ path }) => {
    if (path === currentPath) return true

    // uso de path-to-regexp para detectar rutas dinámicas
    // Ejemplo: /search/:query
    const matherUrl = match(path, { decode: decodeURIComponent })
    const matched = matherUrl(currentPath)
    if (!matched) return false

    // guardar parámeros dinámicos de la url extraídos con path-to-regexp
    routeParams = matched.params
    return true
  })?.Component

  return Page
    ? <Page routeParams={routeParams} />
    : <DefaultComponent routeParams={routeParams} />
}

Router.propTypes = {
  children: PropTypes.node,
  routes: PropTypes.array,
  defaultComponent: PropTypes.func
}
