import './App.css';
import { useState } from 'react'
import { Modal, Logo, Form, PackingList, Stats } from './component/index'


function App() {
  const [trips, setTrips] = useState([])

  const addNewTrip = (items) => {
    const listTrips = [...trips, items]
    setTrips(listTrips)
  }

  return (
    <div className='app'>
      <Logo />

      <Form trips={trips} addNewTrip={addNewTrip} />

      <PackingList trips={trips} setTrips={setTrips} />

      <Modal />

      <Stats trips={trips} />
    </div>
  )


}


export default App;


