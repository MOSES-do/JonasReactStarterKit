import { useEffect, useRef, useState } from "react";
import { Navbar, Logo, NumResults, Search } from './component/index'
import { Main, Box, MovieList, WatchedSummary, WatchedMoviesList } from './component/index'
import { useMovies } from './hooks/useMovies'
import { useMovieDetails } from './hooks/useMovieDetails'
import { useLocalStorageState } from './hooks/useLocalStorageState'
import { useKeyPress } from './hooks/useKeyPress'
import StarRating from './component/StarRating'


export default function App() {

  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null)


  const { movies, isLoading, error } = useMovies(query)
  const [watched, setWatched] = useLocalStorageState([], 'watched')

  const handleIdSelection = (movie) => {
    //comparing the state against itself b4 and after an action was performed.
    setSelectedMovieId((cur) => cur === movie?.imdbID ? null : movie.imdbID)
  }

  function handleCloseMovie() {
    setSelectedMovieId(null)
  }

  function handleAddWatchedMovie(movie) {
    setWatched(watched => [...watched, movie])
  }

  function handleDeleteWatched(id) {
    setWatched(watched => watched.filter((movie) => movie.imdbID !== id))
  }

  return (
    <>
      {/* component composition/removed propdrilling */}
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        {/* {value}
        <button onClick={clickMe}>click me</button> */}
        {/* component composition using children prop to enhance reusability
        In this case both elements share the same boolean state and styling
         the only changing thing is their children
        */}
        <Box>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && <MovieList handleIdSelection={handleIdSelection} movies={movies} />}
        </Box>

        <Box>
          {
            // based on whether ID is true || false, we can switch BTW two components

            selectedMovieId ?
              < MovieDetails onAddWatched={handleAddWatchedMovie} selectedMovieId={selectedMovieId} onCloseMovie={handleCloseMovie} watched={watched} />
              :
              <>
                <WatchedSummary watched={watched} />
                <WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteWatched} />
              </>
          }
        </Box>
      </Main>
    </>
  );
}


function MovieDetails({ selectedMovieId, onCloseMovie, onAddWatched, watched }) {
  const [movieRating, setMovieRating] = useState('')
  //custom hook
  const { movie, isLoading } = useMovieDetails(selectedMovieId)
  //useRef to persist data
  const countRef = useRef(0);

  useEffect(() => {
    if (movieRating) countRef.current = countRef.current + 1
  }, [movieRating])

  //check if array of obj includes the currently selected movie id. If YES do not allow, if NO accept
  const isWatched = watched.map(movie => movie.imdbID).includes(selectedMovieId)

  //find movie where the id in watched array is same as the selectedMovieId
  const watchedUserRating = watched.find((movie) => movie.imdbID === selectedMovieId)?.userRating

  const { Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating,
    Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre } = movie;


  useKeyPress('Escape', onCloseMovie)


  useEffect(() => {
    if (!title) return
    document.title = `Movie | ${title}`

    //cleanup function
    return () => document.title = 'usePopcorn'
  }, [title])


  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedMovieId,
      title,
      year,
      poster,
      userRating: movieRating,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ')[0]),
      countRatingDecisions: countRef.current
    }

    // console.log(poster, movieRating, imdbRating, runtime)
    onAddWatched(newWatchedMovie)

    onCloseMovie()
  }


  return <div className='details'>
    {isLoading ? <Loader /> :
      <>
        <header>
          <button className='btn-back' onClick={onCloseMovie}>
            &larr;
          </button>
          <img src={poster} alt={`Poster of ${movie}`} />
          <div className="details-overview">
            <h2>{title}</h2>
            <p>{released} &bull; {runtime}</p>
            <p>{genre}</p>
            <p><span>⭐</span>{imdbRating} IMDb rating</p>
          </div>
        </header>

        <section>
          <div className="rating">
            {!isWatched ?
              <>
                <StarRating color='#fcc419' defaultRating={0} maxRating={10} size={24} userRating={setMovieRating} />
                {movieRating > 0 && <button className="btn-add" onClick={() => handleAdd()}>+ Add to list</button>}
              </>
              :
              <p>You rated this movie {watchedUserRating}<span>⭐</span></p>
            }
          </div>
          <p><em>{plot}</em></p>
          <p>Starring {actors}</p>
          <p>Directed by {director}</p>
        </section>
      </>
    }
  </div>
}


function ErrorMessage({ message }) {
  return <p className='error'>
    <span>⛔</span>{message}
  </p>
}


function Loader() {
  return <p className='loader'>Loading...🔃🛞💫</p>
}

