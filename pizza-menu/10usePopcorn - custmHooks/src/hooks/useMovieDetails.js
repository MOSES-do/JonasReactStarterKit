import { useState, useEffect } from 'react'

const APIKey = "a7186d48"

export function useMovieDetails(query) {
    const [movie, setMovie] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const controller = new AbortController()//

        async function getMovieDetails() {
            try {
                setIsLoading(true)
                setError('')
                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${APIKey}&i=${query}`, { signal: controller.signal });
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
    }, [query])

    return { movie, isLoading, error }
}