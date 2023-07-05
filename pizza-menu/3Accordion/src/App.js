import './App.css';
import { useState } from 'react'


function App() {
  const [data, setData] = useState([
    {
      id: 1,
      question: "Where are these chairs assembled?",
      response: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum nam commodi exercitationem cupiditate iure corporis nisi fuga iste doloribus, veritatis nobis excepturi. Inventore maiores distinctio iure illum vero odit reiciendis!",
      click: false
    },

    {
      id: 2,
      question: "Where are these chairs assembled?",
      response: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum nam commodi exercitationem cupiditate iure corporis nisi fuga iste doloribus, veritatis nobis excepturi. Inventore maiores distinctio iure illum vero odit reiciendis!",
      click: false
    },

    {
      id: 3,
      question: "Where are these chairs assembled?",
      response: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum nam commodi exercitationem cupiditate iure corporis nisi fuga iste doloribus, veritatis nobis excepturi. Inventore maiores distinctio iure illum vero odit reiciendis!",
      click: false
    }
  ])

  return (
    <div className="app">
      <Accordion data={data} setData={setData} />

      {/* CHALLENGE */}
      <h1>CHALLENGE</h1>
      <TipCalculator />
    </div>
  );
}

const Accordion = ({ data, setData }) => {
  const [curOpen, setCurOpen] = useState(null);//This keeps tracks of the open state of each accordion


  //Previously was using the id to determine which accordion would open but now, i have switched to state
  const isOpen = (id) => {
    // console.log(id)
    setData(data => data.map(box => {
      return (
        box.id === id ? {
          ...box, click: !box.click
        } : box
      )
    }))
  }


  return (
    <div style={{ display: "flex", flexDirection: "column", width: "45%" }}>
      {data.map((datum, i) => (
        <QuestionBox key={i} num={i} isOpen={isOpen} click={datum.click} curOpen={curOpen} onOpen={setCurOpen} id={datum.id} title={datum.question}>{datum.response}</QuestionBox>
      ))}
      <QuestionBox key="test 1" id="23" isOpen={isOpen} curOpen={curOpen} onOpen={setCurOpen} title="Test 1">
        <p>Allow React developers to:</p>
        <ul>
          <li>Break up UI into componenets</li>
          <li>Make components reusable</li>
          <li>Place state efficiently</li>
        </ul>
      </QuestionBox>

    </div>
  )
}

//onClick={() => openBox(datum.id)}
// onClick = {() => setIsOpen(!isOpen)}
//onClick={() => onOpen(isOpen ? null : num)}
const QuestionBox = ({ id, title, children, num, click, curOpen, onOpen, isOpen }) => {
  // const [isOpen, setIsOpen] = useState(false); //This allows each box to open and close itself
  isOpen = num === curOpen; //allows for only one box open at a time

  return (
    <div onClick={() => {
      console.log(curOpen, num)
      onOpen(isOpen ? null : num)
    }} className={`${isOpen ? `box` : null}`} style={{
      paddingLeft: "20px", paddingRight: "20px", marginBottom: "20px", cursor: "pointer", backgroundColor: '#f3e9e910', boxShadow: 'rgb(156, 154, 154) 0px 5px 5px'
    }}>
      <div style={{
        display: "grid", gridTemplateColumns: "40px 1fr auto", alignItems: "center", fontSize: "20px"
      }}>
        <p className={`${isOpen ? 'active' : null} snum`}>{id < 9 ? `0${id}` : id}</p>
        <p className={`${isOpen ? 'active' : null} open`}>{title}</p>
        <p style={{ justifySelf: "end", fontSize: "30px", }}>{isOpen ? "-" : "+"}</p>
        <p className="response">{isOpen && children}</p>
      </div>
    </div >

    /*
        //  using data from server
        <div onClick={() => isOpen(id)} className={`${isOpen ? `box` : null}`} style={{
          paddingLeft: "20px", paddingRight: "20px", marginBottom: "20px", cursor: "pointer", backgroundColor: '#f3e9e910', boxShadow: 'rgb(156, 154, 154) 0px 5px 5px'
        }}>
          <div style={{
            display: "grid", gridTemplateColumns: "40px 1fr auto", alignItems: "center", fontSize: "20px"
          }}>
            <p className={`${click ? 'active' : null} snum`}>{id < 9 ? `0${id}` : id}</p>
            <p className={`${click ? 'active' : null} open`}>{title}</p>
            <p style={{ justifySelf: "end", fontSize: "30px", }}>{click ? "-" : "+"}</p>
            <p className="response">{click && children}</p>
          </div>
        </div>
        */
  )
}



/***TIP CALCULATOR***/
const BillInput = ({ bill, setBill }) => {
  return (
    <div>
      <span>How much was the bill?</span>
      <input type="text" placeholder="100" value={bill} onChange={(e) => setBill(Number(e.target.value))} />
    </div>
  )
}

const SelectPercentage = ({ value, setValue, text }) => (
  <div>
    {text}
    <select value={value} onChange={(e) => setValue(Number(e.target.value))}>
      <option value="0">Dissatisfied (0%)</option>
      <option value="5">It was okay (5%)</option>
      <option value="10">It was good (10%)</option>
      <option value="20">Absolutely amazing (20%)</option>
    </select>
  </div>

)

const Output = ({ total, bill, tipGiven }) => (
  `You pay $${total || 0} (${bill || 0} + $${tipGiven}tip)`
)

const Reset = ({ reset }) => (
  <button onClick={reset}>Reset</button>
)

const TipCalculator = () => {
  const [bill, setBill] = useState('')
  const [tip, setTip] = useState("")
  const [tip1, setTip1] = useState("")

  // let tips;
  // let tips1;

  // if (tip === "dissatisfied") tips = 0;
  // if (tip === "okay") tips = 5;
  // if (tip === "good") tips = 10;
  // if (tip === "amazing") tips = 20;

  // if (tip1 === "dissatisfied") tips1 = 0;
  // if (tip1 === "okay") tips1 = 5;
  // if (tip1 === "good") tips1 = 10;
  // if (tip1 === "amazing") tips1 = 20;

  const calcTip = (tip + tip1) / 100 * bill;
  const tipGiven = calcTip / 2;
  const total = Number(bill) + tipGiven;
  // console.log(tipGiven)
  const reset = () => {
    setBill('')
    setTip("")
    setTip1("")
  }



  return (
    <>
      <BillInput bill={bill} setBill={setBill} />
      <SelectPercentage value={tip} text="How much did you like the service?" setValue={setTip} />
      <SelectPercentage value={tip1} text="How much did you like the service?" setValue={setTip1} />
      <Output total={total} bill={bill} tipGiven={tipGiven} />
      <Reset reset={reset} />
    </>
  )

}

/***TIP CALCULATOR END***/




export default App;
