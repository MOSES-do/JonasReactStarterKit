import { Link } from "react-router-dom"
import SearchOrder from "../features/order/SearchOrder"
import Username from "../features/user/Username"

const Header = () => {
    //tracking
    return (
        <header className="flex  sm:flex-row items-center justify-between bg-yellow-500 uppercase px-4 py-3 border-b border-stone-200 sm:px-6  nav-bar">
            <Link to="/" className="tracking-widest">Fast React Pizza Co.</Link>
            <SearchOrder />
            <Username />
        </header>
    )
}

export default Header