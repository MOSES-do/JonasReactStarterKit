import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    currency: "USD",
    users: [],
    isLoading: false
}

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        deposit(state, action) {
            state.balance += action.payload
            state.isLoading = false

        },

        withdraw(state, action) {
            state.balance -= action.payload
        },

        requestLoan: {
            prepare(amount, purpose) {
                return {
                    payload: { amount, purpose }
                }
            },

            reducer(state, action) {
                if (state.loan > 0) return

                state.loan = action.payload.amount
                state.loanPurpose = action.payload.purpose
                state.balance = state.balance + action.payload.amount
            }
        },

        payLoan(state) {
            state.balance -= state.loan
            state.loan = 0;
            state.loanPurpose = '';
        },


        convertingCurrency(state) {
            state.isLoading = true
        }
    }
})

// console.log(accountSlice)

export const { withdraw, requestLoan, payLoan, convertingCurrency } = accountSlice.actions

const host = 'api.frankfurter.app';

// action creators account 
export function deposit(amount, currency) {
    if (currency === "USD") return { type: "account/deposit", payload: amount }

    //eslint-disable-next-line
    //middlware - sits BTW dispatch and the store
    return async function (dispatch, getState) {

        dispatch({ type: "account/convertingCurrency" })

        //API Call
        //convert currencies to dollar
        const res = await fetch(`https://${host}/latest?amount=${amount}&from=${currency}&to=USD`);
        const data = await res.json();
        console.log(data)
        const converted = data.rates.USD;
        //return action
        dispatch({ type: "account/deposit", payload: converted })
        console.log(getState())
    }
}
export default accountSlice.reducer
















/*
export default function accountReducer(state = initialState, action) {
    switch (action.type) {

        case "account/users":
            return {
                ...state, users: action.payload
            }

        case "account/deposit":
            return {
                ...state, balance: state.balance + action.payload,
                isLoading: false
            }

        case "account/withdraw":
            return {
                ...state, balance: state.balance - action.payload
            }

        case "account/requestLoan":
            if (state.loan > 0) return
            // if (state.loan > 0) throw new Error("Loan limit exceeded, pay up to request another one")
            return {
                ...state, loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount
            }

        case "account/payLoan":
            //reset back to 
            return {
                ...state, loan: 0, loanPurpose: "", balance: state.balance - state.loan
            }

        case "account/currency":
            return {
                ...state, currency: action.payload
            }

        case "account/convertingCurrency":
            return {
                ...state, isLoading: true
            }

        default:
            return state
    }
}



const host = 'api.frankfurter.app';
// action creators account 
export function deposit(amount, currency) {
    if (currency === "USD") return { type: "account/deposit", payload: amount }

    //eslint-disable-next-line
    //middlware - sits BTW dispatch and the store
    return async function (dispatch, getState) {

        dispatch({ type: "account/convertingCurrency" })

        //API Call
        //convert currencies to dollar
        const res = await fetch(`https://${host}/latest?amount=${amount}&from=${currency}&to=USD`);
        const data = await res.json();
        const converted = data.rates.USD;
        //return action
        dispatch({ type: "account/deposit", payload: converted })
        console.log(getState())
    }
}

export function withdraw(amount) {
    return { type: "account/withdraw", payload: amount }
}


export function requestLoan(amount, purpose) {
    return { type: "account/requestLoan", payload: { amount: amount, purpose: purpose } }
}


export function payLoan() {
    return { type: "account/payLoan" }
}

export function cur(currency) {
    return {
        type: "account/currency", payload: { currency }
    }
}



//one-off example to show how to fetch state asynchronously on page load using think
export function fetchUsers() {
    //eslint-disable-next-line
    return async function (dispatch, getState) {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        // console.log(data)
        dispatch({ type: "account/users", payload: data })
        // console.log(getState())
    }
}

*/