import './App.css';
import { useState, useEffect } from 'react'
import Button from './component/Button';
import Pizza from './component/Pizza';

function App() {
  return (
    <div style={{ position: "relative", }}>
      <Header />

      <div style={{ marginBottom: "50px" }}>
        <Menu />
      </div>

      <Pizza />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button text="Order now" mb="30" bclr="edc84b" clr="inherit" brd="10" pd="10" hov="e9bb24" />
      </div>

      <Footer />

    </div >
  );
}

function Header() {
  return <h1 className="header" style={{ textAlign: "center", marginBottom: "20px" }}>Fast React Pizza Co.</h1>
}

function Menu() {
  return (
    <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
      <p className="menu">Our Menu</p>

      {<p style={{ marginTop: "30px" }}>Authentic Italian Cuisine. 6 creative dishes to choose from. <br />All from our stone oven, all organic , all deliciaso!</p>}
    </div>
  )
}

const Footer = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString())
  const openHour = 12;
  const closeHour = 22;

  const open = time >= openHour && time <= closeHour;
  if (open) alert("We're currently open");
  else alert("Sorry we're closed!")

  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  }, [])

  return <footer style={{ positon: "absolute", bottom: "0" }}>
    <div style={{ textAlign: "center" }} >
      {open && <span >{time}   | We're currently open!</span>}
      {!open && <span >{time}  | Sorry, we're closed!</span>}
    </div>
  </footer>

}


export default App;
