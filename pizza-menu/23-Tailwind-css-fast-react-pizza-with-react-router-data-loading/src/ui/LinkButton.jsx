import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

/*eslint-disable*/
function LinkButton({ children, to }) {
    const navigate = useNavigate();
    const className = "text-sm text-blue-500 hover:text-blue-600 hover:underline"

    if (to === '-1') return <button className={className} onClick={() => navigate(-1)}>&larr; Go back</button>

    return <Link to={to} className={className}>{children}</Link>
}

export default LinkButton