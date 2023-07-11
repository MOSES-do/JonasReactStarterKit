import { useState, useEffect, createContext, useContext } from 'react'


const BASE_URL = 'http://localhost:9000'




const CitiesContext = createContext()

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined)
        throw new Error('Cities context was used outside the cities provider')
    return context;
}

/*eslint-disable*/
function CitiesProvider({ children }) {
    const [cities, setCities] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentCity, setCurrentCity] = useState({})

    async function addNewCity(newCity) {
        try {
            setIsLoading(true)
            const res = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCity),
            });
            const data = await res.json();
            setCities(cities => [...cities, data])
            // console.log(data)
        } catch {
            alert("There was an error while creating city...")
        } finally {
            setIsLoading(false)
        }
    }


    async function deleteCity(id) {
        try {
            setIsLoading(true)
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: 'DELETE'
            });

            setCities(cities => cities.filter(c => c.id !== id))

        } catch {
            alert("There was an error while deleting city...")
        } finally {
            setIsLoading(false)
        }
    }




    useEffect(() => {
        async function fetchCities() {
            try {
                setIsLoading(true)
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                setCities(data)
            } catch {
                alert("There was an error loading the data...")
            } finally {
                setIsLoading(false)
            }
        }
        fetchCities()
    }, [])

    async function getCity(id) {
        try {
            setIsLoading(true)
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            setCurrentCity(data)
        } catch {
            alert("There was an error loading the data...")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity, addNewCity, deleteCity }}>
            {children}
        </CitiesContext.Provider>
    )
}



export { CitiesProvider, useCities }






