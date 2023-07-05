import { useState, useEffect } from 'react'

export function useLocalStorageState(initialState, key) {
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(key);
        // storedValue in a new browser returns null on console
        //we can take advantage of that and create an ternary statement
        return storedValue ? JSON.parse(storedValue) : initialState

        //OR this works too
        // return  JSON.parse(storedValue) || []

    });


    useEffect(() => {
        //2nd way to store data in localStorage
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])


    return [value, setValue]

}