import { useEffect, useRef, useState } from "react";
import { Navbar, Logo, NumResults, Search } from './component/index'
import { Main, Box, MovieList, WatchedSummary, WatchedMoviesList } from './component/index'
// import { tempMovieData } from "./data/index";
// import { tempWatchedData } from "./data/index";
import StarRating from './component/StarRating'

const APIKey = "a7186d48"



export default function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('')
  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null)
  const [watched, setWatched] = useState(() => {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue) || []
  });
  // const [value, setValue] = useState(10)


  const handleIdSelection = (movie) => {
    //comparing the state against itself b4 and after an action was performed.
    setSelectedMovieId((cur) => cur === movie?.imdbID ? null : movie.imdbID)
  }
  const handleCloseMovie = () => {
    setSelectedMovieId(null)
  }

  // console.log(selectedMovie)


  // useEffect(() => {
  //   console.log('Initial render')
  // }, [])

  // useEffect(() => {
  //   console.log('After every render')
  // })

  // useEffect(() => {
  //   console.log('D')
  // }, [query])


  // console.log('during render')

  /**
   *  fetch(`http://www.omdbapi.com/?apikey=${APIKey}&s=${query}`)
        .then((res) => res.json())
        .then((data) => setMovies(data.Search))
   */

  function handleAddWatchedMovie(movie) {
    setWatched(watched => [...watched, movie])
    //1 of 2 ways to store data in localStorage:
    // localStorage.setItem('watched', JSON.stringify([...watched, movie]))
  }


  useEffect(() => {
    //2nd way to store data in localStorage
    localStorage.setItem('watched', JSON.stringify(watched))
  }, [watched])


  function handleDeleteWatched(id) {
    setWatched(watched => watched.filter((movie) => movie.imdbID !== id))
  }



  useEffect(() => {
    const controller = new AbortController()
    async function fetchMovies() {
      try {
        setIsLoading(true)
        setError('')
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${APIKey}&s=${query}`, { signal: controller.signal });
        if (!res.ok)
          throw new Error('something went wrong while fetching movies')

        const data = await res.json();
        if (data.Response === 'False') throw new Error('Movie not found')
        setMovies(data.Search)
        setError('')
        // console.log(data)
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.log(err.message)
          setError(err.message)
        }
        // console.error(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    // prevents error when no query is passed
    if (query.length < 3) {
      setMovies([])
      setError('')
      return
    }

    //close MovieDetails on new search
    handleCloseMovie()

    fetchMovies()
    return (() => {
      controller.abort();
      /**
       * Every key stroke re-renders the component thereby making each stroke send its own request, which
       * we donot want.
       * The controller.abort key stroke is called on every render making sure no request is sent except the keystrokes end.
       */
    })
  }, [query])

  // const clickMe = () => {
  //   setValue(50)
  //   setValue(value => value + 10)
  //   console.log(value)
  // }

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
        {/* <WatchedBox /> */}
        {/* component composition using Explicitly defined prop composition 
           <Box element={<MovieList movies={movies} />}/>
        */}

      </Main>
    </>
  );
}


function MovieDetails({ selectedMovieId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({})
  const [movieRating, setMovieRating] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const countRef = useRef(0);

  useEffect(() => {
    if (movieRating) countRef.current = countRef.current + 1
  }, [movieRating])

  //check if array of obj includes the currently selected movie id. If YES do not allow, if NO accept
  const isWatched = watched.map(movie => movie.imdbID).includes(selectedMovieId)

  //find movie wihere the id in watched array is same as the selectedMovieId
  const watchedUserRating = watched.find((movie) => movie.imdbID === selectedMovieId)?.userRating

  const { Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating,
    Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre } = movie;

  useEffect(
    function () {
      function callback(e) {
        if (e.code === 'Escape') {
          onCloseMovie()
          // console.log('Closed')
        }
      }

      document.addEventListener('keydown', callback)

      return function () { document.removeEventListener('keydown', callback) }

    }, [onCloseMovie])

  useEffect(() => {
    const controller = new AbortController()//

    async function getMovieDetails() {
      try {
        setIsLoading(true)
        setError('')
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${APIKey}&i=${selectedMovieId}`, { signal: controller.signal });
        const data = await res.json()
        setMovie(data)
        setError('')
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        setIsLoading(false)
      }
    }
    getMovieDetails();
    return (() => {
      controller.abort();
    })
  }, [selectedMovieId])

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

