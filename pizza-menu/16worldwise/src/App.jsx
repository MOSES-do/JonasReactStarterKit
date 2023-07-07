
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Home, Pricing, Product, PageNotFound, AppLayout, Login } from './pages/index'
import './App.css'
import { City, CityList, CountryList, Form } from './components'

const BASE_URL = 'http://localhost:9000'

function App() {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)

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
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='product' element={<Product />} />
          <Route path='pricing' element={<Pricing />} />
          <Route path='app' element={<AppLayout />} >
            <Route index element={<Navigate replace to='cities' />} />
            <Route path='cities' element={<CityList cities={cities} isLoading={isLoading} />} />
            {/* dynamic route with url parameters */}
            <Route path='cities/:id' element={<City cities={cities} isLoading={isLoading} />} />
            <Route path='countries' element={<CountryList cities={cities} isLoading={isLoading} />} />
            <Route path='form' element={<Form />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
