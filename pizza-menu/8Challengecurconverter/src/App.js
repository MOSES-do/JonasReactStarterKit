import './App.css';
import { useState, useEffect } from 'react'


function App() {
  const [amount, setAmount] = useState('')
  const [cur1, setCur1] = useState('EUR')
  const [cur2, setCur2] = useState('USD')
  const [currentRate, setCurrentRate] = useState('')
  const [loading, setIsLoading] = useState(false)


  useEffect(() => {
    async function fetchRate() {
      setIsLoading(true)
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${cur1}&to=${cur2}`)
      const data = await res.json()
      setCurrentRate(data.rates[cur2])
      setIsLoading(false)
      console.log(data.rates[cur2])
    }

    if (cur1 === cur2) return setCurrentRate(amount)
    fetchRate()
  }, [cur1, cur2, amount])

  return (
    <div>
      <input type="text" value={amount} onChange={(e) => setAmount(Number(e.target.value))} disabled={loading} />
      <select value={cur1} onChange={(e) => setCur1(e.target.value)} disabled={loading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={cur2} onChange={(e) => setCur2(e.target.value)} disabled={loading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>

      <p>Current Rate is:{currentRate} {cur2}</p>
    </div>
  )
}


export default App;
