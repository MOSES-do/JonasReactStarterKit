import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from 'redux-thunk'
import accountReducer from "./features/account/accountSlice"
import customerReducer from "./features/customers/customerSlice"
import { composeWithDevTools } from "redux-devtools-extension"


import { fetchUsers } from "./features/account/accountSlice"

const rootReducer = combineReducers({ account: accountReducer, customer: customerReducer })

const store = createStore(rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

store.dispatch(fetchUsers())


export default store;
