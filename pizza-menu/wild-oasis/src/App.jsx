import GlobalStyles from './styles/GlobalStyles'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Account, Bookings, Cabins, Dashboard, Login, PageNotFound, Settings, Users } from "./pages";

function App() {
    return (
        <>
            <GlobalStyles />
            <BrowserRouter>
                <Routes>

                    {/* <Route index element={<Dashboard />} />
                <Route path='dashboard' element={<Dashboard />} /> */}

                    {/* Declarative redirect instead of using the two lines above */}
                    <Route index element={<Navigate replace to='dashboard' />} />
                    <Route path='dashboard' element={<Dashboard />} />

                    <Route path='bookings' element={<Bookings />} />
                    <Route path='cabins' element={<Cabins />} />
                    <Route path='users' element={<Users />} />
                    <Route path='settings' element={<Settings />} />
                    <Route path='account' element={<Account />} />
                    <Route path='login' element={<Login />} />
                    <Route path='*' element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;