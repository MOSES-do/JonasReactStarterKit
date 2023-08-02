import { useSelector } from "react-redux"

const Username = () => {
    const username = useSelector(state=>state.user.username)
    
    if(!username) return null
    return (
        <div className="text-sm font-semibold hidden sm:block">{username}

        </div>
    )
}

export default Username