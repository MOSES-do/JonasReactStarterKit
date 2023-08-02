import Header from "./Header"
import CartOverview from "../features/cart/CartOverview"
import { Outlet, useNavigation } from "react-router-dom"
import Spinner from "./Spinner"

const AppLayout = () => {
    const navigation = useNavigation()
    // console.log(navigation)
    const isLoading = navigation.state === "loading"

    return (
        // <div className="relative flex justify-between  flex-col h-[100vh]  ">
        <div className="grid relative grid-rows-[auto_1fr_auto] h-screen">

                {isLoading && <Spinner />}
            <Header />

            <main className="overflow-scroll">
                <Outlet />
            </main>

            <CartOverview />
        </div>
    )
}

export default AppLayout