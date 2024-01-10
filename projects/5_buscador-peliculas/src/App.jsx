import './App.css'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'
import { useCallback, useEffect, useRef, useState } from 'react'
import debounce from 'just-debounce-it'

function useSearch () {
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
function App () {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce(search => {
      console.log('search', search)
      getMovies({ search })
    }, 500)
    , [getMovies]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    if (newSearch.startsWith(' ') || newSearch.endsWith('  ')) return
    updateSearch(newSearch)
    debouncedGetMovies(newSearch.trim())
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='page'>
      <header>
        <h1>Movie search engine</h1>

        <form className='form' onSubmit={handleSubmit}>
          <input
            onChange={handleChange} value={search} placeholder='Put a movie title'
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }}
          />
          <button type='submit'>Search</button>
          <input id='sortCheck' type='checkbox' onChange={handleSort} checked={sort} />
          <label htmlFor='sortCheck'>Sort by title</label>
        </form>

        {error && <p style={{ color: 'red' }} className='error'>{error}</p>}
      </header>

      <main>
        {loading ? <p>Loading...</p> : <Movies movies={movies} />}
      </main>
    </div>
  )
}

export default App
