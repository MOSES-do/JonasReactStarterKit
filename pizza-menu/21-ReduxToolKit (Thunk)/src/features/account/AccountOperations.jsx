import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, withdraw, requestLoan, payLoan, cur } from './accountSlice'
import { FormatCurrency } from '../currencyFormat'


function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");

  const dispatch = useDispatch()



  const { loan, loanPurpose: curLoanPurpose, isLoading } = useSelector((store) => store.account)
  // console.log(users)

  useEffect(() => {
    dispatch(cur(currency))
  }, [currency, dispatch]);

  function handleDeposit() {
    if (!depositAmount) return
    // dispatch(deposit(depositAmount, currency));
    dispatch(deposit(depositAmount));
    setDepositAmount("")
    setCurrency("")
  }

  function handleWithdrawal() {
    if (!withdrawalAmount) return
    dispatch(withdraw(withdrawalAmount))
    setWithdrawalAmount('');
  }

  function handleRequestLoan() {
    if (!loanAmount || !loanPurpose) return
    dispatch(requestLoan(loanAmount, loanPurpose))
    setLoanPurpose("")
    setLoanAmount('')
  }

  function handlePayLoan() {
    dispatch(payLoan())
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => {
              setCurrency(e.target.value)
            }}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button onClick={handleDeposit} disabled={isLoading}>{isLoading ? "converting..." : "deposit"}  {depositAmount}</button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        {
          curLoanPurpose &&
          <div>
            <span>Pay back:({curLoanPurpose})<FormatCurrency value={loan} /></span>
            <button onClick={handlePayLoan}>Pay loan</button>
          </div>
        }
      </div>
    </div>
  );
}

export default AccountOperations;
