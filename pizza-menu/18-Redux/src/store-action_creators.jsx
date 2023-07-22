import { combineReducers, createStore } from "redux"

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


/*eslint-disable*/
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
}

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAT: ""
}


function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAT: action.payload.createdAT
      }

    case 'customer/updateName':
      return { ...state, fullName: action.payload }

    default:
      return state;
  }
}


function accountReducer(state = initialStateAccount, action) {
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


const rootReducer = combineReducers({ account: accountReducer, customer: customerReducer })

const store = createStore(rootReducer)



// action creators account
function deposit(amount) {
  return { type: "account/deposit", payload: amount }
}

store.dispatch(deposit(500))
console.log(store.getState())

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount }
}

store.dispatch(withdraw(500))
console.log(store.getState())


function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount: amount, purpose: purpose } }
}

store.dispatch(requestLoan(1000, "Buy a car"))
console.log(store.getState())


function payLoan() {
  return { type: "account/payLoan" }
}

store.dispatch(payLoan())
console.log(store.getState())




//action creators customer

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAT: new Date().toISOString() }
  }
}

store.dispatch(createCustomer('Moses Esumei', '2347011564754'))
console.log(store.getState())

store.dispatch(deposit(500))
console.log(store.getState())

function updateName(fullName) {
  return {
    type: 'account/updateName', payload: fullName
  }
}

