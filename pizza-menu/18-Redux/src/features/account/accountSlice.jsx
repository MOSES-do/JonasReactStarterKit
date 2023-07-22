

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    currency: "USD",
}


export default function accountReducer(state = initialStateAccount, action) {
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
            console.log(state.balance, state.loan)
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

        default:
            return state
    }
}



// action creators account 
export function deposit(amount) {
    return { type: "account/deposit", payload: amount }
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

