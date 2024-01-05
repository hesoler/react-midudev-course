import PropTypes from 'prop-types'

export function MovieList({ movies }) {
    return (
        <ul className='movies'>
            {movies.map(movie => (
                <li className='movie' key={movie.id}>
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                    <img src={movie.poster} alt={movie.Title} />
                </li>
            ))
            }
        </ul>
    )
}
MovieList.propTypes = { movies: PropTypes.array.isRequired }

export function NoMovieResults() {
    return (<p>No results for your search</p>)
}

export function Movies({ movies }) {
    const hasMovies = movies?.length > 0
    return (hasMovies ? <MovieList movies={movies} /> : <NoMovieResults />)
}
Movies.propTypes = { movies: PropTypes.array.isRequired }

