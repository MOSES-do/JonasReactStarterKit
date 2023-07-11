import { useReducer, useEffect, createContext, useContext } from 'react'


const BASE_URL = 'http://localhost:9000'




const CitiesContext = createContext()

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined)
        throw new Error('Cities context was used outside the cities provider')
    return context;
}

/*eslint-disable*/

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {}
}

function reducer(state, action) {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state, isLoading: action.payload,
            }

        case 'RECEIVED_CITY':
            return {
                ...state, cities: action.payload,
                isLoading: true
            }

        case 'CURRENT_CITY':
            return {
                ...state, currentCity: action.payload
            }

        case 'ADD_NEW_CITY':
            return {
                ...state, cities: ([...state.cities, action.payload]),
            }

        case 'DELETE_CITY':
            return {
                ...state, cities: state.cities.filter(c => c.id !== action.payload),
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
            try {
                dispatch({ type: 'SET_LOADING', payload: true })
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                console.log(data)
                dispatch({ type: 'RECEIVED_CITY', payload: data })
            } catch {
                alert("There was an error loading the data...")
            } finally {
                dispatch({ type: 'SET_LOADING', payload: false })
            }
        }
        fetchCities()
    }, [])
    console.log(cities)


    async function addNewCity(newCity) {
        try {
            dispatch({ type: 'SET_LOADING', payload: true })
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
            dispatch({ type: 'SET_LOADING', payload: false })

        }
    }


    async function deleteCity(id) {
        try {
            dispatch({ type: 'SET_LOADING', payload: true })
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: 'DELETE'
            });
            dispatch({ type: 'DELETE_CITY', payload: id })
            // setCities(cities => cities.filter(c => c.id !== id))

        } catch {
            alert("There was an error while deleting city...")
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false })
        }
    }





    async function getCity(id) {
        try {
            dispatch({ type: 'SET_LOADING', payload: true })
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            dispatch({ type: 'CURRENT_CITY', payload: data })
        } catch {
            alert("There was an error loading the data...")
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false })
        }
    }

    return (
        <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity, addNewCity, deleteCity }}>
            {children}
        </CitiesContext.Provider>
    )
}



export { CitiesProvider, useCities }






