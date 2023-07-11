import { NavLink } from 'react-router-dom'
import './appnav.css'

function AppNav() {
    return (
        <div className="nav">
            <ul className="nav ul">
                <li><NavLink to='cities'>Cities</NavLink></li>
                <li><NavLink className="nav_active" to='countries' >Countries</NavLink></li>
            </ul>
        </div>
    )
}

export default AppNav