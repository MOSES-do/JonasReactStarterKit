import { useEffect, useRef } from 'react'


const Navbar = ({ children }) => {
    return <nav className="nav-bar">
        {children}
    </nav>
}

export const Logo = () => {
    return <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
    </div>
}

export const NumResults = ({ movies }) => {
    return <p className="num-results">
        Found <strong>{movies.length}</strong> results
    </p>
}

export function Search({ query, setQuery }) {
    const inputEl = useRef(null);

    useEffect(() => {
        inputEl.current.focus()
    }, [])

    useEffect(
        function () {
            function callback(e) {

                //document.activeElement refers to the active element, it is implicitly available in JS
                //If the document.activeElement is input, the focus and cleared query will not run
                if (document.activeElement === inputEl.current) return inputEl.current.style.backgroundColor = "#e03131"
                if (document.activeElement === inputEl.current) return

                if (e.code === 'Space' || e.code === 'Enter') {
                    inputEl.current.focus()
                    setQuery('')
                }

                if (e.code === 'Escape') {
                    inputEl.current.style.backgroundColor = "#7950f2"
                    inputEl.current.focus()
                    setQuery('')
                }
            }
            document.addEventListener('keydown', callback)

            return function () { document.removeEventListener('keydown', callback) }
        }, [setQuery])

    return <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
    />
}


export default Navbar