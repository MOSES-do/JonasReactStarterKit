// import { configureStore } from "@reduxjs/toolkit";

// import accountReducer from "./features/accounts/accountSlice";
// import customerReducer from "./features/customers/customerSlice";

// const store = configureStore({
//   reducer: {
//     account: accountReducer,
//     customer: customerReducer,
//   },
// });

// export default store;

import { createStore } from "redux"

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case "account/deposit":
            return {
                ...state, balance: state.balance + action.payload
            }

        case "account/withdraw":
            return {
                ...state, balance: state.balance - action.payload
            }

        case "account/requestLoan":
            if (state.loan > 0) return
            return {
                ...state, loan: action.payload.amount, loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount
            }

        case "account/payLoan":
            //reset back to 
            return {
                ...state, loan: 0, loanPurpose: "", balance: state.balance - state.loan
            }

        default:
            return state
    }
}


const store = createStore(reducer)

//dispatching manually but there's a better way to do this using action creators
store.dispatch({ type: "account/deposit", payload: 500 })
console.log(store.getState())

store.dispatch({ type: "account/withdraw", payload: 200 })
console.log(store.getState())

store.dispatch({ type: "account/requestLoan", payload: { amount: 1000, purpose: "Buy a Car" } })
console.log(store.getState())

store.dispatch({ type: "account/payLoan" })
console.log(store.getState())
