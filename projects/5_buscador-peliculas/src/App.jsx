import './App.css'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'
import { useCallback, useState } from 'react'
import debounce from 'just-debounce-it'
import { useSearch } from './hooks/useSearch'

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

  const handleSort = () => setSort(!sort)

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
