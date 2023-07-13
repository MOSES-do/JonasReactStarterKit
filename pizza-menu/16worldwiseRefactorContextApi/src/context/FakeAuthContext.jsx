import { createContext, useContext, useReducer } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

/*eslint-disable */
const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false
}


function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined)
        throw new Error("AuthContext was used outside of AuthProvider");

    return context
}


function reducer(state, action) {
    switch (action.type) {
        case 'login':
            return {
                ...state, user: action.payload,
                isAuthenticated: true
            }

        case 'logout':
            return {
                ...state, user: null,
                isAuthenticated: false
            }

        default:
            throw new Error("Unknown action")
    }
}


const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};


function AuthProvider({ children }) {

    // const navigate = useNavigate()
    const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState)

    function login(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({ type: 'login', payload: FAKE_USER })
        } else {
            const notify = () => toast.error("Wrong username/password")
            notify()
        }
    };

    function logout() {
        dispatch({ type: 'logout' })
    };

    return <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
        {children}
        < ToastContainer />
    </AuthContext.Provider>
}


export { AuthProvider, useAuth }