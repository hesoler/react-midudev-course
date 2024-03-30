import { useEffect } from 'react'
import PropTypes from 'prop-types'

export default function SearchPage ({ routeParams }) {
  useEffect(() => {
    document.title = `Has buscado ${routeParams.query}`
  }, [])

  return (
    <>
      <div>Search</div>
      <h1>You 've searched': {routeParams.query}</h1>
    </>
  )
}

SearchPage.propTypes = {
  routeParams: PropTypes.object
}
