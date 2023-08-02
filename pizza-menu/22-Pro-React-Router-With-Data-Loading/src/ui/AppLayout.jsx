import Header from "./Header"
import CartOverview from "../features/cart/CartOverview"
import { Outlet, useNavigation } from "react-router-dom"
import Spinner from "./Spinner"

const AppLayout = () => {

    const navigation = useNavigation()
    // console.log(navigation)
    const isLoading = navigation.state === "loading"

    return (
        <div className="layout">

            <Header />

            <main>
                {isLoading && <Spinner />}
                <Outlet />
            </main>

            <CartOverview />
        </div>
    )
}

export default AppLayout