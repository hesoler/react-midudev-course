import { useEffect, useRef, useState } from 'react'

export function useSearch () {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }
    if (search === '') {
      setError('This field can not be empty')
      return
    }
    if (/^\d+$/.exec(search)) {
      setError('Search can not be a number')
      return
    }
    if (search.length < 3) {
      setError('Search must have three characters at least')
      return
    }
    setError(null)
  }, [search])

  return { search, updateSearch: setSearch, error }
}
