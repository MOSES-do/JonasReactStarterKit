import { useState, useEffect } from 'react'


const APIKey = "a7186d48"

export function useMovies(query) {

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('')

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

    return { movies, isLoading, error }
}

