
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Home, Pricing, Product, PageNotFound, AppLayout, Login } from './pages/index'
import './App.css'
import { City, CityList, CountryList, Form } from './components'
import { CitiesProvider } from './context/CitiesContext'
import { AuthProvider } from './context/FakeAuthContext'
import ProtectedRoute from './pages/ProtectedRoute'

function App() {

  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index path='/' element={<Home />} />
            <Route path='product' element={<Product />} />
            <Route path='pricing' element={<Pricing />} />
            <Route path='app' element={<ProtectedRoute><AppLayout /></ProtectedRoute>} >
              {/* default page route using Navigate */}
              <Route index element={<Navigate replace to='cities' />} />
              <Route path='cities' element={<CityList />} />
              {/* dynamic route with url parameters */}
              <Route path='cities/:id' element={<City />} />
              {/* nested routes */}
              <Route path='countries' element={<CountryList />} />
              <Route path='form' element={<Form />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  )
}

export default App
