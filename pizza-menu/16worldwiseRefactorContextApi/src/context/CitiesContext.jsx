import { useReducer, useEffect, createContext, useContext, useCallback } from 'react'
import PropTypes from 'prop-types'

const BASE_URL = 'http://localhost:9000'




const CitiesContext = createContext()




const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: null
}

function reducer(state, action) {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state, isLoading: true,
            }

        case "FINISHED_LOADING":
            return {
                ...state, isLoading: false,
            }

        case 'RECEIVED_CITY':
            return {
                ...state, cities: action.payload,
            }

        case 'CURRENT_CITY':
            return {
                ...state, currentCity: action.payload
            }

        case 'ADD_NEW_CITY':
            return {
                ...state, cities: ([...state.cities, action.payload]),
                currentCity: action.payload
            }

        case 'DELETE_CITY':
            return {
                ...state, cities: state.cities.filter(c => c.id !== action.payload),
                currentCity: {}
            }

        case 'ERROR':
            return {
                ...state, error: action.payload
            }

        default:
            throw new Error('Invalid action')
    }
}
function CitiesProvider({ children }) {
    // const [cities, setCities] = useState([])
    // const [isLoading, setIsLoading] = useState(false)
    // const [currentCity, setCurrentCity] = useState({})

    const [state, dispatch] = useReducer(reducer, initialState)
    const { cities, isLoading, currentCity } = state

    useEffect(() => {
        async function fetchCities() {
            dispatch({ type: 'SET_LOADING' })
            try {
                const res = await fetch(`${BASE_URL}/cities`);

                if (!res.ok) throw new Error("There was an error loading the data...")

                const data = await res.json();
                // console.log(data)
                dispatch({ type: 'RECEIVED_CITY', payload: data })
            } catch (err) {
                console.error(err.message)
                dispatch({ type: 'ERROR', payload: 'err.message' })
            } finally {
                dispatch({ type: 'FINISHED_LOADING' })
            }
        }
        fetchCities()
    }, [])
    // console.log(cities)


    async function addNewCity(newCity) {
        dispatch({ type: 'SET_LOADING' })
        try {
            const res = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCity),
            });
            const data = await res.json();
            dispatch({ type: 'ADD_NEW_CITY', payload: data })
            // console.log(data)
        } catch {
            alert("There was an error while creating city...")
        } finally {
            dispatch({ type: 'FINISHED_LOADING' })
        }
    }


    async function deleteCity(id) {
        dispatch({ type: 'SET_LOADING' })
        try {
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: 'DELETE'
            });
            dispatch({ type: 'DELETE_CITY', payload: id })
            // setCities(cities => cities.filter(c => c.id !== id))

        } catch {
            alert("There was an error while deleting city...")
        } finally {
            dispatch({ type: 'FINISHED_LOADING' })
        }
    }


    //fetch data for acity base on its Id
    const getCity = useCallback(async function getCity(id) {
        if (Number(id) === currentCity.id) return;//if city clicked is clicked again load from cache 
        dispatch({ type: 'SET_LOADING' })
        try {
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            dispatch({ type: 'CURRENT_CITY', payload: data })
        } catch {
            alert("There was an error loading the city...")
        } finally {
            dispatch({ type: 'FINISHED_LOADING' })
        }
    }, [currentCity.id])

    return (
        <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity, addNewCity, deleteCity }}>
            {children}
        </CitiesContext.Provider>
    )
}

CitiesProvider.propTypes = {
    children: PropTypes.any.isRequired
}

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined)
        throw new Error('Cities context was used outside the cities provider')
    return context;
}

export { CitiesProvider, useCities }






