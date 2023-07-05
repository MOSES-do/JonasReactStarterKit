import './App.css';
import { useReducer } from 'react'

const initialState = {
  balance: 0,
  loan: 0,
  status: 'inactive'
}

function reducer(state, action) {
  if (state.status === 'inactive' && action.type !== 'openA/C') return state;

  switch (action.type) {
    case 'openA/C':
      return {
        ...state, balance: state.balance + action.payload,
        status: 'active'
      }

    case 'deposit':
      return {
        ...state, balance: state.balance + action.payload,
      }

    case 'withdrawAmount':
      return { ...state, balance: state.balance > action.payload ? state.balance - action.payload : 0 }

    case 'balancePlusLoan':
      const loan = state.loan
      return { ...state, balance: state.balance + loan }

    case 'loan':
      if (state.loan > 0) return state
      return {
        ...state,
        loan: state.loan + action.payload
      }

    case 'payLoan':
      return {
        ...state,
        loan: state.loan > 0 ? state.loan - state.loan : 0
      }

    case 'closeAccount':
      // if (state.loan > 0 || state.balance !== 0) return state
      // return initialState
      return {
        ...state, status: 'finished'
      }


    default:
      throw new Error("Unknown action ")
  }
}


function App() {

  const [state, dispatch] = useReducer(reducer, initialState)
  const { balance, loan, status } = state


  const handleAccountOpening = () => {
    dispatch({ type: 'openA/C', payload: 10 })
  }

  const handleLoan = () => {
    dispatch({ type: 'loan', payload: 10 })
    dispatch({
      type: 'balancePlusLoan'
    })
  }

  return (
    <div >
      <h1>Bank Account</h1>

      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>
      <div className='buttons'>
        <button disabled={status === 'active'} onClick={() => handleAccountOpening()}>open account</button>

        <button onClick={() => dispatch({ type: 'deposit', payload: 150 })} disabled={status === 'finished'}>Deposit 150</button>

        <button onClick={() => dispatch({ type: 'withdrawAmount', payload: 50 })} disabled={status === 'finished'}>Withdraw 50</button>

        <button onClick={() => handleLoan()} disabled={status === 'inactive' || loan > 0 || status === 'finished'}>Request a loan 5000</button>

        <button onClick={() => dispatch({ type: 'payLoan' })} disabled={(!loan && status === 'inactive') || (status === 'finished')}>Pay loan</button>

        <button disabled={status === 'inactive' || status === 'finished' || loan || balance} onClick={() => dispatch({ type: "closeAccount" })} >Close account</button>
      </div>

    </div >
  )

}


export default App;
