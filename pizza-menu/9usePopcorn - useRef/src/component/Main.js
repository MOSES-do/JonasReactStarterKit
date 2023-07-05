import { useState } from 'react'


const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);


function Main({ children }) {
    return (
        <main className="main">
            {children}
            {/* <ListBox movies={movies} />
      <WatchedBox /> */}
        </main>
    )
}

// Reusable component with component composition "childen prop"
export const Box = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen((open) => !open)}
            >
                {isOpen ? "–" : "+"}
            </button>
            {isOpen && children}
        </div>
    )
}

/* 
ANY ONE WORKS JUST AS WELL
Explicitly defined prop composition
export const Box = ({ element }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen((open) => !open)}
            >
                {isOpen ? "–" : "+"}
            </button>
            {isOpen && element}
        </div>
    )
}
*/

export const MovieList = ({ movies, handleIdSelection }) => {

    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <Movie idSelection={handleIdSelection} key={movie.imdbID} movie={movie} />
            ))}
        </ul>
    )
}

export const Movie = ({ movie, idSelection }) => {

    return (
        <li onClick={() => idSelection(movie)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3 >{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    )
}


/*
export const WatchedBox = () => {
    const [isOpen2, setIsOpen2] = useState(true);

    return (
        <Box>
            <button
                className="btn-toggle"
                onClick={() => setIsOpen2((open) => !open)}
            >
                {isOpen2 ? "–" : "+"}
            </button>
            {isOpen2 && (
                <>
                    <WatchedSummary watched={watched} />
                    <WatchedMoviesList watched={watched} />
                </>
            )}
        </Box>
    )
}
*/

export const WatchedSummary = ({ watched }) => {
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));
    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                </p>
                <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating.toFixed(2)}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating.toFixed(2)}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime.toFixed(2)} min</span>
                </p>
            </div>
        </div>
    )
}

export const WatchedMoviesList = ({ watched, onDeleteWatched }) => {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie key={movie.imdbID} movie={movie} onDeleteWatched={onDeleteWatched} />
            ))}
        </ul>
    )
}

export const WatchedMovie = ({ movie, onDeleteWatched }) => {
    const [count, setCount] = useState(0)
    // console.log(movie)
    return (
        <li onClick={() => setCount(el => el + 1)}>
            <img src={movie.poster} alt={`${movie.title} poster`} />
            <h3>{movie.title}</h3>
            {/* <div>
                <h4>Rendering in React</h4>
                <span>Diffing: Same Position, Different Element. {count}</span>
            </div> */}
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating.toFixed(2)}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating.toFixed(2)}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.runtime.toFixed(2)} min</span>
                </p>

                <button className='btn-delete' onClick={() => onDeleteWatched(movie.imdbID)}>X</button>
            </div>
        </li>
    )
}


export default Main;